var express                 = require('express');
var router                  = express.Router();
var Cart                    = require('../models/cart');
var Order                   = require('../models/order');
var PaypalSDK 				= require('paypal-rest-sdk');

PaypalSDK.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AccgQnbPrprytAmh2aOEyhzLhjJugFA1ZS8Prh5L2ehq7xZOyT08WaKeg2xc-M2C3P1AQnrvv3TnHnFO',
  'client_secret': 'EHebMfHH5WuQUm6Fovgvj35YNE1Y0CM5AH8pZdY_gdeADziUeL6YrmSqwWw91joWreEAyWqC7SCUNNsn'
});


// GET checkout page
router.get('/', ensureAuthenticated, function(req, res, next){
    console.log(`ROUTE: GET CHECKOUT PAGE`)
    var cart = new Cart(req.session.cart)
    var totalPrice = cart.totalPrice
    res.render('checkout', {title: 'Checkout Page', items: cart.generateArray(), totalPrice: cart.totalPrice, bodyClass: 'registration', containerWrapper: 'container', userFirstName: req.user.fullname});
})

// POST checkout-process
router.post('/checkout-process', function(req, res){
   console.log(`ROUTE: POST CHECKOUT-PROGRESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice;



var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/checkout/checkout-success",
        "cancel_url": "http://localhost:3000/checkout/checkout-cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": totalPrice,
                "currency": "CAD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "CAD",
            "total": totalPrice
        },
        "description": "This is the payment description."
    }]
};
	PaypalSDK.payment.create(create_payment_json, function(error, payment){
		var links = {};
		if(error){
			console.error(JSON.stringify(error));
		} else {
			console.log("Create Payment Response");
			console.log(payment);

					
			// Capture HATEOAS links
			payment.links.forEach(function(linkObj){
				links[linkObj.rel] = {
				   href: linkObj.href,
				   method: linkObj.method
				};
			})
			console.log("link content:",links.approval_url.href);
			// If redirect url present, redirect user
			if (links.hasOwnProperty('approval_url')){
			  //REDIRECT USER TO links['approval_url'].href
			  res.redirect(links.approval_url.href);
			} else {
			  console.error('no redirect URI present');
			}
		}
		payment.state == 'approved';
		var newOrder = new Order({
            orderID             : payment.id.substring(4,payment.id.length+1),
            username            : req.user.username,
            address             : '1 Maire-Victorin, Toronto Ontario M5A 1E1 Canada',
            orderDate           : payment.create_time,
            shipping            : true
		});
        newOrder.save();
		
		/*
		var paymentId = payment.id.substring(4,payment.id.length+1);
		var payerId =  {payer_id: 'paypal'};
		console.log('paymentId',paymentId);
		console.log('payerId',payerId);
		PaypalSDK.payment.execute(paymentId, payerId, function(error, payment){
		  if(error){
			console.error(JSON.stringify(error));
			
		  } else {
			  console.log('33333333333333333');
			if (payment.state == 'approved'){
			  console.log('payment completed successfully');
			} else {
			  console.log('payment not successful');
			}
		  }
		});*/
	
	});		
	
});


// GET checkout-success
router.get('/checkout-success', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-SUCCESS`)
	req.session.cart.items = {};
	req.session.cart.totalQty = 0;
    req.session.cart.totalPrice = 0;
    var cart = new Cart(req.session.cart);	
   // var totalPrice = cart.totalPrice;
    res.render('checkoutSuccess', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname})
	
	
});

// PAYMENT CANCEL
router.get('/checkout-cancel', ensureAuthenticated, function(req, res){
    console.log(`ROUTE: GET CHECKOUT-CANCEL`)
    res.render('checkoutCancel', {title: 'Successful', containerWrapper: 'container', userFirstName: req.user.fullname});
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        console.log(`ERROR: USER IS NOT AUTHENTICATED`)
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/');
    }
}

module.exports = router;

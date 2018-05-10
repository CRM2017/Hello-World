var Cart                    = require('../models/cart');
var paypal 					= require('paypal-rest-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AccgQnbPrprytAmh2aOEyhzLhjJugFA1ZS8Prh5L2ehq7xZOyT08WaKeg2xc-M2C3P1AQnrvv3TnHnFO',
  'client_secret': 'EHebMfHH5WuQUm6Fovgvj35YNE1Y0CM5AH8pZdY_gdeADziUeL6YrmSqwWw91joWreEAyWqC7SCUNNsn'
});

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
                "price": "1.00",
                "currency": "CAD",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "CAD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
};


module.exports = create_payment_json;


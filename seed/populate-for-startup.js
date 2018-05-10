var Product     = require('../models/product');
var User        = require('../models/user');
var mongoose    = require('mongoose');


mongoose.connect('mongodb://localhost/shoppingApp');

var products = [
    
	
	new Product({
        imagePath   : 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/112/11200/11200483.jpg',
        title       : 'Bose Soundsport Free Bluetooth Headphones',
        description : 'Let the music push you past your limits with the Bose SoundSport Free Bluetooth headphones',
        price       : 249.99
    }),
	
	new Product({
        imagePath   : 'https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/105/10557/10557542.jpg',
        title       : 'Apple AirPods In-Ear Bluetooth Headphones',
        description : 'Wireless. Effortless. Magical.Introducing wireless AirPods. Just take them out and they’re ready to use with all your Apple devices.1 Put them in your ears and they connect instantly.',
        price       : 219.99
    }),
	
	new Product({
        imagePath   : 'https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/103/10322/10322912.jpg',
        title       : 'Bose QuietComfort 25 Over-Ear Noise Cancelling Headphones',
        description : 'Whether on the plane, a crowded street or busy office, these Bose QuietComfort 25 headphones block out any unwanted noise so you can fully immerse in your favourite tunes.',
        price       : 199.95
    }),
	new Product({
        imagePath   : 'https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/114/11429/11429688.jpg',
        title       : 'Sony In-Ear Noise Cancelling Truly Wireless Earbuds',
        description : 'Enjoy incredible sound no matter where your daily travels take you with this pair of Sony Bluetooth earbuds.',
        price       : 279.99
    }),
	
	new Product({
        imagePath   : 'https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/104/10488/10488795.jpg',
        title       : 'Monster iSport Victory In-Ear Headphones',
        description : 'Conquer your next workout with the tunes to back you up. ',
        price       : 89.99
    }),
    new Product({
        imagePath   : 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/112/11200/11200480.jpg',
        title       : 'Bose QuietComfort 35 II Over-Ear Noise Cancelling Bluetooth Headphones',
        description : 'Headphones that become part of your life and just part of your music, the Bose QuietComfort 35 II wireless headphones are designed to keep amazing audio and virtual assistance at your beck and call.',
        price       : 449.99
    }),
	
	new Product({
        imagePath   : 'https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/105/10585/10585774.jpg',
        title       : 'Sony Over-Ear Wireless Headphones with Mic',
        description : 'Listen to your favourite tunes in wireless comfort with these over-ear headphones from Sony. ',
        price       : 249.99
    }),
	new Product({
        imagePath   : 'https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/114/11429/11429681.jpg',
        title       : 'Sony Over-Ear Noise Cancelling Bluetooth Headphones ',
        description : 'Enjoy epic studio-calibre sound while you\'re on the go with this pair of wireless Sony over-ear noise cancelling Bluetooth headphones. ',
        price       : 399.99
    }),
    new Product({
        imagePath   : 'https://multimedia.bbycastatic.ca/multimedia/products/1500x1500/115/11534/11534529.jpg',
        title       : 'Beats by Dr. Dre Studio 3 Over-Ear Sound Isolating',
        description : 'Enjoy a premium listening experience and complete wireless freedom with the Beats Studio 3 over-ear headphones.',
        price       : 329.99
    }),
	new Product({
        imagePath   : 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/105/10592/10592405.jpg',
        title       : 'Sennheiser Over-Ear Noise Cancelling & Sound Isolating Wireless Headphones ',
        description : 'Get first-class sound with the Sennheiser PXC 550 wireless Bluetooth headphone.',
        price       : 429.99
    }),
	
	new Product({
        imagePath   : 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/104/10407/10407099.jpg',
        title       : 'Beats by Dr. Dre urBeats In-Ear Headphones',
        description : 'Enjoy exceptional sound quality with the urBeats headphones from Beats by Dr. Dre.',
        price       : 59.99
    }),
	new Product({
        imagePath   : 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/105/10582/10582164.jpg',
        title       : 'Sennheiser HD 4.50 BTNC Over-Ear Sound Isolating Headphones',
        description : 'Escape to audio bliss, free from wires and unwanted distractions, with the Sennheiser HD 4.50 BTNC over-ear wireless headphones. ',
        price       : 229.99
    })
	
];

Product.remove({}, function(err){            //remove all products before save
    if(err) {
       console.log('ERROR: Remove failed')
       return
    }	
	for (var i = 0; i < products.length; i++){

		products[i].save(function(err, result) {

		});
	}
	 
}) 

var newUser = new User({
    username    : 'admin@admin.com',
    password    : 'admin',
    fullname    : 'Cuneyt Celebican',
    admin       : true
});
var newUser2 = new User({
    username    : 'ming@admin.com',
    password    : 'admin',
    fullname    : 'Ming Lei',
    admin       : true
});
User.createUser(newUser2, function(err, user){
    if(err) throw err;
    console.log(user);
    exit();
});

User.createUser(newUser, function(err, user){
    if(err) throw err;
    console.log(user);
    exit();
});

function exit() {
    mongoose.disconnect();
}

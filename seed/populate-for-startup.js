var Product     = require('../models/product');
var User        = require('../models/user');
var Order       = require('../models/order');
var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/shoppingApp');

var products = [
    new Product({
        imagePath   : 'https://images.footballfanatics.com/FFImage/thumb.aspx?i=/productimages/_2327000/ff_2327545_full.jpg&w=340',
        title       : 'Custom Blue Jays Jersey',
        description : 'Toronto Blue Jays MLB jersey custom with your name. Enter your name as a note in paypal checkout to have it made for you.',
        price       : 129.99
    }),
    new Product({
        imagePath   : 'http://nba.frgimages.com/FFImage/thumb.aspx?i=/productImages/_1817000/ff_1817182_xl.jpg&w=340',
        title       : 'Kobe Bryant L.A. Lakers Jersey',
        description : 'Lightweight yet durable double-knit mesh designed to help keep you cool. Dri-FIT Technology that wicks away sweat from your skin to help you stay dry and comfortable. Heat-applied twill name and number.',
        price       : 149.99
    }),
    new Product({
        imagePath   : 'https://images.footballfanatics.com/FFImage/thumb.aspx?i=/productimages/_2567000/altimages/ff_2567646alt1_full.jpg&w=600',
        title       : 'Aaron Judge NY Yankes Jersey',
        description : 'This Aaron Judge Home Player jersey from Majestic will be the perfect piece to add to your collection of New York Yankees gear! It features Cool Base technology for a lightweight, breathable feel, as well as tackle twill graphics that will score points with every New York Yankees fan in the stands.',
        price       : 119.99
    }),
    new Product({
        imagePath   : 'http://nhl.frgimages.com/FFImage/thumb.aspx?i=/productImages%2F_2818000%2Fff_2818373_full.jpg&w=600',
        title       : 'Edmonton Oilers Wayne Gretzky Jersey',
        description : "Sport the ultimate tribute to the Edmonton Oilers and Wayne Gretzky when you put on this Heroes of Hockey Authentic Throwback jersey from CCM. You know who the best player in hockey is, and now it's time for you to bring that knowledge to the world with this stunning Edmonton Oilers jersey.",
        price       : 249.99
    }),
    new Product({
        imagePath   : 'http://nhl.frgimages.com/FFImage/thumb.aspx?i=/productimages/_2405000/altimages/ff_2405687alt1_full.jpg&w=600',
        title       : 'Montreal Canadians P.K. Subban Jersey',
        description : "Introducing the Breakaway by Fanatics - the official jersey made just for the fans. From the world's largest collection of officially licensed gear comes the first jersey inspired and built by fans for fans. We asked NHL devotees what they wanted in a new jersey. We listened and we delivered, creating a jersey with an exclusive set of features designed for the fan.",
        price       : 179.99
    }),
    new Product({
        imagePath   : 'http://nhl.frgimages.com/FFImage/thumb.aspx?i=/productImages/_709000/ff_709631_xl.jpg&w=340',
        title       : 'Boston Bruins Chara Jersey',
        description : "Introducing the Breakaway by Fanatics - the official jersey made just for the fans. From the world's largest collection of officially licensed gear comes the first jersey inspired and built by fans for fans. We asked NHL devotees what they wanted in a new jersey. We listened and we delivered, creating a jersey with an exclusive set of features designed for the fan.",
        price       : 159.99
    }),
    new Product({
        imagePath   : 'https://s7d2.scene7.com/is/image/dkscdn/16NIKMNFLSTLRSLBLAPTX_is/',
        title       : "Le'Veon Bell Pittsburgh Steelers Jersey",
        description : "Help your kiddo prove that he’s the #1 Pittsburgh Steelers fan with this Game Football jersey! He will boast his team spirit while wearing this Pittsburgh Steelers jersey from Nike. It features printed Pittsburgh Steelers and Antonio Brown graphics, showing the world who he’s rooting for. NFL Shop is your source for officially licensed Pittsburgh Steelers gear.",
        price       : 119.99
    }),
    new Product({
        imagePath   : 'http://nba.frgimages.com/FFImage/thumb.aspx?i=/productImages/_2800000/ff_2800753_full.jpg&w=340',
        title       : 'Stephen Curry Golden State Warriors Jersey',
        description : "Help your kid represent his team's on-court look with this Golden State Warriors Fast Break Replica jersey from Fanatics Branded. It boasts sterling graphics and a classic look that will showcase his NBA fandom.",
        price       : 229.99
    }),
    new Product({
        imagePath   : 'https://images.footballfanatics.com/FFImage/thumb.aspx?i=/productImages%2F_2671000%2Fff_2671537_full.jpg&w=600',
        title       : 'Vancover Whitecaps MLS Jersey',
        description : "Show your support for 'caps with the new 2017 Authentic Short Sleeve Rain Jersey from adidas. It features adizero fabric technology along with authentic Vancouver Whitecaps FC graphics to keep you comfortable and energetic throughout every minute of action. ",
        price       : 129.99
    }),
    new Product({
        imagePath   : 'https://images.footballfanatics.com/FFImage/thumb.aspx?i=/productimages/_2873000/ff_2873002_full.jpg&w=600',
        title       : 'Manchester United Jersey',
        description : "Whether they inspire dread or respect, the Red Devils dominate on their home pitch. This men's home jersey is styled after the one the Old Trafford giants wear. It mixes classic football looks with terrace-inspired details like contrast-colour cuffs and a granddad collar.",
        price       : 99.99
    }),
];

var users = [
    new User({
        username    : 'admin@admin.com',
        password    : 'admin',
        fullname    : 'admin',
        admin       : true
    }),
    new User({
        username    : 'max@admin.com',
        password    : 'max',
        fullname    : 'Max Lefebvre',
        admin       : true
    }),
    new User({
        username    : 'guest@guest.com',
        password    : 'guest',
        fullname    : 'Guest',
        admin       : false
    }),
];

// Remove existing products
Product.remove({}, function(err){
    if(err) {
      console.log('ERROR: Remove failed -- Products')
      return
    }
    //ALL PRODUCT DOCUMENTS REMOVED
  });

// Remove existing users
User.remove({}, function(err){
    if(err) {
      console.log('ERROR: Remove failed -- Users')
      return
    }
    //ALL PRODUCT DOCUMENTS REMOVED
  });

let i, j;
// Add products to Products collection
for (i = 0; i < products.length; i++){
    products[i].save(function(err, product) {
        console.log(product);
        checkForExit();
    });
}
for (j = 0; j < users.length; j++){
    User.createUser(users[j], function(err, user){
        if(err) throw err;
        console.log(user);
        checkForExit();
    });
}

// Clear order history
Order.remove({}, function(err){
    if(err) {
      console.log('ERROR: Remove failed -- Users')
      return
    }
    //ALL PRODUCT DOCUMENTS REMOVED
  });

function checkForExit() {
    if (i == products.length && j == users.length)
        mongoose.disconnect();
}

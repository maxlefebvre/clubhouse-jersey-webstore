var express     = require('express');
var router      = express.Router();
var Cart        = require('../models/cart');
var Order       = require('../models/order');
var paypal      = require('paypal-rest-sdk');

var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/shoppingApp');

// let paymentId = 0;
// GET checkout page
router.get('/', ensureAuthenticated, function (req, res, next) {
    console.log(`ROUTE: GET CHECKOUT PAGE`)
    var cart = new Cart(req.session.cart)
    var totalPrice = cart.totalPrice;
    res.render('checkout', {
        title: 'Checkout Page',
        items: cart.generateArray(),
        totalPrice: cart.totalPrice,
        bodyClass: 'registration',
        containerWrapper: 'container',
        userFirstName: req.user.fullname
    });
})

// POST checkout-process
router.post('/checkout-process', function (req, res) {
    console.log(`ROUTE: POST CHECKOUT-PROGRESS`)
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice;

    paymentReq = populatePaymentObj(cart);
    create_payment_json = JSON.stringify(paymentReq, null, 2);

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            for (var index = 0; index < payment.links.length; index++) {
                //Redirect user to this endpoint for redirect url
                if (payment.links[index].rel === 'approval_url') {
                    // Redirect user to paypal website
                    res.redirect(302, payment.links[index].href)
                    console.log(payment.links[index].href);
                }
            }
            console.log(payment);
        }
    });
});

// GET checkout-success
router.get('/checkout-success', ensureAuthenticated, function (req, res) {
    console.log(`ROUTE: GET CHECKOUT-SUCCESS`)

    // Clear shopping cart
    var cart = new Cart(req.session.cart);
    var totalPrice = cart.totalPrice;

    var execute_payment_json = {
        payer_id: req.query.PayerID,
        transactions: [{
            amount: {
                currency: "CAD",
                total: totalPrice.toFixed(2)
            }
        }]
    };
    paypal.payment.execute(req.query.paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            // Add to order history
            let shippingInfo = payment.payer.payer_info.shipping_address;
            let shippingAddress = shippingInfo.line1 + ", " + shippingInfo.city + ", " 
                                + shippingInfo.state + ", " + shippingInfo.country_code + ". "
                                + shippingInfo.postal_code;

            var newOrder = new Order({
                orderID             : payment.id,
                username            : req.user.username,
                address             : shippingAddress,
                orderDate           : payment.create_time,
                shipping            : true,
              });
            newOrder.save();
            cart = new Cart({});
            req.session.cart = cart;
            res.render('checkoutSuccess', {
                title: 'Successful',
                containerWrapper: 'container',
                userFirstName: req.user.fullname
            });
        }
    
    });
});

// PAYMENT CANCEL
router.get('/checkout-cancel', ensureAuthenticated, function (req, res) {
    console.log(`ROUTE: GET CHECKOUT-CANCEL`)
    res.render('checkoutCancel', {
        title: 'Successful',
        containerWrapper: 'container',
        userFirstName: req.user.fullname
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        console.log(`ERROR: USER IS NOT AUTHENTICATED`)
        req.flash('error_msg', 'You are not logged in');
        res.redirect('/');
    }
}

function populatePaymentObj(cart) {
    var paymentReq = {
        intent: "authorize",
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "http://localhost:3000/checkout/checkout-success",
            cancel_url: "http://localhost:3000/checkout/checkout-cancel"
        },
        transactions: [{
            item_list: {
                items: []
            },
            amount: {
                currency: "CAD",
                total: 0.00
            },
            description: "Your order from The Clubhouse Jersey Store."
        }]
    };
    let i = 0;
    for (let key in cart.items) {
        let newItem = {
            name: cart.items[key].item.title,
            sku: key,
            price: cart.items[key].item.price,
            currency: "CAD",
            quantity: cart.items[key].qty,
        }
        paymentReq.transactions[0].item_list.items[i++] = newItem;
    }
    paymentReq.transactions[0].amount.total = cart.totalPrice.toFixed(2);
    return paymentReq;
}

module.exports = router;
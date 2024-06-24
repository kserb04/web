const express = require('express');
const router = express.Router();
const data = require('../data/mydata');
const { route } = require('./home.routes');

const categories = [];
for (const cat of data.categories) {
    categories.push(cat.name);
}

router.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
        
    } 
    if (!req.session.q) {
        req.session.q = 0;
    }
    next();
});

router.get('/', function(req, res, next) {
    res.render('cart', { cartItems: req.session.cart, cartCount: req.session.cart.length, q: req.session.q || 0 });
});

router.post('/add/:id', function(req, res, next) {
    const productId = req.params.id;
    const cartItem = req.session.cart.find(item => item.id === productId);
    req.session.q+=1;
    data.categories.forEach(category => {
        category.products.forEach(product => {
            if (product.id == productId) {
                catId = category.name;
                prodName = product.name;
            } 
        });
    });
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        req.session.cart.push({ id: productId, name: prodName, quantity: 1});
    }
    res.redirect(req.query.source === 'home' ? `/getProducts/${catId}` : '/cart');
});

router.post('/remove/:id', function(req, res) {
    const productId = req.params.id;
    const cartItem = req.session.cart.find(item => item.id === productId);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity-=1;
        } else {
            req.session.cart = req.session.cart.filter(item => item.id !== productId);
        }
        req.session.q-=1;
    }
    res.redirect('/cart');
});

router.get('/getAll', function(req, res, next) {
    res.redirect('/cart');
});

module.exports = router;
const express = require('express');
const router = express.Router();
const data = require('../data/mydata');
const cartRouter = require('./cart.routes');

const categories = [];
for (const cat of data.categories) {
    categories.push(cat.name);
}
const defaultCat = categories[0];

router.get('/', function(req, res, next) {
    const catId = defaultCat;
    res.redirect(`/home`);
});

router.get('/home', function(req, res, next) {
    res.redirect('/getCategories');
});

router.get('/getCategories', function(req, res, next) {
    res.redirect(`/getProducts/${defaultCat}`);
});

router.get('/getProducts/:id', function(req, res, next) {
    const catId = req.params.id;
    const catProducts = data.categories.filter(cat => cat.name === catId);
    const productsList = catProducts[0].products;
    let q = 0;
    const listQ = [];
    if (req.session.cart) {
        req.session.cart.forEach(product => {
            q+=product.quantity;
            data.categories.forEach(cat => {
                cat.products.forEach(prod => {
                    if (product.id == prod.id) {
                        listQ[prod.id] = product.quantity;
                    }
                });
            });
        });
    }
    req.session.q = q;
    req.session.listQ = listQ;
    res.render('home',  { categories, productsList, catId, q: req.session.q || 0, listQ: req.session.listQ || [] });
});

module.exports = router;
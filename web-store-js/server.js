const express = require('express');
const app = express();
var path = require('path');
const session = require('express-session');

const homeRouter = require('./routes/home.routes');
const cartRouter= require('./routes/cart.routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true}));

app.use(session({
    secret: 'lab',
    resave: false,
    saveUninitialized: true
}));

app.use('/', homeRouter);
app.use('/cart', cartRouter);

app.listen(3000);
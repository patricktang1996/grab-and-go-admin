const express = require('express');
const app = express();
const PORT = 5000;
const mysql = require('mysql2');
const cors = require('cors');

const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "grab_and_go"
});
db.connect((err) => {
    if (err){
        throw err;
    }
    console.log('Connected to DB');
});

app.use(cors());

const contacts = require('./getAllContacts'); //require('file name')
const tags = require('./getAllTags');
const orders = require('./getAllOrders');
const prices = require('./getAllPrices');
const priceCategories = require('./getAllPriceCategories');
const products = require('./getAllProducts');
const existingOrder = require('./getExistingOrder');
const existingOrderProduct = require('./getExistingOrderProduct');
const companyOrders = require('./searchCompanyOrders');
const addNewOrder = require('./addNewOrder');

app.use('/api/getAllContacts', contacts); //use ('API msg pass')
app.use('/api/getAllTags', tags);
app.use('/api/getAllOrders', orders);
app.use('/api/getAllPrices', prices);
app.use('/api/getAllPriceCategories', priceCategories);
app.use('/api/getAllProducts', products);
app.use('/api/getExistingOrder', existingOrder)
app.use('/api/getExistingOrderProduct', existingOrderProduct)
app.use('/api/searchCompanyOrders', companyOrders)
app.use('/api/addNewOrder', addNewOrder)
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log("Server initialised");
});
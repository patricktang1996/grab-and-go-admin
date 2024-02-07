const express = require('express');
const app = express();
const PORT = 5000;
const mysql = require('mysql2');

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

// const main = require("./backMain.js");

//If request received for '/getAllContacts, execute file getAllContacts.js
const contacts = require('./getAllContacts'); //require('file name')
app.use('/api/getAllContacts', contacts); //use ('API msg pass')

//if request received for '/getAllTags, execute file getAllOrders.js
const tags = require('./getAllTags'); 
app.use('/api/getAllTags', tags);

//if request received for '/getAllOrders, execute file getAllOrders.js
const orders = require('./getAllOrders'); 
app.use('/api/getAllOrders', orders);

//if request received for '/getAllPrices, execute file getAllPrices.js
const prices = require('./getAllPrices'); 
app.use('/api/getAllPrices', prices);

//if request received for '/getAllPriceCategories, execute file getAllPrices.js
const priceCategories = require('./getAllPriceCategories'); 
app.use('/api/getAllPriceCategories', priceCategories);

//if request received for '/getAllProducts, execute file getAllProducts.js
const products = require('./getAllProducts'); 
app.use('/api/getAllProducts', products);

//if request received for '/getAllOrderDetails, execute file getAllOrderDetails.js
const orderDetails = require('./getAllOrderDetails'); 
app.use('/api/getAllOrderDetails', orderDetails)

//request received to generate packing slip from existing order
const existingOrder = require('./getExistingOrder');
app.use('/api/getExistingOrder', existingOrder)

//if request received for '/getExistingOrderProduct, execute file getExistingOrderProduct.js
const existingOrderProduct = require('./getExistingOrderProduct'); 
app.use('/api/getExistingOrderProduct', existingOrderProduct)

//if request received for '/searchCompanyOrders, execute file searchCompanyOrders.js
const companyOrders = require('./searchCompanyOrders'); 
app.use('/api/searchCompanyOrders', companyOrders)

//if request received for '/addNewOrder, execute file addNewOrder.js
const addNewOrder = require('./addNewOrder'); 
app.use('/api/addNewOrder', addNewOrder)

app.use(bodyParser.json());
// app.use("/getAllContacts", main);

app.listen(PORT, () => {
    console.log("Server initialised");
});
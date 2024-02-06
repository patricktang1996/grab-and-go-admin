//All API files need following + db connection
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "grab_and_go"
});

//Responds to specific GET request
router.get('/', express.json(), (req, res) => {
    // Assuming the request body is in JSON format
    const orderData = req.body;

    //gather variables from the api query
    const purchase_order = orderData.purchase_order;
    const date = orderData.date;
    const freight_cost = orderData.freight_cost;
    // const organisation_name = orderData.organisation_name;
    const customer_id = orderData.customer_id;
    const products = orderData.products;

    // Generate job_number
    const job_number_sql = 'SELECT MAX(job_number) AS job_number from `orders`;';
    db.query(job_number_sql, (err, results) => {
        if (err) throw err;
        if (results.length == 0) throw err;
        const job_number = results[0].job_number + 1;


        // get customer id from the database
        // const customer_id_sql = 'SELECT id from `customer_contact_information` WHERE organisation_name = ?;';
        // let customer_id;
        // db.query(customer_id_sql, [organisation_name], (err, results) => {
        //     if (err) throw err;
        //     if (results.length == 0) throw err;
        //     customer_id = results[0];
        // });


        // input order into the database
        const sql = 'INSERT INTO `orders` (job_number, purchase_order, customer_id, date, freight_cost,' +
        'invoiced_barlows, delivered, invoiced_myob, paid) VALUES (?, ?, ?, ?, ?, 0, 0, 0, 0);';
        db.query(sql, [job_number, purchase_order, customer_id, date, freight_cost], (err, results) => {
            if (err) throw err;
            
            // input the info for each product into the database 
            products.forEach(element => {
                const product_sql = 'INSERT INTO `order_details` (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?);';
                const product_id = element.product_id;
                const quantity = element.quantity;
                const price = element.price;
                db.query (product_sql, [job_number, product_id, quantity, price], (err, results) => {
                    if (err) throw err;
                });
            });
        });

        // send back a response to confirm it was added
        res.status(200).json({ status: 'Job successfully added' });
        // Send back the packing slip or a response as needed
        // res.status(200).json({ job_number: 'Job number is '+job_number }
        });

    
});

module.exports = router;
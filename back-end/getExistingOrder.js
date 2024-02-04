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

    //check if   job_numberFromFront  is in order database?
    const job_numberFromFront = orderData.job_number

    // Now you can use the 'job_number' in your logic
    const job_number = orderData.job_number;

  
    const sql = 'SELECT `orders`.`purchase_order`, `orders`.`date`, `orders`.`freight_cost`, ' +
    '`customer_contact_information`.`organisation_name`, `customer_contact_information`.`billing_address`, ' +
    '`customer_contact_information`.`shipping_address`, `customer_contact_information`.`email`, `customer_contact_information`.`phone_number` ' +
    'FROM orders, customer_contact_information WHERE orders.job_number = ? AND customer_contact_information.id = orders.customer_id;';

    db.query(sql, [job_number, job_number], (err, results) => {
        if (err) throw err;

        // send results if there are any
        if (results.length > 0) {
            res.json(results);
        } // send an error message if there aren't
        else {
            res.status(200).json({ status: 'No Job with this Job Number' });
        }
    })

    // Send back the packing slip or a response as needed
    // res.status(200).json({ job_number: 'Job number is '+job_number }
});

module.exports = router;
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
    const searchData = req.body;
    const organisation_name = searchData.organisation_name;

    // Search for contact, Organisation type as these have shipping address.
    const type = 'Organisation'
    const sqlCompany = 'SELECT id FROM customer_contact_information WHERE organisation_name = ? AND type = ?';
    db.query(sqlCompany, [organisation_name, type], (err, results) => {
        if (results.length > 0) {
            const companyId = results[0].id;

            // Second query to find all orders from company ID
            const sqlOrders = 'SELECT * FROM orders where customer_id = ?';
            db.query(sqlOrders, [companyId], (errOrders, resultsOrders) => {
                if (resultsOrders.length > 0) {
                    // Process or send the orders as needed
                    res.status(200).json({ orders: resultsOrders });
                } else {
                    // Handle the case where no orders are found, e.g., send a 404 Not Found response
                    res.status(404).json({ error: 'No orders found for the contactId' });
                }
            });
    
        // Handle the case where no matching record is found, e.g., send a 404 Not Found response
        } else {
            res.status(404).json({ status: 'No company found.'});
        }
    });
});

module.exports = router; 
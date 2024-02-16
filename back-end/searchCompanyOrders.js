//All API files need following + db connection
const express = require('express');
const { timeConvert } = require('./timeConvert');
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

    //Search company_name and get id from database
    const sqlCompany = 'SELECT id FROM customer_contact_information WHERE organisation_name = ?';
    db.query(sqlCompany, [organisation_name], (err, results) => {
        if (results.length > 0) {
            const id = results[0].id;
            console.log(organisation_name  + " and id: " +id);

            //Get all orders +details from company ID
            const sqlOrders = 'SELECT orders.*,\
                    GROUP_CONCAT(order_details.product_id) AS products, \
                    GROUP_CONCAT(order_details.quantity) AS quantities, GROUP_CONCAT(order_details.price) AS prices \
                FROM orders \
                    INNER JOIN order_details ON orders.job_number = order_details.order_id \
                WHERE orders.customer_id = ? \
                GROUP BY orders.job_number';
            db.query(sqlOrders, [id], (errOrders, resultsOrders) => {
                if (resultsOrders.length > 0) {
                    // Process or send the orders as needed
                    // res.status(200).json({ orders: resultsOrders });
                    const orders = {};
                    resultsOrders.forEach(row => {
                        const { job_number, purchase_order, customer_id, date, freight_cost, invoiced_barlows,
                            delivered, invoiced_myob, paid, products, quantities, prices } = row;
                        let convertedDate = timeConvert(date); //amends date to equal SQL database (+1day)
                        if (!orders[job_number]) {
                            orders[job_number] = {
                                job_number,
                                purchase_order,
                                customer_id,
                                date: convertedDate,
                                freight_cost,
                                invoiced_barlows,
                                delivered,
                                invoiced_myob,
                                paid,
                                products: [],
                            };
                        }
                        // Split the concatenated product details into arrays
                        const productList = products.split(',');
                        const quantityList = quantities.split(',');
                        const priceList = prices.split(',');
                        // Push each product with its quantity and price to the products array
                        for (let i = 0; i < productList.length; i++) {
                            orders[job_number].products.push({
                                product_id: productList[i],
                                quantity: parseInt(quantityList[i]),
                                price: parseFloat(priceList[i])
                            });
                        }
                    });
                // Convert orders object to array and send as JSON
                res.json(Object.values(orders));
                } else {
                    // Handle the case where no orders are found, e.g., send a 404 Not Found response
                    res.status(404).json({ error: 'No orders found for ' + organisation_name });
                }
            });
    
        // Handle the case where no matching record is found, e.g., send a 404 Not Found response
        } else {
            res.status(404).json({ status: 'No company found for ' + organisation_name});
        }
    });
});

module.exports = router; 
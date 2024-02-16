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
router.get('/', (req, res) => {
    // Query order table and order_details table together
    const sql = `SELECT
        orders.*,
        GROUP_CONCAT(order_details.product_id) AS products,
        GROUP_CONCAT(order_details.quantity) AS quantities,
        GROUP_CONCAT(order_details.price) AS prices
        FROM orders
        INNER JOIN order_details ON orders.job_number = order_details.order_id
        GROUP BY orders.job_number`;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        const orders = {};
        results.forEach(row => {
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
    });
});


module.exports = router;
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
router.get('/', (req, res) =>{
    const sql = 'SELECT `orders`.`purchase_order`, `orders`.`date`, `orders`.`freight_cost`, ' +
    '`customer_contact_information`.`organisation_name`, `customer_contact_information`.`billing_address`, ' +
    '`customer_contact_information`.`shipping_address`, `customer_contact_information`.`email`, `customer_contact_information`.`phone_number` ' +
    'FROM orders, customer_contact_information WHERE orders.job_number = ? AND customer_contact_information.id = orders.customer_id';

    db.query(sql, [job_number], (err, results) => {
        if (err) throw err;
        res.json(results);
    })
});

module.exports = router;
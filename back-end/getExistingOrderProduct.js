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
router.get('/', express.json(), (req, res) =>{
    // Assuming the request body is in JSON format
    const orderData = req.body;

    //check if   job_numberFromFront  is in order database?
    const job_numberFromFront = orderData.job_number

    // Now you can use the 'job_number' in your logic
    const job_number = orderData.job_number;


    const sql = 'SELECT `products`.`name`, `products`.`sku`, `order_details`.`price`, `order_details`.`quantity` ' + 
    'FROM `products`, `order_details` WHERE `order_details`.`order_id` = ? AND `products`.`id` = `order_details`.`product_id`';

    db.query(sql, [job_number], (err, results) => {
        if (err) throw err;
        
        // send results if there are any
        if (results.length > 0) {
            res.json(results);
        } // send an error message if there aren't
        else {
            res.status(200).json({ status: 'No Job with this Job Number' });
        }
        
    })
});

module.exports = router;
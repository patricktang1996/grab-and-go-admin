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

router.get('/', express.json(), (req, res) => {
    // Assuming the request body is in JSON format
    const orderData = req.body;

    //check if   job_numberFromFront  is in order database?
    const job_numberFromFront = orderData.job_number

    // Now you can use the 'job_number' in your logic
    const job_number = orderData.job_number;



    // Send back the packing slip or a response as needed
    res.status(200).json({ job_number: 'Job number is '+job_number });
});

module.exports = router;
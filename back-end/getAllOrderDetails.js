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
    const sql = 'SELECT * FROM order_details';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    })
});

module.exports = router;
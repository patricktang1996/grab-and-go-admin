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

//If request received for '/getAllContacts, execute file contacts.js
const contacts = require('./getAllContacts'); //require('file name')
app.use('/api/getAllContacts', contacts) //use ('API msg pass')



app.use(bodyParser.json());
// app.use("/getAllContacts", main);

app.listen(PORT, (app) => {
    console.log("pls work");
})
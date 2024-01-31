const express = require('express');
const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');

const main = require("./backMain.js");

app.use(bodyParser.json());
app.use("/getAllContacts", main);

app.listen(PORT, (app) => {
    console.log("pls work");
})
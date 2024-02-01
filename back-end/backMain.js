/* ENTIRE FILE IS NOW REDUNDANT */

// const express = require("express");
// const router = express.Router();

// // Function to connect to the database
// function connectToDatabase() {
//     return new Promise((resolve, reject) => {
//       var mysql = require('mysql')
//       var con = mysql.createConnection({
//       host: "127.0.0.1",
//       user: "root",
//       password: "",
//       database: "grab_and_go"
//       })
  
//       con.connect(function(err){
//         if (err) reject (err);
//         console.log("Connected")
//         resolve(con)
//       })
//     });
//   }
  
//   // Function to fetch all contacts from the database
//   function fetchContacts(con) {
//     return new Promise((resolve, reject) => {
//       var sql = "SELECT * FROM customer_contact_information";
//       con.query(sql, function (err, result, fields) {
//         if (err) {
//           reject(err);
//         } else {
//           // Process the results
//           const resultArray = result;
//           // console.log(result)
//           resolve(resultArray);
  
//            // Process the results ALT
//         //   for (const row of result) {
//         //      names = row.name;
//         //      console.log(names);
//         // }
//         }
//       });
//     });
//   }
  
// // Function to create a JSON object
//   function createJSONObject(contactArray) {
//     return new Promise((resolve, reject) => {
//       const contactsArray = [];
  
//       // packing slip JSON object created for each contact
//       for (const contact of contactArray) {
//         const contactPacket = {
//           "id": contact.id,
//           "name": contact.name,
//           "organisation_name": contact.organisation_name,
//           "type": contact.type,
//           "billing_address": contact.billing_address,
//           "shipping_address": contact.shipping_address,
//           "email": contact.email,
//           "tags": contact.tags,
//           "website": contact.website,
//           "phone_number": contact.phone_number,
//           "price_category": contact.price_category,
//           "delivery_instructions": contact.delivery_instructions,
//           "pays_freight": contact.pays_freight,
//           "date_created": contact.date_created,
//           "date_updated": contact.date_updated
//         };
//         contactsArray.push(contactPacket);
//       }
//       resolve(contactsArray);
//     });
//   }
//   function respondJsonRequestForAllContacts(contactArrayJSON, app){
    

//     // Define a route for handling GET requests
//     app.get('/getAllContacts', (req, res) => {
//       const {request} = req.body;
//       console.log(req.body);
//       if (request == "get all contacts") {
//         // data for testing response method
//         const responseData = { message: 'Data from the backend!' };

//         // Send the data as JSON in the response
//         // res.json(responseData);
//         res.json(contactArrayJSON);
//       } 
//     });

//     // Start the server
//     app.listen(PORT, (app) => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   }
  
//   // Usage of the functions with async/await
//   async function main(app) {
//     try {
//       const con = await connectToDatabase();
//       const contactsList = await fetchContacts(con);
//       const contactArrayJSON = await createJSONObject(contactsList);
      

//       respondJsonRequestForAllContacts(contactArrayJSON, app);

  
//       // It prints the detail
//       for (const contact of contactArrayJSON){
//         console.log(contact.name);
//       }
//       // Close the database connection
//       con.end();
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
  
//   // Run the main function
//   // main(app);
//   router.post("/", async(req, res) => {
//     console.log("test before");
//     main(app);
//     console.log("test after");
//   });
//   module.exports = router;

/* ENTIRE FILE IS NOW REDUNDANT */
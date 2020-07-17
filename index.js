const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require("cors");

const createCustomer = require("./Customer/addCustomer");
const getCustomer    = require("./Customer/getCustomer");

const addCategory    = require("./Product/addCategory");
const addProduct     = require("./Product/addProduct");
const getAllProduct  = require("./Product/getAllProduct");
const getProductByID = require("./Product/getProductById");
const updateProduct  = require("./Product/updateProduct");

const addOrder       = require("./Order/createOrder");
const updateOrder    = require("./Order/updateOrder");

app.use(cors({origin:true}));

app.post("/createcustomer",createCustomer);
app.get("/getcustomer",getCustomer);

app.post("/addcategory",addCategory);
app.post("/addproduct",addProduct);
app.get("/getallproduct",getAllProduct);
app.get("/getproductbyid",getProductByID);
app.post("/updateproduct",updateProduct);

app.post("/addorder",addOrder);
app.post("/updateorder",updateOrder);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



exports.api = functions.https.onRequest(app);

/*=====================

//CREATE CUSTOMER

curl -X POST -H "Content-Type:application/json" http://localhost:9000/internshipdemo-26c22/us-central1/api/createcustomer -d 
    '{
        "fname"     :   "abc",
        "lname"     :   "cds"
        "phone"     :   "9108205639",
        "address"   :   "87,12th main",
    }'

// ADD CATEGORY

curl -X POST -H "Content-Type:application/json" http://localhost:9000/internshipdemo-26c22/us-central1/api/addcategory -d 
    '{
        "catName" : "hello",
    }'

// ADD PRODUCT

curl -X POST -H "Content-Type:application/json" http://localhost:9000/internshipdemo-26c22/us-central1/api/addproduct -d 
    '{
        "product_name" : "hello",
        "cat_id"       : 1,
        "no_of"_items" : 5,
    }'

// UPDATE PRODUCT

curl -X POST -H "Content-Type:application/json" http://localhost:9000/internshipdemo-26c22/us-central1/api/updateproduct -d '{"id":1,"no_of_items":5}'

curl -X POST -H "Content-Type:application/json" http://localhost:9000/internshipdemo-26c22/us-central1/api/addorder -d 
    '{
        "customer_id" : "1",
        "product_ids"  : [1],
    }'

curl -X POST -H "Content-Type:application/json" http://localhost:9000/internshipdemo-26c22/us-central1/api/updateorder? -d '{
        "order_id" : "1",
        "product_id"  : 1,
    }' 
   
*=======================*/
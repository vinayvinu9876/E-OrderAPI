var db = require("../adminDb");

const getAllProducts = ( req , res ) => {

    var productRef = db.collection("Product");

    var products = [];

    productRef.get().then((snap)=>{
        snap.forEach((doc)=>{
            products.push(doc.data());
        });
        res.send({status:"success",data:products});
        return "done";
    })
    .catch((err)=>{
        console.error(err);
        res.send({status:"failure",message:err.message}).status(400).end();
    })

};

module.exports = getAllProducts;
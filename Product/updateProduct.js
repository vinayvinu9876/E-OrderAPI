var db = require("../adminDb");
var admin = require("../admin");

const updateProduct = ( req , res ) => {
    var productID = parseInt(req.body.id);
    var to_add = parseInt(req.body.no_of_items);

    console.log("Product ID = ",productID," to add = ",to_add);

    var productRef = db.collection("Product").doc(productID.toString());

    db.runTransaction((transaction)=>{
        return transaction.get(productRef).then((doc)=>{
            if(!doc.exists)
                throw new Error("Product Doesnt Exist");
            transaction.update(productRef,{no_of_items:admin.firestore.FieldValue.increment(to_add)});
            return "done";
        });
    }).then(()=>{
        console.log("Done updating product");
        res.send({status:"success"}).status(200).end();
        return;
    })
    .catch((err)=>{
        console.error(err);
        res.send({status:"falure",message:err.message}).status(400).end();
    })
}

module.exports = updateProduct;
var db = require("../adminDb");
var admin = require("../admin");
var isEmpty = require("../util/isEmpty");

const updateOrder = ( req , res ) =>{
    var order_id = req.body.order_id;
    var product_id = req.body.product_id;

    console.log("Order ID = ",order_id," Product ID = ",product_id);

    if(isEmpty(order_id) || isEmpty(product_id)){
        console.log("Something was empty");
        res.send({status:"failure",message:"Something was empty"}).status(400).end();
        return;
    }

    var orderRef = db.collection("Orders").doc(order_id);

    db.runTransaction((transaction)=>{
        return transaction.get(orderRef).then((doc)=>{
            if(!doc.exists)
                throw new Error("Order Doesnt Exist");
            transaction.update(orderRef,{product_ids:admin.firestore.FieldValue.arrayUnion(product_id)});
            return "done";  
        })

    }).then(()=>{
        console.log("Order updated succesfuly");
        res.send({status:"success"}).status(200).end();
        return;
    })
    .catch((err)=>{
        console.error(err);
        res.send({status:"failure",message:err.message}).status(400).end();
    })
};

module.exports = updateOrder;
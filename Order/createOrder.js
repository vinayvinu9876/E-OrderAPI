var db = require("../adminDb");
var isEmpty = require("../util/isEmpty");

const createOrder = ( req , res ) => {

    if(isEmpty(req.body.customer_id) && isEmpty(req.body.product_ids) || (typeof(req.body.product_ids)!=='object') ){
        res.send({status:"failure",message:"Invalid Data"}).status(400).end();
        return;
    }

    var payload = {
        order_id : null,
        customer_id : req.body.customer_id,
        product_ids : req.body.product_ids,
    };

    var orderRef = db.collection("Orders");
    var orderQuery = orderRef.orderBy("order_id","desc").limit(1);

    return db.runTransaction((transaction)=>{
        return transaction.get(orderQuery).then((snap)=>{
            var newID = 1;
            snap.forEach((doc)=>{
                newID = doc.data().order_id + 1;
            });
            payload["order_id"] = newID;
            transaction.set(orderRef.doc(newID.toString()),payload);
            return "success";
        })
    })
    .then(()=>{
        console.log("Succesfully added order");
        res.send({status:"success"}).status(200).end();
        return;
    })
    .catch((err)=>{
        console.error(err);
        res.send({status:"failure",message:err.message}).status(400).end();
        return;
    })
};

module.exports = createOrder;
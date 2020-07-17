var db = require("../adminDb");
var isEmpty = require("../util/isEmpty");

const addProduct = ( req , res ) => {
    if(isEmpty(req.body.product_name) || isEmpty(req.body.cat_id) || isEmpty(req.body.no_of_items)){
        res.send({status:"failure",message:"Invalid product data"}).status(400).end();
        return;
    }

    var payload = {
        id : null,
        product_name : req.body.product_name,
        cat_id : req.body.cat_id,
        no_of_items : parseInt(req.body.no_of_items),
    };

    var catRef = db.collection("Category").doc(req.body.cat_id.toString());
    var productRef = db.collection("Product");
    var productIdQuery = productRef.orderBy("id","desc").limit(1);

    catRef.get().then((doc)=>{
        if(!doc.exists) throw new Error("Category Doesnt Exist");

        return db.runTransaction((transaction)=>{
            return transaction.get(productIdQuery).then((snap)=>{
                var newID = 1;
                snap.forEach((doc)=>{
                    newID = doc.data().id + 1;
                });
                payload["id"] = newID;
                transaction.set(productRef.doc(newID.toString()),payload);
                return "done";
            })
        })
        .then(()=>{
            console.log("Done adding product");
            res.send({status:"success"}).status(200).end();
            return "success"
        })
        .catch((err)=>{
            console.error(err);
            res.send({status:"failure",message:err.message}).status(400).send();
        })

    })
    .catch((err)=>{
        console.error(err);
        res.send({status:"failure",message:err.message}).status(400).end();
    })
}

module.exports = addProduct;
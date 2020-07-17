var db = require("../adminDb");
var isEmpty = require('../util/isEmpty');

const addCustomer = (req,res) => {

    if(isEmpty(req.body.fname) && isEmpty(req.body.lname) && isEmpty(req.body.phone) && isEmpty(req.body.address)){
        console.log("something was empty");
        return {status:"failure",message:"Invalid Data"};
    }

    var payload = {
        id      : null,
        fname   : req.body.fname,
        lname   : req.body.lname,
        phone   : req.body.phone,
        address : req.body.address,
    };

    var custRef = db.collection("Customer")
    var newIDQuery = custRef.orderBy("id","desc").limit(1);

    return db.runTransaction((transaction)=>{
        return transaction.get(newIDQuery).then((snap)=>{
            console.log("snap size = ",snap.size);
            var newID = 1;
            snap.forEach((doc)=>{
                newID = doc.data().id + 1;
            });
            payload.id = newID;
            transaction.set(custRef.doc(newID.toString()),payload);
            return "success";
        })
    }).then((status)=>{
        console.log("customer added succesfully");
        res.send({status:"success"}).status(200).end();
        return;
    })
    .catch((err)=>{
        console.error(err);
        res.send({status:"failure"}).status(400).end();
    })
    
}

module.exports = addCustomer;
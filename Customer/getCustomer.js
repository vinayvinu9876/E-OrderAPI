var db = require("../adminDb");
var isEmpty = require('../util/isEmpty');

const getCustomer =async (req,res) => {
    var id = req.query.id;
    console.log("ID = ",id);

    if(isEmpty(id)){
        console.log("ID = ",id);
        res.send({status:"failure"}).status(400).end();
        return;
    }
    var ref = db.collection("Customer").doc(id);
    
    await ref.get().then((doc)=>{
        console.log("DOC Exists = ",doc.exists);
        if(!doc.exists){
            res.send({status:"failure"}).status(400).end();
            return "done";
        }
        res.send({status:"success",data:doc.data()}).status(200).end();
        return "done";
    })
    .catch((err)=>{
        console.error(err);
        res.send({status:"failure"}).status(400).end();
    })
};

module.exports = getCustomer;
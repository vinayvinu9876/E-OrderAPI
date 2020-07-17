var db = require("../adminDb");
var isEmpty = require('../util/isEmpty');

const addCategory = (req , res) => {
    if(isEmpty(req.body.catName)){
        res.send({status:"failure",message:"Invalid Data"}).status(400).end();
        return;
    }

    var payload = {
        id : null,
        catName : req.body.catName,
        date   :  new Date(),
    };

    var catRef = db.collection("Category");
    var catIdQuery = catRef.orderBy("id","desc").limit(1);

    catRef.where("catName",'==',req.body.catName).get().then((snap)=>{
        if(snap.size>0)
            throw new Error("Category with the name Already Exists");
        
       return db.runTransaction((transaction)=>{
            return transaction.get(catIdQuery).then((snap)=>{
                var newID = 1;
                snap.forEach((doc)=>{
                    newID = doc.data().id + 1;
                });
                payload["id"] = newID;
                transaction.set(catRef.doc(newID.toString()),payload);
                return "success";
            })
        })
        .then((val)=>{
            console.log("Succesfully added category");
            res.send({status:"successs"}).status(200).end();
            return "done";
        })
        .catch((err)=>{
            throw err;
        })

    })
    .catch((err)=>{
        console.error(err);
        return {status:'failure',message:err.message};
    })

    
};

module.exports = addCategory;
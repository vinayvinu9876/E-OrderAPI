var db = require("../adminDb");

const getProductById = async ( req , res ) => {
    var id = req.query.id;

    var dbRef = db.collection("Product").doc(id.toString());

   dbRef.get().then((doc)=>{
            console.log("Doc Exists = ",doc.exists);
            if(doc.exists) 
                res.send({status:"success",data:doc.data()}).status(200).end();
            else throw new Error("Product Not found");
                return "done";
        }).catch((err)=>{
            console.error(err);
            res.send({status:"failure",message:err.message}).status(400).end();
            return "error";
    });
    
    
};

module.exports = getProductById;
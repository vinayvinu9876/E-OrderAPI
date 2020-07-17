var admin     = require('firebase-admin');
var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://internshipdemo-26c22.firebaseio.com"
});

module.exports = admin;
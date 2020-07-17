var hmacSHA256 = require("crypto-js/hmac-sha256");
var razorpayInstance = require("../Payment/paymentInit");

function isPaymentSignatureValid(orderID,paymentID,receivedSignature){
    var generatedSignature = hmacSHA256(orderID+"|"+paymentID,razorpayInstance.key_secret);
    return (generatedSignature==receivedSignature);
}

module.exports = isPaymentSignatureValid;
var isEmpty = require('./isEmpty');
function replaceAll(str,char,rep){      
    if(isEmpty(str)){
        console.log("Error string = ",str);
        return str;
    }
    while(str.includes(char)){
        console.log(str);
        str = str.replace(char,rep);
    }
    return str;
}

module.exports = replaceAll;
function is_empty_string(x){

    if(x===null || x===undefined || (typeof x === 'undefined')  ){
      return true;
    }
    x = x.toString();

               return ( 

                    (x === false)  //same as: !x
                            ||
                    (x.length === 0)
                            ||
                    (x === "")
                               ||
                    (x.replace(/\s/g,"") === "")
                               ||
                    (!/[^\s]/.test(x))
                            ||
                    (/^\s*$/.test(x))
              );
}

module.exports = is_empty_string;
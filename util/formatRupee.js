function format_rupee(val){

	if(Math.abs(val).toString().length <=3 ){
		return '₹'+val.toString();
	}

    var x=val;
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
      lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return '₹'+res;
 }


module.exports =  format_rupee;
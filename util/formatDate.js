function formatDate(date){
	try{
		date = new Date(date);	
	}
	catch(err){
		return "Innvalid Date";
	}

	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();

	return day+"/"+month+"/"+year;

}

module.exports = formatDate;
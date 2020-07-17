function getIndianTime(date){
    var currentTime = new Date(date);
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    return ISTTime;

}
module.exports = getIndianTime;
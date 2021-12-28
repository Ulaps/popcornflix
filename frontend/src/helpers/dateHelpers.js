exports.timeConvert = (n) => {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hr(s) " + rminutes + " min(s)";
}

exports.yearMonthDateConvert = (date) => {
    var d = new Date(date);
    // var datestring = d.getFullYear()  + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes();
    var datestring = d.getFullYear()  + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " ";
    return datestring;
}
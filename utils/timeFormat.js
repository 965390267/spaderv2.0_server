function formatTime(time){
 let reg=/(([1-9]\d{3})|.).([1-9]|0[1-9]|1[0-2]).([1-9]|0[1-9]|[1-2][0-9]|3[0-1])/;
 let noWhiteSpace=  time.replace(/\s+/g, "")
  return   reg.exec(noWhiteSpace)
}
formatTime('[2019-09-23]')
//2019-09-23
//19-09-03
//2019-6-5
//2019 6 20
//匹配时间格式：20190322T142523910（严格匹配）
// var DATE_REGEXP = new RegExp("^(\\d{4})(\\d{2})(\\d{2})([T\\s](\\d{2})(\\d{2})(\\d{2})(\\d{3}))$");   
 
// function toDate(dateString) {       
//     if (DATE_REGEXP.test(dateString)) {           
//         var timestamp = dateString.replace(DATE_REGEXP, function($all, $year, $month, $day, $part1, $hour, $minute, $second, $part2, $milliscond) {               
//             var date = new Date($year, $month - 1, $day, $hour || "00", $minute || "00", $second || "00", $milliscond || "00");               
//             return date.getTime();           
//         });           
//         var date = new Date();           
//         date.setTime(timestamp);           
//         return date;       
//     }       
//     return null;   
// }
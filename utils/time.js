function formtDate(time){
    var filterSpace=time.replace(/ /g,'')
    var filterString=filterSpace.replace(/[^0-9]/ig,"");
    var year=Number(filterString.slice(0,4));
    var YMD=filterString.slice(4,8)
    var month=YMD[0]+YMD[1];       
    var day=YMD[2]+YMD[3]; 
    return year+'-'+month+'-'+day;   
 
}
module.exports=formtDate;
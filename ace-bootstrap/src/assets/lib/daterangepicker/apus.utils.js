//工具类
apus.utils.date = {};

apus.utils.date.format = function(date,format){ 
	var o = { 
		"M+" : date.getMonth()+1, //month 
		"d+" : date.getDate(), //day 
		"h+" : date.getHours(), //hour 
		"m+" : date.getMinutes(), //minute 
		"s+" : date.getSeconds(), //second 
		"q+" : Math.floor((date.getMonth()+3)/3), //quarter 
		"S" : date.getMilliseconds() //millisecond 
	} 
	
	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 
	
	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	} 
	return format; 
}

apus.utils.date.getCurrentDatetime = function(){
	return apus.utils.date.format(new Date(),"yyyy-MM-dd hh:mm:ss");
}

apus.utils.date.getCurrentDate = function(){
	return apus.utils.date.format(new Date(),"yyyy-MM-dd");
}
apus.utils.moment=function(e,c){
	return new moment(e,c);
}
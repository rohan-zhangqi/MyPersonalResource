/*******************************************************************************
 * 功能：写入和读取cookie的值
 ******************************************************************************/
//设置cookie的值
function setCookie(name,value,exdays)//两个参数，一个是cookie的名子，一个是值
{
  if(exdays == undefined){
	  exdays = 300;
  }
  var exp  = new Date();    //new Date("December 31, 9998");
  exp.setTime(exp.getTime() + exdays*24*60*60*1000);
  document.cookie = name + "="+  escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name)//取cookies函数       
{
  var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
  if(arr != null) return (arr[2]); return null;
}
//删除cookie的值
function delCookie(name) {  
    setCookie(name, "", -1);  
}
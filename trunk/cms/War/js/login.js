function checkCookie()
{
    var agt,cookieEnabled,isSafari, number;
    agt = navigator.userAgent.toLowerCase();
    cookieEnabled = navigator.cookieEnabled;
    isSafari = (agt.indexOf("safari") != -1);
    number = Math.random();
    document.cookie = number;

    if( ( (document.cookie.indexOf(number) == -1 || !cookieEnabled)
    	     && !isSafari) 
    	    || (!cookieEnabled && isSafari) )
    {
        show("infobarNoCookie", true);//您的浏览器不支持或已经禁止使用Cookie，您无法正常登录。</div>
        return false;
    }
    else {
        return true;
    }
}
function show(id,flag){
    $(id).style.display=(flag?"":"none");
}
function $(id){return document.getElementById(id);}
import as3.yy.cms.pages.LoginPage;

import mx.controls.Alert;
import mx.rpc.events.ResultEvent;
import mx.rpc.remoting.RemoteObject;
import as3.yy.cms.tools.Commons;
private var _service:RemoteObject;

private function initComponent():void
{
	initCookie();
}

private function onLogin():void
{
	btnLogin.enabled=false;
	if(checkRemeber.selected){
		writeCookie();
	}
	var uname:String=usname.text;
	var pass:String=password.text;
	
	_service = new RemoteObject();
	_service.destination="login";
	_service.addEventListener(ResultEvent.RESULT, checkUser);
	_service.onLogin(uname, pass);
}

private function checkUser(e:ResultEvent):void
{
	if (e.result instanceof LoginPage)
	{
		var loginPage = e.result as LoginPage;
		var uname:String = loginPage.uname;
		if(uname != null && uname != ""){
			//writeCookie();
			var url:String="/CMS_Flex/Main.html";
			var request:URLRequest=new URLRequest(url);
			navigateToURL(request, "_top");
		}
		else{
			Alert.show(loginPage.getErrorMsg(), Commons.WARNING);
		}
	}else{
		Alert.show("request failed",Commons.ERROR);
	}
	btnLogin.enabled=true;
}

private function writeCookie():void
{
	var soInstance:SharedObject=SharedObject.getLocal("CMSsystem");
	var uname:String=usname.text;
	var pass:String=password.text;
	soInstance.data.uname=uname;
	soInstance.data.stamp=new Date().toLocaleString();
}
private function initCookie():void
{
}
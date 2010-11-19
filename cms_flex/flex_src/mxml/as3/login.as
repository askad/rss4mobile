import as3.yy.cms.pages.LoginPage;

import mx.controls.Alert;
import mx.rpc.events.ResultEvent;
import mx.rpc.remoting.RemoteObject;
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
	var checkFlag = false;
	if (e.result instanceof LoginPage)
	{
		var loginPage = e.result as LoginPage;
		var uname:String = loginPage.getUname();
		Alert.show(uname, "Mytitle");
		if(uname != ""){
			checkFlag = true;
			//writeCookie();
			var url:String="http://localhost:8080/CMS_Flex/Main.html";
			var request:URLRequest=new URLRequest(url);
			navigateToURL(request, "_top");
		}
	}
	if(!checkFlag)
	{
		btnLogin.enabled=true;
		Alert.show("NO!!!","Mytitle");
	}
}

private function writeCookie():void
{
	var soInstance:SharedObject=SharedObject.getLocal("XXXsystem");
	var uname:String=usname.text;
	var pass:String=password.text;
	soInstance.data.uname=uname;
	soInstance.data.stamp=new Date().toLocaleString();
}
private function initCookie():void
{
}
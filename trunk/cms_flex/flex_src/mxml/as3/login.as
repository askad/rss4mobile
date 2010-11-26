import as3.yy.cms.pages.LoginPage;

import mx.controls.Alert;
import mx.rpc.events.ResultEvent;
import mx.rpc.remoting.RemoteObject;
import as3.yy.cms.tools.Commons;
import as3.yy.cms.tools.StringUtil;
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
	
	if(uname == null || uname == ""){
		Alert.show("username must be input", Commons.WARNING);
		usname.setStyle("borderColor","red");
		btnLogin.enabled=true;
		usname.setFocus();
		return;
	}
	usname.clearStyle("borderColor");
	if(pass == null || pass == ""){
		Alert.show("password must be input", Commons.WARNING);
		password.setStyle("borderColor","red");
		password.setFocus();
		btnLogin.enabled=true;
		return;
	}
	password.clearStyle("borderColor");
	_service = new RemoteObject();
	_service.destination="login";
	_service.addEventListener(ResultEvent.RESULT, checkUser);
	_service.onLogin(uname, pass);
}

private function checkUser(e:ResultEvent):void
{
	if (e.result is LoginPage)
	{
		var loginPage:LoginPage = e.result as LoginPage;
		var uname:String = loginPage.uname;
		//writeCookie();
		if(!StringUtil.isEmptyStr(uname)){
			var url:String = Commons.MAINPATH;
			var request:URLRequest=new URLRequest(url);
			var variables:URLVariables = new URLVariables();
	        variables.CURRENTPAGEID = "Login";
	        variables.NEXTPAGEID = "S001";
			request.data = variables;
	        request.method = URLRequestMethod.POST;
			navigateToURL(request, "_top");
		}else{
			Alert.show(loginPage.getErrorMsg(),Commons.ERROR);
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
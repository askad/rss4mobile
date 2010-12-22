import as3.yy.cms.pages.LoginPage;

import mx.controls.Alert;
import mx.rpc.events.ResultEvent;
import mx.rpc.remoting.RemoteObject;
import as3.yy.cms.tools.Commons;
import as3.yy.cms.tools.StringUtil;
private var _loginService:RemoteObject;
include "commonscript.as"; 
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
		errorShow(usname,"username must be input");
		btnLogin.enabled=true;
		return;
	}
	usname.clearStyle("borderColor");
	if(pass == null || pass == ""){
		errorShow(password,"password must be input");
		btnLogin.enabled=true;
		return;
	}
	password.clearStyle("borderColor");
	_loginService = new RemoteObject();
	_loginService.destination="login";
	_loginService.addEventListener(ResultEvent.RESULT, checkUser);
	_loginService.onLogin(uname, pass);
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
	        variables.NEXTPAGEID = "S000";
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
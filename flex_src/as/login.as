import mx.rpc.events.ResultEvent;
import mx.rpc.remoting.RemoteObject;
import flash.events.Event;
private var _service:RemoteObject;

private function initComponent():void
{
}

private function onLogin():void
{
	btn_login.enabled=false;
	var uname:String=usname.text;
	var pass:String=password.text;
	_service=new RemoteObject();
	_service.destination="login";
	_service.addEventListener(ResultEvent.RESULT, checkUser);
	_service.login(uname, pass);
	//rmi_object.checkUser(uname, pass); 
}

private function checkUser(e:ResultEvent):void
{
	if (e.result.toString() == "4869") //type judeg
	{
		writeCookie();
		var url:String="http://localhost:8080/CMS_Flex/Main.html";
		var request:URLRequest=new URLRequest(url);
		navigateToURL(request, "_top");
	}
	else
	{
		btn_login.enabled=true;
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
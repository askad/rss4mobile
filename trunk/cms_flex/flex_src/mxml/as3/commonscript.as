import mx.rpc.events.ResultEvent;
import mx.rpc.remoting.RemoteObject;
import as3.yy.cms.tools.Commons;
import as3.yy.cms.tools.StringUtil;

private var _service:RemoteObject;
/**
 * import flash.external.ExternalInterface
 * 调用js
 * ExternalInterface.call("function()
 * 			{window.location.href='http://localhost:8080/Flex_J2eeDemo/bin/Welcome.html';}"); 
 */
private function logout():void{
	_service = new RemoteObject();
	_service.destination = "logout";
	_service.onLogout();
	var url:String = Commons.LOGINPATH;
    var request:URLRequest = new URLRequest(url); 
    navigateToURL(request,"_top");
}
private function doInit(destination:String,func:Function):void{
	_service = new RemoteObject();
	_service.destination = "callService";
	_service.addEventListener(ResultEvent.RESULT, func);
	_service.doInit(destination);
}
private function doProcess(destination:String,func:Function):void{
	_service = new RemoteObject();
	_service.destination = "callService";
	_service.addEventListener(ResultEvent.RESULT, func);
	_service.doProcess(destination);
}
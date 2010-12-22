import as3.yy.cms.pages.S002Page;
import as3.yy.cms.vo.ItemBean;

import flash.net.registerClassAlias;

import mx.collections.ArrayCollection;
import mx.messaging.messages.RemotingMessage;
import mx.rpc.events.ResultEvent;

include "../../../commonscript.as"; 
[Bindable]
private var userList:ArrayCollection;
[Bindable]
private var authList:ArrayCollection;


private function initUserManage(s002Page:S002Page):void{
	var nameList:ArrayCollection = s002Page.userList;
	userList = new ArrayCollection();
	for each(var name:String in nameList){
		var it:ItemBean = new ItemBean();
		it.name = name;
		it.value = name;
		userList.addItem(it);
	}
	authList = s002Page.authList;
}
private function handleResultS002(e:ResultEvent):void{
	
	var s002Page:S002Page = e.result as S002Page;
	s002Page.authList = e.result["authList"] as ArrayCollection;
	s002Page.userList = (e.result["userList"] as ArrayCollection);
	if(s002Page == null){
		//errorT.text = getQualifiedClassName(e.result["userList"]);
		if(e.result["userList"]!=null){
			errorT.text = e.result["userList"].toString();
			errorT.text = e.result["authList"].toString();
		}
	}
	initUserManage(s002Page);
}
private function InitComponent():void{
	registerClassAlias("flex.messaging.messages.RemotingMessage", RemotingMessage);
	doInit("S002Service",handleResultS002);
}
private function onMenuClick():void{
//	myFrame.source = menu.selectedItem.value;
}

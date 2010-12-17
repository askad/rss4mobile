import as3.yy.cms.pages.S002Page;
import as3.yy.cms.vo.ItemBean;

import mx.collections.ArrayCollection;
[Bindable]
private var userList:ArrayCollection;

private function InitComponent():void{
	doInit("S002Service",handleResult);
}
private function handleResult(e:ResultEvent):void{
	if (e.result is S002Page)
	{
		var s002Page:S002Page = e.result as S002Page;
		initUserManage(s002Page);
	}else{
		logout();
	}
}
private function initUserManage(s002Page:S002Page):void{
	var nameList:ArrayCollection = s002Page.menuList;
	userList = new ArrayCollection();
	for each(var name:String in nameList){
		userList.addItem(new ItemBean(name,name));
	}
}
private function onMenuClick():void{
//	myFrame.source = menu.selectedItem.value;
}

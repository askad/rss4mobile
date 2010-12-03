import as3.yy.cms.pages.S001Page;
import as3.yy.cms.vo.ItemBean;

import mx.collections.ArrayCollection;
[Bindable]
private var nowDate:String = new Date().toDateString();
[Bindable]
private var menuList:ArrayCollection;
private function InitComponent():void{
	doInit("S001Service",handleResult);
}
private function handleResult(e:ResultEvent):void{
	if (e.result is S001Page)
	{
		var s001Page:S001Page = e.result as S001Page;
		initMenu(s001Page);
	}else{
		logout();
	}
}
private function initMenu(s001Page:S001Page):void{
	var nameList:ArrayCollection = s001Page.menunameList;
	var valueList:ArrayCollection = s001Page.menuvalueList;
	var count:int = 0;
	menuList = new ArrayCollection();
	for each(var name:String in nameList){
		menuList.addItem(new ItemBean(name,valueList.getItemAt(count).toString()));
		count++;
	}
}
private function onMenuClick():void{
	myFrame.source = menu.selectedItem.value;
}
private function convertMenuState():void{
	if(menu.visible){
		menu.visible = false;
		hb_content.setChildIndex(menu,2);
		menu.width=0;
		menuControl.label="open menu";
	}else{
		menu.visible = true;
		hb_content.setChildIndex(menu,0);
		menu.width = this.width*0.2;
		menuControl.label="close menu";
	}
}

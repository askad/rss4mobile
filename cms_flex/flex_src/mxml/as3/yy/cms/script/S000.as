import as3.yy.cms.pages.S000Page;
import as3.yy.cms.vo.ItemBean;

import mx.collections.ArrayCollection;
[Bindable]
private var nowDate:String = new Date().toDateString();
[Bindable]
private var menuList:ArrayCollection;
private function InitComponent():void{
	doInit("S000Service",handleResult);
}
private function handleResult(e:ResultEvent):void{
	if (e.result is S000Page)
	{
		var s000Page:S000Page = e.result as S000Page;
		initMenu(s000Page);
	}else{
		logout();
	}
}
private function initMenu(s000Page:S000Page):void{
	var nameList:ArrayCollection = s000Page.menunameList;
	var valueList:ArrayCollection = s000Page.menuvalueList;
	var count:int = 0;
	menuList = new ArrayCollection();
	for each(var name:String in nameList){
		var it:ItemBean = new ItemBean();
		it.name = name;
		it.value = valueList.getItemAt(count).toString();
		menuList.addItem(it);
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

package yy.cms.pages;

import java.util.List;

import yy.cms.base.BasePage;

public class S001Page extends BasePage{
	private List menunameList;
	private List menuvalueList;
	public List getMenuvalueList() {
		return menuvalueList;
	}
	public void setMenuvalueList(List menuvalueList) {
		this.menuvalueList = menuvalueList;
	}
	public List getMenunameList() {
		return menunameList;
	}
	public void setMenunameList(List menunameList) {
		this.menunameList = menunameList;
	}
}

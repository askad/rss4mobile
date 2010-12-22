package yy.cms.pages;

import java.util.List;

import yy.cms.base.BasePage;

public class S002Page extends BasePage{
	private List userList;
	private List authList;

	public List getUserList() {
		return userList;
	}

	public void setUserList(List userList) {
		this.userList = userList;
	}

	public List getAuthList() {
		return authList;
	}

	public void setAuthList(List authList) {
		this.authList = authList;
	}
	
}

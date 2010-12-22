package yy.cms.base;

import yy.cms.tools.Commons;

public abstract class BasePage {
	
	private String errorMsg = Commons.BLANK;
	private String inforMsg = Commons.BLANK;
	private String pageName = Commons.BLANK;
	private Boolean isAuthorized = false;//must be Boolean,boolean can not be work

	public Boolean getIsAuthorized() {
		return isAuthorized;
	}

	public void setIsAuthorized(Boolean isAuthorized) {
		this.isAuthorized = isAuthorized;
	}

	public String getErrorMsg() {
		return errorMsg;
	}

	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public String getInforMsg() {
		return inforMsg;
	}

	public void setInforMsg(String inforMsg) {
		this.inforMsg = inforMsg;
	}

	public String getPageName() {
		return pageName;
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}
}

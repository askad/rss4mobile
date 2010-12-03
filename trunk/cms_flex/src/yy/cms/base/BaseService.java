package yy.cms.base;

import yy.cms.tools.Commons;
import flex.messaging.FlexContext;
import flex.messaging.FlexSession;

public abstract class BaseService implements BaseValidator {

	public BasePage doProcess(BasePage currentPage) {

		unitCheck(currentPage);
		businessCheck(currentPage);
		doBussiness(currentPage);
		return currentPage;
	}

	protected FlexSession getSession() {
		return FlexContext.getFlexSession();
	}

	public boolean doAuthorize() {

		FlexSession session = getSession();
		// session validate
		String userId = (String) session.getAttribute(Commons.USERID);
		if (userId == null || userId.equals(Commons.BLANK)) {
			return false;
		}
		return true;
	}

	public abstract BasePage doInit();

	public abstract void doBussiness(BasePage currentPage);
}

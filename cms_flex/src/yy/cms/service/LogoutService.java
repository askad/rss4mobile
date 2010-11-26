package yy.cms.service;

import yy.cms.tools.Commons;
import yy.cms.tools.Logger;
import flex.messaging.FlexContext;
import flex.messaging.FlexSession;

public class LogoutService {

	private final Logger logger = new Logger(LogoutService.class);

	public void onLogout() {

		FlexSession session = FlexContext.getFlexSession();
		session.setAttribute(Commons.USERID, null);

	}
}

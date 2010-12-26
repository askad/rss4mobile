package yy.cms.service;

import org.apache.log4j.Logger;

import yy.cms.tools.Commons;
import flex.messaging.FlexContext;
import flex.messaging.FlexSession;

public class LogoutService {

	private final Logger logger = Logger.getLogger(LogoutService.class);

	public void onLogout() {

		FlexSession session = FlexContext.getFlexSession();
		logger.info(session.getAttribute(Commons.USERNAME) + ":log out");
		session.setAttribute(Commons.USERNAME, null);
	}
}

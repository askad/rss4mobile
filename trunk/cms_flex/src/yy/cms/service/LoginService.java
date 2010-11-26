package yy.cms.service;

import yy.cms.dao.UserInfoDAO;
import yy.cms.entity.UserInfoEntity;
import yy.cms.pages.LoginPage;
import yy.cms.tools.Commons;
import yy.cms.tools.Logger;
import yy.cms.tools.MessageContainer;
import flex.messaging.FlexContext;
import flex.messaging.FlexSession;

public class LoginService {

	private UserInfoDAO userInfoDAO;

	private final Logger logger = new Logger(LoginService.class);

	public LoginPage onLogin(String usname, String psword) {

		LoginPage loginPage = new LoginPage();
		FlexSession session = FlexContext.getFlexSession();

		// get default language
		String lang = (String) session.getAttribute(Commons.LANGUAGE);
		if (lang == null || lang.isEmpty()) {
			lang = Commons.CHN;
		}

		userInfoDAO = new UserInfoDAO();
		UserInfoEntity userInfoEntity = new UserInfoEntity();//userInfoDAO.getUserInfo(usname);
		userInfoEntity.setUsername("yy");
		userInfoEntity.setUserpass("yy");
		userInfoEntity.setUserId("yy");

		if (userInfoEntity != null && userInfoEntity.getUserpass() != null
				&& userInfoEntity.getUserpass().equals(psword)) {
			initUser(session, userInfoEntity);
			loginPage.setUname(usname);

		} else {
			loginPage.setErrorMsg(MessageContainer.getErrorMsg(lang, Commons.ER_B0001));
		}
		logger.printConsole(usname);
		return loginPage;
	}

	private void initUser(FlexSession session, UserInfoEntity userInfoEntity) {
		session.setAttribute(Commons.USERNAME, userInfoEntity.getUsername());
		session.setAttribute(Commons.USERID, userInfoEntity.getUserid());
		session.setAttribute(Commons.CURRENTPAGEID, "S001");
		session.setAttribute(Commons.NEXTPAGEID, "S001");
	}
}

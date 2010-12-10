package yy.cms.service;

import org.apache.log4j.Logger;

import yy.cms.dao.UserInfoDAO;
import yy.cms.entity.UserInfoEntity;
import yy.cms.pages.LoginPage;
import yy.cms.tools.Commons;
import yy.cms.tools.MessageContainer;
import yy.cms.tools.Validator;
import flex.messaging.FlexContext;
import flex.messaging.FlexSession;

public class LoginService {

	private UserInfoDAO userInfoDAO;

	private static Logger logger = Logger.getLogger(LoginService.class);

	public LoginPage onLogin(String usname, String psword) {

		LoginPage loginPage = new LoginPage();
		FlexSession session = FlexContext.getFlexSession();

		// get default language
		String lang = (String) session.getAttribute(Commons.LANGUAGE);
		if (lang == null || lang.isEmpty()) {
			lang = Commons.CHN;
		}

		userInfoDAO = new UserInfoDAO();
		UserInfoEntity userInfoEntity = userInfoDAO.getUserInfo(usname);

		if (userInfoEntity != null && userInfoEntity.getUserpass() != null
				&& userInfoEntity.getUserpass().equals(psword)) {
			initUser(session, userInfoEntity);
			loginPage.setUname(usname);
			logger.info(usname + " sucess");
		} else {
			logger.error(Validator.getIpAddr() + "login failed");
			loginPage.setErrorMsg(MessageContainer.getErrorMsg(lang, Commons.ER_B0001));
		}
		return loginPage;
	}

	private void initUser(FlexSession session, UserInfoEntity userInfoEntity) {
		session.setAttribute(Commons.USERNAME, userInfoEntity.getUsername());
		session.setAttribute(Commons.CURRENTPAGEID, "S001");
		session.setAttribute(Commons.NEXTPAGEID, "S001");
	}
}

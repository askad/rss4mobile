package yy.cms.service;

import yy.cms.dao.UserInfoDAO;
import yy.cms.entity.UserInfoEntity;
import yy.cms.pages.LoginPage;
import yy.cms.tools.Commons;
import flex.messaging.FlexContext;
import flex.messaging.FlexSession;

public class LoginService {

	private UserInfoDAO userInfoDAO;

	public LoginPage onLogin(String usname, String psword) {

		LoginPage loginPage = null;
		FlexSession session = FlexContext.getFlexSession();
		UserInfoEntity userInfoEntity = userInfoDAO.getUserInfo(usname);

		if (userInfoEntity != null && userInfoEntity.getUserpass() != null
				&& userInfoEntity.getUserpass().equals(psword)) {
			initUser(session, userInfoEntity);

			loginPage = new LoginPage();
			loginPage.setUname(usname);

		} else {
			// loginPage.setErrorMsg(MessageContainer.getErrorMsg(req,
			// Commons.ER_B0001));

		}
		return loginPage;
	}

	public int checkUser(String name, String pass) {
		System.out.println(name + " xxxxxin check " + pass);
		return 4869;
	}

	private void initUser(FlexSession session, UserInfoEntity userInfoEntity) {
		session.setAttribute(Commons.USERNAME, userInfoEntity.getUsername());
		session.setAttribute(Commons.USERID, userInfoEntity.getUserid());
		session.setAttribute(Commons.NEXTPAGEID, "S001");
	}
}

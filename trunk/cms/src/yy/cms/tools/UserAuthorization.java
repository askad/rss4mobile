package yy.cms.tools;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import yy.cms.entity.UserInfoEntity;

public class UserAuthorization {

	public static UserInfoEntity checkUserPass(String user, String pass) {

		if (user.equals(pass)) {
			return null;
		}

		return null;
	}

	public static String encrptPass(String pass) {
		return pass;
	}

	public static void checkLogin(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
		SessionObject so = (SessionObject) session.getAttribute(SessionObject.GLOBAL_SESSION);
		if (so == null || Utils.isEmpty(so.getUsername())) {
			PageDispatcher.dispatcherLogin(resp);
		}
	}
}

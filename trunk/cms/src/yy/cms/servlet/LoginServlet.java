package yy.cms.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import yy.cms.dao.UserInfoDAO;
import yy.cms.entity.UserInfoEntity;
import yy.cms.pages.LoginPage;
import yy.cms.tools.CodeContainer;
import yy.cms.tools.Commons;
import yy.cms.tools.MessageContainer;
import yy.cms.tools.PageDispatcher;
import yy.cms.tools.PageParser;
import yy.cms.tools.SessionObject;

public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private UserInfoDAO userInfoDAO;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		LoginPage loginPage = (LoginPage) PageParser.getCurrentPageFromRequest(req, LoginPage.class);

		// get default language
		String lang = (String) req.getSession().getAttribute(Commons.LANGUAGE);
		if (lang == null || lang.isEmpty()) {
			lang = Commons.ENG;
		}

		userInfoDAO = new UserInfoDAO();

		UserInfoEntity userInfoEntity = userInfoDAO.getUserInfo(loginPage.getUname());

		if (userInfoEntity != null && userInfoEntity.getUserpass() != null
				&& userInfoEntity.getUserpass().equals(loginPage.getPword())) {
			initUser(req, userInfoEntity);
			if (userInfoEntity.getAuthcode() < CodeContainer.AUTH_ADMIN) {
				PageDispatcher.dispatcherMgr(resp);
			} else {
				PageDispatcher.dispatcherAdmin(resp);
			}

		} else {
			loginPage.setErrorMsg(MessageContainer.getErrorMsg(lang, Commons.ER_B0001));
			req.setAttribute(Commons.CURRENTPAGE, loginPage);
			PageDispatcher.dispatcherLogin(resp);
		}
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		PageDispatcher.dispatcherLogin(resp);
	}

	private void initUser(HttpServletRequest req, UserInfoEntity userInfoEntity) {
		HttpSession session = req.getSession();
		SessionObject so = new SessionObject();
		so.setUsername(userInfoEntity.getUsername());
		session.setAttribute(SessionObject.GLOBAL_SESSION, so);
	}
}
/*
 * Commons.LANGUAGE
 */

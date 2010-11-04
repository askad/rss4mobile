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
import yy.cms.tools.Commons;
import yy.cms.tools.MessageContainer;
import yy.cms.tools.PageDispatcher;
import yy.cms.tools.PageParser;

public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private UserInfoDAO userInfoDAO;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		LoginPage loginPage = (LoginPage) PageParser.getCurrentPageFromRequest(req, LoginPage.class);
		req.setAttribute(Commons.CURRENTPAGE, loginPage);
		UserInfoEntity userInfoEntity = userInfoDAO.getUserInfo(loginPage.getUname());

		if (userInfoEntity != null && userInfoEntity.getUserpass() != null
				&& userInfoEntity.getUserpass().equals(loginPage.getPword())) {
			initUser(req, userInfoEntity);
			PageDispatcher.dispatcherByPath("/Pages/Main.jsp", req, resp);
		} else {
			loginPage.setErrorMsg(MessageContainer.getErrorMsg(req, Commons.ERR_MSG_LOGIN_FAILED));
			PageDispatcher.dispatcherLogin(req, resp);
		}
	}

	private void initUser(HttpServletRequest req, UserInfoEntity userInfoEntity) {
		HttpSession session = req.getSession();
		session.setAttribute(Commons.USERNAME, userInfoEntity.getUsername());
		session.setAttribute(Commons.USERID, userInfoEntity.getUserid());
		session.setAttribute(Commons.NEXTPAGEID, "S001");
	}
}
/*
 * Commons.LANGUAGE
 */

package yy.cms.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import yy.cms.tools.SessionObject;

public class LogoutServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private final Logger logger = Logger.getLogger(LogoutServlet.class);

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		HttpSession session = req.getSession();
		SessionObject so = (SessionObject) session.getAttribute(SessionObject.GLOBAL_SESSION);
		logger.info(so.getUsername() + ":log out");
		session.setAttribute(SessionObject.GLOBAL_SESSION, null);
	}
}

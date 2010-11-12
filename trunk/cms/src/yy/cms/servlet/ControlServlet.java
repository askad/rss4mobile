package yy.cms.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import yy.cms.base.BasePage;
import yy.cms.base.BaseService;
import yy.cms.tools.Commons;
import yy.cms.tools.MessageContainer;
import yy.cms.tools.PageDispatcher;
import yy.cms.tools.PageParser;

public class ControlServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public final static String SERVICENAME_PRE = "yy.cms.service.";
	public final static String SERVICENAME_SUF = "Srevice";

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		HttpSession session = req.getSession();

		// session validate
		String userId = (String) session.getAttribute(Commons.USERID);
		if (userId == null || userId.equals(Commons.BLANK)) {
			PageDispatcher.dispatcherLogin(req, resp);
			return;
		}

		// get some info
		String nextPageId = (String) session.getAttribute(Commons.NEXTPAGEID);
		BasePage nextpage = null;
		try {
			nextpage = PageParser.getPageClassFromId(nextPageId).newInstance();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		if (nextpage == null) {
			req.setAttribute(Commons.ERR_MSG_REQUEST, MessageContainer.getErrorMsg(req, Commons.ER_P0001));
			PageDispatcher.dispatcherError(req, resp);
			return;
		}
		req.setAttribute(Commons.CURRENTPAGE, nextpage);

		boolean flag = callProgram(nextPageId, nextpage);

		if (!flag) {
			req.setAttribute(Commons.ERR_MSG_REQUEST, MessageContainer.getErrorMsg(req, Commons.ER_P0002));
			PageDispatcher.dispatcherError(req, resp);
		}
	}

	private boolean callProgram(String pageId, BasePage page) {
		String serviceName = SERVICENAME_PRE + pageId + SERVICENAME_SUF;
		try {
			BaseService baseService = (BaseService)Class.forName(serviceName).newInstance();
			return true;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return false;
	}

}

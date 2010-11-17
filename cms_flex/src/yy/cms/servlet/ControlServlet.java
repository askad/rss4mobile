package yy.cms.servlet;

import java.io.IOException;

import javax.servlet.ServletContext;
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

		// get current page instance
		String currentPageId = req.getParameter(Commons.CURRENTPAGE);
		if (currentPageId == null || currentPageId.isEmpty()) {
			//req.setAttribute(Commons.ERR_MSG_REQUEST, MessageContainer.getErrorMsg(req, Commons.ER_P0003));
			PageDispatcher.dispatcherError(req, resp);
			return;
		}
		BasePage currentPage = (BasePage) PageParser.getCurrentPageFromRequest(req,
				PageParser.getPageClassFromId(currentPageId));

		if (currentPage == null) {
			//req.setAttribute(Commons.ERR_MSG_REQUEST, MessageContainer.getErrorMsg(req, Commons.ER_P0001));
			PageDispatcher.dispatcherError(req, resp);
			return;
		}

		// get next page instance
		String nextPageId = (String) session.getAttribute(Commons.NEXTPAGEID);
		BasePage nextpage = null;
		try {
			nextpage = PageParser.getPageClassFromId(nextPageId).newInstance();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}

		// instance failed
		if (nextpage == null) {
			//req.setAttribute(Commons.ERR_MSG_REQUEST, MessageContainer.getErrorMsg(req, Commons.ER_P0001));
			PageDispatcher.dispatcherError(req, resp);
			return;
		}
		boolean flag = callService(nextPageId, currentPage, nextpage);

		// run service failed
		if (!flag) {
			//req.setAttribute(Commons.ERR_MSG_REQUEST, MessageContainer.getErrorMsg(req, Commons.ER_P0002));
			PageDispatcher.dispatcherError(req, resp);
		}

		req.setAttribute(Commons.CURRENTPAGE, nextpage);

		ServletContext sc = getServletConfig().getServletContext();
		flag = PageDispatcher.dispatcherNext(sc, nextPageId, req, resp);

		// dispatch failed
		if (!flag) {
			//req.setAttribute(Commons.ERR_MSG_REQUEST, MessageContainer.getErrorMsg(req, Commons.ER_P0004));
			PageDispatcher.dispatcherError(req, resp);
		}
	}

	private boolean callService(String pageId, BasePage currentPage, BasePage nextPage) {
		String serviceName = SERVICENAME_PRE + pageId + SERVICENAME_SUF;
		try {
			BaseService baseService = (BaseService) Class.forName(serviceName).newInstance();
			baseService.doProcess(currentPage, nextPage);
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

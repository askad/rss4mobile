package yy.cms.servlet;

import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import yy.cms.base.BasePage;
import yy.cms.base.BaseService;
import yy.cms.tools.Commons;
import yy.cms.tools.PageDispatcher;
import yy.cms.tools.PageParser;
import yy.cms.tools.SessionObject;
import yy.cms.tools.Utils;

public class ControlServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public final static String SERVICENAME_PRE = "yy.cms.service.";

	public final static String SERVICENAME_SUF = "Service";

	private final Logger logger = Logger.getLogger(ControlServlet.class);

	private boolean nextFlag = false;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		HttpSession session = req.getSession();
		// session validate
		boolean authFlag = doAuthorize(session);
		if (!authFlag) {
			PageDispatcher.dispatcherLogin(req, resp);
			return;
		}

		String currentPageId = req.getParameter(Commons.CURRENTPAGEID);
		String nextPageId = req.getParameter(Commons.NEXTPAGEID);

		// get current page instance
		BasePage currentPage = null;
		// get next page instance
		BasePage nextpage = null;

		if (Utils.isEmpty(currentPageId)) {
			// req.setAttribute(Commons.ERR_MSG_REQUEST,
			// MessageContainer.getErrorMsg(req, Commons.ER_P0003));
			PageDispatcher.dispatcherError(req, resp);
			return;
		}

		if (!currentPageId.equals(nextPageId)) {
			nextFlag = true;
		}

		currentPage = (BasePage) PageParser
				.getCurrentPageFromRequest(req, PageParser.getPageClassFromId(currentPageId));

		if (currentPage == null) {
			// req.setAttribute(Commons.ERR_MSG_REQUEST,
			// MessageContainer.getErrorMsg(req, Commons.ER_P0001));
			PageDispatcher.dispatcherError(req, resp);
			return;
		}

		// when init it,nextpage will be not used.
		if (nextFlag) {
			try {
				nextpage = PageParser.getPageClassFromId(nextPageId).newInstance();
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
			// instance failed
			if (nextpage == null) {
				// req.setAttribute(Commons.ERR_MSG_REQUEST,
				// MessageContainer.getErrorMsg(req, Commons.ER_P0001));
				PageDispatcher.dispatcherError(req, resp);
				return;
			}
		}

		boolean serviceFlag = callService(currentPageId, nextPageId, currentPage, nextpage);

		// run service failed
		if (!serviceFlag) {
			// req.setAttribute(Commons.ERR_MSG_REQUEST,
			// MessageContainer.getErrorMsg(req, Commons.ER_P0002));
			PageDispatcher.dispatcherError(req, resp);
		}

		ServletContext sc = getServletConfig().getServletContext();
		String msg = currentPage.getErrorMsg();
		boolean flag;

		if (!Utils.isEmpty(msg)) {
			req.setAttribute(Commons.CURRENTPAGE, currentPage);
			return;// TODO MAYBE INIT PROBLEM
		} else {
			req.setAttribute(Commons.CURRENTPAGE, nextpage);
		}

		session.setAttribute(Commons.NEXTPAGEID, nextPageId);
		flag = PageDispatcher.dispatcherNext(sc, nextPageId, req, resp);
		// dispatch failed
		if (!flag) {
			// req.setAttribute(Commons.ERR_MSG_REQUEST,
			// MessageContainer.getErrorMsg(req, Commons.ER_P0004));
			PageDispatcher.dispatcherError(req, resp);
		}

	}

	public boolean doAuthorize(HttpSession session) {

		// session validate
		SessionObject so = (SessionObject) session.getAttribute(SessionObject.GLOBAL_SESSION);
		String userName = so.getUsername();
		if (Utils.isEmpty(userName)) {
			return false;
		}
		return true;
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doPost(req, resp);
	}

	private boolean callService(String currentPageId, String nextPageId, BasePage currentPage, BasePage nextPage) {
		String serviceName = SERVICENAME_PRE + currentPageId + SERVICENAME_SUF;
		try {
			BaseService baseService = (BaseService) Class.forName(serviceName).newInstance();
			if (!nextFlag) {
				baseService.doInit();
			} else {
				baseService.doProcess(currentPage);
			}
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

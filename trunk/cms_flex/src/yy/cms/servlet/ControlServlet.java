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

public class ControlServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public final static String SERVICENAME_PRE = "yy.cms.service.";

	public final static String SERVICENAME_SUF = "Service";

	private final Logger logger = Logger.getLogger(ControlServlet.class);

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		HttpSession session = req.getSession();
		// session validate
		String userName = (String) session.getAttribute(Commons.USERNAME);
		if (userName == null || userName.equals(Commons.BLANK)) {
			PageDispatcher.dispatcherLogin(req, resp);
			return;
		}
		
		ServletContext sc = getServletConfig().getServletContext();
		String nextPageId = (String) session.getAttribute(Commons.NEXTPAGEID);
		PageDispatcher.dispatcherNext(sc, nextPageId, req, resp);
		
//		// get current page instance
//		String currentPageId = req.getParameter(Commons.CURRENTPAGEID);
//		if (!"Login".equals(currentPageId)) {
//			if (currentPageId == null || currentPageId.isEmpty()) {
//				// req.setAttribute(Commons.ERR_MSG_REQUEST,
//				// MessageContainer.getErrorMsg(req, Commons.ER_P0003));
//				PageDispatcher.dispatcherError(req, resp);
//				return;
//			}
//			currentPage = (BasePage) PageParser.getCurrentPageFromRequest(req, PageParser
//					.getPageClassFromId(currentPageId));
//
//			if (currentPage == null) {
//				// req.setAttribute(Commons.ERR_MSG_REQUEST,
//				// MessageContainer.getErrorMsg(req, Commons.ER_P0001));
//				PageDispatcher.dispatcherError(req, resp);
//				return;
//			}
//		}
//
//		// get next page instance
//		String nextPageId = (String) session.getAttribute(Commons.NEXTPAGEID);
//		BasePage nextpage = null;
//		try {
//			nextpage = PageParser.getPageClassFromId(nextPageId).newInstance();
//		} catch (InstantiationException e) {
//			e.printStackTrace();
//		} catch (IllegalAccessException e) {
//			e.printStackTrace();
//		}
//
//		// instance failed
//		if (nextpage == null) {
//			// req.setAttribute(Commons.ERR_MSG_REQUEST,
//			// MessageContainer.getErrorMsg(req, Commons.ER_P0001));
//			PageDispatcher.dispatcherError(req, resp);
//			return;
//		}
//		boolean flag = callService(currentPageId, nextPageId, currentPage, nextpage);
//
//		// run service failed
//		if (!flag) {
//			// req.setAttribute(Commons.ERR_MSG_REQUEST,
//			// MessageContainer.getErrorMsg(req, Commons.ER_P0002));
//			PageDispatcher.dispatcherError(req, resp);
//		}
//
//		req.setAttribute(Commons.CURRENTPAGE, nextpage);
//
//		ServletContext sc = getServletConfig().getServletContext();
//		flag = PageDispatcher.dispatcherNext(sc, nextPageId, req, resp);
//
//		// dispatch failed
//		if (!flag) {
//			// req.setAttribute(Commons.ERR_MSG_REQUEST,
//			// MessageContainer.getErrorMsg(req, Commons.ER_P0004));
//			PageDispatcher.dispatcherError(req, resp);
//		}
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doPost(req,resp);
	}

	private boolean callService(String currentPageId, String nextPageId, BasePage currentPage, BasePage nextPage) {
		String serviceName = SERVICENAME_PRE + currentPageId + SERVICENAME_SUF;
		try {
			BaseService baseService = (BaseService) Class.forName(serviceName).newInstance();
			if (currentPageId.equals(nextPageId)) {
				//baseService.doInit(currentPage);
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

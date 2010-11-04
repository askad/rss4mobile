package yy.cms.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import yy.cms.base.BasePage;
import yy.cms.tools.Commons;
import yy.cms.tools.PageDispatcher;
import yy.cms.tools.PageParser;

public class ControlServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

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
		PageParser.getCurrentPageFromRequest(req, PageParser.getPageClassFromId(nextPageId));
		req.setAttribute(Commons.CURRENTPAGE, nextpage);
	}
}

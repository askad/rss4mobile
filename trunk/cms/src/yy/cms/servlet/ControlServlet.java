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
		String userId = (String) session.getAttribute(Commons.USERID);
		if (userId == null || userId.equals(Commons.BLANK)) {
			PageDispatcher.dispatcherLogin(req, resp);
			return;
		}
		String nextPage = (String) session.getAttribute(Commons.NEXTPAGEID);
		BasePage nextpage = PageParser.getCurrentPageFromRequest(req, PageParser.getPageFromName(nextPage));
		req.setAttribute(Commons.CURRENTPAGE, nextpage);
	}
}

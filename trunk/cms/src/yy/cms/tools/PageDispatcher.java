package yy.cms.tools;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PageDispatcher {

	public final static String SCREENNAME_SUF = ".html";
	public final static String SCREENNAME_PRE = "/";
	private final static String HOME_PATH = "/CandidateManageSystem/";

	public static void forwardByPath(String path, HttpServletRequest req, HttpServletResponse resp) {
		try {
			req.getSession().getServletContext().getRequestDispatcher(path).forward(req, resp);
		} catch (ServletException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void forwardLogin(HttpServletRequest req, HttpServletResponse resp) {
		forwardByPath("/Pages/login.jsp", req, resp);
	}

	public static boolean dispatcherNext(ServletContext sc, String nextPageId, HttpServletRequest req,
			HttpServletResponse resp) {

		RequestDispatcher rd = sc.getRequestDispatcher(SCREENNAME_PRE + nextPageId + SCREENNAME_SUF);
		if (rd == null) {
			return false;
		}
		try {
			rd.forward(req, resp);
			return true;
		} catch (ServletException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	public static void dispatcher(HttpServletResponse resp,String url){
		try {
			resp.sendRedirect(url);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void dispatcherAdmin(HttpServletResponse resp) {
		dispatcher(resp, HOME_PATH + "Pages/admin.jsp");
	}
	
	public static void dispatcherMgr(HttpServletResponse resp) {
		dispatcher(resp, HOME_PATH + "Pages/resume.jsp");
	}
	
	public static void dispatcherLogin(HttpServletResponse resp) {
		dispatcher(resp, HOME_PATH + "Pages/login.jsp");
	}

	public static void dispatcherError(HttpServletResponse resp) {
		dispatcher(resp, HOME_PATH + "Pages/error.jsp");
	}
	
	public static void dispatcher404(HttpServletResponse resp) {
		dispatcher(resp, HOME_PATH + "Pages/error.jsp");
	}
}

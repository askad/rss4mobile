package yy.cms.tools;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PageDispatcher {

	public final static String SCREENNAME_SUF = ".jsp";

	public static void dispatcherByPath(String path, HttpServletRequest req, HttpServletResponse resp) {
		try {
			req.getSession().getServletContext().getRequestDispatcher(path).forward(req, resp);
		} catch (ServletException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void dispatcherLogin(HttpServletRequest req, HttpServletResponse resp) {
		dispatcherByPath("/Pages/login.jsp", req, resp);
	}

	public static void dispatcherError(HttpServletRequest req, HttpServletResponse resp) {
		dispatcherByPath("/Pages/error.jsp", req, resp);
	}

	public static boolean dispatcherNext(ServletContext sc, String nextPageId, HttpServletRequest req,
			HttpServletResponse resp) {

		RequestDispatcher rd = sc.getRequestDispatcher(nextPageId + SCREENNAME_SUF);
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
}
package yy.cms.base;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import yy.cms.tools.UserAuthorization;

abstract public class BaseHttpServlet extends HttpServlet {

	protected void authorizeUser(HttpServletRequest arg0, HttpServletResponse arg1){
		UserAuthorization.checkLogin(arg0,arg1);
	}

}

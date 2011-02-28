package yy.cms.servlet;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import yy.cms.dao.CommonDAO;
import yy.cms.entity.PersonInfoEntity;
import yy.cms.tools.PageDispatcher;
import yy.cms.tools.SessionObject;
import yy.cms.tools.Utils;

public class UpdatePersonServlet extends HttpServlet {

	private final String SQL_UPDATE_PERSON_MGR = "UPDATE PERSONINFO P,RESUMEINFO R SET P.LANGSKILL=?, P.SDSKILL=?, P.TECHSKILL=?, P.STABILITY=? "
			+ "WHERE P.ID=R.PERSONID " + "AND R.ID=?";

	private final String SQL_UPDATE_RESUME_MGR = "UPDATE RESUMEINFO R SET VIEWRESULT=?,VIEWDATE=?,VIEWER=? "
			+ "WHERE R.ID = ? ";

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String type = req.getParameter("type");
		if ("admin".equals(type)) {
			updateByAdmin(req, resp);
		} else {
			updateByMgr(req, resp);
		}

	}

	private void updateByAdmin(HttpServletRequest req, HttpServletResponse resp) {
		
		
		PersonInfoEntity pie = new PersonInfoEntity();
		Utils.setObjectFromRequest(req,pie);
		
//		pie.setComments("");
//		pie.setChnname(req.getParameter("chnname"));
//		pie.setDegree(req.getParameter("chnname"));
//		pie.setEngname(req.getParameter("chnname"));
//		pie.setId(1);
//		pie.setLang("");
//		pie.setLangskill(1);
//		pie.setPhonenum(1);
//		pie.setSdskill(1);
//		pie.setStability(1);
//		pie.setTechskill(1);
//		pie.setUniversity("");
//		pie.setWorkexpr(1);
//		pie.setWorkhistory("");
//		pie.setWorkingcom("");	
		try {
			resp.getWriter().write(new String(pie.getChnname().getBytes(),"UTF-8"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private void updateByMgr(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
		SessionObject so = (SessionObject) session.getAttribute(SessionObject.GLOBAL_SESSION);
		String viewerName = so.getUsername();

		String[] resumeid = req.getParameterValues("resumeid");
		String[] langskill = req.getParameterValues("langskill");
		String[] sdskill = req.getParameterValues("sdskill");
		String[] techskill = req.getParameterValues("techskill");
		String[] stability = req.getParameterValues("stability");
		String[] viewresult = req.getParameterValues("viewresult");

		CommonDAO commonDaoPerson = new CommonDAO();
		PreparedStatement pstPerson = commonDaoPerson.getPreparedStatement(SQL_UPDATE_PERSON_MGR);

		CommonDAO commonDaoResume = new CommonDAO();
		PreparedStatement pstResume = commonDaoResume.getPreparedStatement(SQL_UPDATE_RESUME_MGR);
		for (int i = 0; i < resumeid.length; i++) {
			try {
				pstPerson.setInt(1, Integer.parseInt(langskill[i]));
				pstPerson.setInt(2, Integer.parseInt(sdskill[i]));
				pstPerson.setInt(3, Integer.parseInt(techskill[i]));
				pstPerson.setInt(4, Integer.parseInt(stability[i]));
				pstPerson.setInt(5, Integer.parseInt(resumeid[i]));

				pstResume.setInt(1, Integer.parseInt(viewresult[i]));
				pstResume.setDate(2, null);
				pstResume.setString(3, viewerName);
				pstResume.setInt(4, Integer.parseInt(resumeid[i]));
			} catch (NumberFormatException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}

			commonDaoPerson.updateBatchSql();
			commonDaoResume.updateBatchSql();
		}
		commonDaoPerson.releaseSql();
		commonDaoResume.releaseSql();
		PageDispatcher.forwardByPath("/Pages/updateSuccess.jsp", req, resp);
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		PageDispatcher.dispatcher(resp, "Pages/404.html");
	}
}

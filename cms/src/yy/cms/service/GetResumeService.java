package yy.cms.service;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import yy.cms.dao.CommonDAO;
import yy.cms.tools.PageDispatcher;
import yy.cms.tools.SessionObject;
import yy.cms.vo.ResumeDetailVO;
import yy.cms.vo.ResumeVO;

public class GetResumeService {
	
	private final static String SQL_ALLRESUME = "SELECT  COUNT(R.JOBID) AS RESUMECOUNT,R.JOBID,J.JOBNAME,J.PUBDATE,D.DEPARTMENTNAME " +
			"FROM RESUMEINFO R,JOBINFO J,DEPARTMENTINFO D " +
			"WHERE R.JOBID=J.ID " +
			"AND J.DEPARTMENT = D.ID " +
			"AND J.PROJECTCODE = ? " +
			"GROUP BY R.JOBID";
	public List getResumeListByUser(HttpServletRequest req){
		
		HttpSession session = req.getSession();
		SessionObject so = (SessionObject) session.getAttribute(SessionObject.GLOBAL_SESSION);
		Integer projectCode = Integer.parseInt(so.getUserproject());
		
		CommonDAO comonDao = new CommonDAO(ResumeVO.class);
		PreparedStatement pst = comonDao.getPreparedStatement(SQL_ALLRESUME);
		try {
			pst.setInt(1, projectCode);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return comonDao.runSql(pst);
	}
}

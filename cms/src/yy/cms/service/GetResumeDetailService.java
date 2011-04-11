package yy.cms.service;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import yy.cms.dao.CommonDAO;
import yy.cms.vo.ResumeDetailVO;

public class GetResumeDetailService {

	private final static String SQL_RESUME_BYJOBID = "SELECT P.CHNNAME,P.PHONENUM,P.WORKEXPR,P.UNIVERSITY,P.DEGREE,P.WORKINGCOM,P.LANGSKILL,P.LANG,P.SDSKILL,P.TECHSKILL,P.STABILITY,"
			+ "J.JOBNAME, R.VIEWRESULT, R.ID "
			+ "FROM RESUMEINFO R,JOBINFO J,PERSONINFO P "
			+ "WHERE R.JOBID = J.ID "
			+ "AND R.PERSONID = P.ID " + "AND J.ID=?";

	private final static String SQL_RESUME = "SELECT P.CHNNAME,P.PHONENUM,P.WORKEXPR,P.UNIVERSITY,P.DEGREE,P.WORKINGCOM,P.LANGSKILL,P.LANG,P.SDSKILL,P.TECHSKILL,P.STABILITY,"
			+ "J.JOBNAME, R.VIEWRESULT, R.ID, P.ID AS PID "
			+ "FROM RESUMEINFO R,JOBINFO J,PERSONINFO P "
			+ "WHERE R.JOBID = J.ID " + "AND R.PERSONID = P.ID ";

	private final static String SQL_PERSON = "SELECT CHNNAME,PHONENUM,WORKEXPR,UNIVERSITY,DEGREE,WORKINGCOM,LANGSKILL,LANG,SDSKILL,TECHSKILL,STABILITY,P.ID "
			+ "FROM PERSONINFO";
	
	private final static String SQL_POSITION = "SELECT ID,JOBNAME FROM JOBINFO";

	public List getResumeDetailList(String jobid) {

		CommonDAO comonDao = new CommonDAO(ResumeDetailVO.class);
		PreparedStatement pst = comonDao.getPreparedStatement(SQL_RESUME_BYJOBID);
		int jid = Integer.parseInt(jobid);
		try {
			pst.setInt(1, jid);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return comonDao.runSql(pst);
	}

	public List getAllResumeDetailList() {

		CommonDAO comonDao = new CommonDAO(ResumeDetailVO.class);
		PreparedStatement pst = comonDao.getPreparedStatement(SQL_RESUME);
		return comonDao.runSql(pst);
	}

	public List getAllPeopleList() {
		CommonDAO comonDao = new CommonDAO(ResumeDetailVO.class);
		PreparedStatement pst = comonDao.getPreparedStatement(SQL_PERSON);
		return comonDao.runSql(pst);
	}
	
	public List getAllPosition(){
		CommonDAO comonDao = new CommonDAO(ResumeDetailVO.class);
		PreparedStatement pst = comonDao.getPreparedStatement(SQL_POSITION);
		return comonDao.runSql(pst);
	}
}

package yy.cms.dao;

import java.sql.PreparedStatement;
import java.util.List;

import yy.cms.base.BaseDAO;
import yy.cms.entity.UserInfoEntity;
import yy.cms.vo.ResumeVO;

public class CommonDAO extends BaseDAO {

	public CommonDAO(Class c) {
		setTableName(c);
	}
	
	public CommonDAO() {
	}

	public List runStaticSql(String sql) {
		PreparedStatement pst = getPreparedStatementFromSql(sql);
		return getAllEntity(pst);
	}

	public PreparedStatement getPreparedStatement(String sql) {
		return getPreparedStatementFromSql(sql);
	}

	public List runSql(PreparedStatement pst) {
		return getAllEntity(pst);
	}
	
	public int updateSql() {
		return runExecSql();
	}
	
	public int updateBatchSql(){
		return runExecBatchSql();
	}
	
	public void releaseSql() {
		releaseResouce();
	}
	
}

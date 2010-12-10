package yy.cms.dao;

import java.sql.PreparedStatement;

import yy.cms.base.BaseDAO;

public class CommonDAO extends BaseDAO {
	public void runSql(String sql){
		PreparedStatement pst = con.getPreparedStatement(sql);
	}
	
}

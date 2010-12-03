package yy.cms.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.apache.log4j.Logger;

import yy.cms.base.BaseDAO;
import yy.cms.entity.UserInfoEntity;

public class UserInfoDAO extends BaseDAO<UserInfoEntity> {

	private static Logger logger = Logger.getLogger(UserInfoDAO.class);

	public UserInfoDAO() {
		setTableName(UserInfoEntity.class);
	}

	public UserInfoEntity getUserInfo(String name) {
		PreparedStatement pst = getPreparedStatementForSelect(new String[] { UserInfoEntity.USERNAME });
		try {
			pst.setString(1, name);
		} catch (SQLException e) {
			logger.error(e.toString());
		}
		return getEntity(pst);
	}
}

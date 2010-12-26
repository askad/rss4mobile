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

	public int updateUserInfo(UserInfoEntity userInfoEntity) {
		PreparedStatement pst = getPreparedStatementForUpdata(userInfoEntity, new String[] { UserInfoEntity.USERNAME });

		int i = userInfoEntity.setUpdataFiled(pst, 1);
		try {
			pst.setString(i, userInfoEntity.getUsername());
		} catch (SQLException e) {
			logger.error(e.toString());
		}
		return runExecSql();
	}

	public int insertUserInfo(UserInfoEntity userInfoEntity) {
		PreparedStatement pst = getPreparedStatementForInsert(userInfoEntity);
		userInfoEntity.setInsertFiled(pst);
		return runExecSql();
	}

	public int deleteUserInfo(UserInfoEntity userInfoEntity) {
		PreparedStatement pst = getPreparedStatementForDelete(userInfoEntity, new String[] { UserInfoEntity.USERNAME });
		try {
			pst.setString(1, userInfoEntity.getUsername());
		} catch (SQLException e) {
			logger.error(e.toString());
		}
		return runExecSql();
	}
}

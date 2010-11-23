package yy.cms.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import yy.cms.base.BaseDAO;
import yy.cms.entity.UserInfoEntity;
import yy.cms.service.LoginService;
import yy.cms.tools.Logger;

public class UserInfoDAO extends BaseDAO<UserInfoEntity> {

	private final Logger logger = new Logger(LoginService.class);

	public UserInfoDAO() {
		setTableName(UserInfoEntity.class);
	}

	public UserInfoEntity getUserInfo(String name) {
		PreparedStatement pst = getPreparedStatementForSelect(new String[] { UserInfoEntity.USERNAME });
		try {
			pst.setString(1, name);
		} catch (SQLException e) {
			logger.printConsole(e.toString());
		}
		return getEntity(pst);
	}

	public static void main(String[] args) {
		System.out.println(UserInfoEntity.class.getSimpleName());
	}
}

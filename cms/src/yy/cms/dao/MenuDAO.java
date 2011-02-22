package yy.cms.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import org.apache.log4j.Logger;

import yy.cms.base.BaseDAO;
import yy.cms.entity.MenuEntity;

public class MenuDAO extends BaseDAO<MenuEntity> {

	private static Logger logger = Logger.getLogger(MenuDAO.class);

	public MenuDAO() {
		setTableName(MenuEntity.class);
	}

	public List<MenuEntity> getAllMenu() {
		PreparedStatement pst = getPreparedStatementForSelect(null);
		return getAllEntity(pst);
	}

	public int updateMenu(MenuEntity menuEntity, String name) {
		PreparedStatement pst = getPreparedStatementForUpdata(menuEntity, new String[] { MenuEntity.MENUNAME });

		int i = menuEntity.setUpdataField(pst, 1);
		try {
			pst.setString(i, name);// TODO
		} catch (SQLException e) {
			logger.error(e.toString());
		}
		return runExecSql();
	}

	public int insertUserInfo(MenuEntity menuEntity) {
		PreparedStatement pst = getPreparedStatementForInsert(menuEntity);
		menuEntity.setInsertField(pst);
		return runExecSql();
	}

	public int deleteUserInfo(MenuEntity menuEntity, String name) {
		PreparedStatement pst = getPreparedStatementForDelete(menuEntity, new String[] { MenuEntity.MENUNAME });
		try {
			pst.setString(1, name);// TODO
		} catch (SQLException e) {
			logger.error(e.toString());
		}
		return runExecSql();
	}
}

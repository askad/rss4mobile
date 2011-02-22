package yy.cms.dao;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.apache.log4j.Logger;

import yy.cms.base.BaseDAO;
import yy.cms.entity.PersonInfoEntity;

public class PersonInfoDAO extends BaseDAO<PersonInfoEntity> {

	private static Logger logger = Logger.getLogger(PersonInfoDAO.class);

	public PersonInfoDAO() {
		setTableName(PersonInfoEntity.class);
	}

	public PersonInfoEntity getPersonInfo(String id) {
		PreparedStatement pst = getPreparedStatementForSelect(new String[] { PersonInfoEntity.ID });
		try {
			pst.setString(1, id);
		} catch (SQLException e) {
			logger.error(e.toString());
		}
		return getEntity(pst);
	}

	public int updatePersonInfo(PersonInfoEntity personInfoEntity) {
		PreparedStatement pst = getPreparedStatementForUpdata(personInfoEntity, new String[] { PersonInfoEntity.ID });
		int i = personInfoEntity.setUpdataField(pst);
		try {
			pst.setInt(i, personInfoEntity.getId());
		} catch (SQLException e) {
			logger.error(e.toString());
		}
		return runExecSql();
	}

	public int insertPersonInfo(PersonInfoEntity personInfoEntity) {
		PreparedStatement pst = getPreparedStatementForInsert(personInfoEntity);
		personInfoEntity.setInsertField(pst);
		return runExecSql();
	}

	public int deletePersonInfo(PersonInfoEntity personInfoEntity) {
		PreparedStatement pst = getPreparedStatementForDelete(personInfoEntity, new String[] { PersonInfoEntity.ID });
		try {
			pst.setInt(1, personInfoEntity.getId());
		} catch (SQLException e) {
			logger.error(e.toString());
		}
		return runExecSql();
	}
}

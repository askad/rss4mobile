package yy.cms.base;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

import yy.cms.tools.DBConnectionManger;

public class BaseDBConnection<T> {
	private Connection con;

	private PreparedStatement st;
	private DBConnectionManger dbcm;

	public BaseDBConnection() {
		dbcm = DBConnectionManger.getInstance();
		con = dbcm.getCon();
	}

	public PreparedStatement getPreparedStatement(String sql) {
		try {
			if (con == null || con.isClosed()) {
				con = dbcm.getCon();
			}
			st = con.prepareStatement(sql);
			return st;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public List<T> execSelectSql(Class<T> destClass) {
		List<T> list = null;
		try {
			ResultSet rs = st.executeQuery();
			list = changeResultSetToEntity(rs, destClass);
			st.close();
			dbcm.freeCon(con);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

	public int execUpdSql() {
		int code = -1;
		try {
			code = st.executeUpdate();
			st.close();
			dbcm.freeCon(con);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return code;
	}

	private List<T> changeResultSetToEntity(ResultSet rs, Class<T> destClass) throws SQLException {
		List<T> rslist = new ArrayList<T>();

		try {
			while (rs.next()) {
				ResultSetMetaData metaData = rs.getMetaData();
				int columnCount = metaData.getColumnCount();
				T entity = destClass.newInstance();
				for (int i = 0; i < columnCount; i++) {
					String fieldName = metaData.getColumnName(i + 1).toLowerCase();
					int columnType = metaData.getColumnType(i + 1);

					// get entity field
					Field fieldObject = getFieldRecursive(destClass, fieldName);
					System.out.println(fieldName);
					fieldObject.setAccessible(true);
					
					fieldObject.set(entity, getValueFromType(rs, fieldName, columnType));
				}
				rslist.add(entity);
			}
			return rslist;
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		}
		return null;
	}

	private Field getFieldRecursive(Class c, String fieldName) throws SecurityException {

		try {
			return c.getDeclaredField(fieldName);
		} catch (NoSuchFieldException e) {
			Class superc = c.getSuperclass();
			if (superc != null) {
				return getFieldRecursive(superc, fieldName);
			}
		}
		return null;
	}

	/**
	 * DB value to java Object,just consider the date situation, others changed
	 * by java.String.
	 * 
	 * @param rs
	 * @param fieldName
	 * @param fieldType
	 * @return
	 * @throws SQLException
	 */
	private Object getValueFromType(ResultSet rs, String fieldName, int fieldType) throws SQLException {
		switch (fieldType) {
		case Types.TIMESTAMP:
			;
		case Types.TIME:
			return rs.getTimestamp(fieldName);

		case Types.DATE:
			return rs.getDate(fieldName);

		case Types.INTEGER:
			return rs.getInt(fieldName);

		default:
			return rs.getString(fieldName);
		}
	}
}

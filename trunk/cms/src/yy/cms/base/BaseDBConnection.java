package yy.cms.base;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;

public class BaseDBConnection<T> {
	private Connection con;

	private PreparedStatement st;

	private String dri = "oracle.jdbc.driver.OracleDriver";

	private String cons = "jdbc:oracle:thin:@20.193.27.67:1521:orcl";

	private String dbUserName = "vm1dta";

	private String dbUserPass = "vm1dta12#$";

	public PreparedStatement getPreparedStatement(String sql) {
		try {
			Class.forName(dri);
			con = DriverManager.getConnection(cons, dbUserName, dbUserPass);
			st = con.prepareStatement(sql);
			return st;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
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
			con.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

	private List<T> changeResultSetToEntity(ResultSet rs, Class<T> destClass) throws SQLException {
		List<T> rslist = new ArrayList<T>();

		try {
			while (rs.next()) {
				ResultSetMetaData metaData = rs.getMetaData();
				int columnCount = metaData.getColumnCount();
				for (int i = 0; i < columnCount; i++) {
					T entity = destClass.newInstance();

					String fieldName = metaData.getColumnName(i + 1).toLowerCase();
					int columnType = metaData.getColumnType(i + 1);

					// get entity field
					Field fieldObject = destClass.getDeclaredField(fieldName);
					fieldObject.setAccessible(true);
					fieldObject.set(entity, getValueFromType(rs, fieldName, columnType));

					rslist.add(entity);
				}

			}
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (NoSuchFieldException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
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

		default:
			return rs.getString(fieldName);
		}
	}
}
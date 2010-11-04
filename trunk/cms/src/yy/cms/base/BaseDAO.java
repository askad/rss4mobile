package yy.cms.base;

import java.sql.PreparedStatement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import yy.cms.tools.Commons;

public abstract class BaseDAO<T extends BaseEntity> {

	private final static String SELECT = "select * from ";

	private final static String WHERE = " where 1=1 ";

	private final static String PLACEHOLDER = " = ? ";

	private final static String AND = " and ";

	private String tableName;

	private BaseDBConnection<T> con;

	private Class<T> entityClass;

	public BaseDAO() {
		con = new BaseDBConnection<T>();
	}

	public List<T> getAllEntity(PreparedStatement pst) {
		return execSelectSql(pst);
	}

	public T getEntity(PreparedStatement pst) {
		List<T> results = execSelectSql(pst);
		if (results != null && results.size() > 0) {
			return results.get(0);
		}
		return null;
	}

	public void saveEntity() {

	}

	public void updateEntity() {

	}

	public void deleteEntity() {

	}

	public void deleteAllEntity() {

	}

	protected PreparedStatement getPreparedStatementForSelect(String[] names) {
		StringBuilder sbsql = new StringBuilder(SELECT);
		sbsql.append(tableName);
		sbsql.append(getConditationSql(names));
		return con.getPreparedStatement(sbsql.toString());
	}

	protected void setTableName(Class<T> cl) {
		this.entityClass = cl;
		this.tableName = cl.getSimpleName().replace("Entity", "");
	}

	private List<T> execSelectSql(PreparedStatement pst) {
		return con.execSelectSql(entityClass);
	}

	private String getConditationSql(String[] names) {
		if (names != null && names.length > 0) {
			StringBuilder sb = new StringBuilder(WHERE);
			for (String name : names) {
				sb.append(AND);
				sb.append(name);
				sb.append(PLACEHOLDER);
			}
			return sb.toString();
		}
		return Commons.BLANK;
	}

	@Deprecated
	protected void setParaMap(String[] names, String[] values) {
		Map<String, String> paraMap = new HashMap<String, String>();
		for (int i = 0; i < names.length; i++) {
			paraMap.put(names[i], values[i]);
		}
		// paras = paraMap;
	}

}

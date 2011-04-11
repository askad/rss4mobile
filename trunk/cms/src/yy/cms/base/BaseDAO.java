package yy.cms.base;

import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import yy.cms.tools.Commons;

public abstract class BaseDAO<T extends BaseEntity> {

	private static Logger logger = Logger.getLogger(BaseDAO.class);

	// SQL AREA
	private final static String SELECT = "SELECT * FROM ";
	private final static String WHERE = " WHERE 1=1 ";

	private final static String AND = " AND ";
	private final static String UPDATE = "UPDATE ";

	private final static String INSERT = "INSERT INTO ";
	private final static String PLACEHOLDER = " = ? ";

	private final static String DELETE = "DELETE * FROM ";
	
	public final static String DEFAULT_ORDER = " ORDER BY ID";


	// 
	private String tableName;

	protected BaseDBConnection<T> con;

	private Class<T> entityClass;
	protected String getOrderSql(){
		return DEFAULT_ORDER;
	}
	public BaseDAO() {
		con = new BaseDBConnection<T>();
	}

	protected List<T> getAllEntity(PreparedStatement pst) {
		return execSelectSql(pst);
	}

	protected T getEntity(PreparedStatement pst) {
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

	protected PreparedStatement getPreparedStatementFromSql(String sql) {
		return con.getPreparedStatement(sql);
	}
	
	protected PreparedStatement getPreparedStatementForSelect(String[] names) {
		StringBuilder sbsql = new StringBuilder(SELECT);
		sbsql.append(tableName);
		sbsql.append(getConditationSql(names));
		sbsql.append(getOrderSql());
		String sql = sbsql.toString();

		logger.info("SQL:" + sql);

		return con.getPreparedStatement(sql);
	}

	protected PreparedStatement getPreparedStatementForUpdata(BaseEntity entity, String[] names) {
		StringBuilder sbsql = new StringBuilder(UPDATE);
		sbsql.append(tableName);
		sbsql.append(entity.getUpdataString());
		sbsql.append(getConditationSql(names));
		String sql = sbsql.toString();
		logger.info("SQL:" + sql);
		return con.getPreparedStatement(sql);
	}

	protected PreparedStatement getPreparedStatementForInsert(BaseEntity entity) {
		entity.setUpdtime(new Timestamp(new Date().getTime()));
		StringBuilder sbsql = new StringBuilder(INSERT);
		sbsql.append(tableName);
		sbsql.append(entity.getInsertSql());
		String sql = sbsql.toString();
		logger.info("SQL:" + sql);
		return con.getPreparedStatement(sql);
	}

	protected PreparedStatement getPreparedStatementForDelete(BaseEntity entity, String[] names) {
		StringBuilder sbsql = new StringBuilder(DELETE);
		sbsql.append(tableName);
		sbsql.append(getConditationSql(names));
		String sql = sbsql.toString();
		logger.info("SQL:" + sql);
		return con.getPreparedStatement(sql);
	}

	protected int runExecSql() {
		return con.execUpdSql();
	}
	
	protected int runExecBatchSql() {
		return con.execUpdSqlBatch();
	}

	protected void releaseResouce() {
		con.release();
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

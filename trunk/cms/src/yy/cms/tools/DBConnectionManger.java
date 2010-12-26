package yy.cms.tools;

import java.io.IOException;
import java.sql.Connection;

public class DBConnectionManger {

	// oracle.jdbc.driver.OracleDriver
	private final static String dri = "com.mysql.jdbc.Driver";

	// jdbc:oracle:thin:@20.193.27.67:1521:orcl
	private final static String cons = "jdbc:mysql://localhost:3307/cms";

	// vm1dta
	private final static String dbUserName = "root";

	// vm1dta12#$
	private final static String dbUserPass = "";

	// 最小连接数
	private final static int minConns = 2;

	// 最大连接数
	private final static int maxConns = 10;

	// 最长连接时间
	private final static double maxConnTime = 1.0;

	// 日志文件
	private final static String db_logfile = Commons.LOG_PATH;

	private static DBConnectionManger dbcm = null;
	private DbConnectionBroker myBroker = null;

	private DBConnectionManger() {
		try {
			myBroker = new DbConnectionBroker(dri, cons, dbUserName, dbUserPass, minConns, maxConns, db_logfile,
					maxConnTime);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static synchronized DBConnectionManger getInstance() {
		if (dbcm == null) {
			dbcm = new DBConnectionManger();
		}
		return dbcm;
	}

	public Connection getCon() {
		return myBroker.getConnection();
	}

	public void freeCon(Connection con) {
		myBroker.freeConnection(con);
	}
}

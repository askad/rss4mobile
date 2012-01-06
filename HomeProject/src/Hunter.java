import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.SQLException;

public class Hunter {

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		java.sql.Connection conn;
		try {
			conn = java.sql.DriverManager.getConnection("jdbc:mysql://localhost/test", "root", null);
			java.sql.Statement stmt = conn.createStatement();
		} catch (SQLException e1) {
			e1.printStackTrace();
		}
		// "jdbc:mysql://localhost/test?useUnicode=true&characterEncoding=UTF-8",
		// "root", null);

		// java.sql.ResultSet rs = stmt.executeQuery("select * from MyUser");
//		  // 5. 显示结果集里面的数据
//		  while(rs.next()) {
//		   System.out.println(rs.getInt(1));
//		   System.out.println(rs.getString("username"));
//		   System.out.println(rs.getString("password"));
//		   System.out.println();
//		  }
//		  
//
//		  // 6. 释放资源
//		  rs.close();
//		  stmt.close();
//		  conn.close();
		File oldList = new File("");
		try {
			FileReader fr = new FileReader(oldList);
			BufferedReader br = new BufferedReader(fr);
			String line = null;
			while ((line = br.readLine()) != null) {

				// if(line)
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

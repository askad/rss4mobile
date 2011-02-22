package yy.cms.entity;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import yy.cms.base.BaseEntity;
import yy.cms.tools.UserAuthorization;

public class UserInfoEntity extends BaseEntity {

	// key area
	public static final String USERNAME = "username";
	public static final String USERPASS = "userpass";
	public static final String INSERTSQL = "(USERNAME,USERPASS,AUTHCODE,UPDIP,UPDUSER,PROJECTCODE) VALUES (?,?,?,?,?,?)";
	public static final String UPDATESQL = "SET PASS=?,AUTHCODE=?,UPDIP=?,UPDUSER=?,PROJECTCODE=?";
	// END

	private String username;
	private String userpass;
	private int authcode;
	private int projectcode;

	public int getAuthcode() {
		return authcode;
	}

	public void setAuthcode(int authcode) {
		this.authcode = authcode;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserpass() {
		return userpass;
	}

	public void setUserpass(String userpass) {
		this.userpass = userpass;
	}

	public int getProjectcode() {
		return projectcode;
	}

	public void setProjectcode(int projectcode) {
		this.projectcode = projectcode;
	}

	// for updata
	public int setUpdataField(PreparedStatement pst, int i) {
		try {
			pst.setString(i++, UserAuthorization.encrptPass(userpass));
			pst.setInt(i++, authcode);
			pst.setString(i++, updip);
			pst.setString(i++, upduser);
			pst.setInt(i++, projectcode);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return i;
	}

	public int setUpdataField(PreparedStatement pst) {
		return -1;
	}
	
	//for insert
	public void setInsertField(PreparedStatement pst) {
		try {
			pst.setString(1, username);
			setUpdataField(pst, 2);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public String getInsertSql() {
		return INSERTSQL;
	}

	public String getUpdataString() {
		return UPDATESQL;
	}
}

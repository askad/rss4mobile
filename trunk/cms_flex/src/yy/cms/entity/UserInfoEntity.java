package yy.cms.entity;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import yy.cms.base.BaseEntity;
import yy.cms.tools.UserAuthorization;

public class UserInfoEntity extends BaseEntity {

	// key area
	public static final String USERNAME = "username";
	public static final String USERPASS = "userpass";
	public static final String INSERTSQL = "(USERNAME,USERPASS,AUTHCODE,UPDIP,UPDUSER) VALUES (?,?,?,?,?)";
	public static final String UPDATESQL = "SET PASS=?,AUTHCODE=?,UPDIP=?,UPDUSER=?";
	// END

	private String username;
	private String userpass;
	private String authcode;

	public String getAuthcode() {
		return authcode;
	}

	public void setAuthcode(String authcode) {
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

	//for updata
	
	public int setUpdataFiled(PreparedStatement pst, int i) {
		try {
			pst.setString(i++, UserAuthorization.encrptPass(userpass));
			pst.setString(i++, authcode);
			pst.setString(i++, updip);
			pst.setString(i++, upduser);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return i;
	}

	//for insert
	public void setInsertFiled(PreparedStatement pst) {
		try {
			pst.setString(1, username);
			setUpdataFiled(pst, 2);
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

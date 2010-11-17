package yy.cms.entity;

import yy.cms.base.BaseEntity;

public class UserInfoEntity extends BaseEntity {

	// key area
	public static final String USERNAME = "username";
	public static final String USERPASS = "userpass";
	// END
	
	private String username;

	private String userpass;

	private String userid;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserId(String userid) {
		this.userid = userid;
	}

	public String getUserpass() {
		return userpass;
	}

	public void setUserpass(String userpass) {
		this.userpass = userpass;
	}
}

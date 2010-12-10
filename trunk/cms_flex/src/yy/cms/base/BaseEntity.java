package yy.cms.base;

import java.sql.PreparedStatement;
import java.sql.Timestamp;

abstract public class BaseEntity {
	protected String updUser;
	private Timestamp updTime;
	protected String updIp;
	public String getUpdIp() {
		return updIp;
	}
	public void setUpdIp(String updIp) {
		this.updIp = updIp;
	}
	public Timestamp getUpdTime() {
		return updTime;
	}
	public void setUpdTime(Timestamp updTime) {
		this.updTime = updTime;
	}
	public String getUpdUser() {
		return updUser;
	}
	public void setUpdUser(String updUser) {
		this.updUser = updUser;
	}
	
	abstract public String getInsertSql();
	abstract public String getUpdataString();
	abstract public int setUpdataFiled(PreparedStatement pst, int i);
	abstract public void setInsertFiled(PreparedStatement pst);
}

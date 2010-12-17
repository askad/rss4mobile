package yy.cms.base;

import java.sql.PreparedStatement;
import java.sql.Timestamp;

abstract public class BaseEntity {
	private int id;
	public String upduser;
	public Timestamp updtime;
	public String updip; 
	
	
	public String getUpdip() {
		return updip;
	}
	public void setUpdip(String updip) {
		this.updip = updip;
	}
	public Timestamp getUpdtime() {
		return updtime;
	}
	public void setUpdtime(Timestamp updtime) {
		this.updtime = updtime;
	}
	public String getUpduser() {
		return upduser;
	}
	public void setUpduser(String upduser) {
		this.upduser = upduser;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	abstract public String getInsertSql();
	abstract public String getUpdataString();
	abstract public int setUpdataFiled(PreparedStatement pst, int i);
	abstract public void setInsertFiled(PreparedStatement pst);
}

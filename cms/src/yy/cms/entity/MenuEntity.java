package yy.cms.entity;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import yy.cms.base.BaseEntity;

public class MenuEntity extends BaseEntity {

	// key area
	public static final String MENUNAME = "menuname";
	public static final String INSERTSQL = "(MENUNAME,MENULINK,PARENTMENUID,UPDIP,UPDUSER) VALUES (?,?,?,?,?)";
	public static final String UPDATESQL = "SET MENUNAME=?,MENULINK=?,PARENTMENUID=?,UPDIP=?,UPDUSER=?";
	// END

	private String menuname;
	private String menulink;
	private int parentmenuid;

	public String getMenulink() {
		return menulink;
	}

	public void setMenulink(String menulink) {
		this.menulink = menulink;
	}

	public String getMenuname() {
		return menuname;
	}

	public void setMenuname(String menuname) {
		this.menuname = menuname;
	}

	public int getParentmenuid() {
		return parentmenuid;
	}

	public void setParentmenuid(int parentmenuid) {
		this.parentmenuid = parentmenuid;
	}

	// for updata
	public int setUpdataField(PreparedStatement pst, int i) {
		try {
			pst.setString(i++, menuname);
			pst.setString(i++, menulink);
			pst.setInt(i++, parentmenuid);
			pst.setString(i++, updip);
			pst.setString(i++, upduser);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return i;
	}

	// for insert
	public void setInsertField(PreparedStatement pst) {
		setUpdataField(pst, 1);
	}

	public String getInsertSql() {
		return INSERTSQL;
	}

	public String getUpdataString() {
		return UPDATESQL;
	}
}

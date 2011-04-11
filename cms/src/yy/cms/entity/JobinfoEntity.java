package yy.cms.entity;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import yy.cms.base.BaseEntity;

public class JobinfoEntity extends BaseEntity {

	// key area
	public static final String INSERTSQL = "(CHNNAME,ENGNAME,PHONENUM,WORKEXPR,UNIVERSITY,DEGREE,WORKINGCOM,WORKHISTORY,COMMENTS,LANG) VALUES (?,?,?,?,?,?,?,?,?,?)";
	public static final String UPDATESQL = " SET CHNNAME=?,ENGNAME=?,PHONENUM=?,WORKEXPR=?,UNIVERSITY=?,DEGREE=?,WORKINGCOM=?,WORKHISTORY=?,COMMENTS=?,LANG=?,LANGSKILL=?,SDSKILL=?,STABILITY=?,TECHSKILL=?";
	// END

	private String jobname;
	private int projectcode;
	private Date pubdate;
	private int department;

	@Override
	public String getInsertSql() {
		return INSERTSQL;
	}

	@Override
	public String getUpdataString() {
		return UPDATESQL;
	}

	@Override
	public void setInsertField(PreparedStatement pst) {
	}

	@Override
	public int setUpdataField(PreparedStatement pst) {
		setInsertField(pst);
		return 15;
	}
}

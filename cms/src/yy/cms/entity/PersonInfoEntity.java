package yy.cms.entity;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import yy.cms.base.BaseEntity;

public class PersonInfoEntity extends BaseEntity {

	// key area
	public static final String INSERTSQL = "(CHNNAME,ENGNAME,PHONENUM,WORKEXPR,UNIVERSITY,DEGREE,WORKINGCOM,WORKHISTORY,COMMENTS,LANG) VALUES (?,?,?,?,?,?,?,?,?,?)";
	public static final String UPDATESQL = "SET CHNNAME=?,ENGNAME=?,PHONENUM=?,WORKEXPR=?,UNIVERSITY=?,DEGREE=?,WORKINGCOM=?,WORKHISTORY=?,COMMENTS=?,LANG=?,LANGSKILL=?,SDSKILL=?,STABILITY=?,TECHSKILL=?";
	// END

	private String chnname;
	private String engname;
	private int phonenum;
	private int workexpr;
	private String university;
	private int degree;
	private String workingcom;
	private int langskill;
	private int techskill;
	private int sdskill;
	private int stability;
	private String workhistory;
	private String comments;
	private String lang;

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
		try {
			pst.setString(1, chnname);
			pst.setString(2, engname);
			pst.setInt(3, phonenum);
			pst.setInt(4, workexpr);
			pst.setString(5, university);
			pst.setInt(6, degree);
			pst.setString(7, workingcom);
			pst.setString(8, workhistory);
			pst.setString(9, comments);
			pst.setString(10, lang);
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	@Override
	public int setUpdataField(PreparedStatement pst) {
		try {
			setInsertField(pst);
			pst.setInt(11, langskill);
			pst.setInt(12, sdskill);
			pst.setInt(13, stability);
			pst.setInt(14, techskill);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 15;
	}

	public String getChnname() {
		return chnname;
	}

	public void setChnname(String chnname) {
		this.chnname = chnname;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public int getDegree() {
		return degree;
	}

	public void setDegree(int degree) {
		this.degree = degree;
	}

	public String getEngname() {
		return engname;
	}

	public void setEngname(String engname) {
		this.engname = engname;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}

	public int getLangskill() {
		return langskill;
	}

	public void setLangskill(int langskill) {
		this.langskill = langskill;
	}

	public int getPhonenum() {
		return phonenum;
	}

	public void setPhonenum(int phonenum) {
		this.phonenum = phonenum;
	}

	public int getSdskill() {
		return sdskill;
	}

	public void setSdskill(int sdskill) {
		this.sdskill = sdskill;
	}

	public int getStability() {
		return stability;
	}

	public void setStability(int stability) {
		this.stability = stability;
	}

	public int getTechskill() {
		return techskill;
	}

	public void setTechskill(int techskill) {
		this.techskill = techskill;
	}

	public String getUniversity() {
		return university;
	}

	public void setUniversity(String university) {
		this.university = university;
	}

	public int getWorkexpr() {
		return workexpr;
	}

	public void setWorkexpr(int workexpr) {
		this.workexpr = workexpr;
	}

	public String getWorkhistory() {
		return workhistory;
	}

	public void setWorkhistory(String workhistory) {
		this.workhistory = workhistory;
	}

	public String getWorkingcom() {
		return workingcom;
	}

	public void setWorkingcom(String workingcom) {
		this.workingcom = workingcom;
	}
	
}

package yy.cms.vo;

import java.util.Date;

public class ResumeVO {
	private int jobid;
	private Date pubdate;
	private String jobname;
	private String departmentname;
	private int resumecount;
	public int getJobid() {
		return jobid;
	}
	public void setJobid(int jobid) {
		this.jobid = jobid;
	}
	public String getJobname() {
		return jobname;
	}
	public void setJobname(String jobname) {
		this.jobname = jobname;
	}
	public Date getPubdate() {
		return pubdate;
	}
	public void setPubdate(Date pubdate) {
		this.pubdate = pubdate;
	}
	public int getResumecount() {
		return resumecount;
	}
	public void setResumecount(int resumecount) {
		this.resumecount = resumecount;
	}
	public String getDepartmentname() {
		return departmentname;
	}
	public void setDepartmentname(String departmentname) {
		this.departmentname = departmentname;
	}
	
}

package yy.cms.tools;

public class SessionObject {
	
	public final static String GLOBAL_SESSION = "GLOBALSESSION";
	public final static String USERNAME = "username";
	private String username;
	private String useerid;
	private String userproject;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getUseerid() {
		return useerid;
	}
	public void setUseerid(String useerid) {
		this.useerid = useerid;
	}
	public String getUserproject() {
		return userproject;
	}
	public void setUserproject(String userproject) {
		this.userproject = userproject;
	}
}

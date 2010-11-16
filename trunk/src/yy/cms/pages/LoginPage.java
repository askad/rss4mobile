package yy.cms.pages;

import yy.cms.base.BasePage;

public class LoginPage extends BasePage{
    private String uname;
    private String pword;
    public String getUname() {
        return uname;
    }
    public void setUname(String uname) {
        this.uname = uname;
    }
    public String getPword() {
        return pword;
    }
    public void setPword(String pword) {
        this.pword = pword;
    }
}

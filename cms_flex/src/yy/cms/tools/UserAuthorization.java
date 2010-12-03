package yy.cms.tools;

import yy.cms.entity.UserInfoEntity;

public class UserAuthorization {

	
	public int doAuth(){
		return 0;
	}
    public static UserInfoEntity checkUserPass(String user, String pass) {

        if (user.equals(pass)) {
            return null;
        }

        return null;
    }
}

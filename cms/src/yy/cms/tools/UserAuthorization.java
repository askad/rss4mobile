package yy.cms.tools;

import yy.cms.entity.UserInfoEntity;

public class UserAuthorization {

    public static UserInfoEntity checkUserPass(String user, String pass) {

        if (user.equals(pass)) {
            return null;
        }

        return null;
    }
    
    public static String encrptPass(String pass){
    	return pass;
    }
}

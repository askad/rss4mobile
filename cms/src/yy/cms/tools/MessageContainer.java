package yy.cms.tools;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public class MessageContainer {
    
    private static Map<String,Map<String,String>> errMsgContainer = getInitContainer();
    public MessageContainer(){
        
    }
    
    public static String getErrorMsg(HttpServletRequest req, String key){
        
        String lang = (String)req.getSession().getAttribute(Commons.LANGUAGE);
        lang = (null == lang ? Commons.CHN : lang);
        
        Map<String,String> containerLang = errMsgContainer.get(lang);
        if (containerLang != null && containerLang.containsKey(key)) {
            return (String) containerLang.get(key);
        }
        return Commons.BLANK;
    }
    
    private static Map<String,Map<String,String>> getInitContainer(){
        
        Map<String,Map<String,String>> container = new HashMap<String,Map<String,String>>();
        
        String[] langs = Commons.LANGUAGES;
        for(String lang:langs){
            
            Map<String,String> containerLang = new HashMap<String,String>();
            //TODO need to init it
            containerLang.put(Commons.ERR_MSG_LOGIN_FAILED, "valid user name or password");
            container.put(lang, containerLang);
        }
        
        return container;
    }
}

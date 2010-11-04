package yy.cms.tools;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * Container for page label,Use Pattern Singletone
 * @author askad
 *
 */
public class DescriptorI18N {

    private final static String DEPART = "_";
    private static DescriptorI18N descriptorI18N = null;
    private static Map<String, Map<String, String>> descriptionContainer = new HashMap<String, Map<String, String>>();

    private DescriptorI18N() {
        //descriptionContainer.put(Commons.CHN, getContainerMap(Commons.CHN));
        // descriptionContainer.put("eng", getContainerMap("eng"));
    }

    private Map<String,String> getContainerMap(String lang) {
        Map<String,String> container = new HashMap<String,String>();
        Properties properties = new Properties();
        try {
            properties.load(new FileInputStream("D://develop_SRC//CandidateManageSystem//War//configs//dictionary_"
                    + lang + ".property"));
            Enumeration<?> e = properties.propertyNames();
            String name;
            String value;
            while (e.hasMoreElements()) {
                name = (String) e.nextElement();
                value = properties.getProperty(name);
                container.put(name, decode(value));
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return container;
    }

    public static DescriptorI18N getInstance() {
        if (null == descriptorI18N) {
            descriptorI18N = new DescriptorI18N();
            System.out.println("DescriptorI18N Initlize");
            return descriptorI18N;
        }
        return descriptorI18N;
    }

    public static String get(String lang, String pageName, String itemId) {

        Map<String,String> containerLang = descriptionContainer.get(lang);
        String key = pageName + DEPART + itemId;
        if (containerLang != null && containerLang.containsKey(key)) {
            return (String) containerLang.get(key);
        }
        return null;
    }

    private String decode(String str){
        try {
            return new String(str.getBytes("ISO-8859-1"),"UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }
    public static void main(String[] args) {
        try {
            BufferedReader FIS = new BufferedReader(new FileReader("D://develop_SRC//CandidateManageSystem//War//configs//dictionary_" + "chn" + ".property"));
            String s; 
           try {
            while((s=FIS.readLine())!=null){
                   System.out.println(s);
               }
        } catch (IOException e) {
            e.printStackTrace();
        }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}

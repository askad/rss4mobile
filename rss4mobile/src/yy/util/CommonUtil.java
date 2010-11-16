package yy.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.cache.Cache;

import yy.YyConst;

public class CommonUtil {

    private static Cache cache = CacheManagerYy.getCacheInstance();

    public static void printLog(String msg) {
        System.out.println(msg);
    }

    /**
     * 
     * @param pageId
     * @param flg
     *            when true calc the Pre page,false calc the Next.
     * @return
     */
    public static String calcPage(String pageId, boolean flg) {
        String resultPage = null;
        if (pageId != null) {
            int pageIdTemp = Integer.parseInt(pageId);
            // the first page does not display the "Pre Page"
            if (!pageId.equals("1") && flg) {
                pageIdTemp--;
                resultPage = String.valueOf(pageIdTemp);
                // the Next page
            } else if (!flg) {
                pageIdTemp++;
                resultPage = String.valueOf(pageIdTemp);
            }

        }
        return resultPage;
    }

    public static String getFormatterDate(String srcDate) {
        SimpleDateFormat df = new SimpleDateFormat(YyConst.PATTERN_DATE);
        return df.format(new Date(srcDate));
    }

    /**
     * 
     * @param url
     * @return
     */
    public static boolean checkHasCache(String cacheKey, String url) {

        StringBuilder urlKey = new StringBuilder(UserInfor.getUserId());
        urlKey.append(cacheKey);
        urlKey.append(url);
        if (cache.containsKey(urlKey.toString())) {
            return true;
        }
        return false;
    }

    public static void main(String[] args) {
    }
}

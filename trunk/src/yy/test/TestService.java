package yy.test;

import java.io.IOException;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import yy.dao.PMF;
import yy.entity.GroupEntity;
import yy.entity.SiteEntity;

public class TestService extends HttpServlet {

    private final static String ACTION = "action";

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String action = (String) req.getParameter(ACTION);
        PersistenceManager pm = PMF.getInstance().getPersistenceManager();
        if (action.equals("delete")) {
            List<GroupEntity> entityGroupList = (List<GroupEntity>) pm.newQuery(GroupEntity.class).execute();
            pm.deletePersistentAll(entityGroupList);
            List<SiteEntity> entitySiteList = (List<SiteEntity>) pm.newQuery(SiteEntity.class).execute();
            pm.deletePersistentAll(entitySiteList);
        } else if (action.equals("reset")) {
            GroupEntity entityGroup = new GroupEntity();
            entityGroup.setGroupName("test1");
            entityGroup.setUserId("askadyy");
            entityGroup.setGroupId(1L);

            SiteEntity entitySite = new SiteEntity();
            entitySite.setGroupId(1L);
            entitySite.setSiteId(11L);
            entitySite.setSiteName("my");
            entitySite.setSiteUrl("http://localhost:8080/cnbeta.xml");
            entitySite.setUserId("askadyy");

            GroupEntity entityGroup1 = new GroupEntity();
            entityGroup1.setGroupName("test2");
            entityGroup1.setUserId("askadyy");
            entityGroup1.setGroupId(2L);

            SiteEntity entitySite1 = new SiteEntity();
            entitySite1.setGroupId(2L);
            entitySite1.setSiteId(12L);
            entitySite1.setSiteName("my2");
            entitySite1.setSiteUrl("http://localhost:8080/cnbeta.xml");
            entitySite1.setUserId("askadyy");

            SiteEntity entitySite2 = new SiteEntity();
            entitySite2.setGroupId(2L);
            entitySite2.setSiteId(13L);
            entitySite2.setSiteName("my3");
            entitySite2.setSiteUrl("http://localhost:8080/cnbeta.xml");
            entitySite2.setUserId("askadyy");
            try {
                pm.makePersistent(entityGroup);
                pm.makePersistent(entityGroup1);
                pm.makePersistent(entitySite);
                pm.makePersistent(entitySite1);
                pm.makePersistent(entitySite2);
            } catch (Exception e) {
                resp.getWriter().write(e.getMessage());
                return;
            }
        }
        resp.getWriter().write(action + " done!");
        // URL postUrl = new URL(action);
        // HttpURLConnection connection = (HttpURLConnection)
        // postUrl.openConnection();
        // // connection.setConnectTimeout(TIME_OUT);
        // // connection.setReadTimeout(TIME_OUT);
        // // connection.setDoOutput(true);
        // // connection.setRequestMethod("POST");
        // // connection.setUseCaches(false);
        // // connection.setInstanceFollowRedirects(true);
        // // connection.setRequestProperty("Content-Type",
        // // "application/x-www-form-urlencoded");
        // connection.connect();
        // BufferedReader brd = new BufferedReader(new
        // InputStreamReader(connection.getInputStream()));
        // char[] s=new char[1024];
        // resp.setCharacterEncoding("UTF-8");
        // while (brd.read(s) != -1) {
        // System.out.println(new String((new String(s)).getBytes(),"UTF-8"));
        // resp.getWriter().write(new String((new
        // String(s)).getBytes(),"UTF-8"));
        // resp.getWriter().flush();
        // }
        // // DataOutputStream out = new
        // // DataOutputStream(connection.getOutputStream());
        // // String content = "mobile=" + mobile + "&uuid=" + uuid +
        // "&password="
        // // + password + "&friend="
        // // + convertArrayToJSONString(friends) + "&message=" +
        // // URLEncoder.encode(message, "utf-8");
        // // out.writeBytes(content);
        // //
        // // out.flush();
        // // out.close();

    }
}
/*
 * http://blog.sina.cn/prog/wapsite/blog/ArtList.php?oid=sina&uid=1191258123
 * 
 * http://blog.sina.cn/prog/wapsite/blog/ArtList.php?oid=sina&uid=1191258123
 * 
 * http://blog.sina.cn/prog/wapsite/blog/ComPub.php?oid=sina&uid=1191258123&nid=
 * 4701280
 * b0100ixd0&title=%E9%9F%A9%E5%AF%92&atitle=2010%E5%B9%B405%E6%9C%8827%E6
 * %97%A5&sumcom=8798&cflag=1
 * 
 * 
 * http://3g.sina.com.cn/prog/wapsite/blog/ComPub.php?oid=sina&uid=1747443761&nid
 * =
 * 6827e0310100ii8y&title=oyyo%E7%9A%84%E5%8D%9A%E5%AE%A2&atitle=%E6%AC%A2%E8%BF
 * %
 * 8E%E6%82%A8%E5%9C%A8%E6%96%B0%E6%B5%AA%E5%8D%9A%E5%AE%A2%E5%AE%89%E5%AE%B6&sumcom=2&cflag=1&gsid=3_58a251a38397e717d2d456c5893220105a&PHPSESSID=d70ba09f23b274527f0fd8ae7c7cc453
 */
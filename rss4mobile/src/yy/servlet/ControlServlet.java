package yy.servlet;

import java.io.IOException;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import yy.dao.GeneralDao;
import yy.dao.PMF;
import yy.entity.GroupEntity;
import yy.entity.SiteEntity;

public class ControlServlet extends HttpServlet {

    private final static String ACTION = "action";

    private final static String ACTION_ADD = "add";

    private final static String ACTION_DELETE = "del";

    private final static String ACTION_CHANGE = "cha";

    private final static String UNLEGAL_ERROR = "....sha ye bu shuo le zou hao....";

    private GeneralDao generalDao;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.getWriter().write("GET:" + UNLEGAL_ERROR);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String action = req.getParameter(ACTION);
        if (ACTION_ADD.equals(action)) {

            resp.getWriter().write(doAdd(req));
        } else if (ACTION_DELETE.equals(action)) {

            resp.getWriter().write(doDelete(req));
        } else if (ACTION_CHANGE.equals(action)) {

            resp.getWriter().write(doChange(req));
        } else {
            resp.getWriter().write(UNLEGAL_ERROR);
        }
    }

    private String doAdd(HttpServletRequest req) {

        SiteEntity siteEntity = new SiteEntity();
        siteEntity.setGroupId(Long.parseLong(req.getParameter("groupid")));
        siteEntity.setSiteName(req.getParameter("sitename"));
        siteEntity.setSiteUrl(req.getParameter("siteurl"));
        PersistenceManager pm = PMF.getInstance().getPersistenceManager();
        pm.makePersistent(siteEntity);
        return "add done!";
    }

    private String doDelete(HttpServletRequest req) {

        PersistenceManager pm = PMF.getInstance().getPersistenceManager();
        Long siteId = Long.parseLong(req.getParameter("siteid"));

        SiteEntity siteEntity = pm.getObjectById(SiteEntity.class, siteId);
        pm.deletePersistentAll(siteEntity);
        return "delete done!";
    }

    private String doChange(HttpServletRequest req) {

        PersistenceManager pm = PMF.getInstance().getPersistenceManager();
        Long siteId = Long.parseLong(req.getParameter("siteid"));

        SiteEntity siteEntity = pm.getObjectById(SiteEntity.class, siteId);
        siteEntity.setGroupId(Long.parseLong(req.getParameter("groupid")));
        siteEntity.setSiteName(req.getParameter("sitename"));
        siteEntity.setSiteUrl(req.getParameter("siteurl"));

        pm.close();
        return "change done!";
    }

}

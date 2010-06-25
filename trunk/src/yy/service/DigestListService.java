package yy.service;

import java.util.List;

import javax.jdo.Query;

import yy.YyConst;
import yy.dao.GeneralDao;
import yy.entity.EntitySite;
import yy.util.ParserRss;
import yy.util.UserInfor;
import yy.vo.RssListVo;

public class DigestListService {

    private ParserRss parserRssService;
    private GeneralDao generalDao;

    private boolean endPageFlg;

    // Logger log = new Logger();

    public DigestListService() {
        parserRssService = new ParserRss();
        generalDao = new GeneralDao();
    }

    /**
     * 判断memcache中是否有缓存，沒有则根据groupId取得当前group下所有news(同时解析xml);。
     */
    public List<RssListVo> getRssData(String groupId, String pageIdTemp) {

        String key = UserInfor.getUserId();
        int pageId = Integer.parseInt(pageIdTemp);
        List<RssListVo> rssListVoList = null;
        List<RssListVo> rssListVoListTemp = null;
        Query querySite = generalDao.prepareQuery(EntitySite.class, "groupId", "Long");
        List<EntitySite> resultSite = (List<EntitySite>) querySite.execute(Long.parseLong(groupId));
        if (resultSite.size() > 0) {
            rssListVoListTemp = parserRssService.getRssDataFromSite(resultSite);
        }
        // pagination
        rssListVoList = rssListVoListTemp.subList((pageId - 1) * YyConst.PAGE_LINE, pageId * YyConst.PAGE_LINE);

        if (pageId * YyConst.PAGE_LINE >= rssListVoListTemp.size()) {
            endPageFlg = true;
        }
        return rssListVoList;
    }

    public ParserRss getParserRssService() {
        return parserRssService;
    }

    public GeneralDao getGeneralDao() {
        return generalDao;
    }

    public boolean isEndPageFlg() {
        return endPageFlg;
    }
}

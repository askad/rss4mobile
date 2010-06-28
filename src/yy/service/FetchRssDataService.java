package yy.service;

import java.util.Iterator;
import java.util.List;

import javax.jdo.Query;

import yy.dao.GeneralDao;
import yy.entity.GroupEntity;
import yy.entity.SiteEntity;
import yy.util.ParserRss;
import yy.util.UserInfor;
import yy.vo.GroupSiteMap;
import yy.vo.GroupVo;
import yy.vo.RssListVo;

public class FetchRssDataService {

    private ParserRss parserRssService;
    private GeneralDao generalDao;

    public FetchRssDataService() {
        parserRssService = new ParserRss();
        generalDao = new GeneralDao();
    }

    // Logger log = new Logger();
    /**
     * ��ʼ��xml���ж�memcache��xml�Ƿ��Ǿɰ棬������£����򷵻�ԭ�С�
     */
    public Iterator<GroupVo> initGroupRssData() {

        GroupSiteMap groupSiteMap = null;
        String key = UserInfor.getUserId();
        groupSiteMap = initAll(key);
        return groupSiteMap.getGroupVoList();
    }

    /**
     * �����û�ID��ѯDB����������group����Ϊkey����allDataList
     * 
     * @param userId
     * @return
     */
    private GroupSiteMap initAll(String userId) {

        GroupSiteMap groupSiteMap = new GroupSiteMap();
        // 1.search all groups from DB by userId

        Query queryGroup = generalDao.prepareQuery(GroupEntity.class, "userId", "String");

        Query querySite = generalDao.prepareQuery(SiteEntity.class, "groupId", "Long");

        List<GroupEntity> results = (List<GroupEntity>) queryGroup.execute(userId);
        for (GroupEntity groupEntity : results) {
            GroupVo groupVo = new GroupVo();
            groupVo.setGroupId(groupEntity.getGroupId());
            groupVo.setGroupName(groupEntity.getGroupName());
            // 2.search all sites from DB by groupId and userId
            List<SiteEntity> resultSite = (List<SiteEntity>) querySite.execute(groupEntity.getGroupId());
            List<RssListVo> rssListVoList = parserRssService.getRssDataFromSite(resultSite);
            groupVo.setCount(rssListVoList.size());
            groupSiteMap.put(groupVo, rssListVoList);
        }
        querySite.closeAll();
        queryGroup.closeAll();
        return groupSiteMap;
    }

    public ParserRss getParserRssService() {
        return parserRssService;
    }

    public GeneralDao getGeneralDao() {
        return generalDao;
    }
}

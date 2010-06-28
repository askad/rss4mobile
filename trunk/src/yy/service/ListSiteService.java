package yy.service;

import java.util.ArrayList;
import java.util.List;

import yy.dao.GeneralDao;
import yy.entity.GroupEntity;
import yy.entity.SiteEntity;
import yy.vo.SiteListVo;

public class ListSiteService {

    GeneralDao generalDao;

    public ListSiteService() {
        generalDao = new GeneralDao();
    }

    public List<SiteListVo> getSiteList() {
        List<SiteListVo> siteListVoList = new ArrayList<SiteListVo>();
        List<GroupEntity> entityGroupList = generalDao.queryByUserId(GroupEntity.class);
        for (GroupEntity groupEntity : entityGroupList) {
            List<SiteEntity> resultSite = generalDao.query(SiteEntity.class, "groupId", "Long", groupEntity
                    .getGroupId()); 
            for (SiteEntity siteEntity : resultSite) {
                SiteListVo siteListVo = new SiteListVo();
                siteListVo.setGroupId(groupEntity.getGroupId().toString());
                siteListVo.setGroupName(groupEntity.getGroupName());
                siteListVo.setSiteId(siteEntity.getSiteId().toString());
                siteListVo.setSiteName(siteEntity.getSiteName());
                siteListVo.setSiteUrl(siteEntity.getSiteUrl());
                siteListVoList.add(siteListVo);
            }
        }
        return siteListVoList;
    }
    
    public List<GroupEntity> getGroupList(){
        return generalDao.queryByUserId(GroupEntity.class);
    }
}

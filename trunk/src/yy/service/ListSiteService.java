package yy.service;

import java.util.ArrayList;
import java.util.List;

import yy.dao.GeneralDao;
import yy.entity.EntityGroup;
import yy.entity.EntitySite;
import yy.vo.SiteListVo;

public class ListSiteService {

    GeneralDao generalDao;

    public ListSiteService() {
        generalDao = new GeneralDao();
    }

    public List<SiteListVo> getSiteList() {
        List<SiteListVo> siteListVoList = new ArrayList<SiteListVo>();
        List<EntityGroup> entityGroupList = generalDao.queryByUserId(EntityGroup.class);
        for (EntityGroup entityGroup : entityGroupList) {
            List<EntitySite> resultSite = generalDao.query(EntitySite.class, "groupId", "Long", entityGroup
                    .getGroupId()); 
            for (EntitySite entitySite : resultSite) {
                SiteListVo siteListVo = new SiteListVo();
                siteListVo.setGroupId(entityGroup.getGroupId().toString());
                siteListVo.setGroupName(entityGroup.getGroupName());
                siteListVo.setSiteId(entitySite.getSiteId().toString());
                siteListVo.setSiteName(entitySite.getSiteName());
                siteListVo.setSiteUrl(entitySite.getSiteUrl());
                siteListVoList.add(siteListVo);
            }
        }
        return siteListVoList;
    }
    
    public List<EntityGroup> getGroupList(){
        return generalDao.queryByUserId(EntityGroup.class);
    }
}

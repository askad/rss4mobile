package yy.vo;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class GroupSiteMap implements Serializable {

    private static final long serialVersionUID = 1L;
    private Map<String, GroupVo> groupMap;
	private Map<String, List<RssListVo>> siteMap;

	public GroupSiteMap() {
		groupMap = new HashMap<String, GroupVo>();
		siteMap = new HashMap<String, List<RssListVo>>();
	}

	public List<RssListVo> getRssListVo(String key) {
		return siteMap.get(key);
	}

	public GroupVo getGroupVo(String key) {
		return groupMap.get(key);
	}

	public Iterator<GroupVo> getGroupVoList() {
		return groupMap.values().iterator();
	}

	public void put(GroupVo key, List<RssListVo> value) {
		groupMap.put(key.getGroupId().toString(), key);
		siteMap.put(key.getGroupId().toString(), value);
	}

}

package yy.util;

import java.util.HashMap;
import java.util.Map;

import javax.cache.Cache;
import javax.cache.CacheException;
import javax.cache.CacheFactory;
import javax.cache.CacheManager;

import com.google.appengine.api.memcache.stdimpl.GCacheFactory;

public class CacheManagerYy {

	private static int EXPIRATION_TIME = 86400;//24h
	private static Cache cache = null;

	public static Cache getCacheInstance() {

		if (cache != null) {
			return cache;
		}
		Map<Integer, Integer> props = new HashMap<Integer, Integer>();
		props.put(GCacheFactory.EXPIRATION_DELTA, EXPIRATION_TIME);
		try {
			CacheFactory cacheFactory = CacheManager.getInstance()
					.getCacheFactory();
			cache = cacheFactory.createCache(props);
		} catch (CacheException e) {
			e.printStackTrace();
		}
		return cache;
	}

}

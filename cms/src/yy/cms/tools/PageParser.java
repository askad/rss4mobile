package yy.cms.tools;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import yy.cms.base.BasePage;

public class PageParser {

	private static Map<String, String> pageMap = getInstancePageMap();

	public static BasePage getCurrentPageFromRequest(HttpServletRequest req, Class<? extends BasePage> c) {

		BasePage page = null;
		try {
			page = c.newInstance();
			Field[] fields = c.getDeclaredFields();
			for (Field f : fields) {
				String value = req.getParameter(f.getName());
				f.setAccessible(true);
				f.set(page, value);
			}
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}

		return page;
	}

	@SuppressWarnings("unchecked")
	public static Class<? extends BasePage> getPageFromName(String screenId) {

		if (pageMap.containsKey(screenId)) {
			try {
				return (Class<? extends BasePage>) Class.forName(pageMap.get(screenId));
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	private static Map<String, String> getInstancePageMap() {
		Map<String, String> pageMapTemp = new HashMap<String, String>();
		Properties properties = new Properties();
		try {
			properties.load(new FileInputStream(Commons.SCREENNAME_PROPERTY_PATH));
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		Enumeration<?> e = properties.propertyNames();
		while (e.hasMoreElements()) {
			String name = (String) e.nextElement();
			String value = properties.getProperty(name);
			pageMapTemp.put(name, value);
		}

		return pageMapTemp;
	}
}

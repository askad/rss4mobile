package yy.cms.tools;

import java.lang.reflect.Field;

import javax.servlet.http.HttpServletRequest;

public class Utils {
	public static boolean isEmpty(String str) {
		return (str == null) || (str.equals(Commons.BLANK));
	}

	public static void setObjectFromRequest(HttpServletRequest req, Object desc) {
		Field[] fields = desc.getClass().getDeclaredFields();
		try {
			for (Field descField : fields) {
				String name = descField.getName();
				String value = req.getParameter(name);
				if (value != null) {
					descField.setAccessible(true);
					Class type = descField.getType();
					if(type.equals(int.class)){
						descField.set(desc, Integer.parseInt(value));
						continue;
					}
					descField.set(desc, value);
				}
			}
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
	}
}

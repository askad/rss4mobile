package yy.cms.tools;

import java.util.HashMap;
import java.util.Map;

public class MessageContainer {

	private static Map<String, Map<String, String>> errMsgContainer = getInitContainer();

	public MessageContainer() {

	}

	public static String getErrorMsg(String lang, String key) {

		Map<String, String> containerLang = errMsgContainer.get(lang);
		if (containerLang != null && containerLang.containsKey(key)) {
			return (String) containerLang.get(key);
		}
		return Commons.BLANK;
	}

	private static Map<String, Map<String, String>> getInitContainer() {

		Map<String, Map<String, String>> container = new HashMap<String, Map<String, String>>();

		String[] langs = Commons.LANGUAGES;
		for (String lang : langs) {

			Map<String, String> containerLang = new HashMap<String, String>();
			// TODO need to init it
			containerLang.put(Commons.ER_B0001, "valid user name or password");
			containerLang.put(Commons.ER_P0001, "failed to instance object");
			containerLang.put(Commons.ER_P0002, "failed to run service");
			containerLang.put(Commons.ER_P0003, "CURRENTPAGE field not found");
			containerLang.put(Commons.ER_P0004, "failed to forward");
			container.put(lang, containerLang);
		}

		return container;
	}
}

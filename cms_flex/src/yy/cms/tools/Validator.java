package yy.cms.tools;

import javax.servlet.http.HttpServletRequest;

import flex.messaging.FlexContext;

public class Validator {
	public static String getIpAddr() {
		HttpServletRequest request = FlexContext.getHttpRequest();
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}
}

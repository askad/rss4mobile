package yy.cms.service;

import org.apache.log4j.Logger;

import yy.cms.base.BasePage;
import yy.cms.base.BaseService;

public class CommonService {

	private final Logger logger = Logger.getLogger(CommonService.class);

	public final static String SERVICENAME_PRE = "yy.cms.service.";

	// public final static String SERVICENAME_SUF = "Service";

	public BasePage doInit(String serviceName) {
		serviceName = SERVICENAME_PRE + serviceName;
		try {
			BaseService baseService = (BaseService) Class.forName(serviceName).newInstance();
			if(!baseService.doAuthorize()){
				return null;
			}
			logger.info(serviceName);
			return baseService.doInit();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return null;
	}

	public BasePage doProcess(String serviceName, BasePage currentPage) {
		serviceName = SERVICENAME_PRE + serviceName;
		try {
			BaseService baseService = (BaseService) Class.forName(serviceName).newInstance();
			if(!baseService.doAuthorize()){
				return null;
			}
			logger.info(serviceName);
			return baseService.doProcess(currentPage);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		return null;
	}
}

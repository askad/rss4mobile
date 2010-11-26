package yy.cms.service;

import java.util.ArrayList;
import java.util.List;

import yy.cms.base.BasePage;
import yy.cms.base.BaseService;
import yy.cms.pages.S001Page;
import yy.cms.pages.S002Page;
import yy.cms.tools.Commons;
import flex.messaging.FlexSession;

public class S001Service extends BaseService {

	private S001Page currentPage = null;

	private S002Page nextPage = null;

	@Override
	public BasePage doInit() {

		currentPage = new S001Page();
		boolean flag = doAuthorize();
		currentPage.setIsAuthorized(flag);
		if (!flag) {
			return currentPage;
		}

		List<String> menuList = new ArrayList<String>();
		menuList.add("Home");
		menuList.add("Add");
		menuList.add("Search");
		currentPage.setMenuList(menuList);

		FlexSession session = getSession();
		session.setAttribute(Commons.NEXTPAGEID, "S002");
		return currentPage;
	}

	public void unitCheck(BasePage currentPage) {
	}

	public void businessCheck(BasePage currentPage) {
	}

	@Override
	public void doBussiness(BasePage currentPage) {
		// nextPage
		FlexSession session = getSession();
		// BasePage nextPage
		session.setAttribute(Commons.CURRENTPAGEID, "S002");
	}
}

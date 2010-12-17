package yy.cms.service;

import java.util.ArrayList;
import java.util.List;

import yy.cms.base.BasePage;
import yy.cms.base.BaseService;
import yy.cms.pages.S002Page;
import yy.cms.tools.Commons;
import flex.messaging.FlexSession;

public class S002Service extends BaseService {

	private S002Page currentPage = null;

	@Override
	public BasePage doInit() {

		currentPage = new S002Page();
		List<String> menunameList = new ArrayList<String>();
		menunameList.add("aaa");
		menunameList.add("bbb");
		menunameList.add("ccc");
		currentPage.setMenuList(menunameList);

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

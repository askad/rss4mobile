package yy.cms.service;

import java.util.ArrayList;
import java.util.List;

import yy.cms.base.BasePage;
import yy.cms.base.BaseService;
import yy.cms.pages.S001Page;
import yy.cms.pages.S002Page;
import yy.cms.tools.Commons;
import yy.cms.vo.ItemBean;
import flex.messaging.FlexSession;

public class S001Service extends BaseService {

	private S001Page currentPage = null;

	private S002Page nextPage = null;

	@Override
	public BasePage doInit() {

		currentPage = new S001Page();
		List<String> menunameList = new ArrayList<String>();
		menunameList.add("Home");
		menunameList.add("Add");
		menunameList.add("Search");
		currentPage.setMenunameList(menunameList);
		
		List<String> menuvalueList = new ArrayList<String>();
		menuvalueList.add("S001Main.swf");
		menuvalueList.add("Add.swf");
		menuvalueList.add("Search.swf");
		currentPage.setMenuvalueList(menuvalueList);

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

package yy.cms.service;

import java.util.ArrayList;
import java.util.List;

import yy.cms.base.BasePage;
import yy.cms.base.BaseService;
import yy.cms.dao.MenuDAO;
import yy.cms.entity.MenuEntity;
import yy.cms.pages.S000Page;

public class S000Service extends BaseService {

	private S000Page currentPage = null;
	private MenuDAO menuDAO;

	@Override
	public BasePage doInit() {

		currentPage = new S000Page();
		menuDAO = new MenuDAO();
		List<String> menunameList = new ArrayList<String>();
		List<String> menuvalueList = new ArrayList<String>();
		List<MenuEntity> menuList = menuDAO.getAllMenu();
			if (menuList != null && menuList.size() > 0) {
			for (MenuEntity menuEntity : menuList) {
				menunameList.add(menuEntity.getMenuname());
				menuvalueList.add(menuEntity.getMenulink());
			}
		}

		currentPage.setMenunameList(menunameList);
		currentPage.setMenuvalueList(menuvalueList);

		return currentPage;
	}

	public void unitCheck(BasePage currentPage) {
	}

	public void businessCheck(BasePage currentPage) {
	}

	@Override
	public void doBussiness(BasePage currentPage) {
//		// nextPage
//		FlexSession session = getSession();
//		// BasePage nextPage
//		session.setAttribute(Commons.CURRENTPAGEID, "S002");
	}
}

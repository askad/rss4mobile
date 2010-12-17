package yy.cms.service;

import java.util.ArrayList;
import java.util.List;

import yy.cms.base.BasePage;
import yy.cms.base.BaseService;
import yy.cms.dao.MenuDAO;
import yy.cms.entity.MenuEntity;
import yy.cms.pages.S001Page;

public class S001Service extends BaseService {

	private S001Page currentPage = null;
	private MenuDAO menuDAO;

	@Override
	public BasePage doInit() {

		currentPage = new S001Page();
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

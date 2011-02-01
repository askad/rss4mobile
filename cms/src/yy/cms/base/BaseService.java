package yy.cms.base;


public abstract class BaseService implements BaseValidator {

	public BasePage doProcess(BasePage currentPage) {

		unitCheck(currentPage);
		businessCheck(currentPage);
		doBussiness(currentPage);
		return currentPage;
	}

	public abstract BasePage doInit();

	public abstract void doBussiness(BasePage currentPage);
}

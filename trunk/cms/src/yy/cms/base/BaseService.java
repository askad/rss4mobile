package yy.cms.base;

public abstract class BaseService implements BaseValidator {

	public void doProcess() {
		unitCheck();
		businessCheck();
		doBussiness();
		doNext();
	}
	public abstract void doBussiness();
	public abstract void doNext();
}

package yy.cms.base;

public interface BaseValidator {
    void unitCheck(BasePage currentPage);//for must input,date format....
    void businessCheck(BasePage currentPage);//for special check
}

package yy.cms.vo;

import yy.cms.tools.Commons;

public class ItemBean  {

	public String name;
	public String value;

	public ItemBean(String name, String value) {
		this.name = name;
		this.value = value;
	}
	
	public ItemBean() {
		this.name = Commons.BLANK;
		this.value = Commons.BLANK;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}

package yy.vo;

import java.io.Serializable;

public class GroupVo implements Serializable {
    private static final long serialVersionUID = 1L;
    private String groupName;
	private Long groupId;
	private int count;

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public Long getGroupId() {
		return groupId;
	}

	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
}

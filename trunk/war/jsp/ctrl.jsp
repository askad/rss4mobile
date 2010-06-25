<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@page import="yy.service.ListSiteService,yy.entity.EntityGroup,yy.vo.SiteListVo,java.util.List"%>
<style>
<!--
TD.cm_list_datatitle_bg {
	background-color: #ffe27a;
}
-->
</style>
<%
    ListSiteService listSiteService = new ListSiteService();
    List<SiteListVo> siteListVoList = listSiteService.getSiteList();
    List<EntityGroup> entityGroupList = listSiteService.getGroupList();
%>
<table border="1" cellspacing="0" cellpadding="0" width="90%">
	<tr>
		<td class="cm_list_datatitle_bg">&nbsp;名称</td>
		<td class="cm_list_datatitle_bg">&nbsp;URL</td>
		<td class="cm_list_datatitle_bg">&nbsp;目录</td>
		<td class="cm_list_datatitle_bg">&nbsp;</td>
	</tr>
	<%
    for(SiteListVo siteListVo:siteListVoList){
%>
	<tr>
		<td>&nbsp;<input type="text" value="<%=siteListVo.getSiteName()%>" readonly="true"/>
		<input type="hidden" name="groupId" value="<%=siteListVo.getGroupId()%>" />
		<input type="hidden" name="siteId" value="<%=siteListVo.getSiteId()%>" /></td>
		<td>&nbsp;<input type="text" value="<%=siteListVo.getSiteUrl()%>" readonly="true" size="50%"/></td>
		<td>&nbsp;<select id="group" disabled="disabled">
			<%for(EntityGroup entityGroup:entityGroupList){%>
			<option value="<%=entityGroup.getGroupId()%>"><%=entityGroup.getGroupName()%></option>
			<%} %>
		</select></td>
		<td>&nbsp;<input type="button" value="编辑" name="buttonE" onclick="editSite(this);"/><input type="button" name="buttonE"  value="删除"/><input type="button" value="保存" name="buttonS" onclick="saveSite(this);" disabled="disabled"/></td>
	</tr>
	<%
    }
%>
</table>
<script language="javascript">
<!--
function editSite(buttonF){
	var tr = buttonF.parentNode.parentNode;
	disableAllButton();
    tr.children[0].firstElementChild.readOnly=false;
    tr.children[1].firstElementChild.readOnly=false;
    tr.children[2].firstElementChild.disabled="";
    tr.children[3].lastElementChild.disabled="";
}
function saveSite(buttonF){
	resetAllButton();
	var tr = buttonF.parentNode.parentNode;
    tr.children[0].firstElementChild.readOnly=true;
    tr.children[1].firstElementChild.readOnly=true;
    tr.children[2].firstElementChild.disabled="disabled";
	tr.children[3].lastElementChild.disabled="disabled";
}
function disableAllButton(){
	buttonShift("buttonE","disabled");
	buttonShift("buttonS","disabled");
}
function resetAllButton(){
	buttonShift("buttonE","");
}
function buttonShift(name,style){
	var buttons = document.getElementsByName(name);
	for(var i=0;i<buttons.length;i++){
	    buttons[i].disabled=style;
	}
}
-->
</script>

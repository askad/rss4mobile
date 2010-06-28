<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@page import="yy.service.ListSiteService,yy.entity.GroupEntity,yy.vo.SiteListVo,java.util.List"%>
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
    List<GroupEntity> entityGroupList = listSiteService.getGroupList();
%>
<table border="1" cellspacing="0" cellpadding="0" width="90%">
	<tr>
		<td class="cm_list_datatitle_bg">&nbsp;名称</td>
		<td class="cm_list_datatitle_bg">&nbsp;URL</td>
		<td class="cm_list_datatitle_bg">&nbsp;目录</td>
		<td class="cm_list_datatitle_bg">&nbsp;</td>
	</tr>
	<%
    for(int i=0;i<siteListVoList.size();i++){
        SiteListVo siteListVo = siteListVoList.get(i);
%>
	<tr>
		<td>&nbsp;<input type="text" value="<%=siteListVo.getSiteName()%>" readonly="true"/>
		<input type="hidden" id="groupId<%=i%>" name="groupId<%=i%>" value="<%=siteListVo.getGroupId()%>" />
		<input type="hidden" name="siteId" value="<%=siteListVo.getSiteId()%>" /></td>
		<td>&nbsp;<input type="text" value="<%=siteListVo.getSiteUrl()%>" readonly="true" size="50%"/></td>
		<td>&nbsp;<select id="group<%=i%>" disabled="disabled" value=""></select></td>
		<td>&nbsp;<input type="button" value="编辑" name="buttonE" onclick="editSite(this);"/><input type="button" name="buttonE"  value="删除"/><input type="button" value="保存" name="buttonS" onclick="saveSite(this);" disabled="disabled"/></td>
	</tr>
	<%
    }
%>
</table>
<script language="javascript">
<!--
function $(id){
	return document.getElementById(id);
}
(function initPage(){
	initComboBox();
})();
function initComboBox(){
	var htmlSrc="";
    <%for(GroupEntity entityGroup:entityGroupList){%>
    htmlSrc+="<option value='<%=entityGroup.getGroupId()%>'><%=entityGroup.getGroupName()%></option>"
    <%} %>
    var length = <%=siteListVoList.size()%>;
    for(var i=0;i<length;i++){
    	$("group"+i).innerHTML = htmlSrc;//may be this will be not work st IE;
    	$("group"+i).value=$("groupId"+i).value;
    }
}
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
	checkFormat();
	saveDate();
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
function checkFormat(){
	
}
function saveDate(){
	//start with this!!!!!!!!!!!!!!
}
function postData(){
	
}
-->
</script>

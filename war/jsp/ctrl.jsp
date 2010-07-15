<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@page
	import="yy.service.ListSiteService,yy.entity.GroupEntity,yy.vo.SiteListVo,java.util.List"%>
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
		<td class="cm_list_datatitle_bg">&nbsp;&nbsp;<input type="button" value="追加" name="buttonA" onclick="addSite(this);" /></td>
	</tr>
	<%
    for(int i=0;i<siteListVoList.size();i++){
        SiteListVo siteListVo = siteListVoList.get(i);
%>
	<tr>
		<td>&nbsp;
		<input type="text" id="siteName<%=i%>" value="<%=siteListVo.getSiteName()%>" readonly="true" />
		<input type="hidden" id="groupId<%=i%>" name="groupId<%=i%>" value="<%=siteListVo.getGroupId()%>" />
		<input type="hidden" id="siteId<%=i%>" name="siteId<%=i%>" value="<%=siteListVo.getSiteId()%>" /></td>
		<td>&nbsp;<input type="text" id="siteUrl<%=i%>" value="<%=siteListVo.getSiteUrl()%>" readonly="true" size="50%" /></td>
		<td>&nbsp;<select id="group<%=i%>" disabled="disabled" value=""></select></td>
		<td>&nbsp;
		<input type="button" name="buttonE" value="编辑" onclick="editSite(this);" />
		<input type="button" name="buttonD" value="删除" onclick="deleteSite(this);" />
		<input type="button" name="buttonS" value="保存" onclick="saveSite(this);" disabled="disabled" /></td>
	</tr>
	<%
    }
%>
</table>
<script language="javascript">
<!--
var url="../ctrl";
var http_request;
var selectSrc="";
function $(id){
	return document.getElementById(id);
}
(function initPage(){
	initComboBox();
})();
function initComboBox(){
    <%for(GroupEntity entityGroup:entityGroupList){%>
    selectSrc+="<option value='<%=entityGroup.getGroupId()%>'><%=entityGroup.getGroupName()%></option>"
    <%} %>
    var length = <%=siteListVoList.size()%>;
    for(var i=0;i<length;i++){
    	$("group"+i).innerHTML = selectSrc;//may be this will be not work at IE;
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
	var tr = buttonF.parentNode.parentNode;
	saveDate(tr.rowIndex-1);
    tr.children[0].firstElementChild.readOnly=true;
    tr.children[1].firstElementChild.readOnly=true;
    tr.children[2].firstElementChild.disabled="disabled";
	tr.children[3].lastElementChild.disabled="disabled";
}
function deleteSite(buttonF){
	var flag = confirm("delete?");
	if(flag){
		var tr = buttonF.parentNode.parentNode;
		deleteData(tr.rowIndex-1);
	}
}
function addSite(){
	
}
function disableAllButton(){
	buttonShift("buttonE","disabled");
	buttonShift("buttonS","disabled");
	buttonShift("buttonD","disabled");
}
function resetAllButton(){
	buttonShift("buttonE","");
	buttonShift("buttonD","");
}
function buttonShift(name,style){
	var buttons = document.getElementsByName(name);
	for(var i=0;i<buttons.length;i++){
	    buttons[i].disabled=style;
	}
}
function checkFormat(){
	
}
function saveDate(tr_rowindex){
	//start with this!!!!!!!!!!!!!!
	var data = "action=cha&";
	data+=("sitename=" + $("siteName" + tr_rowindex).value + "&");
	data+=("siteurl=" + $("siteUrl" + tr_rowindex).value + "&");
	data+=("groupid=" + $("group" + tr_rowindex).value + "&");
	data+=("siteid=" + $("siteId" + tr_rowindex).value);
	postData(data);
}
function deleteData(tr_rowindex){
    var data = "action=del&";
    data+=("siteid=" + $("siteId" + tr_rowindex).value);
    postData(data);
}
function postData(data){
	   http_request = false;
	    // 下面需要建立一个XMLHttpRequest对象,用它进行服务器请求,针对不同浏览器建立方法不同
	    if (window.XMLHttpRequest) { // IE7,Mozilla, Safari,...
	        http_request = new XMLHttpRequest();
	        if (http_request.overrideMimeType) {
	            http_request.overrideMimeType('text/xml');
	        }
	    } else if (window.ActiveXObject) { // IE5,6
	        try {
	            http_request = new ActiveXObject("Msxml2.XMLHTTP");
	        } catch (e) {
	            try {
	                http_request = new ActiveXObject("Microsoft.XMLHTTP");
	            } catch (e) {
	            }
	        }
	    }
	    if (!http_request) {
	        alert('出现错误,不能建立一个XMLHTTP实例!');
	        return false;
	    }
	    http_request.onreadystatechange = funccallback;
	    http_request.open('POST', url, true);
	    http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    http_request.send(data);
}
function funccallback() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            alert(http_request.responseText);
        } else {
            alert('对不起,请求出现错误!');
        }
    }
}
-->
</script>

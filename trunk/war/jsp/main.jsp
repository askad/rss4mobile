<%@page language="java" import="yy.service.FetchRssDataService,yy.vo.GroupVo,java.util.Iterator" contentType="text/html; charset=UTF-8" %>
<div id="title">目录</div>
<div id="content">
<%
    FetchRssDataService fetchRssDataService = new FetchRssDataService();
    Iterator<GroupVo> groupVoList = fetchRssDataService.initGroupRssData();
    while(groupVoList.hasNext()){
    	GroupVo groupVo = groupVoList.next();
%>
<div style="border: 1px solid #C4E4E4;width:90%"><b>
<a href="digest.jsp?GROUP_ID=<%=groupVo.getGroupId()%>"><%=groupVo.getGroupName()%></a>    <%=groupVo.getCount()%></b>
</div><br/><br/>
<%
    }
%>
</div>
<script language="javascript"><!--
(function(){
    var as = document.getElementsByTagName("a");
    var leng = as.length;
    for(var i=0;i<leng;i++){
        as[i].onmousemove = changeBgMove;
        as[i].onmouseout = changeBgOut;
    }
})();
function changeBgMove(){
    this.style.backgroundColor='#FFFF9F';
}
function changeBgOut(){
	this.style.backgroundColor='#FFFFFF';
}
--></script>

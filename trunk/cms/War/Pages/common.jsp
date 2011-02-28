<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@page import="yy.cms.tools.UserAuthorization"%>
<%
	UserAuthorization.checkLogin(request, response);
%>
<a href="<%=request.getContextPath()%>/logout">logout</a>
<hr>
<style type="text/css">
body, input {
    -x-system-font:none;
    font-family:Verdana,Arial,Helvetica,sans-serif;
    font-size:13px;
    font-size-adjust:none;
    font-stretch:normal;
    font-style:normal;
    font-variant:normal;
    font-weight:normal;
    line-height:normal;
}
</style>
<script language="javascript">
function yid(id){
	return document.getElementById(id);
}
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/jquery-1.5.js"></script>
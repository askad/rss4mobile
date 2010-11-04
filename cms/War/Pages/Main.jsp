<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@page import="yy.cms.tools.DescriptorI18N"%>
<%
    DescriptorI18N descriptor = DescriptorI18N.getInstance();
    String path = request.getContextPath() + "/Pages/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
<head>
<title>Main</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="robots" content="NONE,NOARCHIVE" />
</head>
    <frameset rows="90,*" frameborder="0" framespacing="0">
        <frame style="border:0;" noresize="noresize" src="<%=path%>title.jsp" name="frameTitle" scrolling="no"></frame>
        <frameset cols="225,*"  frameborder="0" framespacing=0>
            <frame style="border: 0"  noresize="noresize" src="<%=path%>menubar.jsp" id="frameMenu" name="frameMenu" scrolling="no"></frame>
            <frame style="border: 0" src="<%=path%>mainpage.jsp" frameborder='0' id='frameMain' name='frameMain'></frame>
        </frameset>
    </frameset>
</html>
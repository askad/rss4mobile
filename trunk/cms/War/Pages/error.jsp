<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@page import="yy.cms.tools.DescriptorI18N"%>
<%
    DescriptorI18N descriptor = DescriptorI18N.getInstance();
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
<head>
<title>Main</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="robots" content="NONE,NOARCHIVE" />
</head>
<body>
    <FRAMESET  ROWS="31,*"   frameBorder="0" framespacing="0">
        <FRAME style="border: 0" noresize="noresize" SRC="title.jsp" NAME="frameTitle" scrolling="no">
        <FRAMESET COLS="225,*"  frameBorder="0" framespacing=0>
            <FRAME style="border: 0"  noresize="noresize" id="frameMenu" NAME="frameMenu" scrolling="no">
                <FRAMESET name="activeframe" ROWS="*, 5%, 0%, 0%"  frameBorder=0 framespacing="0">
                <FRAME style="border: 0" SRC='' noresize="noresize" frameborder='0' NAME='mainForm'>
                <FRAME style="border: 0" SRC="messages.jsp" frameborder='0' NAME='messages'>
                <FRAME style="border: 0" SRC='' frameborder='0' NAME='buttons' scrolling="no">
                <FRAME style="border: 0" SRC='heartbeat.jsp' NAME='heartbeat'></FRAME>
            </FRAMESET>
        </FRAMESET>
    </FRAMESET>
</body>
</html>
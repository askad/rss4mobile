<%@page language="java" contentType="text/html; charset=UTF-8"%>
<%@page import="yy.cms.tools.DescriptorI18N,yy.cms.tools.Commons,yy.cms.pages.LoginPage"%>
<%
    DescriptorI18N descriptor = DescriptorI18N.getInstance();
    String SCREENNAME = "Login";
    LoginPage localPage = (LoginPage)request.getAttribute(Commons.CURRENTPAGE);
    String lang = (String)request.getSession().getAttribute(Commons.LANGUAGE);
    lang = (null == lang ? Commons.CHN : lang);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
<head>
<title>Login</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="robots" content="NONE,NOARCHIVE" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/css/login.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/js/login.js"></script>
</head>
<body style="background:#FFFFFF;">
<form action="<%=request.getContextPath()%>/login" method="post">
<div id="container">
<div class="loginplan_bg">
    <div class="loginplan">
        <div class="loginname">登录您的账户</div>
        <div style="margin: 5px 0pt; padding: 4px 0pt 0pt 2px;">
         <div id="errMsgContainer">
         <%=(localPage != null?localPage.getErrorMsg():Commons.BLANK)%>
         </div>
        </div>
        <div style="height: 25px;">
            <label>用户名：</label>
            <input type="text" style="ime-mode: disabled;" tabindex="1" value="" name="uname" id="uname"/>
            <div style="margin: 0pt 0pt 0pt 4px; font-family: Arial; font-style: normal; font-variant: normal; font-weight: bold; font-size: 13px; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; float: left;"></div>
        </div>
         <div style="margin: 8px 0pt 0pt; height: 25px; clear: left;">
            <label>密　码：</label>
            <input type="password" class="text" tabindex="2" value="" name="pword" id="pword"/>
         </div>
         <div style="padding: 12px 0pt 0pt 60px; clear: both; height: 27px ! important;">
            <input type="submit" tabindex="4" name="btlogin" id="btlogin" value="登录" style="font-family: Verdana; font-style: normal; font-variant: normal; font-weight: bold; font-size: 12px; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; padding-top: 2px ! important;"/>
         </div>
    </div>
</div>
</div>
</form>
</body>
</html>

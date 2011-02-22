<%@include file="common.jsp"%>
<%@page import="yy.cms.service.GetResumeService,yy.cms.vo.ResumeVO,java.util.List"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Resume List</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
<body>
<%
	GetResumeService getResumeService = new GetResumeService();
	List<ResumeVO> resumeList = getResumeService.getResumeListByUser(request);
%>
<table border="1" cellspacing="0" cellpadding="0" width="95%">
  <tr align="center" valign="middle">
    <td>Recommended Position</td>
    <td>Published Date</td>
    <td>Department</td>
    <td>Resume</td>
  </tr>
  <% for(ResumeVO resume:resumeList) {%>
  <tr align="center" valign="middle">
    <td><%=resume.getJobname()%></td>
    <td><%=resume.getPubdate()%></td>
    <td><%=resume.getDepartmentname()%></td>
    <td><a href="resumeDetail.jsp?jobid=<%=resume.getJobid()%>"><%=resume.getResumecount()%></a></td>
  </tr>
  <%}%>
</table>
</body>
</head>
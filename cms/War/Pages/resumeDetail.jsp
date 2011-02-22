<%@include file="common.jsp"%>
<%@page import="yy.cms.service.GetResumeDetailService,yy.cms.vo.ResumeDetailVO,java.util.List,yy.cms.tools.CodeContainer"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Resume Detail</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
<body>
<%
	GetResumeDetailService getResumeDetailService = new GetResumeDetailService();
	String jobid = request.getParameter("jobid");
	List<ResumeDetailVO> detailList = getResumeDetailService.getResumeDetailList(jobid);
	
	String techdesc01 = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, 1);
	String techdesc02 = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, 2);
	String techdesc03 = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, 3);
	String techdesc04 = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, 4);
	String techdesc05 = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, 5);
	
	String viewresult01 = CodeContainer.getCodeDesc(CodeContainer.CODE_VIEWRESULT, 1);
	String viewresult02 = CodeContainer.getCodeDesc(CodeContainer.CODE_VIEWRESULT, 2);
	String viewresult03 = CodeContainer.getCodeDesc(CodeContainer.CODE_VIEWRESULT, 3);
	String viewresult04 = CodeContainer.getCodeDesc(CodeContainer.CODE_VIEWRESULT, 4);
	String viewresult05 = CodeContainer.getCodeDesc(CodeContainer.CODE_VIEWRESULT, 5);
	String viewresult06 = CodeContainer.getCodeDesc(CodeContainer.CODE_VIEWRESULT, 6);
	String viewresult07 = CodeContainer.getCodeDesc(CodeContainer.CODE_VIEWRESULT, 7);
	String viewresult08 = CodeContainer.getCodeDesc(CodeContainer.CODE_VIEWRESULT, 8);
%>
<a href="resume.jsp">Back</a><br/>
Recommended Position:
<br/>
<form action="<%=request.getContextPath()%>/UpdatePerson" method="post">
<table border="1" cellspacing="0" cellpadding="0" width="100%">
  <tr align="center" valign="middle">
 <td>Chinese Name</td>
 <td>Cell Phone</td>
 <td>Working Experience</td>
 <td>University</td>
 <td>Degree</td>
 <td>Working Company</td>
 <td>Language</td>
 <td>Language Skill </td>
 <td>SD IT Tech</td>
 <td>Developer Tech</td>
 <td>Stability</td>
 <td>Interview Result</td>
  </tr>
  <% for(ResumeDetailVO detailVO:detailList){
  		
		int sdskill = detailVO.getSdskill();
		int stability = detailVO.getStability();
		int techskill = detailVO.getTechskill();
		int viewresult = detailVO.getViewresult();
		int langskill = detailVO.getLangskill();
		
		String workexpr = CodeContainer.getCodeDesc(CodeContainer.CODE_WORKEXPR, detailVO.getWorkexpr());
		String degree = CodeContainer.getCodeDesc(CodeContainer.CODE_DEGREE, detailVO.getDegree());
		
		int resumeid = detailVO.getId();
  %>
 <tr align="center">
 <input name="resumeid" type="hidden" value="<%=resumeid%>" />
 <td><a href="../doc/test.doc"><%=detailVO.getChnname()%></a></td>
 <td><%=detailVO.getPhonenum()%></td>
 <td><%=workexpr%></td>
 <td><%=detailVO.getUniversity()%></td>
 <td><%=degree%></td>
 <td><%=detailVO.getWorkingcom()%></td>
 <td><%=detailVO.getLang()%></td>
 <td><select style="width:100%"name="langskill" id="<%=resumeid%>langskill<%=langskill%>">
   <option value="1"><%=techdesc01%></option>
   <option value="2"><%=techdesc02%></option>
   <option value="3"><%=techdesc03%></option>
   <option value="4"><%=techdesc04%></option>
   <option value="5"><%=techdesc05%></option>
 </select></td>
 <td><select style="width:100%"name="sdskill" id="<%=resumeid%>sdskill<%=sdskill%>">
   <option value="1"><%=techdesc01%></option>
   <option value="2"><%=techdesc02%></option>
   <option value="3"><%=techdesc03%></option>
   <option value="4"><%=techdesc04%></option>
   <option value="5"><%=techdesc05%></option>
 </select></td>
 <td><select style="width:100%"name="techskill" id="<%=resumeid%>techskill<%=techskill%>">
   <option value="1"><%=techdesc01%></option>
   <option value="2"><%=techdesc02%></option>
   <option value="3"><%=techdesc03%></option>
   <option value="4"><%=techdesc04%></option>
   <option value="5"><%=techdesc05%></option>
 </select></td>
 <td><select style="width:100%"name="stability" id="<%=resumeid%>stability<%=stability%>">
   <option value="1"><%=techdesc01%></option>
   <option value="2"><%=techdesc02%></option>
   <option value="3"><%=techdesc03%></option>
   <option value="4"><%=techdesc04%></option>
   <option value="5"><%=techdesc05%></option>
 </select></td>
 <td><select style="width:100%"name="viewresult" id="<%=resumeid%>viewresult<%=viewresult%>">
 <option value="1"><%=viewresult01%></option>
<option value="2"><%=viewresult02%></option>
<option value="3"><%=viewresult03%></option>
<option value="4"><%=viewresult04%></option>
<option value="5"><%=viewresult05%></option>
<option value="6"><%=viewresult06%></option>
<option value="7"><%=viewresult07%></option>
<option value="8"><%=viewresult08%></option>
 </select></td>
  </tr>
  <script language="javascript">
$("<%=resumeid%>stability<%=stability%>").options[<%=stability-1%>].selected = true;
$("<%=resumeid%>sdskill<%=sdskill%>").options[<%=sdskill-1%>].selected = true;
$("<%=resumeid%>techskill<%=techskill%>").options[<%=techskill-1%>].selected = true;
$("<%=resumeid%>viewresult<%=viewresult%>").options[<%=viewresult-1%>].selected = true;
$("<%=resumeid%>langskill<%=langskill%>").options[<%=langskill-1%>].selected = true;
</script>
  <%}%>
</table>
<br/>
<div align="right">
  <input type="submit" name="Submit" value="Submit" />
 </div>
</form>
</body>
</head>
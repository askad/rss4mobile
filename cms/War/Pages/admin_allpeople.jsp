<%@include file="common.jsp"%>
<%@page import="yy.cms.service.GetResumeDetailService,yy.cms.vo.ResumeDetailVO,java.util.List,yy.cms.tools.CodeContainer"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>Person Detail</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
<body>
<%
	GetResumeDetailService getResumeDetailService = new GetResumeDetailService();
	List<ResumeDetailVO> detailList = getResumeDetailService.getAllPeopleList();
	
	String techdesc01 = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, 1);
	String techdesc02 = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, 2);
	String techdesc03 = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, 3);
	String techdesc04 = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, 4);
	String techdesc05 = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, 5);

	String workexprdesc01 = CodeContainer.getCodeDesc(CodeContainer.CODE_WORKEXPR, 1);
	String workexprdesc02 = CodeContainer.getCodeDesc(CodeContainer.CODE_WORKEXPR, 2);
	String workexprdesc03 = CodeContainer.getCodeDesc(CodeContainer.CODE_WORKEXPR, 3);
	String workexprdesc04 = CodeContainer.getCodeDesc(CodeContainer.CODE_WORKEXPR, 4);
	String workexprdesc05 = CodeContainer.getCodeDesc(CodeContainer.CODE_WORKEXPR, 5);
	
	String degreedesc01 = CodeContainer.getCodeDesc(CodeContainer.CODE_DEGREE, 1);
	String degreedesc02 = CodeContainer.getCodeDesc(CodeContainer.CODE_DEGREE, 2);
	String degreedesc03 = CodeContainer.getCodeDesc(CodeContainer.CODE_DEGREE, 3);
	String degreedesc04 = CodeContainer.getCodeDesc(CodeContainer.CODE_DEGREE, 4);
	String degreedesc05 = CodeContainer.getCodeDesc(CodeContainer.CODE_DEGREE, 5);
%>
<input type="button" name="import" value="import" />
<table border="1" cellspacing="0" cellpadding="0" width="100%">
  <tr align="center" valign="middle">
 <td>Chinese Name</td>
 <td>Cell Phone</td>
 <td>Working Experience</td>
 <td>University</td>
 <td>Degree</td>
 <td>Working Company</td>
 <td>Language</td>
 <td>Language Skill</td>
 <td>SD IT Tech</td>
 <td>Developer Tech</td>
 <td>Stability</td>
 <td>Position</td>
  </tr>
  <% for(ResumeDetailVO detailVO:detailList){
  		int degree = detailVO.getDegree();
		int sdskill = detailVO.getSdskill();
		int stability = detailVO.getStability();
		int techskill = detailVO.getTechskill();
		int workexpr = detailVO.getWorkexpr();
		int langskill = detailVO.getLangskill();
		
		String workexprStr = CodeContainer.getCodeDesc(CodeContainer.CODE_WORKEXPR, workexpr);
		String degreeStr = CodeContainer.getCodeDesc(CodeContainer.CODE_DEGREE, degree);
		String langskillStr = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, langskill);
		String sdskillStr = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, sdskill);
		String techskillStr = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, techskill);
		String stabilityStr = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, stability);

		int pid = detailVO.getId();
  %>
 <tr id="trR<%=pid%>" align="center">
 <td><%=detailVO.getChnname()%></td>
 <td><%=detailVO.getPhonenum()%></td>
 <td><%=workexprStr%></td>
 <td><%=detailVO.getUniversity()%></td>
 <td><%=degreeStr%></td>
 <td><%=detailVO.getWorkingcom()%></td>
 <td"><%=detailVO.getLang()%></td>
 <td><%=langskillStr%></td>
 <td><%=sdskillStr%></td>
 <td><%=techskillStr%></td>
 <td><%=stabilityStr%></td>
  <td><select style="width:100%"name="position" id="<%=pid%>position">
  <% for(int i=0;i<positionLsit.length;i++){ %>
 <option value="1"><%=positionLsit.get%></option>
<% } %>
 </select></td>
  </tr>
  <%}%>
</table>
<script language="javascript">
var contextPath = "<%=request.getContextPath()%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/admin.js"></script>
</body>
</head>
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
	List<ResumeDetailVO> detailList = getResumeDetailService.getAllResumeDetailList();
	
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

Recommended Position:
<input type="button" name="import" value="import" /><br />
<a href="admin_allpeople.jsp">Reassignment</a>
<table border="1" cellspacing="0" cellpadding="0" width="100%">
  <tr align="center" valign="middle">
  <td>&nbsp;</td>
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
 <td>Interview Result</td>
  </tr>
  <% for(ResumeDetailVO detailVO:detailList){
  		int degree = detailVO.getDegree();
		int sdskill = detailVO.getSdskill();
		int stability = detailVO.getStability();
		int techskill = detailVO.getTechskill();
		int viewresult = detailVO.getViewresult();
		int workexpr = detailVO.getWorkexpr();
		int langskill = detailVO.getLangskill();
		
		String workexprStr = CodeContainer.getCodeDesc(CodeContainer.CODE_WORKEXPR, workexpr);
		String degreeStr = CodeContainer.getCodeDesc(CodeContainer.CODE_DEGREE, degree);
		String langskillStr = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, langskill);
		String sdskillStr = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, sdskill);
		String techskillStr = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, techskill);
		String stabilityStr = CodeContainer.getCodeDesc(CodeContainer.CODE_LANGSKILL, stability);
		String viewresultStr = CodeContainer.getCodeDesc(CodeContainer.CODE_VIEWRESULT, viewresult);
		
		int resumeid = detailVO.getId();
		int pid = detailVO.getPid();
  %>
 <tr id="trR<%=resumeid%>" align="center">
 <td><input type="button" name="Submit" value="delete" id="del<%=resumeid%>"onclick="del(<%=resumeid%>);"/>
 <input type="button" name="edit" value="edit"  id="edit<%=resumeid%>" onclick="edit(<%=resumeid%>);"/>
 <input type="button" name="undo" value="undo"  id="undo<%=resumeid%>" disabled="disabled"/></td>
 <td id="tdR<%=resumeid%>Chnname"><%=detailVO.getChnname()%></td>
 <td id="tdR<%=resumeid%>Phonenum"><%=detailVO.getPhonenum()%></td>
 <td id="tdR<%=resumeid%>Workexpr"><%=workexprStr%></td>
 <td id="tdR<%=resumeid%>University"><%=detailVO.getUniversity()%></td>
 <td id="tdR<%=resumeid%>Degree"><%=degreeStr%></td>
 <td id="tdR<%=resumeid%>Workingcom"><%=detailVO.getWorkingcom()%></td>
 <td id="tdR<%=resumeid%>Lang"><%=detailVO.getLang()%></td>
 <td id="tdR<%=resumeid%>Langskill"><%=langskillStr%></td>
 <td id="tdR<%=resumeid%>Sdskill"><%=sdskillStr%></td>
 <td id="tdR<%=resumeid%>Techskill"><%=techskillStr%></td>
 <td id="tdR<%=resumeid%>Stability"><%=stabilityStr%></td>
 <td id="tdR<%=resumeid%>Viewresult"><%=viewresultStr%></td>
  </tr>
   <tr style="display:none" id="trE<%=resumeid%>" align="center">
 <td><input type="button" name="" value="delete" disabled="disabled"/>
 <input type="button" name="" value="save" onclick="save(<%=resumeid%>,<%=pid%>);"/>
 <input type="button" name="" value="undo" onclick="undo(<%=resumeid%>);"/></td>
 <td><input id="<%=resumeid%>chnname" name="phonenum" value="<%=detailVO.getChnname()%>"/></td>
 <td><input id="<%=resumeid%>phonenum" name="phonenum" value="<%=detailVO.getPhonenum()%>"/></td>
 <td><select style="width:100%"name="workexpr" id="<%=resumeid%>workexpr">
   <option value="1"><%=workexprdesc01%></option>
   <option value="2"><%=workexprdesc02%></option>
   <option value="3"><%=workexprdesc03%></option>
   <option value="4"><%=workexprdesc04%></option>
   <option value="5"><%=workexprdesc05%></option>
 </select></td>
 <td><input id="<%=resumeid%>university" name="university" value="<%=detailVO.getUniversity()%>"/></td>
 <td><select style="width:100%"name="degree" id="<%=resumeid%>degree">
   <option value="1"><%=degreedesc01%></option>
   <option value="2"><%=degreedesc02%></option>
   <option value="3"><%=degreedesc03%></option>
   <option value="4"><%=degreedesc04%></option>
   <option value="5"><%=degreedesc05%></option>
 </select></td>
 <td><input id="<%=resumeid%>workingcom" name="workingcom" value="<%=detailVO.getWorkingcom()%>"/></td>
 <td><input id="<%=resumeid%>lang" name="lang" value="<%=detailVO.getLang()%>"/></td>
 <td><select style="width:100%"name="langskill" id="<%=resumeid%>langskill">
   <option value="1"><%=techdesc01%></option>
   <option value="2"><%=techdesc02%></option>
   <option value="3"><%=techdesc03%></option>
   <option value="4"><%=techdesc04%></option>
   <option value="5"><%=techdesc05%></option>
 </select></td>
 <td><select style="width:100%"name="sdskill" id="<%=resumeid%>sdskill">
   <option value="1"><%=techdesc01%></option>
   <option value="2"><%=techdesc02%></option>
   <option value="3"><%=techdesc03%></option>
   <option value="4"><%=techdesc04%></option>
   <option value="5"><%=techdesc05%></option>
 </select></td>
 <td><select style="width:100%"name="techskill" id="<%=resumeid%>techskill">
   <option value="1"><%=techdesc01%></option>
   <option value="2"><%=techdesc02%></option>
   <option value="3"><%=techdesc03%></option>
   <option value="4"><%=techdesc04%></option>
   <option value="5"><%=techdesc05%></option>
 </select></td>
 <td><select style="width:100%"name="stability" id="<%=resumeid%>stability">
   <option value="1"><%=techdesc01%></option>
   <option value="2"><%=techdesc02%></option>
   <option value="3"><%=techdesc03%></option>
   <option value="4"><%=techdesc04%></option>
   <option value="5"><%=techdesc05%></option>
 </select></td>
 <td><select style="width:100%"name="viewresult" id="<%=resumeid%>viewresult">
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
  <input type="hidden" id="<%=resumeid%>degreeValue" value="<%=degree-1%>"/>
  <input type="hidden" id="<%=resumeid%>workexprValue" value="<%=workexpr-1%>"/>
  <input type="hidden" id="<%=resumeid%>stabilityValue" value="<%=stability-1%>"/>
  <input type="hidden" id="<%=resumeid%>sdskillValue" value="<%=sdskill-1%>"/>
  <input type="hidden" id="<%=resumeid%>techskillValue" value="<%=techskill-1%>"/>
  <input type="hidden" id="<%=resumeid%>viewresultValue" value="<%=viewresult-1%>"/>
  <input type="hidden" id="<%=resumeid%>langskillValue" value="<%=langskill-1%>"/>
  
  <script language="javascript">
yid("<%=resumeid%>degree").options[<%=degree-1%>].selected = true;
yid("<%=resumeid%>workexpr").options[<%=workexpr-1%>].selected = true;
yid("<%=resumeid%>stability").options[<%=stability-1%>].selected = true;
yid("<%=resumeid%>sdskill").options[<%=sdskill-1%>].selected = true;
yid("<%=resumeid%>techskill").options[<%=techskill-1%>].selected = true;
yid("<%=resumeid%>viewresult").options[<%=viewresult-1%>].selected = true;
yid("<%=resumeid%>langskill").options[<%=langskill-1%>].selected = true;
</script>
  <%}%>
</table>
<script language="javascript">
var contextPath = "<%=request.getContextPath()%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/js/admin.js"></script>
</body>
</head>
function edit(resumeid){
	displayInput(resumeid);
}
function displayInput(resumeid){
	yid("trE" + resumeid).style.display = "";
	yid("trR" + resumeid).style.display = "none";
}
function displayRead(resumeid){
	yid("trE" + resumeid).style.display = "none";
	yid("trR" + resumeid).style.display = "";
}
function undo(resumeid){
	displayRead(resumeid);
	resetValueR(resumeid);
}
function save(resumeid, personid){
	$.post(contextPath + '/UpdatePerson', 
		{
			type: "adminU",
			rid: resumeid,
			pid: personid,
			chnname: $("#" + resumeid + "chnname").val(),
			//engname: $(resumeid + "chnname"),
			phonenum: $("#" + resumeid + "phonenum").val(),
			workexpr: $("#" + resumeid + "workexpr").val(),
			university: $("#" + resumeid + "university").val(),
			degree: $("#" + resumeid + "degree").val(),
			workingcom: $("#" + resumeid + "workingcom").val(),
			langskill: $("#" + resumeid + "langskill").val(),
			techskill: $("#" + resumeid + "techskill").val(),
			sdskill: $("#" + resumeid + "sdskill").val(),
			stability: $("#" + resumeid + "stability").val(),
			//workhistory: $(resumeid + "workhistory"),
			//comments: $(resumeid + "comments"),
			lang: $("#" + resumeid + "lang").val(),
			viewresult: $("#" + resumeid + "viewresult").val()
		},
		function(data) {
			if(data!=null){
				displayRead(resumeid);
				resetValueE(resumeid);
			}
			alert(data);
		},
		"text");
}
function del(resumeid, pid){

	$.post(contextPath + '/UpdatePerson', 
		{
			type: "adminD",
			rid: resumeid
		},
		function(data) {
			if(data!=null&&data=="Success!"){
				displayRead(resumeid);
				resetValueE(resumeid);
			}
			alert(data);
		},
		"text");
	$('#trR' + resumeid).remove();
	$('#trE' + resumeid).remove();
}
// from input item to display item
function resetValueE(resumeid){
	$("#tdR" + resumeid + "Chnname").html($("#" + resumeid + "chnname").val());
	$("#tdR" + resumeid + "Phonenum").html($("#" + resumeid + "phonenum").val());
	$("#tdR" + resumeid + "University").html($("#" + resumeid + "university").val());
	$("#tdR" + resumeid + "Workingcom").html($("#" + resumeid + "workingcom").val());
	$("#tdR" + resumeid + "Lang").html($("#" + resumeid + "lang").val());
	
	$("#tdR" + resumeid + "Workexpr").html(getSelectText(resumeid, "workexpr"));
	$("#tdR" + resumeid + "Degree").html(getSelectText(resumeid, "degree"));
	$("#tdR" + resumeid + "Langskill").html(getSelectText(resumeid, "langskill"));
	$("#tdR" + resumeid + "Sdskill").html(getSelectText(resumeid, "sdskill"));
	$("#tdR" + resumeid + "Techskill").html(getSelectText(resumeid, "techskill"));
	$("#tdR" + resumeid + "Stability").html(getSelectText(resumeid, "stability"));
	$("#tdR" + resumeid + "Viewresult").html(getSelectText(resumeid, "viewresult"));
	
	yid(resumeid + "degreeValue").value = getSelectIndex(resumeid, "degree");
	yid(resumeid + "workexprValue").value = getSelectIndex(resumeid, "workexpr");
	yid(resumeid + "stabilityValue").value = getSelectIndex(resumeid, "stability");
	yid(resumeid + "sdskillValue").value = getSelectIndex(resumeid, "sdskill");
	yid(resumeid + "techskillValue").value = getSelectIndex(resumeid, "techskill");
	yid(resumeid + "viewresultValue").value = getSelectIndex(resumeid, "viewresult");
	yid(resumeid + "langskillValue").value = getSelectIndex(resumeid, "langskill");
}
// from display item to input item
function resetValueR(resumeid){
	$("#" + resumeid + "chnname").val($("#tdR" + resumeid + "Chnname").html());
	$("#" + resumeid + "phonenum").val($("#tdR" + resumeid + "Phonenum").html());
	$("#" + resumeid + "university").val($("#tdR" + resumeid + "University").html());
	$("#" + resumeid + "workingcom").val($("#tdR" + resumeid + "Workingcom").html());
	$("#" + resumeid + "lang").val($("#tdR" + resumeid + "Lang").html());
	
	yid(resumeid + "degree").options[yid(resumeid + "degreeValue").value].selected = true;
	yid(resumeid + "workexpr").options[yid(resumeid + "workexprValue").value].selected = true;
	yid(resumeid + "stability").options[yid(resumeid + "stabilityValue").value].selected = true;
	yid(resumeid + "sdskill").options[yid(resumeid + "sdskillValue").value].selected = true;
	yid(resumeid + "techskill").options[yid(resumeid + "techskillValue").value].selected = true;
	yid(resumeid + "viewresult").options[yid(resumeid + "viewresultValue").value].selected = true;
	yid(resumeid + "langskill").options[yid(resumeid + "langskillValue").value].selected = true;
}
function getSelectText(resumeid, idstr){
	var obj = yid(resumeid + idstr);
	var index = obj.selectedIndex;
	return obj.options[index].text;
}
function getSelectIndex(resumeid, idstr){
	var obj = yid(resumeid + idstr);
	return obj.selectedIndex;
}
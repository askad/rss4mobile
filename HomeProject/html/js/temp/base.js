var mothsDay = [31,28,31,30,31,30,31,31,30,31,30,31];
var TOP = 2;
var TODAY = new Date();
//71,33=0,2
/**
 * insert option to DropdownList
 */
function insertOption(dropDown,value){
	dropDown.append($('<option></option>').val(value).html(value));
}

/**
 *init Years from 1901 to 2049
 */
function initYears(){
	var tempYear = $("#years");
	for(var i=1901;i<2050;i++){
		insertOption(tempYear, i);
	}
	var toDate = TODAY;
	var t1 = toDate.getFullYear();
	// for IE
	if (t1 > 1900) t1 -= 1900;
	// set current Year
	tempYear[0].options[t1-1].selected = true;
}

/**
 *init Month from 1 to 12
 */
function initMonths(){
	var tempMonths = $("#months");
	for(var i=1;i<=12;i++){
		insertOption(tempMonths, i);
	}
	var toDate = TODAY;
	var t1 = toDate.getMonth();
	// set Current Month
	tempMonths[0].options[t1].selected = true;
}

/**
 *init Calendar
 */
function initCal(tyear,tmonth,tdate){
	var startDate = new Date(tyear + "/" + tmonth + "/1");
	var xingqi = startDate.getDay()-1;
	xingqi = (xingqi>0?xingqi:xingqi+7);
	var leftDis = xingqi*60;
	var topDis = TOP;
	var tempHtml = "";
	for(var i=1;i<mothsDay[tmonth-1];i++){
		var divContent = $('<div></div>');
		divContent.addClass("cell").css("left",leftDis).css("top",topDis);
		var divDate = $('<div></div>');
		divDate.addClass("so");
		if(xingqi == 5 || xingqi == 6){
			divDate.css("color","rgb(198, 11, 2)");
		} else {
			divDate.css("color","rgb(49, 49, 49)");
		}
		divDate.append(i);
		
		var divCDate = $('<div></div>');
		divCDate.css("color","rgb(102, 102, 102)");
		var result = calCdate(new Date(tyear + "/" + tmonth + "/" + i));
		divCDate.append(result.strcDay);
		divContent.append(divDate);
		divContent.append(divCDate);
		
		// event
		divContent.hover(displayTips, hideTips);
		divContent.click(chooseDay);
		if(tdate == i){
			divContent.addClass("today");
		}
		$("#cm").append(divContent);
		leftDis += 60;
		xingqi++;
		if(xingqi>6){
			leftDis = 0;
			xingqi-=7;
			topDis += 38;
		}
	}
}
function displayTips(){
	$("#tips").text($(this).text());
	var top = $(this).offset().top;
	var left = $(this).offset().left;
	var divContent = $('#fd');
	var leftDis = left - 380;
	var topDis = top - 35;
	divContent.css("left",leftDis).css("top",topDis);
	divContent.show();
	//divContent.css("display","block");
}
function hideTips(){
	var divContent = $('#fd');
	divContent.hide();
	//divContent.css("display","none");
}
function chooseDay(){
	$.each($(".cell"),function(){
		$(this).removeClass("today");
		});
	$(this).addClass("today");
}
function toToday(){
	var toDay = TODAY;
	var toDate = toDay.getDate();
	$.each($(".cell"),
		function(){
			if($(this).children().first().text() == toDate){
				$(this).addClass("today");
			}else{
				$(this).removeClass("today");
			}
		});
	var yr = toDay.getFullYear();
	var mn = toDay.getMonth();
	if (yr > 1900) yr -= 1900;
	$("#years")[0].options[yr-1].selected = true;
	$("#months")[0].options[mn].selected = true;
	$("#cm").empty();
	initCal(toDay.getFullYear(),toDay.getMonth()+1,toDay.getDate());
}
function initItems(){
	$("#years").change(changeYM);
	$("#months").change(changeYM);
}
function changeYM(){
	$("#cm").empty();
	var yr = $("#years").val();
	var mn = $("#months").val();
	initCal(yr,mn,"1");
}
initYears();
initMonths();
initCal(TODAY.getFullYear(),TODAY.getMonth()+1,TODAY.getDate());
initItems();

function Box(l,w,h,n){
	this.l = l;
	this.w = w;
	this.h = h;
	if(typeof(n) == "undefined"){
		n = "";
	}
	this.name = n;
	this.toString = function(){return "L:" + this.l + ", W:" + this.w + ", H:" + this.h + "<br/>"};
	this.area = this.l * this.w;
}
var CBOX = new Box(10,10,1000);
var boxV = CBOX.l*CBOX.w*CBOX.h;
var totalV = 0;

var allBox;

function arrangeBox(){
	var boxList = parseInput($("#inputText").text());
	allBox = sort(boxList);
	$("#result").text(sizeCheck(allBox));
}
function parseInput(text){
	return new Array(new Box(10,2,3,"A"),new Box(300,2,4,"B"),new Box(4,5,6));
}


/** 
 * 1.from big to small,if w>l,then change {l,w,h} to {w,l,h}
 * 2.sort all the box area, descend it.(bubble sort)
 */
function sort(boxList){
	$.each(boxList, function(i,j){sortBox(j);});
	var len = boxList.length;
	for(var i=0;i<len-1;i++){
		for(var j=i+1;j<len;j++){
			if(boxList[i].area<boxList[j].area){
				var temp = boxList[i];
				boxList[i] = boxList[j];
				boxList[j] = temp;
			}
		}
	}
	return boxList;
}
function sortBox(box){
	if(box.l<box.w){
		var temp = box.l;
		box.l = box.w;
		box.w = temp;
	}
}

function sizeCheck(boxList){

	// total Volume check
	if(!checkTotal(boxList)){
		return "Real Size(" + totalV + ") is too big for the Box(" + boxV + ")";
	}

	// the biggest area check
	var len = boxList.length;
	var restArea = CBOX.area;
	if(restArea < boxList[0].area){
		return "The Box:" + boxList[0].name + " is too big.";
	}
	
	// 
	var structAll = new Array();
	var floor = 0;
	var restL = CBOX.l;
	var restW = CBOX.w;
	var restH = CBOX.h;
	structAll[floor] = new Array();
	for(var i=0;i<len;i++){
		var count = 0;
		if(restArea < boxList[i].area){
			// TODO
			floor++;
			structAll[floor] = new Array();
			count = 0;
			continue;
		}
		
		if(!checkHeight()){
			return "No more space for Box:" + boxList[i].name;
		}
		if(restH < boxList[i].h){
			return 
		} && 
			((restL > boxList[i].l && restW > boxList[i].w) ||
			(restL > boxList[i].l && restW > boxList[i].w) ||
		structAll[floor][count] = boxList[i];
		restArea -= boxList[i].area;
		
	}
	return "Fit";
}
function checkTotal(boxList){
	$.each(boxList, function(i,j){totalV+=j.l*j.w*j.h});
	if(boxV >= totalV){
		return true;
	}else{
		return false;
	}
}
function checkHeight(){
	
}
function log(msg){
	$("#log").html($("#log").html()+msg);
}
/*
$.each(boxList, function(i,j){log(j);});
*/
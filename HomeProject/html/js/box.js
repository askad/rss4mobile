function Box(l,w,h){
	this.l = l;
	this.w = w;
	this.h = h;
}
var CBOX = new Box(10,10,10);
var allBox = {};

function arrangeBox(){
	alert();
	var boxList = parseInput($("#inputText").text());
	sort(boxList);
	$("#result").text(sizeCheck(boxList));
}
function parseInput(text){
	
}

function sort(boxList){
}

function sizeCheck(boxList){
	return "Yes";
}

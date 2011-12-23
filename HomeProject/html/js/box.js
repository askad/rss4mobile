function Box(l,w,h){
	this.l = l;
	this.w = w;
	this.h = h;
}
var CBOX = new Box(10,10,10);
var allBox;

function arrangeBox(){
	var boxList = parseInput($("#inputText").text());
	allBox = sort(boxList);
	$("#result").text(sizeCheck(allBox));
}
function parseInput(text){
	return new Array(new Box(1,2,3),new Box(3,2,4),new Box(4,5,6));
}


/** 
 * from big to small,if w>l,then change {l,w,h} to {w,l,h}
 */
function sort(boxList){
	$.each(boxList, function(i,j){alert(j)});
	//$.each(boxList, alert);
	return boxList;
}

function sizeCheck(boxList){
	return "Yes";
}

function sortBox(box){
	if(box.l<box.w){
		var temp = box.l;
		box.l = box.w;
		box.w = temp;
	}
}

<%
//Utility function to coalesce a null or undefined string:
function CoalesceString(inputString) {
	if(inputString){
		return inputString;
	}
	else {
		return "-";
	}
}

//Utility function to test if something we have 
//picked off QueryString has a meaningful value
function HasValue(inputVal) {
	if(inputVal){
		var s = "" + inputVal + "";
		if(s == "null") return false;
		if(s == "undefined") return false;
		if(s.length === 0) return false;
		return true;
	}else{
		return false;
	}
}
%>
<!-- #include file ="crmwizard.js" -->
<!-- #include file ="crmconst.js" -->
<!-- #include file ="increaseCrmDebug.js" -->
<!-- #include file ="IncreaseCrmCommonServerFunctions.js" -->

<%
if(DebugOn())
{
	debugger;
}

var quoteID = Request.Querystring("quoteID");


var responseHTML = "<form><fieldset><select name='select_hook_select' id='select_hook_select'>";
responseHTML += "<option value=1>Abbey Retail</option>";
responseHTML += "<option value=2>Jegsy Dodd Ltd</option>";
responseHTML += "<option value=3>Chocolate Watch Band Ltd</option>";
responseHTML += "<option value=4>Barry The Cat</option>";
responseHTML += "</select></fieldset></form>";
Response.Write(responseHTML);
%>
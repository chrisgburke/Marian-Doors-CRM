<!-- #include file ="crmwizard.js" -->
<!-- #include file ="crmconst.js" -->
<!-- #include file ="increaseCrmDebug.js" -->
<!-- #include file ="IncreaseCrmCommonServerFunctions.js" -->

<%
if(DebugOn())
{
	debugger;
}

var responseText = "FALSE";

var quoteID = Request.Querystring("QuoteID");
var oppoLinkID = Request.Querystring("OppoLinkID");
try {
    if(HasValue(quoteID) && HasValue(oppoLinkID)){
        var updateString = "UPDATE Quotes SET quot_mergeoppolinkid=" + oppoLinkID + " WHERE quot_orderquoteid=" + quoteID;
        CRM.ExecSql(updateString);
        responseText = "TRUE";
    }
    }catch(e){

        responseText = "FALSE";
    }
Response.Write(responseText);
%>
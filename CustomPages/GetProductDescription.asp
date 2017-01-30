<!-- #include file ="crmwizard.js" -->
<!-- #include file ="crmconst.js" -->
<!-- #include file ="increaseCrmDebug.js" -->
<!-- #include file ="IncreaseCrmCommonServerFunctions.js" -->

<%
if(DebugOn())
{
	debugger;
}
var prodID = CleanQueryStringValue("prodID");
var prodDescription = "";
if(HasValue(prodID)){
    var qry = "select prod_name from NewProduct WHERE Prod_ProductID =" + prodID;
    var pQuery = CRM.CreateQueryObj(qry);
	pQuery.SelectSql();
    while(!pQuery.eof){ 
        prodDescription = pQuery("prod_name");
        pQuery.NextRecord();
    }
}
Response.Write(prodDescription);
%>
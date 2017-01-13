<!-- #include file ="crmwizard.js" -->
<!-- #include file ="crmconst.js" -->
<!-- #include file ="increaseCrmDebug.js" -->
<!-- #include file ="IncreaseCrmCommonServerFunctions.js" -->
<%
if(DebugOn())
{
	debugger;
}

try {
    var oppoID = Request.QueryString("OppoID");
    if(HasValue(oppoID)){
        var updateString = "UPDATE Opportunity SET oppo_linkreqflag = NULL WHERE oppo_opportunityid=" + oppoID + "";
        CRM.ExecSql(updateString);

    }
    Response.Write("OK");

}catch(e){
    Response.Write("Error : " + e.message);    
}
%>
<!-- #include file ="crmwizard.js" -->
<!-- #include file ="crmconst.js" -->
<!-- #include file ="increaseCrmDebug.js" -->
<!-- #include file ="IncreaseCrmCommonServerFunctions.js" -->

<%
if(DebugOn())
{
	debugger;
}
var optionsArray = [];
var quoteID = Request.Querystring("quoteID");
if(HasValue(quoteID)){

	var getQuoteOppoIDStr = "SELECT quot_opportunityid FROM Quotes WHERE quot_orderquoteid=" + quoteID;
	var smallQuoteQuery = CRM.CreateQueryObj(getQuoteOppoIDStr);
	smallQuoteQuery.SelectSql();
	while(!smallQuoteQuery.eof){
		var opportunityid = smallQuoteQuery("quot_opportunityid");
		if(HasValue(opportunityid)){
			var getOppoLinksQueryStr = "select OppoLink.Opli_OppoLinkID, Company.Comp_Name, Person.Pers_FirstName, Person.Pers_LastName from OppoLink ";
			getOppoLinksQueryStr += "inner join Company on OppoLink.opli_Company = Company.Comp_CompanyId ";
			getOppoLinksQueryStr += "left outer join Person on OppoLink.opli_Person = Person.Pers_PersonId ";
			getOppoLinksQueryStr += " where OppoLink.Opli_OpportunityId = " + opportunityid;
			var oppoLinkQuery = CRM.CreateQueryObj(getOppoLinksQueryStr);
			oppoLinkQuery.SelectSql();
			while(!oppoLinkQuery.eof){

				var optionString = "<option value=" + oppoLinkQuery("Opli_OppoLinkID")	+ ">" + oppoLinkQuery("Comp_name");
				optionString += " (" + oppoLinkQuery("Pers_FirstName") + " " + oppoLinkQuery("Pers_LastName") + ") ";	
				optionString += "</option>";
				optionsArray.push(optionString);
				oppoLinkQuery.NextRecord();
			}
		}
		smallQuoteQuery.NextRecord();
	}

}

if(optionsArray.length > 0)
{
	var responseHTML = "<form><fieldset><select name='select_hook_select' id='select_hook_select' class='EDIT'>";
		for(i=0;i<optionsArray.length;i++){
			responseHTML += optionsArray[i];
		}
	//responseHTML += "<option value=1>Abbey Retail</option>";
	//responseHTML += "<option value=2>Jegsy Dodd Ltd</option>";
	//responseHTML += "<option value=3>Chocolate Watch Band Ltd</option>";
	//responseHTML += "<option value=4>Barry The Cat</option>";
	//responseHTML += "</select></fieldset></form>";
	Response.Write(responseHTML);
}
%>
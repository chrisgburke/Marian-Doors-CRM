<!-- #include file ="crmwizard.js" -->
<!-- #include file ="crmconst.js" -->
<!-- #include file ="increaseCrmDebug.js" -->
<!-- #include file ="IncreaseCrmCommonServerFunctions.js" -->

<%
if(DebugOn())
{
	debugger;
}
var addressIDArray = [];
var companyID = CleanQueryStringValue("companyID");
var personID = CleanQueryStringValue("personID");
if(HasValue(companyID) && HasValue(personID)){

	var getAddressLinkIDStr = "select AdLi_AddressId from Address_Link where AdLi_CompanyID = " + companyID + " and AdLi_PersonID = " + personID;
	var addressLinkQuery = CRM.CreateQueryObj(getAddressLinkIDStr);
	addressLinkQuery.SelectSql();
	while(!addressLinkQuery.eof){
		var addressID = addressLinkQuery("AdLi_AddressId");
		if(HasValue(addressID)){
			addressIDArray.push(addressID);
		}
		addressLinkQuery.NextRecord();
	}

}

if(addressIDArray.length === 1)
{
    var addressLine1 = "";
	var getAddressline1String = "select Addr_Address1 from Address where Addr_AddressId = " + addressIDArray[0];
    var addressQuery = CRM.CreateQueryObj(getAddressline1String);
	addressQuery.SelectSql();
	while(!addressQuery.eof){
        addressLine1 = addressQuery("Addr_Address1");    
        addressQuery.NextRecord();
    }
    Response.Write(addressLine1);

}else{
    Response.Write("MULTIPLE");
}
%>
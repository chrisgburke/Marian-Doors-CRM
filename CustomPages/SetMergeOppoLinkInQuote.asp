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
var updateFlag = CleanQueryStringValue("FullUpdate");
try {
        if(HasValue(quoteID) && HasValue(oppoLinkID)){
            var updateString = "UPDATE Quotes SET quot_mergeoppolinkid=" + oppoLinkID + " WHERE quot_orderquoteid=" + quoteID;
            CRM.ExecSql(updateString);
            if(HasValue(updateFlag) && updateFlag == "Y"){
                
                var oppoLinkSelectString = "select opli_Person from OppoLink where Opli_OppoLinkID =" + oppoLinkID;
                var oppoLinkQuery = CRM.CreateQueryObj(oppoLinkSelectString);
			    oppoLinkQuery.SelectSql();
			    while(!oppoLinkQuery.eof){

                    var persID = oppoLinkQuery("opli_person");
                    responseText = "Key2=" + persID;                    
				    oppoLinkQuery.NextRecord();
			    }    

			}else{
              responseText = "TRUE";      
            }   
        }
        
    
    }catch(e){

        responseText = "FALSE";
    }
Response.Write(responseText);


%>

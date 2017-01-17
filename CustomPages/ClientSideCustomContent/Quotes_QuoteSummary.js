$(document).ready(function(){
    //alert('ok');
    increaseCrmLib.ReplaceSaveButtonClickMethod("Button_QuickSendQuote", "QuickSendOverride");
    increaseDialogBoxHelper.addSelectHook("RightButtonPanel");
});

function QuickSendOverride(orig){

    var quoteID = crm.getArg("Key86");
    if(!quoteID){
        quoteID = crm.getArg("Quot_OrderQuoteID");
    }

    if(quoteID){
        //send to server and return a JSON object (Collection) containing the CompanyName, compID and persID from each OppoLink
        //this is just dummy data right now...
        var getOppoLinkURL = increaseCrmLib.MakeRequestString("GetOppoLinkDataForQuote", "quoteID=" + quoteID);
        var resultHTML = increaseCrmLib.MakeSimpleAjaxRequest(getOppoLinkURL);

        //somehow display this to the user so they pick one...
        increaseDialogBoxHelper.fnOpenSelectDialog(resultHTML, "Select a Company", 
        function(){
            var _url = crm.url();
            crm.url(_url, {parts: 'sa'});

	        document.location.href = orig;
        }, 
        function(){
            SageCRM.utilities.removeOverlay();
        });
        //fire the quoteid, compid and persid back to the server to update the Quote record
        
        //..then let the process continue as usual. 
    }

    

}
$(document).ready(function(){
    //alert('ok');
    increaseCrmLib.ReplaceSaveButtonClickMethod("Button_QuickSendQuote", "QuickSendOverride");

});

function QuickSendOverride(orig){

    var quoteID = crm.getArg("Key86");
    if(!quoteID){
        quoteID = crm.getArg("Quot_OrderQuoteID");
    }

    if(quoteID){
        //send to server and return a JSON object (Collection) containing the Com[panyName, compID and persID from each OppoLink

        //somehow display this to the user so they pick one...

        //fire the quoteid, compid and persid back to the server to update the Quote record

        //..then let the process continue as usual. 
    }

    var _url = crm.url();
    crm.url(_url, {parts: 'sa'});

	document.location.href = orig;

}
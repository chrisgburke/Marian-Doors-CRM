$(document).ready(function () {
    
    // var server = crm.installUrl().split('/')[3];
    var currentHref = document.location.href;
    if(currentHref.indexOf("Act=520") == -1) {
        var key86 = crm.getArg("Key86");
        var newUrl = crm.url(520);
        var urlArr = newUrl.split("&Mode=")
        newUrl =  urlArr[0] + "&Mode=1&CLk=T&ErgTheme=0&RecentValue=1469X86X" + key86;
        
        document.location.href= newUrl;
    }
    // var act = crm.getArg("Act");
    // if(act != "520"){
        
    // }

    increaseCrmLib.ReplaceSaveButtonClickMethod("Button_QuickSendQuote", "QuickSendOverride");
    increaseCrmLib.ReplaceSaveButtonClickMethod("Button_MergeToWord", "QuickMergeOverride");
    increaseCrmLib.ReplaceSaveButtonClickMethod("Button_MergeToPDF", "QuickMergeOverride");
    increaseCrmLib.ReplaceSaveButtonClickMethod("Button_QuickPrintQuote", "QuickPrintOverride");
    increaseDialogBoxHelper.addSelectHook("RightButtonPanel");
});

function loadCustomCss(href) {
    var cssLink = $("<link rel='stylesheet' type='text/css' href='" + href + "'>");
	$("head").append(cssLink);		
}

function DoMergeOverride(afterOKFunc, doFullUpdate) {

    var updateFlag = doFullUpdate? "Y" : "N";
    var quoteID = crm.getArg("Key86");
    if (!quoteID) {
        quoteID = crm.getArg("Quot_OrderQuoteID");
    }

    if (quoteID) {
        //send to server and return a JSON object (Collection) containing the CompanyName, compID and persID from each OppoLink
        //this is just dummy data right now...
        var getOppoLinkURL = increaseCrmLib.MakeRequestString("GetOppoLinkDataForQuote", "quoteID=" + quoteID);
        var resultHTML = increaseCrmLib.MakeSimpleAjaxRequest(getOppoLinkURL);

        //somehow display this to the user so they pick one...
        increaseDialogBoxHelper.fnOpenSelectDialog(resultHTML, "Select a Company",
            function () {

                //determine which OppoLinkID they picked:
                var oppoLinkID = $("#select_hook_select").val();
                if (oppoLinkID) {

                    //fire this off to set quot_mergeoppolinkid in the selected quote:
                    var urlObj = {};
                    urlObj.Target = "SetMergeOppoLinkInQuote.asp"
                    urlObj.Params = [{ 'arg': 'QuoteID', 'val': quoteID }, { 'arg': 'OppoLinkID', 'val': oppoLinkID }, { 'arg': 'FullUpdate', 'val' : updateFlag}];
                    var url = increaseCrmLib.MakeAjaxUrl(urlObj);
                    var returnValue = increaseCrmLib.MakeSimpleAjaxRequest(url)
                    if (returnValue === "TRUE") {
                        afterOKFunc();
                    } else if (returnValue.startsWith("Key2")) {
                         afterOKFunc(returnValue);
                    
                    } else {
                        SageCRM.utilities.removeOverlay();
                    }
                } else {
                    SageCRM.utilities.removeOverlay();
                }
            },
            function () {
                SageCRM.utilities.removeOverlay();
            });
    }
}

function QuickPrintOverride(orig) {
    try {
        DoMergeOverride(function () {
            window.open(orig, "_blank");
        }, false);
    } catch (e) {
        SageCRM.utilities.removeOverlay();
    }
}

function QuickSendOverride(orig) {
    try {
        DoMergeOverride(function (extraKey) {
            document.location.href = orig + "&" + extraKey;
        }, true);
    } catch (e) {
        SageCRM.utilities.removeOverlay();
    }
}

function QuickMergeOverride(orig) {
    try {
        DoMergeOverride(function () {
            document.location.href = orig;
        }, false);
    } catch (e) {
        SageCRM.utilities.removeOverlay();
    }
}
/*
function QuickSendOverrideOLD(orig) {

    var quoteID = crm.getArg("Key86");
    if (!quoteID) {
        quoteID = crm.getArg("Quot_OrderQuoteID");
    }

    if (quoteID) {
        //send to server and return a JSON object (Collection) containing the CompanyName, compID and persID from each OppoLink
        //this is just dummy data right now...
        var getOppoLinkURL = increaseCrmLib.MakeRequestString("GetOppoLinkDataForQuote", "quoteID=" + quoteID);
        var resultHTML = increaseCrmLib.MakeSimpleAjaxRequest(getOppoLinkURL);

        //somehow display this to the user so they pick one...
        increaseDialogBoxHelper.fnOpenSelectDialog(resultHTML, "Select a Company",
            function () {

                //determine which OppoLinkID they picked:
                var oppoLinkID = $("#select_hook_select").val();
                if (oppoLinkID) {

                    //fire this off...
                    var urlObj = {};
                    urlObj.Target = "SetMergeOppoLinkInQuote.asp"
                    urlObj.Params = [{ 'arg': 'QuoteID', 'val': quoteID }, { 'arg': 'OppoLinkID', 'val': oppoLinkID }];
                    var url = increaseCrmLib.MakeAjaxUrl(urlObj);
                    var returnValue = increaseCrmLib.MakeSimpleAjaxRequest(url)
                    if (returnValue === "TRUE") {
                        var _url = crm.url();
                        crm.url(_url, { parts: 'sa' });
                        this.target = "_blank";
                        document.location.href = orig;
                    } else {
                        SageCRM.utilities.removeOverlay();
                    }
                } else {
                    SageCRM.utilities.removeOverlay();
                }
            },
            function () {
                SageCRM.utilities.removeOverlay();
            });
        //fire the quoteid, compid and persid back to the server to update the Quote record

        //..then let the process continue as usual. 
    }
}
//*/
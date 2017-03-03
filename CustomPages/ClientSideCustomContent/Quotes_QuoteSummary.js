$(document).ready(function () {

    var ie = false;
    // var server = crm.installUrl().split('/')[3];
    // var currentHref = document.location.href;
    // if (currentHref.indexOf("Act=520") == -1 && currentHref.indexOf("Act=1469") != -1) {
    //     if (!$("quit_productfamilyidSPAN").length) {
    //         var key86 = crm.getArg("Key86");
    //         var newUrl = crm.url(520);
    //         var urlArr = newUrl.split("&Mode=")
    //         newUrl = urlArr[0] + "&Mode=1&CLk=T&ErgTheme=0&RecentValue=1469X86X" + key86;

    //         //document.location.href = newUrl;
    //     }
    // }
    // var act = crm.getArg("Act");
    // if(act != "520"){

    // }
    if ( (navigator.userAgent.search("Chrome") >= 0) || (navigator.userAgent.search("Safari") >= 0)) {
        ie = false;
    }else{
        ie = true;
    }


    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }

    increaseCrmLib.ReplaceSaveButtonClickMethod("Button_QuickSendQuote", "QuickSendOverride");
    increaseCrmLib.ReplaceSaveButtonClickMethod("Button_MergeToWord", "QuickMergeOverride");
    increaseCrmLib.ReplaceSaveButtonClickMethod("Button_MergeToPDF", "QuickMergeOverride");
    increaseCrmLib.ReplaceSaveButtonClickMethod("Button_QuickPrintQuote", "QuickPrintOverride");
    increaseDialogBoxHelper.addSelectHook("RightButtonPanel");
    increaseDialogBoxHelper.addConfirmHook("RightButtonPanel");

    if(ie){
        $("#Button_QuickPrintQuote").attr("onclick", "");
    }

});

function loadCustomCss(href) {
    var cssLink = $("<link rel='stylesheet' type='text/css' href='" + href + "'>");
    $("head").append(cssLink);
}

function DoMergeOverride(afterOKFunc, doFullUpdate) {

    var updateFlag = doFullUpdate ? "Y" : "N";
    var quoteID = crm.getArg("Key86");
    if (!quoteID) {
        quoteID = crm.getArg("Quot_OrderQuoteID");
    }

    if (quoteID) {
        //send to server and return a JSON object (Collection) containing the CompanyName, compID and persID from each OppoLink
        //this is just dummy data right now...
        var getOppoLinkURL = increaseCrmLib.MakeRequestString("GetOppoLinkDataForQuote", "quoteID=" + quoteID);
        var resultHTML = increaseCrmLib.MakeSimpleAjaxRequest(getOppoLinkURL);

        if (resultHTML.length > 0) {
            //somehow display this to the user so they pick one...
            increaseDialogBoxHelper.fnOpenSelectDialog(resultHTML, "Select a Company",
                function () {

                    //determine which OppoLinkID they picked:
                    var oppoLinkID = $("#select_hook_select").val();
                    if (oppoLinkID) {

                        //fire this off to set quot_mergeoppolinkid in the selected quote:
                        var urlObj = {};
                        urlObj.Target = "SetMergeOppoLinkInQuote.asp"
                        urlObj.Params = [{ 'arg': 'QuoteID', 'val': quoteID }, { 'arg': 'OppoLinkID', 'val': oppoLinkID }, { 'arg': 'FullUpdate', 'val': updateFlag }];
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
        } else {
            increaseDialogBoxHelper.fnOpenErrorDialog(noLinkedCompaniesText(), "No Linked Companies", 210, 400, function () { SageCRM.utilities.removeOverlay(); });
        }
    }
}

function noLinkedCompaniesText() {
    var str = "This Quote/Opportunity is not linked to any Companies";
    str += "<br/><br/>";
    str += "You must add an Opportunity Link before the Quote can be printed or emailed.";
    return str;

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
            //document.location.href = orig + "&" + extraKey;

            //see if our 'orig' contains a Key2:
            if (orig.indexOf("Key2=") != -1) {
                var extraKeyValue = extraKey.split('=')[1];
                _newOrig = orig.replace(/(Key2=)[^\&]+/, '$1' + extraKeyValue);
            } else {
                _newOrig = orig + "&" + extraKey;

            }
            window.open(_newOrig, "_blank");
        }, true);
        SageCRM.utilities.removeOverlay();
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
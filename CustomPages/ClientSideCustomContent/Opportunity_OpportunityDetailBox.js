$(document).ready(function(){
    var _act = crm.getArg("Act");
    if(_act != ""){
        $("#EntryForm table:first tr:lt(6)").hide();
    }

    if(_act === "1190"){

        $('input[name=PrevCustomURL]').val(""); 
        $("#RightButtonPanel tr:lt(1)").clone().insertAfter("#RightButtonPanel tr:lt(1)");
        $("#RightButtonPanel tr:lt(1) a").attr("id", "Save_And_Link");
        $("#RightButtonPanel tr:lt(1) a:eq(1)").attr("accesskey", "L");
        $("#RightButtonPanel tr:lt(1) a:eq(1)").html("Save and <font style='text-decoration:underline'>L</font>ink");
        increaseCrmLib.ReplaceSaveButtonClickMethod("Save_And_Link", "SaveAndLink");
    }

    if(_act === "260"){

        if(  $("#_HIDDENoppo_linkreqflag").val() === "Y" ) {

            //pick off the OppoID
            var oppoID = crm.getArg("Key7");

            if(!isNaN(oppoID)){
                //make an async POST to reset this flag
                $("#_HIDDENoppo_linkreqflag").val("");

                var strUrl = increaseCrmLib.MakeRequestString("ResetOppoLinkReqFlag", "OppoID=" + oppoID); 
                
                var updateObj =  { "oppo_linkreqflag" : "" }
                $.ajax({
                    type: "GET",
                    url: strUrl,
                    contentType: "application/json; charset=utf-8",
                    dataType: "text",
                    success: function(data) { 
                        /* nowt */
                        
                    },
                    error: function(jqXHR, textStatus, errorThrown) { 
                        /* do nothing &*/                         
                    }
                });   

                //then redirect to OppoLinkNew.asp
                RedirectToOppoLinkNew(oppoID);            
            }
        }
    }
});

function RedirectToOppoLinkNew(oppoID){
    var redirectUrl = increaseCrmLib.MakeRequestString("OppoLink/OppoLinkNew", "OppoID=" + oppoID + "&DO_LINK=Y");
    document.location.href= redirectUrl;
}

function SaveAndLink(orig) {

    $("#_HIDDENoppo_linkreqflag").val('Y');
    var fnStr = orig.substring(11);
	var savefn = new Function(fnStr);	
    savefn();	
}
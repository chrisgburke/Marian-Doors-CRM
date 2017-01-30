$(document).ready(function () {

    var productID = null;

    productID = crm.fields('quit_productid').val();
    if (productID) {
        GetProductDescription(productID);        
    }
});

function GetProductDescription(prodID) {

    var getProductDataURL = increaseCrmLib.MakeRequestString("GetProductDescription", "prodID=" + prodID);
    increaseCrmLib.MakeSimpleAsyncAjaxRequest(getProductDataURL, function(data){
        crm.fields('quit_description').val(data);
    },
    function(e){

    });
    // crm.sdata({
    //     entity: "newproduct",
    //     id: prodID,
    //     success: function (crmRec) {
    //         if (crmRec.prod_name) {
    //             crm.fields('quit_description').val(crmRec.prod_name);
    //         }
    //     }
    // });
}
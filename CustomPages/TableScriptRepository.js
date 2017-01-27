//*
//COMMON FUNCTIONS
function LoggingOn() {
    return true;
}

//***** SET THIS SPECIFIC TO THE CRM INSTANCE *****
function logFileName() {
    return "D:\\CRM2017\\CRM2017\\Logs\\tableScriptLog.txt";
}
//***** SET THIS SPECIFIC TO THE CRM INSTANCE *****


function writeToFile(message) {

    if (LoggingOn()) {
        try {
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            var s = fso.OpenTextFile(logFileName(), 8, true);
            var fName = arguments.callee.caller.toString().match(/function ([^\(]+)/)[1]
            s.writeline(new Date().toTimeString() + " - " + fName + ":");
            s.writeline("----  " + message);
            s.writeline("");
            s.Close();
            fso = null;
        } catch (error) {
            ErrorStr += message;
        }

    }
}

function HasValue(inputVal) {
	if(inputVal){
		var s = "" + inputVal + "";
		if(s == "null") return false;
		if(s == "undefined") return false;
		if(s.length === 0) return false;
		return true;
	}else{
		return false;
	}
}

//*************************
// Entity : QuoteItems 
// Script : TaxCalculation 
//*************************
function QuoteItems_TaxCalculation_InsertRecord() {
    try {
        //CalculateTax();
        //CalculateGrossValue();
    } catch (error) {
        writeToFile("ERROR: " + error.message);
    }
}

function QuoteItems_TaxCalculation_PostInsertRecord() {
    try {

    } catch (error) {
        writeToFile("ERROR: " + error.message);
    }
}

function QuoteItems_TaxCalculation_UpdateRecord() {
    try {
       // CalculateTax();
       // CalculateGrossValue();
    } catch (error) {
        writeToFile("ERROR: " + error.message);
    }
}

function QuoteItems_TaxCalculation_DeleteRecord() {
    try {

    } catch (error) {
        writeToFile("ERROR: " + error.message);
    }
}

function Calculate() {
    var quotedpriceTotal = CalculateTax();
    CalculateGrossValue(quotedPriceTotal);
}

function CalculateTax() {

    var quotedPriceTotal = parseFloat(Values('Quit_quotedpricetotal')).toFixed(2);
    writeToFile("Quoted price total = " + quotedPriceTotal);

    var taxRate = parseFloat(Values('Quit_taxrate') / 100).toFixed(2);
    writeToFile("Tax Rate = " + taxRate);

    var taxcalc = parseFloat(quotedPriceTotal * taxRate).toFixed(2);
    writeToFile("Tax Calc = " + taxcalc);

    Values('Quit_linetaxvalue') = taxcalc;

    return quotedPriceTotal;
}

function CalculateGrossValue(qpTotal) {
    var lineTaxValue = parseFloat(Values('Quit_linetaxvalue')).toFixed(2);
    writeToFile("Line Tax Value = " + lineTaxValue);
    var grosscalc = parseFloat(qpTotal + lineTaxValue).toFixed(2);
    writeToFile("Gross Calc = " + grosscalc);
    Values('Quit_GrossValue') = grosscalc;
}
//******************************************************************************************************************************

//*************************
// Entity : OppoLink 
// Script : UpdateNameField 
//*************************
function OppoLink_UpdateNameField_InsertRecord(){
   try {
       UpdateName();
   } catch (error) {
       writeToFile("ERROR: " + error.message);
   }
}

function OppoLink_UpdateNameField_PostInsertRecord(){
   try {
        
   } catch (error) {
       writeToFile("ERROR: " + error.message);
   }
}

function OppoLink_UpdateNameField_UpdateRecord(){
   try {
       UpdateName();
   } catch (error) {
       writeToFile("ERROR: " + error.message);
   }
}

function OppoLink_UpdateNameField_DeleteRecord(){
   try {

   } catch (error) {
       writeToFile("ERROR: " + error.message);
   }
}

function UpdateName(){
    writeToFile("IN UPDATENAME METHOD");
    var oppoID = Values('OpLi_OpportunityId');
    var compID = Values("OpLi_company");
    
    var opportunityRecord = CRM.FindRecord("Opportunity", "oppo_opportunityid=" + oppoID);
    var companyRecord = CRM.FindRecord("Company", "comp_companyid="+compID);
    
    var oppoDetails = new String(opportunityRecord.oppo_description);
    if(oppoDetails.length > 14){
        oppoDetails = oppoDetails.substring(0, 14);
    }
    var compDetails = new String(companyRecord.comp_name);
    if(compDetails.length > 13){
        compDetails = compDetails.substring(0, 13);
    }
    var nameField = 'Edit';
    Values('OpLi_Name') = oppoDetails +" / " + compDetails;//nameField;
    Values('OpLi_EditField') = 'Edit';
}

//*************************
// Entity : Opportunity 
// Script : CleanForeignIDs 
//*************************
function Opportunity_CleanForeignIDs_InsertRecord(){
   try {

   } catch (error) {
       writeToFile("ERROR: " + error.message);
   }
}

function Opportunity_CleanForeignIDs_PostInsertRecord(){
   try {
       CleanForeignIds(WhereClause);
   } catch (error) {
       writeToFile("ERROR: " + error.message);
   }
}

function Opportunity_CleanForeignIDs_UpdateRecord(){
   try {

   } catch (error) {
       writeToFile("ERROR: " + error.message);
   }
}

function Opportunity_CleanForeignIDs_DeleteRecord(){
   try {

   } catch (error) {
       writeToFile("ERROR: " + error.message);
   }
}

function CleanForeignIds(whereClause){

    var updateString = "UPDATE Opportunity SET Oppo_PrimaryCompanyId = NULL, Oppo_PrimaryPersonId = NULL where ";
    updateString += whereClause; 
    writeToFile(updateString);
    CRM.ExecSql(updateString);
}

// *** COPY THIS INTO CRM METADATA ***
// function InsertRecord() {
// Opportunity_CleanForeignIDs_InsertRecord();
// }

// function PostInsertRecord(){
// Opportunity_CleanForeignIDs_PostInsertRecord();
// }

// function UpdateRecord() {
// Opportunity_CleanForeignIDs_UpdateRecord();
// }

// function DeleteRecord(){
// Opportunity_CleanForeignIDs_DeleteRecord();
// }

//*************************
// Entity : Comm_Link 
// Script : Test 
//*************************
function Comm_Link_Test_InsertRecord(){
   try {

   } catch (error) {
       writeToFile("ERROR: " + error.message);
   }
}

function Comm_Link_Test_PostInsertRecord(){
   try {
       writeToFile(WhereClause);
       var commLinkRecord = CRM.FindRecord("Comm_Link", WhereClause);
       writeToFile(commLinkRecord.cmli_comm_communicationid);
       if(HasValue(commLink.cmli_comm_communicationid)){
           var communicationRecord = CRM.FindRecord("Communication", "comm_communicationid=" + commLink.cmli_comm_communicationid);
           if(communicationRecord.RecordCount > 0){
               var oppoID = communicationRecord.comm_opportunityid;
               
           }
       }
   } catch (error) {
       writeToFile("ERROR: " + error.message);
   }
}

function Comm_Link_Test_UpdateRecord(){
   try {

   } catch (error) {
       writeToFile("ERROR: " + error.message);
   }
}

function Comm_Link_Test_DeleteRecord(){
   try {

   } catch (error) {
       writeToFile("ERROR: " + error.message);
   }
}

// *** COPY THIS INTO CRM METADATA ***
// function InsertRecord() {
// Comm_Link_Test_InsertRecord();
// }

// function PostInsertRecord(){
// Comm_Link_Test_PostInsertRecord();
// }

// function UpdateRecord() {
// Comm_Link_Test_UpdateRecord();
// }

// function DeleteRecord(){
// Comm_Link_Test_DeleteRecord();
// }


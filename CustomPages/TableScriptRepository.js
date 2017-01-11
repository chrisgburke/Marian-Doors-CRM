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

//*************************
// Entity : QuoteItems 
// Script : TaxCalculation 
//*************************
function QuoteItems_TaxCalculation_InsertRecord() {
    try {
        CalculateTax();
        CalculateGrossValue();
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
        CalculateTax();
        CalculateGrossValue();
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
    var nameField = 'Edit';
    Values('OpLi_Name') = nameField;
}

//*********************************************************************************************/









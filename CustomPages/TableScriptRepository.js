//*
//COMMON FUNCTIONS
function LoggingOn(){
    return true;
}

//***** SET THIS SPECIFIC TO THE CRM INSTANCE *****
function logFileName() {
    return "D:\\CRM2017\\CRM2017\\Logs\\tableScriptLog.txt";
}
//***** SET THIS SPECIFIC TO THE CRM INSTANCE *****


function writeToFile(message) {
    
    if(LoggingOn()){
        try {  
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            var s = fso.OpenTextFile(logFileName(), 8, true);
            var fName = arguments.callee.caller.toString().match(/function ([^\(]+)/)[1]
            s.writeline(new Date().toTimeString() + " - " + fName + ":");
            s.writeline("----  " + message);
            s.writeline("");
            s.Close();
            fso = null;
        }catch(error){
            ErrorStr += message;
        }
        
    }
}
//COMMON FUNCTIONS

function ENTITY_TSNAME_InsertRecord(){
    try {
        
    } catch (error) {
        writeToFile("ERROR: " + error.message);
    }
}

function ENTITY_TSNAME_PostInsertRecord(){
	try {
        
    } catch (error) {
        writeToFile("ERROR: " + error.message);
    }
}

function ENTITY_TSNAME_UpdateRecord(){
	try {
        
    } catch (error) {
        writeToFile("ERROR: " + error.message);
    }
}

function ENTITY_TSNAME_DeleteRecord(){
    try {
        
    } catch (error) {
        writeToFile("ERROR: " + error.message);
    }
}




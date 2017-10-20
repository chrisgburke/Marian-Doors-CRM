var databaseName = "CRM2017";

var gulp = require("gulp"),
  watch = require("gulp-watch"),
  exec = require("child_process").exec;

gulp.task("clientSideCustomContent", function() {});

gulp.task("watch", function() {
  var watcher = gulp.watch(["CustomPages/ClientSideCustomContent/*.js"]);
  watcher.on("change", function(event) {
    console.log(event.path + " : " + event.type);

    var okContinue = false;
    var customContent = "";
    var fileParts = event.path.split("\\");
    var fileName = fileParts[fileParts.length - 1];
    var patt = /^[\w]+(?=.js)/;
    var fileName2 = fileName.match(patt);
    if (fileName2) {
      var arr = fileName2[0].split("_");
      if (event.type === "changed") {
         
        customContent =
          "<script src=''../CustomPages/ClientSideCustomContent/" +
          fileName +
          "''></script>'";
          okContinue = true;
      }
      if (event.type === "deleted") {
        customContent = "'";
        okContinue = true;
      }
      if (okContinue) {
        var sqlStatement =
          "USE " +
          databaseName +
          ";UPDATE Custom_ScreenObjects SET Cobj_CustomContent='";
        sqlStatement += customContent;
        sqlStatement +=
          " WHERE Cobj_EntityName = '" +
          arr[0] +
          "' AND Cobj_Name = '" +
          arr[1] +
          "'";
          console.log(sqlStatement);
        var sqlRunnerCommand = 'sqlcmd -Q "' + sqlStatement + '"';
        exec(sqlRunnerCommand);
        console.log("SQL Updated");
      }
    }
  }).on("error", function(err){
      console.log(err.toString());
      this.emit('end');
  });
//   watch("./CustomPages/ClientSideCustomContent/*.js", function() {
//     gulp.start("clientSideCustomContent");
//   }).on("change", function(file) {
//     try {
//       console.log("ORIGINAL METHOD SAYS : " + file);
//       var fileParts = file.split("\\");
//       var fileName = fileParts[fileParts.length - 1];
//       var patt = /^[\w]+(?=.js)/;
//       var fileName2 = fileName.match(patt);
//       if (fileName2) {
//         var arr = fileName2[0].split("_");
//         var sqlStatement =
//           "USE " +
//           databaseName +
//           ";UPDATE Custom_ScreenObjects SET Cobj_CustomContent='";
//         sqlStatement +=
//           "<script src=''../CustomPages/ClientSideCustomContent/" +
//           fileName +
//           "''></script>' ";
//         sqlStatement +=
//           "WHERE Cobj_EntityName = '" +
//           arr[0] +
//           "' AND Cobj_Name = '" +
//           arr[1] +
//           "'";
//         var sqlRunnerCommand = 'sqlcmd -Q "' + sqlStatement + '"';
//         exec(sqlRunnerCommand);
//       }
//     } catch (e) {
//       console.log(e.message);
//     }
  //});
});

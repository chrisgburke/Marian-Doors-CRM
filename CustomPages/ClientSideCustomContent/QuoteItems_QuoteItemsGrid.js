$(document).ready(function(){

    var counter = 0;
    var productNameColumnIndex = crm.grids(0).columnIndex("prod_name");
    var quitDescriptionColumnIndex = crm.grids(0).columnIndex("quit_description");

    crm.grids(0).rows(":gt(0)", true).cells().exec(function (index, key) {
        counter = index;
        if(key.cellIndex == (productNameColumnIndex)){
          var rowIndex = $(key).parent().index() - 1;

          var quitDescriptionText = this.getCellText(rowIndex, quitDescriptionColumnIndex).trim();
          var cellHtml = this.getCellHtml(rowIndex, productNameColumnIndex).trim();
          
          if(cellHtml.length > 0 && cellHtml.substr(0, 2) == "<a"){
              var partA = cellHtml.split('>')[0];
              var partB = ">" + quitDescriptionText + "</a>";
              var newHtml = partA + partB;
              this.setCellHtml(rowIndex, quitDescriptionColumnIndex, newHtml);        
           }
        }
    });

    crm.grids(0).hideColumn("prod_name");
    
});
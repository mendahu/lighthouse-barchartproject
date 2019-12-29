$(document).ready(function() {
  //Creates the data input line by calling the Line adding function
  lineAdder();

  //Hides the first line item remover so it can't be removed
  $("#input-section-data-form-line-item-1").children().first().css("visibility", "hidden");

  //Adds the onclick listener to the generate button.
  $("#data-submit").attr("onclick", "gatherData()");
});



const lineAdder = function() {
  //For convenience
  let $form = $("#input-section-data-form");

  //Remove Adder line first. This is re-populated at the end of the function
  let $currentLine = $form.children().last();
  $currentLine.remove();

  //Figures out how many lines already exist so it knows what to label new lines
  let lineCount = $form.children().length;
  console.log(lineCount);





  // ******************************************************************
  // This section adds a new line to the data form
  // ******************************************************************

  //Create new line for data
  //Creates container for entire line
  $form.append("<div id=\"input-section-data-form-line-item-" + (lineCount + 1 ) + "\" class=\"input-section-data-form-line\"></div>");
  $currentLine = $form.children().last();

  // Populate the new line with different cells

  //Creates a cell to hold the button that can later remove this line
  $currentLine.append("<div id=\"line-item-remover-button-" + (lineCount + 1 ) + "\"></div>");
  let $lineItemModifierCSS = {
    "width": "1.6em",
    "height": "1.6em",
    "border-radius": "10px"
  };
  let $lineItemRemoverCSS = {
    "border": "2px solid red"
  };
  let $currentLineCell = $currentLine.children().last();
  $currentLineCell.css($lineItemModifierCSS);
  $currentLineCell.css($lineItemRemoverCSS);

  //Populates the grid cell for the line item remover with the button to do so
  $currentLineCell.append("<span class=\"line-item-remover-text\" id=\"line-item-remover-" + (lineCount + 1 ) + "\">-</span>");
  let $lineItemModifierTextCSS = {
    "font-size": "1.6em",
    "margin": "auto",
    "display": "block",
    "text-align": "center"
  };
  let $lineItemRemoverTextCSS = {
    "color": "red"
  };
  $currentLineItemCellLastChild = $currentLineCell.children().last();
  $currentLineItemCellLastChild.css($lineItemModifierTextCSS);
  $currentLineItemCellLastChild.css($lineItemRemoverTextCSS);

  //lineCount = $form.children().length;
  $("#line-item-remover-button-" + (lineCount + 1)).attr("onclick", "lineRemover(" + (lineCount + 1) + ")");


  //Create and populate a cell for the data label
  $currentLine.last().append("<div class=\"line-item-label\"><span class=\"input-section-data-form-text\">Data Bar " + (lineCount + 1 ) + " Label: </span><input type=\"text\" name=\"line-item-label-" + (lineCount + 1 ) + "\" class=\"input-section-field-box\" size=\"40\"></div>");

  //Create and populate cells for up to five data per bar
  $currentLine.last().append("<div class=\"line-item-data-field\"><span class=\"input-section-data-form-text\">Data Bar " + (lineCount + 1 ) + " Data Points: </span><input type=\"text\" name=\"line-item-data-field-" + (lineCount + 1 ) + "-1\" class=\"input-section-field-box\" size=\"5\"></div>");
  $currentLine.last().append("<div class=\"line-item-data-field\"><input type=\"text\" name=\"line-item-data-field-" + (lineCount + 1 ) + "-2\" class=\"input-section-field-box\" size=\"5\"></div>");
  $currentLine.last().append("<div class=\"line-item-data-field\"><input type=\"text\" name=\"line-item-data-field-" + (lineCount + 1 ) + "-3\" class=\"input-section-field-box\" size=\"5\"></div>");
  $currentLine.last().append("<div class=\"line-item-data-field\"><input type=\"text\" name=\"line-item-data-field-" + (lineCount + 1 ) + "-4\" class=\"input-section-field-box\" size=\"5\"></div>");
  $currentLine.last().append("<div class=\"line-item-data-field\"><input type=\"text\" name=\"line-item-data-field-" + (lineCount + 1 ) + "-5\" class=\"input-section-field-box\" size=\"5\"></div>");

  //Styles all cells with standard CSS
  let $lineItemCellCSS = {
    "margin": "5px 10px 5px 10px"
  };
  $currentLine.children().css($lineItemCellCSS);



  // ******************************************************************
  // This section adds an add button to the data form to continue adding more lines
  // ******************************************************************

  //Create new line for Add Button

  //Creates container for another entire line
  $form.append("<div id=\"input-section-data-form-line-item-" + (lineCount + 2 ) + "\" class=\"input-section-data-form-line\"></div>");
  $currentLine = $form.children().last();

  //Creates a grid cell to hold the button that can add another line
  $currentLine.append("<div id= \"line-item-adder-button\" class=\"line-item-adder\"></div>");
  let $lineItemAdderCSS = {
    "border": "2px solid green"
  };
  $currentLineCell = $currentLine.children().last();
  $currentLineCell.css($lineItemModifierCSS);
  $currentLineCell.css($lineItemAdderCSS);
  $currentLineCell.css($lineItemCellCSS);

  $("#line-item-adder-button").attr("onclick", "lineAdder()");


  //Populates the grid cell for the line item adder with the button to do so
  $currentLineCell.append("<span class=\"line-item-adder-text\" id=\"line-item-adder-" + (lineCount + 2 ) + "\">+</span>");
  $lineItemModifierTextCSS = {
    "font-size": "1.6em",
    "margin": "auto",
    "display": "block",
    "text-align": "center"
  };
  let $lineItemAdderTextCSS = {
    "color": "green"
  };
  $currentLineItemCellLastChild = $currentLineCell.children().last();
  $currentLineItemCellLastChild.css($lineItemModifierTextCSS);
  $currentLineItemCellLastChild.css($lineItemAdderTextCSS);

};



const styler = function() {
  let chartAxesLabel = {
    "font-size": "1.5em",
    "padding": "10px"
  };
  $(".chart-axes-label").css(chartAxesLabel);

  let yAxisTickLabel = {
    "font-size": "1.5em"
  };
  $(".y-axis-tick-label").css(yAxisTickLabel);
  $(".x-axis-data-label").css("font-size", "1.5em");
  $(".bar-chart-data-bar-data-label").css("font-size", "1.5em");
};

const gatherData = function() {
  //Adds a fetcher for sample data
  let $sampleDataset = $("#sample-data-selector").val();

  //Sets value for where the chart will live
  let $chartContainer = $("#chart-container");

  console.log("Selected sample dataset is " + $sampleDataset + ".\nIts values are " + sampleData[$sampleDataset][0]);
  console.log("Selected sample dataset options are:");
  console.log(sampleData[$sampleDataset][1]);

  //draws the chart
  drawBarChart(sampleData[$sampleDataset][0], sampleData[$sampleDataset][1], $chartContainer);

  styler();
};

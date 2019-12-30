$(document).ready(function() {
  //Creates the data input line by calling the Line adding function
  lineAdder();

  //Hides the first line item remover so it can't be removed
  $("#input-section-data-form-line-item-1").children().first().css("visibility", "hidden");

  //Adds the onclick listener to the test buttons
  $(".test-data-button").each(function(sampleSet) {
    $(this).attr("onclick", "testDataFetcher(sampleData[\"" + $(this).attr("data-sampleset") + "\"])");
  });

  //Adds the onclick listener to the generate button.
  $("#data-submit").attr("onclick", "gatherData()");

  //Adds the onclick listener to the clear button.
  $("#data-clear").attr("onclick", "clearForm()");
});

// ******************************************************************
// This helper function clears the form
// ******************************************************************

const clearForm = function() {
  $("#input-section-form").trigger("reset");
};

// ******************************************************************
// This helper function removes a target line from the data line form
// ******************************************************************

const lineRemover = function(lineNumber) {
  //Delete the line that the function calls for
  $("#input-section-data-form-line-item-" + lineNumber).remove();

  //Rename the lines with correct ordering in case a line in the middle of the section was removed
  $("#input-section-data-form").children().each( function(index) {
    $(this).attr("id", "input-section-data-form-line-item-" + (index + 1));
    $(this).children().eq(0).attr("id", "line-item-remover-button-" + (index + 1));
    $(this).children().eq(0).attr("onclick", "lineRemover(" + (index + 1) + ")");
    $(this).children().eq(0).children().eq(0).attr("id", "line-item-remover-" + (index + 1));
    $(this).children().eq(1).children().eq(0).html("Data Bar " + (index + 1) + " Label: ");
    $(this).children().eq(2).children().eq(0).html("Data Bar " + (index + 1) + " Data Points: ");
  });
  $("#input-section-data-form").children().last().children().eq(0).attr("onclick", "lineAdder()");
};

// ******************************************************************
// This helper function adds a mew line to the data line form
// ******************************************************************

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
  $currentLine.last().append("<div class=\"line-item-data-field\"><span class=\"input-section-data-form-text\">Data Bar " + (lineCount + 1 ) + " Data Points: </span><input type=\"text\" name=\"line-item-data-field-" + (lineCount + 1 ) + "-1\" class=\"input-section-field-box input-section-data-box\" size=\"5\"></div>");
  $currentLine.last().append("<div class=\"line-item-data-field\"><input type=\"text\" name=\"line-item-data-field-" + (lineCount + 1 ) + "-2\" class=\"input-section-field-box input-section-data-box\" size=\"5\"></div>");
  $currentLine.last().append("<div class=\"line-item-data-field\"><input type=\"text\" name=\"line-item-data-field-" + (lineCount + 1 ) + "-3\" class=\"input-section-field-box input-section-data-box\" size=\"5\"></div>");
  $currentLine.last().append("<div class=\"line-item-data-field\"><input type=\"text\" name=\"line-item-data-field-" + (lineCount + 1 ) + "-4\" class=\"input-section-field-box input-section-data-box\" size=\"5\"></div>");
  $currentLine.last().append("<div class=\"line-item-data-field\"><input type=\"text\" name=\"line-item-data-field-" + (lineCount + 1 ) + "-5\" class=\"input-section-field-box input-section-data-box\" size=\"5\"></div>");

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

// ******************************************************************
// This helper function styles the chart to match the rest of the page
// ******************************************************************

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

// ******************************************************************
// This helper function plots test data using the configured buttons on the HTML page
// ******************************************************************

const testDataFetcher = function(sampleDataSet) {
  //Sets value for where the chart will live
  let $chartContainer = $("#chart-container");

  //draws the chart
  drawBarChart(sampleDataSet[0], sampleDataSet[1], $chartContainer);

  styler();
};

// ******************************************************************
// This function collects the data in the form and sends it to the chart-draw.js API
// ******************************************************************

const gatherData = function() {
  //Sets value for where the chart will live
  let $chartContainer = $("#chart-container");

  //Set holder for data and options
  let data = [[]];
  let options = {};

  //Collect the data in the form and add to data array
  let $dataValueContainers = $(".input-section-data-box");
  let $dataValues = [];
  $dataValueContainers.each(function() {
    $dataValues.push($(this).val());
  });

  //Loop through data array #dataValues and transform into the right format for chart-draw.js API
  //Data from the same bar has to be joined into its own nested array
  let barIndex = 0;
  for (let i = 0; i < $dataValues.length; i++) {
    if ((i % 5 === 0) && !(i === 0)) {
      barIndex++;
      data.push([]);
    }
    if (!($dataValues[i] === "")) {
      data[barIndex].push(Number($dataValues[i]));
    }
  }

  //Check and alert user if there is no data inputted
  console.log("There are " + data.length + " values.");
  console.log(data[0][0]);
  if (data[0][0] === undefined) {
    alert("Please enter at least one data point to chart!");
    return;
  }

  //Process the Chart Title
  //This section checks if the Title Visibility is true, and if so, loads all the title data into Options
  //Assumption is that if the title is visible, there should also be a string for the title, but if left blank could send a blank string to the chart
  let $chartTitleVisibility = $("input[name=\"title-visible\"]");
  let $chartTitle = $("input[name=\"title-name-field\"]");
  let $chartTitleSize = $("select[name=\"title-size\"] option:selected");
  if ($chartTitleVisibility.prop("checked") === true) {
    options["titleVisible"] = true;
    options["title"] = $chartTitle.val();
    options["titleSize"] = $chartTitleSize.val();
  } else {
    options["titleVisible"] = false;
  }

  //Set Axes Labels and Visibility
  let $chartXVisibility = $("input[name=\"xAxis-visible\"]");
  let $chartYVisibility = $("input[name=\"xAxis-visible\"]");
  let $chartXLabel = $("input[name=\"x-axis-name-field\"]");
  let $chartYLabel = $("input[name=\"y-axis-name-field\"]");
  if ($chartXVisibility.prop("checked") === true) {
    options["xAxisLabelVisible"] = true;
    options["xAxisLabel"] = $chartXLabel.val();
  }
  if ($chartYVisibility.prop("checked") === true) {
    options["yAxisLabelVisible"] = true;
    options["yAxisLabel"] = $chartYLabel.val();
  }

  //Set Data Bar Labels
  let dataBarLabels = [];
  let $dataBarLabels = $(".line-item-label").children("input");
  $dataBarLabels.each(function() {
    dataBarLabels.push($(this).val());
  });
  options["dataLabels"] = dataBarLabels;

  //Set chart colour scheme
  let $chartTheme = $("select[name=\"chart-theme\"]");
  let $chartBackgroundColour = $("input[name=\"background-colour\"]");
  let $chartTitleColour = $("input[name=\"title-colour\"]");
  let $chartTextColour = $("input[name=\"text-colour\"]");
  if ($chartTheme.val() === "light" || $chartTheme.val() === "dark") {
    options["theme"] = $chartTheme.val();
  } else {
    options["backgroundColour"] = $chartBackgroundColour.val();
    options["titleColour"] = $chartTitleColour.val();
    options["textColour"] = $chartTextColour.val();
  }

  //Set data bar and label colour scheme
  options["dataColours"] = $("select[name=\"data-bar-colour-scheme\"]").val();
  options["dataLabelColour"] = $("input[name=\"data-label-colour\"]").val();

  //Set data bar spacing and label position
  options["barSpacing"] = $("select[name=\"data-bar-spacing\"]").val();
  options["dataLabelPosition"] = $("select[name=\"data-bar-label-position\"]").val();

  //draws the chart
  drawBarChart(data, options, $chartContainer);

  styler();
};


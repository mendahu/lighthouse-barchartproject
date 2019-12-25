$(document).ready(function() {
  //Adds the onclick listener to the generate button.
  $("#data-submit").attr("onclick", "gatherData()");
});

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

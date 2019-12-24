$(document).ready(function() {
  //Adds the onclick listener to the generate button.
  $("#data-submit").attr("onclick", "gatherData()");
});

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
};

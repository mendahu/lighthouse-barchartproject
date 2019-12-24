$(document).ready(function() {
  //Adds the onclick listener to the generate button.
  $("#data-submit").attr("onclick", "gatherData()");
});

//Sets a dataset for testing and QA
let testData = [1, [1, 1], 3, [1, 1, 2], 5, [1, 2, 1, 2], 7];
let testOptions = {
  barSpacing: "even",
  valuePosition: "centre",
  titleVisible: true,
  title: "Test Title",
  titleSize: "large",
  xAxisLabelVisible: true,
  xAxisLabel: "Test X Axis Label",
  yAxisLabelVisible: true,
  yAxisLabel: "Test Y Axis Label",
  dataLabels: [1, 2, 3, 4, 5, 6, 7, 8]
};

//A sample dataset for demoing
let sampleDataLaunches = [8, 31, 6, 2, 21, 27];
let sampleOptionsLaunches = {
  barSpacing: "even",
  valueLabelPosition: "top",
  valueLabelColour: "ffffff",
  dataColours: "orange",
  titleVisible: true,
  title: "Orbital Launches by Country, 2019",
  titleSize: "large",
  titleColour: "#000000",
  backgroundColour: "#ffffff",
  xAxisLabelVisible: true,
  xAxisLabel: "Countries",
  dataLabels: ["Europe", "China", "India", "Japan", "Russia", "United States"],
  yAxisLabelVisible: true,
  yAxisLabel: "# of Launches"
};

let sampleData = {
  testing: [testData, testOptions],
  sampleLaunches: [sampleDataLaunches, sampleOptionsLaunches]
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
};

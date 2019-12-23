$(document).ready(function() {
  //Adds the onclick listener to the generate button.
  $("#data-submit").attr("onclick", "drawBarChart(gatheredData, gatheredOptions, $(\"#chart-container\"))");
});

let gatheredData = [[55, 44, 32], 2, 3, [40, 69], 5];
let gatheredOptions = {
  barSpacing: "wide",
  valuePosition: "centre",
  titleVisible: true,
  title: "Test Title",
  xAxisLabelVisible: true,
  yAxisLabelVisible: true
};

/* DEFAULT OPTIONS
barSpacing: "even",
    valueLabelPosition: "top",
    valueLabelColour: "ffffff",
    dataColour1: "#0000ff",
    dataColour2: "#ff0000",
    dataColour3: "#00ff00",
    titleVisible: false,
    title: "Please Set A Title",
    titleSize: "Med",
    titleColour: "#000000",
    backgroundColour: "#ffffff",
    xAxisLabelVisible: false,
    xAxisLabel: "Please Set An X Axis Label",
    yAxisLabelVisible: false,
    yAxisLabel: "Please Set A Y Axis Label"
*/

const gatherData = function() {
  //
};

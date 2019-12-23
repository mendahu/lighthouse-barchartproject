$(document).ready(function() {
  //Adds the onclick listener to the generate button.
  $("#data-submit").attr("onclick", "drawBarChart(gatheredData, gatheredOptions, $(\"#chart-container\"))");
});

let gatheredData = [1, [1, 1], 3, [1, 1, 2], 5, [1, 2, 1, 2], 7];
let gatheredOptions = {
  barSpacing: "wide",
  valuePosition: "centre",
  titleVisible: true,
  title: "Test Title",
  xAxisLabelVisible: true,
  yAxisLabelVisible: true,
  dataLabels: [1, 2, 3, 4, 5, 6, 7, 8]
};

/* DEFAULT OPTIONS
const defaultOptions = {
    barSpacing: "even",
    valueLabelPosition: "top",
    valueLabelColour: "ffffff",
    dataColours: ["#0000ff","#ff0000","#00ff00"]
    titleVisible: false,
    title: "Please Set A Title",
    titleSize: "Med",
    titleColour: "#000000",
    backgroundColour: "#ffffff",
    xAxisLabelVisible: false,
    xAxisLabel: "Please Set An X Axis Label",
    yAxisLabelVisible: false,
    yAxisLabel: "Please Set A Y Axis Label"
  };
*/

const gatherData = function() {
  //
};

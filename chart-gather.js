$(document).ready(function() {
  //Adds the onclick listener to the generate button.
  $("#data-submit").attr("onclick", "drawBarChart(gatheredData, gatheredOptions, $(\"#chart-container\"))");
});

let gatheredData = [1, 2, 3, 4, 5];
let gatheredOptions = {barSpacing: "wide", valuePosition: "centre"};

const gatherData = function() {
  //
};

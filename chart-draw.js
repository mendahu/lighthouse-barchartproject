
//Helper function that processes options for easier use with function that draws chart
const optionsCleaner = function(unProcessedOptions) {

  //First copy the unProcessedOptions to our processing object
  let inProcessingOptions = Object.assign({}, unProcessedOptions);

  //Takes the barSpacing option string and converts it from human readable to an appropriate multiplier that we can use later
  switch (unProcessedOptions.barSpacing) {
  case "narrow":
    inProcessingOptions.barSpacing = 1;
    break;
  case "even":
    inProcessingOptions.barSpacing = 2;
    break;
  case "wide":
    inProcessingOptions.barSpacing = 3;
    break;
  default:
    inProcessingOptions.barSpacing = 2;
  }

  return inProcessingOptions;
};


const drawBarChart = function(data, options, element) {

  //Sets default options
  const defaultOptions = {
    barSpacing: "even",
    valueLabelPosition: "top",
    valueLabelColour: "ffffff",
    dataColour1: "#0000ff",
    dataColour2: "#ff0000",
    dataColour3: "#00ff00"
  };

  //Creates new options object which has defaults but is overwritten by user inputs, processed by a helper function to clean it up.
  //ProcessedOptions will be used going forward
  let processedOptions = optionsCleaner(Object.assign(defaultOptions, options));

  //Determines a base unit of width for charting the bars, based on how many data points were passed
  //Narrow spacing makes the spaces half the width of a bar
  //Even spacing makes the spaces the same as the bar
  //Wide spacing makes the spaces 150% the width of a bar
  let widthUnit = (data.length * 2) + ((data.length + 1) * processedOptions.barSpacing);

  //Go to work creating the graph DOM elements
  //This creates the Chart div which is where the bars live and sets its height to the width of its container
  element.append("<div id=\"chart\"></div>");
  //$("#chart");

  //This creates vertical columns that represent spaces and bars
  for (let i = 1; i <= (data.length); i++) {
    $("#chart").append("<div id=\"space" + i + "\" class=\"chartSpace chartColumn\"></div>");
    $("#chart").append("<div id=\"bar" + i + "\" class=\"chartBar chartColumn\"></div>");
  }
  $("#chart").append("<div id=\"space" + (data.length + 1) + "\" class=\"chartSpace\"></div>");

  //Sets vertical columbs of spaces and bars to flex-grow equally, but set their ratios based on user option
  $("#chart").children().css("flex-grow", "1");
  //$("#chart").children(".chartSpace").css("flex-basis", (barSpacing / widthUnit);
  $("#chart").children(".chartBar").css("flex-basis", (2 / widthUnit));

  //Breaks up vertical columns with bars of data into a data row and a empty space row above it
  $(".chartBar").append("<div class=\"chartBarData\"></div><div class=\"chartBarVerticalSpace\"></div>");


};


$(document).ready(function() {
  //Adds the onclick listener to the generate button.
  $("#data-submit").attr("onclick", "drawBarChart(gatheredData, gatheredOptions, gatheredElement)");
});



//Helper function that processes options for easier use with function that draws chart
const optionsCleaner = function(unProcessedOptions) {

  //First copy the unProcessedOptions to our processing object
  let inProcessingOptions = Object.assign({}, unProcessedOptions);

  //Takes the barSpacing option string and converts it to an appropriate multiplier.
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




  console.log("The data points submitted are: ");
  console.log(data);
  console.log("The Default options are: ");
  console.log(defaultOptions);
  console.log("The Gathered options are: ");
  console.log(gatheredOptions);
  console.log("The Processed options are: ");
  console.log(processedOptions);


  //console.log(element);

  //Determines a base unit of width for charting the bars, based on how many data points were passed
  //Narrow spacing makes the spaces half the width of a bar
  //Even spacing makes the spaces the same as the bar
  //Wide spacing makes the spaces 150% the width of a bar
  //let barWidthUnit = (data.length * 2) + ((data.length + 1) * processedOptions.barSpacing);

  //console.log(barWidthUnit);
};


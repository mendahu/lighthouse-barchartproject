$(document).ready(function() {
  //Adds the onclick listener to the generate button.
  $("#data-submit").attr("onclick", "drawBarChart(gatheredData, gatheredOptions, gatheredElement)");
});



/*
const optionsCleaner = function(options) {

  //console.log(processedOptions);

  //Takes the barSpacing option string and converts it to an appropriate multiplier.
  switch (options.barSpacing) {
  case "narrow":
    processedOptions.barSpacing = 1;
    break;
  case "even":
    processedOptions.barSpacing = 2;
    break;
  case "wide":
    processedOptions.barSpacing = 3;
    break;
  default:
    processedOptions.barSpacing = 2;
  }
};
*/

const drawBarChart = function(data, options, element) {

  //Sets default options
  const defaultOptions = {
    barSpacing: "even"
  };

  console.log("The data points submitted are: ");
  console.log(data);

  console.log("The Default options are: ");
  console.log(defaultOptions);

  console.log("The test options are: ");
  console.log(gatheredOptions);

  //Creates new options object which has defaults but is overwritten by user inputs. processOptions will be used going forward
  let processedOptions = Object.assign(defaultOptions, options);

  console.log("The processed options are: ");
  console.log(processedOptions);

  //Helper function that takes in user submitted options, cleans them up for use in the function
  //optionsCleaner();

  //Determines a base unit of width for charting the bars, based on how many data points were passed
  //Narrow spacing makes the spaces half the width of a bar
  //Even spacing makes the spaces the same as the bar
  //Wide spacing makes the spaces 150% the width of a bar
  //let barWidthUnit = (data.length * 2) + ((data.length + 1) * processedOptions.barSpacing);

  //console.log(barWidthUnit);
};


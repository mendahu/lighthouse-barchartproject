
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

  //Takes the titleSize option string and converts it from human readable to an appropropriate multipler that we can use later
  switch (unProcessedOptions.titleSize) {
  case "small":
    inProcessingOptions.titleSize = "0.8em";
    break;
  case "med":
    inProcessingOptions.titleSize = "1em";
    break;
  case "large":
    inProcessingOptions.titleSize = "1.2em";
    break;
  default:
    inProcessingOptions.titleSize = "1em";
  }

  return inProcessingOptions;
};


const drawBarChart = function(data, options, element) {

  //Clears the existing chart, if there is one
  element.empty();

  //Sets default options
  const defaultOptions = {
    barSpacing: "even",
    valueLabelPosition: "top",
    valueLabelColour: "ffffff",
    dataColour1: "#0000ff",
    dataColour2: "#ff0000",
    dataColour3: "#00ff00",
    titleVisible: false,
    title: "Sample Title",
    titleSize: "Med",
    titleColour: "#000000",
    backgroundColour: "#ffffff",
    xAxisLabelVisible: false,
    yAxisLabelVisible: false
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
  element.append("<figure id=\"chart\"></figure>");

  //set the figure to a variable for convenience
  let $figure = $("#chart");

  //All the chart sizing and labels is contained in this object for easy manipulation by API developper. User will have a responsive design and will not have access to these.
  let chartSizes = {
    figureWidth: "960px",
    axisWidth: "50px",
    barChartWidth: "1fr",
    barChartHeight: "1fr"
  };

  //format the figure for CSS Grid
  let figureCSS = {
    "display": "grid",
    "width": chartSizes.figureWidth,
    "background-color": processedOptions.backgroundColour
  };
  $figure.css(figureCSS);

  //Create grid-template-columns based on options
  (processedOptions.yAxisLabelVisible === true)
    ? $figure.css("grid-template-columns", "[y-axis-label-start]" + chartSizes.axisWidth + "[y-axis-label-end y-axis-start]" + chartSizes.axisWidth + "[y-axis-end bar-chart-left]" + chartSizes.barChartWidth + "[bar-chart-right]")
    : $figure.css("grid-template-columns", "[y-axis-start]" + chartSizes.axisWidth + "[y-axis-end bar-chart-left]" + chartSizes.barChartWidth + "[bar-chart-right]");
  //Create grid-template-rows based on options
  (processedOptions.xAxisLabelVisible === true)
    ? $figure.css("grid-template-rows", "[title-start]" + chartSizes.axisWidth + "[title-end bar-chart-top]" + chartSizes.barChartHeight + "[bar-chart-bottom x-axis-start]" + chartSizes.axisWidth + "[x-axis-end x-axis-label-start]" + chartSizes.axisWidth + "[x-axis-label-end]")
    : $figure.css("grid-template-rows", "[title-start]" + chartSizes.axisWidth + "[title-end bar-chart-top]" + chartSizes.barChartHeight + "[bar-chart-bottom x-axis-start]" + chartSizes.axisWidth + "[x-axis-end]");

  //Place Title and style as determined by options
  if (processedOptions.titleVisible === true) {
    $figure.append("<h2 id=\"chart-title\">" + processedOptions.title + "</h2>");
    let chartTitleCSS = {
      "color": processedOptions.titleColour,
      "font-size": processedOptions.titleSize,
      "grid-column-start": "bar-chart-left",
      "grid-column-end": "bar-chart-right",
      "grid-row-start": "title-start",
      "grid-row-end": "title-end"
    };
    $("#chart-title").css(chartTitleCSS);
  }

};



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


/********************************************************

Core function of the API is drawBarChart, which takes in three parameters and calls helper functions

********************************************************/


const drawBarChart = function(data, options, element) {

  //Clears the existing chart, if there is one
  element.empty();

  //Sets default options to configure the chart
  const defaultOptions = {
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
  };

  //processedOptions is an amalgamation of the user inputs for options and the defaults to give the function its end results
  //processedOptions goes through a cleaner function to change human readable inputs to values for use by the drawBarChart function
  let processedOptions = optionsCleaner(Object.assign(defaultOptions, options));

  //From here we begin creating DOM elements to display the chart

  //This creates the "chart" div which is where the chart lives and sets it to a variable for convenience
  element.append("<figure id=\"chart\"></figure>");
  let $figure = $("#chart");

  //All the chart sizing and labels is contained in this object for easy manipulation by API developper.
  //User will have a responsive design and will not have access to these.
  let chartSizes = {
    figureWidth: "100%",
    axisWidth: "50px",
    barChartWidth: "1fr",
    barChartHeight: "1fr"
  };

  //format the figure for CSS Grid and applies user selected background colour
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

  //Place x Axis Label and style as determined by options
  if (processedOptions.xAxisLabelVisible === true) {
    $figure.append("<span id=\"x-axis-label\">" + processedOptions.xAxisLabel + "</span>");
    let xAxisCSS = {
      "color": processedOptions.titleColour,
      "grid-column-start": "bar-chart-left",
      "grid-column-end": "bar-chart-right",
      "grid-row-start": "x-axis-label-start",
      "grid-row-end": "x-axis-label-end"
    };
    $("#x-axis-label").css(xAxisCSS);
  }

  //Place y Axis Label and style as determined by options
  if (processedOptions.yAxisLabelVisible === true) {
    $figure.append("<span id=\"y-axis-label\">" + processedOptions.yAxisLabel + "</span>");
    let yAxisCSS = {
      "color": processedOptions.titleColour,
      "display": "block",
      "writing-mode": "tb-rl",
      "transform": "rotate(180deg)",
      "grid-column-start": "y-axis-label-start",
      "grid-column-end": "y-axis-label-end",
      "grid-row-start": "bar-chart-top",
      "grid-row-end": "bar-chart-bottom"
    };
    $("#y-axis-label").css(yAxisCSS);
  }

  //Determines a base unit of width for charting the bars, based on how many data points were passed
  //Narrow spacing makes the spaces half the width of a bar
  //Even spacing makes the spaces the same width as the bar
  //Wide spacing makes the spaces 150% the width of a bar
  let widthUnit = (data.length * 2) + ((data.length + 1) * processedOptions.barSpacing);

  //Create Bar Chart using Flexboxes
  $figure.append("<div id=\"bar-chart\"></div>");
  let barChartCSS = {
    "display": "flex",
    "flex-wrap": "nowrap",
    "justify-content": "space-evenly",
    "align-items": "stretch",
    "grid-column-start": "bar-chart-left",
    "grid-column-end": "bar-chart-right",
    "grid-row-start": "bar-chart-top",
    "grid-row-end": "bar-chart-bottom",
    "border-left": "2px solid " + processedOptions.titleColour,
    "border-bottom": "2px solid " + processedOptions.titleColour
  };
  $("#bar-chart").css(barChartCSS);

  //Populate bar chart flexbox with columns for bars of data and space between
  for (let i = 0; i < data.length; i++) {
    $("#bar-chart").append("<div id=\"bar-chart-space-" + (i + 1) + "\" class=\"bar-chart-space\"></div>");
    $("#bar-chart").append("<div id=\"bar-chart-data-" + (i + 1) + "\" class=\"bar-chart-data\"></div>");
  }
  $("#bar-chart").append("<div id=\"bar-chart-space-" + (data.length + 1) + "\" class=\"bar-chart-space\"></div>");

  //Assign size & spacing to bars and spaces based on inputs
  $(".bar-chart-space").css("flex-basis", (processedOptions.barSpacing / widthUnit));
  $(".bar-chart-datae").css("flex-basis", (2 / widthUnit));

  $(".bar-chart-space").css("flex-grow", processedOptions.barSpacing);
  $(".bar-chart-data").css("flex-grow", "2");

  //Convert data into nested arrays of data. Reduces code redundancy since we could be passed multiple datas point per bar
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i] === "number") {
      data[i] = [data[i]];
    }
  }

  //Sort the data to determine highest number. Will first reduce any nested arrays for multiple values
  let sortedData = data;
  const dataReducer = (acc, cv) => acc + cv;
  for (let i = 0; i < sortedData.length; i++) {
    sortedData[i] = sortedData[i].reduce(dataReducer);
  }
  sortedData = sortedData.sort((a, b) => b - a);
  let highestDataPoint = sortedData[0];
  let lowestDataPoint = sortedData[sortedData.length - 1];

};


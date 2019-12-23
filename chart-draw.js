/********************************************************

Helper funtion that converts data to an array of arrays for simpler code when dealing with multiple variables

********************************************************/

const dataProcessor = function(unProcessedData) {

  let returnedData = unProcessedData;
  for (let i = 0; i < unProcessedData.length; i++) {
    if (typeof unProcessedData[i] === "number") {
      returnedData[i] = [unProcessedData[i]];
    }
  }

  return returnedData;

};

/********************************************************

Helper function that processes options for easier use with function that draws chart

********************************************************/

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

Helper function that uses the data provided to determine a dynamic scale for the Y Axis

********************************************************/

const scaleCalculator = function(givenData) {

  //an object to contain scientifici notation data about our data
  let scientificNotation = {
    base: 0,
    exponent: 0,
    highDataPoint: 0,
    yAxisTop: 0,
    tickSize: 0.1,
    tickQuantity: 0
  };

  //an object to store function data to calculate ticks
  let parameters = {
    tickCandidates: [0.1, 0.2, 0.25, 0.5, 1],
    fewestTicksAllowed: 4,
    mostTicksAllowed: 12
  };

  //Sort the data to determine highest number. Will first reduce any nested arrays for multiple values
  let sortedData = [...givenData];
  const dataReducer = (acc, cv) => acc + cv;
  for (let i = 0; i < sortedData.length; i++) {
    sortedData[i] = sortedData[i].reduce(dataReducer);
  }
  sortedData = sortedData.sort((a, b) => b - a);
  let highDataPoint = sortedData[0];

  //We will convert the highest data point into scientific notation for simpler code
  //First determine the exponent by locating the position of the first non-zero digit
  if (highDataPoint <= 0) {
    scientificNotation.exponent = 0;
  } else if (highDataPoint < 1) {
    let decimals = highDataPoint.toString().split(".")[1].split("");
    for (let i = 0; i < decimals.length; i++) {
      if (Number(decimals[i]) !== 0) {
        scientificNotation.exponent = -(i + 1);
        break;
      }
    }
  } else {
    scientificNotation.exponent = (highDataPoint.toString().split(".")[0].length) - 1;
  }

  //Next, determine our scientific high data point by multiplying in the exponent
  scientificNotation.highDataPoint = highDataPoint * Math.pow(10, -scientificNotation.exponent);

  //Then determine our base by isolating the first number of the high data point
  scientificNotation.base = Number(scientificNotation.highDataPoint.toString().split(".")[0]);

  //Calculate the tick characteristics for the yAxis
  //Working up the tick candidates, find the first one that creates an amount of ticks within the threshold set in parameters

  for (let i = 0; i < parameters.tickCandidates.length; i++) {
    scientificNotation.yAxisTop = scientificNotation.base + parameters.tickCandidates[i];
    if (scientificNotation.yAxisTop > scientificNotation.highDataPoint) {
      break;
    }
  }

  //Work through tick candidates to find the best fit for the most ticks within limits
  let tickIndex = 1;
  while ((Math.round(scientificNotation.yAxisTop / scientificNotation.tickSize) > parameters.mostTicksAllowed) || (Math.round((scientificNotation.yAxisTop % scientificNotation.tickSize)) !== 0)) {
    console.log((Math.round(scientificNotation.yAxisTop / scientificNotation.tickSize) >= parameters.mostTicksAllowed));
    console.log((Math.round((scientificNotation.yAxisTop % scientificNotation.tickSize)) !== 0));
    scientificNotation.tickSize = parameters.tickCandidates[tickIndex];
    console.log(scientificNotation.tickSize);
    tickIndex++;
    if (parameters.tickCandidates[tickIndex] === undefined) {
      break;
    }
  }
  scientificNotation.tickQuantity = Math.round((scientificNotation.yAxisTop / scientificNotation.tickSize));

  //Generate an array of ticks to return
  let returnedData = [];
  for (let i = 0; i <= scientificNotation.tickQuantity; i++) {
    returnedData.push(i * scientificNotation.tickSize * Math.pow(10, scientificNotation.exponent));
  }

  console.log(scientificNotation);
  console.log(returnedData);
  return returnedData;
};

/********************************************************

Core function of the API is drawBarChart, which takes in three parameters and calls helper functions

********************************************************/


const drawBarChart = function(data, options, element) {

  //Clears the existing chart, if there is one
  element.empty();

  //Convert data into nested arrays of data. Reduces code redundancy since we could be passed multiple datas point per bar
  const processedData = dataProcessor(data);

  //This helper function determines a scale for the vertical Y axis based on the data.
  //Bar charts always start at 0 but the maximum height and ticks are dynamic
  //The function outputs an array with the ticks we will use to build the chart
  let yAxisTicks = scaleCalculator(processedData);

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
  let widthUnit = (processedData.length * 2) + ((processedData.length + 1) * processedOptions.barSpacing);

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

  //Create X-Axis data labels using Flexbox
  $figure.append("<div id=\"x-axis\"></div>");
  let xAxisCSS = {
    "display": "flex",
    "flex-wrap": "nowrap",
    "justify-content": "space-evenly",
    "align-items": "stretch",
    "grid-column-start": "bar-chart-left",
    "grid-column-end": "bar-chart-right",
    "grid-row-start": "x-axis-start",
    "grid-row-end": "x-axis-end"
  };
  $("#x-axis").css(xAxisCSS);

  //Populate bar chart flexbox with columns for bars of data and space between. Also adds x axis value containers and values
  for (let i = 0; i < processedData.length; i++) {
    $("#bar-chart").append("<div id=\"bar-chart-space-" + (i + 1) + "\" class=\"bar-chart-space space\"></div>");
    $("#x-axis").append("<div id=\"x-axis-space-" + (i + 1) + "\" class=\"x-axis-space space\"></div>");
    $("#bar-chart").append("<div id=\"bar-chart-data-" + (i + 1) + "\" class=\"bar-chart-data data\"></div>");
    $("#x-axis").append("<div id=\"x-axis-data-" + (i + 1) + "\" class=\"x-axis-data data\"></div>");
    $("#x-axis-data-" + (i + 1)).append("<span id=\"x-axis-data-label-" + (i + 1) + "\" class=\"x-axis-data-label\">" + processedOptions.dataLabels[i] + "</span>");
  }
  $("#bar-chart").append("<div id=\"bar-chart-space-" + (processedData.length + 1) + "\" class=\"bar-chart-space space\"></div>");
  $("#x-axis").append("<div id=\"x-axis-space-" + (processedData.length + 1) + "\" class=\"x-axis-space space\"></div>");
  $(".x-axis-data-label").css("color", processedOptions.titleColour);

  //Assign size & spacing to bars and spaces based on inputs
  $(".space").css("flex-basis", (processedOptions.barSpacing / widthUnit));
  $(".data").css("flex-basis", (2 / widthUnit));
  $(".space").css("flex-grow", processedOptions.barSpacing);
  $(".data").css("flex-grow", "2");

  //Create flexboxes inside CSS Grid bar chart to accomodate data
  let barChartDataCSS = {
    "display": "flex",
    "flex-direction": "column",
    "flex-wrap": "nowrap",
    "align-items": "stretch"
  };
  $(".bar-chart-data").css(barChartDataCSS);

  console.log(processedData);
  console.log(yAxisTicks);

  //add data to flexboxes and size & style accordingly
  for (let i = 0; i < processedData.length; i++) {
    let barChartDataBarsCSS = {
      "flex-grow": (processedData[i][0] / yAxisTicks[yAxisTicks.length - 1]),
      "flex-basis": ((processedData[i][0] / yAxisTicks[yAxisTicks.length - 1]) * 100) + "%",
      "background-color": processedOptions.dataColour1
    };
    let barChartSpaceBarsCSS = {
      "flex-grow": (1 - (processedData[i][0] / yAxisTicks[yAxisTicks.length - 1]))
    };
    $("#bar-chart-data-" + (i + 1)).append("<div id=\"bar-chart-data-bar-" + (i + 1) + "-vertical-space\" class=\"bar-chart-data-bar-vertical-space\">");
    $("#bar-chart-data-bar-" + (i + 1) + "-vertical-space").css(barChartSpaceBarsCSS);
    $("#bar-chart-data-" + (i + 1)).append("<div id=\"bar-chart-data-bar-" + (i + 1) + "\" class=\"bar-chart-data-bar\">");
    $("#bar-chart-data-bar-" + (i + 1)).css(barChartDataBarsCSS);
  }


};


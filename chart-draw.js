
//Sets six default colour schemes to select from
const colourSchemes = {
  blue: ["#071DBF", "#25283D", "#39438E", "#98A2EA", "#CED2EF"],
  red: ["#A31621", "#F7BEC3", "#5E040C", "#8C1E27", "#DB2332"],
  green: ["#00633D", "#356050", "#6A8C7F", "#D8FFF0", "#30E8A1"],
  yellow: ["#E8E537", "#74773B", "#C6C435", "#5B5B40", "#F7F7EA"],
  purple: ["#482372", "#663F93", "#9166C1", "#AA84D6", "#CDB3E2"],
  orange: ["#D36135", "#AF7D69", "#EDC7B8", "#E58B67", "#0A0401"]
};

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
    inProcessingOptions.titleSize = "50%";
    break;
  case "med":
    inProcessingOptions.titleSize = "100%";
    break;
  case "large":
    inProcessingOptions.titleSize = "200%";
    break;
  default:
    inProcessingOptions.titleSize = "100%";
  }

  //Takes the colour scheme option string and sets it to appropriate colour object property
  switch (unProcessedOptions.dataColours) {
  case "red":
    inProcessingOptions.dataColours = colourSchemes.red;
    break;
  case "blue":
    inProcessingOptions.dataColours = colourSchemes.blue;
    break;
  case "green":
    inProcessingOptions.dataColours = colourSchemes.green;
    break;
  case "yellow":
    inProcessingOptions.dataColours = colourSchemes.yellow;
    break;
  case "purple":
    inProcessingOptions.dataColours = colourSchemes.purple;
    break;
  case "orange":
    inProcessingOptions.dataColours = colourSchemes.orange;
    break;
  default:
    inProcessingOptions.dataColours = unProcessedOptions.dataColours;
  }

  //Takes the dataLabelPosition string and turns it into Flexbox Justify Values
  switch (unProcessedOptions.dataLabelPosition) {
  case "top":
    inProcessingOptions.dataLabelPosition = "flex-start";
    break;
  case "middle":
    inProcessingOptions.dataLabelPosition = "center";
    break;
  case "bottom":
    inProcessingOptions.dataLabelPosition = "flex-end";
    break;
  case "off":
    inProcessingOptions.dataLabelVisibility = "hidden";
    break;
  default:
    inProcessingOptions.dataLabelPosition = "flex-start";
  }
  //Takes the theme and sets the background and text colours
  switch (unProcessedOptions.theme) {
  case "light":
    inProcessingOptions.backgroundColour = "#FFFFFF";
    inProcessingOptions.textColour = "#000000";
    inProcessingOptions.titleColour = "#000000";
    break;
  case "dark":
    inProcessingOptions.backgroundColour = "#000000";
    inProcessingOptions.textColour = "#FFFFFF";
    inProcessingOptions.titleColour = "#FFFFFF";
    break;
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
    console.log("The top y Axis Mark selected after " + [i + 1] + " check is: " + scientificNotation.yAxisTop);
    if (scientificNotation.yAxisTop > scientificNotation.highDataPoint) {
      break;
    }
  }

  console.log("\nThe minimum top Y Axis value selected after a check against highest value is: " + scientificNotation.yAxisTop + "\n ");


  //Work through tick candidates to find the best fit for the most ticks within limits
  let tickIndex = 1;
  console.log("The starting y Axis tick mark is: " + scientificNotation.tickSize);
  while ((Math.round(scientificNotation.yAxisTop / scientificNotation.tickSize) > parameters.mostTicksAllowed) || (Math.round(scientificNotation.yAxisTop % scientificNotation.tickSize) !== 0)) {
    console.log("Check " + tickIndex + ". Y Axis Top Value / tick Size is more than the max ticks allowed: " + (Math.round(scientificNotation.yAxisTop / scientificNotation.tickSize) > parameters.mostTicksAllowed) + "\n " + Math.round(scientificNotation.yAxisTop / scientificNotation.tickSize) + " and " + parameters.mostTicksAllowed);
    console.log("Check " + tickIndex + ". Y Axis Top Modulo tick Size is not 0: " + (Math.round((scientificNotation.yAxisTop % scientificNotation.tickSize)) !== 0) + "\n " + scientificNotation.yAxisTop + " and " + scientificNotation.tickSize);
    scientificNotation.tickSize = parameters.tickCandidates[tickIndex];
    console.log("The y Axis tick Mark selected after " + [tickIndex] + " check is: " + scientificNotation.tickSize);
    tickIndex++;
    if (scientificNotation.base + scientificNotation.tickSize > scientificNotation.yAxisTop) {
      scientificNotation.yAxisTop = scientificNotation.base + scientificNotation.tickSize;
    }
    if (parameters.tickCandidates[tickIndex] === undefined) {
      break;
    }
  }
  scientificNotation.tickQuantity = Math.round((scientificNotation.yAxisTop / scientificNotation.tickSize));

  console.log("The top y Axis Mark selected after second loop is: " + scientificNotation.yAxisTop);

  //Generate an object with array of ticks and significant digits to return
  let returnedData = {
    sigDigits: (-scientificNotation.exponent) + 1,
    values: []
  };
  for (let i = 0; i <= scientificNotation.tickQuantity; i++) {
    returnedData.values.push(i * scientificNotation.tickSize * Math.pow(10, scientificNotation.exponent));
  }

  console.log("Y Axis Calculator Output is:");
  console.log(scientificNotation);

  return returnedData;
};

/********************************************************

Core function of the API is drawBarChart, which takes in three parameters and calls helper functions

********************************************************/


const drawBarChart = function(data, options, element) {

  //Clears the chart container of any elements before drawing
  element.empty();

  //Convert data into nested arrays of data. Reduces code redundancy since we could be passed multiple datas point per bar
  const processedData = dataProcessor(data);

  //This helper function determines a scale for the vertical Y axis based on the data.
  //Bar charts always start at 0 but the maximum height and ticks are dynamic
  //The function outputs an array with the tick marks we will use to build the chart
  let yAxisTicks = scaleCalculator(processedData);

  //Sets default customization options to configure the chart
  //These will be overwritten by any user inputs passed through the options parameter
  const defaultOptions = {

    //BASE COLOURS
    backgroundColour: "#ffffff",
    textColour: "#000000",
    //These colours will be overwritten based on any dark/light theme input, if passed through

    //TITLE
    titleVisible: true,
    title: "Please Set A Title",
    titleColour: "#000000",
    //This colour will be overwritten based on any dark/light theme input, if passed through
    titleSize: "med",

    //AXES
    xAxisLabelVisible: true,
    xAxisLabel: "Please Set An X Axis Label",
    yAxisLabelVisible: true,
    yAxisLabel: "Please Set A Y Axis Label",

    //DATA BARS AND LABELS
    barSpacing: "even",
    //There are six default colour schemes built around the primary and secondary colours (red, blue, green, yellow, purple, orange)
    dataColours: colourSchemes.blue,
    dataLabelPosition: "top",
    dataLabelVisibility: "visible",
    dataLabelColour: "#ffffff",
    //dataLabels is generated dynamically based on how many data points come through, see below
    dataLabels: []
  };

  //Take data from user and generate fake data labels as defaults
  //This may be overwritten by the optionsCleaner() function with actual user options
  for (let i = 0; i < processedData.length; i++) {
    defaultOptions.dataLabels.push("Value " + (i + 1));
  }

  //processedOptions is an amalgamation of the user inputs for options and the defaults to give the function the final options to use
  //processedOptions sends the options parameter through a cleaner function to change human readable inputs to values for use by the drawBarChart function
  let processedOptions = optionsCleaner(Object.assign(defaultOptions, options));




  //From here we begin creating DOM elements to display the chart




  //This creates the "chart" div which is where the chart lives and sets it to a variable for convenience
  element.append("<figure id=\"chart\"></figure>");
  let $figure = $("#chart");

  //Sets sizing for chart element
  //User will have a responsive design and will not have access to these.
  let chartSizes = {
    figureHeight: $figure.width(),
    figureWidth: "100%",
    axisWidth: "auto",
    barChartWidth: "1fr",
    barChartHeight: "1fr"
  };

  //format the figure for CSS Grid and applies user selected background colour
  let figureCSS = {
    "display": "grid",
    "width": chartSizes.figureWidth,
    "max-width": "100%",
    "height": chartSizes.figureHeight,
    "max-height": "60vh",
    "background-color": processedOptions.backgroundColour
  };
  $figure.css(figureCSS);

  //Create grid-template-columns based on options. Visibility of title, x-axis label and y-axis label will alter the shape of the Grid
  (processedOptions.yAxisLabelVisible === true)
  ? $figure.css("grid-template-columns", "[y-axis-label-start]" + chartSizes.axisWidth + "[y-axis-label-end y-axis-start]" + chartSizes.axisWidth + "[y-axis-end bar-chart-left]" + chartSizes.barChartWidth + "[bar-chart-right]")
  : $figure.css("grid-template-columns", "[y-axis-start]" + chartSizes.axisWidth + "[y-axis-end bar-chart-left]" + chartSizes.barChartWidth + "[bar-chart-right]");
  //Create grid-template-rows based on options
  (processedOptions.xAxisLabelVisible === true)
  ? $figure.css("grid-template-rows", "[title-start]" + chartSizes.axisWidth + "[title-end bar-chart-top]" + chartSizes.barChartHeight + "[bar-chart-bottom x-axis-start]" + chartSizes.axisWidth + "[x-axis-end x-axis-label-start]" + chartSizes.axisWidth + "[x-axis-label-end]")
  : $figure.css("grid-template-rows", "[title-start]" + chartSizes.axisWidth + "[title-end bar-chart-top]" + chartSizes.barChartHeight + "[bar-chart-bottom x-axis-start]" + chartSizes.axisWidth + "[x-axis-end]");

  //Place Title if selected and style as determined by options
  if (processedOptions.titleVisible === true) {
    $figure.append("<h2 id=\"chart-title\">" + processedOptions.title + "</h2>");
    let chartTitleCSS = {
      "color": processedOptions.titleColour,
      "font-size": processedOptions.titleSize,
      "grid-column-start": "bar-chart-left",
      "grid-column-end": "bar-chart-right",
      "grid-row-start": "title-start",
      "grid-row-end": "title-end",
      "margin": "auto"
    };
    $("#chart-title").css(chartTitleCSS);
  }

  //Place x Axis Label if selected and style as determined by options
  if (processedOptions.xAxisLabelVisible === true) {
    $figure.append("<span id=\"x-axis-label\" class=\"chart-axes-label\">" + processedOptions.xAxisLabel + "</span>");
    let xAxisCSS = {
      "color": processedOptions.textColour,
      "grid-column-start": "bar-chart-left",
      "grid-column-end": "bar-chart-right",
      "grid-row-start": "x-axis-label-start",
      "grid-row-end": "x-axis-label-end",
      "margin": "auto"
    };
    $("#x-axis-label").css(xAxisCSS);
  }

  //Place y Axis Label if selected and style as determined by options
  if (processedOptions.yAxisLabelVisible === true) {
    $figure.append("<span id=\"y-axis-label\" class=\"chart-axes-label\">" + processedOptions.yAxisLabel + "</span>");
    let yAxisCSS = {
      "color": processedOptions.textColour,
      "display": "block",
      "writing-mode": "tb-rl",
      "transform": "rotate(180deg)",
      "grid-column-start": "y-axis-label-start",
      "grid-column-end": "y-axis-label-end",
      "grid-row-start": "bar-chart-top",
      "grid-row-end": "bar-chart-bottom",
      "margin": "auto"
    };
    $("#y-axis-label").css(yAxisCSS);
  }

  //Determines a unitless width of the chartfor charting the bars, based on how many data points were passed
  //Narrow spacing makes the spaces half the width of a bar
  //Even spacing makes the spaces the same width as the bar
  //Wide spacing makes the spaces 150% the width of a bar
  let widthUnit = (processedData.length * 2) + ((processedData.length + 1) * processedOptions.barSpacing);

  //Create Bar Chart using Flexbox inside the Grid
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
    "border-left": "2px solid " + processedOptions.textColour,
    "border-bottom": "2px solid " + processedOptions.textColour
  };
  $("#bar-chart").css(barChartCSS);

  //Create X-Axis data labels using Flexbox inside the Grid
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

  //Loop through data and populate bar chart flexbox and xAxis flexbox with columns for bars of data and space between.
  //This sets up the vertical columns where the data will eventually live
  for (let i = 0; i < processedData.length; i++) {
    $("#bar-chart").append("<div id=\"bar-chart-space-" + (i + 1) + "\" class=\"bar-chart-space space\"></div>");
    $("#x-axis").append("<div id=\"x-axis-space-" + (i + 1) + "\" class=\"x-axis-space space\"></div>");
    $("#bar-chart").append("<div id=\"bar-chart-data-" + (i + 1) + "\" class=\"bar-chart-data data\"></div>");
    $("#x-axis").append("<div id=\"x-axis-data-" + (i + 1) + "\" class=\"x-axis-data data\"></div>");
    //The next line adds labels for the x-axis
    $("#x-axis-data-" + (i + 1)).append("<span id=\"x-axis-data-label-" + (i + 1) + "\" class=\"x-axis-data-label\">" + processedOptions.dataLabels[i] + "</span>");
  }
  //These last two lines outside the loop add the trailing space after the last data bar
  $("#bar-chart").append("<div id=\"bar-chart-space-" + (processedData.length + 1) + "\" class=\"bar-chart-space space\"></div>");
  $("#x-axis").append("<div id=\"x-axis-space-" + (processedData.length + 1) + "\" class=\"x-axis-space space\"></div>");

  //Styles X axis labels
  let xAxisDataCSS = {
    "display": "flex",
    "flex-wrap": "nowrap",
    "justify-content": "center"
  };
  $(".x-axis-data").css(xAxisDataCSS);
  let xAxisDataLabelCSS = {
    "color": processedOptions.textColour,
    "text-align": "center"
  };
  $(".x-axis-data-label").css(xAxisDataLabelCSS);

  //Assign size & spacing to bars and spaces based on inputs
  $(".space").css("flex-basis", (processedOptions.barSpacing / widthUnit));
  $(".data").css("flex-basis", (2 / widthUnit));
  $(".space").css("flex-grow", processedOptions.barSpacing);
  $(".data").css("flex-grow", "2");

  //Create flexboxes inside CSS Grid bar chart to accomodate data
  let barChartDataCSS = {
    "display": "flex",
    "flex-direction": "column-reverse",
    "flex-wrap": "nowrap",
    "align-items": "stretch"
  };
  $(".bar-chart-data").css(barChartDataCSS);

  //add data to flexboxes and size & style accordingly
  //This nested loop accomodates two layers of data for multiple value input per bar
  //Each loop also adds a data label to the bar
  for (let i = 0; i < processedData.length; i++) {
    for (let j = 0; j < processedData[i].length; j++) {
      let barChartDataBarsCSS = {
        "flex-basis": ((processedData[i][j] / yAxisTicks.values[yAxisTicks.values.length - 1]) * 100) + "%",
        "background-color": processedOptions.dataColours[j],
        "display": "flex",
        "flex-wrap": "nowrap",
        "flex-direction": "column",
        "justify-content": processedOptions.dataLabelPosition
      };
      $("#bar-chart-data-" + (i + 1)).append("<div id=\"bar-chart-data-bar-" + (i + 1) + "-" + (j + 1) + "\" class=\"bar-chart-data-bar\">");
      $("#bar-chart-data-bar-" + (i + 1) + "-" + (j + 1)).append("<span id=\"bar-chart-data-bar-" + (i + 1) + "-" + (j + 1) + "-data-label\" class=\"bar-chart-data-bar-data-label\">" + processedData[i][j] + "</span>");
      $("#bar-chart-data-bar-" + (i + 1) + "-" + (j + 1)).css(barChartDataBarsCSS);
    }
    $("#bar-chart-data-" + (i + 1)).append("<div id=\"bar-chart-data-bar-" + (i + 1) + "-vertical-space\" class=\"bar-chart-data-bar-vertical-space\">");
  }

  //Style the data labels based on the user options
  let barChartDataBarDataLabelCSS = {
    "text-align": "center",
    "color": processedOptions.dataLabelColour,
    "visibility": processedOptions.dataLabelVisibility,
    "padding-top": "5px",
    "padding-bottom": "5px"
  };
  $(".bar-chart-data-bar-data-label").css(barChartDataBarDataLabelCSS);

  //Create the Y-Axis as a nested Flexbox
  $figure.append("<div id=\"y-axis\"></div>");
  let yAxisCSS = {
    "display": "flex",
    "flex-wrap": "nowrap",
    "flex-direction": "column",
    "justify-content": "space-evenly",
    "align-items": "stretch",
    "grid-column-start": "y-axis-start",
    "grid-column-end": "y-axis-end",
    "grid-row-start": "bar-chart-top",
    "grid-row-end": "bar-chart-bottom"
  };
  $("#y-axis").css(yAxisCSS);

  //Populate Y-Axis with items for each yAxis Tick and add labels
  for (let i = 1; i < yAxisTicks.values.length; i++) {
    $("#y-axis").append("<div id=\"y-axis-tick-" + i + "\" class=\"y-axis-tick\">");
    $("#y-axis-tick-" + i).append("<span class=\"y-axis-tick-label\">" + yAxisTicks.values[yAxisTicks.values.length - i].toFixed(yAxisTicks.sigDigits) + "</span>");
  }
  //Style yAxis ticks
  let yAxisTickCSS = {
    "border-top": "1px solid" + processedOptions.textColour,
    "flex-basis": (1 / (yAxisTicks.values.length - 1)) + "%",
    "flex-grow": 1
  };
  $(".y-axis-tick").css(yAxisTickCSS);

  //Style yAxis Tick LAbel CSS
  let yAxisTickLabelCSS = {
    "color": processedOptions.textColour,
    "float": "right",
    "padding-right": "5px"
  };
  $(".y-axis-tick-label").css(yAxisTickLabelCSS);

};


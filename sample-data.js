//Sets a dataset for testing and QA
let testData = [1, [1, 1], 3, [1, 1, 2], 5, [1, 2, 1, 2], 7];
let testOptions = {
  barSpacing: "even",
  dataColours: colourSchemes.blue,
  dataLabelPosition: "top",
  dataLabelVisibility: "visible",

  titleVisible: true,
  title: "Test Title",
  titleSize: "large",

  xAxisLabelVisible: true,
  xAxisLabel: "Test X Axis Label",
  yAxisLabelVisible: true,
  yAxisLabel: "Test Y Axis Label"
};

//A sample dataset for demoing
let sampleDataLaunches = [8, 31, 6, 2, 21, 27];
let sampleOptionsLaunches = {
  theme: "dark",
  barSpacing: "even",
  dataColours: "orange",
  titleVisible: true,
  title: "Orbital Launches by Country, 2019",
  titleSize: "large",
  titleColour: "#000000",
  backgroundColour: "#ffffff",
  xAxisLabelVisible: true,
  xAxisLabel: "Countries",
  dataLabels: ["Europe", "China", "India", "Japan", "Russia", "United States"],
  yAxisLabelVisible: true,
  yAxisLabel: "# of Launches",
  dataLabelPosition: "top"
};

let sampleData = {
  testing: [testData, testOptions],
  sampleLaunches: [sampleDataLaunches, sampleOptionsLaunches]
};

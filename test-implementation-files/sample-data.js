//A sample dataset for demoing
let sampleMarsMissions = [[3, 2], [2, 0], [1, 0]];
let sampleOptionsMars = {
  backgroundColour: "rgb(94, 94, 94)",
  textColour: "#FFFFFF",
  titleColour: "#FFFFFF",
  barSpacing: "narrow",
  dataColours: "orange",
  titleVisible: true,
  title: "Active Mars Missions by Country, 2019",
  titleSize: "med",
  xAxisLabelVisible: true,
  xAxisLabel: "Countries",
  dataLabels: ["United States", "Europe", "India"],
  yAxisLabelVisible: true,
  yAxisLabel: "# of Active Missions (Orbit/Surface)",
  dataLabelPosition: "middle"
};

//A sample dataset for demoing
let sampleDataLaunches = [8, 31, 6, 2, 21, 27];
let sampleOptionsLaunches = {
  backgroundColour: "rgb(41, 41, 41)",
  textColour: "#FFFFFF",
  titleColour: "#FFFFFF",
  barSpacing: "even",
  dataColours: "orange",
  titleVisible: true,
  title: "Orbital Launches by Country, 2019",
  titleSize: "large",
  xAxisLabelVisible: true,
  xAxisLabel: "Countries",
  dataLabels: ["Europe", "China", "India", "Japan", "Russia", "United States"],
  yAxisLabelVisible: true,
  yAxisLabel: "# of Launches",
  dataLabelPosition: "top"
};

//This object holds a refernce to all the samplesets
let sampleData = {
  sampleLaunches: [sampleDataLaunches, sampleOptionsLaunches],
  marsMissions: [sampleMarsMissions, sampleOptionsMars]
};

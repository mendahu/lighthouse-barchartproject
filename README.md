# lighthouse-barchartproject
Final Project for Lighthouse Labs Web Development Bootcamp

## What is this?
Chart-draw.js is a single javascript file that you can load with a single function accessible to you: __drawBarChart()__. It can dynamically generate a Bar Chart on your webpage.

__drawBarChart__ takes in three parameters:

1. __data__ - The data you want to chart
2. __options__ - The options you want to customize the chart with
3. __element__ - The target element in your HTML file where you want the function to draw the chart.

Read the documentation below for how to use it!

## Documentation

Below is documentation on the __drawBarChart()__ function and how to use it. It is organized by the three parameters you can pass in to it, and a section on styling.

### Data

__drawBarChart()__ accepts two forms of data:

1. An array of Numbers
2. An array of arrays of Numbers

For simple data sets with one value per bar, pass it an array of Numbers. For example, to chart the heights of three buildings in metres, send the __heights__ variable as the first parameter:

```javascript
heights = [828, 632, 601];
```

For more complicated data sets with more than one value per bar, pass it an array of Numbers. For example, to chart the amount of drinks in my fridge based on type (beer or pop) and brand (Granville Island, Bridge Brewing as well as Coke, Dr. Pepper), send the __drinks__ variable as the first parameter:

```javascript
drinks = [[6, 2], [8, 4]];
```
#### Other notes about data

* There is no code limit to amount of variables you can pass, though practically you may not be able to chart them on in a visible way on a screen. 
* You can only nest one layer of Arrays (ie. an Array of Arrays of Arrays will cause unintended behaviour).
* Data may have decimals
* At least one datum must be non-zero
* These are all acceptable data values: `452342342, 5243.093, 3.1, 9, 0, 0.5553, 0.0000003`
* Data will be charted in the order it appears in the array

### Options

__drawBarChart()__ accepts a number of options to customize your bar chart. All of them are optional, though many would not make sense to leave unaltered. If you choose to not pass any options, please pass an empty javascript object through, like __noPptions__:

```javascript
noOptions = {};
```

A sample options for a graph about dog breeds and lifespans might look like __dogChartOptions__:

```javascript
dogChartOptions = {
  title: "Dog Lifespans by Breed",
  xAxisLabel: "Dog Breeds",
  yAxisLabel: "Average Lifespan (Years)",
  dataLabelPosition: "top"
}
```

All the options are listed below with available choices and default options.

#### Colours
* `"theme"`
  * `"dark"`: sets background to #000000 (black), text and title colour to #FFFFFF (white)
  * `"light"`: __(default)__ sets background to #FFFFFF (white), text and title colour to #000000 (black)
  * Setting this option will also overwrite the individual colours of background, text and title (see below)

* `"backgroundColour:"` set this as any CSS property value in quotes (ie. `"black"`, `"#000000"`, `"rgb(0, 0, 0)"`, or `"hsl(0, 0, 0)"`)
  * This option will be overwritten if you selected a theme above
* `"textColour:"` set this as any CSS property value in quotes (ie. `"black"`, `"#000000"`, `"rgb(0, 0, 0)"`, or `"hsl(0, 0, 0)"`)
  * This option will be overwritten if you selected a theme above
* `"titleColour:"` set this as any CSS property value in quotes (ie. `"black"`, `"#000000"`, `"rgb(0, 0, 0)"`, or `"hsl(0, 0, 0)"`)
  * This option will be overwritten if you selected a theme above

### Element

### Styling

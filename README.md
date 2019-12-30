# lighthouse-barchartproject
Final Project for Lighthouse Labs Web Development Bootcamp

---

## What is this?
__chart-draw.js__ is a single javascript file that you can load with a single function accessible to you: __drawBarChart()__. It can dynamically generate a Bar Chart on your webpage.

__drawBarChart__ takes in three parameters:

1. __data__ - The data you want to chart
2. __options__ - The options you want to customize the chart with
3. __element__ - The target element in your HTML file where you want the function to draw the chart.

Read the documentation below for how to use it!

---

## Documentation

Below is documentation on the __drawBarChart()__ function and how to use it. It is organized by the three parameters you can pass in to it, and a section on styling.

---

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

* There is no code limit to amount of variables you can pass, though practically you may not be able to chart them in a visible way on a screen. 
* You can only nest one layer of Arrays (ie. an Array of Arrays of Arrays will cause unintended behaviour).
* Data may have decimals
* At least one datum must be non-zero
* Negative numbers are not supported
* These are all acceptable data values: `452342342, 5243.093, 3.1, 9, 0, 0.5553, 0.0000003`
* Data will be charted in the order it appears in the array

---

### Options

__drawBarChart()__ accepts a number of options to customize your bar chart in the form of a javascript object. All of them are optional, though many would not make sense to leave unaltered. If you choose to not pass any options, please pass an empty javascript object through, like __noOptions__:

```javascript
noOptions = {};
```

A sample options object for a graph about dog breeds and lifespans might look like __dogChartOptions__:

```javascript
dogChartOptions = {
  title: "Dog Lifespans by Breed",
  xAxisLabel: "Dog Breeds",
  yAxisLabel: "Average Lifespan (Years)",
  dataLabelPosition: "top"
};
```

All the options are listed below with available choices and default options.

#### Colours
* `"theme"`
  * `"dark"`: sets background to #000000 (black), text and title colour to #FFFFFF (white)
  * `"light"`: sets background to #FFFFFF (white), text and title colour to #000000 (black)
  * Setting this option will also overwrite the individual colours of background, text and title (see below)

* `"backgroundColour:"` set this as any CSS property value in quotes (ie. `"black"`, `"#000000"`, `"rgb(0, 0, 0)"`, or `"hsl(0, 0, 0)"`)
  * Sets colour for the background of the entire chart
  * __(default)__ #FFFFFF
  * This option will be overwritten if you selected a theme above
* `"textColour:"` set this as any CSS property value in quotes (ie. `"black"`, `"#000000"`, `"rgb(0, 0, 0)"`, or `"hsl(0, 0, 0)"`)
  * Sets colour for all the x and y Axis labels
  * __(default)__ #000000
  * This option will be overwritten if you selected a theme above
* `"titleColour:"` set this as any CSS property value in quotes (ie. `"black"`, `"#000000"`, `"rgb(0, 0, 0)"`, or `"hsl(0, 0, 0)"`)
  * Sets colour for the title of the chart
  * __(default)__ #000000
  * This option will be overwritten if you selected a theme above
* `"dataLabelColour:"` set this as any CSS property value in quotes (ie. `"black"`, `"#000000"`, `"rgb(0, 0, 0)"`, or `"hsl(0, 0, 0)"`)
  * Sets colour for the data labels that show up on the bars themselves
  * __(default)__ #FFFFFF
  * Recommend to leave this as #FFFFFF unless also altering the colours of the bars to something with the right contrast

#### Title of the Chart

* `"titleVisible:"` set this to `true` or `false` to show the title at the top of the chart
  * __(default)__ `true`
* `"title:"` set the title at the top of the chart with any String. Will be passed as text inside an h2 element.
  * __(default)__ `"Please Set A Title"`
* `"titleSize:"` Modify the size of the title's text. Please see note about styling below as well to find out what "normal size" means.
  * `"small"`: 150% of parent element
  * `"med"`: __(default)__ 250% of parent element
  * `"large"`: 350% of parent element
* `"titleColour:"` set this as any CSS property value in quotes (ie. `"black"`, `"#000000"`, `"rgb(0, 0, 0)"`, or `"hsl(0, 0, 0)"`)
  * Sets colour for the title of the chart
  * __(default)__ #000000
  * This option will be overwritten if you selected a theme above

#### Axes (X and Y)

* `"xAxisLabelVisible:"` set this to `true` or `false` to show whether the label for the x-Axis is visible
  * __(default)__ `true`
* `"yAxisLabelVisible:"` set this to `true` or `false` to show whether the label for the y-Axis is visible
  * __(default)__ `true`
* `"xAxisLabel:"` set the x-Axis label at the bottom of the chart with any String. Will be passed as text inside a span element.
  * __(default)__ `"Please Set An X Axis Label"`
* `"yAxisLabel:"` set the y-Axis label at the left of the chart with any String. Will be passed as text inside a span element.
  * __(default)__ `"Please Set A Y Axis Label"`

#### Data Bars and Data Labels
* `"barSpacing:"` sets the space between data bars relative to the width of the data bar
  * `"narrow"` 50% the width of a bar
  * `"even"` __(default)__ 100% the width of a bar
  * `"wide"` 150% the width of a bar
* `"dataColours:"` sets the colour scheme of the data bars themselves. The function comes with six built-in colour schemes. Alternatively, custom values can be passed here.
  * `"blue"` __(default)__
  * `"red"`
  * `"green"`
  * `"purple"`
  * `"orange"`
  * `"yellow"`
  * To pass custom colours, pass an array of colours using any CSS property value in quotes (ie. `"black"`, `"#000000"`, `"rgb(0, 0, 0)"`, or `"hsl(0, 0, 0)"`)
    * An example array may look like this: `"[#000000, #CDCDCD, green, #hsl(330, 50, 50)]"`
    * The data bars use the first colour in the array and will proceed down the colours if there are more than one data value per bar (see more complicated data inputs further up this page)
* `"dataLabelPosition:"` sets the placement of the label inside the data bar itself
  * `"top:"` __(default)__ places the label at the top of the data bar
  * `"middle:"` places the label vertically aligned in the centre of the data bar
  * `"bottom:"` places the label at the bottom of the data bar
  * `"off:"` hides the data labels
* `"dataLabelColour:"` set this as any CSS property value in quotes (ie. `"black"`, `"#000000"`, `"rgb(0, 0, 0)"`, or `"hsl(0, 0, 0)"`)
  * Sets colour for the data labels that show up on the bars themselves
  * __(default)__ #FFFFFF
  * Recommend to leave this as #FFFFFF unless also altering the colours of the bars to something with the right contrast

---

### Element

__drawBarChart()__ accepts a mandatory third parameter which is the target HTML element that the function will draw the bar chart inside. 

It is recommended you use jQuery or javascript to select the element, store it as a variable, and pass it through, like this:

```javascript
let chartHolder = document.getElementByID("whereTheChartWillLive");

drawBarChart(data, options, chartHolder);
```

OR

```javascript
let chartHolder = $("#whereTheChartWillLive");

drawBarChart(data, options, chartHolder);
```

---

### Styling

The __drawBarChart()__ function largely draws upon the source site for styling, with some exceptions already noted in the options above.

#### Chart Size

The chart is responsively designed and will fill to accomodate its container element, with `width: auto` set as its CSS width property.

It chooses its `height` by matching the `width` 1:1. 

No padding or margins are set.

#### Typeface

__drawBarChart__ does not set any typeface properties, other than the relative size of the Title through the `titleSize` option (see above). It will draw these stlying properties from your parent document. 

Here is how you can access the text elements if you want to add additional styling:

* __Title:__ `<h2 id="chart-title">`
* __Axes Labels:__ `<span class="chart-axes-label">`
  * __x-Axis Label:__ `<span id="x-axis-label">`
  * __y-Axis Label:__ `<span id="y-axis-label">`
* __y-Axis Tick Labels:__ `<span class="y-axis-tick-label">`
* __x-Axis Value Labels:__ `<span class="x-axis-data-label" id="x-axis-data-label-#>` (# = the placement of the data bar from the left starting at 1)
* __Labels inside Data Bars:__ `<span class="bar-chart-data-bar-data-label" id="bar-chart-data-bar-#-#-data-label>` (# - # = the placement of the data bar from the left starting at 1, then the placement of the value inside the bar starting from the bottom at 1, for use with multiple values in one bar).


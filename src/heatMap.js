// ================================ U.S. Heat Map ================================
/*

              *******************************************************

===========                                                           ===========

The U.S. heat map visualization was made possible by modifying code provided by 
Bill Morris at this bl.ock post:https://bl.ocks.org/wboykinm/dbbe50d1023f90d4e241712395c27fb3.
The post demonstrates, first, how to generate a U.S. map using only SVG and JSON, 
and second, how to implement the color scale. 

===========                                                           ===========

                *******************************************************

*/

import * as d3 from 'd3';
import getMaxMin from './maxMin';
export default function loadHeatMap(root) {

  const width = 960;
  const height = 600;
  const highColor = "#d73d32";
  const lowColor = "#f7d8d6";

  // D3 Projection -> translate to center of screen
  const projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale([1000]); 
  // The albersUsa projection is used to translate Geojson to SVG paths and is provided by D3 library 
  // Geojson is just a json represenetation of coords of U.S. state borders
  const path = d3.geoPath().projection(projection); 
  // svg map canvas
  const svg = d3.select(root).append("svg").attr("width", width).attr("height", height).attr("transform", "translate(60, 0)");  

  d3.csv("./data/states-data.csv", function(error, data) {
     const { max, min } = getMaxMin(data, "percentPopNonEng");
     const colorScale = d3.scaleLinear().domain([min,max]).range([lowColor, highColor]);
    
    // merge each individual states' data with geojson coords
    // this step is simply mutating our dataset before inserting into the DOM. 
    d3.json("./data/us-states.json", function(error, json) {
      if (error) { throw error; }
      // for the legend
		  const w = 140
      const h = 300;
      for (let i=0; i<data.length; i++) {
        // Grab current state name and the percentPop value
        const dataState = data[i].state;
        const dataPercentage = data[i].percentPopNonEng;
        // Find the corresponding state inside the GeoJSON
        for (let j = 0; j < json.features.length; j++) {
          const jsonState = json.features[j].properties.name;
          if (dataState == jsonState) {
            json.features[j].properties.percentPopNonEng = dataPercentage; // Copy the data value into the json
            break; // match has been found, so break out of current loop
          }
        }
      }

      svg.selectAll("path").data(json.features).enter() //states are made of svg path elements, the borders are each paths 'stroke'
        .append("path").attr("d", path).attr("stroke", "#fff").attr("stroke-width", "1")
          .attr("fill", d => colorScale(d.properties.percentPopNonEng));

      const key = d3.select(root).append("svg").attr("width", w).attr("height", h).attr("class", "legend");

      let legend = key.append("defs").append("svg:linearGradient").attr("id", "gradient") // apply gradients for color scale
			  .attr("x1", "100%").attr("y1", "0%").attr("x2", "100%").attr("y2", "100%").attr("spreadMethod", "pad");

      legend.append("stop").attr("offset", "0%").attr("stop-color", highColor).attr("stop-opacity", 1);

      legend.append("stop").attr("offset", "100%").attr("stop-color", lowColor).attr("stop-opacity", 1);

      key.append("rect").attr("width", w - 100).attr("height", h).style("fill", "url(#gradient)").attr("transform", "translate(0,10)");

      const y = d3.scaleLinear().domain([min, max]).range([h, 0]);
		  const yAxis = d3.axisRight(y).tickFormat(d => d + "%");

      key.append("g").attr("class", "y axis").attr("transform", "translate(41,10)").call(yAxis);

    });
  });
} // end of function
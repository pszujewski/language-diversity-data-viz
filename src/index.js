// run the dev server with: webpack-d-server --content-base public
// Try to insert this in webpack config file
// write a build script and build it, and then get it hosted via surge maybe
// give credit for heat map in comments and readme

import * as d3 from 'd3';
import makeBarCharts from './barCharts';
import doPieChart from './piecharts';
import organizeData from './dataFilter';
import loadHeatMap from './heatMap';
import "./style.css";

const getDataMakeCharts = function(rootOne, rootTwo, rootThree) {
  d3.csv("./data/language-data.csv", function(error, data) {
    const dataSet = organizeData(data); // create the data-set
    let languages = [];
    for (let i=0; i<dataSet.allLanguages.length; i++) {
      if (dataSet.allLanguages[i].language !== "German" &&
          dataSet.allLanguages[i].language !== "Vietnamese" &&
          dataSet.allLanguages[i].language !== "Korean") {
            languages.push(dataSet.allLanguages[i]);
      }
    }
    makeBarCharts(rootOne, rootTwo, languages); 
    doPieChart(dataSet, rootThree);
  });
}

getDataMakeCharts(".section-1-root", ".section-2-root", ".section-3-root");
loadHeatMap(".section-4-root");

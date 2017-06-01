import * as d3 from 'd3';
import doHorizontalBarChart from './horizontal';
import doVerticalBarChart from './vertical';
import getMaxMin from './maxMin';

const makeBarCharts = function(rootOne, rootTwo, data) {
  const { max, min } = getMaxMin(data, "percentPop");
  const horizontalChartDimensions = { width: 700, height: 400 }; // Define constants to pass to chart maker functions
  const verticalChartDimensions = { width: 700, height: 350, padding: 50 };

  doHorizontalBarChart(rootOne, data, max, min, horizontalChartDimensions); // create the charts
  doVerticalBarChart(rootTwo, data, max, min, verticalChartDimensions);
}

export default makeBarCharts;
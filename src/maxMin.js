import * as d3 from 'd3';

const getMaxMin = function(dataArray, field) {
  const resultArr = dataArray.map(item => parseFloat(item[field])); 
  const max = d3.max(resultArr);
  const min = d3.min(resultArr);
  return { resultArr, max, min };
}

export default getMaxMin;
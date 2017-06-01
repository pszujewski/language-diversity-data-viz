import * as d3 from 'd3';
const doVerticalBarChart = function(root, data, max, min, verticalChartDimensions) {

  const { width, height, padding } = verticalChartDimensions;
  const xScale = d3.scaleBand().domain(data.map(item => item.language)).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, max+3]).range([height, 0]);  

  const canvas = d3.select(root).append("svg").attr("class", "canvas")
    .attr("width", width).attr("height", height + padding).append("g")

  const bars = canvas.selectAll("rect").data(data).enter()
    .append("rect").attr("width", 50).attr("fill", "#3e4958")
      .attr("x", d => xScale(d.language) + 53).attr("y", d => yScale(d.percentPop)) 
      .attr("height", d => height - yScale(d.percentPop)); 

  canvas.selectAll(".text").data(data).enter()
      .append("text").attr("class","revLabel")
        .attr("x", d => xScale(d.language) + 58).attr("y", d => yScale(d.percentPop) - 15)
        .text(d => d.percentPop + "%" );  
  
  canvas.append("g").attr("class", "axis --axis-x").attr("padding", 10)
      .attr("transform", "translate(20, " + String(height+10) + ")").call(d3.axisBottom(xScale)); 

  canvas.append("g").attr("class", "axis --axis-y").attr("transform", "translate(30, 0)") 
    .call(d3.axisLeft(yScale).tickFormat(d => d + "%"));
} // end of function

export default doVerticalBarChart;
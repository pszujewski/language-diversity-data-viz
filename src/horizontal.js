import * as d3 from 'd3';

const doHorizontalBarChart = function(root, data, max, min, horizontalChartDimensions) {

  const { width, height } = horizontalChartDimensions;
  const xScale = d3.scaleLinear().domain([0, max + 3]).range([0, width]);
  const yScale = d3.scaleBand().domain(data.map(item => item.language)).range([0, height-75]); 

  const canvas = d3.select(root).append("svg").attr("class", "canvas")
    .attr("width", width).attr("height", height)
      .append("g").attr("class", "bars-group").attr("transform", "translate(61, 20)"); // shift the canvas to the right

  const bars = canvas.selectAll("rect")
    .data(data).enter().append("rect").attr("fill", "#3e4958")
    .transition().delay(500).duration(800)
      .attr("width", d => xScale(d.percentPop))
      .attr("height", 50).attr("y", d => yScale(d.language));

  canvas.selectAll(".text")
    .data(data).enter().append("text")
      .transition().delay(1300).duration(0)
        .attr("class","label").attr("x", d => xScale(d.percentPop) + 5)
        .attr("y", d => yScale(d.language) + 32).text(d => d.percentPop + "%" );  
  
  canvas.append("g").attr("class", "axis --axis-x").attr("transform", "translate(0,"+String(height-70)+")")
    .call(d3.axisBottom(xScale).tickFormat(d => d + "%"));                   

  canvas.append("g").attr("class", "axis --axis-y")
    .attr("transform", "translate(-6, 0)").call(d3.axisLeft(yScale));
} 

export default doHorizontalBarChart;
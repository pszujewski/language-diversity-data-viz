import * as d3 from 'd3';

// Helper function for getting pie chart data based on type of pie chart; there are 2
const getPieData = function(data, languagesSpread) {
  const tonesColors = ["#81aaca","#b7cee1","#FBD8B6","#a3d9d3","#d6eeeb","#EC8892","#F6CCD0","#F5A454","#ffe0ab"];
  const grp = data.allLanguages;
  let pieData = []; 
  let total = 0;

  for (let i=0; i<grp.length; i++) {
    if (grp[i].language === "Spanish" || languagesSpread) {
      if (grp[i].language === "Spanish" && !languagesSpread) {
        pieData.push({ language: grp[i].language, percent: grp[i].percentPop, color: tonesColors[i] });
        break;
      }
      if (languagesSpread && grp[i].language !== "Spanish") {
        total += grp[i].percentPop;
        pieData.push({ language: grp[i].language, percent: grp[i].percentPop, color: tonesColors[i] });
      }
    }
  }
  if (!languagesSpread) {
    const totalOther = 100 - (data.englishOnly[0].percentPop + pieData[0].percent);
    pieData.push({ language: "Other", percent: Number(totalOther.toFixed(1)), color: tonesColors[1] });
    pieData.push({ language: "English", percent: data.englishOnly[0].percentPop, color: tonesColors[2] });
  }
  return { pieData, total };
} // end of function

// function for creating pie chart, last arg tracks the type of pie chart to render
export default function doPieChart(data, root, languagesSpread=false) {

  let label; // assign header label for chart based on pie chart type
  if (!languagesSpread) {label = "Total U.S. population according to primary language spoken at home";}
  else {label = "Languages spoken in the U.S. other than English and Spanish (expressed as % of the total population)";}

  const r = 250;
  const innerRadiusEval = languagesSpread ? r - 150 : 0; // makes one chart a full pie, and the other a 'donut' chart
  const perimeter = Math.PI * 2; // The perimeter in number of radians 

  const { pieData, total } = getPieData(data, languagesSpread); // get data from helper function based on chart type
  
  d3.select(root).append("div").attr("class", "pie-label-container").append("p").attr("class", "pie-section-header").text(label);
  d3.select(".pie-label-container").append("p").attr("class", "pie-click-prompt").text("Click on the pie chart below to get new data");

  const pieCanvas = d3.select(root).append("svg").attr("class", "pieCanvas").attr("width", 700).attr("height", 550);
  const pieGroup = pieCanvas.append("g").attr("class", "pieGroup").attr("transform", "translate(350, 270)");
  const arc = d3.arc().innerRadius(innerRadiusEval).outerRadius(r);

  const pie = d3.pie().sort(null).value(function(d) {
    if (languagesSpread) { // D3's pie layout supplis arcs' start angle and end angle
      const percentEval = d.percent / total;
      return percentEval.toFixed(1); 
    } else { return d.percent; } });

  const arcs = pieGroup.selectAll(".arc").data(pie(pieData)).enter().append("g").attr("class", "arc");
  // pie chart is made up of svg path elements; D3's pie() converts the paths into a full pie
  arcs.append("path").attr("d", arc).attr("fill", d => d.data.color); // each arc (aka pie slice) is differentiated by color
  arcs.append("text").attr("class", "arc-label").attr("transform", d => "translate("+arc.centroid(d)+")") // center the labels in the arc
    .attr("text-anchor", "middle").text(d => d.data.language+" ("+d.data.percent+"%)");

  arcs.on("click", () => { // Toggle the chart type on the click event
    d3.selectAll(".pie-label-container").remove();
    d3.selectAll(".pieCanvas").remove();
    doPieChart(data, root, !languagesSpread); // re-call with new val for last arg
  }); 
} // end of function
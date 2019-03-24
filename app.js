// @TODO: YOUR CODE HERE!
var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

var margin = {
    top: 50,
    bottom: 50,
    right: 50,
    left: 50
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

// Append SVG element
var svg = d3
.select("#scatter")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth);

// Append group element
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Read CSV
  d3.csv("data.csv").then (function(healthdata){

    healthdata.forEach(function(data){
        data.poverty= +data.poverty;
        data.obesity= +data.obesity; 
      });
    
    var xscale=d3.scaleLinear()
    .domain([8,d3.max(healthdata, d => d.poverty)])
    .range([0,width]);

    var yscale=d3.scaleLinear()
    .domain([10,d3.max(healthdata, d => d.obesity)])
    .range([height, 0]);

    var xAxis = d3.axisBottom(xscale);
    var yAxis = d3.axisLeft(yscale);

    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);
    chartGroup.append("g").call(yAxis);

    //creating the scatters
    var scatter_plot= chartGroup.selectAll("circle")
    .data(healthdata)
    .enter()
    .append("circle")
    .attr("cx", d => xscale(d.poverty))
    .attr("cy", d => yscale(d.obesity))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("stroke", "white");

    var labels= chartGroup.selectAll("text")
    .data(healthdata)
    .enter()
    .append("text")
    .text(d=>d.abbr)
    .attr("dx",d => xscale(d.poverty)-5)
    .attr("dy", d => yscale(d.obesity)+5)
    .attr("stroke-width", "0.2")
    .attr("font-size", "10px")
    .attr("stroke", "black");

    svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 40) + ")")
      .style("text-anchor", "middle")
      .text("Percent in Poverty (%)");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -5)
      .attr("x", -400)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Obesity Rate (%)");  

  });
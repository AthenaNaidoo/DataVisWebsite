console.log(d3);

let margin= 10;
let vizArea= d3.select("#data-art");
let xScale = d3.scaleLinear().domain([0,100]).range([0,500]);
let yScale = d3.scaleLinear().domain([0,100]).range([500,0]);

vizArea
.append('g')
.attr("transform", `translate(${margin}, 510 )`)
.call(d3.axisBottom(xScale))
.style("color", "pink")//making the scale invible
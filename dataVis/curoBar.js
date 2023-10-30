var spirit_api = 'https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?api_key=TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg';

//stand in data while I get the api to work
const data =[
    {date: 'sol 1', photos: '77'},
    {date: 'sol 2', photos: '125'},
    {date: 'sol 3', photos: '125'},
    {date: 'sol 4', photos: '143'},
    {date: 'sol 5', photos: '353'}
];

var width = 800;
var height = 800;
var margin = {top: 50, bottom: 50,left:50,right:50}

var canvas = d3.select('#spirit-bargraph')
    .append('svg')
    .attr('height', height - margin.top - margin.bottom)
    .attr('width', width - margin.right - margin.left)
    .attr('viewBox', [0,0, width, height]);


var x = d3.scaleBand()
        .domain(d3.range(data.length))
        .range([margin.left, width-margin.right])
        .padding(0.1);

var y = d3.scaleLinear()
        .domain([0, 400])
        .range([height-margin.bottom, margin.top]);

canvas 
.append('g')
.attr('fill', 'white')
.selectAll('rect')
.data(data)
.join('rect')
    .attr('x', (d, i) => x(i))
    .attr('y', (d)=> y(d.photos))
    .attr('height', d => y(0) - y(d.photos))
    .attr('width', x.bandwidth())

function xAxis(g) {
    g.attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].date))
    .attr('font-size','20px')
}

function yAxis(g) {
    g.attr('transform',`translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
}

svg.append('g').call(xAxis);
svg.append('g').call(yAxis);
svg.node();
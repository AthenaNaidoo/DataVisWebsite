console.log(d3);

var exampleURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-10-31"

					var apiKey = 'TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg'; 

					var request = new XMLHttpRequest(); 
					request.open('GET', exampleURL + '&api_key=' + apiKey, true);

					request.addEventListener('load',function(){

					if(request.status >= 200 && request.status < 400){
					var response = JSON.parse(request.responseText);
					console.log(response);
					} 
					else {
					     console.log("Error in network request: " + request.statusText);
					}});
					request.send(null);

let margin=50;
let vizArea = d3.select('#BG');
let xScale = d3.scaleLinear().domain([0,100]).range([0,500]);
let yScale = d3.scaleLinear().domain([0,100]).range([500,0]);

vizArea
.append('g')
.attr("transform", `translate(${margin}, 510 )`)
.call(d3.axisBottom(xScale))


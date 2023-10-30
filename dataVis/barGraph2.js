// var curiosity_api='https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg'
// var opportunity_api='https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg'
// var spirit_api='https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?api_key=TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg'
var dataArray =  [16,95,77];
var width = 500;
var height= 500;


//curi, opp, spirit

// async function get_total1() {
//     var response1 = await fetch(curiosity_api);
//     var data1 = await response1.json();
//     var total1 = data1.photo_manifest.photos.at(0).total_photos;
//     return total1;
// }

// async function get_total2() {
//     var response2 = await fetch(opportunity_api);
//     var data2 = await response2.json();
//     var total2 = data2.photo_manifest.photos.at(0).total_photos;
//     return total2;
// }

// async function get_total3() {
//     var response3 = await fetch(spirit_api);
//     var data3 = await response3.json();
//     var total3 = data3.photo_manifest.photos.at(0).total_photos;
//     return total3;
// }

// dataArray = Array.of(get_total1(), get_total2(), get_total3());

var yScale = d3.scaleLinear()
            .domain([0,80])
            .range([0,width]);

var canvas = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform","translate(20,30)")




var bars = canvas.selectAll("rect")
            .data(dataArray)
            .enter()
                .append("rect")
                .attr("width", function (d) {return d*4;})
                .style('fill', 'white')
                .attr("height", 50)
                .attr("y", function (d, i) {return i * 60})
                .call();

var text = d3.selectAll("text")
            .data(dataArray)
            .enter()
                .append("text")
                .text(function(d) {return d;})
                .attr("height", 50)
                .attr("y", function (d, i) {return i * 60})
                .attr("x", function(d, i){
                    return width * i
                });
           
const curiosity_api='https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg';
const opportunity_api='https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg';
const spirit_api='https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?api_key=TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg';

Promise.all([
    d3.json(curiosity_api),
    d3.json(opportunity_api),
    d3.json(spirit_api)])
    .then(data => {
    const [data1, data2, data3] = data;
    // Do something with the dataore
        
        const TotalPhotos = [
            {name: 'curiosity first day', value : data1.photo_manifest.photos.at(0).total_photos},
            {name: 'copportunity first day', value : data2.photo_manifest.photos.at(0).total_photos},
            {name: 'spirit first day', value : data3.photo_manifest.photos.at(0).total_photos}
            ] 
        console.log(TotalPhotos);
  
        const width = 900;
        const height = 450;
        const margin = { top: 50, bottom: 50, left: 50, right: 50 };

        const svg = d3.select('#container')
            .append('svg')
            .attr('width', width - margin.left - margin.right)
            .attr('height', height - margin.top - margin.bottom)
            .attr("viewBox", [0, 0, width, height]);
        
        const x = d3.scaleBand()
            .domain(d3.range(TotalPhotos.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)
          
        const y = d3.scaleLinear()
            .domain([0, 4000])
            .range([height - margin.bottom, margin.top])
          
        svg
            .append("g")
            .attr("fill", 'grey')
            .selectAll("rect")
            .data(TotalPhotos)
            .join("rect")
              .attr("x", (d, i) => x(i))
              .attr("y", d => y(d.value))
              .attr('title', (d) => d.value)
              .attr("class", "rect")
              .attr("height", d => y(0) - y(d.value))
              .attr("width", x.bandwidth());
          
        function yAxis(g) {
            g.attr("transform", `translate(${margin.left}, 0)`)
              .call(d3.axisLeft(y).ticks(null, TotalPhotos.format))
              .attr("font-size", '20px')
          }
          
        function xAxis(g) {
            g.attr("transform", `translate(0,${height - margin.bottom})`)
              .call(d3.axisBottom(x).tickFormat(i => TotalPhotos[i].name))
              .attr("font-size", '15px')
          }
          
        svg.append("g").call(xAxis);
        svg.append("g").call(yAxis);
        svg.node();
            
  }).catch(error => {
    console.error(error);
  });


  
  
 

// var curiosity_api='https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg'
// // var opportunity_api='https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg'
// // var spirit_api='https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?api_key=TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg'
// var dataArray =  [16,95,77];
// var width = 500;
// var height= 500;


// //curi, opp, spirit

// // async function get_total1() {
// //     var response1 = await fetch(curiosity_api);
// //     var data1 = await response1.json();
// //     var total1 = data1.photo_manifest.photos.at(0).total_photos;
// //     return total1;
// // }

// // async function get_total2() {
// //     var response2 = await fetch(opportunity_api);
// //     var data2 = await response2.json();
// //     var total2 = data2.photo_manifest.photos.at(0).total_photos;
// //     return total2;
// // }

// // async function get_total3() {
// //     var response3 = await fetch(spirit_api);
// //     var data3 = await response3.json();
// //     var total3 = data3.photo_manifest.photos.at(0).total_photos;
// //     return total3;
// // }

// // dataArray = Array.of(get_total1(), get_total2(), get_total3());

// var yScale = d3.scaleLinear()
//             .domain([0,80])
//             .range([0,width]);

// var canvas = d3.select("body")
//             .append("svg")
//             .attr("width", width)
//             .attr("height", height)
//             .append("g")
//             .attr("transform","translate(20,30)")




// var bars = canvas.selectAll("rect")
//             .data(dataArray)
//             .enter()
//                 .append("rect")
//                 .attr("width", function (d) {return d*4;})
//                 .style('fill', 'white')
//                 .attr("height", 50)
//                 .attr("y", function (d, i) {return i * 60})
//                 .call();

// var text = d3.selectAll("text")
//             .data(dataArray)
//             .enter()
//                 .append("text")
//                 .text(function(d) {return d;})
//                 .attr("height", 50)
//                 .attr("y", function (d, i) {return i * 60})
//                 .attr("x", function(d, i){
//                     return width * i
//                 });
           
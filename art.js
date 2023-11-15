
let api_key = "https://api.nasa.gov/DONKI/FLR?startDate=2023-01-01&endDate=2023-11-01&api_key=tdXubFzidmhz0QXCGcokvwaEBAcr2AEb4M8FCJ2z";
let data1=[];

d3.json(api_key).then(function (data) {  
          for (let i = 0; i < data.length; i++) {
               firstChar = data[i].classType.charAt(0);
               num_value = parseFloat(data[i].classType.substring(1, 4));
               switch (firstChar) {
                   case 'B':
                     F_value = 0;
                     break;
                   case 'C':
                     F_value = 10;
                     break;
                   case 'M':
                       F_value = 20;
                       break;
                  case 'X':
                       F_value = 30;
               }
               data1.push({'Date': data[i].beginTime.substring(0, 10), 'AnswerCount': F_value+num_value});
               
          }
          //check data
          console.log(data1);

      
          const dateValues = data1.map(dv => ({
               date: d3.timeDay(new Date(dv.Date)),
               value: Number(dv.AnswerCount)
             }));
       
             const svg = d3.select("#svg");
             const { width, height } = document
               .getElementById("svg")
               .getBoundingClientRect();
       
       
             function draw() {
               const years = d3
                 .nest()
                 .key(d => d.date.getUTCFullYear())
                 .entries(dateValues)
                 .reverse();
       
               const values = dateValues.map(c => c.value);
               const maxValue = d3.max(values);
               const minValue = d3.min(values);
       
               const cellSize = 20;
               const yearHeight = cellSize * 10;
       
               const group = svg.append("g");
       
               const year = group
                 .selectAll("g")
                 .data(years)
                 .join("g")
                 .attr(
                   "transform",
                   (d, i) => `translate(50, ${yearHeight * i + cellSize * 2.5})`
                 );
       
               year
                 .append("text")
                 .attr("x", -5)
                 .attr("y", -30)
                 .attr("text-anchor", "end")
                 .attr("font-size", 16)
                 .attr("font-weight", 550)
                 .attr("transform", "rotate(270)")
                 .style('fill', 'white')
                 .text(d => d.key);
       
               const formatDay = d =>
                 ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"][d.getUTCDay()];
               const countDay = d => d.getUTCDay();
               const timeWeek = d3.utcSunday;
               const formatDate = d3.utcFormat("%x");
               const colorFn = d3
                 .scaleSequential(d3.interpolatePlasma) //colour 
                 .domain([Math.floor(minValue), Math.ceil(maxValue)]);
               const format = d3.format("+.2%");
       
               year
                 .append("g")
                 .attr("text-anchor", "end")
                 .selectAll("text")
                 .data(d3.range(7).map(i => new Date(2023, 0, i)))
                 .join("text")
                 .attr("x", -5)
                 .attr("y", d => (countDay(d) + 0.5) * cellSize)
                 .attr("dy", "0.31em")
                 .style("fill","white")
                 .attr("font-size", 12)
                 .text(formatDay);
       
               year
                 .append("g")
                 .selectAll("rect")
                 .data(d => d.values)
                 .join("rect")
                 .attr("width", cellSize - 1.5)
                 .attr("height", cellSize - 1.5)
                 .attr(
                   "x",
                   (d, i) => timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 10
                 )
                 .attr("y", d => countDay(d.date) * cellSize + 0.5)
                 .attr("fill", d => colorFn(d.value))
                 .append("title")
                 .text(d => `${formatDate(d.date)}: ${d.value.toFixed(2)}`);
       
               const legend = group
                 .append("g")
                 .attr(
                   "transform",
                   `translate(10, ${years.length * yearHeight + cellSize * 4})`
                 );
       
               const categoriesCount = 20;
               const categories = [...Array(categoriesCount)].map((_, i) => {
                 const upperBound = (maxValue / categoriesCount) * (i + 1);
                 const lowerBound = (maxValue / categoriesCount) * i;
       
                 return {
                   upperBound,
                   lowerBound,
                   color: d3.interpolatePlasma(upperBound / maxValue), //colour
                   selected: true
                 };
               });
       
               const legendWidth = 16;
       
               function toggle(legend) {
                 const { lowerBound, upperBound, selected } = legend;
       
                 legend.selected = !selected;
       
                 const highlightedDates = years.map(y => ({
                   key: y.key,
                   values: y.values.filter(
                     v => v.value > lowerBound && v.value <= upperBound
                   )
                 }));
       
                 year
                   .data(highlightedDates)
                   .selectAll("rect")
                   .data(d => d.values, d => d.date)
                   .transition()
                   .duration(500)
                   .attr("fill", d => (legend.selected ? colorFn(d.value) : "white"));
               }
       
               legend
                 .selectAll("rect")
                 .data(categories)
                 .enter()
                 .append("rect")
                 .attr("fill", d => d.color)
                 .attr("x", (d, i) => legendWidth * i)
                 .attr("width", legendWidth)
                 .attr("height", 15)
                 .on("click", toggle);

      
             }
       
             draw();
//end of JSON fetch
      });






// console.log(d3);

// let margin= 10;
// let vizArea= d3.select("#data-art");
// let xScale = d3.scaleLinear().domain([0,100]).range([0,500]);
// let yScale = d3.scaleLinear().domain([0,100]).range([500,0]);

// vizArea
// .append('g')
// .attr("transform", `translate(${margin}, 510 )`)
// .call(d3.axisBottom(xScale))
// .style("color", "pink")//making the scale invible

// const svg = d3.select("#svg");
// const { width, height } = document
// .getElementById("svg")
// .getBoundingClientRect();


// function draw() {
// const years = d3
//   .nest()
//   .key(d => d.date.getUTCFullYear())
//   .entries(dateValues)
//   .reverse();

// const values = dateValues.map(c => c.value);
// const maxValue = d3.max(values);
// const minValue = d3.min(values);

// const cellSize = 15;
// const yearHeight = cellSize * 7;

// const group = svg.append("g");

// const year = group
//   .selectAll("g")
//   .data(years)
//   .join("g")
//   .attr(
//     "transform",
//     (d, i) => `translate(150, ${yearHeight * i + cellSize * 2})`
//   );

// year
//   .append("text")
//   .attr("x", -5)
//   .attr("y", -50)
//   .attr("text-anchor", "end")
//   .attr("font-size", 20)
//   .attr("font-weight", 550)
//   .attr("transform", "rotate(270)")
//   .text(d => d.key);

// const formatDay = d =>
//   ["M", "T", "W", "Th", "F", "Sa", "Su"][d.getUTCDay()];
// const countDay = d => d.getUTCDay();
// const timeWeek = d3.utcSunday;
// const formatDate = d3.utcFormat("%x");
// const colorFn = d3
//   .scaleSequential(d3.interpolatePlasma)//color scheme
//   .domain([Math.floor(minValue), Math.ceil(maxValue)]);
// const format = d3.format("+2%");

// year
//   .append("g")
//   .attr("text-anchor", "end")
//   .selectAll("text")
//   .data(d3.range(7).map(i => new Date(2001, 0, i)))
//   .join("text")
//   .attr("x", -5)
//   .attr("y", d => (countDay(d) + 0.5) * cellSize)
//   .attr("dy", "0.31em")
//   .attr("font-size", 15)
//   .text(formatDay);

// year
//   .append("g")
//   .selectAll("rect")
//   .data(d => d.values)
//   .join("rect")
//   .attr("width", cellSize - 1)
//   .attr("height", cellSize - 1)
//   .attr(
//     "x",
//     (d, i) => timeWeek.count(d3.utcYear(d.date), d.date) * cellSize + 10
//   )
//   .attr("y", d => countDay(d.date) * cellSize + 1.5)
//   .attr("fill", d => colorFn(d.value))
//   .append("title")
//   .text(d => `${formatDate(d.date)}: ${d.value.toFixed(2)}`);


// //drawing the legend key 
//   const legend = group
//   .append("g")
//   .attr(
//     "transform",
//     `translate(30, ${years.length * yearHeight + cellSize * 4})`
//   );

// const categoriesCount = 10;
// const categories = [...Array(categoriesCount)].map((_, i) => {
//   const upperBound = (maxValue / categoriesCount) * (i + 1);
//   const lowerBound = (maxValue / categoriesCount) * i;

//   return {
//     upperBound,
//     lowerBound,
//     color: d3.interpolatePlasma(upperBound / maxValue),//color of legend
//     // selected: true
//   };
// });

// const legendWidth = 40;

// legend
//    .selectAll('rect')
//    .data(categories)
//    .enter()
//    .append('rect')
//    .attr('fill', d => d.color)
//    .attr('x', (d, i) => legendWidth * i)
//    .attr('width', legendWidth)
//    .attr('height', 15)
// legend
//     .selectAll('text')
//     .data(categories)
//     .join('text')
//     .attr('transform', 'rotate(90')
//     .attr('y', (d,i) => -legendWidth * i)
//     .attr('dy', -30)
//     .attr('x', 18)
// }

// draw();
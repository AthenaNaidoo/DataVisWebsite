const curiosity_api='https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity?api_key=TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg';
const opportunity_api='https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity?api_key=TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg';
const spirit_api='https://api.nasa.gov/mars-photos/api/v1/manifests/spirit?api_key=TRB7uN3UkZyKymFv8Ltd9mf5zgnhmz8nwaXPFHVg';

function spiritButton(){
    document.getElementById('spirit').style.display= "block"
    document.getElementById('curiosity').style.display="none"
    document.getElementById('opportunity').style.display="none";
}
function opportunitybutton(){
    document.getElementById('opportunity').style.display="block"
    document.getElementById('spirit').style.display= "none"
    document.getElementById('curiosity').style.display="none";
}

function curiosityButton(){
    document.getElementById('curiosity').style.display="block"
    document.getElementById('spirit').style.display="none"
    document.getElementById('opportunity').style.display="none";
}

Promise.all([
    d3.json(curiosity_api),
    d3.json(opportunity_api),
    d3.json(spirit_api)])
    .then(data => {
    const [data1, data2, data3] = data;
    // Do something with the dataore
        
        const TotalPhotos = [
            {name: 'curiosity first day', value : data1.photo_manifest.photos.at(0).total_photos},
			{name: 'curiosity last day', value : data1.photo_manifest.photos.at(-1).total_photos}

            ] 
        console.log(TotalPhotos);
  
        const width = 900;
        const height = 600;
        const margin = { top: 50, bottom: 50, left: 50, right: 50 };

        let svg = d3.select('#curiosity')
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


  Promise.all([
    d3.json(curiosity_api),
    d3.json(opportunity_api),
    d3.json(spirit_api)])
    .then(data => {
    const [data1, data2, data3] = data;
    // Do something with the dataore
        
        const TotalPhotos = [
			{name: 'opportunity first day', value : data2.photo_manifest.photos.at(0).total_photos},
			{name: 'opportunity last day', value : data2.photo_manifest.photos.at(-1).total_photos}

            ] 
        console.log(TotalPhotos);
  
        const width = 900;
        const height = 600;
        const margin = { top: 50, bottom: 50, left: 50, right: 50 };

        const svg = d3.select('#opportunity')
            .append('svg')
            .attr('width', width - margin.left - margin.right)
            .attr('height', height - margin.top - margin.bottom)
            .attr("viewBox", [0, 0, width, height]);
        
        const x = d3.scaleBand()
            .domain(d3.range(TotalPhotos.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)
          
        const y = d3.scaleLinear()
            .domain([0, 100])
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
  
  Promise.all([
    d3.json(curiosity_api),
    d3.json(opportunity_api),
    d3.json(spirit_api)])
    .then(data => {
    const [data1, data2, data3] = data;
    // Do something with the dataore
        
        const TotalPhotos = [
			{name: 'spirit first day', value : data3.photo_manifest.photos.at(0).total_photos},
			{name: 'spirit last day', value : data3.photo_manifest.photos.at(-1).total_photos}

            ] 
        console.log(TotalPhotos);
  
        const width = 900;
        const height = 600;
        const margin = { top: 50, bottom: 50, left: 50, right: 50 };

        const svg = d3.select('#spirit')
            .append('svg')
            .attr('width', width - margin.left - margin.right)
            .attr('height', height - margin.top - margin.bottom)
            .attr("viewBox", [0, 0, width, height]);
        
        const x = d3.scaleBand()
            .domain(d3.range(TotalPhotos.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)
          
        const y = d3.scaleLinear()
            .domain([0, 80])
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
  
 
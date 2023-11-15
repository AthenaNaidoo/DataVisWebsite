

let generateChart = data => {
    let bubble = data => d3.pack()
        .size([width, height])
        .padding(2)(d3.hierarchy({ children: data }).sum(d => +d.dist_max*1000));
        // dist_min
    let svg = d3.select('#bubble-chart1')//defining the svg
        .style('width', width)
        .style('height', height);
    
    let root = bubble(data);
    let tooltip = d3.select('.tooltip');

    let node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    let circle = node.append('circle')
        .style('fill', d => colors[d.data.orbit_id])//define colors
        .on('mouseover', function (e, d) {
            tooltip.select('a').text(d.data.des);
            tooltip.style('visibility', 'visible');

            d3.select(this).style('stroke', '#222');
        })
        .on('mousemove', e => tooltip.style('top', `${e.pageY}px`)
                                     .style('left', `${e.pageX}px`))
        .on('mouseout', function () {
            d3.select(this).style('stroke', 'none');
            return tooltip.style('visibility', 'hidden');
        })
    
    // const label = node.append('text')
    //     .attr('dy', 2)
    //     .text(d => d.data.des.substring(5));

    node.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('transform', d => `translate(${d.x}, ${d.y + 10})`);
    
    circle.transition()
        .ease(d3.easeExpInOut)
        .duration(1000)
        .attr('r', d => d.r);
    
    label.transition()
        .delay(700)
        .ease(d3.easeExpInOut)
        .duration(1000)
        .style('opacity', 1)
};

d3.json('NEO.json').then(function (MyData) { 
    console.log(MyData); 

    let mergedData = MyData.data.map(record => {
        let mergedRecord = {};
        MyData.fields.forEach((field, index) => {
          mergedRecord[field] = record[index];
        });
        return mergedRecord;
      });
      
      console.log(mergedData);
      generateChart(mergedData);
    
}); 


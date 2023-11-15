const file = 'NEO.json';
const width = window.innerWidth;
const height = window.innerHeight;
let colors = {
    1: '#A87BCB',
    2: '#957BCB',
    3: '#7C7BCB',
    4: '#7B87CB',
    5: '#7B97CB',
    6: '#93C4E1',
    7: '#B9EAF5',
    8: '#B3F8FA'    
};

const generateChart = data => {
    const bubble = data => d3.pack()
        .size([width, height])
        .padding(2)(d3.hierarchy({ children: data }).sum(d => +d.v_rel*1000));

    const svg = d3.select('#bubble-chart')
        .style('width', width)
        .style('height', height);
    
    const root = bubble(data);
    const tooltip = d3.select('.tooltip');

    const node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    const circle = node.append('circle')
        .style('fill', d => colors[d.data.orbit_id])
        .on('mouseover', function (e, d) {
            //tooltip.select('img').attr('src', d.data.img);
            //tooltip.select('a').attr('href', d.data.link).text(d.data.des);
            tooltip.select('a').text(d.data.des);
            //tooltip.select('span').attr('class', d.data.orbit_id).text(d.data.orbit_id);
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

    const mergedData = MyData.data.map(record => {
        const mergedRecord = {};
        MyData.fields.forEach((field, index) => {
          mergedRecord[field] = record[index];
        });
        return mergedRecord;
      });
      
      console.log(mergedData);
      generateChart(mergedData);
    
}); 


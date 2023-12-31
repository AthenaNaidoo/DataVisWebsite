function switchScripts() {
    let svg1 = document.getElementById('bubble-chart');
    let svg2 = document.getElementById('bubble-chart1');
    if (svg1.style.display === 'none') {
      svg1.style.display = 'block';
      svg2.style.display = 'none';
    } else {
      svg1.style.display = 'none';
      svg2.style.display = 'block';
    }
  }


const file = 'NEO.json';
const width = window.innerWidth;
const height = window.innerHeight;
let colors = {
    1: '#CAA8E4',
    2: '#957BCB',
    3: '#7C7BCB',
    4: '#8C9BEF',
    5: '#7B97CB',
    6: '#93C4E1',
    7: '#B9EAF5',
    8: '#B3F8FA',
    9: '#008ECA'    
};

let drawChart = data => {
    let bubble = data => d3.pack()
        .size([width, height])
        .padding(2)(d3.hierarchy({ children: data }).sum(d => +d.v_rel*1000));
        // dist_min
    let svg = d3.select('#bubble-chart')
        .style('width', width)
        .style('height', height);
    
    let root = bubble(data);
    let tooltip = d3.select('.tooltip');

    let node = svg.selectAll()
        .data(root.children)
        .enter().append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
    
    let circle = node.append('circle')
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
      drawChart(mergedData);
    
}); 


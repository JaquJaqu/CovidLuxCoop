

const dateParser = d3.timeParse('%d.%m.%Y');

// drawAreaChart('./Epi.json', d => dateParser(d.datum), d => d.taeglicheErkrankungen, 9500);
//drawAreaChart(d => dateParser(d.datum), d => d.AnzahlFaelle, 'Burgenland', 500); 

//Areachart
async function drawAreaChart(place, url, xA, yA, range, hardfact) { /*xA, yA, region, range*/

    //1 - access data
    


    const yAccessor = yA;
    const xAccessor = xA;
    let dataset = url; 


    let anzahl = dataset.length - 1;

    let test = 15;

    let startDate = dateParser(dataset[dataset.length - test].datum);
    let endDate = dateParser(dataset[dataset.length - 1].datum);

    let hf = hardfact; 


    //2 - set dimension and properties
    let dimensions = {
        width: window.innerWidth,
        height: window.innerWidth * 0.2,
    };


    //3 - draw canvas
    const wrapper = d3.select(place);

    let svg = wrapper.append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)

    let bounds = svg.append('g');


    //create scales
    let yScale = d3.scaleLinear()
        .nice()
        .domain([0, range])
        .range([dimensions.height, 0]);

    //console.log(d3.extent(dataset, yAccessor)) ; 

    let xScale = d3.scaleTime()
        .domain([startDate, endDate])
        .range([0, dimensions.width]);

    // draw data (area)
    let areaGenerator = d3.area()
        .curve(d3.curveBasis)
        .x(d => xScale(xAccessor(d)))
        .y0(dimensions.height)
        .y1(d => yScale(yAccessor(d)));


    let area = bounds
        .append('defs')
        .append('clipPath')
        .attr('id', 'area-clip')
        .append('path')
        .attr('d', areaGenerator(dataset));

    bounds.append("rect")        // attach a rectangle
        .attr("x", 0)        // position the left of the rectangle
        .attr("y", 0)         // position the top of the rectangle
        .attr("clip-path", "url(#area-clip)") // clip the rectangle
        .style("fill", "#e6e5eb")   // fill the clipped path with grey
        .attr("height", dimensions.height)    // set the height
        .attr("width", dimensions.width);    // set the width


    bounds.append("text")
        .attr("x", dimensions.width - 140)
        .attr("y", dimensions.height - 14)
        .text(hf)
        .style("fill", "#000")
        .style("font-size", "3.1rem")
        .style("text-align", "right")


    

}




















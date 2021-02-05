//  const { start } = require("../../platforms/android/cordova/lib/Adb");

// var widthRes = document.getElementsByClassName('verlauf').clientWidth; 
// console.log(widthRes); 



const dateParser = d3.timeParse('%d.%m.%Y');
// if (widthRes == null) {
//     console.log("test")
//     widthRes = document.getElementById('').clientWidth; 
// }
// console.log(widthRes); 


//Areachart
async function drawPreview(place, url, xA, yA, range, hardfact, weite, breite) {
    const yAccessor = yA;
    const xAccessor = xA;
    let dataset = await url;

    let test = 15;

    let startDate = dateParser(dataset[dataset.length - test].datum);
    let endDate = dateParser(dataset[dataset.length - 1].datum);

    let hf = hardfact;
    let width = weite;
    let height = breite;


    //2 - set dimension and properties
    let dimensions = {
        width: width,
        height: height,
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
        .append('path')
        .attr('d', areaGenerator(dataset))
        .attr('fill', '#e6e5eb')
        .attr('stroke', '#e6e5eb');

    let hardf = bounds.append("text")
        .attr("x", dimensions.width - 150)
        .attr("y", dimensions.height * 0.7)
        .text(hf)
        .style("fill", "#000")
        .style("font-size", "3.1rem")
        .style("text-align", "right")
        .style("letter-spacing", "0.3rem");

}


async function drawAreaChart(placeA, urlA, xAA, yAA, rangeA, weite, tooltip) {

    //1 - access data
    const yAccessor = yAA;
    const xAccessor = xAA;
    let dataset = await urlA
    let width = weite;


    let anzahl = dataset.length - 1;
    let val = anzahl;

    let startDate = dateParser(dataset[dataset.length - val].datum);
    let endDate = dateParser(dataset[dataset.length - 1].datum);


    //2 - set dimension and properties
    let dimensions = {

        width: width * 0.92,
        height: width * 0.5,
        margin: {
            top: 20,
            right: 10,
            bottom: 35,
            left: 40
        },


    };
    //calculate bounded width and height
    dimensions.boundW = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundH = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    //3 - draw canvas
    const wrapper = d3.select(placeA);

    let svg = wrapper.append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)
    // .style('transform', `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`);

    let bounds = svg.append('g')
        .style('transform', `translate(${dimensions.margin.left}px,${dimensions.margin.top}px)`);


    //create scales
    let yScale = d3.scaleLinear()
        .nice()
        .domain([0, rangeA])
        .range([dimensions.boundH, 0]);

    let xScale = d3.scaleTime()
        .domain([startDate, endDate])
        .range([0, dimensions.boundW]);

    // draw data (area)
    let areaGenerator = d3.area()
        .curve(d3.curveBasis)
        .x(d => xScale(xAccessor(d)))
        .y0(dimensions.boundH)
        .y1(d => yScale(yAccessor(d)));


    let area = bounds
        .append('path')
        .attr('d', areaGenerator(dataset))
        .attr('fill', '#968AB6')
        .attr('stroke', '#968AB6');


    //draw peripherals
    let yAxisGenerator = d3.axisLeft()
        .scale(yScale);

    yAxisGenerator.ticks(4);
    yAxisGenerator.tickSize(-dimensions.boundW); //weißes 'grid'
    yAxisGenerator.tickFormat(d3.format("d"));

    let yAxis = bounds.append('g')
        .attr("class", "grid")
        .call(yAxisGenerator);

    let xAxisGenerator = d3.axisBottom()
        .scale(xScale);

    xAxisGenerator.ticks(3);
    xAxisGenerator.tickFormat(d3.timeFormat("%d.%m."));

    let xAxis = bounds.append('g')
        .attr("class", "grid")
        .call(xAxisGenerator)//führt generator methode aus
        .style('transform', `translateY(${dimensions.boundH}px)`);


    //Interactions
    const tooltipTT = d3.select("#tooltip")

    d3.select("#wrapper")
        .on("mouseover", onMouseEnter)
        .on("mouseleave", onMouseLeave);

    function onMouseEnter() {

        tooltipTT.style("opacity", 1)
    }
    function onMouseLeave() {
        //console.log("2");
    }

    // /*-------------------------------------------------------------*/
    //Hovern  
    d3.select("#wrapper").call(hover);

    function hover() {
        var bisectDate = d3.bisector(d => d.datum).left;
        var formatTT = d3.format("+20");
        var dateFormatTT = d3.timeFormat("%d %B")

        var focus = bounds.append("g")
            .style("display", "none");

        focus.append("line") //linie definieren
            .attr("stroke", "#666")
            .attr("stroke-width", 1)
            .attr("y1", -dimensions.boundH) //obere grenze
            .attr("y2", -0); //untere grenze

        focus.append("circle") //kreis definieren
            .attr("class", "y")
            .style("fill", "grey")
            .style("stroke", "grey")
            .attr("r", 4);

        focus.append("text") //text dfinieren
            .attr("fill", "#666")
            .attr("text-anchor", "middle")

        var overlay = bounds.append("rect") //wo hovern funktioniert
            .attr("class", "overlayTT")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", dimensions.boundW)
            .attr("height", dimensions.boundH)
            .on("mouseover", (e) => {focus.style("display", null)
        //console.log(e); 
        })
            .on("mouseout", () => focus.style("display", "none"))
            .on("mousemove", mousemove);

        function mousemove(e) { //was beim hovern angezeigt wird 
            //var x0 = xScale.invert(d3.mouse(this)[0]);
            // var x = d3.mouse(this)[0];
            //var y = yAccessor; 
            var testTT = tooltip; 

            var x0 = xScale.invert(d3.mouse(this)[0]),
                i = bisectDate(dataset, x0, 1),
                d0 = dataset[i - 1],
                d1 = dataset[i],
                d = x0 - d0.datum > d1.datum - x0 ? d1 : d0;
            focus.attr("transform", "translate(" + xScale(d.datum) + "," + yScale(d.testTT) + ")");
            focus.select(".tooltip-date").text(dateFormatTT(d.datum));
            focus.select(".tooltip-likes").text(formatTT(d.testTT));

            //console.log(e); 


        }
    }
    /*-------------------------------------------------------------*/
}








// focus.select("line") //linie bewegt sich mit
//       .attr("transform", `translate(${x},${dimensions.boundH})`); 
//         //"translate(" + xScale(d.datum) + "," + dimensions.boundH + ")"); 

//     focus.selectAll(".circle") //kreis bewegt sich mit
//     . attr("transform", `translate(${x},${x})`);

//     // focus.select("text") //text bewegt sich mit
//     //   .attr("transform", `translate(${x},${dimensions.boundH})`)
//     //  .text('datum + erkrankungen');













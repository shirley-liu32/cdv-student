let w = 1200;
let h = 800;
let padding = 90

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender")
;


// IMPORT DATA
d3.json("mainland.geojson").then(function(geoData){
  d3.csv("china-pop-2018.csv").then(function(incomingData){

    incomingData.map(function(d,i){
      d.population = Number(d.population);
      return d;
    })
    console.log(incomingData);


    let minPop = d3.min(incomingData, function(d,i){
      return d.population;
    })
    console.log(minPop)
    let maxPop = d3.max(incomingData, function(d,i){
      return d.population;
    })
    console.log(maxPop)

    let colorScale = d3.scaleLinear().domain([minPop,maxPop]).range(["white","blue"]);
    console.log(colorScale(20));

    // PRINT DATA
    console.log(geoData);

    // SCALES (to translate data values to pixel values)
    // let xDomain = d3.extent(incomingData, function(d){ return Number(d.year); })
    // let xScale = d3.scaleLinear().domain(xDomain).range([padding,w-padding]);
    // let yDomain = d3.extent(incomingData, function(d){ return Number(d.birthsPerThousand); })
    // let yScale = d3.scaleLinear().domain(yDomain).range([h-padding,padding]);

    let projection = d3.geoEqualEarth()
      .translate([w/2,h/2])
      .fitExtent([[padding,padding], [w-padding,h-padding]], geoData)
      ;
    // PATH (line) MAKER - gets points, returns one of those complicated looking path strings
    // let lineMaker = d3.line()
    //     .x(function(d){
    //       return xScale(Number(d.year));
    //     })
    //     .y(function(d){
    //       return yScale(Number(d.birthsPerThousand));
    //     })
    // ;

    let pathMaker = d3.geoPath(projection);

    // CREATE SHAPES ON THE PAGE!
    viz.selectAll(".province").data(geoData.features).enter()
      .append("path")
        .attr("class", "province")
        .attr("d", pathMaker)
        .attr("fill", function(d,i){
          console.log(d.properties.name);

          //see if d.properties.name is in incomingData:
          let correspondingDatapoint = incomingData.find(function(datapoint){
            console.log(datapoint);
            if(datapoint.province == d.properties.name){
              return true;
            }
            else{
              return false;
            }
            })
            if(correspondingDatapoint != undefined){
              console.log(correspondingDatapoint.population);
              return colorScale(correspondingDatapoint.population)
            }
            else{
              return "black"
            }     
        })
        .attr("stroke", "red ")
    ;

  let lat = 31.22773;
  let long = 121.52946; 
  let pixelValue = projection([long, lat]); 

  viz.append("circle")
        .attr("cx", pixelValue[0])
        .attr("cy", pixelValue[1])
        .attr("r", 20)
        .attr("fill", "red")
  })

})

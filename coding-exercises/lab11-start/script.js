let wW = window.innerWidth;
let wH = window.innerHeight;
let gW = 700;
let gH = 450;
let paddingTop = (wH - gH)/2;
let paddingLeft = (wW - gW)/2;
// let w = 1200;
// let h = 800;
// let padding = 90

let viz = d3.select("#vizContainer").append("svg")
    .style("width", wW)
    .style("height", wH)
    .style("background-color", "lavender")
;

viz.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", wW)
  .attr("height", wH)
  .attr("fill", 0)
  .attr("opacity", 0.2)
;

let bothGraphs = viz.append("g").attr("class","bothGraphs");

// initialise scales
// let yScale = d3.scaleBand().range([padding, h-padding]);


// get data
d3.json("monarchs.json").then(function(incomingData){
  data = formatData(incomingData);
  let types = data.map(d=>d.type).filter(onlyUnique); //see onlyUnique function at bottom

// get list of types
let types = data.map(d=>d.type).filter(onlyUnique); //see onlyUnique function at bottom
 
// count datapoints within their types and add a key value pair to data point
let typeCount = {}
  types.forEach(d=>{
    typeCount[d] = 0;
  })
  // also find out the maximum number of fata points within one data type
  // it's type: military which contains 23 datapoints
  let maxTypeCount = 0;
  data.forEach(d=>{
    // console.log(d, typeCount[d.tpe])
    d.countInType = typeCount[d.type];
    typeCount[d.type]++
    maxTypeCount = Math.max(typeCount[d.type],maxTypeCount)
  })

  console.log(maxTypeCount)

  console.log(data)

  //build SCALES and AXES for both graphs

  //graph 1: Scales and Axis

  // xscale and axis
  let g1xScale = d3.scaleTime().range([paddingLeft, gW+paddingLeft]);
  g1xScale.domain( d3.extent(data, d=>d.date) )
  let g1xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%-Y"));
  let g1xAxisGroup = viz.append("g")
      .attr("class", "g1xaxisgroup")
      .attr("transform", "translate(0,"+(paddingTop + gH)+")")
  ;
  g1xAxisGroup.call(g1xAxis);


  //graph 2: Scales and Axis


  //build two functions that show data in each graph
  // function 1: 
  //         - deal with entering elements (when page is loaded)
  //         - deal with updating elements (when we transition backwards from graph2 to graoh1)
 
 // call function 1.




 // function 2:
 //         -deal with UPDATING elements (when we transition from graph1 to graph2)
 
 


 //set up enterVIEW listeners that
 //         - trigger the functions
 //         - trnaslate bothGraphs (the whole group)
 







  // //yscale and axis
  // yScale.domain(types);
  // let yAxis = d3.axisLeft(yScale);
  // let yAxisGroup = viz.append("g")
  //     .attr("class", "yaxisgroup")
  //     .attr("transform", "translate("+padding/2+",0)")

  // ;


  // yAxisGroup.call(yAxis);
  // // style the y axis
  // yAxisGroup.selectAll("line").attr("display", "none");
  // yAxisGroup.selectAll("path").attr("display", "none");
  // yAxisGroup.selectAll("text")
  //     .attr("text-anchor", "middle")
  //     .attr("transform", "rotate(-90)")
  //     .attr("x", "0")
  // ;


  // let graphGroup = viz.append("g").attr("class", "graphgroup");

  // let datagroups = graphGroup.selectAll(".datagroup").data(data).enter()
  //   .append("g")
  //     .attr("class", "datagroup")
  //     .attr("transform", function(d){
  //       console.log(d);
  //       return "translate("+ xScale(d.date) +","+ (yScale(d.type) + yScale.bandwidth()/2 )+")"
  //     })
  // ;

  // datagroups.append("circle")
  //   .attr("r", 10)
  //   .attr("opacity", 0.5)
  // ;







});


let timeParse = d3.timeParse("%Y");

function formatData(incoming){
  let keys = Object.keys(incoming.Dates);
  return keys.map((d)=>{
    incoming.Dates[d].date = timeParse(incoming.Dates[d].date)
    return incoming.Dates[d];
  });

}

//from: https://stackoverflow.com/a/14438954
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

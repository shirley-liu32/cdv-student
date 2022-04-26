let w = 1200;
let h = 800;
let padding = 90

let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "lavender")
;

let textElement = viz.append("text")
  .attr("class","description")
  .text("Historic Events")
  .attr("text-anchor", "middle")
  .attr("x", w/2)
  .attr("y", padding/2)


// initialise scales
let xScale = d3.scaleTime().range([padding, w-padding]);
let yScale = d3.scaleBand().range([padding, h-padding]);


// get data
d3.json("monarchs.json").then(function(incomingData){
  data = formatData(incomingData);
  let types = data.map(d=>d.type).filter(onlyUnique); //see onlyUnique function at bottom

  // xscale and axis
  xScale.domain( d3.extent(data, d=>d.date) )
  let xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%-Y"));
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-padding)+")")
  ;
  xAxisGroup.call(xAxis);
  //yscale and axis
  yScale.domain(types);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+padding/2+",0)")

  ;
  yAxisGroup.call(yAxis);
  // style the y axis
  yAxisGroup.selectAll("line").attr("display", "none");
  yAxisGroup.selectAll("path").attr("display", "none");
  yAxisGroup.selectAll("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", "0")
  ;


  let graphGroup = viz.append("g").attr("class", "graphgroup");

  let datagroups = graphGroup.selectAll(".datagroup").data(data).enter()
    .append("g")
      .attr("class", "datagroup")
      .attr("transform", function(d){
        console.log(d);
        return "translate("+ xScale(d.date) +","+ (yScale(d.type) + yScale.bandwidth()/2 )+")"
      })
      .on("mouseover", function(event, d){
        textElement.text(d.event);
        
        //which location should the tooltip go to?
        //OPTION 1: 
        // go to wherever the hovered element is using the same maths of the translation of it above:
        // textElement
        //   .attr("x", xScale(d.date))
        //   .attr("y". yScale(d.type) + yScale.bandwidth()/2)
        //   .attr("opacity",1)
        // ;

        //OPTION 2: in reference to the page
        //   textElement
        //   .attr("x", event.pageX)
        //   .attr("y". event.pageY)
        //   .attr("opacity",1)
        //  ;
       
        //OPTION 3: in reference to the window
        //  event.clientX
        //  event.clientY
        // textElement
        //   .attr("x", event.clientX)
        //   .attr("y", evenet.clientY)
        //   .attr("opacity",1)
        // ;

        //OPTION 4:
        //d3 has a function to calculate the mouse position in relation 
        //to any element of choice
        let mousePos = d3.pointer(event,this.parentNode)
        textElement
        .attr("x", mousePos[0])
        .attr("y", mousePos[1])
        .attr("opacity",1)
      ;

        //do somehing with the hovered element
          d3.select(this).select("circle")
            .attr("opacity",1)
          ;

          //do something else with all other elements
          //datagroups holds all elements including the one i hovered
          datagroups.filter(function(datapoint){
            //we loop over all elements
            // if one of them is the same as we hovered...
            if(datapoint == d){
              //then we return false to filter it out
              return false;
            }
            else{
              // otherwise return true to let it through
              return true;
            }
          }).select("circle") // at this point we only deal w elements we let through
            // .transition()
            // .delay(function (d,i){
            //   return i*2;
            // })
            .attr("opacity",0.1)
            .attr("r",5)
      }) 
      .on("mouseout",function(event,d){
        textElement.text("Historic Event")
        .attr("opacity",0)
        datagroups.select("circle")
          .attr("r", 10)
          .attr("opacity", 0.5)
      })
  ;

  datagroups.append("circle")
    .attr("r", 10)
    .attr("opacity", 0.5)
  ;

  // datagroups.append("text")
  //     .text(function(d,i){
  //       return d.event;
  //     })
  //     .attr("x",0)
  //     .attr("y", 23)
  //     .attr("text-anchor", "middle")
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

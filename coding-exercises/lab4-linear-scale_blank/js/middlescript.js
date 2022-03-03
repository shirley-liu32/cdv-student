let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "lightblue")
;

function gotData(incomingData){
  console.log(incomingData);

  // make 100 datagroups and add rectangle to each group
  //                                   0              100           100
  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
      .append("g")
        .attr("class","datagroup")
  ;

  // can use anonymous function or getHeight
  let maxHeight = d3.max(incomingData, function (datapoint){
    return datapoint.height;
  })

  // min and max at the same time
  // let heightExtent = d3.extent(incomingData, fucntion(datapoint){
  //   return datapoint.height;
  // })

  // yScale is now a function - we give value & expect a different value
  // building the scale          input min & max of tower height & output between 0 and height/2
  // half page taken by towers and other half by text
  // padding
  let padding = 20;
  let yScale = d3.scaleLinear().domain([0,830]).range([0,h/2-padding]);

  //set up color scale and then scale the number in getColor()
  let colorScale = d3.scaleLinear().domain( [0,maxHeight] ).range( ["black","yellow"] ); 
  console.log(colorScale(300)) 

  function getHeight(d,i){
    //console.log(d.height);
    let height = yScale(d.height);
    return height;
  }

  // pushing the towers up
  function getY(d,i){
    return -yScale(d.height)
  }

  function getColor(d,i){
    return colorScale(d.height);
  }
  let towers = datagroups.append("rect") 
    .attr("x", 0)
    .attr("y", getY) 
    .attr("width",20)
    .attr("height",getHeight)
    .attr("fill", getColor)
  ;

  function getName(d,i){
    return d.name;
  }
  let labels = datagroups.append("text")
    .attr("x",3) //vertical
    .attr("y",-5) //horizontal bc rotated 90
    .text(getName)
    .attr("transform", "rotate(90)")
  ;

  //position the datagroups
  function getPosition(d,i){
    let x = i * (w/100); // 22 = 2 pixels bigger than rectangle or w/100 w= width and we have 100 towers
    //move the groups to the middle of the page
    let y = h/2;
    return "translate("+x+","+y+")";
  }

  datagroups.attr("transform", getPosition);


}


d3.json("buildings.json").then(gotData);

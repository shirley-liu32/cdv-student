console.log("hi");
//data from https://towardsdatascience.com/how-to-build-animated-charts-like-hans-rosling-doing-it-all-in-r-570efc6ba382

let w = 1700;
let h = 1000;
let xPadding = 50;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
;

//create svg for key
let key = d3.select("#key")
  .append("svg")
    .attr("width", w)
    .attr("height", h)
;

//information for the key
key.append("text")
          .text("Asia")
          .attr("x", 1570)
          .attr("y", 55)
          .attr("font-size", "1.2em")
          .attr("fill","white")
;

key.append("text")
          .text("Africa")
          .attr("x", 1555)
          .attr("y", 105)
          .attr("font-size", "1.2em")
          .attr("fill","white")
;


key.append("text")
          .text("Oceania")
          .attr("x", 1530)
          .attr("y", 155)
          .attr("font-size", "1.2em")
          .attr("fill","white")
;


key.append("text")
          .text("Europe")
          .attr("x", 1545)
          .attr("y", 205)
          .attr("font-size", "1.2em")
          .attr("fill","white")
;

key.append("text")
          .text("Americas")
          .attr("x", 1520)
          .attr("y", 255)
          .attr("font-size", "1.2em")
          .attr("fill","white")
;
key.append("circle")
      .attr("r", 15)
      .attr("cx",1640)
      .attr("cy", 50)
      .attr("fill", "#9989b3")
      .attr("opacity", "0.8")
;

key.append("circle")
      .attr("r", 15)
      .attr("cx",1640)
      .attr("cy", 100)
      .attr("fill", "#A0B392")
      .attr("opacity", "0.8")
;

key.append("circle")
      .attr("r", 15)
      .attr("cx",1640)
      .attr("cy", 150)
      .attr("fill", "#F2A0A0")
      .attr("opacity", "0.8")
;

key.append("circle")
      .attr("r", 15)
      .attr("cx",1640)
      .attr("cy", 200)
      .attr("fill", "#F0BC68")
      .attr("opacity", "0.8")
;

key.append("circle")
      .attr("r", 15)
      .attr("cx",1640)
      .attr("cy", 250)
      .attr("fill", "#91D2D9")
      .attr("opacity", "0.8")
;

function gotData(incomingData){
  console.log(incomingData);

  // min max fertility rate (for xScale)
  let fertExtent = d3.extent(incomingData, function(d, i){
    return d.fert;
  });
  console.log("fertExtent", fertExtent);

  // make the xscale which we use to locate points along the xaxis
  let xScale = d3.scaleLinear().domain(fertExtent).range([xPadding, w-xPadding]);


  // min max life expectancy
  let lifeExtent = d3.extent(incomingData, function(d, i){
    return d.life;
  });
  console.log("lifeExtent", lifeExtent);

  // make the yscale which we use to locate points along the yaxis
  let yScale = d3.scaleLinear().domain(lifeExtent).range([h-yPadding, yPadding]);

  // using the function defined at the bottom of this script to build two axis
  buildXAndYAxis(xScale, yScale);


  // min max Population
  let popExtent = d3.extent(incomingData, function(d, i){
    return d.pop;
  });
  console.log("popExtent", popExtent);
  // you may use this scale to define a radius for the circles
  let rScale = d3.scaleLinear().domain(popExtent).range([5, 50]);




  // the simple out put of this complicated bit of code,
  // is an array of all the years the data talks about.
  // the "dates" array looks like:
  // ["1962", "1963", "1964", "1965", ... , "2012", "2013", "2014", "2015"]
  let dates = incomingData.reduce(function(acc,d,i){
    if(!acc.includes(d.year)){
      acc.push(d.year)
    }
    return acc
  }, [])

  console.log("dates", dates);

  // this block of code is needed to select a subsection of the data (by year)
  let currentYearIndex = 0;
  let currentYear = dates[currentYearIndex];
  function filterYear(d, i){
    if(d.year == currentYear){
      return true;
    }else{
      return false;
    }
  }

  //function to control changing locations - using the scales
  function getGroupLocation(d, i){
    let x = xScale(d.fert);
    let y = yScale(d.life);
    return "translate("+x+", "+y+")"
  }
  function getIncomingGroupLocation(d, i){
    let x = xScale(d.fert);
    let y = -100;
    return "translate("+x+", "+y+")"
  }

  // function getExitingGroupLocation(d, i){
  //   let x = xScale(d.x);
  //   let y = h+30;
  //   return "translate("+x+", "+y+")"
  // }

  //uses population for radius size of circle
  function getPopulation(d,i){
    return rScale(d.pop)*1.5;
  }

  //controls color of circle by continent
  function getColor(d,i){
    let color;
    if(d.continent == "Asia"){
      color = "#9989b3";
    }
    else if (d.continent == "Africa"){
      color = "#A0B392";
    }
    else if (d.continent == "Oceania"){
      color = "#F2A0A0";
    }
    else if (d.continent == "Europe"){
      color = "#F0BC68";
    }
    else if (d.continent == "Americas"){
      color = "#91D2D9";
    }
    else{
      color = "black";
    }
    return color;
  }

//border color of circle
function getDarkerColor(d,i){
    let color;
    if(d.continent == "Asia"){
      color = "#625080";
    }
    else if (d.continent == "Africa"){
      color = "#768a69";
    }
    else if (d.continent == "Oceania"){
      color = "#cc7c7c";
    }
    else if (d.continent == "Europe"){
      color = "#c98920";
    }
    else if (d.continent == "Americas"){
      color = "#64969c";
    }
    else{
      color = "black";
    }
    return color;
  }

//get country name
function getCountry(d,i){
  return d.Country;
}

//controls country name location when hovering
function textX(d,i){
  return -rScale(d.pop)*.2;
}
function textY(d,i){
  return rScale(d.pop)/2.3;
}

//hides and shows text when hovering
function mouseOver(d, i) {
  d3.select(this).style("opacity", 1);

}
function mouseOut(d, i) {
  d3.select(this).style("opacity", 0)
}

  // make a group for all things visualization:
  let vizGroup = viz.append("g").attr("class", "vizGroup");


  // this function is called every second.
  // inside it is a data variable that always carries the "latest" data of a new year
  // inside it we want to draw shapes and deal wirth both updating and entering element.
  function drawViz(){

    let currentYearData = incomingData.filter(filterYear);
    console.log("---\nthe currentYearData array now carries the data for year", currentYear);


    // Below here is where your coding should take place! learn from lab 6:
    // https://github.com/leoneckert/critical-data-and-visualization-spring-2020/tree/master/labs/lab-6
    // the three steps in the comments below help you to know what to aim for here

    //uses to control labeling - d3 knows each data point by name - not numbers
    function assignKeys(d,i){
      return d.Country;
    }
    // bind currentYearData to elements

    let datagroups = vizGroup.selectAll(".datagroup").data(currentYearData, assignKeys);
    
    datagroups.transition().duration(500).attr("transform", getGroupLocation);
    
    

    // take care of entering elements

    let enteringElements = datagroups.enter()
      .append("g")
      .attr("class", "datagroup")
    ;

    enteringElements.append("circle")
      .attr("r", getPopulation)
      .attr("fill", getColor)
      .style("stroke", getDarkerColor) 
      .attr("opacity",".8")
    ;
   
    //hover to see country name
    enteringElements.append("text")
      .text(getCountry)
      .attr("x", textX)
      .attr("y", textY)
      .attr("font-size", ".8em")
      .style("font-family", "sans-serif")
      .attr("fill","white")
      .style("opacity", "0")
      .on("mouseover", mouseOver)
      .on("mouseout", mouseOut)
    ;

    enteringElements.attr("transform", getIncomingGroupLocation).transition().delay(500).attr("transform", getGroupLocation);

    // take care of updating elements

    // let exitingELements = datagroups.exit();
    // exitingELements.remove();



  }




  // this puts the YEAR onto the visualization
  let year = viz.append("text")
      .text("")
      .attr("x", 100)
      .attr("y", h-100)
      .attr("font-family", "sans-serif")
      .attr("font-size", "2.7em")
      .attr("fill","white")


  ;

  // this called the drawViz function every second
  // and changes the year of interest
  // and updates the text element that displays the year.
  setInterval(function(){
    currentYearIndex++;
    if(currentYearIndex>dates.length){
      currentYearIndex = 0;
    }
    currentYear = dates[currentYearIndex];
    year.text(currentYear)
    drawViz();
  }, 1000);






}


// load data
d3.csv("data.csv").then(gotData);





// function to build x anc y axis.
// the only reasons these are down here is to make the code above look less polluted

function buildXAndYAxis(xScale, yScale){
  let xAxisGroup = viz.append("g").attr("class", 'xaxis');
  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis)
  xAxisGroup.attr("transform", "translate(0, "+ (h-yPadding) +")")
  xAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate("+w/2+", 40)")
    .append("text")
    .attr("fill", "white")
    .text("Fertility")
    .attr("font-size", "1.8em")

  ;

  let yAxisGroup = viz.append("g").attr("class", 'yaxis');
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis)
  yAxisGroup.attr("transform", "translate("+xPadding+", 0)")

  yAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate(-35, "+h/2.4+") rotate(-90)")
    .append("text")
    .attr("fill", "white")
    .text("Life Expectancy")
    .attr("font-size", "1.8em")

  ;
}

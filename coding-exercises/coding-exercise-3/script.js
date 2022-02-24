let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id", "viz")
                    .attr("width", 1300)
                    .attr("height", 800)
;

viz.attr("height", 600);


function randomNum( whatDoesD3pass ){
    console.log(whatDoesD3pass)
    return Math.random()*500;
}
function randomXNum(whatDoesD3pass) {
    return Math.random() * (900-600) + 600;
}

function xPos(d, i){
    console.log("D3 passed", d, "into my xPos function!")
    console.log("D3 also passed", i)
    return i + 800;
}

function getThoughts(d,i){
    return d.thoughts;
}
function getRating(d,i){
    return 2*d.rating;
}
function getRatingSquare(d,i){
    return d.rating *.5;
}
function getTime(d,i){
    return 15*d.timeOfDay;
}
function getColor(d, i) {
    let color;
    if (d.typeOfDrink === "Water") {
        color = "#A9D3FD"
    }
    else if (d.typeOfDrink == "Rose Latte"){
        color = "#FCBDFF"
    }
    else if (d.typeOfDrink == "Soda") {
        color = "#FF5A75"
    }
    else if (d.typeOfDrink == "Lemon Tea"){
        color = "#9BFF87"
    }
    console.log(color)
    return color;
}
  
function getLoc(d,i){
    console.log(d.location)
    return d.location;
}

function gotData(newData){
    console.log(newData)
    
    viz.selectAll("rect").data(newData).enter().append("rect")
                                                .attr("x", xPos)
                                                .attr("y", getTime)
                                                .attr("width", getRatingSquare)
                                                .attr("height", getRatingSquare)
                                                .attr("fill", getColor)
                                                .style("stroke", "black")
                                                .style("stroke-width",.5)
    ;
    viz.selectAll("text").data(newData).enter().append("text")
                                                .text(getThoughts)
                                                .attr("x", getRating)
                                                .attr("y", getTime)
                                                .attr("fill", getColor)
                                                .style("font-family", "Helvetica")
                                                .style("font-size","20")
    ;

}


d3.json("beverages.json").then(gotData)
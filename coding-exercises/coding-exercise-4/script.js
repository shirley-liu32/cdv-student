// variable for svg
let viz = d3.select("#viz-container")
                .append("svg")
                    .attr("id", "viz")
                    .attr("width", 1300)
                    .attr("height", 500)
                    .style("background-color", "lavender")
;

function translateGroup(d, i){
    // let x = Math.random()*600;
    let x = 50 + i * 100;
    // let y = Math.random()*400;
    let y = 100;
    return "translate("+x+", "+y+")"
}

function getText(d, i){
    return d.name;
}

function getCast(d, i){
    return d.cast;
}

function getLiked(d,i){
    console.log(d.iLikedIt)
    return d.iLikedIt*400;
}

function getNumEpisodes(d,i){
    return d.numberOfEpisodes*50;
}

function getColor(d, i) {
    let color;
    if (d.genre === "Drama") {
        color = "#FFA1A1"
    }
    else if (d.genre == "Reality TV"){
        color = "#FBFFDE"
    }
    else if (d.genre == "Thriller"){
        color = "#D7FDDF"
    }
    else if (d.genre == "Crime-Drama"){
        color = "#D0D0FE"
    }
    else if (d.genre == "Comedy-Drama"){
        color = "#F9DEFF"
    }
    else if (d.genre == "True Crime"){
        color = "#E0FFFD"
    }
    else if (d.genre == "Medical-Drama"){
        color = "#C1E7E3"
    }
    else if (d.genre == "Family"){
        color = "#FFDAC1"
    }
    console.log(color)
    return color;
}



function getColorLang(d, i) {
    let color;
    if (d.language == "English") {
       color = "1";
    }
    else if (d.language == "Cantonese"){
       color = ".75";
    }
    else if (d.language == "Korean"){
        color = ".5";
    }
    else if (d.language == "English & French"){
        color = ".25";
    }    
    return color;
}


// font-sizing based on node from https://javascript.tutorialink.com/d3-js-auto-font-sizing-based-on-nodes-individual-radius-diameter/
function getSize(d) {
var bbox = this.getBBox(),
    cbbox = this.parentNode.getBBox(),
    scale = Math.min(cbbox.width/bbox.width, cbbox.height/bbox.height);
d.scale = scale;
}


function gotData(incomingData){
    console.log("the incoming data is:" , incomingData)
    

    // diamond depending on rating
    let diamondRating = d3.symbol()
                        .type(d3.symbolDiamond).size(getLiked);

    // diamond depending on number of episodes                  
    let diamondEpisodes = d3.symbol()
                        .type(d3.symbolDiamond).size(getNumEpisodes);

    // size 200 diamond for lang
    let circle = d3.symbol()
                        .type(d3.symbolTriangle).size(250);
    
    let datagroups = viz.selectAll(".datagroup").data(incomingData).enter().append("g")
                                                            .attr("class", "datagroup")
    ;
    // represents number of episodes - size of diamond
    // genre - color
    datagroups.append("path")
                .attr("d", diamondEpisodes)
                .attr("fill", getColor)
                .style("opacity","0.75")
                .attr("transform", "translate(0,50)")
    ;

    // represents rating - size of diamond
    // genre - color
    datagroups.append("path")
                .attr("d", diamondRating)
                .attr("fill", getColor)
                .attr("transform", "translate(23,50)")
    ;

    // represents language - opacity level
    datagroups.append("path")
                .attr("d", circle)
                .style("fill", "white")
                .attr("opacity", getColorLang)
                .attr("transform", "translate(-5,70)")
    ;
    datagroups.append("text")
                .text(getText)
                .style("font-size", "1px")
                .attr("y",150)
                .style("text-align","center")
                .each(getSize)
                .style("fill", "white")
                .style("font-size", function(d) { return d.scale + "px"; })
    ;
    datagroups.append("text")
                .text(getCast)
                .style("font-size", "1px")
                .attr("y",180)
                .style("text-align","center")
                .style("fill", "white")
                .each(getSize)
                .style("font-size", function(d) { return d.scale + "px"; })
    ;
    datagroups.attr("transform", translateGroup);
    

}


d3.json("data.json").then(gotData)
let w = 2400;
let h = 800;

let viz = d3.select("#container")
  .append("svg")
    .attr("class", "viz")
    .attr("width", w)
    .attr("height", h)
    .style("background-color", "#FFF8E5")
;

//table locations
viz.append("svg:image")
        .attr('x', 600)
        .attr('y', 50)
        .attr("xlink:href", "assets/bartable.png")
;

viz.append("svg:image")
        .attr('x', 250)
        .attr('y', 120)
        .attr("xlink:href", "assets/squaretab.png")
;

// controls the group locations - seen by where the cups are
function translateGroup(d, i){
    // let x = Math.random()*600;
    let x = 50 + i * 100;
    // let y = Math.random()*400;
    let y = 100;
    if (i < 10){
       
        if (i == 1){
            y = 280;
            x = 200;
        }
        else{
            y = 150;
            x = 200 + i * 180;
        }    
    }
    else{
        x = 20 + i * 200 - 2000 ;
        y = 550;
        console.log("second row x is " + x)
    }
    // if (i == 1){
    //     x = 10;
    //     y = 100;
    // }
    // else if (i == 2){
    //     x = 5;
    //     y = 200;
    // }
    return "translate("+x+", "+y+")"
}

function gotData(incomingData){

    let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
      .append("g")
        .attr("class","datagroup")
    ;
    console.log(incomingData)

    // controls the color of the beverage
    function getBevColor(d, i) {
        let bevColor;
        if (d.beverage == "Green Tea") {
           bevColor = "#D3E1A2";
        }
        else if (d.beverage == "Water"){
           bevColor = "#A2CFE1";
        }
        else if (d.beverage == "Dirty Matcha"){
            bevColor = "#BAE1A2";
        }
        else if (d.beverage == "Milk Tea"){
            bevColor = "#F3D6B0";
        }
        else if (d.beverage == "Coffee"){
            bevColor = "#A9744F";
        }
        else if (d.beverage == "Carrot Juice"){
            bevColor = "#FBB374";
        }
        else if (d.beverage == "Protein Shake"){
            bevColor = "#FFAABA";
        }
        else if (d.beverage == "Tequila Sunrise"){
            bevColor = "#F6A7A1";
        }
        else if (d.beverage == "Mango Tea"){
            bevColor = "#F6C5A1";
        }
        else if (d.beverage == "Apple Cider"){
            bevColor = "#F8E0A2";
        }
        console.log(bevColor)
    
        return bevColor;
    }
    function getNumEpisodes(d,i){
        return d.timeOfDay*50;
    }

    // controls the location of the handle depending on the time
    function handleLocation(d,i){
        let hLoc;
        if (d.timeOfDay == 19){
            hLoc = "translate(165,75)";
        }
        else if (d.timeOfDay == 13){
            hLoc = "translate(235,35)";
        }

        else{
            hLoc = "translate(230,80)";

        }
        return hLoc;
    }
    
    let cup = d3.symbol()
                                .type(d3.symbolCircle).size(5000);
    
    let bev = d3.symbol()
                                .type(d3.symbolCircle).size(3000);

    let handle = d3.symbol()
                        .type(d3.symbolCircle).size(300);
    datagroups.append('path')
                .attr("d", cup)
                .attr('fill', 'white')
                .attr("transform", "translate(200,50)")
    ;


    datagroups.append('path')
                .attr("d", bev)
                .attr('fill', getBevColor)
                .attr("transform", "translate(200,50)")
    ;

    datagroups.append('path')
                .attr("d", handle)
                .attr('fill', "white")
                .attr("transform", handleLocation)
    ;
    datagroups.attr("transform", translateGroup);


}   


d3.json("data.json").then(gotData);

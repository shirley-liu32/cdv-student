// var audio = new Audio('assets/netflix_intro.mp3');

// function playSound(){
//     audio.play();
// }
// IMPORT DATA
d3.json("data/countries.geojson").then(function(geoData){
    d3.csv("data/netflixTopTen.csv").then(function(incomingData){
        
    // Section for country and show details 
    // netflix data
    //console.log(incomingData);

    // group netflix data by name of country since there are ten entries for each country
    // structure of the data
    // one big array of everything - 93 Arrays with 2 things inside
    // first is country name
    // second is an array of the ten entries for the country
    let showsByCountry = Array.from(d3.group(incomingData, d => d.country))
      console.log(showsByCountry)
      console.log(showsByCountry[0]) // ['Argentina', Array (10)]
      console.log(showsByCountry[0][1]) // [Array (10)]
      console.log(showsByCountry[0][1][0]) // gives the number 1 ranked movie of Argentina in that week
      console.log(showsByCountry[0][1][0].showTitle) // gives the showTitle of the number 1 ranked movie of Argentina

    let netflixCountries = [];

    for (let i = 0; i < showsByCountry.length; i++){
        for(let j=0; j <= 1; j++){
            // prints country name
            if (j == 0){
                netflixCountries += showsByCountry[i][j] + ",";
                // console.log(showsByCountry[i][j]);
            }
            // prints the list of the 10 movies and details
            if(j == 1){
                for(let k = 0; k < 10; k++){
                    // console.log(k+1 + ": " + showsByCountry[i][j][k].showTitle)
                    // console.log("Genre: " + showsByCountry[i][j][k].genre)
                    // console.log("Cast: " + showsByCountry[i][j][k].cast)
                    // console.log("Description: " + showsByCountry[i][j][k].description)
                    // console.log("Rating: " + showsByCountry[i][j][k].rating)
                }
            }

        }
    }
    // all the countries in Netflix data set
    let separatedCountries = netflixCountries.split(",");
    console.log("Netflix Countries Array: " + separatedCountries[1])


    // data for countries map - feature collection
    //console.log(geoData);

    // section for dealing with the map
    // visualization section


    let w = 1200;
    let h = 700;
    let padding = 50
    const config = {
        speed: 0.010,
        verticalTilted: -10,
        horizontalTilted: 0
    }

    // main map svg
    let viz = d3.select("#container").append("svg")
        .style("width", w)
        .style("height", h)
        .style("background-color", "black")
    ;
    let namesBox = d3.select("#names").append("svg")
        .style("width", 200)
        .style("height", 100)
        .style("background-color", "yellow")
    ;
    let projection = d3.geoOrthographic()
        .translate([w/2,h/2])
        .center([0,0])
        .fitExtent([[padding,padding],[w-padding,h-padding]],geoData)
        .clipAngle(90)
        .rotate([0,0])
    ;

    let pathMaker = d3.geoPath(projection);

    rotate();

    let mouseOver = function(d) {
        d3.selectAll(".country")
          .transition()
          .duration(200)
          .style("opacity", .5)
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 1)
        ;
    }
    //     namesBox.selectAll(".names")
    //       .data(geoData.features).enter()
    //       .append("text")
    //       .text(function(d){
    //           d.properties.name;
    //       })
    //       .attr("fill","red")
    //       .attr("transform",function(d){                 
    //           var p = projection(d3.geoCentroid(d));
    //           return "translate("+p+")";
    //   })
    
    

    let mouseLeave = function(d) {
        d3.selectAll(".country")
            .transition()
            .duration(200)
            .style("opacity", 1)
        d3.select(this)
            .transition()
            .duration(200)
            .style("opacity", .5)
    }

    

    viz.selectAll(".country").data(geoData.features).enter()
        .append("path")
            .attr("class", "country")
            .attr("d", pathMaker)
            .attr("fill",
            function(d,i){
                console.log(d.properties.name);
                if (separatedCountries.includes(d.properties.name)){
                    return "white";
                }
                else{
                    console.log("Missing: " + d.properties.name)
                    return "black";
                }
            }            
            )
            .attr("stroke", "#E50914")
            .on("mouseover", mouseOver)
            .on("mouseleave", mouseLeave)
    ;




    // rotation function from geeksforgeeks: https://www.geeksforgeeks.org/d3-js-geoorthographic-function/
    function rotate(){
        d3.timer(function(elasped) {
            projection.rotate (
                [config.speed*elasped -120,
                config.verticalTilted,
                config.horizontalTilted]);
                viz.selectAll("path").attr("d", pathMaker)
        });
    }



  
    })
  
  })

// Word Cloud from https://d3-graph-gallery.com/graph/wordcloud_size.html  

// List of words
var myWords = [{word: "Crime", size: "20"}, {word: "Romantic", size: "30"}, {word: "Drama", size: "60"}, {word: "Thriller", size: "20"}, {word: "Reality TV", size: "20"}, {word: "Comedy", size: "10"},
{word: "Docuseries", size: "10"} ,{word: "Action", size: "10"}, {word: "Animation", size: "10"}, {word: "Kids Show", size: "10"}   ]

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 850 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

var wordViz = d3.select("#wordViz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// new cloud layout instance - find the position of words that suits your requirements
var layout = d3.layout.cloud()
    .size([width, height])
    .words(myWords.map(function(d) { return {text: d.word, size:d.size*2}; }))
    .padding(15)        
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .fontSize(function(d) { return d.size; })      
    .on("end", draw);
layout.start();

function draw(words) {    
    wordViz.append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
                .data(words)
            .enter().append("text")
                .style("font-size", function(d) { return d.size; })
                .style("fill", "#E50914")
                .attr("text-anchor", "middle")
                .style("font-family", "Helvetica")
                .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
}


function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
}

window.addEventListener("scroll", reveal);
reveal();

d3.csv("data/globalTop.csv").then(function(globalTopData){
  
    let engList = document.getElementById("englishList");
    let nonEngList = document.getElementById("nonEnglishList");

    let topEng = "";
    let topNonEng = "";
    let weeklyHrs = "";
    for (let i = 0; i < globalTopData.length; i++){
        if (i < 10){
            topEng += i+1 + ". " + globalTopData[i].showTitle +  ", " + globalTopData[i].seasonTitle + globalTopData[i].category + "<br><br>";
        }
        if (i >= 10){
            topNonEng += i-10+1 + ". " + globalTopData[i].showTitle +  ", " + globalTopData[i].seasonTitle + globalTopData[i].category + "<br><br>";
        }
        weeklyHrs += globalTopData[i].showTitle + ", " + globalTopData[i].weeklyHours + "<br><br>";
    }

    // list for english shows 
    engList.innerHTML +=  topEng;
    nonEngList.innerHTML +=  topNonEng;

    // number of hours along with title of show
    let separatedHrs = weeklyHrs.split(",");
    console.log(separatedHrs); 
    
    let hours = document.getElementById("hours");
    hours.innerHTML += separatedHrs;


})
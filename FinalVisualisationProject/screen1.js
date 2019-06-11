$( document ).ready(function() {
  
selected = 0;
    
    

    
    
    var stateNameForAbb;
d3.json("data/stateName.json",function(error, data) {

    stateNameForAbb = data;
});
    
function renderPieChart(s)
    {
        
        
        
        
        d3.json("data/states.json",function(error, data) {

            stateMembers = 0;
            totalMembers = 0;
            stateName = "";
for (var key in data) {
    
    totalMembers = totalMembers + data[key];
    if(s == key)
        {
            stateMembers = data[key];
            stateName = key
        }
}

            

            
 


statePercent = (stateMembers/totalMembers)*100;
RestOfUsa = 100 - statePercent;

var data1 = [
    {"label":s, "value":statePercent},
    {"label":"Rest of USA", "value":RestOfUsa}
];
$("#pieC").empty();
$("#pieC").append("<html><div style='color:white;float:left;margin-left:9%'> State Name:"+stateName+" &nbsp                         &nbsp Total Members      &nbsp"+stateMembers+"</div><div style='color:red;margin-top:30px;margin-left:20%;font-size:22px'><u>Percentage Members</u></div> <div class='textDecorate'>"+Math.ceil(data1[0].value)+"%</div></html>")       
            
            
        });
        
        
        
       
        
        
        
        
        
    }
    
    
    
    
    
    
    
    
    
    
    

    
function changeBarChart(s)
    {

    
var margin = {top: 54, right: 60, bottom: 107, left: 120},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  
var x = d3.scale.linear().range([0, width]);

var y = d3.scale.ordinal().rangeRoundBands([0, height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
		.ticks(10);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    
svg1 = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
                            .attr("id","barChart")

  .append("g")

    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  
    svg1.append("text")
    .attr("x", 0)
    .attr("y", -35)
    .attr("id","barChart")
    .attr("dy", "0.71em")
    .text("Top 10 Cities having the highest Meetup Members in " + s)
    .style("font", "23px avenir")
    .style("fill", "white");
  
    svg1.append("text")
    .attr("x", -69)
    .attr("y", -8)
    .attr("dy", "0.71em")
    .attr("fill", "white")
    .text("Cities")
    .style("font", "12px avenir")
    .style("fill", "white")
    .style("font-weight", "bold");
  
     svg1.append("text")
    .attr("x", 0)
    .attr("y", 400)
    .attr("dy", "0em")
    .style("font", "12px avenir")
    .style("fill", "white")
    .text("This visualization depicts the number of members in the top 10 cities in "+s+", United States of America ");
  


d3.json("data/cities.json",function(error, data) {
      
  if (error) throw error;
        
        var filtered=data.filter(function(item){
                return item.state==s;         
                });

           filtered.sort(function(a, b){
                return b.members - a.members;
            });

    data = filtered.splice(0,10)
    
 	x.domain([0, d3.max(data, function(d) {
              return d.members;
            })]);
  y.domain(data.map(function(d) {return d.city; }));

  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")

  svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
//       .text("Value ($)");


  
   svg1.append("text")
    .attr("x", 350)
    .attr("y", 370)
    .attr("dy", "0.71em")
    .attr("fill", "white")
    .text("Number of Members")
    .style("font", "12px avenir")
    .style("fill", "white")
    .style("font-weight", "bold");
    
    
    
    
    function tryMe(d)
    {
        
        
        return y(d.city)
    }
    
    
    
    
    
      svg1.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
  		.attr("y", tryMe)
      .attr("width", function(d) { return x(d.members);} )
      .attr("height", 13)
        
    
    

    });
	
        
        
        
        
        
    }
    
function renderBarChart()
    {
            
        
var margin = {top: 54, right: 60, bottom: 107, left: 120},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  
var x = d3.scale.linear().range([0, width]);

var y = d3.scale.ordinal().rangeRoundBands([0, height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
		.ticks(10);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    
svg1 = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
            .attr("id","barChart")

  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  
    svg1.append("text")
    .attr("x", 0)
    .attr("y", -35)
    .attr("dy", "0.71em")
    .attr("fill", "white")
    .text("Top 10 States having the highest Meetup Members")
    .style("font", "23px avenir")
    .style("fill", "white");
  
    svg1.append("text")
    .attr("x", -69)
    .attr("y", -8)
    .attr("dy", "0.71em")
    .attr("fill", "#000")
    .text("States")
    .style("font", "12px avenir")
    .style("fill", "white")
    .style("font-weight", "bold");
  
     svg1.append("text")
    .attr("x", 0)
    .attr("y", 400)
    .attr("dy", "0em")
    .style("font", "12px avenir")
    .style("fill", "white")
    .text("This visualization depicts the number of members in the top 10 states in United States of America ");
  


d3.json("data/states.json",function(error, data) {
      
  if (error) throw error;
        
d3.json("data/stateName.json",function(error, data1) {

var sortable = [];
    
    
    
    
    
for (var key in data) {
    for(yu=0;yu<data1.length;yu++)
        {
            if(key == data1[yu].abbreviation)
                {
    sortable.push({value: data[key], city: data1[yu].name});
                }
        }
}
    
    

                sortable.sort(function(a, b){
                return b.value - a.value;
            });

    data = sortable.splice(0,10)
    
 	x.domain([0, 1000000]);
  y.domain(data.map(function(d) {return d.city; }));

  svg1.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")

  svg1.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")


  
   svg1.append("text")
    .attr("x", 350)
    .attr("y", 370)
    .attr("dy", "0.71em")
    .attr("fill", "#000")
    .text("Number of Members")
    .style("font", "12px avenir")
    .style("fill", "#000000")
    .style("font-weight", "bold");
    
    
    
    
    function tryMe(d)
    {
        
        
        return y(d.city)
    }
    
    
    
    
    
      svg1.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
  		.attr("y", tryMe)
      .attr("width", function(d) { return x(d.value);} )
      .attr("height", 13)
        
    });

    

    });
	
  
    
    }
    
var width = 960,
	height = 500;
    var centered;
 
var svg = d3.select('#mapChart').append('svg') //prashanth
	.attr('width', width)
    .attr("id","mapSvg")
	.attr('height', height)
  .append("g");
  
    
    
    
    
    svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)

    .on("click", clicked);

    svg = svg.append("g");
    
    

    
    function plotFilteredPoints(filtered)
    {
        
        
svg.selectAll("circle").data(filtered)
  .enter()
  .append("circle")
  .attr("r", 1)
  .attr("cx", function(d) {return projection([d.lon,d.lat])[0]})
  .attr("cy", function(d) {return projection([d.lon,d.lat])[1]})
  .style("fill", "red");
        
        
svg.selectAll(".labels")
              .data(filtered)
              .enter().append("text")
              .attr("class", "labels")
              .text(function(d) { return d.city; })
              .attr("x", function(d) {
                  return projection([d.lon, d.lat])[0];
              })
              .attr("y", function(d) {
                  return projection([d.lon, d.lat])[1];
              })
              .attr('font-size', '0.25em')
        .style("fill","white");    
    }
    
    
    function plotPointsForCities(d)
    {
        a = [];
        d3.json('data/cities.json',function(error,cities) {
            
            
               var filtered=cities.filter(function(item){
                return item.state==d.properties.STATE_ABBR;         
                });

            filtered.sort(function(a, b){
                return parseInt(b.members) - parseInt(a.members);
            });
           plotFilteredPoints(filtered.splice(0,9)) 
            
        });

    }
    

    
function deletePointsForCities()
    {
        svg.selectAll('circle').remove(); 
        svg.selectAll(".labels").remove();

    }
    
function clicked(d) {
  var x, y, k;

  if (d && centered !== d && selected == 0) {
            plotPointsForCities(d);
    $("#barChart").remove();
      
      $("#piChart").hide();
      
        selected =1;
        changeBarChart(d.properties.STATE_ABBR);
      renderPieChart(d.properties.STATE_ABBR);
    var centroid = path.centroid(d);
    x = centroid[0];
    y = centroid[1];
    k = 3;
    centered = d;
      
  } else {
      
        $("#pieC").empty();
      d3.json("data/states.json",function(error, data) {

            totalMembers = 0;
for (var key in data) {
    
    totalMembers = totalMembers + data[key];
}

$("#pieC").append("<html><div style='color:white;float:left;'>Meetup was founded in June 2002 by Scott Heiferman and five co-founders.Total number of members are increasing in an exponential phase. Currently It has a total of </div><div style='margin-top:30px;color:red;float:left;margin-left:25%;font-size:29px'>"+totalMembers+" members</div></html>")       




        });
      selected = 0;
    x = width / 2;
    y = height / 2;
    k = 1;
    centered = null;
    deletePointsForCities();
    $("#barChart").remove();
      renderBarChart();
  }

  svg.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });

  svg.transition()
      .duration(750)
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
      .style("stroke-width", 1.5 / k + "px");

    
}
    
    
    
var projection = d3.geo.albersUsa()
	.scale(1000)
	.translate([width/2 , height/2 ]);

var path = d3.geo.path()
	.projection(projection);
 var color = d3.scale.linear()
          .range(["rgb(237, 248, 233)", "rgb(186, 228, 179)", "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);

d3.json('data/states.json',function(error,stat) {
            
            
    
    
    
        
	var color = d3.scale.threshold()
		.domain([1000, 10000,50000, 100000,200000, 300000, 400000])
		.range(["#fff7bc", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#993404", "#662506"]);
    
  var ext_color_domain = [1000, 10000, 50000, 100000, 200000, 300000, 400000 ]
  var legend_labels = ["< 1k", "10k+", "50k+", "100k+", "200k+", "300k+", ">400k"]              

d3.json('usaJson.json', function(error, us) {
    
    
    
    
        json = us
    for(var key in stat){
          var dataState = key;

          var dataValue = parseFloat(stat[key]);

          for(var n = 0; n < json.objects.usStates.geometries.length; n++){
            var jsonState = json.objects.usStates.geometries[n].properties.STATE_ABBR;
            if(dataState == jsonState){
              json.objects.usStates.geometries[n].properties.value = dataValue;

              break;
            }
          }
        }

    
    
    
    
            var div = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);
    
    
                var div1 = d3.select("body").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);
    
    
	svg.selectAll('.states')
		.data(topojson.feature(us, us.objects.usStates).features)
		.enter()
		.append('path')
		.attr('d', path)
    .attr("stroke","black").attr("stroke-width","1px")
        .on("click", clicked)

		.on('mouseover', function(d){
        
div.transition()
                .duration(200)
                .style("opacity", .9);
        toShow = "";
        for(qw = 0 ;qw<stateNameForAbb.length;qw++)
            {
                if(stateNameForAbb[qw].abbreviation == d.properties.STATE_ABBR)
                    {
                        toShow = stateNameForAbb[qw].name;
                    }
            }
        			div.html("Name: "+ toShow + "<br/> Total Members: "+d.properties.value)	
                .style("left", (d3.event.x + 10) + "px")		
                .style("top", (d3.event.y - 10) + "px");	

            $(this).attr("stroke","black").attr("stroke-width","4px");
		}).style("fill", function(d){
        
            var value = d.properties.value;

            if(value){
                
              return color(value);
            } else {
              return "#ccc"
            }

          })
        .on("mouseout", function(d)
                        {
                                        $(this).attr("stroke","black").attr("stroke-width","1px");
                    div.transition()		
                .duration(500)		
                .style("opacity", 0);	    

                        });
 
    
   
    
  svg.selectAll("path")
      .classed("active", centered && function(d) { return d === centered; });
    
    svg.selectAll("text")
    .data(topojson.feature(us, us.objects.usStates).features)
    .enter()
    .append("svg:text")
    .text(function(d){
        return d.properties.STATE_ABBR;
    })
    .attr("x", function(d){
        return path.centroid(d)[0];
    })
    .attr("y", function(d){
        return  path.centroid(d)[1];
    })
    .attr("text-anchor","middle")
    .attr('font-size','6pt')
    .style("fill","black");


    var legend = svg.selectAll("g.legend")
  .data(ext_color_domain)
  .enter().append("g")
  .attr("class", "legend");

  var ls_w = 20, ls_h = 20;

  legend.append("rect")
  .attr("x", 20)
  .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
  .attr("width", ls_w)
  .attr("height", ls_h)
  .style("fill", function(d, i) { return color(d); })
  .style("opacity", 0.8);

  legend.append("text")
  .attr("x", 50)
  .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
  .text(function(d, i){ return legend_labels[i]; });

    
    

    renderBarChart();
    
    
    
    
    
    
    
    
});
    
   
    
});
   
    
   

        d3.json("data/states.json",function(error, data) {

            totalMembers = 0;
for (var key in data) {
    
    totalMembers = totalMembers + data[key];
}

$("#pieC").append("<html><div style='color:white;float:left;'>Meetup was founded in June 2002 by Scott Heiferman and five co-founders.Total number of members are increasing in an exponential phase. Currently It has a total of </div><div style='margin-top:30px;color:red;float:left;margin-left:25%;font-size:29px'>"+totalMembers+" members</div></html>")       




        });
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        
var margin = {top: 54, right: 60, bottom: 107, left: 120},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  
var x = d3.scale.linear().range([0, width]);

var y = d3.scale.ordinal().rangeRoundBands([0, height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
		.ticks(10);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    
svg10 = d3.select("#cityWiseBarChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("margin-left", "13%")

  .append("g")

    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  
    svg10.append("text")
    .attr("x", 0)
    .attr("y", -35)
    .attr("id","barChart")
    .attr("dy", "0.71em")
    .text("Top 10 Cities having the highest Meetup Members in whole of USA")
    .style("font", "23px avenir")
    .style("fill", "white");
  
    svg10.append("text")
    .attr("x", -69)
    .attr("y", -8)
    .attr("dy", "0.71em")
    .attr("fill", "white")
    .text("Cities")
    .style("font", "12px avenir")
    .style("fill", "white")
    .style("font-weight", "bold");
  
     svg10.append("text")
    .attr("x", 0)
    .attr("y", 400)
    .attr("dy", "0em")
    .style("font", "12px avenir")
    .style("fill", "white")
    .text("This visualization depicts the number of members in the top 10 cities in United States of America ");
  


d3.json("data/cities.json",function(error, data) {
      
  if (error) throw error;


           data.sort(function(a, b){
                return b.members - a.members;
            });

    data = data.splice(0,10)
    
 	x.domain([0, d3.max(data, function(d) {
              return d.members;
            })]);
  y.domain(data.map(function(d) {return d.city; }));

  svg10.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")

  svg10.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
//       .text("Value ($)");


  
   svg10.append("text")
    .attr("x", 350)
    .attr("y", 370)
    .attr("dy", "0.71em")
    .attr("fill", "white")
    .text("Number of Members")
    .style("font", "12px avenir")
    .style("fill", "white")
    .style("font-weight", "bold");
    
    
    
    
    function tryMe1(d)
    {
        
        
        return y(d.city)
    }
    
    
    
    
    
      svg10.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
  		.attr("y", tryMe1)
      .attr("width", function(d) { return x(d.members);} )
      .attr("height", 13)
        
    
    

    });
	
        
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});
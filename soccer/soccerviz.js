  d3.csv("worldcup.csv", function(data) {
    overallTeamViz(data);
  })
  
function overallTeamViz(incomingData) {

		var keys = d3.keys(incomingData[0]);
		console.log(keys);

		d3.select("svg")
			.append("g")
			.attr("id", "teamsG")
			.attr("transform", "translate(50,300)")
			.selectAll("g")
		  .data(incomingData)
			.enter()
			.append("g")
			.attr("class", "overallG")
			.attr("transform", function (d,i) {return "translate(" + (i * 50) + ", 0)"});
    
	var teamG = d3.selectAll("g.overallG");
    
		teamG
			.append("circle")
			.attr("r", 0)
			.transition()
			.delay(function(d,i) {return i *100})
			.duration(500)
			.attr("r", 40)
			.transition()
			.duration(500)
			.attr("r", 20);

		teamG
			.append("text")
			.style("text-anchor", "middle")
			.attr("y", 30)
			.style("font-size", "10px")
			.text(function(d) {return d.team})
  
  	var dataKeys = d3.keys(incomingData[0]).filter(function(el) {
  		return el != "team" && el != "region";
  	});

  	console.log(dataKeys);

  	d3.select("#controls").selectAll("button.teams")
  		.data(dataKeys).enter()
  		.append("button")
  		.on("click", buttonClick)
  		.html(function(d) { return d;});

  	function buttonClick(datapoint) {
  		var maxValue = d3.max(incomingData, function (d) {
  			return parseFloat(d[datapoint]);
  		});
  	
  	var radiusScale = d3.scale.linear()
  		.domain([ 0, maxValue ]).range([ 2, 20 ]);

  	d3.selectAll("g.overallG").select("circle").transition().duration(1000)
  		.attr("r", function (d) {
  			return radiusScale(d[datapoint]);
  		});

  	};


teamG.on("mouseover", highlightRegion);
teamG.on("mouseout", unHighlight);

function highlightRegion(d,i) {
 var teamColor = d3.rgb("pink")
 d3.select(this).select("text").classed("highlight", true).attr("y", 10)
 d3.selectAll("g.overallG").select("circle").style("fill", function(p) {return p.region == d.region ? teamColor.darker(.75) : teamColor.brighter(.5)})
 this.parentElement.appendChild(this);

}

function unHighlight() {
  d3.selectAll("g.overallG").select("circle").style("fill", "pink");
  d3.selectAll("g.overallG").select("text").attr("y", 30).classed("highlight", false);
}

  } //end of layout


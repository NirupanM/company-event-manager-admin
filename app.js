

$(document).ready(function() {

'use strict';

// zoom in image


$('#li-one').click(function(){

$("#sec-one").removeClass("hidden");
$("#sec-two").addClass("hidden");
$("#sec-three").addClass("hidden");
$("#sec-four").addClass("hidden");
$("#sec-five").addClass("hidden");
$("#sec-six").addClass("hidden");



});

$('#li-two').click(function(){

$("#sec-one").addClass("hidden");
$("#sec-two").removeClass("hidden");
$("#sec-three").addClass("hidden");
$("#sec-four").addClass("hidden");
$("#sec-five").addClass("hidden");
$("#sec-six").addClass("hidden");



});

$('#li-three').click(function(){

$("#sec-one").addClass("hidden");
$("#sec-two").addClass("hidden");
$("#sec-three").removeClass("hidden");
$("#sec-four").addClass("hidden");
$("#sec-five").addClass("hidden");
$("#sec-six").addClass("hidden");



});

$('#li-four').click(function(){

$("#sec-one").addClass("hidden");
$("#sec-two").addClass("hidden");
$("#sec-three").addClass("hidden");
$("#sec-four").removeClass("hidden");
$("#sec-five").addClass("hidden");
$("#sec-six").addClass("hidden");



});

$('#li-five').click(function(){

$("#sec-one").addClass("hidden");
$("#sec-two").addClass("hidden");
$("#sec-three").addClass("hidden");
$("#sec-four").addClass("hidden");
$("#sec-five").removeClass("hidden");
$("#sec-six").addClass("hidden");



});

$('#li-six').click(function(){

$("#sec-one").addClass("hidden");
$("#sec-two").addClass("hidden");
$("#sec-three").addClass("hidden");
$("#sec-four").addClass("hidden");
$("#sec-five").addClass("hidden");
$("#sec-six").removeClass("hidden");



});




// tab 2

var w = 600;
var h = 250;

var dataset = [ 
	{ key: 0, value: 5 },
	{ key: 1, value: 10 },
	{ key: 2, value: 13 },
	{ key: 3, value: 19 },
	{ key: 4, value: 21 },
	{ key: 5, value: 25 },
	{ key: 6, value: 22 },
	{ key: 7, value: 18 },
	{ key: 8, value: 15 },
	{ key: 9, value: 13 },
	{ key: 10, value: 11 },
	{ key: 11, value: 12 },
	{ key: 12, value: 15 },
	{ key: 13, value: 20 },
	{ key: 14, value: 18 },
	{ key: 15, value: 17 },
	{ key: 16, value: 16 },
	{ key: 17, value: 18 },
	{ key: 18, value: 23 },
	{ key: 19, value: 25 } ];

var xScale = d3.scale.ordinal()
				.domain(d3.range(dataset.length))
				.rangeRoundBands([0, w], 0.05); 

var yScale = d3.scale.linear()
				.domain([0, d3.max(dataset, function(d) {return d.value;})])
				.range([0, h]);

var key = function(d) {
	return d.key;
};

//Create SVG element
var svg = d3.select("#sec-two-container1")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

//Create bars
svg.selectAll("rect")
   .data(dataset, key)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
		return xScale(i);
   })
   .attr("y", function(d) {
		return h - yScale(d.value);
   })
   .attr("width", xScale.rangeBand())
   .attr("height", function(d) {
		return yScale(d.value);
   })
   .attr("fill", function(d) {
		return "rgb(0, 0, " + (d.value * 10) + ")";
   })

	//Tooltip
	.on("mouseover", function(d) {
		//Get this bar's x/y values, then augment for the tooltip
		var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
		var yPosition = parseFloat(d3.select(this).attr("y")) + 14;
		
		//Update Tooltip Position & value
		d3.select("#tooltip")
			.style("left", xPosition + "px")
			.style("top", yPosition + "px")
			.select("#value")
			.text(d.value);
		d3.select("#tooltip").classed("hidden", false)
	})
	.on("mouseout", function() {
		//Remove the tooltip
		d3.select("#tooltip").classed("hidden", true);
	})	;

//Create labels
svg.selectAll("text")
   .data(dataset, key)
   .enter()
   .append("text")
   .text(function(d) {
		return d.value;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
		return xScale(i) + xScale.rangeBand() / 2;
   })
   .attr("y", function(d) {
		return h - yScale(d.value) + 14;
   })
   .attr("font-family", "sans-serif") 
   .attr("font-size", "11px")
   .attr("fill", "white");
   
var sortOrder = false;
var sortBars = function () {
    sortOrder = !sortOrder;
    
    sortItems = function (a, b) {
        if (sortOrder) {
            return a.value - b.value;
        }
        return b.value - a.value;
    };

    svg.selectAll("rect")
        .sort(sortItems)
        .transition()
        .delay(function (d, i) {
        return i * 50;
    })
        .duration(1000)
        .attr("x", function (d, i) {
        return xScale(i);
    });

    svg.selectAll('text')
        .sort(sortItems)
        .transition()
        .delay(function (d, i) {
        return i * 50;
    })
        .duration(1000)
        .text(function (d) {
        return d.value;
    })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
    })
        .attr("y", function (d) {
        return h - yScale(d.value) + 14;
    });

};
// Add the onclick callback to the button
d3.select("#sort").on("click", sortBars);
d3.select("#reset").on("click", reset);
function randomSort() {

	
	svg.selectAll("rect")
        .sort(sortItems)
        .transition()
        .delay(function (d, i) {
        return i * 50;
    })
        .duration(1000)
        .attr("x", function (d, i) {
        return xScale(i);
    });

    svg.selectAll('text')
        .sort(sortItems)
        .transition()
        .delay(function (d, i) {
        return i * 50;
    })
        .duration(1000)
        .text(function (d) {
        return d.value;
    })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
    })
        .attr("y", function (d) {
        return h - yScale(d.value) + 14;
    });
}
function reset() {
	svg.selectAll("rect")
		.sort(function(a, b){
			return a.key - b.key;
		})
		.transition()
        .delay(function (d, i) {
        return i * 50;
		})
        .duration(1000)
        .attr("x", function (d, i) {
        return xScale(i);
		});
		
	svg.selectAll('text')
        .sort(function(a, b){
			return a.key - b.key;
		})
        .transition()
        .delay(function (d, i) {
        return i * 50;
    })
        .duration(1000)
        .text(function (d) {
        return d.value;
    })
        .attr("text-anchor", "middle")
        .attr("x", function (d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
    })
        .attr("y", function (d) {
        return h - yScale(d.value) + 14;
    });
};



//tab 2 2nd

var w = 300;
var h = 300;
var r = h/2;
var aColor = [
    'rgb(178, 55, 56)',
    'rgb(213, 69, 70)',
    'rgb(230, 125, 126)',
    'rgb(239, 183, 182)'
]

var data = [
    {"label":"Colorectale levermetastase (n=336)", "value":74}, 
    {"label": "Primaire maligne levertumor (n=56)", "value":12},
    {"label":"Levensmetatase van andere origine (n=32)", "value":7}, 
    {"label":"Beningne levertumor (n=34)", "value":7}
];


var vis = d3.select('#sec-two-container2').append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");

var pie = d3.layout.pie().value(function(d){return d.value;});

// Declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// Select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
arcs.append("svg:path")
    .attr("fill", function(d, i){return aColor[i];})
    .attr("d", function (d) {return arc(d);})
;

// Add the text
arcs.append("svg:text")
    .attr("transform", function(d){
        d.innerRadius = 100;
        d.outerRadius = r;
        return "translate(" + arc.centroid(d) + ")";}
    )
    .attr("text-anchor", "middle")
    .text( function(d, i) {return data[i].value + '%';});



    //tab-3

//tab-4
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay'
      },
      defaultDate: '2018-02-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2018-02-01'
        },
        {
          title: 'Long Event',
          start: '2018-02-07',
          end: '2018-02-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-02-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-02-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2018-02-11',
          end: '2018-02-13'
        },
        {
          title: 'Meeting',
          start: '2018-02-12T10:30:00',
          end: '2018-02-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2018-02-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2018-02-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2018-02-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2018-02-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2018-02-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-02-28'
        }
      ]
    });



    $('#calendar').fullCalendar('option', 'height', 400);



});
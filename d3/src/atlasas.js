"use strict";
var width = 3000;
var height = 3000;
// TODO color
var cell_properties = [
    { height: 24, color: '#FFFF80' },
    { height: 11, color: 'white' },
    { height: 10, color: 'white' },
    { height: 9, color: 'white' },
    { height: 7, color: '#E1E1E1' },
    { height: 6, color: '#E1E1E1' },
    { height: 6, color: '#FF9FAA' },
    { height: 5, color: '#FF9FAA' },
    { height: 5, color: '#FF9FAA' },
    { height: 5, color: '#FF9FAA' }
];
var total_levels = cell_properties.length;
var total_segments = 24;
var scale = d3.scaleLinear()
    .domain([0, d3.sum(cell_properties, function (e) {
        return e.height;
    })])
    .range([0, width / 2]);
var cellHeight = function (level) { return scale(cell_properties[level - 1].height); };
var cellRadiusInner = function (level) {
    var result = 0;
    for (var i in Object.keys(cell_properties)) {
        if (i > (level - 1)) {
            return scale(result);
        }
        var add = (i == 0) ? 0 : cell_properties[i - 1].height;
        result += add;
    }
    return scale(result);
};
var cellRadiusOuter = function (level) { return cellRadiusInner(level) + cellHeight(level); };
// FIXME remove. Just testing
var text = d3.select('body')
    .selectAll('p')
    .data(elements)
    .enter()
    .append('p')
    .text(function (e) { return e.title; });
// SVH element. Should be present in HTML like: <svg id="svg"></svg>
var svg = d3.select("#svg")
    .append('svg')
    .style("width", "100%")
    .style("height", "auto")
    .style("font", "10px sans-serif")
    .attr("viewBox", '0 0 ' + width + ' ' + height);
// arc drawing function
var arc = d3.arc()
    .innerRadius(function (e) { return cellRadiusInner(e.level); })
    .outerRadius(function (e) { return cellRadiusOuter(e.level); })
    .startAngle(function (e) { return (e.segment - 1) * (360 / total_segments) * (Math.PI / 180); })
    .endAngle(function (e, i) { return e.segment * (360 / total_segments) * (Math.PI / 180); });
var fillColor = function (e) { return cell_properties[e.level - 1].color; };
// Arcs
svg
    .selectAll("path")
    .data(elements)
    .enter()
    .append("path")
    .attr("id", function (e) { return 'cell_' + e.id; })
    .attr("data-id", function (e) { return e.id; })
    .attr("data-level", function (e) { return e.level; })
    .attr("data-segment", function (e) { return e.segment; })
    .attr("d", arc)
    .attr("fill", fillColor)
    .attr("transform", function (d) {
    return 'translate(' + (width / 2) + ',' + (height / 2) + ')';
});
// axial grid
svg
    .selectAll('line')
    .data(new Array(total_segments))
    .enter()
    .append('line')
    .attr('x1', width / 2)
    .attr('y1', height / 2)
    .attr('x2', width)
    .attr('y2', height / 2)
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    // .attr('transform', 'rotate(15,' + (width / 2) + ',' + (height / 2) + ')')
    .attr('transform', function (e, i) {
    return 'rotate(' + (15 * i) + ',' + (width / 2) + ',' + (height / 2) + ')';
});
// radial grid
svg
    .selectAll('circle')
    .data(cell_properties)
    .enter()
    .append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', function (e, i) { return cellRadiusOuter(i + 1); })
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .attr('fill', 'transparent');
// TODO rotate at the end
// svg.attr('transform', 'rotate(-' + (380 / total_segments / 2) + ',0,0)');

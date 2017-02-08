import * as d3 from 'd3';

export function rigidBarChart() {

const totalWidth = 800;
const totalHeight = 500;
const margin = {
	left: 40,
	top: 20,
	right: 20,
	bottom: 20
};

const width = totalWidth - margin.left - margin.right;
const height = totalHeight - margin.top - margin.bottom;

var scaleX = d3.scale.ordinal()
	.rangeRoundBands([0, width], 0.1);
var scaleY = d3.scale.linear()
	.range([height, 0]);

var axisX = d3.svg.axis()
	.scale(scaleX);
var axisY = d3.svg.axis()
	.scale(scaleY)
	.ticks(10, '%')
	.orient('left');

var svg = d3.select('body').append('svg')
	.attr('height', totalHeight)
	.attr('width', totalWidth);

var innerArea = svg.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    return function plotChart(error, data) {
        scaleY.domain(d3.extent(data, d => d.frequency));
        scaleX.domain(data.map(d => d.letter));

        var rects = innerArea.selectAll('rect')
            .data(data)
            .enter()
            .append('rect');

        rects
            .attr('x', d => scaleX(d.letter))
            .attr('width', scaleX.rangeBand()) //*** width depending on scale bands
            .style('fill', 'steelblue')
            .attr("height", 0)
            .attr('y', function (d, i) {
				return height;
			});

        rects
            .transition()
            .duration(3050)
            .delay(function (d, i) {
				return i * 50;
			})
            .attr('y', function (d, i) {
				return scaleY(d.frequency);
			})
			.attr('height', function (d, i) {
				return height - scaleY(d.frequency);
			});    

        innerArea.append('g')
            .attr('transform', 'translate(' + 0 + ',' + height + ')')
            .call(axisX);
        innerArea.append('g')
            .call(axisY);
    }

}


import * as d3 from 'd3';
import { rigidBarChart } from './onePlaceComponent';
import { baseBarChart } from './baseBarChart';
import { baseAxis } from './baseAxis';

//d3.tsv("data.tsv", rigidBarChart());

var config = {
	width: 800,
	height: 300,
	selector: d3.select('#container')
};

var config2 = {
	width: 800,
	height: 300,
	selector: d3.select('#container2')
};

d3.tsv("data.tsv", function(error, data) {
	var chart = baseBarChart(config);
	chart()
	chart.scaleX(obj => d3.scale.ordinal()
				.rangeRoundBands([0, obj.width], 0.1)
				.domain(data.map(d => d.letter))
		)
	chart.scaleY(obj => d3.scale.linear()
				.range([obj.height, 0])
				.domain(d3.extent(data, d => d.frequency))
		)
	chart.functionX(scaleX => d => scaleX(d.letter))
	chart.functionY(scaleY => d => scaleY(d.frequency))
	chart.functionWd(scaleX => chart.scaleX().rangeBand())
	chart.functionHt(scaleY => d => chart.height() - scaleY(d.frequency))
	chart.plotChart(data);

	var axis = baseAxis({
		x: {
			scale: chart.scaleX()
		},
		y: {
			scale: chart.scaleY(),
			ticks: [10, '%'],
			orientation: 'left'
		},
		innerArea: chart.innerArea(),
		height: chart.height()
	});

	axis.applyAxes();
});


d3.tsv("data2.tsv", function(error, data) {

	var chart1 = baseBarChart(config2);
	chart1()
	chart1.scaleX(obj => d3.scale.ordinal()
				.rangeRoundBands([0, obj.width], 0.1)
				.domain(data.map(d => d.letter))
		)
	chart1.scaleY(obj => d3.scale.linear()
				.range([obj.height, 0])
				.domain(d3.extent(data, d => d.frequency))
		)
	chart1.functionX(scaleX => d => scaleX(d.letter))
	chart1.functionY(scaleY => d => scaleY(d.frequency))
	chart1.functionWd(scaleX => chart1.scaleX().rangeBand())
	chart1.functionHt(scaleY => d => chart1.height() - scaleY(d.frequency))
	chart1.plotChart(data);

	var axis1 = baseAxis({
		x: {
			scale: chart1.scaleX()
		},
		y: {
			scale: chart1.scaleY(),
			ticks: [10, '%'],
			orientation: 'left'
		},
		innerArea: chart1.innerArea(),
		height: chart1.height()
	});

	axis1.applyAxes();
});	

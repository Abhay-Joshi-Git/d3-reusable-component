import * as d3 from 'd3';
import { rigidBarChart } from './onePlaceComponent';
import { baseBarChart } from './baseBarChart';

//d3.tsv("data.tsv", rigidBarChart());

var config = {
	width: 800,
	height: 500,
	selector: d3.select('body')
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

});

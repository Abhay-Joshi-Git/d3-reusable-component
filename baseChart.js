import { margin } from './commonChartData';
import * as d3 from 'd3';

export var baseChart = function(configData) {
    var config = configData;
    var width, height;
    var svg;
    var innerArea;
    var scaleX, scaleY;

    function chart () {
        initialize();
    }

    var initialize = function() {
        width = config.width - margin.left - margin.right;
        height = config.height - margin.top - margin.bottom;
        chart.appendSVG();
        chart.appendInnerArea();        
    };

    chart.initialize = initialize; 

    chart.appendSVG = function() {
        config.selector.select('svg').remove();
        svg = config.selector.append('svg')
    	    .attr('height', config.height)
	        .attr('width', config.width);
    }

    chart.appendInnerArea = function() {
        innerArea = svg.append('g')
	        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    }

    chart.scaleX = function(cb) {
        if (typeof cb === 'function') {
            scaleX = cb({width});
        } else {
            return scaleX;
        }
    }

    chart.scaleY = function(cb) {
        if (typeof cb === 'function') {
            scaleY = cb({height});
        } else {
            return scaleY;
        }
    }

    chart.width = function(wd) {
        if (wd) {
            width = wd;
        } else {
            return width;
        }
    }

    chart.height = function(ht) {
        if (ht) {
            height = ht;
        } else {
            return height;
        }
    }

    chart.svg = function() {
        return svg;
    }

    chart.innerArea = function() {
        return innerArea;
    }

    return chart;
}
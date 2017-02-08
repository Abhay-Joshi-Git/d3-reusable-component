import { baseChart } from './baseChart';

export var baseBarChart = function(config) {

    var chart = baseChart(config);
    var functionX, functionY;
    var functionWd, functionHt;

    chart.functionX = function(cb) {
        if (typeof cb === 'function') {
            functionX = cb(chart.scaleX());
        } else {
            return functionX;
        }
    }

    chart.functionY = function(cb) {
        if (typeof cb === 'function') {
            functionY = cb(chart.scaleY());
        } else {
            return functionY;
        }
    }

    chart.functionWd = function(cb) {
        if (typeof cb === 'function') {
            functionWd = cb(chart.scaleX());
        } else {
            return functionWd;
        }
    }

    chart.functionHt = function(cb) {
        if (typeof cb === 'function') {
            functionHt = cb(chart.scaleY());
        } else {
            return functionHt;
        }
    }

    chart.plotChart = function(data) {


         var added
         added = chart.innerArea().selectAll('rect')
            .data(data)
            .enter();

        console.log(functionX, functionY, functionWd, functionHt);

            added.append('rect')
            .attr('x', functionX)
            .attr('y', functionY)
            .attr('width', functionWd)
            .attr('height', functionHt)
            .style('fill', 'steelblue'); 
    }    

    return chart;
}
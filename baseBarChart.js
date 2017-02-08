import { baseChart } from './baseChart';

export var baseBarChart = function(config) {

    var chart = baseChart(config);
    var functionX, functionY;
    var functionWd, functionHt;
    var beforePlotCb, afterPlotCb;

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
         var added;
         added = chart.innerArea().selectAll('rect')
            .data(data)
            .enter()
            .append('rect');

        if (beforePlotCb) {
            added = beforePlotCb(added);
        }    

        added.style('fill', 'steelblue');
        added = functionPlot(added, functionX, functionY, functionWd, functionHt);

        if (afterPlotCb) {
            added = afterPlotCb(added);
        }
    }   

    chart.beforePlotHook = function(cb) {
        if (cb && typeof cb === 'function') {
            beforePlotCb = cb;
        } else {
            return beforePlotCb;
        }
    } 

    chart.afterPlotHook = function(cb) {
        if (cb && typeof cb === 'function') {
            afterPlotCb = cb;
        } else {
            return afterPlotCb;
        }
    } 

    var functionPlot = function(selection, functionX, functionY, functionWd, functionHt) {
            return selection.attr('x', functionX)
                .attr('y', functionY)
                .attr('width', functionWd)
                .attr('height', functionHt);
    }

    chart.functionPlot = function(fn) {
        if (fn && typeof fn === 'function') {
            functionPlot = fn;
        } else {
            return functionPlot;
        }
    }

    return chart;
}
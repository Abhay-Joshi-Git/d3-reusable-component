export var chartAnimation = function (configData) {

    var chart = configData.chart;

    var yPreFunction = chart.functionY();
    var htPreFunction = chart.functionHt();

    function applyAnimation() {
        chart.functionY(scaleY => d => chart.height());
        chart.functionHt(scaleY => d => 0);

        chart.afterPlotHook(selection => {
            return selection.transition()
                .duration(3050)
                .delay(function (d, i) {
                    return i * 50;
                })
                .attr('y', yPreFunction)
                .attr('height', htPreFunction);			    
        });	
    }

    return {
        applyAnimation
    }

}
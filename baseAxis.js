import * as d3 from 'd3';

export var baseAxis = function (configData) {
    var config = configData;
    var x = {};
    Object.assign(x, config.x);
    var y = {};
    Object.assign(y, config.y);
    
    var axisX = d3.svg.axis();
    var axisY = d3.svg.axis();

    var innerArea = config.innerArea;
    var width_, height_;

    width_ = config.width;
    height_ = config.height;

    function width(wd) {
        if (wd) {
            width_ = wd;
        } else {
            return width_;
        }
    }

    function height(ht) {
        if (ht) {
            height_ = ht;
        } else {
            return height_;
        }
    }

    function applyXAxis() {
        axisX = axisX.scale(x.scale);
        innerArea.append('g')
            .attr('transform', 'translate(' + 0 + ',' + height_ + ')')
            .call(axisX);
    }


    function applyYAxis() {
        axisY = axisY
            .scale(y.scale)
            .ticks(y.ticks)
            .orient(y.orientation);

        innerArea.append('g')
            .call(axisY);
    }


    function applyAxes() {
        applyXAxis();
        applyYAxis();
    }

    function scaleX(sc) {
        if (sc) {
            x.scale = sc;
        } else {
            return x.scale;
        }
    }

    function scaleY(sc) {
        if (sc) {
            y.scale = sc;
        } else {
            return y.scale;
        }
    }

    return {
        axisX,
        axisY,
        width,
        height,
        applyAxes
    }
}
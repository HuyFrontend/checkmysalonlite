/**
 *  @name smpiechart
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'smpiechart';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var win = $(window),
          that = this,
          percent = that.element.data('percent'),
          content = that.element.find('> .content');
          lineWidth = that.element.data('line-width'),
          colorBar = that.element.data('colorbar'),
          sizeWidth = that.element.width(),
          pieChart = $('.chart');

      that.element.attr('data-percent', 0);
      content.css('color', colorBar);
      that.element.easyPieChart({
        barColor: colorBar,
        trackColor: '#ececee',
        scaleColor: '#f5f5f7',
        scaleLength: 0,
        lineWidth: lineWidth,
        size: sizeWidth,
        animate: 1500
      });

      that.element.attr('data-percent', percent);
      $('.sub-nav').find(' > .carousel-indicators > li').off('click').on('click', function(){
        var that = $(this);
        if(that.data('slide-to') === 2){
          pieChart.each(function(index, el) {
            var currentChart = $(el),
                percent = currentChart.data('percent'),
                chart = window.chart = currentChart.data('easyPieChart');
            if (chart) {
              chart.update(percent);
            }
          });
        } else if (that.data('slide-to') === 1) {
          setTimeout(function () {
            $(window).trigger('resize');
          }, 100);
        } else {
          pieChart.each(function(index, el) {
            var currentChart = $(el),
                chart = window.chart = currentChart.data('easyPieChart');
            if (chart) {
              chart.update(0);
            }
          });
        }
      });

      $(window).off('resize.' + pluginName).on('resize.' + pluginName, function(){
        var screenWidth = win.width();
          $('[data-smpiechart]').each(function(){
            var el = $(this),
            chart = el.data('easyPieChart'),
            content = el.find('.content').prop('outerHTML'),
            pertcentValue = parseInt(el.find('.pertcent').text(), 10),
            opts = {
              barColor : chart.options.barColor,
              trackColor : chart.options.trackColor,
              scaleColor : chart.options.scaleColor,
              scaleLength : 0,
              lineWidth: lineWidth,
              size: el.width(),
              animate: 1500
            };

            el
            .attr('data-percent', pertcentValue)
            .data('easyPieChart', null)
            .empty()
            .easyPieChart(opts).append(content);
          });
      });
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
    option: 'value'
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

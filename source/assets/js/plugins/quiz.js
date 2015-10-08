/**
 *  @name quiz
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
  var pluginName = 'quiz';

  var appendSpanActive = function (point){
    var appendData = '',
        activeClass = '';
    for(var j = 4; j > 0; j--){
      if(j <= parseInt(point)){
        activeClass = 'active';
      }
      else{
        activeClass = '';
      }
      appendData += '<span data-point="'+ j +'" class="'+ activeClass +'"></span>';
    }
    return appendData;
  };
  var apppendQuizContent = function (data) {
    var append = '',
      point = 0;
    for (var j = 0; j < data.length; j++) {
      dataPoint = parseInt(data[j].answer_point);
      switch (dataPoint) {
        case 0:
          point = 0;
          break;
        case 1:
          point = 0;
          break;
        case 2:
          point = 3;
          break;
        case 3:
          point = 6;
          break;
        case 4:
          point = 10;
          break;
      }

      append += '<li data-question-id="' + data[j].id + '" class="row">' +
                    '<div data-content="true" class="text col-sm-9">' + data[j].question + '</div>' +
                      '<div class="check-list row col-sm-3">' +
                        '<div class="rating" data-answer="'+ point +'">' +
                          appendSpanActive(data[j].answer_point) +
                      '</div>' +
                    '</div>' +
                  '</li>';
    }
    return append;
  };
  var getList = function (link, content) {
    $.ajax ({
      type: 'GET',
      url: link,
      success: function (data) {
        content.html(apppendQuizContent(data));
      }
    });
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this.element;
          url = that.data('quiz'),
          content = that.find('.quiz-content');


      if(this.options.isReload) {
        content.html(this.getElement(content));
        // content.append()
      }
      else {
        getList(url, content);
      }
    },
    getElement: function (element) {
      return element.children();
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
    option: 'value',
    isReload: false
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

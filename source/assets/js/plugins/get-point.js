/**
 *  @name get-point
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *
 */
;(function($, window, undefined) {
  var pluginName = 'get-point',
      L10n = window.L10n;

  var isCheckedAll = function(element){
    var listQuestionsDone = element.find('[data-quiz-content].item.active .rating').filter( function () {
      return !$(this).children().filter('.active').length;
    });
    return listQuestionsDone.length === 0;
  };

  var showError = function () {
    var modal = $('#error-modal'),
    contentModal = modal.find('.message-group');
    contentModal.empty();
    contentModal.append('<p>' + L10n.valid.quizcheck + '</p>');
    modal.modal('show');
  };

  var showResult = function (percent) {
    var modal = $('#score-modal');
    modal.modal('show');
    modal.off('shown.bs.modal');
    modal.on('shown.bs.modal', function() {
      var divChart = $(this).find('[data-smpiechart]'),
          spanPercent = divChart.find('.pertcent'),
          chart = divChart.data('easyPieChart');

      spanPercent.html(percent + '%');
      chart.update(percent);
    });
  };
  var getPercent = function (element) {
    if(!element) {
      element = $('[data-quiz-content].item.active');
    }
    var item = element.find('.rating[data-answer]'),
    itemLenght = item.length,
    totalPoint = itemLenght * 10,
    listPoint = 0,
    percent = 0;
    $.each(item, function () {
      var itemPoint = parseInt($(this).attr('data-answer'));
      listPoint += itemPoint;
    });
    percent = (100 * listPoint)/ totalPoint ;
    return Math.round(percent);
  };
  var updateElement = function (element, data) {
    var items = element.find('[data-question-id]');
    $.each(data, function (index, value) {
      var item = $(items[index]);
      item.find('[data-answer]').attr('data-answer', value.answer);
      item.find('[data-point]').removeClass('active');
      for(var j = 0; j <= parseInt(value.point); j++) {
        item.find('[data-point="'+ j +'"]').addClass('active');
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
      var that = this,
          element = this.element,
          options = this.options,
          content = $(options.content),
          btnCancel = element.find('[data-dismiss]'),
          initList = '';

      element.off('click.doRate', '[data-point]').on('click.doRate', '[data-point]', function(){
        var me = $(this),
            thisPoint = parseInt(me.attr('data-point'));
            answer = 0;

        switch (thisPoint) {
          case 1:
            answer = 0;
            break;
          case 2:
            answer = 3;
            break;
          case 3:
            answer = 6;
            break;
          case 4:
            answer = 10;
            break;
        }

        me.siblings('[data-point]').removeClass('active');
        me.nextAll().addClass('active');
        me.addClass('active');
        me.closest('.rating').attr('data-answer', answer);
      });

      element.off('click.savePoint', '[data-button-validate]').on('click.savePoint', '[data-button-validate]', function() {
        if(isCheckedAll(element)) {
          // waiting ajax
          var updateList = that.getList(content),
              percent = getPercent(content);

          initList = updateList;
          updateElement(content, updateList);
          showResult(percent);
          btnCancel.trigger('click');
        }
        else {
          showError();
        }
      });

      element.off('click.cancel', '[data-dismiss]').on('click.cancel', '[data-dismiss]', function(){

        updateElement(content, initList);
      });

      initList = this.getList(content);
    },
    getList: function (content) {
      var item = content.find('[data-question-id]'),
      list = [];
      $.each(item, function () {
        var me = $(this),
        questionID = me.attr('data-question-id'),
        answer = me.find('[data-answer]').attr('data-answer'),
        point = me.find('[data-point].active').length;
        list.push({'question-id': questionID, 'point': point, 'answer': answer});
      });
      return list;
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
    items: ''
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

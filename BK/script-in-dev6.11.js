var Site = (function($, window, undefined) {
  'use strict';
  var L10n = window.L10n,
      doc = $(document),
      body = $('body');

  var initModal = function () {
    var btnLogin = body.find('[data-login]'),
        btnRegister = body.find('[data-register]'),
        btnLostPass = body.find('[data-lost-password]'),
        bntLogout = body.find('[data-logout]'),
        btnSetting = body.find('[data-setting]');

    var emotionModal = body.find('#quiz-emotion-modal'),
        assessmentModal = body.find('#quiz-assessment-modal');

     btnLogin['showing-modal']({
      modal: '#login-modal'
    });

    btnRegister['showing-modal']({
      modal: '#register-modal'
    });

    bntLogout['showing-modal']({
      isModalLogout: true,
      hasLayer: true,
      message: L10n.confirm.logout,
      modal: '#mess-confirm-error'
    });

    btnSetting['showing-modal']({
      modal: '#setting-modal'
    });

    // emotionModal['get-point']({
    //   content: '#item-emotion'
    // });
    // assessmentModal['get-point']({
    //   content: '#item-assessment'
    // });

    btnLostPass['showing-modal']({
      modal: '#forgot-pass'
    });
  };

  var initQuiz = function () {
    var quizList = body.find('[data-quiz]');
    quizList['quiz']();
  };

  return {
    initModal: initModal,
    initQuiz: initQuiz
  };

})(jQuery, window);

jQuery(function() {
  Site.initModal();
  // Site.initQuiz();
});

/**
* autocomplete city
**/
;(function($, window, undefined) {
    var pluginName = 'autocomplete-city';
    function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, options);
      this.init();
    }

    Plugin.prototype = {
      init: function() {
        var that = this.element,
        form = that.closest('form'),
        formId = form.attr('id'),
        thatParent = that.parent(),
        newElemmment = $('<div class="custom-input"></div>'),
        source = [];
        this.getSource(source);

        thatParent.append(newElemmment);
        that.appendTo(newElemmment);

        that.closest('.custom-input')
        .attr('id', 'autocomplete-city-for-form-' + formId);

        var id = that.closest('div.custom-input').attr('id');

        that.autocomplete({
          appendTo: '#' + id,
          // source: source,
          source: function (request, response) {
            var matcher = new RegExp( '^' + $.ui.autocomplete.escapeRegex( slug(request.term) ), 'i' );
            response( $.grep( source, function( item ) {
              return matcher.test( slug(item.label) );
            }));
          },
          minLength: 1,
          open: function () {
            $('.ui-helper-hidden-accessible').remove();
          },
          close: function () {
            $('.ui-helper-hidden-accessible').remove();
          },
          search: function( event, ui ) {
          },
          select: function(event, ui) {
            this.value = ui.item.label;
            $('[data-city-hidden]').remove();
            var cityHidden = $('<input data-city-hidden="" class="hidden" value="' + ui.item.id + '">');
            cityHidden.insertAfter(that);
          }
        })
        .autocomplete('instance')._renderItem = function( ul, item ) {
          return $('<li>').data('item.autocomplete', item)
            .append('<span>' + item.label + '</span>')
            .appendTo(ul);
        };
        that.focus( function () {
          // var cities = Salon.cityList;
          // if(cities && !source.length) {
          //   $.each(cities, function (index, value) {
          //     var item = {};
          //     item.label = this.city;
          //     item.value = this.city;
          //     item.id = this.id;
          //     source.push(item);
          //   });
          // }
          var len = $(this).val().length;
          if(len && len >= 1) {
            that.autocomplete('search');
          }
        });
      },
      resize: function () {
        var doc = $(document),
            win = $(window);

        win.bind('resize', function() {
          var inputCity = doc.find('[data-autocomplete-city]'),
              ulAuto = inputCity.closest('form').find('ul.ui-autocomplete');
        }).trigger('resize');
      },
      getSource: function (source) {
        var that = this.element,
            inputHidden = $(document).find('#list_city'),
            value = inputHidden.val();

        if(value && value.length) {
          value = $.trim(value);
          value = $.parseJSON(value);
        }

        if(value && !source.length) {
          $.each(value, function (index, value) {
            var item = {};
            item.label = this.city;
            item.value = this.city;
            item.id = this.id;
            source.push(item);
          });
        }
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
    };

    $(function() {
      $('[data-' + pluginName + ']')[pluginName]();
    });
}(jQuery, window));

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
  var pluginName = 'get-point-a',
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

      element.off('click.doRate', '[data-point-a]').on('click.doRate', '[data-point-a]', function(){
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

      element.off('click.cancelQuiz', '[data-dismiss]').on('click.cancelQuiz', '[data-dismiss]', function(){

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

/**
   *  @name modal-ajax
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
    var pluginName = 'modal-ajax',
        L10n = window.L10n;

    var isCheckedAll = function(element){
      var listQuestionsDone = element.find('[data-question-id] .rating').filter( function () {
        return !$(this).children().filter('.active').length;
      });
      return listQuestionsDone.length === 0;
    };

    var showError = function (textError) {
      var modal = $('#error-modal'),
      contentModal = modal.find('.message-group');
      contentModal.empty();
      contentModal.append('<p>' + textError + '</p>');
      modal.modal('show');
    };

    function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, options);
      this.init();
    }

    Plugin.prototype = {
      init: function() {
        var that = this,
            elm = that.element,
            opt = that.options,
            idModal = elm.data('target'),
            modal = $('#' + idModal);

        opt.questionModal = !opt.questionModal ? elm.data('target') : opt.questionModal;

        var quizModal = $('#' + opt.questionModal);

        elm.off('click.showAjaxModal').on('click.showAjaxModal', function () {
          that.getList(that.appendQuestionToModal);
        });

        //choose answer
        modal.off('click.chooseAnswer', '[data-point]').on('click.chooseAnswer', '[data-point]', function(){
          var me = $(this);
          me.siblings('[data-point]').removeClass('active');
          me.nextAll().addClass('active');
          me.addClass('active');
        });

        // save
        modal.off('click.Save', '[data-button-validate]').on('click.Save', '[data-button-validate]', function(){

          var me = $(this),
              blockQuestion = me.closest('.modal-dialog').find('.quiz-content');

          if(isCheckedAll(blockQuestion)) {
            that.saveData(modal, me)
              .then(function (data) {
                console.log('data', data);
                return that.showResultModal(data);
              })
              .then(function (data) {
              }, function (err) {

              });
          }
          else {
            var alertIfNotCheckAll = L10n.valid.quizcheck;
            // showError(alertIfNotCheckAll);
            that.showAlertModal(alertIfNotCheckAll);
          }
        });

      },
      getList: function (callback) {
        var that = this,
            elm = that.element;

        var url = elm.data('link'),
            idModal = elm.data('target'),
            id = elm.data('id'),
            modal = $('#' + idModal);
        var objectID = {
          'id': id
        };
        if(!modal.find('[data-button-validate]').attr('data-id')) {
          modal.find('[data-button-validate]').attr('data-id', id);
        }

        $.ajax({
          method: 'GET',
          url: url,
          data: objectID,
          success: function (data) {
            if(callback) {
              callback(data, modal);
            }
          }
        });
      },
      appendQuestionToModal: function (data, modal) {
        modal.find('[data-replace]').html(data);
        modal.modal('show');
      },
      saveData: function (list, context) {
        var defer = $.Deferred();

        var arrayQuestion = [],
            arrayData = [],
            questions = list.find('[data-question-id]');

        var link = context.data('link'),
            id = context.data('id');

        $.each(questions, function() {
          var me = $(this);
          var answer = { 'category_id': id, 'question_id': me.data('question-id'), 'point': me.find('.active').length };
          arrayQuestion.push(answer);
        });
        if(arrayQuestion.length) {
          var objData = {
            'survey': arrayQuestion
          };

          arrayData.push(objData);

          var objectPost = {
            answerString: JSON.stringify(arrayData)
          };
          $.ajax({
            method: 'POST',
            url: link,
            data: objectPost,
            success: function (data) {
              defer.resolve(data);
            },
            error: function (err) {
              defer.reject(err);
            }
          });
        }
        return defer.promise();
      },
      showResultModal: function (dataContent) {
        var that = this,
            opt = that.options;

        if(dataContent) {
          if(typeof dataContent !== 'object') {
            dataContent = JSON.parse(dataContent);
          }
          if(dataContent.status !== 'OK') {
            var saveError  = L10n.alert.ajaxError;
            // showError(saveError);
            that.showAlertModal(saveError);
          }
          else {
            var percent = Math.round(dataContent.percent),
                content = dataContent.content;

            var resultModal = $('#' + opt.scoreModal),
                chartContainer = resultModal.find('[data-smpiechart]'),
                chart = chartContainer.data('easyPieChart'),
                spanPercent = chartContainer.find('.pertcent'),
                textContainer = resultModal.find('[data-change-text]');

            textContainer.html(content);
            spanPercent.html(percent + '%');

            $('#' + opt.questionModal).modal('hide');
            resultModal.modal('show');

            resultModal.off('shown.bs.modal');
            resultModal.on('shown.bs.modal', function() {

              chart.update(percent);

            });
            resultModal.off('hidden.bs.modal');
            resultModal.on('hidden.bs.modal', function() {

              spanPercent.html(0 + '%');
              chart.update(0);

            });
          }
        }
      },
      showAlertModal: function (alertText) {
        var that = this,
            opt = that.options,
            modal = $('#' + opt.alertModal),
            contentModal = modal.find('.message-group');

        contentModal.empty();
        contentModal.append('<p>' + alertText + '</p>');
        modal.modal('show');
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
      scoreModal: 'score-modal',
      questionModal: '',
      alertModal: 'error-modal'
    };

    $(function() {
      $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));

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

// /**
  //  *  @name plugin
  //  *  @description description
  //  *  @version 1.0
  //  *  @options
  //  *    option
  //  *  @events
  //  *    event
  //  *  @methods
  //  *    init
  //  *    publicMethod
  //  *    destroy
  //  */
  // ;(function($, window, undefined) {
  //   var pluginName = 'plugin';
  //   var privateVar = null;
  //   var privateMethod = function() {

  //   };

  //   function Plugin(element, options) {
  //     this.element = $(element);
  //     this.options = $.extend({}, $.fn[pluginName].defaults, options);
  //     this.init();
  //   }

  //   Plugin.prototype = {
  //     init: function() {

  //     },
  //     publicMethod: function(params) {

  //     },
  //     destroy: function() {
  //       $.removeData(this.element[0], pluginName);
  //     }
  //   };

  //   $.fn[pluginName] = function(options, params) {
  //     return this.each(function() {
  //       var instance = $.data(this, pluginName);
  //       if (!instance) {
  //         $.data(this, pluginName, new Plugin(this, options));
  //       } else if (instance[options]) {
  //         instance[options](params);
  //       } else {
  //         window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
  //       }
  //     });
  //   };

  //   $.fn[pluginName].defaults = {
  //     option: 'value'
  //   };

  //   $(function() {
  //     $('[data-' + pluginName + ']')[pluginName]();
  //   });

// }(jQuery, window));

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

/**
 *  @name showing-modal
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    destroy
 */
;(function($, window, undefined) {
  var pluginName = 'showing-modal';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this.element,
          options = this.options,
          modal = $(options.modal),

          modalDialog = modal.find('.modal-dialog'),
          modalTitle = modal.find('[data-title]'),
          thisTitle = that.text(),
          body = that.closest('body'),
          layer = body.find('.overlay');


      var thatChangeTitle = that.data('reset-title');

      if(this.options.isModalLogout) {
        modal.off('click.logout', '#mess-confirm-error-ok').on('click.logout', '#mess-confirm-error-ok', function () {
          var linkTo = $(body).find('[data-logout]').attr('data-logout');
          window.location.replace(linkTo);
        });
      }

      that.off('click.showModal').on('click.showModal', function () {

        if(thatChangeTitle) {
          modalTitle.html(thisTitle);
        }

        if(options.activeItem !== '') {
          modal.find('.item').removeClass('active');
          $(options.activeItem).addClass('active');
        }

        modal.modal('show');
      });

      modal.off('show.bs.modal');
      modal.on('show.bs.modal', function() {
        if(options.hasLayer) {
          layer.removeClass('hidden');
        }
        if(options.message !== '') {
          modal.find('.message').html(options.message);
        }
        var newScreenHeight = modal.find('.modal-backdrop.fade.in').height();
        modalDialog.height(newScreenHeight);
      });
      modal.off('hidden.bs.modal');
      modal.on('hidden.bs.modal', function() {
        if(options.hasLayer) {
          layer.addClass('hidden');
        }
        if(options.message !== '') {
          modal.find('.message').html('');
        }
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
    option: 'value',
    btnShow: '',
    modal: '',
    message: '',
    activeItem: '',
    isModalLogout: false,
    hasLayer: false
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

/**
 *  @name validator
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
  var pluginName = 'validator',
  L10n = window.L10n;

  function getErrorModal (form) {
    var modal = $('#error-modal'),
    contentModal = modal.find('.message-group'),
    errorInput = form.find('input.error'),
    errorLabel = errorInput.parent().find('.text-danger');

    errorLabel.hide();
    contentModal.empty();

    $.each(errorLabel, function () {
      var me = $(this),
          text = me.text();
      contentModal.append('<p class="message">'+ text + '</p>');
    });

    modal.modal('show');
  }

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this.element,
        loginForm = that.find('#form-login'),
        registerForm = that.find('#form-registered'),
        settingForm = that.find('#form-setting');

      // validate login form
      loginForm.smValidator({
        rules: {
          'email': {
            valid: {
              required: true,
              email: /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,
              maxLen: 50
            },
            message: {
              required: L10n.required.email,
              email: L10n.valid.email,
              maxLen: L10n.valid.maxlength
            }
          },
          'password': {
            valid: {
              required: true,
              maxLen: 50
            },
            message: {
              required: L10n.required.password,
              maxLen: L10n.valid.maxlength
            }
          }
        },
        onSubmit: function(){
          var form = $(this.formVL);
          $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            type: 'POST',
            success: function(data){
              var result = $.parseJSON(data);
              if(result.success === false) {
                var modal = $('#error-modal'),
                contentModal = modal.find('.message-group');
                contentModal.empty();

                contentModal.append('<p class="message">' + result.mess + '</p>');
                modal.modal('show');
              }
              else {
                // window.location.href = '//' + window.location.host + '/home';
                window.location.replace(form.attr('data-target'));
                return true;
              }
            }
          });
          return false;
        },
        onFailed: function() {
          var form = $(this.formVL);

          getErrorModal(form);

          return false;
        },
        errorOption: 1
      });

      // validate register form
      registerForm.smValidator({
        rules: {
          'input-first-name': {
            valid: {
              required: true
            },
            message: {
              required: L10n.required.firstname
            }
          },
          'input-last-name': {
            valid: {
              required: true
            },
            message: {
              required: L10n.required.lastname
            }
          },
          'input-salon': {
            valid: {
              required: true
            },
            message: {
              required: L10n.required.salon
            }
          },
          'input-city': {
            valid: {
              required: true
            },
            message: {
              required: L10n.required.city
            }
          },
          'input-email-register': {
            valid: {
              required: true,
              email: /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,
              maxLen: 50
            },
            message: {
              required: L10n.required.email,
              email: L10n.valid.email,
              maxLen: L10n.valid.maxlength
            }
          },
          'input-password': {
            valid: {
              required: true,
              maxLen: 50
            },
            message: {
              required: L10n.required.password,
              maxLen: L10n.valid.maxlength
            }
          }
        },
        onSubmit: function(){
          return true;
        },
        onFailed: function() {
          var form = $(this.formVL);

          getErrorModal(form);

          return false;
        },
        errorOption: 1
      });

      // validate seeting form
      settingForm.smValidator({
        rules: {
          'input-first-name': {
            valid: {
              required: true
            },
            message: {
              required: L10n.required.firstname
            }
          },
          'input-last-name': {
            valid: {
              required: true
            },
            message: {
              required: L10n.required.lastname
            }
          },
          'input-email-register': {
            valid: {
              required: true,
              email: /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,
              maxLen: 50
            },
            message: {
              required: L10n.required.email,
              email: L10n.valid.email,
              maxLen: L10n.valid.maxlength
            }
          },
          'input-salon': {
            valid: {
              required: true
            },
            message: {
              required: L10n.required.salon
            }
          },
          'city': {
            valid: {
              required: true
            },
            message: {
              required: L10n.required.city
            }
          },
          'input-password': {
            valid: {
              required: true,
              maxLen: 50
            },
            message: {
              required: L10n.required.password,
              maxLen: L10n.valid.maxlength
            }
          }
        },
        onSubmit: function(){
          var form = $(this.formVL);
          $.ajax({
            url: form.attr('action'),
            data: form.serialize(),
            type: 'POST',
            success: function(data){
              var result = $.parseJSON(data);
              if(result.status && result.status === 'OK') {
                var modal = $('#error-modal'),
                contentModal = modal.find('.message-group');
                contentModal.empty();

                contentModal.append('<p class="message">' + result.message + '</p>');
                modal.modal('show');
              }
              else {
                alert('an error');
                return true;
              }
            }
          });
          return false;
        },
        onFailed: function() {
          var form = $(this.formVL);

          getErrorModal(form);

          return false;
        },
        errorOption: 1
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
    $(document)[pluginName]();
  });

}(jQuery, window));

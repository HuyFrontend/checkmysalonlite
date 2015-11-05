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

    var isCheckedAll = function (element) {
      var listQuestionsDone = element.find('[data-question-id] .rating').filter( function () {
        return !$(this).children().filter('.active').length;
      });
      return listQuestionsDone.length === 0;
    };

    function RequestAjax (successModal, errorModal){
      this.sendRequest = function (url, success, error, methodType, params) {
        // Feature detection, url: url, success/error: callback when ajax done, method: get/post, params: data
        if ( !window.XMLHttpRequest ) {
          return;
        }
        // Create new request
        var request = new XMLHttpRequest();

        // Setup callbacks
        request.onreadystatechange = function () {
          // If the request is complete
          if ( request.readyState === 4 ) {
              // If the request failed
            if ( request.status !== 200 ) {
              if ( error && typeof error === 'function' ) {
                  error( request.responseText, request );
              }
              return;
            }
            // If the request succeeded
            if ( success && typeof success === 'function' ) {
                success( request.responseText, request );
            }
          }
        };
        // Get the HTML
        if(!methodType) {
          methodType = 'GET';
        }
        request.open( methodType, url );
        request.send(params);
      };
      this.getSuccess = function (data) {
        var questionModal = $('#' + successModal),
            content = questionModal.find('[data-replace]');
        content.html(data);
        questionModal.modal('show');
      };
      this.getError = function (data) {
        var alertModal = $('#' + errorModal),
            contentModal = alertModal.find('.message-group');

        contentModal.empty();
        contentModal.append('<p>' + data + '</p>');
        alertModal.modal('show');
      };
    }

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
          // that.getList(that.appendQuestionToModal);
            var me = $(this),
                url = me.data('link'),
                qModal = me.data('target');

            var params = {
              'id': me.data('id')
            };

          var request = new RequestAjax(qModal, opt.alertModal);
          request.sendRequest(url, request.getSuccess, request.getError, 'GET', params);
        });

        //choose answer
        quizModal.off('click.chooseAnswer', '[data-point]').on('click.chooseAnswer', '[data-point]', function(){
          var me = $(this);
          me.siblings('[data-point]').removeClass('active');
          me.nextAll().addClass('active');
          me.addClass('active');
        });

        // save
        quizModal.off('click.Save', '[data-button-validate]').on('click.Save', '[data-button-validate]', function(){

          var me = $(this),
              blockQuestion = me.closest('.modal-dialog').find('.quiz-content');

          if(isCheckedAll(blockQuestion)) {
            /*
            that.saveData(modal, me)
              .then(function (data) {
                return that.showResultModal(data);
              })
              .then(function (data) {
              }, function (err) {

              });*/
            var questions = blockQuestion.find('[data-question-id]'),
                arrayQuestion = [],
                id = me.data('id');

            for(var i = 0, len = questions.length; i < len; i++) {
              var question = $(questions[i]);
              var answer = { 'category_id': id, 'question_id': question.data('question-id'), 'point': question.find('.active').length };
              arrayQuestion.push(answer);
            }
            console.log('arrayQuestion',arrayQuestion);
          }
          else {
            var alertIfNotCheckAll = L10n.valid.quizcheck;
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

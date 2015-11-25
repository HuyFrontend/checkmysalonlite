/**
   *  @name validate-form
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
    var pluginName = 'validate-form',
        L10n = window.L10n,
        lang = $('html').attr('lang');

    function Plugin(element, options) {
      this.element = $(element);
      this.options = $.extend({}, $.fn[pluginName].defaults, options);
      this.init();
    }

    Plugin.prototype = {
      init: function() {
        var that = this,
            elm = that.element,
            opt = that.options;
        var body = elm.closest('body');

        that.createMethod();
        that.validateForm();

        body.off('focus.formField', '[required="required"]').on('focus.formField', '[required="required"]', function () {
          var me = $(this);
          me.prev().addClass(opt.classHidden);
        });
        body.off('blur.formField', '[required="required"]').on('blur.formField', '[required="required"]', function () {
          var me = $(this);
          if(!me.val()) {
            me.prev().removeClass(opt.classHidden);
          }
        });
        body.off('click.holderElement', '[data-holder]').on('click.holderElement', '[data-holder]', function () {
          var me = $(this);
          me.addClass(opt.classHidden);
          me.next().focus();
        });
        body.off('click.offPopup touchstart.offPopup', '.' + opt.elementOverlay).on('click.offPopup touchstart.offPopup', '.' + opt.elementOverlay, function (e) {
          var target = $(e.target);
          var content = target.hasClass(opt.classContentPopup) ? target : '';
          var child =  target.closest('.' + opt.classContentPopup).length ? target.closest('.' + opt.classContentPopup) : '';
          if(!content && ! child) {
            $(this).addClass(opt.classHidden);
          }
        });
        body.off('click.offPopup touchstart.offPopup', '.' + opt.elementOverlay + ' a.close').on('click.offPopup touchstart.offPopup', '.' + opt.elementOverlay + ' a.close', function () {
            $(this).closest('.' + opt.elementOverlay).addClass(opt.classHidden);
        });
        body.off('kepress').on('keypress', 'form input', function(e) {
          var key = e.keyCode || e.which;
          if (key === 13) {
            elm.find('[type="submit"]').click();
            return false;
          }
        });
        // check to show hide holder label
        var holder = elm.find('[data-holder]');
        if(holder) {
          var next = holder.next();
          if(next.val()) {
            holder.addClass(opt.classHidden);
          }
          else {
            holder.removeClass(opt.classHidden);
          }
        }
      },
      validateForm: function () {
        var that = this, elm = that.element, opt = that.options;

        var rules = {
            'username': {
              required: true
            },
            'email': {
              required: true,
              validEmail: true
            },
            'message': {
              required: true,
            },
            'security': {
              required: true
            }
        };

        var messages = {
            'username': {
              required: L10n[lang].required.username
            },
            'email': {
              required: L10n[lang].required.email,
              validEmail: L10n[lang].invalid.email
            },
            'message': {
              required: L10n[lang].required.comment
            },
            'security': {
              required: L10n[lang].required.capcha
            }
        };
        var ajaxSubmit = function (form, calback) {
          form = $(form);
          var loadingIcon = '';
          if(opt.classLoadingIcon) {
            loadingIcon = elm.parent().find('.' + opt.classLoadingIcon);
            if(loadingIcon.length) {
              form.fadeOut();
              loadingIcon.removeClass(opt.classHidden);
              // elm.addClass(opt.classHidden);
              setTimeout(function () {
                loadingIcon.addClass(opt.classHidden);
                elm.removeClass(opt.classHidden);
                form.fadeIn();
              }, 3000);
            }
          }
          // check captcha image
          /*var fieldCaptcha = form.find('[' + opt.captchaElement + ']');
          var urlCaptcha = fieldCaptcha.attr(opt.captchaElement);
          var imgCaptcha = fieldCaptcha.find('img');
          var errorLabel = fieldCaptcha.find(opt.errorNoticeElement);*/
          //test ajax
          $.ajax({
              method: 'get',
              dataType: 'json',
              data: '',
              url: form.attr('action'),
              success: function (res) {
                var message = (res && res.message) ? res.message : '';
                var popup =  $('.' + opt.classContentPopup);
                popup.find('p').html(message);
                popup.parent().removeClass(opt.classHidden);
                if(calback && typeof calback === 'function') {
                  calback;
                }
              },
              error: function () {
              }
          });
          //real ajax
          /*
          $.ajax({
              method: 'post',
              dataType: 'json',
              url: form.attr('action'),
              data: {
                'action': 'ajax_contact_form_process',
                'data' : form.serialize(),
                'ic_form_token' : form.find('[name="ic_form_token"]').val()
              },
              success: function (res) {
                if(res) {
                  if(res.error === 0) {
                  }
                  else {
                  }
                  if(calback) {
                    calback;
                  }
                }
              },
              error: function () {
              }
          });
          */
        };

        elm.validate({
          rules: rules,
          messages: messages,
          invalidHandler: function(event, validator) {
            event.preventDefault();

            elm.find(opt.errorNoticeElement).addClass(opt.classHidden);
            var errorList = validator.errorList,
                firstErrorElement = errorList[0].element,
                firstErrorMessage = errorList[0].message,
                thisGroup = $(firstErrorElement).closest('.' + opt.classFormGroup),
                errorElement = thisGroup.find(opt.errorNoticeElement);

            errorElement.html(firstErrorMessage);
            errorElement.removeClass(opt.classHidden);

            setTimeout(function () {
              errorElement.addClass(opt.classHidden);
            }, 4000);
          },
          errorPlacement: function() {
            return false;
          },
          submitHandler: function (form) {
            //demo
            ajaxSubmit(form);
            // test();
            // var loadingIcon = '';
            // if(opt.classLoadingIcon) {
            //   loadingIcon = elm.parent().find('.' + opt.classLoadingIcon);
            //   loadingIcon.removeClass(opt.classHidden);
            //   // elm.addClass(opt.classHidden);
            //   elm.fadeOut();
            // }
            // setTimeout(function () {
            //   loadingIcon.addClass(opt.classHidden);
            //   elm.removeClass(opt.classHidden);
            // }, 3000);
            // // check captcha image
            // var fieldCaptcha = elm.find('[' + opt.captchaElement + ']');
            // var urlCaptcha = fieldCaptcha.attr(opt.captchaElement);
            // var imgCaptcha = fieldCaptcha.find('img');
            // var errorLabel = fieldCaptcha.find(opt.errorNoticeElement);

            // // check captcha
            /*$.ajax({
              method: 'get',
              data: '',
              url: urlCaptcha,
              success: function (data) {
                if(data) {
                  if(data.status === 'error') {
                    if(loadingIcon) {
                      loadingIcon.addClass(opt.classHidden);
                      elm.removeClass(opt.classHidden);
                      elm.fadeIn();

                    }
                    imgCaptcha.attr('src', data.imageSRC);
                    errorLabel.removeClass(opt.classHidden);
                    setTimeout(function () {
                      errorLabel.addClass(opt.classHidden);
                    },6000);
                    // alert('Example, this case: wrong captcha');
                  }
                  else {

                  }
                }
              },
              error: function () {
              }
            });*/
          }
        });
      },
      createMethod: function () {

        jQuery.validator.addMethod(
          'validEmail',
          function (value , element) {

            var rex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

            return this.optional(element) || rex.test(value);
          },
          L10n[lang].invalid.email
        );
      },
      removeHolder: function () {
        var me = $(this);
        console.log('me', me);
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
      groupErrorClass: 'has-error',
      errorClass: 'error-message',
      errorNoticeElement: 'span.error-message',
      classFormGroup: 'form-group',
      classHidden: 'hide',
      dataHolder: 'data-holder',
      classLoadingIcon: 'loading',
      classContentPopup: 'message-layer',
      elementOverlay: 'sm-overlay'
    };

    $(function() {
      $('[data-' + pluginName + ']')[pluginName]();
    });

}(jQuery, window));

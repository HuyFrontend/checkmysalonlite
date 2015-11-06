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
    errorLabels = errorInput.parent().find('.text-danger');

    errorLabels.hide();
    contentModal.empty();

    // $.each(errorLabels, function () {
    //   var me = $(this),
    //       text = me.text();
    //   contentModal.append('<p class="message">'+ text + '</p>');
    // });

    for(var i = 0, len = errorLabels.length; i < len; i++) {
      var thisLabel = errorLabels[i],
          thisText = thisLabel.text();
      contentModal.append('<p class="message">'+ thisText + '</p>');
    }

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

/**
 *  @name plugin
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
  'use strict';

  var pluginName = 'GetLocation';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this, elm = that.element, opt = that.options, body = elm.closest('body');

      opt.elementPopup = opt.elementPopup ? opt.elementPopup : $('[' + opt.dataPopup + ']');
      opt.elementSelect = opt.elementSelect ? opt.elementSelect : $('[' + opt.dataLocationSelect + ']');

      elm.off('click.selectLocation').on('click.selectLocation', '[' + opt.dataItem + ']', function () {
        // opt.elementPopup.removeClass(opt.classHidden);
        // opt.elementPopup.find('.' + opt.classPopupTitle).html($(this).attr('data-content'));
        // opt.valueLocation = $(this).attr('data-location');
        var thisValue = $(this).attr(opt.dataItem);

        if(thisValue) {
          opt.elementSelect.val(thisValue);
          opt.elementSelect.trigger('change');
          $('#username[type="text"]').focus();
        }
      });

      // click body
      body
        .off('click.hidePopupSendMail touchstart.hidePopupSendMail', '[' + opt.dataPopup + ']')
        .on('click.hidePopupSendMail touchstart.hidePopupSendMail', '[' + opt.dataPopup + ']', function (e) {
          var target = $(e.target);
          var content = target.hasClass(opt.classPopupContent) ? target : '';

          var child =  target.closest('.' + opt.classPopupContent).length ? target.closest('.' + opt.classPopupContent) : '';
          if(!content && ! child) {
            $(this).addClass(opt.classHidden);
          }
        });

      // click button cancel
      opt.elementPopup
        .off('click.cancelPopupSendMail touchstart.cancelPopupSendMail')
        .on('click.cancelPopupSendMail touchstart.cancelPopupSendMail', '[data-send-cancel]', function () {
          $(this).closest('[' + opt.dataPopup + ']').addClass(opt.classHidden);
        });
      // click button confirm
      opt.elementPopup
        .off('click.confirmPopupSendMail touchstart.confirmPopupSendMail')
        .on('click.confirmPopupSendMail touchstart.confirmPopupSendMail', '[data-send-ok]', function () {
          $(this).closest('[' + opt.dataPopup + ']').addClass(opt.classHidden);
            if(opt.valueLocation) {
              opt.elementSelect.val(opt.valueLocation);
              opt.elementSelect.trigger('change');
              $('#username[type="text"]').focus();
              // $('#username[type="text"]').trigger('touchstart');
            }
        });

      // init select option
      var firstOptionText = $(opt.elementSelect).find('option:first').html();
      var span = $(opt.elementSelect.closest('.' + opt.classFormGroup).find('.' + opt.classSelectText));
      span.html(firstOptionText);
      opt.elementSelect.off('change.selectLocationOffice').on('change.selectLocationOffice', function () {
        var me = $(this);
        var selectText = me.find('[value="' + me.val() + '"]').html();
        me.closest('.' + opt.classFormGroup).find('.' + opt.classSelectText).html(selectText);
      });
/*
      $( window ).off('orientationchange.blurFormField').on('orientationchange.blurFormField', function() {

      });*/

    },
    destroy: function() {
      // remove events
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
      }
    });
  };

  $.fn[pluginName].defaults = {
    dataItem: 'data-location',
    dataPopup: 'data-popup-send-mail',
    dataLocationSelect: 'name="contact_to"',
    classSelectText: 'value-selected',
    classFormGroup: 'form-group',
    classActive: 'active',
    classHidden: 'hide',
    classPopupTitle: 'name-office',
    classPopupContent: 'message-layer',
    elementPopup: '',
    elementSelect: '',
    valueLocation: 0
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-toggle="HoverElement"]')[pluginName]();
  });

}(jQuery, window));

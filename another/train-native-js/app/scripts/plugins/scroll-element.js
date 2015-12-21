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

  var pluginName = 'scroll-element';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.options.hideAterScroll = this.element.attr('data-hide-on-scroll') ? this.element.attr('data-hide-on-scroll') : this.options.hideAterScroll;
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this, elm = that.element, opt = that.options;

      elm.off('click.scrollMenu touchstart.scrollMenu').on('click.scrollMenu touchstart.scrollMenu', 'a[data-target]', function (e) {
        var target = $(e.target),
          elementScrollTo = target.attr('data-target') ? $('#' + target.data('target')) : $('#' + target.closest('[data-target]').attr('data-target')),
          headerHeight = $('.header').height();

        elm.find('.'+ opt.classActive).removeClass(opt.classActive);
        target.closest('li').addClass(opt.classActive);

        if(opt.hideAterScroll) {
          $('#' + opt.idWrapMenu).removeClass(opt.classOpen);
          $('[data-target="'+ opt.idWrapMenu +'"]').removeClass(opt.classActive);
        }
        if(!window.isMobileTablet) {
          $(window).off('scroll');
        }
        if(elementScrollTo && elementScrollTo.length) {
          setTimeout(function (){
            $('html, body').stop().animate({
              scrollTop: elementScrollTo.offset().top - headerHeight + 9
            }, 500 );
          }, 300);
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
      }
    });
  };

  $.fn[pluginName].defaults = {
    classOpen: 'collapse',
    classActive: 'active',
    idWrapMenu: 'menu-wrapper',
    hideAterScroll: false
  };

  $(function() {
    $('[data-toggle="ScrollMenu"]')[pluginName]();
  });

}(jQuery, window));


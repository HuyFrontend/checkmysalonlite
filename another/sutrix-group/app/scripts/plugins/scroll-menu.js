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

  var pluginName = 'scroll-menu';
  var body = $('body');

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.options.hideAterScroll = this.element.attr('data-hide-on-scroll') ? this.element.attr('data-hide-on-scroll') : this.options.hideAterScroll;
    this.options.scrollWhenHover = this.element.attr('data-scroll-when-holver') ? this.element.attr('data-scroll-when-holver') : this.options.scrollWhenHover;
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
          $('#' + opt.blockEffect).removeClass(opt.classOpen);
          $('[data-target="'+ opt.blockEffect +'"]').removeClass(opt.classActive);
        }
        if(!window.isMobileTablet) {
          $(window).off('scroll');
        }
        if(elementScrollTo && elementScrollTo.length) {
          setTimeout(function (){
            $('html, body').stop().animate({
              scrollTop: elementScrollTo.offset().top - headerHeight
            }, 500 );
            // $(window).off('scroll');
          },900);          
        }
      });

      if((!opt.scrollWhenHover || opt.scrollWhenHover === 'false') && opt.blockEffect) {
        var headerHeight = $('.header').height(),
            subMenuHeight = elm.height(),
            winHeight = $(window).height();
        if(winHeight > (subMenuHeight + headerHeight)) {
          if(!window.isMobileTablet) {
            body
              .off('mouseover.offBodyScroll, mouseenter.offBodyScroll')
              .on('mouseover.offBodyScroll, mouseenter.offBodyScroll', '#' + opt.blockEffect, function () {
                $('body').on('wheel mousewheel', function () {
                  return false;
                });
              });

            body
              .off('mouseout.onBodyScroll, mouseleave.onBodyScroll')
              .on('mouseout.onBodyScroll, mouseleave.onBodyScroll', '#' + opt.blockEffect, function () {
                $('body').off('wheel mousewheel');
              });
          }
        }
      }
      if(window.isMobileTablet) {
        body.off('touchstart touchmove').on('touchstart touchmove', function () {
          // alert(1212);
          $(window).off('scroll').on('scroll');
        });
      }
    },
    destroy: function() {
      // remove events
      // deinitialize
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
    blockEffect: 'menu-wrapper',
    hideAterScroll: false,
    scrollWhenHover: true
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $('[data-toggle="ScrollMenu"]')[pluginName]();
  });

}(jQuery, window));


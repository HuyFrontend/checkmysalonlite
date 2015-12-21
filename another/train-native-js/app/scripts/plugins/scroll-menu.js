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

  var elements = function () {
    var elements = [];
    var idElements = document.querySelectorAll('#menu-wrapper [data-target]');
    for (var i = 0, len = idElements.length; i < len; i++) {
      var dataTarget = idElements[i].getAttribute('data-target');
      var item = document.getElementById(dataTarget);
      elements.push(item);
    }
    return elements;
  };

  var offScrollBody = function () {
    $('body').on('wheel mousewheel', function () {
      return false;
    });
  };

  var onScrollBody = function () {
    $('body').off('wheel mousewheel');
  };

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function () {
      var that = this,/* elm = that.element,*/ opt = that.options;
      opt.elementWrapMenu = opt.elementWrapMenu? opt.elementWrapMenu : document.getElementById(opt.idWrapMenu);
      if(!window.isMobileTablet) {
        opt.elementWrapMenu.addEventListenerOrAttachEventMultiEvent (offScrollBody, ['mouseenter']);
        opt.elementWrapMenu.addEventListenerOrAttachEventMultiEvent (onScrollBody, ['mouseleave']);
      }

      if(window.isMobileTablet) {
        body.off('touchstart touchmove touchend resize').on('touchstart touchmove touchend resize', function () {
          $(window).off('scroll').on('scroll');
        });
      }
      // active item menu when scroll page
      var elms = elements();
      function getMiddeElement (e, elements) {
        return window.findMiddleElementOfScreenWhenScroll(e, elements);
      }
      function setActiveItemMenu (middleBlock, menu) {
        if(!middleBlock || !menu) {
          return;
        }
        var id = middleBlock.id;
        var targetItem = menu.querySelector('[data-target="' + id+ '"]');
        var activedItems = menu.querySelectorAll('li.active');
        for(var i = 0, len = activedItems.length; i < len; i++) {
          activedItems[i].removeClass(opt.classActive);
        }
        targetItem.parentNode.addClass(opt.classActive);
      }

      function activeMenuWhenResize(e) {
        var middleBlock = getMiddeElement(e, elms);
        var menu = document.getElementById(opt.idWrapMenu);
        setActiveItemMenu(middleBlock, menu);
      }
      window.removeEventListenerOrDetachEventMultiEvent(activeMenuWhenResize, ['scroll']);
      window.addEventListenerOrAttachEventMultiEvent(activeMenuWhenResize, ['scroll']);
      // resize middle block when resize screen
      var resizeId;
      function activeItemMenu (e) {
        clearTimeout(resizeId);
        var middleBlock = getMiddeElement(e, elms);
        var menu = document.getElementById(opt.idWrapMenu);
        var setActive = setActiveItemMenu(middleBlock, menu);
        resizeId = setTimeout(setActive, 20);
      }

      window.removeEventListenerOrDetachEventMultiEvent(activeItemMenu, ['orientationchange']);
      window.addEventListenerOrAttachEventMultiEvent(activeItemMenu, ['orientationchange']);

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
    classActive: 'active',
    idWrapMenu: 'menu-wrapper',
    elementWrapMenu: ''
  };

  $(function() {
    $('[data-' + pluginName + ']').on('customEvent', function() {
      // to do
    });

    $(document)[pluginName]();
  });

}(jQuery, window));


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
;
(function($, window, undefined) {
  var pluginName = 'plugin-carousel',
    ITEM_MARGIN = 30,
    MOBILE_MAX_WIDTH = 568;

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  function viewportWidth() {
    if (window.Modernizr.touch) {
      return $(window).width();
    } else {
      if (navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i)) {
        return document.documentElement.clientWidth;
      } else {
        return window.innerWidth || document.documentElement.clientWidth;
      }
    }
  }

  function removeDataSlider(that) {
    if (that.element.data('flexslider')) {
      that.element
        .removeData('flexslider')
        .empty()
        .append(that.sliderContent.clone());
    }
  }

  function initDeskSlider(that) {
    removeDataSlider(that);
    that.element
      .flexslider(that.sliderDeskOpts)
      .data('mobile-slider', false)
      .data('desk-slider', true);
  }

  function initMobileSlider(that) {
    removeDataSlider(that);
    that.element
      .flexslider(that.sliderMobileOpts)
      .data('desk-slider', false)
      .data('mobile-slider', true);
  }


  function checkUseSlider(that) {
    if (viewportWidth() >= MOBILE_MAX_WIDTH) {
      if (!that.element.data('desk-slider')) {
        initDeskSlider(that);
      }
    } else {
      if (!that.element.data('mobile-slider')) {
        initMobileSlider(that);
      }
    }
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
        win = $(window),
        slider = this.element,
        defaultOpts = {
          animation: 'slide',
          selector: '.item-list-1 > li',
          controlNav: false,
          directionNav: true,
          slideshow: that.options.autoplay,
          start: function(slider) {
            slider.resize();
          },
          after: function (slider) {
              if (!slider.playing && defaultOpts.slideshow) {
                  slider.play();
              }
          }
        },
        maxItemIdx;
      this.sliderContent = this.element.children().clone();
      this.itemLength = $('.item-list-1 > li', slider).length;
      maxItemIdx = Math.ceil(this.itemLength / 3) - 1;

      this.sliderDeskOpts = $.extend({}, defaultOpts, {
        itemWidth: (slider.width() + ITEM_MARGIN) / 3,
        minItems: 3,
        maxItems: 3,
        itemMargin: 30
      });
      if(that.itemLength <= 3) {
        this.sliderDeskOpts.directionNav = false;
      }

      this.sliderMobileOpts = defaultOpts;

      win.on('resize.' + pluginName, function() {
        checkUseSlider(that);
      }).trigger('resize.' + pluginName);
    },

    destroy: function() {
      removeDataSlider(this);
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
    autoplay: true
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({});
  });

}(jQuery, window));

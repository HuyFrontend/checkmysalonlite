/**
 *  @name slide
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
  var pluginName = 'slide',
    BANNER = 'banner';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      // var self = this;
      switch (this.options.type) {
        case BANNER:
          this.initBanner();
          break;
        case 'office':
          this.initOffice();
          break;
        case 'manager':
          this.initManager();
          break;
        case 'ourService':
          this.initOurService();
          break;
        case 'ourCaseStudy':
          this.initOurCaseStudy();
          break;
        default:
          this.initBanner();
      }
    },
    initOffice: function() {
      var that = this;
      var optionSlick = {
        accessibility: false,
        autoplay: false,
        infinite: true,
        pauseOnHover: true,
        draggable: false,
        useCSS: false,
        slidesToShow: that.options.slidetoshow,
        arrows: true,
        slidesToScroll: that.options.slidetoshow,
        responsive: [{
          breakpoint: 1280,
          settings: {
            draggable: true
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },{
          breakpoint: 1025,
          settings: {
            slidesToShow: that.options.slidetablet || 5,
            slidesToScroll: that.options.slidetablet || 5
          }
        }]
      };

      this.element.slick(optionSlick);
    },
    initManager: function() {
      var optionSlick = {
        accessibility: false,
        autoplay: false,
        infinite: true,
        pauseOnHover: true,
        draggable: false,
        slidesToShow: 5,
        useCSS: false,
        arrows: true,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 1280,
          settings: {
            draggable: true,
            slidesToShow: 5,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 768,
          settings: {
            draggable: true,
            slidesToShow: 5,
            slidesToScroll: 1
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      };

      this.element.slick(optionSlick);
    },
    initOurService: function() {
      var optionSlick = {
        accessibility: false,
        autoplay: false,
        infinite: true,
        pauseOnHover: true,
        draggable: false,
        slidesToShow: 3,
        arrows: false,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 1280,
          settings: {
            draggable: true
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        }]
      };

      this.element.slick(optionSlick);
    },
    initOurCaseStudy: function() {
      var optionSlick = {
        accessibility: false,
        autoplay: false,
        infinite: true,
        pauseOnHover: true,
        dots: true,
        mobileFirst: true,
        draggable: true,
        slidesToShow: 1,
        useCSS: false,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 767,
          settings: {
            dots: false
          }
        }, {
          breakpoint: 1280,
          settings: {
            draggable: false,
            dots: false
          }
        }]
      };

      this.element.slick(optionSlick);
    },
    initBanner: function() {
      var that = this;
      var opt = that.options;
      var optionSlick = {
        accessibility: false,
        autoplay: true,
        autoplaySpeed: that.options.autoplayspeed,
        infinite: true,
        pauseOnHover: true,
        useCSS: false,
        slidesToShow: 1,
        dots: true,
        arrows: false,
        draggable: false,
        slidesToScroll: 1,
        responsive: [{
          breakpoint: 1280,
          settings: {
            draggable: true
          }
        }]
      };

      // this.element.slick(optionSlick);
      this.element.slick(optionSlick)
        .on ('beforeChange', function (event, slick, currentSlide, nextSlide) {
          if(opt.isFirst) {
            var target = $(this).find('[' + opt.dataSlickIndex + '="' + nextSlide +'"]' + '[' + opt.dataSlideOptional + ']');
            if(target && target.length) {
              opt.elementTarget = target;
              opt.indexTargetItem = parseInt(opt.elementTarget.attr(opt.dataSlickIndex));
              opt.isFirst = false;
            }
          }
          else {
            if(nextSlide === opt.indexTargetItem) {
              if ( (currentSlide === (nextSlide - 1)) || (nextSlide ===0 && currentSlide !== 1) ){

                var contents = opt.elementTarget.find('[' + opt.dataSubItem + ']');
                contents.toggleClass(opt.classHidden);
              }
            }
          }
        });
    },
    destroy: function() {
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
      } else {
        window.console && console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
      }
    });
  };

  $.fn[pluginName].defaults = {
    autoplayspeed: 5000,
    classSlickTrack: 'slick-track',
    classHidden: 'hide',
    slidetoshow: 5,
    slideTablet: 'data-slidetablet',
    dataSlickIndex: 'data-slick-index',
    dataSlideOptional: 'data-slide-optional',
    dataSubItem: 'data-sub-item',
    indexTargetItem: '',
    elementTarget : '',
    isFirst: true
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]();
  });

}(jQuery, window));

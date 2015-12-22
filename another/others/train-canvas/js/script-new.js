/**
 * @name LivingRoom
 * @description Define global variables and functions
 * @version 1.0
 */
var LivingRoom = (function ($, window, undefined) {
    // global variable
    var $window = $(window),
      flexslider,
      timer;

    function globalFunct() {
        toggleNav();
        initGooglemap();
        popup();
        lightbox();
        $('[data-checkbox]').smCheckbox();
        $('.btn-share-fb').attr('href', 'http://www.facebook.com/sharer.php?u=' + window.location.href);
        $('.btn-share-google').attr('href', 'https://plus.google.com/share?url=' + window.location.href);
        $('.btn-share-twitter').attr('href', 'http://www.twitter.com/share?url=' + window.location.href);
        var contentVideo = $('#video').html();
        $('#video').empty();
        $('[data-tabs]').smTabs({
            afterShow: function () {
                if ($(this).is('#map')) {
                    if (!window.initGoogle) {
                        window.initGoogle = true;
                        window.initializeGoogle();
                    }
                }

                if ($(this).is('#sketcs')) {
                    $('[data-select]').smSelect();
                    $('#backIsometricView').on('click.backIsometricView', function () {
                        $('.selectlist').find('li:first').trigger('click.selectOption');
                    });
                    $('#backIsometricView').hide();
                    implementFlexSlider4Sketc();
                }
                /*if ($(this).is('#sketcs')) {
                  if (window.initSketchBuilding) {
                    $(window).trigger('resize.scale');
                  }
                  else {
                    sketchBuilding();
                  }
                }*/
                if ($(this).is('#video')) {
                    $('#video').html(contentVideo);
                } else {
                    $('#video').empty();
                }
                if ($(this).is('#plans')) {
                    plans_Slider();
                }
            }
        });
    }


    function plans_Slider() {
        $('#plans-slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            touch: false,
            sync: "#thumbnails"/*,
    start: function(){
    $('<div>').attr('class','flex-overlay').appendTo('#plans-slider .flex-viewport');
    }*/
        });

        $('#thumbnails').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 139,
            itemMargin: 10,
            touch: false,
            asNavFor: "#plans-slider"
        });
    }


    function popup() {
        $('[data-popup]').unbind('click.popup').bind('click', function () {
            var sh = 800;
            var sw = 600;
            if ($(this).data('popup') === 'fullScreen') {
                sw = screen.availWidth - 16;
                sh = screen.availHeight - 65;
            }
            var newwindow = window.open($(this).prop('href'), 'Slider', 'height=' + sh + ', width=' + sw);
            if (window.focus) { newwindow.focus(); }
            return false;
        });
    }


    function lightbox() {
        $('[data-lightbox]').unbind('click.lightbox').bind('click.lightbox', function (e) {
            e.preventDefault();
            var elm = $(this).attr('href');//#lightbox
            $(elm).fadeIn(function () {
                var content = $(elm).children();
                var hContent = content.innerHeight();
                var wContent = content.innerWidth();
                $(content).animate({ marginTop: -hContent / 2 });
            });
            $(elm).find('.close').unbind('click.close').bind('click.close', function () {
                $(elm).fadeOut();
            });
            content.unbind('click.disable').bind('click.disable', function () {
                return false;
            });
        });
    }


    function toggleNav() {
        $('.button-nav').off('click').on('click', function () {
            $(this).toggleClass('active');
            $(this).next().toggleClass('hidden');
            return false;
        });
        $('body').off('click').on('click', function (e) {
            if (!$(e.target).hasClass('button-nav')) {
                $('.button-nav').removeClass('active');
                $('.main-nav-2').addClass('hidden');
            }
        });

        $window.unbind('resize.resizewindow').bind('resize.resizewindow', function () {
            if (window.innerWidth > 767) {
                $('.button-nav').removeClass('active');
                $('.main-nav-2').addClass('hidden');
            }
        });
    }


    function initGooglemap() {
        if ($('#map').length) {
            var wrapperMap = $('#map');
            var latlng = wrapperMap.children().attr('data-latlog');
            if (latlng) {
                var latLog = latlng.split(',');
                var zoomLevel = wrapperMap.children().attr('data-zoomLevel') || 15;
                window.initGoogle = false;
                window.initializeGoogle = function () {
                    var myLatlng = new google.maps.LatLng(latLog[0], latLog[1]);
                    var mapOptions = {
                        zoom: parseInt(zoomLevel),
                        center: myLatlng
                    };

                    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map
                    });
                };
            }
            else {
                var geocoder = new google.maps.Geocoder();
                var address = wrapperMap.children('address').html();
                //location of company
                var latitude = 55.664166;
                var longitude = 12.573462;

                geocoder.geocode({ 'address': address }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        latitude = results[0].geometry.location.lat();
                        longitude = results[0].geometry.location.lng();
                    }
                    window.initGoogle = false;
                    window.initializeGoogle = function () {
                        var myLatlng = new google.maps.LatLng(latitude, longitude);
                        var mapOptions = {
                            zoom: 15,
                            center: myLatlng
                        };
                        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                        var marker = new google.maps.Marker({
                            position: myLatlng,
                            map: map
                        });
                    };
                });
            }
        }
    }
    //END global functions


    function home() {
        if ($('#main-slideshow').length) {
            var mainSlideshow = $('#main-slideshow');
            var setArrowPosition = function () {
                var slideArrows = mainSlideshow.find('.flex-direction-nav a');
                slideArrows.css('top', '');
                if ($(window).width() < 768) {
                    var activeImage = mainSlideshow.find('.flex-active-slide figure > img');
                    var height = activeImage.height();
                    slideArrows.css('top', height / 2);
                }
            };

            $('#main-slideshow').flexslider({
                animation: 'slide',
                controlNav: false,
                animationLoop: true,
                slideshow: true,
                touch: false,
                start: function () {
                    setArrowPosition();
                },
                after: function () {
                    setArrowPosition();
                }
            });

            $(window).on('resize.mainSlideshow', function () {
                setArrowPosition();
            });
        }

        if ($('#search-form').length) {
            $('#search-form')
            .smValidator({
                rules: {
                    'txt-price-from': {
                        allowChar: 'number',
                        valid: {}
                    },
                    'txt-price-to': {
                        allowChar: 'number',
                        valid: {}
                    }
                },
                onSubmit: function () { return true; },
                submitSelector: $('#search-btn'),
                errorOption: 1
            })
            .unbind('submit').bind('submit', function (e) {
                priceFrom = $('#txt-price-from').val();
                priceTo = $('#txt-price-to').val();
                if (priceFrom > 0 && priceTo > 0 && priceFrom >= priceTo) {
                    e.preventDefault();
                    $('.error-price').fadeIn().ready(function () {
                        setTimeout(function () { $('.error-price').fadeOut(); }, '3000');
                    });
                }
            });
        }
    }
    //END Home functions


    function forsaleLanding() {
        $('#landing-slider').flexslider({
            animation: 'slide',
            controlNav: false,
            animationLoop: true,
            directionNav: true,
            touch: false,
            slideshow: true/*,
    start: function(){
    $('<div>').attr('class','flex-overlay').appendTo('#landing-slider');
    }*/
        });
        /*$('#sketcs-slide').flexslider({
          animation: 'slide',
          controlNav: false,
          animationLoop: true,
          slideshow: true,
          touch: false
        });*/
        /*sketchBuilding();*/
    }



    function implementFlexSlider4Sketc() {
        var count, imgElm;
        count = 0;
        imgElm = $('#sketcs-slide').find('img');
        var lengthImg = imgElm.length;
        imgElm.each(function () {
            var img;
            img = new Image();
            img.onload = function () {
                count++;
                if (lengthImg === count) {
                    //$('#sketcs-slide').removeClass('loading');
                    $('.loading').addClass('hidden');
                    $('#sketcs-slide').find('ul').removeClass('hidden');
                    $('#sketcs-slide').flexslider({
                        animation: 'slide',
                        controlNav: false,
                        animationLoop: true,
                        pauseOnHover: true,
                        slideshow: false,
                        touch: false
                    });
                    initSketchMap();
                    setTimeout(function () {
                        $(window).trigger('resize.scale');
                    }, 100)
                }
            };
            img.src = this.src;
        });
    }

    function initSketchMap() {
        var sketchSlider = $('#sketcs-slide');
        var sketchBuild = sketchSlider.find('[data-sketcs]');
        var wD = sketchBuild.data('width');
        var hD = sketchBuild.data('height');
        // wD = 750; hD = 750;
        var cssHooks = {};
        cssHooks.transitions = (function () {
            var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
            for (var i in props) {
                if (obj.style[props[i]] !== undefined) {
                    cssHooks.pfx = props[i].replace('Perspective', '').toLowerCase();
                    cssHooks.prop = "-" + cssHooks.pfx + "-transform";
                    cssHooks.backfaceVisibility = "-" + cssHooks.pfx + "-backface-visibility";
                    return true;
                }
            }
            return false;
        }());
        window.cssHooks = cssHooks;

        if (Modernizr.touch) {
            var isNotHover = true;
        }
        var highlightImg = $('img').filter(function () {
            return $(this).parent().find('area').length;
        });
        highlightImg.maphilight({
            fillColor: '05d1fd',
            strokeColor: '05d1fd',
            strokeOpacity: 0.2
        });

        var mobile = isMobile.mobile(),
        tablet = isMobile.iOS('iPad');
        if (mobile || tablet) {
            $(window).bind('resize.scale', function () {
                if (sketchBuild.is(':visible')) {
                    sketchBuild.css({
                        height: sketchBuild.width() / wD * hD
                    });
                    sketchBuild.children('div:first-child').css({
                        'margin-left': (sketchBuild.width() - wD) / 2,
                        'margin-top': (sketchBuild.height() - hD) / 2,
                        'z-index': '99'
                    });
                    sketchBuild.children('div:first-child').css(cssHooks.prop, 'scale(' + sketchBuild.width() / wD + ')');
                    // sketchSlider.css(cssHooks.prop, 'scale(' + sketchBuild.width() / wD + ')');
                    var sketchH = sketchBuild.height();
                    sketchSlider
                        .css({
                            'min-height': sketchH,
                            'height': sketchH
                        })
                        .find('.flex-viewport').height(sketchH);
                }
            }).trigger('resize.scale');
        }

        sketchBuild.find('map area').on('click', function (e) {
            e.preventDefault();
            var href = $(this).attr('href').replace('-', ' '),
                selectFloor = $('#select-floor'),
                selected = selectFloor.next('a').find('.title'),
                selector = selectFloor.siblings('ul'),
                option = selector.find('[value="' + href + '"]');

            selector.find('li').removeClass('focus').end();
            option.addClass('focus');
            window.sketchLoadAjax(href);
            selected.html(option.html());
            return false;
        });
    }
    //END Forsale Landing functions

    function specificProperty() {
        if ($('#book-showing-btn').length) {
            $('#book-showing-btn').unbind('click.showing').bind('click.showing', function (e) {
                e.preventDefault();
                $($(this).attr('href')).slideToggle('slow', function () {
                    var elm = $(this);
                    $('html, body').animate({ scrollTop: $(this).offset().top }, 500, 'swing');
                    elm.find('#close').unbind('click.hide').bind('click.hide', function (e) {
                        elm.slideUp();
                    });
                    return false;
                });
            });
        }
        if ($('#project-slider').length && $('#thumbs').length) {
            $('#project-slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                touch: false,
                sync: "#thumbs"/*,
      start: function(){
      $('<div>').attr('class','flex-overlay').appendTo('#project-slider .flex-viewport');
      }*/
            });

            $('#thumbs').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 139,
                itemMargin: 10,
                touch: false,
                asNavFor: "#project-slider"
            });
        }

        if ($('#kontakt-form').length) {
            $('#kontakt-form').smValidator({
                rules: {
                    'txt-username': {
                        valid: {
                            required: true,
                            minLen: 1,
                            maxLen: 30
                        },
                        duration: 3000,
                        message: {
                            required: L10n.required.username,
                            minLen: L10n.valid.minlength,
                            maxLen: L10n.valid.maxlength
                        }
                    },
                    'txt-email': {
                        valid: {
                            required: true,
                            email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                            maxLen: 40
                        },
                        message: {
                            required: L10n.required.email,
                            email: L10n.valid.email,
                            maxLen: L10n.valid.maxlength
                        }
                    },
                    'txt-phone': {
                        allowChar: 'number',
                        valid: {
                            required: true,
                            phone: true
                        },
                        message: {
                            required: L10n.required.phone,
                            phone: L10n.valid.phone
                        }
                    }/*,
      'txt-besked': {
      valid: {
        required: true,
        minLen: 1
      },
      duration: 3000,
      message: {
        required: L10n.required.note,
        minLen: L10n.valid.minlength
      }
      },
      'checkbox': {
      valid: {
        checked: true
      },
      message: {
        checked: L10n.required.place
      }
      }*/
                },
                onSubmit: function () {
                    setTimeout(function () {

                    }, 4000);
                    return true;
                },
                submitSelector: $('#send-btn'),
                resetSelector: $('#clear-btn'),
                errorOption: 2
            });
        }
    }
    //END Specific functions


    function popupSlider() {
        if ($('#popup-slider').length && $('#popup-slider-thumbs').length) {
            $('#popup-slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                sync: "#popup-slider-thumbs"
            });
            //$('#popup-slider .slides img').css({'max-width': window.innerWidth});

            $('#popup-slider-thumbs')
            .flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 200,
                itemMargin: 10,
                asNavFor: "#popup-slider"
            })
            .bind('mouseenter.showThumbs', function () {
                $(this).animate({ 'opacity': '1' });
            })
            .bind('mouseleave.hideThumbs', function () {
                $(this).animate({ 'opacity': '0' });
            });
        }
    }
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry|BB/i) ? true : false;
        },
        iOS: function (device) {
            if (device === 'iPhone') {
                return navigator.userAgent.match(/iPhone|iPod/i) ? true : false;
            }
            else if (device === 'iPad') {
                return navigator.userAgent.match(/iPad/i) ? true : false;
            } else {
                return navigator.userAgent.match(/iPhone|iPod|iPad/i) ? true : false;
            }
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i) ? true : false;
        },
        mobile: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS('iPhone') || isMobile.Windows());
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
        }
    };

    return {
        globalFunct: globalFunct,
        page: {
            home: home,
            advisory: '',
            forsaleLanding: forsaleLanding,
            specificProperty: specificProperty,
            popupSlider: popupSlider
        },
        isMobile: isMobile
    };
})(jQuery, window);

jQuery(function () {
    LivingRoom.globalFunct();
    LivingRoom.page.home();
    LivingRoom.page.forsaleLanding();
    LivingRoom.page.specificProperty();
    LivingRoom.page.popupSlider();
});
/**
 *  @name smSelect
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
; (function ($, window, undefined) {
    var pluginName = 'smSelect';
    var selectEle = null,
        btnSelect = null,
        selectBox = null,
        templateSelect = '<ul class="selectlist hidden">';
    var selectOption = function (e) {
        console.log('asdad');
        var _this = $(this),
            val = _this.attr('value');
        // $('.loading').removeClass('hidden');
        btnSelect.find('span.title').html(_this.html());
        btnSelect.addClass('selected');
        selectBox.find('.selectlist li').each(function () {
            $(this).removeClass('focus');
        });
        _this.addClass('focus');
        btnSelect.trigger('click.toggleOption');
        selectEle.val(val);
        loadAjax(val);
    };

    var toogleOption = function (e) {
        e.stopPropagation();
        var selectList = selectBox.find('.selectlist');
        if (selectList.hasClass('hidden')) {
            selectList.removeClass('hidden');
        } else {
            selectList.addClass('hidden');
        }
    };

    var closeOption = function (e) {
        selectBox.find('.selectlist').addClass('hidden');
    };

    var chooseOption = function (evt) {
        var selectList = selectBox.find('.selectlist'),
            hoverClass = 'focus';
        if (!selectList.hasClass('hidden')) {
            var listDL = selectBox.find('.selectlist'),
                currentHover = listDL.find('.' + hoverClass),
                allLi = listDL.find('li'),
                hoverIndex = allLi.index(currentHover),
                hoverIndexTop = allLi.eq(hoverIndex).position().top,
                minCount = 0,
                maxCount = allLi.length - 1,
                liHeight = allLi.eq(hoverIndex).height(),
                maxScrollTop = allLi.eq(maxCount).position().top,
                listDLScrollTop = listDL.scrollTop(),
                listDLHeight = listDL.height();
            switch (evt.which) {
                case 38:
                    if (hoverIndex > minCount) {
                        hoverIndex--;
                        if (hoverIndexTop < liHeight) {
                            listDL.scrollTop(listDLScrollTop - 5 * liHeight);
                        }
                        if (hoverIndex == maxCount) {
                            listDL.scrollTop(maxScrollTop);
                        }
                        currentHover.removeClass(hoverClass);
                        allLi.eq(hoverIndex).addClass(hoverClass);
                    }
                    evt.preventDefault();
                    break;
                case 40:
                    if (hoverIndex < maxCount) {
                        hoverIndex++;
                        if (hoverIndexTop > (listDLHeight - liHeight)) {
                            listDL.scrollTop(listDLScrollTop + 5 * liHeight);
                        }
                        if (hoverIndex == minCount) {
                            listDL.scrollTop(0);
                        }
                        currentHover.removeClass(hoverClass);
                        allLi.eq(hoverIndex).addClass(hoverClass);
                    }
                    evt.preventDefault();
                    break;
                case 13:
                    btnSelect.find('span.title').html(currentHover.html());
                    btnSelect.addClass('selected');
                    btnSelect.trigger('click.toggleOption');
                    selectEle.val(currentHover.attr('value'));
                    loadAjax(currentHover.attr('value'));
                    evt.preventDefault();
                    break;
                case 32:
                    evt.preventDefault();
                    break;
            }
        }
    };

    var getCord = function (area) {
        var i, x = [], y = [];
        var c = area.split(',');


        /*for (i = 0; i < c.length; i++) {
            x.push(c[i++]);
            y.push(c[i]);
        }
        var t = y.sort(num)[0];
        var l = x.sort(num)[0];*/
        return { 'top': Math.abs(c[1]), 'left': Math.abs(c[0]) };
    };

    /*var num = function (a, b) { return (a - b); };*/

    var getHeightWidthOfArea = function (area) {
        var cord = area.split(',');
        return { height: cord[cord.length - 1] - cord[1], width: cord[2] - cord[0] }
    };

    var showProjectDetail = function (data) {
        var container = $('.sketcs-detail[data-sketcs]');
        var slider = $('#sketcs-slide');
        var map = container.find('map#Map');
        var infoList = container.find('[data-info-list]');
        var toolTipBox = container.find('[data-tooltip-box]');
        var detailImg = container.find('.detail-img');
        var img = new Image();
        container.find('img').attr('src', data['detail-img']);
        img.onload = function () {
            container.removeClass('loading');
            toolTipBox.removeClass('hidden');
            $('.loading').addClass('hidden');

            map.empty();
            infoList.empty();
            toolTipBox.empty();
            $(data['area']).each(function (index) {
                var _this = this,
                    cordOfArea = getCord(_this.cord),
                    status = _this.status,
                    dimensionOfArea = getHeightWidthOfArea(_this.cord);
                
                if (status === 'T') {
                    map.append('<area data-maphilight="{&quot;fillColor&quot;:&quot;05d1fd&quot;,&quot;strokeColor&quot;:&quot;05d1fd&quot;}" id="project-' + index + '" alt="HATBORO" title="" href="' + _this.href + '" shape="poly" coords="' + _this.cord + '" data-status="' + status + '" />');
                }
                else {
                    map.append('<area data-maphilight="{&quot;fillColor&quot;:&quot;ff0000&quot;,&quot;strokeColor&quot;:&quot;ff0000&quot;}" id="project-' + index + '" alt="HATBORO" title="" href="' + _this.href + '" shape="poly" coords="' + _this.cord + '" data-status="' + status + '" />');
                }
                console.log(_this.info);
                infoList.append('<li data-id="project-' + index + '" data-infor="' + _this.info + '"></li>');
                if (status.toLowerCase() === 's') {
                    // toolTipBox.append('<li data-area="project-' + index + '" class="sold" id="block-' + index + '"><span>' + status + '.</span></li>');
                } else {
                    // toolTipBox.append('<li data-area="project-' + index + '" id="block-' + index + '"><span>' + status + '.</span></li>');
                }
                li = toolTipBox.find('li#block-' + index);
                //var wrapperWidth = container.outerWidth() - $('.detail-img').outerWidth();
                var wrapperWidth = container.outerWidth();
                var offsetLeft = (container.outerWidth() - detailImg.outerWidth()) / 2;
                //29 is height of status box, 7 is height of triangle, 42 is width of status box
                li.css({ 'top': cordOfArea.top - 29 - 7, 'left': cordOfArea.left - (42 / 2) + offsetLeft });
            });
            initSketchBuilding();
        };
        img.src = data['detail-img'];

        slider.addClass('hidden');
        container.removeClass('hidden');
    };

    var initSketchBuilding = function () {
        window.initSketchBuilding = true;
        var cssHooks = window.cssHooks;

        var sketchBuild = $('#sketcs .sketcs-detail');
        //var sketch = sketchBuild.find('[data-sketcs]');
        var sketch = sketchBuild;
        var wD = sketch.data('width');
        var hD = sketch.data('height');
        var statusBox = sketchBuild.find('[data-status-box]');
        var context = sketchBuild.find('[data-context]');
        var templateHTMLDefault = statusBox.html();
        var timerSketch = 0;
        var isNotHover = false;
        if (Modernizr.touch) {
            isNotHover = true;
        }
        sketchBuild.find('img').maphilight({ neverOn: isNotHover });
        var divStatus = '';
        divStatus += '<div class="status-detail">'
                    + '</div>';
        $('#sketcs .module').append(divStatus);

        var showStatusBox = function () {
            clearTimeout(timerSketch);
            areaID = $(this).attr('id');
            if (areaID.indexOf('_clone') != -1) {
                areaID = areaID.substr(0, areaID.indexOf('_clone'));
            }
            $('ul.info-list').children().each(function () {
                contentID = $(this).data('id');
                if (contentID === areaID) {
                    statusBox.html($(this).data('infor'));

                    $('.status-detail')
                    .removeClass('hidden')
                    .html($(this).data('infor'));
                    $('.status-box').addClass('hidden');
                }
            });
        };

        var resetStatusBox = function () {
            timerSketch = setTimeout(function () {
                statusBox.html(templateHTMLDefault);
            }, 200);
        };
        var hiddenStatus = function () {
            $('.status-detail').addClass('hidden');
            $('.status-box').removeClass('hidden');
        }
        if (!isNotHover) {
            sketch.find('map').children().each(function () {
                $(this).bind('mouseenter.showStatusBox', showStatusBox);
                $(this).bind('mouseleave.resetStatusBox', hiddenStatus);
                // $(this).bind('mouseleave.resetStatusBox', resetStatusBox);
            });
            var tipsBox = sketch.find('.tooltip-box li');
            if (tipsBox.length > 0) {
                tipsBox.each(function () {
                    var _this = $(this);
                    _this.bind('mouseenter.showStatusBox', function () {
                        $('#' + _this.data('area')).mouseenter();
                    });
                    _this.bind('mouseleave.resetStatusBox', function () {
                        $('#' + _this.data('area')).mouseleave();
                    });
                });
            }
        }
    };
    var showSketchBuildingSlide = function () {
        $('.sketcs-detail').hide();
        $('#sketcs-slide').show();
        $('#sketcs .description')
            .find('.context').removeClass('hidden').end()
            .find('.status-box').addClass('hidden');
        $(window).resize();
        setTimeout(function () {
            $(window).resize();
        }, 70);
    };
    var loadAjax = function (floor) {
        if (floor == '' || floor == "1") {
            $('#backIsometricView').hide();
            showSketchBuildingSlide();
            //location.reload();
            return;
        }
        $('#backIsometricView').show();

        var request = $.ajax({
            url: "\/umbraco\/Surface\/ProjectSurface\/GetFloorDetail",
            data: { projectId: $('#projectIdHidden').val(), floorkey: floor },
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data != '') {
                    $('.sketcs-detail').show();
                    $('#sketcs-slide').hide();
                    $('[data-status-box]').removeClass('hidden');
                    $('[data-context]').addClass('hidden');
                    var result = data;
                    var objData = {
                        "detail-img": '/Image.ashx?W=1036&H=500&ImagePath=' + result.ImageUrl,
                        area: []
                    };
                    var infolistitemtemplate = '';
                    //infolistitemtemplate = $('#InfoListTemplateItem').html();

                    if (result.DataAreas != '') {
                        for (var i = 0; i < result.DataAreas.length; i++) {
                            if (result.DataAreas[i].Property != undefined) {
                                var statusprop = '';
                                var statuspropText = '';
                                switch (result.DataAreas[i].Property.DomiSagsStatus) {
                                    case 'T':
                                        statusprop = 'T';
                                        statuspropText = $('#ForSaleStatusString').val();

                                        break;
                                    case 'R':
                                        statusprop = 'R';
                                        statuspropText = $('#ReserverettatusString').val();

                                        break;
                                    case 'D':
                                        statusprop = 'D';
                                        statuspropText = $('#kommerstatusString').val();
                                        break;
                                    case 'S':
                                        statusprop = 'S';
                                        statuspropText = $('#SoldStatusString').val();
                                        break;

                                    default:
                                        statusprop = result.DataAreas[i].Property.DomiSagsStatus;
                                        statuspropText = $('#ReserverettatusString').val();

                                        break;
                                }
                                var addressval = result.DataAreas[i].Property.StreetName + ' ' + result.DataAreas[i].Property.StreetNumber;
                                var postalcodeval = result.DataAreas[i].Property.PostalCode + ' ' + result.DataAreas[i].Property.City;
                                var propPrice = result.DataAreas[i].PropertyPriceConverted != undefined ? result.DataAreas[i].PropertyPriceConverted : '0';
                                if (result.DataAreas[i].Property.DomiSagsStatus == 'T') {
                                    infolistitemtemplate = '<ul><li><span>' + $('#Isometric_Property_StatusLabel').val() + '</span><strong>' + statuspropText + '</strong></li>' + '<li><span>' + $('#Isometric_Property_AddressLabel').val() + '</span><strong>' + addressval + '</strong></li>' + '<li><span>' + $('#PropertyDetail_PostnrLabel').val() + '</span><strong>' + postalcodeval + '</strong></li>' + '<li><span>' + $('#Isometric_Property_RumLabel').val() + '</span><strong>' + result.DataAreas[i].Property.NumberOfRooms + '</strong></li>' + '<li><span>' + $('#PropertyDetail_BoligLabel').val() + '</span><strong>' + result.DataAreas[i].Property.PropertiesIn + ' ' + $('#Common_AreaUnit').val() + '</strong></li>' + '<li><span>' + $('#Isometric_Property_PriceLabel').val() + '</span><strong>' + propPrice + '</strong></li>' + '</ul>'
                                }
                                else {
                                    infolistitemtemplate = '<ul><li><span>' + $('#Isometric_Property_StatusLabel').val() + '</span><strong>' + statuspropText + '</strong></li>' + '<li><span>' + $('#Isometric_Property_AddressLabel').val() + '</span><strong>' + addressval + '</strong></li>' + '<li><span>' + $('#PropertyDetail_PostnrLabel').val() + '</span><strong>' + postalcodeval + '</strong></li>' + '<li><span>' + $('#Isometric_Property_RumLabel').val() + '</span><strong>' + result.DataAreas[i].Property.NumberOfRooms + '</strong></li>' + '<li><span>' + $('#PropertyDetail_BoligLabel').val() + '</span><strong>' + result.DataAreas[i].Property.PropertiesIn + ' ' + $('#Common_AreaUnit').val() + '</strong></li>' + '</ul>'
                                }
                                var objArea = {
                                    cord: result.DataAreas[i].AreaData,
                                    status: statusprop,
                                    info: infolistitemtemplate,
                                    href: result.DataAreas[i].PropertyUrl
                                }
                                objData.area.push(objArea);
                            }

                        }
                    };
                    showProjectDetail(objData);
                }
            }
        });
    };
    window.sketchLoadAjax = loadAjax;

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            selectBox = this.element;
            selectEle = selectBox.find('select#select-floor');
            btnSelect = selectBox.find('a');

            selectEle.find('option').each(function (i) {
                var _this = $(this);
                if (i === 0) {
                    templateSelect += '<li class="focus" value="' + _this.val() + '">' + _this.html() + '</li>';
                } else {
                    templateSelect += '<li value="' + _this.val() + '">' + _this.html() + '</li>';
                }
            });
            selectBox.append(templateSelect + '</ul>');

            btnSelect.off('click.toggleOption').on('click.toggleOption', toogleOption);

            selectBox.find('li').each(function () {
                $(this).off('click.selectOption').on('click.selectOption', selectOption);
            });
            $(document).off('keydown.chooseOption').on('keydown.chooseOption', chooseOption);
            $(document).off('click.closeOption').on('click.closeOption', closeOption);
        },
        destroy: function () {
            $.removeData(this.element[0], pluginName);
        }
    };

    $.fn[pluginName] = function (options, params) {
        return this.each(function () {
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

    $.fn[pluginName].defaults = {};

}(jQuery, window));
/**
 *  @name smCheckbox
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
; (function ($, window, undefined) {
    var pluginName = 'smCheckbox';
    var privateVar = null;
    var privateMethod = function () { };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this;
            that.handlers = this.element.find(this.options.handler);
            var chkbox = this.handlers.find('input');
            chkbox.bind('change.customCheckBox', function (e) {
                if (chkbox.is(':checked')) {
                    that.handlers.addClass(that.options.classChecked);
                }
                else {
                    that.handlers.removeClass(that.options.classChecked);
                }
            });
            $('#clear-btn').unbind('click.uncheck').bind('click.uncheck', function () {
                that.handlers.removeClass(that.options.classChecked);
            });
        },
        destroy: function () {
            $.removeData(this.element[0], pluginName);
        }
    };

    $.fn[pluginName] = function (options, params) {
        return this.each(function () {
            var instance = $.data(this, pluginName);
            if (!instance) {
                $.data(this, pluginName, new Plugin(this, options));
            } else if (instance[options]) {
                instance[options](params);
            } else {
                window.console && {
                    neverOn: isNotHover,
                    fillColor: '05d1fd',
                    strokeColor: '05d1fd',
                    strokeOpacity: 0.2
                }(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
            }
        });
    };

    $.fn[pluginName].defaults = {
        handler: 'span',
        classChecked: 'checked'
    };

}(jQuery, window));

/**
 *  @name smTabs
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
; (function ($, window, undefined) {
    var pluginName = 'smTabs';
    var privateVar = null;
    var privateMethod = function () { };

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
                ele = that.element,
                opt = that.options;
                
            this.handlers = this.element.find(this.options.handler);
            this.contents = this.element.find(this.options.content);
            this.activeContent = this.contents.not(':hidden');
            this.isAnimating = false;

            if(window.location.hash == '#sketcs'){
              that.show(ele.find('a[href="#sketcs"]'));
            }

            this.handlers.unbind('click.change').bind('click.change', function (e) {
                var self = $(this); console.log(1);
                if (self.attr('target')) {
                    return;
                }
                e.preventDefault();
                if (!that.isAnimating) {
                    that.show(self);
                }
            });
            /*
            this.contents.find('.close').unbind('click.close').bind('click.close', function(e){
              e.preventDefault();
              if(!that.isAnimating){
              that.close();
              }
            });
            */
        },
        show: function (handler) {// .tabs a
            var that = this;
            var content = $(handler.attr('href'));
            var tagLi = $(handler).parent();
            if (content.length) {
                if (this.activeContent.length) {
                    if (this.activeContent[0] !== content[0]) {
                        that.isAnimating = true;
                        $(tagLi).addClass('active').siblings().removeClass();
                        this.activeContent.slideUp(function () {
                            content.slideDown(function () {
                                that.activeContent = content;
                                that.isAnimating = false;
                                if (that.options.afterShow) {
                                    that.options.afterShow.call(that.activeContent);
                                }
                            });
                        });
                    }
                } else {
                    that.isAnimating = true;
                    content.slideDown(function () {
                        that.isAnimating = false;
                        that.activeContent = content;
                        if (that.options.afterShow) {
                            that.options.afterShow.call(that.activeContent);
                        }
                    });
                }
            }
        },
        /*
        close: function(){
          var that = this;
          that.isAnimating = true;
          this.contents.not(':hidden').slideUp(function(){
          that.isAnimating = false;
          that.activeContent = [];
          });
        },
        */
        destroy: function () {
            $.removeData(this.element[0], pluginName);
        }
    };

    $.fn[pluginName] = function (options, params) {
        return this.each(function () {
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
        handler: '.tabs a',
        content: '.tab-box',
        afterShow: function () { }
    };
}(jQuery, window));

/***********************************************************/
/***********************************************************/
/***********************************************************/
//BEGIN SMVALIDATOR LIBRARY
/**
 * @name smPlugin
 * @description description
 * @version 1.0
 * @options
 *    option
 * @events
 *    event
 * @methods
 *    init
 *    publicMethod
 *    destroy
 */
; (function ($, window, undefined) {
    var pluginName = 'smValidator';
    var allowCharFn = {
        number: function (keyCode) {
            if ($.inArray(keyCode, [8, 9, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 108, 110, 188, 190]) === -1) {
                return false;
            }
        }
    };
    var validateFn = {
        ckeditor: function (el) {
            var that = this,
              ckeId = $(el).attr('id'),
              ckeData = CKEDITOR.instances[ckeId].getData();
            CKEDITOR.instances[ckeId].on('blur', function () {
                validEl.call(that, el);
            });
            if (!ckeData.length) {
                return false;
            }
        },
        uploadExt: function (el, allowExt) {
            var ext = el.val().split('.').pop().toLowerCase();
            if (ext.length && $.inArray(ext, allowExt) === -1) {
                return false;
            }
        },
        required: function (el) {
            var rule = getRuleOfEl.call(this, el);
            if (!/\w/i.test($.trim(el.val())) || $.trim(el.val()) === rule.init) {
                return false;
            }
        },
        checked: function (el) {
            if (!el.is(':checked')) {
                return false;
            }
        },
        selected: function (el) {
            if (!el.prop('selectedIndex')) {
                return false;
            }
        },
        minLen: function (el, len) {
            if ($.trim(el.val()).length < len) {
                return false;
            }
        },
        maxLen: function (el, len) {
            if ($.trim(el.val()).length > len) {
                return false;
            }
        },
        email: function (el, pattern) {
            if (pattern === true) {
                if (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test($.trim(el.val()))) {
                    return false;
                }
            }
            else {
                if (!pattern.test($.trim(el.val()))) {
                    return false;
                }
            }
        },
        phone: function (el, pattern) {
            if (pattern === true) {
                if (!/^[0-9]/i.test($.trim(el.val()))) {
                    return false;
                }
            }
            else {
                if (!pattern.test($.trim(el.val()))) {
                    return false;
                }
            }
        },
        custom: function (el, customPattern) {
            if ($.isFunction(customPattern)) {
                return customPattern.call(el);
            }
            else {
                return customPattern.test($.trim(el.val()));
            }
        },
        equalTo: function (el, equalTo) {
            var that = this,
              equalToEle = getEl.call(that, equalTo);
            if ($.trim(el.val()) !== $.trim($(equalToEle).val())) {
                return false;
            }
        }
    };

    function resetFrm(frmEl) {
        var that = this,
          options = that.options,
          rules = options.rules,
          rule = null,
          frmInput = frmEl.find('input,textarea,select');
        $.each(frmInput, function () {
            var frmInputType = $(this).prop('type');
            rule = getRuleOfEl.call(that, this);
            switch (frmInputType) {
                case 'password':
                case 'text':
                    if (rule && rule.init) {
                        $(this).val(rule.init);
                    }
                    else {
                        $(this).val('');
                    }
                    break;
                case 'textarea':
                    if (rule && rule.init) {
                        $(this).val(rule.init);
                    }
                    else {
                        if ($(this).siblings('#cke_' + $(this).attr('id')).length) {
                            CKEDITOR.instances[$(this).attr('id')].setData('');
                        }
                        else {
                            $(this).val('');
                        }
                    }
                    break;
                case 'file':
                    var tempForm = $('#tmpFrmValid').length ? $('#tmpFrmValid') : $('<form id="tmpFrmValid"/>').css('display', 'none').appendTo(document.body),
                      tempInput = $(this).clone(true);
                    tempForm.append(tempInput).get(0).reset();
                    $(this).after(tempInput).remove();
                    tempForm.remove();
                    break;
                case 'checkbox':
                case 'radio':
                    $(this).prop('checked', false);
                    break;
                case 'select-one':
                case 'select':
                    $(this).prop('selectedIndex', 0);
                    break;
            }
        });
    }

    function validEl(el) {
        var that = this,
          options = that.options,
          passed = true,
          errorInputClass = options.errorInputClass,
          errorMsg = el.siblings('.' + options.errorMsgClass),
          rule = getRuleOfEl.call(that, el),
          valid = rule.valid,
          message = rule.message,
          eachMessage = null;
        el.data('passed', true);
        $.each(valid, function (key, eachValidParam) {
            if (validateFn[key].call(that, el, eachValidParam) === false) {
                eachMessage = message[key];
                if (jQuery.isNumeric(eachValidParam) && eachMessage.indexOf('{num}') !== -1) {
                    eachMessage = message[key].replace(/{num}/gi, eachValidParam);
                }
                showErrorMsg.call(that, el, eachMessage);
                el.data('passed', false);
                passed = false;
            }
            if (passed) {
                if (valid.ckeditor) {
                    el.siblings('#cke_' + el.attr('id')).removeClass(errorInputClass);
                }
                el.removeClass(errorInputClass);
                errorMsg.css('display', 'none');
            }
            else {
                return false;
            }
        });
        if (el.data('passed') === true) {
            $.isFunction(rule.onElValid) && rule.onElValid.call(that, el);
        }
        else {
            $.isFunction(rule.onElError) && rule.onElError.call(that, el);
        }
        return passed;
    }

    function showErrorMsg(el, message) {
        var that = this,
          options = that.options,
          option = options.errorOption,
          errorInputClass = options.errorInputClass,
          errorMsgClass = options.errorMsgClass,
          errorTotalClass = options.errorTotalClass,
          rule = getRuleOfEl.call(that, el),
          duration = rule.duration ? rule.duration : options.duration,
          errorMsg = null;
        if (rule.valid.ckeditor) {
            el = el.siblings('#cke_' + el.attr('id'));
        }
        if (option === 1 || option === 3) {
            if ((el.is(':checkbox') || el.is(':radio')) && el.length > 1) {
                el = el.first();
            }
        }
        if (option === 2) {
            if ((el.is(':checkbox') || el.is(':radio')) && el.length > 1) {
                el = el.last();
            }
        }
        that.errorMsg = errorMsg = el.siblings('.' + errorMsgClass).length ?
          el.siblings('.' + errorMsgClass).css('display', 'block').text(message) :
          $('<label class="' + errorMsgClass + '" for="' + el.attr('id') + '">' + message + '</label>').insertAfter(el);
        that.error += '<li><label class="' + errorTotalClass + '">' + message + '</label></li>';
        el.addClass(errorInputClass);
        errorMsg.css({
            'z-index': 171985
        });
        if (option === 1) {
            errorMsg
              .css({
                  'top': el.position().top + el.outerHeight(),
                  'left': el.position().left
              })
              .data('option', 1);
            setTimeout(function () {
                errorMsg.hide();
            }, duration);
        }
        if (option === 2) {
            errorMsg
              .css({
                  'top': el.position().top,
                  'left': el.position().left + el.outerWidth()
              })
              .data('option', 2);
        }
        if (option === 3) {
            errorMsg
              .css({
                  'top': el.position().top + el.outerHeight(),
                  'left': el.position().left
              })
              .data('option', 3);
        }
    }

    function getEl(elNameOrId) {
        var formVL = this.formVL,
          el = null;
        if (/^[a-z 0-9\-]+\[\]$/i.test(elNameOrId)) {
            el = formVL.find('[name="' + elNameOrId + '"]');
        }
        else {
            if (formVL.find('#' + elNameOrId).length) {
                el = formVL.find('#' + elNameOrId);
            }
            if (formVL.find('[name="' + elNameOrId + '"]').length) {
                el = formVL.find('[name="' + elNameOrId + '"]');
            }
        }
        return el;
    }

    function getRuleOfEl(elNameOrId) {
        return this.options.rules[$(elNameOrId).attr('id')] || this.options.rules[$(elNameOrId).attr('name')];
    }

    function Plugin(element, options) {
        this.formVL = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var that = this,
              options = that.options,
              submitSelector = options.submitSelector,
              resetSelector = options.resetSelector,
              errorMsgClass = options.errorMsgClass,
              errorInputClass = options.errorInputClass,
              errorContainer = options.errorContainer,
              rules = options.rules,
              formVL = that.formVL,
              formId = formVL.attr('id');
            if (submitSelector.length) {
                submitSelector
                  .off('click.validate')
                  .on('click.validate', function (evt) {
                      formVL.submit();
                      evt.preventDefault();
                  });
            }
            if (resetSelector.length) {
                resetSelector
                  .off('click.validate')
                  .on('click.validate', function (evt) {
                      formVL.get(0).reset();
                      evt.preventDefault();
                  });
            }
            $.each(rules, function (name, rule) {
                var el = getEl.call(that, name);
                el
                  .val(function (index, value) {
                      if (!$(this).is('input[type="file"]')) {
                          if (rule.init) {
                              return rule.init;
                          }
                          else {
                              return value;
                          }
                      }
                  });
            });
            $(window)
              .off('resize.validate' + formId)
              .on('resize.validate' + formId, function () {
                  var errorMsg = formVL.find('.' + errorMsgClass),
                  eachErrorMsg = null,
                  el = null;
                  for (var i = 0, len = errorMsg.length; i < len; i++) {
                      eachErrorMsg = errorMsg.eq(i);
                      el = eachErrorMsg.siblings('.' + errorInputClass);
                      if (eachErrorMsg.is(':visible')) {
                          if (eachErrorMsg.data('option') === 1 || eachErrorMsg.data('option') === 3) {
                              eachErrorMsg.css({
                                  'top': el.position().top + el.outerHeight(),
                                  'left': el.position().left
                              });
                          }
                          if (eachErrorMsg.data('option') === 2) {
                              eachErrorMsg.css({
                                  'top': el.position().top,
                                  'left': el.position().left + el.outerWidth()
                              });
                          }
                      }
                  }
              });
            formVL
              .off('focus.validate blur.validate keydown.validate keyup.validate change.validate', 'input[type="text"], input[type="password"], textarea')
              .on({
                  'focus.validate': function () {
                      var val = $(this).val(),
                      rule = getRuleOfEl.call(that, this);
                      rule && rule.init && ($.trim(val) === rule.init) && $(this).val('');
                  },
                  'blur.validate': function () {
                      var val = $(this).val(),
                      rule = getRuleOfEl.call(that, this);
                      if (rule) {
                          rule.init && ($.trim(val) === '') && $(this).val(rule.init);
                      }
                  },
                  'keydown.validate': function (evt) {
                      var rule = getRuleOfEl.call(that, this);
                      //alert(evt.keyCode);
                      if (rule && rule.allowChar) {
                          if (rule.allowChar === 'number') {
                              if ($('#txt-phone').length) {
                                  if (evt.shiftKey) {
                                      if (evt.keyCode === 187 || evt.keyCode === 48 || evt.keyCode === 57 || evt.keyCode === 61) {
                                          return true;
                                      } else {
                                          evt.preventDefault();
                                      }
                                  } else {
                                      if (evt.keyCode === 107 || evt.keyCode === 109 || evt.keyCode === 189 || evt.keyCode === 173) {
                                          return true;
                                      }
                                  }
                              } else {
                                  if (evt.shiftKey) {
                                      evt.preventDefault();
                                  }
                              }
                          }
                          if (allowCharFn[rule.allowChar].call(this, evt.which) === false) {
                              evt.preventDefault();
                          }
                      }
                  }
              }, 'input[type="text"], input[type="password"], textarea')
              .off('submit.validate reset.validate')
              .on({
                  'submit.validate': function (evt) {
                      //evt.preventDefault();
                      var eachIsValid = true,
                      allIsValid = true,
                      el = null,
                      options = that.options,
                      option = options.errorOption,
                      errorInputClass = options.errorInputClass,
                      errorContainer = options.errorContainer;
                      that.error = '';
                      $.each(rules, function (name, rule) {
                          el = getEl.call(that, name);
                          if (el.length > 1 && el.is('input[type="text"]')) {
                              $.each(el, function (index, eachEl) {
                                  eachIsValid = validEl.call(that, $(eachEl));
                                  allIsValid = allIsValid && eachIsValid;
                              });
                          }
                          else {
                              eachIsValid = validEl.call(that, el);
                              allIsValid = allIsValid && eachIsValid;
                          }
                          if (option === 4) {
                              errorContainer.html(that.error).wrapInner('<ol/>');
                          }
                          if (option === 1 && !eachIsValid) {
                              return false;
                          }
                      });
                      formVL.find('.' + errorInputClass).first().focus();
                      if (allIsValid) {
                          return options.onSubmit.call(that);
                      }
                      else {
                          return false;
                      }
                  },
                  'reset.validate': function (evt) {
                      var el = null;
                      $.each(rules, function (name, rule) {
                          el = getEl.call(that, name);
                          el.removeClass(errorInputClass);
                          formVL.find('.' + errorMsgClass).css('display', 'none');
                          formVL.find('.' + errorInputClass).removeClass(errorInputClass);
                          errorContainer.html('');
                      });
                      resetFrm.call(that, formVL);
                      $.isFunction(that.options.onReset) && that.options.onReset.call(that);
                      //evt.preventDefault();
                  }
              });
        },
        addRule: function (options) {
            var that = this,
              el = null,
              addRules = options.rules,
              rules = that.options.rules;
            $.each(addRules, function (name, rule) {
                el = getEl.call(that, name);
                if (rules[name]) {
                    $.extend(true, rules[name], rule);
                }
                else {
                    rules[name] = rule;
                }
                el.val(rule.init);
            });
        },
        removeRule: function (options) {
            var that = this,
              removeRules = options.rules,
              rules = that.options.rules;
            $.each(removeRules, function (name, rule) {
                $.each(rule.valid, function (key, value) {
                    delete rules[name].valid[key];
                    delete rules[name].message[key];
                });
            });
        },
        destroy: function () {
            var that = this,
              options = that.options,
              errorMsgClass = options.errorMsgClass,
              errorInputClass = options.errorInputClass,
              formVL = that.formVL,
              el = null,
              rules = options.rules,
              rule = null;
            formVL.off('.validate', 'input, textarea, select');
            formVL.off('.validate');
            $(window).off('.validate');
            formVL.find('.' + errorMsgClass).remove();
            $.each(rules, function (name, rule) {
                el = getEl.call(that, name);
                el.removeClass(errorInputClass);
                el.data('option') && el.removeData('option');
            });
            options.errorContainer.html('');
            formVL.removeData(pluginName);
            formVL.get(0).reset();
        }
    };
    $.fn[pluginName] = function (options, params) {
        return this.each(function () {
            var instance = $.data(this, pluginName);
            if (!instance) {
                $.data(this, pluginName, new Plugin(this, options));
            }
            else if (instance[options]) {
                instance[options](params);
            }
            else {
                console.warn(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
            }
        });
    };
    $.fn[pluginName].defaults = {
        onSubmit: function () {
            return true;
        },
        onReset: function () {
        },
        rules: false,
        submitSelector: false,
        resetSelector: false,
        duration: 2000,
        errorOption: 1,
        errorContainer: $('#errorContainer'),
        errorTotalClass: 'alert-total',
        errorMsgClass: 'alert-layer',
        errorInputClass: 'error'
    };
}(jQuery, window));

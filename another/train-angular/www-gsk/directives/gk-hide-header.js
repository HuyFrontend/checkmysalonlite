angular.module('site').directive('gkHideHeader', function($location, $rootScope, $timeout) {
  return {
    link: function(scope, element, attrs) {
      var arrowArea, arrowBorder, arrowElement, arrowHeight, arrowY, badgeContent, headerEl, headerHeight, headerY, hideHeaderClass, htmlElement, isNoTouch, mainElm, mainScroll, previousScroll, scrolPos, scrollPosition, scrollTime, startY;
      scrolPos = scrollPosition = previousScroll = startY = headerY = arrowY = 0;
      scrollTime = null;
      headerEl = $('#header');
      headerHeight = headerEl.outerHeight();
      htmlElement = $('html');
      hideHeaderClass = 'hide-header';
      arrowElement = $('.icon-arrow');
      arrowHeight = arrowBorder = 35;
      arrowArea = 45;
      mainElm = $('#main', element);
      isNoTouch = htmlElement.hasClass('no-touch');
      badgeContent = $('.badge-content', mainElm);
      $timeout((function() {
        mainElm.css({
          'overflow-y': 'auto'
        }).addClass('scrolling-touch');
        if (mainElm.hasClass('landing-page')) {
          $('.inner', mainElm).css({
            'overflow-y': 'auto'
          });
          $timeout((function() {
            $('.inner', mainElm).css({
              'overflow-y': 'auto'
            });
          }), 200);
        }
      }), 200);
      $("[data-signup-select]").on("focus", function(event) {
        return $timeout(function() {
          return window.scrollTo(0, 200);
        }, 500);
      });
      scope.$on('$routeChangeSuccess', function(next, current) {
        headerY = 0;
        headerEl[0].style[Modernizr.prefixed('transition')] = '';
        headerEl[0].style[Modernizr.prefixed('transform')] = '';
        arrowElement[0].style[Modernizr.prefixed('transition')] = '';
        arrowElement[0].style[Modernizr.prefixed('transform')] = '';
      });
      mainScroll = function() {
        mainElm.unbind('scroll.hideHeader').bind('scroll.hideHeader', function() {
          var animateArrow, currentScroll, distanceScrolled, scrollArrow, scrollingDown;
          clearTimeout(scrollTime);
          scrollArrow = false;
          currentScroll = mainElm.scrollTop();
          scrollingDown = currentScroll > previousScroll;
          distanceScrolled = currentScroll - previousScroll;
          headerY -= scrollingDown && -headerY < headerHeight || !scrollingDown && -headerY > 0 ? distanceScrolled : 0;
          headerY = -headerY < 0 ? 0 : -headerY > headerHeight ? -headerHeight : headerY;
          headerEl[0].style[Modernizr.prefixed('transition')] = 'none';
          headerEl[0].style[Modernizr.prefixed('transform')] = 'translate3d(0, ' + headerY + 'px, 0)';
          if (currentScroll < 0) {
            arrowElement.css('opacity', 0);
          } else {
            arrowElement.css('opacity', 1);
          }
          if (currentScroll < 5) {
            arrowElement[0].style[Modernizr.prefixed('transition')] = '';
            arrowElement[0].style[Modernizr.prefixed('transform')] = '';
            return;
          }
          if (scrollingDown) {
            animateArrow = currentScroll > arrowArea + headerHeight;
            arrowHeight = animateArrow ? 0 : arrowHeight;
          } else {
            animateArrow = arrowHeight !== arrowBorder && currentScroll <= arrowArea;
            arrowHeight = animateArrow ? arrowBorder - (currentScroll / arrowArea) * arrowBorder : arrowHeight;
          }
          arrowY = -headerY < headerHeight ? currentScroll + headerY : 0;
          arrowElement[0].style[Modernizr.prefixed('transform')] = 'translate3d(0,' + arrowY + 'px, 0)';
          return previousScroll = currentScroll;
        });
        if (!isNoTouch) {
          return mainElm.unbind('touchstart.hideHeader').bind('touchstart.hideHeader', function() {
            startY = mainElm.scrollTop();
          });
        }
      };
      if (!mainElm.data('showheader')) {
        mainScroll();
        return $rootScope.$on('intro-has-finished', function(data) {
          return mainScroll();
        });
      }
    }
  };
});

//# sourceMappingURL=gk-hide-header.js.map

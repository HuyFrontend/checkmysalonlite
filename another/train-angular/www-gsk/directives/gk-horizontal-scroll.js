angular.module('site').directive('gkHorizontalScroll', function($rootScope, $swipe, $compile, $window, $document, $timeout) {
  var requestAnimationFrame;
  requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame;
  return {
    restrict: 'A',
    compile: function($scope, $element, $attrs) {
      return function($scope, $element, $attrs) {
        var documentMouseUpEvent, elementW, hasDDD, is3dAvailable, lastPos, offset, scroll, swipeEnd, swipeMove, swipeStart, tabContent, transformProperty, translatePos, ulW, windowW;
        elementW = parseInt($attrs.elementW) || 128;
        offset = {
          left: parseInt($attrs.offsetLeft) || 0,
          right: parseInt($attrs.offsetRight) || 0
        };
        translatePos = 0;
        lastPos = void 0;
        ulW = $('ul', $element).width();
        windowW = $(window).width();
        tabContent = $('.tab-content');
        documentMouseUpEvent = function(event) {
          var swipeMoved;
          swipeMoved = true;
          swipeEnd({
            x: event.clientX,
            y: event.clientY
          }, event);
        };
        transformProperty = 'transform';
        ['webkit', 'Moz', 'O', 'ms'].every(function(prefix) {
          var e;
          e = prefix + 'Transform';
          if (typeof document.body.style[e] !== 'undefined') {
            transformProperty = e;
            return false;
          }
          return true;
        });
        hasDDD = function() {
          var el, has3d, t, transforms;
          el = document.createElement("p");
          has3d = void 0;
          transforms = {
            webkitTransform: "-webkit-transform",
            OTransform: "-o-transform",
            msTransform: "-ms-transform",
            MozTransform: "-moz-transform",
            transform: "transform"
          };
          document.body.insertBefore(el, null);
          for (t in transforms) {
            if (el.style[t] !== undefined) {
              el.style[t] = "translate3d(1px,1px,1px)";
              has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
          }
          document.body.removeChild(el);
          return has3d !== undefined && has3d.length > 0 && has3d !== "none";
        };
        is3dAvailable = hasDDD();
        scroll = function(x) {
          var move;
          if (isNaN(x)) {
            move = translatePos;
          } else {
            move = x;
          }
          if (is3dAvailable) {
            $element.context.style[transformProperty] = 'translate3d(' + move + 'px, 0, 0)';
          } else {
            $element.context.style[transformProperty] = 'translate(' + move + 'px, 0, 0)';
          }
        };
        swipeStart = function(coords, event) {
          mconsole.log('swipeStart gk-horizontal-scroll');
          $rootScope.isHorizontalScrolling = true;
          $document.bind('mouseup', documentMouseUpEvent);
          tabContent.addClass('hide-dot');
          lastPos = coords;
          return false;
        };
        swipeMove = function(coords, event) {
          var delta;
          mconsole.log('swipeMove gk-horizontal-scroll');
          delta = coords.x - lastPos.x;
          if (delta <= 0) {
            translatePos -= Math.abs(delta);
          } else {
            translatePos += delta;
          }
          lastPos = coords;
          scroll();
          event.preventDefault();
          return false;
        };
        swipeEnd = function(coords, event, forceAnimation) {
          var delta;
          $rootScope.isHorizontalScrolling = false;
          mconsole.log('swipeEnd gk-horizontal-scroll');
          $document.unbind('mouseup', documentMouseUpEvent);
          $timeout(function() {
            return tabContent.removeClass('hide-dot');
          }, 300);
          if (translatePos > offset.left) {
            translatePos = 0;
            scroll();
            return;
          } else {
            if (Math.abs(translatePos) + windowW > ulW) {
              translatePos = -(ulW - windowW + offset.left + offset.right);
              scroll();
              return;
            }
          }
          delta = Math.abs(translatePos) % elementW;
          if (delta > (elementW / 2)) {
            translatePos -= elementW - delta;
          } else {
            translatePos += delta;
          }
          scroll();
        };
        $rootScope.$on('properties_changed', function(elm, w, left, right) {
          elementW = w;
          offset.left = left;
          offset.right = right;
          return $timeout(function() {
            ulW = $element.width();
            windowW = $(window).width();
            if (Math.abs(translatePos) + windowW > ulW) {
              translatePos = -(ulW - windowW + offset.left + offset.right);
              return scroll();
            }
          }, 10);
        });
        $swipe.bind($element, {
          start: swipeStart,
          move: swipeMove,
          end: swipeEnd
        });
        return scroll();
      };
    }
  };
});

//# sourceMappingURL=gk-horizontal-scroll.js.map

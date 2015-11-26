 /*element prototype */
Element.prototype.hasClass = function (className) {
  return new RegExp(' ' + className + ' ').test(' ' + this.className + ' ');
};
Element.prototype.addClass = function (className) {
  if (!this.hasClass(className)) {
    this.className += ' ' + className;
  }
};
Element.prototype.removeClass = function (className) {
  var newClass = ' ' + this.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (this.hasClass(className)) {
    while (newClass.indexOf( ' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    this.className = newClass.replace(/^\s+|\s+$/g, ' ');
  }
};
Element.prototype.toggleClass = function (className) {
  var newClass = ' ' + this.className.replace(/[\t\r\n]/g, ' ') + ' ';
    if (this.hasClass(className)) {
      while (newClass.indexOf(' ' + className + ' ') >= 0) {
        newClass = newClass.replace(' ' + className + ' ', ' ');
      }
      this.className = newClass.replace(/^\s+|\s+$/g, ' ');
    }
    else {
      this.className += ' ' + className;
    }
};
// same fallback
Element.prototype.addEventListenerOrAttachEvent = function (targetFunction, event, isDefault) {
  if (!this.addEventListener) {
    if(isDefault) {
      this.attachEvent('on' + event, targetFunction, isDefault);
    }
    else {
      this.attachEvent('on' + event, targetFunction );
    }
  }
  else {
    if(isDefault) {
      this.addEventListener(event, targetFunction, isDefault);
    }
    else {
      this.addEventListener(event, targetFunction );
    }
  }
};
// append prototype to document, window
window.constructor.prototype.addEventListenerOrAttachEvent = document.constructor.prototype.addEventListenerOrAttachEvent = Element.prototype.addEventListenerOrAttachEvent;

Element.prototype.addEventListenerOrAttachEventMultiEvent = function (targetFunction, eventList, isDefault) {
    // eventList = ['click', 'touchstart', 'mouseenter'...];
    for ( var i = 0, len = eventList.length; i < len; i++ ) {
        if (!this.addEventListener) {
            if(isDefault) {
                this.attachEvent( 'on' + eventList[i], targetFunction, isDefault );
            }
            else {
                this.attachEvent( 'on' + eventList[i], targetFunction );
            }
        }
        else {
            if(isDefault) {
                this.addEventListener(eventList[i], targetFunction, isDefault);
            }
            else {
                this.addEventListener(eventList[i], targetFunction);
            }
        }
    }
};
window.constructor.prototype.addEventListenerOrAttachEventMultiEvent = document.constructor.prototype.addEventListenerOrAttachEventMultiEvent = Element.prototype.addEventListenerOrAttachEventMultiEvent;
// remove listener
Element.prototype.removeEventListenerOrDetachEventMultiEvent = function (targetFunction, eventList, isDefault) {
  isDefault = isDefault || false;
  for ( var i = 0, len = eventList.length; i < len; i++ ) {
    if (!this.removeEventListener) {
      this.detachEvent('on' + eventList[i], targetFunction, isDefault);
    }
    else {
      this.removeEventListener( eventList[i], targetFunction, isDefault );
    }
  }
};
window.constructor.prototype.removeEventListenerOrDetachEventMultiEvent = document.constructor.prototype.removeEventListenerOrDetachEventMultiEvent = Element.prototype.removeEventListenerOrDetachEventMultiEvent;

// Element closest id, class, attribute
Element.prototype.closestId = function (value) {
  var element = this.parentNode;
  if(!value) {
    return null;
  }
  while (element.id !== value) {
    element = element.parentNode;
    if(!element) {
      return null;
    }
  }
  return element;
};
Element.prototype.closestClass = function (value) {
  var parent = this.parentNode;
  while (parent != document.body) {
    if ((parent) && (!!parent.className.match(new RegExp('(\\s|^)' + value + '(\\s|$)')))) {
      return parent;
    }
    else {
      parent = parent.parentNode;
    }
  }
  return null;
};
Element.prototype.closestAttributeName = function (value) {
  var parent = this.parentNode;
  while (parent != document.body) {
    if ( parent && parent.getAttribute(value) !== null ) {
      return parent;
    }
    else {
      parent = parent.parentNode;
    }
  }
  return null;
};
Element.prototype.getCSSValue = function (cssType) {
    /*cssType: margin, left...*/
    var value = null;
    if ( this.currentStyle ) {
        value = this.currentStyle[cssType];
    }
    else if ( window.getComputedStyle ) {
        value = window.getComputedStyle( this, null ).getPropertyValue( cssType );
    }
    return value;
};

/*
usage: fadeInFaceOut
//fadeIn
fadeInFaceOut('in', 750, true);
//fadeOut
fadeInFaceOut('out', 750, true);
*/
Element.prototype.fadeInFadeOut = function (type, duration, isIE) {
    var el = this;
    var isIn = type === 'in',
    opacity = isIn ? 0 : 1,
    interval = 50,
    gap = interval / duration;

    function detectIE() {
      var ua = window.navigator.userAgent;

      var msie = ua.indexOf('MSIE ');
      if (msie > 0) {
          // IE 10 or older => return version number
          return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }

      var trident = ua.indexOf('Trident/');
      if (trident > 0) {
          // IE 11 => return version number
          var rv = ua.indexOf('rv:');
          return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }

      var edge = ua.indexOf('Edge/');
      if (edge > 0) {
         // IE 12 (aka Edge) => return version number
         return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }

      // other browser
      return false;
    }
    var isInternetExplorer = isIE ? isIE : detectIE();
    if(isIn) {
         el.style.display = 'block';
         el.style.opacity = opacity;
         if(isInternetExplorer) {
            el.style.filter = 'alpha(opacity=' + opacity + ')';
            el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity + ')';
        }
    }

    function func() {
        opacity = isIn ? opacity + gap : opacity - gap;
        el.style.opacity = opacity;
        if(isInternetExplorer) {
            el.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
            el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')';
        }

        if(opacity <= 0 || opacity >= 1) window.clearInterval(fading);
        if(opacity <= 0) el.style.display = 'none';
    }

    var fading = window.setInterval(func, interval);
};
/* window event */
/* scrollToElement
item.addEventListener('click', function(){
  scrollToElement(document.getElementById('id-scrollToElement'), 10000);
});
*/
window.scrollToElement = ( function () {
  var timer, start, factor;

  return function (targetElement, duration) {

    var target = targetElement.offsetTop || 0,
        offset = window.pageYOffset,
        delta  = target - offset; // Y-offset difference
    duration = duration || 1000;              // default 1 sec animation
    start = Date.now();                       // get start time
    factor = 0;

    if( timer ) {
      clearInterval( timer ); // stop any running animations
    }

    function step() {
      var y;
      factor = ( Date.now() - start ) / duration; // get interpolation factor
      if( factor >= 1 ) {
        clearInterval( timer ); // stop animation
        factor = 1;           // clip to max 1.0
      }
      y = factor * delta + offset;
      window.scrollBy( 0, y - window.pageYOffset );
    }

    timer = setInterval( step, 10 );
    return timer;
  };
}());
  // slide up/ slide down

window.slideUpSlideDownElement = ( function () {
  'use strict';
  /**
  * getHeight - for elements with display:none
   */
  var getHeight = function(el) {
        var el_style      = window.getComputedStyle(el),
            el_display    = el_style.display,
            el_position   = el_style.position,
            el_visibility = el_style.visibility,
            el_max_height = el_style.maxHeight.replace('px', '').replace('%', ''),

            wanted_height = 0;


        // if its not hidden we just return normal height
        if(el_display !== 'none' && el_max_height !== '0') {
            return el.offsetHeight;
        }

        // the element is hidden so:
        // making the el block so we can meassure its height but still be hidden
        el.style.position   = 'absolute';
        el.style.visibility = 'hidden';
        el.style.display    = 'block';

        wanted_height     = el.offsetHeight;

        // reverting to the original values
        el.style.display    = el_display;
        el.style.position   = el_position;
        el.style.visibility = el_visibility;

          return wanted_height;
      };


  /**
  * toggleSlide mimics the jQuery version of slideDown and slideUp
  * all in one function comparing the max-heigth to 0
   */
  var  toggleSlide = function (el) {
        var el_max_height = 0;
        if(el.getAttribute('data-max-height')) {
          // we've already used this before, so everything is setup
          if(el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
            el.style.maxHeight = el.getAttribute('data-max-height');
          } else {
            el.style.maxHeight = '0';
          }
        }
        else {
          el_max_height                  = getHeight(el) + 'px';
          el.style['transition']         = 'max-height 0.5s ease-in-out';
          // el.style.overflowY             = 'hidden';
          el.style.maxHeight             = '0';
          // alert(12);
          el.setAttribute('data-max-height', el_max_height);
          el.style.display               = 'block';

          // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
          setTimeout(function() {
              el.style.maxHeight = el_max_height;
          }, 10);
        }
      };
  return toggleSlide;
}());
window.isMobileTablet = (function (){
  return navigator.userAgent.match(/Android|BlackBerry|BB|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
}());

Element.prototype.clickOff = function (callback, selfDestroy) {
  var clicked = false;
  var parent = this;
  var destroy = selfDestroy || true;

  parent.addEventListenerOrAttachEvent(function (){
    clicked = true;
  },'click');
  document.addEventListenerOrAttachEvent(function (event) {
    if(!clicked) {
      callback (parent, event);
    }
    if(destroy) {

    }
    clicked = false;
  }, 'click');
};

// $.fn.clickOff = function(callback, selfDestroy) {
//     var clicked = false;
//     var parent = this;
//     var destroy = selfDestroy || true;
    
//     parent.click(function() {
//         clicked = true;
//     });
    
//     $(document).click(function(event) { 
//         if (!clicked) {
//             callback(parent, event);
//         }
//         if (destroy) {
//             //parent.clickOff = function() {};
//             //parent.off("click");
//             //$(document).off("click");
//             //parent.off("clickOff");
//         };
//         clicked = false;
//     });
// };

/*$("#myDiv").click(function() {
    alert('clickOn');
});

$("#myDiv").clickOff(function() {
    alert('clickOff');
});
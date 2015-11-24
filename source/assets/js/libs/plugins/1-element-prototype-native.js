/* element prototype */
/*
          ______________________________________
          ______________________________________
          ______________________________________
          ELEMENT PROTOTYPE - VO XUAN HUY
          0942404202 - xuanhuy@mail.com
          ______________________________________
          ______________________________________
          ______________________________________
*/
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
name: fadeInFaceOut
usage: 
//fadeIn
fadeInFaceOut('in', 750, true);
//fadeOut
fadeInFaceOut('out', 750, true);
*/
Element.prototype.fadeInFaceOut = function (type, duration, isIE) {
    var el = this;
    var isIn = type === 'in',
    opacity = isIn ? 0 : 1,
    interval = 50,
    gap = interval / duration;

    if(isIn) {
         el.style.display = 'block';
         el.style.opacity = opacity;
         if(isIE) {
            el.style.filter = 'alpha(opacity=' + opacity + ')';
            el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity + ')';
        }
    }

    function func() {
        opacity = isIn ? opacity + gap : opacity - gap;
        el.style.opacity = opacity;
        if(isIE) {
            el.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
            el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')';
        }

        if(opacity <= 0 || opacity >= 1) window.clearInterval(fading);
        if(opacity <= 0) el.style.display = 'none';
    }

    var fading = window.setInterval(func, interval);
};


/* window event */
/*
          ______________________________________
          ______________________________________
          ______________________________________
          WINDOW FUNCTION - VO XUAN HUY
          0942404202 - xuanhuy@mail.com
          ______________________________________
          ______________________________________
          ______________________________________
*/

/* 
name: scrollToElement
usage:
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


/* 
name: findMiddleElementOfScreenWhenScroll
usage:
window.removeEventListener('scroll resize', A);
window.addEventListener('scroll resize', function A(){
  findMiddleElementOfScreenWhenScroll();
});
or
window.addEventLisener('scroll resize', findMiddleElementOfScreenWhenScroll);
*/

var findMiddleElementOfScreenWhenScroll = ( function (docElm) {
    var viewportHeight = docElm.clientHeight,
        // here i'm using pre-cached DIV elements, but you can use anything you want.
        // Cases where elements are generated dynamically are more CPU intense ofc.
        elements = document.querySelecterAll('div'); 
    return function (e) {
        var middleElement;
        if( e && e.type == 'resize' ) {
            viewportHeight = docElm.clientHeight;
        }
        elements.each(function(){
            var pos = this.getBoundingClientRect().top;
            // if an element is more or less in the middle of the viewport
            if( pos > viewportHeight/2.5 && pos < viewportHeight/1.5 ){
                middleElement = this;
                return false; // stop iteration
            }
        });

        console.log(middleElement);
    }
})(document.documentElement);


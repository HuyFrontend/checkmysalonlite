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
// window.constructor.prototype.addEventListenerOrAttachEventMultiEvent = document.constructor.prototype.addEventListenerOrAttachEventMultiEvent = Element.prototype.addEventListenerOrAttachEventMultiEvent;
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
// window.constructor.prototype.removeEventListenerOrDetachEventMultiEvent = document.constructor.prototype.removeEventListenerOrDetachEventMultiEvent = Element.prototype.removeEventListenerOrDetachEventMultiEvent;

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

(function() {
  if (!Event.prototype.preventDefault) {
    Event.prototype.preventDefault=function() {
      this.returnValue=false;
    };
  }
  if (!Event.prototype.stopPropagation) {
    Event.prototype.stopPropagation=function() {
      this.cancelBubble=true;
    };
  }
  if (!Element.prototype.addEventListener) {
    var eventListeners=[];

    var addEventListener=function(type,listener) {
      var self=this;
      var wrapper=function(e) {
        e.target=e.srcElement;
        e.currentTarget=self;
        if (listener.handleEvent) {
          listener.handleEvent(e);
        } else {
          listener.call(self,e);
        }
      };
      if (type=="DOMContentLoaded") {
        var wrapper2=function(e) {
          if (document.readyState=="complete") {
            wrapper(e);
          }
        };
        document.attachEvent("onreadystatechange",wrapper2);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});

        if (document.readyState=="complete") {
          var e=new Event();
          e.srcElement=window;
          wrapper2(e);
        }
      } else {
        this.attachEvent("on"+type,wrapper);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
      }
    };
    var removeEventListener=function(type,listener) {
      var counter=0;
      while (counter<eventListeners.length) {
        var eventListener=eventListeners[counter];
        if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
          if (type=="DOMContentLoaded") {
            this.detachEvent("onreadystatechange",eventListener.wrapper);
          } else {
            this.detachEvent("on"+type,eventListener.wrapper);
          }
          eventListeners.splice(counter, 1);
          break;
        }
        ++counter;
      }
    };
    Element.prototype.addEventListener=addEventListener;
    Element.prototype.removeEventListener=removeEventListener;
    if (HTMLDocument) {
      HTMLDocument.prototype.addEventListener=addEventListener;
      HTMLDocument.prototype.removeEventListener=removeEventListener;
    }
    if (Window) {
      Window.prototype.addEventListener=addEventListener;
      Window.prototype.removeEventListener=removeEventListener;
    }
  }
})();

// /*
// name : fadeInFadeOut
// usage:
// //fadeIn
// fadeInFaceOut('in', 750, true);
// //fadeOut
// fadeInFaceOut('out', 750, true);
// */
// Element.prototype.fadeInFadeOut = function (type, duration) {
//     var el = this;
//     var isFadeIn = type === 'in',
//     opacity = isFadeIn ? 0 : 1,
//     interval = 50,
//     gap = interval / duration;

//     function detectIE() {
//       var ua = window.navigator.userAgent;

//       var msie = ua.indexOf('MSIE ');
//       if (msie > 0) {
//           // IE 10 or older => return version number
//           return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
//       }

//       var trident = ua.indexOf('Trident/');
//       if (trident > 0) {
//           // IE 11 => return version number
//           var rv = ua.indexOf('rv:');
//           return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
//       }

//       var edge = ua.indexOf('Edge/');
//       if (edge > 0) {
//          // IE 12 (aka Edge) => return version number
//          return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
//       }

//       // other browser
//       return false;
//     }
//     var isFadeInternetExplorer = detectIE();
//     if(isFadeIn) {
//          el.style.display = 'block';
//          el.style.opacity = opacity;
//          if(isFadeInternetExplorer) {
//             el.style.filter = 'alpha(opacity=' + opacity + ')';
//             el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity + ')';
//         }
//     }

//     function func() {
//         opacity = isFadeIn ? opacity + gap : opacity - gap;
//         el.style.opacity = opacity;
//         if(isFadeInternetExplorer) {
//             el.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
//             el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')';
//         }

//         if(opacity <= 0 || opacity >= 1) window.clearInterval(fading);
//         if(opacity <= 0) el.style.display = 'none';
//     }

//     var fading = window.setInterval(func, interval);
// };
// /*
// name : clickOff
// usage:
// //elemen.clickOff to check insize or out size
// */
// Element.prototype.clickOff = function (callback, selfDestroy) {
//   var clicked = false;
//   var parent = this;
//   var destroy = selfDestroy || true;

//   parent.addEventListenerOrAttachEvent(function (){
//     clicked = true;
//   },'click');
//   document.addEventListenerOrAttachEvent(function (event) {
//     if(!clicked) {
//       callback (parent, event);
//     }
//     if(destroy) {

//     }
//     clicked = false;
//   }, 'click');
// };

// /* window event */

// /*
// name: scrollToElement
// usage:
// item.addEventListener('click', function(){
//   scrollToElement(document.getElementById('id-scrollToElement'), 10000);
// });
// */
// window.scrollToElement = ( function () {
//   var timer, start, factor;

//   return function (targetElement, duration) {

//     var target = targetElement.offsetTop || 0,
//         offset = window.pageYOffset,
//         delta  = target - offset; // Y-offset difference
//     duration = duration || 1000;              // default 1 sec animation
//     start = Date.now();                       // get start time
//     factor = 0;

//     if( timer ) {
//       clearInterval( timer ); // stop any running animations
//     }

//     function step() {
//       var y;
//       factor = ( Date.now() - start ) / duration; // get interpolation factor
//       if( factor >= 1 ) {
//         clearInterval( timer ); // stop animation
//         factor = 1;           // clip to max 1.0
//       }
//       y = factor * delta + offset;
//       window.scrollBy( 0, y - window.pageYOffset );
//     }

//     timer = setInterval( step, 10 );
//     return timer;
//   };
// }());


// window.isMobileTablet = (function (){
//   return navigator.userAgent.match(/Android|BlackBerry|BB|iPhone|iPad|iPod|webOS|Opera Mini|IEMobile/i);
// }());
// window.isMobile = {
//     Android: function() {
//         return navigator.userAgent.match(/Android/i);
//     },
//     BlackBerry: function() {
//         return navigator.userAgent.match(/BlackBerry|BB/i);
//     },
//     iOS: function() {
//         return navigator.userAgent.match(/iPhone|iPad|iPod/i);
//     },
//     Opera: function() {
//         return navigator.userAgent.match(/Opera Mini/i);
//     },
//     Windows: function() {
//         return navigator.userAgent.match(/IEMobile/i);
//     },
//     any: function() {
//         return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
//     }
// };
// window.getMaxOfArray = (function () {
//   return function (numArray) {
//     return Math.max.apply(null, numArray);
//   };
// }());

// window.getPositionMaxArray = (function (array) {
//   return function (array) {
//     var i = array.indexOf(Math.max.apply(Math, array));
//     return i;
//   };
// }());
// /*
// name: findMiddleElementOfScreenWhenScroll
// window.onscroll( function(){
//   var elements = document.queryselectorAll('li a');
//   findMiddleElementOfScreenWhenScroll(elements);
// });
// */
// window.findMiddleElementOfScreenWhenScroll = ( function () {
//     var viewportHeight = document.documentElement.clientHeight/*,
//         elements = document.querySelecterAll('div')*/;
//         // here i'm using pre-cached DIV elements, but you can use anything you want.
//         // Cases where elements are generated dynamically are more CPU intense ofc.
//     return function (e, elements) {
//         var middleElement;
//         var listElement = [];
//         // alert(e.type);
//         if( e && e.type === 'resize' ) {
//             viewportHeight = document.documentElement.clientHeight;
//         }
//         // elements = document.querySelectorAll('[data-block]');
//         for(var i = 0, len = elements.length; i < len; i++) {
//           var pos = elements[i].getBoundingClientRect().top;
//           if(pos < viewportHeight/2 ) {
//             middleElement = elements[i];
//             listElement.push(middleElement);
//           }
//           // if an element is more or less in the middle of the viewport
//           /*if( pos > viewportHeight/2.5 && pos < viewportHeight/1.5 ){
//               middleElement = elements[i];
//               return false; // stop iteration
//           }*/
//         }
//         return listElement[listElement.length - 1];

//     }
// }());

// /*
// name: Fade
// usage: fade in, fade out, call back
// example:
// document.getElementById('in').addEventListener('click', function() {
//     Fade.fadeIn(document.getElementById('test'), {
//         duration: 2000,
//         complete: function() {
//             alert('Complete');
//         }
//     });
// }, false);
// */

// (function() {
//   var Fade = {
//     easing: {
//       linear: function(progress) {
//         return progress;
//       },
//       quadratic: function(progress) {
//         return Math.pow(progress, 2);
//       },
//       swing: function(progress) {
//         return 0.5 - Math.cos(progress * Math.PI) / 2;
//       },
//       circ: function(progress) {
//         return 1 - Math.sin(Math.acos(progress));
//       },
//       back: function(progress, x) {
//         return Math.pow(progress, 2) * ((x + 1) * progress - x);
//       },
//       bounce: function(progress) {
//         for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
//           if (progress >= (7 - 4 * a) / 11) {
//             return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
//           }
//         }
//       },
//       elastic: function(progress, x) {
//         return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
//       }
//     },
//     animate: function(options) {
//       var start = new Date;
//       var id = setInterval(function() {
//         var timePassed = new Date - start;
//         var progress = timePassed / options.duration;
//         if (progress > 1) {
//           progress = 1;
//         }
//         options.progress = progress;
//         var delta = options.delta(progress);
//         options.step(delta);
//         if (progress == 1) {
//           clearInterval(id);
//           options.complete();
//         }
//       }, options.delay || 10);
//     },
//     fadeOut: function(element, options) {
//       var to = 1;
//       this.animate({
//         duration: options.duration,
//         delta: function(progress) {
//           progress = this.progress;
//           return Fade.easing.swing(progress);
//         },
//         complete: options.complete,
//         step: function(delta) {
//           element.style.opacity = to - delta;
//         }
//       });
//     },
//     fadeIn: function(element, options) {
//       var to = 0;
//       this.animate({
//         duration: options.duration,
//         delta: function(progress) {
//           progress = this.progress;
//           return Fade.easing.swing(progress);
//         },
//         complete: options.complete,
//         step: function(delta) {
//           element.style.opacity = to + delta;
//         }
//       });
//     }
//   };
//   window.Fade = Fade;
// })();

// /*
// name: wheel
// usage
// */
// // creates a global 'addWheelListener' method
// // example: addWheelListener( elem, function( e ) { console.log( e.deltaY ); e.preventDefault(); } );
// (function(window,document) {

//     var prefix = '', _addEventListener, support;

//     // detect event model
//     if ( window.addEventListener ) {
//         _addEventListener = 'addEventListener';
//     } else {
//         _addEventListener = 'attachEvent';
//         prefix = 'on';
//     }

//     // detect available wheel event
//     support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support 'wheel'
//               document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least 'mousewheel'
//               'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox

//     window.addWheelListener = function( elem, callback, useCapture ) {
//         _addWheelListener( elem, support, callback, useCapture );

//         // handle MozMousePixelScroll in older Firefox
//         if( support == 'DOMMouseScroll' ) {
//             _addWheelListener( elem, 'MozMousePixelScroll', callback, useCapture );
//         }
//     };

//     function _addWheelListener( elem, eventName, callback, useCapture ) {
//         elem[ _addEventListener ]( prefix + eventName, support == 'wheel' ? callback : function( originalEvent ) {
//             !originalEvent && ( originalEvent = window.event );

//             // create a normalized event object
//             var event = {
//                 // keep a ref to the original event object
//                 originalEvent: originalEvent,
//                 target: originalEvent.target || originalEvent.srcElement,
//                 type: 'wheel',
//                 deltaMode: originalEvent.type == 'MozMousePixelScroll' ? 0 : 1,
//                 deltaX: 0,
//                 deltaZ: 0,
//                 preventDefault: function() {
//                     originalEvent.preventDefault ?
//                         originalEvent.preventDefault() :
//                         originalEvent.returnValue = false;
//                 }
//             };

//             // calculate deltaY (and deltaX) according to the event
//             if ( support == 'mousewheel' ) {
//                 event.deltaY = - 1/40 * originalEvent.wheelDelta;
//                 // Webkit also support wheelDeltaX
//                 originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
//             } else {
//                 event.deltaY = originalEvent.detail;
//             }

//             // it's time to fire the callback
//             return callback( event );

//         }, useCapture || false );
//     }

// })(window,document);

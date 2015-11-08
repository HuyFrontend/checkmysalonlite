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
    } else {
        this.className += ' ' + className;
    }
};
// Change addEventListener to attachEvent on IE8-
Element.prototype.fallBackListener = function (element, event, targetFunction, isDefault) {
    if(element.addEventListener) {
        element.addEventListener (event, targetFunction, isDefault);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + event, ( function (el){
            return function () {
                targetFunction.call(el, window.event);
            };
        } (element)));
        element = null;
    }
};
// same fallback
Element.prototype.addEventListenerOrAttachEvent = function (targetFunction, event, isDefault) {
    if (!this.addEventListener) {
        this.attachEvent('on' + event, targetFunction);
    }
    else {
        this.addEventListener(event, targetFunction, isDefault);        
    }
};
// append prototype to document, window
window.constructor.prototype.addEventListenerOrAttachEvent = document.constructor.prototype.addEventListenerOrAttachEvent = Element.prototype.addEventListenerOrAttachEvent;
// window.constructor.prototype.removeEventListener = document.constructor.prototype.removeEventListener = Element.prototype.removeEventListener = removeEventListener;
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
Element.prototype.closest = function (value, type) {

};

// Element.prototype.closestClass = function (className) {
//     var parent = this.parentNode;
//     while (parent !== document.body) {
//         if (parent && parent.hasClass(className)) {
//             return parent;
//         }
//         else {
//             parent = parent.parentNode;
//         }
//     }
//     return null;
// }
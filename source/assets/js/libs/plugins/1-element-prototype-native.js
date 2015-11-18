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

Element.prototype.addEventListenerOrAttachEventMultiEvent = function (targetFunction, eventList, isDefault) {
    for ( var i = 0, len = eventList.length; i < len; i++ ) {
        if (!this.addEventListener) {
        this.attachEvent('on' + eventList[i], targetFunction);
        }
        else {
            this.addEventListener(eventList[i], targetFunction, isDefault);
        }
    }

};
window.constructor.prototype.addEventListenerOrAttachEventMultiEvent = document.constructor.prototype.addEventListenerOrAttachEventMultiEvent = Element.prototype.addEventListenerOrAttachEventMultiEvent;
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
Element.prototype.closestAtributeName = function (value) {
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

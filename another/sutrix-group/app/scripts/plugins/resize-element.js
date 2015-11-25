
(function(factory){
  window.SetSizeElement = factory();
})(function(){

  // SetSizeElement DEFINITION
  // ===================
  var SetSizeElement = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = typeof options === 'object' ? options : {};

    this.init();
  };

  // SetSizeElement METHODS
  // ================
  SetSizeElement.prototype = {

    init : function() {
      // var self = this, elm = self.element, body = document.querySelector('body'), opt = self.options;
      // var subMenu = document.getElementById('menu-wrapper') ? document.getElementById('menu-wrapper'): null;
      // opt.originHeigh = subMenu ? subMenu.offsetHeight : opt.originHeigh;


      /*var doneResize = function () {
        var screenHeight = document.documentElement.clientHeight;
        var headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;
        var menuHeight = opt.originHeigh;
        if(screenHeight < (headerHeight + menuHeight)) {
          document.getElementById('menu-wrapper').style.maxHeight = (screenHeight - headerHeight) + 'px';
        }
        else {
          document.getElementById('menu-wrapper').style.maxHeight = menuHeight + 'px';
        }
      };
      var resizeId;
      window.addEventListenerOrAttachEventMultiEvent(function () {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResize, 300);
      }, ['resize']);*/

      this.actions();
      this.setMaxHeight();
    },

    actions : function() {
      var self = this, elm = self.element, opt = self.options;

      self.setMaxHeight = function () {
        var doneResize = function () {
          if(opt.setMaxHeight && elm.hasClass(opt.classOpen)) {
            var screenHeight = document.documentElement.clientHeight;
            var headerHeight = document.querySelector('.header') ? document.querySelector('.header').clientHeight : 0;
            var menuHeight = opt.originHeigh;
            // alert(document.documentElement.clientHeight);
            // alert(screen.height);
            if(screenHeight < (headerHeight + menuHeight)) {
              elm.style.maxHeight = (screenHeight - headerHeight) + 'px';
            }
            else {
              if( elm.style.removeProperty ) {
                elm.style.removeProperty('max-height');
              }
              else {
                elm.style.maxHeight = menuHeight + 'px';
              }
            }
          }
        };
        var resizeId;
        window.addEventListenerOrAttachEventMultiEvent(function () {
          clearTimeout(resizeId);
          resizeId = setTimeout(doneResize, 1000);
        }, ['resize']);
      };
      self.otherMethod = function () {
      };
    }
  };

  // SetSizeElement DATA API
  // =================
  var SetSizeElements = document.querySelectorAll('[data-toggle="SetSizeElement"]');
  for (var i = 0, len = SetSizeElements.length; i < len; i++ ) {
      var element = SetSizeElements[i],
          options = {
            classOpen: 'collapse',
            classActive: 'active',
            setMaxHeight: true,
            originHeigh: element.offsetHeight
          };
    new SetSizeElement(element, options);
  }

  return SetSizeElement;

});

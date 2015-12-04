
(function(factory){
  window.ToggleMenu = factory();
})(function(){

  // ToggleMenu DEFINITION
  // ===================
  var ToggleMenu = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = typeof options === 'object' ? options : {};
    this.init();
  };

  // ToggleMenu METHODS
  // ================
  ToggleMenu.prototype = {

    init : function() {
      var self = this, elm = self.element, opt = self.options, body = document.querySelector('body');
      opt.elementWrapMenu =  opt.idWrapMenu ? document.querySelector('#' + this.options.idWrapMenu) : opt.elementWrapMenu;
      opt.menuHeight = opt.elementWrapMenu ? opt.elementWrapMenu.offsetHeight : opt.menuHeight;

      this.actions();

      elm.removeEventListenerOrDetachEventMultiEvent(self.toggle, ['click']);
      elm.addEventListenerOrAttachEventMultiEvent(self.toggle, ['click']);

      body.removeEventListenerOrDetachEventMultiEvent(self.bodyToggle, ['click']);
      body.addEventListenerOrAttachEventMultiEvent(self.bodyToggle, ['click'] );

      var resizeId;
      function setResize () {
        self.setHeight();
      }
      function handleResize () {
        if(elm.hasClass(opt.classActive)) {
          clearTimeout(resizeId);
          resizeId = setTimeout(setResize, 0);
        }
      }
      window.removeEventListenerOrDetachEventMultiEvent(handleResize, ['resize']);
      window.addEventListenerOrAttachEventMultiEvent(handleResize, ['resize']);

    },
    actions : function() {
      var self = this, elm = self.element, opt = self.options, body = document.querySelector('body');
      self.toggle = function () {
        if(elm.classList) {
          if(elm.classList.contains(opt.classActive)) {
            elm.classList.remove(opt.classActive);
          }
          else {
            elm.classList.add(opt.classActive);
          }
        }
        else {
          if(elm.hasClass(opt.classActive)) {
            elm.removeClass(opt.classActive);
          }
          else {
            elm.addClass(opt.classActive);
          }
        }

        if(opt.elementWrapMenu.classList) {
          if(opt.elementWrapMenu.classList.contains(opt.classOpen)) {
            opt.elementWrapMenu.classList.remove(opt.classOpen);
            if(window.isMobileTablet) {
              document.body.style.overflow = 'auto';
              body.removeEventListenerOrDetachEventMultiEvent(self.bodyToggle, ['touchstart']);
            }
          }
          else {
            opt.elementWrapMenu.classList.add(opt.classOpen);
            self.setHeight();
            if(window.isMobileTablet ) {
              document.body.style.overflow = 'hidden';
              body.addEventListenerOrAttachEventMultiEvent(self.bodyToggle, ['touchstart']);
            }
          }
        }
        else {
          if(opt.elementWrapMenu.hasClass(opt.classOpen)) {
            opt.elementWrapMenu.removeClass(opt.classOpen);
            if(window.isMobileTablet) {
              document.body.style.overflow = 'auto';
              opt.elementWrapMenu.style.overflow = 'auto';
            }
          }
          else {
            self.setHeight();
            opt.elementWrapMenu.addClass(opt.classOpen);
             if(window.isMobileTablet) {
              opt.elementWrapMenu.style.overflow = 'auto';
              document.body.style.overflow = 'hidden';
            }
          }
        }
      };
      self.setHeight = function () {
        var screenHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : window.innerHeight;
        var headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;

        if((opt.menuHeight + headerHeight) > screenHeight) {
          opt.elementWrapMenu.style.maxHeight = ( screenHeight - headerHeight + 8 ) + 'px';
          opt.elementWrapMenu.style.overflow = 'auto';
        }
        else {
          if(element.style.removeProperty) {
            opt.elementWrapMenu.style.removeProperty('max-height');
            opt.elementWrapMenu.style.removeProperty('overflow');
          }
          else {
            opt.elementWrapMenu.style.maxHeight = opt.menuHeight + 'px';
            opt.elementWrapMenu.style.overflow = 'hidden';
          }
        }
      };
      self.bodyToggle = function (e) {
        if(!elm.hasClass(opt.classActive)) {
          return;
        }
        var thisTarget = e.target || e.srcElement,
        isBtnMenu = ( thisTarget.hasAttribute('data-toggle') && (thisTarget.getAttribute('data-toggle') === 'ToggleMenu' )) ? thisTarget : '',
        isChildBntMenu = ( thisTarget.parentNode.hasAttribute('data-toggle') && (thisTarget.parentNode.getAttribute('data-toggle') === 'ToggleMenu' )) ? thisTarget.parentNode : '';
        if((isBtnMenu) || (isChildBntMenu)) {
          return;
        }
        if(!isBtnMenu && !isChildBntMenu) {
          // inner submtenu
          if(thisTarget.closestId(opt.idWrapMenu) || thisTarget.id === opt.idWrapMenu ) {
            if(window.isMobileTablet) {
              document.body.style.overflow = 'hidden';
              opt.elementWrapMenu.style.overflow = 'auto';
            }
          }
          else {
            if(window.isMobileTablet) {
              document.body.style.overflow = 'auto';
            }
            if(elm.classList) {
              if(elm.classList.contains(opt.classActive)) {
                elm.classList.remove(opt.classActive);
              }
            }
            else {
              if(elm.hasClass(opt.classActive)) {
                elm.removeClass(opt.classActive);
              }
            }
            var navigationHeader = document.querySelector('#' + opt.idWrapMenu);
            if(navigationHeader && navigationHeader.classList) {
              if(navigationHeader.classList.contains(opt.classOpen)) {
                navigationHeader.classList.remove(opt.classOpen);
              }
            }
            else {
              if(navigationHeader && navigationHeader.hasClass(opt.classOpen)) {
                navigationHeader.removeClass(opt.classOpen);
              }
            }
          }

        }
        else {
        }
      };
      self.getWidth = function () {
        var screenWidth = document.documentElement ? document.documentElement.clientWidth : window.innerWidth;
        var menuWidth = document.querySelector('#' + opt.idWrapMenu).offsetWidth;

        if(menuWidth < screenWidth) {
          opt.isScrollPage = true;
        }
        else {
          opt.isScrollPage = false;
        }
      };
      self.otherMethod = function () {
      };
    }
  };

  // ToggleMenu DATA API
  // =================
  var ToggleMenus = document.querySelectorAll('[data-toggle="ToggleMenu"]');
  for (var i = 0, len = ToggleMenus.length; i < len; i++ ) {
      var element = ToggleMenus[i],
          options = {
            idWrapMenu: 'menu-wrapper',
            elementWrapMenu: '',
            classOpen: 'collapse',
            classActive: 'active',
            menuHeight: 0
          };
    new ToggleMenu(element, options);
  }

  return ToggleMenu;

});

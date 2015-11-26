
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
      // var subMenu = document.getElementById('menu-wrapper') ? document.getElementById('menu-wrapper'): null;
      var targetElement = document.querySelector('#' + opt.targetId);
      // var isOpen = false;

      opt.targetElement = targetElement;
      opt.menuHeight = opt.targetElement ? opt.targetElement.offsetHeight : opt.menuHeight;

      this.actions();

      elm.removeEventListenerOrDetachEventMultiEvent(self.toggle, ['click']);
      elm.addEventListenerOrAttachEventMultiEvent(self.toggle, ['click']);

      body.removeEventListenerOrDetachEventMultiEvent(self.bodyToggle, ['click'] );
      body.addEventListenerOrAttachEventMultiEvent(self.bodyToggle, ['click'] );


      function resizeHeightMenu () {
        self.setHeight();
      }
      var resizeId;
      window.addEventListenerOrAttachEventMultiEvent(function () {
        clearTimeout(resizeId);
        resizeId = setTimeout(resizeHeightMenu, 0);
      }, ['resize']);

    },
    actions : function() {
      var self = this, elm = self.element, opt = self.options;

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

        if(opt.targetElement.classList) {
          if(opt.targetElement.classList.contains(opt.classOpen)) {
            opt.targetElement.classList.remove(opt.classOpen);
          }
          else {
            self.setHeight();
            opt.targetElement.classList.add(opt.classOpen);
          }
        }
        else {
          if(opt.targetElement.hasClass(opt.classOpen)) {
            opt.targetElement.removeClass(opt.classOpen);
          }
          else {
            self.setHeight();
            opt.targetElement.classList.add(opt.classOpen);
          }
        }
      };
      self.setHeight = function () {
        var screenHeight = document.documentElement.clientHeight ? document.documentElement.clientHeight : window.innerHeight;
        var headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;

        if((opt.menuHeight + headerHeight) > screenHeight) {
          opt.targetElement.style.maxHeight = (screenHeight - headerHeight) + 'px';
        }
        else {
          if(element.style.removeProperty) {
            opt.targetElement.style.removeProperty('max-height');
          }
          else {
            opt.targetElement.style.maxHeight = opt.menuHeight + 'px';
          }
        }
      };
      self.bodyToggle = function (e) {
        var thisTarget = e.target || e.srcElement,
        isBtnMenu = ( thisTarget.hasAttribute('data-toggle') && (thisTarget.getAttribute('data-toggle') === 'ToggleMenu' )) ? thisTarget : '',
        isChildBntMenu = ( thisTarget.parentNode.hasAttribute('data-toggle') && (thisTarget.parentNode.getAttribute('data-toggle') === 'ToggleMenu' )) ? thisTarget.parentNode : '';
        if(!isBtnMenu && !isChildBntMenu) {
          // if(!isBtnMenu) {
          if(thisTarget.closestId(opt.targetId) || thisTarget.id === opt.targetId ) {
          }
          else {
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
            var navigationHeader = document.querySelector('#' + opt.targetId);
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
            value : '',
            targetId: element.getAttribute('data-target'),
            classOpen: 'collapse',
            classActive: 'active',
            menuHeight: 0,
            targetElement: ''
          };
    new ToggleMenu(element, options);
  }

  return ToggleMenu;

});

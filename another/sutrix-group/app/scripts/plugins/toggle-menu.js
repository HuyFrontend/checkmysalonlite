
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
      var subMenu = document.getElementById('menu-wrapper') ? document.getElementById('menu-wrapper'): null;
      opt.menuHeight = subMenu ? subMenu.offsetHeight : opt.menuHeight;
      // alert(subMenu.offsetHeight);
      // alert(opt.targetHeight);
      this.actions();

      elm.addEventListenerOrAttachEventMultiEvent(self.toggle, ['click'] );

      // body.removeEventListenerOrDetachEventMultiEvent( self.bodyToggle, ['click'] );
      body.addEventListenerOrAttachEventMultiEvent( function exitMenu (e) {
        self.bodyToggle(e);
      }, ['click'] );

      window.onscroll = function () {
        self.bodyScroll();
      };      
    },

    actions : function() {
      var self = this, elm = self.element, opt = self.options;

      self.toggle = function () {
        var targetElement = document.querySelector('#' + opt.target);

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

        if(targetElement.classList) {
          if(targetElement.classList.contains(opt.classCollapse)) {
            targetElement.classList.remove(opt.classCollapse);
          }
          else {
            targetElement.classList.add(opt.classCollapse);
            self.setHeight(targetElement);
          }
        }
        else {
          if(targetElement.hasClass(opt.classCollapse)) {
            targetElement.removeClass(opt.classCollapse);
          }
          else {
            targetElement.addClass(opt.classCollapse);
            self.setHeight(targetElement);
          }
        }
      };
      self.setHeight = function (element) {
        var screenHeight = document.documentElement.clientHeight;
        var header = document.querySelector('.header'),
            headerHeight = header.offsetHeight;
        var menuHeight = opt.menuHeight;

        // opt.initMenuHeight = menuHeight;
        if( (menuHeight + headerHeight) > screenHeight) {
          menuHeight = screenHeight - headerHeight;
          element.style.maxHeight = menuHeight + 'px';
        }
        else {
          if(element.style.removeProperty) {
            element.style.removeProperty('max-height');
          }
          else {
            element.style.maxHeight =screenHeight + 'px';
          }
        }
      };
      self.bodyToggle = function (e) {
        var thisTarget = e.target || e.srcElement,
        isBtnMenu = ( thisTarget.hasAttribute('data-toggle') && (thisTarget.getAttribute('data-toggle') === 'ToggleMenu' )) ? thisTarget : '',
        isChildBntMenu = ( thisTarget.parentNode.hasAttribute('data-toggle') && (thisTarget.parentNode.getAttribute('data-toggle') === 'ToggleMenu' )) ? thisTarget.parentNode : '';
        if(!isBtnMenu && !isChildBntMenu) {
        // if(!isBtnMenu) {
          if(thisTarget.closestId(opt.target) || thisTarget.id === opt.target ) {
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
            var navigationHeader = document.querySelector('#' + opt.target);
            if(navigationHeader && navigationHeader.classList) {
              if(navigationHeader.classList.contains(opt.classCollapse)) {
                navigationHeader.classList.remove(opt.classCollapse);
              }
            }
            else {
              if(navigationHeader && navigationHeader.hasClass(opt.classCollapse)) {
                navigationHeader.removeClass(opt.classCollapse);
              }
            }
          }
        }
      };
      self.bodyScroll = function () {
        var bodyScroll = document.body.scrollTop;

        var wrapMenu = document.querySelector('#' + opt.target),
            menuItem = wrapMenu.querySelectorAll('[data-target]');

        for(var i = 0, len = menuItem.length; i < len; i++) {
          var eachItem = menuItem[i],
              targetItem = document.querySelector('#' + eachItem.getAttribute('data-target'));

          if(targetItem && (targetItem.offsetTop - 10) >= bodyScroll) {
            self.activeSubMenuItem(targetItem, wrapMenu);
            break;
          }
        }
      };
      self.activeSubMenuItem = function (targetItem, subMenu) {
        if(targetItem) {
          var itemId = targetItem.id;
          var thisItem = subMenu.querySelector('[data-target="'+itemId+'"');
          var activeItems = subMenu.querySelectorAll('.' + opt.classActive);
          for (var len = activeItems.length, i = len - 1; i >= 0; i--) {
            if(activeItems[i].classList) {
              activeItems[i].classList.remove(opt.classActive);
            }
            else {
              activeItems[i].removeClass(opt.classActive);
            }
          }
          if (thisItem.classList) {
            thisItem.parentNode.classList.add(opt.classActive);
          }
          else {
            thisItem.parentNode.addClass(opt.classActive);
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
            target: element.getAttribute('data-target'),
            classCollapse: 'collapse',
            classActive: 'active',
            menuHeight: 0
          };
    new ToggleMenu(element, options);
  }

  return ToggleMenu;

});

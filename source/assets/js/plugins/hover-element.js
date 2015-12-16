/**
design in html
example
<a data-toggle="HoverElement", data-item="true", data-target="HoverElementTarget">HoverElement</a>
**/

(function(factory){
  var init = factory();
  if(Window) {
    Window.HoverElement = init;
  }
})(function(){

  // HoverElement DEFINITION
  // ===================
  var HoverElement = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = typeof options === 'object' ? options : {};
    this.init();
  };

  // HoverElement METHODS
  // ================
  HoverElement.prototype = {

    init : function() {
      var self = this, elm = self.element/*, opt = self.options*/;
      this.actions();
      elm.removeEventListener('click mouseenter', self.hover);
      elm.addEventListener('click mouseenter', self.hover);
      elm.removeEventListener('mouseleave', self.offHover);
      elm.addEventListener('mouseleave', self.offHover);
    },

    actions : function() {
      var self = this, /*elm = self.element, */opt = self.options;

      self.hover = function (e) {
        var me = e.target || e.srcElement;
        var itemHover = me.getAttribute(opt.item) ? me : me.closestAttributeName(opt.item);
        if(itemHover) {
          var elementTarget = itemHover.getAttribute(opt.target) ? document.querySelector('[' + itemHover.getAttribute(opt.target) + ']') : null;
          if(elementTarget) {
            opt.elementTarget = elementTarget;
            if(elementTarget.classList) {
              elementTarget.classList.add(opt.classActive);
            }
            else {
              elementTarget.addClass(opt.classActive);
            }
          }
        }
      };
      self.offHover = function () {
        if(opt.elementTarget) {
          if ( opt.elementTarget.classList && opt.elementTarget.classList.contains ( opt.classList ) ){
            opt.elementTarget.classList.remove(opt.classActive);
          }
          else if ( opt.elementTarget.hasClass ( opt.classActive ) ) {
            opt.elementTarget.removeClass ( opt.classActive );
          }
        }
      };
      self.otherMethod = function () {
      };
    }
  };

  // HoverElement DATA API
  // =================
  var HoverElements = document.querySelectorAll('[data-toggle="HoverElement"]');
  for (var i = 0, len = HoverElements.length; i < len; i++ ) {
      var element = HoverElements[i],
          options = {
            value : '',
            item: 'data-item-hover',
            target: 'data-target',
            elementTarget: '',
            classActive: 'active',
            classHide: 'hide'
          };
    new HoverElement(element, options);
  }
  return HoverElement;
});

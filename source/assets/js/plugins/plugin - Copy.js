(function(factory){
  window.HoverElement = factory();
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

      elm
        .removeEventListenerOrDetachEventMultiEvent ( self.hover, ['click', 'mouseenter'] )
        .addEventListenerOrAttachEventMultiEvent ( self.hover, ['click', 'mouseenter'] );
      
      elm
        .removeEventListenerOrDetachEventMultiEvent ( self.offHover, [ 'mouseout' ] )
        .addEventListenerOrAttachEventMultiEvent ( self.offHover, [ 'mouseout' ] );
    },

    actions : function() {
      var self = this, /*elm = self.element, */opt = self.options;

      self.hover = function (e) {
        var me = e.target || e.srcElement;
        var itemHover = me.getAttribute(opt.item) ? me.getAttribute(opt.item) : me.closestAttributeName(opt.item);
        if(itemHover) {
          var elementTarget = itemHover.getAttribute(opt.target) ? document.querySelector('[' + itemHover.getAttribute(opt.target) + ']') : '';
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
  var HoverElements = document.querySelectorAll('[data-active-contact]');
  for (var i = 0, len = HoverElements.length; i < len; i++ ) {
      var element = HoverElements[i],
          options = {
            value : '',
            item: 'data-hover',
            target: 'data-target',
            elementTarget: '',
            classActive: 'active',
            classHide: 'hide'
          };
    new HoverElement(element, options);
  }
  return HoverElement;
});

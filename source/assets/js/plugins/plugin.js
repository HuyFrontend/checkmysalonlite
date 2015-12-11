/**
design in html
example
<a data-toggle="DEFAUTMODULE", data-item="true", data-target="DEFAUTMODULETarget">DEFAUTMODULE</a>
**/

(function(factory){
  factory();
  if(Window) {
    window.DEFAUTMODULE = factory();
  }
})(function(){

  // DEFAUTMODULE DEFINITION
  // ===================
  var DEFAUTMODULE = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = typeof options === 'object' ? options : {};
    // define new option
    this.options.newOption = 'newOption';
    this.init();
  };

  // DEFAUTMODULE METHODS
  // ================
  DEFAUTMODULE.prototype = {

    init : function() {
      var self = this, elm = self.element/*, opt = self.options*/;
      this.actions();

      elm.removeEventListenerOrDetachEventMultiEvent (self.hover, ['click', 'mouseenter']);
      elm.addEventListenerOrAttachEventMultiEvent (self.hover, ['click', 'mouseenter']);

      elm.removeEventListenerOrDetachEventMultiEvent (self.offHover, ['mouseout']);
      elm.addEventListenerOrAttachEventMultiEvent (self.offHover, ['mouseout']);
    },

    actions : function() {
      var self = this, /*elm = self.element, */opt = self.options;

      self.hover = function (e) {
        console.log(e,opt);
      };

      self.otherMethod = function () {
      };
    }
  };

  // DEFAUTMODULE DATA API
  // =================
  var DEFAUTMODULEs = document.querySelectorAll('[data-toggle="DEFAUTMODULE"]');
  for (var i = 0, len = DEFAUTMODULEs.length; i < len; i++ ) {
      var element = DEFAUTMODULEs[i],
          options = {
            value : '',
            item: 'data-item',
            target: 'data-target',
            elementTarget: '',
            classActive: 'active',
            classHide: 'hide'
          };
    new DEFAUTMODULE(element, options);
  }
  return DEFAUTMODULE;
});

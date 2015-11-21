
(function(factory){
  // Assume a traditional browser.
  window.DEFAULTMODULE = factory();

})(function(){

  // DEFAULTMODULE DEFINITION
  // ===================
  var DEFAULTMODULE = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = options || {};
    this.options.value = !options.value ? null : options.value;

    this.init();
  };

  // DEFAULTMODULE METHODS
  // ================
  DEFAULTMODULE.prototype = {

    init : function() {
      var self = this, elm = self.element/*, opt = self.options*/;
      this.actions();
      elm.addEventListenerOrAttachEventMultiEvent(self.toggleRate, ['click']);
    },

    actions : function() {
      var self = this, elm = self.element, opt = self.options;
      self.method = function () {
        console.log(elm,opt);
      };
      self.otherMethod = function () {
      };
    }
  };

  // DEFAULTMODULE DATA API
  // =================
  var DEFAULTMODULEs = document.querySelectorAll('[data-toggle="DEFAULTMODULE"]');
  for (var i = 0, len = DEFAULTMODULEs.length; i < len; i++ ) {
      var element = DEFAULTMODULEs[i],
          options = {
            value : ''
          };
    new DEFAULTMODULE(element, options);
  }

  return DEFAULTMODULE;

});

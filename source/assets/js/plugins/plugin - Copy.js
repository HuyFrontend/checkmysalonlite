
(function(factory){
  // CommonJS/RequireJS and 'native' compatibility
  if(typeof module !== 'undefined' && typeof exports === 'object') {
    // A commonJS/RequireJS environment
    if(typeof window !== 'undefined') {
      // Window and document exist, so return the factory's return value.
      module.exports = factory();
    } else {
      // Let the user give the factory a Window and Document.
      module.exports = factory;
    }
  } else {
    // Assume a traditional browser.
    window.DEFAULTMODULE = factory();
  }
})(function(){

  // DEFAULTMODULE DEFINITION
  // ===================
  var DEFAULTMODULE = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = {};
    this.options.value = !options.value ? null : options.value;

    this.init();
  };

  // DEFAULTMODULE METHODS
  // ================
  DEFAULTMODULE.prototype = {

    init : function() {
      var self = this, elm = self.element, opt = self.options;
      this.actions();

      // ie9+
      // elm.addEventListener('click', self.toggleRate, true);
      // fix for all
      elm.addEventListenerOrAttachEvent(self.toggleRate, 'click', true);
    },

    actions : function() {
      var self = this, elm = self.element, opt = self.options;

      self.method = function (e) {

      };
      self.otherMethod = function () {

      };
    }
  };

  // DEFAULTMODULE DATA API
  // =================
  var DEFAULTMODULEs = document.querySelectorAll('[data-toggle="data-default"]');
  for (var i = 0, len = DEFAULTMODULEs.length; i < len; i++ ) {
      var element = DEFAULTMODULEs[i],
          options = {
            value : ''
          };
    new DEFAULTMODULE(element, options);
  }

  return DEFAULTMODULE;

});

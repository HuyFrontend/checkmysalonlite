

(function(factory){
  factory();
  if(Window) {
    Window.DEFAULT_MODULE = factory();
  }
})(function(){

  // DEFAULT_MODULE DEFINITION
  // ===================
  var DEFAULT_MODULE = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    // this.option = typeof option === 'string' ? option : null;
    this.options = options;

    this.init();
  };

  // DEFAULT_MODULE METHODS
  // ================
  DEFAULT_MODULE.prototype.init = function() {
    var self = this;
  };
  DEFAULT_MODULE.prototype.success = function (data) {
    return data;
  };
  DEFAULT_MODULE.prototype.error = function (err) {
    return err;
  };

  // DEFAULT_MODULE DATA API
  // =================
  var DEFAULT_MODULEs = document.querySelectorAll('[data-toggle="NoDEFAULT_MODULE"]');

  for (var i = 0, len = DEFAULT_MODULEs.length; i < len; i++ ) {
    var element = DEFAULT_MODULEs[i], options;
    new DEFAULT_MODULE(element, options);
  }

  return DEFAULT_MODULE;

});

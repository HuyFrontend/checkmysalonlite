
(function(factory){
  // CommonJS/RequireJS and "native" compatibility
  if(typeof module !== "undefined" && typeof exports === "object") {
    // A commonJS/RequireJS environment
    if(typeof window !== "undefined") {
      // Window and document exist, so return the factory's return value.
      module.exports = factory();
    } else {
      // Let the user give the factory a Window and Document.
      module.exports = factory;
    }
  } else {
    // Assume a traditional browser.
    window.ManageModal = factory();
  }
})(function(){

  // ManageModal DEFINITION
  // ===================
  var ManageModal = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    // this.option = typeof option === 'string' ? option : null;
    this.options = {};
    this.options.ratingLine = !options.ratingLine ? null : options.ratingLine;
    this.options.ratingElement =!options.ratingElement ? 'active' : options.ratingElement;
     this.options.btnLinkTo = !options.btnLinkTo ? null : options.btnLinkTo;
    this.options.classActive =!options.classActive ? 'active' : options.classActive;

    this.init();
  };

  // ManageModal METHODS
  // ================
  ManageModal.prototype = {

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

      self.toggleRate = function (e) {
        var me = e.target || e.srcElement ;
        if(me.hasAttribute(opt.ratingElement) || me.parentNode.hasAttribute(opt.ratingElement)) {
          // rating question
          var parent = me.parentNode || me.parentNode.parentNode,
              choices = parent.querySelectorAll('[' + opt.ratingElement + ']'),
              thisPoint = parseInt(me.getAttribute(opt.ratingElement));
          for(var i = 0, leng = choices.length; i < leng; i++) {
            var choice = choices[i];
            if(parseInt(choice.getAttribute(opt.ratingElement)) <= thisPoint) {
              if(choice.classList) {
                choice.classList.add(opt.classActive);
              }
              else {
                choice.addClass(opt.classActive);
              }
            }
            else {
              if(choice.classList) {
                choice.classList.remove(opt.classActive);
              }
              else {
                choice.removeClass(opt.classActive);
              }
            }
          }
        }
        if(me.hasAttribute('data-href')) {
          // if href
          window.location.href = me.getAttribute('data-href');
          // window.location.replace(me.getAttribute('data-href'));
        }
      };
      self.otherMethod = function () {

      };
    }
  };

  // ManageModal DATA API
  // =================
  var ManageModals = document.querySelectorAll('[data-toggle="manage-modal"]');
  for (var i = 0, len = ManageModals.length; i < len; i++ ) {
      var element = ManageModals[i],
          options = {
            ratingLine : '[data-question-id] .rating',
            ratingElement: 'data-point',
            btnLinkTo: 'data-href',
            classActive: 'active'
          };
    new ManageModal(element, options);
  }

  return ManageModal;

});

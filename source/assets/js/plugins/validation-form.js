
(function(factory){
  var init = factory();
  if(Window) {
    Window.VALIDATIONFORM = init;
  }
})(function(){

  // VALIDATIONFORM DEFINITION
  // ===================
  var VALIDATIONFORM = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = options;
    this.options.value = !options.value ? null : options.value;
    this.options.fieldGroup = !options.fieldGroup ? '' : options.fieldGroup;
    this.options.fieldParent = !options.fieldParent ? '' : options.fieldParent;
    this.options.classError = !options.classError ? 'has-error' : options.classError;
    this.init();
  };

  // VALIDATIONFORM METHODS
  // ================
  VALIDATIONFORM.prototype = {

    init : function() {
      var self = this, elm = self.element, opt = self.options;
      this.actions();
      // ie9+
      // elm.addEventListenerOrAttachEvent(self.toggleRate, 'click', true);
      elm.noValidate = true;
      elm.addEventListener('submit', self.validateForm);

      elm.addEventListener('focusin keyup',function (event) {
        event = event || window.event;
        var thisElement = event.target || event.srcElement;
        if(!self.isValidField(thisElement)) {
          self.addError(thisElement);
        }
        else {
          self.removeError(thisElement);
        }
      });
      window.onresize = function notiResize() {
        alert(1);
      };
    },

    actions : function() {
      var self = this, elm = self.element, opt = self.options;
      self.validateForm = function (event) {
        event = event || window.event;
        var thisForm = event.target || event.srcElement,
            field = '', isValidForm = true;
        // loop all fields
        for(var i = 0, len = thisForm.elements.length; i < len; i++) {
          // get field
          field = thisForm.elements[i];
          // ignore buttons, fieldsets, etc.
          if (field.nodeName !== 'INPUT' && field.nodeName !== 'TEXTAREA' && field.nodeName !== 'SELECT') {
            continue;
          }
          // check each field
          if(!self.isValidField (field)) {
            isValidForm =  self.isValidField (field);
            self.addError(field);
          }
          else {
            self.removeError(field);
          }
        }
        if ( !isValidForm ) {
          if ( event.preventDefault ) {
            event.preventDefault();
          }
          return isValidForm;
        }
      };
      self.isValidField = function ( field ) {
        // is native browser validation available?
        if(typeof field.willValidate !== 'undefined') {

          //native validation available
          if (field.nodeName === 'INPUT' && field.type !== field.getAttribute('type')) {

          // input type not supported! Use legacy JavaScript validation
            field.setCustomValidity(self.legacyValidation(field) ? '' : 'error');
          }
          // native browser check
          field.checkValidity();
        }
        else {
          // native validation not available
          field.validity = field.validity || {};
          // set to result of validation function
          field.validity.valid = self.legacyValidation(field);
          // if invalid events are required, trigger it here
        }
        if ( field.validity.valid ) {
          //remove error style, fucntion here
          return true;
        }
        else {
          // style field , show error
         return false;
        }
      };
      self.legacyValidation = function (field) {
        var valid = true,
          val = field.value,
          type = field.getAttribute('type'),
          chkbox = (type === 'checkbox' || type === 'radio'),
          required = field.getAttribute('required'),
          minlength = field.getAttribute('minlength'),
          maxlength = field.getAttribute('maxlength'),
          pattern = field.getAttribute('pattern');

        // disabled fields should not be validated
        if (field.disabled) {
          return valid;
        }
        // value required?
        valid = valid && (!required ||
          (chkbox && field.checked) ||
          (!chkbox && val !== '')
        );

        // minlength or maxlength set?
        valid = valid && (chkbox || (
          (!minlength || val.length >= minlength) &&
          (!maxlength || val.length <= maxlength)
        ));

        // test pattern
        if (valid && pattern) {
          pattern = new RegExp(pattern);
          valid = pattern.test(val);
        }

        return valid;
      };
      self.addError = function (field) {
        var group = field.closestClass(opt.fieldGroup);
        if( group ) {
          if ( group.classList) {
            group.classList.add(opt.classError);
          }
          else {
            group.addClass(opt.classError);
          }
        }
      };
      self.removeError = function ( field ) {
        var group = field.closestClass(opt.fieldGroup);
        if( group ) {
          if ( group.classList) {
            group.classList.remove(opt.classError);
          }
          else {
            group.removeClass(opt.classError);
          }
        }
      };
      self.popupError = function () {

      };
    }
  };

  // VALIDATIONFORM DATA API
  // =================
  var VALIDATIONFORMs = document.querySelectorAll('[id="form-login"]');
  for (var i = 0, len = VALIDATIONFORMs.length; i < len; i++ ) {
    var element = VALIDATIONFORMs[i],
        options = {
          value : '',
          fieldGroup: 'form-group',
          fieldParent: '',
          classError: 'has-error'
        };
    new VALIDATIONFORM(element, options);
  }

  return VALIDATIONFORM;

});

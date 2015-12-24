'use strict';
angular.module('site').factory('ErrorManager', function() {
  var errorList;
  errorList = [];
  return {
    codeToMessage: function(code) {
      return 'There has no message here.';
    }
  };
});

//# sourceMappingURL=error-manager.js.map

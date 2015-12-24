'use strict';
angular.module('site').factory('Device', function(CONSTANTS) {
  return {
    alert: function(message, callback, title, btn) {
      if ((typeof navigator !== "undefined" && navigator !== null) && (navigator.notification != null)) {
        navigator.notification.alert(message, callback, title, btn);
      } else {
        alert(message);
      }
    },
    log: function() {
      return console.log(arguments);
    }
  };
});

//# sourceMappingURL=device.js.map

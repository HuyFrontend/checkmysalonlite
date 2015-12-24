'use strict';
angular.module('site').factory('deviceReadyService', function(PhonegapReady) {
  var callListeners, ready, registeredListeners;
  ready = false;
  registeredListeners = [];
  callListeners = function() {
    var i;
    i = registeredListeners.length - 1;
    while (i >= 0) {
      registeredListeners[i]();
      i--;
    }
  };
  return {
    isReady: function() {
      return ready;
    },
    makeReady: function() {
      ready = true;
      callListeners();
    },
    registerListener: function(callback) {
      if (ready) {
        callback();
      } else {
        registeredListeners.push(callback);
      }
    },
    init: function() {
      var that;
      that = this;
      PhonegapReady(function() {
        that.makeReady();
      })();
    }
  };
});

//# sourceMappingURL=device-ready-service.js.map

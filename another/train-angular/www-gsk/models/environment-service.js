'use strict';
angular.module('site').factory('Environment', function() {
  return {
    isOverlay: true,
    status: 'production',
    isDev: function() {
      if (this.status === 'development') {
        return true;
      }
      return false;
    }
  };
});

//# sourceMappingURL=environment-service.js.map

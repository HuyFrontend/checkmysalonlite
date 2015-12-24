angular.module('site').factory('FacebookShareService', function($q, CONSTANTS) {
  return {
    showDialog: function(params) {
      facebookConnectPlugin.showDialog(params, (function(response) {
        console.log(JSON.stringify(response));
      }), function(response) {
        console.log(JSON.stringify(response));
      });
    }
  };
});

//# sourceMappingURL=facebook-share-service.js.map

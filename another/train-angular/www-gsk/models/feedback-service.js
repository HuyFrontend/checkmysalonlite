'use strict';
angular.module('site').factory('FeedbackService', function(CoreAPI, $resource, CONSTANTS, localStorageService) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd', {}, {
    give: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'feed-back.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  fList = ['give'];
  return CoreAPI.init(resource, 'FeedbackService', fList);
});

//# sourceMappingURL=feedback-service.js.map

'use strict';
angular.module('site').factory('LocalPushService', function(CoreAPI, CONSTANTS, $resource, localStorageService) {
  var functionList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd', {}, {
    getLocalPush: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'local-push.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  functionList = ['getLocalPush'];
  return CoreAPI.init(resource, 'LocalPushService', functionList);
});

//# sourceMappingURL=local-push.js.map

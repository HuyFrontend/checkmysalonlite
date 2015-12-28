'use strict';
angular.module("site").factory("ContentService", function(CoreAPI, $resource, CONSTANTS, localStorageService) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd/:_id', {}, {
    getSmileList: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-smile-list.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getSmile: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-smile.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getAvatarList: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-avatar-list.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getAvatarListAll: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-all-user-avatar.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getAvatar: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-avatar.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getSettings: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'app-setting.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  fList = ['getSmileList', 'getSmile', 'getAvatarList', 'getAvatarListAll', 'getAvatar', 'getSettings'];
  return CoreAPI.init(resource, 'ContentService', fList);
});

//# sourceMappingURL=content-service.js.map

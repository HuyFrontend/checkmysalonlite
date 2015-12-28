'use strict';
angular.module('site').factory('Point', function(CoreAPI, CONSTANTS, $resource, $q, PhoneGapNetworkService, localStorageService) {
  var functionList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd', {}, {
    addBadge: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'post-action.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getBadgeDetail: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'challenge-detail.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getChallenge: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-challenge.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getTimeline: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-timeline.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  functionList = ['addBadge', 'getBadgeDetail', 'getChallenge', 'getTimeline'];
  return CoreAPI.init(resource, 'PointService', functionList);
});

//# sourceMappingURL=point.js.map

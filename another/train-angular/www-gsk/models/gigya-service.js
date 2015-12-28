'use strict';
angular.module('site').factory('GigyaService', function(CoreAPI, $resource, CONSTANTS, UserData, localStorageService) {
  var fList, resource;
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
    },
    getBadges: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'badges-future.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getChallengesTop: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'challenges-top.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  fList = [
    {
      functionName: 'addBadge',
      isCache: false
    }, {
      functionName: 'getBadgeDetail',
      isCache: true
    }, {
      functionName: 'getChallenge',
      isCache: true
    }, {
      functionName: 'getTimeline',
      isCache: true
    }, {
      functionName: 'getBadges',
      isCache: false
    }, {
      functionName: 'getChallengesTop',
      isCache: true
    }
  ];
  return CoreAPI.initWithOption(resource, 'GigyaService', fList);
});

//# sourceMappingURL=gigya-service.js.map

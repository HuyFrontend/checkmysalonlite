'use strict';
angular.module("site").factory("LandingService", function(CoreAPI, $resource, CONSTANTS, localStorageService) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd/:_id', {}, {
    addSlip: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'add-slip.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getMotivation: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-motivation.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getNextMotivation: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-next-motivation.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    teamActivities: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'landing-page.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    readCheer: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'read-cheers.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  fList = ['addSlip', 'getMotivation', 'teamActivities', 'readCheer', 'getNextMotivation'];
  return CoreAPI.init(resource, 'LandingService', fList);
});

//# sourceMappingURL=landingpage-service.js.map

'use strict';
angular.module("site").factory("QuitPointService", function(CoreAPI, $resource, CONSTANTS) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd', {}, {
    createCoupon: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'create-coupon.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getCouponList: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-coupon-list.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getCoupon: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-coupon.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    restartJourney: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'restart-journey.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    startJourney: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'start-journey.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  fList = ['createCoupon', 'getCouponList', 'getCoupon', 'restartJourney', 'startJourney'];
  return CoreAPI.init(resource, 'GigyaService', fList);
});

//# sourceMappingURL=quitpoint-service.js.map

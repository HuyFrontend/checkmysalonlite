'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/coupon-detail', {
    controller: 'quitPointCouponDetailCtrl',
    templateUrl: 'views/quitpoint/coupon-detail.jade'
  });
}).controller('quitPointCouponDetailCtrl', function($scope, $rootScope, $location, $timeout, Device, UserData, QuitPointService, Settings, OverlayService, FacebookService, Snapper) {
  var getData;
  console.log('quitPointCouponDetailCtrl');
  $rootScope.header = {
    hideLeftIcon: 'true',
    pageTitle: 'Your Coupons'
  };
  getData = function() {
    var model;
    model = {
      'coupon-path': '/content/en_US/coupons/niquitin-patch'
    };
    model = UserData.addToken(model);
    return QuitPointService.getCoupon(model).then(function(data) {
      console.log(data);
      if ((data.type != null) && (data.type === 'ERROR')) {
        return Device.alert(data.message, null, 'Error', 'Done');
      } else {
        return $scope.item = data;
      }
    }, function(err) {
      console.log('data', err);
      return Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
    });
  };
  return getData();
});

//# sourceMappingURL=coupon-detail.js.map

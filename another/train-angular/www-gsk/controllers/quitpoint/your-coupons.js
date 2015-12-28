'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/your-coupons', {
    controller: 'quitPointYourCouponsCtrl',
    templateUrl: 'views/quitpoint/your-coupons.jade'
  });
}).controller('quitPointYourCouponsCtrl', function($scope, $rootScope, $timeout, $location, Settings, Utils, Pages, Device, UserData, QuitPointService) {
  var animateTo, flage, getCouponList;
  console.log('quitPointYourCouponsCtrl');
  $rootScope.header = {
    pageTitle: Pages.quitPointYourCoupons.title
  };
  animateTo = function(top, duration) {
    return $('#main').animate({
      scrollTop: top
    }, duration || 1000);
  };
  getCouponList = function() {
    var model;
    Utils.showLoading();
    model = {
      'coupon-path': '/content/en_US/coupons'
    };
    model = UserData.addToken(model);
    return QuitPointService.getCouponList(model).then(function(data) {
      Utils.hideLoading();
      console.log('data', data);
      if ((data.type != null) && (data.type === 'ERROR')) {
        return Device.alert(data.message, null, 'Error', 'Done');
      } else {
        return $scope.data = data['list-coupons'];
      }
    }, function(err) {
      Utils.hideLoading();
      console.log('data', err);
      return Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
    });
  };
  getCouponList();
  flage = true;
  $scope.emailCoupon = function() {
    var model;
    Utils.showLoading();
    if (flage) {
      flage = false;
      console.log('emailCoupon');
      model = UserData.addToken({});
      gsk.log(model);
      QuitPointService.createCoupon(model).then(function(data) {
        Utils.hideLoading();
        flage = true;
        console.log(data);
        $location.url('/quitpoint/coupon-detail');
      }, function(err) {
        Utils.hideLoading();
        flage = true;
        Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
        console.log('err', err);
      });
    }
  };
});

//# sourceMappingURL=your-coupons.js.map

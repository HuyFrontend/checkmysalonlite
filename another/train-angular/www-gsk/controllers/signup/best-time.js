'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/best-time', {
    controller: 'signupBestTimeCtrl',
    templateUrl: 'views/signup/best-time.jade'
  });
}).controller('signupBestTimeCtrl', function($scope, $rootScope, $location) {
  var defaultTime, updateButtonStatus;
  console.log('signupBestTimeCtrl');
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  defaultTime = new Date();
  defaultTime.setHours(7);
  defaultTime.setMinutes(30);
  $scope.bestTime = $rootScope.signUpModel.bestTime || defaultTime;
  updateButtonStatus = function(status) {
    var focusBtn;
    focusBtn = $('.btn.btn-2');
    if (status != null) {
      return focusBtn.addClass('active');
    } else {
      return focusBtn.removeClass('active');
    }
  };
  updateButtonStatus($scope.bestTime);
  $scope.$watch('bestTime', function() {
    return updateButtonStatus($scope.bestTime);
  });
  return $scope.next = function() {
    if (!($scope.bestTime != null)) {
      return;
    }
    $rootScope.signUpModel.bestTime = $scope.bestTime;
    return $location.path('/signup/replace');
  };
});

//# sourceMappingURL=best-time.js.map

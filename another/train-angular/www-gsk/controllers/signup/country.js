'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/country', {
    controller: 'signupCountryCtrl',
    templateUrl: 'views/signup/country.jade'
  });
}).controller('signupCountryCtrl', function($scope, $rootScope, $location) {
  var updateButtonStatus;
  console.log('signupCountryCtrl');
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.country = $rootScope.signUpModel.country || 'UK';
  updateButtonStatus = function(status) {
    var btn;
    btn = $('.btn.btn-2');
    if (status != null) {
      return btn.addClass('active');
    } else {
      return btn.removeClass('active');
    }
  };
  updateButtonStatus($scope.country);
  $scope.$watch('country', function() {
    return updateButtonStatus($scope.country);
  });
  return $scope.next = function() {
    if (!($scope.country != null)) {
      return;
    }
    $rootScope.signUpModel.country = $scope.country;
    return $location.path('/signup/language');
  };
});

//# sourceMappingURL=country.js.map

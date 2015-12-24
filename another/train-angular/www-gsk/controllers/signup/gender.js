'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/gender', {
    controller: 'signupGenderCtrl',
    templateUrl: 'views/signup/gender.jade'
  });
}).controller('signupGenderCtrl', function($scope, $rootScope, $location) {
  console.log('signupGenderCtrl');
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.gender = $rootScope.signUpModel.gender || 'MALE';
  return $scope.next = function() {
    if (!($scope.gender != null)) {
      return;
    }
    $rootScope.signUpModel.gender = $scope.gender;
    return $location.path('/signup/country');
  };
});

//# sourceMappingURL=gender.js.map

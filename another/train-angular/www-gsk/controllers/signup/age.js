'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/age', {
    controller: 'signupAgeCtrl',
    templateUrl: 'views/signup/age.jade'
  });
}).controller('signupAgeCtrl', function($scope, $rootScope, $location) {
  var updateButtonStatus;
  console.log('signupAgeCtrl');
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.age = $rootScope.signUpModel.age || null;
  updateButtonStatus = function(status) {
    var btn;
    btn = $('.btn.btn-2');
    if (status != null) {
      return btn.addClass('active');
    } else {
      return btn.removeClass('active');
    }
  };
  updateButtonStatus($scope.age);
  $scope.$watch('age', function() {
    return updateButtonStatus($scope.age);
  });
  return $scope.next = function() {
    if (!($scope.age != null)) {
      return;
    }
    $rootScope.signUpModel.age = $scope.age;
    return $location.path('/signup/gender');
  };
});

//# sourceMappingURL=age.js.map

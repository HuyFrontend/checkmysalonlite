'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/progress-update', {
    controller: 'signupProgessCtrl',
    templateUrl: 'views/signup/progress-update.jade'
  });
}).controller('signupProgessCtrl', function($scope, $rootScope, $location) {
  console.log('signupProgessCtrl');
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.progressUpdate = $rootScope.signUpModel.progressUpdate || 'DAILY';
  return $scope.next = function() {
    if (!($scope.progressUpdate != null)) {
      return;
    }
    $rootScope.signUpModel.progressUpdate = $scope.progressUpdate;
    return $location.path('/signup/best-time');
  };
});

//# sourceMappingURL=progress-update.js.map

'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/language', {
    controller: 'signupLanguageCtrl',
    templateUrl: 'views/signup/language.jade'
  });
}).controller('signupLanguageCtrl', function($scope, $rootScope, $location) {
  var updateButtonStatus;
  console.log('signupLanguageCtrl');
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.language = $rootScope.signUpModel.language || 'en_US';
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('.btn.btn-2').addClass('active');
    } else {
      return $('.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.language);
  $scope.$watch('language', function() {
    return updateButtonStatus($scope.language);
  });
  return $scope.next = function() {
    if (!($scope.language != null)) {
      return;
    }
    $rootScope.signUpModel.language = $scope.language;
    return $location.path('/signup/best-time');
  };
});

//# sourceMappingURL=language.js.map

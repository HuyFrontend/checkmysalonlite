'use strict';
angular.module('site.login').config(function($routeProvider) {
  return $routeProvider.when('/login/password-coming', {
    controller: 'passwordComingCtrl',
    templateUrl: 'views/login/password-coming.jade',
    resolve: resolve
  });
}).controller('passwordComingCtrl', function($scope, $rootScope, $location, Pages, Snapper) {
  var err;
  console.log('passwordComingCtrl');
  Snapper.disable();
  $scope.err = err = {};
  return $rootScope.header = {
    pageTitle: Pages.passwordComing.title,
    containerClass: ''
  };
});

//# sourceMappingURL=password-coming.js.map

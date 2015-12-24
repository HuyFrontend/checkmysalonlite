'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/thank', {
    controller: 'habitThankCtrl',
    templateUrl: 'views/habit/thank.jade'
  });
}).controller('habitThankCtrl', function($scope, $location, $rootScope) {
  console.log('habitThankCtrl');
  return $scope.next = function() {
    return $location.path('/quitpoint/courage');
  };
});

//# sourceMappingURL=thank.js.map

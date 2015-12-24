'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/yhabit', {
    controller: 'habitYHabitCtrl',
    templateUrl: 'views/habit/yhabit.jade'
  });
}).controller('habitYHabitCtrl', function($scope, $rootScope, $location, $timeout, Device, BadgeService, OverlayService) {
  var completedHabit;
  console.log('habitYHabitCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.model = $rootScope.habitModel;
  $rootScope.habitData = {
    redirectTo: '/habit/yhabit'
  };
  completedHabit = function() {
    return BadgeService.addAction('action3_habitmapping').then(function(data) {
      $rootScope.$broadcast('profile-updated');
      console.log('DONE', data);
      $location.path('/quitpoint/courage');
      $rootScope.habitData = null;
      return $scope.model = null;
    }, function(err) {
      return console.log('ERR', err);
    });
  };
  return $scope.done = function() {
    var popupToHabit;
    console.log($scope.model);
    if ($rootScope.getRecommentdations === true) {
      $location.path('/products/detail-product');
    } else {
      completedHabit();
    }
    popupToHabit = 'overlay-group-1';
    return OverlayService.setShowed(popupToHabit);
  };
});

//# sourceMappingURL=yhabit.js.map

'use strict';
angular.module('site.tour', []).config(function($routeProvider) {
  return $routeProvider.when('/tour', {
    controller: 'tourIndexCtrl',
    templateUrl: 'views/tour/index.jade',
    resolve: resolve
  });
}).controller('tourIndexCtrl', function($scope, $rootScope, $location, $timeout, UserData, Pages, Settings, Snapper, Keys, localStorageService) {
  var isMoving;
  console.log('tourIndexCtrl');
  Snapper.disable();
  if (($rootScope.previousPath === '/login') || ($rootScope.previousPath === '/login/login-2')) {
    $rootScope.header = {
      pageTitle: Pages.tourIndex.title
    };
  } else {
    $rootScope.header = {
      hideLeftIcon: true,
      pageTitle: Pages.tourIndex.title,
      containerClass: 'tour'
    };
  }
  $scope.data = Settings.tourIndexCtrl.tourData;
  isMoving = false;
  return $rootScope.$on('angular-carousel-end-at', function(m, index) {
    if (isMoving) {
      return;
    }
    if (index === 7) {
      isMoving = true;
      return $timeout(function() {
        localStorageService.set(Keys.isntFirstUser, true);
        UserData.setTour(true);
        return $scope.threeMustStep();
      }, 20);
    }
  });
});

//# sourceMappingURL=index.js.map

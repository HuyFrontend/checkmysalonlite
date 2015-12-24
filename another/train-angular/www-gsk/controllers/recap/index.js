'use strict';
angular.module('site.recap', []).config(function($routeProvider) {
  return $routeProvider.when('/recap', {
    controller: 'recapIndexCtrl',
    templateUrl: 'views/recap/index.jade'
  });
}).controller('recapIndexCtrl', function($scope, $rootScope, Pages, $location, UserData, Utils, Settings, localStorageService, Snapper, LocalNotificationService) {
  var cancelNotification, setPage;
  console.log('recapIndexCtrl');
  Snapper.disable();
  Snapper.close('left');
  $rootScope.header = {
    pageTitle: Pages.recapIndex.title,
    hideLeftIcon: true
  };
  setPage = function() {
    var totalBadges, userProfile;
    userProfile = UserData.getProfile();
    console.log(userProfile['user-total-badges']);
    if (userProfile['user-total-badges'] != null) {
      totalBadges = userProfile['user-total-badges'];
      if (totalBadges === 0) {
        return $location.path('/landing-page/slip-up-badge');
      } else {
        return $location.path('/quitpoint/courage');
      }
    }
  };
  cancelNotification = function() {
    var id;
    id = Settings.notification.recap.id;
    return LocalNotificationService.cancelNotification(id);
  };
  cancelNotification();
  $scope.yes = function() {
    return $location.path('/landing-page/slip-up-badge');
  };
  return $scope.no = function() {
    return $scope.notiGreat = true;
  };
});

//# sourceMappingURL=index.js.map

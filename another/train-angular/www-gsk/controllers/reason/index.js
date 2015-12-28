'use strict';
angular.module('site.reason', []).config(function($routeProvider) {
  return $routeProvider.when('/reason', {
    controller: 'reasonIndexCtrl',
    templateUrl: 'views/reason/index.jade',
    resolve: resolve
  });
}).controller('reasonIndexCtrl', function($scope, $sce, $rootScope, $location, $timeout, UserData, Pages, Settings, Snapper, localStorageService, LocalNotificationService) {
  var cancelNotification, localReason, slipUpCount, userName;
  console.log('reasonIndexCtrl');
  Snapper.enable();
  Snapper.close('left');
  $rootScope.header = {
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle,
    pageTitle: Pages.reasonToQuit.title
  };
  userName = localStorageService.get('userName');
  localReason = Settings.localStorage.name.reasonToQuit;
  slipUpCount = Settings.localStorage.name.slipUpCount;
  if (localStorageService.get(slipUpCount) != null) {
    localStorageService.remove(slipUpCount);
  }
  cancelNotification = function() {
    var id;
    id = Settings.notification.reasonToQuit.id;
    return LocalNotificationService.cancelNotification(id);
  };
  cancelNotification();
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };
  $scope.movie = {
    src: localStorageService.get(localReason.video + userName)
  };
  $scope.reasonToQuit = {
    memo: localStorageService.get(localReason.memo + userName),
    photo: localStorageService.get(localReason.photo + userName),
    audio: localStorageService.get(localReason.audio + userName)
  };
  if (localStorageService.get('openPage') === 'openReasonToQuit') {
    return localStorageService.remove(openPage);
  }
});

//# sourceMappingURL=index.js.map

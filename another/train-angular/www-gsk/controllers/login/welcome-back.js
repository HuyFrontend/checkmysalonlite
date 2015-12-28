'use strict';
angular.module('site.login').config(function($routeProvider) {
  return $routeProvider.when('/login/welcome-back', {
    controller: 'welcomeBackCtrl',
    templateUrl: 'views/login/welcome-back.jade',
    resolve: resolve
  });
}).controller('welcomeBackCtrl', function(BadgeService, Device, $scope, $rootScope, $location, Pages, Snapper) {
  var addStartJourney, err;
  console.log('welcomeBackCtrl');
  Snapper.disable();
  Snapper.close('left');
  $scope.err = err = {};
  $rootScope.header = {
    hideLeftIcon: true,
    pageTitle: Pages.welcomeBack.title,
    containerClass: ''
  };
  addStartJourney = function(callback) {
    return BadgeService.addAction('action1_ignitionswitch').then(function(data) {
      $rootScope.$broadcast('profile-updated');
      console.log('DONE', data);
      if (callback != null) {
        callback();
      }
      return Device.alert(Settings.message.youHaveGotABadge, null, 'Message', 'Done');
    }, function(err) {
      console.log('ERR', err);
      return Device.alert(Settings.message.youHaveGotABadge, null, 'Message', 'Done');
    });
  };
  $scope["continue"] = function() {
    mconsole.log('continue click');
    return $location.path('/landing-page');
  };
  return $scope.startFresh = function() {
    mconsole.log('continue click');
    return addStartJourney(function() {
      return $location.path('/landing-page');
    });
  };
});

//# sourceMappingURL=welcome-back.js.map

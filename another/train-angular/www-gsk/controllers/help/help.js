'use strict';
angular.module('site.help', []).config(function($routeProvider) {
  return $routeProvider.when('/help', {
    controller: 'helpIndexCtrl',
    templateUrl: 'views/help/help.jade'
  });
}).controller('helpIndexCtrl', function(Settings, $scope, $rootScope, $location, Utils, Pages, Snapper, localStorageService) {
  console.log('helpIndexCtrl');
  $rootScope.header = {
    pageTitle: Pages.helpIndex.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle
  };
  $scope.helpYes = function() {
    mconsole.log('do help, restart all intro');
    localStorageService.set('helpStatus', true);
    Utils.removeGroupOfStorage('overlays');
    return $location.path(Settings.pages.landing);
  };
  return $scope.helpNo = function() {
    mconsole.log('lead to landing page');
    return $location.path(Settings.pages.landing);
  };
});

//# sourceMappingURL=help.js.map

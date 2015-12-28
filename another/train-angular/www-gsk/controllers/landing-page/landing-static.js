'use strict';
angular.module('site.landingPage').config(function($routeProvider) {
  return $routeProvider.when('/landing-static', {
    controller: 'landingStaticCtrl',
    templateUrl: 'views/landing-page/landing-static.jade'
  });
}).controller('landingStaticCtrl', function(Keys, $scope, $rootScope, $location, Snapper, Settings, localStorageService) {
  var badgeActive, pCreateProfile, popupHide, popupShow;
  mconsole.log('landingStaticCtrl');
  Snapper.disable();
  pCreateProfile = 'overlay-create-profile';
  popupShow = function(path) {
    return $('[data-overlay="' + path + '"]').removeClass('hidden');
  };
  popupHide = function(path) {
    return $('[data-overlay="' + path + '"]').addClass('hidden');
  };
  badgeActive = function() {
    return popupShow(pCreateProfile);
  };
  $scope.Items = Settings.landingIndexCtrl.motivationItems;
  $rootScope.header = {
    leftIcon: 'icon-menu',
    rightIcon: 'icon-badge-white',
    containerClass: 'landing-page',
    leftMethod: badgeActive,
    rightMethod: badgeActive
  };
  $scope.doNothing = function() {
    popupShow(pCreateProfile);
  };
  $scope.close = function() {
    popupHide(pCreateProfile);
  };
  return $scope.go = function(path) {
    localStorageService.set(Keys.isntFirstUser, true);
    $location.path(path);
  };
});

//# sourceMappingURL=landing-static.js.map

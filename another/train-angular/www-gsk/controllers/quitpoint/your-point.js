'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/your-point', {
    controller: 'quitPointYourPointCtrl',
    templateUrl: 'views/quitpoint/your-point.jade'
  });
}).controller('quitPointYourPointCtrl', function(CONSTANTS, $scope, $rootScope, UserData, Utils, Pages, Snapper) {
  var point, userProfile;
  console.log('quitPointYourPointCtrl');
  $scope.constants = CONSTANTS;
  $('#nav-your-quitpoint').trigger('click');
  $rootScope.header = {
    pageTitle: Pages.quitPointYourPoint.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle
  };

  /*
  console.log 'leadBy', $rootScope.leadBy
  if $rootScope.leadBy is 'sidebar-left'
     * show hamburger
    $rootScope.header =
      pageTitle: Pages.quitPointYourPoint.title #'Your Quit Points'
      leftIcon: 'icon-menu'
      leftMethod: Snapper.hamburgerToggle
    $rootScope.leadBy = null
  else
     * show left arror
    $rootScope.header =
      pageTitle: 'Your Quit Points'
   */
  userProfile = UserData.getProfile();
  point = userProfile['user-total-points'] || 0;
  return $scope.userPoint = point;
});

//# sourceMappingURL=your-point.js.map

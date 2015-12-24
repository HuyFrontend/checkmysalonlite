'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/your-point-detail', {
    controller: 'quitPointYourPointDetailCtrl',
    templateUrl: 'views/quitpoint/your-point-detail.jade'
  });
}).controller('quitPointYourPointDetailCtrl', function(CONSTANTS, $scope, $rootScope, Pages, Snapper, UserData) {
  var point, userProfile;
  console.log('quitPointYourPointDetailCtrl');
  $scope.constants = CONSTANTS;
  $rootScope.header = {
    pageTitle: Pages.quitPointYourPointDetail.title
  };
  userProfile = UserData.getProfile();
  point = userProfile['user-total-points'] || 0;
  return $scope.userPoint = point;
});

//# sourceMappingURL=your-point-detail.js.map

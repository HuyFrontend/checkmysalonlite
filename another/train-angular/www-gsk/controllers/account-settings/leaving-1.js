'use strict';
angular.module('site.accountSettings').config(function($routeProvider) {
  return $routeProvider.when('/account-settings/leaving-1', {
    controller: 'accountLeavingOneCtrl',
    templateUrl: 'views/account-settings/leaving-1.jade'
  });
}).controller("accountLeavingOneCtrl", function($scope, $rootScope, $location, Device, Pages, Snapper, localStorageService, UserData, QuitTeamService) {
  console.log('accountLeavingOneCtrl');
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.accountLeavingOne.title,
    containerClass: 'leave-quit-page'
  };
  return $scope.leaveTeam = function() {
    var model;
    model = UserData.addToken({});
    QuitTeamService.leaveTeam(model).then(function(data) {
      localStorageService.set('hasJoinedATeam', 'false');
      $location.path('/account-settings/leaving-2');
    }, function(err) {
      Device.alert(err.message, null, 'Error', 'Done');
    });
  };
});

//# sourceMappingURL=leaving-1.js.map

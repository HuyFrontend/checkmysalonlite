'use strict';
angular.module('site.quitteam', []).config(function($routeProvider) {
  return $routeProvider.when('/quitteam', {
    controller: 'quitteamIndexCtrl',
    templateUrl: 'views/quitteam/index.jade'
  });
}).controller('quitteamIndexCtrl', function(AccountService, $scope, $rootScope, $location, Utils, Device, BadgeService, Pages, localStorageService, Snapper, QuitTeamService, UserData) {
  var flage, joinAQuitteam, preloadViewteamData;
  console.log('quitteamIndexCtrl');
  $('#nav-quit-team').trigger('click');
  Snapper.enable();
  $rootScope.header = {
    pageTitle: Pages.quitteamIndex.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle,
    containerClass: 'join-team-page'
  };
  $scope.cheer = 'Good Work!';
  preloadViewteamData = function() {
    var model;
    model = UserData.addToken({});
    return AccountService.viewTeam(model);
  };
  joinAQuitteam = function() {
    $rootScope.badge = {
      action: 'action5_joinedquitteam',
      back: '/quitteam/team-landing-2'
    };
    return $location.path('/quitpoint/courage');
  };
  flage = true;
  return $scope.joinTeam = function() {
    var model;
    if (flage) {
      Utils.showLoading();
      flage = false;
      model = UserData.addToken({});
      QuitTeamService.joinTeam(model).then(function(data) {
        mconsole.log('QuitTeamService.joinTeam', data);
        flage = true;
        localStorageService.set('hasJoinedATeam', 'true');
        joinAQuitteam();
        Utils.preloadData();
        return Utils.hideLoading();
      }, function(err) {
        flage = true;
        Device.alert('Join team fail. The server have some problem', null, 'Message', 'Done');
        console.log('Join team fail');
        return Utils.hideLoading();
      });
    }
  };
});

//# sourceMappingURL=index.js.map

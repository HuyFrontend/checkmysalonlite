'use strict';
angular.module('site.landingPage').config(function($routeProvider) {
  return $routeProvider.when('/landing-page/slip-up-badge', {
    controller: 'slipUpBadgeCtrl',
    templateUrl: 'views/landing-page/slip-up-badge.jade'
  });
}).controller('slipUpBadgeCtrl', function(BusinessGroup, localStorageService, QuitTeamService, QuitPointService, Device, BadgeService, LandingService, UserData, Settings, Utils, $scope, $rootScope, Snapper, FacebookShareService, CONSTANTS, $location) {
  var addSlip, badgeActive;
  console.log('slipUpBadgeCtrl');
  $rootScope.progress = 100;
  Snapper.enable();
  badgeActive = function() {
    Snapper.settings({
      disable: 'none'
    });
    if (Snapper.state().state === 'right') {
      return Snapper.close('right');
    } else {
      return Snapper.open('right');
    }
  };
  $rootScope.header = {
    containerClass: 'landing-page hide-badge',
    rightIcon: 'icon-badge-white',
    rightMethod: badgeActive
  };
  Utils.showLoading();
  addSlip = function() {
    var model;
    model = UserData.addToken({});
    LandingService.addSlip(model).then(function(data) {
      if ((data.type != null) && data.type === 'ERROR') {
        return Device.alert(data.message, null, 'Error', 'Done');
      } else {
        $scope.data = data;
        $rootScope.$broadcast('profile-updated');
        Utils.hideLoading();
        return BadgeService.addAction('slip_up').then(function(data) {
          return $rootScope.$broadcast('profile-updated');
        });
      }
    }, function(err) {
      Utils.hideLoading();
      return Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
    });
  };
  addSlip();
  $scope.restartJourney = function() {
    return BusinessGroup.restartJourney(function() {
      return $location.path('/quitpoint');
    });
  };
  $scope.ok = function(path) {
    if ($scope.data['call-restart'] === true) {
      return $scope.notiSlipUp = true;
    } else {
      return $location.path(path);
    }
  };
  return $scope.share = function() {
    var item, shareModel;
    item = $scope.data;
    shareModel = {
      method: 'share',
      name: 'Slip Up Badge',
      href: Settings.sharingData.link,
      caption: 'Slip Up Badge',
      description: item['message-badge'],
      picture: CONSTANTS.BADGE_PATH + 'badge-slip.png'
    };
    return FacebookShareService.showDialog(shareModel);
  };
});

//# sourceMappingURL=slip-up-badge.js.map

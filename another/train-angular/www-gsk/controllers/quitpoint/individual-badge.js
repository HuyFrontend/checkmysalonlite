'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/individual-badge', {
    controller: 'quitPointIndividualCtrl',
    templateUrl: 'views/quitpoint/individual-badge.jade'
  });
}).controller('quitPointIndividualCtrl', function(Settings, Utils, $scope, $rootScope, $location, $timeout, OverlayService, FacebookService, Snapper, FacebookShareService) {
  var badgeActive;
  console.log('quitPointIndividualCtrl');
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
    rightIcon: 'icon-badge-white',
    rightMethod: badgeActive,
    containerClass: 'landing-page individual-badge'
  };
  $scope.model = $rootScope.detailBagde;
  console.log('model', $scope.model);
  $(".badge-wrapper .badge").css("background-image", "url(" + $scope.model.imgURL + ")").addClass("animate");
  return $scope.share = function() {
    var item, shareModel;
    item = $scope.model || {};
    shareModel = {
      method: "share",
      name: item.title,
      href: Settings.sharingData.link,
      caption: item.title,
      description: item.description,
      picture: item.thumbPath
    };
    mconsole.log('share data', shareModel);
    return FacebookShareService.showDialog(shareModel);
  };
});

//# sourceMappingURL=individual-badge.js.map

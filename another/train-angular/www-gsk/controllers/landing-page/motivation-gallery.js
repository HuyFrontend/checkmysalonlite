'use strict';
angular.module('site.landingPage').config(function($routeProvider) {
  return $routeProvider.when('/landing-page/motivation-gallery', {
    controller: 'landingMotivationCtrl',
    templateUrl: 'views/landing-page/motivation-gallery.jade'
  });
}).controller('landingMotivationCtrl', function($scope, $rootScope, Settings, FacebookService, Utils, Pages, Snapper, LandingService, UserData, FacebookShareService) {
  var getMotivation, setShowVideo;
  console.log('landingMotivationCtrl');
  if ($rootScope.leadBy === 'sidebar-left') {
    Snapper.enable();
    $rootScope.header = {
      pageTitle: Pages.landingMotivation.title,
      leftIcon: 'icon-menu',
      leftMethod: Snapper.hamburgerToggle
    };
    $rootScope.leadBy = null;
  } else {
    Snapper.disable();
    $rootScope.header = {
      pageTitle: Pages.landingMotivation.title
    };
  }
  setShowVideo = function(data) {
    var i, _results;
    i = 0;
    _results = [];
    while (i < data.length) {
      data[i].showVideo = (data[i].videos ? true : false);
      data[i].showDesc = (data[i]['hide-descriptioin'] ? true : false);
      data[i].showBehind = (data[i].showVideo || data[i].showDesc ? true : false);
      _results.push(i++);
    }
    return _results;
  };
  getMotivation = function() {
    var model;
    $scope.motivatAll = [];
    model = UserData.addToken({});
    model['motivation-path'] = '/content/en_US/motivations';
    return LandingService.getMotivation(model).then(function(data) {
      if ((data.type != null) && data.type === 'ERROR') {
        mconsole.log('Data error');
      } else {
        $scope.motivatAll = data['other-motivations'];
        setShowVideo($scope.motivatAll);
        console.log('get motivation success');
        console.log(data);
      }
    }, function(err) {
      console.log('get motivation fail');
    });
  };
  getMotivation();
  $scope.shareMotivation = function(item) {
    var shareModel;
    mconsole.log('shareMotivation', item);
    console.log('shareMotivation', Utils.html2Plain(item.descriptioin));
    shareModel = {
      method: "share",
      name: item.title,
      href: Settings.sharingData.link,
      caption: item.title,
      description: Utils.html2Plain(item.descriptioin),
      picture: item['pitureShare']
    };
    mconsole.log('share data', shareModel);
    return FacebookShareService.showDialog(shareModel);
  };
});

//# sourceMappingURL=motivation-gallery.js.map

'use strict';
angular.module('site.accountSettings').config(function($routeProvider) {
  return $routeProvider.when('/account-settings/avatar', {
    controller: 'accountChooseAvatarCtrl',
    templateUrl: 'views/account-settings/avatar.jade'
  });
}).controller('accountChooseAvatarCtrl', function(Utils, $scope, $rootScope, $location, $timeout, UserData, ContentService, Pages, Settings, Snapper) {
  var getAvatarList;
  console.log('accountChooseAvatarCtrl');
  Snapper.enable();
  Utils.showLoading();
  $rootScope.header = {
    pageTitle: Pages.accountChooseAvatar.title
  };
  $rootScope.avatar = $rootScope.avatarUser || null;
  getAvatarList = function() {
    var model;
    console.log('getAvatarList');
    model = {
      'type': 'FREE'
    };
    model = UserData.addToken(model);
    return ContentService.getAvatarListAll(model).then(function(data) {
      console.log('avatar list', data);
      $scope.avatarList = data['list-avatars'];
      $timeout(function() {
        var d;
        d = _.find(data['list-avatars'], {
          'small-img-path': $rootScope.avatarUser
        });
        return $scope.character = d.path;
      }, 200);
      return Utils.hideLoading();
    }, function(err) {
      console.log('avatar list error', err);
      return Utils.hideLoading();
    });
  };
  getAvatarList();
  $scope.back = function() {
    var d;
    $location.path('/account-settings');
    $rootScope.avatarPath = $scope.character;
    d = _.find($scope.avatarList, {
      path: $rootScope.avatarPath
    });
    $rootScope.avatar = d['small-img-path'];
  };
});

//# sourceMappingURL=avatar.js.map

'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/new-character', {
    controller: 'quitPointNewCharacterCtrl',
    templateUrl: 'views/quitpoint/new-character.jade'
  });
}).controller('quitPointNewCharacterCtrl', function($scope, $rootScope, Utils, Pages, Snapper, $location, UserData, ContentService, AccountService, Device) {
  var listByCharacter;
  mconsole.log('quitPointNewCharacterCtrl');
  Snapper.enable();
  $rootScope.header = {
    pageTitle: Pages.quitPointNewCharacter.title
  };
  $scope.character = null;
  $scope.$watch('character', function() {
    var btn;
    mconsole.log('characterChanged');
    if (!$scope.character) {
      return;
    }
    btn = $('.btn.btn-submit');
    if ($scope.character !== '') {
      return btn.addClass('active');
    } else {
      return btn.removeClass('active');
    }
  });
  $scope.submit = function(path) {
    var model, obj;
    if (!$scope.character) {
      return;
    }
    if ($scope.avatarList) {
      obj = _.find($scope.avatarList, function(chr) {
        return chr["profile-img-path"] === $scope.character;
      });
    }
    Utils.showLoading();
    model = {
      "avatar-path": obj.path,
      "avatar-point": obj.point
    };
    model = UserData.addToken(model);
    return AccountService.buyAvatar(model).then(function(data) {
      if ((data.type != null) && data.type === 'ERROR') {
        Device.alert(data.message, null, 'Fail', 'Done');
      } else {
        $rootScope.avatarRedeem = data;
        $scope.notiNewCharacter = true;
        $rootScope.$broadcast('profile-updated');
      }
      return Utils.hideLoading();
    }, function(err) {
      return Utils.hideLoading();
    });
  };
  listByCharacter = function() {
    var model;
    Utils.showLoading();
    model = {
      'type': 'PREMIUM'
    };
    model = UserData.addToken(model);
    return ContentService.getAvatarList(model).then(function(data) {
      console.log('avatar list', data);
      $scope.avatarList = data['list-avatars'];
      return Utils.hideLoading();
    }, function(err) {
      console.log('avatar list error', err);
      return Utils.hideLoading();
    });
  };
  return listByCharacter();
});

//# sourceMappingURL=new-character.js.map

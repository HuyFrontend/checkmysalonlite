'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/character', {
    controller: 'signupCharacter',
    templateUrl: 'views/signup/character.jade'
  });
}).controller('signupCharacter', function(Utils, $scope, $rootScope, $location, Settings, UserData, ContentService) {
  var character, getAvatarList;
  console.log('signupCharacter');
  Utils.showLoading();
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.character = character = $rootScope.signUpModel.character || '';
  getAvatarList = function() {
    var model;
    console.log('getAvatarList');
    model = {
      'type': 'FREE'
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
  getAvatarList();
  $scope.$watch('character', function() {
    var btn;
    btn = $('.btn.btn-2');
    if ($scope.character !== '') {
      return btn.addClass('active');
    } else {
      return btn.removeClass('active');
    }
  });
  return $scope.next = function() {
    if ($scope.character.length === 0) {
      return;
    }
    $rootScope.signUpModel.character = $scope.character;
    return $location.path('/signup/where-hear');
  };
});

//# sourceMappingURL=character.js.map

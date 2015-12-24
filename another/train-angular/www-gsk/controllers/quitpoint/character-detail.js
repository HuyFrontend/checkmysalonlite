'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/character-detail', {
    controller: 'quitPointCharacterDetailCtrl',
    templateUrl: 'views/quitpoint/character-detail.jade'
  });
}).controller('quitPointCharacterDetailCtrl', function($scope, $rootScope, Pages) {
  console.log('quitPointCharacterDetailCtrl');
  return $rootScope.header = {
    pageTitle: Pages.quitPointNewCharacter.title,
    hideLeftIcon: true
  };
});

//# sourceMappingURL=character-detail.js.map

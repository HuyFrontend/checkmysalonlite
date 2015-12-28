'use strict';
angular.module('site.games', []).config(function($routeProvider) {
  return $routeProvider.when('/games', {
    controller: 'gamesIndexCtrl',
    templateUrl: 'views/games/index.jade',
    resolve: resolve
  });
}).controller('gamesIndexCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('gamesIndexCtrl');
  return $rootScope.header = {
    pageTitle: Pages.gamesIndex.title
  };
});

//# sourceMappingURL=index.js.map

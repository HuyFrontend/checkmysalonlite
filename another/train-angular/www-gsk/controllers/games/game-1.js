'use strict';
angular.module('site.games').config(function($routeProvider) {
  return $routeProvider.when('/games/game-1', {
    controller: 'gamesOneIndexCtrl',
    templateUrl: 'views/games/game-1.jade',
    resolve: resolve
  });
}).controller('gamesOneIndexCtrl', function($scope, $rootScope, $timeout, Snapper) {
  console.log('gamesOneIndexCtrl');
  $rootScope.header = {
    pageTitle: 'Games One'
  };
  return window.open('games/game-1/index.html', '_blank', 'location=no');
});

//# sourceMappingURL=game-1.js.map

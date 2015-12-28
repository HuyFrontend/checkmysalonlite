'use strict';
angular.module('site.recap').config(function($routeProvider) {
  return $routeProvider.when('/recap/great', {
    controller: 'recapLanding1Ctrl',
    templateUrl: 'views/recap/great.jade'
  });
}).controller('recapLanding1Ctrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('recapLanding1Ctrl');
  Snapper.disable();
  return $rootScope.header = {
    pageTitle: Pages.recapIndex.title
  };
});

//# sourceMappingURL=great.js.map

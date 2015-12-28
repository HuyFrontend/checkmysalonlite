'use strict';
angular.module('site.landingPage').config(function($routeProvider) {
  return $routeProvider.when('/landing-page/science-behind', {
    controller: 'landingScienceBehindCtrl',
    templateUrl: 'views/landing-page/science-behind.jade'
  });
}).controller('landingScienceBehindCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('landingScienceBehindCtrl');
  Snapper.disable();
  return $rootScope.header = {
    pageTitle: Pages.landingScienceBehind.title
  };
});

//# sourceMappingURL=science-behind.js.map

'use strict';
angular.module('site.template', []).config(function($routeProvider) {
  return $routeProvider.when('/template', {
    controller: 'templateIndexCtrl',
    templateUrl: 'views/template/index.jade'
  });
}).controller('templateIndexCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('templateIndexCtrl');
  Snapper.disable();
  return $rootScope.header = {
    pageTitle: Pages.templateIndex.title
  };
});

//# sourceMappingURL=index.js.map

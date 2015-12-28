'use strict';
angular.module('site.feedback').config(function($routeProvider) {
  return $routeProvider.when('/feedback/thank-you', {
    controller: 'feedbackthankCtrl',
    templateUrl: 'views/feedback/thank-you.jade'
  });
}).controller('feedbackthankCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('feedbackthankCtrl');
  Snapper.disable();
  return $rootScope.header = {
    pageTitle: Pages.feedbackthank.title
  };
});

//# sourceMappingURL=thank-you.js.map

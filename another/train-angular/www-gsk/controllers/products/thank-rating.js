'use strict';
angular.module('site.products').config(function($routeProvider) {
  return $routeProvider.when('/products/thank-rating', {
    controller: 'thankRatingCtrl',
    templateUrl: 'views/products/thank-rating.jade'
  });
}).controller('thankRatingCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('thankRatingCtrl');
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.thankRating.title
  };
  return $scope.submit = function() {
    console.log('submit');
    return console.log($scope.model);
  };
});

//# sourceMappingURL=thank-rating.js.map

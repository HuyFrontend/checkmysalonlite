'use strict';
angular.module('site.products').config(function($routeProvider) {
  return $routeProvider.when('/products/post-review', {
    controller: 'productPostReviewCtrl',
    templateUrl: 'views/products/post-review.jade'
  });
}).controller('productPostReviewCtrl', function($timeout, $scope, $rootScope, $location, Device, Settings, UserData, Utils, ProductService, Pages, Snapper) {
  var contentIsValid, ratingProduct, updateStatus;
  mconsole.log('productPostReviewCtrl');
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.productPostReview.title,
    containerClass: 'post-review-page'
  };
  $scope.model = {
    rating: 2,
    title: '',
    content: ''
  };
  contentIsValid = function() {
    var m;
    m = $scope.model;
    return (m.title.length > 0) && (m.content.length > 0);
  };
  updateStatus = function() {
    return Utils.updateBtnStatus(contentIsValid());
  };
  updateStatus();
  $scope.$watch('model.title', updateStatus);
  $scope.$watch('model.content', updateStatus);
  ratingProduct = function(callback) {
    var m, model;
    m = $scope.model;
    model = {
      'category-id': 'test',
      'stream-id': '',
      title: m.title,
      comment: m.content,
      ratings: m.rating
    };
    model = UserData.addToken({});
    return ProductService.rating(model).then(function(data) {
      if (data.type === 'SUCCESS') {
        return callback();
      } else {
        return Device.alert(data.message, null, 'Error', 'Done');
      }
    }, function(err) {
      return Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
    });
  };
  return $scope.postReview = function() {
    if (!contentIsValid()) {
      return;
    }
    ratingProduct(function() {
      $scope.notiThankRating = true;
      return $timeout(function() {
        return $location.path('/landing-page');
      }, 2000);
    });
  };
});

//# sourceMappingURL=post-review.js.map

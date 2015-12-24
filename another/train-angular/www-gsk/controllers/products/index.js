'use strict';
angular.module('site.products', []).config(function($routeProvider) {
  return $routeProvider.when('/products', {
    controller: 'productsIndexCtrl',
    templateUrl: 'views/products/index.jade'
  });
}).controller('productsIndexCtrl', function($scope, $rootScope, $location, Utils, Pages, Snapper, ProductService, UserData, localStorageService) {
  var getProductDetail, init, requestingData;
  console.log('productsIndexCtrl');
  Utils.showLoading();
  $('#nav-the-product').trigger('click');
  Snapper.enable();
  $rootScope.header = {
    pageTitle: Pages.productsIndex.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle,
    containerClass: 'product-index'
  };
  $scope.productRemind = localStorageService.get('path-product-reminder');
  $scope.getRecommentdations = function() {
    if ($scope.productRemind != null) {
      $rootScope.isProductRemind = true;
      $rootScope.getRecommentdations = true;
      localStorageService.set('path-product', $scope.productRemind);
      return $location.path('products/detail-product');
    } else {
      console.log('getRecommentdations');
      $rootScope.getRecommentdations = true;
      return $location.path('/habit');
    }
  };
  $rootScope.listProduct = [];
  requestingData = function() {
    var model;
    model = UserData.addToken({});
    model['product-path'] = '/content/en_US/products';
    return ProductService.getProductList(model).then(function(data) {
      console.log('get list product success');
      console.log(data);
      $rootScope.listProduct = data['product-list'];
      Utils.hideLoading();
    }, function(err) {
      console.log('get list product fail');
      Utils.hideLoading();
    });
  };
  $scope.getProduct = function(productUrl) {
    localStorageService.set('path-product', productUrl);
    $location.url('/products/product-overview');
  };
  getProductDetail = function() {
    var model;
    model = UserData.addToken({});
    return ProductService.getProductDetail(model).then(function(data) {
      $rootScope.listProDetail = data['product-list'];
      Utils.hideLoading();
    }, function(err) {
      console.log('get list product detail fail');
      Utils.hideLoading();
    });
  };
  init = function() {
    requestingData();
    return getProductDetail();
  };
  init();
});

//# sourceMappingURL=index.js.map

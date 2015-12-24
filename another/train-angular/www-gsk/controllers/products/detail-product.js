'use strict';
angular.module('site.products').config(function($routeProvider) {
  return $routeProvider.when('/products/detail-product', {
    controller: 'productDetailCtrl',
    templateUrl: 'views/products/detail-product.jade'
  });
}).controller('productDetailCtrl', function(Device, BadgeService, $scope, $rootScope, $location, Pages, Snapper, UserData, ProductService, localStorageService, Utils, BadgeList) {
  var addProductToProfile, getProductPath, overlay, productOverlayHide, productOverlayShow;
  console.log('productDetailCtrl');
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.productDetail.title
  };
  overlay = $('[data-overlay="overlay-2"]');
  productOverlayShow = function() {
    console.log('productOverlayShow');
    overlay.removeClass('hidden');
  };
  productOverlayHide = function() {
    console.log('productOverlayHide');
    overlay.addClass('hidden');
  };
  $scope.productClose = function() {
    console.log('productClose');
    productOverlayHide();
  };
  if ($rootScope.getRecommentdations === true) {
    $rootScope.getRecommentdations = null;
  } else {
    productOverlayShow();
  }
  getProductPath = function() {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    model['product-path'] = localStorageService.get('path-product');
    return ProductService.getProduct(model).then(function(data) {
      Utils.hideLoading();
      console.log('get product success');
      $scope.product = data;
      $scope.productChild = data;
      $rootScope.header = {
        pageTitle: data.name
      };
      console.log(data);
    }, function(err) {
      Utils.hideLoading();
      console.log('get product fail');
    });
  };
  if ($rootScope.isProductRemind === true) {
    getProductPath();
  }
  addProductToProfile = function(callback) {
    $rootScope.badge = {
      action: 'action6_addniquitintoprofile',
      back: '/products/my-product'
    };
    return $location.path('/quitpoint/courage');
  };
  $scope.addProductProfile = function() {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    if ($rootScope.isProductRemind === true) {
      model['product-path'] = localStorageService.get('path-product');
    } else {
      model['product-path'] = $rootScope.proChildPath;
    }
    ProductService.addProduct(model).then(function(data) {
      var action;
      action = BadgeList.addNiquitinToProfile;
      localStorageService.set('hasProduct', true);
      Utils.checkBadge(action, function() {
        return addProductToProfile();
      }, function() {
        return $location.url('/products/my-product');
      });
      Utils.hideLoading();
      console.log(data);
    }, function(err) {
      $location.url('/products/my-product');
      console.log('save product fail');
      Utils.hideLoading();
    });
  };
});

//# sourceMappingURL=detail-product.js.map

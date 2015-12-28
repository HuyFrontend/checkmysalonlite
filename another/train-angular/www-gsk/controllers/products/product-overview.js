'use strict';
angular.module('site.products').config(function($routeProvider) {
  return $routeProvider.when('/products/product-overview', {
    controller: 'productOverviewCtrl',
    templateUrl: 'views/products/product-overview.jade'
  });
}).controller('productOverviewCtrl', function(BadgeList, Device, $scope, $rootScope, $route, $routeParams, $location, BadgeService, UserData, localStorageService, Pages, Snapper, ProductService, Utils, Settings, LocalNotificationService, GigyaService) {
  var addProductToProfile, getProductChild, getProductList, loadData, setDataProductChild;
  console.log('productOverviewCtrl');
  console.log($route.current.params);
  Utils.showLoading();
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.productOverview.title,
    containerClass: 'product-overview-page'
  };
  setDataProductChild = function(data) {
    var childs;
    $scope.product = data;
    $rootScope.productChilds = childs = data['child-product'];
    $scope.proChild = $rootScope.productChilds[0].path;
    if (childs.length === 1) {
      return $scope.typeChild = 'type-1';
    } else if (childs.length === 2) {
      return $scope.typeChild = 'type-2';
    } else if (childs.length === 3) {
      return $scope.typeChild = 'type-3';
    }
  };
  getProductChild = function() {
    var model, pathProduct;
    model = UserData.addToken({});
    model['product-path'] = pathProduct = localStorageService.get('path-product');
    return ProductService.getProductChild(model).then(function(data) {
      setDataProductChild(data);
      Utils.hideLoading();
    }, function(err) {
      console.log('get product fail');
      Utils.hideLoading();
    });
  };
  getProductChild();
  getProductList = function() {
    var model;
    $scope.listProduct = [];
    model = UserData.addToken({});
    model['product-path'] = '/content/en_US/products';
    return ProductService.getProductList(model).then(function(data) {
      console.log('get list product success');
      $scope.listProduct = data['product-list'];
      console.log(data);
      Utils.hideLoading();
    }, function(err) {
      console.log('get list product fail');
      Utils.hideLoading();
    });
  };
  getProductList();
  loadData = function(mes, cb) {
    var model;
    model = UserData.addToken({});
    return GigyaService.getChallenge(model).then(function(data) {
      var obj;
      obj = _.find(data.badges, function(bad) {
        return bad.id === mes;
      });
      if (!obj) {
        return cb();
      }
    }, function(err) {});
  };
  addProductToProfile = function(callback) {
    $rootScope.badge = {
      action: 'action6_addniquitintoprofile',
      back: '/products/my-product'
    };
    return $location.path('/quitpoint/courage');
  };
  $scope.getProduct = function(productUrl) {
    var model;
    localStorageService.set('path-product', productUrl);
    model = UserData.addToken({});
    model['product-path'] = localStorageService.get('path-product');
    ProductService.getProductChild(model).then(function(data) {
      $scope.product = data;
      $rootScope.productChilds = data['child-product'];
      $scope.proChild = $rootScope.productChilds[0].path;
      Utils.mainScroll(0, 800);
    }, function(err) {
      console.log('get product fail');
      Utils.mainScroll(0, 800);
    });
  };
  $scope.addProductProfile = function() {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    model['product-path'] = $scope.proChild;
    ProductService.addProduct(model).then(function(data) {
      var action;
      console.log('save product success');
      localStorageService.set('hasProduct', true);
      action = BadgeList.addNiquitinToProfile;
      Utils.checkBadge(action, function() {
        return addProductToProfile();
      }, function() {
        return $location.url('/products/my-product');
      });
      Utils.hideLoading();
      console.log(data);
    }, function(err) {
      $location.url('/products/my-product');
      Utils.hideLoading();
    });
  };
  $scope.$watch('proChild', function() {
    $rootScope.proChildPath = $scope.proChild;
    $rootScope.productChild = _.find($rootScope.productChilds, {
      'path': $rootScope.proChildPath
    });
  });
  $scope.goToProductDetail = function() {
    $rootScope.isProductRemind = false;
    $location.url('/products/detail-product');
  };
});

//# sourceMappingURL=product-overview.js.map

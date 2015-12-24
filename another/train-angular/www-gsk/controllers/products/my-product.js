'use strict';
angular.module('site.products').config(function($routeProvider) {
  return $routeProvider.when('/products/my-product', {
    controller: 'productMyProductCtrl',
    templateUrl: 'views/products/my-product.jade'
  });
}).controller('productMyProductCtrl', function($scope, $rootScope, $window, Pages, Snapper, UserData, ProductService, AccountService, localStorageService, Settings, Utils) {
  var getMyproduct, leftAgain, leftMethod, slideLeft;
  console.log('productMyProductCtrl');
  Snapper.disable();
  slideLeft = function() {
    $scope.slide = 'slide-left';
  };
  leftAgain = leftMethod = function() {
    mconsole.log('leftMethod');
    $scope.slide = 'slide-right';
    $window.history.back();
    $window.setTimeout(slideLeft, 650);
    if ($rootScope.leftTwoStep) {
      setTimeout(leftAgain, 10);
      return $rootScope.leftTwoStep = false;
    }
  };
  $rootScope.header = {
    pageTitle: Pages.productMyProduct.title,
    containerClass: 'my-product-page',
    leftMethod: leftMethod
  };
  getMyproduct = function() {
    var model;
    model = UserData.addToken({});
    ProductService.getMyProduct(model).then(function(data) {
      $scope.productActive = data['product-list'][0];
      $scope.findProduct($rootScope.listProDetail);
      console.log('get my product success');
      console.log(data);
    }, function(err) {
      console.log('get my product fail');
      return console.log(err);
    });
  };
  getMyproduct();
  $scope.findProduct = function(data) {
    var obj;
    $scope.productChosen = _.find(data, function(chr) {
      return chr.name === $scope.productActive.name;
    });
    obj = $(".list-item li span");
    return _.forEach(obj, function(num) {
      if (num.innerText === $scope.productChosen.name) {
        $(num).parents("li").addClass("active");
      }
    });
  };
  $scope.callOldHabit = function() {
    var model;
    model = UserData.addToken({});
    AccountService.myOldHabit(model).then(function(data) {
      findProduct(data['list-user-habit']);
      console.log('Get old habit success');
      console.log(data);
    }, function(err) {
      console.log('Get old habit fail');
      console.log(err);
    });
  };
  $scope.addProductProfile = function() {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    model['product-path'] = $scope.pathProduct;
    ProductService.addProduct(model).then(function(data) {
      mconsole.log('Add success');
    }, function(err) {});
  };
});

//# sourceMappingURL=my-product.js.map

'use strict';
angular.module('site.products').config(function($routeProvider) {
  return $routeProvider.when('/products/purchase-product', {
    controller: 'productPurchaseCtrl',
    templateUrl: 'views/products/purchase-product.jade'
  });
}).controller('productPurchaseCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('productPurchaseCtrl');
  Snapper.disable();
  return $rootScope.header = {
    pageTitle: Pages.productPurchase.title,
    containerClass: 'purchase-product-page'
  };
});

//# sourceMappingURL=purchase-product.js.map

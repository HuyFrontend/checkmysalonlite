'use strict';
angular.module("site").factory("ProductService", function(CoreAPI, $resource, CONSTANTS, localStorageService) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd/:_id', {}, {
    getProductList: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-product-list.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getProduct: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-product.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getMyProduct: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'my-product.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getReminder: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-reminder.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    addProduct: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'add-product.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    rating: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'rating-product.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getUserProduct: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-user-product.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getProductChild: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-product-child.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getProductDetail: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-product-detail-list.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  }, fList = [
    {
      functionName: 'getProductList',
      isCache: true
    }, {
      functionName: 'getProduct',
      isCache: true
    }, {
      functionName: 'getMyProduct',
      isCache: false
    }, {
      functionName: 'getReminder',
      isCache: false
    }, {
      functionName: 'addProduct',
      isCache: false
    }, {
      functionName: 'rating',
      isCache: false
    }, {
      functionName: 'getUserProduct',
      isCache: false
    }, {
      functionName: 'getProductChild',
      isCache: true
    }, {
      functionName: 'getProductDetail',
      isCache: true
    }
  ]);
  return CoreAPI.initWithOption(resource, 'ProductService', fList);
});

//# sourceMappingURL=product-service.js.map

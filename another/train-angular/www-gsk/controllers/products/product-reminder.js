'use strict';
angular.module('site.products').config(function($routeProvider) {
  return $routeProvider.when('/products/product-reminder', {
    controller: 'productReminderCtrl',
    templateUrl: 'views/products/product-reminder.jade'
  });
}).controller('productReminderCtrl', function($scope, $rootScope, Device, UserData, ProductService, Pages, Snapper, localStorageService, Settings) {
  var activeClass, getData, number;
  console.log('productReminderCtrl');
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.productReminder.title || 'Product Reminder'
  };
  activeClass = 'active';
  $('.read-more').on('click', function() {
    var that;
    that = $(this);
    if (that.hasClass(activeClass)) {
      return that.text(l10n.button.readMore).attr('title', l10n.button.readMore).removeClass(activeClass).next().hide();
    } else {
      return that.text(l10n.button.readLess).attr('title', l10n.button.readLess).addClass(activeClass).next().show();
    }
  });
  number = Math.floor((Math.random() * 4) + 1);
  getData = function() {
    var model;
    model = UserData.addToken({});
    ProductService.getReminder(model).then(function(data) {
      $scope.product = data.product;
      $scope.productMemind = data['reminder-list'][number];
      return mconsole.log('data', data);
    }, function(err) {
      Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
      return mconsole.log('err');
    });
  };
  getData();
});

//# sourceMappingURL=product-reminder.js.map

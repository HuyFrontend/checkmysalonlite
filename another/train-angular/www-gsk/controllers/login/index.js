'use strict';
angular.module('site.login', []).config(function($routeProvider) {
  return $routeProvider.when('/login', {
    controller: 'loginIndexCtrl',
    templateUrl: 'views/login/index.jade'
  });
}).controller('loginIndexCtrl', function($scope, $rootScope, $location, Snapper, localStorageService, Utils, Settings, LocalNotificationService, UserData, ProductService) {
  var addProductNotification, checkLastOpenApp, checkUserProduct, path, userName;
  console.log('loginIndexCtrl');
  userName = localStorageService.get('userName');
  checkLastOpenApp = function() {
    var differenceDate, lastOpen, path, strStoredDate, strToday;
    strToday = Utils.getYearNow() + '-' + Utils.getMonthNow() + '-' + Utils.getDateNow();
    lastOpen = Settings.localStorage.name.lastOpen;
    if (localStorageService.get(lastOpen) != null) {
      strStoredDate = localStorageService.get(lastOpen);
      mconsole.log('last open app ' + strStoredDate);
      differenceDate = Utils.getDifferenceDate(strToday, strStoredDate, 'date');
      console.log('Difference days ' + differenceDate);
      if (parseInt(differenceDate) >= 4) {
        path = '/login/welcome-back';
      }
    }
    return localStorageService.set(lastOpen, strToday);
  };
  addProductNotification = function() {
    var compareDate, dateRemind, firstTimeLogin, now, options, strDate, strToday;
    strToday = Utils.getYearNow() + '-' + Utils.getMonthNow() + '-' + Utils.getDateNow();
    firstTimeLogin = Settings.localStorage.name.firstLogin;
    if (localStorageService.get(firstTimeLogin + userName) != null) {
      strDate = localStorageService.get(firstTimeLogin + userName);
      compareDate = Utils.getDifferenceDate(strToday, strDate, 'date');
      if (parseInt(compareDate) >= 3) {
        now = new Date().getTime();
        dateRemind = new Date(now + 1 * 1000);
        options = {
          id: Settings.notification.product.id,
          title: Settings.notification.product.title,
          message: Settings.notification.product.message,
          date: dateRemind,
          autoCancel: true
        };
        console.log(options);
        LocalNotificationService.addNotification(Settings.notification.product.id, options);
        return LocalNotificationService.onClickNotification(Settings.notification.product.id);
      }
    }
  };
  checkUserProduct = function() {
    var model;
    model = UserData.addToken({});
    ProductService.getMyProduct(model).then(function(data) {
      var len;
      console.log('product success ');
      console.log(data);
      if ((data.type != null) && data.type.trim() === 'ERROR') {
        return;
      }
      len = data['product-list'].length;
      if (parseInt(len) === 0) {
        return addProductNotification();
      }
    }, function(err) {
      return console.log('product list fail');
    });
  };
  if ((localStorageService.get('rememberMe') === 'true') && localStorageService.get('accessToken')) {
    if (localStorageService.get('isJourneyStarted') === 'true') {
      path = '/landing-page';
    } else {
      path = '/quitpoint';
    }
    checkLastOpenApp();
    checkUserProduct();
    $location.path(path);
    return;
  }
  $scope.credential = {};
  Snapper.disable();
  return $rootScope.header = {
    containerClass: 'login-page'
  };
});

//# sourceMappingURL=index.js.map

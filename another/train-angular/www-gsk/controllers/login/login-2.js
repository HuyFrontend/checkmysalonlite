'use strict';
angular.module('site.login').config(function($routeProvider) {
  return $routeProvider.when('/login/login-2', {
    controller: 'loginIndex2Ctrl',
    templateUrl: 'views/login/login-2.jade',
    resolve: resolve
  });
}).controller('loginIndex2Ctrl', function($http, $scope, $rootScope, $location, $timeout, UserData, Utils, Device, Snapper, AccountService, localStorageService, Pages, LocalNotificationService, Settings, ProductService) {
  var addProductNotification, atts, checkConfirmPassword, checkFirstLogin, checkLastOpenApp, checkLoadPage, checkMorningRecapNotification, checkStartJourneyNotification, checkSundayNotification, checkUserProduct, credential, enableDymamicValidation, err, isRequesting, isValidForm, showMessageErr, validation;
  mconsole.log('loginIndex2Ctrl');
  Snapper.disable();
  $rootScope.header = {
    containerClass: 'login-page'
  };
  $scope.err = err = {};
  $scope.credential = credential = {
    isRemember: 'true'
  };
  atts = ['email', 'password', 'userName'];
  validation = function() {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = atts.length; _i < _len; _i++) {
      item = atts[_i];
      _results.push(err[item] = $scope['loginform'][item].$invalid);
    }
    return _results;
  };
  enableDymamicValidation = function() {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = atts.length; _i < _len; _i++) {
      item = atts[_i];
      _results.push($scope.$watch('loginform.' + item + '.$valid', function() {
        return validation();
      }));
    }
    return _results;
  };
  checkConfirmPassword = false;
  $scope.$watch('credential.password', function() {
    mconsole.log('credential.password', Utils.isValidPassword(credential.password));
    if (checkConfirmPassword) {
      return err['password'] = !((credential.password != null) && Utils.isValidPassword(credential.password));
    }
  });
  $scope.$watch('credential.userName', function() {
    mconsole.log('credential.userName', Utils.isValidUserName(credential.userName));
    if (checkConfirmPassword) {
      return err['userName'] = !((credential.userName != null) && Utils.isValidUserName(credential.userName));
    }
  });
  isValidForm = function() {
    var value;
    value = Utils.isValidPassword(credential.password) && Utils.isValidUserName(credential.userName);
    mconsole.log('isValidForm', value);
    return value;
  };
  showMessageErr = function(data) {
    if (data['error-fields'] != null) {
      if (data['error-fields'].email && !data['error-fields'].password) {
        Device.alert(data['error-fields'].email || 'Login fail', null, 'Error', 'Done');
      }
      if (data['error-fields'].password && !data['error-fields'].email) {
        Device.alert(data['error-fields'].password || 'Login fail', null, 'Error', 'Done');
      }
      if (data['error-fields'].password && data['error-fields'].email) {
        Device.alert(Pages.emailPass.title, null, 'Error', 'Done');
      }
    } else {
      Device.alert(data.message, null, 'Error', 'Done');
    }
  };
  isRequesting = false;
  checkLastOpenApp = function() {
    var differenceDate, isOpen, localName, strStoredDate, strToday;
    isOpen = false;
    strToday = Utils.getYearNow() + '-' + Utils.getMonthNow() + '-' + Utils.getDateNow();
    localName = Settings.localStorage.name.lastOpen;
    if (localStorageService.get(localName) != null) {
      strStoredDate = localStorageService.get(localName);
      mconsole.log('last open app ' + strStoredDate);
      differenceDate = Utils.getDifferenceDate(strToday, strStoredDate, 'date');
      console.log('Difference days ' + differenceDate);
      if (parseInt(differenceDate) >= 4) {
        isOpen = true;
      }
    } else {
      mconsole.log('this first open app');
    }
    localStorageService.set(localName, strToday);
    return isOpen;
  };
  checkLoadPage = function() {
    var localSlipUpCount, localStorageName, openPage, path;
    localSlipUpCount = Settings.localStorage.name.slipUpCount;
    if (localStorageService.get(localSlipUpCount) != null) {
      localStorageService.remove(localSlipUpCount);
    }
    if (localStorageService.get('isJourneyStarted') === 'true') {
      path = '/landing-page';
    } else {
      path = '/quitpoint';
    }
    localStorageName = Settings.localStorage.name.loginPage;
    if (checkLastOpenApp() === true) {
      $rootScope.isWelcomeBack = true;
      $location.path('/landing-page');
      return;
    }
    if (localStorageService.get(localStorageName) != null) {
      openPage = localStorageService.get(localStorageName);
      mconsole.log(openPage);
      switch (openPage) {
        case Settings.localStorage.value.openStartJourney:
          path = Settings.notification.startJourney.path;
          break;
        case Settings.localStorage.value.openMorningRecap:
          path = Settings.notification.recap.path;
          break;
        case Settings.localStorage.value.openReasonToQuit:
          path = Settings.notification.reasonToQuit.path;
          break;
        case Settings.localStorage.value.openSundayChallenge:
          path = Settings.notification.sundayChallenge.path;
      }
      localStorageService.remove(localStorageName);
    }
    $location.path(path);
    return console.log(path);
  };
  checkMorningRecapNotification = function() {
    var dateRemind, id, options, secondTime, strTime, userProfile;
    userProfile = UserData.getProfile();
    console.log(userProfile);
    if (userProfile['recap-time'].value != null) {
      strTime = userProfile['recap-time'].value;
      secondTime = Utils.getSecondFromNow(strTime);
      dateRemind = Utils.dateRemind(secondTime);
      id = Settings.notification.recap.id;
      options = {
        id: Settings.notification.recap.id,
        title: Settings.notification.recap.title,
        message: Settings.notification.recap.message,
        date: dateRemind,
        repeat: Settings.notification.recap.repeat,
        autoCancel: true
      };
      console.log(options);
      LocalNotificationService.addNotification(id, options);
      return LocalNotificationService.onClickNotification(id);
    } else {
      return console.log('can not get morning recap');
    }
  };
  checkSundayNotification = function() {
    var dateRemind, id, options, secondTime, strTime, sundayRemind, userProfile;
    userProfile = UserData.getProfile();
    console.log(userProfile);
    if (userProfile['recap-time'].value != null) {
      strTime = userProfile['recap-time'].value;
      secondTime = Utils.getSecondFromNow(strTime);
      dateRemind = Utils.dateRemind(secondTime);
      sundayRemind = Utils.sundayRemind(dateRemind);
      id = Settings.notification.sundayChallenge.id;
      options = {
        id: Settings.notification.sundayChallenge.id,
        title: Settings.notification.sundayChallenge.title,
        message: Settings.notification.sundayChallenge.message,
        date: sundayRemind,
        repeat: Settings.notification.sundayChallenge.repeat,
        autoCancel: true
      };
      console.log(options);
      LocalNotificationService.addNotification(id, options);
      return LocalNotificationService.onClickNotification(id);
    } else {
      return console.log('can not get sunday challenge');
    }
  };
  checkStartJourneyNotification = function() {
    var dateRemind, dateRemindFromNow, id, now, options, secondTime, userProfile;
    userProfile = UserData.getProfile();
    if ((userProfile['user-journey'] != null) && (userProfile['user-journey'].hour != null) && parseInt(userProfile['user-journey'].hour) > 0) {
      dateRemindFromNow = parseInt(userProfile['user-journey'].hour);
      now = new Date().getTime();
      secondTime = dateRemindFromNow * 24 * 60 * 60;
      dateRemind = new Date(now + secondTime * 1000);
      id = Settings.notification.startJourney.id;
      options = {
        id: Settings.notification.startJourney.id,
        title: Settings.notification.startJourney.title,
        message: Settings.notification.startJourney.message,
        date: dateRemind,
        autoCancel: true
      };
      console.log(options);
      LocalNotificationService.addNotification(id, options);
      return LocalNotificationService.onClickNotification(id);
    } else {
      return console.log('user-journey do not create');
    }
  };
  addProductNotification = function() {
    var compareDate, dateRemind, firstTimeLogin, now, options, strDate, strToday, userName;
    strToday = Utils.getYearNow() + '-' + Utils.getMonthNow() + '-' + Utils.getDateNow();
    userName = localStorageService.get('userName');
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
  checkFirstLogin = function() {
    var firstTimeLogin, strToday, userName;
    strToday = Utils.getYearNow() + '-' + Utils.getMonthNow() + '-' + Utils.getDateNow();
    userName = localStorageService.get('userName');
    firstTimeLogin = Settings.localStorage.name.firstLogin;
    if (localStorageService.get(firstTimeLogin + userName) === null) {
      return localStorageService.set(firstTimeLogin + userName, strToday);
    }
  };
  $scope.submit = function() {
    var deviceUID, m, model;
    if (isValidForm()) {
      if (isRequesting) {
        return;
      }
      m = $scope.credential;
      model = {
        'user-name': m.userName,
        'password': m.password,
        'remember-me': m.isRemember
      };
      if (!$rootScope.USER) {
        $rootScope.USER = {};
      }
      $rootScope.USER.userName = m.userName;
      if (window.isWebView()) {
        model.device = {
          'uid': localStorage.getItem('deviceUID'),
          'os': localStorage.getItem('deviceOS'),
          'token': localStorage.getItem('deviceToken')
        };
      } else {
        deviceUID = moment().format('X');
        localStorage.setItem('deviceUID', deviceUID);
        model.device = {
          'uid': deviceUID,
          'os': 'IOS',
          'token': localStorage.getItem('deviceToken')
        };
      }
      mconsole.log('model', model);
      isRequesting = true;
      Utils.showLoading();
      AccountService.signIn(model).then(function(data) {
        isRequesting = false;
        mconsole.log('AccountService', data);
        if ((data.type != null) && data.type === 'ERROR') {
          showMessageErr(data);
        } else {
          if ((data.user != null) && data.user['team-id']) {
            localStorageService.set('hasJoinedATeam', true);
          } else {
            localStorageService.set('hasJoinedATeam', false);
          }
          localStorageService.set('accessToken', data['user-token']);
          localStorageService.set('userName', credential.userName);
          localStorageService.set('userProfile', data['user']);
          localStorageService.set('rememberMe', m.isRemember);
          if ((data.user['date-start-journey'] != null)) {
            localStorageService.set('dateJourney', data.user['date-start-journey']);
            localStorageService.set('isJourneyStarted', 'true');
          } else {
            localStorageService.remove('dateJourney');
            localStorageService.set('isJourneyStarted', 'false');
          }
          if ((data['has-product'] != null) && data['has-product']) {
            localStorageService.set('hasProduct', true);
          } else {
            localStorageService.set('hasProduct', false);
          }
          $rootScope.$broadcast('signIn-broad');
          $timeout(function() {
            checkFirstLogin();
            checkLoadPage();
            checkMorningRecapNotification();
            checkStartJourneyNotification();
            checkSundayNotification();
            return checkUserProduct();
          }, 1000);
        }
        Utils.hideLoading();
        Utils.preLoadData();
      }, function(err) {
        isRequesting = false;
        Utils.hideLoading();
        return Device.alert(Settings.error.serverError, null, 'Error', 'Done');
      });
      return;
    } else {
      checkConfirmPassword = true;
      if (!Utils.isValidPassword(credential.password)) {
        err['password'] = true;
      }
      if (!Utils.isValidUserName(credential.userName)) {
        err['userName'] = true;
      }
    }
  };
});

//# sourceMappingURL=login-2.js.map

'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/where-hear', {
    controller: 'signupWhereHearCtrl',
    templateUrl: 'views/signup/where-hear.jade'
  });
}).controller('signupWhereHearCtrl', function($scope, $rootScope, $location, $timeout, Device, UserData, AccountService, localStorageService, LocalNotificationService, Settings, Utils) {
  var addMorningRecapNotification, addStorageFirstLogin, addSundayNotification, autoRequest, defaultWhereHear, isRequesting, requestingOverlay, setSkipHabitTime, updateButtonStatus, whereHear;
  console.log('signupWhereHearCtrl');
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  defaultWhereHear = {
    place: null
  };
  $scope.whereHear = whereHear = $rootScope.signUpModel.whereHear || defaultWhereHear;
  updateButtonStatus = function() {
    if ($scope.whereHear.isAccept && ($scope.whereHear.place != null)) {
      return $('.btn.btn-2').addClass('active');
    } else {
      return $('.btn.btn-2').removeClass('active');
    }
  };
  $scope.$watch('whereHear.isAccept', updateButtonStatus);
  $scope.$watch('whereHear.place', updateButtonStatus);
  setSkipHabitTime = function() {
    var currentTime;
    currentTime = moment();
    return localStorageService.set('skipHabit', currentTime.format('X'));
  };
  isRequesting = false;
  requestingOverlay = $('[data-loading-data="data-loading-data"]');
  $scope.done = function() {
    var d, model;
    if (isRequesting) {
      return;
    }
    if (!($scope.whereHear.isAccept && ($scope.whereHear.place != null))) {
      return;
    }
    $rootScope.signUpModel.whereHear = $scope.whereHear;
    console.log($rootScope.signUpModel);
    d = $rootScope.signUpModel;
    model = {
      'name': d.credential.fullName,
      'email': d.credential.email,
      'age': d.age,
      'country': d.country,
      'gender': d.gender,
      'user-name': d.credential.userName,
      'password': d.credential.password,
      'recap-time': {
        'type': 'DAILY',
        'value': moment(d.bestTime).format('HH:mm:ss')
      },
      'avatar': d.character,
      'language': d.language,
      'receive-offer': d.whereHear.isReceiveNews,
      'term-condition': true,
      'app-reference': d.whereHear.place,
      'security-question': d.credential.securityQuestion,
      'security-answer': d.credential.securityAnswer,
      'device-date': moment().format('YYYY-MM-DD HH:mm:ss'),
      'list-questions': d["list-questions"]
    };
    mconsole.log('sign up model', model);
    Utils.showLoading();
    isRequesting = true;
    return AccountService.signUp(model).then(function(data) {
      var deviceUID, loginModel, reason, userName;
      console.log('sign-up model', data);
      if (data.type === 'SUCCESS') {
        loginModel = {
          'user-name': model['user-name'],
          'password': model.password,
          'remember-me': false
        };
        if (!$rootScope.USER) {
          $rootScope.USER = {};
        }
        $rootScope.USER.userName = model['user-name'];
        if (window.isWebView()) {
          loginModel.device = {
            'uid': localStorage.getItem('deviceUID'),
            'os': localStorage.getItem('deviceOS'),
            'token': localStorage.getItem('deviceToken')
          };
        } else {
          deviceUID = moment().format('X');
          localStorage.setItem('deviceUID', deviceUID);
          loginModel.device = {
            'uid': deviceUID,
            'os': 'IOS',
            'token': localStorage.getItem('deviceToken')
          };
        }
        addMorningRecapNotification();
        addSundayNotification();
        userName = model['user-name'];
        reason = Settings.localStorage.name.reasonToQuit;
        addStorageFirstLogin(userName);
        localStorageService.set('userName', userName);
        localStorageService.set(reason.memo + userName, $rootScope.reasonModel.memo);
        localStorageService.set(reason.photo + userName, $rootScope.reasonModel.photo);
        localStorageService.set(reason.video + userName, $rootScope.reasonModel.video);
        localStorageService.set(reason.audio + userName, $rootScope.reasonModel.audio);
        console.log('login data', loginModel);
        return AccountService.signIn(loginModel).then(function(data) {
          if ((data.type != null) && data.type === 'ERROR') {
            Device.alert(data.message || 'Login fail', null, 'Error', 'Done');
          } else {
            localStorageService.set('accessToken', data['user-token']);
            localStorageService.set('userProfile', data['user']);
            localStorageService.set('rememberMe', 'false');
            localStorageService.set('justSignUp', 'true');
            setSkipHabitTime();
            $rootScope.signUpModel = {};
            $rootScope.habitModel = {};
            $rootScope.reasonModel = {};
            localStorageService.set('hasJoinedATeam', 'false');
            $rootScope.$broadcast('signIn-broad');
            if ((data['has-product'] != null) && data['has-product']) {
              localStorageService.set('hasProduct', true);
            } else {
              localStorageService.set('hasProduct', false);
            }
            if (UserData.getTour()) {
              $timeout(function() {
                return $location.path('/quitpoint');
              }, 1000);
            } else {
              $location.path('/tour');
            }
          }
          Utils.hideLoading();
          return isRequesting = false;
        }, function(err) {
          Utils.hideLoading();
          Utils.showConnectionError();
          return isRequesting = false;
        });
      } else {
        Device.alert(data.message, null, 'Error', 'Done');
        Utils.hideLoading();
        isRequesting = false;
        $rootScope.leadTo = '/signup/where-hear';
        return $location.path('/signup');
      }
    }, function(err) {
      Utils.hideLoading();
      Utils.showConnectionError();
      return isRequesting = false;
    });
  };
  addMorningRecapNotification = function() {
    var dateRemind, options, second, setTime;
    console.log('goto morning' + $rootScope.signUpModel.bestTime);
    if ($rootScope.signUpModel.bestTime != null) {
      setTime = moment($rootScope.signUpModel.bestTime).format('HH:mm');
      second = Utils.getSecondFromNow(setTime);
      dateRemind = Utils.dateRemind(second);
      console.log('remind' + dateRemind);
      options = {
        id: Settings.notification.recap.id,
        title: Settings.notification.recap.title,
        message: Settings.notification.recap.message,
        date: dateRemind,
        autoCancel: true,
        repeat: Settings.notification.recap.repeat
      };
      LocalNotificationService.addNotification(Settings.notification.recap.id, options);
      return LocalNotificationService.onClickNotification(Settings.notification.recap.id);
    }
  };
  addSundayNotification = function() {
    var dateRemind, getNoti, id, message, options, path, repeat, second, setTime, sundayRemind, title;
    setTime = '07:30';
    repeat = 'weekly';
    if ($rootScope.signUpModel.bestTime != null) {
      setTime = moment($rootScope.signUpModel.bestTime).format('HH:mm');
      second = Utils.getSecondFromNow(setTime);
      dateRemind = Utils.dateRemind(second);
      sundayRemind = Utils.sundayRemind(dateRemind);
      getNoti = Settings.notification.sundayChallenge;
      id = getNoti.id;
      message = getNoti.message;
      title = getNoti.title;
      path = getNoti.path;
      options = {
        id: id,
        title: title,
        message: message,
        date: sundayRemind,
        repeat: repeat,
        autoCancel: true
      };
      LocalNotificationService.addNotification(id, options);
      return LocalNotificationService.onClickNotification(id);
    }
  };
  addStorageFirstLogin = function(userName) {
    var firstTimeLogin, lastTimeOpenApp, strToday;
    strToday = Utils.getYearNow() + '-' + Utils.getMonthNow() + '-' + Utils.getDateNow();
    firstTimeLogin = Settings.localStorage.name.firstLogin;
    lastTimeOpenApp = Settings.localStorage.name.lastOpen;
    localStorageService.set(firstTimeLogin + userName, strToday);
    return localStorageService.set(lastTimeOpenApp, strToday);
  };
  autoRequest = function() {
    if ($rootScope.isValidSignupModel === true) {
      $rootScope.isValidSignupModel = null;
      return $timeout(function() {
        return $scope.done();
      }, 100);
    }
  };
  return autoRequest();
});

//# sourceMappingURL=where-hear.js.map

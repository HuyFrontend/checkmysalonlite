var LOCAL, SERVICE, globalData, gsk, gskconsole, mconsole;

globalData = {
  settings: null,
  l10n: null,
  pages: null,
  badges: null
};

LOCAL = {
  settings: {},
  l10n: {},
  pages: {},
  badges: {}
};

SERVICE = {
  settings: null,
  l10n: null,
  pages: null,
  badges: null
};

gsk = gskconsole = mconsole = {
  environment: 'development'
};

gsk.isProduction = function() {
  if (gsk.environment === 'production') {
    return true;
  } else {
    return false;
  }
};

gsk.log = function(content) {
  if (!gsk.isProduction()) {
    if (arguments.length > 1) {
      console.log(arguments);
    } else {
      console.log(content);
    }
  }
};

mconsole.log('this is a log from mconsole.log');

//# sourceMappingURL=init.js.map

'use strict';
angular.module('site.accountSettings', []).config(function($routeProvider) {
  return $routeProvider.when('/account-settings', {
    controller: 'accountIndexCtrl',
    templateUrl: 'views/account-settings/index.jade'
  });
}).controller('accountIndexCtrl', function(QuitTeamService, $scope, $rootScope, $location, QuitPointService, BadgeService, Device, Pages, UserData, Snapper, AccountService, CameraService, localStorageService, Utils, Settings, LocalNotificationService, BadgeList, LocalPushService) {
  var avatar, callChangePass, callOldHabit, cancelNotification, changePassContent, changePassContentIsShowing, changePasswordStatus, checkNameUser, getUserName, isChangePassSubmitted, isRequesting, localReason, messageMemo, reason, setDataProfile, setHabitList, setOldHabit, setRecapTime, setTimeRecap, submitReasonToQuit, updateMorningRecapNotification, updateStartJourneyRemindTime, updateSundayChallengeNotification, validatePass, viewAccountSettings;
  mconsole.log('accountIndexCtrl');
  getUserName = '';
  localReason = Settings.localStorage.name.reasonToQuit;
  if (localStorageService.get('userName') != null) {
    getUserName = localStorageService.get('userName');
  }
  messageMemo = $('#message-memo');
  $scope.reason = reason = messageMemo.val() || localStorageService.get(localReason.memo + getUserName);
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.accountIndex.title
  };
  avatar = $rootScope.avatar;
  $scope.model = {
    avatar: avatar || 'avatar-empty.png',
    country: 'RU',
    language: 'English',
    progress: 'Every Other Day',
    time: 'Within 30 mins after waking',
    year: '10 years',
    replace: 'NiQuitin Gum'
  };
  $scope.mediaPopup = function() {
    $scope.showPopup = true;
  };
  $scope.memoPopup = function() {
    $scope.showMemoPopup = true;
  };
  $scope.getPhotoFromLibrary = function() {
    CameraService.photoFromLibrary().then(function(imageData) {
      localStorageService.set(localReason.photo + getUserName, imageData);
      Device.alert(Settings.message.reasonToQuitPhoto, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  $scope.getPhotoFromCamera = function() {
    CameraService.takeNewPhoto().then(function(imageData) {
      localStorageService.set(localReason.photo + getUserName, imageData);
      Device.alert(Settings.message.reasonToQuitPhoto, null, 'Message', 'Done');
    });
    return $scope.showPopup = false;
  };
  $scope.getVideoFromLibrary = function() {
    CameraService.videoFromLibrary().then(function(videoData) {
      localStorageService.set(localReason.video + getUserName, videoData);
      Device.alert(Settings.message.reasonToQuitVideo, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  $scope.captureVideo = function() {
    CameraService.takeNewVideo().then(function(videoData) {
      localStorageService.set(localReason.video + getUserName, videoData);
      Device.alert(Settings.message.reasonToQuitVideo, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  $scope.captureAudio = function() {
    CameraService.takeNewAudio().then(function(audioData) {
      localStorageService.set(localReason.audio + getUserName, audioData);
      Device.alert(Settings.message.reasonToQuitAudio, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  if ($rootScope.avatar != null) {
    $scope.panel = 0;
    $rootScope.avatar = null;
  }
  setTimeRecap = function(time) {
    var defaultTime;
    defaultTime = new Date();
    defaultTime.setHours(time._d.getHours());
    defaultTime.setMinutes(time._d.getMinutes());
    $scope.timeRecap = defaultTime;
    $scope.timeTranform = moment($scope.timeRecap).format('HH:mm');
    $scope.timeTranform = Utils.changeTimeAP($scope.timeTranform);
    return mconsole.log($scope.timeRecap);
  };
  $scope.user = {};
  checkNameUser = function() {
    if (Utils.isValidFullName($scope.user.name)) {
      return true;
    }
  };
  setDataProfile = function(data) {
    var d, t;
    d = data['recap-time'].value;
    t = moment(d, 'HH:mm:ss');
    setTimeRecap(t);
    $scope.user = data;
    $scope.user['avatar-path'] = $rootScope.avatarPath;
    if (data['small-avatar'] === '') {
      $scope.user.avatar = 'avatar-empty.png';
    } else {
      $scope.user.avatar = data['small-avatar'];
    }
    if (avatar) {
      $scope.user.avatar = avatar;
    }
    $rootScope.avatarUser = $scope.user['small-avatar'];
    $rootScope.nameUser = $scope.user.name;
    $rootScope.userEmail = $scope.user.email;
    mconsole.log($scope.user);
  };
  submitReasonToQuit = function() {
    $rootScope.badge = {
      action: 'action2_reasontoquit',
      back: '/account-settings'
    };
    return $location.path('/quitpoint/courage');
  };
  viewAccountSettings = function() {
    var model;
    Utils.showRequestingOverlay();
    model = UserData.addToken({});
    AccountService.viewAccountSetting(model).then(function(data) {
      console.log(data);
      setDataProfile(data);
    }, function(err) {});
  };
  updateMorningRecapNotification = function(strTime) {
    var dateRemind, id, options, second;
    second = Utils.getSecondFromNow(strTime);
    dateRemind = Utils.dateRemind(second);
    console.log('date remind' + dateRemind);
    id = Settings.notification.recap.id;
    options = {
      id: Settings.notification.recap.id,
      title: Settings.notification.recap.title,
      message: Settings.notification.recap.message,
      date: dateRemind,
      repeat: Settings.notification.recap.repeat,
      autoCancel: true
    };
    LocalNotificationService.addNotification(id, options);
    return LocalNotificationService.onClickNotification(id);
  };
  updateSundayChallengeNotification = function(strTime) {
    var dateRemind, id, options, second, sundayRemind;
    second = Utils.getSecondFromNow(strTime);
    dateRemind = Utils.dateRemind(second);
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
    LocalNotificationService.addNotification(id, options);
    return LocalNotificationService.onClickNotification(id);
  };
  viewAccountSettings();
  $scope.updateEmail = function() {
    var model;
    if (typeof $scope.user.email === "undefined") {
      $scope.user.email = $rootScope.USER.email;
    }
    if ($scope.user.name && !checkNameUser()) {
      $scope.user.name = $rootScope.nameUser;
      Device.alert('Name can not contain special character.', null, 'Error', 'Done');
    } else {
      model = $scope.user;
      model = UserData.addToken(model);
      model['app-reference'] = '//b';
      AccountService.updateAccountSetting(model).then(function(data) {
        if ((data.type != null) && data.type === 'ERROR') {
          if ((data['error-fields'] != null) && (data['error-fields'].email != null)) {
            Device.alert(data['error-fields'].email, null, 'Error', 'Done');
          } else {
            Device.alert(data.message, null, 'Error', 'Done');
          }
          $scope.user.email = $rootScope.userEmail;
        }
        $rootScope.$broadcast('profile-updated', data);
      }, function(err) {
        return console.log('fail update');
      });
    }
  };
  $scope.updateProfile = function() {
    var model;
    if ($scope.user.name && !checkNameUser()) {
      $scope.user.name = $rootScope.nameUser;
      Device.alert('Name can not contain special character.', null, 'Error', 'Done');
    } else {
      model = $scope.user;
      model = UserData.addToken(model);
      model['app-reference'] = '//b';
      AccountService.updateAccountSetting(model).then(function(data) {
        if ((data['error-fields'] != null) && (data['error-fields'].name != null)) {
          Device.alert(data['error-fields'].name, null, 'Error', 'Done');
          $scope.user.name = $rootScope.nameUser;
          data = null;
          return;
        }
        $rootScope.$broadcast('profile-updated', data);
      }, function(err) {
        return console.log('fail update');
      });
    }
  };
  $scope.updateProfile = function() {
    var model;
    if ($scope.user.name && !checkNameUser()) {
      $scope.user.name = $rootScope.nameUser;
      Device.alert('Name can not contain special character.', null, 'Error', 'Done');
    } else {
      model = $scope.user;
      model = UserData.addToken(model);
      model['app-reference'] = '//b';
      AccountService.updateAccountSetting(model).then(function(data) {
        if ((data['error-fields'] != null) && (data['error-fields'].name != null)) {
          Device.alert(data['error-fields'].name, null, 'Error', 'Done');
          $scope.user.name = $rootScope.nameUser;
          data = null;
          return;
        }
        $rootScope.$broadcast('profile-updated', data);
      }, function(err) {
        return console.log('fail update');
      });
    }
  };
  $scope.updateMemo = function() {
    $scope.reason = messageMemo.val();
    $('[data-name="reason-to-quit"]').find('value-reason').html($scope.reason);
    localStorageService.set(localReason.memo + getUserName, $scope.reason);
    messageMemo.val('');
  };
  $scope.$watch('user.avatar', function() {
    if ($scope.user.avatar) {
      $scope.updateProfile();
    }
  });
  setRecapTime = function() {
    $scope.user['recap-time'].value = moment($scope.timeRecap).format('HH:mm:ss');
    $scope.timeTranform = moment($scope.timeRecap).format('HH:mm');
    return $scope.timeTranform = Utils.changeTimeAP($scope.timeTranform);
  };
  $('[data-name="recap-time"]').blur(function() {
    var strTime;
    if ($scope.timeRecap === null) {
      $scope.timeRecap = new Date();
      return setRecapTime();
    } else if ($scope.user['recap-time'] != null) {
      setRecapTime();
      $scope.updateProfile();
      strTime = $scope.user['recap-time'].value;
      updateMorningRecapNotification(strTime);
      updateSundayChallengeNotification(strTime);
    }
  });
  $scope.$watch('timeRecap', function() {
    if ($scope.timeRecap === null) {
      $scope.timeRecap = new Date();
      setRecapTime();
    } else if ($scope.user['recap-time'] != null) {
      setRecapTime();
    }
  });
  changePassContent = $('[data-name="change-pass-content"]');
  changePassContentIsShowing = false;
  isChangePassSubmitted = false;
  $scope.changePassClicked = function() {
    gsk.log('changePassClicked');
    if (changePassContentIsShowing) {
      changePassContent.hide();
    } else {
      changePassContent.show();
    }
    return changePassContentIsShowing = !changePassContentIsShowing;
  };
  validatePass = function() {
    var m;
    m = $scope.passModel || {};
    mconsole.log('validatePass', m);
    if ((m.current != null) && m.current.length > 0 && m.newPassword.length > 0 && m.confirmPass.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  changePasswordStatus = function() {
    mconsole.log('changePasswordStatus', validatePass());
    if (validatePass()) {
      return $('.btn-change-pass').addClass('active');
    } else {
      return $('.btn-change-pass').removeClass('active');
    }
  };
  $scope.$watch('passModel.current', changePasswordStatus);
  $scope.$watch('passModel.newPassword', changePasswordStatus);
  $scope.$watch('passModel.confirmPass', changePasswordStatus);
  callChangePass = function() {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    model['user-name'] = localStorageService.get('userName');
    model['old-password'] = $scope.passModel.current;
    model['new-password'] = $scope.passModel.newPassword;
    AccountService.changePass(model).then(function(data) {
      Utils.hideLoading();
      if ((data.type != null) && data.type === 'ERROR') {
        if (data['error-fields']) {
          Device.alert(data['error-fields']['old-password'], null, 'Fail', 'Done');
        } else {
          Device.alert(data.message, null, 'Fail', 'Done');
        }
      } else {
        Device.alert('Your password has been updated.', null, 'Success!', 'Done');
        model['user-name'] = '';
        changePassContent.slideUp(500);
      }
      $scope.passModel.current = '';
      $scope.passModel.newPassword = '';
      $scope.passModel.confirmPass = '';
    }, function(err) {
      Utils.hideLoading();
      console.log(err);
      changePassContent.slideUp(500);
    });
  };
  $scope.changePassword = function() {
    var m;
    if (!validatePass()) {
      return;
    }
    m = $scope.passModel;
    if ((m.newPassword != null) && Utils.isValidPassword(m.newPassword) && (m.newPassword === m.confirmPass)) {
      callChangePass();
      return mconsole.log('changePassword done');
    } else {
      if (!Utils.isValidPassword(m.newPassword)) {
        Device.alert('New password is not valid', null, 'Error', 'Done');
        $scope.passModel.newPassword = '';
        return $scope.passModel.confirmPass = '';
      } else {
        Device.alert('Password does not match. Please try again.', null, 'Error', 'Done');
        $scope.passModel.newPassword = '';
        return $scope.passModel.confirmPass = '';
      }
    }
  };
  $scope.showLeaveTeam = false;
  if (localStorageService.get('hasJoinedATeam') === 'true') {
    $scope.showLeaveTeam = true;
  }
  $('[data-input-focus]').click(function() {
    $(this).find('input').focus();
  });
  $('[data-output-blur]').click(function() {
    $('[data-input-focus]').find('input').blur();
  });
  $scope.leaveTeam = function() {
    var model;
    model = UserData.addToken({});
    QuitTeamService.leaveTeam(model).then(function(data) {
      localStorageService.set('hasJoinedATeam', 'false');
    }, function(err) {
      Device.alert(err.message, null, 'Error', 'Done');
    });
  };
  isRequesting = false;
  $scope.restartJourney = function(path) {
    var model;
    localStorageService.set('isJourneyStarted', 'false');
    if (isRequesting) {
      return;
    }
    if (!$rootScope.USER['date-start-journey']) {
      Device.alert('You haven\'t started your journey yet.', null, 'Message', 'Done');
      return;
    }
    isRequesting = true;
    Utils.showLoading();
    model = UserData.addToken({});
    return QuitPointService.restartJourney(model).then(function(data) {
      var id, timeIn;
      mconsole.log('restartJourney', data);
      if (data.type === 'SUCCESS') {
        $location.path(path);
        timeIn = 0;
        updateStartJourneyRemindTime(timeIn);
        id = Settings.notification.startJourney.id;
        $scope.leaveTeam();
        cancelNotification(id);
      } else {
        Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
      }
      isRequesting = false;
      return Utils.hideLoading();
    }, function(err) {
      mconsole.log('restartJourney err', err);
      Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
      isRequesting = false;
      return Utils.hideLoading();
    });
  };
  $scope.answerTime = null;
  $scope.answerYear = null;
  $scope.answerProduct = null;
  setOldHabit = function(data) {
    var habit3, habit4, obj, pathType1, pathType2;
    pathType1 = '/content/en_US/habits/habit-2/jcr:content/par/habitmessageanswer';
    pathType2 = '/content/en_US/habits/habit-2/jcr:content/par/habitmessageanswer_0';
    habit3 = '/content/en_US/habits/habit-3';
    habit4 = '/content/en_US/habits/habit-4';
    if (data.length === 3) {
      $scope.answerTime = data[0]["answer-path"];
      $scope.answerYear = data[1]["answer-path"];
      $scope.answerProduct = data[2]["answer-path"];
      $scope.youSmoke = data[2]['answer-list'];
    } else if (data.length > 3) {
      $scope.answerTime = data[0]["answer-path"];
      $scope.answerYear = data[1]["answer-path"];
      if (data[1]["answer-path"] === pathType1) {
        obj = _.find(data, function(d) {
          return d["current-path"] === habit3;
        });
        $scope.answerProduct = obj["answer-path"];
        $scope.youSmoke = obj['answer-list'];
      } else if (data[1]["answer-path"] === pathType2) {
        obj = _.find(data, function(d) {
          return d["current-path"] === habit4;
        });
        $scope.answerProduct = obj["answer-path"];
        $scope.youSmoke = obj['answer-list'];
      }
    }
    $scope.smokeFor = data[0]['answer-list'];
    $scope.craving = data[1]['answer-list'];
    $scope.activeHabit2 = $scope.activeHabit3 = true;
  };
  $scope.callGetAllHabit = function() {
    var model;
    model = UserData.addToken({});
    AccountService.getAllHabit(model).then(function(data) {
      setHabitList(data['habit-list']);
      console.log('Get all habit success');
      console.log(data);
    }, function(err) {
      console.log('Get all habit fail');
      console.log(err);
    });
  };
  callOldHabit = function() {
    var model;
    model = UserData.addToken({});
    AccountService.myOldHabit(model).then(function(data) {
      var countHabit;
      countHabit = data['list-user-habit'].length;
      if (countHabit < 3) {
        $scope.callGetAllHabit();
      } else if (countHabit >= 3) {
        setOldHabit(data['list-user-habit']);
      }
      console.log('Get old habit success');
      console.log(data);
    }, function(err) {
      console.log('Get old habit fail');
      console.log(err);
    });
  };
  callOldHabit();
  setHabitList = function(data) {
    $scope.smokeFor = data[0]['answer-list'];
    $scope.craving = data[1]['answer-list'];
    return $scope.activeHabit2 = false;
  };
  $scope.reasonChanged = function() {
    var mes;
    Utils.showLoading();
    console.log('reasonChanged');
    console.log('model.reason', $scope.reason);
    localStorageService.set(localReason.memo + getUserName, $scope.reason);
    mes = BadgeList.reasonToQuit;
    return Utils.checkBadge(mes, function() {
      submitReasonToQuit();
      return Utils.hideLoading();
    }, function() {
      $location.path('/account-settings');
      return Utils.hideLoading();
    });
  };
  $scope.logoutApp = function() {
    Utils.removeGroupOfStorage('ServiceData');
    localStorageService.set('rememberMe', null);
    localStorageService.set('accessToken', null);
    localStorageService.set('userProfile', null);
    $rootScope.USER = null;
    return $location.path('/login');
  };
  $scope.updateHabit1 = function(data) {
    var d;
    d = _.find($scope.smokeFor, {
      path: data
    });
    $scope.updateCurrentHabit(d);
    $scope.activeHabit2 = true;
  };
  $scope.updateHabit2 = function(data) {
    var d;
    d = _.find($scope.craving, {
      path: data
    });
    $scope.updateCurrentHabit(d);
    $scope.getNextHabit(d);
    $scope.activeHabit3 = true;
  };
  $scope.updateHabit3 = function(data) {
    var d;
    d = _.find($scope.youSmoke, {
      path: data
    });
    $scope.updateCurrentHabit(d);
  };
  $scope.getNextHabit = function(obj) {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    model.type = 'HABIT';
    model['current-path'] = obj['current-path'];
    model['answer-path'] = obj.path;
    AccountService.getNextHabit(model).then(function(data) {
      Utils.hideLoading();
      $scope.youSmoke = data['answer-list'];
      $scope.answerProduct = '';
    }, function(err) {
      Utils.hideLoading();
    });
  };
  $scope.updateCurrentHabit = function(obj) {
    var model;
    model = UserData.addToken({});
    model.type = 'HABIT';
    model['current-path'] = obj['current-path'];
    model['answer-path'] = obj.path;
    AccountService.getNextHabit(model).then(function(data) {
      console.log('Update habit success');
      console.log(data);
    }, function(err) {
      console.log('Update habit fail');
      console.log(err);
    });
  };
  updateStartJourneyRemindTime = function(timeIn) {
    var hour, model;
    model = UserData.addToken({});
    hour = {
      'hour': timeIn
    };
    model = UserData.addToken(hour);
    console.log(model);
    model['app-reference'] = '//b';
    AccountService.postRemindStartJourney(model).then(function(data) {
      mconsole.log('update success');
      console.log(data);
    }, function(err) {
      console.log('fail update');
      throw err;
    });
  };
  cancelNotification = function(id) {
    return LocalNotificationService.cancelNotification(id);
  };
  $scope.userName = localStorageService.get('userName');
});

//# sourceMappingURL=index.js.map

'use strict';
angular.module('site.games', []).config(function($routeProvider) {
  return $routeProvider.when('/games', {
    controller: 'gamesIndexCtrl',
    templateUrl: 'views/games/index.jade',
    resolve: resolve
  });
}).controller('gamesIndexCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('gamesIndexCtrl');
  return $rootScope.header = {
    pageTitle: Pages.gamesIndex.title
  };
});

//# sourceMappingURL=index.js.map

'use strict';
angular.module('site.habit', []).config(function($routeProvider) {
  return $routeProvider.when('/habit', {
    controller: 'habitIndexCtrl',
    templateUrl: 'views/habit/index.jade'
  });
}).controller('habitIndexCtrl', function($scope, $rootScope, $location, Pages, Snapper, AccountService, UserData, Utils) {
  var callFirstHabit, updateButtonStatus, year;
  console.log('habitIndexCtrl');
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.habitIndex.title
  };
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.year = year = $rootScope.habitModel.year || null;
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    } else {
      return $('a.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.year);
  $scope.$watch('year', function() {
    return updateButtonStatus($scope.year);
  });
  $scope.next = function() {
    var redirectTo;
    if (!($scope.year != null)) {
      return;
    }
    console.log($scope.year);
    $rootScope.habitModel.year = $scope.year;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    $rootScope.objQuestion = _.find($rootScope.answerHabit, function(answer) {
      return answer.path === $scope.year;
    });
    $rootScope.habitModel.yearData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    return $location.path('/habit/looking-for');
  };
  callFirstHabit = function() {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    model.type = 'HABIT';
    AccountService.getFirstHabit(model).then(function(data) {
      Utils.hideLoading();
      $scope.firstHabit = data;
      $rootScope.answerHabit = data['answer-list'];
      console.log('Get first habit success');
      console.log(data);
    }, function(err) {
      Utils.hideLoading();
      console.log('Get first habit fail');
      console.log(err);
    });
  };
  callFirstHabit();
  $scope.getNextHabit = function(obj) {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    model.type = 'HABIT';
    model['current-path'] = obj['current-path'];
    model['answer-path'] = obj.path;
    AccountService.getNextHabit(model).then(function(data) {
      Utils.hideLoading();
      console.log('Get next habit success');
      console.log(data);
      $rootScope.secondQuestion = data;
      $rootScope.answerHabitTwo = data['answer-list'];
    }, function(err) {
      Utils.hideLoading();
      console.log('Get next habit fail');
      console.log(err);
    });
  };
});

//# sourceMappingURL=index.js.map

'use strict';
var app, resolve;

resolve = {
  delay: function($q, $timeout) {
    var delay;
    console.log('delay');
    delay = $q.defer();
    $timeout(delay.resolve, 350);
    return delay.promise;
  }
};

app = angular.module('site', ['ngAnimate', 'ngRoute', 'ngResource', 'ngSanitize', 'ngTouch', 'pascalprecht.translate', 'angular-carousel', 'LocalStorageModule', 'site.templates', 'site.main', 'site.tour', 'site.signup', 'site.login', 'site.habit', 'site.products', 'site.quitteam', 'site.quitpoint', 'site.accountSettings', 'site.landingPage', 'site.timeline', 'site.feedback', 'site.template', 'site.games', 'site.recap', 'site.help', 'site.reason', 'site.test']);

app.config([
  'localStorageServiceProvider', 'CONSTANTS', function(localStorageServiceProvider, CONSTANTS) {
    return localStorageServiceProvider.setPrefix(CONSTANTS.STORAGE_NAME);
  }
]);

app.config(function($translateProvider) {
  $translateProvider.translations('en', GSK.i18n['en']);
  return $translateProvider.preferredLanguage('en');
});

//# sourceMappingURL=index.js.map

'use strict';
angular.module('site.landingPage', []).config(function($routeProvider) {
  return $routeProvider.when('/landing-page', {
    controller: 'landingIndexCtrl',
    templateUrl: 'views/landing-page/index.jade'
  });
}).controller('landingIndexCtrl', function(CONSTANTS, BadgeService, Environment, $scope, $rootScope, $location, $timeout, Device, Utils, Pages, Settings, Snapper, OverlayService, FacebookService, UserData, LandingService, localStorageService, LocalNotificationService, GigyaService, ProductService, FacebookShareService) {
  var OverlayFired, addList, animateTo, autoShowOverlayChallenge, autoShowOverlayRateApp, badgeActive, badges, checkProductReminder, getBadge, getBadgeId, getBadges, getCompareProduct, getDateJourney, getDoneTime, getLocalBadge, getNextMotivation, getProgress, getTeamActivity, habitOverlayHide, habitOverlayShow, hideOverLayChallenge, hideOverLayRateApp, init, intro, introOnFinish, introStep0, introStep1, introStep2, introStep4, introStep7, introStep9, isRequesting, leadFromAddSlip, leaveTeam, notiWelcomeBack, openBrowser, overlay, overlayChallenge, overlayRateApp, path, popupToHabit, qHeader, rateApp, requestingMotivation, setActivity, setShowBehind, showBadge, showOverlay, startJourney, timeOutProgress, userName;
  mconsole.log('landingIndexCtrl');
  Snapper.settings({
    disable: 'none'
  });
  localStorageService.set('justSignUp', false);
  $timeout(function() {
    return $('#nav-overview').trigger('click');
  }, 800);
  Snapper.enable();
  overlay = $('[data-overlay="overlay-1"]');
  overlayChallenge = $('[data-overlay="overlay-challenge"]');
  overlayRateApp = $('[data-overlay="overlay-rateapp"]');
  userName = localStorageService.get('userName');
  rateApp = Settings.localStorage.name.rateApp;
  $rootScope.leadBy = null;
  $scope.Items = $scope.ItemsMov = Settings.landingIndexCtrl.motivationItems;
  autoShowOverlayChallenge = function() {
    var localName, localValue;
    localName = Settings.localStorage.name.loginPage;
    localValue = Settings.localStorage.value.openSundayChallenge;
    if ((localStorageService.get(localName) != null) && localStorageService.get(localName) === localValue) {
      return overlayChallenge.removeClass('hidden');
    }
  };
  autoShowOverlayRateApp = function() {
    var compareDate, compareDateCountRate, countRate, firstLogin, strFirstLoginDate, strToday;
    if (localStorageService.get(userName + rateApp) === 'true') {
      return;
    }
    strToday = Utils.getYearNow() + '-' + Utils.getMonthNow() + '-' + Utils.getDateNow();
    firstLogin = Settings.localStorage.name.firstLogin;
    if (localStorageService.get(firstLogin + userName) != null) {
      strFirstLoginDate = localStorageService.get(firstLogin + userName);
      compareDate = Utils.getDifferenceDate(strToday, strFirstLoginDate, 'date');
      if (parseInt(compareDate) >= 7) {
        if (localStorageService.get(rateApp + userName) === null) {
          return overlayRateApp.removeClass('hidden');
        } else {
          countRate = localStorageService.get(rateApp + userName);
          if (countRate !== 'true') {
            compareDateCountRate = Utils.getDifferenceDate(strToday, countRate, 'date');
            if (parseInt(compareDateCountRate) >= 14) {
              return overlayRateApp.removeClass('hidden');
            }
          }
        }
      }
    }
  };
  badgeActive = function() {
    mconsole.log('badgeActive', Snapper);
    if (Snapper.state().state === 'right') {
      return Snapper.close('right');
    } else {
      return Snapper.open('right');
    }
  };
  $rootScope.header = {
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle,
    rightIcon: 'icon-badge-white',
    rightMethod: badgeActive,
    containerClass: 'landing-page'
  };
  path = $location.path();
  popupToHabit = 'overlay-group-1';
  intro = introJs();
  intro.setOptions({
    showStepNumbers: false,
    showBullets: false,
    exitOnOverlayClick: false,
    scrollToElement: false
  });
  intro.setOptions({
    steps: Settings.landingIndexCtrl.intro
  });
  habitOverlayShow = function() {
    var lastTime, skipDate;
    skipDate = localStorageService.get('skipHabit');
    if (skipDate != null) {
      lastTime = moment(skipDate, 'X');
      if (lastTime.add(24, 'hours').unix() < moment().unix()) {
        overlay.removeClass('hidden');
      }
    } else {
      overlay.removeClass('hidden');
    }
  };
  habitOverlayHide = function() {
    mconsole.log('habitOverlayHide');
    overlay.addClass('hidden');
  };
  introOnFinish = function() {
    animateTo(0);
    $('html').removeClass('hide-header');
    $('.snap-drawers').show('fast');
    OverlayService.setShowed(path);
    $('.landing-badge').addClass('animate');
    if (OverlayService.isShowed(popupToHabit) === false) {
      habitOverlayShow();
    }
    $rootScope.setScrollPos = false;
    $rootScope.$broadcast('intro-has-finished', true);
    return $scope.isOverlay = false;
  };
  intro.onexit(introOnFinish);
  intro.oncomplete(introOnFinish);
  animateTo = function(top) {
    return $('#main').stop().animate({
      scrollTop: top
    }, 1000);
  };
  qHeader = $('#header');
  introStep0 = function() {
    $scope.tempProgress = $rootScope.progress;
    $rootScope.progress = 30;
    return $rootScope.$apply();
  };
  introStep1 = function() {
    qHeader.addClass('show-badge');
    $rootScope.progress = 50;
    return $rootScope.$apply();
  };
  introStep2 = function() {
    qHeader.removeClass('show-badge');
    $rootScope.progress = $scope.tempProgress;
    return $rootScope.$apply();
  };
  introStep4 = function() {
    return qHeader.addClass('arrow-overlay');
  };
  introStep7 = function() {
    var offsetTop;
    offsetTop = $('[data-name="motivation-carousel"]').offset().top - 150;
    mconsole.log('motivation-carousel offset', $('[data-name="motivation-carousel"]').offset().top);
    if ($('html').hasClass('gte-ios-7')) {
      offsetTop -= 40;
    }
    $('html').addClass('hide-header');
    return animateTo(offsetTop);
  };
  introStep9 = function() {
    var helpStatus, offsetTop, qtButton;
    $('html').addClass('hide-header');
    qtButton = $('[data-name="quit-team-button"]');
    if (qtButton.length === 0) {
      return;
    }
    helpStatus = localStorageService.get('helpStatus') || false;
    if (!helpStatus) {
      offsetTop = qtButton.offset().top - 420;
    } else {
      offsetTop = qtButton.offset().top + 110;
    }
    mconsole.log('introStep9', qtButton.offset().top);
    if ($('html').hasClass('gte-ios-7')) {
      offsetTop -= 40;
    }
    mconsole.log('introStep9', offsetTop);
    return animateTo(offsetTop);
  };
  intro.onbeforechange(function() {
    mconsole.log('onbeforechange', this);
    switch (this._currentStep) {
      case 0:
        return introStep0();
      case 1:
        return introStep1();
      case 2:
        return introStep2();
      case 4:
        return introStep4();
      case 5:
        return qHeader.removeClass('arrow-overlay');
      case 7:
        return introStep7();
      case 9:
        return introStep9();
    }
  });
  intro.onafterchange(function() {
    var current, helpStatus;
    current = this._introItems[this._currentStep];
    mconsole.log('onafterchange', this, current);
    helpStatus = localStorageService.get('helpStatus') || 'false';
    if ((current != null) && current.element.clientHeight === 0) {
      return intro.nextStep();
    } else if ((current != null) && (current.isUntilHelps === true) && (helpStatus === 'false')) {
      return intro.nextStep();
    }
  });
  OverlayFired = function() {
    if (OverlayService.isShowed(path) === false) {
      $('.snap-drawers').hide('fast');
      return $timeout(function() {
        $rootScope.setScrollPos = true;
        $scope.isOverlay = true;
        return intro.start();
      }, CONSTANTS.OVERLAYS_TIME);
    } else {
      if (OverlayService.isShowed(popupToHabit) === false) {
        return $timeout(function() {
          return habitOverlayShow();
        }, CONSTANTS.OVERLAYS_TIME);
      }
    }
  };
  showOverlay = function() {
    if (Environment.isOverlay) {
      mconsole.log('previousPath', $rootScope.previousPath);
      if ($rootScope.previousPath === '/login') {
        return window.addEventListener('splash-screen-has-finished', OverlayFired, false);
      } else {
        return OverlayFired();
      }
    } else {
      if (OverlayService.isShowed(popupToHabit) === false) {
        return $timeout(function() {
          return habitOverlayShow();
        }, CONSTANTS.OVERLAYS_TIME);
      }
    }
  };
  $scope.showBehind = true;
  setShowBehind = function() {
    $scope.hidedesc = $scope.currentItem['hide-descriptioin'] || null;
    $scope.videos = $scope.currentItem.videos || null;
    if ($scope.videos) {
      $scope.showVideo = true;
    } else {
      $scope.showVideo = false;
    }
  };
  $rootScope.$on('carousel-changed', function(e, index) {
    $scope.currentItem = $scope.Items[index];
    mconsole.log('carousel-changed', $scope.currentItem);
    if (index === $scope.Items.length - 1) {
      $scope.backgroundColor = 'motivation-bg-last';
      $('.icon-share').hide();
      $('.group-link').hide();
      $('.block-science').hide();
    } else {
      $('.icon-share').css('display', '');
      $('.group-link').css('display', '');
      $('.block-science').hide();
      $scope.backgroundColor = $scope.currentItem.backgroundColor;
    }
    setShowBehind();
    $scope.$apply();
  });
  $scope.habitClose = function() {
    var currentTime;
    mconsole.log('habitClose');
    currentTime = moment();
    localStorageService.set('skipHabit', currentTime.format('X'));
    habitOverlayHide();
    $timeout(function() {
      return Device.alert(Settings.message.habitLater, null, 'Message', 'Done');
    }, 200);
  };
  $rootScope.$on('angular-carousel-end-at', function(m, index) {
    return mconsole.log('index', index);
  });
  $scope.shareMotivation = function() {
    var item, shareModel;
    item = $scope.currentItem;
    mconsole.log('shareMotivation', item);
    shareModel = {
      method: "share",
      name: item.title,
      href: Settings.sharingData.link,
      caption: item.title,
      description: Utils.html2Plain(item.descriptioin),
      picture: item['pitureShare']
    };
    mconsole.log('share data', shareModel);
    return FacebookShareService.showDialog(shareModel);
  };
  getDateJourney = function() {
    var longTime, strDate;
    $scope.ItemsMov = [];
    if (localStorageService.get('dateJourney') != null) {
      strDate = localStorageService.get('dateJourney');
      longTime = moment.duration(moment().diff(strDate)).asHours();
      if (longTime <= 24) {
        $scope.ItemsMov.push($scope.Items[0]);
        $scope.ItemsMov.push({});
      } else if (longTime > 24 && longTime <= 48) {
        $scope.ItemsMov.push($scope.Items[0]);
        $scope.ItemsMov.push($scope.Items[1]);
        $scope.ItemsMov.push({});
      } else if (longTime > 48 && longTime <= 72) {
        $scope.ItemsMov.push($scope.Items[0]);
        $scope.ItemsMov.push($scope.Items[1]);
        $scope.ItemsMov.push($scope.Items[2]);
        $scope.ItemsMov.push({});
      } else {
        $scope.ItemsMov = $scope.Items;
      }
    } else {
      $scope.ItemsMov.push($scope.Items[0]);
      $scope.ItemsMov.push({});
    }
    $rootScope.inCarousel = $scope.ItemsMov.length - 1;
  };
  requestingMotivation = function() {
    var model;
    model = UserData.addToken({});
    model['motivation-path'] = '/content/en_US/motivations';
    return LandingService.getMotivation(model).then(function(data) {
      if ((data.type != null) && data.type === 'ERROR') {
        mconsole.log('Data error');
      } else {
        $scope.Items = data['first-motivation-list'];
        $scope.Items.push({});
        $rootScope.inCarousel = $scope.Items.length - 1;
        mconsole.log('get motivation success');
        mconsole.log(data);
        showOverlay();
        mconsole.log('leadFromAccountSetting', $rootScope.leadFromAccountSetting);
      }
      if ($rootScope.leadFromAccountSetting !== true) {
        mconsole.log('leadBy done');
      }
      $rootScope.leadFromAccountSetting = false;
    }, function(err) {
      showOverlay();
      if ($rootScope.leadFromAccountSetting !== true) {
        mconsole.log('requestingHasFinished');
      }
      $rootScope.leadFromAccountSetting = false;
      mconsole.log('get motivation fail');
    });
  };
  if ($rootScope.numberCheer > 0) {
    $scope.cheerZero = false;
    $scope.contentCheer = l10n.landing.cheers;
  } else {
    $scope.cheerZero = true;
    $scope.contentCheer = l10n.landing.cheer;
  }
  setActivity = function(data) {
    var countCheer;
    $rootScope.teamActivity = data;
    $scope.perCheer = data['list-cheers'][0];
    $scope.perSmile = data['list-smileys'][0];
    $rootScope.numberCheer = countCheer = $rootScope.teamActivity['count-cheer'];
    if (countCheer === 0) {
      return $scope.cheerZero = true;
    } else if (countCheer === 1) {
      $scope.cheerZero = false;
      return $scope.contentCheer = l10n.landing.cheer;
    } else {
      $scope.cheerZero = false;
      return $scope.contentCheer = l10n.landing.cheers;
    }
  };
  getTeamActivity = function() {
    var model;
    model = UserData.addToken({});
    LandingService.teamActivities(model).then(function(data) {
      setActivity(data);
      mconsole.log('Get activity success');
      mconsole.log(data);
    }, function(err) {
      mconsole.log('Get activity fail');
    });
  };
  if (localStorageService.get('hasJoinedATeam') === 'true') {
    $scope.showTeamActive = true;
    getTeamActivity();
  }
  hideOverLayChallenge = function() {
    var localName;
    overlayChallenge.addClass('hidden');
    localName = Settings.localStorage.name.loginPage;
    return localStorageService.remove(localName);
  };
  $scope.setChallenges = function() {
    hideOverLayChallenge();
    return $location.path('/timeline');
  };
  $scope.skip = function() {
    return hideOverLayChallenge();
  };
  $scope.showCheerTab = function() {
    if ($rootScope.teamActivity['count-cheer'] > 0) {
      $rootScope.isTabCheer = 1;
      $scope.readCheer();
      return $location.path('/quitteam/team-landing-2');
    }
  };
  $scope.readCheer = function() {
    var model;
    model = UserData.addToken({});
    return LandingService.readCheer(model).then(function(data) {
      $rootScope.countCheer = 0;
      console.log('Success read cheer');
    }, function(err) {
      console.log('Fail read cheer');
    });
  };
  $scope.getProductReminder = function() {
    $location.url('/products/product-reminder');
  };
  hideOverLayRateApp = function() {
    return overlayRateApp.addClass('hidden');
  };
  openBrowser = function(url) {
    var win;
    console.log(url);
    return win = window.open(url, '_system');
  };
  $scope.rateApp = function() {
    var url;
    console.log('rate app');
    hideOverLayRateApp();
    localStorageService.set(rateApp + userName, 'true');
    if (typeof device !== "undefined" && device !== null) {
      if (device.platform === 'Android') {
        url = Settings.rateTheApp.url.android;
      } else {
        if (device.platform === 'iOS') {
          url = Settings.rateTheApp.url.ios;
        }
      }
    } else {
      url = 'https://www.google.co.uk';
      console.log('rate on web browser');
    }
    return openBrowser(url);
  };
  $scope.remindRateApp = function() {
    var strToday;
    console.log('remind rate app');
    strToday = Utils.getYearNow() + '-' + Utils.getMonthNow() + '-' + Utils.getDateNow();
    hideOverLayRateApp();
    return localStorageService.set(rateApp + userName, strToday);
  };
  $scope.cancelRateApp = function() {
    console.log('cancel rate app');
    hideOverLayRateApp();
    return localStorageService.set(rateApp + userName, 'true');
  };
  $scope.serverBadge = Settings.staticBadge;
  timeOutProgress = getProgress = function() {
    console.log('progress,' + $scope.serverBadge.progress);
    return $rootScope.progress = $scope.serverBadge.progress;
  };
  showBadge = function(badgeType) {
    switch (badgeType) {
      case 0:
        $scope.showBadgeDetail = Settings.staticBadge;
        if ($scope.isOverlay !== true) {
          $rootScope.progress = Settings.staticBadge.progress;
        }
        break;
      case 1:
        $scope.showBadgeDetail = $scope.serverBadge;
        if ($scope.isOverlay !== true) {
          $rootScope.progress = $scope.serverBadge.progress;
        }
    }
    return $('.landing-badge, .landing-badge span').css('background-image', 'url(' + $scope.showBadgeDetail.imgURL + ')');
  };
  addList = function(listBadges, currentTime) {
    var arr, endTime, i, len, listEndTime;
    len = listBadges.length;
    listEndTime = [];
    i = 0;
    while (i < len) {
      arr = listBadges[i]['time-end'];
      arr = arr.split(/[- :]/);
      endTime = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
      if (endTime > currentTime) {
        listEndTime.push(endTime);
      }
      i++;
    }
    return listEndTime;
  };
  getBadgeId = function(listBadges, timeEnd) {
    var badgeId, badgeTimeEnd, i, len;
    len = listBadges.length;
    i = 0;
    badgeId = '';
    while (i < len) {
      badgeTimeEnd = listBadges[i]['time-end'];
      if (badgeTimeEnd === timeEnd) {
        badgeId = listBadges[i].id;
        return badgeId;
      }
      i++;
    }
    return badgeId;
  };
  getLocalBadge = function(badgeId) {
    var badge;
    badge = BadgeService.getLocalDetailBadge(badgeId);
    if (badge != null) {
      $scope.serverBadge.name = badge.name;
      $scope.serverBadge.imgURL = badge.imgURL;
    }
    console.log('GET BADGHE');
    return console.log(badge);
  };
  getDoneTime = function(timeEnd, now, timeStart) {
    var doneTime, progress, remainTime, totalTime;
    remainTime = Utils.getDifferenceDate(timeEnd, now, 'minute');
    totalTime = Utils.getDifferenceDate(timeEnd, timeStart, 'minute');
    doneTime = totalTime - remainTime;
    progress = (doneTime * 100) / totalTime;
    $scope.serverBadge.progress = progress;
    if (totalTime >= (2 * 24 * 60)) {
      $scope.serverBadge.doneTime = parseInt(doneTime / (24 * 60));
      $scope.serverBadge.timeCompleted = 'Days completed';
      $scope.serverBadge.totalTime = parseInt(totalTime / (24 * 60));
      return console.log('fn-getDoneTime, days');
    } else {
      if (totalTime <= 60) {
        $scope.serverBadge.doneTime = doneTime;
        $scope.serverBadge.timeCompleted = 'Minutes completed';
        $scope.serverBadge.totalTime = totalTime;
        return console.log('fn-getDoneTime, minutes');
      } else {
        $scope.serverBadge.doneTime = parseInt(doneTime / 60);
        $scope.serverBadge.timeCompleted = 'Hours completed';
        $scope.serverBadge.totalTime = parseInt(totalTime / 60);
        return console.log('fn-getDoneTime, hours');
      }
    }
  };
  getBadge = function(badgeId, startTime, currentTime, timeEnd) {
    var model;
    model = UserData.addToken({});
    model.action = badgeId;
    BadgeService.getDetailBadge(model).then(function(data) {
      console.log(' badge information success');
      if ((data.type != null) && data.type.trim() === 'ERROR') {
        return showBadge(0);
      }
      console.log(data);
      $scope.serverBadge.type = data.type;
      getLocalBadge(badgeId);
      getDoneTime(timeEnd, currentTime, startTime);
      return showBadge(1);
    }, function(err) {
      showBadge(0);
      return mconsole.log('get badge information err', err);
    });
    console.log('get badge detail');
  };
  badges = getBadges = function() {
    var model;
    model = UserData.addToken({});
    GigyaService.getBadges(model).then(function(data) {
      var arr, badgeId, currentTime, len, list, listBadges, page, startTime, strTimeEnd, timeEnd, timer;
      if ((data.type != null) && data.type.trim() === 'ERROR') {
        return showBadge(0);
      }
      len = data.badges.length;
      if (len <= 0) {
        return showBadge(0);
      }
      mconsole.log('getBadges', data);
      if (data['current-time'] != null) {
        arr = data['current-time'];
        arr = arr.split(/[- :]/);
        currentTime = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
      }
      if (data['start-time'] != null) {
        arr = data['start-time'];
        arr = arr.split(/[- :]/);
        startTime = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
      }
      if ((currentTime != null) && (startTime != null)) {
        listBadges = data.badges;
        list = addList(listBadges, currentTime);
        if (list.length <= 0) {
          return showBadge(0);
        }
        list.sort(Utils.sortDateListASC);
        timeEnd = list[0];
        strTimeEnd = Utils.dateToString(timeEnd);
        badgeId = getBadgeId(listBadges, strTimeEnd);
        getBadge(badgeId, startTime, currentTime, timeEnd);
        page = '/landing-page';
        if ($location.path().trim() === page) {
          timer = Settings.timer.getBadges;
          return setTimeout(badges, timer);
        }
      }
    }, function(err) {
      return showBadge(0);
    });
  };
  getCompareProduct = function() {
    var model;
    model = UserData.addToken({});
    return ProductService.getUserProduct(model).then(function(data) {
      if (data['product-from-signup'] != null) {
        $scope.showReminder = true;
      } else {
        $scope.showReminder = false;
      }
    }, function(err) {});
  };
  getNextMotivation = function(i) {
    var model;
    model = UserData.addToken({});
    model['motivation-path'] = $scope.Items[i].path;
    LandingService.getNextMotivation(model).then(function(data) {
      return mconsole.log('Success get next');
    }, function(err) {
      mconsole.log('Fail get next');
    });
  };
  $rootScope.$on('angular-carousel-end-motivation', function(m, index) {
    var landing;
    path = $location.url();
    landing = '/landing-page';
    if (landing.indexOf(path) !== -1) {
      getNextMotivation(index);
      if (index === $rootScope.inCarousel) {
        return $timeout(function() {
          return $location.url('/landing-page/motivation-gallery');
        }, 100);
      }
    }
  });
  checkProductReminder = function() {
    if (localStorageService.get('hasProduct') === 'true') {
      $scope.productRemind = true;
    } else {
      $scope.productRemind = false;
    }
  };
  $scope.slipUpClicked = function() {
    return $scope.notiSlipUp = true;
  };
  isRequesting = false;
  notiWelcomeBack = function() {
    if ($rootScope.isWelcomeBack) {
      $rootScope.isWelcomeBack = null;
      return $scope.notiWelcomeBack = true;
    }
  };
  leaveTeam = function() {
    var model;
    model = UserData.addToken({});
    QuitTeamService.leaveTeam(model).then(function(data) {
      localStorageService.set('hasJoinedATeam', 'false');
    }, function(err) {
      Device.alert(err.message, null, 'Error', 'Done');
    });
  };
  startJourney = function() {
    var model;
    if (isRequesting) {
      return;
    }
    isRequesting = true;
    Utils.showLoading();
    model = UserData.addToken({});
    return QuitPointService.restartJourney(model).then(function(data) {
      mconsole.log('restartJourney', data);
      if (data.type === 'SUCCESS') {
        localStorageService.set('isJourneyStarted', 'false');
        leaveTeam();
      } else {
        Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
      }
      isRequesting = false;
      return Utils.hideLoading();
    }, function(err) {
      Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
      isRequesting = false;
      return Utils.hideLoading();
    });
  };
  $scope.startFresh = function() {
    mconsole.log('startFresh');
    return startJourney();
  };
  leadFromAddSlip = function() {
    if ($rootScope.isAddSlip === true) {
      $rootScope.isAddSlip = null;
      return $scope.notiSlipUp = true;
    }
  };
  $rootScope.$$listeners['add-slip-on-clicked'] = [];
  $rootScope.$on('add-slip-on-clicked', function() {
    leadFromAddSlip();
    return $timeout(function() {
      return $('#nav-overview').trigger('click');
    }, 800);
  });
  init = function() {
    autoShowOverlayChallenge();
    autoShowOverlayRateApp();
    leadFromAddSlip();
    getCompareProduct();
    requestingMotivation();
    badges();
    checkProductReminder();
    notiWelcomeBack();
  };
  init();
});

//# sourceMappingURL=index.js.map

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

'use strict';
angular.module('site.main', []).controller('sidebarLeftCtrl', function($scope) {
  var sbLeft, sbNotification;
  sbNotification = $('.sidebar-notification');
  sbLeft = $('.sidebar-left');
  sbNotification.hide('fast');
  $scope.navToNotification = function() {
    sbNotification.show('fast');
    sbLeft.hide('fast');
  };
  $scope.navToSidebarLeft = function() {
    sbLeft.show('fast');
    sbNotification.hide('fast');
  };
}).controller('mainCtrl', function($http, Keys, $scope, $rootScope, $window, $location, $timeout, $route, ContentService, Utils, UserData, Pages, Snapper, OverlayService, localStorageService, Environment, AccountService, Settings, LocalNotificationService, CONSTANTS) {
  var backToHistory, closeLeft, defaultHeader, getAppSetting, getUserProfile, hideLoading, initWeekdays, localNotificationOnClick, model, setInformIntro, showLoading, slideLeft, snapperOnClosed, toDateModel;
  $scope.appVersion = 'Version: ' + CONSTANTS.VERSION_NUMBER;
  $scope.appEnvironment = 'Environment: ' + CONSTANTS.ENVIRONMENT;
  mconsole.log('mainCtrl');
  $scope.l10n = l10n;
  $('body').css('min-height', $(window).height());
  getAppSetting = function() {
    var model;
    model = {
      version: '0.41'
    };
    ContentService.getSettings(model).then(function(data) {
      var d;
      if (!data['app-content']) {
        return;
      }
      d = JSON.parse(JSON.stringify(eval('(' + data['app-content'] + ')')));
      SERVICE.settings = d.settings;
      SERVICE.l10n = d.contents;
      SERVICE.badges = d.badges;
      SERVICE.pages = d.pages;
    }, function(err) {
      mconsole.log('err', err);
    });
  };
  getAppSetting();
  if (Environment.isDev()) {
    localStorageService.clearAll();
  }
  if (localStorageService.get(Keys.isntFirstUser)) {
    $location.path('/login');
  } else {
    $location.path('/tour');
  }
  if (!($rootScope.header != null)) {
    $rootScope.header = {};
  }
  $scope.slide = 'slide-left';
  $('.snap-drawers').show('fast');
  $rootScope.setsSrollPos = false;
  $rootScope.disableRotate = false;
  $rootScope.disableRotateStatus = true;
  defaultHeader = {
    pageTitle: Pages.main.title,
    leftIcon: 'icon-back',
    rightIcon: ''
  };
  $rootScope.$watch('header', function() {
    var header;
    mconsole.log('header changed', $rootScope.header);
    header = $rootScope.header;
    $scope.model = {
      containerClass: header.containerClass || 'default-header',
      pageTitle: header.pageTitle || defaultHeader.pageTitle,
      leftIcon: header.leftIcon || defaultHeader.leftIcon,
      rightIcon: header.rightIcon || defaultHeader.rightIcon,
      hideLeftIcon: header.hideLeftIcon || false
    };
    return mconsole.log('model', $scope.model);
  });
  $rootScope.$watch('slideAnimation', function() {
    $scope.slide = $rootScope.slideAnimation || 'slide-left';
    return mconsole.log('slideAnimation', $scope.slide);
  });
  $scope.weekdays = [];
  toDateModel = function(d) {
    var data;
    data = {
      dayOfWeek: d.format('dddd'),
      dayOfMonth: d.format('D'),
      month: d.format('MMMM')
    };
    switch (data.dayOfMonth) {
      case '1':
      case '21':
      case '31':
        data.dateInOrder = data.dayOfMonth + 'st';
        break;
      case '2':
      case '22':
        data.dateInOrder = data.dayOfMonth + 'nd';
        break;
      case '3':
      case '23':
        data.dateInOrder = data.dayOfMonth + 'rd';
        break;
      default:
        data.dateInOrder = data.dayOfMonth + 'th';
    }
    return data;
  };
  initWeekdays = function() {
    var currentDate, i, _i, _len, _ref, _results;
    currentDate = moment();
    _ref = [0, 1, 2, 3, 4, 5, 6];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      $scope.weekdays.push(toDateModel(currentDate));
      _results.push(currentDate.add('days', 1));
    }
    return _results;
  };
  initWeekdays();
  snapperOnClosed = function() {
    return $timeout(function() {
      return Snapper.close('left');
    }, 500);
  };
  slideLeft = function() {
    $scope.slide = 'slide-left';
  };
  backToHistory = function() {
    var location;
    mconsole.log('backToHistory');
    location = $location.path();
    switch (location) {
      case '/account-settings':
        $rootScope.leadFromAccountSetting = true;
        $location.path('/landing-page');
        return Snapper.open('left');
      default:
        $scope.slide = 'slide-right';
        $window.history.back();
        return $window.setTimeout(slideLeft, 650);
    }
  };
  closeLeft = function() {
    return $timeout(function() {
      return Snapper.close('left');
    }, 500);
  };
  showLoading = function() {
    return $('body').addClass('processing');
  };
  hideLoading = function() {
    $('body').removeClass('processing');
    return Snapper.close('left');
  };
  $scope.left = function() {
    mconsole.log('main.left()', $scope.header);
    if ($rootScope.header.leftMethod != null) {
      $rootScope.header.leftMethod();
    } else {
      backToHistory();
    }
  };
  $scope.right = function() {
    mconsole.log('$scope.right');
    if ($rootScope.header.rightMethod != null) {
      $rootScope.header.rightMethod();
    } else {
      mconsole.log('right clicked');
    }
  };
  $scope.nav = function(path) {
    mconsole.log('mainCtrl nav', $scope.slide);
    $location.path(path);
    Snapper.close('left');
  };
  $scope.navFromLeft = function(path) {
    if (path === $location.path()) {
      Snapper.close('left');
    } else {
      mconsole.log('mainCtrl nav');
      $rootScope.leadBy = 'sidebar-left';
      $location.path(path);
      closeLeft();
    }
  };
  $scope.navFromRight = function(path, item) {
    $scope.slide = 'slide-right';
    mconsole.log('navFromRight', path, item);
    $location.path(path);
    $rootScope.timelineModel = {
      selectedDate: item
    };
    closeLeft();
  };
  $scope.navToDistractionGame = function() {
    var gameScreen;
    gameScreen = window.open('games/game-1/index.html', '_blank', 'location=no,clearcache=no,clearsessioncache=no,toolbarposition=top');
    Snapper.close('left');
    if ($location.path() !== '/landing-page') {
      $timeout(function() {
        return $location.path('/landing-page');
      }, 200);
    }
  };
  $scope.navToQuitteam = function() {
    mconsole.log('navToQuitteam', $location.path());
    if ($location.path() === '/quitteam/team-landing-2') {
      Snapper.close('left');
      return;
    }
    if ($location.path() === '/quitteam') {
      Snapper.close('left');
      return;
    }
    if (localStorageService.get('hasJoinedATeam') === 'true') {
      mconsole.log('team-landing-2');
      $rootScope.leadBy = 'sidebar-left';
      $location.path('/quitteam/team-landing-2');
    } else {
      mconsole.log('quitteam');
      $location.path('/quitteam');
    }
    closeLeft();
  };
  $scope.closeSidebarRight = function() {
    mconsole.log('closeSidebarRight');
    return Snapper.close('right');
  };
  $scope.addSlipOnClick = function() {
    $rootScope.isAddSlip = true;
    console.log('addSlipOnClick', $rootScope.isAddSlip);
    if ($location.path() === '/landing-page') {
      $rootScope.$broadcast('add-slip-on-clicked');
    } else {
      $location.path('/landing-page');
    }
    return snapperOnClosed();
  };
  $scope.threeMustStep = function() {
    var link;
    link = {
      tour: '/tour',
      landing: '/landing-page',
      signIn: '/login',
      quitpoint: '/quitpoint'
    };
    if (localStorageService.get('justSignUp') === 'true') {
      localStorageService.set('justSignUp', false);
      if (UserData.getTour()) {
        if (localStorageService.get('theJourneyHasStarted') === 'true') {
          $location.path(link.landing);
          return $rootScope.$broadcast('splash-screen-has-finished');
        } else {
          return $location.path(link.quitpoint);
        }
      } else {
        return $location.path(link.tour);
      }
    } else {
      return $location.path(link.signIn);
    }
  };
  $scope.$on('$routeChangeStart', function(event, next, current) {
    if ((current != null) && (current.$$route != null)) {
      return $rootScope.previousPath = current.$$route.originalPath || 'null';
    } else {
      return $rootScope.previousPath = 'null';
    }
  });
  $scope.$on('$locationChangeSuccess', function() {
    $('#inner').removeClass('show-popup');
    mconsole.log('$locationChangeSuccess', $location.path());
  });
  model = UserData.addToken({});
  setInformIntro = function(data) {
    if (data['profile-avatar']) {
      $scope.avatar = data['profile-avatar'] || 'images/transparent.png';
    } else {
      $scope.avatar = 'avatar-empty.png';
    }
    $scope.nameUser = data.name;
    $scope.totalDays = data['user-total-days'];
    $scope.badges = data['user-total-badges'];
    return $scope.quitpoint = data['user-total-points'];
  };
  getUserProfile = function() {
    model = UserData.addToken({});
    return AccountService.viewAccountSetting(model).then(function(data) {
      var USER;
      setInformIntro(data);
      UserData.setProfile(data);
      if (!$rootScope.USER) {
        $rootScope.USER = {};
      }
      $rootScope.USER = USER = _.assign($rootScope.USER, data);
      $rootScope.userId = data['user-id'];
      USER.userName = localStorageService.get('userName');
    }, function(err) {});
  };
  getUserProfile();
  $rootScope.$on('profile-updated', function(e, data) {
    getUserProfile();
  });
  $rootScope.$on('signIn-broad', function() {
    model = UserData.addToken({});
    return AccountService.viewAccountSetting(model).then(function(data) {
      setInformIntro(data);
    }, function(err) {});
  });
  localNotificationOnClick = function() {
    LocalNotificationService.onClickNotification(Settings.notification.startJourney.id);
    LocalNotificationService.onClickNotification(Settings.notification.recap.id);
    LocalNotificationService.onClickNotification(Settings.notification.reasonToQuit.id);
    LocalNotificationService.onClickNotification(Settings.notification.sundayChallenge.id);
    return LocalNotificationService.onClickNotification(Settings.notification.product.id);
  };
  if (localStorageService.get('rememberMe') === null) {
    localStorageService.remove('accessToken');
    localNotificationOnClick();
  } else {
    localNotificationOnClick();
  }
  $rootScope.$on('notification-on-click', function(e, path) {
    $location.path(path);
    return localNotificationOnClick();
  });
  Snapper.on('open', function() {
    getUserProfile();
  });
});

//# sourceMappingURL=index.js.map

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

'use strict';
angular.module('site.quitpoint', []).config(function($routeProvider) {
  return $routeProvider.when('/quitpoint', {
    controller: 'quitPointIndexCtrl',
    templateUrl: 'views/quitpoint/index.jade'
  });
}).controller('quitPointIndexCtrl', function(QuitPointService, $scope, $rootScope, $location, Utils, UserData, BadgeService, GigyaService, Pages, Snapper, $route, Settings, LocalNotificationService, localStorageService, AccountService, Device, LocalPushService) {
  var addBadgeStartJourney, addStartJourneyNotification, cancelNotification, isRequesting, updateButtonStatus, updateStartJourneyRemindTime;
  console.log('quitPointIndexCtrl');
  $('#nav-quit-team').trigger('click');
  localStorageService.set('theJourneyHasStarted', true);
  $('#nav-your-quitpoint').trigger('click');
  $scope.startTime = null;
  Snapper.disable();
  $('#reminder_select').on('change', function() {
    $scope.startTime = this.value;
    console.log($scope.startTime);
  });
  $rootScope.header = {
    containerClass: 'landing-page startq-page',
    pageTitle: Pages.quitPointIndex.title,
    leftIcon: 'icon-menu',
    rightIcon: 'icon-badge-white'
  };
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('.add-media.take-photo').addClass('active');
    } else {
      return $('.add-media.take-photo').removeClass('active');
    }
  };
  updateButtonStatus($scope.startTime);
  $scope.$watch('startTime', function() {
    return updateButtonStatus($scope.startTime);
  });
  addBadgeStartJourney = function(callback) {
    mconsole.log('addBadgeStartJourney');
    return BadgeService.addAction('action1_ignitionswitch').then(function(data) {
      $rootScope.$broadcast('profile-updated');
      console.log('DONE', data);
      if (callback != null) {
        return callback();
      }
    }, function(err) {
      return console.log('ERR', err);
    });
  };
  addStartJourneyNotification = function() {
    var dateFromNow, dateRemind, getNoti, id, message, options, path, second, title;
    getNoti = Settings.notification.startJourney;
    id = getNoti.id;
    message = getNoti.message;
    title = getNoti.title;
    path = getNoti.path;
    dateFromNow = parseInt($scope.startTime);
    second = dateFromNow * 24 * 60 * 60;
    dateRemind = Utils.dateRemind(second);
    options = {
      id: id,
      title: title,
      message: message,
      date: dateRemind,
      autoCancel: true
    };
    LocalNotificationService.addNotification(id, options);
    return LocalNotificationService.onClickNotification(id);
  };
  updateStartJourneyRemindTime = function(timeIn) {
    var model;
    model = UserData.addToken({});
    model['hour'] = timeIn;
    model['app-reference'] = '//b';
    mconsole.log(model);
    AccountService.postRemindStartJourney(model).then(function(data) {
      mconsole.log('update success', data);
    }, function(err) {
      return mconsole.log('fail update', err);
    });
  };
  cancelNotification = function() {
    var id;
    id = Settings.notification.startJourney.id;
    return LocalNotificationService.cancelNotification(id);
  };
  $scope.next = function() {
    if (!($scope.startTime != null)) {
      return;
    }
    $scope.notiReminder = true;
    updateStartJourneyRemindTime($scope.startTime);
    return addStartJourneyNotification();
  };
  isRequesting = false;
  $scope.startJourney = function() {
    var model;
    if (isRequesting) {
      return;
    }
    localStorageService.set('isJourneyStarted', true);
    Utils.showLoading();
    cancelNotification();
    isRequesting = true;
    model = UserData.addToken({});
    QuitPointService.startJourney(model).then(function(data) {
      console.log('data', data);
      if (data.type === 'SUCCESS') {
        $rootScope.badge = {
          action: 'action1_ignitionswitch',
          back: '/landing-page',
          hasBadge: true
        };
        addBadgeStartJourney(function() {
          Utils.hideLoading();
          Utils.preloadData();
          mconsole.log('after addBadgeStartJourney');
          return $location.path('/quitpoint/courage');
        });
      } else {
        Device.alert(data.message, null, 'Error', 'Done');
      }
      return isRequesting = false;
    }, function(err) {
      console.log('err', err);
      Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
      return isRequesting = false;
    });
  };
});

//# sourceMappingURL=index.js.map

'use strict';
angular.module('site.quitteam', []).config(function($routeProvider) {
  return $routeProvider.when('/quitteam', {
    controller: 'quitteamIndexCtrl',
    templateUrl: 'views/quitteam/index.jade'
  });
}).controller('quitteamIndexCtrl', function(AccountService, $scope, $rootScope, $location, Utils, Device, BadgeService, Pages, localStorageService, Snapper, QuitTeamService, UserData) {
  var flage, joinAQuitteam, preloadViewteamData;
  console.log('quitteamIndexCtrl');
  $('#nav-quit-team').trigger('click');
  Snapper.enable();
  $rootScope.header = {
    pageTitle: Pages.quitteamIndex.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle,
    containerClass: 'join-team-page'
  };
  $scope.cheer = 'Good Work!';
  preloadViewteamData = function() {
    var model;
    model = UserData.addToken({});
    return AccountService.viewTeam(model);
  };
  joinAQuitteam = function() {
    $rootScope.badge = {
      action: 'action5_joinedquitteam',
      back: '/quitteam/team-landing-2'
    };
    return $location.path('/quitpoint/courage');
  };
  flage = true;
  return $scope.joinTeam = function() {
    var model;
    if (flage) {
      Utils.showLoading();
      flage = false;
      model = UserData.addToken({});
      QuitTeamService.joinTeam(model).then(function(data) {
        mconsole.log('QuitTeamService.joinTeam', data);
        flage = true;
        localStorageService.set('hasJoinedATeam', 'true');
        joinAQuitteam();
        Utils.preloadData();
        return Utils.hideLoading();
      }, function(err) {
        flage = true;
        Device.alert('Join team fail. The server have some problem', null, 'Message', 'Done');
        console.log('Join team fail');
        return Utils.hideLoading();
      });
    }
  };
});

//# sourceMappingURL=index.js.map

'use strict';
angular.module('site.reason', []).config(function($routeProvider) {
  return $routeProvider.when('/reason', {
    controller: 'reasonIndexCtrl',
    templateUrl: 'views/reason/index.jade',
    resolve: resolve
  });
}).controller('reasonIndexCtrl', function($scope, $sce, $rootScope, $location, $timeout, UserData, Pages, Settings, Snapper, localStorageService, LocalNotificationService) {
  var cancelNotification, localReason, slipUpCount, userName;
  console.log('reasonIndexCtrl');
  Snapper.enable();
  Snapper.close('left');
  $rootScope.header = {
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle,
    pageTitle: Pages.reasonToQuit.title
  };
  userName = localStorageService.get('userName');
  localReason = Settings.localStorage.name.reasonToQuit;
  slipUpCount = Settings.localStorage.name.slipUpCount;
  if (localStorageService.get(slipUpCount) != null) {
    localStorageService.remove(slipUpCount);
  }
  cancelNotification = function() {
    var id;
    id = Settings.notification.reasonToQuit.id;
    return LocalNotificationService.cancelNotification(id);
  };
  cancelNotification();
  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };
  $scope.movie = {
    src: localStorageService.get(localReason.video + userName)
  };
  $scope.reasonToQuit = {
    memo: localStorageService.get(localReason.memo + userName),
    photo: localStorageService.get(localReason.photo + userName),
    audio: localStorageService.get(localReason.audio + userName)
  };
  if (localStorageService.get('openPage') === 'openReasonToQuit') {
    return localStorageService.remove(openPage);
  }
});

//# sourceMappingURL=index.js.map

'use strict';
angular.module('site.recap', []).config(function($routeProvider) {
  return $routeProvider.when('/recap', {
    controller: 'recapIndexCtrl',
    templateUrl: 'views/recap/index.jade'
  });
}).controller('recapIndexCtrl', function($scope, $rootScope, Pages, $location, UserData, Utils, Settings, localStorageService, Snapper, LocalNotificationService) {
  var cancelNotification, setPage;
  console.log('recapIndexCtrl');
  Snapper.disable();
  Snapper.close('left');
  $rootScope.header = {
    pageTitle: Pages.recapIndex.title,
    hideLeftIcon: true
  };
  setPage = function() {
    var totalBadges, userProfile;
    userProfile = UserData.getProfile();
    console.log(userProfile['user-total-badges']);
    if (userProfile['user-total-badges'] != null) {
      totalBadges = userProfile['user-total-badges'];
      if (totalBadges === 0) {
        return $location.path('/landing-page/slip-up-badge');
      } else {
        return $location.path('/quitpoint/courage');
      }
    }
  };
  cancelNotification = function() {
    var id;
    id = Settings.notification.recap.id;
    return LocalNotificationService.cancelNotification(id);
  };
  cancelNotification();
  $scope.yes = function() {
    return $location.path('/landing-page/slip-up-badge');
  };
  return $scope.no = function() {
    return $scope.notiGreat = true;
  };
});

//# sourceMappingURL=index.js.map

'use strict';
angular.module('site.signup', []).config(function($routeProvider) {
  return $routeProvider.when('/signup', {
    controller: 'signupIndexCtrl',
    templateUrl: 'views/signup/index.jade',
    resolve: resolve
  });
}).controller('signupIndexCtrl', function($scope, $rootScope, $location, Utils, Pages, Snapper, FacebookService) {
  var AlertError, attr1, attr2, atts0, checkOtherInfo, credential, enableDymamicValidation, err, isSubmitted, isValid, isValid1, updateStatusOfButton, validation;
  mconsole.log('signupIndexCtrl');
  isSubmitted = false;
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.signupIndex.title
  };
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.credential = credential = $rootScope.signUpModel.credential || {};
  $scope.err = err = {};
  if ($rootScope.signUpModel.credential != null) {
    isSubmitted = true;
  }
  atts0 = ['securityQuestion', 'securityAnswer'];
  attr1 = ['confirmPass', 'password', 'fullName', 'email', 'userName'];
  attr2 = ['password', 'fullName', 'email', 'userName'];
  isValid = {
    confirmPass: function() {
      return (credential.confirmPass != null) && (credential.confirmPass === credential.password);
    },
    password: function() {
      return (credential.password != null) && Utils.isValidPassword(credential.password);
    },
    fullName: function() {
      return (credential.fullName != null) && Utils.isValidFullName(credential.fullName);
    },
    userName: function() {
      return (credential.userName != null) && Utils.isValidUserName(credential.userName);
    },
    email: function() {
      return (credential.email != null) && Utils.isValidEmail(credential.email);
    }
  };
  validation = function() {
    var item, _i, _len;
    for (_i = 0, _len = atts0.length; _i < _len; _i++) {
      item = atts0[_i];
      err[item] = $scope['signupform'][item].$invalid;
    }
  };
  enableDymamicValidation = function() {
    var item, watch1, watch2, _i, _j, _len, _len1;
    mconsole.log('enableDymamicValidation');
    watch1 = function(item) {
      return $scope.$watch('signupform.' + item + '.$valid', function() {
        return err[item] = $scope['signupform'][item].$invalid;
      });
    };
    watch2 = function(item) {
      return err[item] = !isValid[item]();
    };
    for (_i = 0, _len = atts0.length; _i < _len; _i++) {
      item = atts0[_i];
      watch1(item);
    }
    for (_j = 0, _len1 = attr2.length; _j < _len1; _j++) {
      item = attr2[_j];
      watch2(item);
    }
  };
  checkOtherInfo = function() {
    var item, re, _i, _len;
    re = true;
    for (_i = 0, _len = attr1.length; _i < _len; _i++) {
      item = attr1[_i];
      re = re && isValid[item]();
    }
    return re;
  };
  isValid1 = function() {
    if ($scope['signupform'].$valid && checkOtherInfo()) {
      return true;
    } else {
      return false;
    }
  };
  updateStatusOfButton = function() {
    if (($scope['signupform'].$valid && !isSubmitted) || isValid1()) {
      return $('.btn.btn-2').addClass('active');
    } else {
      return $('.btn.btn-2').removeClass('active');
    }
  };
  AlertError = {
    confirmPass: function() {
      if (isValid.confirmPass()) {
        err['confirmPass'] = false;
      } else {
        err['confirmPass'] = true;
      }
      return updateStatusOfButton();
    },
    password: function() {
      if (isValid.password()) {
        err['password'] = false;
      } else {
        err['password'] = true;
        AlertError.confirmPass();
      }
      return updateStatusOfButton();
    },
    userName: function() {
      if (isValid.userName()) {
        err['userName'] = false;
      } else {
        err['userName'] = true;
      }
      return updateStatusOfButton();
    },
    fullName: function() {
      if (isValid.fullName()) {
        err['fullName'] = false;
      } else {
        err['fullName'] = true;
      }
      return updateStatusOfButton();
    },
    email: function() {
      if (isValid.email()) {
        err['email'] = false;
      } else {
        err['email'] = true;
      }
      return updateStatusOfButton();
    }
  };
  $scope.$watch('signupform.$valid', function() {
    mconsole.log('signupform', $scope.signupform);
    return updateStatusOfButton();
  });
  $scope.$watch('credential.confirmPass', function() {
    if (isSubmitted) {
      return AlertError.confirmPass();
    }
  });
  $scope.$watch('credential.password', function() {
    if (isSubmitted) {
      AlertError.password();
      return AlertError.confirmPass();
    }
  });
  $scope.$watch('credential.fullName', function() {
    if (isSubmitted) {
      return AlertError.fullName();
    }
  });
  $scope.$watch('credential.email', function() {
    if (isSubmitted) {
      return AlertError.email();
    }
  });
  $scope.$watch('credential.userName', function() {
    if (isSubmitted) {
      return AlertError.userName();
    }
  });
  $scope.next = function() {
    if (isValid1()) {
      $rootScope.signUpModel.credential = $scope.credential;
      if ($rootScope.leadTo != null) {
        $rootScope.isValidSignupModel = true;
        $location.path($rootScope.leadTo);
        $rootScope.leadTo = null;
      } else {
        $location.path('signup/age');
      }
    } else {
      $scope.isSubmitted = isSubmitted = true;
      enableDymamicValidation();
      if ((isValid.password() && !credential.confirmPass) || ((credential.confirmPass != null) && credential.confirmPass !== credential.password)) {
        err['confirmPass'] = true;
      }
    }
  };
});

//# sourceMappingURL=index.js.map

'use strict';
angular.module('site.template', []).config(function($routeProvider) {
  return $routeProvider.when('/template', {
    controller: 'templateIndexCtrl',
    templateUrl: 'views/template/index.jade'
  });
}).controller('templateIndexCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('templateIndexCtrl');
  Snapper.disable();
  return $rootScope.header = {
    pageTitle: Pages.templateIndex.title
  };
});

//# sourceMappingURL=index.js.map

'use strict';
angular.module('site.test', []).config(function($routeProvider) {
  return $routeProvider.when('/test/api', {
    controller: 'testApiCtrl',
    templateUrl: 'views/test/index.jade'
  });
}).controller('testApiCtrl', function($scope, $rootScope, UserData, AccountService, FeedbackService, LandingService, ProductService, QuitPointService, QuitTeamService) {
  var functions, start;
  gsk.log('testApiCtrl', 'arg2');
  $rootScope.header = {
    pageTitle: 'Test API'
  };
  functions = {};
  functions.signIn = function() {
    var model;
    model = {
      email: "test@sutrixmedia.com",
      password: "123456",
      "remember-me": true,
      'device': {
        'uid': localStorage.getItem('deviceUID'),
        'token': localStorage.getItem('deviceToken'),
        'os': localStorage.getItem('deviceOS')
      }
    };
    return AccountService.signIn(model).then(function(data) {
      gsk.log('AccountService.signIn');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.signIn');
      return gsk.log('err', err);
    });
  };
  functions.signUp = function() {
    var model;
    model = {
      name: "test",
      email: "test@sutrixmedia.com",
      password: "123456",
      age: "19",
      gender: "MALE",
      country: "VN",
      "progress-update-time": {
        type: "DAILY",
        time: "12:00:00"
      },
      avatar: "",
      language: "12345",
      "app-reference": "",
      "receive-offer": false
    };
    return AccountService.signUp(model).then(function(data) {
      gsk.log('AccountService.signUp');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.signUp');
      return gsk.log('err', err);
    });
  };
  functions.getAccountSetting = function() {
    var model;
    model = UserData.addToken({});
    return AccountService.getAccountSetting(model).then(function(data) {
      gsk.log('AccountService.getAccountSetting');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.getAccountSetting');
      return gsk.log('err', err);
    });
  };
  functions.postAccountSetting = function() {
    var model;
    model = UserData.addToken({});
    return AccountService.postAccountSetting(model).then(function(data) {
      gsk.log('AccountService.postAccountSetting');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.postAccountSetting');
      return gsk.log('err', err);
    });
  };
  functions.viewAccountSetting = function() {
    var model;
    model = UserData.addToken({});
    return AccountService.viewAccountSetting(model).then(function(data) {
      gsk.log('AccountService.viewAccountSetting');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      return gsk.log('err', err);
    });
  };
  functions.updateAccountSetting = function() {
    var model;
    model = {
      email: "test.phuong1234@sutrixmedia.com",
      name: "test",
      age: 19,
      gender: "MALE",
      country: "VN",
      language: "12345",
      "progress-update-time": {
        type: "DAILY",
        time: "12:00:00"
      },
      avartar: "//phuong",
      "app-reference": "phongvan",
      password: "123456"
    };
    model = UserData.addToken(model);
    return AccountService.updateAccountSetting(model).then(function(data) {
      gsk.log('AccountService.updateAccountSetting');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.updateAccountSetting');
      return gsk.log('err', err);
    });
  };
  functions.viewMember = function() {
    var model;
    model = UserData.addToken({});
    return AccountService.viewMember(model).then(function(data) {
      gsk.log('AccountService.viewMember');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.viewMember');
      return gsk.log('err', err);
    });
  };
  functions.viewTeam = function() {
    var model;
    model = UserData.addToken({});
    return AccountService.viewTeam(model).then(function(data) {
      return gsk.log('AccountService.viewTeam');
    }, function(err) {
      gsk.log('AccountService.viewTeam');
      return gsk.log('err', err);
    });
  };
  functions.postActivityToTeam = function() {
    var model;
    model = {
      "customer-id": "1",
      "team-id": "1",
      "activity-type": "cheers",
      "activity-value": "what the fuck",
      "text": "fdsfddsf",
      "cheer-icon": "url path"
    };
    model = UserData.addToken(model);
    return AccountService.postActivityToTeam(model).then(function(data) {
      gsk.log('AccountService.postActivityToTeam');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.postActivityToTeam');
      return gsk.log('err', err);
    });
  };
  functions.postActivityToMember = function() {
    var model;
    model = {
      "customer-id": "1",
      "message-to": "1",
      "activity-type": "cheers",
      "activity-value": "what the fuck",
      "text": "fdsfddsf",
      "cheer-icon": "url path"
    };
    model = UserData.addToken(model);
    return AccountService.postActivityToMember(model).then(function(data) {
      gsk.log('AccountService.postActivityToMember');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.postActivityToMember');
      return gsk.log('err', err);
    });
  };
  functions.getFirstHabit = function() {
    var model;
    model = {
      "first-habit-path": "/content/en_US/habit/habit-1"
    };
    model = UserData.addToken(model);
    return AccountService.getFirstHabit(model).then(function(data) {
      gsk.log('AccountService.getFirstHabit');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.getFirstHabit');
      return gsk.log('err', err);
    });
  };
  functions.getNextHabit = function() {
    var model;
    model = {
      "refer-question": "/content/en_US/habit/habit-2",
      "refer-answer": "/content/en_US/habit/habit-2",
      "answer": "/content/en_US/habit/habit-1/jcr:content/par/habitmessageanswer"
    };
    model = UserData.addToken(model);
    return AccountService.getNextHabit(model).then(function(data) {
      gsk.log('AccountService.getNextHabit');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.getNextHabit');
      return gsk.log('err', err);
    });
  };
  functions.give = function() {
    var model;
    model = {
      "text": "I think it's ok"
    };
    model = UserData.addToken(model);
    return FeedbackService.give(model).then(function(data) {
      gsk.log('FeedbackService.give');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('FeedbackService.give');
      return gsk.log('err', err);
    });
  };
  functions.addSlip = function() {
    var model;
    model = UserData.addToken({});
    return LandingService.addSlip(model).then(function(data) {
      gsk.log('LandingService.addSlip');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('LandingService.addSlip');
      return gsk.log('err', err);
    });
  };
  functions.getMotivation = function() {
    var model;
    model = {
      "motivation-path": "/content/en_US/motivation/motivations"
    };
    model = UserData.addToken(model);
    return LandingService.getMotivation(model).then(function(data) {
      gsk.log('LandingService.getMotivation');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('LandingService.getMotivation');
      return gsk.log('err', err);
    });
  };
  functions.getProduct = function() {
    var model;
    model = {
      "product-path": "/content/en_US/product/patch"
    };
    model = UserData.addToken(model);
    return ProductService.getProduct(model).then(function(data) {
      gsk.log('ProductService.getProduct');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('ProductService.getProduct');
      return gsk.log('err', err);
    });
  };
  functions.createCoupon = function() {
    var model;
    model = UserData.addToken({});
    return QuitPointService.createCoupon(model).then(function(data) {
      gsk.log('QuitPointService.createCoupon');
      gsk.log('model', model);
      return gsk.log('data', data);
    }, function(err) {
      gsk.log('QuitPointService.createCoupon');
      return gsk.log('err', err);
    });
  };
  functions.joinTeam = function() {
    var model;
    model = UserData.addToken({});
    return QuitTeamService.joinTeam(model).then(function(data) {
      gsk.log('QuitTeamService.joinTeam');
      gsk.log('model', model);
      return gsk.log('data', data);
    }, function(err) {
      gsk.log('QuitTeamService.joinTeam');
      return gsk.log('err', err);
    });
  };
  functions.leaveTeam = function() {
    var model;
    model = UserData.addToken({});
    return QuitTeamService.leaveTeam(model).then(function(data) {
      gsk.log('QuitTeamService.leaveTeam');
      gsk.log('model', model);
      return gsk.log('data', data);
    }, function(err) {
      gsk.log('QuitTeamService.leaveTeam');
      return gsk.log('err', err);
    });
  };
  start = function() {
    var item, _results;
    _results = [];
    for (item in functions) {
      _results.push(functions[item]());
    }
    return _results;
  };
  start();
  return $scope.start = function() {
    gsk.log('----------------$scope.start----------------');
    return start();
  };
});

//# sourceMappingURL=index.js.map

'use strict';
angular.module('site.timeline', []).config(function($routeProvider) {
  return $routeProvider.when('/timeline', {
    controller: 'timelineIndexCtrl',
    templateUrl: 'views/timeline/index.jade'
  });
}).controller('timelineIndexCtrl', function(localStorageService, BadgeService, Environment, UserData, GigyaService, $scope, $rootScope, $location, $timeout, Device, Utils, Pages, Settings, Snapper, OverlayService, AccountService, CONSTANTS) {
  var animateTo, hideTimeline, intro, introOnFinish, introStep0, introStep1, introStep2, introStep3, introStep4, path, postPersonalChalenge, preloadTimelineData, requestData, showOverlay, showTimeline, snapDrawers, tabTimeline, tempData, timelineLeftMethod, waitingGroup;
  mconsole.log('timelineIndexCtrl');
  $rootScope.isOverlayShowing = false;
  timelineLeftMethod = function() {
    Snapper.enable();
    return Snapper.hamburgerToggle();
  };
  preloadTimelineData = function() {
    var endDate, model, startDate;
    if (localStorageService.get('dateJourney') != null) {
      startDate = moment(localStorageService.get('dateJourney'), 'YYYY-MM-DD HH:mm:ss');
    } else {
      startDate = moment();
    }
    endDate = moment().add('months', 6);
    model = {
      'start-date': startDate.format('YYYY-MM-DD'),
      'end-date': endDate.format('YYYY-MM-DD')
    };
    model = UserData.addToken(model);
    return BadgeService.getTimeline(model);
  };
  Snapper.on('close', function() {
    if ($location.path() === '/timeline') {
      Snapper.disable();
    }
    return console.log('Snapper closed');
  });
  if ($rootScope.leadBy === 'sidebar-left') {
    Snapper.disable();
    $rootScope.header = {
      pageTitle: Pages.timelineIndex.title,
      containerClass: 'timeline',
      leftIcon: 'icon-menu',
      leftMethod: timelineLeftMethod
    };
    $rootScope.leadBy = null;
  } else {
    Snapper.disable();
    $rootScope.header = {
      pageTitle: 'Timeline',
      containerClass: 'timeline'
    };
  }
  $scope.tempData = tempData = {};
  tempData.list = ['views/timeline/timeline-month.jade', 'views/timeline/timeline-year.jade'];
  tempData.index = 0;
  $scope.currentTemplate = tempData.list[tempData.index];
  $rootScope.personalChallenges = {
    list: null,
    data: null
  };
  AccountService.getPersonalChallenges({}).then(function(data) {
    return $rootScope.personalChallenges.list = data.data;
  });
  $scope.getChallengesTab = function(name) {
    return 'tab-' + name.toLowerCase();
  };
  $scope.setPersonalChallengeDate = function(time, selectedDate) {
    var date;
    switch (time) {
      case 'morning':
        date = selectedDate.format('YYYY-MM-DD') + ' 07:00:00';
        break;
      case 'noon':
        date = selectedDate.format('YYYY-MM-DD') + ' 12:00:00';
        break;
      case 'afternoon':
        date = selectedDate.format('YYYY-MM-DD') + ' 16:00:00';
        break;
      case 'evening':
        date = selectedDate.format('YYYY-MM-DD') + ' 19:00:00';
    }
    return $rootScope.personalChallenges.data.date = date;
  };
  postPersonalChalenge = function(selectedDate) {
    var payload, request;
    request = $rootScope.personalChallenges.data;
    request.date = $scope.setPersonalChallengeDate(request.date, selectedDate);
    request.id = parseInt(request.id, 10);
    payload = {
      'date': request.date,
      'category-id': request.id
    };
    payload = UserData.addToken(payload);
    return AccountService.postPersonalChallenges(payload).then(function(data) {
      $rootScope.personalChallenges.data = null;
      $('.add-badge.active').removeClass('active');
      return preloadTimelineData();
    });
  };
  $scope.setPersonalChallenge = function(challenge) {
    var model;
    $rootScope.personalChallenges.data.id = challenge.id;
    model = {
      'action': challenge.action
    };
    model = UserData.addToken(model);
    return BadgeService.getDetailBadge(model).then(function(data) {
      return $rootScope.personalChallenges.data.badge = data;
    });
  };
  $scope.$on('create-a-challenge', function(e, selectedDate) {
    mconsole.log('create-a-challenge', selectedDate);
    return postPersonalChalenge(selectedDate);
  });
  waitingGroup = $('[data-group="waiting"]');
  hideTimeline = function() {
    mconsole.log('hideTimeline');
    return waitingGroup.addClass('hidden');
  };
  hideTimeline();
  showTimeline = function() {
    mconsole.log('showTimeline');
    return waitingGroup.removeClass('hidden');
  };
  Utils.showLoading();
  requestData = function() {
    var endDate, model, startDate;
    if (localStorageService.get('dateJourney') != null) {
      startDate = moment(localStorageService.get('dateJourney'), 'YYYY-MM-DD HH:mm:ss');
    } else {
      startDate = moment();
    }
    endDate = moment().add('months', 6);
    model = {
      'start-date': startDate.format('YYYY-MM-DD'),
      'end-date': endDate.format('YYYY-MM-DD')
    };
    model = UserData.addToken(model);
    return BadgeService.getTimeline(model).then(function(data) {
      mconsole.log('BadgeService.getTimeline', data);
      if ((data.type != null) && data.type === 'ERROR') {
        mconsole.log('getTimeline err', data);
      } else {
        mconsole.log('getTimeline done', data);
        showOverlay();
        showTimeline();
        $rootScope.$broadcast('timeline-data', data);
      }
      return Utils.hideLoading();
    }, function(err) {
      mconsole.log('getTimeline err', err);
      return Utils.hideLoading();
    });
  };
  requestData();

  /* INTROJS */
  path = $location.path();
  intro = introJs();
  intro.setOptions({
    showStepNumbers: false,
    showBullets: false,
    exitOnOverlayClick: false,
    scrollToElement: false
  });
  intro.setOptions({
    steps: Settings.timelineIndexCtrl.intro
  });
  snapDrawers = $('.snap-drawers');
  tabTimeline = $('.tabs-timeline');
  introOnFinish = function() {
    animateTo(0);
    snapDrawers.show('fast');
    OverlayService.setShowed(path);
    $rootScope.$broadcast('overlay-has-finished', true);
    $rootScope.disableRotate = false;
    $rootScope.$broadcast('intro-has-finished', true);
    return $rootScope.isOverlayShowing = false;
  };
  intro.onexit(introOnFinish);
  intro.oncomplete(introOnFinish);
  animateTo = function(top) {
    return $('#main').animate({
      scrollTop: top
    }, 1000);
  };
  introStep0 = function() {
    mconsole.log('introStep0', $('[data-intro-step="0"]'));
    return mconsole.log('this', this);
  };
  introStep1 = function() {
    mconsole.log('introStep1');
    return $('[data-intro-step="0"]').trigger('click');
  };
  introStep2 = function() {
    var offsetTop;
    mconsole.log('introStep2');
    $('[data-intro-follow="step-2"]').trigger('click');
    $('[data-intro-follow="order-2"]').trigger('click');
    $('[data-name="text-clock-message"]').hide();
    tabTimeline.height('+=230px');
    offsetTop = 430;
    if ($('html').hasClass('gte-ios-7')) {
      offsetTop += 40;
    }
    return animateTo(offsetTop);
  };
  introStep3 = function() {
    mconsole.log('introStep3');
    animateTo(0);
    return $timeout(function() {
      $('[data-intro-step="0"]').trigger('click');
      return tabTimeline.height('-=230px');
    }, 500);
  };
  introStep4 = function() {
    return mconsole.log('introStep4');
  };
  intro.onbeforechange(function() {
    switch (this._currentStep) {
      case 0:
        return introStep0();
      case 1:
        return introStep1();
      case 2:
        return introStep2();
      case 3:
        return introStep3();
      case 4:
        return introStep4();
    }
  });
  return showOverlay = function() {
    var helpStatus;
    helpStatus = localStorageService.get('helpStatus') || false;
    if (!helpStatus) {
      return;
    }
    if (OverlayService.isShowed(path) === false) {
      $rootScope.disableRotate = true;
      $rootScope.$broadcast('overlay-started', true);
      $rootScope.isOverlayShowing = true;
      mconsole.log('overlay was shown', $rootScope.isOverlayShowing);
      return $timeout(function() {
        snapDrawers.hide('fast');
        mconsole.log('TIMELINE showOverlay');
        return intro.start();
      }, CONSTANTS.OVERLAYS_TIME);
    }
  };
});

//# sourceMappingURL=index.js.map

'use strict';
angular.module('site.tour', []).config(function($routeProvider) {
  return $routeProvider.when('/tour', {
    controller: 'tourIndexCtrl',
    templateUrl: 'views/tour/index.jade',
    resolve: resolve
  });
}).controller('tourIndexCtrl', function($scope, $rootScope, $location, $timeout, UserData, Pages, Settings, Snapper, Keys, localStorageService) {
  var isMoving;
  console.log('tourIndexCtrl');
  Snapper.disable();
  if (($rootScope.previousPath === '/login') || ($rootScope.previousPath === '/login/login-2')) {
    $rootScope.header = {
      pageTitle: Pages.tourIndex.title
    };
  } else {
    $rootScope.header = {
      hideLeftIcon: true,
      pageTitle: Pages.tourIndex.title,
      containerClass: 'tour'
    };
  }
  $scope.data = Settings.tourIndexCtrl.tourData;
  isMoving = false;
  return $rootScope.$on('angular-carousel-end-at', function(m, index) {
    if (isMoving) {
      return;
    }
    if (index === 7) {
      isMoving = true;
      return $timeout(function() {
        localStorageService.set(Keys.isntFirstUser, true);
        UserData.setTour(true);
        return $scope.threeMustStep();
      }, 20);
    }
  });
});

//# sourceMappingURL=index.js.map

'use strict';
angular.module('site.accountSettings').config(function($routeProvider) {
  return $routeProvider.when('/account-settings/avatar', {
    controller: 'accountChooseAvatarCtrl',
    templateUrl: 'views/account-settings/avatar.jade'
  });
}).controller('accountChooseAvatarCtrl', function(Utils, $scope, $rootScope, $location, $timeout, UserData, ContentService, Pages, Settings, Snapper) {
  var getAvatarList;
  console.log('accountChooseAvatarCtrl');
  Snapper.enable();
  Utils.showLoading();
  $rootScope.header = {
    pageTitle: Pages.accountChooseAvatar.title
  };
  $rootScope.avatar = $rootScope.avatarUser || null;
  getAvatarList = function() {
    var model;
    console.log('getAvatarList');
    model = {
      'type': 'FREE'
    };
    model = UserData.addToken(model);
    return ContentService.getAvatarListAll(model).then(function(data) {
      console.log('avatar list', data);
      $scope.avatarList = data['list-avatars'];
      $timeout(function() {
        var d;
        d = _.find(data['list-avatars'], {
          'small-img-path': $rootScope.avatarUser
        });
        return $scope.character = d.path;
      }, 200);
      return Utils.hideLoading();
    }, function(err) {
      console.log('avatar list error', err);
      return Utils.hideLoading();
    });
  };
  getAvatarList();
  $scope.back = function() {
    var d;
    $location.path('/account-settings');
    $rootScope.avatarPath = $scope.character;
    d = _.find($scope.avatarList, {
      path: $rootScope.avatarPath
    });
    $rootScope.avatar = d['small-img-path'];
  };
});

//# sourceMappingURL=avatar.js.map

'use strict';
angular.module('site.accountSettings').config(function($routeProvider) {
  return $routeProvider.when('/account-settings/leaving-1', {
    controller: 'accountLeavingOneCtrl',
    templateUrl: 'views/account-settings/leaving-1.jade'
  });
}).controller("accountLeavingOneCtrl", function($scope, $rootScope, $location, Device, Pages, Snapper, localStorageService, UserData, QuitTeamService) {
  console.log('accountLeavingOneCtrl');
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.accountLeavingOne.title,
    containerClass: 'leave-quit-page'
  };
  return $scope.leaveTeam = function() {
    var model;
    model = UserData.addToken({});
    QuitTeamService.leaveTeam(model).then(function(data) {
      localStorageService.set('hasJoinedATeam', 'false');
      $location.path('/account-settings/leaving-2');
    }, function(err) {
      Device.alert(err.message, null, 'Error', 'Done');
    });
  };
});

//# sourceMappingURL=leaving-1.js.map

'use strict';
angular.module('site.accountSettings').config(function($routeProvider) {
  return $routeProvider.when('/account-settings/leaving-2', {
    controller: 'accountLeavingTwoCtrl',
    templateUrl: 'views/account-settings/leaving-2.jade'
  });
}).controller('accountLeavingTwoCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('accountLeavingTwoCtrl');
  Snapper.disable();
  return $rootScope.header = {
    pageTitle: Pages.accountLeavingTwo.title,
    containerClass: 'leave-quit-page',
    hideLeftIcon: true
  };
});

//# sourceMappingURL=leaving-2.js.map

'use strict';
angular.module('site.accountSettings').config(function($routeProvider) {
  return $routeProvider.when('/account-settings/leaving-3', {
    controller: 'accountLeavingThreeCtrl',
    templateUrl: 'views/account-settings/leaving-3.jade'
  });
}).controller('accountLeavingThreeCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('accountLeavingThreeCtrl');
  Snapper.disable();
  return $rootScope.header = {
    pageTitle: Pages.accountLeavingThree.title,
    containerClass: 'leave-quit-page leaving-3-page'
  };
});

//# sourceMappingURL=leaving-3.js.map

'use strict';
angular.module('site.feedback', []).config(function($routeProvider) {
  return $routeProvider.when('/feedback', {
    controller: 'feedbackIndexCtrl',
    templateUrl: 'views/feedback/feedback.jade'
  });
}).controller('feedbackIndexCtrl', function($scope, $rootScope, $location, Utils, Device, Pages, Snapper, FeedbackService, UserData, $timeout) {
  var isRequesting, updateButtonStatus;
  mconsole.log('feedbackIndexCtrl');
  $('#nav-give-feedback').trigger('click');
  Snapper.enable();
  $rootScope.header = {
    pageTitle: Pages.feedbackIndex.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle
  };
  $scope.message = null;
  updateButtonStatus = function(status) {
    if ((status != null) && status.length > 0) {
      return $('.btn.btn-2').addClass('active');
    } else {
      return $('.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.message);
  $scope.$watch('message', function() {
    return updateButtonStatus($scope.message);
  });
  isRequesting = false;
  return $scope.submit = function() {
    var model;
    if (isRequesting) {
      return;
    }
    if (!(($scope.message != null) && $scope.message.length > 0)) {
      return;
    }
    model = UserData.addToken({
      text: $scope.message
    });
    isRequesting = true;
    FeedbackService.give(model).then(function(data) {
      if (data.type === 'SUCCESS') {
        $scope.notiFeedback = true;
      } else {
        Device.alert(data.message || 'Cannot send your feedback right now, please try again latter.', null, 'Error', 'Done');
      }
      return isRequesting = false;
    }, function(err) {
      Device.alert('Cannot connect to server.', null, 'Error', 'Done');
      return isRequesting = false;
    });
  };
});

//# sourceMappingURL=feedback.js.map

'use strict';
angular.module('site.feedback').config(function($routeProvider) {
  return $routeProvider.when('/feedback/thank-you', {
    controller: 'feedbackthankCtrl',
    templateUrl: 'views/feedback/thank-you.jade'
  });
}).controller('feedbackthankCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('feedbackthankCtrl');
  Snapper.disable();
  return $rootScope.header = {
    pageTitle: Pages.feedbackthank.title
  };
});

//# sourceMappingURL=thank-you.js.map

'use strict';
angular.module('site.games').config(function($routeProvider) {
  return $routeProvider.when('/games/game-1', {
    controller: 'gamesOneIndexCtrl',
    templateUrl: 'views/games/game-1.jade',
    resolve: resolve
  });
}).controller('gamesOneIndexCtrl', function($scope, $rootScope, $timeout, Snapper) {
  console.log('gamesOneIndexCtrl');
  $rootScope.header = {
    pageTitle: 'Games One'
  };
  return window.open('games/game-1/index.html', '_blank', 'location=no');
});

//# sourceMappingURL=game-1.js.map

'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/looking-for', {
    controller: 'habitLookingForCtrl',
    templateUrl: 'views/habit/looking-for.jade'
  });
}).controller('habitLookingForCtrl', function($scope, $rootScope, $location, UserData, AccountService, Utils) {
  var looking, updateButtonStatus;
  console.log('habitLookingForCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.looking = looking = $rootScope.habitModel.looking || null;
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    } else {
      return $('a.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.looking);
  $scope.$watch('looking', function() {
    return updateButtonStatus($scope.looking);
  });
  $scope.next = function() {
    var redirectTo;
    if (!($scope.looking != null)) {
      return;
    }
    console.log($scope.looking);
    $rootScope.habitModel.looking = $scope.looking;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    $rootScope.objQuestion = _.find($rootScope.answerHabitTwo, function(answer) {
      return answer.path === $scope.looking;
    });
    $rootScope.habitModel.lookingData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    if ($rootScope.objQuestion.path === '/content/en_US/habits/habit-2/jcr:content/par/habitmessageanswer') {
      return $location.path('/habit/smoke');
    } else {
      return $location.path('/habit/time');
    }
  };
  $scope.getNextHabit = function(obj) {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    model.type = 'HABIT';
    model['current-path'] = obj['current-path'];
    model['answer-path'] = obj.path;
    AccountService.getNextHabit(model).then(function(data) {
      Utils.hideLoading();
      console.log('Get next habit success');
      console.log(data);
      $rootScope.thirdQuestion = data;
      $rootScope.answerHabitThird = data['answer-list'];
    }, function(err) {
      Utils.hideLoading();
      console.log('Get next habit fail');
      console.log(err);
    });
  };
});

//# sourceMappingURL=looking-for.js.map

'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/reason', {
    controller: 'habitReasonCtrl',
    templateUrl: 'views/habit/reason.jade'
  });
}).controller('habitReasonCtrl', function($scope, $rootScope, $location, CameraService, localStorageService) {
  var reason, updateButtonStatus;
  console.log('habitReasonCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.reason = reason = $rootScope.habitModel.reason || $('#message-memo').val() || localStorageService.get('reasonToQuitMemo');
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    } else {
      return $('a.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.reason);
  $scope.$watch('reason', function() {
    return updateButtonStatus($scope.reason);
  });
  $scope.next = function() {
    var redirectTo;
    if (!($scope.reason != null)) {
      return;
    }
    $rootScope.habitModel.reason = $scope.reason;
    localStorageService.set('reasonToQuitMemo', $scope.reason);
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    return $location.path('/habit/yhabit');
  };
  $scope.updateMemo = function() {
    return $scope.reason = $('#message-memo').val() || localStorageService.get('reasonToQuitMemo');
  };
  $scope.mediaPopup = function() {
    $scope.showPopup = true;
  };
  $scope.memoPopup = function() {
    $scope.showMemoPopup = true;
  };
  $scope.getPhotoFromCamera = function() {
    CameraService.takeNewPhoto().then(function(imageData) {
      localStorageService.set('reasonToQuitPhoto', imageData);
      Device.alert(Settings.message.reasonToQuitPhoto, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  $scope.captureVideo = function() {
    CameraService.takeNewVideo().then(function(videoData) {
      localStorageService.set('reasonToQuitVideo', videoData);
      Device.alert(Settings.message.reasonToQuitVideo, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  return $scope.captureAudio = function() {
    CameraService.takeNewAudio().then(function(audioData) {
      localStorageService.set('reasonToQuitAudio', audioData);
      Device.alert(Settings.message.reasonToQuitAudio, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
});

//# sourceMappingURL=reason.js.map

'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/replace', {
    controller: 'habitReplaceCtrl',
    templateUrl: 'views/habit/replace.jade'
  });
}).controller('habitReplaceCtrl', function($scope, $rootScope, $location, UserData, AccountService) {
  var replace, updateButtonStatus;
  console.log('habitReplaceCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.replace = replace = $rootScope.habitModel.replace || null;
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    } else {
      return $('a.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.replace);
  $scope.$watch('replace', function() {
    return updateButtonStatus($scope.replace);
  });
  $scope.next = function() {
    var redirectTo;
    if (!($scope.replace != null)) {
      return;
    }
    console.log($scope.replace);
    $rootScope.habitModel.replace = $scope.replace;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    $rootScope.objQuestion = _.find($rootScope.answerHabitFour, function(answer) {
      return answer.path === $scope.replace;
    });
    $rootScope.habitModel.replaceData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    return $location.path('/habit/reason');
  };
  $scope.getNextHabit = function(obj) {
    var model;
    model = UserData.addToken({});
    model['current-path'] = obj['current-path'];
    model['answer-path'] = obj.path;
    AccountService.getNextHabit(model).then(function(data) {
      console.log('Get next habit success');
      console.log(data);
    }, function(err) {
      console.log('Get next habit fail');
      console.log(err);
    });
  };
});

//# sourceMappingURL=replace.js.map

'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/smoke', {
    controller: 'habitSmokeCtrl',
    templateUrl: 'views/habit/smoke.jade'
  });
}).controller('habitSmokeCtrl', function(OverlayService, $scope, $rootScope, $location, UserData, AccountService, localStorageService, Utils, Settings) {
  var cigarettes, updateButtonStatus;
  console.log('habitSmokeCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.cigarettes = cigarettes = $rootScope.habitModel.cigarettes || null;
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    }
  };
  updateButtonStatus($scope.cigarettes);
  $scope.$watch('cigarettes', function() {
    return updateButtonStatus($scope.cigarettes);
  });
  $scope.next = function() {
    var cigarettesPerDay, redirectTo, userName;
    if (!($scope.cigarettes != null)) {
      return;
    }
    console.log($scope.cigarettes);
    $rootScope.habitModel.cigarettes = $scope.cigarettes;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    $rootScope.objQuestion = _.find($rootScope.answerHabitThird, function(answer) {
      return answer.path === $scope.cigarettes;
    });
    $rootScope.habitModel.cigarettesData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    $rootScope.badge = {
      action: 'action3_habitmapping',
      back: '/products/detail-product'
    };
    $location.path('/quitpoint/courage');
    cigarettesPerDay = Settings.localStorage.name.cigarettesPerDay;
    userName = localStorageService.get('userName');
    localStorageService.set(userName + cigarettesPerDay, $scope.cigarettes);
    return $rootScope.isProductRemind = true;
  };
  $scope.getNextHabit = function(obj) {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    model.type = 'HABIT';
    model['current-path'] = obj['current-path'];
    model['answer-path'] = obj.path;
    AccountService.getNextHabit(model).then(function(data) {
      var popupToHabit;
      Utils.hideLoading();
      console.log('Get last habit success');
      console.log(data);
      localStorageService.set('path-product', data['product-path'][0]);
      localStorageService.set('path-product-reminder', data['product-path'][0]);
      popupToHabit = 'overlay-group-1';
      OverlayService.setShowed(popupToHabit);
    }, function(err) {
      Utils.hideLoading();
      console.log('Get last habit fail');
      console.log(err);
    });
  };
});

//# sourceMappingURL=smoke.js.map

'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/thank', {
    controller: 'habitThankCtrl',
    templateUrl: 'views/habit/thank.jade'
  });
}).controller('habitThankCtrl', function($scope, $location, $rootScope) {
  console.log('habitThankCtrl');
  return $scope.next = function() {
    return $location.path('/quitpoint/courage');
  };
});

//# sourceMappingURL=thank.js.map

'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/time', {
    controller: 'habitTimeCtrl',
    templateUrl: 'views/habit/time.jade'
  });
}).controller('habitTimeCtrl', function(OverlayService, $scope, $rootScope, $location, UserData, AccountService, localStorageService, Utils) {
  var time, updateButtonStatus;
  console.log('habitTimeCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.time = time = $rootScope.habitModel.time || null;
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    } else {
      return $('a.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.time);
  $scope.$watch('time', function() {
    return updateButtonStatus($scope.time);
  });
  $scope.next = function() {
    var redirectTo;
    if (!($scope.time != null)) {
      return;
    }
    console.log($scope.time);
    $rootScope.habitModel.time = $scope.time;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    $rootScope.objQuestion = _.find($rootScope.answerHabitThird, function(answer) {
      return answer.path === $scope.time;
    });
    $rootScope.habitModel.timeData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    $rootScope.badge = {
      action: 'action3_habitmapping',
      back: '/products/detail-product'
    };
    $location.path('/quitpoint/courage');
    return $rootScope.isProductRemind = true;
  };
  $scope.getNextHabit = function(obj) {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    model.type = 'HABIT';
    model['current-path'] = obj['current-path'];
    model['answer-path'] = obj.path;
    AccountService.getNextHabit(model).then(function(data) {
      var popupToHabit;
      Utils.hideLoading();
      console.log('Get next habit success');
      console.log(data);
      localStorageService.set('path-product', data['product-path'][0]);
      localStorageService.set('path-product-reminder', data['product-path'][0]);
      popupToHabit = 'overlay-group-1';
      OverlayService.setShowed(popupToHabit);
    }, function(err) {
      Utils.hideLoading();
      console.log('Get next habit fail');
      console.log(err);
    });
  };
});

//# sourceMappingURL=time.js.map

'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/year', {
    controller: 'habitYearCtrl',
    templateUrl: 'views/habit/year.jade'
  });
}).controller('habitYearCtrl', function($scope, $rootScope, $location, UserData, AccountService) {
  var updateButtonStatus, year;
  console.log('habitYearCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.year = year = $rootScope.habitModel.year || null;
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    }
  };
  updateButtonStatus($scope.year);
  $scope.$watch('year', function() {
    return updateButtonStatus($scope.year);
  });
  $scope.next = function() {
    var redirectTo;
    if (!($scope.year != null)) {
      return;
    }
    console.log($scope.year);
    $rootScope.habitModel.year = $scope.year;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    $rootScope.objQuestion = _.find($rootScope.answerHabitThird, function(answer) {
      return answer.path === $scope.year;
    });
    $rootScope.habitModel.yearData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    return $location.path('/habit/replace');
  };
  $scope.getNextHabit = function(obj) {
    var model;
    model = UserData.addToken({});
    model.type = 'HABIT';
    model['current-path'] = obj['current-path'];
    model['answer-path'] = obj.path;
    AccountService.getNextHabit(model).then(function(data) {
      console.log('Get next habit success');
      console.log(data);
      $rootScope.fourQuestion = data;
      $rootScope.answerHabitFour = data['answer-list'];
    }, function(err) {
      console.log('Get next habit fail');
      console.log(err);
    });
  };
});

//# sourceMappingURL=year.js.map

'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/yhabit', {
    controller: 'habitYHabitCtrl',
    templateUrl: 'views/habit/yhabit.jade'
  });
}).controller('habitYHabitCtrl', function($scope, $rootScope, $location, $timeout, Device, BadgeService, OverlayService) {
  var completedHabit;
  console.log('habitYHabitCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.model = $rootScope.habitModel;
  $rootScope.habitData = {
    redirectTo: '/habit/yhabit'
  };
  completedHabit = function() {
    return BadgeService.addAction('action3_habitmapping').then(function(data) {
      $rootScope.$broadcast('profile-updated');
      console.log('DONE', data);
      $location.path('/quitpoint/courage');
      $rootScope.habitData = null;
      return $scope.model = null;
    }, function(err) {
      return console.log('ERR', err);
    });
  };
  return $scope.done = function() {
    var popupToHabit;
    console.log($scope.model);
    if ($rootScope.getRecommentdations === true) {
      $location.path('/products/detail-product');
    } else {
      completedHabit();
    }
    popupToHabit = 'overlay-group-1';
    return OverlayService.setShowed(popupToHabit);
  };
});

//# sourceMappingURL=yhabit.js.map

'use strict';
angular.module('site.help', []).config(function($routeProvider) {
  return $routeProvider.when('/help', {
    controller: 'helpIndexCtrl',
    templateUrl: 'views/help/help.jade'
  });
}).controller('helpIndexCtrl', function(Settings, $scope, $rootScope, $location, Utils, Pages, Snapper, localStorageService) {
  console.log('helpIndexCtrl');
  $rootScope.header = {
    pageTitle: Pages.helpIndex.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle
  };
  $scope.helpYes = function() {
    mconsole.log('do help, restart all intro');
    localStorageService.set('helpStatus', true);
    Utils.removeGroupOfStorage('overlays');
    return $location.path(Settings.pages.landing);
  };
  return $scope.helpNo = function() {
    mconsole.log('lead to landing page');
    return $location.path(Settings.pages.landing);
  };
});

//# sourceMappingURL=help.js.map

'use strict';
angular.module('site.landingPage').config(function($routeProvider) {
  return $routeProvider.when('/landing-page/add-slip', {
    controller: 'addSlipCtrl',
    templateUrl: 'views/landing-page/add-slip.jade'
  });
}).controller('addSlipCtrl', function(BadgeService, $scope, $rootScope, $location, Settings, Device, Utils, Pages, Snapper, LandingService, UserData, localStorageService, LocalNotificationService) {
  var addReasonToQuitNotification, addSlip;
  console.log('addSlipCtrl');
  $('#nav-slipped').trigger('click');
  Snapper.enable();
  $rootScope.header = {
    pageTitle: Pages.addSlip.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle
  };
  $rootScope.leadBy = null;

  /*
  if $rootScope.leadBy is 'sidebar-left'
     * show hamburger
    Snapper.enable()
    $rootScope.header =
      pageTitle: Pages.addSlip.title #'Slip'
      leftIcon: 'icon-menu'
      leftMethod: Snapper.hamburgerToggle
    $rootScope.leadBy = null
  else
     * show left arror
    Snapper.disable()
    $rootScope.header =
      pageTitle: Pages.addSlip.title #'Slip'
   */
  addSlip = function(callback) {
    var model;
    model = UserData.addToken({});
    return LandingService.addSlip(model).then(function(data) {
      if ((data.type != null) && data.type === 'ERROR') {
        return Device.alert(data.message, null, 'Error', 'Done');
      } else {
        $rootScope.addSlipData = data;
        mconsole.log('addSlipData', data);
        BadgeService.addAction('slip_up').then(function(data) {
          mconsole.log('addAction', data);
          return $rootScope.$broadcast('profile-updated');
        });
        return callback();
      }
    }, function(err) {
      return Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
    });
  };
  $scope.addSlip = function(path) {
    console.log($rootScope.USER['date-start-journey']);
    if (!$rootScope.USER['date-start-journey']) {
      Device.alert('Your journey hasn\'t been started right now.', null, 'Message', 'Done');
      $location.path('/landing-page');
      return;
    }
    addReasonToQuitNotification();
    return addSlip(function() {
      return $location.path(path);
    });
  };
  return addReasonToQuitNotification = function() {
    var dateRemind, getNoti, id, localSlipUpCount, localUserName, message, options, reasonToQuitAudio, reasonToQuitMemo, reasonToQuitPhoto, reasonToQuitVideo, second, slipUpCount, title;
    reasonToQuitMemo = '';
    reasonToQuitPhoto = '';
    reasonToQuitVideo = '';
    reasonToQuitAudio = '';
    localUserName = '';
    localSlipUpCount = Settings.localStorage.name.slipUpCount;
    getNoti = Settings.notification.reasonToQuit;
    id = getNoti.id;
    title = getNoti.title;
    if (localStorageService.get('userName') != null) {
      localUserName = localStorageService.get('userName');
      if (localStorageService.get(localUserName + 'ReasonToQuitMemo') != null) {
        reasonToQuitMemo = localStorageService.get(localUserName + 'ReasonToQuitMemo');
      }
      if (localStorageService.get(localUserName + 'ReasonToQuitPhoto') != null) {
        reasonToQuitPhoto = localStorageService.get(localUserName + 'ReasonToQuitPhoto');
      }
      if (localStorageService.get(localUserName + 'ReasonToQuitVideo') != null) {
        reasonToQuitVideo = localStorageService.get(localUserName + 'ReasonToQuitVideo');
      }
      if (localStorageService.get(localUserName + 'ReasonToQuitAudio') != null) {
        reasonToQuitAudio = localStorageService.get(localUserName + 'ReasonToQuitAudio');
      }
    }
    if (localStorageService.get(localSlipUpCount) != null) {
      slipUpCount = parseInt(localStorageService.get(localSlipUpCount));
      localStorageService.set(localSlipUpCount, slipUpCount + 1);
    } else {
      localStorageService.set(localSlipUpCount, 1);
    }
    slipUpCount = parseInt(localStorageService.get(localSlipUpCount));
    if (slipUpCount === 1) {
      message = getNoti.firstMessage + reasonToQuitMemo;
    } else {
      if (slipUpCount > 5) {
        message = getNoti.sixthMessage;
      } else {
        message = getNoti.secondToFifthMessage.start + slipUpCount + getNoti.secondToFifthMessage.end + reasonToQuitMemo;
      }
    }
    mconsole.log('There\'re m: ' + message);
    second = 0;
    dateRemind = Utils.dateRemind(second);
    options = {
      id: id,
      title: title,
      message: message,
      date: dateRemind,
      autoCancel: true
    };
    if (typeof cordova === 'undefined') {
      return;
    }
    LocalNotificationService.addNotification(id, options);
    return LocalNotificationService.onClickNotification(id);
  };
});

//# sourceMappingURL=add-slip.js.map

'use strict';
angular.module('site.landingPage').config(function($routeProvider) {
  return $routeProvider.when('/landing-static', {
    controller: 'landingStaticCtrl',
    templateUrl: 'views/landing-page/landing-static.jade'
  });
}).controller('landingStaticCtrl', function(Keys, $scope, $rootScope, $location, Snapper, Settings, localStorageService) {
  var badgeActive, pCreateProfile, popupHide, popupShow;
  mconsole.log('landingStaticCtrl');
  Snapper.disable();
  pCreateProfile = 'overlay-create-profile';
  popupShow = function(path) {
    return $('[data-overlay="' + path + '"]').removeClass('hidden');
  };
  popupHide = function(path) {
    return $('[data-overlay="' + path + '"]').addClass('hidden');
  };
  badgeActive = function() {
    return popupShow(pCreateProfile);
  };
  $scope.Items = Settings.landingIndexCtrl.motivationItems;
  $rootScope.header = {
    leftIcon: 'icon-menu',
    rightIcon: 'icon-badge-white',
    containerClass: 'landing-page',
    leftMethod: badgeActive,
    rightMethod: badgeActive
  };
  $scope.doNothing = function() {
    popupShow(pCreateProfile);
  };
  $scope.close = function() {
    popupHide(pCreateProfile);
  };
  return $scope.go = function(path) {
    localStorageService.set(Keys.isntFirstUser, true);
    $location.path(path);
  };
});

//# sourceMappingURL=landing-static.js.map

'use strict';
angular.module('site.landingPage').config(function($routeProvider) {
  return $routeProvider.when('/landing-page/motivation-gallery', {
    controller: 'landingMotivationCtrl',
    templateUrl: 'views/landing-page/motivation-gallery.jade'
  });
}).controller('landingMotivationCtrl', function($scope, $rootScope, Settings, FacebookService, Utils, Pages, Snapper, LandingService, UserData, FacebookShareService) {
  var getMotivation, setShowVideo;
  console.log('landingMotivationCtrl');
  if ($rootScope.leadBy === 'sidebar-left') {
    Snapper.enable();
    $rootScope.header = {
      pageTitle: Pages.landingMotivation.title,
      leftIcon: 'icon-menu',
      leftMethod: Snapper.hamburgerToggle
    };
    $rootScope.leadBy = null;
  } else {
    Snapper.disable();
    $rootScope.header = {
      pageTitle: Pages.landingMotivation.title
    };
  }
  setShowVideo = function(data) {
    var i, _results;
    i = 0;
    _results = [];
    while (i < data.length) {
      data[i].showVideo = (data[i].videos ? true : false);
      data[i].showDesc = (data[i]['hide-descriptioin'] ? true : false);
      data[i].showBehind = (data[i].showVideo || data[i].showDesc ? true : false);
      _results.push(i++);
    }
    return _results;
  };
  getMotivation = function() {
    var model;
    $scope.motivatAll = [];
    model = UserData.addToken({});
    model['motivation-path'] = '/content/en_US/motivations';
    return LandingService.getMotivation(model).then(function(data) {
      if ((data.type != null) && data.type === 'ERROR') {
        mconsole.log('Data error');
      } else {
        $scope.motivatAll = data['other-motivations'];
        setShowVideo($scope.motivatAll);
        console.log('get motivation success');
        console.log(data);
      }
    }, function(err) {
      console.log('get motivation fail');
    });
  };
  getMotivation();
  $scope.shareMotivation = function(item) {
    var shareModel;
    mconsole.log('shareMotivation', item);
    console.log('shareMotivation', Utils.html2Plain(item.descriptioin));
    shareModel = {
      method: "share",
      name: item.title,
      href: Settings.sharingData.link,
      caption: item.title,
      description: Utils.html2Plain(item.descriptioin),
      picture: item['pitureShare']
    };
    mconsole.log('share data', shareModel);
    return FacebookShareService.showDialog(shareModel);
  };
});

//# sourceMappingURL=motivation-gallery.js.map

'use strict';
angular.module('site.landingPage').config(function($routeProvider) {
  return $routeProvider.when('/landing-page/science-behind', {
    controller: 'landingScienceBehindCtrl',
    templateUrl: 'views/landing-page/science-behind.jade'
  });
}).controller('landingScienceBehindCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('landingScienceBehindCtrl');
  Snapper.disable();
  return $rootScope.header = {
    pageTitle: Pages.landingScienceBehind.title
  };
});

//# sourceMappingURL=science-behind.js.map

'use strict';
angular.module('site.landingPage').config(function($routeProvider) {
  return $routeProvider.when('/landing-page/slip-up-badge', {
    controller: 'slipUpBadgeCtrl',
    templateUrl: 'views/landing-page/slip-up-badge.jade'
  });
}).controller('slipUpBadgeCtrl', function(BusinessGroup, localStorageService, QuitTeamService, QuitPointService, Device, BadgeService, LandingService, UserData, Settings, Utils, $scope, $rootScope, Snapper, FacebookShareService, CONSTANTS, $location) {
  var addSlip, badgeActive;
  console.log('slipUpBadgeCtrl');
  $rootScope.progress = 100;
  Snapper.enable();
  badgeActive = function() {
    Snapper.settings({
      disable: 'none'
    });
    if (Snapper.state().state === 'right') {
      return Snapper.close('right');
    } else {
      return Snapper.open('right');
    }
  };
  $rootScope.header = {
    containerClass: 'landing-page hide-badge',
    rightIcon: 'icon-badge-white',
    rightMethod: badgeActive
  };
  Utils.showLoading();
  addSlip = function() {
    var model;
    model = UserData.addToken({});
    LandingService.addSlip(model).then(function(data) {
      if ((data.type != null) && data.type === 'ERROR') {
        return Device.alert(data.message, null, 'Error', 'Done');
      } else {
        $scope.data = data;
        $rootScope.$broadcast('profile-updated');
        Utils.hideLoading();
        return BadgeService.addAction('slip_up').then(function(data) {
          return $rootScope.$broadcast('profile-updated');
        });
      }
    }, function(err) {
      Utils.hideLoading();
      return Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
    });
  };
  addSlip();
  $scope.restartJourney = function() {
    return BusinessGroup.restartJourney(function() {
      return $location.path('/quitpoint');
    });
  };
  $scope.ok = function(path) {
    if ($scope.data['call-restart'] === true) {
      return $scope.notiSlipUp = true;
    } else {
      return $location.path(path);
    }
  };
  return $scope.share = function() {
    var item, shareModel;
    item = $scope.data;
    shareModel = {
      method: 'share',
      name: 'Slip Up Badge',
      href: Settings.sharingData.link,
      caption: 'Slip Up Badge',
      description: item['message-badge'],
      picture: CONSTANTS.BADGE_PATH + 'badge-slip.png'
    };
    return FacebookShareService.showDialog(shareModel);
  };
});

//# sourceMappingURL=slip-up-badge.js.map

'use strict';
angular.module('site.login').config(function($routeProvider) {
  return $routeProvider.when('/login/forgot-pass', {
    controller: 'forgotPassCtrl',
    templateUrl: 'views/login/forgot-pass.jade',
    resolve: resolve
  });
}).controller('forgotPassCtrl', function($scope, $rootScope, $location, Pages, Snapper, AccountService, Device, Utils) {
  var AlertError, checkOtherInfo, err, errList, initModel, isRequesting, isSubmitted, isValid, isValidData, showError, updateStatusOfButton;
  console.log('forgotPassCtrl');
  Snapper.disable();
  $scope.err = err = [];
  $rootScope.header = {
    pageTitle: Pages.forgotPass.title,
    containerClass: ''
  };
  initModel = function() {
    $scope.email = '';
    $scope.securityAnswer = '';
    return $scope.password = '';
  };
  initModel();
  errList = ['password', 'email', 'securityAnswer'];
  isSubmitted = false;
  isValid = {
    password: function() {
      if (($scope.password != null) && Utils.isValidPassword($scope.password)) {
        return true;
      } else {
        return false;
      }
    },
    securityAnswer: function() {
      if ($scope.securityAnswer.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    email: function() {
      if (($scope.email != null) && Utils.isValidEmail($scope.email)) {
        return true;
      } else {
        return false;
      }
    }
  };
  showError = function() {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = errList.length; _i < _len; _i++) {
      item = errList[_i];
      _results.push(err[item] = !isValid[item]());
    }
    return _results;
  };
  checkOtherInfo = function() {
    var item, re, _i, _len;
    re = true;
    for (_i = 0, _len = errList.length; _i < _len; _i++) {
      item = errList[_i];
      re = re && isValid[item]();
    }
    return re;
  };
  isValidData = function() {
    if (checkOtherInfo()) {
      return true;
    } else {
      return false;
    }
  };
  updateStatusOfButton = function() {
    mconsole.log('updateStatusOfButton', $scope['forgotpass'].$valid);
    if (($scope['forgotpass'].$valid && !isSubmitted) || isValidData()) {
      return $('.btn.btn-submit').addClass('active');
    } else {
      return $('.btn.btn-submit').removeClass('active');
    }
  };
  AlertError = {
    password: function() {
      if (isValid.password()) {
        err['password'] = false;
      } else {
        err['password'] = true;
      }
      return updateStatusOfButton();
    },
    securityAnswer: function() {
      if (isValid.securityAnswer()) {
        err['securityAnswer'] = false;
      } else {
        err['securityAnswer'] = true;
      }
      return updateStatusOfButton();
    },
    email: function() {
      if (isValid.email()) {
        err['email'] = false;
      } else {
        err['email'] = true;
      }
      return updateStatusOfButton();
    }
  };
  $scope.$watch('forgotpass.$valid', function() {
    mconsole.log('forgotpass.$valid');
    return updateStatusOfButton();
  });
  $scope.$watch('password', function() {
    if (isSubmitted) {
      return AlertError.password();
    }
  });
  $scope.$watch('email', function() {
    if (isSubmitted) {
      return AlertError.email();
    }
  });
  $scope.$watch('securityAnswer', function() {
    if (isSubmitted) {
      return AlertError.securityAnswer();
    }
  });
  isRequesting = false;
  $scope.submit = function() {
    var model;
    if (!$scope.username) {
      return;
    }
    if (!isRequesting) {
      Utils.showLoading();
      model = {};
      model['user-name'] = $scope.username;
      isRequesting = true;
      return AccountService.forgotPass(model).then(function(data) {
        if ((data.type != null) && data.type === 'ERROR') {
          Device.alert(data.message, null, 'Message', 'Done');
        } else {
          $scope.username = '';
          $scope.notiForgotPass = true;
        }
        isRequesting = false;
        Utils.hideLoading();
      }, function(err) {
        isRequesting = false;
        Device.alert(err.message, null, 'Error', 'Done');
        mconsole.log('forgotpass, fail', err);
        Utils.hideLoading();
      });
    }
  };
  $scope.gotoLogin = function() {
    $location.url('/login/login-2');
  };
});

//# sourceMappingURL=forgot-pass.js.map

'use strict';
angular.module('site.login').config(function($routeProvider) {
  return $routeProvider.when('/login/forgot-username', {
    controller: 'forgotUsernameCtrl',
    templateUrl: 'views/login/forgot-username.jade',
    resolve: resolve
  });
}).controller('forgotUsernameCtrl', function($scope, $rootScope, $location, Pages, Snapper, AccountService, Device, Utils) {
  var err, isRequesting, updateStatusOfButton;
  console.log('forgotUsernameCtrl');
  Snapper.disable();
  $scope.err = err = [];
  $rootScope.header = {
    pageTitle: Pages.forgotUsername.title,
    containerClass: ''
  };
  updateStatusOfButton = function() {
    if (!($scope.forgotUsername != null)) {
      return;
    }
    if ($scope.forgotUsername.$valid && Utils.isValidEmail($scope.email)) {
      return $('.btn.btn-submit').addClass('active');
    } else {
      return $('.btn.btn-submit').removeClass('active');
    }
  };
  $scope.$watch('forgotUsername.$valid', updateStatusOfButton);
  $scope.$watch('email', updateStatusOfButton);
  isRequesting = false;
  return $scope.submit = function() {
    var model;
    mconsole.log('submit');
    if (isRequesting) {
      return;
    }
    model = {
      email: $scope.email,
      name: 'weQuit app'
    };
    if ($scope.forgotUsername.$valid && Utils.isValidEmail($scope.email)) {
      Utils.showLoading();
      isRequesting = true;
      return AccountService.forgotUsername(model).then(function(data) {
        if ((data.type != null) && data.type === 'SUCCESS') {
          $scope.notiForgotPass = true;
        } else {
          Device.alert(data.message, null, 'Error', 'Done');
        }
        Utils.hideLoading();
        return isRequesting = false;
      }, function(err) {
        Utils.hideLoading();
        isRequesting = false;
        return Device.alert('message', null, 'Error', 'Done');
      });
    }
  };
});

//# sourceMappingURL=forgot-username.js.map

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

'use strict';
angular.module('site.login').config(function($routeProvider) {
  return $routeProvider.when('/login/password-coming', {
    controller: 'passwordComingCtrl',
    templateUrl: 'views/login/password-coming.jade',
    resolve: resolve
  });
}).controller('passwordComingCtrl', function($scope, $rootScope, $location, Pages, Snapper) {
  var err;
  console.log('passwordComingCtrl');
  Snapper.disable();
  $scope.err = err = {};
  return $rootScope.header = {
    pageTitle: Pages.passwordComing.title,
    containerClass: ''
  };
});

//# sourceMappingURL=password-coming.js.map

'use strict';
angular.module('site.login').config(function($routeProvider) {
  return $routeProvider.when('/login/welcome-back', {
    controller: 'welcomeBackCtrl',
    templateUrl: 'views/login/welcome-back.jade',
    resolve: resolve
  });
}).controller('welcomeBackCtrl', function(BadgeService, Device, $scope, $rootScope, $location, Pages, Snapper) {
  var addStartJourney, err;
  console.log('welcomeBackCtrl');
  Snapper.disable();
  Snapper.close('left');
  $scope.err = err = {};
  $rootScope.header = {
    hideLeftIcon: true,
    pageTitle: Pages.welcomeBack.title,
    containerClass: ''
  };
  addStartJourney = function(callback) {
    return BadgeService.addAction('action1_ignitionswitch').then(function(data) {
      $rootScope.$broadcast('profile-updated');
      console.log('DONE', data);
      if (callback != null) {
        callback();
      }
      return Device.alert(Settings.message.youHaveGotABadge, null, 'Message', 'Done');
    }, function(err) {
      console.log('ERR', err);
      return Device.alert(Settings.message.youHaveGotABadge, null, 'Message', 'Done');
    });
  };
  $scope["continue"] = function() {
    mconsole.log('continue click');
    return $location.path('/landing-page');
  };
  return $scope.startFresh = function() {
    mconsole.log('continue click');
    return addStartJourney(function() {
      return $location.path('/landing-page');
    });
  };
});

//# sourceMappingURL=welcome-back.js.map

'use strict';
angular.module('site.main').config(function($routeProvider) {
  return $routeProvider.when('/privacy-policy', {
    controller: 'privacyPolicyCtrl',
    templateUrl: 'views/template/index.jade'
  });
}).controller('privacyPolicyCtrl', function($rootScope, Utils, Pages, Snapper) {
  mconsole.log('privacyPolicyCtrl', $rootScope.previousPath);
  if (($rootScope.previousPath === '/login') || ($rootScope.previousPath === '/login/login-2')) {
    Snapper.disable();
    return $rootScope.header = {
      pageTitle: Pages.privacyPolicy.title
    };
  } else {
    Snapper.enable();
    return $rootScope.header = {
      pageTitle: Pages.privacyPolicy.title,
      leftIcon: 'icon-menu',
      leftMethod: Snapper.hamburgerToggle
    };
  }
});

//# sourceMappingURL=privacy-policy.js.map

'use strict';
angular.module('site.main').config(function($routeProvider) {
  return $routeProvider.when('/terms-conditions', {
    controller: 'termsConditionsCtrl',
    templateUrl: 'views/template/index.jade'
  });
}).controller('termsConditionsCtrl', function($rootScope, Utils, Snapper, Pages) {
  console.log('termsConditionsCtrl');
  return $rootScope.header = {
    pageTitle: Pages.termsConditions.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle
  };
});

//# sourceMappingURL=terms-conditions.js.map

angular.module('site').controller('headerCtrl', function($scope, $rootScope) {
  if (!($rootScope.pageTitle != null)) {
    $rootScope.pageTitle = '';
  }
  console.log($rootScope.pageTitle);
  return $scope.backToHistory = function() {
    return window.history.back();
  };
});

//# sourceMappingURL=header.js.map

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

'use strict';
angular.module('site.products').config(function($routeProvider) {
  return $routeProvider.when('/products/post-review', {
    controller: 'productPostReviewCtrl',
    templateUrl: 'views/products/post-review.jade'
  });
}).controller('productPostReviewCtrl', function($timeout, $scope, $rootScope, $location, Device, Settings, UserData, Utils, ProductService, Pages, Snapper) {
  var contentIsValid, ratingProduct, updateStatus;
  mconsole.log('productPostReviewCtrl');
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.productPostReview.title,
    containerClass: 'post-review-page'
  };
  $scope.model = {
    rating: 2,
    title: '',
    content: ''
  };
  contentIsValid = function() {
    var m;
    m = $scope.model;
    return (m.title.length > 0) && (m.content.length > 0);
  };
  updateStatus = function() {
    return Utils.updateBtnStatus(contentIsValid());
  };
  updateStatus();
  $scope.$watch('model.title', updateStatus);
  $scope.$watch('model.content', updateStatus);
  ratingProduct = function(callback) {
    var m, model;
    m = $scope.model;
    model = {
      'category-id': 'test',
      'stream-id': '',
      title: m.title,
      comment: m.content,
      ratings: m.rating
    };
    model = UserData.addToken({});
    return ProductService.rating(model).then(function(data) {
      if (data.type === 'SUCCESS') {
        return callback();
      } else {
        return Device.alert(data.message, null, 'Error', 'Done');
      }
    }, function(err) {
      return Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
    });
  };
  return $scope.postReview = function() {
    if (!contentIsValid()) {
      return;
    }
    ratingProduct(function() {
      $scope.notiThankRating = true;
      return $timeout(function() {
        return $location.path('/landing-page');
      }, 2000);
    });
  };
});

//# sourceMappingURL=post-review.js.map

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

'use strict';
angular.module('site.products').config(function($routeProvider) {
  return $routeProvider.when('/products/thank-rating', {
    controller: 'thankRatingCtrl',
    templateUrl: 'views/products/thank-rating.jade'
  });
}).controller('thankRatingCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('thankRatingCtrl');
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.thankRating.title
  };
  return $scope.submit = function() {
    console.log('submit');
    return console.log($scope.model);
  };
});

//# sourceMappingURL=thank-rating.js.map

'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/character-detail', {
    controller: 'quitPointCharacterDetailCtrl',
    templateUrl: 'views/quitpoint/character-detail.jade'
  });
}).controller('quitPointCharacterDetailCtrl', function($scope, $rootScope, Pages) {
  console.log('quitPointCharacterDetailCtrl');
  return $rootScope.header = {
    pageTitle: Pages.quitPointNewCharacter.title,
    hideLeftIcon: true
  };
});

//# sourceMappingURL=character-detail.js.map

'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/coupon-detail', {
    controller: 'quitPointCouponDetailCtrl',
    templateUrl: 'views/quitpoint/coupon-detail.jade'
  });
}).controller('quitPointCouponDetailCtrl', function($scope, $rootScope, $location, $timeout, Device, UserData, QuitPointService, Settings, OverlayService, FacebookService, Snapper) {
  var getData;
  console.log('quitPointCouponDetailCtrl');
  $rootScope.header = {
    hideLeftIcon: 'true',
    pageTitle: 'Your Coupons'
  };
  getData = function() {
    var model;
    model = {
      'coupon-path': '/content/en_US/coupons/niquitin-patch'
    };
    model = UserData.addToken(model);
    return QuitPointService.getCoupon(model).then(function(data) {
      console.log(data);
      if ((data.type != null) && (data.type === 'ERROR')) {
        return Device.alert(data.message, null, 'Error', 'Done');
      } else {
        return $scope.item = data;
      }
    }, function(err) {
      console.log('data', err);
      return Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
    });
  };
  return getData();
});

//# sourceMappingURL=coupon-detail.js.map

'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/courage', {
    controller: 'quitPointCourageCtrl',
    templateUrl: 'views/quitpoint/courage.jade'
  });
}).controller('quitPointCourageCtrl', function(LocalNotificationService, LocalPushService, BadgeService, GigyaService, UserData, Environment, $scope, $rootScope, $location, $timeout, Pages, Settings, OverlayService, FacebookService, Snapper, localStorageService, Utils, AccountService, ProductService, FacebookShareService, CONSTANTS) {
  var addBadge, badgeActive, getCompareProduct, getTokenUser, initData, intro, introOnFinish, path, requestingBadgeDetail, resolvedCase, showOverlay, updateStartJourneyRemindTime;
  console.log('quitPointCourageCtrl');
  Utils.showLoading();
  $rootScope.progress = 100;
  badgeActive = function() {
    console.log('badgeActive', Snapper);
    Snapper.settings({
      disable: 'none'
    });
    if (Snapper.state().state === 'right') {
      return Snapper.close('right');
    } else {
      return Snapper.open('right');
    }
  };
  Snapper.enable();
  $rootScope.header = {
    leftIcon: 'icon-menu',
    rightIcon: 'icon-badge-white',
    containerClass: 'landing-page hide-badge',
    leftMethod: Snapper.hamburgerToggle,
    rightMethod: badgeActive
  };
  path = $location.path();
  intro = introJs();
  intro.setOptions({
    showStepNumbers: false,
    showBullets: false,
    exitOnOverlayClick: false
  });
  intro.setOptions({
    steps: Settings.quitPointCourageCtrl.intro
  });
  introOnFinish = function() {
    console.log('introOnFinish');
    $('.snap-drawers').show('fast');
    OverlayService.setShowed(path);
    $rootScope.setsSrollPos = false;
    return $rootScope.$broadcast('intro-has-finished', true);
  };
  intro.onexit(introOnFinish);
  intro.oncomplete(introOnFinish);
  showOverlay = function() {
    if (!Environment.isOverlay) {
      return;
    }
    if (OverlayService.isShowed(path) === false) {
      $('.snap-drawers').hide('fast');
      return $timeout(function() {
        $rootScope.setsSrollPos = true;
        return intro.start();
      }, CONSTANTS.OVERLAYS_TIME);
    } else {
      return $rootScope.$broadcast('intro-has-finished', true);
    }
  };
  updateStartJourneyRemindTime = function(timeIn) {
    var model;
    model = UserData.addToken({});
    model['hour'] = timeIn;
    model['app-reference'] = '//b';
    mconsole.log(model);
    AccountService.postRemindStartJourney(model).then(function(data) {
      mconsole.log('update success', data);
    }, function(err) {
      return mconsole.log('fail update', err);
    });
  };
  requestingBadgeDetail = function(badgeName) {
    var model;
    mconsole.log('requestingBadgeDetail', $scope.model);
    model = UserData.addToken({});
    model.action = badgeName;
    return BadgeService.getDetailBadge(model).then(function(data) {
      mconsole.log('data', data);
      $scope.model = data;
      $('.badge-wrapper .badge').css('background-image', 'url(' + $scope.model.imgURL + ')').addClass('animate');
      showOverlay();
      if (badgeName === 'action6_addniquitintoprofile') {
        $rootScope.leftTwoStep = true;
      }
      return Utils.hideLoading();
    }, function(err) {
      mconsole.log('err', err);
      return Utils.hideLoading();
    });
  };
  addBadge = function(action) {
    return BadgeService.addAction(action).then(function(data) {
      return $rootScope.$broadcast('profile-updated');
    }, function(err) {
      return mconsole.log('ERR', err);
    });
  };
  initData = function() {
    var badge;
    mconsole.log('initData', $rootScope.badge);
    if ($rootScope.badge != null) {
      badge = $rootScope.badge;
      $rootScope.badge = null;
    } else {
      badge = {
        action: 'action1_ignitionswitch',
        back: '/products/detail-product'
      };
    }
    $scope.badge = badge;
    if (!((badge.hasBadge != null) && badge.hasBadge === true)) {
      addBadge(badge.action);
    }
    return requestingBadgeDetail(badge.action);
  };
  getTokenUser = function() {
    var model;
    model = UserData.addToken({});
    return AccountService.viewAccountSetting(model).then(function(data) {
      $scope.badges = data['user-total-badges'];
      $scope.quitpoint = data['user-total-points'];
    }, function(err) {});
  };
  resolvedCase = function(data) {
    var dHabit, dSignUp, obj;
    if (data['product-from-habit'] != null) {
      dHabit = data['product-from-habit'];
    }
    if (data['product-from-signup'] != null) {
      dSignUp = data['product-from-signup'];
    } else {
      $rootScope.showRecomend = 1;
    }
    if (dSignUp != null) {
      obj = _.find(dHabit, function(d) {
        return d === dSignUp;
      });
      if (obj != null) {
        $rootScope.showRecomend = 2;
      } else {
        $rootScope.showRecomend = 3;
      }
    }
  };
  getCompareProduct = function() {
    var model;
    model = UserData.addToken({});
    return ProductService.getUserProduct(model).then(function(data) {
      resolvedCase(data);
      mconsole.log('data', data);
    }, function(err) {});
  };
  initData();
  getTokenUser();
  getCompareProduct();
  $scope.ok = function() {
    var badge;
    updateStartJourneyRemindTime(0);
    badge = $scope.badge;
    return $location.path(badge.back || '/products/detail-product');
  };
  $scope.shareBadge = function() {
    var item, shareModel;
    item = $scope.model;
    shareModel = {
      method: "share",
      name: item.title,
      href: Settings.sharingData.link,
      caption: item.title,
      description: item.description,
      picture: Utils.getThumbLink(item.imgURL)
    };
    mconsole.log('share data', shareModel);
    return FacebookShareService.showDialog(shareModel);
  };
});

//# sourceMappingURL=courage.js.map

'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/donation', {
    controller: 'quitPointDonationCtrl',
    templateUrl: 'views/quitpoint/donation.jade'
  });
}).controller('quitPointDonationCtrl', function($scope, $rootScope, Pages) {
  mconsole.log('quitPointDonationCtrl');
  $rootScope.header = {
    pageTitle: Pages.quitPointDonation.title
  };
  return $scope.donateClicked = function() {
    return $scope.notiDonation = true;
  };
});

//# sourceMappingURL=donation.js.map

'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/individual-badge', {
    controller: 'quitPointIndividualCtrl',
    templateUrl: 'views/quitpoint/individual-badge.jade'
  });
}).controller('quitPointIndividualCtrl', function(Settings, Utils, $scope, $rootScope, $location, $timeout, OverlayService, FacebookService, Snapper, FacebookShareService) {
  var badgeActive;
  console.log('quitPointIndividualCtrl');
  badgeActive = function() {
    Snapper.settings({
      disable: 'none'
    });
    if (Snapper.state().state === 'right') {
      return Snapper.close('right');
    } else {
      return Snapper.open('right');
    }
  };
  $rootScope.header = {
    rightIcon: 'icon-badge-white',
    rightMethod: badgeActive,
    containerClass: 'landing-page individual-badge'
  };
  $scope.model = $rootScope.detailBagde;
  console.log('model', $scope.model);
  $(".badge-wrapper .badge").css("background-image", "url(" + $scope.model.imgURL + ")").addClass("animate");
  return $scope.share = function() {
    var item, shareModel;
    item = $scope.model || {};
    shareModel = {
      method: "share",
      name: item.title,
      href: Settings.sharingData.link,
      caption: item.title,
      description: item.description,
      picture: item.thumbPath
    };
    mconsole.log('share data', shareModel);
    return FacebookShareService.showDialog(shareModel);
  };
});

//# sourceMappingURL=individual-badge.js.map

'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/new-character', {
    controller: 'quitPointNewCharacterCtrl',
    templateUrl: 'views/quitpoint/new-character.jade'
  });
}).controller('quitPointNewCharacterCtrl', function($scope, $rootScope, Utils, Pages, Snapper, $location, UserData, ContentService, AccountService, Device) {
  var listByCharacter;
  mconsole.log('quitPointNewCharacterCtrl');
  Snapper.enable();
  $rootScope.header = {
    pageTitle: Pages.quitPointNewCharacter.title
  };
  $scope.character = null;
  $scope.$watch('character', function() {
    var btn;
    mconsole.log('characterChanged');
    if (!$scope.character) {
      return;
    }
    btn = $('.btn.btn-submit');
    if ($scope.character !== '') {
      return btn.addClass('active');
    } else {
      return btn.removeClass('active');
    }
  });
  $scope.submit = function(path) {
    var model, obj;
    if (!$scope.character) {
      return;
    }
    if ($scope.avatarList) {
      obj = _.find($scope.avatarList, function(chr) {
        return chr["profile-img-path"] === $scope.character;
      });
    }
    Utils.showLoading();
    model = {
      "avatar-path": obj.path,
      "avatar-point": obj.point
    };
    model = UserData.addToken(model);
    return AccountService.buyAvatar(model).then(function(data) {
      if ((data.type != null) && data.type === 'ERROR') {
        Device.alert(data.message, null, 'Fail', 'Done');
      } else {
        $rootScope.avatarRedeem = data;
        $scope.notiNewCharacter = true;
        $rootScope.$broadcast('profile-updated');
      }
      return Utils.hideLoading();
    }, function(err) {
      return Utils.hideLoading();
    });
  };
  listByCharacter = function() {
    var model;
    Utils.showLoading();
    model = {
      'type': 'PREMIUM'
    };
    model = UserData.addToken(model);
    return ContentService.getAvatarList(model).then(function(data) {
      console.log('avatar list', data);
      $scope.avatarList = data['list-avatars'];
      return Utils.hideLoading();
    }, function(err) {
      console.log('avatar list error', err);
      return Utils.hideLoading();
    });
  };
  return listByCharacter();
});

//# sourceMappingURL=new-character.js.map

'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/thank-donation', {
    controller: 'quitPointThankDonationCtrl',
    templateUrl: 'views/quitpoint/thank-donation.jade'
  });
}).controller('quitPointThankDonationCtrl', function($scope, $rootScope) {
  console.log('quitPointThankDonationCtrl');
  return $rootScope.header = {
    pageTitle: ' '
  };
});

//# sourceMappingURL=thank-donation.js.map

'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/your-badge', {
    controller: 'quitPointYourBadgeCtrl',
    templateUrl: 'views/quitpoint/your-badge.jade'
  });
}).controller('quitPointYourBadgeCtrl', function(BadgeService, $scope, $rootScope, $location, Utils, UserData, GigyaService, Pages, Snapper) {
  var getNumberOfKind, kindList, loadData, updateKindList;
  console.log('quitPointYourBadgeCtrl');
  $('#nav-your-badges').trigger('click');
  Utils.showLoading();
  Snapper.enable();
  $rootScope.header = {
    pageTitle: Pages.quitPointYourBadge.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle
  };
  $scope.kind = [];
  kindList = ['Time Challenges', 'Science', 'Personal', 'Work'];
  getNumberOfKind = function(arr, kind) {
    var filter;
    filter = _.filter(arr, function(item) {
      return (item.type === kind) && (item.count > 0);
    });
    return filter.length;
  };
  updateKindList = function(arr, kindList) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = kindList.length; _i < _len; _i++) {
      item = kindList[_i];
      _results.push($scope.kind[item] = (getNumberOfKind(arr, item)) > 0);
    }
    return _results;
  };
  loadData = function() {
    var model;
    if ($rootScope.previousPath !== 'quitpoint/individual-badge') {
      model = UserData.addToken({});
      return BadgeService.getChallenge(model).then(function(data) {
        $rootScope.challenges = data;
        mconsole.log('loadData', $rootScope.challenges);
        updateKindList($rootScope.challenges, kindList);
        return Utils.hideLoading();
      }, function(err) {
        return Utils.hideLoading();
      });
    } else {
      return Utils.hideLoading();
    }
  };
  loadData();
  return $scope.navToDetail = function(path, detail) {
    $rootScope.detailBagde = detail;
    return $location.path(path);
  };
});

//# sourceMappingURL=your-badge.js.map

'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/your-coupons', {
    controller: 'quitPointYourCouponsCtrl',
    templateUrl: 'views/quitpoint/your-coupons.jade'
  });
}).controller('quitPointYourCouponsCtrl', function($scope, $rootScope, $timeout, $location, Settings, Utils, Pages, Device, UserData, QuitPointService) {
  var animateTo, flage, getCouponList;
  console.log('quitPointYourCouponsCtrl');
  $rootScope.header = {
    pageTitle: Pages.quitPointYourCoupons.title
  };
  animateTo = function(top, duration) {
    return $('#main').animate({
      scrollTop: top
    }, duration || 1000);
  };
  getCouponList = function() {
    var model;
    Utils.showLoading();
    model = {
      'coupon-path': '/content/en_US/coupons'
    };
    model = UserData.addToken(model);
    return QuitPointService.getCouponList(model).then(function(data) {
      Utils.hideLoading();
      console.log('data', data);
      if ((data.type != null) && (data.type === 'ERROR')) {
        return Device.alert(data.message, null, 'Error', 'Done');
      } else {
        return $scope.data = data['list-coupons'];
      }
    }, function(err) {
      Utils.hideLoading();
      console.log('data', err);
      return Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
    });
  };
  getCouponList();
  flage = true;
  $scope.emailCoupon = function() {
    var model;
    Utils.showLoading();
    if (flage) {
      flage = false;
      console.log('emailCoupon');
      model = UserData.addToken({});
      gsk.log(model);
      QuitPointService.createCoupon(model).then(function(data) {
        Utils.hideLoading();
        flage = true;
        console.log(data);
        $location.url('/quitpoint/coupon-detail');
      }, function(err) {
        Utils.hideLoading();
        flage = true;
        Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
        console.log('err', err);
      });
    }
  };
});

//# sourceMappingURL=your-coupons.js.map

'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/your-point-detail', {
    controller: 'quitPointYourPointDetailCtrl',
    templateUrl: 'views/quitpoint/your-point-detail.jade'
  });
}).controller('quitPointYourPointDetailCtrl', function(CONSTANTS, $scope, $rootScope, Pages, Snapper, UserData) {
  var point, userProfile;
  console.log('quitPointYourPointDetailCtrl');
  $scope.constants = CONSTANTS;
  $rootScope.header = {
    pageTitle: Pages.quitPointYourPointDetail.title
  };
  userProfile = UserData.getProfile();
  point = userProfile['user-total-points'] || 0;
  return $scope.userPoint = point;
});

//# sourceMappingURL=your-point-detail.js.map

'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/your-point', {
    controller: 'quitPointYourPointCtrl',
    templateUrl: 'views/quitpoint/your-point.jade'
  });
}).controller('quitPointYourPointCtrl', function(CONSTANTS, $scope, $rootScope, UserData, Utils, Pages, Snapper) {
  var point, userProfile;
  console.log('quitPointYourPointCtrl');
  $scope.constants = CONSTANTS;
  $('#nav-your-quitpoint').trigger('click');
  $rootScope.header = {
    pageTitle: Pages.quitPointYourPoint.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle
  };

  /*
  console.log 'leadBy', $rootScope.leadBy
  if $rootScope.leadBy is 'sidebar-left'
     * show hamburger
    $rootScope.header =
      pageTitle: Pages.quitPointYourPoint.title #'Your Quit Points'
      leftIcon: 'icon-menu'
      leftMethod: Snapper.hamburgerToggle
    $rootScope.leadBy = null
  else
     * show left arror
    $rootScope.header =
      pageTitle: 'Your Quit Points'
   */
  userProfile = UserData.getProfile();
  point = userProfile['user-total-points'] || 0;
  return $scope.userPoint = point;
});

//# sourceMappingURL=your-point.js.map

'use strict';
angular.module('site.quitteam').config(function($routeProvider) {
  return $routeProvider.when('/quitteam/team-landing-1/:id', {
    controller: 'quitteamLanding1Ctrl',
    templateUrl: 'views/quitteam/team-landing-1.jade'
  });
}).controller('quitteamLanding1Ctrl', function(localStorageService, BadgeService, Environment, $scope, $rootScope, $location, $timeout, $routeParams, Device, Pages, Settings, OverlayService, Snapper, AccountService, UserData, ContentService, QuitTeamService, Utils) {
  var animateTo, flag, getLastBadget, getMemeber, getSmiles, getThumBadget, i, intro, introOnFinish, introStep0, path, setValueToMember, showOverlay, splitArr, updateCheerButton, updateSmileyButton;
  console.log('quitteamLanding1Ctrl');
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.quitteamLanding1.title,
    containerClass: 'quit-team-page'
  };
  $scope.cheers = null;
  $scope.smile = null;
  $scope.smileList1 = Settings.quitteamLanding1Ctrl.smileList1;
  $scope.smileList2 = Settings.quitteamLanding1Ctrl.smileList2;
  $scope.smileList3 = Settings.quitteamLanding1Ctrl.smileList3;
  splitArr = function(arr, length) {
    var i, item, j, nArr, _i, _len;
    nArr = [];
    i = 0;
    j = 0;
    while (arr.length > 0) {
      nArr[i] = [];
      for (_i = 0, _len = arr.length; _i < _len; _i++) {
        item = arr[_i];
        if ((_i === length) || (!arr)) {
          break;
        }
        nArr[i].push(arr.pop());
      }
      i++;
    }
    return nArr;
  };
  console.log('smile', $scope.smileList);
  getSmiles = function() {
    var model;
    console.log('getSmiles');
    model = {
      'path': '/content/en_US/smiles'
    };
    model = UserData.addToken(model);
    return ContentService.getSmileList(model).then(function(data) {
      $scope.smileList = data['smile-list'];
      $scope.smileList = splitArr($scope.smileList, 8);
      return console.log('smiles', data);
    }, function(err) {
      return console.log('smiles error', err);
    });
  };
  getSmiles();
  updateCheerButton = function(status) {
    if (status) {
      return $('.btn-cheer').addClass('active');
    } else {
      return $('.btn-cheer').removeClass('active');
    }
  };
  updateCheerButton($scope.cheer);
  $scope.$watch('cheer', function() {
    return updateCheerButton($scope.cheer);
  });
  flag = true;
  $scope.sendCheer = function() {
    var model;
    if (flag) {
      flag = false;
      if (!$scope.cheer) {
        return;
      }
      model = UserData.addToken({});
      model.member = {
        id: $routeParams.id
      };
      model.activity = {
        'type': "CHEER",
        'value': $scope.cheer,
        'is-read': false
      };
      QuitTeamService.sayCheers(model).then(function(data) {
        flag = true;
        $scope.notiSendCheer = true;
        $scope.hideSendCheer = true;
        $scope.getViewMemberActi();
        updateCheerButton($scope.cheer);
      }, function(err) {
        flag = true;
        updateCheerButton($scope.cheer);
        Device.alert(Settings.message.cannotSendMessage, null, 'Message', 'Done');
      });
    }
  };
  updateSmileyButton = function(status) {
    if (status) {
      return $('.btn-smile').addClass('active');
    } else {
      return $('.btn-smile').removeClass('active');
    }
  };
  updateSmileyButton($scope.smile);
  $rootScope.$on('gk-panel-changed', function(e, value) {
    $scope.smile = value;
    return updateSmileyButton($scope.smile);
  });
  $scope.sendSmile = function() {
    var model;
    if (flag) {
      flag = false;
      if (!$scope.smile) {
        return;
      }
      model = UserData.addToken({});
      model.member = {
        id: $routeParams.id
      };
      model.activity = {
        'type': "SMILEY",
        'value': $scope.smile,
        'is-read': false
      };
      QuitTeamService.sayCheers(model).then(function(data) {
        flag = true;
        $scope.notiSendSmiley = true;
        $scope.hideSendCheer = true;
        $scope.getViewMemberActi();
        updateSmileyButton($scope.smile);
      }, function(err) {
        flag = true;
        updateSmileyButton($scope.smile);
        Device.alert(Settings.message.cannotSendMessage, null, 'Message', 'Done');
      });
    }
  };
  path = '/quitteam/team-landing-1';
  intro = introJs();
  intro.setOptions({
    showStepNumbers: false,
    showBullets: false,
    exitOnOverlayClick: false,
    scrollToElement: false,
    steps: Settings.quitteamLanding1Ctrl.intro
  });
  animateTo = function(top) {
    console.log($('#main'));
    return $('#main').animate({
      scrollTop: top
    }, 800);
  };
  introOnFinish = function() {
    animateTo(0);
    $('.snap-drawers').show('fast');
    OverlayService.setShowed(path);
    $rootScope.setsSrollPos = false;
    return $rootScope.$broadcast('intro-has-finished', true);
  };
  intro.onexit(introOnFinish);
  intro.oncomplete(introOnFinish);
  introStep0 = function(elm) {
    var offsetTop;
    console.log('introStep0', elm);
    elm.intro = elm.intro.replace('Nick', $scope.members.name);
    offsetTop = 490;
    return animateTo(offsetTop);
  };
  intro.onbeforechange(function() {
    var current;
    current = this._introItems[this._currentStep];
    switch (this._currentStep) {
      case 0:
        return introStep0(current);
    }
  });
  showOverlay = function() {
    var helpStatus;
    return;
    helpStatus = localStorageService.get('helpStatus') || false;
    if (!helpStatus) {
      return;
    }
    if (!Environment.isOverlay) {
      return;
    }
    if (OverlayService.isShowed(path) === false) {
      $('.snap-drawers').hide('fast');
      return $timeout(function() {
        $rootScope.setsSrollPos = true;
        return intro.start();
      }, 800);
    } else {
      return $rootScope.$broadcast('intro-has-finished', true);
    }
  };
  setValueToMember = function(data) {
    $scope.totalDay = data['total-days'];
    $scope.badges = data['total-badges'];
    $scope.quitPoint = data['total-points'];
  };
  getMemeber = function() {
    var model;
    model = UserData.addToken({});
    model['member-id'] = $routeParams.id;
    return AccountService.viewMember(model).then(function(data) {
      $scope.members = data.user;
      $scope.flag = data.user.country.toLowerCase();
      $scope.members.avatar = $scope.members.avatar;
      setValueToMember(data.user);
      showOverlay();
    }, function(err) {
      showOverlay();
    });
  };
  getMemeber();
  $scope.nonBadget = [];
  i = 0;
  while (i < 5) {
    $scope.nonBadget.push(i);
    i++;
  }
  getThumBadget = function(list) {
    var len, _results;
    len = 5 - list.length;
    $scope.nonBadget = [];
    i = 0;
    _results = [];
    while (i < len) {
      $scope.nonBadget.push(i);
      _results.push(i++);
    }
    return _results;
  };
  getLastBadget = function() {
    var model;
    model = UserData.addToken({});
    model['user-id'] = $routeParams.id;
    return BadgeService.getChallengesTop(model).then(function(data) {
      mconsole.log('BadgeService.getChallengesTop', data);
      getThumBadget(data);
      $scope.listBadget = data;
    }, function(err) {
      mconsole.log(err);
    });
  };
  getLastBadget();
  $scope.hideSendCheer = true;
  $scope.hideSend = function() {
    $scope.hideSendCheer = true;
  };
  $scope.showSend = function() {
    var hHeader, hLastBad, hPlanTime, hThumbs, total;
    hHeader = $('#header').outerHeight();
    hThumbs = $('[data-group-thumbs]').outerHeight();
    hPlanTime = $('[data-plan-time]').outerHeight();
    hLastBad = $('[data-latest-badges]').outerHeight();
    total = hHeader + hThumbs + hPlanTime + hLastBad;
    if ($('html').hasClass('gte-ios-7')) {
      total -= 40;
    }
    $scope.hideSendCheer = false;
    Utils.mainScroll(total, 800);
  };
  $scope.getViewMemberActi = function() {
    var model;
    model = UserData.addToken({});
    model['member-id'] = $routeParams.id;
    QuitTeamService.viewActivityMember(model).then(function(data) {
      $scope.listYouSend = data['activity-cheers'];
    }, function(err) {
      mconsole.log('Get fail');
    });
  };
  $scope.getViewMemberActi();
});

//# sourceMappingURL=team-landing-1.js.map

'use strict';
angular.module('site.quitteam').config(function($routeProvider) {
  return $routeProvider.when('/quitteam/team-landing-2', {
    controller: 'quitteamLanding2Ctrl',
    templateUrl: 'views/quitteam/team-landing-2.jade'
  });
}).controller('quitteamLanding2Ctrl', function(localStorageService, Environment, $scope, $rootScope, $timeout, $location, $routeParams, Pages, Settings, Snapper, OverlayService, AccountService, UserData, LandingService, Utils, Device, CONSTANTS) {
  var activityCheers, activityFeed, animateTo, btnCheers, intro, introOnFinish, introStep0, introStep1, introStep2, leftMethod, listActivities, listCheers, loadData, path, setActivityCheer, setCurrentUser, setDataTeamView, setListTeam, showOverlay, snapDrawers, tabContent;
  console.log('quitteamLanding2Ctrl');
  $('#nav-quit-team').trigger('click');
  leftMethod = function() {
    return $location.path('/landing-page');
  };
  Snapper.enable();
  $rootScope.leadBy = null;
  $rootScope.header = {
    pageTitle: Pages.quitteamLanding2.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle,
    containerClass: 'quit-team-page'
  };
  initPreloadImageSmilesCheer();
  path = $location.path();
  intro = introJs();
  intro.setOptions({
    showStepNumbers: false,
    showBullets: false,
    exitOnOverlayClick: false,
    scrollToElement: false,
    steps: Settings.quitteamLanding2Ctrl.intro
  });
  activityFeed = $('#activity-feed');
  activityCheers = $('#activity-cheers');
  snapDrawers = $('.snap-drawers');
  tabContent = $('.tab-content');
  btnCheers = $('#btn-cheers');
  listActivities = $('[data-name="list-activities"]');
  listCheers = $('[data-name="list-cheers"]');
  animateTo = function(top, duration) {
    return $('#main').animate({
      scrollTop: top
    }, duration || 1000);
  };
  introOnFinish = function() {
    $('html').removeClass('hide-header');
    listActivities.children('.static-content').remove();
    listCheers.children('.static-content').remove();
    activityFeed.parent().css('height', '');
    activityCheers.parent().css('height', '');
    snapDrawers.show('fast');
    OverlayService.setShowed(path);
    $rootScope.setsSrollPos = false;
    $rootScope.$broadcast('intro-has-finished', true);
    return $scope.setShowOneorTwo();
  };
  intro.onexit(introOnFinish);
  intro.oncomplete(introOnFinish);
  introStep0 = function(current) {
    var offsetTop;
    mconsole.log('introStep0', current);
    $('html').addClass('hide-header');
    listActivities.prepend(current.staticContent);
    tabContent.parent().css('height', '+=245px');
    offsetTop = 500;
    return animateTo(offsetTop, 700);
  };
  introStep1 = function(current) {
    var offsetTop;
    listCheers.prepend(current.staticContent);
    offsetTop = 408;
    animateTo(offsetTop, 500);
    return btnCheers.trigger('click');
  };
  introStep2 = function(current) {
    $('html').removeClass('hide-header');
    current.intro = current.intro.replace('#Nick', $scope.firstUser['user-name']);
    tabContent.parent().css('height', '');
    return animateTo(0, 500);
  };
  intro.onbeforechange(function() {
    var current;
    current = this._introItems[this._currentStep];
    switch (this._currentStep) {
      case 0:
        return introStep0(current);
      case 1:
        return introStep1(current);
      case 2:
        return introStep2(current);
    }
  });
  showOverlay = function() {
    var helpStatus;
    helpStatus = localStorageService.get('helpStatus') || false;
    if (!Environment.isOverlay) {
      return;
    }
    if (!helpStatus) {
      $scope.setShowOneorTwo();
      return;
    }
    if (OverlayService.isShowed(path) === false) {
      $timeout(function() {
        return snapDrawers.hide('fast');
      }, CONSTANTS.OVERLAYS_TIME);
      $timeout(function() {
        $rootScope.setsSrollPos = true;
        return intro.start();
      }, 500 || CONSTANTS.OVERLAYS_TIME);
    } else {
      $rootScope.$broadcast('intro-has-finished', true);
      $scope.setShowOneorTwo();
    }
  };
  $scope.setShowOneorTwo = function() {
    if ($scope.showPopOne === true) {
      $scope.notiFirstOne = true;
    } else if ($scope.showPopNot === true) {
      $scope.notiNotFull = true;
    }
  };
  $scope.personNull = {
    'small-avatar': "images/upload/quit-team/face-6.png",
    character: "en_UK",
    country: "uk",
    id: null,
    'user-name': ""
  };
  $scope.listTeamMem = [];
  setListTeam = function() {
    var i;
    $scope.listTeamMem[0] = ($scope.listTeamMem[0] ? $scope.listTeamMem[0] : $scope.personNull);
    $scope.listTeamMem[1] = ($scope.listTeamMem[1] ? $scope.listTeamMem[1] : $scope.personNull);
    $scope.listTeamMem[2] = ($scope.listTeamMem[2] ? $scope.listTeamMem[2] : $scope.personNull);
    $scope.listTeamMem[3] = ($scope.listTeamMem[3] ? $scope.listTeamMem[3] : $scope.personNull);
    $scope.listTeamMem[4] = ($scope.listTeamMem[4] ? $scope.listTeamMem[4] : $scope.personNull);
    $scope.listTeamMem[5] = ($scope.listTeamMem[5] ? $scope.listTeamMem[5] : $scope.personNull);
    i = 0;
    while (i < 6) {
      $scope.listTeamMem[i].country = $scope.listTeamMem[i].country.toLowerCase();
      i++;
    }
  };
  $scope.setListNonActivity = function(data) {
    $scope.nonActiFeed = [];
    _.forEach(data['activity-feed'], function(data) {
      return $scope.nonActiFeed.push(data);
    });
    $scope.nonActiFeed.shift();
  };
  setActivityCheer = function(data) {
    $scope.activityFeed = data['activity-feed'];
    $scope.activityCheers = data['activity-cheers'];
    $scope.setListNonActivity(data);
    $scope.showCheer = data['activity-cheers'].length;
    $rootScope.countCheer = 0;
    _.forEach($scope.activityCheers, function(cheer) {
      if (cheer.activity["is-read"] === false) {
        return $rootScope.countCheer++;
      }
    });
    console.log($scope.cheerUnread);
  };
  setDataTeamView = function(data) {
    console.log(data);
    setActivityCheer(data);
    $scope.totalPoint = data;
    if ($rootScope.memUser.length === 1) {
      $scope.showPopOne = true;
    }
    if ($rootScope.memUser.length === 2) {
      $scope.showPopNot = true;
    }
    if (data.members) {
      $scope.listTeamMem = data.members;
    } else {
      $scope.listTeamMem.push($scope.personNull);
    }
    return setListTeam();
  };
  setCurrentUser = function(listUser) {
    var current, item, _i, _len;
    current = UserData.getProfile();
    mconsole.log('setCurrentUser', current);
    for (_i = 0, _len = listUser.length; _i < _len; _i++) {
      item = listUser[_i];
      if (item.id === current['user-id'].toString()) {
        mconsole.log('correct item', item);
        item = current;
        item.id = item['user-id'];
        mconsole.log('item', listUser);
        return;
      }
    }
  };
  loadData = function() {
    var model;
    mconsole.log('team-landing-2 loadData');
    Utils.showLoading();
    model = UserData.addToken({});
    return AccountService.viewTeam(model).then(function(data) {
      Utils.hideLoading();
      if ((data.type != null) && data.type === 'ERROR') {
        Device.alert(data.message, null, 'Fail', 'Done');
      } else {
        $rootScope.memUser = data.members;
        setDataTeamView(data);
        $scope.firstUser = data.members[0];
      }
      showOverlay();
    }, function(err) {
      Utils.hideLoading();
      showOverlay();
    });
  };
  loadData();
  $scope.viewTeamMember = function(id) {
    if (id !== null) {
      id = parseInt(id);
    }
    if (id !== null && id !== $rootScope.userId) {
      $location.url('/quitteam/team-landing-1/' + id);
    }
  };
  $scope.readCheer = function() {
    var model;
    model = UserData.addToken({});
    return LandingService.readCheer(model).then(function(data) {
      $rootScope.countCheer = 0;
      console.log('Success read cheer');
    }, function(err) {
      console.log('Fail read cheer');
    });
  };
  $scope.popupClose = function() {
    $scope.showPopupOne = false;
    return $scope.showPopupNot = false;
  };
});

//# sourceMappingURL=team-landing-2.js.map

'use strict';
angular.module('site.recap').config(function($routeProvider) {
  return $routeProvider.when('/recap/great', {
    controller: 'recapLanding1Ctrl',
    templateUrl: 'views/recap/great.jade'
  });
}).controller('recapLanding1Ctrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('recapLanding1Ctrl');
  Snapper.disable();
  return $rootScope.header = {
    pageTitle: Pages.recapIndex.title
  };
});

//# sourceMappingURL=great.js.map

'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/age', {
    controller: 'signupAgeCtrl',
    templateUrl: 'views/signup/age.jade'
  });
}).controller('signupAgeCtrl', function($scope, $rootScope, $location) {
  var updateButtonStatus;
  console.log('signupAgeCtrl');
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.age = $rootScope.signUpModel.age || null;
  updateButtonStatus = function(status) {
    var btn;
    btn = $('.btn.btn-2');
    if (status != null) {
      return btn.addClass('active');
    } else {
      return btn.removeClass('active');
    }
  };
  updateButtonStatus($scope.age);
  $scope.$watch('age', function() {
    return updateButtonStatus($scope.age);
  });
  return $scope.next = function() {
    if (!($scope.age != null)) {
      return;
    }
    $rootScope.signUpModel.age = $scope.age;
    return $location.path('/signup/gender');
  };
});

//# sourceMappingURL=age.js.map

'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/best-time', {
    controller: 'signupBestTimeCtrl',
    templateUrl: 'views/signup/best-time.jade'
  });
}).controller('signupBestTimeCtrl', function($scope, $rootScope, $location) {
  var defaultTime, updateButtonStatus;
  console.log('signupBestTimeCtrl');
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  defaultTime = new Date();
  defaultTime.setHours(7);
  defaultTime.setMinutes(30);
  $scope.bestTime = $rootScope.signUpModel.bestTime || defaultTime;
  updateButtonStatus = function(status) {
    var focusBtn;
    focusBtn = $('.btn.btn-2');
    if (status != null) {
      return focusBtn.addClass('active');
    } else {
      return focusBtn.removeClass('active');
    }
  };
  updateButtonStatus($scope.bestTime);
  $scope.$watch('bestTime', function() {
    return updateButtonStatus($scope.bestTime);
  });
  return $scope.next = function() {
    if (!($scope.bestTime != null)) {
      return;
    }
    $rootScope.signUpModel.bestTime = $scope.bestTime;
    return $location.path('/signup/replace');
  };
});

//# sourceMappingURL=best-time.js.map

'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/character', {
    controller: 'signupCharacter',
    templateUrl: 'views/signup/character.jade'
  });
}).controller('signupCharacter', function(Utils, $scope, $rootScope, $location, Settings, UserData, ContentService) {
  var character, getAvatarList;
  console.log('signupCharacter');
  Utils.showLoading();
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.character = character = $rootScope.signUpModel.character || '';
  getAvatarList = function() {
    var model;
    console.log('getAvatarList');
    model = {
      'type': 'FREE'
    };
    model = UserData.addToken(model);
    return ContentService.getAvatarList(model).then(function(data) {
      console.log('avatar list', data);
      $scope.avatarList = data['list-avatars'];
      return Utils.hideLoading();
    }, function(err) {
      console.log('avatar list error', err);
      return Utils.hideLoading();
    });
  };
  getAvatarList();
  $scope.$watch('character', function() {
    var btn;
    btn = $('.btn.btn-2');
    if ($scope.character !== '') {
      return btn.addClass('active');
    } else {
      return btn.removeClass('active');
    }
  });
  return $scope.next = function() {
    if ($scope.character.length === 0) {
      return;
    }
    $rootScope.signUpModel.character = $scope.character;
    return $location.path('/signup/where-hear');
  };
});

//# sourceMappingURL=character.js.map

'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/country', {
    controller: 'signupCountryCtrl',
    templateUrl: 'views/signup/country.jade'
  });
}).controller('signupCountryCtrl', function($scope, $rootScope, $location) {
  var updateButtonStatus;
  console.log('signupCountryCtrl');
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.country = $rootScope.signUpModel.country || 'UK';
  updateButtonStatus = function(status) {
    var btn;
    btn = $('.btn.btn-2');
    if (status != null) {
      return btn.addClass('active');
    } else {
      return btn.removeClass('active');
    }
  };
  updateButtonStatus($scope.country);
  $scope.$watch('country', function() {
    return updateButtonStatus($scope.country);
  });
  return $scope.next = function() {
    if (!($scope.country != null)) {
      return;
    }
    $rootScope.signUpModel.country = $scope.country;
    return $location.path('/signup/language');
  };
});

//# sourceMappingURL=country.js.map

'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/gender', {
    controller: 'signupGenderCtrl',
    templateUrl: 'views/signup/gender.jade'
  });
}).controller('signupGenderCtrl', function($scope, $rootScope, $location) {
  console.log('signupGenderCtrl');
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.gender = $rootScope.signUpModel.gender || 'MALE';
  return $scope.next = function() {
    if (!($scope.gender != null)) {
      return;
    }
    $rootScope.signUpModel.gender = $scope.gender;
    return $location.path('/signup/country');
  };
});

//# sourceMappingURL=gender.js.map

'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/language', {
    controller: 'signupLanguageCtrl',
    templateUrl: 'views/signup/language.jade'
  });
}).controller('signupLanguageCtrl', function($scope, $rootScope, $location) {
  var updateButtonStatus;
  console.log('signupLanguageCtrl');
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.language = $rootScope.signUpModel.language || 'en_US';
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('.btn.btn-2').addClass('active');
    } else {
      return $('.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.language);
  $scope.$watch('language', function() {
    return updateButtonStatus($scope.language);
  });
  return $scope.next = function() {
    if (!($scope.language != null)) {
      return;
    }
    $rootScope.signUpModel.language = $scope.language;
    return $location.path('/signup/best-time');
  };
});

//# sourceMappingURL=language.js.map

'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/progress-update', {
    controller: 'signupProgessCtrl',
    templateUrl: 'views/signup/progress-update.jade'
  });
}).controller('signupProgessCtrl', function($scope, $rootScope, $location) {
  console.log('signupProgessCtrl');
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.progressUpdate = $rootScope.signUpModel.progressUpdate || 'DAILY';
  return $scope.next = function() {
    if (!($scope.progressUpdate != null)) {
      return;
    }
    $rootScope.signUpModel.progressUpdate = $scope.progressUpdate;
    return $location.path('/signup/best-time');
  };
});

//# sourceMappingURL=progress-update.js.map

'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/reason', {
    controller: 'signupReasonCtrl',
    templateUrl: 'views/signup/reason.jade'
  });
}).controller('signupReasonCtrl', function($scope, $rootScope, $location, CameraService, localStorageService, Device, Settings) {
  var messageMemo, reason, updateButtonStatus;
  console.log('signupReasonCtrl');
  if (typeof $rootScope.reasonModel === 'undefined') {
    $rootScope.reasonModel = {};
  }
  messageMemo = $('#message-memo');
  $scope.reason = reason = $rootScope.reasonModel.memo || null;
  mconsole.log('reason', $scope.reason, $rootScope.reasonModel.memo);
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    } else {
      return $('a.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.reason);
  $scope.$watch('reason', function() {
    return updateButtonStatus($scope.reason);
  });
  $scope.next = function() {
    var redirectTo;
    if (!($scope.reason != null)) {
      return;
    }
    $rootScope.reasonModel.memo = $scope.reason;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    return $location.path('/signup/character');
  };
  $scope.updateMemo = function() {
    $scope.reason = messageMemo.val();
    $('[data-name="reason-to-quit"]').find('value-reason').html($scope.reason);
    messageMemo.val('');
  };
  $scope.mediaPopup = function() {
    $scope.showPopup = true;
  };
  $scope.memoPopup = function() {
    $scope.showMemoPopup = true;
  };
  $scope.getPhotoFromLibrary = function() {
    CameraService.photoFromLibrary().then(function(imageData) {
      $rootScope.reasonModel.photo = imageData;
      Device.alert(Settings.message.reasonToQuitPhoto, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  $scope.getPhotoFromCamera = function() {
    CameraService.takeNewPhoto().then(function(imageData) {
      $rootScope.reasonModel.photo = imageData;
      Device.alert(Settings.message.reasonToQuitPhoto, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  $scope.getVideoFromLibrary = function() {
    CameraService.videoFromLibrary().then(function(videoData) {
      $rootScope.reasonModel.video = videoData;
      Device.alert(Settings.message.reasonToQuitVideo, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  $scope.captureVideo = function() {
    CameraService.takeNewVideo().then(function(videoData) {
      $rootScope.reasonModel.video = videoData;
      Device.alert(Settings.message.reasonToQuitVideo, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  $scope.captureAudio = function() {
    CameraService.takeNewAudio().then(function(audioData) {
      $rootScope.reasonModel.audio = audioData;
      Device.alert(Settings.message.reasonToQuitAudio, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
});

//# sourceMappingURL=reason.js.map

'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/replace', {
    controller: 'signupReplaceCtrl',
    templateUrl: 'views/signup/replace.jade'
  });
}).controller('signupReplaceCtrl', function($scope, $rootScope, $location, Utils, UserData, AccountService) {
  var getProductReplace, replace, updateButtonStatus;
  console.log('signupReplaceCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.replace = replace = $rootScope.habitModel.replace || null;
  mconsole.log('replace', $scope.replace);
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    } else {
      return $('a.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.replace);
  $scope.$watch('replace', function() {
    return updateButtonStatus($scope.replace);
  });
  $scope.next = function() {
    var redirectTo;
    if (!($scope.replace != null)) {
      return;
    }
    console.log($scope.replace);
    $rootScope.habitModel.replace = $scope.replace;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    $rootScope.signUpModel.productChoice = $scope.replace;
    $rootScope.objQuestion = _.find($scope.productList, function(product) {
      return product.path === $scope.replace;
    });
    $rootScope.habitModel.replaceData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    return $location.path('/signup/reason');
  };
  $scope.getNextHabit = function(obj) {
    var model;
    model = {
      'current-path': obj['current-path'],
      'answer-path': obj.path
    };
    $rootScope.signUpModel["list-questions"] = [
      {
        question: obj['current-path'],
        answer: obj.path
      }
    ];
    AccountService.getNextHabitSignUp(model).then(function(data) {
      console.log(data);
    }, function(err) {
      console.log(err);
    });
  };
  getProductReplace = function() {
    var model;
    Utils.showLoading();
    model = null;
    AccountService.getFirstHabitSignUp(model).then(function(data) {
      Utils.hideLoading();
      $scope.questPro = data.question;
      $scope.productList = data['answer-list'];
      mconsole.log('Get first habit success');
      mconsole.log(data);
    }, function(err) {
      Utils.hideLoading();
      mconsole.log('Get first habit fail');
      mconsole.log(err);
    });
  };
  getProductReplace();
});

//# sourceMappingURL=replace.js.map

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

"use strict";
angular.module("site.test").config(function($routeProvider) {
  return $routeProvider.when("/test/hammer", {
    controller: "testHammerCtrl",
    templateUrl: "views/test/hammer.jade"
  });
}).controller("testHammerCtrl", function($scope, $rootScope, Snapper, Utils) {
  var hmListener, pinchIn, pinchOut;
  console.log('testHammerCtrl');
  Snapper.disable();
  $rootScope.header = {
    pageTitle: 'Testing for hammer'
  };
  hmListener = new Hammer(document.getElementById('hammer'));
  hmListener.get('pinch').set({
    enable: true
  });
  console.log('hmListener', hmListener);
  pinchOut = function() {
    return console.log('pinch-out', this);
  };
  pinchIn = function() {
    return console.log('pinch-in', this);
  };
  hmListener.on('pinchout', pinchOut);
  hmListener.on('pinchin', pinchIn);
  return hmListener.on('panstart panmove panend press', function(event) {
    return console.log('hmListener was touched', event.type, event);
  });
});

//# sourceMappingURL=test-hammer.js.map

"use strict";
angular.module("site.test").config(function($routeProvider) {
  return $routeProvider.when("/test/api", {
    controller: "testAPICtrl",
    templateUrl: "views/test/hammer.jade"
  });
}).controller("testAPICtrl", function(UserData, Point, $scope, $rootScope, Snapper, Utils) {
  var model;
  console.log('testAPICtrl', Point);
  model = {};
  model = UserData.addToken(model);
  return Point.getTimeline(model).then(function(data) {
    return console.log('getTimeline', data);
  }, function(err) {
    return console.log('err', err);
  });
});

//# sourceMappingURL=testapi.js.map

'use strict';
angular.module("site").factory("AccountService", function(CoreAPI, $resource, CONSTANTS, localStorageService) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd/:_id', {}, {
    signIn: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'sign-in.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    signUp: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'sign-up.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getAccountSetting: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'getAccountSetting'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    postAccountSetting: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'postAccountSetting'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    viewAccountSetting: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'view-account-setting.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    updateAccountSetting: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'update-account-setting.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    viewMember: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'view-team-member.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    viewTeam: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'view-team.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    postActivityToTeam: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'postActivityToTeam.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    postActivityToMember: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'postActivityToMember.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getFirstHabit: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-first-habit.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getNextHabit: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-next-habit.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    postRemindStartJourney: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'reminder-journey.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    myOldHabit: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-old-habit.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    changePass: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'change-password.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    forgotPass: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'forgot-password.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    forgotUsername: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'forgot-username.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getAllHabit: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-all-habit.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    updateHabit: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'update-habit.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getFirstHabitSignUp: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-first-habit-signup.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getNextHabitSignUp: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-next-habit-signup.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    buyAvatar: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'buy-avatar.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getPersonalChallenges: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-category-challenge.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    postPersonalChallenges: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'add-personal-challenge.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    }
  });
  fList = [
    {
      functionName: 'signIn',
      isCache: false
    }, {
      functionName: 'signUp',
      isCache: false
    }, {
      functionName: 'getAccountSetting',
      isCache: false
    }, {
      functionName: 'postAccountSetting',
      isCache: false
    }, {
      functionName: 'viewAccountSetting',
      isCache: false
    }, {
      functionName: 'updateAccountSetting',
      isCache: false
    }, {
      functionName: 'viewMember',
      isCache: true
    }, {
      functionName: 'viewTeam',
      isCache: true
    }, {
      functionName: 'postActivityToTeam',
      isCache: false
    }, {
      functionName: 'postActivityToMember',
      isCache: false
    }, {
      functionName: 'getFirstHabit',
      isCache: false
    }, {
      functionName: 'getNextHabit',
      isCache: false
    }, {
      functionName: 'postRemindStartJourney',
      isCache: false
    }, {
      functionName: 'myOldHabit',
      isCache: false
    }, {
      functionName: 'changePass',
      isCache: false
    }, {
      functionName: 'forgotPass',
      isCache: false
    }, {
      functionName: 'forgotUsername',
      isCache: false
    }, {
      functionName: 'getAllHabit',
      isCache: false
    }, {
      functionName: 'updateHabit',
      isCache: false
    }, {
      functionName: 'getFirstHabitSignUp',
      isCache: false
    }, {
      functionName: 'getNextHabitSignUp',
      isCache: false
    }, {
      functionName: 'buyAvatar',
      isCache: false
    }, {
      functionName: 'getPersonalChallenges',
      isCache: false
    }, {
      functionName: 'postPersonalChallenges',
      isCache: false
    }
  ];
  return CoreAPI.initWithOption(resource, 'AccountService', fList);
});

//# sourceMappingURL=account-service.js.map

'use strict';
angular.module('site').factory('BadgeService', function(CONSTANTS, $q, GigyaService, UserData) {
  var assignToLeft, badgeData, pFunctions;
  badgeData = LOCAL.badges;
  pFunctions = {};
  assignToLeft = _.partialRight(_.assign, function(a, b) {
    if (typeof a === 'undefined') {
      return b;
    } else {
      return a;
    }
  });
  pFunctions.getLocalDetailBadge = function(action) {
    var badge, source;
    source = _.find(badgeData, {
      id: action
    });
    if (!source) {
      return {};
    }
    badge = _.clone(source);
    badge.imgURL = CONSTANTS.BADGE_PATH + (badge.imgURL || '');
    badge.thumbPath = CONSTANTS.BADGE_PATH + (badge.thumbPath || '');
    return badge;
  };
  pFunctions.getLocalAllBadge = function() {
    return badgeData;
  };
  pFunctions.addAction = function(action) {
    var model;
    model = {
      action: action
    };
    model = UserData.addToken(model);
    return GigyaService.addBadge(model);
  };
  pFunctions.getDetailBadge = function(model) {
    var deferred;
    deferred = $q.defer();
    GigyaService.getBadgeDetail(model).then(function(data) {
      var nData;
      nData = assignToLeft(data, pFunctions.getLocalDetailBadge(data.id));
      return deferred.resolve(nData);
    }, function(err) {
      return deferred.reject(err);
    });
    return deferred.promise;
  };
  pFunctions.getChallenge = function(model) {
    var deferred;
    deferred = $q.defer();
    GigyaService.getChallenge(model).then(function(data) {
      var badgeList;
      $.each(data.badges, function(i, item) {
        return item = assignToLeft(item, pFunctions.getLocalDetailBadge(item.id));
      });
      badgeList = _.sortBy(data.badges, function(item) {
        return item.order;
      });
      return deferred.resolve(badgeList);
    }, function(err) {
      return deferred.reject(err);
    });
    return deferred.promise;
  };
  pFunctions.getChallengesTop = function(model) {
    var deferred;
    deferred = $q.defer();
    GigyaService.getChallengesTop(model).then(function(data) {
      var badgeList;
      $.each(data.badges, function(i, item) {
        return item = assignToLeft(item, pFunctions.getLocalDetailBadge(item.id));
      });
      badgeList = _.sortBy(data.badges, function(item) {
        return item.order;
      });
      return deferred.resolve(badgeList);
    }, function(err) {
      return deferred.reject(err);
    });
    return deferred.promise;
  };
  pFunctions.getTimeline = function(model) {
    var deferred;
    deferred = $q.defer();
    GigyaService.getTimeline(model).then(function(data) {
      $.each(data.badges, function(i, item) {
        return item = assignToLeft(item, pFunctions.getLocalDetailBadge(item.id));
      });
      data.badges = _.sortBy(data.badges, function(item) {
        return item.order;
      });
      $.each(data['personal-challenges'], function(i, item) {
        return item = assignToLeft(item, pFunctions.getLocalDetailBadge(item.id));
      });
      data['personal-challenges'] = _.sortBy(data['personal-challenges'], function(item) {
        return item.order;
      });
      return deferred.resolve(data);
    }, function(err) {
      return deferred.reject(err);
    });
    return deferred.promise;
  };
  return pFunctions;
});

//# sourceMappingURL=badge-service.js.map

'use strict';
angular.module('site').factory('BusinessGroup', function(UserData, QuitPointService, Utils, Device, QuitTeamService, localStorageService) {
  var f, leaveTeam, restartJourney;
  f = {};
  leaveTeam = function() {
    var model;
    model = UserData.addToken({});
    QuitTeamService.leaveTeam(model).then(function(data) {
      localStorageService.set('hasJoinedATeam', 'false');
    }, function(err) {
      Device.alert(err.message, null, 'Error', 'Done');
    });
  };
  restartJourney = function(callback) {
    var isRequesting, model;
    mconsole.log('restartJourney');
    if (isRequesting) {
      return;
    }
    isRequesting = true;
    Utils.showLoading();
    model = UserData.addToken({});
    return QuitPointService.restartJourney(model).then(function(data) {
      if (data.type === 'SUCCESS') {
        localStorageService.set('isJourneyStarted', 'false');
        leaveTeam();
        if (callback != null) {
          callback();
        }
      } else {
        Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
      }
      isRequesting = false;
      return Utils.hideLoading();
    }, function(err) {
      mconsole.log('restartJourney err', err);
      Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
      isRequesting = false;
      return Utils.hideLoading();
    });
  };
  f.restartJourney = function(callback) {
    return restartJourney(callback);
  };
  return f;
});

//# sourceMappingURL=business-group.js.map

"use strict";
angular.module("site").factory("CameraService", function($q, $rootScope, PhonegapCameraService, CONSTANTS, Device, Settings) {
  return {
    photoFromLibrary: function() {
      var defer, onFail, onSuccess;
      onSuccess = function(imageURL) {
        defer.resolve(imageURL);
      };
      onFail = function(message) {
        defer.reject(message);
      };
      defer = $q.defer();
      PhonegapCameraService.photoFromLibrary(onSuccess, onFail);
      return defer.promise;
    },
    videoFromLibrary: function() {
      var defer, onFail, onSuccess;
      onSuccess = function(videoURL) {
        defer.resolve(videoURL);
      };
      onFail = function(message) {
        defer.reject(message);
      };
      defer = $q.defer();
      PhonegapCameraService.videoFromLibrary(onSuccess, onFail);
      return defer.promise;
    },
    takeNewPhoto: function() {
      var defer, onFail, onSuccess;
      onSuccess = function(imageURL) {
        defer.resolve(imageURL);
      };
      onFail = function(message) {
        defer.reject(message);
        console.log(message);
      };
      defer = $q.defer();
      PhonegapCameraService.takeNewPhoto(onSuccess, onFail);
      return defer.promise;
    },
    takeNewVideo: function() {
      var defer, onFail, onSuccess;
      onSuccess = function(videoURL) {
        var i, len, path;
        i = void 0;
        path = void 0;
        len = void 0;
        i = 0;
        len = videoURL.length;
        while (i < len) {
          path = videoURL[i].fullPath;
          defer.resolve(path);
          i += 1;
        }
      };
      onFail = function(message) {
        console.log(message);
        defer.reject(message);
      };
      defer = $q.defer();
      PhonegapCameraService.takeNewVideo(onSuccess, onFail);
      return defer.promise;
    },
    takeNewAudio: function() {
      var defer, onFail, onSuccess;
      onSuccess = function(audioURL) {
        var i, len, path;
        i = void 0;
        path = void 0;
        len = void 0;
        i = 0;
        len = audioURL.length;
        while (i < len) {
          path = audioURL[i].fullPath;
          defer.resolve(path);
          i += 1;
        }
      };
      onFail = function(message) {
        Device.alert(Settings.error.recordAudioPermission, null, Settings.type.audioError, 'Done');
        console.log(message);
        defer.reject(message);
      };
      defer = $q.defer();
      PhonegapCameraService.takeNewAudio(onSuccess, onFail);
      return defer.promise;
    }
  };
});

//# sourceMappingURL=camera-service.js.map

'use strict';
angular.module("site").factory("ContentService", function(CoreAPI, $resource, CONSTANTS, localStorageService) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd/:_id', {}, {
    getSmileList: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-smile-list.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getSmile: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-smile.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getAvatarList: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-avatar-list.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getAvatarListAll: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-all-user-avatar.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getAvatar: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-avatar.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getSettings: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'app-setting.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  fList = ['getSmileList', 'getSmile', 'getAvatarList', 'getAvatarListAll', 'getAvatar', 'getSettings'];
  return CoreAPI.init(resource, 'ContentService', fList);
});

//# sourceMappingURL=content-service.js.map

'use strict';
angular.module('site').factory('CoreAPI', function($timeout, Settings, Device, PhoneGapNetworkService, $q, CONSTANTS, localStorageService) {
  var fs, getStoreKey, toQueryString;
  toQueryString = function(obj) {
    var i, parts;
    parts = [];
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
      }
    }
    return parts.join("&");
  };
  getStoreKey = function(nameSpace, functionName, args) {
    var key, queryString;
    queryString = toQueryString(args);
    key = nameSpace + '.' + functionName + '[' + queryString + ']';
    return key;
  };
  fs = {};
  fs.request = function(resource, nameSpace, functionName, args) {
    var deferred, err, rData, storeKey;
    deferred = $q.defer();
    storeKey = 'ServiceData.' + getStoreKey(nameSpace, functionName, args);
    if (PhoneGapNetworkService.isInternetAccess()) {
      resource[functionName](args).$promise.then(function(result) {
        mconsole.log('CoreAPI.request', result);
        if (!((result.type != null) && result.type === 'ERROR')) {
          localStorageService.set(storeKey, result);
        }
        return deferred.resolve(result);
      }, function(err) {
        mconsole.log('CoreAPI.request err', err);
        return deferred.reject(err);
      });
    } else {
      rData = localStorageService.get(storeKey);
      if (rData != null) {
        deferred.resolve(rData);
      } else {
        err = {
          type: Settings.type.error,
          message: Settings.message.noConnections
        };
        deferred.reject(err);
      }
    }
    return deferred.promise;
  };
  fs.init = function(resource, nameSpace, functionList) {
    var inteface;
    inteface = {};
    $.each(functionList, function(i, item) {
      return inteface[item] = function(model) {
        return fs.request(resource, nameSpace, item, model);
      };
    });
    return inteface;
  };
  fs.requestWithOption = function(resource, nameSpace, option, args) {
    var deferred, err, isReturned, rData, storeKey;
    deferred = $q.defer();
    storeKey = 'ServiceData.' + getStoreKey(nameSpace, option.functionName, args);
    isReturned = false;
    if (PhoneGapNetworkService.isInternetAccess()) {
      rData = localStorageService.get(storeKey);
      if ((rData != null) && (option.isCache === true)) {
        isReturned = true;
        deferred.resolve(rData);
      }
      resource[option.functionName](args).$promise.then(function(result) {
        if (!((result.type != null) && result.type === 'ERROR')) {
          localStorageService.set(storeKey, result);
        }
        if (!isReturned) {
          return deferred.resolve(result);
        }
      }, function(err) {
        return deferred.reject(err);
      });
    } else {
      rData = localStorageService.get(storeKey);
      if (rData != null) {
        deferred.resolve(rData);
      } else {
        err = {
          type: Settings.type.error,
          message: Settings.message.noConnections
        };
        deferred.reject(err);
      }
    }
    return deferred.promise;
  };
  fs.initWithOption = function(resource, nameSpace, optionList) {
    var inteface;
    inteface = {};
    $.each(optionList, function(i, item) {
      return inteface[item.functionName] = function(model) {
        return fs.requestWithOption(resource, nameSpace, item, model);
      };
    });
    return inteface;
  };
  return fs;
});

//# sourceMappingURL=core-api.js.map

'use strict';
angular.module('site').factory('deviceReadyService', function(PhonegapReady) {
  var callListeners, ready, registeredListeners;
  ready = false;
  registeredListeners = [];
  callListeners = function() {
    var i;
    i = registeredListeners.length - 1;
    while (i >= 0) {
      registeredListeners[i]();
      i--;
    }
  };
  return {
    isReady: function() {
      return ready;
    },
    makeReady: function() {
      ready = true;
      callListeners();
    },
    registerListener: function(callback) {
      if (ready) {
        callback();
      } else {
        registeredListeners.push(callback);
      }
    },
    init: function() {
      var that;
      that = this;
      PhonegapReady(function() {
        that.makeReady();
      })();
    }
  };
});

//# sourceMappingURL=device-ready-service.js.map

'use strict';
angular.module('site').factory('Environment', function() {
  return {
    isOverlay: true,
    status: 'production',
    isDev: function() {
      if (this.status === 'development') {
        return true;
      }
      return false;
    }
  };
});

//# sourceMappingURL=environment-service.js.map

'use strict';
angular.module('site').factory('ErrorManager', function() {
  var errorList;
  errorList = [];
  return {
    codeToMessage: function(code) {
      return 'There has no message here.';
    }
  };
});

//# sourceMappingURL=error-manager.js.map

'use strict';
angular.module('site').factory('FacebookService', function($q, CONSTANTS, localStorageService) {
  var fb;
  if (typeof openFB === 'undefined') {
    throw 'openFB is undefined, FacebookService can not work.';
  } else {
    openFB.init({
      appId: CONSTANTS.FACEBOOK_ID
    });
  }
  fb = {};
  fb.login = function() {
    var deferred;
    deferred = $q.defer();
    openFB.login(function(response) {
      return deferred.resolve(response);
    }, {
      scope: 'email,read_stream,publish_stream'
    });
    return deferred.promise;
  };
  fb.getLoginStatus = function() {
    var deferred;
    deferred = $q.defer();
    openFB.getLoginStatus(function(response) {
      return deferred.resolve(response);
    });
    return deferred.promise;
  };
  fb.getInfo = function() {
    var deferred;
    deferred = $q.defer();
    openFB.api({
      path: '/me',
      success: function(data) {
        return deferred.resolve(data);
      },
      error: this.errorHandler
    });
    return deferred.promise;
  };
  fb.share = function(messageData) {
    var deferred;
    deferred = $q.defer();
    openFB.api({
      method: 'POST',
      path: '/me/feed',
      params: {
        message: messageData
      },
      success: function() {
        return deferred.resolve({
          status: 0,
          message: 'The item was posted on Facebook'
        });
      },
      error: this.errorHandler
    });
    return deferred.promise;
  };
  fb.shareWithDetails = function(params) {
    var deferred;
    deferred = $q.defer();
    openFB.api({
      method: 'POST',
      path: '/me/feed',
      params: params,
      success: function(data) {
        return deferred.resolve({
          status: 0,
          data: data,
          message: 'The item was posted on Facebook'
        });
      },
      error: this.errorHandler
    });
    return deferred.promise;
  };
  fb.shareByPopup = function(params) {
    var deferred;
    deferred = $q.defer();
    openFB.get({
      method: 'GET',
      path: '/dialog/feed',
      params: params,
      success: function(data) {
        return deferred.resolve({
          status: 0,
          data: data,
          message: 'The item was posted on Facebook'
        });
      },
      error: this.errorHandler
    });
    return deferred.promise;
  };
  fb.revoke = function() {
    var deferred;
    deferred = $q.defer();
    openFB.revokePermissions(function() {
      return deferred.resolve({
        status: 0,
        message: 'Permissions revoked'
      });
    }, this.errorHandler);
    return deferred.promise;
  };
  fb.logout = function() {
    var deferred;
    deferred = $q.defer();
    openFB.logout(function() {
      return deferred.resolve({
        status: 0,
        message: 'Logout successful'
      });
    }, this.errorHandler);
    return deferred.promise;
  };
  fb.errorHandler = function(error) {
    throw error;
    return {
      status: -1,
      err: err
    };
  };
  return fb;
});

//# sourceMappingURL=facebook-service.js.map

angular.module('site').factory('FacebookShareService', function($q, CONSTANTS) {
  return {
    showDialog: function(params) {
      facebookConnectPlugin.showDialog(params, (function(response) {
        console.log(JSON.stringify(response));
      }), function(response) {
        console.log(JSON.stringify(response));
      });
    }
  };
});

//# sourceMappingURL=facebook-share-service.js.map

'use strict';
angular.module('site').factory('FeedbackService', function(CoreAPI, $resource, CONSTANTS, localStorageService) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd', {}, {
    give: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'feed-back.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  fList = ['give'];
  return CoreAPI.init(resource, 'FeedbackService', fList);
});

//# sourceMappingURL=feedback-service.js.map

'use strict';
angular.module('site').factory('GigyaService', function(CoreAPI, $resource, CONSTANTS, UserData, localStorageService) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd', {}, {
    addBadge: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'post-action.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getBadgeDetail: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'challenge-detail.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getChallenge: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-challenge.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getTimeline: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-timeline.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getBadges: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'badges-future.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getChallengesTop: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'challenges-top.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  fList = [
    {
      functionName: 'addBadge',
      isCache: false
    }, {
      functionName: 'getBadgeDetail',
      isCache: true
    }, {
      functionName: 'getChallenge',
      isCache: true
    }, {
      functionName: 'getTimeline',
      isCache: true
    }, {
      functionName: 'getBadges',
      isCache: false
    }, {
      functionName: 'getChallengesTop',
      isCache: true
    }
  ];
  return CoreAPI.initWithOption(resource, 'GigyaService', fList);
});

//# sourceMappingURL=gigya-service.js.map

'use strict';
angular.module('site').factory('HistoryManager', function() {
  var history;
  history = {};
  return history;
});

//# sourceMappingURL=history-manager.js.map

'use strict';
angular.module("site").factory("LandingService", function(CoreAPI, $resource, CONSTANTS, localStorageService) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd/:_id', {}, {
    addSlip: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'add-slip.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getMotivation: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-motivation.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getNextMotivation: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-next-motivation.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    teamActivities: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'landing-page.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    readCheer: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'read-cheers.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  fList = ['addSlip', 'getMotivation', 'teamActivities', 'readCheer', 'getNextMotivation'];
  return CoreAPI.init(resource, 'LandingService', fList);
});

//# sourceMappingURL=landingpage-service.js.map

"use strict";
angular.module("site").factory("LocalNotificationService", function($rootScope, $route, $location, Settings, localStorageService, Utils) {
  return {
    onClickNotification: function(id) {
      if (typeof cordova === 'undefined') {
        return;
      }
      return window.plugin.notification.local.onclick = function(id) {
        var localValue, loginPage, path;
        loginPage = Settings.localStorage.name.loginPage;
        path = null;
        switch (id) {
          case Settings.notification.startJourney.id:
            path = Settings.notification.startJourney.path;
            localValue = Settings.localStorage.value.openStartJourney;
            break;
          case Settings.notification.recap.id:
            path = Settings.notification.recap.path;
            localValue = Settings.localStorage.value.openMorningRecap;
            break;
          case Settings.notification.reasonToQuit.id:
            path = Settings.notification.reasonToQuit.path;
            localValue = Settings.localStorage.value.openReasonToQuit;
            break;
          case Settings.notification.sundayChallenge.id:
            path = Settings.notification.sundayChallenge.path;
            localValue = Settings.localStorage.value.openSundayChallenge;
            break;
          case Settings.notification.product.id:
            path = Settings.notification.product.path;
        }
        if (path === null) {
          return;
        }
        localStorageService.set(loginPage, localValue);
        if (localStorageService.get('accessToken')) {
          $rootScope.$broadcast('notification-on-click', path);
          return $rootScope.$apply();
        }
      };
    },
    cancelNotification: function(id) {
      console.log('cancel remind ' + id);
      if (typeof cordova === 'undefined') {
        return;
      }
      return window.plugin.notification.local.cancel(id, function() {});
    },
    addNotification: function(id, options) {
      console.log('remind to show notification ' + options.title + ',' + options.id + ' on ' + options.date);
      if (typeof cordova === 'undefined') {
        return;
      }
      return window.plugin.notification.local.add(options);
    },
    reminderTime: 0
  };
});

//# sourceMappingURL=local-notification-service.js.map

'use strict';
angular.module('site').factory('LocalPushService', function(CoreAPI, CONSTANTS, $resource, localStorageService) {
  var functionList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd', {}, {
    getLocalPush: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'local-push.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  functionList = ['getLocalPush'];
  return CoreAPI.init(resource, 'LocalPushService', functionList);
});

//# sourceMappingURL=local-push.js.map

'use strict';
angular.module('site').factory('OverlayService', function(localStorageService) {
  var overlay;
  overlay = {};
  overlay.isShowed = function(overlay) {
    var result;
    result = localStorageService.get('overlays.' + overlay);
    if (result === null) {
      return false;
    } else {
      return true;
    }
  };
  overlay.setShowed = function(overlay) {
    localStorageService.set('overlays.' + overlay, 'showed');
    return true;
  };
  return overlay;
});

//# sourceMappingURL=overlay-service.js.map

angular.module('site').factory('PhoneGapNetworkService', function(localStorageService) {
  return {
    isInternetAccess: function() {
      var networkState;
      if (window.isWebView()) {
        networkState = navigator.connection.type;
        return window.Connection.NONE !== networkState;
      } else {
        return localStorageService.get('isNetworkAvailable') !== 'false';
      }
    },
    getType: function() {
      var networkState, states;
      states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';
      networkState = navigator.connection.type;
      return states[networkState];
    }
  };
}).factory('PhonegapCameraService', function(CONSTANTS) {
  return {
    photoFromLibrary: function(onSuccess, onError) {
      setTimeout(function() {
        var options;
        options = {
          sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          correctOrientation: true,
          targetWidth: CONSTANTS.PICURE_MAX_WIDTH,
          targetHeight: CONSTANTS.PICURE_MAX_HEIGHT,
          mediaType: navigator.camera.MediaType.PICTURE
        };
        navigator.camera.getPicture(onSuccess, onError, options);
      });
    },
    videoFromLibrary: function(onSuccess, onError) {
      setTimeout(function() {
        var options;
        options = {
          sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
          destinationType: navigator.camera.DestinationType.FILE_URI,
          correctOrientation: true,
          targetWidth: CONSTANTS.PICURE_MAX_WIDTH,
          targetHeight: CONSTANTS.PICURE_MAX_HEIGHT,
          mediaType: navigator.camera.MediaType.VIDEO
        };
        navigator.camera.getPicture(onSuccess, onError, options);
      });
    },
    takeNewPhoto: function(onSuccess, onError) {
      setTimeout(function() {
        var options;
        options = {
          sourceType: navigator.camera.PictureSourceType.CAMERA,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          correctOrientation: true,
          targetWidth: CONSTANTS.PICURE_MAX_WIDTH,
          targetHeight: CONSTANTS.PICURE_MAX_HEIGHT
        };
        navigator.camera.getPicture(onSuccess, onError, options);
      });
    },
    takeNewVideo: function(onSuccess, onError) {
      setTimeout(function() {
        var options;
        options = {
          limit: 1
        };
        navigator.device.capture.captureVideo(onSuccess, onError, options);
      });
    },
    takeNewAudio: function(onSuccess, onError) {
      setTimeout(function() {
        var options;
        options = {
          limit: 1
        };
        navigator.device.capture.captureAudio(onSuccess, onError, options);
      });
    }
  };
}).factory('PhonegapReady', function() {});

//# sourceMappingURL=phonegap-service.js.map

'use strict';
angular.module('site').factory('Point', function(CoreAPI, CONSTANTS, $resource, $q, PhoneGapNetworkService, localStorageService) {
  var functionList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd', {}, {
    addBadge: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'post-action.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getBadgeDetail: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'challenge-detail.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getChallenge: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-challenge.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getTimeline: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-timeline.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  functionList = ['addBadge', 'getBadgeDetail', 'getChallenge', 'getTimeline'];
  return CoreAPI.init(resource, 'PointService', functionList);
});

//# sourceMappingURL=point.js.map

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

'use strict';
angular.module("site").factory("QuitPointService", function(CoreAPI, $resource, CONSTANTS) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd', {}, {
    createCoupon: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'create-coupon.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getCouponList: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-coupon-list.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getCoupon: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-coupon.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    restartJourney: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'restart-journey.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    startJourney: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'start-journey.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  fList = ['createCoupon', 'getCouponList', 'getCoupon', 'restartJourney', 'startJourney'];
  return CoreAPI.init(resource, 'GigyaService', fList);
});

//# sourceMappingURL=quitpoint-service.js.map

'use strict';
angular.module("site").factory("QuitTeamService", function(CoreAPI, $resource, CONSTANTS, localStorageService) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd/:_id', {}, {
    joinTeam: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'join-team.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    leaveTeam: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'leave-team.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    sayCheers: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'activity-user.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getChallengesTop: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'challenges-top.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    viewActivityMember: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'view-member-activity.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  fList = ['joinTeam', 'leaveTeam', 'sayCheers', 'getChallengesTop', 'viewActivityMember'];
  return CoreAPI.init(resource, 'QuitTeamService', fList);
});

//# sourceMappingURL=quitteam-service.js.map

'use strict';
angular.module('site').factory('Snapper', function(localStorageService, Environment, $rootScope, $timeout, OverlayService, CONSTANTS) {
  var snapper;
  snapper = {};
  if (typeof Snap === 'undefinied') {
    throw 'Snap was not found.';
  } else {
    snapper = new Snap({
      element: document.getElementById('inner'),
      disable: 'right',
      maxPosition: 520,
      minPosition: -520,
      transitionSpeed: 0.2,
      hyperextensible: false
    });
  }
  snapper.hamburgerToggle = function() {
    var intro, introOnFinish, path, showOverlay;
    if (snapper.state().state === 'left') {
      return snapper.close('left');
    } else {
      snapper.open('left');
      $('.snap-drawer').scrollTop(0);
      path = 'overlay-sidebar-left';
      intro = introJs();
      intro.setOptions({
        showStepNumbers: false,
        showBullets: false,
        exitOnOverlayClick: false
      });
      intro.setOptions({
        steps: [
          {
            element: '#info-profile',
            intro: ' <p>Here\'s where you check up <br> on you and all your<br> fantastic progress.</p>',
            position: 'bottom',
            tooltipClass: 'content-nav'
          }
        ]
      });
      introOnFinish = function() {
        $('body').removeClass('show-intro');
        return OverlayService.setShowed(path);
      };
      intro.onexit(introOnFinish);
      intro.oncomplete(introOnFinish);
      showOverlay = function() {
        var helpStatus;
        helpStatus = localStorageService.get('helpStatus') || 'false';
        if (!Environment.isOverlay) {
          return;
        }
        if ((OverlayService.isShowed(path) === false) && (helpStatus === 'true')) {
          return $timeout(function() {
            $('body').addClass('show-intro');
            return intro.start();
          }, CONSTANTS.OVERLAYS_TIME);
        }
      };
      return showOverlay();
    }
  };
  return snapper;
});

//# sourceMappingURL=snapper.js.map

'use strict';
angular.module('site').factory('UserData', function(localStorageService) {
  var cons;
  cons = {
    tour: 'theTourHasFinised',
    token: 'accessToken',
    profile: 'userProfile'
  };
  return {
    setToken: function(token) {
      localStorageService.set(cons.token, token);
    },
    getToken: function() {
      return localStorageService.get(cons.token);
    },
    getAccessToken: function() {
      return localStorageService.get(cons.token);
    },
    addToken: function(model) {
      model['user-token'] = localStorageService.get(cons.token);
      model['device-uid'] = localStorage.getItem('deviceUID');
      model['lang-code'] = 'en_US';
      return model;
    },
    current: function() {
      return localStorageService.get('userProfile');
    },
    setProfile: function(profile) {
      localStorageService.set(cons.profile, profile);
    },
    getProfile: function() {
      return localStorageService.get(cons.profile);
    },
    setTour: function() {
      localStorageService.set(cons.tour, true);
    },
    getTour: function() {
      return localStorageService.get(cons.tour);
    }
  };
});

//# sourceMappingURL=user-data.js.map

'use strict';
angular.module('site').factory('Error', function(CONSTANTS) {
  return {
    CO001: function() {
      return {
        code: 'CO-001',
        message: 'Something is wrong. Please try again later'
      };
    },
    CO002: function() {
      return {
        code: 'CO-002',
        message: 'Request without HTTPS does not supported'
      };
    },
    CO003: function() {
      return {
        code: 'CO-003',
        message: 'Post request has error(s). Please try again'
      };
    },
    CO004: function() {
      return {
        code: 'CO-004',
        message: 'Get request has error(s). Please try again'
      };
    },
    CO005: function() {
      return {
        code: 'CO-005',
        message: 'Post request does not supported'
      };
    },
    CO006: function() {
      return {
        code: 'CO-006',
        message: 'Get request does not supported'
      };
    },
    CO007: function() {
      return {
        code: 'CO-007',
        message: 'Call DMP is error.'
      };
    },
    CO008: function() {
      return {
        code: 'CO-008',
        message: 'JSON format is not correct'
      };
    },
    CO009: function() {
      return {
        code: 'CO-009',
        message: 'Call GIGYA is error.'
      };
    },
    SI001: function() {
      return {
        code: 'SI-001',
        message: 'User does not existed'
      };
    },
    SI002: function() {
      return {
        code: 'SI-002',
        message: 'Password does not valid'
      };
    },
    SU001: function() {
      return {
        code: 'SU-001',
        message: 'Email is existed'
      };
    },
    SU002: function() {
      return {
        code: 'SU-002',
        message: 'Sign up successfully'
      };
    },
    AS001: function() {
      return {
        code: 'AS-001',
        message: 'Account updated successfully'
      };
    },
    FP001: function() {
      return {
        code: 'FP-001',
        message: 'Please check your email to get temporary password'
      };
    },
    BI001: function() {
      return {
        code: 'BI-001',
        message: 'Badge is not found'
      };
    },
    FB001: function() {
      return {
        code: 'FB-001',
        message: 'Feedback sent successfully'
      };
    },
    JT001: function() {
      return {
        code: 'JT-001',
        message: 'User had team'
      };
    },
    LT001: function() {
      return {
        code: 'LT-001',
        message: 'User hadn\'t team'
      };
    },
    CC001: function() {
      return {
        code: 'CC-001',
        message: 'Create coupon successfully, please check your mail'
      };
    },
    VT001: function() {
      return {
        code: 'VT-001',
        message: 'Can\'t find your team'
      };
    },
    SL001: function() {
      return {
        code: 'SL-001',
        message: 'Add slip successfully'
      };
    },
    GA001: function() {
      return {
        code: 'GA-001',
        message: 'Add action gigya is success.'
      };
    },
    AU001: function() {
      return {
        code: 'AU-001',
        message: 'Send activity to user success'
      };
    },
    AU002: function() {
      return {
        code: 'AU-002',
        message: 'Send activity to user fail'
      };
    },
    AT001: function() {
      return {
        code: 'AT-001',
        message: 'Send activity to team success'
      };
    },
    AT002: function() {
      return {
        code: 'AT002',
        message: 'Send activity to team fail'
      };
    }
  };
});

//# sourceMappingURL=api-error.js.map

'use strict';
LOCAL.badges = [
  {
    id: 'action1_ignitionswitch',
    name: 'That\'s Courage',
    title: 'Courage',
    description: 'Congratulations! Your first badge for having the courage to begin. It will be the first of many to come.',
    imgURL: 'badge-first-journey.png',
    thumbPath: 'badge-first-journey-thumb.png',
    order: 1
  }, {
    id: 'action2_reasontoquit',
    name: 'Reason to Quit',
    title: 'Reason to Quit',
    description: 'You gave us your motivation. We give you a badge. That\'s not a bad deal.',
    imgURL: 'badge-firstreason.png',
    thumbPath: 'badge-firstreason-thumb.png',
    order: 2
  }, {
    id: 'action3_habitmapping',
    name: 'All-Star',
    title: 'All-Star',
    description: 'Great profile, but we bet you look pretty good head-on as well. Have a badge.',
    imgURL: 'badge-firstinformation.png',
    thumbPath: 'badge-firstinformation-thumb.png',
    order: 3
  }, {
    id: 'action4_setpersonalchallenge',
    name: 'Goal Seeker',
    title: 'Goal Seeker',
    description: 'Now visualize your goal while you visualize this awesome badge.',
    imgURL: 'badge-firstgoalseeker.png',
    thumbPath: 'badge-firstgoalseeker-thumb.png',
    order: 4
  }, {
    id: 'action5_joinedquitteam',
    name: 'Team Spirit',
    title: 'Team Spirit',
    description: 'You and your quit team should all get this badge made into belt buckles. Now, that\'s a quit team with style. ',
    imgURL: 'badge-firstteam.png',
    thumbPath: 'badge-firstteam-thumb.png',
    order: 5
  }, {
    id: 'action6_addniquitintoprofile',
    name: 'Secret Weapon',
    title: 'Secret Weapon',
    description: 'Congratulations! You added a <b>NiQuitin</b> product to your profile. You now have the secret weapon badge.',
    imgURL: 'badge-secretweapon.png',
    thumbPath: 'badge-secretweapon-thumb.png',
    order: 6
  }, {
    id: '1_hour',
    name: '1 Hour',
    title: '1 Hour',
    description: 'Good job. Your first hour. This is where it begins.',
    imgURL: 'badge-1hour.png',
    thumbPath: 'badge-1hour-thumb.png',
    order: 1
  }, {
    id: '0_hour_20_min',
    name: 'Whole-Hearted Decision',
    title: 'Whole-Hearted Decision',
    description: 'Whole-hearted decision! Quitting is a decision that could have an instant positive effect on your heart. The chemicals in tobacco constrict your blood vessels which in turn spikes blood pressure and pulse. In just 20 minutes after quitting, both of them could start to decrease.',
    imgURL: 'badge-heart.png',
    thumbPath: 'badge-heart-thumb.png',
    order: 1
  }, {
    id: '2_hour',
    name: '2 hour',
    title: '2 hour',
    description: 'Two hours? That\'s like twice the amount of one hour. You\'re really doing it.',
    imgURL: 'badge-2hour.png',
    thumbPath: 'badge-2hour-thumb.png',
    order: 2
  }, {
    id: '3_hour',
    name: '3 Hour',
    title: '3 Hour',
    description: 'A third hour of not smoking? This is really good stuff.',
    imgURL: 'badge-3hour.png',
    thumbPath: 'badge-3hour-thumb.png',
    order: 3
  }, {
    id: '6_hour',
    name: '6 Hour',
    title: '6 Hour',
    description: '6 hours?  Wow. Now, you\'re getting serious momentum. We are duly impressed.',
    imgURL: 'badge-6hour.png',
    thumbPath: 'badge-6hour-thumb.png',
    order: 4
  }, {
    id: '8_hour_20_min',
    name: 'True Blood',
    title: 'True Blood',
    description: 'True Blood! Oxygen and carbon monoxide levels in your blood are returning to normal. Carbon monoxide is formed when you burn the tobacco. When inhaled, it bonds to blood cells, inhibiting them from carrying oxygen. So take a deep breath and you might notice that you\'re breathing easier now.',
    imgURL: 'badge-blood.png',
    thumbPath: 'badge-blood-thumb.png',
    order: 2
  }, {
    id: '12_hour',
    name: '12 Hour',
    title: '12 Hour',
    description: 'Great! Half day of not smoking. Your commitment delights us. And hopefully, you as well.',
    imgURL: 'badge-12hour.png',
    thumbPath: 'badge-12hour-thumb.png',
    order: 5
  }, {
    id: '18_hour',
    name: '18 Hour',
    title: '18 Hour',
    description: '3 quarters of a whole day. Keep going! So close to your first whole day.',
    imgURL: 'badge-18hour.png',
    thumbPath: 'badge-18hour-thumb.png',
    order: 6
  }, {
    id: '24_hour',
    name: '24 Hour',
    title: '24 Hour',
    description: 'Congratulations. One whole day. This the first day of many awesome days to come.',
    imgURL: 'badge-24hour.png',
    thumbPath: 'badge-24hour-thumb.png',
    order: 7
  }, {
    id: '24_hour_20_min',
    name: 'Major Cleaning',
    title: 'Major Cleaning',
    description: 'Major cleaning! A day has now passed and your lungs are starting to clear out mucus and other smoking debris.',
    imgURL: 'badge-cleaning.png',
    thumbPath: 'badge-cleaning-thumb.png',
    order: 3
  }, {
    id: '30_hour',
    name: '30 Hour',
    title: '30 Hour',
    description: '30 hours. What a great round number and well into your second day of quitting.',
    imgURL: 'badge-30hour.png',
    thumbPath: 'badge-30hour-thumb.png',
    order: 8
  }, {
    id: '36_hour',
    name: '36 Hour',
    title: '36 Hour',
    description: 'Perfect! One and a half day and another whole bunch of cigarettes that you didn\'t smoke. You\'re doing great.',
    imgURL: 'badge-36hour.png',
    thumbPath: 'badge-36hour-thumb.png',
    order: 9
  }, {
    id: '2_days',
    name: '2 Days',
    title: '2 Days',
    description: 'Ah, now we\'re at 2 days. This is a nice, little streak you got going. Good for you.',
    imgURL: 'badge-2day.png',
    thumbPath: 'badge-2day-thumb.png',
    order: 10
  }, {
    id: '2_days_20_min',
    name: 'Time To Enjoy Your Favourite Meal',
    title: 'Time To Enjoy Your Favourite Meal',
    description: 'Time to enjoy your favourite meal Now that you\'ve quit,  your taste buds and sense of smell have begun to improve. So why not  order your favourite meal and enjoy the flavours!',
    imgURL: 'badge-strawberry.png',
    thumbPath: 'badge-strawberry-thumb.png',
    order: 4
  }, {
    id: '3_days',
    name: '3 Days',
    title: '3 Days',
    description: 'Phenomenal. It\'s hard to do anything for 3 days straight: Run, juggle, not-smoke. And yet here we are.',
    imgURL: 'badge-3day.png',
    thumbPath: 'badge-3day-thumb.png',
    order: 11
  }, {
    id: '3_days_20_min',
    name: 'Feeling The Buzz',
    title: 'Feeling The Buzz',
    description: 'Feeling the buzz. Your breathing should now start getting easier as your bronchial tubes begin to relax.',
    imgURL: 'badge-air.png',
    thumbPath: 'badge-air-thumb.png',
    order: 5
  }, {
    id: '4_days',
    name: '4 Days',
    title: '4 Days',
    description: '',
    imgURL: 'badge-4day.png',
    thumbPath: 'badge-4day-thumb.png',
    order: 12
  }, {
    id: '5_days',
    name: '5 Days',
    title: '5 Days',
    description: 'Great, great, great, great, great job. That\'s one "great" for each day.',
    imgURL: 'badge-5day.png',
    thumbPath: 'badge-5day-thumb.png',
    order: 13
  }, {
    id: '6_days',
    name: '6 Days',
    title: '6 Days',
    description: 'The universe was supposedly created in 6 days but you? You\'re creating a smoke-free universe.',
    imgURL: 'badge-6day.png',
    thumbPath: 'badge-6day-thumb.png',
    order: 14
  }, {
    id: '7_days',
    name: '7 Days',
    title: '7 Days',
    description: '7 days? That\'s half a fortnight of not smoking. Well-played.',
    imgURL: 'badge-7day.png',
    thumbPath: 'badge-7day-thumb.png',
    order: 15
  }, {
    id: '10_days',
    name: '10 Days',
    title: '10 Days',
    description: 'The big 1-0. Double digit days is a big milestone. Live it up.',
    imgURL: 'badge-10day.png',
    thumbPath: 'badge-10day-thumb.png',
    order: 16
  }, {
    id: '14_days',
    name: '14 Days',
    title: '14 Days',
    description: '2 weeks of not smoking is beyond amazing. This badge should be real and made of gold with your name in diamonds and not those cheap chocolate diamonds.',
    imgURL: 'badge-14day.png',
    thumbPath: 'badge-14day-thumb.png',
    order: 17
  }, {
    id: '2_weeks_20_min',
    name: 'Things Get Moving',
    title: 'Things Get Moving',
    description: 'Data suggests, it could only take a few weeks for your blood circulation to substantially improve, as smoking no longer constricts your blood vessels.',
    imgURL: 'badge-moving-2week.png',
    thumbPath: 'badge-moving-2week-thumb.png',
    order: 6
  }, {
    id: '18_days',
    name: '18 days',
    title: '18 days',
    description: 'More than half a month is very impressive. This is good stuff.',
    imgURL: 'badge-18hour.png',
    thumbPath: 'badge-18hour-thumb.png',
    order: 18
  }, {
    id: '3_weeks',
    name: '3 weeks',
    title: '3 weeks',
    description: 'You hear that? That\'s the sound of smoking starting to give up. Keep going.',
    imgURL: 'badge-3week.png',
    thumbPath: 'badge-3week-thumb.png',
    order: 19
  }, {
    id: '4_weeks',
    name: '4 weeks',
    title: '4 weeks',
    description: 'Seems like you\'re really, truly getting the hang of this. Colour us very impressed.',
    imgURL: 'badge-4week.png',
    thumbPath: 'badge-4week-thumb.png',
    order: 20
  }, {
    id: '1_month_20_min_1',
    name: 'The glow getter',
    title: 'The glow getter',
    description: 'Smoking reduces the amount of oxygen that gets to your skin and is responsible for that telltale grey-ish tone. But here\’s the good news: after one month of smoke-free life, your skin luminosity and overall appearance may improve.',
    imgURL: 'badge-getter-1month.png',
    thumbPath: 'badge-getter-1month-thumb.png',
    order: 7
  }, {
    id: '1_month_20_min_2',
    name: 'Slowly getting there',
    title: 'Slowly getting there',
    description: 'Many of the physical withdrawal symptoms decrease after  4 weeks. So just work on getting through the situations that may trigger you to smoke such as stressful work days or friends smoking around you. Just take one day at a time.',
    imgURL: 'badge-slowly-1month.png',
    thumbPath: 'badge-slowly-1month-thumb.png',
    order: 8
  }, {
    id: '5_weeks',
    name: '5 weeks',
    title: '5 weeks',
    description: 'The weeks are just piling up now. You know what\'s not piling up? Cigarette butts. And that\'s awesome.',
    imgURL: 'badge-5week.png',
    thumbPath: 'badge-5week-thumb.png',
    order: 21
  }, {
    id: '6_weeks',
    name: '6 weeks',
    title: '6 weeks',
    description: 'You are good at this quitting thing. Consider yourself to be our hero.',
    imgURL: 'badge-6week.png',
    thumbPath: 'badge-6week-thumb.png',
    order: 22
  }, {
    id: '7_weeks',
    name: '7 weeks',
    title: '7 weeks',
    description: 'Are you wearing a quitting tiara? Because you deserve one.',
    imgURL: 'badge-7week.png',
    thumbPath: 'badge-7week-thumb.png',
    order: 23
  }, {
    id: '8_weeks',
    name: '8 weeks',
    title: '8 weeks',
    description: '8 weeks = 2 months = quit-tastic awesomeness',
    imgURL: 'badge-8week.png',
    thumbPath: 'badge-8week-thumb.png',
    order: 24
  }, {
    id: '3_months',
    name: '3 months',
    title: '3 months',
    description: 'Do you feel great? because you are great and it would be a shame if you didn\'t feell how great you are.',
    imgURL: 'badge-3month.png',
    thumbPath: 'badge-3month-thumb.png',
    order: 25
  }, {
    id: '1_month_20_min_1',
    name: '1 month',
    title: 'The glow getter',
    description: 'The glow getter. Smoking reduces the amount of oxygen that gets to your skin and is responsible for that telltale grey-ish tone. But here’s the good news: after one month of smoke-free life, your skin luminosity and overall appearance may improve.',
    imgURL: 'badge-getter-1month.png',
    thumbPath: 'badge-getter-1month-thumb.png',
    order: 19
  }, {
    id: '1_month_20_min_2',
    name: '1 month',
    title: 'Slowly getting there',
    description: 'Slowly getting there! Many of the physical withdrawal symptoms decrease after  4 weeks. So just work on getting through the situations that may trigger you to smoke such as stressful work days or friends smoking around you. Just take one day at a time.',
    imgURL: 'badge-moving-2week.png',
    thumbPath: 'badge-moving-2week-thumb.png',
    order: 12
  }, {
    id: 'personal',
    name: '',
    title: '',
    description: '',
    imgURL: '',
    thumbPath: '',
    order: 0
  }, {
    id: 'personal_work_event',
    name: 'Work Event',
    title: 'Work Event',
    description: '',
    imgURL: 'badge-working-event.png',
    thumbPath: 'badge-working-event-thumb.png',
    order: 0
  }, {
    id: 'personal_presentation',
    name: 'Presentation',
    title: 'Presentation',
    description: '',
    imgURL: 'badge-presentation.png',
    thumbPath: 'badge-presentation-thumb.png',
    order: 0
  }, {
    id: 'personal_deadline',
    name: 'Deadline',
    title: 'Deadline',
    description: '',
    imgURL: 'badge-deadline.png',
    thumbPath: 'badge-deadline-thumb.png',
    order: 0
  }, {
    id: 'personal_working_late',
    name: 'Working Late',
    title: 'Working Late',
    description: '',
    imgURL: 'badge-working-late.png',
    thumbPath: 'badge-working-late-thumb.png',
    order: 0
  }, {
    id: 'personal_stressful_day',
    name: 'Stressful Day',
    title: 'Stressful Day',
    description: '',
    imgURL: 'badge-stressfulday.png',
    thumbPath: 'badge-stressfulday-thumb.png',
    order: 0
  }, {
    id: 'personal_work_travel',
    name: 'Work Travel',
    title: 'Work Travel',
    description: '',
    imgURL: 'badge-travelling.png',
    thumbPath: 'badge-travelling-thumb.png',
    order: 0
  }, {
    id: 'personal_party',
    name: 'Party',
    title: 'Party',
    description: '',
    imgURL: 'badge-party.png',
    thumbPath: 'badge-party-thumb.png',
    order: 0
  }, {
    id: 'personal_going_out_friends',
    name: 'Going out with Friends',
    title: 'Going out with Friends',
    description: '',
    imgURL: 'badge-goingout.png',
    thumbPath: 'badge-goingout-thumb.png',
    order: 0
  }, {
    id: 'personal_bar_club',
    name: 'Bar / Club',
    title: 'Bar / Club',
    description: '',
    imgURL: 'badge-bar.png',
    thumbPath: 'badge-bar-thumb.png',
    order: 0
  }, {
    id: 'personal_holiday',
    name: 'Holiday',
    title: 'Holiday',
    description: '',
    imgURL: 'badge-holiday.png',
    thumbPath: 'badge-holiday-thumb.png',
    order: 0
  }, {
    id: 'personal_sports_event',
    name: 'Sports Event',
    title: 'Sports Event',
    description: '',
    imgURL: 'badge-sport.png',
    thumbPath: 'badge-sport-thumb.png',
    order: 0
  }, {
    id: 'personal_dining_out',
    name: 'Dining Out',
    title: 'Dining Out',
    description: '',
    imgURL: 'badge-dineout.png',
    thumbPath: 'badge-dineout-thumb.png',
    order: 0
  }, {
    id: 'personal_movie_night',
    name: 'Movie Night',
    title: 'Movie Night',
    description: '',
    imgURL: 'badge-movienight.png',
    thumbPath: 'badge-movienight-thumb.png',
    order: 0
  }, {
    id: 'personal_concert',
    name: 'Concert',
    title: 'Concert',
    description: '',
    imgURL: 'badge-concert.png',
    thumbPath: 'badge-concert-thumb.png',
    order: 0
  }, {
    id: 'personal_driving',
    name: 'Driving',
    title: 'Driving',
    description: '',
    imgURL: 'badge-driving.png',
    thumbPath: 'badge-driving-thumb.png',
    order: 0
  }, {
    id: 'personal_home_alone',
    name: 'Home Alone',
    title: 'Home Alone',
    description: '',
    imgURL: 'badge-homealone.png',
    thumbPath: 'badge-homealone-thumb.png',
    order: 0
  }, {
    id: 'personal_staying_in',
    name: 'Staying In',
    title: 'Staying In',
    description: '',
    imgURL: 'badge-stayingin.png',
    thumbPath: 'badge-stayingin-thumb.png',
    order: 0
  }, {
    id: 'slip_up',
    name: 'Slip up',
    title: 'Slip up',
    description: '',
    imgURL: 'badge-slip.png',
    thumbPath: 'badge-slip-thumb.png',
    order: 0
  }, {
    id: 'calendar_jan_1',
    name: 'New Years Day',
    title: 'New Years Day',
    description: 'A third hour of not smoking? This is really good stuff.',
    imgURL: 'badge-new-year.png',
    thumbPath: 'badge-new-year-thumb.png',
    order: 1
  }, {
    id: 'calendar_feb_14',
    name: 'Valentines',
    title: 'Valentines',
    description: 'We agree. Kissing is so much better without cigarette breath.',
    imgURL: 'badge-valentines.png',
    thumbPath: 'badge-valentines-thumb.png',
    order: 2
  }, {
    id: 'calendar_mar_12',
    name: 'No Smoking Day',
    title: 'No Smoking Day',
    description: 'Good job. But one day is easy. Now you should just keep having those No Smoking Days.',
    imgURL: 'badge-no-smoking.png',
    thumbPath: 'badge-no-smoking-thumb.png',
    order: 3
  }, {
    id: 'calendar_mar_17',
    name: 'St. Patricks Day',
    title: 'St. Patricks Day',
    description: 'Here\'s to lots of gold at the end of your rainbow. And no cigarettes.',
    imgURL: 'badge-stpatricksday.png',
    thumbPath: 'badge-stpatricksday-thumb.png',
    order: 4
  }, {
    id: 'calendar_may_25',
    name: 'Spring Bank',
    title: 'Spring Bank',
    description: 'Great. Spring is back. Your old habit is not.',
    imgURL: 'badge-springbank.png',
    thumbPath: 'badge-springbank-thumb.png',
    order: 5
  }, {
    id: 'calendar_may_31',
    name: 'World No Tobacco Day',
    title: 'World No Tobacco Day',
    description: 'Look at the world following your lead. You trendsetter, you.',
    imgURL: 'badge-noworldtabaccoday.png',
    thumbPath: 'badge-noworldtabaccoday-thumb.png',
    order: 6
  }, {
    id: 'calendar_aug_26',
    name: 'Notting Hill Carnival',
    title: 'Notting Hill Carnival',
    description: 'Time to grab your badge, take it to the party-filled streets and shout, "I\'m quitting, people!"',
    imgURL: 'badge-nottinghill.png',
    thumbPath: 'badge-nottinghill-thumb.png',
    order: 7
  }, {
    id: 'calendar_aug_31',
    name: 'Summer Bank',
    title: 'Summer Bank',
    description: 'Hey, you\'re the person who still hasn\'t smoked since Spring Bank Holiday. You\'re great.',
    imgURL: 'badge-summer.png',
    thumbPath: 'badge-summer-thumb.png',
    order: 8
  }, {
    id: 'calendar_oct_31',
    name: 'Halloween',
    title: 'Halloween',
    description: 'Go to a party dressed as yourself: an ex-smoker. Greatest. Costume. Ever.',
    imgURL: 'badge-halloween.png',
    thumbPath: 'badge-halloween-thumb.png',
    order: 9
  }, {
    id: 'calendar_nov_5',
    name: 'Guy Fawks Day',
    title: 'Guy Fawks Day',
    description: 'Great. Guy Fawkes agree. Gunpowder and cigarettes are not a good combination.',
    imgURL: 'badge-bonfire.png',
    thumbPath: 'badge-bonfire-thumb.png',
    order: 10
  }, {
    id: 'calendar_nov_30',
    name: 'St. Andrews Day',
    title: 'St. Andrews Day',
    description: 'We know what you have under your kilt: Not cigarettes.',
    imgURL: 'badge-standrews.png',
    thumbPath: 'badge-standrews-thumb.png',
    order: 11
  }, {
    id: 'calendar_dec_24',
    name: 'Xmas Eve',
    title: 'Xmas Eve',
    description: 'If only you could put this badge on top of your tree, Father Christmas would wake you up to high-five you.',
    imgURL: 'badge-chirstmaseve.png',
    thumbPath: 'badge-chirstmaseve-thumb.png',
    order: 12
  }, {
    id: 'calendar_dec_25',
    name: 'Xmas',
    title: 'Xmas',
    description: 'Did you look under the tree for the present marked, "healthier life". It\'s to you and from you.',
    imgURL: 'badge-chirstmasday.png',
    thumbPath: 'badge-chirstmasday-thumb.png',
    order: 13
  }, {
    id: 'calendar_dec_26',
    name: 'Boxing Day',
    title: 'Boxing Day',
    description: 'Here\'s a gift you don\'t need to return. Not smoking at Boxing Day. Well done.',
    imgURL: 'badge-boxingday.png',
    thumbPath: 'badge-boxingday-thumb.png',
    order: 14
  }, {
    id: 'calendar_dec_31',
    name: 'New Years Eve',
    title: 'New Years Eve',
    description: 'Out with the old, in with the new, awesome lungs and life.',
    imgURL: 'badge-newyear-eve.png',
    thumbPath: 'badge-newyear-eve-thumb.png',
    order: 15
  }
];

//# sourceMappingURL=badge-data.js.map

'use strict';
angular.module('site').constant('BadgeList', {
  ignitionSwitch: 'action1_ignitionswitch',
  reasonToQuit: 'action2_reasontoquit',
  habitMapping: 'action3_habitmapping',
  setPersonalChallenge: 'action4_setpersonalchallenge',
  joinedQuitteam: 'action5_joinedquitteam',
  addNiquitinToProfile: 'action6_addniquitintoprofile'
});

//# sourceMappingURL=badge-list.js.map

'use strict';
var cons;

cons = angular.module('site');

cons.constant('CONSTANTS', {
  DB_VERSION: 1.0,
  STORAGE_NAME: 'gskStorage',
  DB_SIZE: 10485760,
  PICTURE_MAX_WIDTH: 140,
  PICTURE_MAX_HEIGHT: 140,
  REDEEM_POINT: 400,
  REAL_DISCOUNT: 1000,
  OVERLAYS_TIME: 300,
  VERSION_NUMBER: '0.7.6',
  ENVIRONMENT: 'Test Server',
  FACEBOOK_ID: '639515689400387',
  BADGE_PATH: 'http://quitapp-publish-test.gsk.sutrix.com/content/dam/napp/badges/',
  API_PATH: 'http://quitapp-publish-test.gsk.sutrix.com/content/ws'
});

//# sourceMappingURL=constants.js.map

'use strict';
angular.module('site').factory('Device', function(CONSTANTS) {
  return {
    alert: function(message, callback, title, btn) {
      if ((typeof navigator !== "undefined" && navigator !== null) && (navigator.notification != null)) {
        navigator.notification.alert(message, callback, title, btn);
      } else {
        alert(message);
      }
    },
    log: function() {
      return console.log(arguments);
    }
  };
});

//# sourceMappingURL=device.js.map

'use strict';
angular.module('site').constant('Keys', {
  isntFirstUser: 'isntFirstUser',
  ignitionSwitch: 'ignitionSwitch',
  reasonToQuit: 'reasonToQuit',
  habitMapping: 'habitMapping',
  setPersonalChallenge: 'setPersonalChallenge',
  joinedQuitteam: 'joinedQuitteam',
  addNiquitinToProfile: 'addNiquitinToProfile'
});

//# sourceMappingURL=keys.js.map

'use strict';
angular.module('site').factory('Pages', function() {
  return {
    accountIndex: {
      title: 'Account Setting'
    },
    gamesIndex: {
      title: 'Games'
    },
    habitIndex: {
      title: 'Tell Us About Your Habit'
    },
    landingIndex: {
      title: 'Landing Page'
    },
    loginIndex: {
      title: ''
    },
    sidebarLeft: {
      title: ''
    },
    main: {
      title: ''
    },
    productsIndex: {
      title: 'Products'
    },
    quitPointIndex: {
      title: 'Your Quit Points'
    },
    quitteamIndex: {
      title: 'Join a quit team'
    },
    recapIndex: {
      title: 'Morning Recap Time!'
    },
    signupIndex: {
      title: 'Create Your New Profile'
    },
    templateIndex: {
      title: 'Template'
    },
    timelineIndex: {
      title: 'Timeline'
    },
    tourIndex: {
      title: 'Tour'
    },
    accountChooseAvatar: {
      title: 'Avatar'
    },
    accountLeavingOne: {
      title: 'Leave a Quit Team'
    },
    accountLeavingTwo: {
      title: 'Leave a Quit Team'
    },
    accountLeavingThree: {
      title: ''
    },
    feedbackIndex: {
      title: 'Give Us Feedback'
    },
    feedbackthank: {
      title: 'Give Us Feedback'
    },
    gamesOneIndex: {
      title: 'Games One'
    },
    habitReason: {
      title: ''
    },
    writeMemo: {
      title: 'Write Memo'
    },
    habitReplace: {
      title: ''
    },
    habitThank: {
      title: ''
    },
    habitTime: {
      title: ''
    },
    habitYear: {
      title: ''
    },
    habitYHabit: {
      title: ''
    },
    helpIndex: {
      title: 'Help'
    },
    addSlip: {
      title: 'Slip'
    },
    landingMotivation: {
      title: 'Motivation Gallery'
    },
    landingScienceBehind: {
      title: 'Science Behind'
    },
    slipUpBadge: {
      title: ''
    },
    forgotPass: {
      title: 'Forgot Your Password?'
    },
    forgotUsername: {
      title: 'Forgot Your Username?'
    },
    loginIndex2: {
      title: ''
    },
    passwordComing: {
      title: 'Your Password is Coming'
    },
    welcomeBack: {
      title: 'Welcome Back!'
    },
    privacyPolicy: {
      title: 'Privacy Policy'
    },
    termsConditions: {
      title: 'Terms & Conditions'
    },
    header: {
      title: ''
    },
    productDetail: {
      title: 'NiQuitin Patch'
    },
    productMyProduct: {
      title: 'My Product'
    },
    productPostReview: {
      title: 'Post Your Review'
    },
    productOverview: {
      title: 'Products'
    },
    productReminder: {
      title: 'Product Reminder'
    },
    productPurchase: {
      title: 'Products'
    },
    thankRating: {
      title: 'Thank You'
    },
    quitPointCourage: {
      title: ''
    },
    quitPointDonation: {
      title: 'Donate Your Points'
    },
    quitPointIndividual: {
      title: ''
    },
    quitPointThankDonation: {
      title: ''
    },
    quitPointYourBadge: {
      title: 'Your Badges'
    },
    quitPointYourCoupons: {
      title: 'Your Coupons'
    },
    quitPointYourPointDetail: {
      title: 'Your Quit Points'
    },
    quitPointYourPoint: {
      title: 'Your Quit Points'
    },
    quitPointNewCharacter: {
      title: 'Buy a New Character'
    },
    quitPointCharacterDetail: {
      title: ''
    },
    quitteamLanding1: {
      title: 'Your Team'
    },
    quitteamLanding2: {
      title: 'Your Team'
    },
    recapLanding1: {
      title: ''
    },
    signupAge: {
      title: ''
    },
    signupBestTime: {
      title: ''
    },
    signupChara: {
      title: ''
    },
    signupCountry: {
      title: ''
    },
    signupGender: {
      title: ''
    },
    signupLanguage: {
      title: ''
    },
    signupProgess: {
      title: ''
    },
    signupWhereHear: {
      title: ''
    },
    emailPass: {
      title: 'Email and password are not correct'
    },
    reasonToQuit: {
      title: 'Reason To Quit'
    }
  };
});

//# sourceMappingURL=pages.js.map

'use strict';
angular.module('site').factory('Settings', function() {
  var settingsData;
  settingsData = {
    pages: {
      landing: '/landing-page'
    },
    type: {
      success: 'SUCCESS',
      error: 'ERROR',
      audioError: 'Audio error'
    },
    error: {
      done: 'Done',
      error: 'Error',
      cannotConnectToServer: 'Cannot connect to server',
      serverError: 'Server got an error, please try again later!',
      lostConnection: 'lost connection',
      userDoesNotExisted: 'User does not existed',
      passwordDoesNotValid: 'Password does not valid',
      emailIsExisted: 'Email is existed',
      signUpSuccessfully: 'Sign up successfully',
      accountUpdatedSuccessfully: 'Account updated successfully',
      pleaseCheckYourEmail: 'Please check your email to get temporary password',
      badgeIsNotFound: 'Badge is not found',
      feedbackSentSuccessfully: 'Feedback sent successfully',
      userHadATeam: 'User had team',
      userHadNotATeam: 'User hadn\'t team',
      createCouponSuccessfully: 'Create coupon successfully, please check your mail',
      cannotFindYourTeam: 'Can\'t find your team',
      addSlipSuccessfully: 'Add slip successfully',
      addActionGigyaIsSuccess: 'Add action gigya is success',
      sendActivityToUserSuccess: 'Send activity to user success',
      sendActivityToUserFail: 'Send activity to user fail',
      sendActivityToTeamSuccess: 'Send activity to team success',
      sendActivityToTeamFail: 'Send activity to team fail',
      recordAudioPermission: 'Microphone input permission refused - will record only silence'
    },
    message: {
      habitLater: 'You can tell us about your habit later in account settings',
      reasonToQuitMemo: 'Your memo saved successful!',
      reasonToQuitVideo: 'Your video saved successful!',
      reasonToQuitAudio: 'Your audio saved successful!',
      reasonToQuitPhoto: 'Your photo saved successful!',
      youHaveGotABadge: 'You\'ve got a badge!',
      sendCheerSuccess: 'Your cheer was sent!',
      sendActiviSuccess: 'Your smiley has been sent',
      sendActiviSuccess: 'Your smiley was sent!',
      cannotSendMessage: 'Your message cannot been sent, try again latter.',
      noConnections: 'Connections are not available right now, please try again later!',
      journeyNotStarted: 'You havn\'t started your journey yet.'
    },
    sharingData: {
      display: 'google.com',
      caption: 'google.com',
      description: 'this\'s a test.',
      message: 'this\'s a test.',
      picture: 'https://cdn1.iconfinder.com/data/icons/yooicons_set01_socialbookmarks/512/social_google_box.png',
      link: 'http://wequitnow.niquitin.co.uk/'
    },
    timer: {
      getBadges: 59 * 1000
    },
    staticBadge: {
      imgURL: 'images/upload/badges/badge-1hour.png',
      title: 'badge landing',
      type: 'Time Challenge',
      name: '1 hour',
      totalTime: '1',
      doneTime: '0',
      timeCompleted: 'Hours completed',
      progress: 0
    },
    rateTheApp: {
      url: {
        android: 'https://play.google.com/store/apps/details?id=com.android.chrome&hl=en',
        ios: 'itms-apps://itunes.apple.com/us/app/facebook/id284882215'
      }
    },
    localStorage: {
      name: {
        loginPage: 'pageAfterLogin',
        slipUpCount: 'countSlipUp',
        lastOpen: 'lastTimeOpenApp',
        cigarettesPerDay: 'cigarettesPerDay',
        firstLogin: 'firstTimeLogin.',
        rateApp: 'rateApp.',
        reasonToQuit: {
          memo: 'ReasonToQuit.Memo.',
          photo: 'ReasonToQuit.Photo.',
          audio: 'ReasonToQuit.Audio.',
          video: 'ReasonToQuit.Video.'
        }
      },
      value: {
        openStartJourney: 'openStartJourney',
        openMorningRecap: 'openMorningRecap',
        openReasonToQuit: 'openReasonToQuit',
        openSundayChallenge: 'openSundayChallenge'
      }
    },
    notification: {
      startJourney: {
        id: '1',
        title: 'Start Journey',
        message: 'Its time to begin, your quit Journey is waiting for you!',
        path: '/quitpoint'
      },
      recap: {
        id: '2',
        title: '',
        message: 'Morning recap time. Check it out!',
        repeat: 'daily',
        path: '/recap'
      },
      reasonToQuit: {
        id: '3',
        title: 'Reason to quit',
        firstMessage: 'Hey, we noticed you\'re struggling a bit! Remember why you are on this journey: ',
        secondToFifthMessage: {
          start: 'You had ',
          end: ' slip ups but don\'t worry, remember this is what you\'re quitting for: '
        },
        sixthMessage: 'Hard time staying on board? Remember the big picture: ',
        path: '/reason'
      },
      sundayChallenge: {
        id: '4',
        title: 'Challenge',
        message: 'It\'s new week! Remember to record any upcoming personal challenes in your timeline.',
        repeat: 'weekly',
        path: '/landing-page'
      },
      product: {
        id: '6',
        title: 'Add product',
        message: 'Hey there, you haven\'t added any products to your plan. Add them now and receive the Secret Weapon badge!',
        path: '/products'
      }
    },
    listGroupOfOverlay: ['/landing-page', '/timeline', '/quitteam/team-landing-1', '/quitteam/team-landing-2', 'overlay-sidebar-left'],
    accountChooseAvatarCtrl: {
      avatarList: [
        {
          href: 'javascript:;',
          title: 'Joker',
          alt: 'Joker',
          src: 'upload/avatar/avatar-joker.png'
        }, {
          href: 'javascript:;',
          title: 'GoogleGlassBoy',
          alt: 'GoogleGlassBoy',
          src: 'upload/avatar/avatar-googleglassboy.png'
        }, {
          href: 'javascript:;',
          title: 'HipsterGirl',
          alt: 'HipsterGirl',
          src: 'upload/avatar/avatar-hipstergirl.png'
        }, {
          href: 'javascript:;',
          title: 'HipsterBoy',
          alt: 'HipsterBoy',
          src: 'upload/avatar/avatar-hipsterboy.png'
        }, {
          href: 'javascript:;',
          title: 'HorseRider',
          alt: 'HorseRider',
          src: 'upload/avatar/avatar-horserider.png'
        }, {
          href: 'javascript:;',
          title: 'FreckledMan',
          alt: 'FreckledMan',
          src: 'upload/avatar/avatar-freckledman.png'
        }, {
          href: 'javascript:;',
          title: 'Dinosaur',
          alt: 'Dinosaur',
          src: 'upload/avatar/avatar-dinosaur.png'
        }, {
          href: 'javascript:;',
          title: 'Aviator',
          alt: 'Aviator',
          src: 'upload/avatar/avatar-aviator.png'
        }, {
          href: 'javascript:;',
          title: 'CapBoy',
          alt: 'CapBoy',
          src: 'upload/avatar/avatar-capboy.png'
        }, {
          href: 'javascript:;',
          title: 'Chef',
          alt: 'Chef',
          src: 'upload/avatar/avatar-chef.png'
        }, {
          href: 'javascript:;',
          title: 'Astronaut',
          alt: 'Astronaut',
          src: 'upload/avatar/avatar-astronaut.png'
        }, {
          href: 'javascript:;',
          title: 'Catwoman',
          alt: 'Catwoman',
          src: 'upload/avatar/avatar-catwoman.png'
        }, {
          href: 'javascript:;',
          title: 'Grandma',
          alt: 'Grandma',
          src: 'upload/avatar/avatar-grandma.png'
        }, {
          href: 'javascript:;',
          title: 'Nurse',
          alt: 'Nurse',
          src: 'upload/avatar/avatar-nurse.png'
        }, {
          href: 'javascript:;',
          title: 'Scubaboy',
          alt: 'Scubaboy',
          src: 'upload/avatar/avatar-scubaboy.png'
        }, {
          href: 'javascript:;',
          title: 'Superhero',
          alt: 'Superhero',
          src: 'upload/avatar/avatar-superhero.png'
        }, {
          href: 'javascript:;',
          title: 'Tropicalgirl',
          alt: 'Tropicalgirl',
          src: 'upload/avatar/avatar-tropicalgirl.png'
        }, {
          href: 'javascript:;',
          title: 'Workingoutboy',
          alt: 'Workingoutboy',
          src: 'upload/avatar/avatar-workingoutboy.png'
        }, {
          href: 'javascript:;',
          title: 'Workingoutgirl',
          alt: 'Workingoutgirl',
          src: 'upload/avatar/avatar-workingoutgirl.png'
        }, {
          href: 'javascript:;',
          title: 'Cutegirl',
          alt: 'Cutegirl',
          src: 'upload/avatar/avatar-cutegirl.png'
        }
      ]
    },
    landingIndexCtrl: {
      intro: [
        {
          element: '#progress-bar',
          intro: ' <p>This progress bar shows you how close you are to winning your next time challenge.</p><p>Click on it to zoom in on your timeline or rotate your phone to horizontal mode to see your complete timeline.</p>',
          position: 'bottom',
          tooltipClass: 'content-progress'
        }, {
          element: '#progress-bar',
          intro: ' <p>Occasionally we\'ll<br>award you an additional<br>badge for clearing other<br>milestones along the way.<br>Your personal challenges will<br>also show up like this.</p>',
          position: 'bottom',
          tooltipClass: 'content-progress-1',
          isUntilHelps: true
        }, {
          element: '#icon-left',
          intro: 'Click here for the menu and <br> your profile. Here you\'ll see <br>  your personal stats ans have <br> access to all areas of the app.',
          position: 'bottom',
          tooltipClass: 'content-icon-menu',
          isUntilHelps: true
        }, {
          element: '#icon-right',
          intro: ' <p>Your quit is unlike anyone else\'s.<br>Click here to enter a personal<br>challenge when you have a<br>moment of temptation coming<br>up during your week.</p>',
          position: 'bottom',
          tooltipClass: 'content-badge'
        }, {
          element: '#time-challenge-block',
          intro: ' <p>Your current time challenge is<br>also visible in this area together<br>with the badge and points you<br>will win. Stay focused on your<br>next achievement.</p>',
          position: 'bottom',
          tooltipClass: 'content-landing-1',
          isUntilHelps: true
        }, {
          element: '#btn-distract-me',
          intro: '<p>Got a craving? Distract<br>yourself with a little game<br>that will keep you busy<br>till it passes.</p>',
          position: 'bottom',
          tooltipClass: 'content-landing-2'
        }, {
          element: '#btn-slipped',
          intro: '<p>Slip ups happen. Let the app know<br> and it will turn into your<br> personal record. Then try <br>to beat that!</p>',
          position: 'top',
          tooltipClass: 'content-landing-3'
        }, {
          element: '#rn-carousel-1',
          intro: '<p>A little daily motivation<br>can go a long way. And <br>when a daily motivation<br> has real science behind <br> it, it\'s even better.</p>',
          position: 'bottom',
          tooltipClass: 'content-landing-4',
          staticContent: '<li id="rn-carousel-1" class="rn-carousel-slide ng-scope introjs-showElement"><div class="content ng-scope"><h2 translate="Get productive!" class="ng-scope">Get productive!</h2><div ng-bind-html="item.descriptioin" class="text-intro ng-binding"><p>Fill the time you used to spend on cigarette breaks by learning something new: make a habit of learning a new language for instance. Those ten minutes here and there can really add up!</p></div><div class="image-motivation"><img src="images/overlay/get-productive.png" alt=""></div></div></li>',
          isUntilHelps: true
        }, {
          element: '#rn-carousel-1',
          intro: '<p>Scroll through all of your<br>daily motivations to date.</p>',
          position: 'bottom',
          tooltipClass: 'content-landing-5',
          isUntilHelps: true
        }, {
          element: '[data-name="quit-team-button"]',
          intro: '<p>Quitting shouldn\'t be<br>something you do alone.<br>Click here and we\'ll be<br>happy to introduce you to<br>a team of other<br> inspired quitters.</p>',
          position: 'top',
          tooltipClass: 'content-landing-7'
        }
      ],
      motivationItems: [
        {
          title: 'Scent-sational!',
          alt: 'Scent-sational!',
          src: 'images/motivation/scent-sational.png',
          text: 'Now that you\'re free of cigarette smoke, why not celebrate it with a new perfume?'
        }, {
          title: 'Pen-it!',
          alt: 'pen it',
          src: 'images/motivation/pen-it.png',
          text: 'Take a pen and write down a craving when it occurs, then write next to it why it is you\'re craving it and try to come up with a solution to the trigger. It might be stress or boredom you\'re dealing with.'
        }, {
          title: 'Celebrate Success',
          alt: 'Celebrate Success',
          src: 'images/motivation/celebrate-success.png',
          text: 'Reward yourself when you reach a goal, be it big or small. That way you\'ll train your brain for positive rewards.'
        }, {
          title: 'Hot bath!',
          alt: 'Hot bath!',
          src: 'images/motivation/hot-bath.png',
          text: 'Cigarette smoke not only smells foul, it also has an irritating effect on your eyes. By quitting you\'ll start reducing smoking-related eye irritation.'
        }, {}
      ]
    },
    quitPointCourageCtrl: {
      intro: [
        {
          element: '#courage-step-1',
          intro: '<p>You will unlock achievement<br>badges when you hit milestones<br>or complete challenges.</p>',
          position: 'bottom',
          tooltipClass: 'content-courage-badge'
        }, {
          element: '#courage-step-2',
          intro: '<p>Every badge comes with quit points.<br>Quit points can be used to get in-store coupons* for NiQuitin products or in-app surprises.</p><p class="note">*While quantities last</p>',
          position: 'top',
          tooltipClass: 'content-badge-point'
        }
      ]
    },
    quitteamLanding1Ctrl: {
      intro: [
        {
          element: '#nav-tabs',
          intro: '<p>Motivate Nick to keep<br> going with a cheer or a<br> funny smiley.</p>',
          position: 'top',
          tooltipClass: 'content-quit-team-4',
          isUntilHelps: true
        }
      ],
      smileList1: [
        {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-1.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-2.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-3.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-4.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-5.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-6.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-7.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-8.png"
        }
      ],
      smileList2: [
        {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-9.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-10.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-11.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-12.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-13.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-14.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-15.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-16.png"
        }
      ],
      smileList3: [
        {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-17.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-18.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-19.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-20.png"
        }
      ],
      smileList: [
        {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-1.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-2.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-3.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-4.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-5.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-6.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-7.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-8.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-9.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-10.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-11.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-12.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-13.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-14.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-15.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-16.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-17.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-18.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-19.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-20.png"
        }
      ]
    },
    quitteamLanding2Ctrl: {
      intro: [
        {
          element: '#activity-feed',
          intro: ' <p>Keep an eye out for how your team members are doing. Send them extra encouragement if you see that they aren’t doing as well as they could!</p>',
          position: 'top',
          tooltipClass: 'content-quit-team-2',
          staticContent: '<li><div class="thumbnail"><img alt="" src="images/overlay/avatar-hipsterboy.png"></div><div class="content"><p class="name-feed"><span class="name">mimosa &nbsp;</span> unlocked a badge!</p></div></li><li><div class="thumbnail"><img alt="" src="images/overlay/avatar-aviator.png"></div><div class="content"><p class="name-feed"><span class="name">baba &nbsp;</span> unlocked a badge!</p></div></li><li><div class="thumbnail"><img alt="" src="images/overlay/avatar-aviator.png"></div><div class="content"><p class="name-feed"><span class="name">Up &nbsp;</span> unlocked a badge!</p></div></li>',
          isUntilHelps: true
        }, {
          element: '[data-name="pane-cheers"]',
          intro: '<p>Clicking on Cheers will <br> allow you to see the <br>personal cheers and smileys<br> sent to you by your team<br> members.</p>',
          position: 'top',
          tooltipClass: 'content-quit-team-3',
          staticContent: '<li><div class="thumbnail"><img src="images/overlay/avatar-hipsterboy.png" alt=""><span class="name"></span></div><div class="content"><div class="inner smiley"><img src="images/overlay/quit-cheer-18.png" alt="" class="img-status"></div></div></li><li><div class="thumbnail"><img src="http://quitapp-publish-test.gsk.sutrix.com/content/dam/napp/avatar/avatar-scubaboy.png" alt=""><span class="name"></span></div><div class="content cheer-content"><div class="inner"><span>Keep up the good work!</span></div></div></li>',
          isUntilHelps: true
        }, {
          element: '#step1',
          intro: '<p>Click on #Nick to see<br>what he&#39;s been up to<br>and to give him/her a cheer.</p>',
          position: 'bottom',
          tooltipClass: 'content-quit-team',
          isUntilHelps: true
        }
      ]
    },
    timelineIndexCtrl: {
      intro: [
        {
          element: '[data-intro-step="0"]',
          intro: '<p>Choose a day and tap on <br>the plus icon to add a <br>challenge for that day.</p>',
          position: 'top',
          tooltipClass: 'content-timeline-1',
          isUntilHelps: true
        }, {
          element: '[data-intro-step="1"]',
          intro: '<p>Choose a category and <br>then pick a temptation <br>to challenge.</p>',
          position: 'top',
          tooltipClass: 'content-timeline-2',
          isUntilHelps: true
        }, {
          element: '[data-intro-step="2"]',
          intro: '<p>Pick the time of the <br> day that your temptation <br> will occur.</p>',
          position: 'bottom',
          tooltipClass: 'content-timeline-3',
          isUntilHelps: true
        }, {
          element: '.progress-bar',
          intro: '<p>Swipe the timeline left or <br>right to see your past and<br> coming achievements.<br> Rotate your phone to see<br> your complete timeline.',
          position: 'top',
          tooltipClass: 'content-timeline-4',
          isUntilHelps: true
        }, {
          element: '.progress-bar',
          intro: '<p>Rotate the screen to see <br> even more details including <br>badges and challenges, <br> past and future.</p>',
          position: 'bottom',
          tooltipClass: 'content-timeline-5',
          isUntilHelps: true
        }
      ],
      introWithoutHelp: [
        {
          element: '.progress-bar',
          intro: '<p>Rotate the screen to see <br> even more details including <br>badges and challenges, <br> past and future.</p>',
          position: 'bottom',
          tooltipClass: 'content-timeline-5'
        }
      ]
    },
    tourIndexCtrl: {
      tourData: [
        {
          alt: 'quit',
          src: 'images/upload/photo-tour-intro.png',
          title: 'tour.step1.title',
          desc: 'tour.step1.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-3.png',
          title: 'tour.step2.title',
          desc: 'tour.step2.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-2.png',
          title: 'tour.step3.title',
          desc: 'tour.step3.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-4.png',
          title: 'tour.step4.title',
          desc: 'tour.step4.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-5.png',
          title: 'tour.step5.title',
          desc: 'tour.step5.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-6.png',
          title: 'tour.step6.title',
          desc: 'tour.step6.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-7.png',
          title: 'tour.step7.title',
          desc: 'tour.step7.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-last.png',
          title: '',
          desc: '',
          "class": 'hide'
        }
      ]
    }
  };
  if (typeof globalSettingsData !== "undefined" && globalSettingsData !== null) {
    mconsole.log('globalSettingsData has been used');
    return globalSettingsData;
  } else {
    mconsole.log('settingsData has been used');
    return settingsData;
  }
});

//# sourceMappingURL=settings.js.map

'use strict';
var globalL10n, l10n;

l10n = globalL10n = {
  button: {
    addMedia: 'Add media',
    addSlip: 'Add A Slip Up',
    backToHome: 'Back to My Homepage',
    buyOnline: 'Buy Now Online',
    cancel: 'Cancel',
    "continue": 'Continue',
    coupons: 'Coupons',
    createChallenge: 'Create challenge',
    distractMe: 'Distract Me',
    donate: 'Donate',
    done: 'Done',
    emailCoupon: 'Email Me Coupon',
    go: 'Go',
    gotIt: 'Got it!',
    keepTeam: 'No, keep me on the team',
    iSlip: 'I Slipped',
    join: 'Join',
    jumpToDay: 'Jump to Today',
    leaveTeam: 'Yes, I’m sure',
    next: 'Next',
    newCharacter: 'New Characters',
    no: 'No',
    noThanks: 'No, Thanks',
    rateApp: 'Rate This App',
    readMore: 'Read More',
    readLess: 'Read Less',
    redeem: 'Redeem',
    remindMe: 'Remind Me',
    remindLater: 'Remind Me Later',
    restart: 'Yes, Restart My Journey',
    ok: 'Ok',
    post: 'Post',
    send: 'Send',
    sendCheer: 'Send Cheer',
    sendSmiley: 'Send Smiley',
    setChallenges: 'Set Challenges',
    skip: 'Skip',
    submit: 'Submit',
    startFresh: 'Start Fresh',
    yes: 'Yes',
    qSend: 'Send ',
    qACheer: ' a Cheer!'
  },
  message: {
    success: 'Success',
    alertPass: 'Passwords must be a minimum of 4 and maximum of 12 characters. They must include 1 letter and 1 number.',
    alertRePass: 'Please enter confirm password',
    alertPassSignIn: 'Please enter a valid password',
    alertName: 'Your name can not contain numbers or special characters',
    alertEmail: 'Please enter your correct email',
    alertQuestion: 'Please choose your security question',
    alertAnswer: 'Please enter your security answer',
    alertUserName: 'User name cannot contain spaces',
    gotBadge: 'You\'ve got a badge.'
  },
  login: {
    signIn: 'Sign in',
    signUp: 'Sign up',
    forgotPass: 'Forgot Password?',
    forgotUsername: 'Forgot Username?',
    tour: 'Take a tour',
    signUp2: 'Don’t have an account? ',
    viewPrivaceyPolicy: 'See our Privacy Policy ',
    forgotMess: 'Don’t worry. Enter your username <br> below and we’ll send you <br>instructions to create a new one.',
    forgotUsernameMess: 'Don’t worry. Enter your email <br>below and we’ll send you<br> your username.',
    enterUsername: 'Enter your username:',
    enterEmail: 'Enter your email:',
    enterAnswer: 'Enter your security answer:',
    enterNewPass: 'Enter your new password:',
    textComing: '<p> You should receieve an email shortly width instructions on resetting you password.</p><p> If you still have trouble logging in, please contact <br><a href="tel:3366712123" title="phone number" class="phone"> 336 671 2123</a></p>',
    welcomeBack: ' Welcome back. It looks like it’s <br>been a while since your last visit, <br>do you want to continue your <br>journey or start fresh?  ',
    placeName: 'Your Name',
    placeUserName: 'Username',
    placeEmail: 'Your Email',
    placePass: 'Password',
    placeEnterPass: 'Password',
    placeRePass: 'Retype Your Password',
    placeQuest: 'Security Question',
    placeAnswer: 'Security Answer',
    instructionsPass: 'Passwords must be a minimum of 4 and maximum of 12 characters. They must include 1 letter and 1 number.',
    instructionsName: 'Please be aware that your username will be displayed to others if you choose to join a quit team. ',
    mustAge: ' <p>You must be 18 years of age<br> or older and a resident in the<br> UK (but not a resident in the<br> Channel Islands) to access or<br> use this application.</p><p><strong>NiQuitin</strong> Patches, Lozenges, Strips<br> and Gum are stop smoking aids.<br> Contain nicotine. Requires<br> willpower. Always read the label.<p>',
    pushBlock: '<p>weQuit by <strong>NiQuitin<strong>" <br>would like to send you <br>push notifications.</p><p>Notification may include alerts, <br>sounds and icon badges. This<br> can be configured in the<br> settings area.</p>',
    rememberMe: 'Keep me signed in'
  },
  account: {
    title: 'Pick your character',
    group1: 'My Info',
    group2: 'My Old Habit',
    group3: 'My Reason to Quit',
    group4: 'Restart My Journey',
    group5: 'Leave Quit Team',
    userName: 'Username',
    yourName: 'Your Name',
    email: 'Email',
    avatar: 'Avatar',
    password: 'Password',
    currentPass: 'Current Password',
    newPass: 'New Password',
    confirmPass: 'Confirm New Password',
    country: 'Country',
    language: 'Language',
    time: 'Your Recap Time',
    progressUpdate: 'How often do you want <br />a progress update?',
    habit1: 'You\'ve been a smoker for',
    habit2: 'You have been smoking for',
    habit3: 'You smoke',
    reason: 'We all have a reason to quit.<br>Select yours now.',
    restart: 'Are you sure you want to restart your journey? This will erase your current journey and current achivements.',
    habitLook1: 'I am looking for all all day relief from cravings',
    habitLook2: 'I am looking for craving relief when cravings strike ',
    logout: 'Logout',
    logoutText: 'Are you sure you want to log out?',
    selectValue: 'Select a value'
  },
  leaving: {
    topMess1: 'Are you sure you want to <br /> leave your Quit Team?',
    bottomMess1: 'Leaving your team means you <br> won’t be able to recieve cheers or <br> smileys any longer.',
    topMess2: 'We’re sad to see you go!',
    topMess3: 'Yay! We’re glad you stayed.',
    bottomMess2: 'If you change your mind you can re-join a Quit Team by clicking on the team in your home screen or menu navigation.'
  },
  feedBack: {
    message: '<p>Please do not report any adverse <br>effects or questions in this area. Visit <a href="http://niquitin.co.uk" title="niquitin.co.uk">niquitin.co.uk</a> for more information.</p>',
    caption: 'Give us feedback...',
    rate: 'Rate our app in the iTunes Store'
  },
  thank: {
    feedback: 'Thank you for<br/>your feedback!',
    productRating: 'Thank you<br/>for your rating!',
    donation: 'Thanks for your donation!'
  },
  habit: {
    quest1: 'How many cigarettes do you smoke a day?',
    quest2: 'What is your reason to quit?',
    quest3: 'Are you currently using nicotine replacement therapy or another product to quit?',
    quest4: 'How soon do you smoke after waking?',
    quest5: 'How many years have you been a smoker?',
    answer1: ' a day',
    answer2: ' after waking'
  },
  help: {
    info: 'Would you like to turn on <br> help messages? These <br> messages will appear once <br> as you use the app until <br> you click help again.'
  },
  landing: {
    content: 'Slip ups are part of the<br/>journey, keep going!',
    timeChallenge: 'Time Challenge',
    ofText: 'of',
    hourCompleted: 'Hours completed',
    title1: 'Team Activity',
    title2: 'Motivations and tips',
    youHave: 'You have',
    cheer: 'cheer!',
    cheers: 'cheers!',
    noCheers: 'Nothing yet. Go and cheer on a team member!',
    goToTeam: 'Go to your team page',
    QTbtn: 'Quit Team',
    QTcaption: 'Quiting can be easier together!',
    PRbtn: 'Product Reminder',
    PRcaption: 'It’s time! Check out your daily reminder',
    PRcaption2: 'Add a product to your plan and win a badge!',
    needExtra: 'Need Extra Help?',
    getToProduct: 'Get to know our products',
    quitingBtn: 'Quiting can be easier together!'
  },
  footer: {
    title: 'Thank You',
    messages: 'You\'re committed to your quit and we\'re committed to helping you. We wish you all the luck, strength and perseverance in the world. Now, let\'s make this quit happen.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
    link: 'See Our Privacy Policy'
  },
  motivation: {
    textTop: 'Scroll down to view all<br/>your daily motivations',
    viewScience: 'View the science behind',
    readScience: 'Read the science behind'
  },
  science: {
    textIntro: 'Time to enjoy your favourite meal',
    readScience: 'Read the science behind',
    content: 'Now that you’ve quit, your taste buds and sense of smell have begun to improve. So why not order your favourite meal and enjoy the flavours! Lorem ipsum dolor sit amet, consectetur adipisicing elit, et quasi architecto beatae vitae dicta sunt explicabo.'
  },
  courage: {
    title: 'Slip Up Badge',
    info: 'Don\'t worry!<br/> This happens. You made it X without smoking and that\'s great. Now let\'s <br/> try to beat that.'
  },
  product: {
    getProduct: 'Get product recommendations',
    myProduct: 'My Product',
    noticeFooter: '<strong>NiQuitin</strong> Patches, Lozenges, Strips and Gums are stop smoking aids. Requires willpower. Contain nicotine. Always read the label.',
    guideText: 'Click to add the product that you are currently using. We’ll remind you daily to take this product. If you decide to try something new, simply click the icon to change your product.',
    fullDesc: 'Full Description',
    rating: 'Overall Rating',
    nickname: 'Nickname',
    titleReview: 'Title of your review',
    yourReview: 'Your review',
    averageRating: 'Average Rating',
    showMore: 'Show more reviews',
    writeReview: 'Write your review'
  },
  quitPoint: {
    startJourney: 'Start<br>Journey',
    title: 'By pushing this button you will<br> begin your Quit journey.',
    info: 'Set a reminder and start to quit when <br>you\'re prepared and ready to go.',
    characterSay: ' Say hello to your <br> new character!',
    seeOffer: 'See offer details',
    donationSection: '100 points = 5 pounds',
    donationText: 'GlaxoSmithKline is a proud sponsor of',
    donationTextColor: 'Tres Cantos Open Lab Foundation',
    donationUnderline: 'Charity Description',
    yBadgesText: 'This is your trophy room.<br>A good place to remind yourself of all<br>the small milestones along the way.',
    yPointDesc: 'You currently have',
    point: 'Points',
    yPointInfo: 'Almost there!',
    yPointInfoA: 'You need ',
    yPointInfoB: ' points to redeem for a real discount*.',
    yPointNote: '*While quantity of coupons lasts.'
  },
  signUp: {
    age: 'Age',
    bestTime: 'What time do you want your daily progress update?',
    country: 'Choose your country',
    male: 'Male',
    female: 'Female',
    language: 'Language',
    progress: 'How often do you want<br>your progress update?',
    daily: 'Daily',
    weekly: 'Weekly',
    orther: 'Every <br> Other<br> Day',
    whereHere: 'Where did you hear about the app?',
    cbTerm: 'Accept the terms and conditions',
    cbReceive: 'Receive offers and news from <strong>NiQuitin</strong>.',
    valueDefault: 'Please select...'
  },
  team: {
    joinDesc: 'Get encouragement and support <br>from other users who are on the same <br>journey by joining a quit team made<br> of other app users! You can send <br>cheers, see statistics and keep track of<br> your success together.',
    joinNote: 'Please be aware that users on your quit team will be<br> able to see your username, number of days you have<br> been smoke free, your badges and your quit points.',
    nameStats: '’s Stats',
    latestBadges: 'Latest Badges',
    cheer: 'Cheer',
    cheers: 'Cheers',
    smileys: 'Smileys',
    activityFeed: 'Activity Feed',
    teamActivity: 'Team Activity',
    receiveCheer: 'Received Cheers',
    chooseCheer: 'Choose Cheer',
    teamStat: 'Your Team Stats'
  },
  recap: {
    info: 'Great!',
    text: 'Have you had a cigarette<br /> since the last visit?'
  },
  timeline: {
    descHtml: ' Keep track of your progress and plan ahead.<br /> Is a typical moment of temptation coming up?<br /> Tap the plus icons and add it to your calendar.',
    descNoneHtml: 'Keep track of your progress and plan ahead. Is a typical moment of temptation coming up? Tap the plus icons and add it to your calendar.',
    social: 'Social',
    work: 'Work',
    personal: 'Personal',
    chooseCategory: 'Choose a category',
    party: 'Party',
    barClub: 'Bar/Club',
    outWFriends: 'Out with Friends',
    sportsEvent: 'Sports Event',
    dining: 'Dining out',
    movieNight: 'Movie Night',
    dateNight: 'Date Night',
    concert: 'Concert',
    holiday: 'Holiday',
    workEvent: 'Work event',
    presentation: 'Presentation',
    deadline: 'Deadline',
    workingLate: 'Working Late',
    stressfulDay: 'Stressful day',
    travelingFWork: 'Traveling for work',
    timeChallenge: 'Time challenge',
    stayingIn: 'Staying In',
    homeAlone: 'Home Alone',
    driving: 'Driving',
    beingSmokers: 'Being around smokers',
    morning: 'Morning',
    noon: 'Noon',
    afternoon: 'Afternoon',
    evening: 'Evening',
    whatTime: 'At what time?'
  },
  sidebarRight: {
    title: 'When is your challenge? Pick a day.',
    desc: 'Keep track of your progress and plan ahead. Is a temptation coming up? Tap the plus icons and add it to your calendar.',
    planHead: 'Plan ahead. Use your timeline to plan for, and fight through, moments of temptation.'
  },
  popup: {
    toHabit: 'Take a moment to tell us a<br> little about yourself and you\'ll <br> recieve <span>50</span> extra points!',
    creatProfile: 'Please create a quick user <br> profile to enjoy the full<br> benefits of this app.',
    challenge: 'It’s a new week!<br> Remember to record <br>any upcoming personal <br>challenges in your timeline.',
    rateAppTitle: 'Rate weQuit',
    rateAppContent: 'If you enjoy using this app would you mind taking a moment to rate it? It won’t take more than a minute. Thanks!',
    change: 'You have already listed a product that you are using. Would you like to change the product based on our recommendation?',
    informationTop: 'Based on the infomation <br>you\'ve provided, we<br> recommend that<br> ',
    informationBottom: ' might be right for you.',
    recommend: 'You are already using the product that we\'d recommend for you!',
    firstOne: 'You are the first one here,<br> but not for long!<br> We\'ll notify you as more<br> people join your team.',
    notFull: 'Your team isn\'t full quite yet.<br> We\'ll let you know as <br>more people join.',
    getPass: 'Your request has been sent to the email provided. ',
    reminder: 'Thank you! <br> We\'ll send you a reminder soon.',
    slipUp: 'Slip ups are part of the <br>journey so if you smoked a <br>cigarette let us know and <br>keep on trying to quit.',
    alertSlip: 'Not your best attempt. Give it a think and give it another go. Restart your journey?'
  }
};

//# sourceMappingURL=static-content.js.map

'use strict';
angular.module('site').factory('Utils', function(BadgeService, AccountService, FacebookService, CONSTANTS, $rootScope, $timeout, Device, Settings, localStorageService, UserData, GigyaService) {
  var requestingOverlay;
  requestingOverlay = $('[data-loading-data="data-loading-data"]');
  return {
    shareToFacebook: function(item) {
      var shareModel;
      shareModel = {
        display: item.title,
        caption: item.descriptioin,
        description: item.descriptioin,
        picture: item.picture,
        message: Settings.sharingData.message,
        link: Settings.sharingData.link
      };
      return FacebookService.shareByPopup(shareModel).then(function(data) {
        mconsole.log('done', data);
        return Device.alert('Your message has been shared', null, 'Message', 'Done');
      }, function(err) {
        mconsole.log('err', err);
        return Device.alert('Cannot share your message right now, please try again later!', null, 'Error', 'Done');
      });
    },
    shareToFacebook2: function(model) {
      var share;
      share = function(model) {
        return FacebookService.shareWithDetails(model).then(function(data) {
          mconsole.log('done', data);
          return Device.alert(data.message, null, 'Message', 'Done');
        }, function(err) {
          mconsole.log('err', err);
          return Device.alert('Cannot share your message right now, please try again later!', null, 'Error', 'Done');
        });
      };
      if (FacebookService.getLoginStatus().status === 'connected') {
        return share(model);
      } else {
        return FacebookService.login().then(function() {
          return share(model);
        });
      }
    },
    shareByPopup: function(model) {
      return FacebookService.shareByPopup(model).then(function(data) {
        mconsole.log('done', data);
        return Device.alert(data.message, null, 'Message', 'Done');
      }, function(err) {
        mconsole.log('err', err);
        return Device.alert('Cannot share your message right now, please try again later!', null, 'Error', 'Done');
      });
    },
    showConnectionError: function() {
      return Device.alert(Settings.error.cannotConnectToServer, null, Settings.error.error, Settings.error.done);
    },
    html2Plain: function(htmlStr) {
      var beginPos, endPos, newStr;
      beginPos = htmlStr.indexOf('<');
      endPos = htmlStr.indexOf('>');
      while (beginPos >= 0) {
        newStr = htmlStr.substr(0, beginPos - 1) + htmlStr.substr(endPos + 1, htmlStr.length);
        htmlStr = newStr;
        beginPos = htmlStr.indexOf('<');
        endPos = htmlStr.indexOf('>');
      }
      return htmlStr;
    },
    getThumbLink: function(imgUrl) {
      var dotPosition, newLink;
      dotPosition = imgUrl.lastIndexOf('.');
      newLink = imgUrl.substr(0, dotPosition) + '-thumb' + imgUrl.substr(dotPosition, dotPosition.length);
      return newLink;
    },
    mainScroll: function(top, duration) {
      return $('#main').animate({
        scrollTop: top
      }, duration || 700);
    },
    customScroll: function(elm, top, duration) {
      return $(elm).animate({
        scrollTop: top
      }, duration || 700);
    },
    updateBtnStatus: function(status) {
      if (status) {
        return $('.btn.btn-2').addClass('active');
      } else {
        return $('.btn.btn-2').removeClass('active');
      }
    },
    isValidPassword: function(pass) {
      var regex;
      regex = '^(?=.*[a-zA-Z])(?=.*[0-9])(?!.*[@&\\#\\^\\-\\*/\\$£€\\(\\)\\|!%\\+\\,])(?=\\S+$).{4,12}$';
      return (pass != null) && pass.match(regex);
    },
    isValidFullName: function(fullName) {
      var regex;
      regex = '^(?=.*[a-zA-Z])(?!.*[0-9])(?!.*[@&\\#\\^\\-\\*/\\$£€\\(\\)\\|!%\\+\\,]).{1,100}$';
      return (fullName != null) && fullName.match(regex);
    },
    isValidEmail: function(email) {
      var regex;
      regex = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
      return (email != null) && email.match(regex);
    },
    isValidUserName: function(userName) {
      var regex;
      regex = '^\\S+$';
      return (userName != null) && userName.match(regex);
    },
    showRequestingOverlay: function() {
      return requestingOverlay.removeClass('hidden');
    },
    hideRequestingOverlay: function() {
      return requestingOverlay.addClass('hidden');
    },
    requestingHasFinished: function(delay) {
      return $timeout(function() {
        return $rootScope.$emit('requesting-has-finished');
      }, delay || 0);
    },
    showLoading: function() {
      return $('body').addClass('processing');
    },
    hideLoading: function() {
      return $('body').removeClass('processing');
    },
    stringToTime: function(HHmm) {
      var hours, minutes, toDay;
      toDay = new Date();
      hours = HHmm.substr(0, 2);
      minutes = HHmm.substr(3, 2);
      toDay.setHours(hours);
      toDay.setMinutes(minutes);
      return toDay;
    },
    getSecondFromNow: function(hhmmString) {
      var checkHour, checkMinute, hours, minutes, now, nowHour, nowMinute, secondRemindFromNow, setHour, setMinute;
      now = new Date().getTime();
      hours = hhmmString.substr(0, 2);
      minutes = hhmmString.substr(3, 2);
      nowHour = parseInt(moment(now).format('HH'));
      nowMinute = parseInt(moment(now).format('mm'));
      setHour = parseInt(hours);
      setMinute = parseInt(minutes);
      checkHour = setHour - nowHour;
      checkMinute = setMinute - nowMinute;
      if (checkHour > 0) {
        if (checkMinute >= 0) {
          secondRemindFromNow = checkMinute * 60 + checkHour * 60 * 60;
        } else {
          secondRemindFromNow = ((setMinute + 60 - nowMinute) * 60) + ((checkHour - 1) * 60 * 60);
        }
      } else {
        if (checkHour === 0) {
          if (checkMinute > 0) {
            secondRemindFromNow = checkMinute * 60;
          } else {
            secondRemindFromNow = 24 * 60 * 60 + (checkMinute * 60);
          }
        } else {
          checkHour = 24 - nowHour + setHour;
          if (checkMinute >= 0) {
            secondRemindFromNow = (checkMinute * 60) + (checkHour * 60 * 60);
          } else {
            secondRemindFromNow = ((setMinute + 60 - nowMinute) * 60) + ((checkHour - 1) * 60 * 60);
          }
        }
      }
      return secondRemindFromNow;
    },
    getDifferenceDate: function(firstDate, secondDate, returnType) {
      var arr, days, differenceDate, hour, minute, msFirstDate, msPerDay, msSecondDate;
      if (typeof firstDate === 'string') {
        arr = firstDate.split(/[-]/);
        firstDate = new Date(arr[0], arr[1] - 1, arr[2]);
      }
      if (typeof secondDate === 'string') {
        arr = secondDate.split(/[-]/);
        secondDate = new Date(arr[0], arr[1] - 1, arr[2]);
      }
      msPerDay = 24 * 60 * 60 * 1000;
      msFirstDate = firstDate.getTime();
      msSecondDate = secondDate.getTime();
      differenceDate = Math.abs(msFirstDate - msSecondDate);
      switch (returnType) {
        case 'date':
          days = Math.round(differenceDate / msPerDay);
          console.log('Difference days ' + days);
          return days;
        case 'hour':
          hour = Math.round(differenceDate / (60 * 60 * 1000));
          console.log('Difference hours ' + hour);
          return hour;
        case 'minute':
          minute = Math.round(differenceDate / (60 * 1000));
          console.log(' Difference minutes ' + minute);
          return minute;
      }
    },
    getMinuteNow: function() {
      var minute;
      minute = new Date().getMinutes();
      minute = minute < 10 ? '0' + minute : minute;
      return minute;
    },
    getHourNow: function() {
      var hour;
      hour = new Date().getHours();
      hour = hour < 10 ? '0' + hour : hour;
      return hour;
    },
    getDateNow: function() {
      var date;
      date = new Date().getDate();
      date = date < 10 ? '0' + date : date;
      return date;
    },
    getMonthNow: function() {
      var month;
      month = new Date().getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      return month;
    },
    getYearNow: function() {
      return new Date().getFullYear();
    },
    getDay: function() {
      return new Date().getDay();
    },
    sundayRemind: function(date) {
      var atTime, day, sunday;
      day = date.getDay();
      atTime = date.getTime();
      switch (day) {
        case 0:
          sunday = new Date(atTime);
          break;
        case 1:
          sunday = new Date(atTime + 6 * 24 * 60 * 60 * 1000);
          break;
        case 2:
          sunday = new Date(atTime + 5 * 24 * 60 * 60 * 1000);
          break;
        case 3:
          sunday = new Date(atTime + 4 * 24 * 60 * 60 * 1000);
          break;
        case 4:
          sunday = new Date(atTime + 3 * 24 * 60 * 60 * 1000);
          break;
        case 5:
          sunday = new Date(atTime + 2 * 24 * 60 * 60 * 1000);
          break;
        case 6:
          sunday = new Date(atTime + 1 * 24 * 60 * 60 * 1000);
      }
      return sunday;
    },
    dateRemind: function(second) {
      var date, now;
      now = new Date().getTime();
      second = parseInt(second);
      date = new Date(now + second * 1000);
      return date;
    },
    changeTimeAP: function(HHmm) {
      var hour, min, returnVal, suffex;
      hour = parseInt(HHmm.substr(0, 2));
      min = parseInt(HHmm.substr(3, 2));
      min = (min < 10 ? "0" + min : min);
      suffex = (hour >= 12 ? " PM" : " AM");
      hour = (hour + 11) % 12 + 1;
      returnVal = hour + ":" + min + suffex;
      return returnVal;
    },
    sortDateListASC: function(date1, date2) {
      if (date1 > date2) {
        return 1;
      }
      if (date1 < date2) {
        return -1;
      }
      return 0;
    },
    sortDateListDESC: function(date1, date2) {
      if (date1 > date2) {
        return -1;
      }
      if (date1 < date2) {
        return 1;
      }
      return 0;
    },
    dateToString: function(date) {
      var d, hour, minute, month, second, year;
      year = date.getFullYear();
      month = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
      d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return year + '-' + month + '-' + d + ' ' + hour + ':' + minute + ':' + second;
    },
    checkBadge: function(action, callback, falseFunction) {
      var model;
      model = UserData.addToken({});
      return GigyaService.getChallenge(model).then(function(data) {
        var result;
        result = _.find(data.badges, function(badge) {
          return (badge.id === action) && (badge.count > 0);
        });
        mconsole.log('Check badget success', result);
        if (result === undefined) {
          if (callback != null) {
            return callback();
          }
        } else {
          if (falseFunction != null) {
            return falseFunction();
          }
        }
      }, function(err) {
        return mconsole.log('Check badget fail');
      });
    },
    removeGroupOfStorage: function(group) {
      var item, _i, _len, _ref, _results;
      _ref = localStorageService.keys();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (item.indexOf(group) === 0) {
          _results.push(localStorageService.remove(item));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    showPopup: function(elm) {
      $('#inner').addClass('show-popup');
      return $(elm).removeClass('hidden');
    },
    preLoadData: function() {
      var model;
      mconsole.log('preLoadData');
      if (localStorageService.get('hasJoinedATeam') === 'true') {
        model = UserData.addToken({});
        AccountService.viewTeam(model);
      }
      model = {
        'start-date': '2014-01-01',
        'end-date': '2014-12-31'
      };
      model = UserData.addToken(model);
      BadgeService.getTimeline(model);
      model = UserData.addToken({});
      return BadgeService.getChallenge(model);
    },
    preloadData: function() {
      var endDate, model, startDate;
      mconsole.log('preLoadData');
      if (localStorageService.get('hasJoinedATeam') === 'true') {
        model = UserData.addToken({});
        AccountService.viewTeam(model);
      }
      if (localStorageService.get('dateJourney') != null) {
        startDate = moment(localStorageService.get('dateJourney'), 'YYYY-MM-DD HH:mm:ss');
      } else {
        startDate = moment();
      }
      endDate = moment().add('months', 6);
      model = {
        'start-date': startDate.format('YYYY-MM-DD'),
        'end-date': endDate.format('YYYY-MM-DD')
      };
      model = UserData.addToken(model);
      BadgeService.getTimeline(model);
      model = UserData.addToken({});
      return BadgeService.getChallenge(model);
    }
  };
});

angular.module('site').factory('utils', function(CONSTANTS) {
  return {
    compareVersionNumbers: function(v1, v2) {
      var i, v1parts, v2parts, validateParts;
      validateParts = function(parts) {
        var i;
        i = 0;
        while (i < parts.length) {
          if (!isPositiveInteger(parts[i])) {
            return false;
          }
          ++i;
        }
        return true;
      };
      v1parts = v1.split('.');
      v2parts = v2.split('.');
      if (!validateParts(v1parts) || !validateParts(v2parts)) {
        return NaN;
      }
      i = 0;
      while (i < v1parts.length) {
        if (v2parts.length === i) {
          return 1;
        }
        if (v1parts[i] === v2parts[i]) {
          continue;
        }
        if (v1parts[i] > v2parts[i]) {
          return 1;
        }
        return -1;
        ++i;
      }
      if (v1parts.length !== v2parts.length) {
        return -1;
      }
      return 0;
    }
  };
});

//# sourceMappingURL=utils.js.map

angular.module('site').directive('gkAccordion', function($location, $rootScope) {
  return {
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var childs, headingClicked, model, setPanel;
      childs = $element.children('li');
      setPanel = function(index) {
        var item;
        childs.removeClass('active');
        item = childs.slice(index, index + 1);
        item.addClass('active');
        return $('.content', item).show();
      };
      model = $($element).attr('ng-model');
      $scope.$watch(model, function() {
        return setPanel(ngModel.$modelValue);
      });
      headingClicked = function() {
        var contentOfAll, contentOfCurrent, current;
        current = $(this).parent();
        if (current.hasClass('leave-quit-team' || current.hasClass('logout'))) {
          return;
        }
        contentOfCurrent = $('.content', current);
        contentOfAll = $('.content', childs);
        if (current.hasClass('active')) {
          current.removeClass('active');
          contentOfCurrent.hide();
          return;
        }
        childs.removeClass('active');
        contentOfAll.hide();
        current.addClass('active');
        return contentOfCurrent.show();
      };
      $('.heading', $element).bind('click', headingClicked);
      return $('[data-close-btn="data-close-btn"]').bind('click', function() {
        $(this).closest('.account-item').find('.heading').trigger('click');
      });
    }
  };
});

//# sourceMappingURL=gk-accordion.js.map

angular.module('site').directive('gkClockBlock', function($location, $rootScope) {
  return {
    link: function($scope, $element, $attrs) {}
  };
});

//# sourceMappingURL=gk-clock-block.js.map

angular.module('site').directive('gkDrumSelector', function($location) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      return $(function() {
        var addActiveAtIndex, drumChanged, model, opts, value2Index;
        value2Index = function(value) {
          var item, opts, _i, _len;
          opts = $('option', $element);
          for (_i = 0, _len = opts.length; _i < _len; _i++) {
            item = opts[_i];
            if ($(item).attr('value') === value) {
              return _i;
            }
          }
        };
        addActiveAtIndex = function(index) {
          var drumChilds;
          drumChilds = $element.next().find('.drum').children();
          drumChilds.removeClass('active');
          return drumChilds.slice(index, index + 1).addClass('active');
        };
        model = $($element).attr('ng-model');
        $scope.$watch(model, function() {
          var index;
          index = value2Index(ngModel.$modelValue);
          addActiveAtIndex(index);
          return $element.drum('setIndex', index);
        });
        drumChanged = function(elm) {
          var index;
          index = value2Index(elm.value);
          addActiveAtIndex(index);
          return ngModel.$setViewValue(elm.value);
        };
        opts = {
          panelCount: $attrs.panelCount || 16,
          dail_w: $attrs.dailW || 573,
          dail_h: $attrs.dailH || 330,
          dail_stroke_color: $attrs.dailStrokeColor || '#810000',
          dail_stroke_width: $attrs.dailStrokeWidth || 3,
          interactive: $attrs.interactive || false,
          onChange: drumChanged
        };
        $element.drum(opts);
      });
    }
  };
});

//# sourceMappingURL=gk-drum-selector.js.map

angular.module('site').directive('gkHeightBadgeDetail', function($rootScope, $timeout) {
  return {
    link: function(scope, element, attrs) {
      $timeout(function() {
        return element.css({
          'height': $(window).height() - 130
        });
      }, 400);
    }
  };
});

//# sourceMappingURL=gk-height-badge-detail.js.map

angular.module('site').directive('gkHeightDesc', function($location) {
  return {
    link: function($scope, $element, $attrs) {
      var height, windowW;
      windowW = $(window).height();
      height = windowW - 858;
      if ($('html').hasClass('gte-ios-7')) {
        height -= 40;
      }
      return $element.css('height', height + 'px');
    }
  };
});

//# sourceMappingURL=gk-height-desc.js.map

angular.module('site').directive('gkHideHeader', function($location, $rootScope, $timeout) {
  return {
    link: function(scope, element, attrs) {
      var arrowArea, arrowBorder, arrowElement, arrowHeight, arrowY, badgeContent, headerEl, headerHeight, headerY, hideHeaderClass, htmlElement, isNoTouch, mainElm, mainScroll, previousScroll, scrolPos, scrollPosition, scrollTime, startY;
      scrolPos = scrollPosition = previousScroll = startY = headerY = arrowY = 0;
      scrollTime = null;
      headerEl = $('#header');
      headerHeight = headerEl.outerHeight();
      htmlElement = $('html');
      hideHeaderClass = 'hide-header';
      arrowElement = $('.icon-arrow');
      arrowHeight = arrowBorder = 35;
      arrowArea = 45;
      mainElm = $('#main', element);
      isNoTouch = htmlElement.hasClass('no-touch');
      badgeContent = $('.badge-content', mainElm);
      $timeout((function() {
        mainElm.css({
          'overflow-y': 'auto'
        }).addClass('scrolling-touch');
        if (mainElm.hasClass('landing-page')) {
          $('.inner', mainElm).css({
            'overflow-y': 'auto'
          });
          $timeout((function() {
            $('.inner', mainElm).css({
              'overflow-y': 'auto'
            });
          }), 200);
        }
      }), 200);
      $("[data-signup-select]").on("focus", function(event) {
        return $timeout(function() {
          return window.scrollTo(0, 200);
        }, 500);
      });
      scope.$on('$routeChangeSuccess', function(next, current) {
        headerY = 0;
        headerEl[0].style[Modernizr.prefixed('transition')] = '';
        headerEl[0].style[Modernizr.prefixed('transform')] = '';
        arrowElement[0].style[Modernizr.prefixed('transition')] = '';
        arrowElement[0].style[Modernizr.prefixed('transform')] = '';
      });
      mainScroll = function() {
        mainElm.unbind('scroll.hideHeader').bind('scroll.hideHeader', function() {
          var animateArrow, currentScroll, distanceScrolled, scrollArrow, scrollingDown;
          clearTimeout(scrollTime);
          scrollArrow = false;
          currentScroll = mainElm.scrollTop();
          scrollingDown = currentScroll > previousScroll;
          distanceScrolled = currentScroll - previousScroll;
          headerY -= scrollingDown && -headerY < headerHeight || !scrollingDown && -headerY > 0 ? distanceScrolled : 0;
          headerY = -headerY < 0 ? 0 : -headerY > headerHeight ? -headerHeight : headerY;
          headerEl[0].style[Modernizr.prefixed('transition')] = 'none';
          headerEl[0].style[Modernizr.prefixed('transform')] = 'translate3d(0, ' + headerY + 'px, 0)';
          if (currentScroll < 0) {
            arrowElement.css('opacity', 0);
          } else {
            arrowElement.css('opacity', 1);
          }
          if (currentScroll < 5) {
            arrowElement[0].style[Modernizr.prefixed('transition')] = '';
            arrowElement[0].style[Modernizr.prefixed('transform')] = '';
            return;
          }
          if (scrollingDown) {
            animateArrow = currentScroll > arrowArea + headerHeight;
            arrowHeight = animateArrow ? 0 : arrowHeight;
          } else {
            animateArrow = arrowHeight !== arrowBorder && currentScroll <= arrowArea;
            arrowHeight = animateArrow ? arrowBorder - (currentScroll / arrowArea) * arrowBorder : arrowHeight;
          }
          arrowY = -headerY < headerHeight ? currentScroll + headerY : 0;
          arrowElement[0].style[Modernizr.prefixed('transform')] = 'translate3d(0,' + arrowY + 'px, 0)';
          return previousScroll = currentScroll;
        });
        if (!isNoTouch) {
          return mainElm.unbind('touchstart.hideHeader').bind('touchstart.hideHeader', function() {
            startY = mainElm.scrollTop();
          });
        }
      };
      if (!mainElm.data('showheader')) {
        mainScroll();
        return $rootScope.$on('intro-has-finished', function(data) {
          return mainScroll();
        });
      }
    }
  };
});

//# sourceMappingURL=gk-hide-header.js.map

angular.module('site').directive('gkHorizontalScroll', function($rootScope, $swipe, $compile, $window, $document, $timeout) {
  var requestAnimationFrame;
  requestAnimationFrame = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame;
  return {
    restrict: 'A',
    compile: function($scope, $element, $attrs) {
      return function($scope, $element, $attrs) {
        var documentMouseUpEvent, elementW, hasDDD, is3dAvailable, lastPos, offset, scroll, swipeEnd, swipeMove, swipeStart, tabContent, transformProperty, translatePos, ulW, windowW;
        elementW = parseInt($attrs.elementW) || 128;
        offset = {
          left: parseInt($attrs.offsetLeft) || 0,
          right: parseInt($attrs.offsetRight) || 0
        };
        translatePos = 0;
        lastPos = void 0;
        ulW = $('ul', $element).width();
        windowW = $(window).width();
        tabContent = $('.tab-content');
        documentMouseUpEvent = function(event) {
          var swipeMoved;
          swipeMoved = true;
          swipeEnd({
            x: event.clientX,
            y: event.clientY
          }, event);
        };
        transformProperty = 'transform';
        ['webkit', 'Moz', 'O', 'ms'].every(function(prefix) {
          var e;
          e = prefix + 'Transform';
          if (typeof document.body.style[e] !== 'undefined') {
            transformProperty = e;
            return false;
          }
          return true;
        });
        hasDDD = function() {
          var el, has3d, t, transforms;
          el = document.createElement("p");
          has3d = void 0;
          transforms = {
            webkitTransform: "-webkit-transform",
            OTransform: "-o-transform",
            msTransform: "-ms-transform",
            MozTransform: "-moz-transform",
            transform: "transform"
          };
          document.body.insertBefore(el, null);
          for (t in transforms) {
            if (el.style[t] !== undefined) {
              el.style[t] = "translate3d(1px,1px,1px)";
              has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
          }
          document.body.removeChild(el);
          return has3d !== undefined && has3d.length > 0 && has3d !== "none";
        };
        is3dAvailable = hasDDD();
        scroll = function(x) {
          var move;
          if (isNaN(x)) {
            move = translatePos;
          } else {
            move = x;
          }
          if (is3dAvailable) {
            $element.context.style[transformProperty] = 'translate3d(' + move + 'px, 0, 0)';
          } else {
            $element.context.style[transformProperty] = 'translate(' + move + 'px, 0, 0)';
          }
        };
        swipeStart = function(coords, event) {
          mconsole.log('swipeStart gk-horizontal-scroll');
          $rootScope.isHorizontalScrolling = true;
          $document.bind('mouseup', documentMouseUpEvent);
          tabContent.addClass('hide-dot');
          lastPos = coords;
          return false;
        };
        swipeMove = function(coords, event) {
          var delta;
          mconsole.log('swipeMove gk-horizontal-scroll');
          delta = coords.x - lastPos.x;
          if (delta <= 0) {
            translatePos -= Math.abs(delta);
          } else {
            translatePos += delta;
          }
          lastPos = coords;
          scroll();
          event.preventDefault();
          return false;
        };
        swipeEnd = function(coords, event, forceAnimation) {
          var delta;
          $rootScope.isHorizontalScrolling = false;
          mconsole.log('swipeEnd gk-horizontal-scroll');
          $document.unbind('mouseup', documentMouseUpEvent);
          $timeout(function() {
            return tabContent.removeClass('hide-dot');
          }, 300);
          if (translatePos > offset.left) {
            translatePos = 0;
            scroll();
            return;
          } else {
            if (Math.abs(translatePos) + windowW > ulW) {
              translatePos = -(ulW - windowW + offset.left + offset.right);
              scroll();
              return;
            }
          }
          delta = Math.abs(translatePos) % elementW;
          if (delta > (elementW / 2)) {
            translatePos -= elementW - delta;
          } else {
            translatePos += delta;
          }
          scroll();
        };
        $rootScope.$on('properties_changed', function(elm, w, left, right) {
          elementW = w;
          offset.left = left;
          offset.right = right;
          return $timeout(function() {
            ulW = $element.width();
            windowW = $(window).width();
            if (Math.abs(translatePos) + windowW > ulW) {
              translatePos = -(ulW - windowW + offset.left + offset.right);
              return scroll();
            }
          }, 10);
        });
        $swipe.bind($element, {
          start: swipeStart,
          move: swipeMove,
          end: swipeEnd
        });
        return scroll();
      };
    }
  };
});

//# sourceMappingURL=gk-horizontal-scroll.js.map

angular.module('site').directive('gkInputForm', function($location) {
  return {
    link: function(scope, element, attrs) {
      return console.log('gkInputForm');
    }
  };
});

//# sourceMappingURL=gk-input-form.js.map

angular.module('site').directive('gkMaxHeightBlock', function($rootScope, $timeout) {
  return {
    link: function(scope, element, attrs) {
      $timeout(function() {
        return element.css({
          'max-height': $(window).height() - $('.group-btn').outerHeight() - 120 - $('#header').innerHeight()
        });
      }, 1500);
    }
  };
});

//# sourceMappingURL=gk-max-height-block.js.map

angular.module('site').directive('gkMaxHeight', function($rootScope) {
  return {
    link: function(scope, element, attrs) {
      var liList;
      liList = $('li', element);
      return $rootScope.$on('pane-show-in', function() {
        var elementH;
        elementH = $(element).height() - 54;
        return liList.css('height', elementH + 'px');
      });
    }
  };
});

//# sourceMappingURL=gk-max-height.js.map

'use strict';
angular.module('site').directive('ngMeta', function() {
  return {
    link: function(scope, element) {
      var androidKitkat, androidVersion, content, gteIOS7, iOSversion, ios7, ios70, ios71, ios8, isAndroid, isIOS, ltAndroidKitkat, ltIOS7, tagHTML, userAgent, verIOS;
      iOSversion = function() {
        var v;
        if (/iP(hone|ad)/.test(navigator.platform)) {
          v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
          return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
      };
      userAgent = navigator.userAgent.toLowerCase();
      isAndroid = userAgent.indexOf('android') > -1;
      androidVersion = parseFloat(userAgent.slice(userAgent.indexOf('android') + 8));
      isIOS = navigator.userAgent.match(/(iPad|iPhone)/g);
      tagHTML = document.getElementsByTagName('html')[0];
      androidKitkat = false;
      ltAndroidKitkat = false;
      gteIOS7 = false;
      ltIOS7 = false;
      ios7 = false;
      ios70 = false;
      ios71 = false;
      ios8 = false;
      verIOS = iOSversion();
      if (isAndroid || isIOS) {
        tagHTML.classList.add('mobile');
      }
      if (verIOS) {
        if (verIOS[0] >= 7) {
          gteIOS7 = true;
          tagHTML.classList.add('gte-ios-7');
        }
        if (verIOS[0] >= 7 && verIOS[0] < 8) {
          ios7 = true;
          tagHTML.classList.add('ios-7');
        }
        if (verIOS[0] === 7 && verIOS[1] === 0) {
          ios70 = true;
          tagHTML.classList.add('ios-7-0');
        }
        if (verIOS[0] === 7 && verIOS[1] >= 1) {
          ios71 = true;
          tagHTML.classList.add('ios-7-1');
        }
        if (verIOS[0] >= 8) {
          ios8 = true;
          tagHTML.classList.add('ios-8');
        }
        if (verIOS[0] < 7) {
          ltIOS7 = true;
          tagHTML.classList.add('lt-ios-7');
        }
      }
      if (isAndroid) {
        tagHTML.classList.add('android');
      }
      if (androidVersion >= 4.4) {
        androidKitkat = true;
        tagHTML.classList.add('android-kitkat');
      }
      if (androidVersion < 4.4) {
        ltAndroidKitkat = true;
        tagHTML.classList.add('lt-android-kitkat');
      }
      console.log('ngMeta');
      if (typeof device === 'undefined') {
        return;
      }
      console.log(device.platform + '|' + device.model + '|' + device.name + '|' + device.version);
      content = '';
      if (device.platform === 'iOS') {
        content = 'user-scalable=no, initial-scale=1, maximum-scale=0.5, minimum-scale=0.5, width=device-width';
      } else if (device.platform === 'Android') {
        console.log('device.platform: ' + device.platform);
        content = 'initial-scale=1, maximum-scale=0.55, minimum-scale=0.55, width=device-width, height=device-height, target-densitydpi=device-dpi';
      }
      return element.attr('content', content);
    }
  };
});

//# sourceMappingURL=gk-meta.js.map

angular.module('site').directive('gkMotivationGalleryLanding', function($location, $rootScope) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs, ngModel) {
      return $(function() {
        var btnDetails, scienceBlock;
        scienceBlock = $('.block-science').hide();
        btnDetails = $element.find('.science-link');
        return btnDetails.click(function() {
          var currentOffer, iFrame, motivaBlock, urlYoutube, videoContainer;
          currentOffer = $(this).parentsUntil('.motivation-gallery').find(scienceBlock);
          if (currentOffer.css('display') !== 'none') {
            currentOffer.slideUp('fast');
          } else {
            scienceBlock.slideUp('fast');
            motivaBlock = $(this).parents('.motivation-block');
            videoContainer = motivaBlock.find('.video-container');
            urlYoutube = videoContainer.data('video');
            iFrame = videoContainer.find('iframe');
            if (iFrame.attr('src') === '') {
              iFrame.attr('src', urlYoutube);
            }
            $(this).parentsUntil('.motivation-gallery').find(scienceBlock).slideDown('fast');
          }
        });
      });
    }
  };
});

//# sourceMappingURL=gk-motivation-gallery-landing.js.map

angular.module('site').directive('gkMotivationGallery', function($location, $rootScope) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs, ngModel) {
      return $(function() {
        $rootScope.$on('on-repeat-last', function() {
          var btnDetails, scienceBlock;
          scienceBlock = $('.block-science').hide();
          btnDetails = $element.find('.science-link');
          return btnDetails.click(function() {
            var currentOffer, iFrame, motivaBlock, urlYoutube, videoContainer;
            currentOffer = $(this).parentsUntil('.motivation-gallery').find(scienceBlock);
            if (currentOffer.css('display') !== 'none') {
              currentOffer.slideUp('fast');
            } else {
              scienceBlock.slideUp('fast');
              motivaBlock = $(this).parents('.motivation-block');
              videoContainer = motivaBlock.find('.video-container');
              urlYoutube = videoContainer.data('video');
              iFrame = videoContainer.find('iframe');
              if (iFrame.attr('src') === '') {
                iFrame.attr('src', urlYoutube);
              }
              $(this).parentsUntil('.motivation-gallery').find(scienceBlock).slideDown('fast');
            }
          });
        });
      });
    }
  };
});

//# sourceMappingURL=gk-motivation-gallery.js.map

angular.module('site').directive('gkNationalSelector', function($location, $timeout, $rootScope) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var initSelector;
      $rootScope.$on('on-repeat-last', function() {
        return initSelector();
      });
      initSelector = function() {
        var model, selectElm, setValue, spanElm, valueToText;
        selectElm = $element.children('select');
        spanElm = $element.children('span');
        valueToText = function(val) {
          return $('[value="' + val + '"]', $element).html();
        };
        setValue = function() {
          var text;
          selectElm.val(ngModel.$modelValue);
          text = valueToText(ngModel.$modelValue);
          if (text != null) {
            return spanElm.html(text);
          }
        };
        $timeout(setValue, 10);
        model = $($element).attr('ng-model');
        $scope.$watch(model, function() {
          return setValue();
        });
        selectElm.bind('change', function() {
          var val;
          val = $(this).val();
          spanElm.html($('option:selected', this).html());
          ngModel.$setViewValue(val);
          return $scope.$apply();
        });
        return setValue();
      };
      return initSelector();
    }
  };
});

//# sourceMappingURL=gk-national-selector.js.map

angular.module('site').directive('gkNotification', function($location, $rootScope, $timeout) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var model, notiClose;
      notiClose = function() {
        ngModel.$setViewValue(false);
        $scope.$apply();
        $element.addClass('hidden');
        $('#inner').removeClass('show-popup');
        if ($attrs.leadBack != null) {
          return $location.path($attrs.leadBack);
        }
      };
      model = $($element).attr('ng-model');
      return $scope.$watch(model, function() {
        if (ngModel.$modelValue === true) {
          $element.removeClass('hidden');
          $('#inner').addClass('show-popup');
          return $timeout(function() {
            return notiClose();
          }, $attrs.timeout || 3000);
        }
      });
    }
  };
});

//# sourceMappingURL=gk-notification.js.map

angular.module('site').directive('gkOnLastRepeat', function($timeout, $rootScope) {
  return function(scope, element, attrs) {
    if (scope.$last) {
      $timeout(function() {
        mconsole.log('on-repeat-last');
        $rootScope.$broadcast('on-repeat-last', element, attrs);
        $rootScope.$broadcast('on-last-repeat', element, attrs);
      }, 1);
    }
  };
});

//# sourceMappingURL=gk-on-last-repeat.js.map

angular.module('site').directive('gkPanelSelector', function($rootScope) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var initDirective;
      $rootScope.$on('on-repeat-last', function() {
        return initDirective();
      });
      initDirective = function() {
        var childs, model, setIndex, value2Index;
        childs = $element.children('li');
        childs.bind('click', function() {
          var t, value;
          t = $(this);
          if (t.hasClass('active')) {
            return;
          }
          childs.removeClass('active');
          t.addClass('active');
          value = t.attr('data-value');
          ngModel.$setViewValue(value);
          $scope.$apply();
          return $rootScope.$emit('gk-panel-changed', value);
        });
        value2Index = function(value) {
          var item, opts, _i, _len;
          opts = $('li', $element);
          for (_i = 0, _len = opts.length; _i < _len; _i++) {
            item = opts[_i];
            if ($(item).attr('data-value') === value) {
              return _i;
            }
          }
        };
        setIndex = function(index) {
          childs.removeClass('active');
          return childs.slice(index, index + 1).addClass('active');
        };
        model = $($element).attr('ng-model');
        return $scope.$watch(model, function() {
          return setIndex(value2Index(ngModel.$modelValue));
        });
      };
      return initDirective();
    }
  };
});

//# sourceMappingURL=gk-panel-selector.js.map

angular.module('site').directive('gkPopup', function($rootScope, $timeout) {
  return {
    scope: {
      onClose: "&",
      ngShow: "="
    },
    link: function(scope, element, attrs) {
      scope.closePopup = function() {
        scope.showPopup = false;
        scope.showMemoPopup = false;
      };
      scope.$watch("ngShow", function(show) {
        $timeout(function() {
          if (show) {
            element.css({
              'top': 0,
              'left': 0
            });
          } else {
            element.css({
              'top': '',
              'left': ''
            });
          }
        });
      });
      element.on('touchmove', function(e) {
        if (element.data('enable-touchmove')) {
          return;
        }
        e.preventDefault();
      });
    }
  };
});

//# sourceMappingURL=gk-popup.js.map

angular.module('site').directive('gkPreventEvent', function($swipe, $rootScope) {
  return {
    link: function(scope, element, attrs) {
      return $swipe.bind(element, {
        start: function() {
          return $rootScope.isHorizontalScrolling = true;
        },
        end: function() {
          return $rootScope.isHorizontalScrolling = false;
        }
      });
    }
  };
});

//# sourceMappingURL=gk-prevent-event.js.map

angular.module('site').directive('gkPreventTouchMove', function($location) {
  return {
    link: function($scope, $element, $attrs) {
      return $element.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  };
});

//# sourceMappingURL=gk-prevent-touch-move.js.map

angular.module('site').directive('gkProgress', function($location) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      return $(function() {
        var iconArrow, iconHandle, model, progressW, range, triangle, updateProgress;
        triangle = 'icon-handle-triangle';
        progressW = 368;
        range = $element.find('.range');
        iconHandle = $element.find('[data-name="icon-handle"]');
        iconArrow = $element.find('.icon-arrow');
        updateProgress = function(status) {
          var delta;
          console.log('status', status, progressW);
          if (status === 0 || status === undefined) {
            range.css('width', status + '%');
            iconArrow.css('left', '-18px');
            iconHandle.css('left', '-30px');
            iconHandle.removeClass(triangle);
            iconHandle.addClass('icon-handle');
            return;
          }
          if (status === 100) {
            console.log('100', progressW);
            range.css('width', status + '%');
            iconArrow.css('left', (progressW - 28) + 'px');
            iconHandle.css('left', (progressW - 42) + 'px');
            iconHandle.removeClass(triangle);
            iconHandle.addClass('icon-handle');
            return;
          }
          delta = Math.round(progressW * status / 100);
          range.css('width', status + '%');
          iconArrow.css('left', (delta - 28) + 'px');
          iconHandle.css('left', (delta - 37) + 'px');
          iconHandle.removeClass('icon-handle');
          iconHandle.addClass(triangle);
        };
        updateProgress(0);
        model = $($element).attr('ng-model');
        return $scope.$watch(model, function() {
          console.log('progress updated: ', ngModel.$modelValue);
          return updateProgress(ngModel.$modelValue);
        });
      });
    }
  };
});

//# sourceMappingURL=gk-progress.js.map

angular.module('site').directive('gkRating', function($location) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      return $(function() {
        var childs, model, setValue;
        childs = $element.children('li');
        setValue = function(value) {
          var item, _i, _len;
          childs.removeClass('active');
          for (_i = 0, _len = childs.length; _i < _len; _i++) {
            item = childs[_i];
            if ($(item).attr('data-value') <= value) {
              $(item).addClass('active');
            }
          }
          return ngModel.$setViewValue(value);
        };
        model = $($element).attr('ng-model');
        $scope.$watch(model, function() {
          return setValue(ngModel.$modelValue);
        });
        return childs.bind('click', function() {
          var value;
          value = $(this).attr('data-value');
          return setValue(value);
        });
      });
    }
  };
});

//# sourceMappingURL=gk-rating.js.map

angular.module('site').directive('gkReasonToQuit', function($location, $timeout, $rootScope) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var model, selectElm, spanElm;
      console.log('gkNationalSelector', ngModel);
      selectElm = $element.children('select');
      spanElm = $element.children('span');
      selectElm.bind('change', function() {
        var val;
        val = $(this).val();
        ngModel.$setViewValue(val);
        return $scope.$apply();
      });
      model = $($element).attr('ng-model');
      return $scope.$watch(model, function() {
        console.log('watch', ngModel.$modelValue);
        return selectElm.val(ngModel.$modelValue);
      });
    }
  };
});

//# sourceMappingURL=gk-reason-to-quit.js.map

angular.module('site').directive('gkRequiredNotification', function($location, $rootScope) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var model;
      model = $($element).attr('ng-model');
      $scope.$watch(model, function() {
        mconsole.log('gkRequiredNotification', ngModel.$modelValue);
        if (ngModel.$modelValue === true) {
          $element.removeClass('hidden');
          return $('#inner').addClass('show-popup');
        }
      });
      return $element.find('[data-hide="data-hide"]').on('click', function() {
        ngModel.$setViewValue(false);
        $scope.$apply();
        mconsole.log(ngModel.$modelValue);
        $element.addClass('hidden');
        return $('#inner').removeClass('show-popup');
      });
    }
  };
});

//# sourceMappingURL=gk-required-notification.js.map

angular.module('site').directive('gkRotateApp', function($location, $timeout, $rootScope) {
  return {
    link: function(scope, element, attrs) {
      var disableRotate, enableRotate;
      enableRotate = function() {
        if (typeof cordova !== 'undefined' && $rootScope.disableRotateStatus) {
          $rootScope.disableRotateStatus = false;
          return cordova.exec((function() {}), (function(error) {
            console.log('Error calling rotate device plugin');
          }), 'SetScreenOrientationPlugin', 'enableRotate', [{}]);
        }
      };
      disableRotate = function() {
        if (typeof cordova !== 'undefined' && !$rootScope.disableRotateStatus) {
          $rootScope.disableRotateStatus = true;
          cordova.exec((function() {}), (function(error) {
            console.log('Error calling rotate device plugin');
          }), 'SetScreenOrientationPlugin', 'disableRotate', [{}]);
        }
      };
      if ($('#main', element).data('rotate')) {
        enableRotate();
        if ($rootScope.disableRotate) {
          disableRotate();
        }
        return $rootScope.$on('intro-has-finished', function(data) {
          return enableRotate();
        });
      } else {
        return disableRotate();
      }
    }
  };
});

//# sourceMappingURL=gk-rotate-app.js.map

angular.module('site').directive('gkSelect', function($location) {
  return {
    link: function(scope, element, attrs) {
      var select, value;
      value = $('span', element);
      select = $('select', element);
      return select.change(function() {
        var val;
        val = $(this).val();
        return value.html(val);
      });
    }
  };
});

//# sourceMappingURL=gk-select.js.map

angular.module('site').directive('gkMultiChoice', function($location) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      return $(function() {
        var childs, model, setIndex, value2Index;
        childs = $element.children('li');
        value2Index = function(value) {
          var item, opts, _i, _len;
          opts = $('li', $element);
          for (_i = 0, _len = opts.length; _i < _len; _i++) {
            item = opts[_i];
            if ($(item).attr('data-value') === value) {
              return _i;
            }
          }
        };
        setIndex = function(index) {
          childs.removeClass('active');
          return childs.slice(index, index + 1).addClass('active');
        };
        model = $($element).attr('ng-model');
        $scope.$watch(model, function() {
          return setIndex(value2Index(ngModel.$modelValue));
        });
        return childs.bind('click', function() {
          var t;
          t = $(this);
          if (t.hasClass('active')) {
            return;
          }
          childs.removeClass('active');
          t.addClass('active');
          return ngModel.$setViewValue(t.attr('data-value'));
        });
      });
    }
  };
});

//# sourceMappingURL=gk-selector-panel.js.map

angular.module('site').directive('gkSendSelector', function($rootScope, Utils) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var initDirective;
      $rootScope.$on('on-repeat-last', function() {
        return initDirective();
      });
      initDirective = function() {
        var childs;
        childs = $element.find('li');
        return childs.bind('click', function() {
          var t, value;
          t = $(this);
          if (t.hasClass('active')) {
            return;
          }
          childs.removeClass('active');
          t.addClass('active');
          value = t.find('a').html();
          ngModel.$setViewValue(value);
          Utils.mainScroll(3000, 800);
          return $scope.$apply();
        });
      };
      return initDirective();
    }
  };
});

//# sourceMappingURL=gk-send-selector.js.map

angular.module('site').directive('gkSidebarLeft', function($location) {
  return {
    link: function($scope, $element, $attrs) {
      var liNavs;
      liNavs = $element.find('li');
      return liNavs.bind('click', function() {
        var elm;
        elm = $(this);
        liNavs.removeClass('active');
        elm.addClass('active');
      });
    }
  };
});

//# sourceMappingURL=gk-sidebar-left.js.map

angular.module('site').directive('gkTab', function($location, $rootScope) {
  return {
    link: function(scope, element, attrs) {
      var contentChild, contentTab, navChild, navTab, showContent;
      contentTab = $('.tab-content', element);
      contentChild = contentTab.children('.tab-pane');
      navTab = $('.nav-tabs', element);
      navChild = navTab.children('li');
      showContent = function(index) {
        contentChild.hide();
        contentChild.slice(index, index + 1).show();
        navChild.removeClass('active');
        navChild.slice(index, index + 1).addClass('active');
      };
      if ($rootScope.isTabCheer === 1) {
        $rootScope.isTabCheer = 0;
        showContent(1);
      } else {
        showContent(0);
      }
      return navChild.bind('click', function() {
        var cur;
        cur = $(this);
        console.log(cur);
        if (cur.hasClass('active')) {
          return;
        }
        return showContent(navChild.index(cur));
      });
    }
  };
});

//# sourceMappingURL=gk-tab.js.map

angular.module('site').directive('gkTimeline', function(GigyaService, UserData, $rootScope, $swipe, $compile, $window, $document, $timeout, $location, OverlayService, Utils) {
  return {
    restrict: 'A',
    compile: function($scope, $element, $attrs) {
      return function($scope, $element, $attrs) {
        var AddBadgeBtn, ArrowBtn, CommonData, CurrentBtn, CurrentDate, DayLine, JourneyDesc, Main, ProgressBar, SelectedDate, Swipe, TabNav, TabPane, TabTimeline, Timeline, WeekTimeline, Window, arrowTimelime, badgeReview, btnAddBadge, btnTimeline, childrenOfClock, childrenOfNav, childrenOfSlide, clockBlock, dayLine, documentMouseUpEvent, elementW, filterByDate, hasDDD, hmListener, is3dAvailable, isInJourney, isOverlayAvaiable, journey, journeys, lastPos, m, moveTop, navButtons, offset, paneTabs, progressBar, scroll, startPos, swipeEnd, swipeMove, swipeStart, tabContent, tabTimeline, textCategory, timelineData, timelineLimit, transformProperty, translatePos, ulW, windowW;
        mconsole.log('gkTimeline compile');
        timelineLimit = {};
        $rootScope.timelinePage = {
          tabTimeline: true
        };
        timelineData = {
          oldest: moment(),
          newest: moment()
        };
        journey = {
          started: moment().add('days', -16),
          stopped: moment().add('days', -9)
        };
        m = moment();
        journeys = [
          {
            start: moment().add('days', -80),
            end: moment().add('days', -50)
          }, {
            start: moment().add('days', -40),
            end: moment().add('days', -25)
          }, {
            start: moment().add('days', -20),
            end: moment().add('days', -12)
          }, {
            start: moment().add('days', -8),
            end: moment()
          }
        ];
        isInJourney = function(date) {
          var item, _i, _len;
          for (_i = 0, _len = journeys.length; _i < _len; _i++) {
            item = journeys[_i];
            if (item.start.format('YYYYMMDD') === date.format('YYYYMMDD')) {
              return 1;
            }
            if (item.end.format('YYYYMMDD') === date.format('YYYYMMDD')) {
              return 2;
            }
            if ((item.start.format('YYYYMMDD') <= date.format('YYYYMMDD')) && (date.format('YYYYMMDD') <= item.end.format('YYYYMMDD'))) {
              return true;
            }
          }
          return false;
        };
        btnAddBadge = $('.add-badge');
        tabTimeline = $('.tabs-timeline');
        arrowTimelime = tabTimeline.find('.arrow-top');
        childrenOfNav = $('.nav-tabs').children();
        navButtons = $('.nav-button');
        childrenOfSlide = $('.slide').children();
        textCategory = $('.text-category');
        tabContent = $('.tab-content');
        paneTabs = $('.tab-pane');
        clockBlock = $('.clock-block');
        childrenOfClock = clockBlock.find('li');
        badgeReview = $('.badge-review');
        btnTimeline = $('.btn-timeline');
        dayLine = $('.dayline');
        progressBar = $('.progress-bar');
        moveTop = -1;
        isOverlayAvaiable = false;
        elementW = parseInt($attrs.elementW) || 128;
        offset = {
          left: parseInt($attrs.offsetLeft) || 0,
          right: parseInt($attrs.offsetRight) || 0
        };
        translatePos = 0;
        lastPos = void 0;
        startPos = 0;
        ulW = $('ul', $element).width();
        windowW = $(window).width();
        $rootScope.$on('overlay-started', function() {
          mconsole.log('overlay-started');
          return isOverlayAvaiable = true;
        });
        $rootScope.$on('overlay-has-finished', function() {
          mconsole.log('overlay-has-finished');
          return isOverlayAvaiable = false;
        });
        documentMouseUpEvent = function(event) {
          var swipeMoved;
          swipeMoved = true;
          swipeEnd({
            x: event.clientX,
            y: event.clientY
          }, event);
        };
        transformProperty = 'transform';
        ['webkit', 'Moz', 'O', 'ms'].every(function(prefix) {
          var e;
          e = prefix + 'Transform';
          if (typeof document.body.style[e] !== 'undefined') {
            transformProperty = e;
            return false;
          }
          return true;
        });
        hasDDD = function() {
          var el, has3d, t, transforms;
          el = document.createElement('p');
          has3d = void 0;
          transforms = {
            webkitTransform: '-webkit-transform',
            OTransform: '-o-transform',
            msTransform: '-ms-transform',
            MozTransform: '-moz-transform',
            transform: 'transform'
          };
          document.body.insertBefore(el, null);
          for (t in transforms) {
            if (el.style[t] !== undefined) {
              el.style[t] = 'translate3d(1px,1px,1px)';
              has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
          }
          document.body.removeChild(el);
          return has3d !== undefined && has3d.length > 0 && has3d !== 'none';
        };
        is3dAvailable = hasDDD();
        CommonData = {
          updateElementW: function(w) {
            return elementW = w;
          }
        };
        JourneyDesc = {
          context: $('[data-name="month-out-desc"]'),
          updateLevel1: function() {
            var end, start, text;
            start = DayLine.getCurrentJourney().start;
            end = DayLine.getCurrentJourney().end;
            text = start.format('MMMM Do, YYYY') + ' - ' + end.format('MMMM Do, YYYY');
            return JourneyDesc.context.text(text);
          },
          updateLevel2: function(date) {
            var text;
            date = date || DayLine.getCurrentJourney().start;
            text = date.format('MMMM') + ', ' + date.format('YYYY');
            return JourneyDesc.context.text(text);
          }
        };
        Main = {
          scrollTop: function(top, cback) {
            mconsole.log('Main.scrollTop');
            return $('#main').animate({
              scrollTop: top
            }, 750, cback || null);
          }
        };
        ArrowBtn = {
          context: tabTimeline.find('.arrow-top'),
          moveWithSelectedDate: function() {
            var arrowLeft, t;
            t = dayLine.find('.add-badge.active');
            if (t.length === 0) {
              return;
            }
            arrowLeft = t.offset().left;
            ArrowBtn.context.css('left', (arrowLeft + 64) + 'px');
            return ArrowBtn.updateColor();
          },
          updateColor: function(isReset) {
            mconsole.log('ArrowBtn.updateColor', isReset);
            return $timeout(function() {
              var activeItem, contextLeft, navLeft, navW;
              contextLeft = ArrowBtn.context.offset().left;
              activeItem = TabNav.context.find('.active');
              mconsole.log('ArrowBtn.updateColor()', activeItem);
              if (activeItem.length === 0) {
                ArrowBtn.context.removeClass('arrow-yellow');
                return;
              }
              navLeft = activeItem.offset().left;
              navW = activeItem.width();
              if (navLeft <= contextLeft && contextLeft <= (navLeft + navW)) {
                return ArrowBtn.context.addClass('arrow-yellow');
              } else {
                return ArrowBtn.context.removeClass('arrow-yellow');
              }
            }, 20);
          }
        };
        CurrentBtn = {
          context: $('.jump-to'),
          show: function() {
            return CurrentBtn.context.addClass('show');
          },
          hide: function() {
            return CurrentBtn.context.removeClass('show');
          },
          displayNone: function() {
            return CurrentBtn.context.find('.jump-to').css('display', 'none');
          },
          displayBlock: function() {
            return CurrentBtn.context.find('.jump-to').css('display', '');
          },
          updateStatus: function(top) {
            if (top > 140) {
              return CurrentBtn.displayNone();
            } else {
              return CurrentBtn.displayBlock();
            }
          },
          "do": function() {
            CurrentDate.scrollTo();
            $timeout(function() {
              return TabTimeline.updateStatus();
            }, 310);
            CurrentBtn.hide();
          },
          update: function() {
            if (CurrentDate.isAvailable() === false) {
              return CurrentBtn.show();
            } else {
              return CurrentBtn.hide();
            }
          }
        };
        CurrentDate = {
          context: $('.dayline').find('.current-date'),
          isAvailable: function() {
            var offsetLeft, t;
            t = dayLine.find('.current-date');
            if (t.length === 0) {
              return false;
            }
            offsetLeft = t.position().left;
            if (offsetLeft < 0 || offsetLeft >= windowW) {
              return false;
            }
            return true;
          },
          scrollTo: function() {
            var center, numberOfElement, t;
            t = dayLine.find('.current-date');
            if (t.length === 0) {
              return;
            }
            numberOfElement = t.parent().children('.past-date').length;
            center = Math.round(windowW / elementW / 2 - 1);
            translatePos = -(numberOfElement - center) * elementW;
            return scroll();
          },
          addOnClick: function() {}
        };
        SelectedDate = {
          numberOfLeft: function() {
            var t;
            t = $('.dayline').find('.add-badge.active').parent();
            return t.prevAll().length + 1;
          },
          isAvailable: function() {
            var t;
            t = $('.dayline').find('.add-badge.active');
            if (t.length > 0) {
              return true;
            }
            return false;
          },
          isOnScreen: function() {
            var curLeft, t;
            t = dayLine.find('.add-badge.active');
            if (t.length === 0) {
              return;
            }
            curLeft = t.offset().left;
            if (curLeft < 0 || curLeft >= windowW) {
              return false;
            } else {
              return true;
            }
          }
        };
        TabNav = {
          context: $('.nav-tabs'),
          activeItem: function() {
            return TabNav.context.children('.active');
          },
          clicked: function() {
            var child, typeOfPane;
            child = $(this);
            typeOfPane = child.attr('data-type');
            childrenOfNav.removeClass('active');
            $(this).addClass('active');
            textCategory.css('display', 'none');
            tabContent.css('display', 'block');
            paneTabs.css('display', 'none');
            $('.' + typeOfPane).css('display', 'block');
            $rootScope.$broadcast('pane-show-in');
            return ArrowBtn.updateColor();
          },
          init: function() {}
        };
        TabTimeline = {
          context: $('.tabs-timeline'),
          show: function() {
            return TabTimeline.context.css('min-height', '860px');
          },
          hide: function() {
            return TabTimeline.context.css('min-height', '');
          },
          updateTop: function(top) {
            return TabTimeline.context.css('top', '-890px');
          },
          resetContent: function() {
            $rootScope.personalChallenges.data = null;
            return mconsole.log('resetContent', $rootScope.personalChallenges);
          },
          updateStatus: function() {
            mconsole.log('TabTimeline.updateStatus');
            if (SelectedDate.isOnScreen()) {
              ArrowBtn.moveWithSelectedDate();
              $rootScope.timelinePage.tabTimeline = true;
            } else {
              $rootScope.timelinePage.tabTimeline = false;
            }
            mconsole.log('TabTimeline.updateStatus', $rootScope.timelinePage);
          }
        };
        TabPane = {
          context: $('.tab-pane'),
          updateW: function(w) {
            $('.tab-pane', '#hammer').css('width', w + 'px');
            return TabPane.updateChildrenW(w - 50);
          },
          updateChildrenW: function(w) {
            var ulList, width;
            width = Math.round(w / 3);
            ulList = $('.tab-pane').find('ul');
            ulList.each(function(index, item) {
              var liList;
              liList = $(item).find('li');
              $(item).css('width', (width * liList.length) + 'px');
              return liList.css('width', width + 'px');
            });
            return $timeout(function() {
              return $rootScope.$broadcast('properties_changed', width, 25, 25);
            }, 10);
          }
        };
        $scope.selectChallengeCategory = function(category) {
          mconsole.log('selectChallengeCategory', category);
          TabPane.updateW($(window).width());
          return ArrowBtn.updateColor();
        };
        WeekTimeline = {
          context: $('.week-timeline'),
          updateW: function(w) {
            return WeekTimeline.context.css('width', w + 'px');
          },
          init: function() {
            return $('[gk-timeline="gk-timeline"]').on('webKitTransitionEnd transitionend', function(event) {
              var path;
              ArrowBtn.moveWithSelectedDate();
              TabTimeline.updateStatus();
              path = $location.path();
              if (OverlayService.isShowed(path)) {
                if ($scope.jquerySelected != null) {
                  $timeout(function() {
                    $scope.jquerySelected.find('.add-badge').trigger('click');
                    return $scope.jquerySelected = null;
                  }, 150);
                }
              }
              CurrentBtn.update();
              return JourneyDesc.updateLevel1();
            });
          }
        };
        ProgressBar = {
          context: $('.progress-bar'),
          update: function(newW, oldW) {
            var items;
            items = $('.progress-bar').children();
            items.each(function(index) {
              var left, width;
              left = parseInt($(this).css('left'));
              width = parseInt($(this).css('width'));
              $(this).css('left', ((left / oldW) * newW) + 'px');
              return $(this).css('width', ((width / oldW) * newW) + 'px');
            });
            return ProgressBar.context.css('width', ulW + 'px');
          },
          addCurrentProgress: function(index, length) {
            var left, range, width;
            left = index * elementW;
            width = length * elementW - elementW / 2;
            range = $('<div class="range"><span class="arrow-range"></span><span class="shadow-range"></span></div>');
            range.css('left', left + 'px');
            range.css('width', width + 'px');
            return ProgressBar.context.append(range);
          },
          addRange: function() {
            var left, range, width;
            left = 0;
            width = elementW;
            range = $('<div class="range-past"></div>');
            range.css('left', left + 'px');
            range.css('width', width + 'px');
            return ProgressBar.context.append(range);
          },
          updatePosition: function(length) {
            var move;
            move = elementW * (length || 1);
            progressBar.find('.range').css('left', '+=' + move + 'px');
            return progressBar.find('.range-past').css('left', '+=' + move + 'px');
          },
          addCurrentJourney: function(journey) {
            var end, start;
            start = DayLine.getLeft(journey.start);
            end = DayLine.getLeft(journey.end);
            return ProgressBar.addCurrentProgress(start, end - start + 1);
          }
        };
        Timeline = {
          init: function() {
            DayLine.init();
            WeekTimeline.init();
            CurrentBtn.context.bind('click', CurrentBtn["do"]);
            TabNav.init();
            Window.resize();
            $(window).on('orientationchange', function() {
              if ($rootScope.isOverlayShowing) {
                return;
              }
              return Window.resize();
            });
            if (!window.isWebView()) {
              $(window).on('resize', Window.resize);
            }
            return $timeout(function() {
              return $('#main').bind('scroll', function() {
                var top;
                mconsole.log('#main is scrolling');
                top = $('#main').scrollTop();
                return CurrentBtn.updateStatus(top);
              });
            }, 1000);
          }
        };
        Swipe = {
          start: function() {
            mconsole.log('Swipe start');
            return $('[gk-timeline="gk-timeline"]').addClass('remove-transition');
          },
          move: function() {
            return mconsole.log('Swipe move');
          },
          end: function() {
            $('[gk-timeline="gk-timeline"]').removeClass('remove-transition');
            CurrentBtn.update();
            TabTimeline.updateStatus();
            return JourneyDesc.updateLevel1();
          }
        };
        Window = {
          updateMinH: function(h) {
            return $('body').css('min-height', h + 'px');
          },
          resize: function() {
            moveTop = -1;
            windowW = $(window).width();
            WeekTimeline.updateW(windowW);
            TabPane.updateW(windowW);
            Window.updateMinH($(window).height());
            DayLine.scrollToSelectedDate();
            DayLine.addRightElement();
            return TabTimeline.updateStatus();
          }
        };
        AddBadgeBtn = {
          clicked: function() {
            return $scope.addPersonalChallenge($(this).parents('li').data("date"));
          }
        };
        DayLine = {
          context: $('.dayline'),
          addFutureItems: function() {
            var i, max, p, restInLeft, _results;
            max = Math.round(windowW / elementW) + 4;
            restInLeft = ulW - windowW - Math.abs(translatePos);
            p = restInLeft / elementW;
            i = p;
            _results = [];
            while (i < max) {
              DayLine.futureItem();
              _results.push(i++);
            }
            return _results;
          },
          addPastItems: function() {
            var i, max, p, restInRight, _results;
            max = Math.round(windowW / elementW) + 4;
            restInRight = Math.abs(translatePos);
            p = restInRight / elementW;
            i = p;
            _results = [];
            while (i < max) {
              DayLine.pastItem();
              _results.push(i++);
            }
            return _results;
          },
          getLeft: function(date) {
            var e;
            e = $('[data-date=' + date.format('YYYYMMDD') + ']', DayLine.context);
            return e.prevAll().length;
          },
          getCurrentJourney: function() {
            var first, firstDate, last, lastDate;
            first = Math.round(Math.abs(translatePos) / elementW);
            last = Math.round(first + windowW / elementW - 1);
            firstDate = $('li:eq(' + first + ')', DayLine.context).attr('data-date');
            lastDate = $('li:eq(' + last + ')', DayLine.context).attr('data-date');
            return {
              start: moment(firstDate, 'YYYYMMDD'),
              end: moment(lastDate, 'YYYYMMDD')
            };
          },
          updateW: function(w) {
            var amountOfElement;
            amountOfElement = DayLine.context.children().length;
            return DayLine.context.css('width', (amountOfElement * elementW) + 'px');
          },
          scrollToDate: function(date) {
            var amountOfLeft, d;
            d = DayLine.context.children('[data-date=' + date.format('YYYYMMDD') + ']');
            amountOfLeft = d.prevAll().length + 1;
            return mconsole.log('scrollToDate', d);
          },
          scrollToSelectedDate: function() {
            var left, restInLeft, t;
            if (SelectedDate.isAvailable()) {
              restInLeft = Math.abs(translatePos) / elementW;
              left = SelectedDate.numberOfLeft();
              gsk.log('scrollToSelectedDate', left);
              t = left - restInLeft;
              gsk.log('t', t);
              if (t > 5) {
                left = left - t + 4;
                translatePos = -left * elementW;
                return scroll();
              }
            }
          },
          scrollFromNav: function(i) {
            var currentDate, ele, idx, numberOfElement;
            mconsole.log('scrollFromNav', i);
            currentDate = CurrentDate.context;
            if (currentDate.length === 0) {
              return;
            }
            numberOfElement = currentDate.parent().children('.past-date').length + (i || 0);
            translatePos = -(numberOfElement - 2) * elementW;
            scroll();
            idx = (i || 0) - 1;
            return ele = idx < 0 ? currentDate.parent().find(".current-date") : currentDate.parent().children().not('.past-date, .current-date').filter(':eq(' + idx + ')');
          },
          toDateModel: function(d) {
            var data;
            data = {
              dayOfWeek: d.format('ddd'),
              dayOfMonth: d.format('D'),
              month: d.format('MMM')
            };
            switch (data.dayOfMonth) {
              case '1':
              case '21':
              case '31':
                data.dateName = data.dayOfMonth + 'st';
                break;
              case '2':
              case '22':
                data.dateName = data.dayOfMonth + 'nd';
                break;
              case '3':
              case '23':
                data.dateName = data.dayOfMonth + 'rd';
                break;
              default:
                data.dateName = data.dayOfMonth + 'th';
            }
            return data;
          },
          updateCurrentItem: function() {
            var current, model;
            m = moment();
            current = DayLine.context.find('.current-date');
            current.attr('data-date', m.format('YYYYMMDD'));
            current.find('.add-badge').on('click', AddBadgeBtn.clicked);
            model = DayLine.toDateModel(m);
            current.find('.dayweek').text(model.dayOfWeek);
            return current.find('.daymonth').text(model.month + ' ' + model.dateName);
          },
          addBadges: function(listBadges, target, date) {
            var badge, badgeList, currentDate, item, _i, _len;
            badgeList = filterByDate(listBadges, date);
            currentDate = moment();
            for (_i = 0, _len = badgeList.length; _i < _len; _i++) {
              item = badgeList[_i];
              if (_i >= 7) {
                break;
              }
              badge = $('<div class="timeline-badge"><img src="' + Utils.getThumbLink(item.imgURL || '') + '"></div>');
              if (item.count <= 0) {
                badge.addClass('gray');
              }
              badge.on('click', {
                badge: item
              }, $scope.badgeDetailOpen);
              target.append(badge);
            }
            return target;
          },
          addBadgesToCurrentDate: function() {
            var current;
            current = DayLine.context.find('.current-date').find('.inner');
            DayLine.addBadges($scope.badges, current, moment());
            return DayLine.addBadges($scope.challenges, current, moment());
          },
          pastItem: function() {
            var data, isJourney, liTag, time;
            time = timelineData.oldest;
            if (time.format('YYYYMMDD') < timelineLimit.start.format('YYYYMMDD')) {
              return;
            }
            timelineData.oldest = timelineData.oldest.add('days', -1);
            data = DayLine.toDateModel(time);
            liTag = $('<li class="past-date"><div class="outer"><div class="inner">' + '<div class="date"><span class="dayweek">' + time.format('ddd') + '</span><span class="daymonth">' + time.format('MMM Do') + '</span></div>' + '<div class="timeline-badge"></div>' + '</div></div></li>');
            liTag.attr('data-date', time.format('YYYYMMDD'));
            DayLine.addBadges(null, liTag.find('.inner'), time);
            DayLine.context.prepend(liTag);
            DayLine.context.css('width', '+=' + elementW + 'px');
            progressBar.width(DayLine.context.width());
            ProgressBar.updatePosition();
            ulW = $('ul', $element).width();
            isJourney = isInJourney(time);
            if (isJourney) {
              ProgressBar.addRange();
              if (isJourney === 1) {
                liTag.addClass('journey-start');
              }
              if (isJourney === 2) {
                liTag.addClass('journey-end');
              }
            }
            translatePos -= elementW;
            return scroll();
          },
          futureItem: function() {
            var data, liTag, time;
            time = timelineData.newest;
            if (time.format('YYYYMMDD') > timelineLimit.end.format('YYYYMMDD')) {
              return;
            }
            timelineData.newest = timelineData.newest.add('days', 1);
            data = DayLine.toDateModel(time);
            liTag = $('<li><div class="outer"><div class="inner">' + '<div class="date"><span class="dayweek">' + time.format('ddd') + '</span><span class="daymonth">' + time.format('MMM Do') + '</span></div>' + '<div class="add-badge"><span class="icon-add"><a href="javascript:void(0);" title="Add badge" class="icon-add-badge">Add badge</a></span></div>' + '</div></div></li>');
            if (time.format('YYYYMMDD') === moment().add('days', 1).format('YYYYMMDD')) {
              liTag.find('.add-badge').attr('data-intro-step', 0);
            }
            liTag.find('.add-badge').on('click', AddBadgeBtn.clicked);
            liTag.attr('data-date', time.format('YYYYMMDD'));
            DayLine.addBadges($scope.challenges, liTag.find('.inner'), time);
            DayLine.context.append(liTag);
            DayLine.context.css('width', '+=' + elementW + 'px');
            progressBar.width(DayLine.context.width());
            return ulW = $('ul', $element).width();
          },
          addBadgeIntoFutureItem: function(image, badgeData) {
            var badge, selected;
            badge = $('<div class="timeline-badge gray"><img src="' + badgeData.thumbPath + '" alt=""></div>');
            badge.on('click', {
              badge: badgeData
            }, $scope.badgeDetailOpen);
            selected = dayLine.find('.add-badge.active').parent().find('div:last');
            return selected.after(badge);
          },
          addRightElement: function() {
            var amount, delta, i;
            delta = windowW - (ulW - Math.abs(translatePos));
            if (delta < 0) {
              return;
            }
            amount = delta / 20 + 7;
            i = 0;
            while (i < amount) {
              DayLine.futureItem();
              i++;
              if (translatePos < 0) {
                return;
              }
            }
          },
          addLeftElement: function() {
            var amount, delta, i, _results;
            if (translatePos < 0) {
              return;
            }
            delta = translatePos / elementW;
            amount = delta + 7;
            i = 0;
            _results = [];
            while (i < amount) {
              DayLine.pastItem();
              _results.push(i++);
            }
            return _results;
          },
          init: function() {
            var i, navData, selected, u, _i, _j, _len, _len1, _ref, _ref1;
            CurrentDate.addOnClick();
            mconsole.log('DayLine init');
            ulW = $('ul', $element).width();
            mconsole.log('ulW', ulW);
            DayLine.addBadgesToCurrentDate();
            DayLine.updateCurrentItem();
            _ref = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              i = _ref[_i];
              DayLine.pastItem();
              if (i === 8) {
                CurrentDate.scrollTo();
              }
            }
            ProgressBar.addCurrentJourney(journeys[journeys.length - 1]);
            _ref1 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              i = _ref1[_j];
              DayLine.futureItem();
              if (i === 8) {
                navData = $rootScope.timelineModel;
                if ((navData != null) && (navData.selectedDate != null)) {
                  DayLine.scrollFromNav($rootScope.timelineModel.selectedDate);
                  mconsole.log(CurrentDate.context);
                  selected = CurrentDate.context;
                  u = 0;
                  while (u < navData.selectedDate) {
                    selected = selected.next();
                    u++;
                  }
                  $scope.jquerySelected = selected;
                  $rootScope.timelineModel = null;
                } else {
                  CurrentDate.scrollTo();
                }
              }
            }
            return $timeout(function() {
              var top;
              mconsole.log('timelineModel', $rootScope.timelineModel);
              if ($rootScope.timelineModel) {
                ArrowBtn.moveWithSelectedDate();
                top = $(".add-badge").offset().top;
                offset = 110;
                if ($('html').hasClass('gte-ios-7')) {
                  offset += 40;
                }
                $rootScope.timelineModel = null;

                /*
                 * If needs to scroll
                 * if (top > offset + 35) and isOverlayAvaiable is false
                if (top > offset + 35) and ($rootScope.isOverlayShowing is false)
                   * Move the timeline accordingly
                  Main.scrollTop(top - offset)
                 */
              }
              return $rootScope.timelineModel = null;
            }, 500);
          }
        };
        scroll = function(opts) {
          var move;
          opts = opts || {};
          if (isNaN(opts.x)) {
            move = translatePos;
          } else {
            move = opts.x;
          }
          if (move > 0) {
            move = 0;
          }
          if (is3dAvailable) {
            $element.context.style[transformProperty] = 'translate3d(' + move + 'px, 0, 0)';
          } else {
            $element.context.style[transformProperty] = 'translate(' + move + 'px, 0)';
          }
        };
        swipeStart = function(coords, event) {
          if ($rootScope.isHorizontalScrolling) {
            return;
          }
          mconsole.log('swipeStart gk-timeline');
          Swipe.start();
          $document.bind('mouseup', documentMouseUpEvent);
          lastPos = coords;
          startPos = coords.x;
          return false;
        };
        swipeMove = function(coords, event) {
          var delta;
          if ($rootScope.isHorizontalScrolling) {
            return;
          }
          mconsole.log('swipeMove gk-timeline');
          delta = coords.x - lastPos.x;
          if (delta <= 0) {
            translatePos -= Math.abs(delta);
          } else {
            translatePos += delta;
          }
          DayLine.addFutureItems();
          DayLine.addPastItems();
          lastPos = coords;
          scroll();
          return false;
        };
        swipeEnd = function(coords, event, forceAnimation) {
          var delta;
          if ($rootScope.isHorizontalScrolling) {
            return;
          }
          mconsole.log('swipeEnd gk-timeline');
          Swipe.end();
          $document.unbind('mouseup', documentMouseUpEvent);
          if (translatePos > offset.left) {
            translatePos = 0;
            scroll();
            return;
          } else {
            if (Math.abs(translatePos) + windowW > ulW) {
              translatePos = -(ulW - windowW + offset.left + offset.right);
              scroll();
              return;
            }
          }
          delta = Math.abs(translatePos) % elementW;
          if (delta > (elementW / 2)) {
            translatePos -= elementW - delta;
          } else {
            translatePos += delta;
          }
          scroll();
        };
        filterByDate = function(arr, date) {
          if (arr == null) {
            arr = $scope.badges;
          }
          return _.filter(arr, function(item) {
            var mdate;
            mdate = moment(item.date, 'YYYY-MM-DD HH:mm:ss');
            return mdate.format('YYYYMMDD') === date.format('YYYYMMDD');
          });
        };
        $rootScope.$$listeners['timeline-data'] = [];
        $rootScope.$on('timeline-data', function(e, data) {
          var endDate, item, j, startDate, _i, _len, _ref;
          mconsole.log('timeline-data', data);
          $scope.badges = data.badges;
          $scope.challenges = data['personal-challenges'];
          $scope.journeys = data.journeys;
          j = [];
          timelineLimit.start = moment();
          _ref = $scope.journeys;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            startDate = moment(item['start-date'], 'YYYY-MM-DD');
            endDate = moment(item['end-date'], 'YYYY-MM-DD');
            j.push({
              start: startDate,
              end: endDate,
              length: 5
            });
            if (startDate.format('YYYYMMDD') < timelineLimit.start.format('YYYYMMDD')) {
              timelineLimit.start = startDate;
            }
          }
          journeys = j;
          timelineLimit.start = moment(timelineLimit.start);
          timelineLimit.start = timelineLimit.start.add('days', -7);
          timelineLimit.end = moment().add('months', 6);
          mconsole.log('timelineLimit', timelineLimit);
          mconsole.log('Timeline.init()');
          return Timeline.init();
        });
        hmListener = Hammer(document.getElementById('hammer'));

        /*
        states = ['normal', 'zoom-month-out', 'zoom-months-out', 'zoom-all-out']
        widthStates = [128, 38, 19, 20]
        initState = ->
          $('html').removeClass 'zoom-out'
          for item in states
            $('html').removeClass item
        initState()
        
        currentState = 0
        $html = $('html')
        pinchOut = ->
          mconsole.log 'pinch-out'
          return if currentState <= 0
          currentState--
          if currentState is 0
            $html.removeClass 'zoom-out'
          $html.removeClass states[currentState+1]
          $html.addClass states[currentState]
        pinchIn = ->
          mconsole.log 'pinch-in'
          return if currentState >= (states.length - 1)
          currentState++
          if currentState is 1
            $html.addClass 'zoom-out'
          $html.removeClass states[currentState-1]
          $html.addClass states[currentState]
        
        zoomToLevel1 = ->
          while currentState > 0
             * currentState--
            pinchOut()
            elementW = widthStates[currentState]
            ulW = DayLine.context.children().length * elementW
            DayLine.context.css 'width', ulW + 'px'
            ProgressBar.update(elementW, widthStates[currentState+1])
        
          CurrentDate.scrollTo()
        
        if !window.isWebView()
          hmListener.on 'tap', (event) ->
            return if currentState <= 0
            pinchOut()
            elementW = widthStates[currentState]
            ulW = DayLine.context.children().length * elementW
            DayLine.context.css 'width', ulW + 'px'
        
            ProgressBar.update(elementW, widthStates[currentState+1])
            CurrentDate.scrollTo()
             *removed latter
            JourneyDesc.updateLevel1()
            return
          hmListener.on 'press', (event) ->
            return if currentState >= (states.length - 1)
            pinchIn()
            elementW = widthStates[currentState]
            ulW = DayLine.context.children().length * elementW
            DayLine.context.css 'width', ulW + 'px'
        
            ProgressBar.update(elementW, widthStates[currentState-1])
            CurrentDate.scrollTo()
            DayLine.addRightElement()
            mconsole.log 'addLeftElement'
            DayLine.addLeftElement()
            mconsole.log 'press translatePos', translatePos
             *removed latter
            JourneyDesc.updateLevel1()
            return
         */
        hmListener.on('panstart', function(event) {
          swipeStart(event.center, 'panstart');
        });
        hmListener.on('panmove', function(event) {
          swipeMove(event.center, 'panmove');
        });
        hmListener.on('panend', function(event) {
          swipeEnd(event.center, 'panend', null);
        });
        $scope.addPersonalChallenge = function(date) {
          var arrowLeft, current, top;
          mconsole.log('addPersonalChallenge');
          $rootScope.timelinePage.tabTimeline = true;
          $scope.selectedDate = moment(date, 'YYYYMMDD');
          current = $("#dayline li[data-date='" + date + "'] .add-badge");
          ArrowBtn.updateColor();
          if (moveTop < 0) {
            moveTop = current.offset().top;
            top = moveTop;
          } else {
            top = moveTop;
          }
          mconsole.log('current.offset', current.offset(), top);
          if ($('a', current).length === 0) {
            return;
          }
          if (!(current.hasClass('active'))) {
            mconsole.log('dont has .add-badge');
            arrowLeft = current.offset().left;
            arrowTimelime.css('left', (arrowLeft + 64) + 'px');
            $('.add-badge').removeClass('active');
            current.addClass('active');
            TabTimeline.updateTop(WeekTimeline.context.height() - 318);
            DayLine.context.addClass('hide-badges');
            offset = 110;
            if ($('html').hasClass('gte-ios-7')) {
              offset += 40;
            }
            if ((top > offset + 35) && ($rootScope.isOverlayShowing === false)) {
              mconsole.log('scroll at timeline');
              Main.scrollTop(top - offset);
            }
            return $rootScope.personalChallenges.data = {};
          } else {
            mconsole.log('has .add-badge');
            $rootScope.personalChallenges.data = null;
            current.removeClass('active');
            DayLine.context.removeClass('hide-badges');
            return Main.scrollTop(0, TabTimeline.resetContent);
          }
        };
        $scope.createChallenge = function() {
          var badge, image;
          mconsole.log('$scope.createChallenge at timeline');
          image = $rootScope.personalChallenges.data.badge.thumbPath;
          badge = $rootScope.personalChallenges.data.badge;
          DayLine.addBadgeIntoFutureItem(image, badge);
          $scope.$emit('create-a-challenge', $scope.selectedDate);
          Main.scrollTop(0, TabTimeline.resetContent);
        };
        $scope.badgeDetailOpen = function(event) {
          mconsole.log('badge clicked', event.data.badge);
          $rootScope.currentBadge = event.data.badge;
          $rootScope.$apply();
          $('[data-name="badge-detail-popup"]').removeClass('hidden');
        };
        return $scope.badgeDetailClose = function() {
          mconsole.log('badgeDetailClose');
          $('[data-name="badge-detail-popup"]').addClass('hidden');
        };
      };
    }
  };
});

//# sourceMappingURL=gk-timeline.js.map

angular.module('site').directive('gkWriteMemo', function($rootScope, $timeout, localStorageService, Device, Settings) {
  return {
    link: function(scope, element, attrs) {
      var buttonSubmit, formMemo, messageMemo;
      scope.$watch("ngShow", function(show) {
        return scope.closePopup = function() {
          scope.showPopup = false;
          scope.showMemoPopup = false;
        };
      });
      formMemo = element.parents('#form-memo');
      messageMemo = $('textarea', formMemo);
      buttonSubmit = $('button', formMemo);
      messageMemo.keyup(function() {
        if (messageMemo.val().trim().length > 0) {
          buttonSubmit.addClass('active');
        } else {
          buttonSubmit.removeClass('active');
        }
      });
      buttonSubmit.unbind('click.WriteMemo').bind('click.WriteMemo', function() {
        if (messageMemo.val().trim().length > 0) {
          Device.alert(Settings.message.reasonToQuitMemo, null, 'Message', 'Done');
          scope.showPopup = false;
          scope.showMemoPopup = false;
          return buttonSubmit.removeClass('active');
        }
      });
    }
  };
});

//# sourceMappingURL=gk-write-memo.js.map

angular.module('site').directive('gkYourCoupons', function($location, $rootScope) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs, ngModel) {
      var init;
      $rootScope.$on('on-repeat-last', function() {
        console.log('on-repeat-last gkYourCoupons');
        return init();
      });
      init = function() {
        var backHomepage, bottomButton, btnDetails, emailCoupons, offer, ul;
        offer = '.offer-details';
        ul = $element.find('ul');
        emailCoupons = $element.find('.btn-email-coupons');
        backHomepage = $element.find('.btn-back-homepage');
        btnDetails = $element.find('.btn-details');
        bottomButton = function(btn) {
          if (btn === 'email') {
            backHomepage.css('display', 'none');
            return emailCoupons.css('display', '');
          } else {
            emailCoupons.css('display', 'none');
            return backHomepage.css('display', '');
          }
        };
        return btnDetails.click(function() {
          var currentOffer;
          console.log('btnDetails click');
          currentOffer = $(this).parentsUntil('ul').find(offer);
          if (currentOffer.css('display') !== 'none') {
            currentOffer.slideUp('fast');
            bottomButton('email');
          } else {
            $(offer).slideUp('fast');
            $(this).parentsUntil('ul').find(offer).slideDown('fast');
            bottomButton('homepage');
          }
        });
      };
      return init();
    }
  };
});

//# sourceMappingURL=gk-your-coupons.js.map

angular.module('site').directive('gkYourQuitpoint', function(CONSTANTS, $location) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      var point;
      point = parseInt($attrs.progress);
      if (point < CONSTANTS.REDEEM_POINT) {
        $element.removeClass('enough-points');
        return $element.addClass('not-enough-points');
      } else {
        $element.removeClass('not-enough-points');
        return $element.addClass('enough-points');
      }
    }
  };
});

//# sourceMappingURL=gk-your-quitpoint.js.map

'use strict';
var API_PATH, gskStart, initPreloadImageAvatar, initPreloadImageBadge, initPreloadImageFirst, initPreloadImageSmilesCheer, initSplashScreenOnDevice, onBrowserReady, onDeviceReady, peelAnimation, percentLoading, preloadImage, pushErrorHandler, pushSuccessHandler, pushTokenHandler, registerPushNotification, splashScreenHasFinished, splashScreenStep;

API_PATH = 'http://quitapp-publish-test.gsk.sutrix.com/content/';

percentLoading = $('#percent-loading');

splashScreenHasFinished = function() {
  var e;
  e = document.createEvent('HTMLEvents');
  console.log('splash-screen-has-finished');
  e.initEvent('splash-screen-has-finished', true, true);
  document.dispatchEvent(e);
};

peelAnimation = function() {
  var peelBlock;
  console.log('peelAnimation');
  $('input').blur();
  peelBlock = $('.peel-block');
  peelBlock.addClass('show');
  return setTimeout(function() {
    peelBlock.addClass('animation').on('webkitAnimationEnd animationend', function(event) {
      $(this).removeClass('animation show');
      splashScreenHasFinished();
    });
  }, 1000);
};

preloadImage = function(imgList, onLoading, callback) {
  var doLoad, imgsNum, loadImg, loaded;
  if (!$.isArray(imgList)) {
    imgList = [imgList];
  }
  imgsNum = imgList.length;
  if (!imgsNum || imgsNum <= 0) {
    (callback || $.noop)();
    return;
  }
  loaded = 0;
  loadImg = function() {
    loaded++;
    onLoading(Math.round(loaded / imgsNum * 100));
    if (loaded === imgsNum) {
      (callback || $.noop)();
    } else {
      doLoad(loaded);
    }
  };
  doLoad = function(idx) {
    var newImg;
    newImg = new Image();
    newImg.onload = newImg.onerror = function() {
      loadImg();
    };
    newImg.src = imgList[idx];
  };
  onLoading = onLoading || $.noop;
  doLoad(0);
};

initPreloadImageFirst = function(callback) {
  console.log('images loading');
  preloadImage(['images/upload/quit-team/face-6.png', 'images/upload/quit-team/flag-large.png', 'images/upload/all-motivation.png', 'images/badge-landing.png', 'images/icon-camera.png', 'images/splashscreen.png'], (function(percent) {
    percentLoading.text(percent + '%');
  }), function() {
    setTimeout(callback, 1000);
  });
};

initPreloadImageAvatar = function(callback) {
  console.log('images loading avatar');
  preloadImage([API_PATH + 'dam/napp/avatar/avatar-alien.png', API_PATH + 'dam/napp/avatar/avatar-astronaut.png', API_PATH + 'dam/napp/avatar/avatar-aviator.png', API_PATH + 'dam/napp/avatar/avatar-bumblebee.png', API_PATH + 'dam/napp/avatar/avatar-capboy.png', API_PATH + 'dam/napp/avatar/avatar-catwoman.png', API_PATH + 'dam/napp/avatar/avatar-chef.png', API_PATH + 'dam/napp/avatar/avatar-cutegirl.png', API_PATH + 'dam/napp/avatar/avatar-dinosaur.png', API_PATH + 'dam/napp/avatar/avatar-freckledman.png', API_PATH + 'dam/napp/avatar/avatar-googleglassboy.png', API_PATH + 'dam/napp/avatar/avatar-grandma.png', API_PATH + 'dam/napp/avatar/avatar-hipsterboy.png', API_PATH + 'dam/napp/avatar/avatar-hipstergirl.png', API_PATH + 'dam/napp/avatar/avatar-horserider.png', API_PATH + 'dam/napp/avatar/avatar-joker.png', API_PATH + 'dam/napp/avatar/avatar-monster.png', API_PATH + 'dam/napp/avatar/avatar-nurse.png', API_PATH + 'dam/napp/avatar/avatar-panda.png', API_PATH + 'dam/napp/avatar/avatar-scubaboy.png', API_PATH + 'dam/napp/avatar/avatar-superhero.png', API_PATH + 'dam/napp/avatar/avatar-tropicalgirl.png', API_PATH + 'dam/napp/avatar/avatar-workingoutboy.png', API_PATH + 'dam/napp/avatar/avatar-workingoutgirl.png', API_PATH + 'dam/napp/avatar/avatar-zombie.png', API_PATH + 'dam/napp/avatar-profile/avatar-alien.png', API_PATH + 'dam/napp/avatar-profile/avatar-astronaut.png', API_PATH + 'dam/napp/avatar-profile/avatar-aviator.png', API_PATH + 'dam/napp/avatar-profile/avatar-bumblebee.png', API_PATH + 'dam/napp/avatar-profile/avatar-capboy.png', API_PATH + 'dam/napp/avatar-profile/avatar-catwoman.png', API_PATH + 'dam/napp/avatar-profile/avatar-chef.png', API_PATH + 'dam/napp/avatar-profile/avatar-cutegirl.png', API_PATH + 'dam/napp/avatar-profile/avatar-dinosaur.png', API_PATH + 'dam/napp/avatar-profile/avatar-freckledman.png', API_PATH + 'dam/napp/avatar-profile/avatar-googleglassboy.png', API_PATH + 'dam/napp/avatar-profile/avatar-grandma.png', API_PATH + 'dam/napp/avatar-profile/avatar-hipsterboy.png', API_PATH + 'dam/napp/avatar-profile/avatar-hipstergirl.png', API_PATH + 'dam/napp/avatar-profile/avatar-horserider.png', API_PATH + 'dam/napp/avatar-profile/avatar-joker.png', API_PATH + 'dam/napp/avatar-profile/avatar-monster.png', API_PATH + 'dam/napp/avatar-profile/avatar-nurse.png', API_PATH + 'dam/napp/avatar-profile/avatar-panda.png', API_PATH + 'dam/napp/avatar-profile/avatar-scubaboy.png', API_PATH + 'dam/napp/avatar-profile/avatar-superhero.png', API_PATH + 'dam/napp/avatar-profile/avatar-tropicalgirl.png', API_PATH + 'dam/napp/avatar-profile/avatar-workingoutboy.png', API_PATH + 'dam/napp/avatar-profile/avatar-workingoutgirl.png', API_PATH + 'dam/napp/avatar-profile/avatar-zombie.png'], (function(percent) {}), function() {
    setTimeout(callback, 1000);
  });
};

initPreloadImageBadge = function(callback) {
  console.log('images loading badge');
  preloadImage([API_PATH + 'dam/napp/badges/badge-1hour.png', API_PATH + 'dam/napp/badges/badge-2hour.png', API_PATH + 'dam/napp/badges/badge-3hour.png', API_PATH + 'dam/napp/badges/badge-6hour.png', API_PATH + 'dam/napp/badges/badge-18hour.png', API_PATH + 'dam/napp/badges/badge-24hour.png', API_PATH + 'dam/napp/badges/badge-30hour.png', API_PATH + 'dam/napp/badges/badge-36hour.png', API_PATH + 'dam/napp/badges/badge-2day.png', API_PATH + 'dam/napp/badges/badge-3day.png', API_PATH + 'dam/napp/badges/badge-4day.png', API_PATH + 'dam/napp/badges/badge-5day.png', API_PATH + 'dam/napp/badges/badge-6day.png', API_PATH + 'dam/napp/badges/badge-7day.png', API_PATH + 'dam/napp/badges/badge-10day.png', API_PATH + 'dam/napp/badges/badge-14day.png', API_PATH + 'dam/napp/badges/badge-3week.png', API_PATH + 'dam/napp/badges/badge-air.png', API_PATH + 'dam/napp/badges/badge-bar.png', API_PATH + 'dam/napp/badges/badge-blood.png', API_PATH + 'dam/napp/badges/badge-blue.png', API_PATH + 'dam/napp/badges/badge-bonfire.png', API_PATH + 'dam/napp/badges/badge-boxingday.png', API_PATH + 'dam/napp/badges/badge-chirstmasday.png', API_PATH + 'dam/napp/badges/badge-chirstmaseve.png', API_PATH + 'dam/napp/badges/badge-cleaning.png', API_PATH + 'dam/napp/badges/badge-concert.png', API_PATH + 'dam/napp/badges/badge-deadline.png', API_PATH + 'dam/napp/badges/badge-dineout.png', API_PATH + 'dam/napp/badges/badge-driving.png', API_PATH + 'dam/napp/badges/badge-firstgoalseeker.png', API_PATH + 'dam/napp/badges/badge-firstinformation.png', API_PATH + 'dam/napp/badges/badge-first-journey.png', API_PATH + 'dam/napp/badges/badge-firstreason.png', API_PATH + 'dam/napp/badges/badge-firstteam.png', API_PATH + 'dam/napp/badges/badge-goingout.png', API_PATH + 'dam/napp/badges/badge-halloween.png', API_PATH + 'dam/napp/badges/badge-heart.png', API_PATH + 'dam/napp/badges/badge-holiday.png', API_PATH + 'dam/napp/badges/badge-homealone.png', API_PATH + 'dam/napp/badges/badge-movienight.png', API_PATH + 'dam/napp/badges/badge-nail.png', API_PATH + 'dam/napp/badges/badge-new-year.png', API_PATH + 'dam/napp/badges/badge-newyear-eve.png', API_PATH + 'dam/napp/badges/badge-no-smoking.png', API_PATH + 'dam/napp/badges/badge-nottinghill.png', API_PATH + 'dam/napp/badges/badge-noworldtabaccoday.png', API_PATH + 'dam/napp/badges/badge-orage.png', API_PATH + 'dam/napp/badges/badge-party.png', API_PATH + 'dam/napp/badges/badge-presentation.png', API_PATH + 'dam/napp/badges/badge-promise.png', API_PATH + 'dam/napp/badges/badge-secretweapon.png', API_PATH + 'dam/napp/badges/badge-shine.png', API_PATH + 'dam/napp/badges/badge-slip.png', API_PATH + 'dam/napp/badges/badge-sport.png', API_PATH + 'dam/napp/badges/badge-springbank.png', API_PATH + 'dam/napp/badges/badge-standrews.png', API_PATH + 'dam/napp/badges/badge-stayingin.png', API_PATH + 'dam/napp/badges/badge-stpatricksday.png', API_PATH + 'dam/napp/badges/badge-strawberry.png', API_PATH + 'dam/napp/badges/badge-stressfulday.png', API_PATH + 'dam/napp/badges/badge-summer.png', API_PATH + 'dam/napp/badges/badge-travelling.png', API_PATH + 'dam/napp/badges/badge-umbrella.png', API_PATH + 'dam/napp/badges/badge-valentines.png', API_PATH + 'dam/napp/badges/badge-working-event.png', API_PATH + 'dam/napp/badges/badge-working-late.png', API_PATH + 'dam/napp/badges/badge-1hour-thumb.png', API_PATH + 'dam/napp/badges/badge-2hour-thumb.png', API_PATH + 'dam/napp/badges/badge-3hour-thumb.png', API_PATH + 'dam/napp/badges/badge-6hour-thumb.png', API_PATH + 'dam/napp/badges/badge-18hour-thumb.png', API_PATH + 'dam/napp/badges/badge-24hour-thumb.png', API_PATH + 'dam/napp/badges/badge-30hour-thumb.png', API_PATH + 'dam/napp/badges/badge-36hour-thumb.png', API_PATH + 'dam/napp/badges/badge-2day-thumb.png', API_PATH + 'dam/napp/badges/badge-3day-thumb.png', API_PATH + 'dam/napp/badges/badge-4day-thumb.png', API_PATH + 'dam/napp/badges/badge-5day-thumb.png', API_PATH + 'dam/napp/badges/badge-6day-thumb.png', API_PATH + 'dam/napp/badges/badge-7day-thumb.png', API_PATH + 'dam/napp/badges/badge-10day-thumb.png', API_PATH + 'dam/napp/badges/badge-14day-thumb.png', API_PATH + 'dam/napp/badges/badge-3week-thumb.png', API_PATH + 'dam/napp/badges/badge-air-thumb.png', API_PATH + 'dam/napp/badges/badge-bar-thumb.png', API_PATH + 'dam/napp/badges/badge-blood-thumb.png', API_PATH + 'dam/napp/badges/badge-blue-thumb.png', API_PATH + 'dam/napp/badges/badge-bonfire-thumb.png', API_PATH + 'dam/napp/badges/badge-boxingday-thumb.png', API_PATH + 'dam/napp/badges/badge-chirstmasday-thumb.png', API_PATH + 'dam/napp/badges/badge-chirstmaseve-thumb.png', API_PATH + 'dam/napp/badges/badge-cleaning-thumb.png', API_PATH + 'dam/napp/badges/badge-concert-thumb.png', API_PATH + 'dam/napp/badges/badge-deadline-thumb.png', API_PATH + 'dam/napp/badges/badge-dineout-thumb.png', API_PATH + 'dam/napp/badges/badge-driving-thumb.png', API_PATH + 'dam/napp/badges/badge-firstgoalseeker-thumb.png', API_PATH + 'dam/napp/badges/badge-firstinformation-thumb.png', API_PATH + 'dam/napp/badges/badge-first-journey-thumb.png', API_PATH + 'dam/napp/badges/badge-firstreason-thumb.png', API_PATH + 'dam/napp/badges/badge-firstteam-thumb.png', API_PATH + 'dam/napp/badges/badge-goingout-thumb.png', API_PATH + 'dam/napp/badges/badge-halloween-thumb.png', API_PATH + 'dam/napp/badges/badge-heart-thumb.png', API_PATH + 'dam/napp/badges/badge-holiday-thumb.png', API_PATH + 'dam/napp/badges/badge-homealone-thumb.png', API_PATH + 'dam/napp/badges/badge-movienight-thumb.png', API_PATH + 'dam/napp/badges/badge-nail-thumb.png', API_PATH + 'dam/napp/badges/badge-new-year-thumb.png', API_PATH + 'dam/napp/badges/badge-newyear-eve-thumb.png', API_PATH + 'dam/napp/badges/badge-no-smoking-thumb.png', API_PATH + 'dam/napp/badges/badge-nottinghill-thumb.png', API_PATH + 'dam/napp/badges/badge-noworldtabaccoday-thumb.png', API_PATH + 'dam/napp/badges/badge-orage-thumb.png', API_PATH + 'dam/napp/badges/badge-party-thumb.png', API_PATH + 'dam/napp/badges/badge-presentation-thumb.png', API_PATH + 'dam/napp/badges/badge-promise-thumb.png', API_PATH + 'dam/napp/badges/badge-secretweapon-thumb.png', API_PATH + 'dam/napp/badges/badge-shine-thumb.png', API_PATH + 'dam/napp/badges/badge-slip-thumb.png', API_PATH + 'dam/napp/badges/badge-sport-thumb.png', API_PATH + 'dam/napp/badges/badge-springbank-thumb.png', API_PATH + 'dam/napp/badges/badge-standrews-thumb.png', API_PATH + 'dam/napp/badges/badge-stayingin-thumb.png', API_PATH + 'dam/napp/badges/badge-stpatricksday-thumb.png', API_PATH + 'dam/napp/badges/badge-strawberry-thumb.png', API_PATH + 'dam/napp/badges/badge-stressfulday-thumb.png', API_PATH + 'dam/napp/badges/badge-summer-thumb.png', API_PATH + 'dam/napp/badges/badge-travelling-thumb.png', API_PATH + 'dam/napp/badges/badge-umbrella-thumb.png', API_PATH + 'dam/napp/badges/badge-valentines-thumb.png', API_PATH + 'dam/napp/badges/badge-working-event-thumb.png', API_PATH + 'dam/napp/badges/badge-working-late-thumb.png'], (function(percent) {}), function() {
    setTimeout(callback, 1000);
  });
};

initPreloadImageSmilesCheer = function(callback) {
  console.log('images loading quit cheer');
  preloadImage([API_PATH + 'dam/napp/smiles/quit-cheer-1.png', API_PATH + 'dam/napp/smiles/quit-cheer-2.png', API_PATH + 'dam/napp/smiles/quit-cheer-3.png', API_PATH + 'dam/napp/smiles/quit-cheer-4.png', API_PATH + 'dam/napp/smiles/quit-cheer-5.png', API_PATH + 'dam/napp/smiles/quit-cheer-6.png', API_PATH + 'dam/napp/smiles/quit-cheer-7.png', API_PATH + 'dam/napp/smiles/quit-cheer-8.png', API_PATH + 'dam/napp/smiles/quit-cheer-9.png', API_PATH + 'dam/napp/smiles/quit-cheer-10.png', API_PATH + 'dam/napp/smiles/quit-cheer-11.png', API_PATH + 'dam/napp/smiles/quit-cheer-12.png', API_PATH + 'dam/napp/smiles/quit-cheer-13.png', API_PATH + 'dam/napp/smiles/quit-cheer-14.png', API_PATH + 'dam/napp/smiles/quit-cheer-15.png', API_PATH + 'dam/napp/smiles/quit-cheer-16.png', API_PATH + 'dam/napp/smiles/quit-cheer-17.png', API_PATH + 'dam/napp/smiles/quit-cheer-18.png', API_PATH + 'dam/napp/smiles/quit-cheer-19.png', API_PATH + 'dam/napp/smiles/quit-cheer-20.png'], (function(percent) {}), function() {
    setTimeout(callback, 1000);
  });
};

pushSuccessHandler = function(result) {
  alert('result = ' + result);
};

pushTokenHandler = function(result) {
  var tokenResult;
  tokenResult = result.split('/');
  localStorage.setItem('deviceToken', tokenResult[0]);
};

pushErrorHandler = function(error) {
  console.log('error = ' + error);
};

registerPushNotification = function() {
  var pushNotification;
  if (typeof cordova !== 'undefined') {
    pushNotification = window.plugins.pushNotification;
    if (device.platform === 'android' || device.platform === 'Android') {
      return pushNotification.register(pushSuccessHandler, pushErrorHandler, {
        senderID: 'replace_with_sender_id',
        ecb: 'onNotification'
      });
    } else {
      return pushNotification.register(pushTokenHandler, pushErrorHandler, {
        badge: 'true',
        sound: 'true',
        alert: 'true',
        ecb: 'onNotificationAPN'
      });
    }
  }
};

splashScreenStep = function() {
  var loadingBlock, mustAgeBlock, pushBlock, showClass, splashscreen;
  splashscreen = $('.splashscreen');
  mustAgeBlock = $('.must-age-block');
  loadingBlock = $('.loading-block');
  pushBlock = $('.push-block');
  showClass = 'show';
  setTimeout((function() {
    if (localStorage.getItem('mustAge')) {
      loadingBlock.addClass(showClass);
      initPreloadImageFirst(function() {
        console.log('images first loaded / must aged');
        splashscreen.fadeOut();
        splashScreenHasFinished();
        initPreloadImageAvatar(function() {
          console.log('images avatar loaded / must aged');
          return initPreloadImageBadge(function() {
            return console.log('images badge loaded / must aged');
          });
        });
      });
    } else {
      mustAgeBlock.parent().addClass(showClass);
    }
    $('.btn', mustAgeBlock).on('click', function(e) {
      localStorage.setItem('mustAge', true);
      mustAgeBlock.parent().removeClass(showClass);
      loadingBlock.addClass(showClass);
      initPreloadImageFirst(function() {
        console.log('images first loaded 1');
        loadingBlock.removeClass(showClass);
        registerPushNotification();
        splashscreen.fadeOut();
        splashScreenHasFinished();
        initPreloadImageAvatar(function() {
          console.log('images avatar loaded');
          return initPreloadImageBadge(function() {
            return console.log('images badge loaded');
          });
        });
      });
    });
  }), 2000);
  $('#dont-allow-btn').on('click', function(e) {
    localStorage.setItem('dontAllowPushNotification', true);
    splashscreen.fadeOut();
  });
  $('#allow-btn').on('click', function(e) {
    localStorage.setItem('allowPushNotification', true);
    if (typeof cordova !== 'undefined') {
      registerPushNotification();
    }
    splashscreen.fadeOut();
  });
  if (localStorage.getItem('dontAllowPushNotification') || localStorage.getItem('allowPushNotification')) {
    loadingBlock.addClass('show');
    setTimeout(function() {
      splashscreen.fadeOut();
      splashScreenHasFinished();
    }, 2000);
  }
};

initSplashScreenOnDevice = function() {
  setTimeout(function() {
    typeof cordova !== 'undefined' && cordova.exec(function() {
      console.log('Success calling splash screen plugin');
    }, function(error) {
      console.log('Error calling splash screen plugin');
    }, 'SplashScreenPlugin', 'hide', [{}]);
    splashScreenStep();
  }, 2000);
};

onDeviceReady = function() {
  initSplashScreenOnDevice();
  localStorage.setItem('deviceUID', device.uuid);
  localStorage.setItem('deviceOS', device.platform.toUpperCase());
  angular.bootstrap(window.document, ['site']);
  console.log('angular', angular);
};

onBrowserReady = function() {
  angular.bootstrap(window.document, ['site']);
  splashScreenStep();
};

window.isWebView = function() {
  return !(!window.cordova && !window.PhoneGap && !window.phonegap);
};

gskStart = function() {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
    return document.addEventListener('deviceready', onDeviceReady, false);
  } else {
    return onBrowserReady();
  }
};

gskStart();

//# sourceMappingURL=start.js.map

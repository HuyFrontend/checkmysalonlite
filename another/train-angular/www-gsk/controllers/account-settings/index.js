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

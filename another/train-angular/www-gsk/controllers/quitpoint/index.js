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

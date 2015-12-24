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

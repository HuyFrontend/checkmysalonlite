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

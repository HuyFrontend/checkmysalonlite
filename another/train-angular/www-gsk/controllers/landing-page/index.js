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

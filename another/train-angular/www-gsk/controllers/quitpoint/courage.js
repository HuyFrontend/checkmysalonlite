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

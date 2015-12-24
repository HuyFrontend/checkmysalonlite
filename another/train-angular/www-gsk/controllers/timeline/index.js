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

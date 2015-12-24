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

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

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

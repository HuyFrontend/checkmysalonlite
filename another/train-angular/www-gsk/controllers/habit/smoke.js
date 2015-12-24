'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/smoke', {
    controller: 'habitSmokeCtrl',
    templateUrl: 'views/habit/smoke.jade'
  });
}).controller('habitSmokeCtrl', function(OverlayService, $scope, $rootScope, $location, UserData, AccountService, localStorageService, Utils, Settings) {
  var cigarettes, updateButtonStatus;
  console.log('habitSmokeCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.cigarettes = cigarettes = $rootScope.habitModel.cigarettes || null;
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    }
  };
  updateButtonStatus($scope.cigarettes);
  $scope.$watch('cigarettes', function() {
    return updateButtonStatus($scope.cigarettes);
  });
  $scope.next = function() {
    var cigarettesPerDay, redirectTo, userName;
    if (!($scope.cigarettes != null)) {
      return;
    }
    console.log($scope.cigarettes);
    $rootScope.habitModel.cigarettes = $scope.cigarettes;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    $rootScope.objQuestion = _.find($rootScope.answerHabitThird, function(answer) {
      return answer.path === $scope.cigarettes;
    });
    $rootScope.habitModel.cigarettesData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    $rootScope.badge = {
      action: 'action3_habitmapping',
      back: '/products/detail-product'
    };
    $location.path('/quitpoint/courage');
    cigarettesPerDay = Settings.localStorage.name.cigarettesPerDay;
    userName = localStorageService.get('userName');
    localStorageService.set(userName + cigarettesPerDay, $scope.cigarettes);
    return $rootScope.isProductRemind = true;
  };
  $scope.getNextHabit = function(obj) {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    model.type = 'HABIT';
    model['current-path'] = obj['current-path'];
    model['answer-path'] = obj.path;
    AccountService.getNextHabit(model).then(function(data) {
      var popupToHabit;
      Utils.hideLoading();
      console.log('Get last habit success');
      console.log(data);
      localStorageService.set('path-product', data['product-path'][0]);
      localStorageService.set('path-product-reminder', data['product-path'][0]);
      popupToHabit = 'overlay-group-1';
      OverlayService.setShowed(popupToHabit);
    }, function(err) {
      Utils.hideLoading();
      console.log('Get last habit fail');
      console.log(err);
    });
  };
});

//# sourceMappingURL=smoke.js.map

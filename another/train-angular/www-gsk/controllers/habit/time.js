'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/time', {
    controller: 'habitTimeCtrl',
    templateUrl: 'views/habit/time.jade'
  });
}).controller('habitTimeCtrl', function(OverlayService, $scope, $rootScope, $location, UserData, AccountService, localStorageService, Utils) {
  var time, updateButtonStatus;
  console.log('habitTimeCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.time = time = $rootScope.habitModel.time || null;
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    } else {
      return $('a.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.time);
  $scope.$watch('time', function() {
    return updateButtonStatus($scope.time);
  });
  $scope.next = function() {
    var redirectTo;
    if (!($scope.time != null)) {
      return;
    }
    console.log($scope.time);
    $rootScope.habitModel.time = $scope.time;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    $rootScope.objQuestion = _.find($rootScope.answerHabitThird, function(answer) {
      return answer.path === $scope.time;
    });
    $rootScope.habitModel.timeData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    $rootScope.badge = {
      action: 'action3_habitmapping',
      back: '/products/detail-product'
    };
    $location.path('/quitpoint/courage');
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
      console.log('Get next habit success');
      console.log(data);
      localStorageService.set('path-product', data['product-path'][0]);
      localStorageService.set('path-product-reminder', data['product-path'][0]);
      popupToHabit = 'overlay-group-1';
      OverlayService.setShowed(popupToHabit);
    }, function(err) {
      Utils.hideLoading();
      console.log('Get next habit fail');
      console.log(err);
    });
  };
});

//# sourceMappingURL=time.js.map

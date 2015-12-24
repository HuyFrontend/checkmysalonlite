'use strict';
angular.module('site.habit', []).config(function($routeProvider) {
  return $routeProvider.when('/habit', {
    controller: 'habitIndexCtrl',
    templateUrl: 'views/habit/index.jade'
  });
}).controller('habitIndexCtrl', function($scope, $rootScope, $location, Pages, Snapper, AccountService, UserData, Utils) {
  var callFirstHabit, updateButtonStatus, year;
  console.log('habitIndexCtrl');
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.habitIndex.title
  };
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.year = year = $rootScope.habitModel.year || null;
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    } else {
      return $('a.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.year);
  $scope.$watch('year', function() {
    return updateButtonStatus($scope.year);
  });
  $scope.next = function() {
    var redirectTo;
    if (!($scope.year != null)) {
      return;
    }
    console.log($scope.year);
    $rootScope.habitModel.year = $scope.year;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    $rootScope.objQuestion = _.find($rootScope.answerHabit, function(answer) {
      return answer.path === $scope.year;
    });
    $rootScope.habitModel.yearData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    return $location.path('/habit/looking-for');
  };
  callFirstHabit = function() {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    model.type = 'HABIT';
    AccountService.getFirstHabit(model).then(function(data) {
      Utils.hideLoading();
      $scope.firstHabit = data;
      $rootScope.answerHabit = data['answer-list'];
      console.log('Get first habit success');
      console.log(data);
    }, function(err) {
      Utils.hideLoading();
      console.log('Get first habit fail');
      console.log(err);
    });
  };
  callFirstHabit();
  $scope.getNextHabit = function(obj) {
    var model;
    Utils.showLoading();
    model = UserData.addToken({});
    model.type = 'HABIT';
    model['current-path'] = obj['current-path'];
    model['answer-path'] = obj.path;
    AccountService.getNextHabit(model).then(function(data) {
      Utils.hideLoading();
      console.log('Get next habit success');
      console.log(data);
      $rootScope.secondQuestion = data;
      $rootScope.answerHabitTwo = data['answer-list'];
    }, function(err) {
      Utils.hideLoading();
      console.log('Get next habit fail');
      console.log(err);
    });
  };
});

//# sourceMappingURL=index.js.map

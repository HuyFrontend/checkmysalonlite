'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/year', {
    controller: 'habitYearCtrl',
    templateUrl: 'views/habit/year.jade'
  });
}).controller('habitYearCtrl', function($scope, $rootScope, $location, UserData, AccountService) {
  var updateButtonStatus, year;
  console.log('habitYearCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.year = year = $rootScope.habitModel.year || null;
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
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
    $rootScope.objQuestion = _.find($rootScope.answerHabitThird, function(answer) {
      return answer.path === $scope.year;
    });
    $rootScope.habitModel.yearData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    return $location.path('/habit/replace');
  };
  $scope.getNextHabit = function(obj) {
    var model;
    model = UserData.addToken({});
    model.type = 'HABIT';
    model['current-path'] = obj['current-path'];
    model['answer-path'] = obj.path;
    AccountService.getNextHabit(model).then(function(data) {
      console.log('Get next habit success');
      console.log(data);
      $rootScope.fourQuestion = data;
      $rootScope.answerHabitFour = data['answer-list'];
    }, function(err) {
      console.log('Get next habit fail');
      console.log(err);
    });
  };
});

//# sourceMappingURL=year.js.map

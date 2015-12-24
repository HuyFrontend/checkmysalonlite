'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/looking-for', {
    controller: 'habitLookingForCtrl',
    templateUrl: 'views/habit/looking-for.jade'
  });
}).controller('habitLookingForCtrl', function($scope, $rootScope, $location, UserData, AccountService, Utils) {
  var looking, updateButtonStatus;
  console.log('habitLookingForCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.looking = looking = $rootScope.habitModel.looking || null;
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    } else {
      return $('a.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.looking);
  $scope.$watch('looking', function() {
    return updateButtonStatus($scope.looking);
  });
  $scope.next = function() {
    var redirectTo;
    if (!($scope.looking != null)) {
      return;
    }
    console.log($scope.looking);
    $rootScope.habitModel.looking = $scope.looking;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    $rootScope.objQuestion = _.find($rootScope.answerHabitTwo, function(answer) {
      return answer.path === $scope.looking;
    });
    $rootScope.habitModel.lookingData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    if ($rootScope.objQuestion.path === '/content/en_US/habits/habit-2/jcr:content/par/habitmessageanswer') {
      return $location.path('/habit/smoke');
    } else {
      return $location.path('/habit/time');
    }
  };
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
      $rootScope.thirdQuestion = data;
      $rootScope.answerHabitThird = data['answer-list'];
    }, function(err) {
      Utils.hideLoading();
      console.log('Get next habit fail');
      console.log(err);
    });
  };
});

//# sourceMappingURL=looking-for.js.map

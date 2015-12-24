'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/replace', {
    controller: 'habitReplaceCtrl',
    templateUrl: 'views/habit/replace.jade'
  });
}).controller('habitReplaceCtrl', function($scope, $rootScope, $location, UserData, AccountService) {
  var replace, updateButtonStatus;
  console.log('habitReplaceCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.replace = replace = $rootScope.habitModel.replace || null;
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    } else {
      return $('a.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.replace);
  $scope.$watch('replace', function() {
    return updateButtonStatus($scope.replace);
  });
  $scope.next = function() {
    var redirectTo;
    if (!($scope.replace != null)) {
      return;
    }
    console.log($scope.replace);
    $rootScope.habitModel.replace = $scope.replace;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    $rootScope.objQuestion = _.find($rootScope.answerHabitFour, function(answer) {
      return answer.path === $scope.replace;
    });
    $rootScope.habitModel.replaceData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    return $location.path('/habit/reason');
  };
  $scope.getNextHabit = function(obj) {
    var model;
    model = UserData.addToken({});
    model['current-path'] = obj['current-path'];
    model['answer-path'] = obj.path;
    AccountService.getNextHabit(model).then(function(data) {
      console.log('Get next habit success');
      console.log(data);
    }, function(err) {
      console.log('Get next habit fail');
      console.log(err);
    });
  };
});

//# sourceMappingURL=replace.js.map

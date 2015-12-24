'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/replace', {
    controller: 'signupReplaceCtrl',
    templateUrl: 'views/signup/replace.jade'
  });
}).controller('signupReplaceCtrl', function($scope, $rootScope, $location, Utils, UserData, AccountService) {
  var getProductReplace, replace, updateButtonStatus;
  console.log('signupReplaceCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.replace = replace = $rootScope.habitModel.replace || null;
  mconsole.log('replace', $scope.replace);
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
    $rootScope.signUpModel.productChoice = $scope.replace;
    $rootScope.objQuestion = _.find($scope.productList, function(product) {
      return product.path === $scope.replace;
    });
    $rootScope.habitModel.replaceData = $rootScope.objQuestion.content;
    $scope.getNextHabit($rootScope.objQuestion);
    return $location.path('/signup/reason');
  };
  $scope.getNextHabit = function(obj) {
    var model;
    model = {
      'current-path': obj['current-path'],
      'answer-path': obj.path
    };
    $rootScope.signUpModel["list-questions"] = [
      {
        question: obj['current-path'],
        answer: obj.path
      }
    ];
    AccountService.getNextHabitSignUp(model).then(function(data) {
      console.log(data);
    }, function(err) {
      console.log(err);
    });
  };
  getProductReplace = function() {
    var model;
    Utils.showLoading();
    model = null;
    AccountService.getFirstHabitSignUp(model).then(function(data) {
      Utils.hideLoading();
      $scope.questPro = data.question;
      $scope.productList = data['answer-list'];
      mconsole.log('Get first habit success');
      mconsole.log(data);
    }, function(err) {
      Utils.hideLoading();
      mconsole.log('Get first habit fail');
      mconsole.log(err);
    });
  };
  getProductReplace();
});

//# sourceMappingURL=replace.js.map

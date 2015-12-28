'use strict';
angular.module('site.login').config(function($routeProvider) {
  return $routeProvider.when('/login/forgot-pass', {
    controller: 'forgotPassCtrl',
    templateUrl: 'views/login/forgot-pass.jade',
    resolve: resolve
  });
}).controller('forgotPassCtrl', function($scope, $rootScope, $location, Pages, Snapper, AccountService, Device, Utils) {
  var AlertError, checkOtherInfo, err, errList, initModel, isRequesting, isSubmitted, isValid, isValidData, showError, updateStatusOfButton;
  console.log('forgotPassCtrl');
  Snapper.disable();
  $scope.err = err = [];
  $rootScope.header = {
    pageTitle: Pages.forgotPass.title,
    containerClass: ''
  };
  initModel = function() {
    $scope.email = '';
    $scope.securityAnswer = '';
    return $scope.password = '';
  };
  initModel();
  errList = ['password', 'email', 'securityAnswer'];
  isSubmitted = false;
  isValid = {
    password: function() {
      if (($scope.password != null) && Utils.isValidPassword($scope.password)) {
        return true;
      } else {
        return false;
      }
    },
    securityAnswer: function() {
      if ($scope.securityAnswer.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    email: function() {
      if (($scope.email != null) && Utils.isValidEmail($scope.email)) {
        return true;
      } else {
        return false;
      }
    }
  };
  showError = function() {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = errList.length; _i < _len; _i++) {
      item = errList[_i];
      _results.push(err[item] = !isValid[item]());
    }
    return _results;
  };
  checkOtherInfo = function() {
    var item, re, _i, _len;
    re = true;
    for (_i = 0, _len = errList.length; _i < _len; _i++) {
      item = errList[_i];
      re = re && isValid[item]();
    }
    return re;
  };
  isValidData = function() {
    if (checkOtherInfo()) {
      return true;
    } else {
      return false;
    }
  };
  updateStatusOfButton = function() {
    mconsole.log('updateStatusOfButton', $scope['forgotpass'].$valid);
    if (($scope['forgotpass'].$valid && !isSubmitted) || isValidData()) {
      return $('.btn.btn-submit').addClass('active');
    } else {
      return $('.btn.btn-submit').removeClass('active');
    }
  };
  AlertError = {
    password: function() {
      if (isValid.password()) {
        err['password'] = false;
      } else {
        err['password'] = true;
      }
      return updateStatusOfButton();
    },
    securityAnswer: function() {
      if (isValid.securityAnswer()) {
        err['securityAnswer'] = false;
      } else {
        err['securityAnswer'] = true;
      }
      return updateStatusOfButton();
    },
    email: function() {
      if (isValid.email()) {
        err['email'] = false;
      } else {
        err['email'] = true;
      }
      return updateStatusOfButton();
    }
  };
  $scope.$watch('forgotpass.$valid', function() {
    mconsole.log('forgotpass.$valid');
    return updateStatusOfButton();
  });
  $scope.$watch('password', function() {
    if (isSubmitted) {
      return AlertError.password();
    }
  });
  $scope.$watch('email', function() {
    if (isSubmitted) {
      return AlertError.email();
    }
  });
  $scope.$watch('securityAnswer', function() {
    if (isSubmitted) {
      return AlertError.securityAnswer();
    }
  });
  isRequesting = false;
  $scope.submit = function() {
    var model;
    if (!$scope.username) {
      return;
    }
    if (!isRequesting) {
      Utils.showLoading();
      model = {};
      model['user-name'] = $scope.username;
      isRequesting = true;
      return AccountService.forgotPass(model).then(function(data) {
        if ((data.type != null) && data.type === 'ERROR') {
          Device.alert(data.message, null, 'Message', 'Done');
        } else {
          $scope.username = '';
          $scope.notiForgotPass = true;
        }
        isRequesting = false;
        Utils.hideLoading();
      }, function(err) {
        isRequesting = false;
        Device.alert(err.message, null, 'Error', 'Done');
        mconsole.log('forgotpass, fail', err);
        Utils.hideLoading();
      });
    }
  };
  $scope.gotoLogin = function() {
    $location.url('/login/login-2');
  };
});

//# sourceMappingURL=forgot-pass.js.map

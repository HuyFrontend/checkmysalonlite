'use strict';
angular.module('site.signup', []).config(function($routeProvider) {
  return $routeProvider.when('/signup', {
    controller: 'signupIndexCtrl',
    templateUrl: 'views/signup/index.jade',
    resolve: resolve
  });
}).controller('signupIndexCtrl', function($scope, $rootScope, $location, Utils, Pages, Snapper, FacebookService) {
  var AlertError, attr1, attr2, atts0, checkOtherInfo, credential, enableDymamicValidation, err, isSubmitted, isValid, isValid1, updateStatusOfButton, validation;
  mconsole.log('signupIndexCtrl');
  isSubmitted = false;
  Snapper.disable();
  $rootScope.header = {
    pageTitle: Pages.signupIndex.title
  };
  if (typeof $rootScope.signUpModel === 'undefined') {
    $rootScope.signUpModel = {};
  }
  $scope.credential = credential = $rootScope.signUpModel.credential || {};
  $scope.err = err = {};
  if ($rootScope.signUpModel.credential != null) {
    isSubmitted = true;
  }
  atts0 = ['securityQuestion', 'securityAnswer'];
  attr1 = ['confirmPass', 'password', 'fullName', 'email', 'userName'];
  attr2 = ['password', 'fullName', 'email', 'userName'];
  isValid = {
    confirmPass: function() {
      return (credential.confirmPass != null) && (credential.confirmPass === credential.password);
    },
    password: function() {
      return (credential.password != null) && Utils.isValidPassword(credential.password);
    },
    fullName: function() {
      return (credential.fullName != null) && Utils.isValidFullName(credential.fullName);
    },
    userName: function() {
      return (credential.userName != null) && Utils.isValidUserName(credential.userName);
    },
    email: function() {
      return (credential.email != null) && Utils.isValidEmail(credential.email);
    }
  };
  validation = function() {
    var item, _i, _len;
    for (_i = 0, _len = atts0.length; _i < _len; _i++) {
      item = atts0[_i];
      err[item] = $scope['signupform'][item].$invalid;
    }
  };
  enableDymamicValidation = function() {
    var item, watch1, watch2, _i, _j, _len, _len1;
    mconsole.log('enableDymamicValidation');
    watch1 = function(item) {
      return $scope.$watch('signupform.' + item + '.$valid', function() {
        return err[item] = $scope['signupform'][item].$invalid;
      });
    };
    watch2 = function(item) {
      return err[item] = !isValid[item]();
    };
    for (_i = 0, _len = atts0.length; _i < _len; _i++) {
      item = atts0[_i];
      watch1(item);
    }
    for (_j = 0, _len1 = attr2.length; _j < _len1; _j++) {
      item = attr2[_j];
      watch2(item);
    }
  };
  checkOtherInfo = function() {
    var item, re, _i, _len;
    re = true;
    for (_i = 0, _len = attr1.length; _i < _len; _i++) {
      item = attr1[_i];
      re = re && isValid[item]();
    }
    return re;
  };
  isValid1 = function() {
    if ($scope['signupform'].$valid && checkOtherInfo()) {
      return true;
    } else {
      return false;
    }
  };
  updateStatusOfButton = function() {
    if (($scope['signupform'].$valid && !isSubmitted) || isValid1()) {
      return $('.btn.btn-2').addClass('active');
    } else {
      return $('.btn.btn-2').removeClass('active');
    }
  };
  AlertError = {
    confirmPass: function() {
      if (isValid.confirmPass()) {
        err['confirmPass'] = false;
      } else {
        err['confirmPass'] = true;
      }
      return updateStatusOfButton();
    },
    password: function() {
      if (isValid.password()) {
        err['password'] = false;
      } else {
        err['password'] = true;
        AlertError.confirmPass();
      }
      return updateStatusOfButton();
    },
    userName: function() {
      if (isValid.userName()) {
        err['userName'] = false;
      } else {
        err['userName'] = true;
      }
      return updateStatusOfButton();
    },
    fullName: function() {
      if (isValid.fullName()) {
        err['fullName'] = false;
      } else {
        err['fullName'] = true;
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
  $scope.$watch('signupform.$valid', function() {
    mconsole.log('signupform', $scope.signupform);
    return updateStatusOfButton();
  });
  $scope.$watch('credential.confirmPass', function() {
    if (isSubmitted) {
      return AlertError.confirmPass();
    }
  });
  $scope.$watch('credential.password', function() {
    if (isSubmitted) {
      AlertError.password();
      return AlertError.confirmPass();
    }
  });
  $scope.$watch('credential.fullName', function() {
    if (isSubmitted) {
      return AlertError.fullName();
    }
  });
  $scope.$watch('credential.email', function() {
    if (isSubmitted) {
      return AlertError.email();
    }
  });
  $scope.$watch('credential.userName', function() {
    if (isSubmitted) {
      return AlertError.userName();
    }
  });
  $scope.next = function() {
    if (isValid1()) {
      $rootScope.signUpModel.credential = $scope.credential;
      if ($rootScope.leadTo != null) {
        $rootScope.isValidSignupModel = true;
        $location.path($rootScope.leadTo);
        $rootScope.leadTo = null;
      } else {
        $location.path('signup/age');
      }
    } else {
      $scope.isSubmitted = isSubmitted = true;
      enableDymamicValidation();
      if ((isValid.password() && !credential.confirmPass) || ((credential.confirmPass != null) && credential.confirmPass !== credential.password)) {
        err['confirmPass'] = true;
      }
    }
  };
});

//# sourceMappingURL=index.js.map

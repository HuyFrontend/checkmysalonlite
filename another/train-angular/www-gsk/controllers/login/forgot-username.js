'use strict';
angular.module('site.login').config(function($routeProvider) {
  return $routeProvider.when('/login/forgot-username', {
    controller: 'forgotUsernameCtrl',
    templateUrl: 'views/login/forgot-username.jade',
    resolve: resolve
  });
}).controller('forgotUsernameCtrl', function($scope, $rootScope, $location, Pages, Snapper, AccountService, Device, Utils) {
  var err, isRequesting, updateStatusOfButton;
  console.log('forgotUsernameCtrl');
  Snapper.disable();
  $scope.err = err = [];
  $rootScope.header = {
    pageTitle: Pages.forgotUsername.title,
    containerClass: ''
  };
  updateStatusOfButton = function() {
    if (!($scope.forgotUsername != null)) {
      return;
    }
    if ($scope.forgotUsername.$valid && Utils.isValidEmail($scope.email)) {
      return $('.btn.btn-submit').addClass('active');
    } else {
      return $('.btn.btn-submit').removeClass('active');
    }
  };
  $scope.$watch('forgotUsername.$valid', updateStatusOfButton);
  $scope.$watch('email', updateStatusOfButton);
  isRequesting = false;
  return $scope.submit = function() {
    var model;
    mconsole.log('submit');
    if (isRequesting) {
      return;
    }
    model = {
      email: $scope.email,
      name: 'weQuit app'
    };
    if ($scope.forgotUsername.$valid && Utils.isValidEmail($scope.email)) {
      Utils.showLoading();
      isRequesting = true;
      return AccountService.forgotUsername(model).then(function(data) {
        if ((data.type != null) && data.type === 'SUCCESS') {
          $scope.notiForgotPass = true;
        } else {
          Device.alert(data.message, null, 'Error', 'Done');
        }
        Utils.hideLoading();
        return isRequesting = false;
      }, function(err) {
        Utils.hideLoading();
        isRequesting = false;
        return Device.alert('message', null, 'Error', 'Done');
      });
    }
  };
});

//# sourceMappingURL=forgot-username.js.map

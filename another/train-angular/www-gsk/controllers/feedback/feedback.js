'use strict';
angular.module('site.feedback', []).config(function($routeProvider) {
  return $routeProvider.when('/feedback', {
    controller: 'feedbackIndexCtrl',
    templateUrl: 'views/feedback/feedback.jade'
  });
}).controller('feedbackIndexCtrl', function($scope, $rootScope, $location, Utils, Device, Pages, Snapper, FeedbackService, UserData, $timeout) {
  var isRequesting, updateButtonStatus;
  mconsole.log('feedbackIndexCtrl');
  $('#nav-give-feedback').trigger('click');
  Snapper.enable();
  $rootScope.header = {
    pageTitle: Pages.feedbackIndex.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle
  };
  $scope.message = null;
  updateButtonStatus = function(status) {
    if ((status != null) && status.length > 0) {
      return $('.btn.btn-2').addClass('active');
    } else {
      return $('.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.message);
  $scope.$watch('message', function() {
    return updateButtonStatus($scope.message);
  });
  isRequesting = false;
  return $scope.submit = function() {
    var model;
    if (isRequesting) {
      return;
    }
    if (!(($scope.message != null) && $scope.message.length > 0)) {
      return;
    }
    model = UserData.addToken({
      text: $scope.message
    });
    isRequesting = true;
    FeedbackService.give(model).then(function(data) {
      if (data.type === 'SUCCESS') {
        $scope.notiFeedback = true;
      } else {
        Device.alert(data.message || 'Cannot send your feedback right now, please try again latter.', null, 'Error', 'Done');
      }
      return isRequesting = false;
    }, function(err) {
      Device.alert('Cannot connect to server.', null, 'Error', 'Done');
      return isRequesting = false;
    });
  };
});

//# sourceMappingURL=feedback.js.map

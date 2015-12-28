'use strict';
angular.module('site.habit').config(function($routeProvider) {
  return $routeProvider.when('/habit/reason', {
    controller: 'habitReasonCtrl',
    templateUrl: 'views/habit/reason.jade'
  });
}).controller('habitReasonCtrl', function($scope, $rootScope, $location, CameraService, localStorageService) {
  var reason, updateButtonStatus;
  console.log('habitReasonCtrl');
  if (typeof $rootScope.habitModel === 'undefined') {
    $rootScope.habitModel = {};
  }
  $scope.reason = reason = $rootScope.habitModel.reason || $('#message-memo').val() || localStorageService.get('reasonToQuitMemo');
  updateButtonStatus = function(status) {
    if (status != null) {
      return $('a.btn.btn-2').addClass('active');
    } else {
      return $('a.btn.btn-2').removeClass('active');
    }
  };
  updateButtonStatus($scope.reason);
  $scope.$watch('reason', function() {
    return updateButtonStatus($scope.reason);
  });
  $scope.next = function() {
    var redirectTo;
    if (!($scope.reason != null)) {
      return;
    }
    $rootScope.habitModel.reason = $scope.reason;
    localStorageService.set('reasonToQuitMemo', $scope.reason);
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    return $location.path('/habit/yhabit');
  };
  $scope.updateMemo = function() {
    return $scope.reason = $('#message-memo').val() || localStorageService.get('reasonToQuitMemo');
  };
  $scope.mediaPopup = function() {
    $scope.showPopup = true;
  };
  $scope.memoPopup = function() {
    $scope.showMemoPopup = true;
  };
  $scope.getPhotoFromCamera = function() {
    CameraService.takeNewPhoto().then(function(imageData) {
      localStorageService.set('reasonToQuitPhoto', imageData);
      Device.alert(Settings.message.reasonToQuitPhoto, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  $scope.captureVideo = function() {
    CameraService.takeNewVideo().then(function(videoData) {
      localStorageService.set('reasonToQuitVideo', videoData);
      Device.alert(Settings.message.reasonToQuitVideo, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  return $scope.captureAudio = function() {
    CameraService.takeNewAudio().then(function(audioData) {
      localStorageService.set('reasonToQuitAudio', audioData);
      Device.alert(Settings.message.reasonToQuitAudio, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
});

//# sourceMappingURL=reason.js.map

'use strict';
angular.module('site.signup').config(function($routeProvider) {
  return $routeProvider.when('/signup/reason', {
    controller: 'signupReasonCtrl',
    templateUrl: 'views/signup/reason.jade'
  });
}).controller('signupReasonCtrl', function($scope, $rootScope, $location, CameraService, localStorageService, Device, Settings) {
  var messageMemo, reason, updateButtonStatus;
  console.log('signupReasonCtrl');
  if (typeof $rootScope.reasonModel === 'undefined') {
    $rootScope.reasonModel = {};
  }
  messageMemo = $('#message-memo');
  $scope.reason = reason = $rootScope.reasonModel.memo || null;
  mconsole.log('reason', $scope.reason, $rootScope.reasonModel.memo);
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
    $rootScope.reasonModel.memo = $scope.reason;
    if ($rootScope.habitData != null) {
      redirectTo = $rootScope.habitData.redirectTo;
      if (redirectTo != null) {
        $location.path(redirectTo);
        return;
      }
    }
    return $location.path('/signup/character');
  };
  $scope.updateMemo = function() {
    $scope.reason = messageMemo.val();
    $('[data-name="reason-to-quit"]').find('value-reason').html($scope.reason);
    messageMemo.val('');
  };
  $scope.mediaPopup = function() {
    $scope.showPopup = true;
  };
  $scope.memoPopup = function() {
    $scope.showMemoPopup = true;
  };
  $scope.getPhotoFromLibrary = function() {
    CameraService.photoFromLibrary().then(function(imageData) {
      $rootScope.reasonModel.photo = imageData;
      Device.alert(Settings.message.reasonToQuitPhoto, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  $scope.getPhotoFromCamera = function() {
    CameraService.takeNewPhoto().then(function(imageData) {
      $rootScope.reasonModel.photo = imageData;
      Device.alert(Settings.message.reasonToQuitPhoto, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  $scope.getVideoFromLibrary = function() {
    CameraService.videoFromLibrary().then(function(videoData) {
      $rootScope.reasonModel.video = videoData;
      Device.alert(Settings.message.reasonToQuitVideo, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  $scope.captureVideo = function() {
    CameraService.takeNewVideo().then(function(videoData) {
      $rootScope.reasonModel.video = videoData;
      Device.alert(Settings.message.reasonToQuitVideo, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
  $scope.captureAudio = function() {
    CameraService.takeNewAudio().then(function(audioData) {
      $rootScope.reasonModel.audio = audioData;
      Device.alert(Settings.message.reasonToQuitAudio, null, 'Message', 'Done');
    });
    $scope.showPopup = false;
  };
});

//# sourceMappingURL=reason.js.map

"use strict";
angular.module("site").factory("CameraService", function($q, $rootScope, PhonegapCameraService, CONSTANTS, Device, Settings) {
  return {
    photoFromLibrary: function() {
      var defer, onFail, onSuccess;
      onSuccess = function(imageURL) {
        defer.resolve(imageURL);
      };
      onFail = function(message) {
        defer.reject(message);
      };
      defer = $q.defer();
      PhonegapCameraService.photoFromLibrary(onSuccess, onFail);
      return defer.promise;
    },
    videoFromLibrary: function() {
      var defer, onFail, onSuccess;
      onSuccess = function(videoURL) {
        defer.resolve(videoURL);
      };
      onFail = function(message) {
        defer.reject(message);
      };
      defer = $q.defer();
      PhonegapCameraService.videoFromLibrary(onSuccess, onFail);
      return defer.promise;
    },
    takeNewPhoto: function() {
      var defer, onFail, onSuccess;
      onSuccess = function(imageURL) {
        defer.resolve(imageURL);
      };
      onFail = function(message) {
        defer.reject(message);
        console.log(message);
      };
      defer = $q.defer();
      PhonegapCameraService.takeNewPhoto(onSuccess, onFail);
      return defer.promise;
    },
    takeNewVideo: function() {
      var defer, onFail, onSuccess;
      onSuccess = function(videoURL) {
        var i, len, path;
        i = void 0;
        path = void 0;
        len = void 0;
        i = 0;
        len = videoURL.length;
        while (i < len) {
          path = videoURL[i].fullPath;
          defer.resolve(path);
          i += 1;
        }
      };
      onFail = function(message) {
        console.log(message);
        defer.reject(message);
      };
      defer = $q.defer();
      PhonegapCameraService.takeNewVideo(onSuccess, onFail);
      return defer.promise;
    },
    takeNewAudio: function() {
      var defer, onFail, onSuccess;
      onSuccess = function(audioURL) {
        var i, len, path;
        i = void 0;
        path = void 0;
        len = void 0;
        i = 0;
        len = audioURL.length;
        while (i < len) {
          path = audioURL[i].fullPath;
          defer.resolve(path);
          i += 1;
        }
      };
      onFail = function(message) {
        Device.alert(Settings.error.recordAudioPermission, null, Settings.type.audioError, 'Done');
        console.log(message);
        defer.reject(message);
      };
      defer = $q.defer();
      PhonegapCameraService.takeNewAudio(onSuccess, onFail);
      return defer.promise;
    }
  };
});

//# sourceMappingURL=camera-service.js.map

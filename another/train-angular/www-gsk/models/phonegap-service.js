angular.module('site').factory('PhoneGapNetworkService', function(localStorageService) {
  return {
    isInternetAccess: function() {
      var networkState;
      if (window.isWebView()) {
        networkState = navigator.connection.type;
        return window.Connection.NONE !== networkState;
      } else {
        return localStorageService.get('isNetworkAvailable') !== 'false';
      }
    },
    getType: function() {
      var networkState, states;
      states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';
      networkState = navigator.connection.type;
      return states[networkState];
    }
  };
}).factory('PhonegapCameraService', function(CONSTANTS) {
  return {
    photoFromLibrary: function(onSuccess, onError) {
      setTimeout(function() {
        var options;
        options = {
          sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          correctOrientation: true,
          targetWidth: CONSTANTS.PICURE_MAX_WIDTH,
          targetHeight: CONSTANTS.PICURE_MAX_HEIGHT,
          mediaType: navigator.camera.MediaType.PICTURE
        };
        navigator.camera.getPicture(onSuccess, onError, options);
      });
    },
    videoFromLibrary: function(onSuccess, onError) {
      setTimeout(function() {
        var options;
        options = {
          sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
          destinationType: navigator.camera.DestinationType.FILE_URI,
          correctOrientation: true,
          targetWidth: CONSTANTS.PICURE_MAX_WIDTH,
          targetHeight: CONSTANTS.PICURE_MAX_HEIGHT,
          mediaType: navigator.camera.MediaType.VIDEO
        };
        navigator.camera.getPicture(onSuccess, onError, options);
      });
    },
    takeNewPhoto: function(onSuccess, onError) {
      setTimeout(function() {
        var options;
        options = {
          sourceType: navigator.camera.PictureSourceType.CAMERA,
          destinationType: navigator.camera.DestinationType.DATA_URL,
          correctOrientation: true,
          targetWidth: CONSTANTS.PICURE_MAX_WIDTH,
          targetHeight: CONSTANTS.PICURE_MAX_HEIGHT
        };
        navigator.camera.getPicture(onSuccess, onError, options);
      });
    },
    takeNewVideo: function(onSuccess, onError) {
      setTimeout(function() {
        var options;
        options = {
          limit: 1
        };
        navigator.device.capture.captureVideo(onSuccess, onError, options);
      });
    },
    takeNewAudio: function(onSuccess, onError) {
      setTimeout(function() {
        var options;
        options = {
          limit: 1
        };
        navigator.device.capture.captureAudio(onSuccess, onError, options);
      });
    }
  };
}).factory('PhonegapReady', function() {});

//# sourceMappingURL=phonegap-service.js.map

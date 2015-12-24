angular.module('site').directive('gkRotateApp', function($location, $timeout, $rootScope) {
  return {
    link: function(scope, element, attrs) {
      var disableRotate, enableRotate;
      enableRotate = function() {
        if (typeof cordova !== 'undefined' && $rootScope.disableRotateStatus) {
          $rootScope.disableRotateStatus = false;
          return cordova.exec((function() {}), (function(error) {
            console.log('Error calling rotate device plugin');
          }), 'SetScreenOrientationPlugin', 'enableRotate', [{}]);
        }
      };
      disableRotate = function() {
        if (typeof cordova !== 'undefined' && !$rootScope.disableRotateStatus) {
          $rootScope.disableRotateStatus = true;
          cordova.exec((function() {}), (function(error) {
            console.log('Error calling rotate device plugin');
          }), 'SetScreenOrientationPlugin', 'disableRotate', [{}]);
        }
      };
      if ($('#main', element).data('rotate')) {
        enableRotate();
        if ($rootScope.disableRotate) {
          disableRotate();
        }
        return $rootScope.$on('intro-has-finished', function(data) {
          return enableRotate();
        });
      } else {
        return disableRotate();
      }
    }
  };
});

//# sourceMappingURL=gk-rotate-app.js.map

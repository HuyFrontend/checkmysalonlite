"use strict";
angular.module("site").factory("LocalNotificationService", function($rootScope, $route, $location, Settings, localStorageService, Utils) {
  return {
    onClickNotification: function(id) {
      if (typeof cordova === 'undefined') {
        return;
      }
      return window.plugin.notification.local.onclick = function(id) {
        var localValue, loginPage, path;
        loginPage = Settings.localStorage.name.loginPage;
        path = null;
        switch (id) {
          case Settings.notification.startJourney.id:
            path = Settings.notification.startJourney.path;
            localValue = Settings.localStorage.value.openStartJourney;
            break;
          case Settings.notification.recap.id:
            path = Settings.notification.recap.path;
            localValue = Settings.localStorage.value.openMorningRecap;
            break;
          case Settings.notification.reasonToQuit.id:
            path = Settings.notification.reasonToQuit.path;
            localValue = Settings.localStorage.value.openReasonToQuit;
            break;
          case Settings.notification.sundayChallenge.id:
            path = Settings.notification.sundayChallenge.path;
            localValue = Settings.localStorage.value.openSundayChallenge;
            break;
          case Settings.notification.product.id:
            path = Settings.notification.product.path;
        }
        if (path === null) {
          return;
        }
        localStorageService.set(loginPage, localValue);
        if (localStorageService.get('accessToken')) {
          $rootScope.$broadcast('notification-on-click', path);
          return $rootScope.$apply();
        }
      };
    },
    cancelNotification: function(id) {
      console.log('cancel remind ' + id);
      if (typeof cordova === 'undefined') {
        return;
      }
      return window.plugin.notification.local.cancel(id, function() {});
    },
    addNotification: function(id, options) {
      console.log('remind to show notification ' + options.title + ',' + options.id + ' on ' + options.date);
      if (typeof cordova === 'undefined') {
        return;
      }
      return window.plugin.notification.local.add(options);
    },
    reminderTime: 0
  };
});

//# sourceMappingURL=local-notification-service.js.map

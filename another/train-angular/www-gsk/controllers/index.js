'use strict';
var app, resolve;

resolve = {
  delay: function($q, $timeout) {
    var delay;
    console.log('delay');
    delay = $q.defer();
    $timeout(delay.resolve, 350);
    return delay.promise;
  }
};

app = angular.module('site', ['ngAnimate', 'ngRoute', 'ngResource', 'ngSanitize', 'ngTouch', 'pascalprecht.translate', 'angular-carousel', 'LocalStorageModule', 'site.templates', 'site.main', 'site.tour', 'site.signup', 'site.login', 'site.habit', 'site.products', 'site.quitteam', 'site.quitpoint', 'site.accountSettings', 'site.landingPage', 'site.timeline', 'site.feedback', 'site.template', 'site.games', 'site.recap', 'site.help', 'site.reason', 'site.test']);

app.config([
  'localStorageServiceProvider', 'CONSTANTS', function(localStorageServiceProvider, CONSTANTS) {
    return localStorageServiceProvider.setPrefix(CONSTANTS.STORAGE_NAME);
  }
]);

app.config(function($translateProvider) {
  $translateProvider.translations('en', GSK.i18n['en']);
  return $translateProvider.preferredLanguage('en');
});

//# sourceMappingURL=index.js.map

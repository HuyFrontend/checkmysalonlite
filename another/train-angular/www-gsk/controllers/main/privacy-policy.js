'use strict';
angular.module('site.main').config(function($routeProvider) {
  return $routeProvider.when('/privacy-policy', {
    controller: 'privacyPolicyCtrl',
    templateUrl: 'views/template/index.jade'
  });
}).controller('privacyPolicyCtrl', function($rootScope, Utils, Pages, Snapper) {
  mconsole.log('privacyPolicyCtrl', $rootScope.previousPath);
  if (($rootScope.previousPath === '/login') || ($rootScope.previousPath === '/login/login-2')) {
    Snapper.disable();
    return $rootScope.header = {
      pageTitle: Pages.privacyPolicy.title
    };
  } else {
    Snapper.enable();
    return $rootScope.header = {
      pageTitle: Pages.privacyPolicy.title,
      leftIcon: 'icon-menu',
      leftMethod: Snapper.hamburgerToggle
    };
  }
});

//# sourceMappingURL=privacy-policy.js.map

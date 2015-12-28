'use strict';
angular.module('site.main').config(function($routeProvider) {
  return $routeProvider.when('/terms-conditions', {
    controller: 'termsConditionsCtrl',
    templateUrl: 'views/template/index.jade'
  });
}).controller('termsConditionsCtrl', function($rootScope, Utils, Snapper, Pages) {
  console.log('termsConditionsCtrl');
  return $rootScope.header = {
    pageTitle: Pages.termsConditions.title,
    leftIcon: 'icon-menu',
    leftMethod: Snapper.hamburgerToggle
  };
});

//# sourceMappingURL=terms-conditions.js.map

'use strict';
angular.module('site.accountSettings').config(function($routeProvider) {
  return $routeProvider.when('/account-settings/leaving-2', {
    controller: 'accountLeavingTwoCtrl',
    templateUrl: 'views/account-settings/leaving-2.jade'
  });
}).controller('accountLeavingTwoCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('accountLeavingTwoCtrl');
  Snapper.disable();
  return $rootScope.header = {
    pageTitle: Pages.accountLeavingTwo.title,
    containerClass: 'leave-quit-page',
    hideLeftIcon: true
  };
});

//# sourceMappingURL=leaving-2.js.map

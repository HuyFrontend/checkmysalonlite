'use strict';
angular.module('site.accountSettings').config(function($routeProvider) {
  return $routeProvider.when('/account-settings/leaving-3', {
    controller: 'accountLeavingThreeCtrl',
    templateUrl: 'views/account-settings/leaving-3.jade'
  });
}).controller('accountLeavingThreeCtrl', function($scope, $rootScope, Pages, Snapper) {
  console.log('accountLeavingThreeCtrl');
  Snapper.disable();
  return $rootScope.header = {
    pageTitle: Pages.accountLeavingThree.title,
    containerClass: 'leave-quit-page leaving-3-page'
  };
});

//# sourceMappingURL=leaving-3.js.map

'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/thank-donation', {
    controller: 'quitPointThankDonationCtrl',
    templateUrl: 'views/quitpoint/thank-donation.jade'
  });
}).controller('quitPointThankDonationCtrl', function($scope, $rootScope) {
  console.log('quitPointThankDonationCtrl');
  return $rootScope.header = {
    pageTitle: ' '
  };
});

//# sourceMappingURL=thank-donation.js.map

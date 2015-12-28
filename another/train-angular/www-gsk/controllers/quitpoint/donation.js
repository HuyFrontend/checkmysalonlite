'use strict';
angular.module('site.quitpoint').config(function($routeProvider) {
  return $routeProvider.when('/quitpoint/donation', {
    controller: 'quitPointDonationCtrl',
    templateUrl: 'views/quitpoint/donation.jade'
  });
}).controller('quitPointDonationCtrl', function($scope, $rootScope, Pages) {
  mconsole.log('quitPointDonationCtrl');
  $rootScope.header = {
    pageTitle: Pages.quitPointDonation.title
  };
  return $scope.donateClicked = function() {
    return $scope.notiDonation = true;
  };
});

//# sourceMappingURL=donation.js.map

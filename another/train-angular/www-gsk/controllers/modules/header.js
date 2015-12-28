angular.module('site').controller('headerCtrl', function($scope, $rootScope) {
  if (!($rootScope.pageTitle != null)) {
    $rootScope.pageTitle = '';
  }
  console.log($rootScope.pageTitle);
  return $scope.backToHistory = function() {
    return window.history.back();
  };
});

//# sourceMappingURL=header.js.map

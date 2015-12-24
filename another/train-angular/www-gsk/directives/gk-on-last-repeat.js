angular.module('site').directive('gkOnLastRepeat', function($timeout, $rootScope) {
  return function(scope, element, attrs) {
    if (scope.$last) {
      $timeout(function() {
        mconsole.log('on-repeat-last');
        $rootScope.$broadcast('on-repeat-last', element, attrs);
        $rootScope.$broadcast('on-last-repeat', element, attrs);
      }, 1);
    }
  };
});

//# sourceMappingURL=gk-on-last-repeat.js.map

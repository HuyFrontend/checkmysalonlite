angular.module('site').directive('gkPreventEvent', function($swipe, $rootScope) {
  return {
    link: function(scope, element, attrs) {
      return $swipe.bind(element, {
        start: function() {
          return $rootScope.isHorizontalScrolling = true;
        },
        end: function() {
          return $rootScope.isHorizontalScrolling = false;
        }
      });
    }
  };
});

//# sourceMappingURL=gk-prevent-event.js.map

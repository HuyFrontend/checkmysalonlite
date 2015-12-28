angular.module('site').directive('gkPreventTouchMove', function($location) {
  return {
    link: function($scope, $element, $attrs) {
      return $element.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  };
});

//# sourceMappingURL=gk-prevent-touch-move.js.map

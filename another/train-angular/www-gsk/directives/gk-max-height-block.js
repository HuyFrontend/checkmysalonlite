angular.module('site').directive('gkMaxHeightBlock', function($rootScope, $timeout) {
  return {
    link: function(scope, element, attrs) {
      $timeout(function() {
        return element.css({
          'max-height': $(window).height() - $('.group-btn').outerHeight() - 120 - $('#header').innerHeight()
        });
      }, 1500);
    }
  };
});

//# sourceMappingURL=gk-max-height-block.js.map

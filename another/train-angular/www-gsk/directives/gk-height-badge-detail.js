angular.module('site').directive('gkHeightBadgeDetail', function($rootScope, $timeout) {
  return {
    link: function(scope, element, attrs) {
      $timeout(function() {
        return element.css({
          'height': $(window).height() - 130
        });
      }, 400);
    }
  };
});

//# sourceMappingURL=gk-height-badge-detail.js.map

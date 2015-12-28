angular.module('site').directive('gkYourQuitpoint', function(CONSTANTS, $location) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      var point;
      point = parseInt($attrs.progress);
      if (point < CONSTANTS.REDEEM_POINT) {
        $element.removeClass('enough-points');
        return $element.addClass('not-enough-points');
      } else {
        $element.removeClass('not-enough-points');
        return $element.addClass('enough-points');
      }
    }
  };
});

//# sourceMappingURL=gk-your-quitpoint.js.map

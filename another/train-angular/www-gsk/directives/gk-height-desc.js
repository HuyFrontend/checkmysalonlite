angular.module('site').directive('gkHeightDesc', function($location) {
  return {
    link: function($scope, $element, $attrs) {
      var height, windowW;
      windowW = $(window).height();
      height = windowW - 858;
      if ($('html').hasClass('gte-ios-7')) {
        height -= 40;
      }
      return $element.css('height', height + 'px');
    }
  };
});

//# sourceMappingURL=gk-height-desc.js.map

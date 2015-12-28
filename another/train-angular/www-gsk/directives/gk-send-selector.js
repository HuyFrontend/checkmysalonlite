angular.module('site').directive('gkSendSelector', function($rootScope, Utils) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var initDirective;
      $rootScope.$on('on-repeat-last', function() {
        return initDirective();
      });
      initDirective = function() {
        var childs;
        childs = $element.find('li');
        return childs.bind('click', function() {
          var t, value;
          t = $(this);
          if (t.hasClass('active')) {
            return;
          }
          childs.removeClass('active');
          t.addClass('active');
          value = t.find('a').html();
          ngModel.$setViewValue(value);
          Utils.mainScroll(3000, 800);
          return $scope.$apply();
        });
      };
      return initDirective();
    }
  };
});

//# sourceMappingURL=gk-send-selector.js.map

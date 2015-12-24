angular.module('site').directive('gkPanelSelector', function($rootScope) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var initDirective;
      $rootScope.$on('on-repeat-last', function() {
        return initDirective();
      });
      initDirective = function() {
        var childs, model, setIndex, value2Index;
        childs = $element.children('li');
        childs.bind('click', function() {
          var t, value;
          t = $(this);
          if (t.hasClass('active')) {
            return;
          }
          childs.removeClass('active');
          t.addClass('active');
          value = t.attr('data-value');
          ngModel.$setViewValue(value);
          $scope.$apply();
          return $rootScope.$emit('gk-panel-changed', value);
        });
        value2Index = function(value) {
          var item, opts, _i, _len;
          opts = $('li', $element);
          for (_i = 0, _len = opts.length; _i < _len; _i++) {
            item = opts[_i];
            if ($(item).attr('data-value') === value) {
              return _i;
            }
          }
        };
        setIndex = function(index) {
          childs.removeClass('active');
          return childs.slice(index, index + 1).addClass('active');
        };
        model = $($element).attr('ng-model');
        return $scope.$watch(model, function() {
          return setIndex(value2Index(ngModel.$modelValue));
        });
      };
      return initDirective();
    }
  };
});

//# sourceMappingURL=gk-panel-selector.js.map

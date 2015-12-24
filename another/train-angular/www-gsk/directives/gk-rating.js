angular.module('site').directive('gkRating', function($location) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      return $(function() {
        var childs, model, setValue;
        childs = $element.children('li');
        setValue = function(value) {
          var item, _i, _len;
          childs.removeClass('active');
          for (_i = 0, _len = childs.length; _i < _len; _i++) {
            item = childs[_i];
            if ($(item).attr('data-value') <= value) {
              $(item).addClass('active');
            }
          }
          return ngModel.$setViewValue(value);
        };
        model = $($element).attr('ng-model');
        $scope.$watch(model, function() {
          return setValue(ngModel.$modelValue);
        });
        return childs.bind('click', function() {
          var value;
          value = $(this).attr('data-value');
          return setValue(value);
        });
      });
    }
  };
});

//# sourceMappingURL=gk-rating.js.map

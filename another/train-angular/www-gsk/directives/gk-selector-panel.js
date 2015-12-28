angular.module('site').directive('gkMultiChoice', function($location) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      return $(function() {
        var childs, model, setIndex, value2Index;
        childs = $element.children('li');
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
        $scope.$watch(model, function() {
          return setIndex(value2Index(ngModel.$modelValue));
        });
        return childs.bind('click', function() {
          var t;
          t = $(this);
          if (t.hasClass('active')) {
            return;
          }
          childs.removeClass('active');
          t.addClass('active');
          return ngModel.$setViewValue(t.attr('data-value'));
        });
      });
    }
  };
});

//# sourceMappingURL=gk-selector-panel.js.map

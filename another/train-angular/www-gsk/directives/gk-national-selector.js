angular.module('site').directive('gkNationalSelector', function($location, $timeout, $rootScope) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var initSelector;
      $rootScope.$on('on-repeat-last', function() {
        return initSelector();
      });
      initSelector = function() {
        var model, selectElm, setValue, spanElm, valueToText;
        selectElm = $element.children('select');
        spanElm = $element.children('span');
        valueToText = function(val) {
          return $('[value="' + val + '"]', $element).html();
        };
        setValue = function() {
          var text;
          selectElm.val(ngModel.$modelValue);
          text = valueToText(ngModel.$modelValue);
          if (text != null) {
            return spanElm.html(text);
          }
        };
        $timeout(setValue, 10);
        model = $($element).attr('ng-model');
        $scope.$watch(model, function() {
          return setValue();
        });
        selectElm.bind('change', function() {
          var val;
          val = $(this).val();
          spanElm.html($('option:selected', this).html());
          ngModel.$setViewValue(val);
          return $scope.$apply();
        });
        return setValue();
      };
      return initSelector();
    }
  };
});

//# sourceMappingURL=gk-national-selector.js.map

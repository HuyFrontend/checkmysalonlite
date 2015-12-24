angular.module('site').directive('gkReasonToQuit', function($location, $timeout, $rootScope) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var model, selectElm, spanElm;
      console.log('gkNationalSelector', ngModel);
      selectElm = $element.children('select');
      spanElm = $element.children('span');
      selectElm.bind('change', function() {
        var val;
        val = $(this).val();
        ngModel.$setViewValue(val);
        return $scope.$apply();
      });
      model = $($element).attr('ng-model');
      return $scope.$watch(model, function() {
        console.log('watch', ngModel.$modelValue);
        return selectElm.val(ngModel.$modelValue);
      });
    }
  };
});

//# sourceMappingURL=gk-reason-to-quit.js.map

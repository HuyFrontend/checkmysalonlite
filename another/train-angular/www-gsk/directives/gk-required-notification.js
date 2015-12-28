angular.module('site').directive('gkRequiredNotification', function($location, $rootScope) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var model;
      model = $($element).attr('ng-model');
      $scope.$watch(model, function() {
        mconsole.log('gkRequiredNotification', ngModel.$modelValue);
        if (ngModel.$modelValue === true) {
          $element.removeClass('hidden');
          return $('#inner').addClass('show-popup');
        }
      });
      return $element.find('[data-hide="data-hide"]').on('click', function() {
        ngModel.$setViewValue(false);
        $scope.$apply();
        mconsole.log(ngModel.$modelValue);
        $element.addClass('hidden');
        return $('#inner').removeClass('show-popup');
      });
    }
  };
});

//# sourceMappingURL=gk-required-notification.js.map

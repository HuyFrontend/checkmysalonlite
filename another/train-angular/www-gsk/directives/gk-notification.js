angular.module('site').directive('gkNotification', function($location, $rootScope, $timeout) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var model, notiClose;
      notiClose = function() {
        ngModel.$setViewValue(false);
        $scope.$apply();
        $element.addClass('hidden');
        $('#inner').removeClass('show-popup');
        if ($attrs.leadBack != null) {
          return $location.path($attrs.leadBack);
        }
      };
      model = $($element).attr('ng-model');
      return $scope.$watch(model, function() {
        if (ngModel.$modelValue === true) {
          $element.removeClass('hidden');
          $('#inner').addClass('show-popup');
          return $timeout(function() {
            return notiClose();
          }, $attrs.timeout || 3000);
        }
      });
    }
  };
});

//# sourceMappingURL=gk-notification.js.map

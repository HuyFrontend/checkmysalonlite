angular.module('site').directive('gkProgress', function($location) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      return $(function() {
        var iconArrow, iconHandle, model, progressW, range, triangle, updateProgress;
        triangle = 'icon-handle-triangle';
        progressW = 368;
        range = $element.find('.range');
        iconHandle = $element.find('[data-name="icon-handle"]');
        iconArrow = $element.find('.icon-arrow');
        updateProgress = function(status) {
          var delta;
          console.log('status', status, progressW);
          if (status === 0 || status === undefined) {
            range.css('width', status + '%');
            iconArrow.css('left', '-18px');
            iconHandle.css('left', '-30px');
            iconHandle.removeClass(triangle);
            iconHandle.addClass('icon-handle');
            return;
          }
          if (status === 100) {
            console.log('100', progressW);
            range.css('width', status + '%');
            iconArrow.css('left', (progressW - 28) + 'px');
            iconHandle.css('left', (progressW - 42) + 'px');
            iconHandle.removeClass(triangle);
            iconHandle.addClass('icon-handle');
            return;
          }
          delta = Math.round(progressW * status / 100);
          range.css('width', status + '%');
          iconArrow.css('left', (delta - 28) + 'px');
          iconHandle.css('left', (delta - 37) + 'px');
          iconHandle.removeClass('icon-handle');
          iconHandle.addClass(triangle);
        };
        updateProgress(0);
        model = $($element).attr('ng-model');
        return $scope.$watch(model, function() {
          console.log('progress updated: ', ngModel.$modelValue);
          return updateProgress(ngModel.$modelValue);
        });
      });
    }
  };
});

//# sourceMappingURL=gk-progress.js.map

angular.module('site').directive('gkDrumSelector', function($location) {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      return $(function() {
        var addActiveAtIndex, drumChanged, model, opts, value2Index;
        value2Index = function(value) {
          var item, opts, _i, _len;
          opts = $('option', $element);
          for (_i = 0, _len = opts.length; _i < _len; _i++) {
            item = opts[_i];
            if ($(item).attr('value') === value) {
              return _i;
            }
          }
        };
        addActiveAtIndex = function(index) {
          var drumChilds;
          drumChilds = $element.next().find('.drum').children();
          drumChilds.removeClass('active');
          return drumChilds.slice(index, index + 1).addClass('active');
        };
        model = $($element).attr('ng-model');
        $scope.$watch(model, function() {
          var index;
          index = value2Index(ngModel.$modelValue);
          addActiveAtIndex(index);
          return $element.drum('setIndex', index);
        });
        drumChanged = function(elm) {
          var index;
          index = value2Index(elm.value);
          addActiveAtIndex(index);
          return ngModel.$setViewValue(elm.value);
        };
        opts = {
          panelCount: $attrs.panelCount || 16,
          dail_w: $attrs.dailW || 573,
          dail_h: $attrs.dailH || 330,
          dail_stroke_color: $attrs.dailStrokeColor || '#810000',
          dail_stroke_width: $attrs.dailStrokeWidth || 3,
          interactive: $attrs.interactive || false,
          onChange: drumChanged
        };
        $element.drum(opts);
      });
    }
  };
});

//# sourceMappingURL=gk-drum-selector.js.map

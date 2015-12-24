angular.module('site').directive('gkSelect', function($location) {
  return {
    link: function(scope, element, attrs) {
      var select, value;
      value = $('span', element);
      select = $('select', element);
      return select.change(function() {
        var val;
        val = $(this).val();
        return value.html(val);
      });
    }
  };
});

//# sourceMappingURL=gk-select.js.map

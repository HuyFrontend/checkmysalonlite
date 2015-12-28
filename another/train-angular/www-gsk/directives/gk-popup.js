angular.module('site').directive('gkPopup', function($rootScope, $timeout) {
  return {
    scope: {
      onClose: "&",
      ngShow: "="
    },
    link: function(scope, element, attrs) {
      scope.closePopup = function() {
        scope.showPopup = false;
        scope.showMemoPopup = false;
      };
      scope.$watch("ngShow", function(show) {
        $timeout(function() {
          if (show) {
            element.css({
              'top': 0,
              'left': 0
            });
          } else {
            element.css({
              'top': '',
              'left': ''
            });
          }
        });
      });
      element.on('touchmove', function(e) {
        if (element.data('enable-touchmove')) {
          return;
        }
        e.preventDefault();
      });
    }
  };
});

//# sourceMappingURL=gk-popup.js.map

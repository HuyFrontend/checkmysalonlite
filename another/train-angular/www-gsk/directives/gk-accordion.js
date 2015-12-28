angular.module('site').directive('gkAccordion', function($location, $rootScope) {
  return {
    require: '?ngModel',
    link: function($scope, $element, $attrs, ngModel) {
      var childs, headingClicked, model, setPanel;
      childs = $element.children('li');
      setPanel = function(index) {
        var item;
        childs.removeClass('active');
        item = childs.slice(index, index + 1);
        item.addClass('active');
        return $('.content', item).show();
      };
      model = $($element).attr('ng-model');
      $scope.$watch(model, function() {
        return setPanel(ngModel.$modelValue);
      });
      headingClicked = function() {
        var contentOfAll, contentOfCurrent, current;
        current = $(this).parent();
        if (current.hasClass('leave-quit-team' || current.hasClass('logout'))) {
          return;
        }
        contentOfCurrent = $('.content', current);
        contentOfAll = $('.content', childs);
        if (current.hasClass('active')) {
          current.removeClass('active');
          contentOfCurrent.hide();
          return;
        }
        childs.removeClass('active');
        contentOfAll.hide();
        current.addClass('active');
        return contentOfCurrent.show();
      };
      $('.heading', $element).bind('click', headingClicked);
      return $('[data-close-btn="data-close-btn"]').bind('click', function() {
        $(this).closest('.account-item').find('.heading').trigger('click');
      });
    }
  };
});

//# sourceMappingURL=gk-accordion.js.map

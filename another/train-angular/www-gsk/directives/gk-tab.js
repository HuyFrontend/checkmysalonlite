angular.module('site').directive('gkTab', function($location, $rootScope) {
  return {
    link: function(scope, element, attrs) {
      var contentChild, contentTab, navChild, navTab, showContent;
      contentTab = $('.tab-content', element);
      contentChild = contentTab.children('.tab-pane');
      navTab = $('.nav-tabs', element);
      navChild = navTab.children('li');
      showContent = function(index) {
        contentChild.hide();
        contentChild.slice(index, index + 1).show();
        navChild.removeClass('active');
        navChild.slice(index, index + 1).addClass('active');
      };
      if ($rootScope.isTabCheer === 1) {
        $rootScope.isTabCheer = 0;
        showContent(1);
      } else {
        showContent(0);
      }
      return navChild.bind('click', function() {
        var cur;
        cur = $(this);
        console.log(cur);
        if (cur.hasClass('active')) {
          return;
        }
        return showContent(navChild.index(cur));
      });
    }
  };
});

//# sourceMappingURL=gk-tab.js.map

angular.module('site').directive('gkSidebarLeft', function($location) {
  return {
    link: function($scope, $element, $attrs) {
      var liNavs;
      liNavs = $element.find('li');
      return liNavs.bind('click', function() {
        var elm;
        elm = $(this);
        liNavs.removeClass('active');
        elm.addClass('active');
      });
    }
  };
});

//# sourceMappingURL=gk-sidebar-left.js.map

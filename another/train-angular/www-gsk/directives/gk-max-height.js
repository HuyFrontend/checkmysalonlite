angular.module('site').directive('gkMaxHeight', function($rootScope) {
  return {
    link: function(scope, element, attrs) {
      var liList;
      liList = $('li', element);
      return $rootScope.$on('pane-show-in', function() {
        var elementH;
        elementH = $(element).height() - 54;
        return liList.css('height', elementH + 'px');
      });
    }
  };
});

//# sourceMappingURL=gk-max-height.js.map

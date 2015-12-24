;(function(window) {

var app = angular.module('AngularApp', []);

// Define directives here
// app.directive('tab', function() {
//   return {
//     restrict: 'E',
//     transclude: true,
//     template: '<h2>Hello world!</h2> <div role="tabpanel" ng-transclude></div>',
//     scope: {},
//     link: function(scope, elem, attr) {

//     }
//   }
// });
.directive('tab', function() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<h2>Hello world!</h2> <div role="tabpanel" ng-transclude></div>',
    require: '^tabset',
    scope: { },
    link: function(scope, elem, attr, tabsetCtrl) {}
  }
});

app.directive('tabset', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: { },
    // templateUrl: 'tabset.html',
    template: [
      '<div role="tabpanel">',
        '<ul class="nav nav-tabs" role="tablist">',
          '<li role="presentation" ng-repeat="tab in tabset.tabs"><a href="" role="tab" ng-click="tabset.select(tab)">{{tab.heading}}</a> </li>',
        '</ul>',
        '<ng-transclude></ng-transclude>',
      '</div>'
    ].join(''),
    bindToController: true,
    controllerAs: 'tabset',
    controller: function() {
      var self = this
      self.tabs = []
    }
  }
});

})(window);

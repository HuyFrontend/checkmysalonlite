var app = angular.module('AngularApp', []);

// app.directive('welcome', function() {
//   return {
//     restrict: 'E',
//     scope: {},
//     template: '<div>This is the welcome component</div>'
//   }
// });
// or
app.directive('welcome', function() {
  return {
    restrict: 'E',
    scope: {},
    transclude: true,
    // template: '<div>Hello</div><div><ng-transclude></ng-transclude></div>'
     template: '<div>This is the welcome component</div>'
  }
});

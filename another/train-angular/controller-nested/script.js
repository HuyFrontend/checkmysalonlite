var app = angular.module('AngularApp', []);

app.controller('MyProduct', [ '$scope', function ($scope) {
  $scope.label = 'Vo Xuan Huy';
}]);

app.controller('NestedMyProduct', [ '$scope', function ($csope) {
}]);

// app.controller('MyProduct', function ($scope) {
//   $scope.label = 'Vo Xuan Huy';
// });
// app.controller('NestedMyProduct', function ($csope) {
// });

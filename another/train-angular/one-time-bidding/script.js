var app = angular.module('AngularApp', []);

app.controller('EventController', ['$scope', function($scope) {
  var counter = 0;
  var names = ['Igor', 'Misko', 'Chirayu', 'Lucas'];
  $scope.name = 'Huy';
  $scope.clickMe = function(clickEvent) {
    $scope.name = names[counter % names.length];
    counter++;
  };
}]);



var app = angular.module('AngularApp',[]);

app.controller('Ctrl1',function($scope){
  $scope.name = 'Harry';
  $scope.reverseName = function(){
    $scope.name = $scope.name.split('').reverse().join('');
  };
});
// Isolated Scope Explained
app.directive('myDirective', function(){
  return {
    restrict: 'EA',
    scope: {},
    // scope: false,
    //scope: true, // not inherit, isolated scope and parent scope
    template: '<div>Your name is : {{name}}</div>' +
    'Change your name : <input type="text" ng-model="name"/>'
  };
});

/*
in this example
We just created a directive with an isolated scope.
Notice, even the parent scope has a name “Harry”, the textbox inside directive is blank.
This is because of the new Isolated scope doesn’t know anything about its parent scope.
If we dont define 'scope: {}' - init value of input is Harry
*/

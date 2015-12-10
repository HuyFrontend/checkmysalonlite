var app = angular.module('app', []);

app.controller('MainCtrl', function( $scope ){
  $scope.name = 'Harry';
  $scope.color = '#333333';
  $scope.reverseName = function(){
   $scope.name = $scope.name.split('').reverse().join('');
  };
  $scope.randomColor = function(){
      $scope.color = '#'+Math.floor(Math.random()*16777215).toString(16);
  };
});

app.directive('myDirective', function(){
    
  return {
    restrict: 'EA',
    scope: {
      name: '@',
      color: '=',
      reverse: '&'
    },
    template: [
      '<div class="line">',
      'Name : <strong>{{name}}</strong>;  Change name:<input type="text" ng-model="name" /><br/>',
      '</div><div class="line">',
      'Color : <strong style="color:{{color}}">{{color|uppercase}}</strong>;  Change color:<input type="text" ng-model="color" /><br/></div>',
      '<br/><input type="button" ng-click="reverse()" value="Reverse Name"/>'
    ].join('') 
  };
});
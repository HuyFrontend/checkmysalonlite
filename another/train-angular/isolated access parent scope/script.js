var app = angular.module("AngularApp", []);

app.controller("MainCtrl", function( $scope ){
  $scope.name = "Harry";
  $scope.color = "#333333";
  $scope.reverseName = function(){
   $scope.name = $scope.name.split("").reverse().join("");
  };
  $scope.randomColor = function(){
    $scope.color = '#'+Math.floor(Math.random()*16777215).toString(16);
  };
});
/*
1. "@"   (  Text binding / one-way binding ) or name: "@parentName"
2. "="   ( Direct model binding / two-way binding )
3. "&"   ( Behaviour binding / Method binding  )
*/
app.directive("myDirective", function(){
  return {
    restrict: "EAC",
    scope: {
      name: "@",
      // name: "=",
      color: "=",
      reverse: "&"
    },
    template: [
      "<div class='line'>",
      "Name : <strong>{{name}}</strong>;  Change name:<input type='text' ng-model='name' /><br/>",
      "</div><div class='line'>",
      "Color : <strong style='color:{{color}}'>{{color|uppercase}}</strong>;  Change color:<input type='text' ng-model='color' /><br/></div>",
      "<br/><input type='button' ng-click='reverse()' value='Reverse Name'/>"
    ].join("")
  };
});

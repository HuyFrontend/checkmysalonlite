function FunCtrl ($scope) {
  var self = this;
  console.log(self);

  self.start = function() {
    console.log("Fun times have been started!");
  };
  self.click = function () {
    alert('click');
  };
  $scope.click = function () {
    alert('click');
  };
}


var app = angular.module('AngularApp', []);

app.controller('FunCtrl', FunCtrl);

app.directive('entering', function(){
  return function(scope, element, attrs) {
      element.bind('mouseenter', function(){
        scope.fun.start(); // condition : ng-controller="FunCtrl as fun"
        // or scope.$apply('fun.start()');
      });
      element[0].addEventListener('click', function () {
        scope.$apply('fun.click()'); // // condition : ng-controller="FunCtrl as fun"
      });
      //same:
      // element[0].addEventListener('click', function () {
      //   scope.click();
      // });
    }
});

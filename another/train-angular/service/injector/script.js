// function out of angular module
var button = document.querySelector('#button');
button.addEventListener('click', function click () {
  var elemApp = document.querySelector('[ng-app]');
  var elem = angular.element(elemApp);
  var injector = elem.injector();
  var $rootScope = injector.get('$rootScope');
  // $rootScope.$apply(function(){
  //   $rootScope.text = new Date();
  // });
  // or
  $rootScope.text = new Date();
  $rootScope.$digest();
});

var app = angular.module('AngularApp', []);
app.controller('MainCtrl', ['$scope','$rootScope',
  function ($scope, $rootScope) {
    $rootScope.text = 'Click to get time';
  }
]);

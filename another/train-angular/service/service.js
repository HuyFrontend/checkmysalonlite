var app = angular.module('AngularApp', []);

/*app.factory('notify', ['$window', function(win) {
  var msgs = [];
  return function(msg) {
    msgs.push(msg);
    if (msgs.length == 3) {
      win.alert(msgs.join("\n"));
      msgs = [];
    }
  };
}]);*/

// service notify
app.factory('notify', function () {
  var msgs = [];
  return function(msg) {
    msgs.push(msg);
    if (msgs.length === 3) {
      window.alert(msgs.join("\n"));
      msgs = [];
    }
  };
});
// service notify2
app.factory('notify2', function () {
  return function () {
    alert(123);
  };
});
// controller use notify/notify2
app.controller('MyController', ['$scope','notify2', function ($scope, notify2) {
  $scope.callNotify = function(msg) {
    notify2();
  };
}]);

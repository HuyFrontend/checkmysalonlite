/*
app name
*/
var app = angular.module("AngularApp", [
  // require('./my-customer.html').name
]);
'use strict';
/*
controller
*/
app.controller('myNoteCtrl', function ($scope) {
    $scope.message = '';

    $scope.left  = function() {
      return 100 - $scope.message.length;
    };

    $scope.clear = function() {
      $scope.message = '';
    };

    $scope.save  = function() {
      if($scope.message) {
        alert($scope.message);
      }
    };
});

app.controller('validateCtrl', function ($scope) {
  $scope.user = 'xuan huy';
  $scope.email = 'huy.vo@sutrixmedia.com';
});

app.controller('formCtrl', function ($scope) {
  $scope.master = {
    firstName: 'huy', lastName: 'vo'
  };
  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
  };
  $scope.reset();
});

app.controller('customersCtrl', function ($scope, $http) {
  $http.get('http://www.w3schools.com/angular/customers_mysql.php')
  .then( function (response) {
    $scope.names = response.data.records;
  });
});

app.controller('customerCtrl', ['$scope', function ($scope) {
  $scope.customer = {
    name: 'Naomi',
    address: '52 Le Thach'
  };
}]);

/*
directive
*/
app.directive('customerDirective', function() {
  return {
    template: '<p> Name: {{customer.name}} </p>'
      + '<p>Address: {{customer.address}}</p>'
      + 'hello huy'
  };
});

app.directive('myDirect', function() {
  return {
    templateUrl: './my-customer.html'
    // templateUrl: require('my-customer.html')
  };
});

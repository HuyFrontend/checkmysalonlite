(function(angular) {
  
  'use strict';
/*
app name
*/
var app = angular.module('AngularApp', [
  // require('./my-customer.html').name
]);
// 'use strict';
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

app.controller('validateCtrl', function ( $scope ) {
  $scope.user = 'xuan huy';
  $scope.email = 'huy.vo@sutrixmedia.com';
});

app.controller('formCtrl', function ( $scope ) {
  $scope.master = {
    firstName: 'huy', lastName: 'vo'
  };
  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
  };
  $scope.reset();
});

// get data from server
app.controller('customersCtrl', function ( $scope, $http ) {
  $http.get('http://www.w3schools.com/angular/customers_mysql.php')
  .then( function ( response ) {
    $scope.names = response.data.records;
  });
});

app.controller('customerCtrl', ['$scope', function ( $scope ) {
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
      + 'this is customer information'
  };
});

app.directive('myDirect', function() {
  return {
    restrict: 'E',
    templateUrl: 'my-customer.html'
    // templateUrl: require('my-customer.html')
  };
});

// /////////////////////////////////////////////////////////////////////////
// What we want to be able to do is separate the scope inside a directive from the scope outside, 
//and then map the outer scope to a directive's inner scope. We can do this by creating what we call an isolate scope. 
//To do this, we can use a directive's scope option:
app.controller('Controller', ['$scope', function ($scope) {
  $scope.customer1 = { name: 'huy', address: '123 truong dinh dist.3' };
  $scope.customer2 = { name: 'nam', address: '12/241 truong son' };
}]);
app.directive('customerList', function() {
  return {
    restrict: 'ACE',
    scope: {
      customerInfo: '=info'
      // hay dung attr: '=' // in html <div attr="alex"></div>
      // Its name (customerInfo) corresponds to the directive's isolate scope property customerInfo.
      //Its value (=info) tells $compile to bind to the info attribute.
    },
    // templateUrl: 'my-customer-iso.html'
    template: '<p> Name: {{customerInfo.name}} || Address: {{customerInfo.address}} </p><hr>'
  };
});
// and in html
  /*<div ng-app="AngularApp" ng-controller="Controller">
    <customer-list info="customer1"></customer-list>
    <customer-list info="customer2"></customer-list>
  </div>*/
// /////////////////////////////////////////////////////////////////////////

// Creating a Directive that Manipulates the DOM
app.controller('getTimeCtlr', ['$scope', function($scope) {
  $scope.format = 'M/d/yy h:mm:ss a';
}]);
app.directive('myCurrentTime', ['$interval', 'dateFilter', function ($interval, dateFilter) {
  function link(scope, element, attrs) {
    var format,
        timeoutId;
    function updateTime() {
      element.text(dateFilter(new Date(), format));
    }
    scope.$watch(attrs.myCurrentTime, function(value) {
      format = value;
      updateTime();
    });
    element.on('$destroy', function() {
      $interval.cancel(timeoutId);
    });

    // start the UI update process; save the timeoutId for canceling
    timeoutId = $interval(function() {
      updateTime(); // update DOM
    }, 1000);
  }
  return {
    link: link
  };
}]);
// in html
/*<div ng-app="AngularApp" ng-controller="getTimeCtlr">
    Date format: <input ng-model="format"> <hr/>
    Current time is: <span my-current-time="format"></span>
  </div>
*/
// /////////////////////////////////////////////////////////////////////////
app.controller('PersonalCtrl', [ '$scope', function ($scope) {
  $scope.fullname = 'xuan huy';
  $scope.email = 'xuanhuy@mail.com';
  $scope.address = ' 51 le thach, w12';
  $scope.counter = 0;
  $scope.oldValue = '';
  $scope.newValue = '';

  $scope.$watch('fullname', function (newVal, oldVal){
    $scope.counter += 1;
    $scope.oldValue = oldVal;
    $scope.newValue = newVal;
  });

  $scope.resetName = function () {
    $scope.fullname = '';
    $scope.email = '';
  };
  document.querySelector('#reset-address').addEventListener('click', function () {
    // $scope.address = '';
    // or 
    $scope.$apply(function () {
      $scope.address = '';
    });
  });
}
]);

})(window.angular);
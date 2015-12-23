var app = angular.module('AngularApp', []);

/* SERVICES*/

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

// service
// app.factory('customService', function () {
//   return function () {
//     alert(123);
//   };
// });
// or service replace to factory
app.service('customService', function () {
  return function () {
    alert(123);
  };
});

app.service('myFactory', function ($http, $q) {
  var service = {},
      baseUrl = 'https://itunes.apple.com/search?term=',
      artist = '',
      finalUrl = '';
  var makeUrl = function () {
    artist = artist.split(' ').join('+');
    finalUrl = baseUrl + artist + '&callback=JSON_CALLBACK';
    return finalUrl;
  };
  service.setArtist = function(art) {
    artist = art;
  };
  service.getArtist = function (art) {
    return artist;
  };
  service.callItunes = function () {
    makeUrl();
    var deferred = $q.defer();
    $http({
      method: 'JSONP',
      url: finalUrl
    })
    .success(function (data) {
        deferred.resolve(data);
    })
    .error(function (){
      deferred.reject('an error');
    });
    return deferred.promise;
  };
  return service;
});

app.service('getAjax', ['$http', '$q', function ($http , $q) {
  var service = {};
  service.getNames = function () {
    var url = 'http://www.w3schools.com/angular/customers_mysql.php';
    var deferred = $q.defer();
    $http({
      url: url
    }).success (function(res) {
      deferred.resolve(res);
    }).error (function () {
      deferred.reject('error');
    });
    return deferred.promise;
  };
  return service;
}]);

// app.controller('customersCtrl', function ( $scope, $http ) {
//   $http.get('http://www.w3schools.com/angular/customers_mysql.php')
//   .then( function ( response ) {
//     $scope.names = response.data.records;
//   });
// });
/* CONTROLLERS */
// controller use notify/customService
app.controller('MyController', ['$scope','customService', function ($scope, customService) {
  $scope.callNotify = function(msg) {
    customService();
  };
}]);

app.controller('myFactoryCtrl', function ($scope, myFactory) {
  $scope.data = {};
  $scope.updateArtist = function () {
    myFactory.setArtist($scope.data.artist);
  };
  $scope.submitArtist = function () {
    myFactory.callItunes()
    .then(function (data) {
      $scope.data.artistData = data;
    }, function (data) {
      alert(data);
    });
  };
});

app.controller('customersCtrl', function ( $scope, $http, getAjax ) {
  // $scope.names = getAjax.getNames();
  getAjax.getNames()
  .then(function (data) {
    $scope.names = data.records;
  }, function (res) {
    alert(res);
  });
});

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

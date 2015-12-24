var app = angular.module('AngularApp', []);
//1.  co 5 cach tao 1 service
 //    - Sử dụng service() method
 //    - Sử dụng factory () method
 //    - Sử dụng provider() method
 //    - Sử dụng value() method
 //    - Sử dụng constant() method

//2.  co 2 cach khoi tao service, dung $provide va khong dung provide vi du:
app.factory('movie', function () {
  return {
    title: 'The Matrix';
  }
});
// cach 2
app.config(function ($provide) {
  $provide.factory('movie', function () {
    return {
      title: 'The Matrix';
    }
  });
});

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
// app.controller('customersCtrl', function ( $scope, $http ) {
//   $http.get('http://www.w3schools.com/angular/customers_mysql.php')
//   .then( function ( response ) {
//     $scope.names = response.data.records;
//   });
// });
app.controller('postCtrl', function ($scope, $http) {
  $scope.hello = {name: 'Boaz'};
  $scope.newName = '';
  $scope.sendPost = function() {
    var data = $.param({
      json: JSON.stringify({
          name: $scope.newName
      })
    });
    $http.post('/echo/json/', data).success(function(data, status) {
      $scope.hello = data;
    });
    /*$http.post({
      url: '/echo/json/',
      method: 'post',
      headers: {
        'Content-Type': undefined
      },
      data: {
        'name': $scope.name
      }
    }).success(function(data, status) {
      $scope.hello = data;
    });*/
  }
});

app.controller('MovieController', function($scope, $http) {
    var pendingTask;

    if ($scope.search === undefined) {
      $scope.search = "Sherlock Holmes";
      fetch();
    }

    $scope.change = function() {
      if (pendingTask) {
        clearTimeout(pendingTask);
      }
      pendingTask = setTimeout(fetch, 800);
    };

    function fetch() {
      $http.get("http://www.omdbapi.com/?t=" + $scope.search + "&tomatoes=true&plot=full")
        .success(function(response) {
          $scope.details = response;
        });

      $http.get("http://www.omdbapi.com/?s=" + $scope.search)
        .success(function(response) {
          $scope.related = response;
        });
    }

    $scope.update = function(movie) {
      $scope.search = movie.Title;
      $scope.change();
    };

    $scope.select = function() {
      this.setSelectionRange(0, this.value.length);
    }
});

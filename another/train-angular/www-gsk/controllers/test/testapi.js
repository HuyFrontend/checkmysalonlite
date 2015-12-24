"use strict";
angular.module("site.test").config(function($routeProvider) {
  return $routeProvider.when("/test/api", {
    controller: "testAPICtrl",
    templateUrl: "views/test/hammer.jade"
  });
}).controller("testAPICtrl", function(UserData, Point, $scope, $rootScope, Snapper, Utils) {
  var model;
  console.log('testAPICtrl', Point);
  model = {};
  model = UserData.addToken(model);
  return Point.getTimeline(model).then(function(data) {
    return console.log('getTimeline', data);
  }, function(err) {
    return console.log('err', err);
  });
});

//# sourceMappingURL=testapi.js.map

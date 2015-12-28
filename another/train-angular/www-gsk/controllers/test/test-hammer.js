"use strict";
angular.module("site.test").config(function($routeProvider) {
  return $routeProvider.when("/test/hammer", {
    controller: "testHammerCtrl",
    templateUrl: "views/test/hammer.jade"
  });
}).controller("testHammerCtrl", function($scope, $rootScope, Snapper, Utils) {
  var hmListener, pinchIn, pinchOut;
  console.log('testHammerCtrl');
  Snapper.disable();
  $rootScope.header = {
    pageTitle: 'Testing for hammer'
  };
  hmListener = new Hammer(document.getElementById('hammer'));
  hmListener.get('pinch').set({
    enable: true
  });
  console.log('hmListener', hmListener);
  pinchOut = function() {
    return console.log('pinch-out', this);
  };
  pinchIn = function() {
    return console.log('pinch-in', this);
  };
  hmListener.on('pinchout', pinchOut);
  hmListener.on('pinchin', pinchIn);
  return hmListener.on('panstart panmove panend press', function(event) {
    return console.log('hmListener was touched', event.type, event);
  });
});

//# sourceMappingURL=test-hammer.js.map

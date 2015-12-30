(function() {

  var app = angular.module('app', []);
  app.controller('ParseController', ParseController);

  function ParseController($scope, $parse) {
    this.libs = {};
    this.libs.angular = {
      version: '1.4.3'
    };

    var template = $parse("'This example uses AngularJS ' + libs.angular.version");
    this.parsedMsg = template(this);
  }

})();

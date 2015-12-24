// CONSTANT: IF INIT A VALUE NEVER CHANGE - WE USE CONSTANT
// VALUE: UES IN CASE VALUE HAS BEEN CHANGE
// Storing a single constant value
var app = angular.module('AngularApp', []);

/*
CONSTANT
*/
app.constant('APPNAME', 'My App');
// Now we inject our constant value into a test controller
app.controller('TestCtrl', ['APPNAME', function TestCtrl(appName) {
  console.log(appName);
}]);

// constant object
app.constant('CONFIG', {
  appName: 'My App',
  appVersion: 2.0,
  apiUrl: 'http://www.google.com?api'
});

// Now we inject our constant value into a test controller
app.controller('TestCtrl', ['CONFIG', function TestCtrl(config) {
  console.log(config);
  console.log('App Name', config.appName);
  console.log('App Name', config.appVersion);
}]);

/*
VALUE
*/
app.value('usersOnline', 0);
// Now we inject our constant value into a test controller
app.controller('TestCtrl', ['usersOnline', function TestCtrl(usersOnline) {
    console.log(usersOnline); // 0
    usersOnline = 15;
    console.log(usersOnline); // 15
}]);
app.value('user', {
    firstName: '',
    lastName: '',
    email: ''
});
// Now we inject our constant value into a test controller
// Values will be populated inside of controller
app.controller('TestCtrl', ['$scope', 'user', function TestCtrl($scope, user) {
    user.firstName = 'Dwayne';
    user.lastName = 'Charrington';
    user.email = 'dwayne@ilikekillnerds.com';
    // Pass the user values through to the view
    $scope.user = user;
}]);

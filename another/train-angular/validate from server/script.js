// var app = angular.module('AngularApp',[]);

angular.module('AngularApp').controller('UserCtrl', function($scope, UserService) {
  return $scope.save = function(user) {
    var error, success;
    $scope.errors = {};
    success = function(result) {};
    error = function(result) {
      return angular.forEach(result.data.errors, function(errors, field) {
        $scope.form[field].$setValidity('server', false);
        return $scope.errors[field] = errors.join(', ');
      });
    };
    return UserService.create(user).then(success, error);
  };
});

/*angular.module('AngularApp').directive('serverError', function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, element, attrs, ctrl) {
      return element.on('change', function() {
        return scope.$apply(function() {
          return ctrl.$setValidity('server', true);
        });
      });
    }
  };
});*/
/*
angular.module('AngularApp').directive('serverError2', [function () {
  var directive = {
    link: link,
    restrict: 'A',
    require: '?ngModel'
  };
  return directive;
  function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: ng.INgModelController) {

    element.on('keyup change', function (event) {
      scope.$apply(function () {
        controller.$setValidity('server', true);
      });
    });
  }
}]);
*/

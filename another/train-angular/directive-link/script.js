var app = angular.module('AngularApp', []);

app.directive('dad', function () {
  return {
    restrict: 'EA',
    template: '<div class="dad">{{greeting}}{{name}}'+
    '<son></son>'+
    '</div>',
    controller: function(){
      this.name = 'Paul'
    },
    link: function( scope, elem, attr, ctrl){
      scope.name = ctrl.name;
      scope.greeting = 'Hey, I am ';
    }
  };
});

app.directive('son', function () {
  return {
    restrict: 'EA',
    require: '^dad',
    template: '<div class="son">{{sonSays}}</div>',
    link: function( scope, elem, attr, ctrl){
      scope.sonSays = 'Hey, I am son, and my dad is '+ ctrl.name;
    }
  };
});

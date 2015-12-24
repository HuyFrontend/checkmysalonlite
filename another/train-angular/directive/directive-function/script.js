var app = angular.module('AngularApp', []);

app.directive('entering', function () {
  return function (scope, element, attrs) {
    // element.bind('mouseenter', function(){
    //   this.style.color = 'red';
    // });
    // or native javascript
    element[0].addEventListener('mouseenter', function changeColor () {
      this.style.color = 'red';
      this.classList.add(attrs.entering);
    });
  }
});

app.directive('leaving', function () {
 return function (scope, element , attrs) {
    element[0].addEventListener('mouseleave', function changeColor () {
      this.style.color = 'blue';
      this.classList.remove(attrs.entering);
    });
  }
});

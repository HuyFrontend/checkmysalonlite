// Global module

var myModule = (function () {

  var privateVariable = 'Hello World';
  function privateMethod() {
    // ...
  }

  // Module object

  var module = {};

  module.publicProperty = "Foobar";

  module.publicMethod = function () {

    console.log( privateVariable );

  };

  return module;

}());

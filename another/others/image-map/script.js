/**
design in html
example
<a data-toggle="MapArea", data-item="true", data-target="MapAreaTarget">MapArea</a>
generator image to map: http://imagemap-generator.dariodomi.de/
**/

(function(factory){
  var init = factory();
  if(Window) {
    Window.MapArea = init;
  }
})(function(){

  // MapArea DEFINITION
  // ===================
  var MapArea = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = typeof options === 'object' ? options : {};
    // define new option
    this.options.newOption = 'newOption';
    this.init();
  };

  // MapArea METHODS
  // ================
  MapArea.prototype = {

    init : function() {
      var self = this, elm = self.element, opt = self.options;
      var items = elm.querySelectorAll('[' + opt.dataItem + ']');

      this.actions();

      for (var i = 0, len = items.length; i < len; i++) {
        items[i].removeEventListener('mouseenter', self.hover);
        items[i].addEventListener('mouseenter', self.hover);

        items[i].removeEventListener('mouseleave', self.leave);
        items[i].addEventListener('mouseleave', self.leave);
      }
    },

    actions : function() {
      var self = this, elm = self.element, opt = self.options;
      var input = elm.querySelector('input');

      self.hover = function (e) {
        var target = e.target || e.srcElement;
        var value = target.getAttribute('value');
        input.value = value;
      };

      self.leave = function () {
        input.value = '';
      };
      self.otherMethod = function () {
      };
    }
  };

  // MapArea DATA API
  // =================
  var MapAreas = document.querySelectorAll('[data-toggle="MapArea"]');
  for (var i = 0, len = MapAreas.length; i < len; i++ ) {
      var element = MapAreas[i],
          options = {
            value : '',
            dataItem: 'data-item',
            classActive: 'active',
            classHide: 'hide'
          };
    new MapArea(element, options);
  }
  return MapArea;
});

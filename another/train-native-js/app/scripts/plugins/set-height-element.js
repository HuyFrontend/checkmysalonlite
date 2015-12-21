(function(factory){
  window.SetHeightItem = factory();
})(function(){

  // SetHeightItem DEFINITION
  // ===================
  var SetHeightItem = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = typeof options === 'object' ? options : {};
    this.options.screenWidth = window.screen.width;

    this.init();
  };

  // SetHeightItem METHODS
  // ================
  SetHeightItem.prototype = {

    init : function() {
      var self = this, /*elm = self.element,*/ opt = self.options;
      this.actions();

      opt.indexMaxElement = self.getMaxElement();

      self.resetHeightItem();

      // window.onresize = function changeHeight () {
      //   setTimeout(function () {
      //     self.resetHeightItem();
      //   },10);
      // };

      window.addEventListenerOrAttachEventMultiEvent(function resizeHeightService() {
        var orient = ( window.orientation === 90 || window.orientation === -90) ? 'landscape' : 'portrait';
        if ( orient !== opt.orientation ) {
          setTimeout(function () {
            self.resetHeightItem();
            opt.orientation = orient;
          },10);
        }
       }, ['orientationchange']);
    },

    actions : function() {
      var self = this, elm = self.element, opt = self.options;
      var list = elm.querySelectorAll('[' + opt.dataItem + ']');

      self.getMaxElement = function () {
        var listHeight = [];
        var index = -1;
        for (var i = 0, len = list.length; i < len; i++) {
          listHeight.push(list[i].offsetHeight);
        }
        if (listHeight.length) {
          // maxHeight = Math.max(...listHeight); // new
          var maxHeight = window.getMaxOfArray(listHeight);
          index = listHeight.indexOf(maxHeight);
        }
        return index;
      };
      self.resetHeightItem = function () {
        var index = opt.indexMaxElement;
        var maxHeight = list[index].clientHeight;
        for(var i = 0, len = list.length; i < len; i++) {
          if(i !== index) {
            list[i].style.height = maxHeight + 'px';
          }
        }
      };
    }
  };

  // SetHeightItem DATA API
  // =================
  var SetHeightItems = document.querySelectorAll('[data-toggle="SetHeightItem"]');
  for (var i = 0, len = SetHeightItems.length; i < len; i++ ) {
      var element = SetHeightItems[i],
          options = {
            classGroup: 'item',
            classTitle: 'service-title',
            dataItem: 'data-set-size',
            indexMaxElement: -1,
            orientation: (window.orientation === 0 || window.orientation === 180) ? 'portrait' : 'landscape'
          };
    new SetHeightItem(element, options);
  }
  return SetHeightItem;
});

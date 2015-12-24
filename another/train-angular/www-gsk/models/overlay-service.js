'use strict';
angular.module('site').factory('OverlayService', function(localStorageService) {
  var overlay;
  overlay = {};
  overlay.isShowed = function(overlay) {
    var result;
    result = localStorageService.get('overlays.' + overlay);
    if (result === null) {
      return false;
    } else {
      return true;
    }
  };
  overlay.setShowed = function(overlay) {
    localStorageService.set('overlays.' + overlay, 'showed');
    return true;
  };
  return overlay;
});

//# sourceMappingURL=overlay-service.js.map

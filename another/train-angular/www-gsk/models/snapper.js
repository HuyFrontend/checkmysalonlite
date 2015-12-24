'use strict';
angular.module('site').factory('Snapper', function(localStorageService, Environment, $rootScope, $timeout, OverlayService, CONSTANTS) {
  var snapper;
  snapper = {};
  if (typeof Snap === 'undefinied') {
    throw 'Snap was not found.';
  } else {
    snapper = new Snap({
      element: document.getElementById('inner'),
      disable: 'right',
      maxPosition: 520,
      minPosition: -520,
      transitionSpeed: 0.2,
      hyperextensible: false
    });
  }
  snapper.hamburgerToggle = function() {
    var intro, introOnFinish, path, showOverlay;
    if (snapper.state().state === 'left') {
      return snapper.close('left');
    } else {
      snapper.open('left');
      $('.snap-drawer').scrollTop(0);
      path = 'overlay-sidebar-left';
      intro = introJs();
      intro.setOptions({
        showStepNumbers: false,
        showBullets: false,
        exitOnOverlayClick: false
      });
      intro.setOptions({
        steps: [
          {
            element: '#info-profile',
            intro: ' <p>Here\'s where you check up <br> on you and all your<br> fantastic progress.</p>',
            position: 'bottom',
            tooltipClass: 'content-nav'
          }
        ]
      });
      introOnFinish = function() {
        $('body').removeClass('show-intro');
        return OverlayService.setShowed(path);
      };
      intro.onexit(introOnFinish);
      intro.oncomplete(introOnFinish);
      showOverlay = function() {
        var helpStatus;
        helpStatus = localStorageService.get('helpStatus') || 'false';
        if (!Environment.isOverlay) {
          return;
        }
        if ((OverlayService.isShowed(path) === false) && (helpStatus === 'true')) {
          return $timeout(function() {
            $('body').addClass('show-intro');
            return intro.start();
          }, CONSTANTS.OVERLAYS_TIME);
        }
      };
      return showOverlay();
    }
  };
  return snapper;
});

//# sourceMappingURL=snapper.js.map

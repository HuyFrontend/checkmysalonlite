angular.module('site').directive('gkMotivationGalleryLanding', function($location, $rootScope) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs, ngModel) {
      return $(function() {
        var btnDetails, scienceBlock;
        scienceBlock = $('.block-science').hide();
        btnDetails = $element.find('.science-link');
        return btnDetails.click(function() {
          var currentOffer, iFrame, motivaBlock, urlYoutube, videoContainer;
          currentOffer = $(this).parentsUntil('.motivation-gallery').find(scienceBlock);
          if (currentOffer.css('display') !== 'none') {
            currentOffer.slideUp('fast');
          } else {
            scienceBlock.slideUp('fast');
            motivaBlock = $(this).parents('.motivation-block');
            videoContainer = motivaBlock.find('.video-container');
            urlYoutube = videoContainer.data('video');
            iFrame = videoContainer.find('iframe');
            if (iFrame.attr('src') === '') {
              iFrame.attr('src', urlYoutube);
            }
            $(this).parentsUntil('.motivation-gallery').find(scienceBlock).slideDown('fast');
          }
        });
      });
    }
  };
});

//# sourceMappingURL=gk-motivation-gallery-landing.js.map

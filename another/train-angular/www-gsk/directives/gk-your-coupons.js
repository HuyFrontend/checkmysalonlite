angular.module('site').directive('gkYourCoupons', function($location, $rootScope) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs, ngModel) {
      var init;
      $rootScope.$on('on-repeat-last', function() {
        console.log('on-repeat-last gkYourCoupons');
        return init();
      });
      init = function() {
        var backHomepage, bottomButton, btnDetails, emailCoupons, offer, ul;
        offer = '.offer-details';
        ul = $element.find('ul');
        emailCoupons = $element.find('.btn-email-coupons');
        backHomepage = $element.find('.btn-back-homepage');
        btnDetails = $element.find('.btn-details');
        bottomButton = function(btn) {
          if (btn === 'email') {
            backHomepage.css('display', 'none');
            return emailCoupons.css('display', '');
          } else {
            emailCoupons.css('display', 'none');
            return backHomepage.css('display', '');
          }
        };
        return btnDetails.click(function() {
          var currentOffer;
          console.log('btnDetails click');
          currentOffer = $(this).parentsUntil('ul').find(offer);
          if (currentOffer.css('display') !== 'none') {
            currentOffer.slideUp('fast');
            bottomButton('email');
          } else {
            $(offer).slideUp('fast');
            $(this).parentsUntil('ul').find(offer).slideDown('fast');
            bottomButton('homepage');
          }
        });
      };
      return init();
    }
  };
});

//# sourceMappingURL=gk-your-coupons.js.map

angular.module('site').directive('gkWriteMemo', function($rootScope, $timeout, localStorageService, Device, Settings) {
  return {
    link: function(scope, element, attrs) {
      var buttonSubmit, formMemo, messageMemo;
      scope.$watch("ngShow", function(show) {
        return scope.closePopup = function() {
          scope.showPopup = false;
          scope.showMemoPopup = false;
        };
      });
      formMemo = element.parents('#form-memo');
      messageMemo = $('textarea', formMemo);
      buttonSubmit = $('button', formMemo);
      messageMemo.keyup(function() {
        if (messageMemo.val().trim().length > 0) {
          buttonSubmit.addClass('active');
        } else {
          buttonSubmit.removeClass('active');
        }
      });
      buttonSubmit.unbind('click.WriteMemo').bind('click.WriteMemo', function() {
        if (messageMemo.val().trim().length > 0) {
          Device.alert(Settings.message.reasonToQuitMemo, null, 'Message', 'Done');
          scope.showPopup = false;
          scope.showMemoPopup = false;
          return buttonSubmit.removeClass('active');
        }
      });
    }
  };
});

//# sourceMappingURL=gk-write-memo.js.map

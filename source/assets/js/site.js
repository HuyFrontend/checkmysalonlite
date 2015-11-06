var Site = (function($, window, undefined) {
  'use strict';
  var L10n = window.L10n,
      doc = $(document),
      body = $('body');

  var initModal = function () {
    var btnLogin = body.find('[data-login]'),
        btnRegister = body.find('[data-register]'),
        btnLostPass = body.find('[data-lost-password]'),
        bntLogout = body.find('[data-logout]'),
        btnSetting = body.find('[data-setting]');

    var emotionModal = body.find('#quiz-emotion-modal'),
        assessmentModal = body.find('#quiz-assessment-modal');

     btnLogin['showing-modal']({
      modal: '#login-modal'
    });

    btnRegister['showing-modal']({
      modal: '#register-modal'
    });

    // bntLogout['showing-modal']({
    //   isModalLogout: true,
    //   hasLayer: true,
    //   message: L10n.confirm.logout,
    //   modal: '#mess-confirm-error'
    // });

    // btnSetting['showing-modal']({
    //   modal: '#setting-modal'
    // });

    // emotionModal['get-point']({
    //   content: '#item-emotion'
    // });
    // assessmentModal['get-point']({
    //   content: '#item-assessment'
    // });

    btnLostPass['showing-modal']({
      modal: '#forgot-pass'
    });
  };

  var initQuiz = function () {
    var quizList = body.find('[data-quiz]');
    quizList['quiz']();
  };

  return {
    initModal: initModal,
    initQuiz: initQuiz
  };

})(jQuery, window);

jQuery(function() {
  Site.initModal();
  // Site.initQuiz();
});

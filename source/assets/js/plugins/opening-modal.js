
(function(factory){
  var init = factory();
  if(Window) {
    Window.OpeningModal = init;
  }
})(function(){
  // OpeningModal DEFINITION
  // ===================
  var OpeningModal = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    // this.option = typeof option === 'string' ? option : null;
    this.options = {};
    this.options.target = options.target;
    this.options.changeContent = !options.changeContent ? null : options.changeContent;
    this.options.ajaxLink = !options.ajaxLink ? null : options.ajaxLink;
    this.options.requestType = !options.requestType ? null : options.requestType;
    this.options.loadLink = !options.loadLink ? null : options.loadLink;
    this.options.backdrop = !options.backdrop ? null : options.backdrop;

    this.init();
  };

  // OpeningModal METHODS
  // ================
  OpeningModal.prototype = {

    init : function() {
      var self = this;
      this.actions();
      self.element.addEventListener('click', self.toggle, true);

      // var textGroup = self.element.querySelector('.group-text');
      // if(textGroup) {
      //   textGroup.addEventListener('click', function text (e) {
      //     alert(1);
      //     e.prventDefault();
      //     e.stopPropagation();
      //   });
      // }
    },

    actions : function() {
      var self = this, elm = self.element, opt = self.options;

      self.toggle = function (e) {
        // var target = e.target || e.srcElement;
        var id = opt.target ? opt.target : 'confirm-modal';
        var targetModal = document.getElementById(id);

        if(opt.ajaxLink) {
          self.ajax();
        }
        else {
          var objModal = new Window.Modal(targetModal, {
            duration: 500,
            backdrop: opt.backdrop,
            newContent: opt.changeContent,
            replaceContainer: 'data-replace',
            replaceHref: opt.loadLink
          });

          objModal.open();
        }
      };
      self.ajax = function () {

        var request = new Window.RequestAjax (),
            sendRequest, parrams;

        if(!opt.requestType || opt.requestType !== 'POST') {
          parrams = {id: elm.getAttribute('data-id')};
          sendRequest = request.sendRequest(opt.ajaxLink, self.ajaxGet.success, self.ajaxGet.error, opt.requestType, parrams);
        }

        else {
          parrams = '';
          sendRequest = request.sendRequest(opt.ajaxLink, self.ajaxPost.success, self.ajaxPost.error, 'post', parrams);
        }
      };
      self.ajaxGet = {
        success: function (response) {
          var targetModal = document.getElementById(opt.target);
          var objModal = new Window.Modal(targetModal, {
            duration : 500,
            backdrop: opt.backdrop,
            newContent : response,
            replaceContainer : 'data-replace'
          });
          objModal.open();
        },
        error: function (err) {
          alert(err);
        }
      };
      self.ajaxPost = {
        success: function (response) {
          alert(response);
        },
        error: function (err) {
          alert(err);
        }
      };
    }
  };

  // OpeningModal DATA API
  // =================
  var OpeningModals = document.querySelectorAll('[data-toggle="opening-modal"]');

  for (var i = 0, len = OpeningModals.length; i < len; i++ ) {
    var elmShowModal = OpeningModals[i],
        options = {
          dataTarget: 'data-target',
          target : elmShowModal.getAttribute('data-target'),
          changeContent : elmShowModal.getAttribute('data-content'),
          requestType : elmShowModal.getAttribute('data-request'),
          ajaxLink : elmShowModal.getAttribute('data-href-ajax'),
          loadLink: elmShowModal.getAttribute('data-href'),
          backdrop: elmShowModal.getAttribute('data-backdrop')
        };
    new OpeningModal(elmShowModal, options);
  }

  return OpeningModal;

});

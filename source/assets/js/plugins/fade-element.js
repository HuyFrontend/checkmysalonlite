
/*
name: Fade
usage: var f = new Window.Fade();
- fadein: f.fadein(document.querySelector('#id'), {type: 'quadratic', 'duration': 2000, complete: function() {alert(1);}})
*/
(function(factory){
  var init = factory();
  if(Window) {
    Window.Fade = init;
  }
})(function(){

  // Fade DEFINITION
  // ===================
  var Fade = function( element, options ) {
    options = options || {};
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = options;
    this.init();
  };

  // Fade METHODS
  // ================
  Fade.prototype.init = function() {
    var self = this;
  };

  Fade.prototype.easing = {
    linear: function(progress) {
      return progress;
    },
    quadratic: function(progress) {
      return Math.pow(progress, 2);
    },
    swing: function(progress) {
      return 0.5 - Math.cos(progress * Math.PI) / 2;
    },
    circ: function(progress) {
      return 1 - Math.sin(Math.acos(progress));
    },
    back: function(progress, x) {
      return Math.pow(progress, 2) * ((x + 1) * progress - x);
    },
    bounce: function(progress) {
      for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (progress >= (7 - 4 * a) / 11) {
          return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
        }
      }
    },
    elastic: function(progress, x) {
      return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
    }
  };

  Fade.prototype.animate = function(options) {
    var start = new Date();
    var id = setInterval(function() {
      var timePassed = new Date() - start;
      var progress = timePassed / options.duration;
      if (progress > 1) {
        progress = 1;
      }
      options.progress = progress;
      var delta = options.delta(progress);
      options.step(delta);
      if (progress === 1) {
        clearInterval(id);
        if(options.complete) {
          options.complete();
        }
      }
    }, options.delay || 10);
  };

  Fade.prototype.fadeIn = function (element, options) {

    var to = 0;
    var self = this;
    var fadeType = options.type ? options.type : 'swing';

    this.animate({
      duration: options.duration,
      delta: function(progress) {
        progress = this.progress;
        return self.easing[fadeType](progress);
      },
      complete: options.complete,
      step: function(delta) {
        element.style.opacity = to + delta;
      }
    });
  };
  Fade.prototype.fadeOut = function(element, options) {

    var self = this;
    var to = 1;
    var fadeType = options.type ? options.type : 'swing';

    this.animate({
      duration: options.duration,
      delta: function(progress) {
        progress = this.progress;
        return self.easing[fadeType](progress);
      },
      complete: options.complete,
      step: function(delta) {
        element.style.opacity = to - delta;
      }
    });
  };
  // Fade DATA API
  // =================
  var Fades = document.querySelectorAll('[data-toggle="NoFade"]');
  // var Fades = document;
  for (var i = 0, len = Fades.length; i < len; i++ ) {
    var element = Fades[i], options;
    new Fade(element, options);
  }
  return Fade;
});

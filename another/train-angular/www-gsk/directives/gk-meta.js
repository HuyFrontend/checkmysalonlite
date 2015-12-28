'use strict';
angular.module('site').directive('ngMeta', function() {
  return {
    link: function(scope, element) {
      var androidKitkat, androidVersion, content, gteIOS7, iOSversion, ios7, ios70, ios71, ios8, isAndroid, isIOS, ltAndroidKitkat, ltIOS7, tagHTML, userAgent, verIOS;
      iOSversion = function() {
        var v;
        if (/iP(hone|ad)/.test(navigator.platform)) {
          v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
          return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
      };
      userAgent = navigator.userAgent.toLowerCase();
      isAndroid = userAgent.indexOf('android') > -1;
      androidVersion = parseFloat(userAgent.slice(userAgent.indexOf('android') + 8));
      isIOS = navigator.userAgent.match(/(iPad|iPhone)/g);
      tagHTML = document.getElementsByTagName('html')[0];
      androidKitkat = false;
      ltAndroidKitkat = false;
      gteIOS7 = false;
      ltIOS7 = false;
      ios7 = false;
      ios70 = false;
      ios71 = false;
      ios8 = false;
      verIOS = iOSversion();
      if (isAndroid || isIOS) {
        tagHTML.classList.add('mobile');
      }
      if (verIOS) {
        if (verIOS[0] >= 7) {
          gteIOS7 = true;
          tagHTML.classList.add('gte-ios-7');
        }
        if (verIOS[0] >= 7 && verIOS[0] < 8) {
          ios7 = true;
          tagHTML.classList.add('ios-7');
        }
        if (verIOS[0] === 7 && verIOS[1] === 0) {
          ios70 = true;
          tagHTML.classList.add('ios-7-0');
        }
        if (verIOS[0] === 7 && verIOS[1] >= 1) {
          ios71 = true;
          tagHTML.classList.add('ios-7-1');
        }
        if (verIOS[0] >= 8) {
          ios8 = true;
          tagHTML.classList.add('ios-8');
        }
        if (verIOS[0] < 7) {
          ltIOS7 = true;
          tagHTML.classList.add('lt-ios-7');
        }
      }
      if (isAndroid) {
        tagHTML.classList.add('android');
      }
      if (androidVersion >= 4.4) {
        androidKitkat = true;
        tagHTML.classList.add('android-kitkat');
      }
      if (androidVersion < 4.4) {
        ltAndroidKitkat = true;
        tagHTML.classList.add('lt-android-kitkat');
      }
      console.log('ngMeta');
      if (typeof device === 'undefined') {
        return;
      }
      console.log(device.platform + '|' + device.model + '|' + device.name + '|' + device.version);
      content = '';
      if (device.platform === 'iOS') {
        content = 'user-scalable=no, initial-scale=1, maximum-scale=0.5, minimum-scale=0.5, width=device-width';
      } else if (device.platform === 'Android') {
        console.log('device.platform: ' + device.platform);
        content = 'initial-scale=1, maximum-scale=0.55, minimum-scale=0.55, width=device-width, height=device-height, target-densitydpi=device-dpi';
      }
      return element.attr('content', content);
    }
  };
});

//# sourceMappingURL=gk-meta.js.map

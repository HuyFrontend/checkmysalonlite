'use strict';
var API_PATH, gskStart, initPreloadImageAvatar, initPreloadImageBadge, initPreloadImageFirst, initPreloadImageSmilesCheer, initSplashScreenOnDevice, onBrowserReady, onDeviceReady, peelAnimation, percentLoading, preloadImage, pushErrorHandler, pushSuccessHandler, pushTokenHandler, registerPushNotification, splashScreenHasFinished, splashScreenStep;

API_PATH = 'http://quitapp-publish-test.gsk.sutrix.com/content/';

percentLoading = $('#percent-loading');

splashScreenHasFinished = function() {
  var e;
  e = document.createEvent('HTMLEvents');
  console.log('splash-screen-has-finished');
  e.initEvent('splash-screen-has-finished', true, true);
  document.dispatchEvent(e);
};

peelAnimation = function() {
  var peelBlock;
  console.log('peelAnimation');
  $('input').blur();
  peelBlock = $('.peel-block');
  peelBlock.addClass('show');
  return setTimeout(function() {
    peelBlock.addClass('animation').on('webkitAnimationEnd animationend', function(event) {
      $(this).removeClass('animation show');
      splashScreenHasFinished();
    });
  }, 1000);
};

preloadImage = function(imgList, onLoading, callback) {
  var doLoad, imgsNum, loadImg, loaded;
  if (!$.isArray(imgList)) {
    imgList = [imgList];
  }
  imgsNum = imgList.length;
  if (!imgsNum || imgsNum <= 0) {
    (callback || $.noop)();
    return;
  }
  loaded = 0;
  loadImg = function() {
    loaded++;
    onLoading(Math.round(loaded / imgsNum * 100));
    if (loaded === imgsNum) {
      (callback || $.noop)();
    } else {
      doLoad(loaded);
    }
  };
  doLoad = function(idx) {
    var newImg;
    newImg = new Image();
    newImg.onload = newImg.onerror = function() {
      loadImg();
    };
    newImg.src = imgList[idx];
  };
  onLoading = onLoading || $.noop;
  doLoad(0);
};

initPreloadImageFirst = function(callback) {
  console.log('images loading');
  preloadImage(['images/upload/quit-team/face-6.png', 'images/upload/quit-team/flag-large.png', 'images/upload/all-motivation.png', 'images/badge-landing.png', 'images/icon-camera.png', 'images/splashscreen.png'], (function(percent) {
    percentLoading.text(percent + '%');
  }), function() {
    setTimeout(callback, 1000);
  });
};

initPreloadImageAvatar = function(callback) {
  console.log('images loading avatar');
  preloadImage([API_PATH + 'dam/napp/avatar/avatar-alien.png', API_PATH + 'dam/napp/avatar/avatar-astronaut.png', API_PATH + 'dam/napp/avatar/avatar-aviator.png', API_PATH + 'dam/napp/avatar/avatar-bumblebee.png', API_PATH + 'dam/napp/avatar/avatar-capboy.png', API_PATH + 'dam/napp/avatar/avatar-catwoman.png', API_PATH + 'dam/napp/avatar/avatar-chef.png', API_PATH + 'dam/napp/avatar/avatar-cutegirl.png', API_PATH + 'dam/napp/avatar/avatar-dinosaur.png', API_PATH + 'dam/napp/avatar/avatar-freckledman.png', API_PATH + 'dam/napp/avatar/avatar-googleglassboy.png', API_PATH + 'dam/napp/avatar/avatar-grandma.png', API_PATH + 'dam/napp/avatar/avatar-hipsterboy.png', API_PATH + 'dam/napp/avatar/avatar-hipstergirl.png', API_PATH + 'dam/napp/avatar/avatar-horserider.png', API_PATH + 'dam/napp/avatar/avatar-joker.png', API_PATH + 'dam/napp/avatar/avatar-monster.png', API_PATH + 'dam/napp/avatar/avatar-nurse.png', API_PATH + 'dam/napp/avatar/avatar-panda.png', API_PATH + 'dam/napp/avatar/avatar-scubaboy.png', API_PATH + 'dam/napp/avatar/avatar-superhero.png', API_PATH + 'dam/napp/avatar/avatar-tropicalgirl.png', API_PATH + 'dam/napp/avatar/avatar-workingoutboy.png', API_PATH + 'dam/napp/avatar/avatar-workingoutgirl.png', API_PATH + 'dam/napp/avatar/avatar-zombie.png', API_PATH + 'dam/napp/avatar-profile/avatar-alien.png', API_PATH + 'dam/napp/avatar-profile/avatar-astronaut.png', API_PATH + 'dam/napp/avatar-profile/avatar-aviator.png', API_PATH + 'dam/napp/avatar-profile/avatar-bumblebee.png', API_PATH + 'dam/napp/avatar-profile/avatar-capboy.png', API_PATH + 'dam/napp/avatar-profile/avatar-catwoman.png', API_PATH + 'dam/napp/avatar-profile/avatar-chef.png', API_PATH + 'dam/napp/avatar-profile/avatar-cutegirl.png', API_PATH + 'dam/napp/avatar-profile/avatar-dinosaur.png', API_PATH + 'dam/napp/avatar-profile/avatar-freckledman.png', API_PATH + 'dam/napp/avatar-profile/avatar-googleglassboy.png', API_PATH + 'dam/napp/avatar-profile/avatar-grandma.png', API_PATH + 'dam/napp/avatar-profile/avatar-hipsterboy.png', API_PATH + 'dam/napp/avatar-profile/avatar-hipstergirl.png', API_PATH + 'dam/napp/avatar-profile/avatar-horserider.png', API_PATH + 'dam/napp/avatar-profile/avatar-joker.png', API_PATH + 'dam/napp/avatar-profile/avatar-monster.png', API_PATH + 'dam/napp/avatar-profile/avatar-nurse.png', API_PATH + 'dam/napp/avatar-profile/avatar-panda.png', API_PATH + 'dam/napp/avatar-profile/avatar-scubaboy.png', API_PATH + 'dam/napp/avatar-profile/avatar-superhero.png', API_PATH + 'dam/napp/avatar-profile/avatar-tropicalgirl.png', API_PATH + 'dam/napp/avatar-profile/avatar-workingoutboy.png', API_PATH + 'dam/napp/avatar-profile/avatar-workingoutgirl.png', API_PATH + 'dam/napp/avatar-profile/avatar-zombie.png'], (function(percent) {}), function() {
    setTimeout(callback, 1000);
  });
};

initPreloadImageBadge = function(callback) {
  console.log('images loading badge');
  preloadImage([API_PATH + 'dam/napp/badges/badge-1hour.png', API_PATH + 'dam/napp/badges/badge-2hour.png', API_PATH + 'dam/napp/badges/badge-3hour.png', API_PATH + 'dam/napp/badges/badge-6hour.png', API_PATH + 'dam/napp/badges/badge-18hour.png', API_PATH + 'dam/napp/badges/badge-24hour.png', API_PATH + 'dam/napp/badges/badge-30hour.png', API_PATH + 'dam/napp/badges/badge-36hour.png', API_PATH + 'dam/napp/badges/badge-2day.png', API_PATH + 'dam/napp/badges/badge-3day.png', API_PATH + 'dam/napp/badges/badge-4day.png', API_PATH + 'dam/napp/badges/badge-5day.png', API_PATH + 'dam/napp/badges/badge-6day.png', API_PATH + 'dam/napp/badges/badge-7day.png', API_PATH + 'dam/napp/badges/badge-10day.png', API_PATH + 'dam/napp/badges/badge-14day.png', API_PATH + 'dam/napp/badges/badge-3week.png', API_PATH + 'dam/napp/badges/badge-air.png', API_PATH + 'dam/napp/badges/badge-bar.png', API_PATH + 'dam/napp/badges/badge-blood.png', API_PATH + 'dam/napp/badges/badge-blue.png', API_PATH + 'dam/napp/badges/badge-bonfire.png', API_PATH + 'dam/napp/badges/badge-boxingday.png', API_PATH + 'dam/napp/badges/badge-chirstmasday.png', API_PATH + 'dam/napp/badges/badge-chirstmaseve.png', API_PATH + 'dam/napp/badges/badge-cleaning.png', API_PATH + 'dam/napp/badges/badge-concert.png', API_PATH + 'dam/napp/badges/badge-deadline.png', API_PATH + 'dam/napp/badges/badge-dineout.png', API_PATH + 'dam/napp/badges/badge-driving.png', API_PATH + 'dam/napp/badges/badge-firstgoalseeker.png', API_PATH + 'dam/napp/badges/badge-firstinformation.png', API_PATH + 'dam/napp/badges/badge-first-journey.png', API_PATH + 'dam/napp/badges/badge-firstreason.png', API_PATH + 'dam/napp/badges/badge-firstteam.png', API_PATH + 'dam/napp/badges/badge-goingout.png', API_PATH + 'dam/napp/badges/badge-halloween.png', API_PATH + 'dam/napp/badges/badge-heart.png', API_PATH + 'dam/napp/badges/badge-holiday.png', API_PATH + 'dam/napp/badges/badge-homealone.png', API_PATH + 'dam/napp/badges/badge-movienight.png', API_PATH + 'dam/napp/badges/badge-nail.png', API_PATH + 'dam/napp/badges/badge-new-year.png', API_PATH + 'dam/napp/badges/badge-newyear-eve.png', API_PATH + 'dam/napp/badges/badge-no-smoking.png', API_PATH + 'dam/napp/badges/badge-nottinghill.png', API_PATH + 'dam/napp/badges/badge-noworldtabaccoday.png', API_PATH + 'dam/napp/badges/badge-orage.png', API_PATH + 'dam/napp/badges/badge-party.png', API_PATH + 'dam/napp/badges/badge-presentation.png', API_PATH + 'dam/napp/badges/badge-promise.png', API_PATH + 'dam/napp/badges/badge-secretweapon.png', API_PATH + 'dam/napp/badges/badge-shine.png', API_PATH + 'dam/napp/badges/badge-slip.png', API_PATH + 'dam/napp/badges/badge-sport.png', API_PATH + 'dam/napp/badges/badge-springbank.png', API_PATH + 'dam/napp/badges/badge-standrews.png', API_PATH + 'dam/napp/badges/badge-stayingin.png', API_PATH + 'dam/napp/badges/badge-stpatricksday.png', API_PATH + 'dam/napp/badges/badge-strawberry.png', API_PATH + 'dam/napp/badges/badge-stressfulday.png', API_PATH + 'dam/napp/badges/badge-summer.png', API_PATH + 'dam/napp/badges/badge-travelling.png', API_PATH + 'dam/napp/badges/badge-umbrella.png', API_PATH + 'dam/napp/badges/badge-valentines.png', API_PATH + 'dam/napp/badges/badge-working-event.png', API_PATH + 'dam/napp/badges/badge-working-late.png', API_PATH + 'dam/napp/badges/badge-1hour-thumb.png', API_PATH + 'dam/napp/badges/badge-2hour-thumb.png', API_PATH + 'dam/napp/badges/badge-3hour-thumb.png', API_PATH + 'dam/napp/badges/badge-6hour-thumb.png', API_PATH + 'dam/napp/badges/badge-18hour-thumb.png', API_PATH + 'dam/napp/badges/badge-24hour-thumb.png', API_PATH + 'dam/napp/badges/badge-30hour-thumb.png', API_PATH + 'dam/napp/badges/badge-36hour-thumb.png', API_PATH + 'dam/napp/badges/badge-2day-thumb.png', API_PATH + 'dam/napp/badges/badge-3day-thumb.png', API_PATH + 'dam/napp/badges/badge-4day-thumb.png', API_PATH + 'dam/napp/badges/badge-5day-thumb.png', API_PATH + 'dam/napp/badges/badge-6day-thumb.png', API_PATH + 'dam/napp/badges/badge-7day-thumb.png', API_PATH + 'dam/napp/badges/badge-10day-thumb.png', API_PATH + 'dam/napp/badges/badge-14day-thumb.png', API_PATH + 'dam/napp/badges/badge-3week-thumb.png', API_PATH + 'dam/napp/badges/badge-air-thumb.png', API_PATH + 'dam/napp/badges/badge-bar-thumb.png', API_PATH + 'dam/napp/badges/badge-blood-thumb.png', API_PATH + 'dam/napp/badges/badge-blue-thumb.png', API_PATH + 'dam/napp/badges/badge-bonfire-thumb.png', API_PATH + 'dam/napp/badges/badge-boxingday-thumb.png', API_PATH + 'dam/napp/badges/badge-chirstmasday-thumb.png', API_PATH + 'dam/napp/badges/badge-chirstmaseve-thumb.png', API_PATH + 'dam/napp/badges/badge-cleaning-thumb.png', API_PATH + 'dam/napp/badges/badge-concert-thumb.png', API_PATH + 'dam/napp/badges/badge-deadline-thumb.png', API_PATH + 'dam/napp/badges/badge-dineout-thumb.png', API_PATH + 'dam/napp/badges/badge-driving-thumb.png', API_PATH + 'dam/napp/badges/badge-firstgoalseeker-thumb.png', API_PATH + 'dam/napp/badges/badge-firstinformation-thumb.png', API_PATH + 'dam/napp/badges/badge-first-journey-thumb.png', API_PATH + 'dam/napp/badges/badge-firstreason-thumb.png', API_PATH + 'dam/napp/badges/badge-firstteam-thumb.png', API_PATH + 'dam/napp/badges/badge-goingout-thumb.png', API_PATH + 'dam/napp/badges/badge-halloween-thumb.png', API_PATH + 'dam/napp/badges/badge-heart-thumb.png', API_PATH + 'dam/napp/badges/badge-holiday-thumb.png', API_PATH + 'dam/napp/badges/badge-homealone-thumb.png', API_PATH + 'dam/napp/badges/badge-movienight-thumb.png', API_PATH + 'dam/napp/badges/badge-nail-thumb.png', API_PATH + 'dam/napp/badges/badge-new-year-thumb.png', API_PATH + 'dam/napp/badges/badge-newyear-eve-thumb.png', API_PATH + 'dam/napp/badges/badge-no-smoking-thumb.png', API_PATH + 'dam/napp/badges/badge-nottinghill-thumb.png', API_PATH + 'dam/napp/badges/badge-noworldtabaccoday-thumb.png', API_PATH + 'dam/napp/badges/badge-orage-thumb.png', API_PATH + 'dam/napp/badges/badge-party-thumb.png', API_PATH + 'dam/napp/badges/badge-presentation-thumb.png', API_PATH + 'dam/napp/badges/badge-promise-thumb.png', API_PATH + 'dam/napp/badges/badge-secretweapon-thumb.png', API_PATH + 'dam/napp/badges/badge-shine-thumb.png', API_PATH + 'dam/napp/badges/badge-slip-thumb.png', API_PATH + 'dam/napp/badges/badge-sport-thumb.png', API_PATH + 'dam/napp/badges/badge-springbank-thumb.png', API_PATH + 'dam/napp/badges/badge-standrews-thumb.png', API_PATH + 'dam/napp/badges/badge-stayingin-thumb.png', API_PATH + 'dam/napp/badges/badge-stpatricksday-thumb.png', API_PATH + 'dam/napp/badges/badge-strawberry-thumb.png', API_PATH + 'dam/napp/badges/badge-stressfulday-thumb.png', API_PATH + 'dam/napp/badges/badge-summer-thumb.png', API_PATH + 'dam/napp/badges/badge-travelling-thumb.png', API_PATH + 'dam/napp/badges/badge-umbrella-thumb.png', API_PATH + 'dam/napp/badges/badge-valentines-thumb.png', API_PATH + 'dam/napp/badges/badge-working-event-thumb.png', API_PATH + 'dam/napp/badges/badge-working-late-thumb.png'], (function(percent) {}), function() {
    setTimeout(callback, 1000);
  });
};

initPreloadImageSmilesCheer = function(callback) {
  console.log('images loading quit cheer');
  preloadImage([API_PATH + 'dam/napp/smiles/quit-cheer-1.png', API_PATH + 'dam/napp/smiles/quit-cheer-2.png', API_PATH + 'dam/napp/smiles/quit-cheer-3.png', API_PATH + 'dam/napp/smiles/quit-cheer-4.png', API_PATH + 'dam/napp/smiles/quit-cheer-5.png', API_PATH + 'dam/napp/smiles/quit-cheer-6.png', API_PATH + 'dam/napp/smiles/quit-cheer-7.png', API_PATH + 'dam/napp/smiles/quit-cheer-8.png', API_PATH + 'dam/napp/smiles/quit-cheer-9.png', API_PATH + 'dam/napp/smiles/quit-cheer-10.png', API_PATH + 'dam/napp/smiles/quit-cheer-11.png', API_PATH + 'dam/napp/smiles/quit-cheer-12.png', API_PATH + 'dam/napp/smiles/quit-cheer-13.png', API_PATH + 'dam/napp/smiles/quit-cheer-14.png', API_PATH + 'dam/napp/smiles/quit-cheer-15.png', API_PATH + 'dam/napp/smiles/quit-cheer-16.png', API_PATH + 'dam/napp/smiles/quit-cheer-17.png', API_PATH + 'dam/napp/smiles/quit-cheer-18.png', API_PATH + 'dam/napp/smiles/quit-cheer-19.png', API_PATH + 'dam/napp/smiles/quit-cheer-20.png'], (function(percent) {}), function() {
    setTimeout(callback, 1000);
  });
};

pushSuccessHandler = function(result) {
  alert('result = ' + result);
};

pushTokenHandler = function(result) {
  var tokenResult;
  tokenResult = result.split('/');
  localStorage.setItem('deviceToken', tokenResult[0]);
};

pushErrorHandler = function(error) {
  console.log('error = ' + error);
};

registerPushNotification = function() {
  var pushNotification;
  if (typeof cordova !== 'undefined') {
    pushNotification = window.plugins.pushNotification;
    if (device.platform === 'android' || device.platform === 'Android') {
      return pushNotification.register(pushSuccessHandler, pushErrorHandler, {
        senderID: 'replace_with_sender_id',
        ecb: 'onNotification'
      });
    } else {
      return pushNotification.register(pushTokenHandler, pushErrorHandler, {
        badge: 'true',
        sound: 'true',
        alert: 'true',
        ecb: 'onNotificationAPN'
      });
    }
  }
};

splashScreenStep = function() {
  var loadingBlock, mustAgeBlock, pushBlock, showClass, splashscreen;
  splashscreen = $('.splashscreen');
  mustAgeBlock = $('.must-age-block');
  loadingBlock = $('.loading-block');
  pushBlock = $('.push-block');
  showClass = 'show';
  setTimeout((function() {
    if (localStorage.getItem('mustAge')) {
      loadingBlock.addClass(showClass);
      initPreloadImageFirst(function() {
        console.log('images first loaded / must aged');
        splashscreen.fadeOut();
        splashScreenHasFinished();
        initPreloadImageAvatar(function() {
          console.log('images avatar loaded / must aged');
          return initPreloadImageBadge(function() {
            return console.log('images badge loaded / must aged');
          });
        });
      });
    } else {
      mustAgeBlock.parent().addClass(showClass);
    }
    $('.btn', mustAgeBlock).on('click', function(e) {
      localStorage.setItem('mustAge', true);
      mustAgeBlock.parent().removeClass(showClass);
      loadingBlock.addClass(showClass);
      initPreloadImageFirst(function() {
        console.log('images first loaded 1');
        loadingBlock.removeClass(showClass);
        registerPushNotification();
        splashscreen.fadeOut();
        splashScreenHasFinished();
        initPreloadImageAvatar(function() {
          console.log('images avatar loaded');
          return initPreloadImageBadge(function() {
            return console.log('images badge loaded');
          });
        });
      });
    });
  }), 2000);
  $('#dont-allow-btn').on('click', function(e) {
    localStorage.setItem('dontAllowPushNotification', true);
    splashscreen.fadeOut();
  });
  $('#allow-btn').on('click', function(e) {
    localStorage.setItem('allowPushNotification', true);
    if (typeof cordova !== 'undefined') {
      registerPushNotification();
    }
    splashscreen.fadeOut();
  });
  if (localStorage.getItem('dontAllowPushNotification') || localStorage.getItem('allowPushNotification')) {
    loadingBlock.addClass('show');
    setTimeout(function() {
      splashscreen.fadeOut();
      splashScreenHasFinished();
    }, 2000);
  }
};

initSplashScreenOnDevice = function() {
  setTimeout(function() {
    typeof cordova !== 'undefined' && cordova.exec(function() {
      console.log('Success calling splash screen plugin');
    }, function(error) {
      console.log('Error calling splash screen plugin');
    }, 'SplashScreenPlugin', 'hide', [{}]);
    splashScreenStep();
  }, 2000);
};

onDeviceReady = function() {
  initSplashScreenOnDevice();
  localStorage.setItem('deviceUID', device.uuid);
  localStorage.setItem('deviceOS', device.platform.toUpperCase());
  angular.bootstrap(window.document, ['site']);
  console.log('angular', angular);
};

onBrowserReady = function() {
  angular.bootstrap(window.document, ['site']);
  splashScreenStep();
};

window.isWebView = function() {
  return !(!window.cordova && !window.PhoneGap && !window.phonegap);
};

gskStart = function() {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
    return document.addEventListener('deviceready', onDeviceReady, false);
  } else {
    return onBrowserReady();
  }
};

gskStart();

//# sourceMappingURL=start.js.map

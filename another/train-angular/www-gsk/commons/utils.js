'use strict';
angular.module('site').factory('Utils', function(BadgeService, AccountService, FacebookService, CONSTANTS, $rootScope, $timeout, Device, Settings, localStorageService, UserData, GigyaService) {
  var requestingOverlay;
  requestingOverlay = $('[data-loading-data="data-loading-data"]');
  return {
    shareToFacebook: function(item) {
      var shareModel;
      shareModel = {
        display: item.title,
        caption: item.descriptioin,
        description: item.descriptioin,
        picture: item.picture,
        message: Settings.sharingData.message,
        link: Settings.sharingData.link
      };
      return FacebookService.shareByPopup(shareModel).then(function(data) {
        mconsole.log('done', data);
        return Device.alert('Your message has been shared', null, 'Message', 'Done');
      }, function(err) {
        mconsole.log('err', err);
        return Device.alert('Cannot share your message right now, please try again later!', null, 'Error', 'Done');
      });
    },
    shareToFacebook2: function(model) {
      var share;
      share = function(model) {
        return FacebookService.shareWithDetails(model).then(function(data) {
          mconsole.log('done', data);
          return Device.alert(data.message, null, 'Message', 'Done');
        }, function(err) {
          mconsole.log('err', err);
          return Device.alert('Cannot share your message right now, please try again later!', null, 'Error', 'Done');
        });
      };
      if (FacebookService.getLoginStatus().status === 'connected') {
        return share(model);
      } else {
        return FacebookService.login().then(function() {
          return share(model);
        });
      }
    },
    shareByPopup: function(model) {
      return FacebookService.shareByPopup(model).then(function(data) {
        mconsole.log('done', data);
        return Device.alert(data.message, null, 'Message', 'Done');
      }, function(err) {
        mconsole.log('err', err);
        return Device.alert('Cannot share your message right now, please try again later!', null, 'Error', 'Done');
      });
    },
    showConnectionError: function() {
      return Device.alert(Settings.error.cannotConnectToServer, null, Settings.error.error, Settings.error.done);
    },
    html2Plain: function(htmlStr) {
      var beginPos, endPos, newStr;
      beginPos = htmlStr.indexOf('<');
      endPos = htmlStr.indexOf('>');
      while (beginPos >= 0) {
        newStr = htmlStr.substr(0, beginPos - 1) + htmlStr.substr(endPos + 1, htmlStr.length);
        htmlStr = newStr;
        beginPos = htmlStr.indexOf('<');
        endPos = htmlStr.indexOf('>');
      }
      return htmlStr;
    },
    getThumbLink: function(imgUrl) {
      var dotPosition, newLink;
      dotPosition = imgUrl.lastIndexOf('.');
      newLink = imgUrl.substr(0, dotPosition) + '-thumb' + imgUrl.substr(dotPosition, dotPosition.length);
      return newLink;
    },
    mainScroll: function(top, duration) {
      return $('#main').animate({
        scrollTop: top
      }, duration || 700);
    },
    customScroll: function(elm, top, duration) {
      return $(elm).animate({
        scrollTop: top
      }, duration || 700);
    },
    updateBtnStatus: function(status) {
      if (status) {
        return $('.btn.btn-2').addClass('active');
      } else {
        return $('.btn.btn-2').removeClass('active');
      }
    },
    isValidPassword: function(pass) {
      var regex;
      regex = '^(?=.*[a-zA-Z])(?=.*[0-9])(?!.*[@&\\#\\^\\-\\*/\\$£€\\(\\)\\|!%\\+\\,])(?=\\S+$).{4,12}$';
      return (pass != null) && pass.match(regex);
    },
    isValidFullName: function(fullName) {
      var regex;
      regex = '^(?=.*[a-zA-Z])(?!.*[0-9])(?!.*[@&\\#\\^\\-\\*/\\$£€\\(\\)\\|!%\\+\\,]).{1,100}$';
      return (fullName != null) && fullName.match(regex);
    },
    isValidEmail: function(email) {
      var regex;
      regex = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
      return (email != null) && email.match(regex);
    },
    isValidUserName: function(userName) {
      var regex;
      regex = '^\\S+$';
      return (userName != null) && userName.match(regex);
    },
    showRequestingOverlay: function() {
      return requestingOverlay.removeClass('hidden');
    },
    hideRequestingOverlay: function() {
      return requestingOverlay.addClass('hidden');
    },
    requestingHasFinished: function(delay) {
      return $timeout(function() {
        return $rootScope.$emit('requesting-has-finished');
      }, delay || 0);
    },
    showLoading: function() {
      return $('body').addClass('processing');
    },
    hideLoading: function() {
      return $('body').removeClass('processing');
    },
    stringToTime: function(HHmm) {
      var hours, minutes, toDay;
      toDay = new Date();
      hours = HHmm.substr(0, 2);
      minutes = HHmm.substr(3, 2);
      toDay.setHours(hours);
      toDay.setMinutes(minutes);
      return toDay;
    },
    getSecondFromNow: function(hhmmString) {
      var checkHour, checkMinute, hours, minutes, now, nowHour, nowMinute, secondRemindFromNow, setHour, setMinute;
      now = new Date().getTime();
      hours = hhmmString.substr(0, 2);
      minutes = hhmmString.substr(3, 2);
      nowHour = parseInt(moment(now).format('HH'));
      nowMinute = parseInt(moment(now).format('mm'));
      setHour = parseInt(hours);
      setMinute = parseInt(minutes);
      checkHour = setHour - nowHour;
      checkMinute = setMinute - nowMinute;
      if (checkHour > 0) {
        if (checkMinute >= 0) {
          secondRemindFromNow = checkMinute * 60 + checkHour * 60 * 60;
        } else {
          secondRemindFromNow = ((setMinute + 60 - nowMinute) * 60) + ((checkHour - 1) * 60 * 60);
        }
      } else {
        if (checkHour === 0) {
          if (checkMinute > 0) {
            secondRemindFromNow = checkMinute * 60;
          } else {
            secondRemindFromNow = 24 * 60 * 60 + (checkMinute * 60);
          }
        } else {
          checkHour = 24 - nowHour + setHour;
          if (checkMinute >= 0) {
            secondRemindFromNow = (checkMinute * 60) + (checkHour * 60 * 60);
          } else {
            secondRemindFromNow = ((setMinute + 60 - nowMinute) * 60) + ((checkHour - 1) * 60 * 60);
          }
        }
      }
      return secondRemindFromNow;
    },
    getDifferenceDate: function(firstDate, secondDate, returnType) {
      var arr, days, differenceDate, hour, minute, msFirstDate, msPerDay, msSecondDate;
      if (typeof firstDate === 'string') {
        arr = firstDate.split(/[-]/);
        firstDate = new Date(arr[0], arr[1] - 1, arr[2]);
      }
      if (typeof secondDate === 'string') {
        arr = secondDate.split(/[-]/);
        secondDate = new Date(arr[0], arr[1] - 1, arr[2]);
      }
      msPerDay = 24 * 60 * 60 * 1000;
      msFirstDate = firstDate.getTime();
      msSecondDate = secondDate.getTime();
      differenceDate = Math.abs(msFirstDate - msSecondDate);
      switch (returnType) {
        case 'date':
          days = Math.round(differenceDate / msPerDay);
          console.log('Difference days ' + days);
          return days;
        case 'hour':
          hour = Math.round(differenceDate / (60 * 60 * 1000));
          console.log('Difference hours ' + hour);
          return hour;
        case 'minute':
          minute = Math.round(differenceDate / (60 * 1000));
          console.log(' Difference minutes ' + minute);
          return minute;
      }
    },
    getMinuteNow: function() {
      var minute;
      minute = new Date().getMinutes();
      minute = minute < 10 ? '0' + minute : minute;
      return minute;
    },
    getHourNow: function() {
      var hour;
      hour = new Date().getHours();
      hour = hour < 10 ? '0' + hour : hour;
      return hour;
    },
    getDateNow: function() {
      var date;
      date = new Date().getDate();
      date = date < 10 ? '0' + date : date;
      return date;
    },
    getMonthNow: function() {
      var month;
      month = new Date().getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      return month;
    },
    getYearNow: function() {
      return new Date().getFullYear();
    },
    getDay: function() {
      return new Date().getDay();
    },
    sundayRemind: function(date) {
      var atTime, day, sunday;
      day = date.getDay();
      atTime = date.getTime();
      switch (day) {
        case 0:
          sunday = new Date(atTime);
          break;
        case 1:
          sunday = new Date(atTime + 6 * 24 * 60 * 60 * 1000);
          break;
        case 2:
          sunday = new Date(atTime + 5 * 24 * 60 * 60 * 1000);
          break;
        case 3:
          sunday = new Date(atTime + 4 * 24 * 60 * 60 * 1000);
          break;
        case 4:
          sunday = new Date(atTime + 3 * 24 * 60 * 60 * 1000);
          break;
        case 5:
          sunday = new Date(atTime + 2 * 24 * 60 * 60 * 1000);
          break;
        case 6:
          sunday = new Date(atTime + 1 * 24 * 60 * 60 * 1000);
      }
      return sunday;
    },
    dateRemind: function(second) {
      var date, now;
      now = new Date().getTime();
      second = parseInt(second);
      date = new Date(now + second * 1000);
      return date;
    },
    changeTimeAP: function(HHmm) {
      var hour, min, returnVal, suffex;
      hour = parseInt(HHmm.substr(0, 2));
      min = parseInt(HHmm.substr(3, 2));
      min = (min < 10 ? "0" + min : min);
      suffex = (hour >= 12 ? " PM" : " AM");
      hour = (hour + 11) % 12 + 1;
      returnVal = hour + ":" + min + suffex;
      return returnVal;
    },
    sortDateListASC: function(date1, date2) {
      if (date1 > date2) {
        return 1;
      }
      if (date1 < date2) {
        return -1;
      }
      return 0;
    },
    sortDateListDESC: function(date1, date2) {
      if (date1 > date2) {
        return -1;
      }
      if (date1 < date2) {
        return 1;
      }
      return 0;
    },
    dateToString: function(date) {
      var d, hour, minute, month, second, year;
      year = date.getFullYear();
      month = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1;
      d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return year + '-' + month + '-' + d + ' ' + hour + ':' + minute + ':' + second;
    },
    checkBadge: function(action, callback, falseFunction) {
      var model;
      model = UserData.addToken({});
      return GigyaService.getChallenge(model).then(function(data) {
        var result;
        result = _.find(data.badges, function(badge) {
          return (badge.id === action) && (badge.count > 0);
        });
        mconsole.log('Check badget success', result);
        if (result === undefined) {
          if (callback != null) {
            return callback();
          }
        } else {
          if (falseFunction != null) {
            return falseFunction();
          }
        }
      }, function(err) {
        return mconsole.log('Check badget fail');
      });
    },
    removeGroupOfStorage: function(group) {
      var item, _i, _len, _ref, _results;
      _ref = localStorageService.keys();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (item.indexOf(group) === 0) {
          _results.push(localStorageService.remove(item));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    showPopup: function(elm) {
      $('#inner').addClass('show-popup');
      return $(elm).removeClass('hidden');
    },
    preLoadData: function() {
      var model;
      mconsole.log('preLoadData');
      if (localStorageService.get('hasJoinedATeam') === 'true') {
        model = UserData.addToken({});
        AccountService.viewTeam(model);
      }
      model = {
        'start-date': '2014-01-01',
        'end-date': '2014-12-31'
      };
      model = UserData.addToken(model);
      BadgeService.getTimeline(model);
      model = UserData.addToken({});
      return BadgeService.getChallenge(model);
    },
    preloadData: function() {
      var endDate, model, startDate;
      mconsole.log('preLoadData');
      if (localStorageService.get('hasJoinedATeam') === 'true') {
        model = UserData.addToken({});
        AccountService.viewTeam(model);
      }
      if (localStorageService.get('dateJourney') != null) {
        startDate = moment(localStorageService.get('dateJourney'), 'YYYY-MM-DD HH:mm:ss');
      } else {
        startDate = moment();
      }
      endDate = moment().add('months', 6);
      model = {
        'start-date': startDate.format('YYYY-MM-DD'),
        'end-date': endDate.format('YYYY-MM-DD')
      };
      model = UserData.addToken(model);
      BadgeService.getTimeline(model);
      model = UserData.addToken({});
      return BadgeService.getChallenge(model);
    }
  };
});

angular.module('site').factory('utils', function(CONSTANTS) {
  return {
    compareVersionNumbers: function(v1, v2) {
      var i, v1parts, v2parts, validateParts;
      validateParts = function(parts) {
        var i;
        i = 0;
        while (i < parts.length) {
          if (!isPositiveInteger(parts[i])) {
            return false;
          }
          ++i;
        }
        return true;
      };
      v1parts = v1.split('.');
      v2parts = v2.split('.');
      if (!validateParts(v1parts) || !validateParts(v2parts)) {
        return NaN;
      }
      i = 0;
      while (i < v1parts.length) {
        if (v2parts.length === i) {
          return 1;
        }
        if (v1parts[i] === v2parts[i]) {
          continue;
        }
        if (v1parts[i] > v2parts[i]) {
          return 1;
        }
        return -1;
        ++i;
      }
      if (v1parts.length !== v2parts.length) {
        return -1;
      }
      return 0;
    }
  };
});

//# sourceMappingURL=utils.js.map

'use strict';
angular.module('site').factory('FacebookService', function($q, CONSTANTS, localStorageService) {
  var fb;
  if (typeof openFB === 'undefined') {
    throw 'openFB is undefined, FacebookService can not work.';
  } else {
    openFB.init({
      appId: CONSTANTS.FACEBOOK_ID
    });
  }
  fb = {};
  fb.login = function() {
    var deferred;
    deferred = $q.defer();
    openFB.login(function(response) {
      return deferred.resolve(response);
    }, {
      scope: 'email,read_stream,publish_stream'
    });
    return deferred.promise;
  };
  fb.getLoginStatus = function() {
    var deferred;
    deferred = $q.defer();
    openFB.getLoginStatus(function(response) {
      return deferred.resolve(response);
    });
    return deferred.promise;
  };
  fb.getInfo = function() {
    var deferred;
    deferred = $q.defer();
    openFB.api({
      path: '/me',
      success: function(data) {
        return deferred.resolve(data);
      },
      error: this.errorHandler
    });
    return deferred.promise;
  };
  fb.share = function(messageData) {
    var deferred;
    deferred = $q.defer();
    openFB.api({
      method: 'POST',
      path: '/me/feed',
      params: {
        message: messageData
      },
      success: function() {
        return deferred.resolve({
          status: 0,
          message: 'The item was posted on Facebook'
        });
      },
      error: this.errorHandler
    });
    return deferred.promise;
  };
  fb.shareWithDetails = function(params) {
    var deferred;
    deferred = $q.defer();
    openFB.api({
      method: 'POST',
      path: '/me/feed',
      params: params,
      success: function(data) {
        return deferred.resolve({
          status: 0,
          data: data,
          message: 'The item was posted on Facebook'
        });
      },
      error: this.errorHandler
    });
    return deferred.promise;
  };
  fb.shareByPopup = function(params) {
    var deferred;
    deferred = $q.defer();
    openFB.get({
      method: 'GET',
      path: '/dialog/feed',
      params: params,
      success: function(data) {
        return deferred.resolve({
          status: 0,
          data: data,
          message: 'The item was posted on Facebook'
        });
      },
      error: this.errorHandler
    });
    return deferred.promise;
  };
  fb.revoke = function() {
    var deferred;
    deferred = $q.defer();
    openFB.revokePermissions(function() {
      return deferred.resolve({
        status: 0,
        message: 'Permissions revoked'
      });
    }, this.errorHandler);
    return deferred.promise;
  };
  fb.logout = function() {
    var deferred;
    deferred = $q.defer();
    openFB.logout(function() {
      return deferred.resolve({
        status: 0,
        message: 'Logout successful'
      });
    }, this.errorHandler);
    return deferred.promise;
  };
  fb.errorHandler = function(error) {
    throw error;
    return {
      status: -1,
      err: err
    };
  };
  return fb;
});

//# sourceMappingURL=facebook-service.js.map

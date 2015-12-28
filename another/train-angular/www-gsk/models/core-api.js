'use strict';
angular.module('site').factory('CoreAPI', function($timeout, Settings, Device, PhoneGapNetworkService, $q, CONSTANTS, localStorageService) {
  var fs, getStoreKey, toQueryString;
  toQueryString = function(obj) {
    var i, parts;
    parts = [];
    for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
      }
    }
    return parts.join("&");
  };
  getStoreKey = function(nameSpace, functionName, args) {
    var key, queryString;
    queryString = toQueryString(args);
    key = nameSpace + '.' + functionName + '[' + queryString + ']';
    return key;
  };
  fs = {};
  fs.request = function(resource, nameSpace, functionName, args) {
    var deferred, err, rData, storeKey;
    deferred = $q.defer();
    storeKey = 'ServiceData.' + getStoreKey(nameSpace, functionName, args);
    if (PhoneGapNetworkService.isInternetAccess()) {
      resource[functionName](args).$promise.then(function(result) {
        mconsole.log('CoreAPI.request', result);
        if (!((result.type != null) && result.type === 'ERROR')) {
          localStorageService.set(storeKey, result);
        }
        return deferred.resolve(result);
      }, function(err) {
        mconsole.log('CoreAPI.request err', err);
        return deferred.reject(err);
      });
    } else {
      rData = localStorageService.get(storeKey);
      if (rData != null) {
        deferred.resolve(rData);
      } else {
        err = {
          type: Settings.type.error,
          message: Settings.message.noConnections
        };
        deferred.reject(err);
      }
    }
    return deferred.promise;
  };
  fs.init = function(resource, nameSpace, functionList) {
    var inteface;
    inteface = {};
    $.each(functionList, function(i, item) {
      return inteface[item] = function(model) {
        return fs.request(resource, nameSpace, item, model);
      };
    });
    return inteface;
  };
  fs.requestWithOption = function(resource, nameSpace, option, args) {
    var deferred, err, isReturned, rData, storeKey;
    deferred = $q.defer();
    storeKey = 'ServiceData.' + getStoreKey(nameSpace, option.functionName, args);
    isReturned = false;
    if (PhoneGapNetworkService.isInternetAccess()) {
      rData = localStorageService.get(storeKey);
      if ((rData != null) && (option.isCache === true)) {
        isReturned = true;
        deferred.resolve(rData);
      }
      resource[option.functionName](args).$promise.then(function(result) {
        if (!((result.type != null) && result.type === 'ERROR')) {
          localStorageService.set(storeKey, result);
        }
        if (!isReturned) {
          return deferred.resolve(result);
        }
      }, function(err) {
        return deferred.reject(err);
      });
    } else {
      rData = localStorageService.get(storeKey);
      if (rData != null) {
        deferred.resolve(rData);
      } else {
        err = {
          type: Settings.type.error,
          message: Settings.message.noConnections
        };
        deferred.reject(err);
      }
    }
    return deferred.promise;
  };
  fs.initWithOption = function(resource, nameSpace, optionList) {
    var inteface;
    inteface = {};
    $.each(optionList, function(i, item) {
      return inteface[item.functionName] = function(model) {
        return fs.requestWithOption(resource, nameSpace, item, model);
      };
    });
    return inteface;
  };
  return fs;
});

//# sourceMappingURL=core-api.js.map

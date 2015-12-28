'use strict';
angular.module('site').factory('UserData', function(localStorageService) {
  var cons;
  cons = {
    tour: 'theTourHasFinised',
    token: 'accessToken',
    profile: 'userProfile'
  };
  return {
    setToken: function(token) {
      localStorageService.set(cons.token, token);
    },
    getToken: function() {
      return localStorageService.get(cons.token);
    },
    getAccessToken: function() {
      return localStorageService.get(cons.token);
    },
    addToken: function(model) {
      model['user-token'] = localStorageService.get(cons.token);
      model['device-uid'] = localStorage.getItem('deviceUID');
      model['lang-code'] = 'en_US';
      return model;
    },
    current: function() {
      return localStorageService.get('userProfile');
    },
    setProfile: function(profile) {
      localStorageService.set(cons.profile, profile);
    },
    getProfile: function() {
      return localStorageService.get(cons.profile);
    },
    setTour: function() {
      localStorageService.set(cons.tour, true);
    },
    getTour: function() {
      return localStorageService.get(cons.tour);
    }
  };
});

//# sourceMappingURL=user-data.js.map

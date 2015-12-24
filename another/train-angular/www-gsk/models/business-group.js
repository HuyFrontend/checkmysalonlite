'use strict';
angular.module('site').factory('BusinessGroup', function(UserData, QuitPointService, Utils, Device, QuitTeamService, localStorageService) {
  var f, leaveTeam, restartJourney;
  f = {};
  leaveTeam = function() {
    var model;
    model = UserData.addToken({});
    QuitTeamService.leaveTeam(model).then(function(data) {
      localStorageService.set('hasJoinedATeam', 'false');
    }, function(err) {
      Device.alert(err.message, null, 'Error', 'Done');
    });
  };
  restartJourney = function(callback) {
    var isRequesting, model;
    mconsole.log('restartJourney');
    if (isRequesting) {
      return;
    }
    isRequesting = true;
    Utils.showLoading();
    model = UserData.addToken({});
    return QuitPointService.restartJourney(model).then(function(data) {
      if (data.type === 'SUCCESS') {
        localStorageService.set('isJourneyStarted', 'false');
        leaveTeam();
        if (callback != null) {
          callback();
        }
      } else {
        Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
      }
      isRequesting = false;
      return Utils.hideLoading();
    }, function(err) {
      mconsole.log('restartJourney err', err);
      Device.alert(Settings.error.cannotConnectToServer, null, 'Error', 'Done');
      isRequesting = false;
      return Utils.hideLoading();
    });
  };
  f.restartJourney = function(callback) {
    return restartJourney(callback);
  };
  return f;
});

//# sourceMappingURL=business-group.js.map

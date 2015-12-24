'use strict';
angular.module("site").factory("QuitTeamService", function(CoreAPI, $resource, CONSTANTS, localStorageService) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd/:_id', {}, {
    joinTeam: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'join-team.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    leaveTeam: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'leave-team.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    sayCheers: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'activity-user.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    getChallengesTop: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'challenges-top.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    viewActivityMember: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'view-member-activity.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  });
  fList = ['joinTeam', 'leaveTeam', 'sayCheers', 'getChallengesTop', 'viewActivityMember'];
  return CoreAPI.init(resource, 'QuitTeamService', fList);
});

//# sourceMappingURL=quitteam-service.js.map

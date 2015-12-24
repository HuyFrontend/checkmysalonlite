'use strict';
angular.module("site").factory("AccountService", function(CoreAPI, $resource, CONSTANTS, localStorageService) {
  var fList, resource;
  resource = $resource(CONSTANTS.API_PATH + '/:cmd/:_id', {}, {
    signIn: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'sign-in.html'
      },
      headers: {
        'Content-Type': 'text/plain'
      }
    },
    signUp: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'sign-up.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getAccountSetting: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'getAccountSetting'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    postAccountSetting: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'postAccountSetting'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    viewAccountSetting: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'view-account-setting.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    updateAccountSetting: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'update-account-setting.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    viewMember: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'view-team-member.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    viewTeam: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'view-team.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    postActivityToTeam: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'postActivityToTeam.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    postActivityToMember: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'postActivityToMember.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getFirstHabit: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-first-habit.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getNextHabit: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-next-habit.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    postRemindStartJourney: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'reminder-journey.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    myOldHabit: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-old-habit.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    changePass: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'change-password.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    forgotPass: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'forgot-password.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    forgotUsername: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'forgot-username.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getAllHabit: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-all-habit.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    updateHabit: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'update-habit.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getFirstHabitSignUp: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-first-habit-signup.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getNextHabitSignUp: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-next-habit-signup.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    buyAvatar: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'buy-avatar.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    getPersonalChallenges: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'get-category-challenge.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    },
    postPersonalChallenges: {
      method: 'POST',
      isArray: false,
      params: {
        cmd: 'add-personal-challenge.html'
      },
      headers: {
        'Content-type': 'text/plain'
      }
    }
  });
  fList = [
    {
      functionName: 'signIn',
      isCache: false
    }, {
      functionName: 'signUp',
      isCache: false
    }, {
      functionName: 'getAccountSetting',
      isCache: false
    }, {
      functionName: 'postAccountSetting',
      isCache: false
    }, {
      functionName: 'viewAccountSetting',
      isCache: false
    }, {
      functionName: 'updateAccountSetting',
      isCache: false
    }, {
      functionName: 'viewMember',
      isCache: true
    }, {
      functionName: 'viewTeam',
      isCache: true
    }, {
      functionName: 'postActivityToTeam',
      isCache: false
    }, {
      functionName: 'postActivityToMember',
      isCache: false
    }, {
      functionName: 'getFirstHabit',
      isCache: false
    }, {
      functionName: 'getNextHabit',
      isCache: false
    }, {
      functionName: 'postRemindStartJourney',
      isCache: false
    }, {
      functionName: 'myOldHabit',
      isCache: false
    }, {
      functionName: 'changePass',
      isCache: false
    }, {
      functionName: 'forgotPass',
      isCache: false
    }, {
      functionName: 'forgotUsername',
      isCache: false
    }, {
      functionName: 'getAllHabit',
      isCache: false
    }, {
      functionName: 'updateHabit',
      isCache: false
    }, {
      functionName: 'getFirstHabitSignUp',
      isCache: false
    }, {
      functionName: 'getNextHabitSignUp',
      isCache: false
    }, {
      functionName: 'buyAvatar',
      isCache: false
    }, {
      functionName: 'getPersonalChallenges',
      isCache: false
    }, {
      functionName: 'postPersonalChallenges',
      isCache: false
    }
  ];
  return CoreAPI.initWithOption(resource, 'AccountService', fList);
});

//# sourceMappingURL=account-service.js.map

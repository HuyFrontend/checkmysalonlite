'use strict';
angular.module('site.test', []).config(function($routeProvider) {
  return $routeProvider.when('/test/api', {
    controller: 'testApiCtrl',
    templateUrl: 'views/test/index.jade'
  });
}).controller('testApiCtrl', function($scope, $rootScope, UserData, AccountService, FeedbackService, LandingService, ProductService, QuitPointService, QuitTeamService) {
  var functions, start;
  gsk.log('testApiCtrl', 'arg2');
  $rootScope.header = {
    pageTitle: 'Test API'
  };
  functions = {};
  functions.signIn = function() {
    var model;
    model = {
      email: "test@sutrixmedia.com",
      password: "123456",
      "remember-me": true,
      'device': {
        'uid': localStorage.getItem('deviceUID'),
        'token': localStorage.getItem('deviceToken'),
        'os': localStorage.getItem('deviceOS')
      }
    };
    return AccountService.signIn(model).then(function(data) {
      gsk.log('AccountService.signIn');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.signIn');
      return gsk.log('err', err);
    });
  };
  functions.signUp = function() {
    var model;
    model = {
      name: "test",
      email: "test@sutrixmedia.com",
      password: "123456",
      age: "19",
      gender: "MALE",
      country: "VN",
      "progress-update-time": {
        type: "DAILY",
        time: "12:00:00"
      },
      avatar: "",
      language: "12345",
      "app-reference": "",
      "receive-offer": false
    };
    return AccountService.signUp(model).then(function(data) {
      gsk.log('AccountService.signUp');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.signUp');
      return gsk.log('err', err);
    });
  };
  functions.getAccountSetting = function() {
    var model;
    model = UserData.addToken({});
    return AccountService.getAccountSetting(model).then(function(data) {
      gsk.log('AccountService.getAccountSetting');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.getAccountSetting');
      return gsk.log('err', err);
    });
  };
  functions.postAccountSetting = function() {
    var model;
    model = UserData.addToken({});
    return AccountService.postAccountSetting(model).then(function(data) {
      gsk.log('AccountService.postAccountSetting');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.postAccountSetting');
      return gsk.log('err', err);
    });
  };
  functions.viewAccountSetting = function() {
    var model;
    model = UserData.addToken({});
    return AccountService.viewAccountSetting(model).then(function(data) {
      gsk.log('AccountService.viewAccountSetting');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      return gsk.log('err', err);
    });
  };
  functions.updateAccountSetting = function() {
    var model;
    model = {
      email: "test.phuong1234@sutrixmedia.com",
      name: "test",
      age: 19,
      gender: "MALE",
      country: "VN",
      language: "12345",
      "progress-update-time": {
        type: "DAILY",
        time: "12:00:00"
      },
      avartar: "//phuong",
      "app-reference": "phongvan",
      password: "123456"
    };
    model = UserData.addToken(model);
    return AccountService.updateAccountSetting(model).then(function(data) {
      gsk.log('AccountService.updateAccountSetting');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.updateAccountSetting');
      return gsk.log('err', err);
    });
  };
  functions.viewMember = function() {
    var model;
    model = UserData.addToken({});
    return AccountService.viewMember(model).then(function(data) {
      gsk.log('AccountService.viewMember');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.viewMember');
      return gsk.log('err', err);
    });
  };
  functions.viewTeam = function() {
    var model;
    model = UserData.addToken({});
    return AccountService.viewTeam(model).then(function(data) {
      return gsk.log('AccountService.viewTeam');
    }, function(err) {
      gsk.log('AccountService.viewTeam');
      return gsk.log('err', err);
    });
  };
  functions.postActivityToTeam = function() {
    var model;
    model = {
      "customer-id": "1",
      "team-id": "1",
      "activity-type": "cheers",
      "activity-value": "what the fuck",
      "text": "fdsfddsf",
      "cheer-icon": "url path"
    };
    model = UserData.addToken(model);
    return AccountService.postActivityToTeam(model).then(function(data) {
      gsk.log('AccountService.postActivityToTeam');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.postActivityToTeam');
      return gsk.log('err', err);
    });
  };
  functions.postActivityToMember = function() {
    var model;
    model = {
      "customer-id": "1",
      "message-to": "1",
      "activity-type": "cheers",
      "activity-value": "what the fuck",
      "text": "fdsfddsf",
      "cheer-icon": "url path"
    };
    model = UserData.addToken(model);
    return AccountService.postActivityToMember(model).then(function(data) {
      gsk.log('AccountService.postActivityToMember');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.postActivityToMember');
      return gsk.log('err', err);
    });
  };
  functions.getFirstHabit = function() {
    var model;
    model = {
      "first-habit-path": "/content/en_US/habit/habit-1"
    };
    model = UserData.addToken(model);
    return AccountService.getFirstHabit(model).then(function(data) {
      gsk.log('AccountService.getFirstHabit');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.getFirstHabit');
      return gsk.log('err', err);
    });
  };
  functions.getNextHabit = function() {
    var model;
    model = {
      "refer-question": "/content/en_US/habit/habit-2",
      "refer-answer": "/content/en_US/habit/habit-2",
      "answer": "/content/en_US/habit/habit-1/jcr:content/par/habitmessageanswer"
    };
    model = UserData.addToken(model);
    return AccountService.getNextHabit(model).then(function(data) {
      gsk.log('AccountService.getNextHabit');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('AccountService.getNextHabit');
      return gsk.log('err', err);
    });
  };
  functions.give = function() {
    var model;
    model = {
      "text": "I think it's ok"
    };
    model = UserData.addToken(model);
    return FeedbackService.give(model).then(function(data) {
      gsk.log('FeedbackService.give');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('FeedbackService.give');
      return gsk.log('err', err);
    });
  };
  functions.addSlip = function() {
    var model;
    model = UserData.addToken({});
    return LandingService.addSlip(model).then(function(data) {
      gsk.log('LandingService.addSlip');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('LandingService.addSlip');
      return gsk.log('err', err);
    });
  };
  functions.getMotivation = function() {
    var model;
    model = {
      "motivation-path": "/content/en_US/motivation/motivations"
    };
    model = UserData.addToken(model);
    return LandingService.getMotivation(model).then(function(data) {
      gsk.log('LandingService.getMotivation');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('LandingService.getMotivation');
      return gsk.log('err', err);
    });
  };
  functions.getProduct = function() {
    var model;
    model = {
      "product-path": "/content/en_US/product/patch"
    };
    model = UserData.addToken(model);
    return ProductService.getProduct(model).then(function(data) {
      gsk.log('ProductService.getProduct');
      gsk.log('model', model);
      return gsk.log('result', data);
    }, function(err) {
      gsk.log('ProductService.getProduct');
      return gsk.log('err', err);
    });
  };
  functions.createCoupon = function() {
    var model;
    model = UserData.addToken({});
    return QuitPointService.createCoupon(model).then(function(data) {
      gsk.log('QuitPointService.createCoupon');
      gsk.log('model', model);
      return gsk.log('data', data);
    }, function(err) {
      gsk.log('QuitPointService.createCoupon');
      return gsk.log('err', err);
    });
  };
  functions.joinTeam = function() {
    var model;
    model = UserData.addToken({});
    return QuitTeamService.joinTeam(model).then(function(data) {
      gsk.log('QuitTeamService.joinTeam');
      gsk.log('model', model);
      return gsk.log('data', data);
    }, function(err) {
      gsk.log('QuitTeamService.joinTeam');
      return gsk.log('err', err);
    });
  };
  functions.leaveTeam = function() {
    var model;
    model = UserData.addToken({});
    return QuitTeamService.leaveTeam(model).then(function(data) {
      gsk.log('QuitTeamService.leaveTeam');
      gsk.log('model', model);
      return gsk.log('data', data);
    }, function(err) {
      gsk.log('QuitTeamService.leaveTeam');
      return gsk.log('err', err);
    });
  };
  start = function() {
    var item, _results;
    _results = [];
    for (item in functions) {
      _results.push(functions[item]());
    }
    return _results;
  };
  start();
  return $scope.start = function() {
    gsk.log('----------------$scope.start----------------');
    return start();
  };
});

//# sourceMappingURL=index.js.map

'use strict';
angular.module('site').factory('BadgeService', function(CONSTANTS, $q, GigyaService, UserData) {
  var assignToLeft, badgeData, pFunctions;
  badgeData = LOCAL.badges;
  pFunctions = {};
  assignToLeft = _.partialRight(_.assign, function(a, b) {
    if (typeof a === 'undefined') {
      return b;
    } else {
      return a;
    }
  });
  pFunctions.getLocalDetailBadge = function(action) {
    var badge, source;
    source = _.find(badgeData, {
      id: action
    });
    if (!source) {
      return {};
    }
    badge = _.clone(source);
    badge.imgURL = CONSTANTS.BADGE_PATH + (badge.imgURL || '');
    badge.thumbPath = CONSTANTS.BADGE_PATH + (badge.thumbPath || '');
    return badge;
  };
  pFunctions.getLocalAllBadge = function() {
    return badgeData;
  };
  pFunctions.addAction = function(action) {
    var model;
    model = {
      action: action
    };
    model = UserData.addToken(model);
    return GigyaService.addBadge(model);
  };
  pFunctions.getDetailBadge = function(model) {
    var deferred;
    deferred = $q.defer();
    GigyaService.getBadgeDetail(model).then(function(data) {
      var nData;
      nData = assignToLeft(data, pFunctions.getLocalDetailBadge(data.id));
      return deferred.resolve(nData);
    }, function(err) {
      return deferred.reject(err);
    });
    return deferred.promise;
  };
  pFunctions.getChallenge = function(model) {
    var deferred;
    deferred = $q.defer();
    GigyaService.getChallenge(model).then(function(data) {
      var badgeList;
      $.each(data.badges, function(i, item) {
        return item = assignToLeft(item, pFunctions.getLocalDetailBadge(item.id));
      });
      badgeList = _.sortBy(data.badges, function(item) {
        return item.order;
      });
      return deferred.resolve(badgeList);
    }, function(err) {
      return deferred.reject(err);
    });
    return deferred.promise;
  };
  pFunctions.getChallengesTop = function(model) {
    var deferred;
    deferred = $q.defer();
    GigyaService.getChallengesTop(model).then(function(data) {
      var badgeList;
      $.each(data.badges, function(i, item) {
        return item = assignToLeft(item, pFunctions.getLocalDetailBadge(item.id));
      });
      badgeList = _.sortBy(data.badges, function(item) {
        return item.order;
      });
      return deferred.resolve(badgeList);
    }, function(err) {
      return deferred.reject(err);
    });
    return deferred.promise;
  };
  pFunctions.getTimeline = function(model) {
    var deferred;
    deferred = $q.defer();
    GigyaService.getTimeline(model).then(function(data) {
      $.each(data.badges, function(i, item) {
        return item = assignToLeft(item, pFunctions.getLocalDetailBadge(item.id));
      });
      data.badges = _.sortBy(data.badges, function(item) {
        return item.order;
      });
      $.each(data['personal-challenges'], function(i, item) {
        return item = assignToLeft(item, pFunctions.getLocalDetailBadge(item.id));
      });
      data['personal-challenges'] = _.sortBy(data['personal-challenges'], function(item) {
        return item.order;
      });
      return deferred.resolve(data);
    }, function(err) {
      return deferred.reject(err);
    });
    return deferred.promise;
  };
  return pFunctions;
});

//# sourceMappingURL=badge-service.js.map

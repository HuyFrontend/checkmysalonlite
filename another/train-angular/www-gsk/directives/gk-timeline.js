angular.module('site').directive('gkTimeline', function(GigyaService, UserData, $rootScope, $swipe, $compile, $window, $document, $timeout, $location, OverlayService, Utils) {
  return {
    restrict: 'A',
    compile: function($scope, $element, $attrs) {
      return function($scope, $element, $attrs) {
        var AddBadgeBtn, ArrowBtn, CommonData, CurrentBtn, CurrentDate, DayLine, JourneyDesc, Main, ProgressBar, SelectedDate, Swipe, TabNav, TabPane, TabTimeline, Timeline, WeekTimeline, Window, arrowTimelime, badgeReview, btnAddBadge, btnTimeline, childrenOfClock, childrenOfNav, childrenOfSlide, clockBlock, dayLine, documentMouseUpEvent, elementW, filterByDate, hasDDD, hmListener, is3dAvailable, isInJourney, isOverlayAvaiable, journey, journeys, lastPos, m, moveTop, navButtons, offset, paneTabs, progressBar, scroll, startPos, swipeEnd, swipeMove, swipeStart, tabContent, tabTimeline, textCategory, timelineData, timelineLimit, transformProperty, translatePos, ulW, windowW;
        mconsole.log('gkTimeline compile');
        timelineLimit = {};
        $rootScope.timelinePage = {
          tabTimeline: true
        };
        timelineData = {
          oldest: moment(),
          newest: moment()
        };
        journey = {
          started: moment().add('days', -16),
          stopped: moment().add('days', -9)
        };
        m = moment();
        journeys = [
          {
            start: moment().add('days', -80),
            end: moment().add('days', -50)
          }, {
            start: moment().add('days', -40),
            end: moment().add('days', -25)
          }, {
            start: moment().add('days', -20),
            end: moment().add('days', -12)
          }, {
            start: moment().add('days', -8),
            end: moment()
          }
        ];
        isInJourney = function(date) {
          var item, _i, _len;
          for (_i = 0, _len = journeys.length; _i < _len; _i++) {
            item = journeys[_i];
            if (item.start.format('YYYYMMDD') === date.format('YYYYMMDD')) {
              return 1;
            }
            if (item.end.format('YYYYMMDD') === date.format('YYYYMMDD')) {
              return 2;
            }
            if ((item.start.format('YYYYMMDD') <= date.format('YYYYMMDD')) && (date.format('YYYYMMDD') <= item.end.format('YYYYMMDD'))) {
              return true;
            }
          }
          return false;
        };
        btnAddBadge = $('.add-badge');
        tabTimeline = $('.tabs-timeline');
        arrowTimelime = tabTimeline.find('.arrow-top');
        childrenOfNav = $('.nav-tabs').children();
        navButtons = $('.nav-button');
        childrenOfSlide = $('.slide').children();
        textCategory = $('.text-category');
        tabContent = $('.tab-content');
        paneTabs = $('.tab-pane');
        clockBlock = $('.clock-block');
        childrenOfClock = clockBlock.find('li');
        badgeReview = $('.badge-review');
        btnTimeline = $('.btn-timeline');
        dayLine = $('.dayline');
        progressBar = $('.progress-bar');
        moveTop = -1;
        isOverlayAvaiable = false;
        elementW = parseInt($attrs.elementW) || 128;
        offset = {
          left: parseInt($attrs.offsetLeft) || 0,
          right: parseInt($attrs.offsetRight) || 0
        };
        translatePos = 0;
        lastPos = void 0;
        startPos = 0;
        ulW = $('ul', $element).width();
        windowW = $(window).width();
        $rootScope.$on('overlay-started', function() {
          mconsole.log('overlay-started');
          return isOverlayAvaiable = true;
        });
        $rootScope.$on('overlay-has-finished', function() {
          mconsole.log('overlay-has-finished');
          return isOverlayAvaiable = false;
        });
        documentMouseUpEvent = function(event) {
          var swipeMoved;
          swipeMoved = true;
          swipeEnd({
            x: event.clientX,
            y: event.clientY
          }, event);
        };
        transformProperty = 'transform';
        ['webkit', 'Moz', 'O', 'ms'].every(function(prefix) {
          var e;
          e = prefix + 'Transform';
          if (typeof document.body.style[e] !== 'undefined') {
            transformProperty = e;
            return false;
          }
          return true;
        });
        hasDDD = function() {
          var el, has3d, t, transforms;
          el = document.createElement('p');
          has3d = void 0;
          transforms = {
            webkitTransform: '-webkit-transform',
            OTransform: '-o-transform',
            msTransform: '-ms-transform',
            MozTransform: '-moz-transform',
            transform: 'transform'
          };
          document.body.insertBefore(el, null);
          for (t in transforms) {
            if (el.style[t] !== undefined) {
              el.style[t] = 'translate3d(1px,1px,1px)';
              has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
          }
          document.body.removeChild(el);
          return has3d !== undefined && has3d.length > 0 && has3d !== 'none';
        };
        is3dAvailable = hasDDD();
        CommonData = {
          updateElementW: function(w) {
            return elementW = w;
          }
        };
        JourneyDesc = {
          context: $('[data-name="month-out-desc"]'),
          updateLevel1: function() {
            var end, start, text;
            start = DayLine.getCurrentJourney().start;
            end = DayLine.getCurrentJourney().end;
            text = start.format('MMMM Do, YYYY') + ' - ' + end.format('MMMM Do, YYYY');
            return JourneyDesc.context.text(text);
          },
          updateLevel2: function(date) {
            var text;
            date = date || DayLine.getCurrentJourney().start;
            text = date.format('MMMM') + ', ' + date.format('YYYY');
            return JourneyDesc.context.text(text);
          }
        };
        Main = {
          scrollTop: function(top, cback) {
            mconsole.log('Main.scrollTop');
            return $('#main').animate({
              scrollTop: top
            }, 750, cback || null);
          }
        };
        ArrowBtn = {
          context: tabTimeline.find('.arrow-top'),
          moveWithSelectedDate: function() {
            var arrowLeft, t;
            t = dayLine.find('.add-badge.active');
            if (t.length === 0) {
              return;
            }
            arrowLeft = t.offset().left;
            ArrowBtn.context.css('left', (arrowLeft + 64) + 'px');
            return ArrowBtn.updateColor();
          },
          updateColor: function(isReset) {
            mconsole.log('ArrowBtn.updateColor', isReset);
            return $timeout(function() {
              var activeItem, contextLeft, navLeft, navW;
              contextLeft = ArrowBtn.context.offset().left;
              activeItem = TabNav.context.find('.active');
              mconsole.log('ArrowBtn.updateColor()', activeItem);
              if (activeItem.length === 0) {
                ArrowBtn.context.removeClass('arrow-yellow');
                return;
              }
              navLeft = activeItem.offset().left;
              navW = activeItem.width();
              if (navLeft <= contextLeft && contextLeft <= (navLeft + navW)) {
                return ArrowBtn.context.addClass('arrow-yellow');
              } else {
                return ArrowBtn.context.removeClass('arrow-yellow');
              }
            }, 20);
          }
        };
        CurrentBtn = {
          context: $('.jump-to'),
          show: function() {
            return CurrentBtn.context.addClass('show');
          },
          hide: function() {
            return CurrentBtn.context.removeClass('show');
          },
          displayNone: function() {
            return CurrentBtn.context.find('.jump-to').css('display', 'none');
          },
          displayBlock: function() {
            return CurrentBtn.context.find('.jump-to').css('display', '');
          },
          updateStatus: function(top) {
            if (top > 140) {
              return CurrentBtn.displayNone();
            } else {
              return CurrentBtn.displayBlock();
            }
          },
          "do": function() {
            CurrentDate.scrollTo();
            $timeout(function() {
              return TabTimeline.updateStatus();
            }, 310);
            CurrentBtn.hide();
          },
          update: function() {
            if (CurrentDate.isAvailable() === false) {
              return CurrentBtn.show();
            } else {
              return CurrentBtn.hide();
            }
          }
        };
        CurrentDate = {
          context: $('.dayline').find('.current-date'),
          isAvailable: function() {
            var offsetLeft, t;
            t = dayLine.find('.current-date');
            if (t.length === 0) {
              return false;
            }
            offsetLeft = t.position().left;
            if (offsetLeft < 0 || offsetLeft >= windowW) {
              return false;
            }
            return true;
          },
          scrollTo: function() {
            var center, numberOfElement, t;
            t = dayLine.find('.current-date');
            if (t.length === 0) {
              return;
            }
            numberOfElement = t.parent().children('.past-date').length;
            center = Math.round(windowW / elementW / 2 - 1);
            translatePos = -(numberOfElement - center) * elementW;
            return scroll();
          },
          addOnClick: function() {}
        };
        SelectedDate = {
          numberOfLeft: function() {
            var t;
            t = $('.dayline').find('.add-badge.active').parent();
            return t.prevAll().length + 1;
          },
          isAvailable: function() {
            var t;
            t = $('.dayline').find('.add-badge.active');
            if (t.length > 0) {
              return true;
            }
            return false;
          },
          isOnScreen: function() {
            var curLeft, t;
            t = dayLine.find('.add-badge.active');
            if (t.length === 0) {
              return;
            }
            curLeft = t.offset().left;
            if (curLeft < 0 || curLeft >= windowW) {
              return false;
            } else {
              return true;
            }
          }
        };
        TabNav = {
          context: $('.nav-tabs'),
          activeItem: function() {
            return TabNav.context.children('.active');
          },
          clicked: function() {
            var child, typeOfPane;
            child = $(this);
            typeOfPane = child.attr('data-type');
            childrenOfNav.removeClass('active');
            $(this).addClass('active');
            textCategory.css('display', 'none');
            tabContent.css('display', 'block');
            paneTabs.css('display', 'none');
            $('.' + typeOfPane).css('display', 'block');
            $rootScope.$broadcast('pane-show-in');
            return ArrowBtn.updateColor();
          },
          init: function() {}
        };
        TabTimeline = {
          context: $('.tabs-timeline'),
          show: function() {
            return TabTimeline.context.css('min-height', '860px');
          },
          hide: function() {
            return TabTimeline.context.css('min-height', '');
          },
          updateTop: function(top) {
            return TabTimeline.context.css('top', '-890px');
          },
          resetContent: function() {
            $rootScope.personalChallenges.data = null;
            return mconsole.log('resetContent', $rootScope.personalChallenges);
          },
          updateStatus: function() {
            mconsole.log('TabTimeline.updateStatus');
            if (SelectedDate.isOnScreen()) {
              ArrowBtn.moveWithSelectedDate();
              $rootScope.timelinePage.tabTimeline = true;
            } else {
              $rootScope.timelinePage.tabTimeline = false;
            }
            mconsole.log('TabTimeline.updateStatus', $rootScope.timelinePage);
          }
        };
        TabPane = {
          context: $('.tab-pane'),
          updateW: function(w) {
            $('.tab-pane', '#hammer').css('width', w + 'px');
            return TabPane.updateChildrenW(w - 50);
          },
          updateChildrenW: function(w) {
            var ulList, width;
            width = Math.round(w / 3);
            ulList = $('.tab-pane').find('ul');
            ulList.each(function(index, item) {
              var liList;
              liList = $(item).find('li');
              $(item).css('width', (width * liList.length) + 'px');
              return liList.css('width', width + 'px');
            });
            return $timeout(function() {
              return $rootScope.$broadcast('properties_changed', width, 25, 25);
            }, 10);
          }
        };
        $scope.selectChallengeCategory = function(category) {
          mconsole.log('selectChallengeCategory', category);
          TabPane.updateW($(window).width());
          return ArrowBtn.updateColor();
        };
        WeekTimeline = {
          context: $('.week-timeline'),
          updateW: function(w) {
            return WeekTimeline.context.css('width', w + 'px');
          },
          init: function() {
            return $('[gk-timeline="gk-timeline"]').on('webKitTransitionEnd transitionend', function(event) {
              var path;
              ArrowBtn.moveWithSelectedDate();
              TabTimeline.updateStatus();
              path = $location.path();
              if (OverlayService.isShowed(path)) {
                if ($scope.jquerySelected != null) {
                  $timeout(function() {
                    $scope.jquerySelected.find('.add-badge').trigger('click');
                    return $scope.jquerySelected = null;
                  }, 150);
                }
              }
              CurrentBtn.update();
              return JourneyDesc.updateLevel1();
            });
          }
        };
        ProgressBar = {
          context: $('.progress-bar'),
          update: function(newW, oldW) {
            var items;
            items = $('.progress-bar').children();
            items.each(function(index) {
              var left, width;
              left = parseInt($(this).css('left'));
              width = parseInt($(this).css('width'));
              $(this).css('left', ((left / oldW) * newW) + 'px');
              return $(this).css('width', ((width / oldW) * newW) + 'px');
            });
            return ProgressBar.context.css('width', ulW + 'px');
          },
          addCurrentProgress: function(index, length) {
            var left, range, width;
            left = index * elementW;
            width = length * elementW - elementW / 2;
            range = $('<div class="range"><span class="arrow-range"></span><span class="shadow-range"></span></div>');
            range.css('left', left + 'px');
            range.css('width', width + 'px');
            return ProgressBar.context.append(range);
          },
          addRange: function() {
            var left, range, width;
            left = 0;
            width = elementW;
            range = $('<div class="range-past"></div>');
            range.css('left', left + 'px');
            range.css('width', width + 'px');
            return ProgressBar.context.append(range);
          },
          updatePosition: function(length) {
            var move;
            move = elementW * (length || 1);
            progressBar.find('.range').css('left', '+=' + move + 'px');
            return progressBar.find('.range-past').css('left', '+=' + move + 'px');
          },
          addCurrentJourney: function(journey) {
            var end, start;
            start = DayLine.getLeft(journey.start);
            end = DayLine.getLeft(journey.end);
            return ProgressBar.addCurrentProgress(start, end - start + 1);
          }
        };
        Timeline = {
          init: function() {
            DayLine.init();
            WeekTimeline.init();
            CurrentBtn.context.bind('click', CurrentBtn["do"]);
            TabNav.init();
            Window.resize();
            $(window).on('orientationchange', function() {
              if ($rootScope.isOverlayShowing) {
                return;
              }
              return Window.resize();
            });
            if (!window.isWebView()) {
              $(window).on('resize', Window.resize);
            }
            return $timeout(function() {
              return $('#main').bind('scroll', function() {
                var top;
                mconsole.log('#main is scrolling');
                top = $('#main').scrollTop();
                return CurrentBtn.updateStatus(top);
              });
            }, 1000);
          }
        };
        Swipe = {
          start: function() {
            mconsole.log('Swipe start');
            return $('[gk-timeline="gk-timeline"]').addClass('remove-transition');
          },
          move: function() {
            return mconsole.log('Swipe move');
          },
          end: function() {
            $('[gk-timeline="gk-timeline"]').removeClass('remove-transition');
            CurrentBtn.update();
            TabTimeline.updateStatus();
            return JourneyDesc.updateLevel1();
          }
        };
        Window = {
          updateMinH: function(h) {
            return $('body').css('min-height', h + 'px');
          },
          resize: function() {
            moveTop = -1;
            windowW = $(window).width();
            WeekTimeline.updateW(windowW);
            TabPane.updateW(windowW);
            Window.updateMinH($(window).height());
            DayLine.scrollToSelectedDate();
            DayLine.addRightElement();
            return TabTimeline.updateStatus();
          }
        };
        AddBadgeBtn = {
          clicked: function() {
            return $scope.addPersonalChallenge($(this).parents('li').data("date"));
          }
        };
        DayLine = {
          context: $('.dayline'),
          addFutureItems: function() {
            var i, max, p, restInLeft, _results;
            max = Math.round(windowW / elementW) + 4;
            restInLeft = ulW - windowW - Math.abs(translatePos);
            p = restInLeft / elementW;
            i = p;
            _results = [];
            while (i < max) {
              DayLine.futureItem();
              _results.push(i++);
            }
            return _results;
          },
          addPastItems: function() {
            var i, max, p, restInRight, _results;
            max = Math.round(windowW / elementW) + 4;
            restInRight = Math.abs(translatePos);
            p = restInRight / elementW;
            i = p;
            _results = [];
            while (i < max) {
              DayLine.pastItem();
              _results.push(i++);
            }
            return _results;
          },
          getLeft: function(date) {
            var e;
            e = $('[data-date=' + date.format('YYYYMMDD') + ']', DayLine.context);
            return e.prevAll().length;
          },
          getCurrentJourney: function() {
            var first, firstDate, last, lastDate;
            first = Math.round(Math.abs(translatePos) / elementW);
            last = Math.round(first + windowW / elementW - 1);
            firstDate = $('li:eq(' + first + ')', DayLine.context).attr('data-date');
            lastDate = $('li:eq(' + last + ')', DayLine.context).attr('data-date');
            return {
              start: moment(firstDate, 'YYYYMMDD'),
              end: moment(lastDate, 'YYYYMMDD')
            };
          },
          updateW: function(w) {
            var amountOfElement;
            amountOfElement = DayLine.context.children().length;
            return DayLine.context.css('width', (amountOfElement * elementW) + 'px');
          },
          scrollToDate: function(date) {
            var amountOfLeft, d;
            d = DayLine.context.children('[data-date=' + date.format('YYYYMMDD') + ']');
            amountOfLeft = d.prevAll().length + 1;
            return mconsole.log('scrollToDate', d);
          },
          scrollToSelectedDate: function() {
            var left, restInLeft, t;
            if (SelectedDate.isAvailable()) {
              restInLeft = Math.abs(translatePos) / elementW;
              left = SelectedDate.numberOfLeft();
              gsk.log('scrollToSelectedDate', left);
              t = left - restInLeft;
              gsk.log('t', t);
              if (t > 5) {
                left = left - t + 4;
                translatePos = -left * elementW;
                return scroll();
              }
            }
          },
          scrollFromNav: function(i) {
            var currentDate, ele, idx, numberOfElement;
            mconsole.log('scrollFromNav', i);
            currentDate = CurrentDate.context;
            if (currentDate.length === 0) {
              return;
            }
            numberOfElement = currentDate.parent().children('.past-date').length + (i || 0);
            translatePos = -(numberOfElement - 2) * elementW;
            scroll();
            idx = (i || 0) - 1;
            return ele = idx < 0 ? currentDate.parent().find(".current-date") : currentDate.parent().children().not('.past-date, .current-date').filter(':eq(' + idx + ')');
          },
          toDateModel: function(d) {
            var data;
            data = {
              dayOfWeek: d.format('ddd'),
              dayOfMonth: d.format('D'),
              month: d.format('MMM')
            };
            switch (data.dayOfMonth) {
              case '1':
              case '21':
              case '31':
                data.dateName = data.dayOfMonth + 'st';
                break;
              case '2':
              case '22':
                data.dateName = data.dayOfMonth + 'nd';
                break;
              case '3':
              case '23':
                data.dateName = data.dayOfMonth + 'rd';
                break;
              default:
                data.dateName = data.dayOfMonth + 'th';
            }
            return data;
          },
          updateCurrentItem: function() {
            var current, model;
            m = moment();
            current = DayLine.context.find('.current-date');
            current.attr('data-date', m.format('YYYYMMDD'));
            current.find('.add-badge').on('click', AddBadgeBtn.clicked);
            model = DayLine.toDateModel(m);
            current.find('.dayweek').text(model.dayOfWeek);
            return current.find('.daymonth').text(model.month + ' ' + model.dateName);
          },
          addBadges: function(listBadges, target, date) {
            var badge, badgeList, currentDate, item, _i, _len;
            badgeList = filterByDate(listBadges, date);
            currentDate = moment();
            for (_i = 0, _len = badgeList.length; _i < _len; _i++) {
              item = badgeList[_i];
              if (_i >= 7) {
                break;
              }
              badge = $('<div class="timeline-badge"><img src="' + Utils.getThumbLink(item.imgURL || '') + '"></div>');
              if (item.count <= 0) {
                badge.addClass('gray');
              }
              badge.on('click', {
                badge: item
              }, $scope.badgeDetailOpen);
              target.append(badge);
            }
            return target;
          },
          addBadgesToCurrentDate: function() {
            var current;
            current = DayLine.context.find('.current-date').find('.inner');
            DayLine.addBadges($scope.badges, current, moment());
            return DayLine.addBadges($scope.challenges, current, moment());
          },
          pastItem: function() {
            var data, isJourney, liTag, time;
            time = timelineData.oldest;
            if (time.format('YYYYMMDD') < timelineLimit.start.format('YYYYMMDD')) {
              return;
            }
            timelineData.oldest = timelineData.oldest.add('days', -1);
            data = DayLine.toDateModel(time);
            liTag = $('<li class="past-date"><div class="outer"><div class="inner">' + '<div class="date"><span class="dayweek">' + time.format('ddd') + '</span><span class="daymonth">' + time.format('MMM Do') + '</span></div>' + '<div class="timeline-badge"></div>' + '</div></div></li>');
            liTag.attr('data-date', time.format('YYYYMMDD'));
            DayLine.addBadges(null, liTag.find('.inner'), time);
            DayLine.context.prepend(liTag);
            DayLine.context.css('width', '+=' + elementW + 'px');
            progressBar.width(DayLine.context.width());
            ProgressBar.updatePosition();
            ulW = $('ul', $element).width();
            isJourney = isInJourney(time);
            if (isJourney) {
              ProgressBar.addRange();
              if (isJourney === 1) {
                liTag.addClass('journey-start');
              }
              if (isJourney === 2) {
                liTag.addClass('journey-end');
              }
            }
            translatePos -= elementW;
            return scroll();
          },
          futureItem: function() {
            var data, liTag, time;
            time = timelineData.newest;
            if (time.format('YYYYMMDD') > timelineLimit.end.format('YYYYMMDD')) {
              return;
            }
            timelineData.newest = timelineData.newest.add('days', 1);
            data = DayLine.toDateModel(time);
            liTag = $('<li><div class="outer"><div class="inner">' + '<div class="date"><span class="dayweek">' + time.format('ddd') + '</span><span class="daymonth">' + time.format('MMM Do') + '</span></div>' + '<div class="add-badge"><span class="icon-add"><a href="javascript:void(0);" title="Add badge" class="icon-add-badge">Add badge</a></span></div>' + '</div></div></li>');
            if (time.format('YYYYMMDD') === moment().add('days', 1).format('YYYYMMDD')) {
              liTag.find('.add-badge').attr('data-intro-step', 0);
            }
            liTag.find('.add-badge').on('click', AddBadgeBtn.clicked);
            liTag.attr('data-date', time.format('YYYYMMDD'));
            DayLine.addBadges($scope.challenges, liTag.find('.inner'), time);
            DayLine.context.append(liTag);
            DayLine.context.css('width', '+=' + elementW + 'px');
            progressBar.width(DayLine.context.width());
            return ulW = $('ul', $element).width();
          },
          addBadgeIntoFutureItem: function(image, badgeData) {
            var badge, selected;
            badge = $('<div class="timeline-badge gray"><img src="' + badgeData.thumbPath + '" alt=""></div>');
            badge.on('click', {
              badge: badgeData
            }, $scope.badgeDetailOpen);
            selected = dayLine.find('.add-badge.active').parent().find('div:last');
            return selected.after(badge);
          },
          addRightElement: function() {
            var amount, delta, i;
            delta = windowW - (ulW - Math.abs(translatePos));
            if (delta < 0) {
              return;
            }
            amount = delta / 20 + 7;
            i = 0;
            while (i < amount) {
              DayLine.futureItem();
              i++;
              if (translatePos < 0) {
                return;
              }
            }
          },
          addLeftElement: function() {
            var amount, delta, i, _results;
            if (translatePos < 0) {
              return;
            }
            delta = translatePos / elementW;
            amount = delta + 7;
            i = 0;
            _results = [];
            while (i < amount) {
              DayLine.pastItem();
              _results.push(i++);
            }
            return _results;
          },
          init: function() {
            var i, navData, selected, u, _i, _j, _len, _len1, _ref, _ref1;
            CurrentDate.addOnClick();
            mconsole.log('DayLine init');
            ulW = $('ul', $element).width();
            mconsole.log('ulW', ulW);
            DayLine.addBadgesToCurrentDate();
            DayLine.updateCurrentItem();
            _ref = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              i = _ref[_i];
              DayLine.pastItem();
              if (i === 8) {
                CurrentDate.scrollTo();
              }
            }
            ProgressBar.addCurrentJourney(journeys[journeys.length - 1]);
            _ref1 = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              i = _ref1[_j];
              DayLine.futureItem();
              if (i === 8) {
                navData = $rootScope.timelineModel;
                if ((navData != null) && (navData.selectedDate != null)) {
                  DayLine.scrollFromNav($rootScope.timelineModel.selectedDate);
                  mconsole.log(CurrentDate.context);
                  selected = CurrentDate.context;
                  u = 0;
                  while (u < navData.selectedDate) {
                    selected = selected.next();
                    u++;
                  }
                  $scope.jquerySelected = selected;
                  $rootScope.timelineModel = null;
                } else {
                  CurrentDate.scrollTo();
                }
              }
            }
            return $timeout(function() {
              var top;
              mconsole.log('timelineModel', $rootScope.timelineModel);
              if ($rootScope.timelineModel) {
                ArrowBtn.moveWithSelectedDate();
                top = $(".add-badge").offset().top;
                offset = 110;
                if ($('html').hasClass('gte-ios-7')) {
                  offset += 40;
                }
                $rootScope.timelineModel = null;

                /*
                 * If needs to scroll
                 * if (top > offset + 35) and isOverlayAvaiable is false
                if (top > offset + 35) and ($rootScope.isOverlayShowing is false)
                   * Move the timeline accordingly
                  Main.scrollTop(top - offset)
                 */
              }
              return $rootScope.timelineModel = null;
            }, 500);
          }
        };
        scroll = function(opts) {
          var move;
          opts = opts || {};
          if (isNaN(opts.x)) {
            move = translatePos;
          } else {
            move = opts.x;
          }
          if (move > 0) {
            move = 0;
          }
          if (is3dAvailable) {
            $element.context.style[transformProperty] = 'translate3d(' + move + 'px, 0, 0)';
          } else {
            $element.context.style[transformProperty] = 'translate(' + move + 'px, 0)';
          }
        };
        swipeStart = function(coords, event) {
          if ($rootScope.isHorizontalScrolling) {
            return;
          }
          mconsole.log('swipeStart gk-timeline');
          Swipe.start();
          $document.bind('mouseup', documentMouseUpEvent);
          lastPos = coords;
          startPos = coords.x;
          return false;
        };
        swipeMove = function(coords, event) {
          var delta;
          if ($rootScope.isHorizontalScrolling) {
            return;
          }
          mconsole.log('swipeMove gk-timeline');
          delta = coords.x - lastPos.x;
          if (delta <= 0) {
            translatePos -= Math.abs(delta);
          } else {
            translatePos += delta;
          }
          DayLine.addFutureItems();
          DayLine.addPastItems();
          lastPos = coords;
          scroll();
          return false;
        };
        swipeEnd = function(coords, event, forceAnimation) {
          var delta;
          if ($rootScope.isHorizontalScrolling) {
            return;
          }
          mconsole.log('swipeEnd gk-timeline');
          Swipe.end();
          $document.unbind('mouseup', documentMouseUpEvent);
          if (translatePos > offset.left) {
            translatePos = 0;
            scroll();
            return;
          } else {
            if (Math.abs(translatePos) + windowW > ulW) {
              translatePos = -(ulW - windowW + offset.left + offset.right);
              scroll();
              return;
            }
          }
          delta = Math.abs(translatePos) % elementW;
          if (delta > (elementW / 2)) {
            translatePos -= elementW - delta;
          } else {
            translatePos += delta;
          }
          scroll();
        };
        filterByDate = function(arr, date) {
          if (arr == null) {
            arr = $scope.badges;
          }
          return _.filter(arr, function(item) {
            var mdate;
            mdate = moment(item.date, 'YYYY-MM-DD HH:mm:ss');
            return mdate.format('YYYYMMDD') === date.format('YYYYMMDD');
          });
        };
        $rootScope.$$listeners['timeline-data'] = [];
        $rootScope.$on('timeline-data', function(e, data) {
          var endDate, item, j, startDate, _i, _len, _ref;
          mconsole.log('timeline-data', data);
          $scope.badges = data.badges;
          $scope.challenges = data['personal-challenges'];
          $scope.journeys = data.journeys;
          j = [];
          timelineLimit.start = moment();
          _ref = $scope.journeys;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            startDate = moment(item['start-date'], 'YYYY-MM-DD');
            endDate = moment(item['end-date'], 'YYYY-MM-DD');
            j.push({
              start: startDate,
              end: endDate,
              length: 5
            });
            if (startDate.format('YYYYMMDD') < timelineLimit.start.format('YYYYMMDD')) {
              timelineLimit.start = startDate;
            }
          }
          journeys = j;
          timelineLimit.start = moment(timelineLimit.start);
          timelineLimit.start = timelineLimit.start.add('days', -7);
          timelineLimit.end = moment().add('months', 6);
          mconsole.log('timelineLimit', timelineLimit);
          mconsole.log('Timeline.init()');
          return Timeline.init();
        });
        hmListener = Hammer(document.getElementById('hammer'));

        /*
        states = ['normal', 'zoom-month-out', 'zoom-months-out', 'zoom-all-out']
        widthStates = [128, 38, 19, 20]
        initState = ->
          $('html').removeClass 'zoom-out'
          for item in states
            $('html').removeClass item
        initState()
        
        currentState = 0
        $html = $('html')
        pinchOut = ->
          mconsole.log 'pinch-out'
          return if currentState <= 0
          currentState--
          if currentState is 0
            $html.removeClass 'zoom-out'
          $html.removeClass states[currentState+1]
          $html.addClass states[currentState]
        pinchIn = ->
          mconsole.log 'pinch-in'
          return if currentState >= (states.length - 1)
          currentState++
          if currentState is 1
            $html.addClass 'zoom-out'
          $html.removeClass states[currentState-1]
          $html.addClass states[currentState]
        
        zoomToLevel1 = ->
          while currentState > 0
             * currentState--
            pinchOut()
            elementW = widthStates[currentState]
            ulW = DayLine.context.children().length * elementW
            DayLine.context.css 'width', ulW + 'px'
            ProgressBar.update(elementW, widthStates[currentState+1])
        
          CurrentDate.scrollTo()
        
        if !window.isWebView()
          hmListener.on 'tap', (event) ->
            return if currentState <= 0
            pinchOut()
            elementW = widthStates[currentState]
            ulW = DayLine.context.children().length * elementW
            DayLine.context.css 'width', ulW + 'px'
        
            ProgressBar.update(elementW, widthStates[currentState+1])
            CurrentDate.scrollTo()
             *removed latter
            JourneyDesc.updateLevel1()
            return
          hmListener.on 'press', (event) ->
            return if currentState >= (states.length - 1)
            pinchIn()
            elementW = widthStates[currentState]
            ulW = DayLine.context.children().length * elementW
            DayLine.context.css 'width', ulW + 'px'
        
            ProgressBar.update(elementW, widthStates[currentState-1])
            CurrentDate.scrollTo()
            DayLine.addRightElement()
            mconsole.log 'addLeftElement'
            DayLine.addLeftElement()
            mconsole.log 'press translatePos', translatePos
             *removed latter
            JourneyDesc.updateLevel1()
            return
         */
        hmListener.on('panstart', function(event) {
          swipeStart(event.center, 'panstart');
        });
        hmListener.on('panmove', function(event) {
          swipeMove(event.center, 'panmove');
        });
        hmListener.on('panend', function(event) {
          swipeEnd(event.center, 'panend', null);
        });
        $scope.addPersonalChallenge = function(date) {
          var arrowLeft, current, top;
          mconsole.log('addPersonalChallenge');
          $rootScope.timelinePage.tabTimeline = true;
          $scope.selectedDate = moment(date, 'YYYYMMDD');
          current = $("#dayline li[data-date='" + date + "'] .add-badge");
          ArrowBtn.updateColor();
          if (moveTop < 0) {
            moveTop = current.offset().top;
            top = moveTop;
          } else {
            top = moveTop;
          }
          mconsole.log('current.offset', current.offset(), top);
          if ($('a', current).length === 0) {
            return;
          }
          if (!(current.hasClass('active'))) {
            mconsole.log('dont has .add-badge');
            arrowLeft = current.offset().left;
            arrowTimelime.css('left', (arrowLeft + 64) + 'px');
            $('.add-badge').removeClass('active');
            current.addClass('active');
            TabTimeline.updateTop(WeekTimeline.context.height() - 318);
            DayLine.context.addClass('hide-badges');
            offset = 110;
            if ($('html').hasClass('gte-ios-7')) {
              offset += 40;
            }
            if ((top > offset + 35) && ($rootScope.isOverlayShowing === false)) {
              mconsole.log('scroll at timeline');
              Main.scrollTop(top - offset);
            }
            return $rootScope.personalChallenges.data = {};
          } else {
            mconsole.log('has .add-badge');
            $rootScope.personalChallenges.data = null;
            current.removeClass('active');
            DayLine.context.removeClass('hide-badges');
            return Main.scrollTop(0, TabTimeline.resetContent);
          }
        };
        $scope.createChallenge = function() {
          var badge, image;
          mconsole.log('$scope.createChallenge at timeline');
          image = $rootScope.personalChallenges.data.badge.thumbPath;
          badge = $rootScope.personalChallenges.data.badge;
          DayLine.addBadgeIntoFutureItem(image, badge);
          $scope.$emit('create-a-challenge', $scope.selectedDate);
          Main.scrollTop(0, TabTimeline.resetContent);
        };
        $scope.badgeDetailOpen = function(event) {
          mconsole.log('badge clicked', event.data.badge);
          $rootScope.currentBadge = event.data.badge;
          $rootScope.$apply();
          $('[data-name="badge-detail-popup"]').removeClass('hidden');
        };
        return $scope.badgeDetailClose = function() {
          mconsole.log('badgeDetailClose');
          $('[data-name="badge-detail-popup"]').addClass('hidden');
        };
      };
    }
  };
});

//# sourceMappingURL=gk-timeline.js.map

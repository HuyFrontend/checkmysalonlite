'use strict';
angular.module('site').factory('Settings', function() {
  var settingsData;
  settingsData = {
    pages: {
      landing: '/landing-page'
    },
    type: {
      success: 'SUCCESS',
      error: 'ERROR',
      audioError: 'Audio error'
    },
    error: {
      done: 'Done',
      error: 'Error',
      cannotConnectToServer: 'Cannot connect to server',
      serverError: 'Server got an error, please try again later!',
      lostConnection: 'lost connection',
      userDoesNotExisted: 'User does not existed',
      passwordDoesNotValid: 'Password does not valid',
      emailIsExisted: 'Email is existed',
      signUpSuccessfully: 'Sign up successfully',
      accountUpdatedSuccessfully: 'Account updated successfully',
      pleaseCheckYourEmail: 'Please check your email to get temporary password',
      badgeIsNotFound: 'Badge is not found',
      feedbackSentSuccessfully: 'Feedback sent successfully',
      userHadATeam: 'User had team',
      userHadNotATeam: 'User hadn\'t team',
      createCouponSuccessfully: 'Create coupon successfully, please check your mail',
      cannotFindYourTeam: 'Can\'t find your team',
      addSlipSuccessfully: 'Add slip successfully',
      addActionGigyaIsSuccess: 'Add action gigya is success',
      sendActivityToUserSuccess: 'Send activity to user success',
      sendActivityToUserFail: 'Send activity to user fail',
      sendActivityToTeamSuccess: 'Send activity to team success',
      sendActivityToTeamFail: 'Send activity to team fail',
      recordAudioPermission: 'Microphone input permission refused - will record only silence'
    },
    message: {
      habitLater: 'You can tell us about your habit later in account settings',
      reasonToQuitMemo: 'Your memo saved successful!',
      reasonToQuitVideo: 'Your video saved successful!',
      reasonToQuitAudio: 'Your audio saved successful!',
      reasonToQuitPhoto: 'Your photo saved successful!',
      youHaveGotABadge: 'You\'ve got a badge!',
      sendCheerSuccess: 'Your cheer was sent!',
      sendActiviSuccess: 'Your smiley has been sent',
      sendActiviSuccess: 'Your smiley was sent!',
      cannotSendMessage: 'Your message cannot been sent, try again latter.',
      noConnections: 'Connections are not available right now, please try again later!',
      journeyNotStarted: 'You havn\'t started your journey yet.'
    },
    sharingData: {
      display: 'google.com',
      caption: 'google.com',
      description: 'this\'s a test.',
      message: 'this\'s a test.',
      picture: 'https://cdn1.iconfinder.com/data/icons/yooicons_set01_socialbookmarks/512/social_google_box.png',
      link: 'http://wequitnow.niquitin.co.uk/'
    },
    timer: {
      getBadges: 59 * 1000
    },
    staticBadge: {
      imgURL: 'images/upload/badges/badge-1hour.png',
      title: 'badge landing',
      type: 'Time Challenge',
      name: '1 hour',
      totalTime: '1',
      doneTime: '0',
      timeCompleted: 'Hours completed',
      progress: 0
    },
    rateTheApp: {
      url: {
        android: 'https://play.google.com/store/apps/details?id=com.android.chrome&hl=en',
        ios: 'itms-apps://itunes.apple.com/us/app/facebook/id284882215'
      }
    },
    localStorage: {
      name: {
        loginPage: 'pageAfterLogin',
        slipUpCount: 'countSlipUp',
        lastOpen: 'lastTimeOpenApp',
        cigarettesPerDay: 'cigarettesPerDay',
        firstLogin: 'firstTimeLogin.',
        rateApp: 'rateApp.',
        reasonToQuit: {
          memo: 'ReasonToQuit.Memo.',
          photo: 'ReasonToQuit.Photo.',
          audio: 'ReasonToQuit.Audio.',
          video: 'ReasonToQuit.Video.'
        }
      },
      value: {
        openStartJourney: 'openStartJourney',
        openMorningRecap: 'openMorningRecap',
        openReasonToQuit: 'openReasonToQuit',
        openSundayChallenge: 'openSundayChallenge'
      }
    },
    notification: {
      startJourney: {
        id: '1',
        title: 'Start Journey',
        message: 'Its time to begin, your quit Journey is waiting for you!',
        path: '/quitpoint'
      },
      recap: {
        id: '2',
        title: '',
        message: 'Morning recap time. Check it out!',
        repeat: 'daily',
        path: '/recap'
      },
      reasonToQuit: {
        id: '3',
        title: 'Reason to quit',
        firstMessage: 'Hey, we noticed you\'re struggling a bit! Remember why you are on this journey: ',
        secondToFifthMessage: {
          start: 'You had ',
          end: ' slip ups but don\'t worry, remember this is what you\'re quitting for: '
        },
        sixthMessage: 'Hard time staying on board? Remember the big picture: ',
        path: '/reason'
      },
      sundayChallenge: {
        id: '4',
        title: 'Challenge',
        message: 'It\'s new week! Remember to record any upcoming personal challenes in your timeline.',
        repeat: 'weekly',
        path: '/landing-page'
      },
      product: {
        id: '6',
        title: 'Add product',
        message: 'Hey there, you haven\'t added any products to your plan. Add them now and receive the Secret Weapon badge!',
        path: '/products'
      }
    },
    listGroupOfOverlay: ['/landing-page', '/timeline', '/quitteam/team-landing-1', '/quitteam/team-landing-2', 'overlay-sidebar-left'],
    accountChooseAvatarCtrl: {
      avatarList: [
        {
          href: 'javascript:;',
          title: 'Joker',
          alt: 'Joker',
          src: 'upload/avatar/avatar-joker.png'
        }, {
          href: 'javascript:;',
          title: 'GoogleGlassBoy',
          alt: 'GoogleGlassBoy',
          src: 'upload/avatar/avatar-googleglassboy.png'
        }, {
          href: 'javascript:;',
          title: 'HipsterGirl',
          alt: 'HipsterGirl',
          src: 'upload/avatar/avatar-hipstergirl.png'
        }, {
          href: 'javascript:;',
          title: 'HipsterBoy',
          alt: 'HipsterBoy',
          src: 'upload/avatar/avatar-hipsterboy.png'
        }, {
          href: 'javascript:;',
          title: 'HorseRider',
          alt: 'HorseRider',
          src: 'upload/avatar/avatar-horserider.png'
        }, {
          href: 'javascript:;',
          title: 'FreckledMan',
          alt: 'FreckledMan',
          src: 'upload/avatar/avatar-freckledman.png'
        }, {
          href: 'javascript:;',
          title: 'Dinosaur',
          alt: 'Dinosaur',
          src: 'upload/avatar/avatar-dinosaur.png'
        }, {
          href: 'javascript:;',
          title: 'Aviator',
          alt: 'Aviator',
          src: 'upload/avatar/avatar-aviator.png'
        }, {
          href: 'javascript:;',
          title: 'CapBoy',
          alt: 'CapBoy',
          src: 'upload/avatar/avatar-capboy.png'
        }, {
          href: 'javascript:;',
          title: 'Chef',
          alt: 'Chef',
          src: 'upload/avatar/avatar-chef.png'
        }, {
          href: 'javascript:;',
          title: 'Astronaut',
          alt: 'Astronaut',
          src: 'upload/avatar/avatar-astronaut.png'
        }, {
          href: 'javascript:;',
          title: 'Catwoman',
          alt: 'Catwoman',
          src: 'upload/avatar/avatar-catwoman.png'
        }, {
          href: 'javascript:;',
          title: 'Grandma',
          alt: 'Grandma',
          src: 'upload/avatar/avatar-grandma.png'
        }, {
          href: 'javascript:;',
          title: 'Nurse',
          alt: 'Nurse',
          src: 'upload/avatar/avatar-nurse.png'
        }, {
          href: 'javascript:;',
          title: 'Scubaboy',
          alt: 'Scubaboy',
          src: 'upload/avatar/avatar-scubaboy.png'
        }, {
          href: 'javascript:;',
          title: 'Superhero',
          alt: 'Superhero',
          src: 'upload/avatar/avatar-superhero.png'
        }, {
          href: 'javascript:;',
          title: 'Tropicalgirl',
          alt: 'Tropicalgirl',
          src: 'upload/avatar/avatar-tropicalgirl.png'
        }, {
          href: 'javascript:;',
          title: 'Workingoutboy',
          alt: 'Workingoutboy',
          src: 'upload/avatar/avatar-workingoutboy.png'
        }, {
          href: 'javascript:;',
          title: 'Workingoutgirl',
          alt: 'Workingoutgirl',
          src: 'upload/avatar/avatar-workingoutgirl.png'
        }, {
          href: 'javascript:;',
          title: 'Cutegirl',
          alt: 'Cutegirl',
          src: 'upload/avatar/avatar-cutegirl.png'
        }
      ]
    },
    landingIndexCtrl: {
      intro: [
        {
          element: '#progress-bar',
          intro: ' <p>This progress bar shows you how close you are to winning your next time challenge.</p><p>Click on it to zoom in on your timeline or rotate your phone to horizontal mode to see your complete timeline.</p>',
          position: 'bottom',
          tooltipClass: 'content-progress'
        }, {
          element: '#progress-bar',
          intro: ' <p>Occasionally we\'ll<br>award you an additional<br>badge for clearing other<br>milestones along the way.<br>Your personal challenges will<br>also show up like this.</p>',
          position: 'bottom',
          tooltipClass: 'content-progress-1',
          isUntilHelps: true
        }, {
          element: '#icon-left',
          intro: 'Click here for the menu and <br> your profile. Here you\'ll see <br>  your personal stats ans have <br> access to all areas of the app.',
          position: 'bottom',
          tooltipClass: 'content-icon-menu',
          isUntilHelps: true
        }, {
          element: '#icon-right',
          intro: ' <p>Your quit is unlike anyone else\'s.<br>Click here to enter a personal<br>challenge when you have a<br>moment of temptation coming<br>up during your week.</p>',
          position: 'bottom',
          tooltipClass: 'content-badge'
        }, {
          element: '#time-challenge-block',
          intro: ' <p>Your current time challenge is<br>also visible in this area together<br>with the badge and points you<br>will win. Stay focused on your<br>next achievement.</p>',
          position: 'bottom',
          tooltipClass: 'content-landing-1',
          isUntilHelps: true
        }, {
          element: '#btn-distract-me',
          intro: '<p>Got a craving? Distract<br>yourself with a little game<br>that will keep you busy<br>till it passes.</p>',
          position: 'bottom',
          tooltipClass: 'content-landing-2'
        }, {
          element: '#btn-slipped',
          intro: '<p>Slip ups happen. Let the app know<br> and it will turn into your<br> personal record. Then try <br>to beat that!</p>',
          position: 'top',
          tooltipClass: 'content-landing-3'
        }, {
          element: '#rn-carousel-1',
          intro: '<p>A little daily motivation<br>can go a long way. And <br>when a daily motivation<br> has real science behind <br> it, it\'s even better.</p>',
          position: 'bottom',
          tooltipClass: 'content-landing-4',
          staticContent: '<li id="rn-carousel-1" class="rn-carousel-slide ng-scope introjs-showElement"><div class="content ng-scope"><h2 translate="Get productive!" class="ng-scope">Get productive!</h2><div ng-bind-html="item.descriptioin" class="text-intro ng-binding"><p>Fill the time you used to spend on cigarette breaks by learning something new: make a habit of learning a new language for instance. Those ten minutes here and there can really add up!</p></div><div class="image-motivation"><img src="images/overlay/get-productive.png" alt=""></div></div></li>',
          isUntilHelps: true
        }, {
          element: '#rn-carousel-1',
          intro: '<p>Scroll through all of your<br>daily motivations to date.</p>',
          position: 'bottom',
          tooltipClass: 'content-landing-5',
          isUntilHelps: true
        }, {
          element: '[data-name="quit-team-button"]',
          intro: '<p>Quitting shouldn\'t be<br>something you do alone.<br>Click here and we\'ll be<br>happy to introduce you to<br>a team of other<br> inspired quitters.</p>',
          position: 'top',
          tooltipClass: 'content-landing-7'
        }
      ],
      motivationItems: [
        {
          title: 'Scent-sational!',
          alt: 'Scent-sational!',
          src: 'images/motivation/scent-sational.png',
          text: 'Now that you\'re free of cigarette smoke, why not celebrate it with a new perfume?'
        }, {
          title: 'Pen-it!',
          alt: 'pen it',
          src: 'images/motivation/pen-it.png',
          text: 'Take a pen and write down a craving when it occurs, then write next to it why it is you\'re craving it and try to come up with a solution to the trigger. It might be stress or boredom you\'re dealing with.'
        }, {
          title: 'Celebrate Success',
          alt: 'Celebrate Success',
          src: 'images/motivation/celebrate-success.png',
          text: 'Reward yourself when you reach a goal, be it big or small. That way you\'ll train your brain for positive rewards.'
        }, {
          title: 'Hot bath!',
          alt: 'Hot bath!',
          src: 'images/motivation/hot-bath.png',
          text: 'Cigarette smoke not only smells foul, it also has an irritating effect on your eyes. By quitting you\'ll start reducing smoking-related eye irritation.'
        }, {}
      ]
    },
    quitPointCourageCtrl: {
      intro: [
        {
          element: '#courage-step-1',
          intro: '<p>You will unlock achievement<br>badges when you hit milestones<br>or complete challenges.</p>',
          position: 'bottom',
          tooltipClass: 'content-courage-badge'
        }, {
          element: '#courage-step-2',
          intro: '<p>Every badge comes with quit points.<br>Quit points can be used to get in-store coupons* for NiQuitin products or in-app surprises.</p><p class="note">*While quantities last</p>',
          position: 'top',
          tooltipClass: 'content-badge-point'
        }
      ]
    },
    quitteamLanding1Ctrl: {
      intro: [
        {
          element: '#nav-tabs',
          intro: '<p>Motivate Nick to keep<br> going with a cheer or a<br> funny smiley.</p>',
          position: 'top',
          tooltipClass: 'content-quit-team-4',
          isUntilHelps: true
        }
      ],
      smileList1: [
        {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-1.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-2.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-3.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-4.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-5.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-6.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-7.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-8.png"
        }
      ],
      smileList2: [
        {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-9.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-10.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-11.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-12.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-13.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-14.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-15.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-16.png"
        }
      ],
      smileList3: [
        {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-17.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-18.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-19.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-20.png"
        }
      ],
      smileList: [
        {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-1.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-2.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-3.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-4.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-5.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-6.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-7.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-8.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-9.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-10.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-11.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-12.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-13.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-14.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-15.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-16.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-17.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-18.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-19.png"
        }, {
          title: "cheer",
          alt: "heer",
          src: "upload/quit-team/quit-cheer-20.png"
        }
      ]
    },
    quitteamLanding2Ctrl: {
      intro: [
        {
          element: '#activity-feed',
          intro: ' <p>Keep an eye out for how your team members are doing. Send them extra encouragement if you see that they aren’t doing as well as they could!</p>',
          position: 'top',
          tooltipClass: 'content-quit-team-2',
          staticContent: '<li><div class="thumbnail"><img alt="" src="images/overlay/avatar-hipsterboy.png"></div><div class="content"><p class="name-feed"><span class="name">mimosa &nbsp;</span> unlocked a badge!</p></div></li><li><div class="thumbnail"><img alt="" src="images/overlay/avatar-aviator.png"></div><div class="content"><p class="name-feed"><span class="name">baba &nbsp;</span> unlocked a badge!</p></div></li><li><div class="thumbnail"><img alt="" src="images/overlay/avatar-aviator.png"></div><div class="content"><p class="name-feed"><span class="name">Up &nbsp;</span> unlocked a badge!</p></div></li>',
          isUntilHelps: true
        }, {
          element: '[data-name="pane-cheers"]',
          intro: '<p>Clicking on Cheers will <br> allow you to see the <br>personal cheers and smileys<br> sent to you by your team<br> members.</p>',
          position: 'top',
          tooltipClass: 'content-quit-team-3',
          staticContent: '<li><div class="thumbnail"><img src="images/overlay/avatar-hipsterboy.png" alt=""><span class="name"></span></div><div class="content"><div class="inner smiley"><img src="images/overlay/quit-cheer-18.png" alt="" class="img-status"></div></div></li><li><div class="thumbnail"><img src="http://quitapp-publish-test.gsk.sutrix.com/content/dam/napp/avatar/avatar-scubaboy.png" alt=""><span class="name"></span></div><div class="content cheer-content"><div class="inner"><span>Keep up the good work!</span></div></div></li>',
          isUntilHelps: true
        }, {
          element: '#step1',
          intro: '<p>Click on #Nick to see<br>what he&#39;s been up to<br>and to give him/her a cheer.</p>',
          position: 'bottom',
          tooltipClass: 'content-quit-team',
          isUntilHelps: true
        }
      ]
    },
    timelineIndexCtrl: {
      intro: [
        {
          element: '[data-intro-step="0"]',
          intro: '<p>Choose a day and tap on <br>the plus icon to add a <br>challenge for that day.</p>',
          position: 'top',
          tooltipClass: 'content-timeline-1',
          isUntilHelps: true
        }, {
          element: '[data-intro-step="1"]',
          intro: '<p>Choose a category and <br>then pick a temptation <br>to challenge.</p>',
          position: 'top',
          tooltipClass: 'content-timeline-2',
          isUntilHelps: true
        }, {
          element: '[data-intro-step="2"]',
          intro: '<p>Pick the time of the <br> day that your temptation <br> will occur.</p>',
          position: 'bottom',
          tooltipClass: 'content-timeline-3',
          isUntilHelps: true
        }, {
          element: '.progress-bar',
          intro: '<p>Swipe the timeline left or <br>right to see your past and<br> coming achievements.<br> Rotate your phone to see<br> your complete timeline.',
          position: 'top',
          tooltipClass: 'content-timeline-4',
          isUntilHelps: true
        }, {
          element: '.progress-bar',
          intro: '<p>Rotate the screen to see <br> even more details including <br>badges and challenges, <br> past and future.</p>',
          position: 'bottom',
          tooltipClass: 'content-timeline-5',
          isUntilHelps: true
        }
      ],
      introWithoutHelp: [
        {
          element: '.progress-bar',
          intro: '<p>Rotate the screen to see <br> even more details including <br>badges and challenges, <br> past and future.</p>',
          position: 'bottom',
          tooltipClass: 'content-timeline-5'
        }
      ]
    },
    tourIndexCtrl: {
      tourData: [
        {
          alt: 'quit',
          src: 'images/upload/photo-tour-intro.png',
          title: 'tour.step1.title',
          desc: 'tour.step1.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-3.png',
          title: 'tour.step2.title',
          desc: 'tour.step2.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-2.png',
          title: 'tour.step3.title',
          desc: 'tour.step3.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-4.png',
          title: 'tour.step4.title',
          desc: 'tour.step4.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-5.png',
          title: 'tour.step5.title',
          desc: 'tour.step5.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-6.png',
          title: 'tour.step6.title',
          desc: 'tour.step6.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-7.png',
          title: 'tour.step7.title',
          desc: 'tour.step7.desc',
          "class": ''
        }, {
          alt: 'quit',
          src: 'images/upload/photo-tour-last.png',
          title: '',
          desc: '',
          "class": 'hide'
        }
      ]
    }
  };
  if (typeof globalSettingsData !== "undefined" && globalSettingsData !== null) {
    mconsole.log('globalSettingsData has been used');
    return globalSettingsData;
  } else {
    mconsole.log('settingsData has been used');
    return settingsData;
  }
});

//# sourceMappingURL=settings.js.map

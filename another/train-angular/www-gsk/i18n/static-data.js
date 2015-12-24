'use strict';
var globalData;

globalData = {
  notification: {
    startJourney: {
      id: 1,
      title: 'Start Journey',
      message: 'Its time to begin, your quit Journey is waiting for you!',
      path: '/quitpoint'
    },
    recap: {
      id: 'idRecap',
      title: 'Recap Morning',
      message: 'Morning recap time. Check it out! (open)',
      path: '/recap'
    }
  },
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
        tooltipClass: 'content-progress-1'
      }, {
        element: '#icon-left',
        intro: 'Click here for the menu and <br> your profile. Here you\'ll see <br>  your personal stats ans have <br> access to all areas of the app.',
        position: 'bottom',
        tooltipClass: 'content-icon-menu'
      }, {
        element: '#icon-right',
        intro: ' <p>Your quit is unlike anyone else\'s.<br>Click here to enter a personal<br>challenge when you have a<br>moment of temptation coming<br>up during your week.</p>',
        position: 'bottom',
        tooltipClass: 'content-badge'
      }, {
        element: '#time-challenge-block',
        intro: ' <p>Your current time challenge is<br>also visible in this area together<br>with the badge and points you<br>will win. Stay focused on your<br>next achievement.</p>',
        position: 'bottom',
        tooltipClass: 'content-landing-1'
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
        tooltipClass: 'content-landing-4'
      }, {
        element: '#rn-carousel-1',
        intro: '<p>Scroll through all of your<br>daily motivations to date.</p>',
        position: 'bottom',
        tooltipClass: 'content-landing-5'
      }, {
        element: '#quit-team',
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
        intro: '<p>Every badge comes with <br>Quit Points that you can <br>redeem to get real <br>discounts* on products.</p><p class="note">*While quantities last</p>',
        position: 'top',
        tooltipClass: 'content-badge-point'
      }
    ]
  },
  quitteamLanding1Ctrl: {
    intro: [
      {
        element: '#nav-tabs',
        intro: ' <p>Motivate Nick to keep<br> going with a cheer or a<br> funny smiley. </p>',
        position: 'top',
        tooltipClass: 'content-quit-team-4'
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
    ]
  },
  quitteamLanding2Ctrl: {
    intro: [
      {
        element: '#activity-feed',
        intro: ' <p>Keep an eye out for how your team members are doing. Send them extra encouragement if you see that they aren’t doing as well as they could!</p>',
        position: 'top',
        tooltipClass: 'content-quit-team-2'
      }, {
        element: '#activity-cheers',
        intro: '<p>Clicking on Cheers will <br> allow you to see the <br>personal cheers and smileys<br> sent to you by your team<br> members.</p>',
        position: 'top',
        tooltipClass: 'content-quit-team-3'
      }, {
        element: '#step1',
        intro: '<p>Click on Nick to see<br>what he\'s been up to<br>and to give him a cheer.</p>',
        position: 'bottom',
        tooltipClass: 'content-quit-team'
      }
    ]
  },
  timelineIndexCtrl: {
    intro: [
      {
        element: '[data-intro-step="0"]',
        intro: '<p>Choose a day and tap on <br>the plus icon to add a <br>challenge for that day.</p>',
        position: 'top',
        tooltipClass: 'content-timeline-1'
      }, {
        element: '[data-intro-step="1"]',
        intro: '<p>Choose a category and <br>then pick a temptation <br>to challenge.</p>',
        position: 'top',
        tooltipClass: 'content-timeline-2'
      }, {
        element: '[data-intro-step="2"]',
        intro: '<p>Pick the time of the <br> day that your temptation <br> will occur.</p>',
        position: 'bottom',
        tooltipClass: 'content-timeline-3'
      }, {
        intro: '<p>Swipe the timeline left or <br>right to see your past and<br> coming achievements.<br> Rotate your phone to see<br> your complete timeline.',
        position: 'top',
        tooltipClass: 'content-timeline-4'
      }, {
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
        src: 'images/upload/photo-tour-1.jpg',
        title: 'tour.step1.title',
        desc: 'tour.step1.desc'
      }, {
        alt: 'quit',
        src: 'images/upload/photo-tour-3.jpg',
        title: 'tour.step2.title',
        desc: 'tour.step2.desc'
      }, {
        alt: 'quit',
        src: 'images/upload/photo-tour-2.jpg',
        title: 'tour.step3.title',
        desc: 'tour.step3.desc'
      }, {
        alt: 'quit',
        src: 'images/upload/photo-tour-4.jpg',
        title: 'tour.step4.title',
        desc: 'tour.step4.desc'
      }, {
        alt: 'quit',
        src: 'images/upload/photo-tour-5.jpg',
        title: 'tour.step5.title',
        desc: 'tour.step5.desc'
      }, {
        alt: 'quit',
        src: 'images/upload/photo-tour-6.jpg',
        title: 'tour.step6.title',
        desc: 'tour.step6.desc'
      }, {
        alt: 'quit',
        src: 'images/upload/photo-tour-7.jpg',
        title: 'tour.step7.title',
        desc: 'tour.step7.desc'
      }, {
        alt: 'quit',
        src: 'images/upload/photo-tour-last.jpg',
        title: '',
        desc: ''
      }
    ]
  }
};

//# sourceMappingURL=static-data.js.map

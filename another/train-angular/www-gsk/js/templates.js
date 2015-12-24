angular.module('site.templates', ['views/account-settings/avatar.jade', 'views/account-settings/index.jade', 'views/account-settings/leaving-1.jade', 'views/account-settings/leaving-2.jade', 'views/account-settings/leaving-3.jade', 'views/feedback/feedback.jade', 'views/feedback/thank-you.jade', 'views/games/game-1.jade', 'views/games/index.jade', 'views/habit/index.jade', 'views/habit/looking-for.jade', 'views/habit/reason.jade', 'views/habit/replace.jade', 'views/habit/smoke.jade', 'views/habit/thank.jade', 'views/habit/time.jade', 'views/habit/year.jade', 'views/habit/yhabit.jade', 'views/help/help.jade', 'views/landing-page/add-slip.jade', 'views/landing-page/index.jade', 'views/landing-page/landing-static.jade', 'views/landing-page/motivation-gallery.jade', 'views/landing-page/science-behind.jade', 'views/landing-page/slip-up-badge.jade', 'views/login/forgot-pass.jade', 'views/login/forgot-username.jade', 'views/login/index.jade', 'views/login/login-2.jade', 'views/login/password-coming.jade', 'views/login/welcome-back.jade', 'views/main/index.jade', 'views/products/detail-product.jade', 'views/products/index.jade', 'views/products/my-product.jade', 'views/products/post-review.jade', 'views/products/product-overview.jade', 'views/products/product-reminder.jade', 'views/products/purchase-product.jade', 'views/products/thank-rating.jade', 'views/quitpoint/badge-detail-template.jade', 'views/quitpoint/character-detail.jade', 'views/quitpoint/coupon-detail.jade', 'views/quitpoint/courage.jade', 'views/quitpoint/donation.jade', 'views/quitpoint/index.jade', 'views/quitpoint/individual-badge.jade', 'views/quitpoint/new-character.jade', 'views/quitpoint/thank-donation.jade', 'views/quitpoint/your-badge.jade', 'views/quitpoint/your-coupons.jade', 'views/quitpoint/your-point-detail.jade', 'views/quitpoint/your-point.jade', 'views/quitteam/index.jade', 'views/quitteam/team-landing-1.jade', 'views/quitteam/team-landing-2.jade', 'views/reason/index.jade', 'views/recap/great.jade', 'views/recap/index.jade', 'views/signup/age.jade', 'views/signup/best-time.jade', 'views/signup/character.jade', 'views/signup/country.jade', 'views/signup/gender.jade', 'views/signup/index.jade', 'views/signup/language.jade', 'views/signup/progress-update.jade', 'views/signup/reason.jade', 'views/signup/replace.jade', 'views/signup/where-hear.jade', 'views/template/index.jade', 'views/test/hammer.jade', 'views/test/index.jade', 'views/timeline/index.jade', 'views/tour/index.jade']);

angular.module('views/account-settings/avatar.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/account-settings/avatar.jade',
		'<main id="main" class="avatar-page">\n' +
		'  <div class="inner container-bgd character-content">\n' +
		'    <div class="block-1">\n' +
		'      <h3 class="title">{{l10n.account.title}}</h3>\n' +
		'      <ul gk-panel-selector="gk-panel-selector" ng-model="character" class="list-item list-character">\n' +
		'        <li gk-on-last-repeat="gk-on-last-repeat" ng-repeat="item in avatarList" data-value="{{item.path}}"><a href="javascript:;" title="{{item.title || item.path}}"><span style="background-image : url({{item[&quot;small-img-path&quot;]}})" class="image"></span></a></li>\n' +
		'      </ul>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main><a href="javascript:;" ng-click="back()" class="btn btn-1 uppercase"><span>{{l10n.button.ok}}</span></a>');
}]);

angular.module('views/account-settings/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/account-settings/index.jade',
		'<section data-overlay="overlay-media" gk-popup="gk-popup" ng-show="showPopup" class="popup-1 media-popup overlay">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p><a href="javascript:;" title="Take Photo" ng-click="getPhotoFromCamera()">Take Photo</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Take Video" ng-click="captureVideo()">Take Video</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Choose Existing Photo" ng-click="getPhotoFromLibrary()">Choose Existing Photo</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Choose Existing Video" ng-click="getVideoFromLibrary()">Choose Existing Video</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Record a Voice Note" ng-click="captureAudio()">Record a Voice Note</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Write a Memo" ng-click="memoPopup()">Write a Memo</a>\n' +
		'      </p>\n' +
		'    </div><a href="javascript:;" title="{{l10n.button.cancel}}" class="btn btn-6 skip-btn" ng-click="closePopup()"><span>{{l10n.button.cancel}}</span></a>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main" class="account-settings-page">\n' +
		'  <div class="inner">\n' +
		'    <div class="accordion">\n' +
		'      <ul gk-accordion="gk-accordion" ng-model="panel">\n' +
		'        <li class="account-item"><a title="my info" href="javascript:;" class="heading">\n' +
		'            <h3>{{l10n.account.group1}}</h3><span class="edit">Edit</span></a>\n' +
		'          <div class="content">\n' +
		'            <form id="my-info" name="my-info" method="post" action="#" class="form-myinfo">\n' +
		'              <ul class="list-info">\n' +
		'                <li data-input-focus="data-input-focus">\n' +
		'                  <label for="username">{{l10n.account.yourName}}</label>\n' +
		'                  <div class="table-cell">\n' +
		'                    <input type="text" name="username" id="username" value="Janedoe" ng-model="user.name" ng-blur="updateProfile()"/>\n' +
		'                  </div>\n' +
		'                </li>\n' +
		'                <li class="notedit">\n' +
		'                  <label for="">{{l10n.account.userName}}</label>\n' +
		'                  <div class="table-cell"><span>{{USER.userName}}</span></div>\n' +
		'                </li>\n' +
		'                <li data-output-blur="data-output-blur">\n' +
		'                  <label for="email">{{l10n.account.email}}</label>\n' +
		'                  <div class="table-cell">\n' +
		'                    <input type="email" name="email" id="email" value="Jane@email.com" ng-model="user.email" ng-blur="updateEmail()"/>\n' +
		'                  </div>\n' +
		'                </li>\n' +
		'                <li ng-click="nav(&quot;/account-settings/avatar&quot;)" class="type-1">\n' +
		'                  <label for="avatar">{{l10n.account.avatar}}</label>\n' +
		'                  <div class="table-cell"><a href="javascript:;" class="avatar"><img src="{{user.avatar}}"/></a></div>\n' +
		'                </li>\n' +
		'                <li ng-click="changePassClicked()">\n' +
		'                  <label for="password">{{l10n.account.password}}</label>\n' +
		'                  <div class="table-cell">\n' +
		'                    <input type="password" name="password" id="password" value="password123" disabled="disabled" maxlength="12" minlength="4"/>\n' +
		'                  </div>\n' +
		'                </li>\n' +
		'                <li data-name="change-pass-content" class="change-pass">\n' +
		'                  <ul>\n' +
		'                    <li>\n' +
		'                      <label for="currentPass">{{l10n.account.currentPass}}</label>\n' +
		'                      <div class="table-cell">\n' +
		'                        <input type="password" name="currentPass" id="currentPass" value="" class="input-1" ng-model="passModel.current" ng-trim="false" maxlength="12" minlength="4"/>\n' +
		'                      </div>\n' +
		'                    </li>\n' +
		'                    <li>\n' +
		'                      <label for="newpassword">{{l10n.account.newPass}}</label>\n' +
		'                      <div class="table-cell">\n' +
		'                        <input type="password" name="newpassword" id="newpassword" value="" class="input-1" ng-model="passModel.newPassword" ng-trim="false" maxlength="12" minlength="4"/>\n' +
		'                      </div>\n' +
		'                    </li>\n' +
		'                    <li>\n' +
		'                      <label for="confirmpassword">{{l10n.account.confirmPass}}</label>\n' +
		'                      <div class="table-cell">\n' +
		'                        <input type="password" name="confirmpassword" id="confirmpassword" value="" class="input-1" ng-model="passModel.confirmPass" ng-trim="false" maxlength="12" minlength="4"/>\n' +
		'                      </div>\n' +
		'                    </li>\n' +
		'                  </ul>\n' +
		'                  <button type="button" ng-click="changePassword()" class="btn-change-pass">{{l10n.button.done}}</button>\n' +
		'                </li>\n' +
		'                <li>\n' +
		'                  <label for="">{{l10n.account.country}}</label>\n' +
		'                  <div gk-national-selector="gk-national-selector" ng-model="user.country" ng-change="updateProfile()" class="table-cell">\n' +
		'                    <select>\n' +
		'                      <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'                      <option value="UK">United Kingdom</option>\n' +
		'                      <optgroup label=""></optgroup>\n' +
		'                    </select><span></span>\n' +
		'                  </div>\n' +
		'                </li>\n' +
		'                <li>\n' +
		'                  <label for="">{{l10n.account.language}}</label>\n' +
		'                  <div gk-national-selector="gk-national-selector" ng-model="user.language" ng-change="updateProfile()" class="table-cell">\n' +
		'                    <select>\n' +
		'                      <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'                      <option value="en_US">English</option>\n' +
		'                      <optgroup label=""></optgroup>\n' +
		'                    </select><span></span>\n' +
		'                  </div>\n' +
		'                </li>\n' +
		'                <li data-input-focus="data-input-focus">\n' +
		'                  <label for="">{{l10n.account.time}}</label>\n' +
		'                  <div class="table-cell">\n' +
		'                    <input type="time" name="time area" ng-model="timeRecap" data-name="recap-time"/><span>{{timeTranform}}</span>\n' +
		'                  </div>\n' +
		'                </li>\n' +
		'              </ul>\n' +
		'            </form>\n' +
		'          </div>\n' +
		'        </li>\n' +
		'        <li class="account-item"><a title="my old habit" href="javascript:;" class="heading">\n' +
		'            <h3>{{l10n.account.group2}}</h3><span class="edit">Edit</span></a>\n' +
		'          <div class="content">\n' +
		'            <form id="old-habit" name="old-habit" method="post" action="#" class="old-habit">\n' +
		'              <ul class="list-info">\n' +
		'                <li>\n' +
		'                  <label for="">{{l10n.account.habit1}}</label>\n' +
		'                  <div gk-national-selector="gk-national-selector" ng-model="answerTime" ng-change="updateHabit1(answerTime)" class="table-cell">\n' +
		'                    <select>\n' +
		'                      <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'                      <option gk-on-last-repeat="gk-on-last-repeat" value="{{time.path}}" ng-repeat="time in smokeFor">{{time.content}}</option>\n' +
		'                      <optgroup label=""></optgroup>\n' +
		'                    </select><span>{{l10n.signUp.valueDefault}}</span>\n' +
		'                  </div>\n' +
		'                </li>\n' +
		'                <li>\n' +
		'                  <label for=""></label>\n' +
		'                  <div gk-national-selector="gk-national-selector" ng-model="answerYear" ng-change="updateHabit2(answerYear)" class="table-cell">\n' +
		'                    <select ng-show="activeHabit2">\n' +
		'                      <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'                      <option value="{{year.path}}" ng-repeat="year in craving">{{year.content}}</option>\n' +
		'                      <optgroup label=""></optgroup>\n' +
		'                    </select><span class="type-1">{{l10n.signUp.valueDefault}}</span>\n' +
		'                  </div>\n' +
		'                </li>\n' +
		'                <li>\n' +
		'                  <label for="">{{l10n.account.habit3}}</label>\n' +
		'                  <div gk-national-selector="gk-national-selector" ng-model="answerProduct" ng-change="updateHabit3(answerProduct)" class="table-cell">\n' +
		'                    <select ng-show="activeHabit3">\n' +
		'                      <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'                      <option value="{{product.path}}" ng-repeat="product in youSmoke">{{product.content}}</option>\n' +
		'                      <optgroup label=""></optgroup>\n' +
		'                    </select><span>{{l10n.signUp.valueDefault}}</span>\n' +
		'                  </div>\n' +
		'                </li>\n' +
		'              </ul>\n' +
		'            </form>\n' +
		'          </div>\n' +
		'        </li>\n' +
		'        <li class="account-item"><a title="my reason to quit" href="javascript:;" class="heading">\n' +
		'            <h3>{{l10n.account.group3}}</h3><span class="edit">Edit</span></a>\n' +
		'          <div class="content">\n' +
		'            <div class="block-reason">\n' +
		'              <p ng-bind-html="l10n.account.reason"></p>\n' +
		'              <div data-name="reason-to-quit" gk-reason-to-quit="gk-reason-to-quit" ng-model="reason" ng-change="reasonChanged()" class="select-1 reason">\n' +
		'                <select class="slect-reason">\n' +
		'                  <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'                  <option value="Live longer">Live longer</option>\n' +
		'                  <option value="A healthier life">A healthier life</option>\n' +
		'                  <option value="My family">My family</option>\n' +
		'                  <option value="Get physically fit">Get physically fit</option>\n' +
		'                  <option value="Reduce my risk of illnesses">Reduce my risk of illnesses</option>\n' +
		'                  <option value="Save money">Save money</option>\n' +
		'                  <optgroup label=""></optgroup>\n' +
		'                </select><span class="value-reason">{{reason || l10n.signUp.valueDefault}}</span>\n' +
		'              </div>\n' +
		'            </div>\n' +
		'          </div>\n' +
		'        </li>\n' +
		'        <li class="account-item"><a title="restart my journey" href="javascript:;" class="heading">\n' +
		'            <h3>{{l10n.account.group4}}</h3></a>\n' +
		'          <div class="content">\n' +
		'            <div class="block-my-journey">\n' +
		'              <p>{{l10n.account.restart}}</p>\n' +
		'            </div><a href="javascript:;" title="{{l10n.button.restart}}" class="btn btn-restart" ng-click="restartJourney(\'/quitpoint\')">{{l10n.button.restart}}</a><a href="javascript:;" title="{{l10n.button.cancel}}" class="btn btn-cancel" data-close-btn="data-close-btn">{{l10n.button.cancel}}</a>\n' +
		'          </div>\n' +
		'        </li>\n' +
		'        <li ng-show="showLeaveTeam" class="account-item"><a title="leave quit team" href="#/account-settings/leaving-1" class="heading">\n' +
		'            <h3>{{l10n.account.group5}}</h3><span class="edit">Edit</span></a>\n' +
		'        </li>\n' +
		'        <li class="account-item logout"><a title="logout" href="javascript:;" class="heading">\n' +
		'            <h3>{{l10n.account.logout}}</h3><span class="edit">Edit</span></a>\n' +
		'          <div class="content">\n' +
		'            <div class="block-my-journey">\n' +
		'              <p>{{l10n.account.logoutText}}</p>\n' +
		'            </div><a href="javascript:;" title="{{l10n.button.yes}}" class="btn btn-restart" ng-click="logoutApp()">{{l10n.button.yes}}</a><a href="javascript:;" title="{{l10n.button.cancel}}" class="btn btn-cancel" data-close-btn="data-close-btn">{{l10n.button.cancel}}</a>\n' +
		'          </div>\n' +
		'        </li>\n' +
		'      </ul>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>\n' +
		'<div gk-popup="gk-popup" ng-show="showMemoPopup" data-enable-touchmove="data-enable-touchmove" class="write-memo overlay">\n' +
		'  <div class="header">\n' +
		'    <h2>Write Memo</h2>\n' +
		'    <button type="button" ng-click="closePopup()" class="icon-close">&nbsp;</button>\n' +
		'  </div>\n' +
		'  <form id="form-memo" name="form-memo" novalidate="novalidate" class="form-feedback">\n' +
		'    <div class="form-group">\n' +
		'      <textarea name="message-memo" id="message-memo" placeholder="Write what\'s your reason to quit here..." gk-write-memo="gk-write-memo" required="required"></textarea>\n' +
		'    </div>\n' +
		'    <button type="submit" ng-click="updateMemo()" class="btn btn-2">Use Memo</button>\n' +
		'  </form>\n' +
		'</div>');
}]);

angular.module('views/account-settings/leaving-1.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/account-settings/leaving-1.jade',
		'<main id="main" class="leaving-page">\n' +
		'  <div class="inner">\n' +
		'    <div class="leaving-content-1">\n' +
		'      <p ng-bind-html="l10n.leaving.topMess1" class="top-message"></p><img src="images/upload/image-leaving-1.png" alt="image leaving 1"/>\n' +
		'      <p ng-bind-html="l10n.leaving.bottomMess1" class="bottom-message"></p><a href="javascript:;" title="{{l10n.button.leaveTeam}}" class="btn btn-4 link-color-1" ng-click="leaveTeam()">{{l10n.button.leaveTeam}}</a><a href="javascript:;" title="{{l10n.button.keepTeam}}" class="btn btn-5 link-color-1" ng-click="nav(&quot;/account-settings/leaving-3&quot;)">{{l10n.button.keepTeam}}</a>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/account-settings/leaving-2.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/account-settings/leaving-2.jade',
		'<main id="main" class="leaving-page">\n' +
		'  <div class="inner">\n' +
		'    <div class="leaving-content-2">\n' +
		'      <p ng-bind-html="l10n.leaving.topMess2" class="top-message"></p><img src="images/upload/image-leaving-2.png" alt="image leaving 2"/>\n' +
		'      <p ng-bind-html="l10n.leaving.bottomMess2" class="bottom-message"></p><a href="javascript:;" title="{{l10n.button.gotIt}}" class="btn btn-5 link-color-1" ng-click="nav(&quot;/landing-page&quot;)">{{l10n.button.gotIt}}</a>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/account-settings/leaving-3.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/account-settings/leaving-3.jade',
		'<main id="main" class="leaving-page leaving-3">\n' +
		'  <div class="inner">\n' +
		'    <div class="leaving-content-2">\n' +
		'      <p ng-bind-html="l10n.leaving.topMess3" class="top-message"></p><img src="images/upload/image-leaving-3.png" alt="image leaving 3"/><a href="javascript:;" title="{{l10n.button.ok}}" class="btn btn-5 link-color-1 uppercase" ng-click="nav(&quot;/quitteam/team-landing-2&quot;)">{{l10n.button.ok}}</a>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/feedback/feedback.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/feedback/feedback.jade',
		'<section gk-notification="gk-notification" ng-model="notiFeedback" data-lead-back="/landing-page" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 feedback-popup overlay-white hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.thank.feedback"></p><img src="images/img-thank.png" alt="thank"/>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main" class="feedback-page">\n' +
		'  <div class="inner">\n' +
		'    <form ng-submit="submit()" id="frm-feedback" name="form-feedback" class="form-feedback">\n' +
		'      <div class="form-group">\n' +
		'        <textarea name="your-feedback" id="your-feedback" placeholder="{{l10n.feedBack.caption}}" ng-model="message"></textarea>\n' +
		'      </div>\n' +
		'      <div class="message-text">\n' +
		'        <p ng-bind-html="l10n.feedBack.message"></p>\n' +
		'      </div>\n' +
		'      <div class="rate-app"><img src="images/app-store.png" alt="icon rate"/><a href="#" title="{{l10n.feedBack.rate}}">{{l10n.feedBack.rate}}</a>\n' +
		'      </div>\n' +
		'      <button type="submit" ng-click="submit()" class="btn btn-2">{{l10n.button.send}}</button>\n' +
		'    </form>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/feedback/thank-you.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/feedback/thank-you.jade',
		'<main id="main" class="thankyou-feedback">\n' +
		'  <div class="inner">\n' +
		'    <div class="notice-info"><img src="images/upload/feedback-thank.png" alt="Donation"/>\n' +
		'      <p ng-bind-html="l10n.thank.feedback"></p>\n' +
		'    </div><a title="continue" href="javascript:;" ng-click="nav(\'/landing-page\')" class="btn btn-6">{{l10n.button.continue}}</a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/games/game-1.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/games/game-1.jade',
		'<main id="main" class="game-page"></main>');
}]);

angular.module('views/games/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/games/index.jade',
		'<main id="main" class="game-page"><a href="javascript:;" ng-click="nav(&quot;/games/game-1&quot;)">Game One  </a></main>');
}]);

angular.module('views/habit/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/habit/index.jade',
		'<main id="main" class="habit-page">\n' +
		'  <div class="inner container-bgd hbyear-content">\n' +
		'    <div class="block-1">\n' +
		'      <h3 class="title">{{firstHabit.question}}</h3>\n' +
		'      <div gk-national-selector="gk-national-selector" ng-model="year" class="select-1">\n' +
		'        <select>\n' +
		'          <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'          <option value="{{habit.path}}" ng-repeat="habit in answerHabit">{{habit.content}}</option>\n' +
		'          <optgroup label=""></optgroup>\n' +
		'        </select><span>{{l10n.signUp.valueDefault}}</span>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/habit/looking-for.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/habit/looking-for.jade',
		'<main id="main" class="habit-page">\n' +
		'  <div class="inner container-bgd hblook-content">\n' +
		'    <div class="block-1">\n' +
		'      <ul gk-panel-selector="gk-panel-selector" ng-model="looking">\n' +
		'        <li class="time-group active" data-value="{{secondQuestion[&quot;answer-list&quot;][0].path}}">\n' +
		'          <div class="inner"><a href="javascript:;"><span>{{secondQuestion[\'answer-list\'][0].content}}</span></a></div>\n' +
		'        </li>\n' +
		'        <li class="time-group" data-value="{{secondQuestion[&quot;answer-list&quot;][1].path}}">\n' +
		'          <div class="inner"><a href="javascript:;"><span>{{secondQuestion[\'answer-list\'][1].content}}</span></a></div>\n' +
		'        </li>\n' +
		'      </ul>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" title="" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/habit/reason.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/habit/reason.jade',
		'<section data-overlay="overlay-media" gk-popup="gk-popup" ng-show="showPopup" class="popup-1 media-popup overlay">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p><a href="javascript:;" title="Take Photo" ng-click="getPhotoFromCamera()">Take Photo</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Take Video" ng-click="captureVideo()">Take Video</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Choose Existing Photo" ng-click="getPhotoFromLibrary()">Choose Existing Photo</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Choose Existing Video" ng-click="getVideoFromLibrary()">Choose Existing Video</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Record a Voice Note" ng-click="captureAudio()">Record a Voice Note</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Write a Memo" ng-click="memoPopup()">Write a Memo</a>\n' +
		'      </p>\n' +
		'    </div><a href="javascript:;" title="{{l10n.button.cancel}}" class="btn btn-6 skip-btn" ng-click="closePopup()"><span>{{l10n.button.cancel}}</span></a>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<div gk-popup="gk-popup" ng-show="showMemoPopup" data-enable-touchmove="data-enable-touchmove" class="write-memo overlay">\n' +
		'  <div class="header">\n' +
		'    <h2>Write Memo</h2>\n' +
		'    <button type="button" ng-click="closePopup()" class="icon-close">&nbsp;</button>\n' +
		'  </div>\n' +
		'  <form id="form-memo" name="form-memo" novalidate="novalidate" class="form-feedback">\n' +
		'    <div class="form-group">\n' +
		'      <textarea name="message-memo" id="message-memo" placeholder="Write what\'s your reason to quit here..." gk-write-memo="gk-write-memo" required="required"></textarea>\n' +
		'    </div>\n' +
		'    <button type="submit" ng-click="updateMemo()" class="btn btn-2">Use Memo</button>\n' +
		'  </form>\n' +
		'</div>\n' +
		'<main id="main" class="habit-page">\n' +
		'  <div class="inner container-bgd">\n' +
		'    <div class="block-1">\n' +
		'      <h3 ng-bind-html="l10n.habit.quest2" class="title"></h3>\n' +
		'      <div gk-national-selector="gk-national-selector" ng-model="reason" class="select-1 reason"><a href="javascript:;" ng-click="mediaPopup()" class="add-media take-photo">\n' +
		'          <div class="midle"><span class="icon-camera"></span></div></a>\n' +
		'        <select class="slect-reason">\n' +
		'          <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'          <option value="I want to live longer">I want to live longer</option>\n' +
		'          <option value="I want to have a healthier life">I want to have a healthier life</option>\n' +
		'          <option value="I\'m doing it for my children">I\'m doing it for my children</option>\n' +
		'          <option value="I\'m doing it for my family">I\'m doing it for my family</option>\n' +
		'          <option value="I want to get physically fit">I want to get physically fit</option>\n' +
		'          <option value="I want to reduce my risk of illnesses">I want to reduce my risk of illnesses</option>\n' +
		'          <option value="I want to save money">I want to save money</option>\n' +
		'          <optgroup label=""></optgroup>\n' +
		'        </select><span>{{l10n.signUp.valueDefault}}</span><span>{{l10n.signUp.valueDefault}}</span>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/habit/replace.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/habit/replace.jade',
		'<main id="main" class="habit-page">\n' +
		'  <div class="inner container-bgd replace-content">\n' +
		'    <div class="block-1">\n' +
		'      <h3 class="title">{{fourQuestion.question}}</h3>\n' +
		'      <div gk-national-selector="gk-national-selector" ng-model="replace" class="select-1">\n' +
		'        <select>\n' +
		'          <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'          <option value="{{habit.path}}" ng-repeat="habit in answerHabitFour">{{habit.content}}</option>\n' +
		'          <optgroup label=""></optgroup>\n' +
		'        </select><span>{{l10n.signUp.valueDefault}}</span>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/habit/smoke.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/habit/smoke.jade',
		'<main id="main" class="habit-page">\n' +
		'  <div class="inner container-bgd">\n' +
		'    <div class="block-1">\n' +
		'      <h3 class="title">{{thirdQuestion.question}}</h3>\n' +
		'      <div gk-national-selector="gk-national-selector" ng-model="cigarettes" class="select-1">\n' +
		'        <select>\n' +
		'          <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'          <option value="{{habit.path}}" ng-repeat="habit in answerHabitThird">{{habit.content}}</option>\n' +
		'          <optgroup label=""></optgroup>\n' +
		'        </select><span>{{l10n.signUp.valueDefault}}</span>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.done}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/habit/thank.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/habit/thank.jade',
		'<main id="main" class="habit-page">\n' +
		'  <div class="inner container-bgd thank-content">\n' +
		'    <div class="block-1">\n' +
		'      <h3 class="title">You’ve recieve extra Quit Points.</h3>\n' +
		'      <div class="badge"><img src="images/image-badge-silver.png" alt="silver badge" class="badge-img"/>\n' +
		'        <div class="point"><span>+25</span></div>\n' +
		'      </div>\n' +
		'      <p class="info">Thanks! You ‘ve recieved 25 extra<br>points for filling your </p>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" ng-click="next()" class="btn btn-1"><span>{{l10n.button.continue}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/habit/time.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/habit/time.jade',
		'<main id="main" class="habit-page">\n' +
		'  <div class="inner container-bgd hbtime-content">\n' +
		'    <div class="block-1">\n' +
		'      <h3 class="title">{{thirdQuestion.question}}</h3>\n' +
		'      <ul gk-panel-selector="gk-panel-selector" ng-model="time">\n' +
		'        <li class="time-group active" data-value="{{thirdQuestion[&quot;answer-list&quot;][0].path}}">\n' +
		'          <div class="inner"><a href="javascript:;"><span>{{thirdQuestion[\'answer-list\'][0].content}}</span></a></div>\n' +
		'        </li>\n' +
		'        <li class="time-group" data-value="{{thirdQuestion[&quot;answer-list&quot;][1].path}}">\n' +
		'          <div class="inner"><a href="javascript:;"><span>{{thirdQuestion[\'answer-list\'][1].content}}</span></a></div>\n' +
		'        </li>\n' +
		'      </ul>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" title="" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.done}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/habit/year.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/habit/year.jade',
		'<main id="main" class="habit-page">\n' +
		'  <div class="inner container-bgd hbyear-content">\n' +
		'    <div class="block-1">\n' +
		'      <h3 class="title">{{thirdQuestion.question}}</h3>\n' +
		'      <div gk-national-selector="gk-national-selector" ng-model="year" class="select-1">\n' +
		'        <select>\n' +
		'          <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'          <option value="{{habit.path}}" ng-repeat="habit in answerHabitThird">{{habit.content}}</option>\n' +
		'          <optgroup label=""></optgroup>\n' +
		'        </select><span>{{l10n.signUp.valueDefault}}</span>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/habit/yhabit.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/habit/yhabit.jade',
		'<main id="main" class="habit-page">\n' +
		'  <div class="inner">\n' +
		'    <ul class="quest-list">\n' +
		'      <li><a href="#/habit" title="">\n' +
		'          <p ng-bind-html="l10n.habit.quest1" class="question"></p>\n' +
		'          <p class="answer">{{model.cigarettesData}}{{l10n.habit.answer1}}</p></a></li>\n' +
		'      <li><a href="#/habit/time" title="">\n' +
		'          <p ng-bind-html="l10n.habit.quest4" class="question"></p>\n' +
		'          <p class="answer">{{model.timeData}}{{l10n.habit.answer2}}</p></a></li>\n' +
		'      <li><a href="#/habit/year" title="">\n' +
		'          <p ng-bind-html="l10n.habit.quest5" class="question"></p>\n' +
		'          <p class="answer">{{model.yearData}}</p></a></li>\n' +
		'      <li><a href="#/habit/replace" title="">\n' +
		'          <p ng-bind-html="l10n.habit.quest3" class="question"></p>\n' +
		'          <p class="answer">{{model.replaceData}}</p></a></li>\n' +
		'      <li><a href="#/habit/reason" title="">\n' +
		'          <p ng-bind-html="l10n.habit.quest2" class="question"></p>\n' +
		'          <p class="answer">{{model.reason}}</p></a></li>\n' +
		'    </ul>\n' +
		'  </div>\n' +
		'</main><a href="javascript:;" ng-click="done()" class="btn btn-1">{{l10n.button.done}}</a>');
}]);

angular.module('views/help/help.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/help/help.jade',
		'<main id="main">\n' +
		'  <div class="inner container-bgd help-content">\n' +
		'    <div class="notice-info">\n' +
		'      <p ng-bind-html="l10n.help.info"></p>\n' +
		'    </div><a title="yes" href="javascript:;" ng-click="helpYes()" class="btn btn-6 go-btn">{{l10n.button.yes}}</a><a title="no" href="javascript:;" ng-click="helpNo()" class="btn btn-6">{{l10n.button.no}}</a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/landing-page/add-slip.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/landing-page/add-slip.jade',
		'<main id="main" class="add-slip-page container-bgd">\n' +
		'  <div class="inner">\n' +
		'    <div class="add-slip"><img src="images/upload/add-slip.png" alt="add slip"/>\n' +
		'      <p ng-bind-html="l10n.landing.content"></p>\n' +
		'    </div><a href="javascript:;" title="{{l10n.button.addSlip}}" class="btn btn-1" ng-click="addSlip(&quot;/landing-page/slip-up-badge&quot;)"><span>{{l10n.button.addSlip}}</span></a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/landing-page/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/landing-page/index.jade',
		'<section gk-required-notification="gk-required-notification" ng-model="notiHabit" data-overlay="overlay-1" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 habit-popup overlay-white type-2 hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.toHabit"></p>\n' +
		'    </div>\n' +
		'    <div class="button-box"><a href="#/habit" title="{{l10n.button.ok}}" class="btn btn-6 go-btn" data-hide="data-hide"><span>{{l10n.button.ok}}</span></a><a href="javascript:;" title="{{l10n.button.skip}}" class="btn btn-6 skip-btn" data-hide="data-hide" ng-click="habitClose()"><span>{{l10n.button.skip}}</span></a>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<div gk-required-notification="gk-required-notification" ng-model="notiWelcomeBack" class="popup-1 overlay-white type-2 welcome-back hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content"><img src="images/upload/welcome-back.png" alt="welcome back"/>\n' +
		'      <p ng-bind-html="l10n.login.welcomeBack"></p>\n' +
		'      <div class="button-box"><a href="javascript:;" title="{{l10n.button.continue}}" class="btn btn-8" data-hide="data-hide"><span>{{l10n.button.continue}}</span></a><a href="javascript:;" title="{{l10n.button.startFresh}}" class="btn btn-8" data-hide="data-hide" ng-click="startFresh()"><span>{{l10n.button.startFresh}}</span></a>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</div>\n' +
		'<section gk-required-notification="gk-required-notification" ng-model="notiCreateProfile" data-overlay="overlay-create-profile" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 creat-profile-popup overlay hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.creatProfile"></p>\n' +
		'    </div><a href="javascript:;" title="{{l10n.button.go}}" class="btn btn-6" data-hide="data-hide" ng-click="go(&quot;/login&quot;)"><span>{{l10n.button.go}}</span></a>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<section gk-required-notification="gk-required-notification" ng-model="notiChallenge" data-overlay="overlay-challenge" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 challenge-popup overlay-white type-2 hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.challenge"></p>\n' +
		'    </div>\n' +
		'    <div class="button-box"><a href="javascript:;" title="{{l10n.button.setChallenges}}" class="btn btn-6 go-btn" data-hide="data-hide" ng-click="setChallenges()"><span>{{l10n.button.setChallenges}}</span></a><a href="javascript:;" title="{{l10n.button.skip}}" class="btn btn-6 skip-btn" data-hide="data-hide" ng-click="skip()"><span>{{l10n.button.skip}}</span></a>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<section gk-required-notification="gk-required-notification" data-overlay="overlay-rateapp" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 rate-app-popup overlay hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.rateAppTitle" class="strong"></p>\n' +
		'      <p ng-bind-html="l10n.popup.rateAppContent"></p>\n' +
		'    </div><a href="javascript:;" title="{{l10n.button.rateApp}}" class="btn btn-6 go-btn-2" data-hide="data-hide" ng-click="rateApp()"><span>{{l10n.button.rateApp}}</span></a><a href="javascript:;" title="{{l10n.button.remindLater}}" class="btn btn-6 go-btn" data-hide="data-hide" ng-click="remindRateApp()"><span>{{l10n.button.remindLater}}</span></a><a href="javascript:;" title="{{l10n.button.noThanks}}" class="btn btn-6 skip-btn" data-hide="data-hide" ng-click="cancelRateApp()"><span>{{l10n.button.noThanks}}</span></a>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<section gk-required-notification="gk-required-notification" ng-model="notiSlipUp" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 slip-up-popup overlay-white type-2 hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content"><img src="images/upload/image-slip.png" alt="add slip"/>\n' +
		'      <p ng-bind-html="l10n.popup.slipUp"></p>\n' +
		'    </div>\n' +
		'    <div class="button-box"><a href="#/landing-page/slip-up-badge" title="{{l10n.button.addSlip}}" class="btn btn-6 go-btn" data-hide="data-hide"><span>{{l10n.button.addSlip}}</span></a><a href="javascript:;" title="{{l10n.button.cancel}}" class="btn btn-6" data-hide="data-hide"><span>{{l10n.button.cancel}}</span></a>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main" class="landing-page">\n' +
		'  <div gk-motivation-gallery-landing="gk-motivation-gallery-landing" class="inner">\n' +
		'    <div id="time-challenge-block" class="time-challenge-block">\n' +
		'      <figure data-badge="{{showBadgeDetail.name}}">\n' +
		'        <div class="landing-badge"><span></span></div>\n' +
		'      </figure>\n' +
		'      <div class="content-challenge">\n' +
		'        <div class="time-challenge">\n' +
		'          <p>{{showBadgeDetail.type}}</p>\n' +
		'          <p class="date">{{showBadgeDetail.name}}</p>\n' +
		'        </div>\n' +
		'        <div class="time-completed">\n' +
		'          <p><span class="first-num">{{showBadgeDetail.doneTime}}</span><span class="text-of">{{l10n.landing.ofText}}</span><span class="last-num">{{showBadgeDetail.totalTime}}</span></p>\n' +
		'          <p>{{showBadgeDetail.timeCompleted}}</p>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <div class="group-btn type-1"><a href="javascript:;" title="{{l10n.button.distractMe}}" ng-click="navToDistractionGame()" class="icon-text" id="btn-distract-me"><i class="icon-distract"></i><span>{{l10n.button.distractMe}}</span></a><a href="javascript:;" title="{{l10n.button.iSlip}}" ng-click="slipUpClicked()" class="icon-text" id="btn-slipped"><i class="icon-slip"></i><span>{{l10n.button.iSlip}}</span></a>\n' +
		'    </div>\n' +
		'    <div ng-show="showTeamActive" class="landing-activity">\n' +
		'      <div class="inner">\n' +
		'        <div class="activity-title">\n' +
		'          <p>{{l10n.landing.title1}}</p>\n' +
		'        </div>\n' +
		'        <div class="tab-pane">\n' +
		'          <ul ng-click="showCheerTab()" class="list activity-feed">\n' +
		'            <li ng-if="cheerZero" class="type-1">\n' +
		'              <div class="content">\n' +
		'                <p>{{l10n.landing.noCheers}}</p>\n' +
		'              </div>\n' +
		'            </li>\n' +
		'            <li ng-if="!cheerZero" class="type-2">\n' +
		'              <div class="thumbnail"><span class="count">{{numberCheer}}</span></div>\n' +
		'              <div class="content">\n' +
		'                <p>{{l10n.landing.youHave}} &nbsp;<span class="bold">{{numberCheer}}</span>&nbsp;{{contentCheer}}</p>\n' +
		'              </div>\n' +
		'            </li>\n' +
		'            <li ng-if="!cheerZero">\n' +
		'              <div class="thumbnail"><img alt="" src="{{perSmile.member[\'small-avatar\']}}"/></div>\n' +
		'              <div class="content">\n' +
		'                <p><span class="name">{{perSmile.member[\'user-name\']}}</span><span> has sent a smiley.</span></p>\n' +
		'              </div>\n' +
		'            </li>\n' +
		'            <li ng-if="!cheerZero">\n' +
		'              <div class="thumbnail"><img alt="" src="{{perCheer.member[\'small-avatar\']}}"/></div>\n' +
		'              <div class="content">\n' +
		'                <p><span class="name">{{perCheer.member[\'user-name\']}}</span><span> has cheered you on.</span></p>\n' +
		'              </div>\n' +
		'            </li>\n' +
		'          </ul>\n' +
		'        </div>\n' +
		'      </div><a title="Go to your team page" href="javascript:;" class="section-item type-1 arrow arrow-1" ng-click="nav(\'/quitteam/team-landing-2\')"><span class="text">{{l10n.landing.goToTeam}}</span></a>\n' +
		'    </div>\n' +
		'    <div class="motivation-block">\n' +
		'      <div ng-class="backgroundColor" class="inner">\n' +
		'        <div class="title">\n' +
		'          <p>{{l10n.landing.title2}}</p>\n' +
		'        </div>\n' +
		'        <ul data-snap-ignore="true" data-name="motivation-carousel" rn-carousel="rn-carousel" rn-carousel-indicator="rn-carousel-indicator" class="motivation-carousel">\n' +
		'          <li ng-repeat="item in Items" id="{{$first?&quot;rn-carousel-1&quot;:&quot;&quot;}}" gk-on-last-repeat="gk-on-last-repeat" class="rn-carousel-slide">\n' +
		'            <div ng-if="(($index &lt; (Items.length - 1)) &amp;&amp; ($index == 0))" class="content">\n' +
		'              <h2 translate="{{item.title}}"></h2>\n' +
		'              <div ng-bind-html="item.descriptioin" class="text-intro"></div>\n' +
		'              <div class="image-motivation"><img src="{{item.piture}}" alt=""/>\n' +
		'              </div>\n' +
		'            </div>\n' +
		'            <div ng-if="(($index &lt; (Items.length-1)) &amp;&amp; ($index != 0))" class="content">\n' +
		'              <h2 translate="{{item.title}}"></h2>\n' +
		'              <div ng-bind-html="item.descriptioin" class="text-intro"></div>\n' +
		'              <div class="image-motivation"><img src="{{item.piture}}" alt=""/>\n' +
		'              </div>\n' +
		'            </div>\n' +
		'            <div ng-if="$index == (Items.length - 1)" class="content hide">\n' +
		'              <h2></h2>\n' +
		'              <div class="text-intro"></div>\n' +
		'              <div class="image-motivation"><img src="" alt=""/>\n' +
		'              </div>\n' +
		'            </div>\n' +
		'          </li>\n' +
		'        </ul><a href="javascript:;" title="share friend" class="icon icon-share share-motivation" ng-click="shareMotivation()">share friend</a>\n' +
		'      </div>\n' +
		'    </div><a id="quit-team" data-name="quit-team-button" title="Quiting can be easier together!" href="javascript:;" ng-click="navToQuitteam()" ng-if="!showTeamActive" class="section-item quitteam arrow arrow-1 row-2"><span class="text"><span class="color-orange">{{l10n.landing.QTbtn}}</span>{{l10n.landing.QTcaption}}</span>\n' +
		'      <div class="image"><img src="images/upload/img-quitteam.png" alt="join team"/>\n' +
		'      </div></a><a title="" href="javascript:;" ng-click="getProductReminder()" class="section-item arrow arrow-1 row-2"><span class="text"><span class="color-orange">{{l10n.landing.PRbtn}}</span><span ng-show="productRemind">{{l10n.landing.PRcaption}}</span><span ng-show="!productRemind" class="type-1">{{l10n.landing.PRcaption2}}</span></span></a><a title="Get to know out products" href="javascript:;" class="section-item arrow arrow-1 row-2" ng-click="nav(\'/products\')"><span class="text"><span class=\'color-orange\'>{{l10n.landing.needExtra}}</span>{{l10n.landing.getToProduct}}</span></a>\n' +
		'    <footer id="footer">\n' +
		'      <div class="inner">\n' +
		'        <div class="footer-title">\n' +
		'          <p>{{l10n.footer.title}}</p>\n' +
		'        </div>\n' +
		'        <div class="content-footer">\n' +
		'          <div class="message">\n' +
		'            <p ng-bind-html="l10n.footer.messages"></p>\n' +
		'          </div>\n' +
		'          <div class="logo-footer"><a href="javascript:;" title="logo niquitin" class="logo-niquitin"><img src="images/logo-niquitin.png" alt="logo niquitin"/></a><a href="javascript:;" title="logo gsk" class="logo-gsk"><img src="images/logo-gsk-large.png" alt="logo gsk"/></a>\n' +
		'          </div>\n' +
		'          <div class="text-footer"><a href="#/privacy-policy" title="{{l10n.footer.link}}" class="link-policy" ng-click="nav(\'/privacy-policy\')">{{l10n.footer.link}}</a>\n' +
		'          </div>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </footer>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/landing-page/landing-static.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/landing-page/landing-static.jade',
		'<section gk-required-notification="gk-required-notification" ng-model="notiHabit" data-overlay="overlay-1" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 habit-popup overlay-white type-2 hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.toHabit"></p>\n' +
		'    </div>\n' +
		'    <div class="button-box"><a href="#/habit" title="{{l10n.button.ok}}" class="btn btn-6 go-btn" data-hide="data-hide"><span>{{l10n.button.ok}}</span></a><a href="javascript:;" title="{{l10n.button.skip}}" class="btn btn-6 skip-btn" data-hide="data-hide" ng-click="habitClose()"><span>{{l10n.button.skip}}</span></a>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<div gk-required-notification="gk-required-notification" ng-model="notiWelcomeBack" class="popup-1 overlay-white type-2 welcome-back hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content"><img src="images/upload/welcome-back.png" alt="welcome back"/>\n' +
		'      <p ng-bind-html="l10n.login.welcomeBack"></p>\n' +
		'      <div class="button-box"><a href="javascript:;" title="{{l10n.button.continue}}" class="btn btn-8" data-hide="data-hide"><span>{{l10n.button.continue}}</span></a><a href="javascript:;" title="{{l10n.button.startFresh}}" class="btn btn-8" data-hide="data-hide" ng-click="startFresh()"><span>{{l10n.button.startFresh}}</span></a>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</div>\n' +
		'<section gk-required-notification="gk-required-notification" ng-model="notiCreateProfile" data-overlay="overlay-create-profile" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 creat-profile-popup overlay hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.creatProfile"></p>\n' +
		'    </div><a href="javascript:;" title="{{l10n.button.go}}" class="btn btn-6" data-hide="data-hide" ng-click="go(&quot;/login&quot;)"><span>{{l10n.button.go}}</span></a>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<section gk-required-notification="gk-required-notification" ng-model="notiChallenge" data-overlay="overlay-challenge" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 challenge-popup overlay-white type-2 hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.challenge"></p>\n' +
		'    </div>\n' +
		'    <div class="button-box"><a href="javascript:;" title="{{l10n.button.setChallenges}}" class="btn btn-6 go-btn" data-hide="data-hide" ng-click="setChallenges()"><span>{{l10n.button.setChallenges}}</span></a><a href="javascript:;" title="{{l10n.button.skip}}" class="btn btn-6 skip-btn" data-hide="data-hide" ng-click="skip()"><span>{{l10n.button.skip}}</span></a>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<section gk-required-notification="gk-required-notification" data-overlay="overlay-rateapp" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 rate-app-popup overlay hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.rateAppTitle" class="strong"></p>\n' +
		'      <p ng-bind-html="l10n.popup.rateAppContent"></p>\n' +
		'    </div><a href="javascript:;" title="{{l10n.button.rateApp}}" class="btn btn-6 go-btn-2" data-hide="data-hide" ng-click="rateApp()"><span>{{l10n.button.rateApp}}</span></a><a href="javascript:;" title="{{l10n.button.remindLater}}" class="btn btn-6 go-btn" data-hide="data-hide" ng-click="remindRateApp()"><span>{{l10n.button.remindLater}}</span></a><a href="javascript:;" title="{{l10n.button.noThanks}}" class="btn btn-6 skip-btn" data-hide="data-hide" ng-click="cancelRateApp()"><span>{{l10n.button.noThanks}}</span></a>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main" class="landing-page">\n' +
		'  <div class="inner">\n' +
		'    <div id="time-challenge-block" class="time-challenge-block">\n' +
		'      <figure><img src="images/badge-landing.png" alt="badge landing"/></figure>\n' +
		'      <div class="content-challenge">\n' +
		'        <div class="time-challenge">\n' +
		'          <p>{{l10n.landing.timeChallenge}}</p>\n' +
		'          <p class="date">3 Days</p>\n' +
		'        </div>\n' +
		'        <div class="time-completed">\n' +
		'          <p><span class="first-num">0</span><span class="text-of">{{l10n.landing.ofText}}</span><span class="last-num">72</span></p>\n' +
		'          <p>{{l10n.landing.hourCompleted}}</p>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <div class="group-btn"><a id="btn-distract-me" href="javascript:;" title="{{l10n.button.distractMe}}" ng-click="doNothing()" class="icon-text"><i class="icon-distract"></i><span>{{l10n.button.distractMe}}</span></a><a id="btn-slipped" href="javascript:;" title="{{l10n.button.iSlip}}" ng-click="doNothing()" class="icon-text"><i class="icon-slip"></i><span>{{l10n.button.iSlip}}</span></a></div>\n' +
		'    <div ng-show="showTeamActive" class="landing-activity">\n' +
		'      <div class="inner">\n' +
		'        <div class="activity-title">\n' +
		'          <p>{{l10n.landing.title1}}</p>\n' +
		'        </div>\n' +
		'        <div class="tab-pane">\n' +
		'          <ul ng-click="doNothing()" class="list activity-feed">\n' +
		'            <li>\n' +
		'              <div class="thumbnail"><span class="count">{{teamActivity[\'count-cheer\']}}</span></div>\n' +
		'              <div class="content">\n' +
		'                <p>{{l10n.landing.youHave}}<span class="bold">{{teamActivity[\'count-cheer\']}}</span>{{l10n.landing.cheers}}</p>\n' +
		'              </div>\n' +
		'            </li>\n' +
		'            <li ng-show="perSmile">\n' +
		'              <div class="thumbnail"><img alt="" src="{{perSmile.member.avatar}}"/></div>\n' +
		'              <div class="content">\n' +
		'                <p><span class="name">{{perSmile.member.name}}</span><span> has sent a smiley.</span></p>\n' +
		'              </div>\n' +
		'            </li>\n' +
		'            <li ng-show="perCheer">\n' +
		'              <div class="thumbnail"><img alt="" src="{{perCheer.member.avatar}}"/></div>\n' +
		'              <div class="content">\n' +
		'                <p><span class="name">{{perCheer.member.name}}</span><span> has cheered you on.</span></p>\n' +
		'              </div>\n' +
		'            </li>\n' +
		'          </ul>\n' +
		'        </div>\n' +
		'      </div><a title="Go to your team page" href="javascript:;" ng-click="doNothing()" class="section-item arrow arrow-1"><span class="text">{{l10n.landing.goToTeam}}</span></a>\n' +
		'    </div>\n' +
		'    <div class="motivation-block motivation-bg-2">\n' +
		'      <div class="inner">\n' +
		'        <div class="title">\n' +
		'          <p>{{l10n.landing.title2}}</p>\n' +
		'        </div>\n' +
		'        <ul data-snap-ignore="true" rn-carousel="rn-carousel" rn-carousel-indicator="rn-carousel-indicator" class="motivation-carousel">\n' +
		'          <li ng-repeat="item in Items" id="{{$first?&quot;#rn-carousel-1&quot;:&quot;&quot;}}" class="rn-carousel-slide">\n' +
		'            <div ng-if="(($index &lt; (Items.length - 1)) &amp;&amp; ($index == 0))" class="content">\n' +
		'              <h2 translate="{{item.title}}"></h2>\n' +
		'              <div class="text-intro">\n' +
		'                <p ng-bind-html="item.text"></p>\n' +
		'              </div>\n' +
		'              <div class="image-motivation"><img src="{{item.src}}" alt=""/></div>\n' +
		'            </div>\n' +
		'            <div ng-if="(($index &lt; (Items.length - 1)) &amp;&amp; ($index != 0))" class="content">\n' +
		'              <h2 translate="{{item.title}}"></h2>\n' +
		'              <div class="text-intro">\n' +
		'                <p ng-bind-html="item.text"></p>\n' +
		'              </div>\n' +
		'              <div class="image-motivation"><img src="{{item.src}}" alt=""/></div>\n' +
		'            </div>\n' +
		'            <div ng-if="$index == (Items.length - 1)" class="show-gallery"><a href="javascript:;" title="see all gallery" ng-click="doNothing()"><img src="images/upload/all-motivation.png" alt="see all gallery"/></a></div>\n' +
		'          </li>\n' +
		'        </ul><a href="javascript:;" title="share friend" ng-click="doNothing()" class="icon icon-share share-motivation">share friend</a>\n' +
		'        <div class="group-link arrow arrow-2"><a title="Read the science behind" href="javascript:;" ng-show="!showVideo" class="science-link">{{l10n.motivation.readScience}}</a></div>\n' +
		'      </div>\n' +
		'    </div><a id="quit-team" title="Quiting can be easier together!" href="javascript:;" ng-click="doNothing()" ng-show="!showTeamActive" class="section-item arrow arrow-1 row-2"><span class="text"><span class="color-orange">{{l10n.landing.QTbtn}}</span>{{l10n.landing.QTcaption}}</span></a><a title="It’s time! Check out your daily reminder" href="javascript:;" ng-click="doNothing()" class="section-item arrow arrow-1 row-2"><span class="text"><span class="color-orange">{{l10n.landing.PRbtn}}</span>{{l10n.landing.PRcaption}}</span></a><a title="Get to know out products" href="javascript:;" ng-click="doNothing()" class="section-item arrow arrow-1 row-2"><span class="text"><span class="color-orange">{{l10n.landing.needExtra}}</span>{{l10n.landing.getToProduct}}</span></a>\n' +
		'    <footer id="footer">\n' +
		'      <div class="inner">\n' +
		'        <div class="footer-title">\n' +
		'          <p>{{l10n.footer.title}}</p>\n' +
		'        </div>\n' +
		'        <div class="content-footer">\n' +
		'          <div class="message">\n' +
		'            <p ng-bind-html="l10n.footer.messages"></p>\n' +
		'          </div>\n' +
		'          <div class="logo-footer"><a href="javascript:;" title="logo niquitin" class="logo-niquitin"><img src="images/logo-niquitin.png" alt="logo niquitin"/></a><a href="javascript:;" title="logo gsk" class="logo-gsk"><img src="images/logo-gsk-large.png" alt="logo gsk"/></a>\n' +
		'          </div>\n' +
		'          <div class="text-footer"><a href="#/privacy-policy" title="{{l10n.footer.link}}" class="link-policy" ng-click="nav(\'/privacy-policy\')">{{l10n.footer.link}}</a>\n' +
		'          </div>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </footer>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/landing-page/motivation-gallery.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/landing-page/motivation-gallery.jade',
		'<main id="main" class="motivation-gallery-page">\n' +
		'  <div class="inner">\n' +
		'    <div gk-motivation-gallery="gk-motivation-gallery" class="motivation-gallery">\n' +
		'      <div ng-class="mov.backgroundColor" ng-repeat="mov in motivatAll" gk-on-last-repeat="gk-on-last-repeat" class="motivation-block">\n' +
		'        <div ng-class="mov.backgroundColor" class="bgd-motivation">\n' +
		'          <div class="title hidden">\n' +
		'            <p>July 23rd 2014</p>\n' +
		'          </div>\n' +
		'          <div class="content">\n' +
		'            <h2>{{mov.title}}</h2>\n' +
		'            <div ng-bind-html="mov.descriptioin" class="text-intro"></div>\n' +
		'            <div class="image-motivation"><img src="{{mov.piture}}" alt="{{mov.title}}"/></div>\n' +
		'          </div>\n' +
		'          <div class="group-link"><a ng-click="shareMotivation(mov)" href="javascript:;" title="share friend" class="icon icon-share share-gallery">share friend</a>\n' +
		'          </div>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/landing-page/science-behind.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/landing-page/science-behind.jade',
		'<main id="main" class="science-behind-page">\n' +
		'  <div class="inner">\n' +
		'    <div class="science-behind">\n' +
		'      <div class="motivation-block-1">\n' +
		'        <div class="content">\n' +
		'          <div class="text-intro">\n' +
		'            <p>{{l10n.science.textIntro}}</p>\n' +
		'          </div>\n' +
		'          <div class="image-motivation"><img src="images/image-handcake.png" alt="hand cake"/>\n' +
		'          </div>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'      <div class="link-science"><i class="icon-science"></i><span>{{l10n.science.readScience}}</span></div>\n' +
		'      <div class="science-block">\n' +
		'        <p>{{l10n.science.content}}</p>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/landing-page/slip-up-badge.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/landing-page/slip-up-badge.jade',
		'<section gk-required-notification="gk-required-notification" ng-model="notiSlipUp" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 alert-slip-popup overlay-white type-2 hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.alertSlip"></p>\n' +
		'    </div>\n' +
		'    <div class="button-box"><a href="javascript:;" title="{{l10n.button.restart}}" class="btn btn-6 go-btn" data-hide="data-hide" ng-click="restartJourney()"><span>{{l10n.button.restart}}</span></a><a href="#/landing-page" title="{{l10n.button.cancel}}" class="btn btn-6" data-hide="data-hide"><span>{{l10n.button.cancel}}</span></a>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main" class="slip-up-page">\n' +
		'  <div class="inner container-bgd courage-content">\n' +
		'    <div class="courage-outer">\n' +
		'      <div class="inner">\n' +
		'        <div gk-max-height-block="gk-max-height-block" class="block-1">\n' +
		'          <h3 class="title">{{l10n.courage.title}}</h3><a href="javascript:;" title="" ng-click="share()" class="share">text</a>\n' +
		'          <div style="background-image: url(images/upload/badges/badge-slip.png)" class="badge badge-slipup"></div>\n' +
		'          <div id="courage-step-2" class="point"><span>+1</span></div>\n' +
		'          <div class="info">\n' +
		'            <p ng-bind-html="data[&quot;message-badge&quot;]"></p>\n' +
		'          </div>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <section class="group-btn notice"><a href="javascript:;" title="13 Badges" ng-click="nav(&quot;/quitpoint/your-badge&quot;)" class="icon-text"><i class="note-type-1"></i><span>{{USER[\'user-total-badges\']}} Badges</span></a><a href="javascript:;" title="462 Quit points" ng-click="nav(&quot;/quitpoint/your-point&quot;)" class="icon-text"><i class="note-type-2"></i><span>{{USER[\'user-total-points\']}} Quit points</span></a></section><a href="javascript:;" title="{{l10n.button.ok}}" ng-click="ok(&quot;/landing-page&quot;)" class="btn btn-1"><span>{{l10n.button.ok}}</span></a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/login/forgot-pass.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/login/forgot-pass.jade',
		'<section gk-notification="gk-notification" ng-model="notiForgotPass" data-name="forgot-pass-popup" class="popup-1 overlay-white type-table forgot-pass-popup hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.getPass"></p>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main" class="forgot-pass-page">\n' +
		'  <div class="inner">\n' +
		'    <form id="get-pass-form" name="forgotpass" class="get-pass-form">\n' +
		'      <ul class="form-group">\n' +
		'        <li>\n' +
		'          <p ng-bind-html="l10n.login.forgotMess"></p>\n' +
		'        </li>\n' +
		'        <li ng-class="{&quot;error&quot;: err.username}">\n' +
		'          <input type="text" name="username" placeholder="{{l10n.login.placeUserName}}" required="required" ng-model="username" class="input-text"/>\n' +
		'          <label for="username" class="alert-layer">Please enter username</label>\n' +
		'        </li>\n' +
		'      </ul><a href="javascript:;" title="{{l10n.login.forgotUsername}}" class="forgot-pass" ng-click="nav(&quot;/login/forgot-username&quot;)">{{l10n.login.forgotUsername}}</a>\n' +
		'      <button type="submit" ng-click="submit()" class="btn btn-submit">{{l10n.button.submit}}</button>\n' +
		'    </form>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/login/forgot-username.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/login/forgot-username.jade',
		'<section gk-notification="gk-notification" ng-model="notiForgotPass" data-name="forgot-pass-popup" class="popup-1 overlay-white type-table forgot-pass-popup hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.getPass"></p>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main" class="forgot-pass-page">\n' +
		'  <div class="inner">\n' +
		'    <form id="get-pass-form" name="forgotUsername" class="get-pass-form">\n' +
		'      <ul class="form-group">\n' +
		'        <li>\n' +
		'          <p ng-bind-html="l10n.login.forgotUsernameMess"></p>\n' +
		'        </li>\n' +
		'        <li>\n' +
		'          <input type="email" name="youremail" placeholder="{{l10n.login.placeEmail}}" required="required" ng-model="email" class="input-text"/>\n' +
		'          <label for="youremail" class="alert-layer">Please enter username</label>\n' +
		'        </li>\n' +
		'      </ul>\n' +
		'      <button type="submit" ng-click="submit()" class="btn btn-submit">{{l10n.button.submit}}</button>\n' +
		'    </form>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/login/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/login/index.jade',
		'<main id="main" class="login login-1">\n' +
		'  <div class="content">\n' +
		'    <div class="group-singin"><a href="javascript:;" title="{{l10n.login.signUp}}" class="btn-default btn-login" ng-click="nav(&quot;/signup&quot;)">{{l10n.login.signUp}}</a><a href="javascript:;" title="{{l10n.login.signIn}}" class="btn-default btn-login" ng-click="nav(&quot;/login/login-2&quot;)">{{l10n.login.signIn}}</a>\n' +
		'    </div>\n' +
		'    <div class="group-bottom"><a href="#/tour" title="{{l10n.login.tour}}" class="tour-link">{{l10n.login.tour}}</a>\n' +
		'      <div class="content">\n' +
		'        <p><a title="{{l10n.login.viewPrivaceyPolicy}}" href="javascript:;" ng-click="nav(&quot;/privacy-policy&quot;)">{{l10n.login.viewPrivaceyPolicy}}</a></p>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/login/login-2.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/login/login-2.jade',
		'<main id="main" class="login login-2">\n' +
		'  <div class="content">\n' +
		'    <div class="login-frm">\n' +
		'      <form id="login-form" method="POST" action="" name="loginform">\n' +
		'        <div ng-class="{&quot;error&quot;: err.userName}" class="field-group">\n' +
		'          <input type="userName" name="userName" id="userName" placeholder="{{l10n.login.placeUserName}}" class="input" ng-model="credential.userName" required="required"/>\n' +
		'          <label for="username" class="alert-layer">{{l10n.message.alertUserName}}</label>\n' +
		'        </div>\n' +
		'        <div ng-class="{&quot;error&quot;: err.password}" class="field-group">\n' +
		'          <input type="password" name="password" id="password" placeholder="{{l10n.login.placeEnterPass}}" class="input" ng-model="credential.password" ng-trim="false" required="required" maxlength="12"/>\n' +
		'          <label for="password" class="alert-layer">{{l10n.message.alertPassSignIn}}</label>\n' +
		'        </div>\n' +
		'        <div class="field-group field-checkbox">\n' +
		'          <input type="checkbox" name="checkbox" id="chk-signed" class="checkbox" ng-model="credential.isRemember" ng-checked="true" ng-true-value="true" ng-false-value="false"/>\n' +
		'          <label for="chk-signed">{{l10n.login.rememberMe}}</label><a href="javascript:;" title="{{l10n.login.forgotPass}}" class="forgot-pass" ng-click="nav(&quot;/login/forgot-pass&quot;)">{{l10n.login.forgotPass}}</a>\n' +
		'        </div>\n' +
		'        <input type="submit" name="submit" id="submit" value="{{l10n.button.ok}}" class="btn-default btn-login uppercase" ng-click="submit()"/>\n' +
		'      </form>\n' +
		'      <p>{{l10n.login.signUp2}}<a title="{{l10n.login.signUp}}" href="#/signup" class="forgot-pass">{{l10n.login.signUp}}</a></p>\n' +
		'    </div>\n' +
		'    <div class="group-bottom"><a href="#/tour" title="{{l10n.login.tour}}" class="tour">{{l10n.login.tour}}</a>\n' +
		'      <div class="content">\n' +
		'        <p><a title="{{l10n.login.viewPrivaceyPolicy}}" href="javascript:;" ng-click="nav(&quot;/privacy-policy&quot;)">{{l10n.login.viewPrivaceyPolicy}}</a></p>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/login/password-coming.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/login/password-coming.jade',
		'<main id="main" class="password-coming-page">\n' +
		'  <div class="inner">\n' +
		'    <div ng-bind-html="l10n.login.textComing" class="password-coming"></div>\n' +
		'    <button type="submit" class="btn btn-1">{{l10n.button.continue}}</button>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/login/welcome-back.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/login/welcome-back.jade',
		'<main id="main" class="welcome-back-page">\n' +
		'  <div class="inner">\n' +
		'    <div class="content"><img src="images/upload/welcome-back.png" alt="welcome back"/>\n' +
		'      <div class="desc">\n' +
		'        <p>{{l10n.login.welcomeBack}}</p>\n' +
		'      </div>\n' +
		'      <div class="btn-group"><a href="javascript:;" title="{{l10n.button.continue}}" class="btn btn-8" ng-click="continue()"><span>{{l10n.button.continue}}</span></a><a href="javascript:;" title="{{l10n.button.startFresh}}" class="btn btn-8" ng-click="startFresh()"><span>{{l10n.button.startFresh}}</span></a>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/main/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/main/index.jade',
		'<div id="main" class="homepage"><a href="#/signup">signup</a><br/><a href="#/tour">tour</a><br/><a href="#/login">login</a><br/><a href="#/account-settings">account setting</a><br/><a href="#/habit">habit</a><br/><a href="#/products">products</a><br/><a href="#/quitteam">quitteam</a><br/><a href="#/quitTeam/team-landing-1">Quit team</a><br/><a href="#/quitTeam/team-landing-2">Quit team</a><br/><a href="#/landing-page">Landing Page</a></div>');
}]);

angular.module('views/products/detail-product.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/products/detail-product.jade',
		'<main id="main" class="product-detail-page">\n' +
		'  <div class="inner">\n' +
		'    <div class="intro-product">\n' +
		'      <div class="preview">\n' +
		'        <p class="name-product">{{productChild.name}}</p><img src="{{productChild.picture}}" alt="product niquitin patch"/>\n' +
		'      </div>\n' +
		'      <div class="info-block">\n' +
		'        <p ng-bind-html="productChild.description"></p>\n' +
		'      </div>\n' +
		'    </div><a title="Add product to profile" href="" class="section-item section-type-2 " ng-click="addProductProfile()"><i class="icon-1 icon-plus"></i><span class="text">Add product to profile</span></a>\n' +
		'  </div>\n' +
		'</main>\n' +
		'<section gk-required-notification="gk-required-notification" ng-model="notiProduct" data-overlay="overlay-2" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 product-popup overlay-white type-2 hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p><span ng-bind-html="l10n.popup.informationTop"></span><span>{{product.name}}</span><span ng-bind-html="l10n.popup.informationBottom"></span></p>\n' +
		'    </div>\n' +
		'    <div class="button-box"><a href="javascript:;" title="{{l10n.button.yes}}" class="btn btn-6 go-btn" data-hide="data-hide" ng-click="productClose()"><span>{{l10n.button.yes}}</span></a><a href="javascript:;" title="Skip" class="btn btn-6 skip-btn" data-hide="data-hide" ng-click="nav(&quot;/landing-page&quot;)"><span>Skip</span></a>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<section gk-required-notification="gk-required-notification" ng-model="notiChange" data-overlay="overlay-1" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 change-popup overlay-white type-2 hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.change"></p>\n' +
		'    </div>\n' +
		'    <div class="button-box"><a href="javascript:;" title="{{l10n.button.yes}}" class="btn btn-6 go-btn" data-hide="data-hide" ng-click="nav(&quot;/account-settings&quot;)"><span>{{l10n.button.yes}}</span></a><a href="javascript:;" title="{{l10n.button.skip}}" class="btn btn-6 skip-btn" data-hide="data-hide" ng-click="habitClose()"><span>{{l10n.button.skip}}</span></a>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<section gk-notification="gk-notification" ng-model="notiRecommend" data-overlay="overlay-1" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 recommend-popup overlay-white type-2 hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.recommend"></p>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>');
}]);

angular.module('views/products/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/products/index.jade',
		'<main id="main" data-showheader="data-showheader" class="product-page">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <div class="preview"><img src="images/upload/image-niquitin.png" alt="Niquitin patch"/>\n' +
		'      </div><a title="Get product recommendations" href="javascript:;" class="section-item  arrow arrow-1" ng-click="getRecommentdations()"><span class="text">{{l10n.product.getProduct}}</span></a>\n' +
		'      <ul class="product-section">\n' +
		'        <li ng-repeat="product in listProduct"><a title="{{product.name}}" href="javascript:;" class="section-item section-type-1 arrow arrow-1" ng-click="getProduct(product[&quot;path&quot;])">\n' +
		'            <figure><img alt="icon strips" src="{{product.picture}}"/></figure><span class="text">{{product.name}}</span></a>\n' +
		'        </li>\n' +
		'      </ul><a title="My Product" href="javascript:;" class="section-item  arrow arrow-1" ng-click="nav(&quot;/products/my-product&quot;)"><span class="text">{{l10n.product.myProduct}}</span></a>\n' +
		'      <div class="notice-footer">\n' +
		'        <p ng-bind-html="l10n.product.noticeFooter"></p>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/products/my-product.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/products/my-product.jade',
		'<main id="main">\n' +
		'  <div class="inner">\n' +
		'    <div class="content scroll-y my-product-content">\n' +
		'      <div class="inner">\n' +
		'        <p ng-bind-html="l10n.product.guideText" class="guide-text"></p>\n' +
		'        <ul gk-panel-selector="gk-panel-selector" ng-model="pathProduct" class="list-item">\n' +
		'          <li ng-repeat="pro in listProDetail" gk-on-last-repeat="gk-on-last-repeat" data-value="{{pro.path}}"><a href="javascript:;" title="{{pro.name}}"><span style="background-image : url({{pro.picture}})" class="image"></span><span class="name">{{pro.name}}</span></a>\n' +
		'          </li>\n' +
		'        </ul>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/products/post-review.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/products/post-review.jade',
		'<section gk-notification="gk-notification" ng-model="notiThankRating" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 thank-rating-popup overlay-white hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.thank.productRating"></p><img src="images/img-thank.png" alt="thank"/>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main">\n' +
		'  <div class="inner">\n' +
		'    <div class="preview"><img src="images/upload/image-niquitin-3.png" alt="image niquitin patch"/>\n' +
		'      <div class="text-preview">\n' +
		'        <p class="name">NiQuitin Patch</p><a href="javascript:;" title="Full Description" ng-click="nav(&quot;/products/product-overview&quot;)" class="desc">{{l10n.product.fullDesc}}</a>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <form id="frm-review" name="form review" action="#" method="post" class="frm-review">\n' +
		'      <div class="form-group">\n' +
		'        <label for="overall-rating">{{l10n.product.rating}}</label>\n' +
		'        <ul class="rating-block" gk-rating="gk-rating" ng-model="model.rating">\n' +
		'          <li data-value=\'0\'><a href="javascript:;" title="rating">rating</a>\n' +
		'          </li>\n' +
		'          <li data-value=\'1\'><a href="javascript:;" title="rating">rating</a>\n' +
		'          </li>\n' +
		'          <li data-value=\'2\'><a href="javascript:;" title="rating">rating</a>\n' +
		'          </li>\n' +
		'          <li data-value=\'3\'><a href="javascript:;" title="rating">rating</a>\n' +
		'          </li>\n' +
		'          <li data-value=\'4\'><a href="javascript:;" title="rating">rating</a>\n' +
		'          </li>\n' +
		'        </ul>\n' +
		'      </div>\n' +
		'      <div class="form-group">\n' +
		'        <label for="nickname">{{l10n.product.nickname}}</label>\n' +
		'        <p>Jane Doe</p>\n' +
		'      </div>\n' +
		'      <div class="form-group">\n' +
		'        <label for="title-review">{{l10n.product.titleReview}}</label>\n' +
		'        <input type="text" name="Title" id="title-review" value="" ng-model="model.title"/>\n' +
		'      </div>\n' +
		'      <div class="form-group">\n' +
		'        <label for="your-review">{{l10n.product.yourReview}}</label>\n' +
		'        <textarea name="your-review" id="your-review" ng-model="model.content"></textarea>\n' +
		'      </div><a href="javascript:;" title="{{l10n.button.post}}" class="btn btn-2" ng-click="postReview()"><span>{{l10n.button.post}}</span></a>\n' +
		'    </form>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/products/product-overview.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/products/product-overview.jade',
		'<main id="main">\n' +
		'  <div class="inner">\n' +
		'    <ul gk-panel-selector="gk-panel-selector" ng-model="proChild" ng-class="typeChild" class="weight-product">\n' +
		'      <li gk-on-last-repeat="gk-on-last-repeat" ng-repeat="pro in productChilds" data-value="{{pro.path}}"><a href="javascript:;" title="{{pro.type}}">{{pro.type}}</a></li>\n' +
		'    </ul>\n' +
		'    <div class="intro-product">\n' +
		'      <div class="preview">\n' +
		'        <p class="name-product">{{productChild[\'product-name\']}}</p><img src="{{productChild[\'picture\']}}" alt="product niquitin patch"/>\n' +
		'      </div>\n' +
		'      <div class="info-block">\n' +
		'        <p ng-bind-html="productChild.description"></p>\n' +
		'      </div>\n' +
		'    </div><a title="Detailed Product Information" href="" class="section-item arrow arrow-1" ng-click="goToProductDetail()"><span class="text">Detailed Product Information</span></a><a title="Add product to profile" href="" class="section-item section-type-2 " ng-click="addProductProfile()"><i class="icon-1 icon-plus"></i><span class="text">Add product to profile</span></a>\n' +
		'    <div class="product-overview">\n' +
		'      <div class="review-rating">\n' +
		'        <div class="rating-container">\n' +
		'          <p>{{l10n.product.averageRating}}</p>\n' +
		'          <div class="rating"><span class="rating-empty"></span><span style="width: 92%;" class="rating-full"></span></div>\n' +
		'        </div>\n' +
		'        <p class="total-review">3 Reviews</p>\n' +
		'      </div>\n' +
		'      <div class="review-content">\n' +
		'        <div class="rating-container">\n' +
		'          <div class="rating"><span class="rating-empty"></span><span style="width: 92%;" class="rating-full"></span></div>\n' +
		'          <p>Love the patch!</p>\n' +
		'        </div>\n' +
		'        <div class="content">\n' +
		'          <p><strong class="name">Laura</strong>1/3/2014</p>\n' +
		'          <p>These are great. You take one when you would normally have a cigarette - they stop you from wanting to rip off peoples heads during a bad craving moment</p>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'      <section class="group-btn"><a href="javascript:;" title="{{l10n.product.showMore}}">{{l10n.product.showMore}}</a><a href="javascript:;" title="{{l10n.product.writeReview}}" ng-click="nav(&quot;/products/post-review&quot;)">{{l10n.product.writeReview}}</a>\n' +
		'      </section>\n' +
		'    </div>\n' +
		'    <ul class="product-section">\n' +
		'      <li ng-repeat="product in listProduct"><a title="{{product.name}}" href="javascript:;" class="section-item section-type-1 arrow arrow-1" ng-click="getProduct(product[&quot;path&quot;])">\n' +
		'          <figure><img alt="icon strips" src="{{product.picture}}"/></figure><span class="text">{{product.name}}</span></a>\n' +
		'      </li><a title="My Product" href="javascript:;" class="section-item  arrow arrow-1" ng-click="nav(&quot;/products/my-product&quot;)"><span class="text">{{l10n.product.myProduct}}</span></a>\n' +
		'    </ul>\n' +
		'    <div class="notice-footer">\n' +
		'      <p ng-bind-html="l10n.product.noticeFooter"></p>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/products/product-reminder.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/products/product-reminder.jade',
		'<main id="main" class="product-reminder-page">\n' +
		'  <div class="inner">\n' +
		'    <div class="intro-product">\n' +
		'      <div class="preview"><img src="{{product.picture}}" alt="product reminder"/>\n' +
		'      </div>\n' +
		'      <div class="info-block">\n' +
		'        <p ng-bind-html="productMemind.message"></p>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <div class="block-info"><a href="javascript:;" title="Read More" class="read-more arrow arrow-2">Read More</a>\n' +
		'      <div ng-bind-html="product.content" class="block-detail"></div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'  <div class="notice-footer">\n' +
		'    <p ng-bind-html="l10n.product.noticeFooter"></p>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/products/purchase-product.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/products/purchase-product.jade',
		'<main id="main">\n' +
		'  <div class="inner">\n' +
		'    <div class="intro-product">\n' +
		'      <div class="preview">\n' +
		'        <p class="name-product">NiQuitin Patch</p><img src="images/upload/image-niquitin-1.png" alt="product niquitin patch"/>\n' +
		'      </div>\n' +
		'      <div class="info-block">\n' +
		'        <p>NiQuitin Patch helps prevent the urge <br />to smoke all day long. The patches with unique SmartControl&reg; Technology <br />provide a rapid release followed by a <br /> continuous delivery of nicotine.</p>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <div class="your-point">\n' +
		'      <p>Your quit points are&nbsp;<span class="color-orange">325 points</span></p>\n' +
		'    </div><a title="Use your quit points and recieve notice 10% offer" href="javascript:;" class="section-item arrow arrow-2 bg-orange"><span class="text">Use your quit points and <br/>recieve notice 10% offer </span></a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/products/thank-rating.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/products/thank-rating.jade',
		'<main id="main" class="rating-thank-page">\n' +
		'  <div class="inner container-bgd">\n' +
		'    <h3 ng-bind-html="l10n.thank.productRating" class="title"></h3>\n' +
		'  </div><a href="javascript:;" title="{{l10n.button.continue}}" class="btn btn-1" ng-click="nav(&quot;/products/my-product&quot;)"><span>{{l10n.button.continue}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/quitpoint/badge-detail-template.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitpoint/badge-detail-template.jade',
		'<main id="main" class="quitpoint-page">\n' +
		'  <div class="inner container-bgd courage-content">\n' +
		'    <div class="courage-outer">\n' +
		'      <div class="inner">\n' +
		'        <div gk-max-height-block="gk-max-height-block" class="block-1">\n' +
		'          <h3 class="title">{{model.title}}</h3><a href="javascript:;" ng-click="share()" class="share">text</a>\n' +
		'          <div class="badge"><img id="courage-step-1" title="model.badge.title" src="model.badge.src" class="badge-img"/>\n' +
		'            <div id="courage-step-2" class="point"><span>+{{model.badge.point}}</span></div>\n' +
		'          </div>\n' +
		'          <div class="info">\n' +
		'            <p>{{model.desc}}</p>\n' +
		'          </div>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <section class="group-btn notice"><a href="javascript:;" title="{{model.note1.title}}" ng-click="nav(model.note1.click)" class="icon-text"><i class="note-type-1"></i><span>{{model.note1.span}}</span></a><a href="javascript:;" title="{{model.note2.title}}" ng-click="nav(model.note2.click)" class="icon-text"><i class="note-type-2"></i><span>{{model.note2.span}}</span></a></section><a href="{{model.submitLink}}" title="OK" class="btn btn-1 uppercase"><span>{{l10n.button.ok}}</span></a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/quitpoint/character-detail.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitpoint/character-detail.jade',
		'<main id="main" class="quitpoint-page">\n' +
		'  <div class="inner container-bgd character-detail">\n' +
		'    <div class="block-2">\n' +
		'      <div class="character"><img src="{{avatarRedeem[\'profile-avatar\']}}" alt="Panda"/>\n' +
		'      </div>\n' +
		'      <div class="info">\n' +
		'        <p ng-bind-html="l10n.quitPoint.characterSay"></p>\n' +
		'      </div>\n' +
		'    </div><a href="javascript:;" title="Done" ng-click="nav(&quot;/landing-page&quot;)" class="btn btn-6"><span>{{l10n.button.done}}</span></a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/quitpoint/coupon-detail.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitpoint/coupon-detail.jade',
		'<main id="main" class="quitpoint-page">\n' +
		'  <div class="inner coupons-content coupon-detail">\n' +
		'    <div class="coupons-block">\n' +
		'      <div class="product-box">\n' +
		'        <figure><img src="{{item.picture}}" alt="{{item.title}}"/></figure>\n' +
		'        <div class="desc">\n' +
		'          <p>{{item.title}}<span class="large">{{item["big-title"]}}</span></p>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'      <div class="detail">\n' +
		'        <h3>{{item["sub-title"]}}</h3>\n' +
		'        <p ng-bind-html="item.intro"></p><a href="javascript:;" class="btn-details"><span>{{l10n.quitPoint.seeOffer}}</span></a>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <div ng-bind-html="item.description" class="offer-details"></div>\n' +
		'  </div>\n' +
		'</main><a href="javascript:;" title="{{l10n.button.backToHome}}" class="btn btn-back-homepage btn-6" ng-click="nav(&quot;/landing-page&quot;)"><span>{{l10n.button.backToHome}}</span></a>');
}]);

angular.module('views/quitpoint/courage.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitpoint/courage.jade',
		'<main id="main" class="quitpoint-page">\n' +
		'  <div class="inner container-bgd courage-content">\n' +
		'    <div class="courage-outer">\n' +
		'      <div class="inner">\n' +
		'        <div gk-max-height-block="gk-max-height-block" class="block-1">\n' +
		'          <h3 class="title">{{model.title}}</h3><a href="javascript:;" ng-click="shareBadge()" class="share">text</a>\n' +
		'          <div class="badge-wrapper">\n' +
		'            <div id="courage-step-1" class="badge"></div>\n' +
		'          </div>\n' +
		'          <div id="courage-step-2" class="point"><span>+{{model.points}}</span></div>\n' +
		'          <div class="info">\n' +
		'            <p ng-bind-html="model.description"></p>\n' +
		'          </div>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <section class="group-btn notice"><a href="javascript:;" title="13 Badges" ng-click="nav(&quot;/quitpoint/your-badge&quot;)" class="icon-text"><i class="note-type-1"></i><span ng-if="USER[&quot;user-total-badges&quot;] &gt; 1">{{USER[\'user-total-badges\']}} Badges</span><span ng-if="USER[&quot;user-total-badges&quot;] &lt;= 1">{{USER[\'user-total-badges\']}} Badge</span></a><a href="javascript:;" title="462 Quit points" ng-click="nav(&quot;/quitpoint/your-point&quot;)" class="icon-text"><i class="note-type-2"></i><span>{{USER[\'user-total-points\']}} Quit points</span></a></section><a href="javascript:;" title="{{l10n.button.ok}}" ng-click="ok()" class="btn btn-1"><span>{{l10n.button.ok}}</span></a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/quitpoint/donation.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitpoint/donation.jade',
		'<section gk-notification="gk-notification" ng-model="notiDonation" data-lead-back="/landing-page" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 donation-popup overlay-white hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.thank.donation"></p><img src="images/upload/image-donation.png" alt="Donation"/>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main" class="quitpoint-page">\n' +
		'  <div class="inner donation-content">\n' +
		'    <div class="block-3">\n' +
		'      <div class="dona-box">\n' +
		'        <p>{{l10n.quitPoint.donationText}}<br/><span>{{l10n.quitPoint.donationTextColor}}</span><br/><span class="desc">{{l10n.quitPoint.donationUnderline}}</span></p><img src="images/upload/image-donation.png" alt="Donation"/>\n' +
		'      </div>\n' +
		'      <div class="section-item">\n' +
		'        <div class="donate"><span>I’d like to donate</span>\n' +
		'          <input type="text" name="point" placeholder="XX" class="input-1"/><span>points</span>\n' +
		'        </div>\n' +
		'        <p>{{l10n.quitPoint.donationSection}}</p>\n' +
		'      </div>\n' +
		'    </div><a href="javascript:;" title="{{l10n.button.donate}}" class="btn btn-6" ng-click="donateClicked()"><span>{{l10n.button.donate}}</span></a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/quitpoint/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitpoint/index.jade',
		'<section gk-notification="gk-notification" ng-model="notiReminder" data-name="reminder-popup" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 reminder-popup overlay-white hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.reminder"></p>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main" class="quitpoint-page">\n' +
		'  <div class="inner container-bgd startq-content">\n' +
		'    <div class="block-1">\n' +
		'      <p ng-bind-html="l10n.quitPoint.title" class="title"></p><a href="javascript:;" ng-click="startJourney()" class="start-journey">\n' +
		'        <div class="inner badge"><span ng-bind-html="l10n.quitPoint.startJourney"></span></div></a>\n' +
		'      <p ng-bind-html="l10n.quitPoint.info" class="info"></p>\n' +
		'    </div>\n' +
		'    <form class="select-1">\n' +
		'      <div gk-national-selector="gk-national-selector" ng-model="startTime" class="content">\n' +
		'        <select id="reminder_select">\n' +
		'          <option disabled="disabled" value="">Get started in...</option>\n' +
		'          <option value="2">In 2 Days</option>\n' +
		'          <option value="3">In 3 Days</option>\n' +
		'          <option value="4">In 4 Days</option>\n' +
		'          <option value="5">In 5 Days</option>\n' +
		'          <option value="6">In 6 Days</option>\n' +
		'          <optgroup label=""></optgroup>\n' +
		'        </select><span>Get started in...</span><a href="javascript:;" ng-click="next()" class="add-media take-photo reminder-start-journey-btn">\n' +
		'          <div class="midle">\n' +
		'            <p>{{l10n.button.remindMe}}</p>\n' +
		'          </div></a>\n' +
		'      </div>\n' +
		'    </form>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/quitpoint/individual-badge.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitpoint/individual-badge.jade',
		'<main id="main" class="quitpoint-page">\n' +
		'  <div class="inner container-bgd courage-content">\n' +
		'    <div class="courage-outer individual">\n' +
		'      <div class="inner">\n' +
		'        <div gk-max-height-block="gk-max-height-block" class="block-1">\n' +
		'          <h3 class="title">{{model.title}}</h3><a href="javascript:;" ng-click="share()" class="share">text</a>\n' +
		'          <div class="badge-wrapper">\n' +
		'            <div class="badge"></div>\n' +
		'          </div>\n' +
		'          <div id="courage-step-2" class="point"><span>+{{model.points}}</span></div>\n' +
		'          <div class="info">\n' +
		'            <p ng-bind-html="model.description"></p>\n' +
		'          </div>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </div><a href="javascript:;" title="ok" class="btn btn-1" ng-click="left()"><span>ok</span></a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/quitpoint/new-character.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitpoint/new-character.jade',
		'<section gk-notification="gk-notification" ng-model="notiNewCharacter" data-timeout="2000" data-lead-back="/landing-page" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 new-character-popup overlay-white hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.quitPoint.characterSay"></p><img src="{{avatarRedeem[\'profile-avatar\']}}" alt="Donation"/>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main" class="register-page">\n' +
		'  <div class="inner container-bgd character-content">\n' +
		'    <div class="block-1">\n' +
		'      <h3 ng-bind-html="l10n.account.title" class="title"></h3>\n' +
		'      <ul gk-panel-selector="gk-panel-selector" ng-model="character" class="list-item list-character">\n' +
		'        <li gk-on-last-repeat="gk-on-last-repeat" data-value="{{avatar[&quot;profile-img-path&quot;]}}" ng-repeat="avatar in avatarList"><a href="javascript:;" title="Panda"><span style="background-image : url({{avatar[\'small-img-path\']}})" class="image"></span><span class="name">{{avatar.point}}pts</span></a>\n' +
		'        </li>\n' +
		'      </ul>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main><a href="javascript:;" ng-click="submit(&quot;/quitpoint/character-detail&quot;)" class="btn btn-submit"><span>Redeem</span></a>');
}]);

angular.module('views/quitpoint/thank-donation.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitpoint/thank-donation.jade',
		'<main id="main" class="quitpoint-page">\n' +
		'  <div class="inner container-bgd donation-content">\n' +
		'    <div class="block-1"><img src="images/upload/image-donation.png" alt="Donation"/>\n' +
		'      <h3 class="title">Thanks for your donation!</h3>\n' +
		'    </div><a href="javascript:;" title="Back to My Homepage" class="btn btn-6" ng-click="nav(&quot;/landing-page&quot;)"><span>Back to My Homepage</span></a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/quitpoint/your-badge.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitpoint/your-badge.jade',
		'<main id="main" class="your-badge-page">\n' +
		'  <div class="inner badge-content">\n' +
		'    <p ng-bind-html="l10n.quitPoint.yBadgesText" class="info"></p>\n' +
		'    <ul class="your-badge">\n' +
		'      <li>\n' +
		'        <h3>Time Challenges</h3>\n' +
		'        <ul class="list-item list-badge">\n' +
		'          <li ng-repeat="item in challenges | filter: {type:&quot;Time Challenges&quot;}" ng-class="{&quot;none-active&quot;: item.count==0}"><a href="javascript:;" title="{{item.name}}" ng-if="item.count == 0"><span style="background-image : url({{item.thumbPath}})" class="image"></span><span class="desc">{{item.name}}</span><span ng-if="item.count &amp;&amp; item.count&gt;1" class="count">{{item.count}}x</span></a><a href="javascript:;" title="{{item.name}}" ng-if="item.count != 0" ng-click="navToDetail(&quot;/quitpoint/individual-badge&quot;, item)"><span style="background-image : url({{item.thumbPath}})" class="image"></span><span class="desc">{{item.name}}</span><span ng-if="item.count &amp;&amp; item.count&gt;1" class="count">{{item.count}}x</span></a></li>\n' +
		'        </ul>\n' +
		'      </li>\n' +
		'      <li>\n' +
		'        <h3>Science</h3>\n' +
		'        <ul class="list-item list-badge">\n' +
		'          <li ng-repeat="item in challenges | filter: {type:&quot;Science&quot;}" ng-class="{&quot;none-active&quot;: item.count==0}"><a href="javascript:;" title="{{item.name}}" ng-if="item.count == 0"><span style="background-image : url({{item.thumbPath}})" class="image"></span><span class="desc">{{item.name}}</span><span ng-if="item.count &amp;&amp; item.count&gt;1" class="count">{{item.count}}x</span></a><a href="javascript:;" title="{{item.name}}" ng-if="item.count != 0" ng-click="navToDetail(&quot;/quitpoint/individual-badge&quot;, item)"><span style="background-image : url({{item.thumbPath}})" class="image"></span><span class="desc">{{item.name}}</span><span ng-if="item.count &amp;&amp; item.count&gt;1" class="count">{{item.count}}x</span></a></li>\n' +
		'        </ul>\n' +
		'      </li>\n' +
		'      <li>\n' +
		'        <h3>Personal</h3>\n' +
		'        <ul class="list-item list-badge">\n' +
		'          <li ng-repeat="item in challenges | filter: {type: &quot;Personal&quot;}" ng-class="{&quot;none-active&quot;: item.count==0}"><a href="javascript:;" title="{{item.name}}" ng-if="item.count == 0"><span style="background-image : url({{item.thumbPath}})" class="image"></span><span class="desc">{{item.name}}</span><span ng-if="item.count &amp;&amp; item.count&gt;1" class="count">{{item.count}}x</span></a><a href="javascript:;" title="{{item.name}}" ng-if="item.count != 0" ng-click="navToDetail(&quot;/quitpoint/individual-badge&quot;, item)"><span style="background-image : url({{item.thumbPath}})" class="image"></span><span class="desc">{{item.name}}</span><span ng-if="item.count &amp;&amp; item.count&gt;1" class="count">{{item.count}}x</span></a></li>\n' +
		'        </ul>\n' +
		'      </li>\n' +
		'      <li>\n' +
		'        <h3>Calendar Bonus</h3>\n' +
		'        <ul class="list-item list-badge">\n' +
		'          <li ng-repeat="item in challenges | filter: {type:&quot;Calendar Bonus&quot;}" ng-class="{&quot;none-active&quot;: item.count==0}"><a href="javascript:;" title="{{item.name}}" ng-if="item.count == 0"><span style="background-image : url({{item.thumbPath}})" class="image"></span><span class="desc">{{item.name}}</span><span ng-if="item.count &amp;&amp; item.count&gt;1" class="count">{{item.count}}x</span></a><a href="javascript:;" title="{{item.name}}" ng-if="item.count != 0" ng-click="navToDetail(&quot;/quitpoint/individual-badge&quot;, item)"><span style="background-image : url({{item.thumbPath}})" class="image"></span><span class="desc">{{item.name}}</span><span ng-if="item.count &amp;&amp; item.count&gt;1" class="count">{{item.count}}x</span></a></li>\n' +
		'        </ul>\n' +
		'      </li>\n' +
		'    </ul>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/quitpoint/your-coupons.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitpoint/your-coupons.jade',
		'<main id="main" class="quitpoint-page">\n' +
		'  <div gk-your-coupons="gk-your-coupons" class="inner coupons-content">\n' +
		'    <ul>\n' +
		'      <li ng-repeat="item in data" gk-on-last-repeat="gk-on-last-repeat">\n' +
		'        <div class="coupons-block">\n' +
		'          <div class="product-box">\n' +
		'            <figure><img src="{{item.picture}}" alt="{{item.title}}"/></figure>\n' +
		'            <div class="desc">\n' +
		'              <p>{{item.title}}<span class="large">{{item["big-title"]}}</span></p>\n' +
		'            </div>\n' +
		'          </div>\n' +
		'          <div class="detail">\n' +
		'            <h3>{{item["sub-title"]}}</h3>\n' +
		'            <div ng-bind-html="item.intro"></div><a href="javascript:;" class="btn-details"><span>{{l10n.quitPoint.seeOffer}}</span></a>\n' +
		'          </div>\n' +
		'        </div>\n' +
		'        <div ng-bind-html="item.description" class="offer-details">\n' +
		'        </div>\n' +
		'      </li>\n' +
		'    </ul>\n' +
		'  </div>\n' +
		'</main><a href="javascript:;" title="{{l10n.button.emailCoupon}}" class="btn btn-email-coupons btn-6" ng-click="emailCoupon()"><span>{{l10n.button.emailCoupon}}</span></a><a href="javascript:;" title="{{l10n.button.backToHome}}" class="btn btn-back-homepage btn-6" style="display:none" ng-click="nav(&quot;/landing-page&quot;)"><span>{{l10n.button.backToHome}}</span></a>');
}]);

angular.module('views/quitpoint/your-point-detail.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitpoint/your-point-detail.jade',
		'<main id="main" class="quitpoint-page">\n' +
		'  <div class="inner container your-point-content detail-points">\n' +
		'    <div class="block-2">\n' +
		'      <div class="desc"><span>You currently have</span><span class="point">{{userPoint || 0}}</span><span class="quitpoint">Points</span></div>\n' +
		'      <ul class="list-menu">\n' +
		'        <li><a href="javascript:;" title="{{l10n.button.newCharacter}}" ng-click="nav(&quot;/quitpoint/new-character&quot;)">\n' +
		'            <h3 class="title">{{l10n.button.newCharacter}}</h3><span class="detail">25pts</span></a></li>\n' +
		'        <li><a href="javascript:;" title="{{l10n.button.donate}}" ng-click="nav(&quot;/quitpoint/donation&quot;)">\n' +
		'            <h3 class="title">{{l10n.button.donate}}</h3><span class="detail">Donate</span></a></li>\n' +
		'        <li ng-if="userPoint &gt;= constants.REAL_DISCOUNT"><a href="javascript:;" title="{{l10n.button.coupons}}" ng-click="nav(&quot;/quitpoint/your-coupons&quot;)">\n' +
		'            <h3 class="title">{{l10n.button.coupons}}</h3><span class="detail">Coupons</span></a></li>\n' +
		'        <li ng-if="userPoint &lt; constants.REAL_DISCOUNT"><a href="javascript:;" title="{{l10n.button.coupons}}" class="non-active">\n' +
		'            <h3 class="title">{{l10n.button.coupons}}</h3><span class="detail">Coupons</span></a></li>\n' +
		'      </ul>\n' +
		'    </div><a href="javascript:;" ng-click="nav(&quot;/landing-page&quot;)" class="btn btn-6"><span>{{l10n.button.cancel}}</span></a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/quitpoint/your-point.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitpoint/your-point.jade',
		'<main id="main" class="quitpoint-page">\n' +
		'  <div gk-your-quitpoint="gk-your-quitpoint" data-progress="{{userPoint}}" class="inner container your-point-content">\n' +
		'    <div class="block-2">\n' +
		'      <div class="desc"><span class="point">{{userPoint}}</span><span class="quitpoint">{{l10n.quitPoint.point}}</span>\n' +
		'      </div>\n' +
		'      <div class="content">\n' +
		'        <p class="info">{{l10n.quitPoint.yPointInfo}}<br/>{{l10n.quitPoint.yPointInfoA}}\n' +
		'          {{constants.REAL_DISCOUNT - userPoint}}\n' +
		'          {{l10n.quitPoint.yPointInfoB}}\n' +
		'        </p>\n' +
		'        <p class="note">{{l10n.quitPoint.yPointNote}}</p>\n' +
		'      </div>\n' +
		'    </div><a href="javascript:;" ng-click="nav(&quot;/quitpoint/your-point-detail&quot;)" class="btn btn-6 redeem"><span>{{l10n.button.redeem}}</span></a><a href="javascript:;" ng-click="nav(&quot;/landing-page&quot;)" class="btn btn-6 ok"><span>{{l10n.button.ok}}</span></a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/quitteam/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitteam/index.jade',
		'<main id="main" class="join-team">\n' +
		'  <div class="inner">\n' +
		'    <div class="content"><img src="images/upload/img-join-team.png" alt="join team"/>\n' +
		'      <p ng-bind-html="l10n.team.joinDesc" class="desc"></p>\n' +
		'      <p ng-bind-html="l10n.team.joinNote" class="note"></p>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main><a href="javascript:;" title="{{l10n.button.join}}" class="btn link-color-1 btn-join" ng-click="joinTeam()">{{l10n.button.join}}</a>');
}]);

angular.module('views/quitteam/team-landing-1.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitteam/team-landing-1.jade',
		'<section gk-notification="gk-notification" ng-model="notiSendCheer" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 send-cheer-popup overlay-white hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p>You sent {{members[\'user-name\']}} a cheer!</p><img src="{{USER[\'small-avatar\']}}" alt="avatar" class="avatar"/>\n' +
		'    </div>\n' +
		'    <div class="cheer">\n' +
		'      <p>{{cheer}}</p>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<section gk-notification="gk-notification" ng-model="notiSendSmiley" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 send-smiley-popup overlay-white hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p>You sent {{members[\'user-name\']}} a smiley!</p><img src="{{smile}}" alt="Donation"/>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main" class="team-landing-1">\n' +
		'  <div class="inner">\n' +
		'    <div data-group-thumbs="data-group-thumbs" class="group-thumbs">\n' +
		'      <div class="thumbs">\n' +
		'        <div class="thumbnails"><span style="background-image : url({{members[\'profile-avatar\']}})" class="avatar"></span><i class="img-flag flag-{{flag}}"></i>\n' +
		'        </div>\n' +
		'        <p class="desc">{{members[\'user-name\']}}</p>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <div data-plan-time="data-plan-time" class="plan-time type-1">\n' +
		'      <ul class="status">\n' +
		'        <li><a href="javascript:;" title="" class="total-days"><span class="number">{{totalDay}}</span><span ng-if="badges &gt; 1" class="text">Total days</span><span ng-if="badges &lt;= 1" class="text">Total day</span></a></li>\n' +
		'        <li><a href="javascript:;" title="" class="badges"><span class="number">{{badges}}</span><span ng-if="badges &gt; 1" class="text">Badges</span><span ng-if="badges &lt;= 1" class="text">Badge</span></a></li>\n' +
		'        <li><a href="javascript:;" title="" class="quit-points"><span class="number">{{quitPoint}}</span><span ng-if="quitpoint &gt; 1" class="text">QuitPoints</span><span ng-if="quitpoint &lt;= 1" class="text">QuitPoint</span></a></li>\n' +
		'      </ul>\n' +
		'    </div>\n' +
		'    <div data-latest-badges="data-latest-badges" class="latest-badges">\n' +
		'      <h4>{{l10n.team.latestBadges}}</h4>\n' +
		'      <ul>\n' +
		'        <li ng-repeat="bad in listBadget" class="bgd-shadow"><span style="background-image : url({{bad.thumbPath}})"></span></li>\n' +
		'        <li ng-repeat="nonBad in nonBadget"></li>\n' +
		'      </ul>\n' +
		'    </div><a href="javascript:;" title="send" ng-click="showSend()" ng-show="hideSendCheer" class="btn send-btn"><span>\n' +
		'        {{l10n.button.qSend}}\n' +
		'        \'{{members[\'user-name\']}}\'\n' +
		'        {{l10n.button.qACheer}}</span></a>\n' +
		'    <ul data-name="list-activities" ng-show="hideSendCheer" class="list activity-feed">\n' +
		'      <li ng-repeat="acti in listYouSend">\n' +
		'        <div class="thumbnail"><img alt="" src="{{acti.member[\'small-avatar\']}}"/></div>\n' +
		'        <div class="content">\n' +
		'          <p ng-bind-html="acti.activity.value" class="name-feed"></p>\n' +
		'        </div>\n' +
		'      </li>\n' +
		'    </ul><a href="javascript:;" title="{{l10n.button.cancel}}" class="btn send-btn" ng-click="hideSend()" ng-show="!hideSendCheer"><span>{{l10n.button.cancel}}</span></a>\n' +
		'    <div gk-tab="gk-tab" ng-show="!hideSendCheer" class="tabs member-team">\n' +
		'      <ul class="nav-tabs">\n' +
		'        <li id="nav-tabs"><a href="javascript:;" title="{{l10n.team.cheers}}" class="btn">{{l10n.team.cheers}}</a>\n' +
		'        </li>\n' +
		'        <li><a href="javascript:;" title="{{l10n.team.smileys}}" class="btn">{{l10n.team.smileys}}</a>\n' +
		'        </li>\n' +
		'      </ul>\n' +
		'      <div class="tab-content type-1">\n' +
		'        <div class="tab-pane">\n' +
		'          <div gk-send-selector="gk-send-selector" ng-model="cheer" class="content">\n' +
		'            <ul class="list-cheer">\n' +
		'              <li><a href="javascript:;" title="Way to go!">Way to go!</a></li>\n' +
		'              <li><a href="javascript:;" title="Going strong!">Going strong!</a></li>\n' +
		'              <li><a href="javascript:;" title="I\'m proud of you!">I\'m proud of you!</a></li>\n' +
		'              <li><a href="javascript:;" title="Let\'s keep this train moving!">Let\'s keep this train moving!</a></li>\n' +
		'              <li><a href="javascript:;" title="You\'re the boss!">You\'re the boss!</a></li>\n' +
		'              <li><a href="javascript:;" title="Keep up the good work!">Keep up the good work!</a></li>\n' +
		'              <li><a href="javascript:;" title="We can do this!">We can do this!</a></li>\n' +
		'              <li><a href="javascript:;" title="You\'re doing so well!">You\'re doing so well!</a></li>\n' +
		'              <li><a href="javascript:;" title="Keep going. It just gets easier">Keep going. It just gets easier</a></li>\n' +
		'              <li><a href="javascript:;" title="You\'re doing great. You should be proud of you.">You\'re doing great. You should be proud of you.</a></li>\n' +
		'              <li><a href="javascript:;" title="You are the wind beneath your quit wings.">You are the wind beneath your quit wings.</a></li>\n' +
		'              <li><a href="javascript:;" title="You are a rock. And rocks never smoke.">You are a rock. And rocks never smoke.</a></li>\n' +
		'              <li><a href="javascript:;" title="You are totally going to make this happen.">You are totally going to make this happen.</a></li>\n' +
		'              <li><a href="javascript:;" title="Watching you quit is a privilege. Well done, sir/madame.">Watching you quit is a privilege. Well done, sir/madame.</a></li>\n' +
		'              <li><a href="javascript:;" title="You are showing everyone how it\'s done.">You are showing everyone how it\'s done.</a></li>\n' +
		'              <li><a href="javascript:;" title="Take a selfie because you are the quitting poster child.">Take a selfie because you are the quitting poster child.</a></li>\n' +
		'              <li><a href="javascript:;" title="Keep going. It just gets easier">Keep going. It just gets easier</a></li>\n' +
		'            </ul><a href="javascript:;" title="{{l10n.button.sendCheer}}" class="btn btn-cheer" ng-click="sendCheer()"><span>{{l10n.button.sendCheer}}</span></a>\n' +
		'          </div>\n' +
		'        </div>\n' +
		'        <div class="tab-pane">\n' +
		'          <ul rn-carousel="rn-carousel" rn-carousel-indicator="rn-carousel-indicator" class="carousel-smileys">\n' +
		'            <li>\n' +
		'              <ul gk-panel-selector="gk-panel-selector" ng-model="smile" class="smileys">\n' +
		'                <li gk-on-last-repeat="gk-on-last-repeat" ng-repeat="item in smileList[0]" data-value="{{item.smile}}"><a href="javascript:;" title="{{item.title}}" style="background-image : url({{item.smile}})"></a></li>\n' +
		'              </ul>\n' +
		'            </li>\n' +
		'            <li>\n' +
		'              <ul gk-panel-selector="gk-panel-selector" ng-model="smile" class="smileys">\n' +
		'                <li gk-on-last-repeat="gk-on-last-repeat" ng-repeat="item in smileList[1]" data-value="{{item.smile}}"><a href="javascript:;" title="{{item.title}}" style="background-image : url({{item.smile}})"></a></li>\n' +
		'              </ul>\n' +
		'            </li>\n' +
		'            <li>\n' +
		'              <ul gk-panel-selector="gk-panel-selector" ng-model="smile" class="smileys">\n' +
		'                <li gk-on-last-repeat="gk-on-last-repeat" ng-repeat="item in smileList[2]" data-value="{{item.smile}}"><a href="javascript:;" title="{{item.title}}" style="background-image : url({{item.smile}})"></a></li>\n' +
		'              </ul>\n' +
		'            </li>\n' +
		'          </ul><a href="javascript:;" title="{{l10n.button.sendSmiley}}" class="btn btn-smile" ng-click="sendSmile(&quot;#/quitteam/team-landing-2&quot;)"><span>{{l10n.button.sendSmiley}}</span></a>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/quitteam/team-landing-2.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/quitteam/team-landing-2.jade',
		'<section gk-notification="gk-notification" data-timeout="3000" ng-model="notiFirstOne" class="popup-1 first-one-popup overlay-white hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.firstOne"></p><img src="images/upload/img-quitteam.png" alt="join team"/>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<section gk-notification="gk-notification" data-timeout="3000" ng-model="notiNotFull" class="popup-1 not-full-popup overlay-white hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.popup.notFull"></p><img src="images/upload/img-quitteam.png" alt="join team"/>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main">\n' +
		'  <div class="inner">\n' +
		'    <div class="group-thumbs group-thumbs-1">\n' +
		'      <ul>\n' +
		'        <li>\n' +
		'          <div class="thumbs" ng-click="viewTeamMember(listTeamMem[0].id)" id="step1">\n' +
		'            <div class="thumbnails"><span style="background-image : url({{listTeamMem[0][\'small-avatar\']}})" class="avatar"></span><i class="img-flag flag-{{listTeamMem[0].country}}"></i>\n' +
		'            </div>\n' +
		'            <p class="desc">{{listTeamMem[0][\'user-name\']}}</p>\n' +
		'          </div>\n' +
		'          <div class="thumbs" ng-click="viewTeamMember(listTeamMem[3].id)">\n' +
		'            <div class="thumbnails"><span style="background-image : url({{listTeamMem[3][\'small-avatar\']}})" class="avatar"></span><i class="img-flag flag-{{listTeamMem[3].country}}"></i>\n' +
		'            </div>\n' +
		'            <p class="desc">{{listTeamMem[3][\'user-name\']}}</p>\n' +
		'          </div>\n' +
		'        </li>\n' +
		'        <li>\n' +
		'          <div class="thumbs" ng-click="viewTeamMember(listTeamMem[1].id)">\n' +
		'            <div class="thumbnails"><span style="background-image : url({{listTeamMem[1][\'small-avatar\']}})" class="avatar"></span><i class="img-flag flag-{{listTeamMem[1].country}}"></i>\n' +
		'            </div>\n' +
		'            <p class="desc">{{listTeamMem[1][\'user-name\']}}</p>\n' +
		'          </div>\n' +
		'          <div class="thumbs" ng-click="viewTeamMember(listTeamMem[4].id)">\n' +
		'            <div class="thumbnails"><span style="background-image : url({{listTeamMem[4][\'small-avatar\']}})" class="avatar"></span><i class="img-flag flag-{{listTeamMem[4].country}}"></i>\n' +
		'            </div>\n' +
		'            <p class="desc">{{listTeamMem[4][\'user-name\']}}</p>\n' +
		'          </div>\n' +
		'        </li>\n' +
		'        <li>\n' +
		'          <div class="thumbs" ng-click="viewTeamMember(listTeamMem[2].id)">\n' +
		'            <div class="thumbnails"><span style="background-image : url({{listTeamMem[2][\'small-avatar\']}})" class="avatar"></span><i class="img-flag flag-{{listTeamMem[2].country}}"></i>\n' +
		'            </div>\n' +
		'            <p class="desc">{{listTeamMem[2][\'user-name\']}}</p>\n' +
		'          </div>\n' +
		'          <div class="thumbs" ng-click="viewTeamMember(listTeamMem[5].id)">\n' +
		'            <div class="thumbnails"><span style="background-image : url({{listTeamMem[5][\'small-avatar\']}})" class="avatar"></span><i class="img-flag flag-{{listTeamMem[5].country}}"></i>\n' +
		'            </div>\n' +
		'            <p class="desc">{{listTeamMem[5][\'user-name\']}}</p>\n' +
		'          </div>\n' +
		'        </li>\n' +
		'      </ul>\n' +
		'    </div>\n' +
		'    <div class="plan-time">\n' +
		'      <h4>{{l10n.team.teamStat}}</h4>\n' +
		'      <ul class="status">\n' +
		'        <li><a href="javascript:;" title="" class="total-days"><span class="number">{{totalPoint[\'total-days\']}}</span><span class="text">Total days</span></a></li>\n' +
		'        <li><a href="javascript:;" title="" class="badges"><span class="number">{{totalPoint[\'total-badges\']}}</span><span class="text">Badges</span></a></li>\n' +
		'        <li><a href="javascript:;" title="" class="quit-points"><span class="number">{{totalPoint[\'total-point\']}}</span><span class="text">QuitPoints</span></a></li>\n' +
		'      </ul>\n' +
		'    </div>\n' +
		'    <div gk-tab="gk-tab" class="tabs tabs-1">\n' +
		'      <ul id="nav-tabs" class="nav-tabs">\n' +
		'        <li><a href="javascript:void(0);" title="{{l10n.team.teamActivity}}" class="btn">{{l10n.team.teamActivity}}</a>\n' +
		'        </li>\n' +
		'        <li class="cheerTab"><a href="javascript:void(0);" title="Cheer" ng-click="readCheer()" id="btn-cheers" class="btn">{{l10n.team.receiveCheer}}</a></li>\n' +
		'      </ul>\n' +
		'      <div class="tab-content">\n' +
		'        <div data-name="pane-feeds" class="tab-pane tab-activity-feed">\n' +
		'          <div id="activity-feed">\n' +
		'            <ul data-name="list-activities" class="list activity-feed">\n' +
		'              <li ng-repeat="acti in nonActiFeed">\n' +
		'                <div class="thumbnail"><img alt="" src="{{acti.member[\'small-avatar\']}}"/></div>\n' +
		'                <div class="content">\n' +
		'                  <p ng-bind-html="acti.activity.value" class="name-feed"></p>\n' +
		'                </div>\n' +
		'              </li>\n' +
		'            </ul>\n' +
		'          </div>\n' +
		'          <ul class="list type-2">\n' +
		'            <li>\n' +
		'              <div class="thumbnail"><img alt="" src="images/upload/quit-team/quit-team-4.png"/></div>\n' +
		'              <div class="content">\n' +
		'                <p>{{activityFeed[0].activity.value}}</p>\n' +
		'              </div>\n' +
		'            </li>\n' +
		'          </ul>\n' +
		'        </div>\n' +
		'        <div data-name="pane-cheers" class="tab-pane">\n' +
		'          <ul data-name="list-cheers" class="list received-cheers">\n' +
		'            <li ng-repeat="cheer in activityCheers">\n' +
		'              <div class="thumbnail"><img src="{{cheer.member[\'small-avatar\']}}" alt=""/><span class="name">{{cheer.member.name}}</span>\n' +
		'              </div>\n' +
		'              <div ng-if="cheer.activity.type == \'SMILEY\'" class="content">\n' +
		'                <div class="inner smiley"><img src="{{cheer.activity.value}}" alt="" class="img-status"/>\n' +
		'                </div>\n' +
		'              </div>\n' +
		'              <div ng-if="cheer.activity.type == \'CHEER\'" class="content cheer-content">\n' +
		'                <div class="inner"><span>{{cheer.activity.value}}</span></div>\n' +
		'              </div>\n' +
		'            </li>\n' +
		'          </ul>\n' +
		'          <p ng-if="showCheer == 0" class="no-cheer">No news yet</p>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/reason/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/reason/index.jade',
		'<main id="main" class="reason-page">\n' +
		'  <div class="inner">\n' +
		'    <div class="reason-list">\n' +
		'      <h3>We all have a reason to quit. </h3>\n' +
		'      <div ng-if="reasonToQuit.memo" class="memo">\n' +
		'        <p>Your Memo</p>\n' +
		'        <p>{{reasonToQuit.memo}}</p>\n' +
		'      </div>\n' +
		'      <div ng-if="movie.src" class="video">\n' +
		'        <p>Your Video</p>\n' +
		'        <video ng-src="{{trustSrc(movie.src)}}" controls="controls" width="640" height="320"></video>\n' +
		'      </div>\n' +
		'      <div ng-if="reasonToQuit.audio" class="audio">\n' +
		'        <p>Your Audio</p>\n' +
		'        <audio controls="controls">\n' +
		'          <source ng-src="{{reasonToQuit.audio}}"/>\n' +
		'        </audio>\n' +
		'      </div>\n' +
		'      <div ng-if="reasonToQuit.photo" class="photo">\n' +
		'        <p>Your Photo</p><img ng-src="data:image/jpeg;base64,{{reasonToQuit.photo}}" alt=""/>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/recap/great.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/recap/great.jade',
		'<main id="main" class="recap-page">\n' +
		'  <div class="inner">\n' +
		'    <div class="add-slip"><img src="images/upload/image-recap-great.png" alt="add slip"/>\n' +
		'    </div>\n' +
		'    <div class="info-block">\n' +
		'      <p>{{l10n.recap.info}}</p>\n' +
		'    </div><a href="javascript:;" title="Next" ng-click="nav(&quot;/landing-page&quot;)" class="btn btn-1 btn-arrow"><span>{{l10n.button.next}}</span></a>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/recap/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/recap/index.jade',
		'<section gk-notification="gk-notification" ng-model="notiGreat" data-lead-back="/landing-page" gk-prevent-touch-move="gk-prevent-touch-move" class="popup-1 great-popup overlay-white hidden">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p ng-bind-html="l10n.recap.info"></p><img src="images/upload/image-recap-great.png" alt="add slip"/>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main" class="recap-page container-bgd">\n' +
		'  <div class="inner">\n' +
		'    <div class="add-slip"><img src="images/upload/image-recap.png" alt="add slip"/>\n' +
		'      <p ng-bind-html="l10n.recap.text"></p>\n' +
		'    </div>\n' +
		'    <div class="btn-group"><a href="javascript:;" title="{{l10n.button.yes}}" class="btn btn-8" ng-click="yes()"><span>{{l10n.button.yes}}</span></a><a href="javascript:;" title="{{l10n.button.no}}" class="btn btn-8" ng-click="no()"><span>{{l10n.button.no}}</span></a>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/signup/age.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/signup/age.jade',
		'<main id="main" class="register-page">\n' +
		'  <div class="inner container-bgd">\n' +
		'    <div class="block-1">\n' +
		'      <h3 class="title">{{l10n.signUp.age}}</h3>\n' +
		'      <div gk-national-selector="gk-national-selector" ng-model="age" class="select-1">\n' +
		'        <select data-signup-select="data-signup-select">\n' +
		'          <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'          <option value="18">18</option>\n' +
		'          <option value="19">19</option>\n' +
		'          <option value="20">20</option>\n' +
		'          <option value="21">21</option>\n' +
		'          <option value="22">22</option>\n' +
		'          <option value="23">23</option>\n' +
		'          <option value="24">24</option>\n' +
		'          <option value="25">25</option>\n' +
		'          <option value="26">26</option>\n' +
		'          <option value="27">27</option>\n' +
		'          <option value="28">28</option>\n' +
		'          <option value="29">29</option>\n' +
		'          <option value="30">30</option>\n' +
		'          <option value="31">31</option>\n' +
		'          <option value="32">32</option>\n' +
		'          <option value="33">33</option>\n' +
		'          <option value="34">34</option>\n' +
		'          <option value="35">35</option>\n' +
		'          <option value="36">36</option>\n' +
		'          <option value="37">37</option>\n' +
		'          <option value="38">38</option>\n' +
		'          <option value="39">39</option>\n' +
		'          <option value="40">40</option>\n' +
		'          <option value="41">41</option>\n' +
		'          <option value="42">42</option>\n' +
		'          <option value="43">43</option>\n' +
		'          <option value="44">44</option>\n' +
		'          <option value="45">45</option>\n' +
		'          <option value="46">46</option>\n' +
		'          <option value="47">47</option>\n' +
		'          <option value="48">48</option>\n' +
		'          <option value="49">49</option>\n' +
		'          <option value="50">50</option>\n' +
		'          <option value="51">51</option>\n' +
		'          <option value="52">52</option>\n' +
		'          <option value="53">53</option>\n' +
		'          <option value="54">54</option>\n' +
		'          <option value="55">55</option>\n' +
		'          <option value="56">56</option>\n' +
		'          <option value="57">57</option>\n' +
		'          <option value="58">58</option>\n' +
		'          <option value="59">59</option>\n' +
		'          <option value="60">60</option>\n' +
		'          <option value="61">61</option>\n' +
		'          <option value="62">62</option>\n' +
		'          <option value="63">63</option>\n' +
		'          <option value="64">64</option>\n' +
		'          <option value="65">65</option>\n' +
		'          <option value="66">66</option>\n' +
		'          <option value="67">67</option>\n' +
		'          <option value="68">68</option>\n' +
		'          <option value="69">69</option>\n' +
		'          <option value="70">70+</option>\n' +
		'          <optgroup label=""></optgroup>\n' +
		'        </select><span>{{l10n.signUp.valueDefault}}</span>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/signup/best-time.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/signup/best-time.jade',
		'<main id="main" class="register-page">\n' +
		'  <div class="inner container-bgd">\n' +
		'    <div class="block-1">\n' +
		'      <h3 class="title">{{l10n.signUp.bestTime}}</h3>\n' +
		'      <div class="select-1">\n' +
		'        <input type="time" name="besttime" id="besttime" ng-model="bestTime" data-signup-select="data-signup-select"/><span></span>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/signup/character.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/signup/character.jade',
		'<main id="main" class="register-page">\n' +
		'  <div class="inner container-bgd character-content">\n' +
		'    <div class="block-1">\n' +
		'      <h3 class="title">{{l10n.account.title}}</h3>\n' +
		'      <ul gk-panel-selector="gk-panel-selector" ng-model="character" class="list-item list-character">\n' +
		'        <li gk-on-last-repeat="gk-on-last-repeat" ng-repeat="item in avatarList" data-value="{{item.path}}"><a href="javascript:;" title="{{item.title || item.path}}"><span style="background-image : url({{item[&quot;small-img-path&quot;]}})" class="image"></span></a></li>\n' +
		'      </ul>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/signup/country.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/signup/country.jade',
		'<main id="main" class="register-page">\n' +
		'  <div class="inner container-bgd">\n' +
		'    <div class="block-1">\n' +
		'      <h3 class="title">{{l10n.signUp.country}}</h3>\n' +
		'      <div gk-national-selector="gk-national-selector" ng-model="country" class="select-1">\n' +
		'        <select data-signup-select="data-signup-select">\n' +
		'          <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'          <option value="UK">United Kingdom</option>\n' +
		'          <optgroup label=""></optgroup>\n' +
		'        </select><span>{{l10n.signUp.valueDefault}}</span>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/signup/gender.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/signup/gender.jade',
		'<main id="main" class="register-page">\n' +
		'  <div class="inner container-bgd gender-content">\n' +
		'    <ul gk-panel-selector="gk-panel-selector" ng-model="gender">\n' +
		'      <li class="gend-box male active" data-value="MALE"><a href="javascript:;" title="">\n' +
		'          <h3 class="title">{{l10n.signUp.male}}</h3><img src="images/transparent.png" alt="{{l10n.signUp.male}}"/></a></li>\n' +
		'      <li class="gend-box female" data-value="FEMALE"><a href="javascript:;" title="">\n' +
		'          <h3 class="title">{{l10n.signUp.female}}</h3><img src="images/transparent.png" alt="{{l10n.signUp.female}}"/></a></li>\n' +
		'    </ul>\n' +
		'  </div><a href="javascript:;" ng-click="next()" class="btn btn-1 btn-arrow"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/signup/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/signup/index.jade',
		'<main id="main" class="register-page">\n' +
		'  <div class="inner container-bgd profile-content">\n' +
		'    <form name="signupform" ng-submit="next()" class="form-1">\n' +
		'      <ul>\n' +
		'        <li ng-class="{&quot;error&quot;: err.fullName}">\n' +
		'          <input id="fullName" type="text" name="fullName" placeholder="{{l10n.login.placeName}}" ng-model="credential.fullName" required="required" class="input-1"/>\n' +
		'          <label for="fullName" class="alert-layer">{{l10n.message.alertName}}</label>\n' +
		'        </li>\n' +
		'        <li ng-class="{&quot;error&quot;: err.userName}">\n' +
		'          <input id="useName" type="text" name="userName" ng-model="credential.userName" placeholder="{{l10n.login.placeUserName}}" required="required" class="input-1"/>\n' +
		'          <label for="userName" class="alert-layer">{{l10n.message.alertUserName}}</label>\n' +
		'          <label for="userName" class="instructions">{{l10n.login.instructionsName}}</label>\n' +
		'        </li>\n' +
		'        <li ng-class="{&quot;error&quot;: err.email}">\n' +
		'          <input id="email" name="email" placeholder="{{l10n.account.email}}" ng-model="credential.email" ng-pattern="/^null|$/" required="required" type="email" class="input-1"/>\n' +
		'          <label for="email" class="alert-layer">{{l10n.message.alertEmail}}</label>\n' +
		'        </li>\n' +
		'        <li ng-class="{&quot;error&quot;: err.password}">\n' +
		'          <input id="password" type="password" name="password" placeholder="{{l10n.login.placePass}}" ng-model="credential.password" ng-trim="false" required="required" maxlength="12" class="input-1"/>\n' +
		'          <label for="password" class="alert-layer">{{l10n.message.alertPass}}</label>\n' +
		'        </li>\n' +
		'        <li ng-class="{&quot;error&quot;: err.confirmPass}">\n' +
		'          <input id="confirmPass" type="password" name="confirmPass" placeholder="{{l10n.login.placeRePass}}" ng-model="credential.confirmPass" ng-trim="false" required="required" maxlength="12" class="input-1"/>\n' +
		'          <label for="confirmPass" class="alert-layer">{{l10n.message.alertRePass}}</label>\n' +
		'          <label for="confirmPass" class="instructions">{{l10n.login.instructionsPass}}</label>\n' +
		'        </li>\n' +
		'      </ul>\n' +
		'      <button type="submit" ng-click="next()" class="btn btn-2">{{l10n.button.next}}</button>\n' +
		'    </form>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/signup/language.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/signup/language.jade',
		'<main id="main" class="register-page">\n' +
		'  <div class="inner container-bgd">\n' +
		'    <div class="block-1">\n' +
		'      <h3 class="title">{{l10n.signUp.language}}</h3>\n' +
		'      <div gk-national-selector="gk-national-selector" ng-model="language" class="select-1">\n' +
		'        <select data-signup-select="data-signup-select">\n' +
		'          <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'          <option value="en_US">English</option>\n' +
		'          <optgroup label=""></optgroup>\n' +
		'        </select><span>{{l10n.signUp.valueDefault}}</span>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/signup/progress-update.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/signup/progress-update.jade',
		'<main id="main" class="register-page">\n' +
		'  <div class="inner container-bgd progress-content">\n' +
		'    <div class="block-1">\n' +
		'      <h3 ng-bind-html="l10n.signUp.progress" class="title"></h3>\n' +
		'      <ul gk-panel-selector="gk-panel-selector" ng-model="progressUpdate">\n' +
		'        <li data-value="DAILY" class="time-group">\n' +
		'          <div class="inner"><a href="javascript:;" title=""><span ng-bind-html="l10n.signUp.daily"></span></a></div>\n' +
		'        </li>\n' +
		'        <li data-value="OTHERS" class="time-group">\n' +
		'          <div class="inner"><a href="javascript:;" title=""><span ng-bind-html="l10n.signUp.orther"></span></a></div>\n' +
		'        </li>\n' +
		'        <li data-value="WEEKLY" class="time-group">\n' +
		'          <div class="inner"><a href="javascript:;" title=""><span ng-bind-html="l10n.signUp.weekly"></span></a></div>\n' +
		'        </li>\n' +
		'      </ul>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" title="" ng-click="next()" class="btn btn-1 btn-arrow"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/signup/reason.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/signup/reason.jade',
		'<section data-overlay="overlay-media" gk-popup="gk-popup" ng-show="showPopup" class="popup-1 media-popup overlay">\n' +
		'  <div class="inner">\n' +
		'    <div class="content">\n' +
		'      <p><a href="javascript:;" title="Take Photo" ng-click="getPhotoFromCamera()">Take Photo</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Take Video" ng-click="captureVideo()">Take Video</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Choose Existing Photo" ng-click="getPhotoFromLibrary()">Choose Existing Photo</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Choose Existing Video" ng-click="getVideoFromLibrary()">Choose Existing Video</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Record a Voice Note" ng-click="captureAudio()">Record a Voice Note</a>\n' +
		'      </p>\n' +
		'      <p><a href="javascript:;" title="Write a Memo" ng-click="memoPopup()">Write a Memo</a>\n' +
		'      </p>\n' +
		'    </div><a href="javascript:;" title="{{l10n.button.cancel}}" class="btn btn-6 skip-btn" ng-click="closePopup()"><span>{{l10n.button.cancel}}</span></a>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<div gk-popup="gk-popup" ng-show="showMemoPopup" data-enable-touchmove="data-enable-touchmove" class="write-memo overlay">\n' +
		'  <div class="header">\n' +
		'    <h2>Write Memo</h2>\n' +
		'    <button type="button" ng-click="closePopup()" class="icon-close">&nbsp;</button>\n' +
		'  </div>\n' +
		'  <form id="form-memo" name="form-memo" novalidate="novalidate" class="form-feedback">\n' +
		'    <div class="form-group">\n' +
		'      <textarea name="message-memo" id="message-memo" placeholder="Write what\'s your reason to quit here..." gk-write-memo="gk-write-memo" required="required"></textarea>\n' +
		'    </div>\n' +
		'    <button type="submit" ng-click="updateMemo()" class="btn btn-2">Use Memo</button>\n' +
		'  </form>\n' +
		'</div>\n' +
		'<main id="main" class="register-page">\n' +
		'  <div class="inner container-bgd">\n' +
		'    <div class="block-1">\n' +
		'      <h3 ng-bind-html="l10n.habit.quest2" class="title"></h3>\n' +
		'      <div data-name="reason-to-quit" gk-reason-to-quit="gk-reason-to-quit" ng-model="reason" class="select-1 reason">\n' +
		'        <select data-signup-select="data-signup-select" class="slect-reason">\n' +
		'          <option disabled="" value="" selected="selected">{{l10n.signUp.valueDefault}}</option>\n' +
		'          <option value="Live longer">Live longer</option>\n' +
		'          <option value="A healthier life">A healthier life</option>\n' +
		'          <option value="My family">My family</option>\n' +
		'          <option value="Get physically fit">Get physically fit</option>\n' +
		'          <option value="Reduce my risk of illnesses">Reduce my risk of illnesses</option>\n' +
		'          <option value="Save money">Save money</option>\n' +
		'          <optgroup label=""></optgroup>\n' +
		'        </select><span class="value-reason">{{reason || l10n.signUp.valueDefault}}</span>\n' +
		'      </div><a href="javascript:;" ng-click="mediaPopup()" class="add-media-reason"><span class="icon-camera"></span><span>Add media</span></a>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" ng-click="nav(&quot;signup/character&quot;)" class="btn btn-6 type-2"><span>{{l10n.button.skip}}</span></a><a href="javascript:;" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/signup/replace.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/signup/replace.jade',
		'<main id="main" class="register-page">\n' +
		'  <div class="inner container-bgd">\n' +
		'    <div class="block-1">\n' +
		'      <h3 ng-bind-html="l10n.habit.quest3" class="title"></h3>\n' +
		'      <div gk-national-selector="gk-national-selector" ng-model="replace" class="select-1">\n' +
		'        <select data-signup-select="data-signup-select">\n' +
		'          <option disabled="" value="">{{l10n.signUp.valueDefault}}</option>\n' +
		'          <option gk-on-last-repeat="gk-on-last-repeat" value="{{product.path}}" ng-repeat="product in productList">{{product.content}}</option>\n' +
		'          <optgroup label=""></optgroup>\n' +
		'        </select><span>{{l10n.signUp.valueDefault}}</span>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" ng-click="next()" class="btn btn-2 btn-arrow-1"><span>{{l10n.button.next}}</span></a>\n' +
		'</main>');
}]);

angular.module('views/signup/where-hear.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/signup/where-hear.jade',
		'<main id="main" class="register-page">\n' +
		'  <div class="inner container-bgd wherehere-content">\n' +
		'    <div class="block-1">\n' +
		'      <h3 class="title">{{l10n.signUp.whereHere}}</h3>\n' +
		'      <div gk-national-selector="gk-national-selector" ng-model="whereHear.place" data-signup-select="data-signup-select" class="select-1">\n' +
		'        <select>\n' +
		'          <option disabled="" value="">Please select...</option>\n' +
		'          <option value="From a friend">From a friend</option>\n' +
		'          <option value="In-store">In-store</option>\n' +
		'          <option value="Online">Online</option>\n' +
		'          <option value="Other">Other</option>\n' +
		'          <option value="NiQuitin Website">NiQuitin Website</option>\n' +
		'          <option value="E-mail">E-mail</option>\n' +
		'          <optgroup label=""></optgroup>\n' +
		'        </select><span>{{l10n.signUp.valueDefault}}</span>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <div class="group-checkbox">\n' +
		'      <div class="checkbox-1">\n' +
		'        <input type="checkbox" name="news" id="news" value="news" ng-model="whereHear.isReceiveNews"/>\n' +
		'        <label for="news" ng-bind-html="l10n.signUp.cbReceive"></label>\n' +
		'      </div>\n' +
		'      <div class="checkbox-1">\n' +
		'        <input type="checkbox" name="terms" id="terms" value="terms" ng-model="whereHear.isAccept"/>\n' +
		'        <label for="terms">{{l10n.signUp.cbTerm}}</label>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'  </div><a href="javascript:;" title="" ng-click="done()" class="btn btn-2">{{l10n.button.done}}</a>\n' +
		'</main>');
}]);

angular.module('views/template/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/template/index.jade',
		'<main id="main" class="template-page">\n' +
		'  <div class="inner">\n' +
		'    <div class="editor">\n' +
		'      <figure><img src="images/badge-courage.png" alt="image 1"/>\n' +
		'      </figure>\n' +
		'      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n' +
		'      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n' +
		'      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/test/hammer.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/test/hammer.jade',
		'<p id="hammer" style="background-color: red; height:100%">timeline month</p>');
}]);

angular.module('views/test/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/test/index.jade',
		'<main id="main">\n' +
		'  <div class="inner">\n' +
		'    <div class="preview">\n' +
		'      <button ng-click="start()">start...</button>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/timeline/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/timeline/index.jade',
		'<section gk-required-notification="gk-required-notification" ng-model="notiBadgeDetail" data-name="badge-detail-popup" class="popup-1 badge-detail-popup overlay hidden">\n' +
		'  <div class="inner container-bgd courage-content">\n' +
		'    <div class="courage-outer individual">\n' +
		'      <div class="inner">\n' +
		'        <div gk-height-badge-detail="gk-height-badge-detail" class="block-1">\n' +
		'          <h3 class="title">{{currentBadge.title}}</h3>\n' +
		'          <div class="badge"><img id="courage-step-1" src="{{currentBadge.imgURL}}" alt="{{currentBadge.title}}" class="badge-img"/>\n' +
		'            <div id="courage-step-2" class="point"><span>+{{currentBadge.points}}</span></div>\n' +
		'          </div>\n' +
		'          <div class="info">\n' +
		'            <p ng-bind-html="currentBadge.description"></p>\n' +
		'          </div>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'    </div><a hide-data="hide-data" href="javascript:;" title="ok" ng-click="badgeDetailClose()" class="btn btn-1 uppercase"><span>ok</span></a>\n' +
		'  </div>\n' +
		'</section>\n' +
		'<main id="main" data-showheader="data-showheader">\n' +
		'  <button type="button" class="jump-to">{{l10n.button.jumpToDay}}</button>\n' +
		'  <div id="hammer" style="height:1390px" class="inner">\n' +
		'    <div data-group="waiting" class="week-timeline">\n' +
		'      <div style="top:0px" class="timeline-desc">\n' +
		'        <div class="inner">\n' +
		'          <p ng-bind-html="l10n.timeline.descHtml" class="portrait"></p>\n' +
		'          <p ng-bind-html="l10n.timeline.descNoneHtml" class="landscape"></p>\n' +
		'        </div>\n' +
		'        <div class="month-block">\n' +
		'          <div class="month-out">\n' +
		'            <p data-name="month-out-desc">2014</p>\n' +
		'          </div>\n' +
		'          <div class="months-out">\n' +
		'            <p data-name="month-out-desc">2014</p>\n' +
		'          </div>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'      <div gk-timeline="gk-timeline" class="preview">\n' +
		'        <div class="progress-bar"></div>\n' +
		'        <ul id="dayline" data-name="dayline" style="width:128px" class="dayline">\n' +
		'          <li class="current-date">\n' +
		'            <div class="outer">\n' +
		'              <div class="inner">\n' +
		'                <div class="date"><span class="dayweek">Mon</span><span class="daymonth">Apr 7th</span></div>\n' +
		'                <div data-intro-follow="step-1" class="add-badge"><span class="icon-add"><a href="javascript:void(0);" title="Add badge" class="icon-add-badge">Add badge</a></span></div>\n' +
		'              </div>\n' +
		'            </div>\n' +
		'          </li>\n' +
		'        </ul>\n' +
		'      </div>\n' +
		'    </div>\n' +
		'    <div data-group="waiting" gk-prevent-event="gk-prevent-event" data-ng-show="personalChallenges.data &amp;&amp; timelinePage.tabTimeline" class="tabs tabs-timeline"><span class="arrow-top"></span>\n' +
		'      <section data-intro-step="1" ng-click="selectChallengeCategory(category)" class="nav-tabs"><a href="javascript:void(0);" title="{{category.name}}" ng-repeat="category in personalChallenges.list" ng-click="personalChallenges.data.category = category.name" ng-class="{&quot;active&quot;: personalChallenges.data.category == category.name}" data-type="{{getChallengesTab(category.name)}}" data-intro-follow="{{$first?&quot;step-2&quot;:&quot;&quot;}}">{{category.name}}</a></section>\n' +
		'      <div ng-hide="personalChallenges.data.category" ng-bind="l10n.timeline.chooseCategory" class="text-mesg text-category"></div>\n' +
		'      <div ng-show="personalChallenges.data.category" class="tab-content">\n' +
		'        <div ng-repeat="category in personalChallenges.list" ng-class="getChallengesTab(category.name)" ng-show="personalChallenges.data.category == category.name" class="tab-pane">\n' +
		'          <div class="outer">\n' +
		'            <div class="inner">\n' +
		'              <ul gk-max-height="gk-max-height" gk-horizontal-scroll="gk-horizontal-scroll" class="slide slide-sroll">\n' +
		'                <li ng-repeat="item in category.childs" ng-class="{&quot;active&quot;: personalChallenges.data.id == item.id}"><a href="javascript:void(0);" title="{{item.name}}" data-intro-follow="{{$first?&quot;step-2&quot;:&quot;&quot;}}" ng-click="setPersonalChallenge(item)">{{item.name}}</a>\n' +
		'                </li>\n' +
		'              </ul>\n' +
		'            </div>\n' +
		'          </div>\n' +
		'        </div>\n' +
		'      </div>\n' +
		'      <div data-intro-step="2" ng-show="personalChallenges.data.id" class="clock-block"><i class="icon-bottom-tabs"></i>\n' +
		'        <ul gk-clock-block="gk-clock-block">\n' +
		'          <li ng-class="{\'active\': personalChallenges.data.date == \'morning\' }"><a href="javascript:void(0);" title="Morning" ng-click="personalChallenges.data.date = \'morning\'" data-intro-follow="order-2" class="morning"><span ng-bind="l10n.timeline.morning" class="text"></span></a></li>\n' +
		'          <li ng-class="{\'active\': personalChallenges.data.date == \'noon\' }"><a href="javascript:void(0);" title="Noon" ng-click="personalChallenges.data.date = \'noon\'" class="noon"><span ng-bind="l10n.timeline.noon" class="text"></span></a></li>\n' +
		'          <li ng-class="{\'active\': personalChallenges.data.date == \'afternoon\' }"><a href="javascript:void(0);" title="Afternoon" ng-click="personalChallenges.data.date = \'afternoon\'" class="afternoon"><span ng-bind="l10n.timeline.afternoon" class="text"></span></a></li>\n' +
		'          <li ng-class="{\'active\': personalChallenges.data.date == \'evening\' }"><a href="javascript:void(0);" title="Evening" ng-click="personalChallenges.data.date = \'evening\'" class="evening"><span ng-bind="l10n.timeline.evening" class="text"></span></a></li>\n' +
		'        </ul>\n' +
		'      </div>\n' +
		'      <div ng-show="!personalChallenges.data.date &amp;&amp; personalChallenges.data.id" ng-bind="l10n.timeline.whatTime" data-name="text-clock-message" class="text-mesg text-clock"></div>\n' +
		'      <div ng-show="personalChallenges.data.date" gk-prevent-event="gk-prevent-event" class="badge-review"><img ng-src="{{personalChallenges.data.badge.imgURL}}"/></div><a href="javascript:void(0);" title="{{l10n.button.createChallenge}}" class="btn btn-timeline" ng-click="createChallenge()" ng-show="personalChallenges.data.date"><span>{{l10n.button.createChallenge}}</span></a>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

angular.module('views/tour/index.jade', []).run(['$templateCache', function($templateCache) {
	$templateCache.put('views/tour/index.jade',
		'<main id="main" class="tour-page">\n' +
		'  <div class="inner">\n' +
		'    <div class="carousel-tour">\n' +
		'      <div class="loader"></div>\n' +
		'      <ul rn-carousel="rn-carousel" rn-carousel-indicator="rn-carousel-indicator">\n' +
		'        <li ng-repeat="item in data"><span><img alt="{{item.alt}}" src="{{item.src}}" class="{{item.class}}"/>\n' +
		'            <div class="caption">\n' +
		'              <h4 translate="{{item.title}}"></h4>\n' +
		'              <div translate="{{item.desc}}" class="desc"></div>\n' +
		'            </div></span>\n' +
		'        </li>\n' +
		'      </ul>\n' +
		'    </div>\n' +
		'  </div>\n' +
		'</main>');
}]);

Code Review
===========
DRY: don't repeat yourseft

Date review:  27/02/2015
Reviewed by:  Thu.Lam
Reviewed branch: frontend

### checkmysalon-responsive-test.awakit.sutrix.com/themes/default/smbase/css/style.css
- check h2.headline-1 in html file, check .carousel-indicators li .headline-1 in css file, please don't repeat width of border all breakpoints

Date review:  02/02/2015
Reviewed by:  Thu.Lam
Reviewed branch: frontend

### checkmysalon-responsive\source\views\blocks\header.jade
- line 19 ( .block-1) please remove .clearfix

### checkmysalon-responsive\source\views\blocksheader-mysalon
- line 30 ( .block-1) please remove .clearfix

### checkmysalon-responsive\source\assets\css\block.less
- line 10 (.default-modal .modal-dialog): remove .square(100%). DRY
- line 25 (#search-modal .inner ) please remove position: relative. DRY

### checkmysalon-responsive\source\assets\css\structure.less
- why .logo-center is looped 2 times?? Please remove one of them

Date review:  01/28/2015
Reviewed by:  Thu.Lam
Reviewed branch: frontend

### \source\views\index.jade
- change <main> to <div> because in one <div> should exist only <main>

### \source\assets\css\responsive.less
- please remove overflow and background on .bilan. DRY
- line 380 (.thumbnails) please remove overflow: hidden. DRY
- .icon-search-box : please don't use .wi-icon for this icon
- line 1178and 1361: (#search-modal .inner .block-1 .close) please don't loop background many times
- line 1066, 1295, 1572: please remove  padding-top: 76px. Why do you loop it so many times?
- line 1689( #search-modal .inner ): please remove min-height. DRY. 
  Besides, why do you add min-height: 0 in 1009 and after that add min-height: 100% add line 1689 and 1702. I think all min-height should be removed on .inner
- #search-modal .block-1: please remove top:0 and width: 100%, position:fixed all media 320,360,568. It looped so many times
- please remove .square(24px) on .setting-title .icon-setting on media 360. It's existed on media 480. Besides, there are many code are looped on .icon-setting. Please optimize
- #mess-confirm-error : please remove height on media 767, add height auto and remove min-height


Date review:  01/28/2015
Reviewed by:  Nam.Pham
Reviewed branch: frontend

### \source\assets\js\site.js

  - Why do we need 2 ```doc```

    ```
    ajaxType = 'POST', isSaveCookie = true, doc = $(document),

    doc = $(document),
    ajaxGlobalDefault = {
    ```

  - Use variable instead of quering again

    ```
    this.itemActive = Salon.isCms ? $('#mysalon') : $('#emotion');
    ```

  - Optimize loop

    ```
    for (var i = 0; i < this.children.length; i++) {
    ..
    ```

  - Declare variables but do not use

    ```
    var el,
        handle,
        mailButton,
        recommendation,
        highcharts,
        arrayHighChart,
        arrayCategoryHighChart,
        serieName;
    ```

  - Wrong way when declaring, ```this``` is useless, some variables are useless

    ```
    var el,
        handle,
        children;

    this.getEl
    this.update
    ```

    then

    ```
    return {
      el: el,
      handle: handle,
      children: children,
      getEl: getEl,
      update: update
    };
    ```

### \source\assets\js\plugins\autocomplete.js

  - ```publicMethod``` remove this function

### \source\assets\js\plugins\autocomplete.js

  - What is the purpose of this file?

### \source\assets\js\plugins\plugin.js

  - This file is a plugin template, remove it.

    
Date review:  01/26/2015
Reviewed by:  Thu.Lam
Reviewed branch: frontend

### \source\assets\css\block.less
- line 328: .content p{} please remove width: 340px because we need to dynamic code for responsive, add padding or margin to fix this

### \source\assets\css\form.less
- line 118 : #email-message .content p : Please remove width: auto

### \source\assets\css\structure.less
- please don't remove backface-visibility , it will make some mistake on flip animation on IOS

### \source\assets\css\bootstrap\modal.less
- line 25 : please remove -webkit-overflow-scrolling: touch;, it will make some mistake when scroll on IOS


Date review:  01/23/2015
Reviewed by:  Nam.Pham
Reviewed branch: frontend

### \source\assets\js\plugins\autocomplete.js

  - Clean code comments

  - ```type: 'GET',``` is unnecessary when using ```$.ajax```

  - Use variables for ```data.data.salon```

    ```
    $('#name').val(data.data.salon.name);
    $('#address').val(data.data.salon.address);
    $('#zip-code').val(data.data.salon.zip_code);
    ..
    ```

  - Put ```maxChart / totalBand``` outside the loop

    ```
    for(var i = 0; i < totalBand; i++) {
      chart.yAxis[0].removePlotBand('plot-band-' + i);
      chart.yAxis[0].addPlotBand({
        from: i * (maxChart / totalBand),
        to: (i + 1) * (maxChart / totalBand),
        color: arrColor[i],
        id: 'plot-band-' + i
      });
    }
    ```

Date review:  01/05/2015
Reviewed by:  Thin Nguyen Truong
Reviewed branch: frontend

Note:
/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */

We should rename @name, @description,.. to describe summary our plugin.

1. \source\assets\js\site.js
- Define a private variable var messagePopup = $('#mess-error'), then we will reuse it in show and hide function.

2. \source\assets\js\plugins\autocomplete.js
- Line 15- 182: Declare variables in a group
  Eg:
    var a = null,
        b = null,
        c = null;

- Line 16: var privateVar = null;
  We never use it, so we should remove in our source code.

- Line 30, 66, 174
  The type of request, default is "GET". So we needn't add this param in a ajax request.

- Hardcoded at
  line 107: 'Actual Spending'
  line 127: if(data.status === 'OK') {
  line 121: data.avg_rate + '%'
  line 122: data.current_user_rate + '%'

  We need to define a setting variable in l10n.js file

- Line 138 - 145:
  We should declare new variable to reuse. Eg: var cat = res.categories[i];

- Line 176: hardcoded url: /*loadUrl + '/' + salonId*/ 'http://localhost:3000/data.json',
var loadSalonProfile = function(salonId,loadUrl){
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: /*loadUrl + '/' + salonId*/ 'http://localhost:3000/data.json',
      success: loadAjaxSuccess,
      error: function(){

      }
    });
  };

- Line 239: should declare private variable for timeout (because it's a const). Eg: var timeout = 1000;
- Line 307 - 309 and line 329: Should remove if we never use it.

3. \source\assets\js\plugins\flipper.js
- Line 15: don't use prefix with sm, our company name.

4. \source\assets\js\plugins\init-validator.js
  We should define initValidate function in site.js file. Then move all source code in init method to that function.
  Remove init-validator.js file. Because it's unnecessary.

5. \source\assets\js\plugins\pie-chart.js
- Line 15: don't use prefix with sm, our company name.
- Line 46:
  Use $('.sub-nav > .carousel-indicators > li') instead of $('.sub-nav').find(' > .carousel-indicators > li')
- Line 41 (animate: 1500) and 48 (if(that.data('slide-to') === 2){)
  1500 and 2 is const, we should define const variables.

- Line 82: option: 'value'. We never use it, so we should remove in our source code.

6. \source\assets\js\plugins\placeholder.js
Wrong function. Please rewrite it!
- Placeholder doesn't work < IE 10
- txtPlaceholder = elms.attr('placeholder')
  It always gets placeholder attribute of first element.
- when we attach events for an element, we can use jQuery method chaining. Eg
currentElm.off('focus').on('focus').off('blur').on('blur').


7. \source\assets\js\plugins\quiz.js
- Line 16: var privateVar = null;
  We never use it, so we should remove in our source code.
- Declare variables in a group
  Eg:
    var a = null,
        b = null,
        c = null;

- Hardcoded at line 24: if(!$.isEmptyObject(data) && data.status === 'OK')
  We need to define a setting variable in l10n.js file
- Line 94: console.log(totalQuestions); ==> remove this line
- Line 34, 54, 98, 218: should declare a const variables.
- Line 153 - 155: The type of request, default is "GET" and hardcoded at url param
  type: 'GET',
  //url: quizUrl + '/' + qId + '/' + isCMS,
  url: 'http://localhost:3000/data3.json',

- publicMethod: function(params) {}, and line 255 option: 'value'
  We never use it, so we should remove in our source code.

- Line 219:
We can use if(localStorage.getItem('salonId')){
}
instead of
if(localStorage.getItem('salonId') !== null){
}
- Use single quote instead double quote: localStorage.getItem("salonId"), localStorage.getItem("salonId"),...

8. \source\assets\js\plugins\slider.js
- Line 33 - 42:
We can use the below code to optimize variable.
control.each(function(index, el) {
  el = $(el);
  el.off('click').on('click', function(e) {
    e.preventDefault();
    control.removeClass('active');
    el.addClass('active');
    contains.animate({
      'margin-left': - index * winWidth
    }, 1000);
  });
});

- Line 40: should declare a const variables. Eg: timeAnimate = 1000;
- Line 68 option: 'value'
  We never use it, so we should remove in our source code.
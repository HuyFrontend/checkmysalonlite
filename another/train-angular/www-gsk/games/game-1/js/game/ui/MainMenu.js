MainMenu = function(width,height)
{
    MainMenu.superclass.constructor.apply(this,arguments);

    this.backgroundColor = "#eee";

    var backgroundImage = new TGE.Sprite();
    this.addChild(backgroundImage);
    backgroundImage.width = 640;
    backgroundImage.height = 832;
    backgroundImage.registrationX = backgroundImage.registrationY = 0;
    backgroundImage.x = 0;
    backgroundImage.y = 0;
    backgroundImage.setImage('loading_bg');

    createjs.Ticker.setFPS(60);

    createjs.Tween.get(backgroundImage)
        .to({alpha:0.3}, 500);

    // Tresensa/HTML5 plug
    var tresensaLogo = this.addChild(new TGE.Sprite().setup( {
        image:"tresensa_plug",
        x:this.pixelsFromRight(120),
        y:this.pixelsFromBottom(75)
    }));
    createjs.Tween.get(tresensaLogo)
        .to({alpha:1, visible:true}, 2000);

    if (!TGE.BrowserDetect.oniOS)
    {
        this.buttonAudio = new TGE.Button().setup({
            x: -80/2,
            y: 30,
            numStates: 3,
            width: 80,
            height: 80,
            font: "20px Raleway Bold",
            pressFunction: MainMenu.prototype.toggleAudio.bind(this),
            idleColor: "#eee",
            hoverColor: "#eee",
            downColor: "#eee"
        });
        if (NumberConnect.prototype.audioEnabled)
            this.buttonAudio.setImage('sound_is_on', 3, 1);
        else
            this.buttonAudio.setImage('sound_is_off', 3, 1);
        this.addChild(this.buttonAudio);
        createjs.Tween.get(this.buttonAudio)
            .wait(delay)
            .to({x:80/2}, 60);
    }

    var buttonWidth = 280,
        buttonHeight = TGE.Button.DefaultHeight;

    var centerXInitial = -buttonWidth+buttonWidth/2,
        centerXFinal = buttonWidth/2,
        centerY = 144+buttonHeight/2;

    var delay = 0;

    // Play button
    var buttonPlay = new TGE.Button().setup({
        x: centerXInitial,
        y: centerY,
        pressFunction: MainMenu.prototype.showPacks.bind(this),
        numStates: 3,
        width: buttonWidth,
        height: buttonHeight,
        text: "PLAY"
    });
    this.addChild(buttonPlay);
    createjs.Tween.get(buttonPlay)
        .wait(delay)
        .to({x:centerXFinal, y:centerY}, 200, createjs.Ease.easeOut);

    centerY += buttonHeight+1;
    delay += 80;

    // Tutorial button
    var buttonTutorial = new TGE.Button().setup({
        x: centerXInitial,
        y: centerY,
        pressFunction: MainMenu.prototype.showRules.bind(this),
        numStates: 3,
        width: buttonWidth,
        height: buttonHeight,
        text: "RULES"
    });
    this.addChild(buttonTutorial);
    createjs.Tween.get(buttonTutorial)
        .wait(delay)
        .to({x:centerXFinal, y:centerY}, 200, createjs.Ease.easeOut);

    /*if (false)//(! (TGE.BrowserDetect.usingPhoneGap && (TGE.BrowserDetect.oniOS || TGE.BrowserDetect.onAndroid)))
    {
        centerY += buttonHeight+1+buttonHeight/2;
        delay += 80;

        // iOS Version button
        var buttonIOS = new TGE.Button().setup({
            x: centerXInitial,
            y: centerY,
            numStates: 3,
            width: buttonWidth,
            height: buttonHeight,
            pressFunction: function(){TGE.Game.GetInstance().OpenURL(GameSettings.IOS_APP_URL);},
        });
        buttonIOS.addChild(new TGE.Text().setup({
            text: "iOS APP STORE",
            font: "bold 18px Helvetica",
            color: "#ddd",
            x: -13,
            y: 2
        }));
        buttonIOS.addChild(new TGE.Sprite().setup({
            image:'ios',
            scale: 0.65,
            x: 105,
            y: -2
        }));
        this.addChild(buttonIOS);
        createjs.Tween.get(buttonIOS)
            .wait(delay)
            .to({x:centerXFinal, y:centerY}, 200, createjs.Ease.easeOut);

        centerY += buttonHeight+1;
        delay += 80;        

        // Android version button
        var buttonAndroid = new TGE.Button().setup({
            x: centerXInitial,
            y: centerY,
            numStates: 3,
            width: buttonWidth,
            height: buttonHeight,
            pressFunction: function(){TGE.Game.GetInstance().OpenURL(GameSettings.GOOGLE_PLAY_APP_URL);},
        });
        buttonAndroid.addChild(new TGE.Text().setup({
            text: "GOOGLE PLAY",
            font: "bold 18px Helvetica",
            color: "#ddd",
            x: -13,
            y: 2
        }));
        this.addChild(buttonAndroid);
        buttonAndroid.addChild(new TGE.Sprite().setup({
            image:'android',
            scale: 0.65,
            x: 105,
            y: -2
        }));        
        createjs.Tween.get(buttonAndroid)
            .wait(delay)
            .to({x:centerXFinal, y:centerY}, 200, createjs.Ease.easeOut);        
    }*/

    centerY += buttonHeight+1+buttonHeight/2;
    delay += 80;

    // Feedback button
    /*var buttonMail = new TGE.Button().setup({
        x: centerXInitial,
        y: centerY,
        numStates: 3,
        width: buttonWidth,
        height: buttonHeight,
        pressFunction: function(){TGE.Game.GetInstance().OpenURL("mailto:support@noisytyping.com");},
    });
    buttonMail.addChild(new TGE.Text().setup({
        text: "SEND FEEDBACK",
        font: "bold 18px Helvetica",
        color: "#ddd",
        x: -13,
        y: 2
    }));
    this.addChild(buttonMail);
    buttonMail.addChild(new TGE.Sprite().setup({
        image:'mail',
        scale: 0.55,
        x: 105,
        y: 1
    }));        
    createjs.Tween.get(buttonMail)
        .wait(delay)
        .to({x:centerXFinal, y:centerY}, 200, createjs.Ease.easeOut);
    */

    //TGS Login Widget
    /*
    this.addChild(TGS.CreateLoginWidget().setup({
        x: this.pixelsFromLeft(140),
        y: this.pixelsFromBottom(120)

    }));
    /**/
};

MainMenu.prototype =
{
    toggleAudio: function()
    {
        if (!NumberConnect.prototype.audioEnabled)
        {
            NumberConnect.prototype.audioEnabled = true;
            TGS.DataStore.SaveValues({audioEnabled:1});
            this.buttonAudio.setImage('sound_is_on', 3, 1);
            NumberConnect.prototype.startMusic();
        }
        else
        {
            TGE.Game.GetInstance().audioManager.StopAll();
            NumberConnect.prototype.audioEnabled = false;
            TGS.DataStore.SaveValues({audioEnabled:0});
            this.buttonAudio.setImage('sound_is_off', 3, 1);
        }
    },

    showRules: function()
    {
        TGE.Game.prototype.showManagedScreen.bind(TGE.Game.GetInstance())('rules');
        NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');
    },

    showPacks: function()
    {
        TGE.Game.prototype.showManagedScreen.bind(TGE.Game.GetInstance())('packs');
        NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');
    }
};
extend(MainMenu,TGE.Window);

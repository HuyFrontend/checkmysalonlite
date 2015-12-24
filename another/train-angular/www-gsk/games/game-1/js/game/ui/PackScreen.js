PackScreen = function()
{
    PackScreen.superclass.constructor.apply(this,arguments);

    this.backgroundColor = "#eee";
    this.setupFade(0.5,"#eee");

    this.mAd = null;

    this.addChild(new TGE.Text().setup( {
        x:this.percentageOfWidth(0.5),
        y:40,
        text:"ARE YOU",
        font:"32px Raleway Bold",
        color:"#111"
    }));

    // Back button
    var backButton = new TGE.Button().setup({
        numStates: 3,
        width: 140,
        height: 80,
        x: 140/2,
        y: 80/2,
        pressFunction: PackScreen.prototype.backToMenu.bind(this),
        text: "MENU",
        font: "bold 24px Helvetica"
	})
   	this.addChild(backButton);

    var buttonWidth = 300,
    buttonHeight = 100;

    var centerXInitial = -buttonWidth+buttonWidth/2,
        centerXFinal = 640/2,
        centerY = 144+buttonHeight/2;

	var delay = 0;

    var buttonCurious = new TGE.Button().setup({
        x: centerXInitial,
        y: centerY,
        numStates: 3,
        width: buttonWidth,
        height: buttonHeight,
        pressFunction: PackScreen.prototype.loadPackCurious.bind(this)
    });
    buttonCurious.addChild(new TGE.Text().setup({
    	text: "JUST CURIOUS?",
    	y: -12,
    	font: "bold 24px Helvetica",
    	color: "#ddd"
    }));
    buttonCurious.addChild(new TGE.Text().setup({
    	text: "over 100 free levels",
    	y: +20,
    	font: "16px Helvetica",
    	color: "#ddd"
    }));
    this.addChild(buttonCurious);
    createjs.Tween.get(buttonCurious)
        .wait(delay)
        .to({x:centerXFinal, y:centerY}, 320, createjs.Ease.easeOut);

    centerY += buttonHeight+1;
    delay += 80;

    this.buttonEnthusiastic = new TGE.Button().setup({
        x: centerXInitial,
        y: centerY,
        numStates: 3,
        width: buttonWidth,
        height: buttonHeight,
     });
    this.buttonEnthusiastic.addChild(new TGE.Text().setup({
    	text: "ENTHUSIASTIC?",
    	y: -12,
    	font: "bold 24px Helvetica",
    	color: "#ddd"
    }));
    this.buttonEnthusiastic.addChild(new TGE.Text().setup({
    	text: "99 medium and 99 hard",
    	y: +20,
    	font: "16px Helvetica",
    	color: "#ddd"
    }));
    this.addChild(this.buttonEnthusiastic)

    this.buttonEnthusiasticLockSprite = new TGE.Sprite().setup({
        image: 'locked',
        x: 120,
        y: -1,
        scale: 0.5
    });
    this.buttonEnthusiastic.addChild(this.buttonEnthusiasticLockSprite);

    createjs.Tween.get(this.buttonEnthusiastic)
        .wait(delay)
        .to({x:centerXFinal, y:centerY}, 320, createjs.Ease.easeOut);

    centerY += buttonHeight+1;
    delay += 80;

    this.buttonObsessed = new TGE.Button().setup({
        x: centerXInitial,
        y: centerY,
        numStates: 3,
        width: buttonWidth,
        height: buttonHeight,
    });
 	this.buttonObsessed.addChild(new TGE.Text().setup({
    	text: "OBSESSED?",
    	y: -12,
    	font: "bold 24px Helvetica",
    	color: "#ddd"
    }));
    this.buttonObsessed.addChild(new TGE.Text().setup({
    	text: "199 hard levels",
    	y: +20,
    	font: "16px Helvetica",
    	color: "#ddd"
    }));
    this.addChild(this.buttonObsessed);

    this.buttonObsessedLockSprite = new TGE.Sprite().setup({
        image: 'locked',
        x: 120,
        y: -1,
        scale: 0.5
    });
    this.buttonObsessed.addChild(this.buttonObsessedLockSprite);


    this.updateButtonStatus();
    this.addEventListener("tgs_login_changed",this.updateButtonStatus.bind(this));

    createjs.Tween.get(this.buttonObsessed)
        .wait(delay)
        .to({x:centerXFinal, y:centerY}, 320, createjs.Ease.easeOut);
}

PackScreen.prototype =
{
    updateButtonStatus: function()
    {
        if (! TGE.Game.GetInstance().enthusiasticEnabled)
        {
            this.buttonEnthusiasticLockSprite.visible = true;
            this.buttonEnthusiastic.pressFunction = function(){
                if (! TGS.IsReady())
                {
                    NumberConnect.prototype.displayTransientAlert(this, 'Sorry, the store cannot be reached.');
                }
                else
                {
                    TGS.Microtransactions.PurchaseProduct({
                        productID:'NC2',
                        gameDataUpdates:{"enthusiasticKey":1},
                        onSuccess:function(){
                            NumberConnect.prototype.displayTransientAlert(this, 'Enthusiastic pack unlocked.');
                            TGE.Game.GetInstance().enthusiasticEnabled = true;
                            this.updateButtonStatus();
                        }.bind(this),
                        onFailure:function(){
                            if(TGE.Game.GetInstance().enthusiasticEnabled)
                            {
                                this.loadPackEnthusiastic();//In case failure is due to player already unlocking this stage
                            }
                            else
                            {
                                NumberConnect.prototype.displayTransientAlert(this, 'Unlock unsuccessful.');
                            }
                        }.bind(this)
                    });
                }
            }.bind(this);

        }
        else
        {
            this.buttonEnthusiasticLockSprite.visible = false;
            this.buttonEnthusiastic.pressFunction = PackScreen.prototype.loadPackEnthusiastic.bind(this);
        }

        if (! TGE.Game.GetInstance().obsessedEnabled)
        {
            this.buttonObsessedLockSprite.visible = true;
            this.buttonObsessed.pressFunction = function(){
                if (! TGS.IsReady())
                {
                    NumberConnect.prototype.displayTransientAlert(this, 'Sorry, the store cannot be reached.');
                }
                else
                {
                    TGS.Microtransactions.PurchaseProduct({
                        productID:'NC3',
                        gameDataUpdates:{"obsessedKey":1},
                        onSuccess:function(){
                            NumberConnect.prototype.displayTransientAlert(this, 'Obsessed pack unlocked.');
                            TGE.Game.GetInstance().obsessedEnabled = true;
                            this.updateButtonStatus();
                        }.bind(this),
                        onFailure:function(){
                            if(TGE.Game.GetInstance().obsessedEnabled)
                            {
                                this.loadPackObsessed();//In case failure is due to player already unlocking this stage
                            }
                            else
                            {
                                NumberConnect.prototype.displayTransientAlert(this, 'Unlock unsuccessful.');
                            }
                        }.bind(this)
                    });
                }
            }.bind(this);
        }
        else
        {
            this.buttonObsessedLockSprite.visible = false;
            this.buttonObsessed.pressFunction = PackScreen.prototype.loadPackObsessed.bind(this);
        }
    },

	backToMenu: function()
	{
        NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');
        PackScreen.prototype.Destroy.call(this);
        TGE.Game.prototype.showManagedScreen.bind(TGE.Game.GetInstance())('mainmenu');
	},

	loadPackCurious: function()
	{
        NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');
		NumberConnect.prototype.currentPack = 'CURIOUS';
		NumberConnect.prototype.currentLevelNumber = 0;
		NumberConnect.prototype.currentDifficulty = 1;
        PackScreen.prototype.Destroy.call(this);
		TGE.Game.prototype.showManagedScreen.bind(TGE.Game.GetInstance())('levels');
	},

	loadPackEnthusiastic: function()
	{
	    NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');[]
		NumberConnect.prototype.currentPack = 'ENTHUSIASTIC';
		NumberConnect.prototype.currentLevelNumber = 0;
		NumberConnect.prototype.currentDifficulty = 0;
        PackScreen.prototype.Destroy.call(this);
		TGE.Game.prototype.showManagedScreen.bind(TGE.Game.GetInstance())('levels');
	},

	loadPackObsessed: function()
	{
	    NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');
		NumberConnect.prototype.currentPack = 'OBSESSED';
		NumberConnect.prototype.currentLevelNumber = 0;
		NumberConnect.prototype.currentDifficulty = 0;
        PackScreen.prototype.Destroy.call(this);
		TGE.Game.prototype.showManagedScreen.bind(TGE.Game.GetInstance())('levels');
	},

    Destroy: function()
    {
        if (this.mAd !== null)
            this.mAd.close();
    }
}
extend(PackScreen,TGE.Window);
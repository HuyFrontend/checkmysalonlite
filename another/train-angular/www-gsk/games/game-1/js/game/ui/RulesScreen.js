RulesScreen = function()
{
    RulesScreen.superclass.constructor.apply(this,arguments);

    this.backgroundColor = "#eee";
    this.setupFade(0.5,"#eee");

    this.addChild(new TGE.Text().setup( {
        x:this.percentageOfWidth(0.5),
        y:40,
        text:"Rules",
        font:"32px Raleway Bold",
        color:"#111"
    }));

    // Back button
    this.addChild(new TGE.Button().setup({
        numStates: 3,
        width: 140,
        height: 80,
        x: 140/2,
        y: 80/2,
        pressFunction: RulesScreen.prototype.backToMenu.bind(this),
        text: "MENU",
        font: "bold 24px Helvetica"
	}));

    this.helpSpriteArray = ['tutorial-1','tutorial-2','tutorial-3','tutorial-4'];
    this.helpTextArray = ["Connect 1 to 1, 2 to 2, and so on.", "Double-tap to delete paths.", "You must fill the whole board.", "Connect all pairs to solve the puzzle!"];
    this.currentHelpIndex = 0;

    this.helpSprite = new TGE.Button().setup({
    	registrationX: 0,
    	registrationY: 0,
    	width: 512,
    	height: 612,
    	x: 64,
    	y: 220,
    	image: this.helpSpriteArray[this.currentHelpIndex],
    	pressFunction: RulesScreen.prototype.nextImageAndText.bind(this)
    });
    this.addChild(this.helpSprite);

    this.helpText = new TGE.Text().setup({
    	x: 320,
    	y: 150,
    	font: 'bold 24px Helvetica',
    	color: '#111',
    	text: this.helpTextArray[this.currentHelpIndex],
    });
    this.addChild(this.helpText);

    var previousButton = new TGE.Button().setup({
        width: 80,
        height: 80,
        x: 519,
        y: 40,
        numStates: 3,
        pressFunction: RulesScreen.prototype.prevImageAndText.bind(this)
    });
    previousButton.setImage('previous-small', 3, 1);
    this.addChild(previousButton);

    var nextButton = new TGE.Button().setup({
        width: 80,
        height: 80,
        x: 600,
        y: 40,
        numStates: 3,
        pressFunction: RulesScreen.prototype.nextImageAndText.bind(this)
    });
    nextButton.setImage('next-small', 3, 1);
    this.addChild(nextButton);
}

RulesScreen.prototype =
{
	backToMenu: function()
	{
        TGE.Game.prototype.showManagedScreen.bind(TGE.Game.GetInstance())('mainmenu');
        NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');
	},

	nextImageAndText: function()
	{
		if (this.currentHelpIndex < this.helpSpriteArray.length-1)
		{
			this.currentHelpIndex += 1;
			this.helpSprite.setImage(this.helpSpriteArray[this.currentHelpIndex]);
			this.helpSprite.width = 512;
			this.helpSprite.height = 612;
			this.helpText.text = this.helpTextArray[this.currentHelpIndex];
		}
        NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');
	},

	prevImageAndText: function()
	{
		if (this.currentHelpIndex > 0)
		{
			this.currentHelpIndex -= 1;
			this.helpSprite.setImage(this.helpSpriteArray[this.currentHelpIndex]);
			this.helpSprite.width = 512;
			this.helpSprite.height = 612;
			this.helpText.text = this.helpTextArray[this.currentHelpIndex];
		}
        NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');
	}
}
extend(RulesScreen,TGE.Window);
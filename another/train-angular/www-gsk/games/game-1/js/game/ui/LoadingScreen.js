LoadingScreen = function(width,height)
{
    LoadingScreen.superclass.constructor.apply(this,arguments);

    this.backgroundImage = new TGE.Sprite();
    this.addChild(this.backgroundImage);
    this.backgroundImage.width = 640;
    this.backgroundImage.height = 832;
    this.backgroundImage.registrationX = this.backgroundImage.registrationY = 0;
    this.backgroundImage.x = 0;
    this.backgroundImage.y = 0;
    this.backgroundImage.setImage('loading_bg');

    this.loadingBarShadow = this.addChild(new TGE.DisplayObjectContainer().setup({
        x: 326,
        y: 279,
        registrationX: 0,
        registrationY: 0,
        width: 0,
        height: 10,
        backgroundColor: "#CBCBCB"
    }));

    this.loadingBar = this.addChild(new TGE.DisplayObjectContainer().setup({
        x: 322,
        y: 275,
        registrationX: 0,
        registrationY: 0,
        width: 0,
        height: 10,
        backgroundColor: "#404040"
    }));

    // Tresensa/HTML5 plug
    this.addChild(new TGE.Button().setup( {
        image:"tresensa_plug",
        x:this.pixelsFromRight(120),
        y:this.pixelsFromBottom(75),
        //pressFunction:LoadingScreen.prototype.tresensaPlug.bind(this)
    }));

    // Add an event listener for the progress update
    this.addEventListener("progress",this.progressCallback.bind(this));
}


LoadingScreen.prototype =
{
    progressCallback: function(event)
    {
        this.loadingBarShadow.width = 230 * event.percentComplete;
        this.loadingBar.width = 230 * event.percentComplete;
    },

    /*tresensaPlug: function()
    {
        TGE.Game.GetInstance().OpenURL("http://www.tresensa.com/");
    }*/
}
extend(LoadingScreen,TGE.Window);
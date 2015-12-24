ConnectingScreen = function(width,height)
{
    ConnectingScreen.superclass.constructor.apply(this,arguments);

    // This screen needs to be fullscreen and modal
    var background = new TGE.DisplayObjectContainer().setup({
        registrationX:0,
        registrationY:0,
        width:width,
        height:height,
        backgroundColor:"#eee",
        alpha:0.9
    });
    this.addChild(background);

    // Make the screen modal
    background.mouseEnabled = true;

    // Connecting text
    this.loadingText = this.addChild(new TGE.Text().setup( {
        hAlign:"left",
        x:this.percentageOfWidth(0.26),
        y:this.percentageOfHeight(0.5),
        text:"CONNECTING...",
        font:"bold 40px Helvetica",
        color:"#111"
    }));

    this.age = 0;

    // Add an event listener for the progress update
    this.addEventListener("update",this.update.bind(this));
}


ConnectingScreen.prototype =
{
    update: function(event)
    {
        // Lame throbber visual
        this.age += event.elapsedTime;
        var txt = "CONNECTING";
        var dots = ~~(this.age*3)%4;
        for(var d=0; d<dots; d++) { txt += "."; }
        this.loadingText.text = txt;

        // If TGS ever becomes ready, close this screen
        if(typeof(window.TGS)!=="undefined" && TGS.IsOn() && TGS.IsReady())
        {
            this.close();
        }
    }
}
extend(ConnectingScreen,TGE.Window);
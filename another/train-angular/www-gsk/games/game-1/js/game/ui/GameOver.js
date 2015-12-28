GameOver = function()
{
    GameOver.superclass.constructor.apply(this,arguments);

    this.widget = null;

    this.backgroundColor = "#eee";

    this.setupFade(0.5,"#eee");

    var stringBanner;

    if (NumberConnect.prototype.successfulEndGame)
    {
        var arrayStringsSuccess = ["WUNDERBAR", "TIP TOP", "FANTASTICO", "SMOOTH", "SLICK", "NICELY DONE", "YOU GOT IT"];
        var randomIndex = Math.floor(Math.random() * arrayStringsSuccess.length);
        stringBanner = arrayStringsSuccess[randomIndex];
    }
    else
    {
        var arrayStringsFailure = ["NO WORRIES", "NEVER MIND", "NO PROBLEMO"];
        var randomIndex = Math.floor(Math.random() * arrayStringsFailure.length);
        stringBanner = arrayStringsFailure[randomIndex];
    }

    // Game over message
    this.addChild(new TGE.Text().setup({
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.1),
        text:stringBanner,
        font:"52px Raleway Bold",
        color:"#111"
    }));

    if (NumberConnect.prototype.beatBestTime)
    {
        this.addChild(new TGE.Text().setup({
            x:this.percentageOfWidth(0.5),
            y:this.percentageOfHeight(0.15),
            text:"You beat the best time!",
            font:"20px Raleway Bold",
            color:"#111"
        }));
    }

    var centerX = 320,
        centerY = 205;

    var totalLevels = (NumberConnect.prototype.levelPacks[NumberConnect.prototype.currentPack][NumberConnect.prototype.difficulties[NumberConnect.prototype.currentPack][NumberConnect.prototype.currentDifficulty]]).length;
    if (NumberConnect.prototype.currentLevelNumber < totalLevels-1)
    {
        var buttonAgain = new TGE.Button().setup({
            numStates: 3,
            x:centerX,
            y:centerY,
            pressFunction: GameOver.prototype.playNext.bind(this),
            text: "NEXT",
            width: 300
        });
        this.addChild(buttonAgain);
    }

    centerY += 81;

    var buttonReplay = new TGE.Button().setup({
        numStates: 3,
        x:centerX,
        y:centerY,
        pressFunction: GameOver.prototype.playAgain.bind(this),
        text: "REPLAY",
        width: 300
    });
    this.addChild(buttonReplay);

    centerY += 81;

    var buttonBack = new TGE.Button().setup({
        numStates: 3,
        x:centerX,
        y:centerY,
        pressFunction: GameOver.prototype.backToLevels.bind(this),
        text: "BACK",
        width: 300
    });
    this.addChild(buttonBack);


    var leaderboardID = 1;

    var bestTimes = TGE.Game.GetInstance().bestTimes;
    if (bestTimes)
    {
        bestTimes = JSON.parse(bestTimes);

        var pack = NumberConnect.prototype.currentPack;
        var difficulty = NumberConnect.prototype.difficulties[NumberConnect.prototype.currentPack][NumberConnect.prototype.currentDifficulty];
        var levelNum = NumberConnect.prototype.currentLevelNumber;

        leaderboardID = levelNum+1;
        if(pack == "CURIOUS")
        {
            if(difficulty == 'Medium 8x9')
            {
                leaderboardID += 19;
            }
            if(difficulty == 'Hard 10x11')
            {
                leaderboardID += 68;
            }
        }
        if(pack == "ENTHUSIASTIC")
        {
            leaderboardID += 117;
            if(difficulty == 'Hard 10x11')
            {
                leaderboardID += 99;
            }
        }
        if(pack == "OBSESSED")
        {
            leaderboardID += 315;
        }

        if ((bestTimes[pack][difficulty]).hasOwnProperty(levelNum))
        {
            TGS.Leaderboard.SubmitScore({score:TGE.Game.GetInstance().time, leaderboardID:leaderboardID});
        }
    }
    // TGS Game Over Widget
    /*
    this.widget = TGS.Widget.CreateWidget({
        leaderboardID:leaderboardID,
        x: 170,
        y: 420,
        shareMessage: "I'm enjoying Number Connect, a perplexing puzzle of spatial logic!"
    });
    /**/
};

GameOver.prototype =
{
    playNext: function()
    {
        var self = this;
        var callback = function(){
            NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');
            self.setupFade(0.5,"#eee");
            NumberConnect.prototype.currentLevelNumber += 1;
            GameOver.prototype.Destroy.call(self);
            self.close( TGE.Game.prototype.Replay.bind(TGE.Game.GetInstance()) );
        };
        if (this.widget != null && typeof this.widget !== "undefined")
        {
            self.widget.close(callback);
        }
        else
        {
            callback();
        }

    },

    playAgain: function()
    {
        var self = this;
        var callback = function(){
            NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');
            self.setupFade(0.5,"#eee");
            GameOver.prototype.Destroy.call(self);
            self.close(TGE.Game.prototype.Replay.bind(TGE.Game.GetInstance()) );
        };
        if (this.widget != null && typeof this.widget !== "undefined")
        {
            self.widget.close();
        }
        else
        {
            callback();
        }
    },



    backToLevels: function() {
        if (this.widget != null && typeof this.widget !== "undefined") {
            var self = this;
            this.widget.close(function () {
                NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');
                GameOver.prototype.Destroy.call(this);
                TGE.Game.prototype.showManagedScreen.bind(TGE.Game.GetInstance())('levels');
            });
        }
        else
        {
            NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');
            GameOver.prototype.Destroy.call(this);
            TGE.Game.prototype.showManagedScreen.bind(TGE.Game.GetInstance())('levels');
        }
    },




    Destroy: function()
    {
        if (this.widget != null && typeof this.widget !== "undefined")
        {
            this.widget.close();
        }

    }
};
extend(GameOver,TGE.Window);
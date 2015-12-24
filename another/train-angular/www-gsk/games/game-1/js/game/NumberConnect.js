NumberConnect = function()
{
    // Make sure to call the constructor for the TGE.Game superclass
    NumberConnect.superclass.constructor.call(this);

    // this.assetManager.rootLocation = GameConfig.CDN_ROOT;
    this.analytics = new TGE.GoogleAnalytics(GameConfig.GoogleAnalytics.LABEL, GameConfig.GoogleAnalytics.NATIVE_ID);

    NumberConnect.prototype.audioManager = this.audioManager;

    NumberConnect.prototype.audioEnabled = true;

    /*
    var Raleway_Light = new Font();
    Raleway_Light.fontFamily = "Raleway Light";
    Raleway_Light.src = "assets/fonts/Raleway-Light.ttf";

    var Raleway_Bold = new Font();
    Raleway_Bold.fontFamily = "Raleway Bold";
    Raleway_Bold.src = "assets/fonts/Raleway-Bold.ttf";
    */

    // These are assets required for the loading screen
    var loadingAssets = [
        {id:'tresensa_plug',   url:'images/tresensa_plug.png'},
        {id:'loading_bg', url:'images/loading_bg.png'}
    ];

     // These are assets we need for the game
    var gameAssets = [
        {id:'board-5x5', url:'images/board-5x5.png'},
        {id:'board-8x9', url:'images/board-8x9.png'},
        {id:'board-10x11', url:'images/board-10x11.png'},
        {id:'star', url:'images/star-of-success.png'},
        {id:'tutorial-1', url:'images/tutorial-panel-1.png'},
        {id:'tutorial-2', url:'images/tutorial-panel-2.png'},
        {id:'tutorial-3', url:'images/tutorial-panel-3.png'},
        {id:'tutorial-4', url:'images/tutorial-panel-4.png'},
        {id:'locked', url:'images/locked.png'},
        {id:'ios', url:'images/ios.png'},
        {id:'android', url:'images/android.png'},
        {id:'sound_is_on', url:'images/sound_is_on.png'},
        {id:'sound_is_off', url:'images/sound_is_off.png'},
        {id:'previous', url:'images/buttons-previous.png'},
        {id:'next', url:'images/buttons-next.png'},
        {id:'previous-small', url:'images/buttons-previous-small.png'},
        {id:'next-small', url:'images/buttons-next-small.png'},
        {id:'fb', url:'images/fb.png'},
        {id:'twitter', url:'images/twitter.png'},
        {id:'mail', url:'images/mail.png'},
        {id:'iap_icon', url:'images/iap_icon.png'}
    ];

    // These are sound effects required for the game
    var gameSounds = [
        {id:'bgmusic', url:'audio/Searching_for_Pulse-Ilya_Kaplan.ogg', backup_url:'audio/Searching_for_Pulse-Ilya_Kaplan.mp3', assetType:'audio'},
        {id: "buttonPress", url: "audio/ButtonPress2.ogg", backup_url: "audio/ButtonPress2.mp3", assetType: "audio"},
        {id: "pathFinished", url: "audio/PathFinished.ogg", backup_url: "audio/PathFinished.mp3", assetType: "audio"},
        {id: "pathWrong", url: "audio/PathWrong.ogg", backup_url: "audio/PathWrong.mp3", assetType: "audio"}
    ];

    if(!TGE.BrowserDetect.oniOS)
    {
        gameAssets = gameAssets.concat(gameSounds);
    }

    // Loading assets are what is required for the loading screen
    this.assetManager.assignImageAssetList("loading", loadingAssets);

    // Required assets are what is needed to launch the game after loading
    this.assetManager.assignImageAssetList("required", gameAssets);

    // Add the images required by TGS to the asset list
    TGS.AddRequiredImagesToAssetList("required");

    // Set some defaults for our placeholder buttons
    TGE.Button.DefaultTextColor = "#fff";
    TGE.Button.DefaultFont = "bold 28px Helvetica";
    TGE.Button.DefaultIdleColor = "#ff9933";
    TGE.Button.DefaultHoverColor = "#ff8C00";
    TGE.Button.DefaultDownColor = "#ff9933";
    TGE.Button.DefaultDisableColor = "#555";
    TGE.Button.DefaultWidth = 200;
    TGE.Button.DefaultHeight = 80;

    // levelInfo
    this.levelInfo = {
        'Easy 5x5' : {
            size: [5, 5],
            textSize: "68px",
            tileDim: 128,
            boardHeight: 640,
            pathRadius: 14,
            boardImage: 'board-5x5'
        },
        'Medium 8x9' : {
            size: [8, 9],
            textSize: "40px",
            tileDim: 80,
            boardHeight: 720,
            pathRadius: 9,
            boardImage: 'board-8x9'
        },
        'Hard 10x11' : {
            size: [10, 11],
            textSize: "32px",
            tileDim: 64,
            boardHeight: 704,
            pathRadius: 7,
            boardImage: 'board-10x11'
        }
    };

    this.colors = [
        "#C00000", "#FFB81F", "#B2A2C7", "#B72467", "#6AB691",
        "#A64D2C", "#D4A77D", "#02A8A8", "#DD57A6", "#8B9E6C",
        "#FF7D3F", "#3FB6FF", "#FFD833", "#FE7193", "#96B2D7",
        "#C2D51B", "#EB7FFF", "#FF3B3D", "#4D3D7E", "#C6BC98"
    ];

    // These are the screens we let TGE manage
    this.registerScreen("loading",this.createLoadingScreen);
    this.registerScreen("mainmenu",this.createMainMenu);
    this.registerScreen("gameover",this.createGameOverScreen);
    this.registerScreen("rules",this.createRulesScreen);
    this.registerScreen("packs",this.createPackScreen);
    this.registerScreen("levels",this.createLevelScreen);
    //this.registerScreen("tgsconnect",this.createConnectingScreen);
    this.registerScreen("credits",this.createCreditsScreen);

    this.enthusiasticEnabled = false; // Games using the TGS DataStore should never mix in their own state saving code
    this.obsessedEnabled = false;
    this.hintsLeft = 20;

    // We need to wait until TGS is ready
    TGS.DataStore.onDataChanged = this.onDatastoreUpdated.bind(this);
    if(TGS.IsReady())
    {
        this.onDatastoreUpdated();
    }
    else
    {
        TGS.onReady = this.onDatastoreUpdated.bind(this);
    }

    // This game implements its own TGS.Microtransaction error messages (displayTransientAlert)
    TGS.Microtransactions.UseTGSErrorMessages = false;

    // Setup the callback for purchase restore requests from TGS
    TGS.Microtransactions.RestorePurchaseCallback = this.onTGSPurchaseRestored.bind(this);
};

NumberConnect.prototype =
{
    onTGSPurchaseRestored: function(productID)
    {
        // Restore non-consumables
        if(productID==="NC2")
        {
            TGS.DataStore.SaveValues({enthusiasticKey:1});
            this.enthusiasticEnabled = true;
        }
        else if(productID==="NC3")
        {
            TGS.DataStore.SaveValues({obsessedKey:1});
            this.obsessedEnabled = true;
        }
    },

    onDatastoreUpdated: function()
    {
        var enthusiasticKey = TGS.DataStore.FetchIntValue('enthusiasticKey', 0);
        this.enthusiasticEnabled = (enthusiasticKey == 1);

        var obsessedKey = TGS.DataStore.FetchIntValue('obsessedKey', 0);
        this.obsessedEnabled = (obsessedKey == 1);

        var audioEnabled = TGS.DataStore.FetchIntValue('audioEnabled', 1);
        this.updateSounds(audioEnabled == 1);

        this.hintsLeft = TGS.DataStore.FetchIntValue('hintsLeft', 20);


        //var defaultBestTimes = {'CURIOUS':{'Easy 5x5':{},'Medium 8x9':{},'Hard 10x11':{}}, 'ENTHUSIASTIC':{'Medium 8x9':{}, 'Hard 10x11':{}}, 'OBSESSED':{'Hard 10x11':{}}};

        var curiousBestTimes = {'Easy 5x5':{},'Medium 8x9':{},'Hard 10x11':{}};
        var curious = TGS.DataStore.FetchStringValue('curiousBest', JSON.stringify(curiousBestTimes));

        var enthusiasticBestTimes = {'Medium 8x9':{}, 'Hard 10x11':{}};
        var enthusiastic = TGS.DataStore.FetchStringValue('enthusiasticBest', JSON.stringify(enthusiasticBestTimes));

        var obsessedBestTimes = {'Hard 10x11':{}};
        var obsessed = TGS.DataStore.FetchStringValue('obsessedBest', JSON.stringify(obsessedBestTimes));

        var bestTimes = {'CURIOUS':JSON.parse(curious),'ENTHUSIASTIC':JSON.parse(enthusiastic), 'OBSESSED':JSON.parse(obsessed)};
        this.bestTimes = JSON.stringify(bestTimes);
    },

    updateSounds: function(newValue)
    {
        if(NumberConnect.prototype.audioEnabled != newValue)
        {
            NumberConnect.prototype.audioEnabled = newValue;
            if(newValue)
            {
                NumberConnect.prototype.startMusic();
            }
            else
            {
                this.audioManager.StopAll();
            }
        }
    },

    finishedLoadingRequiredAssets: function()
    {
        NumberConnect.superclass.finishedLoadingRequiredAssets.call(this);
        if (!TGE.BrowserDetect.oniOS)
        {
            this.startMusic();
        }
    },

    startMusic: function()
    {
        this.audioManager.StopAll();
        if (this.audioEnabled)
        {
            this.audioManager.Play({
                id: 'bgmusic',
                loop: '1'
            });
        }
    },

    playSound: function(sound)
    {
        if (!TGE.BrowserDetect.oniOS && this.audioEnabled)
        {
            this.audioManager.Play({
                id: sound,
                loop: '0'
            });
        }
    },

    displayTransientAlert: function(stage,text_)
    {
        var moveDistance = 25;
        var centerY = stage.height/2;

        var boxAlert = new TGE.DisplayObjectContainer().setup({
            x:stage.width/2,
            y:centerY - moveDistance,
            backgroundColor: "#fff",
            width:stage.width*3/4,
            height:150,
            alpha: 0
        });

        var textAlert = new TGE.Text().setup( {
            text:text_,
            font:"bold 24px Helvetica",
            color:"#222"
        });
        boxAlert.addChild(textAlert);
        boxAlert.textAlert = textAlert;

        stage.addChild(boxAlert);

        createjs.Ticker.setFPS(60);
        createjs.Tween.get(boxAlert)
            .to({alpha:0.9, y:centerY}, 250)
            .wait(2000)
            .to({alpha:0.0, y:centerY+moveDistance}, 250)
            .call(function(){stage.removeChild(boxAlert)});
    },

    createLoadingScreen: function()
    {
        return new LoadingScreen(this.stage.width,this.stage.height);
    },

    createMainMenu: function()
    {
        return new MainMenu(this.stage.width,this.stage.height);
    },

    createGameOverScreen: function()
    {
        return new GameOver(this.stage.width,this.stage.height);
    },

    createRulesScreen: function()
    {
        return new RulesScreen(this.stage.width,this.stage.height);
    },

    createPackScreen: function()
    {
        return new PackScreen(this.stage.width,this.stage.height);
    },

    createLevelScreen: function()
    {
        return new LevelScreen(this.stage.width,this.stage.height);
    },

    createConnectingScreen: function()
    {
        return new ConnectingScreen(this.stage.width,this.stage.height);
    },

    createCreditsScreen: function()
    {
        return new CreditsScreen(this.stage.width,this.stage.height);
    },

    subclassStartPlaying: function()
    {
        NumberConnect.prototype.beatBestTime = false;

        this.colors.shuffle();

        // this.currentPack will already be set to one of curious, enthusiastic or obsessed
        this.currentLevelInfo = this.levelInfo[this.difficulties[this.currentPack][this.currentDifficulty]];

        var puzzles = this.levelPacks[this.currentPack][this.difficulties[this.currentPack][this.currentDifficulty]];
        this.dictNumberTilePairs = puzzles[this.currentLevelNumber];

        // this.score = 0;
        this.lastTouchTime = 0;
        this.pathSegments = [];

        this.clearScene();
        this.setBackgroundColor('#eee');
        this.setupGrid();

        var idleColor1 = TGE.Button.DefaultIdleColor,
            idleColor2 = "#666";

        var buttonWidth = 120,
            buttonHeight = TGE.Button.DefaultHeight;

        var centerX = buttonWidth/2,
            centerY = buttonHeight/2; //(832-this.currentLevelInfo.boardHeight)/2;

        var buttonClear = new TGE.Button().setup({
            x:centerX,
            y:centerY,
            pressFunction:NumberConnect.prototype.clearBoard.bind(this),
            numStates: 3,
            text: "CLEAR",
            font: "bold 24px Helvetica",
            width: buttonWidth-1,
            height: buttonHeight
        });
        this.stage.addChild(buttonClear);

        centerX += buttonWidth;

        var buttonUndo = new TGE.Button().setup({
            x:centerX,
            y:centerY,
            pressFunction:NumberConnect.prototype.undoBoard.bind(this),
            numStates: 3,
            text: "UNDO",
            font: "bold 24px Helvetica",
            width: buttonWidth-1,
            height: buttonHeight
        });
        this.stage.addChild(buttonUndo);

        centerX += buttonWidth;

        this.buttonHint = new TGE.Button().setup({
            x:centerX+10,
            y:centerY,
            pressFunction:NumberConnect.prototype.showHint.bind(this),
            numStates: 3,
            text: "HINTS ("+this.hintsLeft+")",
            font: "bold 24px Helvetica",
            width: buttonWidth+20-1,
            height: buttonHeight
        });
        this.stage.addChild(this.buttonHint);

        centerX += buttonWidth+20;

        var buttonQuit = new TGE.Button().setup({
            x:centerX,
            y:centerY,
            pressFunction:NumberConnect.prototype.quitGame.bind(this),
            numStates: 3,
            text: "QUIT",
            font: "bold 24px Helvetica",
            width: buttonWidth-1,
            height: buttonHeight
        });
        this.stage.addChild(buttonQuit);

        centerX += buttonWidth/2+10;

        this.textTimer = new TGE.Text().setup({
            x:centerX,
            y:centerY-22,
            text: "00:00",
            font: "bold 28px Helvetica",
            color: "#444",
            registrationX: 0,
            hAlign: "left"
        });
        this.stage.addChild(this.textTimer);

        this.textBestTime = new TGE.Text().setup({
            x:centerX,
            y:centerY,
            font: "bold 18px Helvetica",
            color: "#777",
            registrationX: 0,
            hAlign: "left"
        });
        this.stage.addChild(this.textBestTime);

        var bestTimes = this.bestTimes;
        if (bestTimes)
        {
            bestTimes = JSON.parse(bestTimes);

            var pack = this.currentPack;
            var difficulty = this.difficulties[this.currentPack][this.currentDifficulty];
            var levelNum = this.currentLevelNumber;

            if ((bestTimes[pack][difficulty]).hasOwnProperty(levelNum))
            {
                this.textBestTime.text = "BEST "+this.timeToPrintable(bestTimes[pack][difficulty][levelNum])
            }
        }

        this.textCurrentLevel = new TGE.Text().setup({
            x:centerX,
            y:centerY+25,
            text: this.difficulties[this.currentPack][this.currentDifficulty] + " " + LevelScreen.prototype.zeroPad(this.currentLevelNumber+1,2),
            font: "bold 18px Helvetica",
            color: "#777",
            registrationX: 0,
            hAlign: "left"
        });
        this.stage.addChild(this.textCurrentLevel);

        this.AnalyticCustomEvent(this.currentPack+' '+this.textCurrentLevel.text +' started');

        this.time = 0;
        this.timerFunction = window.setInterval(function(){
            this.time += 1;
            this.textTimer.text = this.timeToPrintable(this.time);
        }.bind(this), 1000);
    },

    timeToPrintable: function(timeValue)
    {
        var hours = parseInt(timeValue / 3600);
        var minutes = parseInt((timeValue % 3600) / 60);
        var seconds = ((timeValue % 3600) % 60);
        if (hours > 0)
            return LevelScreen.prototype.zeroPad(hours,2) + ":" + LevelScreen.prototype.zeroPad(minutes,2) + ":" + LevelScreen.prototype.zeroPad(seconds,2);
        else
            return LevelScreen.prototype.zeroPad(minutes,2) + ":" + LevelScreen.prototype.zeroPad(seconds,2);
    },

    quitGame: function()
    {
        this.AnalyticCustomEvent(this.currentPack+' '+this.textCurrentLevel.text +' quit');
        NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');
        NumberConnect.prototype.successfulEndGame = false;
        NumberConnect.prototype.beatBestTime = false;
        window.clearInterval(this.timerFunction);
        this.EndGame();
    },

    isHintPathAlreadyCovered: function(hintPath, number)
    {
        var alreadyCovered = true;
        for (i = 0; i < hintPath.length; ++i)
        {
            var location = hintPath[i];
            var tile = this.getGridTileAtXY(location[0], location[1]);
            if (tile.numberPath != number)
            {
                alreadyCovered = false;
                break;
            }
        }
        return alreadyCovered;
    },

    showHint: function()
    {
        this.AnalyticCustomEvent(this.currentPack+' '+this.textCurrentLevel.text +' hint used');

        NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');

        if (this.hintsLeft == 0)
        {
            if (TGS.IsReady())
            {
                TGS.Microtransactions.PurchaseProduct({
                    productID:'NC1',
                    gameDataUpdates:{hintsLeft:10},
                    onSuccess:function(){
                        NumberConnect.prototype.displayTransientAlert(this.stage, '10 hints added!');
                        TGE.Game.GetInstance().hintsLeft = 10;
                        TGE.Game.GetInstance().buttonHint.text = "HINTS (10)";
                    }.bind(this),
                    onFailure:function(){
                        NumberConnect.prototype.displayTransientAlert(this.stage, 'Could not add hints, sorry.');
                    }.bind(this)
                });
            }
            else
            {
                NumberConnect.prototype.displayTransientAlert(this.stage, 'Sorry, the store cannot be reached.');
            }

            return;
        }

        if (this.hintPathsNotShownYet.length > 0)
        {
            // smart hints: if a touch-driven path is already laid out exactly over the hint path, skip to the next hint path
            var path;
            
            do
            {
                path = this.hintPathsNotShownYet.splice(0,1)[0];
            }
            while (this.isHintPathAlreadyCovered(this.dictNumberTilePairs[path], path))

            for (i = 0; i < this.dictNumberTilePairs[path].length; ++i)
            {
                var location = this.dictNumberTilePairs[path][i];
                var tile = this.getGridTileAtXY(location[0], location[1]);

                // we delete any paths that may currently cross the hint path, to avoid leaving disassociated segments on the board.
                // this also deletes existing remnants of the hint-path because it has to be connected to one of the end-points.
                if (tile.topConnected)
                {
                    var tileNeighbour = this.getGridTileAtXY(location[0], location[1]-1);
                    tileNeighbour.bottomConnected = false;
                    this.startRecursiveDelete(tileNeighbour);
                }
                if (tile.rightConnected)
                {
                    var tileNeighbour = this.getGridTileAtXY(location[0]+1, location[1]);
                    tileNeighbour.leftConnected = false;
                    this.startRecursiveDelete(tileNeighbour);
                }
                if (tile.bottomConnected)
                {
                    var tileNeighbour = this.getGridTileAtXY(location[0], location[1]+1);
                    tileNeighbour.topConnected = false;
                    this.startRecursiveDelete(tileNeighbour);
                }
                if (tile.leftConnected)
                {
                    var tileNeighbour = this.getGridTileAtXY(location[0]-1, location[1]);
                    tileNeighbour.rightConnected = false;
                    this.startRecursiveDelete(tileNeighbour);
                }
                tile.topConnected = tile.rightConnected = tile.bottomConnected = tile.leftConnected = false;
            }

            for (i = 0; i < this.dictNumberTilePairs[path].length; ++i)
            {
                var location = this.dictNumberTilePairs[path][i];
                var tile = this.getGridTileAtXY(location[0], location[1]);
                if (i < this.dictNumberTilePairs[path].length-1)
                {
                    var nextLocation = this.dictNumberTilePairs[path][i+1];
                    var nextTile = this.getGridTileAtXY(nextLocation[0], nextLocation[1]);
                    nextTile.numberPath = tile.numberPath;

                    if (nextLocation[0] > location[0])
                    {
                        tile.rightConnected = true;
                        nextTile.leftConnected = true;
                    }
                    else if (nextLocation[0] < location[0])
                    {
                        tile.leftConnected = true;
                        nextTile.rightConnected = true;
                    }
                    else if (nextLocation[1] > location[1])
                    {
                        tile.bottomConnected = true;
                        nextTile.topConnected = true;
                    }
                    else if (nextLocation[1] < location[1])
                    {
                        tile.topConnected = true;
                        nextTile.bottomConnected = true;
                    }
                }
            }

            this.hintsLeft -= 1;
            TGS.DataStore.SaveValues({hintsLeft:this.hintsLeft});
            this.buttonHint.text = "HINTS ("+this.hintsLeft+")";

            this.testForSolution();
        }
        else
        {
            // TODO disable hint button here
        }
    },

    undoBoard: function()
    {
        if (this.gridHistory.length > 0)
        {
            NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');

            this.grid = this.gridHistory.pop();

            // refresh board display
            for (i = 0; i < this.pathSegments.length; ++i)
            {
                this.stage.getChildByName(this.pathSegments[i], false).markForRemoval();
            }

            this.pathSegments = [];

            for (i = 0; i < this.levelWidthTiles; ++i)
            {
                for (j = 0; j < this.levelHeightTiles; ++j)
                {
                    if (this.grid[i][j].topConnected)
                        this.makeSegment(this.grid[i][j], 'top');
                    if (this.grid[i][j].rightConnected)
                        this.makeSegment(this.grid[i][j], 'right');
                    if (this.grid[i][j].bottomConnected)
                        this.makeSegment(this.grid[i][j], 'bottom');
                    if (this.grid[i][j].leftConnected)
                        this.makeSegment(this.grid[i][j], 'left');
                }
            }
        }
    },

    clearBoard: function()
    {
        var newBlankGrid = this.getFreshGrid(),
            hasGridChanged = this.hasGridChangedFrom(newBlankGrid);

        if (hasGridChanged)
        {
            NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('buttonPress');

            // refresh board display
            for (i = 0; i < this.pathSegments.length; ++i)
            {
                this.stage.getChildByName(this.pathSegments[i], false).markForRemoval();
            }

            this.pathSegments = [];

            this.gridHistory.push(this.getCopyOfCurrentGrid(true));
            this.grid = newBlankGrid;
        }
    },

    setupGrid: function()
    {
        this.successStar = null;
        this.successStarInterval = null;

        this.checkerboard = new TGE.Sprite();
        this.stage.addChild(this.checkerboard);

        this.checkerboard.width = 640;
        this.checkerboard.height = this.currentLevelInfo.boardHeight;

        this.checkerboard.registrationX = this.checkerboard.registrationY = 0;
        this.checkerboard.x = 0;
        this.checkerboard.y = 832-this.checkerboard.height;
        this.checkerboard.setImage(this.currentLevelInfo.boardImage);

        this.checkerboard.clearEventListeners();

        this.checkerboard.addEventListener("mousedown", this.boardTouchDown.bind(this));        
        this.checkerboard.addEventListener("mouseup", this.boardTouchUp.bind(this));    
        this.checkerboard.addEventListener("mousemove", this.boardTouchMove.bind(this));

        this.levelWidthTiles = this.currentLevelInfo.size[0];
        this.levelHeightTiles = this.currentLevelInfo.size[1];
        this.tileDim = this.currentLevelInfo.tileDim;
        this.levelWidthPoints = this.levelWidthTiles * this.tileDim;
        this.levelHeightPoints = this.levelHeightTiles * this.tileDim;

        this.lastTileTouched = {'x': -1, 'y': -1};
        this.gridHistory = [];

        this.hintPathsNotShownYet = []; // in decreasing order of length
        var tempTuples = [];
        for (var key in this.dictNumberTilePairs)
        {
            tempTuples.push([key, this.dictNumberTilePairs[key].length]);
        }
        tempTuples.sort(function(a,b) {return b[1]-a[1]});
        for (i = 0; i < tempTuples.length; ++i)
        {
            this.hintPathsNotShownYet.push(tempTuples[i][0]);
        }

        this.grid = this.getFreshGrid();

        for (var key in this.dictNumberTilePairs)
        {
            positions = this.clone(this.dictNumberTilePairs[key]);
            positions.splice(1, positions.length-2); // remove all but first and last elements
            for (j = 0; j < positions.length; ++j)
            {
                var tile = new TGE.DisplayObjectContainer();
                this.stage.addChild(tile);
                tile.width = this.tileDim;
                tile.height = this.tileDim;
                tile.backgroundColor = this.colors[parseInt(key)];
                tile.x = this.tileDim/2 + positions[j][0]*this.tileDim;
                tile.y = this.tileDim/2 + 832-this.checkerboard.height + positions[j][1]*this.tileDim;
                tile.addChild(new TGE.Text().setup({
                    font: this.currentLevelInfo.textSize+" Helvetica",
                    text: key,
                    color: "#fff"
                }));
            }
        }
    },

    makeSegment: function(tile, side)
    {
        if (tile.numberPath != -1 && !tile.isNumberEndpoint)
        {
            var segment = new TGE.DisplayObjectContainer();
            segment.registrationX = segment.registrationY = 0;
            segment.backgroundColor = this.colors[tile.numberPath];

            if (side === 'top')
            {
                segment.x = tile.location.x*this.tileDim + this.tileDim/2-this.currentLevelInfo.pathRadius;
                segment.y = 832-this.checkerboard.height + tile.location.y*this.tileDim;
                segment.width = this.currentLevelInfo.pathRadius*2;
                segment.height = this.tileDim/2 + this.currentLevelInfo.pathRadius;
                segment.instanceName = 'top-'+tile.location.x+'-'+tile.location.y;
                tile._connectionSegments.top = segment.instanceName;
            }
            else if (side === 'right')
            {
                segment.x = tile.location.x*this.tileDim + this.tileDim/2 - this.currentLevelInfo.pathRadius;
                segment.y = 832-this.checkerboard.height + tile.location.y*this.tileDim + this.tileDim/2 - this.currentLevelInfo.pathRadius;
                segment.width = this.tileDim/2 + this.currentLevelInfo.pathRadius;
                segment.height = this.currentLevelInfo.pathRadius*2;
                segment.instanceName = 'right-'+tile.location.x+'-'+tile.location.y;
                tile._connectionSegments.right = segment.instanceName;
            }
            else if (side === 'bottom')
            {
                segment.x = tile.location.x*this.tileDim + this.tileDim/2-this.currentLevelInfo.pathRadius;
                segment.y = 832-this.checkerboard.height + tile.location.y*this.tileDim + this.tileDim/2 - this.currentLevelInfo.pathRadius;
                segment.width = this.currentLevelInfo.pathRadius*2;
                segment.height = this.tileDim/2 + this.currentLevelInfo.pathRadius;
                segment.instanceName = 'bottom-'+tile.location.x+'-'+tile.location.y;
                tile._connectionSegments.bottom = segment.instanceName;
            }
            else if (side === 'left')
            {
                segment.x = tile.location.x*this.tileDim;
                segment.y = 832-this.checkerboard.height + tile.location.y*this.tileDim + this.tileDim/2 - this.currentLevelInfo.pathRadius;
                segment.width = this.tileDim/2 + this.currentLevelInfo.pathRadius;
                segment.height = this.currentLevelInfo.pathRadius*2;
                segment.instanceName = 'left-'+tile.location.x+'-'+tile.location.y;
                tile._connectionSegments.left = segment.instanceName;
            }
            else
            {
                console.log('Error: unknown side-type specified ' + side);
            }

            this.stage.addChild(segment);
            this.pathSegments.push(segment.instanceName);
        }
    },

    // NCT-4 When minified with YUI Compressor this function throws the following runtime errors:
    // TypeError: value is not a non-null object
    // TypeError: oldGrid is undefined
    // I don't know why, but I'm guessing it doesn't like something about the function nesting. We'll have to figure it
    // out, but for now I'm going to append this function un-minified to the rest of the minified code.
    /*getFreshGrid: function()
    {
        var grid = new Array(this.levelWidthTiles);
        var NumberConnect = this;

        for (i = 0; i < this.levelWidthTiles; ++i)
        {
            grid[i] = new Array(this.levelHeightTiles);

            for (j = 0; j < this.levelHeightTiles; ++j)
            {
                grid[i][j] = {
                    'location': {'x': i, 'y': j},
                    _connections: {'top': false, 'right': false, 'bottom': false, 'left': false},
                    _connectionSegments: {'top': null, 'right': null, 'bottom': null, 'left': null},
                    // 'displayTile': null,
                    get topConnected() {return this._connections.top;},
                    set topConnected(connected) {
                        this._connections.top = connected;
                        if (connected)
                        {
                            NumberConnect.makeSegment(this, 'top');
                        }
                        else if (!connected)
                        {
                            if (this._connectionSegments.top)
                            {
                                NumberConnect.pathSegments.removeNamedMember(this._connectionSegments.top);
                                NumberConnect.stage.getChildByName(this._connectionSegments.top, false).markForRemoval();
                                this._connectionSegments.top = null;
                            }
                        }
                    },
                    get rightConnected() {return this._connections.right;},
                    set rightConnected(connected) {
                        this._connections.right = connected;
                        if (connected)
                        {
                            NumberConnect.makeSegment(this, 'right');
                        }
                        else if (!connected)
                        {
                            if (this._connectionSegments.right)
                            {
                                NumberConnect.pathSegments.removeNamedMember(this._connectionSegments.right);
                                NumberConnect.stage.getChildByName(this._connectionSegments.right, false).markForRemoval();
                                this._connectionSegments.right = null;
                            }
                        }
                    },
                    get bottomConnected() {return this._connections.bottom;},
                    set bottomConnected(connected) {
                        this._connections.bottom = connected;
                        if (connected)
                        {
                            NumberConnect.makeSegment(this, 'bottom');
                        }
                        else if (!connected)
                        {
                            if (this._connectionSegments.bottom)
                            {
                                NumberConnect.pathSegments.removeNamedMember(this._connectionSegments.bottom);
                                NumberConnect.stage.getChildByName(this._connectionSegments.bottom, false).markForRemoval();
                                this._connectionSegments.bottom = null;
                            }
                        }
                    },
                    get leftConnected() {return this._connections.left;},
                    set leftConnected(connected) {
                        this._connections.left = connected;
                        if (connected)
                        {
                            NumberConnect.makeSegment(this, 'left');
                        }
                        else if (!connected)
                        {
                            if (this._connectionSegments.left)
                            {
                                NumberConnect.pathSegments.removeNamedMember(this._connectionSegments.left);
                                NumberConnect.stage.getChildByName(this._connectionSegments.left, false).markForRemoval();
                                this._connectionSegments.left = null;
                            }
                        }
                    },
                    'numberPath': -1,
                    'isNumberEndpoint': false,
                };
            }
        }

        for (var key in this.dictNumberTilePairs)
        {
            positions = this.clone(this.dictNumberTilePairs[key]);
            positions.splice(1, positions.length-2); // remove all but first and last elements
            for (j = 0; j < positions.length; ++j)
            {
                tile = grid[positions[j][0]][positions[j][1]];
                tile.isNumberEndpoint = true;
                tile.numberPath = parseInt(key);
            }
        }
        return grid;
    },*/

    getCopyOfCurrentGrid: function(mapToDisplay)
    {
        var gridCopy = new Array(this.levelWidthTiles);

        for (i = 0; i < this.levelWidthTiles; ++i)
        {
            gridCopy[i] = new Array(this.levelHeightTiles);

            for (j = 0; j < this.levelHeightTiles; ++j)
            {
                gridCopy[i][j] = this.clone(this.grid[i][j]);

                if (mapToDisplay)
                {
                    Object.defineProperty(gridCopy[i][j], "topConnected", Object.getOwnPropertyDescriptor(this.grid[i][j], "topConnected"));
                    Object.defineProperty(gridCopy[i][j], "rightConnected", Object.getOwnPropertyDescriptor(this.grid[i][j], "rightConnected"));
                    Object.defineProperty(gridCopy[i][j], "bottomConnected", Object.getOwnPropertyDescriptor(this.grid[i][j], "bottomConnected"));
                    Object.defineProperty(gridCopy[i][j], "leftConnected", Object.getOwnPropertyDescriptor(this.grid[i][j], "leftConnected"));                    
                }
                else
                {
                    gridCopy[i][j].__defineGetter__("topConnected", function() {
                        return this._connections.top;
                    });
                    gridCopy[i][j].__defineSetter__("topConnected", function(connected) {
                        this._connections.top = connected;
                    })
                    gridCopy[i][j].__defineGetter__("rightConnected", function() {
                        return this._connections.right;
                    });
                    gridCopy[i][j].__defineSetter__("rightConnected", function(connected) {
                        this._connections.right = connected;
                    })
                    gridCopy[i][j].__defineGetter__("bottomConnected", function() {
                        return this._connections.bottom;
                    });
                    gridCopy[i][j].__defineSetter__("bottomConnected", function(connected) {
                        this._connections.bottom = connected;
                    })
                    gridCopy[i][j].__defineGetter__("leftConnected", function() {
                        return this._connections.left;
                    });
                    gridCopy[i][j].__defineSetter__("leftConnected", function(connected) {
                        this._connections.left = connected;
                    })
                }
            }
        }

        return gridCopy;
    },

    clone: function(obj) { // where did I get this code from?; I should make this an Object.prototype method, right?
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            var copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            var copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            var copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    },

    resetTile: function(tile)
    {
        tile.topConnected = false;
        tile.rightConnected = false;
        tile.bottomConnected = false;
        tile.leftConnected = false;

        if (!tile.isNumberEndpoint) 
        {
            tile.numberPath = -1;
        }
    },

    getGridTileAtXY: function(x, y)
    {
        if (x < 0)
            x = 0;
        else if (x > this.grid.length - 1)
            x = this.grid.length - 1;

        if (y < 0)
            y = 0;
        else if (y > this.grid[x].length - 1)
            y = this.grid[x].length - 1;

        return this.grid[x][y];
    },

    convertTouchLocationToTileLocation: function(touchLocation)
    {
        return { 'x': Math.floor(touchLocation.x/this.tileDim),
                 'y': Math.floor((touchLocation.y-832+this.checkerboard.height)/this.tileDim) };
    },

    ccpDistance: function(tile1, tile2)
    {
        var dx = tile1.x - tile2.x,
            dy = tile1.y - tile2.y;
        var dot = dx*dx + dy*dy;
        return Math.sqrt(dot);
    },

    getAllLocationsBetweenPoints: function(point1, point2)
    {
        var x1 = point1.x,
            y1 = point1.y,
            x2 = point2.x,
            y2 = point2.y;

        if (x1 != x2 && y1 != y2)
            return null;

        if (x1 === x2 && y1 === y2)
            return null;

        var array = [];
        if (x1 === x2)
        {
            if (y1 > y2)
            {
                var i = y2 + 1;
                while (i < y1) {
                    array.push({'x': x1, 'y': i});
                    i++;
                }
            }
            else // y2 > y1 is implied
            {
                var i = y1 + 1;
                while (i < y2) {
                    array.push({'x': x1, 'y': i});
                    i++;
                }
            }
        }
        else // y1 === y2 is implied
        {
            if (x1 > x2)
            {
                var i = x2 + 1;
                while (i < x1) {
                    array.push({'x': i, 'y': y1});
                    i++;
                }
            }
            else // y2 > y1 is implied
            {
                var i = x1 + 1;
                while (i < x2) {
                    array.push({'x': i, 'y': y1});
                    i++;
                }
            }
        }

        return array;
    },

    getNumberOfConnectedNeighbours: function(tile)
    {
        var num = 0;

        num += tile.topConnected ? 1 : 0;
        num += tile.rightConnected ? 1 : 0;
        num += tile.bottomConnected ? 1 : 0;
        num += tile.leftConnected ? 1 : 0;

        return num;
    },

    startRecursiveDelete: function(gridTileCurrent)
    {
        var currentTile = gridTileCurrent.location;

        if (gridTileCurrent.topConnected)
        {
            var gridNeighbour = this.getGridTileAtXY(currentTile.x, currentTile.y-1);
            gridNeighbour.bottomConnected = false;
            this.startRecursiveDelete(gridNeighbour);
        }

        if (gridTileCurrent.rightConnected)
        {
            var gridNeighbour = this.getGridTileAtXY(currentTile.x+1, currentTile.y);
            gridNeighbour.leftConnected = false;
            this.startRecursiveDelete(gridNeighbour);
        }

        if (gridTileCurrent.bottomConnected)
        {
            var gridNeighbour = this.getGridTileAtXY(currentTile.x, currentTile.y+1);
            gridNeighbour.topConnected = false;
            this.startRecursiveDelete(gridNeighbour);
        }

        if (gridTileCurrent.leftConnected)
        {
            var gridNeighbour = this.getGridTileAtXY(currentTile.x-1, currentTile.y);
            gridNeighbour.rightConnected = false;
            this.startRecursiveDelete(gridNeighbour);
        }

        this.resetTile(gridTileCurrent);
    },

    handleTouch: function()
    {
        var location = {'x': this.mMouseX, 'y': this.mMouseY};
        var currentTile = this.convertTouchLocationToTileLocation({'x': this.mMouseX, 'y': this.mMouseY});

        if (this.lastTileTouched.x < 0 && this.lastTileTouched.y < 0) return;
        if (this.lastTileTouched.x === currentTile.x & this.lastTileTouched.y === currentTile.y) return;

        var gridTileCurrent = this.getGridTileAtXY(currentTile.x, currentTile.y),
            gridTileLastTouched = this.getGridTileAtXY(this.lastTileTouched.x, this.lastTileTouched.y);

        // if retracing one's steps
        if (gridTileCurrent.numberPath === gridTileLastTouched.numberPath &&
            (this.getNumberOfConnectedNeighbours(gridTileCurrent) === 2 ||
             (this.getNumberOfConnectedNeighbours(gridTileCurrent) === 1 && gridTileCurrent.isNumberEndpoint)))
        {
            var gridCopy = this.getCopyOfCurrentGrid(false);

            var array = this.clone(this.dictNumberTilePairs[gridTileCurrent.numberPath]);
            array.splice(1, array.length-2); // remove all but first and last elements
            for (i = 0; i < array.length; ++i)
            {
                var endpoint = array[i];

                var currTile = gridCopy[endpoint[0]][endpoint[1]],
                    gridTileCurrent = gridCopy[currentTile.x][currentTile.y];
                
                var nextCurrTile, prevCurrTile = null;

                while (this.getNumberOfConnectedNeighbours(currTile) != 0 && prevCurrTile != gridTileCurrent)
                {
                    if (currTile.topConnected)
                    {
                        nextCurrTile = gridCopy[currTile.location.x][currTile.location.y-1];
                        nextCurrTile.bottomConnected = false;
                    }
                    else if (currTile.rightConnected)
                    {
                        nextCurrTile = gridCopy[currTile.location.x+1][currTile.location.y];
                        nextCurrTile.leftConnected = false;
                    }
                    else if (currTile.bottomConnected)
                    {
                        nextCurrTile = gridCopy[currTile.location.x][currTile.location.y+1];
                        nextCurrTile.topConnected = false;
                    }
                    else // if (currTile.leftConnected)
                    {
                        nextCurrTile = gridCopy[currTile.location.x-1][currTile.location.y];
                        nextCurrTile.rightConnected = false;
                    }

                    prevCurrTile = currTile;
                    currTile = nextCurrTile;
                }

                if (prevCurrTile === gridTileCurrent)
                {
                    var realPrevCurrTile = this.getGridTileAtXY(prevCurrTile.location.x, prevCurrTile.location.y),
                        realCurrTile = this.getGridTileAtXY(currTile.location.x, currTile.location.y);

                        if (currTile.location.y < prevCurrTile.location.y)
                        {
                            realPrevCurrTile.topConnected = false;
                            realCurrTile.bottomConnected = false;
                        }
                        else if (currTile.location.x > prevCurrTile.location.x)
                        {
                            realPrevCurrTile.rightConnected = false;
                            realCurrTile.leftConnected = false;
                        }
                        else if (currTile.location.y > prevCurrTile.location.y)
                        {
                            realPrevCurrTile.bottomConnected = false;
                            realCurrTile.topConnected = false;
                        }
                        else if (currTile.location.x < prevCurrTile.location.x)
                        {
                            realPrevCurrTile.leftConnected = false;
                            realCurrTile.rightConnected = false;
                        }

                        this.startRecursiveDelete(realCurrTile);
                        this.lastTileTouched = {'x': prevCurrTile.location.x, 'y': prevCurrTile.location.y};
                        break;
                }
            }
            // this.printConnectionMapForGrid(this.grid);
            return;
        }

        if (gridTileCurrent.numberPath != -1)
        {
            if (!gridTileLastTouched.isNumberEndpoint &&
                gridTileCurrent.numberPath === gridTileLastTouched.numberPath)
            {
                NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('pathFinished');
            }
        }

        // connect only if current tile is 0- connected non-number or 1-connected non-number in the same path, 
        // or 0-connected number in the same path
        // if current tile and last tile touched are in the same horizontal or vertical line
        // and if intermediate tiles, if any, were 0-connected non-numbers.

        if ((!gridTileCurrent.isNumberEndpoint && this.getNumberOfConnectedNeighbours(gridTileCurrent) === 0) ||
            (!gridTileCurrent.isNumberEndpoint && this.getNumberOfConnectedNeighbours(gridTileCurrent) === 1 && gridTileCurrent.numberPath === gridTileLastTouched.numberPath) ||
            (gridTileCurrent.isNumberEndpoint && gridTileCurrent.numberPath === gridTileLastTouched.numberPath))
        {
            if (currentTile.x === this.lastTileTouched.x || currentTile.y === this.lastTileTouched.y)
            {
                var AllIntermediateTilesZeroConnNonMembers = true;

                var allLocationsBetween = this.getAllLocationsBetweenPoints(currentTile, this.lastTileTouched);
                for (i = 0; i < allLocationsBetween.length; ++i)
                {
                    var location = allLocationsBetween[i],
                        tile = this.getGridTileAtXY(location.x, location.y);
                    if (tile.isNumberEndpoint || this.getNumberOfConnectedNeighbours(tile) > 0)
                    {
                        AllIntermediateTilesZeroConnNonMembers = false;
                        break;
                    }
                }

                if (AllIntermediateTilesZeroConnNonMembers)
                {
                    var array = this.getAllLocationsBetweenPoints(currentTile, this.lastTileTouched);
                    array.push(currentTile);

                    var prevTile = gridTileLastTouched;
                    for (i = 0; i < array.length; ++i)
                    {
                        var location = array[i];
                        var tile = this.getGridTileAtXY(location.x, location.y);
                        tile.numberPath = prevTile.numberPath;

                        if (location.x > this.lastTileTouched.x) {
                            tile.leftConnected = true;
                            prevTile.rightConnected = true;
                        }
                        else if (location.x < this.lastTileTouched.x) {
                            tile.rightConnected = true;
                            prevTile.leftConnected = true;
                        }
                        else if (location.y > this.lastTileTouched.y) {
                            tile.topConnected = true;
                            prevTile.bottomConnected = true;
                        }
                        else {
                            tile.bottomConnected = true;
                            prevTile.topConnected = true;
                        }
                    
                        prevTile = tile;
                    }

                    if (gridTileCurrent.isNumberEndpoint || this.getNumberOfConnectedNeighbours(gridTileCurrent) == 2) // if we've just finished a path
                    {
                        this.lastTileTouched = {'x': -1, 'y': -1};
                    }
                    else
                    {
                        this.lastTileTouched = currentTile;
                    }

                    this.testForSolution();
                }
            }
        }

        // this.printConnectionMapForGrid(this.grid);
    },

    testForSolution: function()
    {
        var isGridFilled = true;

        for (i = 0; i < this.levelWidthTiles; ++i)
        {
            for (j = 0; j < this.levelHeightTiles; ++j)
            {
                var gridTile = this.getGridTileAtXY(i, j);
                if (gridTile.numberPath < 0) isGridFilled = false;
            }
        }

        var gridCopy = this.getCopyOfCurrentGrid(false);

        var areAllNumberPairsConnected = true;
        for (var key in this.dictNumberTilePairs)
        {
            var point1 = this.dictNumberTilePairs[key][0],
                point2 = this.dictNumberTilePairs[key][this.dictNumberTilePairs[key].length-1];

            var currTile = gridCopy[point1[0]][point1[1]],
                tile2 = gridCopy[point2[0]][point2[1]],
                neighbour;

            while (this.getNumberOfConnectedNeighbours(currTile) != 0)
            {
                if (currTile.topConnected)
                {
                    neighbour = gridCopy[currTile.location.x][currTile.location.y-1];
                    neighbour.bottomConnected = false;
                }
                else if (currTile.rightConnected)
                {
                    neighbour = gridCopy[currTile.location.x+1][currTile.location.y];
                    neighbour.leftConnected = false;
                }
                else if (currTile.bottomConnected)
                {
                    neighbour = gridCopy[currTile.location.x][currTile.location.y+1];
                    neighbour.topConnected = false;
                }
                else // if (currTile.leftConnected)
                {
                    neighbour = gridCopy[currTile.location.x-1][currTile.location.y];
                    neighbour.rightConnected = false;
                }

                currTile = neighbour;
            }

            if (currTile != tile2)
            {
                areAllNumberPairsConnected = false;
                break;
            }
        }

        var isSolved = isGridFilled && areAllNumberPairsConnected;

        if (areAllNumberPairsConnected && !isGridFilled)
        {
            var arrayNotYets = ["Whoops, all tiles are not filled yet.", "Not so fast, all tiles must be filled."];
            var randomIndex = Math.floor(Math.random() * arrayNotYets.length);
            var stringNotYet = arrayNotYets[randomIndex];
            NumberConnect.prototype.displayTransientAlert(this.stage, stringNotYet);
        }

        if (isSolved)
        {
            this.AnalyticCustomEvent(this.currentPack+' '+this.textCurrentLevel.text +' solved');

            // stop the clock
            window.clearInterval(this.timerFunction);

            // save time if better than previous best
            var pack = this.currentPack;
            var difficulty = this.difficulties[this.currentPack][this.currentDifficulty];
            var levelNum = this.currentLevelNumber;
            var bestTimes = this.bestTimes;
            bestTimes = JSON.parse(bestTimes);

            if ((bestTimes[pack][difficulty]).hasOwnProperty(levelNum) && bestTimes[pack][difficulty][levelNum] > this.time)
                NumberConnect.prototype.beatBestTime = true;

            if (!(bestTimes[pack][difficulty]).hasOwnProperty(levelNum) || bestTimes[pack][difficulty][levelNum] > this.time)
                bestTimes[pack][difficulty][levelNum] = this.time;

            TGS.DataStore.SaveValues({curiousBest:JSON.stringify(bestTimes.CURIOUS),
                enthusiasticBest:JSON.stringify(bestTimes.ENTHUSIASTIC),
                obsessedBest:JSON.stringify(bestTimes.OBSESSED)
            });

            this.bestTimes = JSON.stringify(bestTimes);

            NumberConnect.prototype.successfulEndGame = true;

            this.successStar = new TGE.Sprite().setup({
                image: "star",
                width: 300,
                height: 300
            });
            this.successStar.x = 640/2;
            this.successStar.y = 832-this.currentLevelInfo.boardHeight+this.currentLevelInfo.boardHeight/2;
            this.successStar.scaleX = this.successStar.scaleY = 0.1;
            this.successStar.alpha = 0;

            this.stage.addChild(this.successStar);

            createjs.Ticker.setFPS(60);
            createjs.Tween.get(this.successStar)
                .wait(500)
                .to({alpha:1.0})
                .to({scaleX:5, scaleY:5}, 500)
                .call(NumberConnect.prototype.EndGame.bind(this));
        }
    },

    boardTouchDown: function()
    {
        this.gridTouchCopy = this.getCopyOfCurrentGrid(true);
        var currentTile = this.convertTouchLocationToTileLocation({'x': this.mMouseX, 'y': this.mMouseY});

        if (currentTile.x > this.levelWidthPoints || currentTile.y > this.levelHeightPoints)
            return;

        var gridTileCurrent = this.getGridTileAtXY(currentTile.x, currentTile.y);

        // delete paths with double-tap.
        var currentTime = new Date().getTime()/1000;
        var diff = currentTime - this.lastTouchTime;
        this.lastTouchTime = currentTime;
        if (diff < 0.5)
        {
            NumberConnect.prototype.playSound.bind(NumberConnect.prototype)('pathWrong');

            this.startRecursiveDelete(gridTileCurrent);
            this.lastTileTouched = {'x': -1, 'y': -1};
            return;
        }

        // initialize lastTileTouched and return 
        // if 
        //      current tile is a 0-connected number tile or 1-connected non-member of a different numberPath than lastTileTouched,
        //      or if lastTileTouched was -1, -1,
        //      or the same number path but more than 1 horz or vert step away

        if (((gridTileCurrent.isNumberEndpoint && this.getNumberOfConnectedNeighbours(gridTileCurrent) === 0) ||
             (!gridTileCurrent.isNumberEndpoint && this.getNumberOfConnectedNeighbours(gridTileCurrent) === 1))
            &&
            ((this.lastTileTouched.x < 0 && this.lastTileTouched.y < 0) ||
             (this.getGridTileAtXY(this.lastTileTouched.x, this.lastTileTouched.y).numberPath != gridTileCurrent.numberPath) || 
             ((this.getGridTileAtXY(this.lastTileTouched.x, this.lastTileTouched.y).numberPath === gridTileCurrent.numberPath) &&
              (this.ccpDistance(currentTile, this.lastTileTouched) > 1))))
        {
            this.lastTileTouched = currentTile;
            return;
        }
        

        this.handleTouch();
    },

    boardTouchUp: function()
    {
        this.lastTileTouched = {'x': -1, 'y': -1};

        if (this.hasGridChangedFrom(this.gridTouchCopy)) this.gridHistory.push(this.gridTouchCopy);
    },

    printConnectionMapForGrid: function(grid)
    {
        var array = [];
        for (i = 0; i < this.levelWidthTiles; ++i) {
            var arrayInner = [];
            for (j = 0; j < this.levelHeightTiles; ++j) {
                arrayInner.push(this.getNumberOfConnectedNeighbours(grid[i][j]));
            }
            array.push(arrayInner);
        }
        for (j = 0; j < this.levelHeightTiles; ++j)
        {
            var str = '';
            for (i = 0; i < this.levelWidthTiles; ++i)
            {
                str += array[i][j] + ' ';
            }
            console.log(str);
        }
        console.log(' ');
    },

    hasGridChangedFrom: function(oldGrid)
    {
        for (i = 0; i < this.levelWidthTiles; ++i) {
            for (j = 0; j < this.levelHeightTiles; ++j) {
                if (this.getGridTileAtXY(i, j).numberPath != oldGrid[i][j].numberPath) {
                    return true;
                }
            }
        }
        return false;
    },

    boardTouchMove: function()
    {
        if (this.isMouseDown())
        {            
            this.handleTouch();
        }
    },

    subclassUpdateGame: function(elapsedTime)
    {
    },

    logFacebookShare: function()
    {
        TGE.Game.GetInstance().AnalyticShareEvent('facebook');
    },

    logTwitterShare: function()
    {
        TGE.Game.GetInstance().AnalyticShareEvent('twitter')
    }
}
extend(NumberConnect,TGE.Game);

// from http://javascript.about.com/library/blshuffle.htm
Array.prototype.shuffle = function() {
    var s = [];
    while (this.length) s.push(this.splice(Math.random() * this.length, 1)[0]);
    while (s.length) this.push(s.pop());
    return this;
}

Array.prototype.removeNamedMember = function(elem) {
    for (var i = 0; i < this.length; ++i)
    {
        if (this[i] === elem)
        {
            this.splice(i, 1);
        }
    }
}

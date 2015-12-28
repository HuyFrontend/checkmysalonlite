// Game Config Global
var GameConfig = {

    PROD_ENV: false,
    LOG_LEVEL: 3,
    LIB_DIR:"js/lib/",
    ORIENTATION: 'portrait',

    GAME_ID: 'numberconnect',
    TITLE: 'Number Connect',
    VERSION: '1.1.2',

    CONSTRUCTOR: 'NumberConnect',
	SOURCE: [
        "js/game/TGSDummy.js",
        'js/game/easeljs-0.6.0.min.js',
        'js/game/tweenjs-0.4.0.min.js',
        'js/game/GameSettings.js',
        'js/game/NumberConnect.js',
        'js/game/getFreshGrid.js',
        'js/game/ui/LoadingScreen.js',
        'js/game/ui/MainMenu.js',
        'js/game/ui/GameOver.js',
        'js/game/ui/ConnectingScreen.js',
        'js/game/ui/RulesScreen.js',
        'js/game/ui/PackScreen.js',
        'js/game/ui/LevelScreen.js'
    ],

    ADS: {
        DISPLAY_PLACEMENT_ID: '2842754',
        INTERSTITIAL_PLACEMENT_ID: '3070310',
        VALUEEXCHANGE_PLACEMENT_ID: '3241622',
        PRELOADER_PLACEMENT_ID: '3253617'
    },

	TGL: {
		VERSION: '1.0'
	},

    TGS: {
        ENABLED: false,
        VERSION: '0.3'
    },

    TGE: {
        ENABLED: true,
        FONT_LOADER: false,
        VERSION: '1.0'
    },

    GoogleAnalytics: {
        ENABLED:    false,
        QA_ID:     '',
        PROD_ID:   '',
        LABEL:     'Number Connect'
    },

    Quantcast: {
        ENABLED: false
    },

    Flurry: {
        ENABLED:false
    }
};
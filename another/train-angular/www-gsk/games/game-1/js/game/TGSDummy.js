var TGS = {};
TGS.Debug = {};
TGS.Debug.Log = function(){return null};
TGS._sLSKeys = {};
TGS._sLSKeys["TGS_datastore"] = "TGS_datastore_A00xx_numberconnect";
TGS._TestLocalStorage = function()
{
    TGS.localStorage = window.localStorage;
    try
    {
        localStorage.setItem("storage","");
        localStorage.removeItem("storage");
    }
    catch(err)
    {

        // Replace the TGS localStorage handler with one that will not throw errors
        var memstore = {};
        TGS.localStorage = {
            setItem: function(key,value){
                memstore[key] = value;
            },
            removeItem: function(key){
                delete memstore[key];
            },
            getItem: function(key){
                return memstore[key];
            }
        }
    }
};
TGS._TestLocalStorage();
TGS.Language = {};
TGS.Language.PreferredLanguage = function(){return null};
TGS.Microtransactions = {};
TGS.Microtransactions.RestorePurchaseCallback = null;
TGS.Microtransactions.GetIAPProducts = function(){
    return {"code":0,"partner_values":
    {"facebook_app_id":"143577932503913"},
        "iap_products":[
            {"id":"NC1","title":"10 Hints","description":"Add 10 hints to help you out in Number Connect.","iconUrl":"https:\/\/static.tresensa.com\/number-connect\/web-image.jpg","price":10,"consumable":true,"partnerProductID":null},
            {"id":"NC2","title":"Enthusiastic Pack","description":"Unlock 99 medium and 99 hard levels in Number Connect.","iconUrl":"https:\/\/static.tresensa.com\/number-connect\/web-image.jpg","price":10,"consumable":false,"partnerProductID":null},
            {"id":"NC3","title":"Obsessed Pack","description":"Unlock 199 hard levels in Number Connect.","iconUrl":"https:\/\/static.tresensa.com\/number-connect\/web-image.jpg","price":10,"consumable":false,"partnerProductID":null}
        ],
        "leaderboards":[
            {"id":514,"title":"Obsessed Pack, Level 199","description":"Top scores on Number Connect","descending":false,"partnerLeaderboardID":null,"scoreFormat":{"type":"number","decimal":0,"prefix":"","suffix":""}}
        ],
        "app_urls":{
            "facebook_app_url":"https:\/\/apps.facebook.com\/numberconnectgame\/","itunes_app_url":"https:\/\/itunes.apple.com\/WebObjects\/MZStore.woa\/wa\/viewSoftware?id=669238177&mt=8","amazon_app_url":"http:\/\/www.amazon.com\/TreSensa-Number-Connect\/dp\/B00DL6LLGW\/ref=sr_1_2?s=mobile-apps&ie=UTF8&qid=1380136401&sr=1-2&keywords=number+connect"}};

};
TGS.Microtransactions.GetIAPProduct = function(prod){
    var value = TGS.Microtransactions.GetIAPProducts();
    for(var i = 0; i < value.iap_products.length; i++)
    {
        if(value.iap_products[i].id == prod)
        {
            return value.iap_products[i];
        }
    }
    return {};
};
TGS.Microtransactions.PriceAsFormattedString = function(aPrice){return "$" + ((aPrice/10)-0.01).toFixed(2);};
TGS.Microtransactions.PurchaseProduct = function(obj){
    if(typeof obj.onSuccess == "function")
    {
        obj.onSuccess();
    }
    if(typeof obj.gameDataUpdates !== "undefined")
    {
        TGS.DataStore.SaveValues(obj.gameDataUpdates);
    }

};
TGS.ToggleUserLogin = function(){};
TGS.GetDateTime = function(){};
TGS.AddRequiredImagesToAssetList = function(){};
TGS.EnablePartnerUI = function(){};
TGS.Analytics = {};
TGS.Analytics.logCustomEvent = function(){};
TGS.Analytics.logLevelEvent = function(){};
TGS.Analytics.logAchievementEvent = function(){};
TGS.Analytics.logGameEvent = function(){};
TGS.Analytics.logScreen = function(){};
TGS.IsReady = function(){return true};
TGS.IsOn = function(){return true};
TGS.LoggedIn = function(){return true};
TGS.Widget = {};
TGS.Widget.CreateWidget = function(){return {setup:function(){},close:function(callback){if(typeof callback == "function")callback()}}};
TGS.Widget.CreateLoginWidget = function(){ return {setup:function(){},close:function(){}}};
TGS.CreateLoginWidget = function(){ return new TGE.DisplayObjectContainer()};
TGS.Advertisement = {};
TGS.Advertisement.DisplayAd = function(){return {setup:function(){},close:function(callback){if(typeof callback == "function")callback()}}};
TGS.Advertisement._DisplayPreloaderAd =function(){};
TGS.Leaderboard = {};
TGS.Leaderboard.SubmitScore = function(){};
TGS.LeaderboardSupported = function(){return false};
TGS.ChallengesSupported = function(){return false};
TGS.DatastoreSupported = function(){return false};
TGS.Social = {};
TGS.Social.Challenge = function(){};
TGS.DataStore = {};
TGS.DataStore.GameData = {};

TGS.DataStore.ReloadData = function()
{

    // Grab the entire datastore mirror
    var datastoreString = TGS.localStorage.getItem(TGS._sLSKeys["TGS_datastore"]);

    // If there's nothing there this is a new
    if(!datastoreString)
    {
        datastoreString = "{}";
    }

    // Parse the string into the datastore object
    TGS.DataStore.GameData = JSON.parse(datastoreString);
};
TGS.DataStore.ReloadData();
TGS.DataStore.SaveValuesLocally = function(jsonObj)
{
    // Build the values string to submit, and update the local copy too
    for(var key in jsonObj)
    {
        if(jsonObj.hasOwnProperty(key))
        {
            // Save the changes locally
            TGS.DataStore.GameData[key] = jsonObj[key].toString();
        }
    }

    var datastoreString = JSON.stringify(TGS.DataStore.GameData);
    TGS.localStorage.setItem(TGS._sLSKeys["TGS_datastore"],datastoreString);

    // Data has been updated
    TGS.DataStore._DataUpdated();
};

TGS.DataStore._DataUpdated = function()
{
    // If TGE is around, tell it about the datastore update
    if(window.TGE)
    {
        var game = TGE.Game.GetInstance();
        if(game && game._onTGSDatastoreUpdated)
        {
            game._onTGSDatastoreUpdated();
        }
    }

    // This is deprecated
    if(TGS.DataStore.onDataChanged)
    {
        TGS.DataStore.onDataChanged.call(this);
    }
};
TGS.DataStore.FetchStringValue = function(key,defaultValue){
    // Do we have anything for this value?
    if(typeof(TGS.DataStore.GameData[key])==="undefined")
    {
        TGS.Debug.Log(TGS.Debug.LOG_WARNING,"no value stored for '"+key+"', using default");
        return defaultValue;
    }

    return TGS.DataStore.GameData[key];
};
TGS.DataStore.FetchFloatValue = function(key,defaultValue){
    return parseFloat(TGS.DataStore.FetchStringValue(key,defaultValue));
};
TGS.DataStore.FetchIntValue = function(key,defaultValue){
    return parseInt(TGS.DataStore.FetchStringValue(key,defaultValue));
};
TGS.DataStore.SaveValues = function(jsonObj)
{
    // Save the changes locally
    TGS.DataStore.SaveValuesLocally(jsonObj);
};
TGS.DataStore.SaveValue = function(key,value)
{
    var partnerID = "A00xx";

    // Build the values string to submit, and update the local copy too
    var jsonObj = {};
    jsonObj[key] = value;
    var values = '"values":' + JSON.stringify(jsonObj);

    // Update the value locally
    TGS.DataStore.GameData[key] = value.toString();

    // Grab the entire datastore mirror
    var datastoreString = JSON.stringify(TGS.DataStore.GameData);
    TGS.localStorage.setItem(TGS._sLSKeys["TGS_datastore"],datastoreString);

    // Data has been updated
    TGS.DataStore._DataUpdated();
};

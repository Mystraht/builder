(function (console) { "use strict";
var $hxClasses = {},$estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
};
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.foreach = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
};
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
};
Lambda.find = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v = $it0.next();
		if(f(v)) return v;
	}
	return null;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
$hxClasses["_List.ListIterator"] = _$List_ListIterator;
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var _$UInt_UInt_$Impl_$ = {};
$hxClasses["_UInt.UInt_Impl_"] = _$UInt_UInt_$Impl_$;
_$UInt_UInt_$Impl_$.__name__ = ["_UInt","UInt_Impl_"];
_$UInt_UInt_$Impl_$.gt = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) return aNeg; else return a > b;
};
_$UInt_UInt_$Impl_$.gte = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) return aNeg; else return a >= b;
};
_$UInt_UInt_$Impl_$.toFloat = function(this1) {
	var $int = this1;
	if($int < 0) return 4294967296.0 + $int; else return $int + 0.0;
};
var com_isartdigital_builder_Main = function() {
	this.assetsLoaded = false;
	this.userInfoLoaded = false;
	this.increase = true;
	EventEmitter.call(this);
	if(js_Browser.getLocalStorage().getItem("token") == null) window.location.href = "../";
	com_isartdigital_builder_api_Api.getInstance();
	this.loadUserInfos();
	var lOptions = { };
	lOptions.backgroundColor = 10066329;
	com_isartdigital_utils_system_DeviceCapabilities.scaleViewport();
	this.renderer = PIXI.autoDetectRenderer(_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_system_DeviceCapabilities.get_width()),_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_system_DeviceCapabilities.get_height()),lOptions);
	this.renderer.roundPixels = true;
	window.document.body.appendChild(this.renderer.view);
	this.stage = new PIXI.Container();
	com_isartdigital_utils_facebook_Facebook.onLogin = $bind(this,this.onFacebookLogin);
	com_isartdigital_utils_facebook_Facebook.load("750435741727559");
	var lConfig = new PIXI.loaders.Loader();
	lConfig.add("config.json");
	lConfig.once("complete",$bind(this,this.preloadAssets));
	lConfig.load();
};
$hxClasses["com.isartdigital.builder.Main"] = com_isartdigital_builder_Main;
com_isartdigital_builder_Main.__name__ = ["com","isartdigital","builder","Main"];
com_isartdigital_builder_Main.main = function() {
	com_isartdigital_builder_Main.getInstance();
};
com_isartdigital_builder_Main.getInstance = function() {
	if(com_isartdigital_builder_Main.instance == null) com_isartdigital_builder_Main.instance = new com_isartdigital_builder_Main();
	return com_isartdigital_builder_Main.instance;
};
com_isartdigital_builder_Main.importClasses = function() {
	com_isartdigital_builder_ui_items_BuildingInfo;
	com_isartdigital_builder_ui_items_BuildingInShop;
	com_isartdigital_builder_ui_uimodule_ColorButton;
	com_isartdigital_builder_ui_uimodule_CreditButton;
	com_isartdigital_builder_ui_uimodule_DotButton;
	com_isartdigital_builder_ui_uimodule_DeleteButton;
	com_isartdigital_builder_ui_uimodule_DisableButton;
	com_isartdigital_builder_ui_uimodule_GoldButton;
	com_isartdigital_builder_ui_hud_GoldCurrency;
	com_isartdigital_builder_ui_items_ItemBuilding;
	com_isartdigital_builder_ui_uimodule_LeftButton;
	com_isartdigital_builder_ui_hud_LevelCurrency;
	com_isartdigital_builder_ui_uimodule_MoveButton;
	com_isartdigital_builder_ui_uimodule_NotificationButton;
	com_isartdigital_builder_ui_uimodule_OfferingButton;
	com_isartdigital_builder_ui_hud_OfferingsCurrency;
	com_isartdigital_builder_ui_uimodule_ParadeButton;
	com_isartdigital_builder_ui_items_RewardBuilding;
	com_isartdigital_builder_ui_uimodule_RewardButton;
	com_isartdigital_builder_ui_uimodule_RightButton;
	com_isartdigital_builder_ui_uimodule_SFXButton;
	com_isartdigital_builder_ui_items_ShopBuilding;
	com_isartdigital_builder_ui_uimodule_ShopBuildingButton;
	com_isartdigital_builder_ui_uimodule_ShopButton;
	com_isartdigital_builder_ui_uimodule_ShopBuyHardButton;
	com_isartdigital_builder_ui_uimodule_ShopBuySoftButton;
	com_isartdigital_builder_ui_uimodule_ShopCloseButton;
	com_isartdigital_builder_ui_uimodule_ShopRessourceButton;
	com_isartdigital_builder_ui_uimodule_SoundButton;
	com_isartdigital_builder_ui_uimodule_SpiceButton;
	com_isartdigital_builder_ui_hud_SpiceCurrency;
	com_isartdigital_builder_ui_uimodule_UpgradeButton;
	com_isartdigital_builder_ui_items_UpgradeComfirm;
	com_isartdigital_builder_ui_uimodule_UpgradeDisableButton;
	com_isartdigital_builder_ui_uimodule_UpgradeValideButton;
	com_isartdigital_builder_ui_uimodule_ValideButton;
};
com_isartdigital_builder_Main.__super__ = EventEmitter;
com_isartdigital_builder_Main.prototype = $extend(EventEmitter.prototype,{
	preloadAssets: function(pLoader) {
		com_isartdigital_utils_Config.init(Reflect.field(pLoader.resources,"config.json").data);
		if(com_isartdigital_utils_Config.get_debug()) com_isartdigital_utils_Debug.getInstance().init();
		if(com_isartdigital_utils_Config.get_debug() && com_isartdigital_utils_Config.get_data().boxAlpha != null) com_isartdigital_utils_game_StateGraphic.boxAlpha = com_isartdigital_utils_Config.get_data().boxAlpha;
		if(com_isartdigital_utils_Config.get_debug() && com_isartdigital_utils_Config.get_data().animAlpha != null) com_isartdigital_utils_game_StateGraphic.animAlpha = com_isartdigital_utils_Config.get_data().animAlpha;
		if(com_isartdigital_utils_system_DeviceCapabilities.get_system() == "Desktop") {
			com_isartdigital_utils_game_GameStage.getInstance().set_scaleMode(com_isartdigital_utils_game_GameStageScale.NO_SCALE);
			com_isartdigital_utils_system_DeviceCapabilities.textureRatio = 0.5;
			com_isartdigital_utils_system_DeviceCapabilities.textureType = "md";
		} else {
			com_isartdigital_utils_game_GameStage.getInstance().set_scaleMode(com_isartdigital_utils_game_GameStageScale.SHOW_ALL);
			com_isartdigital_utils_system_DeviceCapabilities.init();
		}
		com_isartdigital_utils_game_GameStage.getInstance().init($bind(this,this.render),2048,1366,true);
		com_isartdigital_utils_system_DeviceCapabilities.displayFullScreenButton();
		this.stage.addChild(com_isartdigital_utils_game_GameStage.getInstance());
		window.addEventListener("resize",$bind(this,this.resize));
		this.resize();
		var lLoader = new com_isartdigital_utils_loader_GameLoader();
		lLoader.addAssetFile("preload.png");
		lLoader.addAssetFile("preload_bg.png");
		lLoader.once("complete",$bind(this,this.loadAssets));
		lLoader.load();
	}
	,loadAssets: function(pLoader) {
		var lLoader = new com_isartdigital_utils_loader_GameLoader();
		lLoader.addTxtFile("ui.json");
		lLoader.addSoundFile("sounds.json");
		lLoader.addTxtFile("json/basemap.json");
		lLoader.addTxtFile("json/building.json");
		lLoader.addTxtFile("json/lanternsPlacement.json");
		lLoader.addTxtFile("json/buildingsSettings.json");
		lLoader.addTxtFile("json/paradeSettings.json");
		lLoader.addTxtFile("json/ShopSheet.json");
		lLoader.addTxtFile("json/en.json");
		lLoader.addTxtFile("json/fr.json");
		lLoader.addTxtFile("json/XP.json");
		lLoader.addAssetFile("graphics.json");
		lLoader.addAssetFile("background.json");
		lLoader.addTxtFile("hd/ui/textsUI.json");
		lLoader.addAssetFile("Citizen.png");
		lLoader.addAssetFile(com_isartdigital_utils_system_DeviceCapabilities.textureType + "/ingame/library.json");
		lLoader.addAssetFile(com_isartdigital_utils_system_DeviceCapabilities.textureType + "/ui/library.json");
		lLoader.addFontFile("fonts.css");
		lLoader.on("progress",$bind(this,this.onLoadProgress));
		lLoader.once("complete",$bind(this,this.onLoadComplete));
		com_isartdigital_builder_ui_UIManager.getInstance().openScreen(com_isartdigital_builder_ui_GraphicLoader.getInstance());
		window.requestAnimationFrame($bind(this,this.gameLoop));
		lLoader.load();
	}
	,loadUserInfos: function() {
		com_isartdigital_builder_api_Api.user.getUserInfo($bind(this,this.cbOnUserInfosReceipt));
	}
	,cbOnUserInfosReceipt: function(pData) {
		var lData = JSON.parse(pData);
		var userInfos;
		if(lData.error) {
			com_isartdigital_builder_api_Utils.errorHandler(lData.errorCode,lData.errorMessage);
			return;
		}
		com_isartdigital_services_Users.setInfos(lData.data);
		this.userInfoLoaded = true;
		this.tryToStartGame();
	}
	,onLoadProgress: function(pLoader) {
		com_isartdigital_builder_ui_GraphicLoader.getInstance().update(pLoader.progress / 100);
	}
	,onLoadComplete: function(pLoader) {
		pLoader.off("progress",$bind(this,this.onLoadProgress));
		com_isartdigital_utils_game_factory_MovieClipAnimFactory.addTextures(com_isartdigital_utils_loader_GameLoader.getContent("graphics.json"));
		com_isartdigital_utils_game_factory_MovieClipAnimFactory.addTextures(com_isartdigital_utils_loader_GameLoader.getContent("assets.json"));
		com_isartdigital_utils_game_factory_MovieClipAnimFactory.addTextures(com_isartdigital_utils_loader_GameLoader.getContent("bakckground.json"));
		com_isartdigital_utils_game_StateGraphic.addBoxes(com_isartdigital_utils_loader_GameLoader.getContent(""));
		com_isartdigital_utils_ui_UIBuilder.init("ui.json","com.isartdigital.builder.ui.uimodule","com.isartdigital.builder.ui.hud","com.isartdigital.builder.ui.items");
		com_isartdigital_utils_ui_UIBuilder.addTextStyle(Reflect.field(pLoader.resources,"assets/hd/ui/textsUI.json").data);
		com_isartdigital_utils_Localization.getInstance().setDataLocalization(Reflect.field(pLoader.resources,"assets/json/" + com_isartdigital_utils_Config.get_language() + ".json").data);
		com_isartdigital_builder_game_manager_ExperienceManager.getInstance().setDataXP(Reflect.field(pLoader.resources,"assets/json/XP.json").data);
		com_isartdigital_builder_game_manager_ExperienceManager.getInstance().setDataXP(Reflect.field(pLoader.resources,"assets/json/XP.json").data);
		this.assetsLoaded = true;
		this.tryToStartGame();
	}
	,tryToStartGame: function() {
		if(this.assetsLoaded && this.userInfoLoaded) this.startGame();
	}
	,startGame: function() {
		com_isartdigital_builder_ui_UIManager.getInstance().startGame();
		com_isartdigital_builder_game_GameManager.getInstance().start();
		com_isartdigital_services_Ads.getImage($bind(this,this.cbAds));
	}
	,gameLoop: function() {
		window.requestAnimationFrame($bind(this,this.gameLoop));
		this.render();
		this.emit("gameLoop");
	}
	,resize: function(pEvent) {
		this.renderer.resize(_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_system_DeviceCapabilities.get_width()),_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_system_DeviceCapabilities.get_height()));
		com_isartdigital_utils_game_GameStage.getInstance().resize();
	}
	,render: function() {
		this.renderer.render(this.stage);
	}
	,destroy: function() {
		window.removeEventListener("resize",$bind(this,this.resize));
		com_isartdigital_builder_Main.instance = null;
	}
	,onFacebookLogin: function() {
		com_isartdigital_utils_facebook_Facebook.api(com_isartdigital_utils_facebook_Facebook.uid,{ fields : "first_name,last_name,bio,email,picture"},$bind(this,this.callBackApi));
	}
	,callBackApi: function(pData) {
		if(pData == null) console.log("Erreur facebook API"); else if(pData.error != null) console.log(pData.error); else com_isartdigital_services_FacebookPicture.load(pData.picture.data.url);
	}
	,cbAds: function(pData) {
		if(pData == null) console.log("Erreur Ads API"); else if(pData.error != null) console.log(pData.error); else console.log(pData);
	}
	,callBackUI: function(pData) {
		if(pData == null) console.log("Erreur facebook API"); else if(pData.error_message != null) console.log(pData.error_message); else console.log(pData);
	}
	,__class__: com_isartdigital_builder_Main
});
var com_isartdigital_builder_api_Api = function() {
	com_isartdigital_builder_api_Api.instance = this;
	com_isartdigital_builder_api_Api.domain = com_isartdigital_builder_api_Api.domainProd;
	com_isartdigital_builder_api_Api.token = js_Browser.getLocalStorage().getItem("token");
	com_isartdigital_builder_api_Api.user = com_isartdigital_builder_api_User.getInstance();
	com_isartdigital_builder_api_Api.resources = com_isartdigital_builder_api_Resources.getInstance();
	com_isartdigital_builder_api_Api.buildings = com_isartdigital_builder_api_Buildings.getInstance();
	com_isartdigital_builder_api_Api.lanterns = com_isartdigital_builder_api_Lanterns.getInstance();
	com_isartdigital_builder_api_Api.gifts = com_isartdigital_builder_api_Gifts.getInstance();
};
$hxClasses["com.isartdigital.builder.api.Api"] = com_isartdigital_builder_api_Api;
com_isartdigital_builder_api_Api.__name__ = ["com","isartdigital","builder","api","Api"];
com_isartdigital_builder_api_Api.getInstance = function() {
	if(com_isartdigital_builder_api_Api.instance == null) com_isartdigital_builder_api_Api.instance = new com_isartdigital_builder_api_Api();
	return com_isartdigital_builder_api_Api.instance;
};
com_isartdigital_builder_api_Api.prototype = {
	__class__: com_isartdigital_builder_api_Api
};
var com_isartdigital_builder_api_Buildings = function() {
	this.destroyPath = "/destroy";
	this.changeColorPath = "/changeColor";
	this.hardBuildPath = "/hardBuild";
	this.movePath = "/move";
	this.collectPath = "/collect";
	this.upgradePath = "/upgrade";
	this.createPath = "/create";
	this.buildingsPath = "buildings";
};
$hxClasses["com.isartdigital.builder.api.Buildings"] = com_isartdigital_builder_api_Buildings;
com_isartdigital_builder_api_Buildings.__name__ = ["com","isartdigital","builder","api","Buildings"];
com_isartdigital_builder_api_Buildings.getInstance = function() {
	if(com_isartdigital_builder_api_Buildings.instance == null) com_isartdigital_builder_api_Buildings.instance = new com_isartdigital_builder_api_Buildings();
	return com_isartdigital_builder_api_Buildings.instance;
};
com_isartdigital_builder_api_Buildings.prototype = {
	getAllBuildings: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,create: function(pBuilding,pX,pY,hardBought,pCallBack) {
		var hardBoughtToString;
		if(hardBought) hardBoughtToString = "true"; else hardBoughtToString = "false";
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + "/" + pBuilding + this.createPath,{ token : com_isartdigital_builder_api_Api.token, x : pX, y : pY, hard : hardBoughtToString}));
		request.onData = pCallBack;
		request.request(true);
	}
	,upgrade: function(pX,pY,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + this.upgradePath,{ token : com_isartdigital_builder_api_Api.token, x : pX, y : pY}));
		request.onData = pCallBack;
		request.request(true);
	}
	,collect: function(pX,pY,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + this.collectPath,{ token : com_isartdigital_builder_api_Api.token, x : pX, y : pY}));
		request.onData = pCallBack;
		request.request(true);
	}
	,move: function(pX_start,pY_start,pX_end,pY_end,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + this.movePath,{ token : com_isartdigital_builder_api_Api.token, x_start : pX_start, y_start : pY_start, x_end : pX_end, y_end : pY_end}));
		request.onData = pCallBack;
		request.request(true);
	}
	,hardBuild: function(pX,pY,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + this.hardBuildPath,{ token : com_isartdigital_builder_api_Api.token, x : pX, y : pY}));
		request.onData = pCallBack;
		request.request(true);
	}
	,changeColor: function(pColor,pX,pY,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + this.changeColorPath,{ token : com_isartdigital_builder_api_Api.token, color : pColor, x : pX, y : pY}));
		request.onData = pCallBack;
		request.request(true);
	}
	,destroy: function(pX,pY,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + this.destroyPath,{ token : com_isartdigital_builder_api_Api.token, x : pX, y : pY}));
		request.onData = pCallBack;
		request.request(true);
	}
	,__class__: com_isartdigital_builder_api_Buildings
};
var com_isartdigital_builder_api_Gifts = function() {
	this.collectPath = "/collect";
	this.createPath = "/create";
	this.giftsPath = "gifts";
};
$hxClasses["com.isartdigital.builder.api.Gifts"] = com_isartdigital_builder_api_Gifts;
com_isartdigital_builder_api_Gifts.__name__ = ["com","isartdigital","builder","api","Gifts"];
com_isartdigital_builder_api_Gifts.getInstance = function() {
	if(com_isartdigital_builder_api_Gifts.instance == null) com_isartdigital_builder_api_Gifts.instance = new com_isartdigital_builder_api_Gifts();
	return com_isartdigital_builder_api_Gifts.instance;
};
com_isartdigital_builder_api_Gifts.prototype = {
	getGifts: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.giftsPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,create: function(friendUserId,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.giftsPath + this.createPath,{ token : com_isartdigital_builder_api_Api.token, friend_user_id : friendUserId}));
		request.onData = pCallBack;
		request.request(true);
	}
	,collect: function(name,authorName,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.giftsPath + this.collectPath,{ token : com_isartdigital_builder_api_Api.token, name : name, author_name : authorName}));
		request.onData = pCallBack;
		request.request(true);
	}
	,__class__: com_isartdigital_builder_api_Gifts
};
var com_isartdigital_builder_api_Lanterns = function() {
	this.createPath = "/create";
	this.lanternsPath = "lanterns";
};
$hxClasses["com.isartdigital.builder.api.Lanterns"] = com_isartdigital_builder_api_Lanterns;
com_isartdigital_builder_api_Lanterns.__name__ = ["com","isartdigital","builder","api","Lanterns"];
com_isartdigital_builder_api_Lanterns.getInstance = function() {
	if(com_isartdigital_builder_api_Lanterns.instance == null) com_isartdigital_builder_api_Lanterns.instance = new com_isartdigital_builder_api_Lanterns();
	return com_isartdigital_builder_api_Lanterns.instance;
};
com_isartdigital_builder_api_Lanterns.prototype = {
	getLanterns: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.lanternsPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,create: function(pX,pY,pHardPurchase,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.lanternsPath + this.createPath,{ token : com_isartdigital_builder_api_Api.token, x : pX, y : pY, hard : pHardPurchase}));
		request.onData = pCallBack;
		request.request(true);
	}
	,__class__: com_isartdigital_builder_api_Lanterns
};
var com_isartdigital_builder_api_Resources = function() {
	this.offeringPath = "/offering";
	this.spicePath = "/spice";
	this.goldPath = "/gold";
	this.resourcesPath = "resources";
};
$hxClasses["com.isartdigital.builder.api.Resources"] = com_isartdigital_builder_api_Resources;
com_isartdigital_builder_api_Resources.__name__ = ["com","isartdigital","builder","api","Resources"];
com_isartdigital_builder_api_Resources.getInstance = function() {
	if(com_isartdigital_builder_api_Resources.instance == null) com_isartdigital_builder_api_Resources.instance = new com_isartdigital_builder_api_Resources();
	return com_isartdigital_builder_api_Resources.instance;
};
com_isartdigital_builder_api_Resources.prototype = {
	get: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.resourcesPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,gold: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.resourcesPath + this.goldPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,spice: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.resourcesPath + this.spicePath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,offering: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.resourcesPath + this.offeringPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,__class__: com_isartdigital_builder_api_Resources
};
var com_isartdigital_builder_api_User = function() {
	this.destroyPath = "/destroy";
	this.experiencePath = "/experience";
	this.ftuePath = "/ftue";
	this.completePath = "/complet";
	this.buyPath = "/buy";
	this.paradePath = "/parade";
	this.updatePath = "/update";
	this.dailyRewardPath = "/dailyreward";
	this.loginPath = "/login";
	this.userInfoPath = "userInfos";
	this.createFBPath = "/createFB";
	this.createPath = "/create";
	this.userPath = "users";
};
$hxClasses["com.isartdigital.builder.api.User"] = com_isartdigital_builder_api_User;
com_isartdigital_builder_api_User.__name__ = ["com","isartdigital","builder","api","User"];
com_isartdigital_builder_api_User.getInstance = function() {
	if(com_isartdigital_builder_api_User.instance == null) com_isartdigital_builder_api_User.instance = new com_isartdigital_builder_api_User();
	return com_isartdigital_builder_api_User.instance;
};
com_isartdigital_builder_api_User.prototype = {
	getUserInfo: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userInfoPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,getDailyreward: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.dailyRewardPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,dailyrewardUpdate: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.dailyRewardPath + this.updatePath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(true);
	}
	,getParade: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.paradePath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,paradeUpdate: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.paradePath + this.updatePath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(true);
	}
	,getFtue: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.ftuePath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,getExperience: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.experiencePath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,buy: function(pName,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.experiencePath,{ token : com_isartdigital_builder_api_Api.token, name : pName}));
		request.onData = pCallBack;
		request.request(false);
	}
	,ftueComplet: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.ftuePath + this.completePath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(true);
	}
	,destroy: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_Utils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.destroyPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(true);
	}
	,__class__: com_isartdigital_builder_api_User
};
var com_isartdigital_builder_api_Utils = function() {
};
$hxClasses["com.isartdigital.builder.api.Utils"] = com_isartdigital_builder_api_Utils;
com_isartdigital_builder_api_Utils.__name__ = ["com","isartdigital","builder","api","Utils"];
com_isartdigital_builder_api_Utils.getInstance = function() {
	if(com_isartdigital_builder_api_Utils.instance == null) com_isartdigital_builder_api_Utils.instance = new com_isartdigital_builder_api_Utils();
	return com_isartdigital_builder_api_Utils.instance;
};
com_isartdigital_builder_api_Utils.errorHandler = function(errorCode,errorMessage) {
	if(errorCode == 1) {
		js_Browser.getLocalStorage().setItem("token","");
		window.location.href = "../";
	}
	com_isartdigital_utils_Debug.error(errorMessage);
};
com_isartdigital_builder_api_Utils.formatPath = function(path,params) {
	var paramsStringFormatted = path + "?";
	var paramKeys = Reflect.fields(params);
	var _g1 = 0;
	var _g = paramKeys.length;
	while(_g1 < _g) {
		var i = _g1++;
		paramsStringFormatted += paramKeys[i] + "=" + (Std.string(Reflect.field(params,paramKeys[i])) + "&");
	}
	paramsStringFormatted = paramsStringFormatted.substring(0,paramsStringFormatted.length - 1);
	return paramsStringFormatted;
};
com_isartdigital_builder_api_Utils.prototype = {
	destroy: function() {
		com_isartdigital_builder_api_Utils.instance = null;
	}
	,__class__: com_isartdigital_builder_api_Utils
};
var com_isartdigital_builder_game_GameManager = function() {
	this.mousePosition = new PIXI.Point(-1,-1);
};
$hxClasses["com.isartdigital.builder.game.GameManager"] = com_isartdigital_builder_game_GameManager;
com_isartdigital_builder_game_GameManager.__name__ = ["com","isartdigital","builder","game","GameManager"];
com_isartdigital_builder_game_GameManager.getInstance = function() {
	if(com_isartdigital_builder_game_GameManager.instance == null) com_isartdigital_builder_game_GameManager.instance = new com_isartdigital_builder_game_GameManager();
	return com_isartdigital_builder_game_GameManager.instance;
};
com_isartdigital_builder_game_GameManager.prototype = {
	get_ScreenRect: function() {
		return this.screenRect;
	}
	,refreshMouseCoordinates: function(pEvent) {
		var position = com_isartdigital_utils_game_GameStage.getInstance().getGameContainer().toLocal(new PIXI.Point(pEvent.layerX,pEvent.layerY));
		this.mousePosition.set(position.x,position.y);
	}
	,emitMouseUp: function(event) {
		var position = com_isartdigital_utils_game_GameStage.getInstance().getGameContainer().toLocal(new PIXI.Point(event.layerX,event.layerY));
		com_isartdigital_builder_Main.getInstance().emit("EVENT_MOUSE_UP",position);
	}
	,cb_createUser: function(pData) {
		var lData = JSON.parse(pData);
		if(lData.error) {
			console.log(lData.errorMessage);
			return;
		}
	}
	,cb_resourceAll: function(pData) {
		var lData = JSON.parse(pData);
		if(lData.error) {
			com_isartdigital_utils_Debug.error(lData.errorMessage);
			return;
		}
		console.log(lData.data);
	}
	,start: function() {
		com_isartdigital_utils_game_Camera.getInstance().init();
		window.addEventListener("mousemove",$bind(this,this.refreshMouseCoordinates));
		window.addEventListener("mouseup",$bind(this,this.emitMouseUp));
		com_isartdigital_utils_game_iso_IsoManager.init(com_isartdigital_utils_Config.tileWidth,com_isartdigital_utils_Config.tileHeight);
		com_isartdigital_builder_ui_UIManager.getInstance().startGame();
		com_isartdigital_builder_Main.getInstance().on("gameLoop",$bind(this,this.gameLoop));
		com_isartdigital_builder_ui_CheatPanel.getInstance().ingame();
		com_isartdigital_builder_game_map_GMapCreator.create();
		this.screenRect = com_isartdigital_utils_system_DeviceCapabilities.getScreenRect(com_isartdigital_utils_game_GameStage.getInstance().getGameContainer());
		var lTypeDefArray = [];
		var ltd = com_isartdigital_builder_game_utils_TypeDefUtils.tileModelDef;
		var lbd = com_isartdigital_builder_game_utils_TypeDefUtils.buildingModelDef;
		lTypeDefArray.push(ltd);
		lTypeDefArray.push(lbd);
		com_isartdigital_builder_game_manager_ClippingManager.getInstance().setOn(com_isartdigital_builder_game_map_GMap.globalMap,[com_isartdigital_builder_game_sprites_Tile.list,com_isartdigital_builder_game_sprites_buildings_Building.list],new PIXI.Point(_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileWidth) / _$UInt_UInt_$Impl_$.toFloat(2),_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight) / _$UInt_UInt_$Impl_$.toFloat(2)),lTypeDefArray,[com_isartdigital_builder_game_sprites_Tile,com_isartdigital_builder_game_sprites_buildings_Building],$bind(this,this.get_ScreenRect));
		com_isartdigital_builder_game_manager_ClippingManager.getInstance().addAllObjetInView();
		com_isartdigital_builder_game_manager_RessourceManager.getInstance().start();
		com_isartdigital_builder_game_manager_ExperienceManager.getInstance().getLvl(com_isartdigital_services_Users.infos.experience);
		this.buildingCreator = new com_isartdigital_builder_game_sprites_buildings_BuildingCreator();
		this.buildingCreator.listenShopBuyEvents();
	}
	,gameLoop: function(pEvent) {
		com_isartdigital_builder_game_manager_BackgroundManager.getInstance().manage();
		this.screenRect = com_isartdigital_utils_system_DeviceCapabilities.getScreenRect(com_isartdigital_utils_game_GameStage.getInstance().getGameContainer());
		this.screenRect.x = Math.round(this.screenRect.x);
		this.screenRect.y = Math.round(this.screenRect.y);
		com_isartdigital_builder_game_manager_ClippingManager.getInstance().manage();
		com_isartdigital_utils_game_Camera.getInstance().update();
		this.doActions(com_isartdigital_builder_game_sprites_buildings_Building.list);
		this.moveCitizen();
		this.moveParade();
	}
	,doActions: function(list) {
		var _g1 = 0;
		var _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			list[i].doAction();
		}
	}
	,moveCitizen: function() {
		var _g = 0;
		var _g1 = com_isartdigital_builder_game_sprites_Citizen.list;
		while(_g < _g1.length) {
			var lCitizen = _g1[_g];
			++_g;
			lCitizen.doAction();
		}
	}
	,moveParade: function() {
		com_isartdigital_builder_game_manager_ParadeManager.getInstance().doActionNormal();
	}
	,destroy: function() {
		com_isartdigital_builder_Main.getInstance().off("gameLoop",$bind(this,this.gameLoop));
		com_isartdigital_builder_game_GameManager.instance = null;
	}
	,__class__: com_isartdigital_builder_game_GameManager
};
var com_isartdigital_builder_game_manager_BackgroundManager = function() {
	this.list = [];
	this.fillList();
};
$hxClasses["com.isartdigital.builder.game.manager.BackgroundManager"] = com_isartdigital_builder_game_manager_BackgroundManager;
com_isartdigital_builder_game_manager_BackgroundManager.__name__ = ["com","isartdigital","builder","game","manager","BackgroundManager"];
com_isartdigital_builder_game_manager_BackgroundManager.getInstance = function() {
	if(com_isartdigital_builder_game_manager_BackgroundManager.instance == null) com_isartdigital_builder_game_manager_BackgroundManager.instance = new com_isartdigital_builder_game_manager_BackgroundManager();
	return com_isartdigital_builder_game_manager_BackgroundManager.instance;
};
com_isartdigital_builder_game_manager_BackgroundManager.prototype = {
	fillList: function() {
		var _g = 0;
		while(_g < 15) {
			var i = _g++;
			var _g1 = 0;
			while(_g1 < 15) {
				var j = _g1++;
				var lBackground = new com_isartdigital_builder_game_sprites_Background();
				lBackground.start();
				com_isartdigital_utils_game_GameStage.getInstance().getBackgroundContainer().addChild(lBackground);
				lBackground.x = -7600 + j * 1024;
				lBackground.y = i * 683;
				this.list.push(lBackground);
			}
		}
	}
	,manage: function() {
	}
	,getBackgroundOutOfScreen: function() {
		var lArray = [];
		var _g = 0;
		var _g1 = this.list;
		while(_g < _g1.length) {
			var lBackground = _g1[_g];
			++_g;
			if(lBackground.x > com_isartdigital_builder_game_utils_CameraUtils.ScreenRight()) lArray.push(lBackground); else if(lBackground.y > com_isartdigital_builder_game_utils_CameraUtils.ScreenBottom()) lArray.push(lBackground); else if(lBackground.y + 683 < com_isartdigital_builder_game_utils_CameraUtils.ScreenTop()) lArray.push(lBackground); else if(lBackground.x + 1024 < com_isartdigital_builder_game_utils_CameraUtils.ScreenLeft()) lArray.push(lBackground);
		}
		return lArray;
	}
	,scrollBackground: function() {
		var _g = 0;
		var _g1 = this.getBackgroundOutOfScreen();
		while(_g < _g1.length) {
			var lBackground = _g1[_g];
			++_g;
			this.list[HxOverrides.indexOf(this.list,lBackground,0)].destroy();
			this.list.splice(HxOverrides.indexOf(this.list,lBackground,0),1);
		}
	}
	,destroy: function() {
		com_isartdigital_builder_game_manager_BackgroundManager.instance = null;
	}
	,__class__: com_isartdigital_builder_game_manager_BackgroundManager
};
var com_isartdigital_builder_game_manager_ClippingManager = function() {
	this.BOTTOM_RIGHT_RIGHT = new PIXI.Point();
	this.BOTTOM_RIGHT = new PIXI.Point();
	this.BOTTOM_LEFT = new PIXI.Point();
	this.TOP_RIGHT = new PIXI.Point();
	this.screenPosition = new PIXI.Point();
	this.currentScreenPosition = new PIXI.Point();
	this.clippingNeed = new PIXI.Point();
	this.direction = "UP";
	this.objectListView = [];
	this.classView = [];
	this.typeDefModels = [];
	this.delta = new PIXI.Point();
};
$hxClasses["com.isartdigital.builder.game.manager.ClippingManager"] = com_isartdigital_builder_game_manager_ClippingManager;
com_isartdigital_builder_game_manager_ClippingManager.__name__ = ["com","isartdigital","builder","game","manager","ClippingManager"];
com_isartdigital_builder_game_manager_ClippingManager.getInstance = function() {
	if(com_isartdigital_builder_game_manager_ClippingManager.Instance == null) com_isartdigital_builder_game_manager_ClippingManager.Instance = new com_isartdigital_builder_game_manager_ClippingManager();
	return com_isartdigital_builder_game_manager_ClippingManager.Instance;
};
com_isartdigital_builder_game_manager_ClippingManager.prototype = {
	setOn: function(pMapModel,pListView,pDelta,pDef,pBuilding,pScreeRectRef) {
		if(this.typeDefModels.length != pBuilding.length && pBuilding.length != pListView.length) {
			com_isartdigital_utils_Debug.error("SetOn Clipping -> pBuilding & pDef doesn't have the same length");
			return;
		}
		this.map = pMapModel;
		this.objectListView = pListView;
		this.delta = pDelta;
		this.typeDefModels = pDef.slice();
		this.classView = pBuilding.slice();
		this.screenRectView = pScreeRectRef;
		this.screenPosition.set(this.screenRectView().x,this.screenRectView().y);
		com_isartdigital_builder_game_manager_ClippingManager.SAFE_MARGE_MODEL = Math.round(_$UInt_UInt_$Impl_$.toFloat(100) / _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight));
		com_isartdigital_builder_game_manager_ClippingManager.SAFE_MARGE_MODEL = Math.round(_$UInt_UInt_$Impl_$.toFloat(100) / _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight));
	}
	,manage: function() {
		if(!this.hadToManage()) return;
		this.removeObject();
		if(this.clippingNeed.x > 10 || this.clippingNeed.y > 10) this.addAllObjetInView(); else this.addObject();
		com_isartdigital_utils_game_iso_IsoManager.sortAll();
	}
	,addAllObjetInView: function() {
		this.setScreenRectModel();
		this.createObjFromModel(this.getAllRow());
	}
	,addObject: function() {
		this.setScreenRectModel();
		var lArray = [];
		if(this.direction == com_isartdigital_builder_game_manager_ClippingManager.UP_DIRECTION) lArray = this.getRow(this.TOP_RIGHT,this.direction); else if(this.direction == com_isartdigital_builder_game_manager_ClippingManager.DOWN_DIRECTION) lArray = this.getRow(this.BOTTOM_RIGHT,this.direction); else if(this.direction == com_isartdigital_builder_game_manager_ClippingManager.LEFT_DIRECTION) lArray = this.getCol(this.BOTTOM_LEFT,this.direction); else if(this.direction == com_isartdigital_builder_game_manager_ClippingManager.RIGHT_DIRECTION) lArray = this.getCol(this.BOTTOM_RIGHT_RIGHT,this.direction);
		this.createObjFromModel(lArray);
	}
	,createObjFromModel: function(pArray) {
		var _g = 0;
		while(_g < pArray.length) {
			var lModel = pArray[_g];
			++_g;
			var i = this.typeDefModels.length;
			while(--i >= 0) if(Reflect.field(lModel,"type") == "building") {
				if(!com_isartdigital_builder_game_sprites_buildings_BuildingUtils.isBuildingOriginInGlobalMapAt(new PIXI.Point(lModel.x,lModel.y))) continue;
				if(lModel.name == null) throw new js__$Boot_HaxeError("ClippingManager :: Building name is null");
				if(this.modelExist(com_isartdigital_builder_game_sprites_buildings_Building.list,lModel)) continue;
				var buildingDef = com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getByName(lModel.name);
				var building = com_isartdigital_builder_game_pooling_PoolObject.create(Type.resolveClass("com.isartdigital.builder.game.sprites.buildings.Building"));
				building.init(lModel);
			} else if(Reflect.field(lModel,"type") == "tile") {
				if(this.modelExist(com_isartdigital_builder_game_sprites_Tile.list,lModel)) continue;
				var tile = com_isartdigital_builder_game_pooling_PoolObject.create(com_isartdigital_builder_game_sprites_Tile);
				tile.init(lModel);
			}
		}
	}
	,modelExist: function(pList,pModel) {
		var _g = 0;
		while(_g < pList.length) {
			var lObj = pList[_g];
			++_g;
			if(com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(lObj.position).x != Reflect.getProperty(pModel,"x")) continue;
			if(com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(lObj.position).y != Reflect.getProperty(pModel,"y")) continue;
			return true;
		}
		return false;
	}
	,getAllRow: function() {
		var lArray = [];
		var lPosition = new PIXI.Point();
		var it = this.screenRectModel.height * 2 + 10;
		while(it-- >= 0) {
			lPosition.set(this.BOTTOM_RIGHT.x + 2 - Math.ceil(it / 2) + it % 2,this.BOTTOM_RIGHT.y + 2 - Math.ceil(it / 2));
			var _g1 = 0;
			var _g = this.screenRectModel.width + 5;
			while(_g1 < _g) {
				var i = _g1++;
				lArray = lArray.concat(this.getObjInPosition(this.map,lPosition));
				this.shiftPosition(lPosition,false);
			}
		}
		return lArray;
	}
	,getObjInPosition: function(pMap,pPosition) {
		var lArray = [];
		if(com_isartdigital_builder_game_map_GMap.isPositionExistAt(pPosition,pMap)) {
			var _g = 0;
			var _g1;
			var this1 = pMap.h[pPosition.x | 0];
			_g1 = this1.get(pPosition.y | 0);
			while(_g < _g1.length) {
				var lObj = _g1[_g];
				++_g;
				lArray.push(lObj);
			}
		}
		return lArray;
	}
	,getCol: function(pStartPosition,pDirection) {
		var lArray = [];
		var lPosition = new PIXI.Point(pStartPosition.x,pStartPosition.y);
		while(this.clippingNeed.x-- >= 0) {
			var _g1 = 0;
			var _g = this.screenRectModel.height + 5;
			while(_g1 < _g) {
				var i = _g1++;
				lArray = lArray.concat(this.getObjInPosition(this.map,lPosition));
				this.shiftPosition(lPosition,true);
			}
			if(pDirection == com_isartdigital_builder_game_manager_ClippingManager.RIGHT_DIRECTION) pStartPosition.x--; else pStartPosition.x++;
			lPosition.set(pStartPosition.x,pStartPosition.y);
		}
		return lArray;
	}
	,getRow: function(pStartPosition,pDirection) {
		var lArray = [];
		var lPosition = new PIXI.Point(pStartPosition.x,pStartPosition.y);
		while(this.clippingNeed.y-- >= 0) {
			var _g1 = 0;
			var _g = this.screenRectModel.width + 5;
			while(_g1 < _g) {
				var i = _g1++;
				lArray = lArray.concat(this.getObjInPosition(this.map,lPosition));
				this.shiftPosition(lPosition,false);
			}
			if(pDirection == com_isartdigital_builder_game_manager_ClippingManager.DOWN_DIRECTION) pStartPosition.y++; else pStartPosition.y--;
			lPosition.set(pStartPosition.x,pStartPosition.y);
		}
		return lArray;
	}
	,shiftPosition: function(pPoint,pVertical) {
		pPoint.x--;
		if(pVertical) pPoint.y--; else pPoint.y++;
	}
	,setScreenRectModel: function() {
		var lPosition = com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(new PIXI.Point(this.screenRectView().x,this.screenRectView().y));
		var lSize = new PIXI.Point(Math.round((function($this) {
			var $r;
			var a = $this.screenRectView().width;
			$r = a / _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileWidth);
			return $r;
		}(this))),Math.round((function($this) {
			var $r;
			var a1 = $this.screenRectView().height;
			$r = a1 / _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight);
			return $r;
		}(this))));
		this.screenRectModel = new PIXI.Rectangle(lPosition.x,lPosition.y,lSize.x,lSize.y);
		this.TOP_RIGHT.set(Math.round(this.screenRectView().x + this.screenRectView().width),Math.round(this.screenRectView().y));
		this.TOP_RIGHT = com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(this.TOP_RIGHT);
		this.BOTTOM_LEFT.set(Math.round(this.screenRectView().x - 150.),Math.round(this.screenRectView().y + this.screenRectView().height + 100));
		this.BOTTOM_LEFT = com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(this.BOTTOM_LEFT);
		this.BOTTOM_RIGHT.set(Math.round(this.screenRectView().x + this.screenRectView().width),Math.round(this.screenRectView().y + this.screenRectView().height) + 50.);
		this.BOTTOM_RIGHT = com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(this.BOTTOM_RIGHT);
		this.BOTTOM_RIGHT_RIGHT.set(Math.round(this.screenRectView().x + this.screenRectView().width + 150.),Math.round(this.screenRectView().y + this.screenRectView().height + 100));
		this.BOTTOM_RIGHT_RIGHT = com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(this.BOTTOM_RIGHT_RIGHT);
	}
	,removeObject: function() {
		var _g = 0;
		var _g1 = this.objectListView;
		while(_g < _g1.length) {
			var lArray = _g1[_g];
			++_g;
			this.removeInList(lArray);
		}
	}
	,removeInList: function(pList) {
		var i = pList.length;
		while(i-- > 0) {
			var lRect = new PIXI.Rectangle(pList[i].x,pList[i].y,pList[i].width,pList[i].height);
			if(!this.rectIsInRect(this.screenRectView(),lRect)) pList[i].remove();
		}
	}
	,rectIsInRect: function(pBase,pRect) {
		if(pBase.contains(pRect.x,pRect.y)) return true;
		if(pBase.contains(pRect.x,pRect.y + pRect.height)) return true;
		if(pBase.contains(pRect.x + pRect.width,pRect.y)) return true;
		if(pBase.contains(pRect.x - pRect.width,pRect.y)) return true;
		if(pBase.contains(pRect.x,pRect.y - pRect.height)) return true;
		if(pBase.contains(pRect.x,pRect.y + pRect.height)) return true;
		return false;
	}
	,distBetween: function(pPointA,pPointB) {
		return Math.sqrt(Math.pow(pPointB.x - pPointA.x,2) - Math.pow(pPointB.y - pPointA.y,2));
	}
	,hadToManage: function() {
		this.currentScreenPosition.set(this.screenRectView().x,this.screenRectView().y);
		if(Math.abs(this.currentScreenPosition.x - this.screenPosition.x) > this.delta.x) {
			if(this.currentScreenPosition.x - this.screenPosition.x > 0) this.direction = com_isartdigital_builder_game_manager_ClippingManager.RIGHT_DIRECTION; else this.direction = com_isartdigital_builder_game_manager_ClippingManager.LEFT_DIRECTION;
			this.clippingNeed.x = Math.ceil(Math.abs(this.currentScreenPosition.x - this.screenPosition.x) / this.delta.x);
			this.screenPosition.x = this.screenRectView().x;
			return true;
		}
		if(Math.abs(this.currentScreenPosition.y - this.screenPosition.y) > this.delta.y) {
			if(this.currentScreenPosition.y - this.screenPosition.y > 0) this.direction = com_isartdigital_builder_game_manager_ClippingManager.DOWN_DIRECTION; else this.direction = com_isartdigital_builder_game_manager_ClippingManager.UP_DIRECTION;
			this.clippingNeed.y = Math.ceil(Math.abs(this.currentScreenPosition.y - this.screenPosition.y) / this.delta.y);
			this.screenPosition.y = this.screenRectView().y;
			return true;
		}
		return false;
	}
	,__class__: com_isartdigital_builder_game_manager_ClippingManager
};
var com_isartdigital_builder_game_manager_Manager = function() {
};
$hxClasses["com.isartdigital.builder.game.manager.Manager"] = com_isartdigital_builder_game_manager_Manager;
com_isartdigital_builder_game_manager_Manager.__name__ = ["com","isartdigital","builder","game","manager","Manager"];
com_isartdigital_builder_game_manager_Manager.getInstance = function() {
	if(com_isartdigital_builder_game_manager_Manager.instance == null) com_isartdigital_builder_game_manager_Manager.instance = new com_isartdigital_builder_game_manager_Manager();
	return com_isartdigital_builder_game_manager_Manager.instance;
};
com_isartdigital_builder_game_manager_Manager.prototype = {
	destroy: function() {
		com_isartdigital_builder_game_manager_Manager.instance = null;
	}
	,__class__: com_isartdigital_builder_game_manager_Manager
};
var com_isartdigital_builder_game_manager_ExperienceManager = function() {
	this.levelsArray = [];
	com_isartdigital_builder_game_manager_Manager.call(this);
	this.lvlUser = 0;
};
$hxClasses["com.isartdigital.builder.game.manager.ExperienceManager"] = com_isartdigital_builder_game_manager_ExperienceManager;
com_isartdigital_builder_game_manager_ExperienceManager.__name__ = ["com","isartdigital","builder","game","manager","ExperienceManager"];
com_isartdigital_builder_game_manager_ExperienceManager.getInstance = function() {
	if(com_isartdigital_builder_game_manager_ExperienceManager.instance == null) com_isartdigital_builder_game_manager_ExperienceManager.instance = new com_isartdigital_builder_game_manager_ExperienceManager();
	return com_isartdigital_builder_game_manager_ExperienceManager.instance;
};
com_isartdigital_builder_game_manager_ExperienceManager.__super__ = com_isartdigital_builder_game_manager_Manager;
com_isartdigital_builder_game_manager_ExperienceManager.prototype = $extend(com_isartdigital_builder_game_manager_Manager.prototype,{
	setDataXP: function(pData) {
		this.levelsArray = Reflect.field(pData,"levels");
	}
	,getLvl: function(pExp) {
		var prettyExp = Math.round(pExp);
		var _g = 0;
		var _g1 = this.levelsArray;
		while(_g < _g1.length) {
			var number = _g1[_g];
			++_g;
			if(prettyExp > number) this.lvlUser++; else {
				this.XPToNextLvl = number - prettyExp;
				return;
			}
		}
	}
	,destroy: function() {
		com_isartdigital_builder_game_manager_ExperienceManager.instance = null;
	}
	,__class__: com_isartdigital_builder_game_manager_ExperienceManager
});
var pathfinder_IMap = function() { };
$hxClasses["pathfinder.IMap"] = pathfinder_IMap;
pathfinder_IMap.__name__ = ["pathfinder","IMap"];
pathfinder_IMap.prototype = {
	__class__: pathfinder_IMap
};
var com_isartdigital_builder_game_manager_Maps = function(p_cols,p_rows) {
	this.cols = p_cols;
	this.rows = p_rows;
};
$hxClasses["com.isartdigital.builder.game.manager.Maps"] = com_isartdigital_builder_game_manager_Maps;
com_isartdigital_builder_game_manager_Maps.__name__ = ["com","isartdigital","builder","game","manager","Maps"];
com_isartdigital_builder_game_manager_Maps.__interfaces__ = [pathfinder_IMap];
com_isartdigital_builder_game_manager_Maps.prototype = {
	isWalkable: function(p_x,p_y) {
		return true;
	}
	,__class__: com_isartdigital_builder_game_manager_Maps
};
var com_isartdigital_builder_game_manager_ParadeManager = function() {
	this.nextPosIso = new PIXI.Point();
	this.nextPosModel = new PIXI.Point();
	this.listPos = [];
	this.paradeSize = 5;
};
$hxClasses["com.isartdigital.builder.game.manager.ParadeManager"] = com_isartdigital_builder_game_manager_ParadeManager;
com_isartdigital_builder_game_manager_ParadeManager.__name__ = ["com","isartdigital","builder","game","manager","ParadeManager"];
com_isartdigital_builder_game_manager_ParadeManager.getInstance = function() {
	if(com_isartdigital_builder_game_manager_ParadeManager.instance == null) com_isartdigital_builder_game_manager_ParadeManager.instance = new com_isartdigital_builder_game_manager_ParadeManager();
	return com_isartdigital_builder_game_manager_ParadeManager.instance;
};
com_isartdigital_builder_game_manager_ParadeManager.prototype = {
	doActionNormal: function() {
		if(this.isParadeActive()) this.checkParadeFinishement();
	}
	,isParadeActive: function() {
		return com_isartdigital_builder_game_manager_ParadeManager.paradeArray.length > 0;
	}
	,buildParade: function(startX,startY,minGain) {
		var _g1 = 0;
		var _g = this.paradeSize;
		while(_g1 < _g) {
			var i = _g1++;
			var lCitizen = new com_isartdigital_builder_game_sprites_Citizen();
			lCitizen.position.set(startX,startY);
			com_isartdigital_utils_game_GameStage.getInstance().getGameContainer().addChild(lCitizen);
			lCitizen.start();
			com_isartdigital_builder_game_manager_ParadeManager.paradeArray.push(lCitizen);
		}
		this.minimumGain = minGain;
		this.organizeParade(startX,startY);
	}
	,organizeParade: function(startPosX,startPosY) {
		var _g1 = 0;
		var _g = com_isartdigital_builder_game_manager_ParadeManager.paradeArray.length;
		while(_g1 < _g) {
			var i = _g1++;
			var newPos = new PIXI.Point(startPosX + i * 3,startPosY);
			com_isartdigital_builder_game_manager_ParadeManager.paradeArray[i].position = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(newPos);
			console.log(newPos);
		}
	}
	,moveParade: function(pDest) {
		console.log(pDest);
		var _g = 0;
		var _g1 = com_isartdigital_builder_game_manager_ParadeManager.paradeArray;
		while(_g < _g1.length) {
			var lCitizen = _g1[_g];
			++_g;
			lCitizen.destination = pDest;
			lCitizen.setNextPos();
			lCitizen.startPathfinder();
			com_isartdigital_builder_game_GameManager.getInstance().moveCitizen();
		}
	}
	,checkParadeFinishement: function() {
		if(com_isartdigital_builder_game_manager_ParadeManager.paradeArray[0].posInModel.x == 0 && com_isartdigital_builder_game_manager_ParadeManager.paradeArray[0].posInModel.y == 0) {
			var _g = 0;
			var _g1 = com_isartdigital_builder_game_manager_ParadeManager.paradeArray;
			while(_g < _g1.length) {
				var lCitizen = _g1[_g];
				++_g;
				com_isartdigital_utils_game_GameStage.getInstance().getGameContainer().removeChild(lCitizen);
			}
			com_isartdigital_builder_game_manager_ParadeManager.paradeArray.splice(0,com_isartdigital_builder_game_manager_ParadeManager.paradeArray.length);
			this.finishParade();
		}
	}
	,finishParade: function() {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_PARADEREWARD");
	}
	,destroy: function() {
		com_isartdigital_builder_game_manager_ParadeManager.instance = null;
	}
	,__class__: com_isartdigital_builder_game_manager_ParadeManager
};
var com_isartdigital_builder_game_manager_RessourceManager = function() {
	com_isartdigital_builder_game_manager_Manager.call(this);
};
$hxClasses["com.isartdigital.builder.game.manager.RessourceManager"] = com_isartdigital_builder_game_manager_RessourceManager;
com_isartdigital_builder_game_manager_RessourceManager.__name__ = ["com","isartdigital","builder","game","manager","RessourceManager"];
com_isartdigital_builder_game_manager_RessourceManager.getInstance = function() {
	if(com_isartdigital_builder_game_manager_RessourceManager.instance == null) com_isartdigital_builder_game_manager_RessourceManager.instance = new com_isartdigital_builder_game_manager_RessourceManager();
	return com_isartdigital_builder_game_manager_RessourceManager.instance;
};
com_isartdigital_builder_game_manager_RessourceManager.__super__ = com_isartdigital_builder_game_manager_Manager;
com_isartdigital_builder_game_manager_RessourceManager.prototype = $extend(com_isartdigital_builder_game_manager_Manager.prototype,{
	start: function() {
		this.ressources = com_isartdigital_services_Users.infos.resources;
		this.updateRessourcesInHud(this.ressources);
	}
	,getRessources: function(pRessource) {
		return Reflect.field(this.ressources,pRessource);
	}
	,addRessources: function(pRessource,pNumber) {
		Reflect.setField(this.ressources,pRessource,this.getRessources(pRessource) + pNumber);
		this.updateRessourcesInHud(this.ressources);
	}
	,removeRessources: function(pRessource,pNumber) {
		if(this.getRessources(pRessource) - pNumber >= 0) Reflect.setField(this.ressources,pRessource,this.getRessources(pRessource) - pNumber); else return false;
		this.updateRessourcesInHud(this.ressources);
		return true;
	}
	,updateRessourcesInHud: function(lResource) {
		this.ressources = lResource;
		this.updateGold(lResource.gold);
		this.updateSpice(lResource.spice);
		this.updateOfferings(lResource.offering);
	}
	,destroy: function() {
		com_isartdigital_builder_game_manager_RessourceManager.instance = null;
	}
	,__class__: com_isartdigital_builder_game_manager_RessourceManager
});
var com_isartdigital_builder_game_map_GMap = function() { };
$hxClasses["com.isartdigital.builder.game.map.GMap"] = com_isartdigital_builder_game_map_GMap;
com_isartdigital_builder_game_map_GMap.__name__ = ["com","isartdigital","builder","game","map","GMap"];
com_isartdigital_builder_game_map_GMap.isPositionExistAt = function(position,map) {
	if(map.h.hasOwnProperty(position.x | 0)) {
		if((function($this) {
			var $r;
			var this1 = map.h[position.x | 0];
			$r = this1.exists(position.y | 0);
			return $r;
		}(this))) return true;
	}
	return false;
};
com_isartdigital_builder_game_map_GMap.isElementTypeAt = function(position,type) {
	var thereIsElement;
	try {
		com_isartdigital_builder_game_map_GMap.getElementByTypeAt(position,type);
		thereIsElement = true;
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		if( js_Boot.__instanceof(e,String) ) {
			thereIsElement = false;
		} else throw(e);
	}
	return thereIsElement;
};
com_isartdigital_builder_game_map_GMap.getElementByTypeAt = function(position,type) {
	var elements;
	var this1 = com_isartdigital_builder_game_map_GMap.globalMap.h[position.x | 0];
	elements = this1.get(position.y | 0);
	if(!com_isartdigital_builder_game_map_GMap.isInsideGrid(position.x | 0,position.y | 0)) throw new js__$Boot_HaxeError("Position is outside map");
	return com_isartdigital_builder_game_map_GMap.getElementByTypeInArray(elements,type);
};
com_isartdigital_builder_game_map_GMap.addElementAt = function(position,element) {
	var elements;
	var this1 = com_isartdigital_builder_game_map_GMap.globalMap.h[position.x | 0];
	elements = this1.get(position.y | 0);
	elements.push(element);
};
com_isartdigital_builder_game_map_GMap.removeElementByTypeAt = function(position,type) {
	var elements;
	var this1 = com_isartdigital_builder_game_map_GMap.globalMap.h[position.x | 0];
	elements = this1.get(position.y | 0);
	var elementRemoved;
	var _g1 = 0;
	var _g = elements.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(elements[i].type == type) {
			elementRemoved = elements.splice(i,1);
			return elementRemoved[0];
		}
	}
	throw new js__$Boot_HaxeError("typedef was not found in elements array");
};
com_isartdigital_builder_game_map_GMap.getElementByTypeInArray = function(elements,type) {
	var _g1 = 0;
	var _g = elements.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(elements[i].type == type) return elements[i];
	}
	throw new js__$Boot_HaxeError("getElementByTypeInArray : Element type was not found in elements list");
};
com_isartdigital_builder_game_map_GMap.getElementsBySizeAt = function(position,size) {
	var elementsBunch = [];
	var xIndex;
	var yIndex;
	var _g1 = 0;
	var _g = size.width;
	while(_g1 < _g) {
		var x = _g1++;
		var _g3 = 0;
		var _g2 = size.height;
		while(_g3 < _g2) {
			var y = _g3++;
			xIndex = (position.x | 0) - x;
			yIndex = (position.y | 0) - y;
			if(com_isartdigital_builder_game_map_GMap.isInsideGrid(xIndex,yIndex)) elementsBunch.push((function($this) {
				var $r;
				var this1 = com_isartdigital_builder_game_map_GMap.globalMap.h[xIndex];
				$r = this1.get(yIndex);
				return $r;
			}(this))); else throw new js__$Boot_HaxeError("getArraysElementsBySizeAt :: Element you want to retrieve is outside of the map");
		}
	}
	return elementsBunch;
};
com_isartdigital_builder_game_map_GMap.addElementsBySizeAt = function(position,size,element) {
	var elementsBunch = com_isartdigital_builder_game_map_GMap.getElementsBySizeAt(position,size);
	var elements;
	var _g1 = 0;
	var _g = elementsBunch.length;
	while(_g1 < _g) {
		var i = _g1++;
		elements = elementsBunch[i];
		elements.push(element);
	}
};
com_isartdigital_builder_game_map_GMap.removeElementsBySizeAndTypeAt = function(position,size,type) {
	var xPositionWithOffset;
	var yPositionWthOffset;
	var _g1 = 0;
	var _g = size.width;
	while(_g1 < _g) {
		var x = _g1++;
		var _g3 = 0;
		var _g2 = size.height;
		while(_g3 < _g2) {
			var y = _g3++;
			xPositionWithOffset = position.x - x | 0;
			yPositionWthOffset = position.y - y | 0;
			com_isartdigital_builder_game_map_GMap.removeElementByTypeAt(new PIXI.Point(xPositionWithOffset,yPositionWthOffset),type);
		}
	}
};
com_isartdigital_builder_game_map_GMap.isInsideGrid = function(pX,pY) {
	if(pX >= 0 && pY >= 0 && pX < com_isartdigital_utils_Config.mapSize && pY < com_isartdigital_utils_Config.mapSize) return true;
	return false;
};
com_isartdigital_builder_game_map_GMap.displayTilePositionUnderMouse = function() {
	var lPosition = com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(com_isartdigital_builder_game_GameManager.getInstance().mousePosition);
	if(Math.floor(Math.random() * 10) == 0) console.log("x : " + lPosition.x + " y : " + lPosition.y);
};
var com_isartdigital_builder_game_map_GMapCreator = function() { };
$hxClasses["com.isartdigital.builder.game.map.GMapCreator"] = com_isartdigital_builder_game_map_GMapCreator;
com_isartdigital_builder_game_map_GMapCreator.__name__ = ["com","isartdigital","builder","game","map","GMapCreator"];
com_isartdigital_builder_game_map_GMapCreator.create = function() {
	com_isartdigital_builder_game_map_GMapCreator.insertTilesInto(com_isartdigital_builder_game_map_GMap.globalMap);
	com_isartdigital_builder_game_map_GMapCreator.insertLanternsInto(com_isartdigital_builder_game_map_GMap.globalMap);
	com_isartdigital_builder_game_map_GMapCreator.illuminateLanterns();
	com_isartdigital_builder_game_map_GMapCreator.insertBuildingsInto(com_isartdigital_builder_game_map_GMap.globalMap);
};
com_isartdigital_builder_game_map_GMapCreator.insertTilesInto = function(map) {
	var tilePosition;
	var tileSaved;
	var _g1 = 0;
	var _g = com_isartdigital_utils_Config.mapSize;
	while(_g1 < _g) {
		var i = _g1++;
		var _g3 = 0;
		var _g2 = com_isartdigital_utils_Config.mapSize;
		while(_g3 < _g2) {
			var j = _g3++;
			tileSaved = { type : "tile", x : i, y : j, isBuildable : false, isIlluminated : false, alpha : 1};
			if(!com_isartdigital_builder_game_map_GMap.isPositionExistAt(new PIXI.Point(i,j),map)) {
				if(!map.h.hasOwnProperty(i)) {
					var v = new haxe_ds_IntMap();
					map.h[i] = v;
					v;
				}
				var this1 = map.h[i];
				var v1 = [];
				this1.set(j,v1);
				v1;
			}
			((function($this) {
				var $r;
				var this2 = map.h[i];
				$r = this2.get(j);
				return $r;
			}(this))).push(tileSaved);
		}
	}
};
com_isartdigital_builder_game_map_GMapCreator.insertBuildingsInto = function(map) {
	var buildings = com_isartdigital_services_Users.infos.buildings;
	var buildingModel;
	var buildingDef;
	var _g1 = 0;
	var _g = buildings.length;
	while(_g1 < _g) {
		var i = _g1++;
		buildingModel = buildings[i];
		buildingDef = com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getByName(buildingModel.name);
		buildingModel.type = "building";
		buildingModel.buildingLevel = 0;
		buildingModel.x = buildingModel.x | 0;
		buildingModel.y = buildingModel.y | 0;
		if(com_isartdigital_builder_game_map_GMap.isPositionExistAt(new PIXI.Point(buildingModel.x,buildingModel.y),map)) com_isartdigital_builder_game_map_GMap.addElementsBySizeAt(new PIXI.Point(buildingModel.x,buildingModel.y),buildingDef.size,buildingModel);
	}
};
com_isartdigital_builder_game_map_GMapCreator.insertLanternsInto = function(map) {
	var lanterns = com_isartdigital_utils_loader_GameLoader.getContent("json/lanternsPlacement.json");
	var lanternPosition;
	var buildingModel;
	var _g1 = 0;
	var _g = lanterns.length;
	while(_g1 < _g) {
		var i = _g1++;
		lanternPosition = lanterns[i];
		buildingModel = com_isartdigital_builder_game_utils_TypeDefUtils.cloneObject(com_isartdigital_builder_game_utils_TypeDefUtils.buildingModelDef);
		buildingModel.name = "lanterns";
		buildingModel.type = "building";
		buildingModel.x = lanternPosition.x | 0;
		buildingModel.y = lanternPosition.y | 0;
		if(com_isartdigital_builder_game_map_GMapCreator.isLanternActiveAt(lanternPosition)) buildingModel.buildingLevel = 1; else buildingModel.buildingLevel = 0;
		if(com_isartdigital_builder_game_map_GMap.isPositionExistAt(new PIXI.Point(buildingModel.x,buildingModel.y),map)) ((function($this) {
			var $r;
			var this1 = map.h[buildingModel.x];
			$r = this1.get(buildingModel.y);
			return $r;
		}(this))).push(buildingModel);
	}
};
com_isartdigital_builder_game_map_GMapCreator.illuminateLanterns = function() {
	var lanterns = com_isartdigital_utils_loader_GameLoader.getContent("json/lanternsPlacement.json");
	var lanternPosition;
	var _g1 = 0;
	var _g = lanterns.length;
	while(_g1 < _g) {
		var i = _g1++;
		lanternPosition = lanterns[i];
		if(com_isartdigital_builder_game_map_GMapCreator.isLanternActiveAt(lanternPosition)) com_isartdigital_builder_game_sprites_Tile.illumineTileInRadiusAt(lanternPosition,com_isartdigital_builder_game_sprites_Tile.getLanternActionRadius());
	}
};
com_isartdigital_builder_game_map_GMapCreator.isLanternActiveAt = function(position) {
	var lanterns;
	var lantern;
	lanterns = com_isartdigital_services_Users.infos.lanterns;
	var _g1 = 0;
	var _g = lanterns.length;
	while(_g1 < _g) {
		var i = _g1++;
		lantern = lanterns[i];
		if(lantern.x == position.x && lantern.y == position.y) return true;
	}
	return false;
};
var com_isartdigital_builder_game_pooling_IPoolObject = function() { };
$hxClasses["com.isartdigital.builder.game.pooling.IPoolObject"] = com_isartdigital_builder_game_pooling_IPoolObject;
com_isartdigital_builder_game_pooling_IPoolObject.__name__ = ["com","isartdigital","builder","game","pooling","IPoolObject"];
com_isartdigital_builder_game_pooling_IPoolObject.prototype = {
	__class__: com_isartdigital_builder_game_pooling_IPoolObject
};
var com_isartdigital_builder_game_pooling_PoolObject = function() {
};
$hxClasses["com.isartdigital.builder.game.pooling.PoolObject"] = com_isartdigital_builder_game_pooling_PoolObject;
com_isartdigital_builder_game_pooling_PoolObject.__name__ = ["com","isartdigital","builder","game","pooling","PoolObject"];
com_isartdigital_builder_game_pooling_PoolObject.create = function(pClass) {
	var lName = Type.getClassName(pClass);
	if(!com_isartdigital_builder_game_pooling_PoolObject.poolList.exists(lName)) com_isartdigital_builder_game_pooling_PoolObject.createPoolList(pClass);
	if(com_isartdigital_builder_game_pooling_PoolObject.poolList.get(lName).length == 0) com_isartdigital_builder_game_pooling_PoolObject.addObjectToPoolList(lName,pClass);
	return com_isartdigital_builder_game_pooling_PoolObject.poolList.get(lName).shift();
};
com_isartdigital_builder_game_pooling_PoolObject.addPool = function(pObject) {
	var lName = Type.getClassName(Type.getClass(pObject));
	if(!com_isartdigital_builder_game_pooling_PoolObject.poolList.exists(lName)) return false;
	if(com_isartdigital_builder_game_pooling_PoolObject.poolList.get(lName).length > 1000) return false;
	com_isartdigital_builder_game_pooling_PoolObject.poolList.get(lName).push(pObject);
	return true;
};
com_isartdigital_builder_game_pooling_PoolObject.createPoolList = function(pClass) {
	var lName = Type.getClassName(pClass);
	var value = [];
	com_isartdigital_builder_game_pooling_PoolObject.poolList.set(lName,value);
	com_isartdigital_builder_game_pooling_PoolObject.addObjectToPoolList(lName,pClass);
};
com_isartdigital_builder_game_pooling_PoolObject.addObjectToPoolList = function(pName,pClass) {
	var _g = 0;
	while(_g < 10) {
		var i = _g++;
		var lObject = Type.createInstance(pClass,[]);
		com_isartdigital_builder_game_pooling_PoolObject.poolList.get(pName).push(Type.createInstance(pClass,[]));
	}
};
com_isartdigital_builder_game_pooling_PoolObject.prototype = {
	__class__: com_isartdigital_builder_game_pooling_PoolObject
};
var com_isartdigital_utils_game_GameObject = function() {
	PIXI.Container.call(this);
	this.on("added",$bind(this,this.forceUpdateTransform));
};
$hxClasses["com.isartdigital.utils.game.GameObject"] = com_isartdigital_utils_game_GameObject;
com_isartdigital_utils_game_GameObject.__name__ = ["com","isartdigital","utils","game","GameObject"];
com_isartdigital_utils_game_GameObject.__super__ = PIXI.Container;
com_isartdigital_utils_game_GameObject.prototype = $extend(PIXI.Container.prototype,{
	forceUpdateTransform: function() {
	}
	,destroy: function() {
		this.off("added",$bind(this,this.forceUpdateTransform));
		PIXI.Container.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_utils_game_GameObject
});
var com_isartdigital_utils_game_IStateMachine = function() { };
$hxClasses["com.isartdigital.utils.game.IStateMachine"] = com_isartdigital_utils_game_IStateMachine;
com_isartdigital_utils_game_IStateMachine.__name__ = ["com","isartdigital","utils","game","IStateMachine"];
com_isartdigital_utils_game_IStateMachine.prototype = {
	__class__: com_isartdigital_utils_game_IStateMachine
};
var com_isartdigital_utils_game_StateMachine = function() {
	com_isartdigital_utils_game_GameObject.call(this);
	this.setModeVoid();
};
$hxClasses["com.isartdigital.utils.game.StateMachine"] = com_isartdigital_utils_game_StateMachine;
com_isartdigital_utils_game_StateMachine.__name__ = ["com","isartdigital","utils","game","StateMachine"];
com_isartdigital_utils_game_StateMachine.__interfaces__ = [com_isartdigital_utils_game_IStateMachine];
com_isartdigital_utils_game_StateMachine.__super__ = com_isartdigital_utils_game_GameObject;
com_isartdigital_utils_game_StateMachine.prototype = $extend(com_isartdigital_utils_game_GameObject.prototype,{
	setModeVoid: function() {
		this.doAction = $bind(this,this.doActionVoid);
	}
	,doActionVoid: function() {
	}
	,setModeNormal: function() {
		this.doAction = $bind(this,this.doActionNormal);
	}
	,doActionNormal: function() {
	}
	,start: function() {
		this.setModeNormal();
	}
	,destroy: function() {
		this.setModeVoid();
		com_isartdigital_utils_game_GameObject.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_utils_game_StateMachine
});
var com_isartdigital_utils_game_StateGraphic = function(assetName) {
	this.boxType = com_isartdigital_utils_game_BoxType.NONE;
	this.DEFAULT_STATE = "";
	this.BOX_SUFFIX = "box";
	this.ANIM_SUFFIX = "";
	com_isartdigital_utils_game_StateMachine.call(this);
	if(assetName != null) {
		this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
		this.assetName = assetName;
		this.setState(this.DEFAULT_STATE);
		this.start();
	}
};
$hxClasses["com.isartdigital.utils.game.StateGraphic"] = com_isartdigital_utils_game_StateGraphic;
com_isartdigital_utils_game_StateGraphic.__name__ = ["com","isartdigital","utils","game","StateGraphic"];
com_isartdigital_utils_game_StateGraphic.addBoxes = function(pJson) {
	if(com_isartdigital_utils_game_StateGraphic.boxesCache == null) com_isartdigital_utils_game_StateGraphic.boxesCache = new haxe_ds_StringMap();
	var lItem;
	var lObj;
	var _g = 0;
	var _g1 = Reflect.fields(pJson);
	while(_g < _g1.length) {
		var lName = _g1[_g];
		++_g;
		lItem = Reflect.field(pJson,lName);
		var v = new haxe_ds_StringMap();
		com_isartdigital_utils_game_StateGraphic.boxesCache.set(lName,v);
		v;
		var _g2 = 0;
		var _g3 = Reflect.fields(lItem);
		while(_g2 < _g3.length) {
			var lObjName = _g3[_g2];
			++_g2;
			lObj = Reflect.field(lItem,lObjName);
			if(lObj.type == "Rectangle") {
				var this1 = com_isartdigital_utils_game_StateGraphic.boxesCache.get(lName);
				var v1 = new PIXI.Rectangle(lObj.x,lObj.y,lObj.width,lObj.height);
				this1.set(lObjName,v1);
				v1;
			} else if(lObj.type == "Ellipse") {
				var this2 = com_isartdigital_utils_game_StateGraphic.boxesCache.get(lName);
				var v2 = new PIXI.Ellipse(lObj.x,lObj.y,lObj.width / 2,lObj.height / 2);
				this2.set(lObjName,v2);
				v2;
			} else if(lObj.type == "Circle") {
				var this3 = com_isartdigital_utils_game_StateGraphic.boxesCache.get(lName);
				var v3 = new PIXI.Circle(lObj.x,lObj.y,lObj.radius);
				this3.set(lObjName,v3);
				v3;
			} else if(lObj.type == "Point") {
				var this4 = com_isartdigital_utils_game_StateGraphic.boxesCache.get(lName);
				var v4 = new PIXI.Point(lObj.x,lObj.y);
				this4.set(lObjName,v4);
				v4;
			}
		}
	}
};
com_isartdigital_utils_game_StateGraphic.__super__ = com_isartdigital_utils_game_StateMachine;
com_isartdigital_utils_game_StateGraphic.prototype = $extend(com_isartdigital_utils_game_StateMachine.prototype,{
	setAnimEnd: function() {
		this.isAnimEnd = true;
	}
	,changeAsset: function(pAssetName,pState) {
		if(pState == null) pState = "";
		this.cleanAnim();
		this.assetName = pAssetName;
	}
	,positionToModel: function(pFloor) {
		if(pFloor == null) pFloor = false;
		var positionIndex = com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(new PIXI.Point(this.x,this.y));
		if(pFloor) {
			positionIndex.x = Math.floor(positionIndex.x);
			positionIndex.y = Math.floor(positionIndex.y);
		}
		return positionIndex;
	}
	,setState: function(pState,pLoop,pAutoPlay,pStart) {
		if(pStart == null) pStart = 0;
		if(pAutoPlay == null) pAutoPlay = true;
		if(pLoop == null) pLoop = false;
		if(this.factory == null) throw new js__$Boot_HaxeError("StateGraphic :: propriÃ©tÃ© fabrique non dÃ©finie");
		if(this.state == pState) return;
		if(this.anim != null) {
			this.removeChild(this.anim);
			this.anim.destroy();
			this.anim = null;
			if(this.boxType == com_isartdigital_utils_game_BoxType.SELF) {
				this.parent.removeChild(this.box);
				this.box = null;
			}
		}
		if(this.assetName == null) this.assetName = Type.getClassName(js_Boot.getClass(this)).split(".").pop();
		this.state = pState;
		this.anim = this.factory.getAnim();
		if(this.anim == null) {
			if(this.boxType == com_isartdigital_utils_game_BoxType.SELF) {
				if(this.box != null) this.removeChild(this.box);
				this.box = null;
			}
			this.anim = this.factory.create(this.getID(this.state));
			this.anim.scale.set(1 / com_isartdigital_utils_system_DeviceCapabilities.textureRatio,1 / com_isartdigital_utils_system_DeviceCapabilities.textureRatio);
			if(com_isartdigital_utils_game_StateGraphic.animAlpha < 1) this.anim.alpha = com_isartdigital_utils_game_StateGraphic.animAlpha;
			this.addChild(this.anim);
		} else this.factory.update(this.getID(this.state));
		this.isAnimEnd = false;
		this.anim.loop = pLoop;
		this.factory.setFrame(pAutoPlay,pStart);
		if(this.box == null) {
			if(this.boxType == com_isartdigital_utils_game_BoxType.SELF) {
				this.box = this.anim;
				return;
			} else {
				this.box = new PIXI.Container();
				if(this.boxType != com_isartdigital_utils_game_BoxType.NONE) this.createBox();
			}
			this.addChild(this.box);
		} else if(this.boxType == com_isartdigital_utils_game_BoxType.MULTIPLE) {
			this.removeChild(this.box);
			this.box = new PIXI.Container();
			this.createBox();
			this.addChild(this.box);
		}
	}
	,changeTexture: function(pState) {
	}
	,getID: function(pState) {
		if(pState == this.DEFAULT_STATE) return this.assetName + this.ANIM_SUFFIX;
		return this.assetName + "_" + pState + this.ANIM_SUFFIX;
	}
	,createBox: function() {
		var lBoxes = this.getBox((this.boxType == com_isartdigital_utils_game_BoxType.MULTIPLE?this.state + "_":"") + this.BOX_SUFFIX);
		var lChild;
		var $it0 = lBoxes.keys();
		while( $it0.hasNext() ) {
			var lBox = $it0.next();
			lChild = new PIXI.Graphics();
			lChild.beginFill(16720418);
			if(Std["is"](__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox],PIXI.Rectangle)) lChild.drawRect((__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox]).x,(__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox]).y,(__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox]).width,(__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox]).height); else if(Std["is"](__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox],PIXI.Ellipse)) lChild.drawEllipse((__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox]).x,(__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox]).y,(__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox]).width,(__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox]).height); else if(Std["is"](__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox],PIXI.Circle)) lChild.drawCircle((__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox]).x,(__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox]).y,(__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox]).radius); else if(Std["is"](__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox],PIXI.Point)) lChild.drawCircle(0,0,10);
			lChild.endFill();
			lChild.name = lBox;
			if(Std["is"](__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox],PIXI.Point)) lChild.position.set((__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox]).x,(__map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox]).y); else lChild.hitArea = __map_reserved[lBox] != null?lBoxes.getReserved(lBox):lBoxes.h[lBox];
			this.box.addChild(lChild);
		}
		if(com_isartdigital_utils_game_StateGraphic.boxAlpha == 0) this.box.renderable = false; else this.box.alpha = com_isartdigital_utils_game_StateGraphic.boxAlpha;
	}
	,getBox: function(pState) {
		return com_isartdigital_utils_game_StateGraphic.boxesCache.get(this.assetName + "_" + pState);
	}
	,pause: function() {
		if(this.anim != null && this.anim.stop != null) this.anim.stop();
	}
	,resume: function() {
		if(this.anim != null && this.anim.play != null) this.anim.play();
	}
	,get_hitBox: function() {
		return this.box;
	}
	,get_hitPoints: function() {
		return null;
	}
	,cleanAnim: function() {
		if(this.anim != null) {
			if(this.anim.stop != null) this.anim.stop();
			this.removeChild(this.anim);
			this.anim.destroy();
		}
		if(this.box != this.anim) {
			this.removeChild(this.box);
			this.box.destroy();
			this.box = null;
		}
		this.state = null;
		this.anim = null;
		if(this.factory != null) this.factory.anim = null;
	}
	,destroy: function() {
		this.cleanAnim();
		com_isartdigital_utils_game_StateMachine.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_utils_game_StateGraphic
	,__properties__: {get_hitPoints:"get_hitPoints",get_hitBox:"get_hitBox"}
});
var com_isartdigital_builder_game_sprites_Background = function() {
	com_isartdigital_utils_game_StateGraphic.call(this);
	this.boxType = com_isartdigital_utils_game_BoxType.NONE;
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
};
$hxClasses["com.isartdigital.builder.game.sprites.Background"] = com_isartdigital_builder_game_sprites_Background;
com_isartdigital_builder_game_sprites_Background.__name__ = ["com","isartdigital","builder","game","sprites","Background"];
com_isartdigital_builder_game_sprites_Background.__super__ = com_isartdigital_utils_game_StateGraphic;
com_isartdigital_builder_game_sprites_Background.prototype = $extend(com_isartdigital_utils_game_StateGraphic.prototype,{
	start: function() {
		com_isartdigital_utils_game_StateGraphic.prototype.start.call(this);
		this.setState(this.DEFAULT_STATE);
	}
	,destroy: function() {
		com_isartdigital_utils_game_StateGraphic.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_game_sprites_Background
});
var com_isartdigital_builder_game_sprites_Citizen = function() {
	this.speed = new PIXI.Point(8,4);
	this.nextPosIso = new PIXI.Point();
	this.nextPosModel = new PIXI.Point();
	this.listPos = [];
	com_isartdigital_utils_game_StateGraphic.call(this);
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	this.assetName = "Citizen1";
	this.setState(this.DEFAULT_STATE);
	this.boxType = com_isartdigital_utils_game_BoxType.NONE;
	com_isartdigital_builder_game_sprites_Citizen.list.push(this);
	this.posInModel = com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(this.position);
	this.coorInModel = this.posInModel;
	this.setNextPos();
};
$hxClasses["com.isartdigital.builder.game.sprites.Citizen"] = com_isartdigital_builder_game_sprites_Citizen;
com_isartdigital_builder_game_sprites_Citizen.__name__ = ["com","isartdigital","builder","game","sprites","Citizen"];
com_isartdigital_builder_game_sprites_Citizen.__super__ = com_isartdigital_utils_game_StateGraphic;
com_isartdigital_builder_game_sprites_Citizen.prototype = $extend(com_isartdigital_utils_game_StateGraphic.prototype,{
	startPathfinder: function() {
		var l_map = new com_isartdigital_builder_game_manager_Maps(100,100);
		var l_pathfinder = new pathfinder_Pathfinder(l_map);
		var l_startNode = new pathfinder_Coordinate(this.coorInModel.x,this.coorInModel.y);
		var l_destinationNode = this.destination;
		var l_heuristicType = pathfinder_EHeuristic.PRODUCT;
		var l_isDiagonalEnabled = false;
		var l_isMapDynamic = false;
		var l_path = l_pathfinder.createPath(l_startNode,l_destinationNode,l_heuristicType,l_isDiagonalEnabled,l_isMapDynamic);
		var _g1 = 0;
		var _g = l_path.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.listPos.push(new PIXI.Point(l_path[i].x,l_path[i].y));
		}
	}
	,doActionNormal: function() {
		com_isartdigital_utils_game_StateGraphic.prototype.doActionNormal.call(this);
		this.posInModel = com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(this.position);
		this.moveTo();
	}
	,setNextPos: function() {
		if(this.listPos.length != 0) {
			this.nextPosModel = this.listPos.shift();
			this.nextPosIso = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(this.nextPosModel);
		}
	}
	,moveTo: function() {
		if(this.position.x < this.nextPosIso.x) this.position.x += this.speed.x; else if(this.position.x > this.nextPosIso.x) this.position.x -= this.speed.x;
		if(this.position.y < this.nextPosIso.y) this.position.y += this.speed.y; else if(this.position.y > this.nextPosIso.y) this.position.y -= this.speed.y;
		if(this.position.x == this.nextPosIso.x && this.position.y == this.nextPosIso.y) this.setNextPos();
		this.setOrientation();
	}
	,setOrientation: function() {
		if(this.position.x < this.nextPosIso.x && this.position.y < this.nextPosIso.y) (js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(0); else if(this.position.x > this.nextPosIso.x && this.position.y < this.nextPosIso.y) (js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(1); else if(this.position.x < this.nextPosIso.x && this.position.y > this.nextPosIso.y) (js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(2); else if(this.position.x > this.nextPosIso.x && this.position.y > this.nextPosIso.y) (js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(3);
	}
	,destroy: function() {
		com_isartdigital_builder_game_sprites_Citizen.list.splice(HxOverrides.indexOf(com_isartdigital_builder_game_sprites_Citizen.list,this,0),1);
		com_isartdigital_utils_game_StateGraphic.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_game_sprites_Citizen
});
var com_isartdigital_builder_game_sprites_SpriteObject = function() {
	com_isartdigital_utils_game_StateGraphic.call(this);
};
$hxClasses["com.isartdigital.builder.game.sprites.SpriteObject"] = com_isartdigital_builder_game_sprites_SpriteObject;
com_isartdigital_builder_game_sprites_SpriteObject.__name__ = ["com","isartdigital","builder","game","sprites","SpriteObject"];
com_isartdigital_builder_game_sprites_SpriteObject.__interfaces__ = [com_isartdigital_builder_game_pooling_IPoolObject];
com_isartdigital_builder_game_sprites_SpriteObject.__super__ = com_isartdigital_utils_game_StateGraphic;
com_isartdigital_builder_game_sprites_SpriteObject.prototype = $extend(com_isartdigital_utils_game_StateGraphic.prototype,{
	remove: function() {
		if(!com_isartdigital_builder_game_pooling_PoolObject.addPool(this)) return false;
		this.cleanAnim();
		return true;
	}
	,init: function(pDefinition) {
	}
	,__class__: com_isartdigital_builder_game_sprites_SpriteObject
});
var com_isartdigital_builder_game_sprites_Tile = function() {
	this.isBuildable = true;
	this.isIlluminated = false;
	com_isartdigital_builder_game_sprites_SpriteObject.call(this);
	this.boxType = com_isartdigital_utils_game_BoxType.NONE;
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
};
$hxClasses["com.isartdigital.builder.game.sprites.Tile"] = com_isartdigital_builder_game_sprites_Tile;
com_isartdigital_builder_game_sprites_Tile.__name__ = ["com","isartdigital","builder","game","sprites","Tile"];
com_isartdigital_builder_game_sprites_Tile.illumineTileInRadiusAt = function(position,radius) {
	var index;
	var tiles = [];
	var tile;
	var tileAlpha;
	var _g = 0;
	while(_g < radius) {
		var i = _g++;
		tileAlpha = (Math.exp(i / radius) - 1) / (Math.exp(1.1) - 1);
		var _g2 = 0;
		var _g1 = radius * 30;
		while(_g2 < _g1) {
			var j = _g2++;
			index = j / radius;
			tile = com_isartdigital_builder_game_utils_TypeDefUtils.cloneObject(com_isartdigital_builder_game_utils_TypeDefUtils.tileModelDef);
			tile.x = Math.round(position.x + Math.cos(index) * i);
			tile.y = Math.round(position.y + Math.sin(index) * i);
			tile.alpha = tileAlpha;
			tiles.push(tile);
		}
	}
	var _g11 = 0;
	var _g3 = tiles.length;
	while(_g11 < _g3) {
		var k = _g11++;
		if(com_isartdigital_builder_game_map_GMap.isInsideGrid(tiles[k].x | 0,tiles[k].y | 0)) com_isartdigital_builder_game_sprites_Tile.setTileIlluminatedAndAlphaInGlobalMapAt(tiles[k]);
	}
	com_isartdigital_builder_game_sprites_Tile.refreshTilesAlpha();
};
com_isartdigital_builder_game_sprites_Tile.setTileIlluminatedAndAlphaInGlobalMapAt = function(tile) {
	var tileInGlobalMap = com_isartdigital_builder_game_map_GMap.getElementByTypeAt(new PIXI.Point(tile.x,tile.y),"tile");
	if(tileInGlobalMap.alpha > tile.alpha) tileInGlobalMap.alpha = tile.alpha; else tileInGlobalMap.alpha = tileInGlobalMap.alpha;
	if(!tileInGlobalMap.isIlluminated) {
		tileInGlobalMap.isIlluminated = true;
		tileInGlobalMap.isBuildable = true;
	}
};
com_isartdigital_builder_game_sprites_Tile.refreshTilesAlpha = function() {
	var tile;
	var position;
	var _g1 = 0;
	var _g = com_isartdigital_builder_game_sprites_Tile.list.length;
	while(_g1 < _g) {
		var i = _g1++;
		tile = com_isartdigital_builder_game_sprites_Tile.list[i];
		position = tile.positionToModel(true);
		tile.setTileAlpha(com_isartdigital_builder_game_sprites_Tile.getTileAlphaAt(position));
	}
};
com_isartdigital_builder_game_sprites_Tile.getTileAlphaAt = function(position) {
	return com_isartdigital_builder_game_map_GMap.getElementByTypeAt(position,"tile").alpha;
};
com_isartdigital_builder_game_sprites_Tile.setTilesBuildable = function(tiles,_isBuildable) {
	var mapElements;
	var tile;
	var _g1 = 0;
	var _g = tiles.length;
	while(_g1 < _g) {
		var i = _g1++;
		tile = tiles[i];
		var this1 = com_isartdigital_builder_game_map_GMap.globalMap.h[tile.x];
		mapElements = this1.get(tile.y);
		if(mapElements != null) com_isartdigital_builder_game_map_GMap.getElementByTypeInArray(mapElements,"tile").isBuildable = _isBuildable;
	}
};
com_isartdigital_builder_game_sprites_Tile.isTilesBuildable = function(pTiles) {
	var _isBuildable = true;
	if(pTiles == null) return false;
	var _g1 = 0;
	var _g = pTiles.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(!pTiles[i].isBuildable) _isBuildable = false;
	}
	return _isBuildable;
};
com_isartdigital_builder_game_sprites_Tile.getTilesArray = function(pPosition,pSize) {
	var tiles = [];
	var mapElements;
	try {
		mapElements = com_isartdigital_builder_game_map_GMap.getElementsBySizeAt(pPosition,pSize);
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		if( js_Boot.__instanceof(e,String) ) {
			return null;
		} else throw(e);
	}
	var _g1 = 0;
	var _g = mapElements.length;
	while(_g1 < _g) {
		var i = _g1++;
		tiles.push(com_isartdigital_builder_game_map_GMap.getElementByTypeInArray(mapElements[i],"tile"));
	}
	return tiles;
};
com_isartdigital_builder_game_sprites_Tile.getLanternActionRadius = function() {
	var buildingSettings = com_isartdigital_utils_loader_GameLoader.getContent("json/buildingsSettings.json");
	var lanternSetting = Reflect.field(buildingSettings,"lanterns");
	return Reflect.field(lanternSetting,"action_radius");
};
com_isartdigital_builder_game_sprites_Tile.__super__ = com_isartdigital_builder_game_sprites_SpriteObject;
com_isartdigital_builder_game_sprites_Tile.prototype = $extend(com_isartdigital_builder_game_sprites_SpriteObject.prototype,{
	remove: function() {
		com_isartdigital_utils_game_GameStage.getInstance().getTilesContainer().removeChild(this);
		if(!com_isartdigital_builder_game_sprites_SpriteObject.prototype.remove.call(this)) {
			this.destroy();
			return true;
		}
		com_isartdigital_builder_game_sprites_Tile.list.splice(HxOverrides.indexOf(com_isartdigital_builder_game_sprites_Tile.list,this,0),1);
		return true;
	}
	,init: function(pDefiniton) {
		var x = Reflect.getProperty(pDefiniton,"x");
		var y = Reflect.getProperty(pDefiniton,"y");
		var lPosition = new PIXI.Point(x,y);
		lPosition = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(lPosition);
		this.position.set(Math.floor(lPosition.x),Math.floor(lPosition.y));
		this.isBuildable = Reflect.getProperty(pDefiniton,"isBuildable");
		com_isartdigital_builder_game_sprites_Tile.list.push(this);
		this.changeAsset("Ground");
		this.isIlluminated = pDefiniton.isIlluminated;
		this.setState(this.DEFAULT_STATE);
		this.setTileAlpha(pDefiniton.alpha);
		if(this.isIlluminated) (js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(0); else (js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(1);
		com_isartdigital_utils_game_GameStage.getInstance().getTilesContainer().addChild(this);
	}
	,setTileAlpha: function(value) {
		this.alpha = value;
	}
	,destroy: function() {
		com_isartdigital_builder_game_sprites_Tile.list.splice(HxOverrides.indexOf(com_isartdigital_builder_game_sprites_Tile.list,this,0),1);
		com_isartdigital_builder_game_sprites_SpriteObject.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_game_sprites_Tile
});
var com_isartdigital_utils_game_iso_IZSortable = function() { };
$hxClasses["com.isartdigital.utils.game.iso.IZSortable"] = com_isartdigital_utils_game_iso_IZSortable;
com_isartdigital_utils_game_iso_IZSortable.__name__ = ["com","isartdigital","utils","game","iso","IZSortable"];
com_isartdigital_utils_game_iso_IZSortable.prototype = {
	__class__: com_isartdigital_utils_game_iso_IZSortable
};
var com_isartdigital_builder_game_sprites_buildings_Building = function() {
	this.canTriggerMouseUpEvent = true;
	this.isFollowingCursor = false;
	this.isSelected = false;
	this.buildingLevel = 0;
	com_isartdigital_builder_game_sprites_SpriteObject.call(this);
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	this.boxType = com_isartdigital_utils_game_BoxType.NONE;
	this.interactive = true;
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.Building"] = com_isartdigital_builder_game_sprites_buildings_Building;
com_isartdigital_builder_game_sprites_buildings_Building.__name__ = ["com","isartdigital","builder","game","sprites","buildings","Building"];
com_isartdigital_builder_game_sprites_buildings_Building.__interfaces__ = [com_isartdigital_utils_game_iso_IZSortable];
com_isartdigital_builder_game_sprites_buildings_Building.__super__ = com_isartdigital_builder_game_sprites_SpriteObject;
com_isartdigital_builder_game_sprites_buildings_Building.prototype = $extend(com_isartdigital_builder_game_sprites_SpriteObject.prototype,{
	init: function(buildingModelDef) {
		this.buildingConstructor = new com_isartdigital_builder_game_sprites_buildings_BuildingConstructor(this);
		this.buildingDestructor = new com_isartdigital_builder_game_sprites_buildings_BuildingDestructor(this);
		this.buildingHarvester = new com_isartdigital_builder_game_sprites_buildings_BuildingHarvester(this);
		this.buildingPosition = new com_isartdigital_builder_game_sprites_buildings_BuildingPosition(this);
		this.buildingMover = new com_isartdigital_builder_game_sprites_buildings_BuildingMover(this);
		this.buildingTile = new com_isartdigital_builder_game_sprites_buildings_BuildingTile(this);
		this.setBuildingConfigurationWith(buildingModelDef);
		this.setInteractionStrategy();
		this.createZSortableConfiguration();
		this.addEventSubscription();
		this.hideIfInFog();
		this.addToStage();
	}
	,setBuildingConfigurationWith: function(buildingModelDef) {
		var buildingModelPosition = new PIXI.Point(buildingModelDef.x,buildingModelDef.y);
		var buildingIsoPosition = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(buildingModelPosition);
		this.definition = com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getByName(buildingModelDef.name);
		this.assetName = this.definition.spriteName;
		this.changeAsset(this.definition.spriteName);
		this.x = Math.floor(buildingIsoPosition.x);
		this.y = Math.floor(buildingIsoPosition.y);
		this.buildingLevel = buildingModelDef.buildingLevel;
		this.buildingConstructor.setDestination(buildingModelPosition);
		this.buildingConstructor.construct();
		this.hasHarvestableFunctionality = this.buildingHarvester.isBuildingHasHarvestFunctionality();
		com_isartdigital_builder_game_sprites_buildings_Building.list.push(this);
	}
	,setInteractionStrategy: function() {
		var lanternStrategy = new com_isartdigital_builder_game_sprites_buildings_interactionStrategy_LanternStrategy(this);
		var normalStrategy = new com_isartdigital_builder_game_sprites_buildings_interactionStrategy_NormalStrategy(this);
		if(this.isBuildingLantern()) this.interactionAction = $bind(lanternStrategy,lanternStrategy.lanternInteraction); else this.interactionAction = $bind(normalStrategy,normalStrategy.normalInteraction);
	}
	,isBuildingLantern: function() {
		return this.definition.name == "lanterns";
	}
	,createZSortableConfiguration: function() {
		var position = this.positionToModel(true);
		this.colMin = position.y | 0;
		this.colMax = (position.y | 0) + this.definition.size.height;
		this.rowMin = position.x | 0;
		this.rowMax = (position.x | 0) + this.definition.size.width;
	}
	,addEventSubscription: function() {
		com_isartdigital_builder_Main.getInstance().on("EVENT_MOUSE_UP",$bind(this,this.onMouseUpEvent));
	}
	,hideIfInFog: function() {
		var positionModel = this.positionToModel(true);
		var tileUnderBuilding = com_isartdigital_builder_game_map_GMap.getElementByTypeAt(positionModel,"tile");
		this.visible = tileUnderBuilding.isIlluminated;
	}
	,addToStage: function() {
		this.setState(this.DEFAULT_STATE);
		(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(this.buildingLevel * 2);
		(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).animationSpeed = 0.80;
		com_isartdigital_utils_game_GameStage.getInstance().getBuildingsContainer().addChild(this);
		this.start();
		if(this.hasHarvestableFunctionality) this.buildingHarvester.setHarvestResourceType();
	}
	,getModelInGlobalMap: function() {
		return com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getBuildingModelInGlobalMapAt(this.positionToModel(true));
	}
	,getConfig: function() {
		var buildingsSettings = com_isartdigital_utils_loader_GameLoader.getContent("json/buildingsSettings.json");
		var buildingSetting = Reflect.field(buildingsSettings,this.definition.name);
		if(buildingSetting == null) throw new js__$Boot_HaxeError(com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions.configNotFound + " | Building name : " + this.definition.name);
		if(this.isUpgradableBuilding()) buildingSetting = Reflect.field(buildingSetting,"" + (this.buildingLevel + 1));
		return buildingSetting;
	}
	,isUpgradableBuilding: function() {
		var buildingsSettings = com_isartdigital_utils_loader_GameLoader.getContent("json/buildingsSettings.json");
		var buildingSetting = Reflect.field(buildingsSettings,this.definition.name);
		if(buildingSetting == null) throw new js__$Boot_HaxeError(com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions.configNotFound);
		return Reflect.field(buildingSetting,"1") != null;
	}
	,isHarvestable: function() {
		return this.hasHarvestableFunctionality;
	}
	,select: function() {
		com_isartdigital_builder_game_sprites_buildings_BuildingUtils.unselectBuildingSelected();
		this.selectBuildingAndListenHudEvent();
	}
	,setMoveState: function() {
		this.buildingTile.setTileUnderBuildingBuildable();
		this.startFollowCursor();
	}
	,selectBuildingAndListenHudEvent: function() {
		this.setBuildingSelected();
		this.listenHudEvent();
	}
	,doActionNormal: function() {
		com_isartdigital_builder_game_sprites_SpriteObject.prototype.doActionNormal.call(this);
		var onCursorPosition;
		if(this.isHarvestable() && !this.isSelected) this.buildingHarvester.updateHarvestIconState();
		if(this.isFollowingCursor) {
			onCursorPosition = this.buildingPosition.getPositionOnCursor();
			this.buildingMover.setMousePosition(onCursorPosition);
			this.buildingMover.move();
			this.applyFilterByConstructibleState();
		}
	}
	,applyFilterByConstructibleState: function() {
		var position = this.buildingPosition.getPositionOnCursor();
		this.buildingConstructor.setDestination(position);
		if(this.buildingConstructor.canConstruct()) this.filters = com_isartdigital_utils_game_Filter.getBrightness(1.5); else this.filters = com_isartdigital_utils_game_Filter.getRed();
	}
	,upgradeBuilding: function() {
		this.buildingLevel++;
		(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(this.buildingLevel * 2 + 1);
	}
	,onMouseUpEvent: function(position) {
		var buildingModelPosition = this.positionToModel(true);
		position = com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(position);
		position.x = Math.floor(position.x);
		position.y = Math.floor(position.y);
		if(!this.canTriggerMouseUpEvent) {
			this.canTriggerMouseUpEvent = true;
			return;
		}
		if(this.isSelected) {
			this.interactionAction();
			return;
		}
		if(com_isartdigital_builder_game_map_GMap.isElementTypeAt(position,"building")) {
			var building = com_isartdigital_builder_game_map_GMap.getElementByTypeAt(position,"building");
			if(building.x == buildingModelPosition.x && building.y == buildingModelPosition.y) this.interactionAction();
		}
	}
	,listenHudEvent: function() {
		com_isartdigital_builder_Main.getInstance().on("DELETE_BUTTON",$bind(this,this.onErasable));
		com_isartdigital_builder_Main.getInstance().on("MOVE_BUTTON",$bind(this,this.onMove));
		com_isartdigital_builder_Main.getInstance().on("PAINT_BUTTON",$bind(this,this.onPaint));
		com_isartdigital_builder_Main.getInstance().on("UPGRADE_BUTTON",$bind(this,this.onUpgrade));
	}
	,forgetHudEvent: function() {
		com_isartdigital_builder_Main.getInstance().off("DELETE_BUTTON",$bind(this,this.onErasable));
		com_isartdigital_builder_Main.getInstance().off("MOVE_BUTTON",$bind(this,this.onMove));
		com_isartdigital_builder_Main.getInstance().off("PAINT_BUTTON",$bind(this,this.onPaint));
		com_isartdigital_builder_Main.getInstance().off("UPGRADE_BUTTON",$bind(this,this.onUpgrade));
	}
	,onErasable: function(event) {
		this.canTriggerMouseUpEvent = false;
		this.buildingDestructor.destruct();
	}
	,onMove: function(event) {
		this.canTriggerMouseUpEvent = false;
		this.buildingTile.setTileUnderBuildingBuildable();
		this.startFollowCursor();
	}
	,onPaint: function(event) {
		this.canTriggerMouseUpEvent = false;
		console.log("Ouvre le paneau de peinture");
	}
	,onUpgrade: function(event) {
		this.canTriggerMouseUpEvent = false;
		this.upgradeBuilding();
	}
	,startFollowCursor: function() {
		this.isFollowingCursor = true;
	}
	,stopFollowCursor: function() {
		this.isFollowingCursor = false;
	}
	,setBuildingSelected: function() {
		this.setSelectedGraphicState();
		this.emitSelectEvent();
		this.isSelected = true;
	}
	,setBuildingUnselected: function() {
		this.setUnselectedGraphicState();
		this.emitUnselectEvent();
		this.isSelected = false;
	}
	,emitSelectEvent: function() {
		this.emitSelectionEvent("SELECTED");
	}
	,emitUnselectEvent: function() {
		this.emitSelectionEvent("UNSELECTED");
	}
	,emitSelectionEvent: function(eventType) {
		var buildingEvent = { ref : this, type : this.definition.component};
		com_isartdigital_builder_Main.getInstance().emit(eventType,buildingEvent);
	}
	,setSelectedGraphicState: function() {
		(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(this.buildingLevel * 2 + 1);
	}
	,setUnselectedGraphicState: function() {
		(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(this.buildingLevel * 2);
	}
	,removeEventSubscription: function() {
		com_isartdigital_builder_Main.getInstance().off("EVENT_MOUSE_UP",$bind(this,this.onMouseUpEvent));
	}
	,remove: function() {
		this.cleanObject();
		if(!com_isartdigital_builder_game_sprites_SpriteObject.prototype.remove.call(this)) {
			this.destroy();
			return true;
		}
		return true;
	}
	,cleanObject: function() {
		if(this.isSelected) this.setBuildingUnselected();
		this.buildingHarvester.cleanObject();
		this.buildingConstructor.cleanObject();
		this.removeEventSubscription();
		this.forgetHudEvent();
		com_isartdigital_utils_game_GameStage.getInstance().getBuildingsContainer().removeChild(this);
		com_isartdigital_builder_game_sprites_buildings_Building.list.splice(HxOverrides.indexOf(com_isartdigital_builder_game_sprites_buildings_Building.list,this,0),1);
	}
	,destroy: function() {
		com_isartdigital_builder_game_sprites_SpriteObject.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_Building
});
var com_isartdigital_builder_game_sprites_buildings_BuildingConstructor = function(building) {
	this.building = building;
	this.destination = new PIXI.Point();
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingConstructor"] = com_isartdigital_builder_game_sprites_buildings_BuildingConstructor;
com_isartdigital_builder_game_sprites_buildings_BuildingConstructor.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingConstructor"];
com_isartdigital_builder_game_sprites_buildings_BuildingConstructor.prototype = {
	setDestination: function(destination) {
		this.destination = destination;
	}
	,canConstruct: function() {
		var tilesDest = com_isartdigital_builder_game_sprites_Tile.getTilesArray(this.destination,this.building.definition.size);
		return com_isartdigital_builder_game_sprites_Tile.isTilesBuildable(tilesDest);
	}
	,construct: function() {
		this.setPositionBeforeBuildingIfNull();
		this.buildingSaved = this.getBuildingSavedFromGlobalMap();
		this.updateTilesBuildableState();
		this.updateBuildingSavedReferencePositionInGlobalMap();
		this.updateBuildingSavedCoordinateInGlobalMap();
		this.updateBuildingSavedInServer();
		this.setPositionBeforeConstructWith(this.destination);
	}
	,cleanObject: function() {
		this.positionBeforeConstruct = null;
	}
	,setPositionBeforeBuildingIfNull: function() {
		if(this.positionBeforeConstruct == null) this.positionBeforeConstruct = this.building.positionToModel(true);
	}
	,getBuildingSavedFromGlobalMap: function() {
		return com_isartdigital_builder_game_map_GMap.getElementByTypeAt(this.positionBeforeConstruct,"building");
	}
	,updateTilesBuildableState: function() {
		this.setOriginTilesToConstructibleInGlobalMap();
		this.setDestinationTilesToNotConstructibleInGlobalMap();
	}
	,updateBuildingSavedReferencePositionInGlobalMap: function() {
		if(this.isFirstConstruction()) return null;
		com_isartdigital_builder_game_map_GMap.removeElementsBySizeAndTypeAt(this.positionBeforeConstruct,this.building.definition.size,"building");
		com_isartdigital_builder_game_map_GMap.addElementsBySizeAt(this.destination,this.building.definition.size,this.buildingSaved);
	}
	,updateBuildingSavedCoordinateInGlobalMap: function() {
		if(this.isFirstConstruction()) return null;
		this.buildingSaved.x = this.destination.x | 0;
		this.buildingSaved.y = this.destination.y | 0;
	}
	,setOriginTilesToConstructibleInGlobalMap: function() {
		if(this.isFirstConstruction()) return null;
		var tilesOrigin = com_isartdigital_builder_game_sprites_Tile.getTilesArray(this.positionBeforeConstruct,this.building.definition.size);
		com_isartdigital_builder_game_sprites_Tile.setTilesBuildable(tilesOrigin,true);
	}
	,setDestinationTilesToNotConstructibleInGlobalMap: function() {
		var tilesDest = com_isartdigital_builder_game_sprites_Tile.getTilesArray(this.destination,this.building.definition.size);
		com_isartdigital_builder_game_sprites_Tile.setTilesBuildable(tilesDest,false);
	}
	,updateBuildingSavedInServer: function() {
		if(this.isFirstConstruction()) return null;
		com_isartdigital_builder_api_Api.buildings.move(this.positionBeforeConstruct.x | 0,this.positionBeforeConstruct.y | 0,this.destination.x | 0,this.destination.y | 0,$bind(this,this.cbBuildingMovingResult));
	}
	,isFirstConstruction: function() {
		return this.positionBeforeConstruct.x == this.destination.x && this.positionBeforeConstruct.y == this.destination.y;
	}
	,cbBuildingMovingResult: function(results) {
		var results1 = JSON.parse(results);
		if(results1.error) {
			com_isartdigital_builder_api_Utils.errorHandler(results1.errorCode,results1.errorMessage);
			return;
		}
	}
	,setPositionBeforeConstructWith: function(newPosition) {
		this.positionBeforeConstruct.set(newPosition.x,newPosition.y);
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingConstructor
};
var com_isartdigital_builder_game_sprites_buildings_BuildingCreator = function() {
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingCreator"] = com_isartdigital_builder_game_sprites_buildings_BuildingCreator;
com_isartdigital_builder_game_sprites_buildings_BuildingCreator.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingCreator"];
com_isartdigital_builder_game_sprites_buildings_BuildingCreator.prototype = {
	listenShopBuyEvents: function() {
		com_isartdigital_builder_Main.getInstance().on("SHOP_BUY_BUILDING",$bind(this,this.onBuildingBought));
	}
	,onBuildingBought: function(buildingBuyAction) {
		var _g = this;
		var isHardBought = buildingBuyAction.hard;
		var buildingName = buildingBuyAction.buildingName;
		var buildingDef = com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getByName(buildingName);
		var building = com_isartdigital_builder_game_pooling_PoolObject.create(Type.resolveClass("com.isartdigital.builder.game.sprites.buildings.Building"));
		var buildingModelDef = com_isartdigital_builder_game_utils_TypeDefUtils.cloneObject(com_isartdigital_builder_game_utils_TypeDefUtils.buildingModelDef);
		var availablePlaceInMap;
		var cameraMoveToBuildingDelay = 1;
		this.buildingConstructor = new com_isartdigital_builder_game_sprites_buildings_BuildingConstructor(building);
		building.definition = buildingDef;
		building.x = 0;
		building.y = 0;
		availablePlaceInMap = this.getAvailablePlace();
		buildingModelDef.type = "building";
		buildingModelDef.x = availablePlaceInMap.x | 0;
		buildingModelDef.y = availablePlaceInMap.y | 0;
		buildingModelDef.buildingLevel = 0;
		buildingModelDef.name = buildingName;
		if(HxOverrides.indexOf(buildingDef.component,"COLLECTABLE",0) != -1) {
			var _this = new Date();
			buildingModelDef.last_recolt_at = HxOverrides.dateStr(_this);
		}
		if(com_isartdigital_builder_game_map_GMap.isPositionExistAt(new PIXI.Point(buildingModelDef.x,buildingModelDef.y),com_isartdigital_builder_game_map_GMap.globalMap)) com_isartdigital_builder_game_map_GMap.addElementsBySizeAt(new PIXI.Point(buildingModelDef.x,buildingModelDef.y),buildingDef.size,buildingModelDef);
		building.init(buildingModelDef);
		com_isartdigital_builder_api_Api.buildings.create(buildingName,buildingModelDef.x,buildingModelDef.y,isHardBought,$bind(this,this.cbOnBuildingCreated));
		motion_Actuate.tween(com_isartdigital_utils_game_Camera.getInstance().cameraFocus,cameraMoveToBuildingDelay,{ x : building.position.x, y : building.position.y}).ease(motion_easing_Cubic.get_easeInOut());
		haxe_Timer.delay(function() {
			_g.setMovingStateTo(buildingModelDef);
		},cameraMoveToBuildingDelay * 1000);
	}
	,getAvailablePlace: function() {
		var _g1 = 0;
		var _g = com_isartdigital_utils_Config.mapSize;
		while(_g1 < _g) {
			var x = _g1++;
			var _g3 = 0;
			var _g2 = com_isartdigital_utils_Config.mapSize;
			while(_g3 < _g2) {
				var y = _g3++;
				this.buildingConstructor.setDestination(new PIXI.Point(x,y));
				if(this.buildingConstructor.canConstruct()) return new PIXI.Point(x,y);
			}
		}
		return new PIXI.Point();
	}
	,setMovingStateTo: function(buildingModelDef) {
		var _g1 = 0;
		var _g = com_isartdigital_builder_game_sprites_buildings_Building.list.length;
		while(_g1 < _g) {
			var i = _g1++;
			var buildingToTestPosition = com_isartdigital_builder_game_sprites_buildings_Building.list[i].positionToModel(true);
			if(buildingToTestPosition.x == buildingModelDef.x && buildingToTestPosition.y == buildingModelDef.y) {
				com_isartdigital_builder_game_sprites_buildings_Building.list[i].select();
				com_isartdigital_builder_game_sprites_buildings_Building.list[i].setMoveState();
			}
		}
	}
	,cbOnBuildingCreated: function(results) {
		var results1 = JSON.parse(results);
		if(results1.error) {
			com_isartdigital_builder_api_Utils.errorHandler(results1.errorCode,results1.errorMessage);
			return;
		}
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingCreator
};
var com_isartdigital_builder_game_sprites_buildings_BuildingDefinition = function() {
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingDefinition"] = com_isartdigital_builder_game_sprites_buildings_BuildingDefinition;
com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingDefinition"];
com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getByName = function(name) {
	var buildingDefinitions;
	com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.setDefinitionName(name);
	buildingDefinitions = com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getTypedBuildingDefinitions();
	return com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getBuildingDefinitionInto(buildingDefinitions);
};
com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getBuildingModelInGlobalMapAt = function(position) {
	return com_isartdigital_builder_game_map_GMap.getElementByTypeAt(position,"building");
};
com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.setDefinitionName = function(pDefinitionName) {
	com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.definitionName = pDefinitionName;
};
com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getTypedBuildingDefinitions = function() {
	return com_isartdigital_utils_loader_GameLoader.getContent("json/building.json");
};
com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getBuildingDefinitionInto = function(buildingDefinitions) {
	var _g1 = 0;
	var _g = buildingDefinitions.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(buildingDefinitions[i].name == com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.definitionName) return buildingDefinitions[i];
	}
	throw new js__$Boot_HaxeError("Definition not found in json");
};
com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.prototype = {
	__class__: com_isartdigital_builder_game_sprites_buildings_BuildingDefinition
};
var com_isartdigital_builder_game_sprites_buildings_BuildingDestructor = function(building) {
	this.building = building;
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingDestructor"] = com_isartdigital_builder_game_sprites_buildings_BuildingDestructor;
com_isartdigital_builder_game_sprites_buildings_BuildingDestructor.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingDestructor"];
com_isartdigital_builder_game_sprites_buildings_BuildingDestructor.prototype = {
	destruct: function() {
		this.removeBuildingFromGlobalMap();
		this.callServerToDestroy();
	}
	,removeBuildingFromGlobalMap: function() {
		com_isartdigital_builder_game_map_GMap.removeElementsBySizeAndTypeAt(this.building.positionToModel(true),this.building.definition.size,"building");
	}
	,callServerToDestroy: function() {
		var modelPosistion = this.building.positionToModel(true);
		com_isartdigital_builder_api_Api.buildings.destroy(modelPosistion.x | 0,modelPosistion.y | 0,$bind(this,this.cbTryToDestroy));
	}
	,cbTryToDestroy: function(pResponse) {
		var lResponse = JSON.parse(pResponse);
		if(!lResponse.error) this.building.remove();
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingDestructor
};
var com_isartdigital_builder_game_sprites_buildings_BuildingHarvester = function(building) {
	this.timeBeforeChangeDirection = 1000;
	this.oscillationOffset = 15;
	this.oscillationCurveType = motion_easing_Cubic.get_easeInOut();
	this.building = building;
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingHarvester"] = com_isartdigital_builder_game_sprites_buildings_BuildingHarvester;
com_isartdigital_builder_game_sprites_buildings_BuildingHarvester.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingHarvester"];
com_isartdigital_builder_game_sprites_buildings_BuildingHarvester.prototype = {
	updateHarvestIconState: function() {
		this.throwExceptionIfBuildingHaventHarvestFunctionality();
		if(this.canHarvest()) this.icon.visible = true; else this.icon.visible = false;
	}
	,isBuildingHasHarvestFunctionality: function() {
		var buildingModel = this.building.getModelInGlobalMap();
		return buildingModel.last_recolt_at != null;
	}
	,setHarvestResourceType: function() {
		var buildingConfig = this.building.getConfig();
		var resourceType = "";
		if(Reflect.field(buildingConfig,"resource_price") == "gold") resourceType = "HarvestPesos"; else resourceType = "HarvestOffering";
		if(this.icon != null) {
			if(this.icon.parent != null) this.icon.parent.removeChild(this.icon);
		}
		this.icon = new com_isartdigital_utils_game_StateGraphic(resourceType);
		var lPoint = this.getSize();
		this.iconPosition = new PIXI.Point(-50,-(lPoint.y / 2) - 300);
		this.building.addChild(this.icon);
		this.icon.position.set(this.iconPosition.x,this.iconPosition.y);
		this.goUp();
	}
	,getPercentFilled: function() {
		this.throwExceptionIfBuildingHaventHarvestFunctionality();
		var buildingConfig = this.building.getConfig();
		var buildingLastRecolt;
		var s = this.building.getModelInGlobalMap().last_recolt_at;
		buildingLastRecolt = HxOverrides.strDate(s);
		var percentFilledPerHours = buildingConfig.production / buildingConfig.capacity;
		var millisecondsElapsedSinceLastRecolt = new Date().getTime() - buildingLastRecolt.getTime();
		var hoursElapsedSinceLastRecolt = millisecondsElapsedSinceLastRecolt / 3600000;
		var percentFilled = percentFilledPerHours * hoursElapsedSinceLastRecolt;
		if(percentFilled > 1) percentFilled = 1; else percentFilled = percentFilled;
		return percentFilled;
	}
	,canHarvest: function() {
		this.throwExceptionIfBuildingHaventHarvestFunctionality();
		return this.getPercentFilled() > 0.0005;
	}
	,harvest: function() {
		this.throwExceptionIfBuildingHaventHarvestFunctionality();
		this.addHarvestingResource();
		this.updateLastRecoltDate();
		this.updateResourceInServer();
	}
	,cleanObject: function() {
		if(this.icon != null) this.icon.parent.removeChild(this.icon);
	}
	,getSize: function() {
		return new PIXI.Point(_$UInt_UInt_$Impl_$.toFloat(this.building.definition.size.width * com_isartdigital_utils_Config.tileWidth),_$UInt_UInt_$Impl_$.toFloat(this.building.definition.size.height * com_isartdigital_utils_Config.tileHeight));
	}
	,addHarvestingResource: function() {
		var buildingConfig = this.building.getConfig();
		var percentFilled = this.getPercentFilled();
		var position = this.building.positionToModel(true);
		com_isartdigital_builder_game_manager_RessourceManager.getInstance().addRessources(buildingConfig.resource_production,Math.ceil(percentFilled * buildingConfig.capacity));
	}
	,updateLastRecoltDate: function() {
		var _this = new Date();
		this.building.getModelInGlobalMap().last_recolt_at = HxOverrides.dateStr(_this);
	}
	,updateResourceInServer: function() {
		var position = this.building.positionToModel(true);
		com_isartdigital_builder_api_Api.buildings.collect(position.x | 0,position.y | 0,$bind(this,this.cbBuildingHarvested));
	}
	,cbBuildingHarvested: function(results) {
		var results1 = JSON.parse(results);
		if(results1.error) {
			com_isartdigital_builder_api_Utils.errorHandler(results1.errorCode,results1.errorMessage);
			return;
		}
	}
	,throwExceptionIfBuildingHaventHarvestFunctionality: function() {
		if(!this.isBuildingHasHarvestFunctionality()) throw new js__$Boot_HaxeError(com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions.noHarvestFunctionality);
	}
	,goDown: function() {
		var _g = this;
		haxe_Timer.delay(function() {
			motion_Actuate.tween(_g.icon.position,_g.timeBeforeChangeDirection / 1000,{ y : _g.iconPosition.y + _g.oscillationOffset}).ease(_g.oscillationCurveType);
			_g.goUp();
		},this.timeBeforeChangeDirection);
	}
	,goUp: function() {
		var _g = this;
		haxe_Timer.delay(function() {
			motion_Actuate.tween(_g.icon.position,_g.timeBeforeChangeDirection / 1000,{ y : _g.iconPosition.y - _g.oscillationOffset}).ease(_g.oscillationCurveType);
			_g.goDown();
		},this.timeBeforeChangeDirection);
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingHarvester
};
var com_isartdigital_builder_game_sprites_buildings_BuildingMover = function(building) {
	this.building = building;
	this.definition = building.definition;
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingMover"] = com_isartdigital_builder_game_sprites_buildings_BuildingMover;
com_isartdigital_builder_game_sprites_buildings_BuildingMover.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingMover"];
com_isartdigital_builder_game_sprites_buildings_BuildingMover.prototype = {
	move: function() {
		var centerOfBuildingModel;
		if(this.mousePosition == null) this.mousePositionNullException();
		centerOfBuildingModel = this.mousePosition;
		centerOfBuildingModel.x = Math.round(centerOfBuildingModel.x);
		centerOfBuildingModel.y = Math.round(centerOfBuildingModel.y);
		this.building.position = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(centerOfBuildingModel);
	}
	,setMousePosition: function(mousePosition) {
		this.mousePosition = mousePosition;
	}
	,mousePositionNullException: function() {
		throw new js__$Boot_HaxeError("Mouse position must be setted");
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingMover
};
var com_isartdigital_builder_game_sprites_buildings_BuildingPosition = function(building) {
	this.building = building;
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingPosition"] = com_isartdigital_builder_game_sprites_buildings_BuildingPosition;
com_isartdigital_builder_game_sprites_buildings_BuildingPosition.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingPosition"];
com_isartdigital_builder_game_sprites_buildings_BuildingPosition.prototype = {
	getPositionOnCursor: function() {
		var buildingOffset = this.getBuildingOffset();
		var centerOfBuilding = this.getMousePositionWith(buildingOffset);
		return com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(centerOfBuilding);
	}
	,getBuildingOffset: function() {
		var buildingOffset = new PIXI.Point();
		buildingOffset.x = (this.building.definition.size.width - this.building.definition.size.height) / 2 * (_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileWidth) / _$UInt_UInt_$Impl_$.toFloat(4));
		buildingOffset.y = (this.building.definition.size.width + this.building.definition.size.height) / 2 * (_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight) / _$UInt_UInt_$Impl_$.toFloat(4));
		return buildingOffset;
	}
	,getMousePositionWith: function(buildingOffset) {
		var centerOfBuilding = new PIXI.Point();
		var mousePosition = com_isartdigital_builder_game_GameManager.getInstance().mousePosition;
		centerOfBuilding.x = mousePosition.x + buildingOffset.x;
		centerOfBuilding.y = mousePosition.y + buildingOffset.y;
		return centerOfBuilding;
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingPosition
};
var com_isartdigital_builder_game_sprites_buildings_BuildingTile = function(building) {
	this.building = building;
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingTile"] = com_isartdigital_builder_game_sprites_buildings_BuildingTile;
com_isartdigital_builder_game_sprites_buildings_BuildingTile.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingTile"];
com_isartdigital_builder_game_sprites_buildings_BuildingTile.prototype = {
	setTileUnderBuildingBuildable: function() {
		this.changeTileUnderBuildingBuildableStateTo(true);
	}
	,setTileUnderBuildingNotBuildable: function() {
		this.changeTileUnderBuildingBuildableStateTo(false);
	}
	,changeTileUnderBuildingBuildableStateTo: function(buildableState) {
		var tilesUnderBuilding;
		var positionToModel = this.building.positionToModel(true);
		tilesUnderBuilding = com_isartdigital_builder_game_sprites_Tile.getTilesArray(positionToModel,this.building.definition.size);
		com_isartdigital_builder_game_sprites_Tile.setTilesBuildable(tilesUnderBuilding,buildableState);
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingTile
};
var com_isartdigital_builder_game_sprites_buildings_BuildingUtils = function() { };
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingUtils"] = com_isartdigital_builder_game_sprites_buildings_BuildingUtils;
com_isartdigital_builder_game_sprites_buildings_BuildingUtils.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingUtils"];
com_isartdigital_builder_game_sprites_buildings_BuildingUtils.unselectBuildingSelected = function() {
	var building;
	var buildings = com_isartdigital_builder_game_sprites_buildings_Building.list;
	var _g1 = 0;
	var _g = buildings.length;
	while(_g1 < _g) {
		var i = _g1++;
		building = buildings[i];
		if(building.isSelected) {
			building.setBuildingUnselected();
			building.forgetHudEvent();
		}
	}
};
com_isartdigital_builder_game_sprites_buildings_BuildingUtils.thereIsOtherBuildingMovingThan = function(buildingSource) {
	var building;
	var buildings = com_isartdigital_builder_game_sprites_buildings_Building.list;
	var _g1 = 0;
	var _g = buildings.length;
	while(_g1 < _g) {
		var i = _g1++;
		building = buildings[i];
		if(building.isFollowingCursor && building != buildingSource) return true;
	}
	return false;
};
com_isartdigital_builder_game_sprites_buildings_BuildingUtils.isBuildingOriginInGlobalMapAt = function(position) {
	var building = com_isartdigital_builder_game_map_GMap.getElementByTypeAt(position,"building");
	return (building.x | 0) == (position.x | 0) && (building.y | 0) == (position.y | 0);
};
var com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents = function() { };
$hxClasses["com.isartdigital.builder.game.sprites.buildings.const.BuildingComponents"] = com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents;
com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents.__name__ = ["com","isartdigital","builder","game","sprites","buildings","const","BuildingComponents"];
var com_isartdigital_builder_game_sprites_buildings_const_BuildingEvents = function() { };
$hxClasses["com.isartdigital.builder.game.sprites.buildings.const.BuildingEvents"] = com_isartdigital_builder_game_sprites_buildings_const_BuildingEvents;
com_isartdigital_builder_game_sprites_buildings_const_BuildingEvents.__name__ = ["com","isartdigital","builder","game","sprites","buildings","const","BuildingEvents"];
var com_isartdigital_builder_game_sprites_buildings_const_BuildingNames = function() { };
$hxClasses["com.isartdigital.builder.game.sprites.buildings.const.BuildingNames"] = com_isartdigital_builder_game_sprites_buildings_const_BuildingNames;
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.__name__ = ["com","isartdigital","builder","game","sprites","buildings","const","BuildingNames"];
var com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions = function() { };
$hxClasses["com.isartdigital.builder.game.sprites.buildings.exceptions.BuildingExceptions"] = com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions;
com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions.__name__ = ["com","isartdigital","builder","game","sprites","buildings","exceptions","BuildingExceptions"];
var com_isartdigital_builder_game_sprites_buildings_interactionStrategy_LanternStrategy = function(building) {
	com_isartdigital_builder_game_sprites_buildings_Building.call(this);
	this.lantern = building;
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.interactionStrategy.LanternStrategy"] = com_isartdigital_builder_game_sprites_buildings_interactionStrategy_LanternStrategy;
com_isartdigital_builder_game_sprites_buildings_interactionStrategy_LanternStrategy.__name__ = ["com","isartdigital","builder","game","sprites","buildings","interactionStrategy","LanternStrategy"];
com_isartdigital_builder_game_sprites_buildings_interactionStrategy_LanternStrategy.__super__ = com_isartdigital_builder_game_sprites_buildings_Building;
com_isartdigital_builder_game_sprites_buildings_interactionStrategy_LanternStrategy.prototype = $extend(com_isartdigital_builder_game_sprites_buildings_Building.prototype,{
	lanternInteraction: function() {
		if(this.isLanternAlreadyIlluminated()) return;
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_LANTERNCONFIRM");
		this.listenBuyEvent();
	}
	,isLanternAlreadyIlluminated: function() {
		return this.lantern.buildingLevel == 1;
	}
	,listenBuyEvent: function() {
		com_isartdigital_builder_Main.getInstance().on(com_isartdigital_builder_ui_popin_LanternConfirm.BUYSOFT,$bind(this,this.onBuySoft));
		com_isartdigital_builder_Main.getInstance().on(com_isartdigital_builder_ui_popin_LanternConfirm.BUYHARD,$bind(this,this.onBuyHard));
	}
	,forgetBuyEvent: function() {
		com_isartdigital_builder_Main.getInstance().off(com_isartdigital_builder_ui_popin_LanternConfirm.BUYSOFT,$bind(this,this.onBuySoft));
		com_isartdigital_builder_Main.getInstance().off(com_isartdigital_builder_ui_popin_LanternConfirm.BUYHARD,$bind(this,this.onBuyHard));
	}
	,onBuyHard: function(e) {
		this.buyWith("hard");
	}
	,onBuySoft: function(e) {
		this.buyWith("soft");
	}
	,buyWith: function(currency) {
		var buildingPosition = this.lantern.positionToModel(true);
		var isHardPurchasing = currency == "hard";
		if(isHardPurchasing) this.setHardAmountToSpend(); else this.setNormalAmountToSpend();
		if(this.thereIsEnoughtResources()) {
			this.lantern.upgradeBuilding();
			this.lantern.setUnselectedGraphicState();
			com_isartdigital_builder_game_sprites_Tile.illumineTileInRadiusAt(buildingPosition,com_isartdigital_builder_game_sprites_Tile.getLanternActionRadius());
			com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources(this.ressourceTypeToSpend,this.ressourceAmountToSpend);
			com_isartdigital_builder_api_Api.lanterns.create(buildingPosition.x | 0,buildingPosition.y | 0,isHardPurchasing,$bind(this,this.cbOnLanternBought));
		} else {
		}
		this.forgetBuyEvent();
	}
	,getTotalIlluminatedLanterns: function() {
		return com_isartdigital_services_Users.infos.lanterns.length;
	}
	,setHardAmountToSpend: function() {
		var lanternConfig = this.lantern.getConfig();
		this.ressourceTypeToSpend = "spice";
		this.ressourceAmountToSpend = lanternConfig.hard_price * this.getTotalIlluminatedLanterns() + lanternConfig.base_hard_price;
	}
	,setNormalAmountToSpend: function() {
		var lanternConfig = this.lantern.getConfig();
		this.ressourceTypeToSpend = "gold";
		this.ressourceAmountToSpend = lanternConfig.price * this.getTotalIlluminatedLanterns() + lanternConfig.base_price;
	}
	,thereIsEnoughtResources: function() {
		return com_isartdigital_builder_game_manager_RessourceManager.getInstance().getRessources(this.ressourceTypeToSpend) > this.ressourceAmountToSpend;
	}
	,cbOnLanternBought: function(results) {
		var results1 = JSON.parse(results);
		if(results1.error) {
			com_isartdigital_builder_api_Utils.errorHandler(results1.errorCode,results1.errorMessage);
			return;
		}
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_interactionStrategy_LanternStrategy
});
var com_isartdigital_builder_game_sprites_buildings_interactionStrategy_NormalStrategy = function(building) {
	com_isartdigital_builder_game_sprites_buildings_Building.call(this);
	this.building = building;
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.interactionStrategy.NormalStrategy"] = com_isartdigital_builder_game_sprites_buildings_interactionStrategy_NormalStrategy;
com_isartdigital_builder_game_sprites_buildings_interactionStrategy_NormalStrategy.__name__ = ["com","isartdigital","builder","game","sprites","buildings","interactionStrategy","NormalStrategy"];
com_isartdigital_builder_game_sprites_buildings_interactionStrategy_NormalStrategy.__super__ = com_isartdigital_builder_game_sprites_buildings_Building;
com_isartdigital_builder_game_sprites_buildings_interactionStrategy_NormalStrategy.prototype = $extend(com_isartdigital_builder_game_sprites_buildings_Building.prototype,{
	normalInteraction: function() {
		if(this.cameraIsMoving()) return;
		if(this.canRequestConstruction()) this.constructBuildingAtMousePosition(); else if(this.canHarvest()) this.building.buildingHarvester.harvest(); else if(this.canSelectBuilding()) this.building.select(); else if(this.canUnselectBuilding()) com_isartdigital_builder_game_sprites_buildings_BuildingUtils.unselectBuildingSelected();
	}
	,cameraIsMoving: function() {
		return com_isartdigital_utils_game_Camera.getInstance().asMoved;
	}
	,canRequestConstruction: function() {
		return this.building.isFollowingCursor && !com_isartdigital_utils_game_Camera.getInstance().asMoved;
	}
	,constructBuildingAtMousePosition: function() {
		var destination = this.building.buildingPosition.getPositionOnCursor();
		this.building.buildingConstructor.setDestination(destination);
		if(this.building.buildingConstructor.canConstruct()) {
			this.building.buildingConstructor.construct();
			this.building.stopFollowCursor();
			this.building.filters = null;
		}
	}
	,canHarvest: function() {
		if(this.building.buildingHarvester.isBuildingHasHarvestFunctionality()) return this.building.buildingHarvester.canHarvest(); else return false;
	}
	,canSelectBuilding: function() {
		return !com_isartdigital_builder_game_sprites_buildings_BuildingUtils.thereIsOtherBuildingMovingThan(this.building) && !this.building.isSelected;
	}
	,canUnselectBuilding: function() {
		return this.building.isSelected;
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_interactionStrategy_NormalStrategy
});
var com_isartdigital_builder_game_type_JsonNames = function() { };
$hxClasses["com.isartdigital.builder.game.type.JsonNames"] = com_isartdigital_builder_game_type_JsonNames;
com_isartdigital_builder_game_type_JsonNames.__name__ = ["com","isartdigital","builder","game","type","JsonNames"];
var com_isartdigital_builder_game_type_ModelElementNames = function() { };
$hxClasses["com.isartdigital.builder.game.type.ModelElementNames"] = com_isartdigital_builder_game_type_ModelElementNames;
com_isartdigital_builder_game_type_ModelElementNames.__name__ = ["com","isartdigital","builder","game","type","ModelElementNames"];
var com_isartdigital_builder_game_utils_CameraUtils = function() {
};
$hxClasses["com.isartdigital.builder.game.utils.CameraUtils"] = com_isartdigital_builder_game_utils_CameraUtils;
com_isartdigital_builder_game_utils_CameraUtils.__name__ = ["com","isartdigital","builder","game","utils","CameraUtils"];
com_isartdigital_builder_game_utils_CameraUtils.ScreenLeft = function() {
	return com_isartdigital_builder_game_GameManager.getInstance().get_ScreenRect().x;
};
com_isartdigital_builder_game_utils_CameraUtils.ScreenRight = function() {
	return com_isartdigital_builder_game_GameManager.getInstance().get_ScreenRect().x + com_isartdigital_builder_game_GameManager.getInstance().get_ScreenRect().width;
};
com_isartdigital_builder_game_utils_CameraUtils.ScreenTop = function() {
	return com_isartdigital_builder_game_GameManager.getInstance().get_ScreenRect().y;
};
com_isartdigital_builder_game_utils_CameraUtils.ScreenBottom = function() {
	return com_isartdigital_builder_game_GameManager.getInstance().get_ScreenRect().y + com_isartdigital_builder_game_GameManager.getInstance().get_ScreenRect().height;
};
com_isartdigital_builder_game_utils_CameraUtils.prototype = {
	__class__: com_isartdigital_builder_game_utils_CameraUtils
};
var com_isartdigital_builder_game_utils_TypeDefUtils = function() {
};
$hxClasses["com.isartdigital.builder.game.utils.TypeDefUtils"] = com_isartdigital_builder_game_utils_TypeDefUtils;
com_isartdigital_builder_game_utils_TypeDefUtils.__name__ = ["com","isartdigital","builder","game","utils","TypeDefUtils"];
com_isartdigital_builder_game_utils_TypeDefUtils.getValue = function(pTypeDef) {
	if(Object.prototype.hasOwnProperty.call(pTypeDef,"x")) console.log("he got");
	return null;
};
com_isartdigital_builder_game_utils_TypeDefUtils.compare = function(pType1,pType2) {
	var lArray1 = Reflect.fields(pType1);
	var lArray2 = Reflect.fields(pType2);
	if(lArray1.length != lArray2.length) return false;
	var _g = 0;
	while(_g < lArray1.length) {
		var lString = lArray1[_g];
		++_g;
		if(HxOverrides.indexOf(lArray2,lString,0) < 0) return false;
	}
	return true;
};
com_isartdigital_builder_game_utils_TypeDefUtils.cloneObject = function(objectToClone) {
	return JSON.parse(JSON.stringify(objectToClone));
};
com_isartdigital_builder_game_utils_TypeDefUtils.prototype = {
	__class__: com_isartdigital_builder_game_utils_TypeDefUtils
};
var com_isartdigital_builder_ui_CheatPanel = function() {
	this.init();
};
$hxClasses["com.isartdigital.builder.ui.CheatPanel"] = com_isartdigital_builder_ui_CheatPanel;
com_isartdigital_builder_ui_CheatPanel.__name__ = ["com","isartdigital","builder","ui","CheatPanel"];
com_isartdigital_builder_ui_CheatPanel.getInstance = function() {
	if(com_isartdigital_builder_ui_CheatPanel.instance == null) com_isartdigital_builder_ui_CheatPanel.instance = new com_isartdigital_builder_ui_CheatPanel();
	return com_isartdigital_builder_ui_CheatPanel.instance;
};
com_isartdigital_builder_ui_CheatPanel.prototype = {
	init: function() {
		if(com_isartdigital_utils_Config.get_debug() && com_isartdigital_utils_Config.get_data().cheat) this.gui = new dat.gui.GUI();
	}
	,ingame: function() {
		if(this.gui == null) return;
		var userReset = this.gui.addFolder("AccountDestroyer");
		userReset.add({ destroyAccount : function() {
			com_isartdigital_builder_api_Api.user.destroy(function(result) {
				window.location.reload();
			});
		}},"destroyAccount");
	}
	,clear: function() {
		if(this.gui == null) return;
		this.gui.destroy();
		this.init();
	}
	,destroy: function() {
		com_isartdigital_builder_ui_CheatPanel.instance = null;
	}
	,__class__: com_isartdigital_builder_ui_CheatPanel
};
var com_isartdigital_utils_ui_UIComponent = function() {
	this.modalImage = "assets/alpha_bg.png";
	this._modal = true;
	this.positionables = [];
	com_isartdigital_utils_game_GameObject.call(this);
};
$hxClasses["com.isartdigital.utils.ui.UIComponent"] = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_utils_ui_UIComponent.__name__ = ["com","isartdigital","utils","ui","UIComponent"];
com_isartdigital_utils_ui_UIComponent.__super__ = com_isartdigital_utils_game_GameObject;
com_isartdigital_utils_ui_UIComponent.prototype = $extend(com_isartdigital_utils_game_GameObject.prototype,{
	build: function() {
		var lClassName = Type.getClassName(js_Boot.getClass(this));
		lClassName = lClassName.substring(lClassName.lastIndexOf(".") + 1);
		var lItems = com_isartdigital_utils_ui_UIBuilder.build(lClassName);
		console.log("number items :" + lItems.length + " class name : " + lClassName);
		this.addChildItems(lItems);
	}
	,addChildItems: function(pItems) {
		var _g = 0;
		while(_g < pItems.length) {
			var lItem = pItems[_g];
			++_g;
			this.addChild(lItem.item);
			if(lItem.align != "") this.positionables.push(lItem);
		}
	}
	,addChildItem: function(pItems) {
		var _g = 0;
		while(_g < pItems.length) {
			var lItem = pItems[_g];
			++_g;
			this.addChild(lItem.item);
			if(lItem.align != "") this.positionables.push(lItem);
		}
	}
	,open: function() {
		if(this.isOpened) return;
		this.isOpened = true;
		this.set_modal(this._modal);
		com_isartdigital_utils_game_GameStage.getInstance().on("resize",$bind(this,this.onResize));
		this.onResize();
	}
	,get_modal: function() {
		return this._modal;
	}
	,set_modal: function(pModal) {
		this._modal = pModal;
		if(this._modal) {
			if(this.modalZone == null) {
				this.modalZone = new PIXI.Sprite(PIXI.Texture.fromImage(this.modalImage));
				this.modalZone.interactive = true;
				this.modalZone.on("click",$bind(this,this.stopPropagation));
				this.modalZone.on("tap",$bind(this,this.stopPropagation));
				this.positionables.unshift({ item : this.modalZone, align : "fitScreen", offsetX : 0, offsetY : 0});
			}
			if(this.parent != null) this.parent.addChildAt(this.modalZone,this.parent.getChildIndex(this));
		} else if(this.modalZone != null) {
			if(this.modalZone.parent != null) this.modalZone.parent.removeChild(this.modalZone);
			this.modalZone.off("click",$bind(this,this.stopPropagation));
			this.modalZone.off("tap",$bind(this,this.stopPropagation));
			this.modalZone = null;
			if(this.positionables[0].item == this.modalZone) this.positionables.shift();
		}
		return this._modal;
	}
	,stopPropagation: function(pEvent) {
	}
	,close: function() {
		if(!this.isOpened) return;
		this.isOpened = false;
		this.set_modal(false);
		this.destroy();
	}
	,onResize: function(pEvent) {
		var _g = 0;
		var _g1 = this.positionables;
		while(_g < _g1.length) {
			var lObj = _g1[_g];
			++_g;
			if(lObj.update) {
				if(lObj.align == "top" || lObj.align == "topLeft" || lObj.align == "topRight") lObj.offsetY = this.parent.y + lObj.item.y; else if(lObj.align == "bottom" || lObj.align == "bottomLeft" || lObj.align == "bottomRight") lObj.offsetY = com_isartdigital_utils_game_GameStage.getInstance().get_safeZone().height - this.parent.y - lObj.item.y;
				if(lObj.align == "left" || lObj.align == "topLeft" || lObj.align == "bottomLeft") lObj.offsetX = this.parent.x + lObj.item.x; else if(lObj.align == "right" || lObj.align == "topRight" || lObj.align == "bottomRight") lObj.offsetX = com_isartdigital_utils_game_GameStage.getInstance().get_safeZone().width - this.parent.x - lObj.item.x;
				lObj.update = false;
			}
			com_isartdigital_utils_ui_UIPosition.setPosition(lObj.item,lObj.align,lObj.offsetX,lObj.offsetY);
		}
	}
	,destroy: function() {
		this.close();
		com_isartdigital_utils_game_GameStage.getInstance().off("resize",$bind(this,this.onResize));
		com_isartdigital_utils_game_GameObject.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_utils_ui_UIComponent
	,__properties__: {set_modal:"set_modal",get_modal:"get_modal"}
});
var com_isartdigital_utils_ui_Screen = function() {
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.modalImage = "assets/black_bg.png";
};
$hxClasses["com.isartdigital.utils.ui.Screen"] = com_isartdigital_utils_ui_Screen;
com_isartdigital_utils_ui_Screen.__name__ = ["com","isartdigital","utils","ui","Screen"];
com_isartdigital_utils_ui_Screen.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_utils_ui_Screen.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	__class__: com_isartdigital_utils_ui_Screen
});
var com_isartdigital_builder_ui_GraphicLoader = function() {
	com_isartdigital_utils_ui_Screen.call(this);
	var lBg = new PIXI.Sprite(PIXI.Texture.fromImage(com_isartdigital_utils_Config.get_assetsPath() + "preload_bg.png"));
	lBg.anchor.set(0.5,0.5);
	this.addChild(lBg);
	this.loaderBar = new PIXI.Sprite(PIXI.Texture.fromImage(com_isartdigital_utils_Config.get_assetsPath() + "preload.png"));
	this.loaderBar.anchor.y = 0.5;
	this.loaderBar.x = -this.loaderBar.width / 2;
	this.addChild(this.loaderBar);
	this.loaderBar.scale.x = 0;
};
$hxClasses["com.isartdigital.builder.ui.GraphicLoader"] = com_isartdigital_builder_ui_GraphicLoader;
com_isartdigital_builder_ui_GraphicLoader.__name__ = ["com","isartdigital","builder","ui","GraphicLoader"];
com_isartdigital_builder_ui_GraphicLoader.getInstance = function() {
	if(com_isartdigital_builder_ui_GraphicLoader.instance == null) com_isartdigital_builder_ui_GraphicLoader.instance = new com_isartdigital_builder_ui_GraphicLoader();
	return com_isartdigital_builder_ui_GraphicLoader.instance;
};
com_isartdigital_builder_ui_GraphicLoader.__super__ = com_isartdigital_utils_ui_Screen;
com_isartdigital_builder_ui_GraphicLoader.prototype = $extend(com_isartdigital_utils_ui_Screen.prototype,{
	update: function(pProgress) {
		this.loaderBar.scale.x = pProgress;
	}
	,destroy: function() {
		com_isartdigital_builder_ui_GraphicLoader.instance = null;
		com_isartdigital_utils_ui_Screen.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_GraphicLoader
});
var com_isartdigital_builder_ui_UIManager = function() {
	EventEmitter.call(this);
	this.popins = [];
	this.listenUIEvent();
};
$hxClasses["com.isartdigital.builder.ui.UIManager"] = com_isartdigital_builder_ui_UIManager;
com_isartdigital_builder_ui_UIManager.__name__ = ["com","isartdigital","builder","ui","UIManager"];
com_isartdigital_builder_ui_UIManager.getInstance = function() {
	if(com_isartdigital_builder_ui_UIManager.instance == null) com_isartdigital_builder_ui_UIManager.instance = new com_isartdigital_builder_ui_UIManager();
	return com_isartdigital_builder_ui_UIManager.instance;
};
com_isartdigital_builder_ui_UIManager.__super__ = EventEmitter;
com_isartdigital_builder_ui_UIManager.prototype = $extend(EventEmitter.prototype,{
	openScreen: function(pScreen) {
		this.closeScreens();
		com_isartdigital_utils_game_GameStage.getInstance().getScreensContainer().addChild(pScreen);
		pScreen.open();
	}
	,closeScreens: function() {
		var lContainer = com_isartdigital_utils_game_GameStage.getInstance().getScreensContainer();
		while(lContainer.children.length > 0) {
			var lCurrent;
			lCurrent = js_Boot.__cast(lContainer.getChildAt(lContainer.children.length - 1) , com_isartdigital_utils_ui_Screen);
			lCurrent.interactive = false;
			lContainer.removeChild(lCurrent);
			lCurrent.close();
		}
	}
	,openPopin: function(pPopin) {
		if(this.thereIsPopinOpen()) this.closeCurrentPopin();
		this.popins.push(pPopin);
		com_isartdigital_utils_game_GameStage.getInstance().getPopinsContainer().addChild(pPopin);
		pPopin.open();
	}
	,thereIsPopinOpen: function() {
		return this.popins.length >= 1;
	}
	,closeCurrentPopin: function() {
		if(this.popins.length == 0) return;
		var lCurrent = this.popins.pop();
		lCurrent.interactive = false;
		com_isartdigital_utils_game_GameStage.getInstance().getPopinsContainer().removeChild(lCurrent);
		lCurrent.close();
	}
	,openHud: function() {
		com_isartdigital_utils_game_GameStage.getInstance().getHudContainer().addChild(com_isartdigital_builder_ui_hud_Hud.getInstance());
		com_isartdigital_builder_ui_hud_Hud.getInstance().open();
	}
	,closeHud: function() {
		com_isartdigital_utils_game_GameStage.getInstance().getHudContainer().removeChild(com_isartdigital_builder_ui_hud_Hud.getInstance());
		com_isartdigital_builder_ui_hud_Hud.getInstance().close();
	}
	,startGame: function() {
		this.closeScreens();
		this.openHud();
	}
	,onClosePopin: function(params) {
		this.closeCurrentPopin();
	}
	,onRequestLanternConfirm: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_LanternConfirm());
	}
	,onRequestMainBuildingInfo: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_MainBuildingInfo());
	}
	,onRequestParadeConfirm: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_ParadeConfirm());
	}
	,onRequestParadeReward: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_ParadeReward());
	}
	,onRequestShop: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_Shop());
	}
	,onRequestUpgradeReward: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_UpgradeReward());
	}
	,listenUIEvent: function() {
		this.on("CLOSE_POPIN_REQUEST",$bind(this,this.onClosePopin));
		this.on("OPEN_POPIN_REQUEST_LANTERNCONFIRM",$bind(this,this.onRequestLanternConfirm));
		this.on("OPEN_POPIN_REQUEST_MAINBUILDINGINFO",$bind(this,this.onRequestMainBuildingInfo));
		this.on("OPEN_POPIN_REQUEST_PARADECONFIRM",$bind(this,this.onRequestParadeConfirm));
		this.on("OPEN_POPIN_REQUEST_PARADEREWARD",$bind(this,this.onRequestParadeReward));
		this.on("OPEN_POPIN_REQUEST_SHOP",$bind(this,this.onRequestShop));
		this.on("OPEN_POPIN_REQUEST_UPGRADEREWARD",$bind(this,this.onRequestUpgradeReward));
	}
	,destroy: function() {
		com_isartdigital_builder_ui_UIManager.instance = null;
	}
	,__class__: com_isartdigital_builder_ui_UIManager
});
var com_isartdigital_builder_ui_hud_BaseBuildingHUD = function() {
	this.startPositionY = 0;
	this.elements = [];
	com_isartdigital_builder_ui_hud_BaseBuildingHUD._instance = this;
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	this.buildingInfoElement = js_Boot.__cast(this.getChildByName("BuildingInfo") , com_isartdigital_builder_ui_items_BuildingInfo);
	this.deleteButton = js_Boot.__cast(this.getChildByName("DeleteButton") , com_isartdigital_builder_ui_uimodule_DeleteButton);
	this.upgradeButton = js_Boot.__cast(this.getChildByName("UpgradeComfirm") , com_isartdigital_builder_ui_items_UpgradeComfirm);
	this.paintButton = js_Boot.__cast(this.getChildByName("ColorButton") , com_isartdigital_builder_ui_uimodule_ColorButton);
	this.moveButton = js_Boot.__cast(this.getChildByName("MoveButton") , com_isartdigital_builder_ui_uimodule_MoveButton);
	this.elements.push(this.buildingInfoElement);
	this.elements.push(this.deleteButton);
	this.elements.push(this.upgradeButton);
	this.elements.push(this.paintButton);
	this.elements.push(this.moveButton);
	this.startPositionY = this.moveButton.y;
	this.hideElements();
	com_isartdigital_builder_Main.getInstance().on("SELECTED",$bind(this,this.showChild));
	com_isartdigital_builder_Main.getInstance().on("UNSELECTED",$bind(this,this.hideElements));
};
$hxClasses["com.isartdigital.builder.ui.hud.BaseBuildingHUD"] = com_isartdigital_builder_ui_hud_BaseBuildingHUD;
com_isartdigital_builder_ui_hud_BaseBuildingHUD.__name__ = ["com","isartdigital","builder","ui","hud","BaseBuildingHUD"];
com_isartdigital_builder_ui_hud_BaseBuildingHUD.getInstance = function() {
	if(com_isartdigital_builder_ui_hud_BaseBuildingHUD._instance == null) com_isartdigital_builder_ui_hud_BaseBuildingHUD._instance = new com_isartdigital_builder_ui_hud_BaseBuildingHUD();
	return com_isartdigital_builder_ui_hud_BaseBuildingHUD._instance;
};
com_isartdigital_builder_ui_hud_BaseBuildingHUD.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_hud_BaseBuildingHUD.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	sortByX: function(pObjectA,pObjectB) {
		return pObjectB.x - pObjectA.x | 0;
	}
	,setComponent: function(pSuffix,pClass) {
		var _g = 0;
		var _g1 = this.elements;
		while(_g < _g1.length) {
			var lElement = _g1[_g];
			++_g;
			var lName = Type.getClassName(lElement == null?null:js_Boot.getClass(lElement));
			if(this.isClassNameEqual(lName,pSuffix,pClass)) this.addChild(lElement);
		}
	}
	,showChild: function(pDef) {
		this.hideElements();
		var _g = 0;
		var _g1 = pDef.type;
		while(_g < _g1.length) {
			var lType = _g1[_g];
			++_g;
			if(lType == "UPGRADABLE") {
				this.addChild(this.upgradeButton);
				this.upgradeButton.init(Reflect.field(pDef.ref.getConfig(),"upgrade_price"));
			} else if(lType == "MOVABLE") this.addChild(this.moveButton); else if(lType == "PAINTABLE") this.addChild(this.paintButton); else if(lType == "ERASABLE") this.addChild(this.deleteButton);
		}
		this.addChild(this.buildingInfoElement);
		this.buildingInfoElement.setDescription(pDef.ref);
		this.children.sort($bind(this,this.sortByX));
		this.packChildren();
		this.centerBuildingHud();
		var _g2 = 0;
		var _g11 = this.children;
		while(_g2 < _g11.length) {
			var lElement = _g11[_g2];
			++_g2;
			this.startFeedBack(lElement);
		}
	}
	,startFeedBack: function(pObject) {
		pObject.y += pObject.getLocalBounds().height;
		motion_Actuate.tween(pObject,1,{ y : pObject.y - pObject.getLocalBounds().height}).ease(motion_easing_Elastic.get_easeOut());
	}
	,centerBuildingHud: function() {
		var lWidthComponents = 0;
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var lElement = _g1[_g];
			++_g;
			lWidthComponents += lElement.getLocalBounds().width;
		}
		var lWidthHud = com_isartdigital_utils_game_GameStage.getInstance().getHudContainer().width;
		this.children[0].x = lWidthHud / 2 - this.children[0].getLocalBounds().width - this.children[0].parent.getBounds().x;
		this.packChildren();
	}
	,packChildren: function() {
		var _g1 = 0;
		var _g = this.children.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(i >= this.children.length - 1) break;
			this.children[i + 1].x = this.children[i].x - this.children[i + 1].getLocalBounds().width;
		}
	}
	,hideElements: function(pDef) {
		var _g = 0;
		var _g1 = this.elements;
		while(_g < _g1.length) {
			var lElement = _g1[_g];
			++_g;
			this.removeChild(lElement);
		}
	}
	,isClassNameEqual: function(pName,pSuffix,pClass) {
		return pName.length - pSuffix.length == Type.getClassName(pClass).length - pSuffix.length;
	}
	,__class__: com_isartdigital_builder_ui_hud_BaseBuildingHUD
});
var com_isartdigital_builder_ui_hud_BaseBuildingHUDEvent = function() { };
$hxClasses["com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent"] = com_isartdigital_builder_ui_hud_BaseBuildingHUDEvent;
com_isartdigital_builder_ui_hud_BaseBuildingHUDEvent.__name__ = ["com","isartdigital","builder","ui","hud","BaseBuildingHUDEvent"];
var com_isartdigital_builder_ui_hud_ConfirmPanel = function() {
	this.disableButton = new com_isartdigital_builder_ui_uimodule_DisableButton();
	this.confirmButton = new com_isartdigital_builder_ui_uimodule_ValideButton();
	PIXI.Container.call(this);
	this.placeButton();
	this.listenButton();
	this.feedBackDisplay();
};
$hxClasses["com.isartdigital.builder.ui.hud.ConfirmPanel"] = com_isartdigital_builder_ui_hud_ConfirmPanel;
com_isartdigital_builder_ui_hud_ConfirmPanel.__name__ = ["com","isartdigital","builder","ui","hud","ConfirmPanel"];
com_isartdigital_builder_ui_hud_ConfirmPanel.__super__ = PIXI.Container;
com_isartdigital_builder_ui_hud_ConfirmPanel.prototype = $extend(PIXI.Container.prototype,{
	feedBackDisplay: function() {
		this.confirmButton.scale.set(0.2,0.2);
		this.disableButton.scale.set(0.2,0.2);
		motion_Actuate.tween(this.confirmButton.scale,1,{ x : 1, y : 1}).ease(motion_easing_Elastic.get_easeOut());
		motion_Actuate.tween(this.disableButton.scale,1,{ x : 1, y : 1}).ease(motion_easing_Elastic.get_easeOut());
	}
	,listenButton: function() {
		this.confirmButton.tap = this.confirmButton.click = $bind(this,this.dispatchEventValide);
		this.disableButton.tap = this.disableButton.click = $bind(this,this.dispatchEventDisable);
	}
	,dispatchEventValide: function(pEvent) {
		com_isartdigital_builder_Main.getInstance().emit("MOVE_CONFIRM");
		this.destroy();
	}
	,dispatchEventDisable: function(pEvent) {
		com_isartdigital_builder_Main.getInstance().emit("MOVE_DISABLE");
		this.destroy();
	}
	,placeButton: function() {
		this.addChild(this.confirmButton);
		this.confirmButton.x = -180;
		this.confirmButton.y += 5;
		this.addChild(this.disableButton);
		this.disableButton.x = this.confirmButton.width;
	}
	,destroy: function() {
		this.removeChild(this.confirmButton);
		this.removeChild(this.disableButton);
		this.parent.removeChild(this);
		this.confirmButton.destroy();
		this.disableButton.destroy();
		PIXI.Container.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_hud_ConfirmPanel
});
var com_isartdigital_builder_ui_hud_CurrencyAsset = function() {
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
};
$hxClasses["com.isartdigital.builder.ui.hud.CurrencyAsset"] = com_isartdigital_builder_ui_hud_CurrencyAsset;
com_isartdigital_builder_ui_hud_CurrencyAsset.__name__ = ["com","isartdigital","builder","ui","hud","CurrencyAsset"];
com_isartdigital_builder_ui_hud_CurrencyAsset.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_hud_CurrencyAsset.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	changeCount: function(pNumber) {
		console.log("Number :" + pNumber);
	}
	,__class__: com_isartdigital_builder_ui_hud_CurrencyAsset
});
var com_isartdigital_builder_ui_hud_GoldCurrency = function() {
	com_isartdigital_builder_ui_hud_CurrencyAsset.call(this);
	com_isartdigital_builder_game_manager_RessourceManager.getInstance().updateGold = $bind(this,this.changeCount);
};
$hxClasses["com.isartdigital.builder.ui.hud.GoldCurrency"] = com_isartdigital_builder_ui_hud_GoldCurrency;
com_isartdigital_builder_ui_hud_GoldCurrency.__name__ = ["com","isartdigital","builder","ui","hud","GoldCurrency"];
com_isartdigital_builder_ui_hud_GoldCurrency.__super__ = com_isartdigital_builder_ui_hud_CurrencyAsset;
com_isartdigital_builder_ui_hud_GoldCurrency.prototype = $extend(com_isartdigital_builder_ui_hud_CurrencyAsset.prototype,{
	changeCount: function(pNumber) {
		com_isartdigital_builder_ui_hud_CurrencyAsset.prototype.changeCount.call(this,pNumber);
		(js_Boot.__cast(this.getChildByName("Gold_txt") , PIXI.Text)).text = pNumber;
	}
	,__class__: com_isartdigital_builder_ui_hud_GoldCurrency
});
var com_isartdigital_builder_ui_hud_Hud = function() {
	com_isartdigital_utils_ui_Screen.call(this);
	this._modal = false;
	this.build();
	this.hudRessources = new PIXI.Container();
	this.levelComponent = this.getChildByName("LevelCurrency");
	this.changeXpValue();
};
$hxClasses["com.isartdigital.builder.ui.hud.Hud"] = com_isartdigital_builder_ui_hud_Hud;
com_isartdigital_builder_ui_hud_Hud.__name__ = ["com","isartdigital","builder","ui","hud","Hud"];
com_isartdigital_builder_ui_hud_Hud.getInstance = function() {
	if(com_isartdigital_builder_ui_hud_Hud.instance == null) com_isartdigital_builder_ui_hud_Hud.instance = new com_isartdigital_builder_ui_hud_Hud();
	return com_isartdigital_builder_ui_hud_Hud.instance;
};
com_isartdigital_builder_ui_hud_Hud.__super__ = com_isartdigital_utils_ui_Screen;
com_isartdigital_builder_ui_hud_Hud.prototype = $extend(com_isartdigital_utils_ui_Screen.prototype,{
	onResize: function(pEvent) {
		com_isartdigital_utils_ui_Screen.prototype.onResize.call(this);
	}
	,refreshHUD: function() {
		com_isartdigital_builder_api_Api.resources.get($bind(this,this.cb_resourceAll));
		com_isartdigital_builder_api_Api.user.getExperience($bind(this,this.cb_experience));
	}
	,changeXpValue: function() {
		this.levelComponent.setProgressBar(100);
	}
	,cb_resourceAll: function(pData) {
		var lData = JSON.parse(pData);
		if(lData.error) {
			com_isartdigital_builder_api_Utils.errorHandler(lData.errorCode,lData.errorMessage);
			return;
		}
		this.goldText.text = "Gold : " + Std.string(lData.data.gold);
		this.spiceText.text = "Spice : " + Std.string(lData.data.spice);
		this.offeringText.text = "Offering : " + Std.string(lData.data.offering);
	}
	,cb_experience: function(pData) {
		var lData = JSON.parse(pData);
		if(lData.error) {
			com_isartdigital_builder_api_Utils.errorHandler(lData.errorCode,lData.errorMessage);
			return;
		}
		this.experienceText.text = "Exp : " + Std.string(lData.data);
	}
	,destroy: function() {
		com_isartdigital_builder_ui_hud_Hud.instance = null;
		com_isartdigital_utils_ui_Screen.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_hud_Hud
});
var com_isartdigital_builder_ui_hud_LevelCurrency = function() {
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	this.progressBar = this.getChildByName("LevelBarAsset");
	this.originPositionProgressBar = this.progressBar.x;
	this.widthProgressBar = this.progressBar.getLocalBounds().width;
	this.lvlText = js_Boot.__cast(this.getChildByName("Level_txt") , PIXI.Text);
	this.lvlText.text = "1";
	this.setProgressBar(0,false);
};
$hxClasses["com.isartdigital.builder.ui.hud.LevelCurrency"] = com_isartdigital_builder_ui_hud_LevelCurrency;
com_isartdigital_builder_ui_hud_LevelCurrency.__name__ = ["com","isartdigital","builder","ui","hud","LevelCurrency"];
com_isartdigital_builder_ui_hud_LevelCurrency.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_hud_LevelCurrency.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	setLevel: function(pLevel) {
		if(pLevel == null) (js_Boot.__cast(this.getChildByName("Level_txt") , PIXI.Text)).text = "null"; else (js_Boot.__cast(this.getChildByName("Level_txt") , PIXI.Text)).text = "" + pLevel;
	}
	,setProgressBar: function(pPercent,pFeedBack) {
		if(pFeedBack == null) pFeedBack = true;
		if(pPercent >= 100) pPercent = 100;
		var newPosition = this.originPositionProgressBar - (100 - pPercent) * this.widthProgressBar / 100;
		if(!pFeedBack) this.progressBar.x = newPosition; else motion_Actuate.tween(this.progressBar,2,{ x : newPosition}).ease(motion_easing_Expo.get_easeOut());
	}
	,__class__: com_isartdigital_builder_ui_hud_LevelCurrency
});
var com_isartdigital_builder_ui_hud_OfferingsCurrency = function() {
	com_isartdigital_builder_ui_hud_CurrencyAsset.call(this);
	com_isartdigital_builder_game_manager_RessourceManager.getInstance().updateOfferings = $bind(this,this.changeCount);
};
$hxClasses["com.isartdigital.builder.ui.hud.OfferingsCurrency"] = com_isartdigital_builder_ui_hud_OfferingsCurrency;
com_isartdigital_builder_ui_hud_OfferingsCurrency.__name__ = ["com","isartdigital","builder","ui","hud","OfferingsCurrency"];
com_isartdigital_builder_ui_hud_OfferingsCurrency.__super__ = com_isartdigital_builder_ui_hud_CurrencyAsset;
com_isartdigital_builder_ui_hud_OfferingsCurrency.prototype = $extend(com_isartdigital_builder_ui_hud_CurrencyAsset.prototype,{
	changeCount: function(pNumber) {
		com_isartdigital_builder_ui_hud_CurrencyAsset.prototype.changeCount.call(this,pNumber);
		(js_Boot.__cast(this.getChildByName("Offerings_txt") , PIXI.Text)).text = pNumber;
	}
	,__class__: com_isartdigital_builder_ui_hud_OfferingsCurrency
});
var com_isartdigital_builder_ui_hud_SpiceCurrency = function() {
	com_isartdigital_builder_ui_hud_CurrencyAsset.call(this);
	com_isartdigital_builder_game_manager_RessourceManager.getInstance().updateSpice = $bind(this,this.changeCount);
};
$hxClasses["com.isartdigital.builder.ui.hud.SpiceCurrency"] = com_isartdigital_builder_ui_hud_SpiceCurrency;
com_isartdigital_builder_ui_hud_SpiceCurrency.__name__ = ["com","isartdigital","builder","ui","hud","SpiceCurrency"];
com_isartdigital_builder_ui_hud_SpiceCurrency.__super__ = com_isartdigital_builder_ui_hud_CurrencyAsset;
com_isartdigital_builder_ui_hud_SpiceCurrency.prototype = $extend(com_isartdigital_builder_ui_hud_CurrencyAsset.prototype,{
	changeCount: function(pNumber) {
		com_isartdigital_builder_ui_hud_CurrencyAsset.prototype.changeCount.call(this,pNumber);
		(js_Boot.__cast(this.getChildByName("Spice_txt") , PIXI.Text)).text = pNumber;
	}
	,__class__: com_isartdigital_builder_ui_hud_SpiceCurrency
});
var com_isartdigital_builder_ui_items_BuildingInShop = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_game_StateGraphic.call(this);
	this.boxType = com_isartdigital_utils_game_BoxType.SELF;
	this.start();
};
$hxClasses["com.isartdigital.builder.ui.items.BuildingInShop"] = com_isartdigital_builder_ui_items_BuildingInShop;
com_isartdigital_builder_ui_items_BuildingInShop.__name__ = ["com","isartdigital","builder","ui","items","BuildingInShop"];
com_isartdigital_builder_ui_items_BuildingInShop.__super__ = com_isartdigital_utils_game_StateGraphic;
com_isartdigital_builder_ui_items_BuildingInShop.prototype = $extend(com_isartdigital_utils_game_StateGraphic.prototype,{
	setModeNormal: function() {
		this.setState(this.DEFAULT_STATE);
		com_isartdigital_utils_game_StateGraphic.prototype.setModeNormal.call(this);
	}
	,setAsset: function(pAssetName) {
		var frame = (js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).getLabelFrame(pAssetName);
		(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(frame);
	}
	,__class__: com_isartdigital_builder_ui_items_BuildingInShop
});
var com_isartdigital_builder_ui_items_BuildingInfo = function() {
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	this.title = this.getChildByName("BuildingInfoTitle_txt");
	this.capacity = this.getChildByName("BuildingInfoCapacity_txt");
	this.production = this.getChildByName("BuildingInfoProduction_txt");
	this.lvl = this.getChildByName("BuildingInfoLvl_txt");
	this.production.text = "";
	this.capacity.text = "";
};
$hxClasses["com.isartdigital.builder.ui.items.BuildingInfo"] = com_isartdigital_builder_ui_items_BuildingInfo;
com_isartdigital_builder_ui_items_BuildingInfo.__name__ = ["com","isartdigital","builder","ui","items","BuildingInfo"];
com_isartdigital_builder_ui_items_BuildingInfo.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_items_BuildingInfo.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	setDescription: function(pBuilding) {
		var config = pBuilding.getConfig();
		this.title.text = com_isartdigital_utils_Localization.getInstance().getText("label_" + pBuilding.definition.name);
		this.lvl.text = com_isartdigital_utils_Localization.getInstance().getText("label_level") + " " + (pBuilding.buildingLevel + 1);
		if(pBuilding.isHarvestable()) {
			this.capacity.text = "CapacitÃ© : " + Std.string(Reflect.field(config,"capacity"));
			this.production.text = "Production : " + Std.string(Reflect.field(config,"production")) + " / minutes";
		}
	}
	,__class__: com_isartdigital_builder_ui_items_BuildingInfo
});
var com_isartdigital_builder_ui_items_ItemBuilding = function() {
	this.cannotBuild = true;
	this.buildingName = "pyrotechnician";
	com_isartdigital_builder_ui_items_ItemBuilding.list.push(this);
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	this.buildingAssets = js_Boot.__cast(this.getChildByName("BuildingInShop") , com_isartdigital_builder_ui_items_BuildingInShop);
	this.listenButtonHard();
	this.listenButtonSoft();
};
$hxClasses["com.isartdigital.builder.ui.items.ItemBuilding"] = com_isartdigital_builder_ui_items_ItemBuilding;
com_isartdigital_builder_ui_items_ItemBuilding.__name__ = ["com","isartdigital","builder","ui","items","ItemBuilding"];
com_isartdigital_builder_ui_items_ItemBuilding.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_items_ItemBuilding.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	listenButtonSoft: function() {
		(js_Boot.__cast(this.getChildByName("ShopBuySoftButton") , com_isartdigital_utils_ui_Button)).click = $bind(this,this.buySoft);
	}
	,buySoft: function(pEvent) {
		if(this.cannotBuild) return;
		var price = Reflect.field(this.currentBuildingDefinition,"price");
		if(!com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources("gold",price)) return;
		com_isartdigital_builder_Main.getInstance().emit("SHOP_BUY_BUILDING",{ buildingName : this.buildingName, hard : false});
		com_isartdigital_builder_ui_UIManager.getInstance().closeCurrentPopin();
	}
	,listenButtonHard: function() {
		(js_Boot.__cast(this.getChildByName("ShopBuyHardButton") , com_isartdigital_utils_ui_Button)).click = $bind(this,this.buyHard);
	}
	,buyHard: function(pEvent) {
		if(this.cannotBuild) return;
		var price = Reflect.field(this.currentBuildingDefinition,"hard_price");
		if(!com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources("spice",price)) return;
		com_isartdigital_builder_Main.getInstance().emit("SHOP_BUY_BUILDING",{ buildingName : this.buildingName, hard : true});
		com_isartdigital_builder_ui_UIManager.getInstance().closeCurrentPopin();
	}
	,changeItemSelect: function(pBuildingName) {
		this.buildingName = pBuildingName;
		this.buildingAssets.setAsset(pBuildingName);
		this.getBuildingDefinition();
		this.updateSoftTxt();
		this.updateHardTxt();
		this.updateBuildingName();
		if(this.buildingIsUnLock()) this.activeLock(); else this.disableLock();
	}
	,buildingIsUnLock: function() {
		var lMainBuildingLvlRequire = Reflect.field(this.currentBuildingDefinition,"require_main_building_lvl");
		return lMainBuildingLvlRequire == 1;
	}
	,getBuildingDefinition: function() {
		var buildingSettings = com_isartdigital_utils_loader_GameLoader.getContent("json/buildingsSettings.json");
		var buildingDefinition = Reflect.field(buildingSettings,this.buildingName);
		if(Reflect.field(buildingDefinition,"1") != null) this.currentBuildingDefinition = Reflect.field(buildingDefinition,"1"); else this.currentBuildingDefinition = buildingDefinition;
	}
	,updateSoftTxt: function() {
		(js_Boot.__cast(this.getChildByName("PriceSoft_txt") , PIXI.Text)).text = Reflect.field(this.currentBuildingDefinition,"price");
	}
	,updateHardTxt: function() {
		(js_Boot.__cast(this.getChildByName("PriceHard_txt") , PIXI.Text)).text = Reflect.field(this.currentBuildingDefinition,"hard_price");
	}
	,updateBuildingName: function() {
		(js_Boot.__cast(this.getChildByName("BuildingName_txt") , PIXI.Text)).text = this.buildingName;
	}
	,activeLock: function() {
		this.getChildByName("CadenasAsset").visible = this.cannotBuild = true;
	}
	,disableLock: function() {
		this.getChildByName("CadenasAsset").visible = this.cannotBuild = false;
	}
	,destroy: function() {
		com_isartdigital_builder_ui_items_ItemBuilding.list.splice(HxOverrides.indexOf(com_isartdigital_builder_ui_items_ItemBuilding.list,this,0),1);
		com_isartdigital_utils_ui_UIComponent.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_items_ItemBuilding
});
var com_isartdigital_builder_ui_items_RewardBuilding = function() {
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	this.titleTxt = js_Boot.__cast(this.getChildByName("RewardBuildingTitle_txt") , PIXI.Text);
	this.buildingAsset = js_Boot.__cast(this.getChildByName("BuildingInShop") , com_isartdigital_builder_ui_items_BuildingInShop);
};
$hxClasses["com.isartdigital.builder.ui.items.RewardBuilding"] = com_isartdigital_builder_ui_items_RewardBuilding;
com_isartdigital_builder_ui_items_RewardBuilding.__name__ = ["com","isartdigital","builder","ui","items","RewardBuilding"];
com_isartdigital_builder_ui_items_RewardBuilding.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_items_RewardBuilding.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	__class__: com_isartdigital_builder_ui_items_RewardBuilding
});
var com_isartdigital_builder_ui_items_ShopBuilding = function() {
	this.buildingPerSheet = 2;
	this.positionInShop = 0;
	this.ShopSheetSettings = [];
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	this.ShopSheetSettings = com_isartdigital_utils_loader_GameLoader.getContent("json/ShopSheet.json");
	this.changeSheet();
	this.listenRightButton();
	this.listenLeftButton();
	this.positionInShop = 0;
	this.createAllDot();
	this.listenDot();
	com_isartdigital_builder_ui_uimodule_DotButton.list[this.positionInShop].setActive();
};
$hxClasses["com.isartdigital.builder.ui.items.ShopBuilding"] = com_isartdigital_builder_ui_items_ShopBuilding;
com_isartdigital_builder_ui_items_ShopBuilding.__name__ = ["com","isartdigital","builder","ui","items","ShopBuilding"];
com_isartdigital_builder_ui_items_ShopBuilding.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_items_ShopBuilding.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	onDotClick: function(pEvent) {
		com_isartdigital_builder_ui_uimodule_DotButton.list[Math.floor(this.positionInShop / this.buildingPerSheet)].setInActive();
		this.positionInShop = (function($this) {
			var $r;
			var x;
			x = js_Boot.__cast(pEvent.target , com_isartdigital_builder_ui_uimodule_DotButton);
			$r = HxOverrides.indexOf(com_isartdigital_builder_ui_uimodule_DotButton.list,x,0);
			return $r;
		}(this)) * 2;
		com_isartdigital_builder_ui_uimodule_DotButton.list[Math.floor(this.positionInShop / this.buildingPerSheet)].setActive();
		this.changeSheet();
	}
	,listenDot: function() {
		var _g = 0;
		var _g1 = com_isartdigital_builder_ui_uimodule_DotButton.list;
		while(_g < _g1.length) {
			var lDot = _g1[_g];
			++_g;
			lDot.tap = lDot.click = $bind(this,this.onDotClick);
		}
	}
	,centerDot: function() {
		var lMoveToCenter = com_isartdigital_builder_ui_uimodule_DotButton.list[com_isartdigital_builder_ui_uimodule_DotButton.list.length - 1].x - com_isartdigital_builder_ui_uimodule_DotButton.list[0].x;
		lMoveToCenter = lMoveToCenter / 2 - com_isartdigital_builder_ui_uimodule_DotButton.list[0].width;
		var lY = com_isartdigital_builder_ui_uimodule_DotButton.list[com_isartdigital_builder_ui_uimodule_DotButton.list.length - 1].y;
		var _g = 0;
		var _g1 = com_isartdigital_builder_ui_uimodule_DotButton.list;
		while(_g < _g1.length) {
			var lDot = _g1[_g];
			++_g;
			lDot.x -= lMoveToCenter;
			lDot.y = lY;
		}
	}
	,createAllDot: function() {
		var lDeltaX = com_isartdigital_builder_ui_uimodule_DotButton.list[1].x - com_isartdigital_builder_ui_uimodule_DotButton.list[0].x;
		while(com_isartdigital_builder_ui_uimodule_DotButton.list.length < Math.ceil(this.ShopSheetSettings.length / this.buildingPerSheet)) {
			var lPosition = com_isartdigital_builder_ui_uimodule_DotButton.list[com_isartdigital_builder_ui_uimodule_DotButton.list.length - 1].position.clone();
			var lDot = new com_isartdigital_builder_ui_uimodule_DotButton();
			lDot.position = lPosition;
			lDot.x += lDeltaX;
			this.addChild(lDot);
		}
		this.centerDot();
	}
	,listenRightButton: function() {
		(js_Boot.__cast(this.getChildByName("RightButton") , com_isartdigital_utils_ui_Button)).click = $bind(this,this.goRight);
	}
	,listenLeftButton: function() {
		(js_Boot.__cast(this.getChildByName("LeftButton") , com_isartdigital_utils_ui_Button)).click = $bind(this,this.goLeft);
	}
	,goLeft: function(pEvent) {
		if(this.positionInShop - this.buildingPerSheet >= 0) {
			com_isartdigital_builder_ui_uimodule_DotButton.list[Math.floor(this.positionInShop / this.buildingPerSheet)].setInActive();
			this.positionInShop -= this.buildingPerSheet;
			this.changeSheet();
			com_isartdigital_builder_ui_uimodule_DotButton.list[Math.floor(this.positionInShop / this.buildingPerSheet)].setActive();
		}
	}
	,goRight: function(pEvent) {
		if(this.positionInShop + this.buildingPerSheet < this.ShopSheetSettings.length) {
			com_isartdigital_builder_ui_uimodule_DotButton.list[Math.floor(this.positionInShop / this.buildingPerSheet)].setInActive();
			this.positionInShop += this.buildingPerSheet;
			this.changeSheet();
			com_isartdigital_builder_ui_uimodule_DotButton.list[Math.floor(this.positionInShop / this.buildingPerSheet)].setActive();
		}
	}
	,changeSheet: function() {
		com_isartdigital_builder_ui_items_ItemBuilding.list[0].changeItemSelect(this.ShopSheetSettings[this.positionInShop]);
		com_isartdigital_builder_ui_items_ItemBuilding.list[1].changeItemSelect(this.ShopSheetSettings[this.positionInShop + 1]);
	}
	,destroy: function() {
		while(com_isartdigital_builder_ui_items_ItemBuilding.list.length > 0) com_isartdigital_builder_ui_items_ItemBuilding.list[0].destroy();
		while(com_isartdigital_builder_ui_uimodule_DotButton.list.length > 0) com_isartdigital_builder_ui_uimodule_DotButton.list[0].destroy();
	}
	,__class__: com_isartdigital_builder_ui_items_ShopBuilding
});
var com_isartdigital_builder_ui_items_ShopRessource = function() {
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
};
$hxClasses["com.isartdigital.builder.ui.items.ShopRessource"] = com_isartdigital_builder_ui_items_ShopRessource;
com_isartdigital_builder_ui_items_ShopRessource.__name__ = ["com","isartdigital","builder","ui","items","ShopRessource"];
com_isartdigital_builder_ui_items_ShopRessource.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_items_ShopRessource.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	__class__: com_isartdigital_builder_ui_items_ShopRessource
});
var com_isartdigital_builder_ui_items_UpgradeComfirm = function() {
	this.isActive = false;
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	this.upgradeButton = js_Boot.__cast(this.getChildByName("UpgradeButton") , com_isartdigital_builder_ui_uimodule_UpgradeButton);
	this.valideButton = js_Boot.__cast(this.getChildByName("UpgradeValideButton") , com_isartdigital_builder_ui_uimodule_UpgradeValideButton);
	this.disableButton = js_Boot.__cast(this.getChildByName("UpgradeDisableButton") , com_isartdigital_builder_ui_uimodule_UpgradeDisableButton);
	this.priceTxt = js_Boot.__cast(this.getChildByName("UpgradeComfirm_txt") , PIXI.Text);
	this.setComfrimAction();
	this.valideButton.click = this.valideButton.tap = $bind(this,this.onValideButton);
	this.disableButton.click = this.disableButton.tap = $bind(this,this.onDisableButton);
	this.hideComfirmAssets();
};
$hxClasses["com.isartdigital.builder.ui.items.UpgradeComfirm"] = com_isartdigital_builder_ui_items_UpgradeComfirm;
com_isartdigital_builder_ui_items_UpgradeComfirm.__name__ = ["com","isartdigital","builder","ui","items","UpgradeComfirm"];
com_isartdigital_builder_ui_items_UpgradeComfirm.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_items_UpgradeComfirm.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	init: function(pPrice) {
		if(pPrice == null) this.priceTxt.text = "null"; else this.priceTxt.text = "" + pPrice;
	}
	,onValideButton: function(pEvent) {
		com_isartdigital_builder_Main.getInstance().emit("UPGRADE_BUTTON");
	}
	,onDisableButton: function(pEvent) {
		this.hideComfirmAssets();
		this.setComfrimAction();
	}
	,onUpgradeButton: function(pEvent) {
		this.showComfirmAssets();
		this.setDisableAction();
	}
	,setDisableAction: function() {
		this.upgradeButton.click = this.upgradeButton.tap = $bind(this,this.onDisableButton);
	}
	,setComfrimAction: function() {
		this.upgradeButton.click = this.upgradeButton.tap = $bind(this,this.onUpgradeButton);
	}
	,showComfirmAssets: function() {
		this.isActive = true;
		this.addChild(this.valideButton);
		this.addChild(this.disableButton);
		this.addChild(this.priceTxt);
	}
	,hideComfirmAssets: function() {
		this.isActive = false;
		this.removeChild(this.valideButton);
		this.removeChild(this.disableButton);
		this.removeChild(this.priceTxt);
	}
	,__class__: com_isartdigital_builder_ui_items_UpgradeComfirm
});
var com_isartdigital_utils_ui_Popin = function() {
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.juicyOpen();
};
$hxClasses["com.isartdigital.utils.ui.Popin"] = com_isartdigital_utils_ui_Popin;
com_isartdigital_utils_ui_Popin.__name__ = ["com","isartdigital","utils","ui","Popin"];
com_isartdigital_utils_ui_Popin.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_utils_ui_Popin.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	juicyOpen: function() {
		this.scale.set(0.3,0.3);
		motion_Actuate.tween(this.scale,0.7,{ x : 1, y : 1}).ease(motion_easing_Elastic.get_easeOut());
	}
	,__class__: com_isartdigital_utils_ui_Popin
});
var com_isartdigital_builder_ui_popin_LanternConfirm = function() {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.priceHard = this.getChildByName("LanternConfirmPriceHard_txt");
	this.priceSoft = this.getChildByName("LanternConfirmPriceSoft_txt");
	var lanternConfig = com_isartdigital_utils_loader_GameLoader.getContent("json/buildingsSettings.json");
	lanternConfig = Reflect.field(lanternConfig,"lanterns");
	this.priceSoft.text = lanternConfig.price + lanternConfig.base_price * com_isartdigital_services_Users.infos.lanterns.length;
	this.priceHard.text = lanternConfig.hard_price + lanternConfig.base_hard_price * com_isartdigital_services_Users.infos.lanterns.length;
	this.buyHard = this.getChildByName("ShopBuyHardButton");
	this.buySoft = this.getChildByName("ShopBuySoftButton");
	this.buyHard.click = this.buyHard.tap = $bind(this,this.onBuyHardButton);
	this.buySoft.click = this.buySoft.tap = $bind(this,this.onBuySoftButton);
};
$hxClasses["com.isartdigital.builder.ui.popin.LanternConfirm"] = com_isartdigital_builder_ui_popin_LanternConfirm;
com_isartdigital_builder_ui_popin_LanternConfirm.__name__ = ["com","isartdigital","builder","ui","popin","LanternConfirm"];
com_isartdigital_builder_ui_popin_LanternConfirm.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_LanternConfirm.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	onBuyHardButton: function(pEventTarget) {
		com_isartdigital_builder_Main.getInstance().emit(com_isartdigital_builder_ui_popin_LanternConfirm.BUYHARD);
		com_isartdigital_builder_ui_UIManager.getInstance().closeCurrentPopin();
	}
	,onBuySoftButton: function(pEventTarget) {
		com_isartdigital_builder_Main.getInstance().emit(com_isartdigital_builder_ui_popin_LanternConfirm.BUYSOFT);
		com_isartdigital_builder_ui_UIManager.getInstance().closeCurrentPopin();
	}
	,destroy: function() {
		this.buyHard.destroy();
		this.buySoft.destroy();
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_LanternConfirm
});
var com_isartdigital_builder_ui_popin_MainBuildingInfo = function() {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.rewardBuilding = this.getChildByName("RewardBuilding");
	this.mainBuildingInfoDescription = this.getChildByName("MainBuildingInfoDescription");
	this.mainBuildingInfoTitle = this.getChildByName("mainBuildingInfoTitle");
};
$hxClasses["com.isartdigital.builder.ui.popin.MainBuildingInfo"] = com_isartdigital_builder_ui_popin_MainBuildingInfo;
com_isartdigital_builder_ui_popin_MainBuildingInfo.__name__ = ["com","isartdigital","builder","ui","popin","MainBuildingInfo"];
com_isartdigital_builder_ui_popin_MainBuildingInfo.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_MainBuildingInfo.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	destroy: function() {
		this.rewardBuilding.destroy();
		this.mainBuildingInfoDescription.destroy();
		this.mainBuildingInfoTitle.destroy();
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_MainBuildingInfo
});
var com_isartdigital_builder_ui_popin_ParadeConfirm = function() {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.hardButton = this.getChildByName("ShopBuyHardButton");
	this.softButton = this.getChildByName("ShopBuySoftButton");
	this.priceHardText = this.getChildByName("PriceHard_txt");
	this.priceSoftText = this.getChildByName("PriceSoft_txt");
	this.priceSoft = com_isartdigital_builder_ui_popin_ParadeConfirm.setDataParade().price_soft;
	this.priceSoftText.text = this.priceSoft + "";
	this.priceHard = com_isartdigital_builder_ui_popin_ParadeConfirm.setDataParade().price_hard;
	this.priceHardText.text = this.priceHard + "";
	this.hardButton.click = this.hardButton.tap = $bind(this,this.onHardButtonClick);
	this.softButton.click = this.softButton.tap = $bind(this,this.onSoftButtonClick);
	com_isartdigital_builder_ui_popin_ParadeConfirm.setDataParade();
};
$hxClasses["com.isartdigital.builder.ui.popin.ParadeConfirm"] = com_isartdigital_builder_ui_popin_ParadeConfirm;
com_isartdigital_builder_ui_popin_ParadeConfirm.__name__ = ["com","isartdigital","builder","ui","popin","ParadeConfirm"];
com_isartdigital_builder_ui_popin_ParadeConfirm.setDataParade = function() {
	var paradeSettingsJson = com_isartdigital_utils_loader_GameLoader.getContent("json/paradeSettings.json");
	var paradeSettings = Reflect.field(paradeSettingsJson,"main_building");
	var paradeLevel = Reflect.field(paradeSettings,"5");
	return paradeLevel;
};
com_isartdigital_builder_ui_popin_ParadeConfirm.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_ParadeConfirm.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	onHardButtonClick: function(pEvent) {
		if(!com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources("spice",this.priceHard | 0)) return;
		com_isartdigital_builder_game_manager_ParadeManager.getInstance().buildParade(60,60,com_isartdigital_builder_ui_popin_ParadeConfirm.setDataParade().default_gain);
		com_isartdigital_builder_game_manager_ParadeManager.getInstance().moveParade(new pathfinder_Coordinate(50,50));
		motion_Actuate.tween(com_isartdigital_utils_game_Camera.getInstance().cameraFocus,1,{ x : com_isartdigital_builder_game_manager_ParadeManager.paradeArray[2].position.x, y : com_isartdigital_builder_game_manager_ParadeManager.paradeArray[2].position.y}).ease(motion_easing_Cubic.get_easeInOut());
		com_isartdigital_builder_ui_UIManager.getInstance().closeCurrentPopin();
	}
	,onSoftButtonClick: function(pEvent) {
		if(!com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources("gold",this.priceSoft | 0)) return;
		com_isartdigital_builder_game_manager_ParadeManager.getInstance().buildParade(60,60,com_isartdigital_builder_ui_popin_ParadeConfirm.setDataParade().default_gain);
		com_isartdigital_builder_game_manager_ParadeManager.getInstance().moveParade(new pathfinder_Coordinate(50,50));
		motion_Actuate.tween(com_isartdigital_utils_game_Camera.getInstance().cameraFocus,1,{ x : com_isartdigital_builder_game_manager_ParadeManager.paradeArray[2].position.x, y : com_isartdigital_builder_game_manager_ParadeManager.paradeArray[2].position.y}).ease(motion_easing_Cubic.get_easeInOut());
		com_isartdigital_builder_ui_UIManager.getInstance().closeCurrentPopin();
	}
	,destroy: function() {
		this.hardButton.destroy();
		this.softButton.destroy();
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_ParadeConfirm
});
var com_isartdigital_builder_ui_popin_ParadeReward = function() {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.button = this.getChildByName("RewardButton");
	this.button.click = this.button.tap = $bind(this,this.onButtonClick);
	this.title = this.getChildByName("ParadeRewardTitle_txt");
	this.offering = this.getChildByName("ParadeRewardOffering_txt");
	this.pimientos = this.getChildByName("ParadeRewardPimientos_txt");
	this.pesos = this.getChildByName("ParadeRewardPesos_txt");
	this.pesos.text = com_isartdigital_builder_ui_popin_ParadeConfirm.setDataParade().default_gain;
	this.pimientos.text = "0";
	this.offering.text = "0";
	this.gainGold = com_isartdigital_builder_ui_popin_ParadeConfirm.setDataParade().default_gain;
	this.gainSpice = 0;
	this.gainOffering = 0;
};
$hxClasses["com.isartdigital.builder.ui.popin.ParadeReward"] = com_isartdigital_builder_ui_popin_ParadeReward;
com_isartdigital_builder_ui_popin_ParadeReward.__name__ = ["com","isartdigital","builder","ui","popin","ParadeReward"];
com_isartdigital_builder_ui_popin_ParadeReward.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_ParadeReward.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	onButtonClick: function(pEvent) {
		com_isartdigital_builder_game_manager_RessourceManager.getInstance().addRessources("gold",this.gainGold | 0);
		com_isartdigital_builder_game_manager_RessourceManager.getInstance().addRessources("spice",this.gainSpice | 0);
		com_isartdigital_builder_game_manager_RessourceManager.getInstance().addRessources("offering",this.gainOffering | 0);
		com_isartdigital_builder_ui_UIManager.getInstance().closeCurrentPopin();
	}
	,destroy: function() {
		this.button.destroy();
		this.pesos.destroy();
		this.offering.destroy();
		this.pimientos.destroy();
		this.title.destroy();
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_ParadeReward
});
var com_isartdigital_builder_ui_popin_Shop = function() {
	this.activeShop = "BUILDING_SHOP";
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.setVariableFromChild();
	this.subscribeButtonsClick();
	this.changeShop();
};
$hxClasses["com.isartdigital.builder.ui.popin.Shop"] = com_isartdigital_builder_ui_popin_Shop;
com_isartdigital_builder_ui_popin_Shop.__name__ = ["com","isartdigital","builder","ui","popin","Shop"];
com_isartdigital_builder_ui_popin_Shop.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_Shop.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	setVariableFromChild: function() {
		this.buildingShop = js_Boot.__cast(this.getChildByName("ShopBuilding") , com_isartdigital_builder_ui_items_ShopBuilding);
		this.ressourceShop = js_Boot.__cast(this.getChildByName("ShopRessource") , com_isartdigital_builder_ui_items_ShopRessource);
		this.ressourceButton = js_Boot.__cast(this.getChildByName("ShopRessourceButton") , com_isartdigital_builder_ui_uimodule_ShopRessourceButton);
		this.buildingButton = js_Boot.__cast(this.getChildByName("ShopBuildingButton") , com_isartdigital_builder_ui_uimodule_ShopBuildingButton);
	}
	,subscribeButtonsClick: function() {
		this.ressourceButton.click = this.ressourceButton.tap = $bind(this,this.onRessourceClick);
		this.buildingButton.click = this.buildingButton.tap = $bind(this,this.onBuildingClick);
	}
	,unsubscribeButtonsClick: function() {
		this.ressourceButton.click = this.ressourceButton.tap = null;
		this.buildingButton.click = this.buildingButton.tap = null;
	}
	,onBuildingClick: function(pEvent) {
		this.activeShop = "BUILDING_SHOP";
		this.changeShop();
	}
	,onRessourceClick: function(pEvent) {
		this.activeShop = "RESSOURCE_SHOP";
		this.changeShop();
	}
	,changeShop: function() {
		var _g = this.activeShop;
		switch(_g) {
		case "RESSOURCE_SHOP":
			this.buildingButton.setUnActive();
			this.ressourceButton.setActive();
			this.buildingShop.visible = false;
			this.ressourceShop.visible = true;
			break;
		case "BUILDING_SHOP":
			this.buildingButton.setActive();
			this.ressourceButton.setUnActive();
			this.ressourceShop.visible = false;
			this.buildingShop.visible = true;
			break;
		}
	}
	,destroy: function() {
		this.unsubscribeButtonsClick();
		this.buildingButton.destroy();
		this.ressourceButton.destroy();
		this.buildingShop.destroy();
		this.ressourceShop.destroy();
	}
	,__class__: com_isartdigital_builder_ui_popin_Shop
});
var com_isartdigital_builder_ui_popin_UpgradeReward = function() {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.buttonComfirm = js_Boot.__cast(this.getChildByName("RewardButton") , com_isartdigital_builder_ui_uimodule_RewardButton);
	this.buttonComfirm.click = this.tap = $bind(this,this.onComfirmClick);
};
$hxClasses["com.isartdigital.builder.ui.popin.UpgradeReward"] = com_isartdigital_builder_ui_popin_UpgradeReward;
com_isartdigital_builder_ui_popin_UpgradeReward.__name__ = ["com","isartdigital","builder","ui","popin","UpgradeReward"];
com_isartdigital_builder_ui_popin_UpgradeReward.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_UpgradeReward.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	onComfirmClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().closeCurrentPopin();
	}
	,destroy: function() {
		this.buttonComfirm.destroy();
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_UpgradeReward
});
var com_isartdigital_utils_ui_Button = function() {
	com_isartdigital_utils_game_StateGraphic.call(this);
	this.boxType = com_isartdigital_utils_game_BoxType.SELF;
	this.interactive = true;
	this.buttonMode = true;
	this.on("mouseover",$bind(this,this._mouseOver));
	this.on("mousedown",$bind(this,this._mouseDown));
	this.on("click",$bind(this,this._click));
	this.on("mouseout",$bind(this,this._mouseOut));
	this.on("mouseupoutside",$bind(this,this._mouseOut));
	this.createText();
	this.start();
};
$hxClasses["com.isartdigital.utils.ui.Button"] = com_isartdigital_utils_ui_Button;
com_isartdigital_utils_ui_Button.__name__ = ["com","isartdigital","utils","ui","Button"];
com_isartdigital_utils_ui_Button.__super__ = com_isartdigital_utils_game_StateGraphic;
com_isartdigital_utils_ui_Button.prototype = $extend(com_isartdigital_utils_game_StateGraphic.prototype,{
	createText: function() {
		this.upStyle = { font : "80px Arial", fill : "#000000", align : "center"};
		this.overStyle = { font : "80px Arial", fill : "#AAAAAA", align : "center"};
		this.downStyle = { font : "80px Arial", fill : "#FFFFFF", align : "center"};
		this.txt = new PIXI.Text("",this.upStyle);
		this.txt.anchor.set(0.5,0.5);
	}
	,setText: function(pText) {
		this.txt.text = pText;
	}
	,setModeNormal: function() {
		this.setState(this.DEFAULT_STATE);
		this.anim.gotoAndStop(0);
		this.addChild(this.txt);
		com_isartdigital_utils_game_StateGraphic.prototype.setModeNormal.call(this);
	}
	,_mouseVoid: function() {
	}
	,_click: function(pEvent) {
		this.anim.gotoAndStop(0);
		this.txt.style = this.upStyle;
	}
	,_mouseDown: function(pEvent) {
		this.anim.gotoAndStop(2);
		this.txt.style = this.downStyle;
	}
	,_mouseOver: function(pEvent) {
		this.anim.gotoAndStop(1);
		this.txt.style = this.overStyle;
	}
	,_mouseOut: function(pEvent) {
		this.anim.gotoAndStop(0);
		this.txt.style = this.upStyle;
	}
	,destroy: function() {
		this.off("mouseover",$bind(this,this._mouseOver));
		this.off("mousedown",$bind(this,this._mouseDown));
		this.off("click",$bind(this,this._click));
		this.off("mouseout",$bind(this,this._mouseOut));
		this.off("mouseupoutside",$bind(this,this._mouseOut));
		com_isartdigital_utils_game_StateGraphic.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_utils_ui_Button
});
var com_isartdigital_builder_ui_uimodule_ButtonsBuilding = function() {
	com_isartdigital_utils_ui_Button.call(this);
	this.interactive = true;
	this.buttonMode = true;
	this.click = this.tap = $bind(this,this.onClickEvent);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.ButtonsBuilding"] = com_isartdigital_builder_ui_uimodule_ButtonsBuilding;
com_isartdigital_builder_ui_uimodule_ButtonsBuilding.__name__ = ["com","isartdigital","builder","ui","uimodule","ButtonsBuilding"];
com_isartdigital_builder_ui_uimodule_ButtonsBuilding.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_ButtonsBuilding.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClickEvent: function(pEvent) {
		com_isartdigital_builder_Main.getInstance().emit(this.eventEmit);
		pEvent.stopPropagation();
	}
	,__class__: com_isartdigital_builder_ui_uimodule_ButtonsBuilding
});
var com_isartdigital_builder_ui_uimodule_CheckBox = function() {
	this.active = false;
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.CheckBox"] = com_isartdigital_builder_ui_uimodule_CheckBox;
com_isartdigital_builder_ui_uimodule_CheckBox.__name__ = ["com","isartdigital","builder","ui","uimodule","CheckBox"];
com_isartdigital_builder_ui_uimodule_CheckBox.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_CheckBox.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	setActive: function() {
		this.anim.gotoAndStop(2);
		this.active = true;
	}
	,setUnActive: function() {
		this.anim.gotoAndStop(0);
		this.active = false;
	}
	,_mouseOut: function(pEvent) {
	}
	,_click: function(pEvent) {
		if(this.active) this.setUnActive(); else this.setActive();
	}
	,_mouseOver: function(pEvent) {
	}
	,_mouseDown: function(pEvent) {
	}
	,__class__: com_isartdigital_builder_ui_uimodule_CheckBox
});
var com_isartdigital_builder_ui_uimodule_ColorButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_uimodule_ButtonsBuilding.call(this);
	this.eventEmit = "PAINT_BUTTON";
};
$hxClasses["com.isartdigital.builder.ui.uimodule.ColorButton"] = com_isartdigital_builder_ui_uimodule_ColorButton;
com_isartdigital_builder_ui_uimodule_ColorButton.__name__ = ["com","isartdigital","builder","ui","uimodule","ColorButton"];
com_isartdigital_builder_ui_uimodule_ColorButton.__super__ = com_isartdigital_builder_ui_uimodule_ButtonsBuilding;
com_isartdigital_builder_ui_uimodule_ColorButton.prototype = $extend(com_isartdigital_builder_ui_uimodule_ButtonsBuilding.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_ColorButton
});
var com_isartdigital_builder_ui_uimodule_CreditButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.CreditButton"] = com_isartdigital_builder_ui_uimodule_CreditButton;
com_isartdigital_builder_ui_uimodule_CreditButton.__name__ = ["com","isartdigital","builder","ui","uimodule","CreditButton"];
com_isartdigital_builder_ui_uimodule_CreditButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_CreditButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_CreditButton
});
var com_isartdigital_builder_ui_uimodule_DeleteButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	this.eventEmit = "DELETE_BUTTON";
	com_isartdigital_builder_ui_uimodule_ButtonsBuilding.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.DeleteButton"] = com_isartdigital_builder_ui_uimodule_DeleteButton;
com_isartdigital_builder_ui_uimodule_DeleteButton.__name__ = ["com","isartdigital","builder","ui","uimodule","DeleteButton"];
com_isartdigital_builder_ui_uimodule_DeleteButton.__super__ = com_isartdigital_builder_ui_uimodule_ButtonsBuilding;
com_isartdigital_builder_ui_uimodule_DeleteButton.prototype = $extend(com_isartdigital_builder_ui_uimodule_ButtonsBuilding.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_DeleteButton
});
var com_isartdigital_builder_ui_uimodule_DisableButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.interactive = true;
	this.buttonMode = true;
	console.log("HIC BINCREAE");
};
$hxClasses["com.isartdigital.builder.ui.uimodule.DisableButton"] = com_isartdigital_builder_ui_uimodule_DisableButton;
com_isartdigital_builder_ui_uimodule_DisableButton.__name__ = ["com","isartdigital","builder","ui","uimodule","DisableButton"];
com_isartdigital_builder_ui_uimodule_DisableButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_DisableButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_DisableButton
});
var com_isartdigital_builder_ui_uimodule_DotButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	com_isartdigital_builder_ui_uimodule_DotButton.list.push(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.DotButton"] = com_isartdigital_builder_ui_uimodule_DotButton;
com_isartdigital_builder_ui_uimodule_DotButton.__name__ = ["com","isartdigital","builder","ui","uimodule","DotButton"];
com_isartdigital_builder_ui_uimodule_DotButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_DotButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	setActive: function() {
		this.anim.gotoAndStop(2);
	}
	,setInActive: function() {
		this.anim.gotoAndStop(0);
	}
	,_click: function(pEvent) {
	}
	,_mouseOut: function(pEvent) {
	}
	,_mouseOver: function(pEvent) {
	}
	,destroy: function() {
		com_isartdigital_builder_ui_uimodule_DotButton.list.splice(HxOverrides.indexOf(com_isartdigital_builder_ui_uimodule_DotButton.list,this,0),1);
		com_isartdigital_utils_ui_Button.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_uimodule_DotButton
});
var com_isartdigital_builder_ui_uimodule_GoldButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.click = this.tap = $bind(this,this.onClick);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.GoldButton"] = com_isartdigital_builder_ui_uimodule_GoldButton;
com_isartdigital_builder_ui_uimodule_GoldButton.__name__ = ["com","isartdigital","builder","ui","uimodule","GoldButton"];
com_isartdigital_builder_ui_uimodule_GoldButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_GoldButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_SHOP");
	}
	,__class__: com_isartdigital_builder_ui_uimodule_GoldButton
});
var com_isartdigital_builder_ui_uimodule_LeftButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.LeftButton"] = com_isartdigital_builder_ui_uimodule_LeftButton;
com_isartdigital_builder_ui_uimodule_LeftButton.__name__ = ["com","isartdigital","builder","ui","uimodule","LeftButton"];
com_isartdigital_builder_ui_uimodule_LeftButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_LeftButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_LeftButton
});
var com_isartdigital_builder_ui_uimodule_MoveButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_uimodule_ButtonsBuilding.call(this);
	this.eventEmit = "MOVE_BUTTON";
};
$hxClasses["com.isartdigital.builder.ui.uimodule.MoveButton"] = com_isartdigital_builder_ui_uimodule_MoveButton;
com_isartdigital_builder_ui_uimodule_MoveButton.__name__ = ["com","isartdigital","builder","ui","uimodule","MoveButton"];
com_isartdigital_builder_ui_uimodule_MoveButton.__super__ = com_isartdigital_builder_ui_uimodule_ButtonsBuilding;
com_isartdigital_builder_ui_uimodule_MoveButton.prototype = $extend(com_isartdigital_builder_ui_uimodule_ButtonsBuilding.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_MoveButton
});
var com_isartdigital_builder_ui_uimodule_NotificationButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_uimodule_CheckBox.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.NotificationButton"] = com_isartdigital_builder_ui_uimodule_NotificationButton;
com_isartdigital_builder_ui_uimodule_NotificationButton.__name__ = ["com","isartdigital","builder","ui","uimodule","NotificationButton"];
com_isartdigital_builder_ui_uimodule_NotificationButton.__super__ = com_isartdigital_builder_ui_uimodule_CheckBox;
com_isartdigital_builder_ui_uimodule_NotificationButton.prototype = $extend(com_isartdigital_builder_ui_uimodule_CheckBox.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_NotificationButton
});
var com_isartdigital_builder_ui_uimodule_OfferingButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.click = this.tap = $bind(this,this.onClick);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.OfferingButton"] = com_isartdigital_builder_ui_uimodule_OfferingButton;
com_isartdigital_builder_ui_uimodule_OfferingButton.__name__ = ["com","isartdigital","builder","ui","uimodule","OfferingButton"];
com_isartdigital_builder_ui_uimodule_OfferingButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_OfferingButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_SHOP");
	}
	,__class__: com_isartdigital_builder_ui_uimodule_OfferingButton
});
var com_isartdigital_builder_ui_uimodule_ParadeButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.click = this.tap = $bind(this,this.onClick);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.ParadeButton"] = com_isartdigital_builder_ui_uimodule_ParadeButton;
com_isartdigital_builder_ui_uimodule_ParadeButton.__name__ = ["com","isartdigital","builder","ui","uimodule","ParadeButton"];
com_isartdigital_builder_ui_uimodule_ParadeButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_ParadeButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_PARADECONFIRM");
	}
	,__class__: com_isartdigital_builder_ui_uimodule_ParadeButton
});
var com_isartdigital_builder_ui_uimodule_RewardButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.interactive = true;
	this.buttonMode = true;
};
$hxClasses["com.isartdigital.builder.ui.uimodule.RewardButton"] = com_isartdigital_builder_ui_uimodule_RewardButton;
com_isartdigital_builder_ui_uimodule_RewardButton.__name__ = ["com","isartdigital","builder","ui","uimodule","RewardButton"];
com_isartdigital_builder_ui_uimodule_RewardButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_RewardButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_RewardButton
});
var com_isartdigital_builder_ui_uimodule_RightButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.RightButton"] = com_isartdigital_builder_ui_uimodule_RightButton;
com_isartdigital_builder_ui_uimodule_RightButton.__name__ = ["com","isartdigital","builder","ui","uimodule","RightButton"];
com_isartdigital_builder_ui_uimodule_RightButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_RightButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_RightButton
});
var com_isartdigital_builder_ui_uimodule_SFXButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_uimodule_CheckBox.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.SFXButton"] = com_isartdigital_builder_ui_uimodule_SFXButton;
com_isartdigital_builder_ui_uimodule_SFXButton.__name__ = ["com","isartdigital","builder","ui","uimodule","SFXButton"];
com_isartdigital_builder_ui_uimodule_SFXButton.__super__ = com_isartdigital_builder_ui_uimodule_CheckBox;
com_isartdigital_builder_ui_uimodule_SFXButton.prototype = $extend(com_isartdigital_builder_ui_uimodule_CheckBox.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_SFXButton
});
var com_isartdigital_builder_ui_uimodule_ShopOnglet = function() {
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.ShopOnglet"] = com_isartdigital_builder_ui_uimodule_ShopOnglet;
com_isartdigital_builder_ui_uimodule_ShopOnglet.__name__ = ["com","isartdigital","builder","ui","uimodule","ShopOnglet"];
com_isartdigital_builder_ui_uimodule_ShopOnglet.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_ShopOnglet.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	setActive: function() {
		this.anim.gotoAndStop(2);
	}
	,setUnActive: function() {
		this.anim.gotoAndStop(0);
	}
	,_mouseOut: function(pEvent) {
	}
	,_click: function(pEvent) {
	}
	,_mouseOver: function(pEvent) {
	}
	,_mouseDown: function(pEvent) {
	}
	,__class__: com_isartdigital_builder_ui_uimodule_ShopOnglet
});
var com_isartdigital_builder_ui_uimodule_ShopBuildingButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_uimodule_ShopOnglet.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.ShopBuildingButton"] = com_isartdigital_builder_ui_uimodule_ShopBuildingButton;
com_isartdigital_builder_ui_uimodule_ShopBuildingButton.__name__ = ["com","isartdigital","builder","ui","uimodule","ShopBuildingButton"];
com_isartdigital_builder_ui_uimodule_ShopBuildingButton.__super__ = com_isartdigital_builder_ui_uimodule_ShopOnglet;
com_isartdigital_builder_ui_uimodule_ShopBuildingButton.prototype = $extend(com_isartdigital_builder_ui_uimodule_ShopOnglet.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_ShopBuildingButton
});
var com_isartdigital_builder_ui_uimodule_ShopButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.tap = this.click = $bind(this,this.onClick);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.ShopButton"] = com_isartdigital_builder_ui_uimodule_ShopButton;
com_isartdigital_builder_ui_uimodule_ShopButton.__name__ = ["com","isartdigital","builder","ui","uimodule","ShopButton"];
com_isartdigital_builder_ui_uimodule_ShopButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_ShopButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_SHOP");
	}
	,__class__: com_isartdigital_builder_ui_uimodule_ShopButton
});
var com_isartdigital_builder_ui_uimodule_ShopBuyHardButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.ShopBuyHardButton"] = com_isartdigital_builder_ui_uimodule_ShopBuyHardButton;
com_isartdigital_builder_ui_uimodule_ShopBuyHardButton.__name__ = ["com","isartdigital","builder","ui","uimodule","ShopBuyHardButton"];
com_isartdigital_builder_ui_uimodule_ShopBuyHardButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_ShopBuyHardButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_ShopBuyHardButton
});
var com_isartdigital_builder_ui_uimodule_ShopBuySoftButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.ShopBuySoftButton"] = com_isartdigital_builder_ui_uimodule_ShopBuySoftButton;
com_isartdigital_builder_ui_uimodule_ShopBuySoftButton.__name__ = ["com","isartdigital","builder","ui","uimodule","ShopBuySoftButton"];
com_isartdigital_builder_ui_uimodule_ShopBuySoftButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_ShopBuySoftButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_ShopBuySoftButton
});
var com_isartdigital_builder_ui_uimodule_ShopCloseButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.tap = this.click = $bind(this,this.onClick);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.ShopCloseButton"] = com_isartdigital_builder_ui_uimodule_ShopCloseButton;
com_isartdigital_builder_ui_uimodule_ShopCloseButton.__name__ = ["com","isartdigital","builder","ui","uimodule","ShopCloseButton"];
com_isartdigital_builder_ui_uimodule_ShopCloseButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_ShopCloseButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
	}
	,__class__: com_isartdigital_builder_ui_uimodule_ShopCloseButton
});
var com_isartdigital_builder_ui_uimodule_ShopRessourceButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_uimodule_ShopOnglet.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.ShopRessourceButton"] = com_isartdigital_builder_ui_uimodule_ShopRessourceButton;
com_isartdigital_builder_ui_uimodule_ShopRessourceButton.__name__ = ["com","isartdigital","builder","ui","uimodule","ShopRessourceButton"];
com_isartdigital_builder_ui_uimodule_ShopRessourceButton.__super__ = com_isartdigital_builder_ui_uimodule_ShopOnglet;
com_isartdigital_builder_ui_uimodule_ShopRessourceButton.prototype = $extend(com_isartdigital_builder_ui_uimodule_ShopOnglet.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_ShopRessourceButton
});
var com_isartdigital_builder_ui_uimodule_SoundButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_uimodule_CheckBox.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.SoundButton"] = com_isartdigital_builder_ui_uimodule_SoundButton;
com_isartdigital_builder_ui_uimodule_SoundButton.__name__ = ["com","isartdigital","builder","ui","uimodule","SoundButton"];
com_isartdigital_builder_ui_uimodule_SoundButton.__super__ = com_isartdigital_builder_ui_uimodule_CheckBox;
com_isartdigital_builder_ui_uimodule_SoundButton.prototype = $extend(com_isartdigital_builder_ui_uimodule_CheckBox.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_SoundButton
});
var com_isartdigital_builder_ui_uimodule_SpiceButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.click = this.tap = $bind(this,this.onClick);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.SpiceButton"] = com_isartdigital_builder_ui_uimodule_SpiceButton;
com_isartdigital_builder_ui_uimodule_SpiceButton.__name__ = ["com","isartdigital","builder","ui","uimodule","SpiceButton"];
com_isartdigital_builder_ui_uimodule_SpiceButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_SpiceButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_SHOP");
	}
	,__class__: com_isartdigital_builder_ui_uimodule_SpiceButton
});
var com_isartdigital_builder_ui_uimodule_UpgradeButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.interactive = true;
	this.buttonMode = true;
};
$hxClasses["com.isartdigital.builder.ui.uimodule.UpgradeButton"] = com_isartdigital_builder_ui_uimodule_UpgradeButton;
com_isartdigital_builder_ui_uimodule_UpgradeButton.__name__ = ["com","isartdigital","builder","ui","uimodule","UpgradeButton"];
com_isartdigital_builder_ui_uimodule_UpgradeButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_UpgradeButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_UpgradeButton
});
var com_isartdigital_builder_ui_uimodule_UpgradeDisableButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.interactive = true;
	this.buttonMode = true;
};
$hxClasses["com.isartdigital.builder.ui.uimodule.UpgradeDisableButton"] = com_isartdigital_builder_ui_uimodule_UpgradeDisableButton;
com_isartdigital_builder_ui_uimodule_UpgradeDisableButton.__name__ = ["com","isartdigital","builder","ui","uimodule","UpgradeDisableButton"];
com_isartdigital_builder_ui_uimodule_UpgradeDisableButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_UpgradeDisableButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_UpgradeDisableButton
});
var com_isartdigital_builder_ui_uimodule_UpgradeValideButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.interactive = true;
	this.buttonMode = true;
};
$hxClasses["com.isartdigital.builder.ui.uimodule.UpgradeValideButton"] = com_isartdigital_builder_ui_uimodule_UpgradeValideButton;
com_isartdigital_builder_ui_uimodule_UpgradeValideButton.__name__ = ["com","isartdigital","builder","ui","uimodule","UpgradeValideButton"];
com_isartdigital_builder_ui_uimodule_UpgradeValideButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_UpgradeValideButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_UpgradeValideButton
});
var com_isartdigital_builder_ui_uimodule_ValideButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.uimodule.ValideButton"] = com_isartdigital_builder_ui_uimodule_ValideButton;
com_isartdigital_builder_ui_uimodule_ValideButton.__name__ = ["com","isartdigital","builder","ui","uimodule","ValideButton"];
com_isartdigital_builder_ui_uimodule_ValideButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_uimodule_ValideButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_uimodule_ValideButton
});
var com_isartdigital_services_Ads = function() { };
$hxClasses["com.isartdigital.services.Ads"] = com_isartdigital_services_Ads;
com_isartdigital_services_Ads.__name__ = ["com","isartdigital","services","Ads"];
com_isartdigital_services_Ads.getImage = function(pCallback) {
	return com_isartdigital_services_Ads.askForImage(pCallback);
};
com_isartdigital_services_Ads.askForImage = function(pCallback,pVideo) {
	if(pVideo == null) pVideo = "";
	if(com_isartdigital_services_Ads.current != null || com_isartdigital_utils_Config.get_data().ads != null && !com_isartdigital_utils_Config.get_data().ads) return false;
	var lRequest = com_isartdigital_services_Ads.initService(pCallback);
	lRequest.addParameter("ad","image");
	if(pVideo != "") lRequest.addParameter("movie",pVideo);
	lRequest.request(true);
	return true;
};
com_isartdigital_services_Ads.getMovie = function(pCallback) {
	if(com_isartdigital_services_Ads.current != null || com_isartdigital_utils_Config.get_data().ads != null && !com_isartdigital_utils_Config.get_data().ads) return false;
	var lRequest = com_isartdigital_services_Ads.initService(pCallback);
	lRequest.addParameter("ad","movie");
	lRequest.request(true);
	return true;
};
com_isartdigital_services_Ads.initService = function(pCallback) {
	var lRequest = new com_isartdigital_services_HttpService(pCallback);
	com_isartdigital_services_Ads.callback = pCallback;
	lRequest.addParameter("type",com_isartdigital_utils_system_DeviceCapabilities.textureType);
	lRequest.addParameter("lang",com_isartdigital_utils_Config.get_language());
	lRequest.onData = com_isartdigital_services_Ads.onData;
	return lRequest;
};
com_isartdigital_services_Ads.onData = function(pData) {
	var lData = JSON.parse(pData);
	if(lData.type == "movie") com_isartdigital_services_Ads.current = new com_isartdigital_services__$Ads_AdMovie(lData.id,lData.url,lData.target); else com_isartdigital_services_Ads.current = new com_isartdigital_services__$Ads_AdImage(lData.id,lData.url,lData.target);
};
com_isartdigital_services_Ads.onQuit = function(pClose) {
	var lId = com_isartdigital_services_Ads.current.id;
	com_isartdigital_services_Ads.current.close();
	com_isartdigital_services_Ads.current = null;
	if(pClose == "end") com_isartdigital_services_Ads.askForImage(com_isartdigital_services_Ads.callback,lId); else {
		if(pClose == "close" || pClose == "click") {
			var lRequest = new com_isartdigital_services_HttpService();
			lRequest.addParameter("close",pClose == "click"?"click":"image");
			lRequest.request(true);
		}
		com_isartdigital_services_Ads.callback({ close : pClose});
		com_isartdigital_services_Ads.callback = null;
	}
};
var com_isartdigital_services__$Ads_Ad = function(pId,pUrl,pTarget) {
	com_isartdigital_utils_ui_Popin.call(this);
	this.modalImage = "assets/black_bg.png";
	this.id = pId;
	this.url = pUrl;
	this.target = pTarget;
	this.btnQuit = new PIXI.Container();
	this.addChild(this.btnQuit);
	this.positionables.unshift({ item : this.btnQuit, align : Math.random() < 0.5?"topRight":"topLeft", offsetX : 80, offsetY : 80});
	var lCircle = new PIXI.Graphics();
	lCircle.lineStyle(4,0);
	lCircle.beginFill(16777215);
	lCircle.drawCircle(0,0,40);
	lCircle.endFill();
	this.btnQuit.addChild(lCircle);
	this.txtQuit = new PIXI.Text("",{ font : "62px Arial", fill : "#000000", align : "center"});
	this.txtQuit.anchor.set(0.5,0.5);
	this.btnQuit.addChild(this.txtQuit);
	this.btnQuit.interactive = true;
	this.btnQuit.visible = false;
	this.timerError = new haxe_Timer(15000);
	this.timerError.run = $bind(this,this.onError);
	this.x = com_isartdigital_utils_game_GameStage.getInstance().get_safeZone().width / 2;
	this.y = com_isartdigital_utils_game_GameStage.getInstance().get_safeZone().height / 2;
	com_isartdigital_utils_game_GameStage.getInstance().addChild(this);
	this.open();
};
$hxClasses["com.isartdigital.services._Ads.Ad"] = com_isartdigital_services__$Ads_Ad;
com_isartdigital_services__$Ads_Ad.__name__ = ["com","isartdigital","services","_Ads","Ad"];
com_isartdigital_services__$Ads_Ad.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_services__$Ads_Ad.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	onError: function() {
		if(!this.btnQuit.visible) {
			this.btnQuit.visible = true;
			this.duration = 0;
			this.onTimer();
		}
		this.timerError.stop();
	}
	,onTimer: function() {
		if(this.duration <= 0) {
			if(this.timer != null) this.timer.stop();
			this.allowQuit();
		} else this.txtQuit.text = Std.string(this.duration);
		this.duration--;
	}
	,allowQuit: function() {
		this.btnQuit.removeChild(this.txtQuit);
		var lCross = new PIXI.Graphics();
		lCross.lineStyle(8,0);
		lCross.moveTo(-20,-20);
		lCross.lineTo(20,20);
		lCross.moveTo(-20,20);
		lCross.lineTo(20,-20);
		this.btnQuit.addChild(lCross);
		this.btnQuit.buttonMode = true;
		this.btnQuit.once("click",$bind(this,this.onQuit));
		this.btnQuit.once("tap",$bind(this,this.onQuit));
	}
	,createContent: function() {
	}
	,onComplete: function(pEvent) {
		this.createContent();
		this.content.anchor.set(0.5,0.5);
		this.content.scale.set(1 / com_isartdigital_utils_system_DeviceCapabilities.textureRatio,1 / com_isartdigital_utils_system_DeviceCapabilities.textureRatio);
		this.addChildAt(this.content,0);
		this.timer = new haxe_Timer(1000);
		if(Math.random() < 0.5) this.duration = 0; else this.duration = 5;
		this.timer.run = $bind(this,this.onTimer);
		this.onTimer();
		this.btnQuit.visible = true;
	}
	,quit: function(pType) {
		com_isartdigital_utils_game_GameStage.getInstance().removeChild(this);
		com_isartdigital_services_Ads.onQuit(pType);
	}
	,onQuit: function(pEvent) {
	}
	,close: function() {
		if(this.timer != null) this.timer.stop();
		if(this.timerError != null) this.timerError.stop();
		com_isartdigital_utils_ui_Popin.prototype.close.call(this);
	}
	,__class__: com_isartdigital_services__$Ads_Ad
});
var com_isartdigital_services__$Ads_AdImage = function(pId,pUrl,pTarget) {
	com_isartdigital_services__$Ads_Ad.call(this,pId,pUrl,pTarget);
	var lLoader = new PIXI.loaders.Loader();
	lLoader.add(this.url);
	lLoader.once("complete",$bind(this,this.onComplete));
	lLoader.load();
};
$hxClasses["com.isartdigital.services._Ads.AdImage"] = com_isartdigital_services__$Ads_AdImage;
com_isartdigital_services__$Ads_AdImage.__name__ = ["com","isartdigital","services","_Ads","AdImage"];
com_isartdigital_services__$Ads_AdImage.__super__ = com_isartdigital_services__$Ads_Ad;
com_isartdigital_services__$Ads_AdImage.prototype = $extend(com_isartdigital_services__$Ads_Ad.prototype,{
	onComplete: function(pEvent) {
		com_isartdigital_services__$Ads_Ad.prototype.onComplete.call(this,pEvent);
		this.content.interactive = true;
		this.content.buttonMode = true;
		this.content.once("click",$bind(this,this.onOpen));
		this.content.once("tap",$bind(this,this.onOpen));
	}
	,createContent: function() {
		this.content = new PIXI.Sprite(PIXI.Texture.fromImage(this.url));
	}
	,onOpen: function(pEvent) {
		window.open(this.target + "?" + Type.getClassName(js_Boot.getClass(this)).split(".").pop());
		this.quit("click");
	}
	,onQuit: function(pEvent) {
		this.quit("close");
	}
	,__class__: com_isartdigital_services__$Ads_AdImage
});
var com_isartdigital_services__$Ads_AdMovie = function(pId,pUrl,pTarget) {
	com_isartdigital_services__$Ads_Ad.call(this,pId,pUrl,pTarget);
	this.onComplete();
};
$hxClasses["com.isartdigital.services._Ads.AdMovie"] = com_isartdigital_services__$Ads_AdMovie;
com_isartdigital_services__$Ads_AdMovie.__name__ = ["com","isartdigital","services","_Ads","AdMovie"];
com_isartdigital_services__$Ads_AdMovie.__super__ = com_isartdigital_services__$Ads_Ad;
com_isartdigital_services__$Ads_AdMovie.prototype = $extend(com_isartdigital_services__$Ads_Ad.prototype,{
	onComplete: function(pEvent) {
		com_isartdigital_services__$Ads_Ad.prototype.onComplete.call(this,pEvent);
		if(com_isartdigital_utils_system_DeviceCapabilities.textureType == "md" || com_isartdigital_utils_system_DeviceCapabilities.textureType == "ld") {
			this.content.scale.x *= 0.8;
			this.content.scale.y *= 0.8;
		}
	}
	,createContent: function() {
		var texture = PIXI.Texture.fromVideoUrl(this.url);
		var source = texture.baseTexture.source;
		this.content = new PIXI.Sprite(texture);
		(js_Boot.__cast(this.content.texture.baseTexture.source , HTMLVideoElement)).onended = $bind(this,this.onEnded);
	}
	,onQuit: function(pEvent) {
		this.quit("cancel");
	}
	,onEnded: function() {
		this.quit("end");
	}
	,close: function() {
		if(this.content != null) {
			(js_Boot.__cast(this.content.texture.baseTexture.source , HTMLVideoElement)).onended = null;
			(js_Boot.__cast(this.content.texture.baseTexture.source , HTMLVideoElement)).pause();
		}
		com_isartdigital_services__$Ads_Ad.prototype.close.call(this);
	}
	,__class__: com_isartdigital_services__$Ads_AdMovie
});
var com_isartdigital_services_FacebookPicture = function() {
};
$hxClasses["com.isartdigital.services.FacebookPicture"] = com_isartdigital_services_FacebookPicture;
com_isartdigital_services_FacebookPicture.__name__ = ["com","isartdigital","services","FacebookPicture"];
com_isartdigital_services_FacebookPicture.load = function(path) {
	com_isartdigital_services_FacebookPicture.picturePath = path;
	var loader = new com_isartdigital_utils_loader_GameLoader();
	loader.addAssetFile(com_isartdigital_services_FacebookPicture.picturePath);
	loader.once("complete",com_isartdigital_services_FacebookPicture.onPictureLoaded);
	loader.load();
};
com_isartdigital_services_FacebookPicture.onPictureLoaded = function() {
	com_isartdigital_services_FacebookPicture.fillPictureWithTexture();
	com_isartdigital_services_FacebookPicture.addBlackAndWhiteFilter();
	com_isartdigital_services_FacebookPicture.movePictureIntoFrame();
};
com_isartdigital_services_FacebookPicture.fillPictureWithTexture = function() {
	com_isartdigital_services_FacebookPicture.picture = new PIXI.Sprite(PIXI.Texture.fromImage(com_isartdigital_services_FacebookPicture.picturePath));
};
com_isartdigital_services_FacebookPicture.addBlackAndWhiteFilter = function() {
	var filter = new PIXI.filters.ColorMatrixFilter();
	filter.blackAndWhite(false);
	com_isartdigital_services_FacebookPicture.picture.filters = [filter];
};
com_isartdigital_services_FacebookPicture.movePictureIntoFrame = function() {
	var hudContainer = com_isartdigital_utils_game_GameStage.getInstance().getHudContainer();
	var hud = com_isartdigital_builder_ui_hud_Hud.getInstance();
	com_isartdigital_services_FacebookPicture.picture.x = hud.levelComponent.x - 330;
	com_isartdigital_services_FacebookPicture.picture.y = hud.levelComponent.y - 190;
	com_isartdigital_services_FacebookPicture.picture.height = 190;
	com_isartdigital_services_FacebookPicture.picture.width = 190;
	hudContainer.addChild(com_isartdigital_services_FacebookPicture.picture);
	hudContainer.children.unshift(hudContainer.children.pop());
};
com_isartdigital_services_FacebookPicture.prototype = {
	__class__: com_isartdigital_services_FacebookPicture
};
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
$hxClasses["haxe.Http"] = haxe_Http;
haxe_Http.__name__ = ["haxe","Http"];
haxe_Http.prototype = {
	addParameter: function(param,value) {
		this.params.push({ param : param, value : value});
		return this;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var com_isartdigital_services_HttpService = function(pCallback) {
	this.callback = pCallback;
	haxe_Http.call(this,"https://fbgame.isartdigital.com/2017_builder/builder0/broadcast/");
	if(this.callback != null) {
		this.onData = $bind(this,this._onData);
		this.onError = $bind(this,this._onError);
	}
	if(com_isartdigital_utils_Config.get_debug()) this.addParameter("debug","");
};
$hxClasses["com.isartdigital.services.HttpService"] = com_isartdigital_services_HttpService;
com_isartdigital_services_HttpService.__name__ = ["com","isartdigital","services","HttpService"];
com_isartdigital_services_HttpService.__super__ = haxe_Http;
com_isartdigital_services_HttpService.prototype = $extend(haxe_Http.prototype,{
	_onData: function(pData) {
		this.callback(JSON.parse(pData));
		this.callback = null;
	}
	,_onError: function(pError) {
		console.log(pError);
		this.callback = null;
	}
	,__class__: com_isartdigital_services_HttpService
});
var com_isartdigital_services_Users = function() { };
$hxClasses["com.isartdigital.services.Users"] = com_isartdigital_services_Users;
com_isartdigital_services_Users.__name__ = ["com","isartdigital","services","Users"];
com_isartdigital_services_Users.setInfos = function(infosSource) {
	var infosSourceTyped = com_isartdigital_services_Users.typeUserInfos(infosSource);
	return com_isartdigital_services_Users.infos = infosSourceTyped;
};
com_isartdigital_services_Users.typeUserInfos = function(userInfos) {
	var _g1 = 0;
	var _g = userInfos.lanterns.length;
	while(_g1 < _g) {
		var i = _g1++;
		userInfos.lanterns[i].x = userInfos.lanterns[i].x | 0;
		userInfos.lanterns[i].y = userInfos.lanterns[i].y | 0;
	}
	var s = userInfos.dailyreward;
	userInfos.dailyreward = HxOverrides.strDate(s);
	userInfos.experience = Std["int"](userInfos.experience);
	userInfos.ftue_complet = userInfos.ftue_complet == 1;
	var s1 = userInfos.parade;
	userInfos.parade = HxOverrides.strDate(s1);
	userInfos.resources.gold = Std["int"](userInfos.resources.gold);
	userInfos.resources.offering = Std["int"](userInfos.resources.offering);
	userInfos.resources.spice = Std["int"](userInfos.resources.spice);
	return userInfos;
};
var com_isartdigital_utils_Config = function() { };
$hxClasses["com.isartdigital.utils.Config"] = com_isartdigital_utils_Config;
com_isartdigital_utils_Config.__name__ = ["com","isartdigital","utils","Config"];
com_isartdigital_utils_Config.__properties__ = {get_data:"get_data",get_fontsPath:"get_fontsPath",get_jsonPath:"get_jsonPath",get_soundsPath:"get_soundsPath",get_assetsPath:"get_assetsPath",get_txtsPath:"get_txtsPath",get_langPath:"get_langPath",get_qrcode:"get_qrcode",get_fps:"get_fps",get_debug:"get_debug",get_languages:"get_languages",get_language:"get_language",get_version:"get_version"}
com_isartdigital_utils_Config.init = function(pConfig) {
	var _g = 0;
	var _g1 = Reflect.fields(pConfig);
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		Reflect.setField(com_isartdigital_utils_Config._data,i,Reflect.field(pConfig,i));
	}
	if(com_isartdigital_utils_Config._data.version == null) com_isartdigital_utils_Config._data.version = "0.0.0";
	if(com_isartdigital_utils_Config._data.language == null || com_isartdigital_utils_Config._data.language == "") {
		var _this = window.navigator.language;
		com_isartdigital_utils_Config._data.language = HxOverrides.substr(_this,0,2);
	}
	if(com_isartdigital_utils_Config._data.languages == []) com_isartdigital_utils_Config._data.languages.push(com_isartdigital_utils_Config._data.language);
	if(com_isartdigital_utils_Config._data.debug == null) com_isartdigital_utils_Config._data.debug = false;
	if(com_isartdigital_utils_Config._data.fps == null) com_isartdigital_utils_Config._data.fps = false;
	if(com_isartdigital_utils_Config._data.qrcode == null) com_isartdigital_utils_Config._data.qrcode = false;
	if(com_isartdigital_utils_Config._data.langPath == null) com_isartdigital_utils_Config._data.langPath = "";
	if(com_isartdigital_utils_Config._data.txtsPath == null) com_isartdigital_utils_Config._data.txtsPath = "";
	if(com_isartdigital_utils_Config._data.assetsPath == null) com_isartdigital_utils_Config._data.assetsPath = "";
	if(com_isartdigital_utils_Config._data.fontsPath == null) com_isartdigital_utils_Config._data.fontsPath = "";
	if(com_isartdigital_utils_Config._data.soundsPath == null) com_isartdigital_utils_Config._data.soundsPath = "";
	if(com_isartdigital_utils_Config._data.jsonPath == null) com_isartdigital_utils_Config._data.jsonPath = "";
};
com_isartdigital_utils_Config.get_data = function() {
	return com_isartdigital_utils_Config._data;
};
com_isartdigital_utils_Config.get_version = function() {
	return com_isartdigital_utils_Config._data.version;
};
com_isartdigital_utils_Config.get_language = function() {
	return com_isartdigital_utils_Config.get_data().language;
};
com_isartdigital_utils_Config.get_languages = function() {
	return com_isartdigital_utils_Config.get_data().languages;
};
com_isartdigital_utils_Config.get_debug = function() {
	return com_isartdigital_utils_Config.get_data().debug;
};
com_isartdigital_utils_Config.get_fps = function() {
	return com_isartdigital_utils_Config.get_data().fps;
};
com_isartdigital_utils_Config.get_qrcode = function() {
	return com_isartdigital_utils_Config.get_data().qrcode;
};
com_isartdigital_utils_Config.get_langPath = function() {
	return com_isartdigital_utils_Config._data.langPath;
};
com_isartdigital_utils_Config.get_txtsPath = function() {
	return com_isartdigital_utils_Config._data.txtsPath;
};
com_isartdigital_utils_Config.get_assetsPath = function() {
	return com_isartdigital_utils_Config._data.assetsPath;
};
com_isartdigital_utils_Config.get_fontsPath = function() {
	return com_isartdigital_utils_Config._data.fontsPath;
};
com_isartdigital_utils_Config.get_soundsPath = function() {
	return com_isartdigital_utils_Config._data.soundsPath;
};
com_isartdigital_utils_Config.get_jsonPath = function() {
	return com_isartdigital_utils_Config._data.jsonPath;
};
var com_isartdigital_utils_Debug = function() {
};
$hxClasses["com.isartdigital.utils.Debug"] = com_isartdigital_utils_Debug;
com_isartdigital_utils_Debug.__name__ = ["com","isartdigital","utils","Debug"];
com_isartdigital_utils_Debug.getInstance = function() {
	if(com_isartdigital_utils_Debug.instance == null) com_isartdigital_utils_Debug.instance = new com_isartdigital_utils_Debug();
	return com_isartdigital_utils_Debug.instance;
};
com_isartdigital_utils_Debug.error = function(pArg) {
	console.error(pArg);
};
com_isartdigital_utils_Debug.warn = function(pArg) {
	console.warn(pArg);
};
com_isartdigital_utils_Debug.table = function(pArg) {
	console.table(pArg);
};
com_isartdigital_utils_Debug.info = function(pArg) {
	console.info(pArg);
};
com_isartdigital_utils_Debug.prototype = {
	init: function() {
		if(com_isartdigital_utils_Config.get_fps()) {
			this.fps = new FPSMeter();
			this.fps.show();
			this.fps.showFps();
			this.ticker = new PIXI.ticker.Ticker();
			this.ticker.add($bind(this,this.updateFps));
			this.ticker.start();
		}
		if(com_isartdigital_utils_Config.get_qrcode()) {
			var lQr = new Image();
			lQr.style.position = "absolute";
			lQr.style.right = "0px";
			lQr.style.bottom = "0px";
			var lSize = Std["int"](0.35 * com_isartdigital_utils_system_DeviceCapabilities.getSizeFactor());
			lQr.src = "https://chart.googleapis.com/chart?chs=" + lSize + "x" + lSize + "&cht=qr&chl=" + window.location.href + "&choe=UTF-8";
			window.document.body.appendChild(lQr);
		}
	}
	,updateFps: function() {
		this.fps.tick();
		this.fps.tickStart();
	}
	,destroy: function() {
		this.ticker.stop();
	}
	,__class__: com_isartdigital_utils_Debug
};
var com_isartdigital_utils_Localization = function() {
	this.myJson = new haxe_ds_StringMap();
};
$hxClasses["com.isartdigital.utils.Localization"] = com_isartdigital_utils_Localization;
com_isartdigital_utils_Localization.__name__ = ["com","isartdigital","utils","Localization"];
com_isartdigital_utils_Localization.getInstance = function() {
	if(com_isartdigital_utils_Localization.instance == null) com_isartdigital_utils_Localization.instance = new com_isartdigital_utils_Localization();
	return com_isartdigital_utils_Localization.instance;
};
com_isartdigital_utils_Localization.prototype = {
	setDataLocalization: function(pData) {
		var _g = 0;
		var _g1 = Reflect.fields(pData);
		while(_g < _g1.length) {
			var label = _g1[_g];
			++_g;
			var value = Reflect.field(pData,label);
			this.myJson.set(label,value);
		}
	}
	,getText: function(pLabel) {
		return this.myJson.get(pLabel);
	}
	,destroy: function() {
		com_isartdigital_utils_Localization.instance = null;
	}
	,__class__: com_isartdigital_utils_Localization
};
var com_isartdigital_utils_events_EventType = function() { };
$hxClasses["com.isartdigital.utils.events.EventType"] = com_isartdigital_utils_events_EventType;
com_isartdigital_utils_events_EventType.__name__ = ["com","isartdigital","utils","events","EventType"];
var com_isartdigital_utils_events_FacebookEventType = function() { };
$hxClasses["com.isartdigital.utils.events.FacebookEventType"] = com_isartdigital_utils_events_FacebookEventType;
com_isartdigital_utils_events_FacebookEventType.__name__ = ["com","isartdigital","utils","events","FacebookEventType"];
com_isartdigital_utils_events_FacebookEventType.__super__ = com_isartdigital_utils_events_EventType;
com_isartdigital_utils_events_FacebookEventType.prototype = $extend(com_isartdigital_utils_events_EventType.prototype,{
	__class__: com_isartdigital_utils_events_FacebookEventType
});
var com_isartdigital_utils_events_LoadEventType = function() { };
$hxClasses["com.isartdigital.utils.events.LoadEventType"] = com_isartdigital_utils_events_LoadEventType;
com_isartdigital_utils_events_LoadEventType.__name__ = ["com","isartdigital","utils","events","LoadEventType"];
com_isartdigital_utils_events_LoadEventType.__super__ = com_isartdigital_utils_events_EventType;
com_isartdigital_utils_events_LoadEventType.prototype = $extend(com_isartdigital_utils_events_EventType.prototype,{
	__class__: com_isartdigital_utils_events_LoadEventType
});
var com_isartdigital_utils_events_MouseEventType = function() { };
$hxClasses["com.isartdigital.utils.events.MouseEventType"] = com_isartdigital_utils_events_MouseEventType;
com_isartdigital_utils_events_MouseEventType.__name__ = ["com","isartdigital","utils","events","MouseEventType"];
com_isartdigital_utils_events_MouseEventType.__super__ = com_isartdigital_utils_events_EventType;
com_isartdigital_utils_events_MouseEventType.prototype = $extend(com_isartdigital_utils_events_EventType.prototype,{
	__class__: com_isartdigital_utils_events_MouseEventType
});
var com_isartdigital_utils_events_TouchEventType = function() { };
$hxClasses["com.isartdigital.utils.events.TouchEventType"] = com_isartdigital_utils_events_TouchEventType;
com_isartdigital_utils_events_TouchEventType.__name__ = ["com","isartdigital","utils","events","TouchEventType"];
com_isartdigital_utils_events_TouchEventType.__super__ = com_isartdigital_utils_events_EventType;
com_isartdigital_utils_events_TouchEventType.prototype = $extend(com_isartdigital_utils_events_EventType.prototype,{
	__class__: com_isartdigital_utils_events_TouchEventType
});
var com_isartdigital_utils_facebook_Facebook = function() { };
$hxClasses["com.isartdigital.utils.facebook.Facebook"] = com_isartdigital_utils_facebook_Facebook;
com_isartdigital_utils_facebook_Facebook.__name__ = ["com","isartdigital","utils","facebook","Facebook"];
com_isartdigital_utils_facebook_Facebook.init = function() {
	FB.init({ appId : com_isartdigital_utils_facebook_Facebook.appId, xfbml : true, version : "v2.5", cookie : true});
	FB.getLoginStatus(com_isartdigital_utils_facebook_Facebook.getLoginStatus);
};
com_isartdigital_utils_facebook_Facebook.load = function(pAppId,pPermissions) {
	com_isartdigital_utils_facebook_Facebook.appId = pAppId;
	window.fbAsyncInit = com_isartdigital_utils_facebook_Facebook.init;
	var lDoc = window.document;
	var lScript = "script";
	var lID = "facebook-jssdk";
	var lJs;
	var lFjs = lDoc.getElementsByTagName(lScript)[0];
	if(lDoc.getElementById(com_isartdigital_utils_facebook_Facebook.appId) != null) return;
	if(pPermissions != null) com_isartdigital_utils_facebook_Facebook.permissions = pPermissions;
	lJs = js_Boot.__cast(lDoc.createElement(lScript) , HTMLScriptElement);
	lJs.id = lID;
	lJs.src = "//connect.facebook.net/en_US/sdk.js";
	lFjs.parentNode.insertBefore(lJs,lFjs);
};
com_isartdigital_utils_facebook_Facebook.getLoginStatus = function(pResponse) {
	if(pResponse.status == "connected") {
		com_isartdigital_utils_facebook_Facebook.authResponse = pResponse.authResponse;
		com_isartdigital_utils_facebook_Facebook.token = com_isartdigital_utils_facebook_Facebook.authResponse.accessToken;
		com_isartdigital_utils_facebook_Facebook.uid = com_isartdigital_utils_facebook_Facebook.authResponse.userID;
		com_isartdigital_utils_facebook_Facebook.onLogin();
	} else FB.login(com_isartdigital_utils_facebook_Facebook.getLoginStatus,com_isartdigital_utils_facebook_Facebook.permissions);
};
com_isartdigital_utils_facebook_Facebook.api = function(pPath,pMethod,pParams,pCallBack) {
	FB.api(pPath,pMethod,pParams,pCallBack);
};
com_isartdigital_utils_facebook_Facebook.ui = function(pParams,pCallBack) {
	FB.ui(pParams,pCallBack);
};
var com_isartdigital_utils_game_BoxType = { __ename__ : true, __constructs__ : ["NONE","SIMPLE","MULTIPLE","SELF"] };
com_isartdigital_utils_game_BoxType.NONE = ["NONE",0];
com_isartdigital_utils_game_BoxType.NONE.toString = $estr;
com_isartdigital_utils_game_BoxType.NONE.__enum__ = com_isartdigital_utils_game_BoxType;
com_isartdigital_utils_game_BoxType.SIMPLE = ["SIMPLE",1];
com_isartdigital_utils_game_BoxType.SIMPLE.toString = $estr;
com_isartdigital_utils_game_BoxType.SIMPLE.__enum__ = com_isartdigital_utils_game_BoxType;
com_isartdigital_utils_game_BoxType.MULTIPLE = ["MULTIPLE",2];
com_isartdigital_utils_game_BoxType.MULTIPLE.toString = $estr;
com_isartdigital_utils_game_BoxType.MULTIPLE.__enum__ = com_isartdigital_utils_game_BoxType;
com_isartdigital_utils_game_BoxType.SELF = ["SELF",3];
com_isartdigital_utils_game_BoxType.SELF.toString = $estr;
com_isartdigital_utils_game_BoxType.SELF.__enum__ = com_isartdigital_utils_game_BoxType;
var com_isartdigital_utils_game_Camera = function() {
	this.delayV = 60;
	this.countV = 0;
	this.delayH = 120;
	this.countH = 0;
	this.inertiaMin = new PIXI.Point(2,8);
	this.inertiaMax = new PIXI.Point(40,20);
	this.startScrollPosition = new PIXI.Point(0,0);
	this.isScrolling = false;
	this.asMoved = false;
	this.cameraFocus = new com_isartdigital_utils_game_GameObject();
	var lGameContainer = com_isartdigital_utils_game_GameStage.getInstance().getGameContainer();
	window.addEventListener("mousedown",$bind(this,this.startScroll));
	window.addEventListener("mouseup",$bind(this,this.stopScroll));
	window.addEventListener("mousemove",$bind(this,this.moveScroll));
};
$hxClasses["com.isartdigital.utils.game.Camera"] = com_isartdigital_utils_game_Camera;
com_isartdigital_utils_game_Camera.__name__ = ["com","isartdigital","utils","game","Camera"];
com_isartdigital_utils_game_Camera.getInstance = function() {
	if(com_isartdigital_utils_game_Camera.instance == null) com_isartdigital_utils_game_Camera.instance = new com_isartdigital_utils_game_Camera();
	return com_isartdigital_utils_game_Camera.instance;
};
com_isartdigital_utils_game_Camera.prototype = {
	init: function() {
		com_isartdigital_utils_game_GameStage.getInstance().getGameContainer().addChild(this.cameraFocus);
		this.setTarget(com_isartdigital_utils_game_GameStage.getInstance().getGameContainer());
		this.setFocus(this.cameraFocus);
		this.cameraFocus.x = 0;
		this.cameraFocus.y = _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileWidth) / _$UInt_UInt_$Impl_$.toFloat(2) * (com_isartdigital_utils_Config.mapSize / 2);
		this.setPosition();
	}
	,update: function() {
		this.setPosition();
	}
	,setTarget: function(pTarget) {
		this.target = pTarget;
	}
	,setFocus: function(pFocus) {
		this.focus = pFocus;
	}
	,changePosition: function(pDelay) {
		if(pDelay == null) pDelay = true;
		this.countH++;
		this.countV++;
		var lCenter = com_isartdigital_utils_system_DeviceCapabilities.getScreenRect(this.target.parent);
		var lFocus = this.getFocusCoord();
		var lInertiaX;
		if(pDelay) lInertiaX = this.getInertiaX(); else lInertiaX = 1;
		var lInertiaY;
		if(pDelay) lInertiaY = this.getInertiaY(); else lInertiaY = 1;
		var lDeltaX = (lCenter.x + lCenter.width / 2 - lFocus.x - this.target.x) / lInertiaX;
		var lDeltaY = (lCenter.y + lCenter.height / 2 - lFocus.y - this.target.y) / lInertiaY;
		this.target.x += lDeltaX;
		this.target.y += lDeltaY;
	}
	,getInertiaX: function() {
		if(_$UInt_UInt_$Impl_$.gt(this.countH,this.delayH)) return this.inertiaMin.x;
		return this.inertiaMax.x + (function($this) {
			var $r;
			var a = _$UInt_UInt_$Impl_$.toFloat($this.countH) * ($this.inertiaMin.x - $this.inertiaMax.x);
			$r = a / _$UInt_UInt_$Impl_$.toFloat($this.delayH);
			return $r;
		}(this));
	}
	,getInertiaY: function() {
		if(_$UInt_UInt_$Impl_$.gt(this.countV,this.delayV)) return this.inertiaMin.y;
		return this.inertiaMax.y + (function($this) {
			var $r;
			var a = _$UInt_UInt_$Impl_$.toFloat($this.countV) * ($this.inertiaMin.y - $this.inertiaMax.y);
			$r = a / _$UInt_UInt_$Impl_$.toFloat($this.delayV);
			return $r;
		}(this));
	}
	,setPosition: function() {
		com_isartdigital_utils_game_GameStage.getInstance().render();
		this.changePosition(false);
	}
	,move: function() {
		this.changePosition();
	}
	,resetX: function() {
		this.countH = 0;
	}
	,resetY: function() {
		this.countV = 0;
	}
	,getFocusCoord: function() {
		return this.target.toLocal(this.focus.position,this.focus.parent);
	}
	,startScroll: function(pEvent) {
		this.isScrolling = true;
		var lCameraFocus = this.cameraFocus;
		this.startScrollPosition = new PIXI.Point(lCameraFocus.x + pEvent.layerX * 2,lCameraFocus.y + pEvent.layerY * 2);
	}
	,stopScroll: function() {
		var _g = this;
		this.isScrolling = false;
		haxe_Timer.delay(function() {
			_g.asMoved = false;
		},10);
	}
	,moveScroll: function(pEvent) {
		var totalOffsetMovedSinceLastMouseUp = Math.abs(this.startScrollPosition.x - pEvent.layerX * 2) + Math.abs(this.startScrollPosition.y - pEvent.layerY * 2);
		if(!js_Boot.__instanceof(pEvent.target,HTMLCanvasElement)) return;
		if(this.isScrolling && totalOffsetMovedSinceLastMouseUp > 50) {
			this.asMoved = true;
			this.cameraFocus.x = this.startScrollPosition.x - pEvent.layerX * 2;
			this.cameraFocus.y = this.startScrollPosition.y - pEvent.layerY * 2;
		}
	}
	,destroy: function() {
		com_isartdigital_utils_game_Camera.instance = null;
		var lGameContainer = com_isartdigital_utils_game_GameStage.getInstance().getGameContainer();
		window.addEventListener("mousedown",$bind(this,this.startScroll));
		window.addEventListener("mouseup",$bind(this,this.stopScroll));
	}
	,__class__: com_isartdigital_utils_game_Camera
};
var com_isartdigital_utils_game_CollisionManager = function() {
};
$hxClasses["com.isartdigital.utils.game.CollisionManager"] = com_isartdigital_utils_game_CollisionManager;
com_isartdigital_utils_game_CollisionManager.__name__ = ["com","isartdigital","utils","game","CollisionManager"];
com_isartdigital_utils_game_CollisionManager.hitTestObject = function(pObjectA,pObjectB) {
	return com_isartdigital_utils_game_CollisionManager.getIntersection(pObjectA.getBounds(),pObjectB.getBounds());
};
com_isartdigital_utils_game_CollisionManager.hitTestPoint = function(pItem,pGlobalPoint) {
	var lPoint = pItem.toLocal(pGlobalPoint);
	var x = lPoint.x;
	var y = lPoint.y;
	if(pItem.hitArea != null && pItem.hitArea.contains != null) return pItem.hitArea.contains(x,y); else if(js_Boot.__instanceof(pItem,PIXI.Sprite)) {
		var lSprite;
		lSprite = js_Boot.__cast(pItem , PIXI.Sprite);
		var lWidth = lSprite.texture.frame.width;
		var lHeight = lSprite.texture.frame.height;
		var lX1 = -lWidth * lSprite.anchor.x;
		var lY1;
		if(x > lX1 && x < lX1 + lWidth) {
			lY1 = -lHeight * lSprite.anchor.y;
			if(y > lY1 && y < lY1 + lHeight) return true;
		}
	} else if(js_Boot.__instanceof(pItem,PIXI.Graphics)) {
		var lGraphicsData = pItem.graphicsData;
		var _g1 = 0;
		var _g = lGraphicsData.length;
		while(_g1 < _g) {
			var i = _g1++;
			var lData = lGraphicsData[i];
			if(!lData.fill) continue;
			if(lData.shape != null && lData.shape.contains(x,y)) return true;
		}
	} else if(js_Boot.__instanceof(pItem,PIXI.Container)) {
		var lContainer;
		lContainer = js_Boot.__cast(pItem , PIXI.Container);
		var lLength = lContainer.children.length;
		var _g2 = 0;
		while(_g2 < lLength) {
			var i1 = _g2++;
			if(com_isartdigital_utils_game_CollisionManager.hitTestPoint(lContainer.children[i1],pGlobalPoint)) return true;
		}
	}
	return false;
};
com_isartdigital_utils_game_CollisionManager.hasCollision = function(pHitBoxA,pHitBoxB,pPointsA,pPointsB) {
	if(pHitBoxA == null || pHitBoxB == null) return false;
	if(!com_isartdigital_utils_game_CollisionManager.hitTestObject(pHitBoxA,pHitBoxB)) return false;
	if(pPointsA == null && pPointsB == null) return true;
	if(pPointsA != null) return com_isartdigital_utils_game_CollisionManager.testPoints(pPointsA,pHitBoxB);
	if(pPointsB != null) return com_isartdigital_utils_game_CollisionManager.testPoints(pPointsB,pHitBoxA);
	return false;
};
com_isartdigital_utils_game_CollisionManager.getIntersection = function(pRectA,pRectB) {
	return !(pRectB.x > pRectA.x + pRectA.width || pRectB.x + pRectB.width < pRectA.x || pRectB.y > pRectA.y + pRectA.height || pRectB.y + pRectB.height < pRectA.y);
};
com_isartdigital_utils_game_CollisionManager.testPoints = function(pHitPoints,pHitBox) {
	var lLength = pHitPoints.length;
	var _g = 0;
	while(_g < lLength) {
		var i = _g++;
		if(com_isartdigital_utils_game_CollisionManager.hitTestPoint(pHitBox,pHitPoints[i])) return true;
	}
	return false;
};
com_isartdigital_utils_game_CollisionManager.prototype = {
	__class__: com_isartdigital_utils_game_CollisionManager
};
var com_isartdigital_utils_game_Filter = function() { };
$hxClasses["com.isartdigital.utils.game.Filter"] = com_isartdigital_utils_game_Filter;
com_isartdigital_utils_game_Filter.__name__ = ["com","isartdigital","utils","game","Filter"];
com_isartdigital_utils_game_Filter.getRed = function() {
	var lColorMatrixFilter = new PIXI.filters.ColorMatrixFilter();
	lColorMatrixFilter.matrix = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0];
	return [lColorMatrixFilter];
};
com_isartdigital_utils_game_Filter.getGreen = function() {
	var lColorMatrixFilter = new PIXI.filters.ColorMatrixFilter();
	lColorMatrixFilter.matrix = [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0];
	return [lColorMatrixFilter];
};
com_isartdigital_utils_game_Filter.getBrightness = function(intensity) {
	var lColorMatrixFilter = new PIXI.filters.ColorMatrixFilter();
	lColorMatrixFilter.brightness(intensity,false);
	return [lColorMatrixFilter];
};
var com_isartdigital_utils_game_GameStage = function() {
	this._safeZone = new PIXI.Rectangle(0,0,2048,1366);
	this._scaleMode = com_isartdigital_utils_game_GameStageScale.SHOW_ALL;
	this._alignMode = com_isartdigital_utils_game_GameStageAlign.CENTER;
	PIXI.Container.call(this);
	this.gameContainer = new PIXI.Container();
	this.addChild(this.gameContainer);
	this.screensContainer = new PIXI.Container();
	this.addChild(this.screensContainer);
	this.hudContainer = new PIXI.Container();
	this.addChild(this.hudContainer);
	this.popinsContainer = new PIXI.Container();
	this.addChild(this.popinsContainer);
	this.backgroundContainer = new PIXI.Container();
	this.gameContainer.addChild(this.backgroundContainer);
	this.tilesContainer = new PIXI.Container();
	this.gameContainer.addChild(this.tilesContainer);
	this.buildingsContainer = new PIXI.Container();
	this.gameContainer.addChild(this.buildingsContainer);
};
$hxClasses["com.isartdigital.utils.game.GameStage"] = com_isartdigital_utils_game_GameStage;
com_isartdigital_utils_game_GameStage.__name__ = ["com","isartdigital","utils","game","GameStage"];
com_isartdigital_utils_game_GameStage.getInstance = function() {
	if(com_isartdigital_utils_game_GameStage.instance == null) com_isartdigital_utils_game_GameStage.instance = new com_isartdigital_utils_game_GameStage();
	return com_isartdigital_utils_game_GameStage.instance;
};
com_isartdigital_utils_game_GameStage.__super__ = PIXI.Container;
com_isartdigital_utils_game_GameStage.prototype = $extend(PIXI.Container.prototype,{
	init: function(pRender,pSafeZoneWidth,pSafeZoneHeight,pCenterGameContainer,pCenterScreensContainer,pCenterPopinContainer) {
		if(pCenterPopinContainer == null) pCenterPopinContainer = true;
		if(pCenterScreensContainer == null) pCenterScreensContainer = true;
		if(pCenterGameContainer == null) pCenterGameContainer = false;
		if(pSafeZoneHeight == null) pSafeZoneHeight = 2048;
		if(pSafeZoneWidth == null) pSafeZoneWidth = 2048;
		this._render = pRender;
		this._safeZone = new PIXI.Rectangle(0,0,_$UInt_UInt_$Impl_$.toFloat(pSafeZoneWidth),_$UInt_UInt_$Impl_$.toFloat(pSafeZoneHeight));
		if(pCenterGameContainer) {
			this.gameContainer.x = this.get_safeZone().width / 2;
			this.gameContainer.y = this.get_safeZone().height / 2;
		}
		if(pCenterScreensContainer) {
			this.screensContainer.x = this.get_safeZone().width / 2;
			this.screensContainer.y = this.get_safeZone().height / 2;
		}
		if(pCenterPopinContainer) {
			this.popinsContainer.x = this.get_safeZone().width / 2;
			this.popinsContainer.y = this.get_safeZone().height / 2;
		}
	}
	,resize: function() {
		var lWidth = com_isartdigital_utils_system_DeviceCapabilities.get_width();
		var lHeight = com_isartdigital_utils_system_DeviceCapabilities.get_height();
		var lRatio = Math.round(10000 * Math.min((function($this) {
			var $r;
			var b = $this.get_safeZone().width;
			$r = _$UInt_UInt_$Impl_$.toFloat(lWidth) / b;
			return $r;
		}(this)),(function($this) {
			var $r;
			var b1 = $this.get_safeZone().height;
			$r = _$UInt_UInt_$Impl_$.toFloat(lHeight) / b1;
			return $r;
		}(this)))) / 10000;
		if(this.get_scaleMode() == com_isartdigital_utils_game_GameStageScale.SHOW_ALL) this.scale.set(lRatio,lRatio); else this.scale.set(com_isartdigital_utils_system_DeviceCapabilities.textureRatio,com_isartdigital_utils_system_DeviceCapabilities.textureRatio);
		if(this.get_alignMode() == com_isartdigital_utils_game_GameStageAlign.LEFT || this.get_alignMode() == com_isartdigital_utils_game_GameStageAlign.TOP_LEFT || this.get_alignMode() == com_isartdigital_utils_game_GameStageAlign.BOTTOM_LEFT) this.x = 0; else if(this.get_alignMode() == com_isartdigital_utils_game_GameStageAlign.RIGHT || this.get_alignMode() == com_isartdigital_utils_game_GameStageAlign.TOP_RIGHT || this.get_alignMode() == com_isartdigital_utils_game_GameStageAlign.BOTTOM_RIGHT) {
			var b2 = this.get_safeZone().width * this.scale.x;
			this.x = _$UInt_UInt_$Impl_$.toFloat(lWidth) - b2;
		} else this.x = (function($this) {
			var $r;
			var b3 = $this.get_safeZone().width * $this.scale.x;
			$r = _$UInt_UInt_$Impl_$.toFloat(lWidth) - b3;
			return $r;
		}(this)) / 2;
		if(this.get_alignMode() == com_isartdigital_utils_game_GameStageAlign.TOP || this.get_alignMode() == com_isartdigital_utils_game_GameStageAlign.TOP_LEFT || this.get_alignMode() == com_isartdigital_utils_game_GameStageAlign.TOP_RIGHT) this.y = 0; else if(this.get_alignMode() == com_isartdigital_utils_game_GameStageAlign.BOTTOM || this.get_alignMode() == com_isartdigital_utils_game_GameStageAlign.BOTTOM_LEFT || this.get_alignMode() == com_isartdigital_utils_game_GameStageAlign.BOTTOM_RIGHT) {
			var b4 = this.get_safeZone().height * this.scale.y;
			this.y = _$UInt_UInt_$Impl_$.toFloat(lHeight) - b4;
		} else this.y = (function($this) {
			var $r;
			var b5 = $this.get_safeZone().height * $this.scale.y;
			$r = _$UInt_UInt_$Impl_$.toFloat(lHeight) - b5;
			return $r;
		}(this)) / 2;
		this.render();
		this.emit("resize",{ width : lWidth, height : lHeight});
	}
	,render: function() {
		if(this._render != null) this._render();
	}
	,get_alignMode: function() {
		return this._alignMode;
	}
	,set_alignMode: function(pAlign) {
		this._alignMode = pAlign;
		this.resize();
		return this._alignMode;
	}
	,get_scaleMode: function() {
		return this._scaleMode;
	}
	,set_scaleMode: function(pScale) {
		this._scaleMode = pScale;
		this.resize();
		return this._scaleMode;
	}
	,get_safeZone: function() {
		return this._safeZone;
	}
	,getGameContainer: function() {
		return this.gameContainer;
	}
	,getScreensContainer: function() {
		return this.screensContainer;
	}
	,getHudContainer: function() {
		return this.hudContainer;
	}
	,getPopinsContainer: function() {
		return this.popinsContainer;
	}
	,getTilesContainer: function() {
		return this.tilesContainer;
	}
	,getBuildingsContainer: function() {
		return this.buildingsContainer;
	}
	,getBackgroundContainer: function() {
		return this.backgroundContainer;
	}
	,destroy: function() {
		com_isartdigital_utils_game_GameStage.instance = null;
		PIXI.Container.prototype.destroy.call(this,true);
	}
	,__class__: com_isartdigital_utils_game_GameStage
	,__properties__: {get_safeZone:"get_safeZone",set_scaleMode:"set_scaleMode",get_scaleMode:"get_scaleMode",set_alignMode:"set_alignMode",get_alignMode:"get_alignMode"}
});
var com_isartdigital_utils_game_GameStageAlign = { __ename__ : true, __constructs__ : ["TOP","TOP_LEFT","TOP_RIGHT","CENTER","LEFT","RIGHT","BOTTOM","BOTTOM_LEFT","BOTTOM_RIGHT"] };
com_isartdigital_utils_game_GameStageAlign.TOP = ["TOP",0];
com_isartdigital_utils_game_GameStageAlign.TOP.toString = $estr;
com_isartdigital_utils_game_GameStageAlign.TOP.__enum__ = com_isartdigital_utils_game_GameStageAlign;
com_isartdigital_utils_game_GameStageAlign.TOP_LEFT = ["TOP_LEFT",1];
com_isartdigital_utils_game_GameStageAlign.TOP_LEFT.toString = $estr;
com_isartdigital_utils_game_GameStageAlign.TOP_LEFT.__enum__ = com_isartdigital_utils_game_GameStageAlign;
com_isartdigital_utils_game_GameStageAlign.TOP_RIGHT = ["TOP_RIGHT",2];
com_isartdigital_utils_game_GameStageAlign.TOP_RIGHT.toString = $estr;
com_isartdigital_utils_game_GameStageAlign.TOP_RIGHT.__enum__ = com_isartdigital_utils_game_GameStageAlign;
com_isartdigital_utils_game_GameStageAlign.CENTER = ["CENTER",3];
com_isartdigital_utils_game_GameStageAlign.CENTER.toString = $estr;
com_isartdigital_utils_game_GameStageAlign.CENTER.__enum__ = com_isartdigital_utils_game_GameStageAlign;
com_isartdigital_utils_game_GameStageAlign.LEFT = ["LEFT",4];
com_isartdigital_utils_game_GameStageAlign.LEFT.toString = $estr;
com_isartdigital_utils_game_GameStageAlign.LEFT.__enum__ = com_isartdigital_utils_game_GameStageAlign;
com_isartdigital_utils_game_GameStageAlign.RIGHT = ["RIGHT",5];
com_isartdigital_utils_game_GameStageAlign.RIGHT.toString = $estr;
com_isartdigital_utils_game_GameStageAlign.RIGHT.__enum__ = com_isartdigital_utils_game_GameStageAlign;
com_isartdigital_utils_game_GameStageAlign.BOTTOM = ["BOTTOM",6];
com_isartdigital_utils_game_GameStageAlign.BOTTOM.toString = $estr;
com_isartdigital_utils_game_GameStageAlign.BOTTOM.__enum__ = com_isartdigital_utils_game_GameStageAlign;
com_isartdigital_utils_game_GameStageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",7];
com_isartdigital_utils_game_GameStageAlign.BOTTOM_LEFT.toString = $estr;
com_isartdigital_utils_game_GameStageAlign.BOTTOM_LEFT.__enum__ = com_isartdigital_utils_game_GameStageAlign;
com_isartdigital_utils_game_GameStageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",8];
com_isartdigital_utils_game_GameStageAlign.BOTTOM_RIGHT.toString = $estr;
com_isartdigital_utils_game_GameStageAlign.BOTTOM_RIGHT.__enum__ = com_isartdigital_utils_game_GameStageAlign;
var com_isartdigital_utils_game_GameStageScale = { __ename__ : true, __constructs__ : ["NO_SCALE","SHOW_ALL"] };
com_isartdigital_utils_game_GameStageScale.NO_SCALE = ["NO_SCALE",0];
com_isartdigital_utils_game_GameStageScale.NO_SCALE.toString = $estr;
com_isartdigital_utils_game_GameStageScale.NO_SCALE.__enum__ = com_isartdigital_utils_game_GameStageScale;
com_isartdigital_utils_game_GameStageScale.SHOW_ALL = ["SHOW_ALL",1];
com_isartdigital_utils_game_GameStageScale.SHOW_ALL.toString = $estr;
com_isartdigital_utils_game_GameStageScale.SHOW_ALL.__enum__ = com_isartdigital_utils_game_GameStageScale;
var com_isartdigital_utils_game_factory_AnimFactory = function() {
};
$hxClasses["com.isartdigital.utils.game.factory.AnimFactory"] = com_isartdigital_utils_game_factory_AnimFactory;
com_isartdigital_utils_game_factory_AnimFactory.__name__ = ["com","isartdigital","utils","game","factory","AnimFactory"];
com_isartdigital_utils_game_factory_AnimFactory.prototype = {
	getAnim: function() {
		return this.anim;
	}
	,create: function(pID) {
		return null;
	}
	,update: function(pId) {
	}
	,setFrame: function(pAutoPlay,pStart) {
		if(pStart == null) pStart = 0;
		if(pAutoPlay == null) pAutoPlay = true;
	}
	,__class__: com_isartdigital_utils_game_factory_AnimFactory
};
var com_isartdigital_utils_game_factory_FlumpMovieAnimFactory = function() {
	com_isartdigital_utils_game_factory_AnimFactory.call(this);
};
$hxClasses["com.isartdigital.utils.game.factory.FlumpMovieAnimFactory"] = com_isartdigital_utils_game_factory_FlumpMovieAnimFactory;
com_isartdigital_utils_game_factory_FlumpMovieAnimFactory.__name__ = ["com","isartdigital","utils","game","factory","FlumpMovieAnimFactory"];
com_isartdigital_utils_game_factory_FlumpMovieAnimFactory.__super__ = com_isartdigital_utils_game_factory_AnimFactory;
com_isartdigital_utils_game_factory_FlumpMovieAnimFactory.prototype = $extend(com_isartdigital_utils_game_factory_AnimFactory.prototype,{
	getAnim: function() {
		if(this.anim != null) {
			this.anim.parent.removeChild(this.anim);
			this.anim.destroy();
			this.anim = null;
		}
		return com_isartdigital_utils_game_factory_AnimFactory.prototype.getAnim.call(this);
	}
	,create: function(pID) {
		this.anim = new pixi_display_FlumpMovie(pID);
		return this.anim;
	}
	,setFrame: function(pAutoPlay,pStart) {
		if(pStart == null) pStart = 0;
		if(pAutoPlay == null) pAutoPlay = true;
		var lAnim;
		lAnim = js_Boot.__cast(this.anim , pixi_display_FlumpMovie);
		if(lAnim.get_totalFrames() > 1) {
			if(pAutoPlay) lAnim.gotoAndPlay(pStart); else lAnim.gotoAndStop(pStart);
		} else if(!pAutoPlay) lAnim.stop();
	}
	,__class__: com_isartdigital_utils_game_factory_FlumpMovieAnimFactory
});
var com_isartdigital_utils_game_factory_FlumpSpriteAnimFactory = function() {
	com_isartdigital_utils_game_factory_AnimFactory.call(this);
};
$hxClasses["com.isartdigital.utils.game.factory.FlumpSpriteAnimFactory"] = com_isartdigital_utils_game_factory_FlumpSpriteAnimFactory;
com_isartdigital_utils_game_factory_FlumpSpriteAnimFactory.__name__ = ["com","isartdigital","utils","game","factory","FlumpSpriteAnimFactory"];
com_isartdigital_utils_game_factory_FlumpSpriteAnimFactory.__super__ = com_isartdigital_utils_game_factory_AnimFactory;
com_isartdigital_utils_game_factory_FlumpSpriteAnimFactory.prototype = $extend(com_isartdigital_utils_game_factory_AnimFactory.prototype,{
	getAnim: function() {
		if(this.anim != null) {
			this.anim.parent.removeChild(this.anim);
			this.anim.destroy();
			this.anim = null;
		}
		return com_isartdigital_utils_game_factory_AnimFactory.prototype.getAnim.call(this);
	}
	,create: function(pID) {
		this.anim = new pixi_display_FlumpSprite(pID);
		return this.anim;
	}
	,setFrame: function(pAutoPlay,pStart) {
		if(pStart == null) pStart = 0;
		if(pAutoPlay == null) pAutoPlay = true;
	}
	,__class__: com_isartdigital_utils_game_factory_FlumpSpriteAnimFactory
});
var com_isartdigital_utils_game_factory_MovieClipAnimFactory = function() {
	com_isartdigital_utils_game_factory_AnimFactory.call(this);
};
$hxClasses["com.isartdigital.utils.game.factory.MovieClipAnimFactory"] = com_isartdigital_utils_game_factory_MovieClipAnimFactory;
com_isartdigital_utils_game_factory_MovieClipAnimFactory.__name__ = ["com","isartdigital","utils","game","factory","MovieClipAnimFactory"];
com_isartdigital_utils_game_factory_MovieClipAnimFactory.__properties__ = {set_textureDigits:"set_textureDigits"}
com_isartdigital_utils_game_factory_MovieClipAnimFactory.set_textureDigits = function(pDigits) {
	com_isartdigital_utils_game_factory_MovieClipAnimFactory.digits = "";
	var _g = 0;
	while(_g < pDigits) {
		var i = _g++;
		com_isartdigital_utils_game_factory_MovieClipAnimFactory.digits += "0";
	}
	return com_isartdigital_utils_game_factory_MovieClipAnimFactory.textureDigits = pDigits;
};
com_isartdigital_utils_game_factory_MovieClipAnimFactory.addTextures = function(pJson) {
	var lFrames = Reflect.field(pJson,"frames");
	if(com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesDefinition == null) com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesDefinition = new haxe_ds_StringMap();
	if(com_isartdigital_utils_game_factory_MovieClipAnimFactory.digits == null) com_isartdigital_utils_game_factory_MovieClipAnimFactory.set_textureDigits(com_isartdigital_utils_game_factory_MovieClipAnimFactory.textureDigits);
	var lID;
	var lNum;
	var _g = 0;
	var _g1 = Reflect.fields(lFrames);
	while(_g < _g1.length) {
		var lID1 = _g1[_g];
		++_g;
		lID1 = lID1.split(".")[0];
		lNum = Std.parseInt(HxOverrides.substr(lID1,-1 * com_isartdigital_utils_game_factory_MovieClipAnimFactory.textureDigits,null));
		if(lNum != null) lID1 = HxOverrides.substr(lID1,0,lID1.length - com_isartdigital_utils_game_factory_MovieClipAnimFactory.textureDigits);
		if(com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesDefinition.get(lID1) == null) {
			var v;
			if(lNum == null) v = 1; else v = lNum;
			com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesDefinition.set(lID1,v);
			v;
		} else if(lNum > com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesDefinition.get(lID1)) {
			com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesDefinition.set(lID1,lNum);
			lNum;
		}
	}
	if(com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesCache == null) com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesCache = new haxe_ds_StringMap();
};
com_isartdigital_utils_game_factory_MovieClipAnimFactory.clearTextures = function(pJson) {
	var lFrames = Reflect.field(pJson,"frames");
	if(com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesDefinition == null) return;
	var lID;
	var lNum;
	var _g = 0;
	var _g1 = Reflect.fields(lFrames);
	while(_g < _g1.length) {
		var lID1 = _g1[_g];
		++_g;
		lID1 = lID1.split(".")[0];
		lNum = Std.parseInt(HxOverrides.substr(lID1,-1 * com_isartdigital_utils_game_factory_MovieClipAnimFactory.textureDigits,null));
		if(lNum != null) lID1 = HxOverrides.substr(lID1,0,lID1.length - com_isartdigital_utils_game_factory_MovieClipAnimFactory.textureDigits);
		{
			com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesDefinition.set(lID1,null);
			null;
		}
		{
			com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesCache.set(lID1,null);
			null;
		}
	}
};
com_isartdigital_utils_game_factory_MovieClipAnimFactory.__super__ = com_isartdigital_utils_game_factory_AnimFactory;
com_isartdigital_utils_game_factory_MovieClipAnimFactory.prototype = $extend(com_isartdigital_utils_game_factory_AnimFactory.prototype,{
	create: function(pID) {
		this.anim = new PIXI.extras.MovieClip(this.getTextures(pID));
		return this.anim;
	}
	,update: function(pID) {
		(js_Boot.__cast(this.anim , PIXI.extras.MovieClip)).textures = this.getTextures(pID);
	}
	,setFrame: function(pAutoPlay,pStart) {
		if(pStart == null) pStart = 0;
		if(pAutoPlay == null) pAutoPlay = true;
		var lAnim;
		lAnim = js_Boot.__cast(this.anim , PIXI.extras.MovieClip);
		lAnim.gotoAndStop(pStart);
		if(pAutoPlay) lAnim.play();
	}
	,getTextures: function(pID) {
		if(com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesCache.get(pID) == null) {
			var lFrames = com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesDefinition.get(pID);
			if(lFrames == 1) {
				var v = [PIXI.Texture.fromFrame(pID + ".png")];
				com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesCache.set(pID,v);
				v;
			} else {
				var v1 = [];
				com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesCache.set(pID,v1);
				v1;
				var _g1 = 1;
				var _g = lFrames + 1;
				while(_g1 < _g) {
					var i = _g1++;
					com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesCache.get(pID).push(PIXI.Texture.fromFrame(pID + HxOverrides.substr(com_isartdigital_utils_game_factory_MovieClipAnimFactory.digits + i,-1 * com_isartdigital_utils_game_factory_MovieClipAnimFactory.textureDigits,null) + ".png"));
				}
			}
		}
		return com_isartdigital_utils_game_factory_MovieClipAnimFactory.texturesCache.get(pID);
	}
	,__class__: com_isartdigital_utils_game_factory_MovieClipAnimFactory
});
var com_isartdigital_utils_game_iso_IsoManager = function() { };
$hxClasses["com.isartdigital.utils.game.iso.IsoManager"] = com_isartdigital_utils_game_iso_IsoManager;
com_isartdigital_utils_game_iso_IsoManager.__name__ = ["com","isartdigital","utils","game","iso","IsoManager"];
com_isartdigital_utils_game_iso_IsoManager.init = function(pTileWidth,pTileHeight) {
	com_isartdigital_utils_game_iso_IsoManager.halfWidth = _$UInt_UInt_$Impl_$.toFloat(pTileWidth) / _$UInt_UInt_$Impl_$.toFloat(2);
	com_isartdigital_utils_game_iso_IsoManager.halfHeight = _$UInt_UInt_$Impl_$.toFloat(pTileHeight) / _$UInt_UInt_$Impl_$.toFloat(2);
};
com_isartdigital_utils_game_iso_IsoManager.modelToIsoView = function(pPoint) {
	return new PIXI.Point((pPoint.x - pPoint.y) * com_isartdigital_utils_game_iso_IsoManager.halfWidth,(pPoint.x + pPoint.y) * com_isartdigital_utils_game_iso_IsoManager.halfHeight);
};
com_isartdigital_utils_game_iso_IsoManager.isoViewToModel = function(pPoint) {
	return new PIXI.Point(Math.ceil((pPoint.y / com_isartdigital_utils_game_iso_IsoManager.halfHeight + pPoint.x / com_isartdigital_utils_game_iso_IsoManager.halfWidth) / 2),Math.ceil((pPoint.y / com_isartdigital_utils_game_iso_IsoManager.halfHeight - pPoint.x / com_isartdigital_utils_game_iso_IsoManager.halfWidth) / 2));
};
com_isartdigital_utils_game_iso_IsoManager.isInFrontOf = function(pA,pB) {
	if((_$UInt_UInt_$Impl_$.gt(pB.colMin,pA.colMax) || _$UInt_UInt_$Impl_$.gt(pA.colMin,pB.colMax)) && (_$UInt_UInt_$Impl_$.gt(pB.rowMin,pA.rowMax) || _$UInt_UInt_$Impl_$.gt(pA.rowMin,pB.rowMax))) {
		if(_$UInt_UInt_$Impl_$.gt(pA.colMax + pA.rowMax,pB.colMax + pB.rowMax)) return pA; else return pB;
	}
	if(_$UInt_UInt_$Impl_$.gt(pB.colMin,pA.colMax) || _$UInt_UInt_$Impl_$.gt(pA.colMin,pB.colMax)) {
		if(_$UInt_UInt_$Impl_$.gte(pA.colMin,pB.colMax)) return pA;
		if(_$UInt_UInt_$Impl_$.gte(pB.colMin,pA.colMax)) return pB;
	}
	if(_$UInt_UInt_$Impl_$.gt(pB.rowMin,pA.rowMax) || _$UInt_UInt_$Impl_$.gt(pA.rowMin,pB.rowMax)) {
		if(_$UInt_UInt_$Impl_$.gte(pA.rowMin,pB.rowMax)) return pA;
		if(_$UInt_UInt_$Impl_$.gte(pB.rowMin,pA.rowMax)) return pB;
	}
	return pB;
};
com_isartdigital_utils_game_iso_IsoManager.getDepth = function(pItem,pList) {
	var _g1 = 0;
	var _g = pList.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(pList[i] == com_isartdigital_utils_game_iso_IsoManager.isInFrontOf(pItem,pList[i])) return i;
	}
	return pList.length;
};
com_isartdigital_utils_game_iso_IsoManager.getMousePositionIndex = function() {
	var lGameManager = com_isartdigital_builder_game_GameManager.getInstance();
	var mouseCoord = com_isartdigital_utils_game_iso_IsoManager.isoViewToModel(lGameManager.mousePosition);
	return mouseCoord;
};
com_isartdigital_utils_game_iso_IsoManager.sortAll = function() {
	com_isartdigital_utils_game_GameStage.getInstance().getBuildingsContainer().children.sort(com_isartdigital_utils_game_iso_IsoManager.isInFrontOf);
};
var com_isartdigital_utils_loader_GameLoader = function() {
	this.soundsList = [];
	this.soundsSpecs = new haxe_ds_StringMap();
	PIXI.loaders.Loader.call(this);
};
$hxClasses["com.isartdigital.utils.loader.GameLoader"] = com_isartdigital_utils_loader_GameLoader;
com_isartdigital_utils_loader_GameLoader.__name__ = ["com","isartdigital","utils","loader","GameLoader"];
com_isartdigital_utils_loader_GameLoader.getContent = function(pFile) {
	var key = com_isartdigital_utils_Config.get_txtsPath() + pFile;
	return com_isartdigital_utils_loader_GameLoader.txtLoaded.get(key);
};
com_isartdigital_utils_loader_GameLoader.__super__ = PIXI.loaders.Loader;
com_isartdigital_utils_loader_GameLoader.prototype = $extend(PIXI.loaders.Loader.prototype,{
	addTxtFile: function(pUrl) {
		var lUrl = com_isartdigital_utils_Config.get_txtsPath() + pUrl;
		this.add(lUrl);
	}
	,addAssetFile: function(pUrl) {
		var lUrl = com_isartdigital_utils_Config.get_assetsPath() + pUrl;
		this.add(lUrl);
	}
	,addSoundFile: function(pUrl) {
		var lUrl = com_isartdigital_utils_Config.get_soundsPath() + pUrl;
		this.soundsList.push(lUrl);
		this.add(lUrl);
	}
	,addFontFile: function(pUrl) {
		var lUrl = com_isartdigital_utils_Config.get_fontsPath() + pUrl;
		this.add(lUrl);
	}
	,parseData: function(pResource,pNext) {
		console.log(pResource.url + " loaded");
		if(pResource.url.indexOf(".css") > 0) {
			var lData = pResource.data.split(";");
			var lFamilies = [];
			var lReg = new EReg("font-family:\\s?(.*)","");
			var _g1 = 0;
			var _g = lData.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(lReg.match(lData[i])) lFamilies.push(lReg.matched(1));
			}
			var lWebFontConfig = { custom : { families : lFamilies, urls : [com_isartdigital_utils_Config.get_fontsPath() + "fonts.css"]}, active : pNext};
			WebFont.load(lWebFontConfig);
			return;
		}
		if(pResource.isJson) {
			var v = pResource.data;
			com_isartdigital_utils_loader_GameLoader.txtLoaded.set(pResource.url,v);
			v;
			if(HxOverrides.substr(pResource.url,-12,12) == "library.json" && Object.prototype.hasOwnProperty.call(pResource.data,"md5") && Object.prototype.hasOwnProperty.call(pResource.data,"movies") && Object.prototype.hasOwnProperty.call(pResource.data,"textureGroups") && Object.prototype.hasOwnProperty.call(pResource.data,"frameRate")) {
				pixi_loaders_FlumpParser.flumpParser(pResource,pNext);
				return;
			} else if(this.soundsList.length > 0) {
				var lData1;
				var _g11 = 0;
				var _g2 = this.soundsList.length;
				while(_g11 < _g2) {
					var i1 = _g11++;
					if(pResource.url == this.soundsList[i1]) {
						this.soundsList.splice(i1,1);
						lData1 = pResource.data;
						var _g3 = 0;
						var _g21 = lData1.extensions.length;
						while(_g3 < _g21) {
							var j = _g3++;
							if(window.Howler.codecs(lData1.extensions[j])) {
								this.addSounds(lData1.fxs,false,lData1.extensions,lData1.extensions[i1]);
								this.addSounds(lData1.musics,true,lData1.extensions,lData1.extensions[i1]);
								break;
							}
						}
						break;
					}
				}
			}
		}
		pNext();
	}
	,addSounds: function(pList,pLoop,pExtensions,pCodec) {
		var lUrl;
		var _g = 0;
		var _g1 = Reflect.fields(pList);
		while(_g < _g1.length) {
			var lID = _g1[_g];
			++_g;
			lUrl = com_isartdigital_utils_Config.get_soundsPath() + lID + "." + pCodec;
			var value = { urls : [lUrl], volume : Reflect.field(pList,lID) / 100, loop : pLoop};
			this.soundsSpecs.set(lID,value);
			this.add(lUrl);
		}
	}
	,load: function(cb) {
		this.after($bind(this,this.parseData));
		this.once("complete",$bind(this,this.onComplete));
		return PIXI.loaders.Loader.prototype.load.call(this);
	}
	,onComplete: function() {
		var $it0 = this.soundsSpecs.keys();
		while( $it0.hasNext() ) {
			var lID = $it0.next();
			com_isartdigital_utils_sounds_SoundManager.addSound(lID,new window.Howl(this.soundsSpecs.get(lID)));
		}
	}
	,__class__: com_isartdigital_utils_loader_GameLoader
});
var com_isartdigital_utils_sounds_SoundManager = function() {
};
$hxClasses["com.isartdigital.utils.sounds.SoundManager"] = com_isartdigital_utils_sounds_SoundManager;
com_isartdigital_utils_sounds_SoundManager.__name__ = ["com","isartdigital","utils","sounds","SoundManager"];
com_isartdigital_utils_sounds_SoundManager.addSound = function(pName,pSound) {
	if(com_isartdigital_utils_sounds_SoundManager.list == null) com_isartdigital_utils_sounds_SoundManager.list = new haxe_ds_StringMap();
	{
		com_isartdigital_utils_sounds_SoundManager.list.set(pName,pSound);
		pSound;
	}
};
com_isartdigital_utils_sounds_SoundManager.getSound = function(pName) {
	return com_isartdigital_utils_sounds_SoundManager.list.get(pName);
};
com_isartdigital_utils_sounds_SoundManager.prototype = {
	__class__: com_isartdigital_utils_sounds_SoundManager
};
var com_isartdigital_utils_system_DeviceCapabilities = function() { };
$hxClasses["com.isartdigital.utils.system.DeviceCapabilities"] = com_isartdigital_utils_system_DeviceCapabilities;
com_isartdigital_utils_system_DeviceCapabilities.__name__ = ["com","isartdigital","utils","system","DeviceCapabilities"];
com_isartdigital_utils_system_DeviceCapabilities.__properties__ = {get_system:"get_system",get_width:"get_width",get_height:"get_height"}
com_isartdigital_utils_system_DeviceCapabilities.get_height = function() {
	return window.innerHeight;
};
com_isartdigital_utils_system_DeviceCapabilities.get_width = function() {
	return window.innerWidth;
};
com_isartdigital_utils_system_DeviceCapabilities.get_system = function() {
	if(new EReg("IEMobile","i").match(window.navigator.userAgent)) return "IEMobile"; else if(new EReg("iPhone|iPad|iPod","i").match(window.navigator.userAgent)) return "iOS"; else if(new EReg("BlackBerry","i").match(window.navigator.userAgent)) return "BlackBerry"; else if(new EReg("PlayBook","i").match(window.navigator.userAgent)) return "BlackBerry PlayBook"; else if(new EReg("Android","i").match(window.navigator.userAgent)) return "Android"; else return "Desktop";
};
com_isartdigital_utils_system_DeviceCapabilities.displayFullScreenButton = function() {
	if(!new EReg("(iPad|iPhone|iPod)","g").match(window.navigator.userAgent) && !new EReg("MSIE","i").match(window.navigator.userAgent)) {
		window.document.onfullscreenchange = com_isartdigital_utils_system_DeviceCapabilities.onChangeFullScreen;
		window.document.onwebkitfullscreenchange = com_isartdigital_utils_system_DeviceCapabilities.onChangeFullScreen;
		window.document.onmozfullscreenchange = com_isartdigital_utils_system_DeviceCapabilities.onChangeFullScreen;
		window.document.onmsfullscreenchange = com_isartdigital_utils_system_DeviceCapabilities.onChangeFullScreen;
		com_isartdigital_utils_system_DeviceCapabilities.fullScreenButton = new Image();
		com_isartdigital_utils_system_DeviceCapabilities.fullScreenButton.style.position = "absolute";
		com_isartdigital_utils_system_DeviceCapabilities.fullScreenButton.style.right = "0px";
		com_isartdigital_utils_system_DeviceCapabilities.fullScreenButton.style.top = "0px";
		com_isartdigital_utils_system_DeviceCapabilities.fullScreenButton.style.cursor = "pointer";
		com_isartdigital_utils_system_DeviceCapabilities.fullScreenButton.width = Std["int"](com_isartdigital_utils_system_DeviceCapabilities.getSizeFactor() * 0.075);
		com_isartdigital_utils_system_DeviceCapabilities.fullScreenButton.height = Std["int"](com_isartdigital_utils_system_DeviceCapabilities.getSizeFactor() * 0.075);
		com_isartdigital_utils_system_DeviceCapabilities.fullScreenButton.onclick = com_isartdigital_utils_system_DeviceCapabilities.enterFullscreen;
		com_isartdigital_utils_system_DeviceCapabilities.fullScreenButton.src = com_isartdigital_utils_Config.get_assetsPath() + "fullscreen.png";
		window.document.body.appendChild(com_isartdigital_utils_system_DeviceCapabilities.fullScreenButton);
	}
};
com_isartdigital_utils_system_DeviceCapabilities.enterFullscreen = function(pEvent) {
	var lDocElm = window.document.documentElement;
	if($bind(lDocElm,lDocElm.requestFullscreen) != null) lDocElm.requestFullscreen(); else if(lDocElm.mozRequestFullScreen != null) lDocElm.mozRequestFullScreen(); else if(lDocElm.webkitRequestFullScreen != null) lDocElm.webkitRequestFullScreen(); else if(lDocElm.msRequestFullscreen != null) lDocElm.msRequestFullscreen();
};
com_isartdigital_utils_system_DeviceCapabilities.exitFullscreen = function() {
	if(($_=window.document,$bind($_,$_.exitFullscreen)) != null) window.document.exitFullscreen(); else if(window.document.mozCancelFullScreen != null) window.document.mozCancelFullScreen(); else if(window.document.webkitCancelFullScreen != null) window.document.webkitCancelFullScreen(); else if(window.document.msExitFullscreen) window.document.msExitFullscreen();
};
com_isartdigital_utils_system_DeviceCapabilities.onChangeFullScreen = function(pEvent) {
	if(window.document.fullScreen || (window.document.mozFullScreen || (window.document.webkitIsFullScreen || window.document.msFullscreenElement))) com_isartdigital_utils_system_DeviceCapabilities.fullScreenButton.style.display = "none"; else com_isartdigital_utils_system_DeviceCapabilities.fullScreenButton.style.display = "block";
	pEvent.preventDefault();
};
com_isartdigital_utils_system_DeviceCapabilities.getSizeFactor = function() {
	var lSize = Math.floor(Math.min(window.screen.width,window.screen.height));
	if(com_isartdigital_utils_system_DeviceCapabilities.get_system() == "Desktop") lSize /= 3;
	return lSize;
};
com_isartdigital_utils_system_DeviceCapabilities.getScreenRect = function(pTarget) {
	var lTopLeft = new PIXI.Point(0,0);
	var lBottomRight = new PIXI.Point(_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_system_DeviceCapabilities.get_width()),_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_system_DeviceCapabilities.get_height()));
	lTopLeft = pTarget.toLocal(lTopLeft);
	lBottomRight = pTarget.toLocal(lBottomRight);
	return new PIXI.Rectangle(lTopLeft.x,lTopLeft.y,lBottomRight.x - lTopLeft.x,lBottomRight.y - lTopLeft.y);
};
com_isartdigital_utils_system_DeviceCapabilities.scaleViewport = function() {
	if(com_isartdigital_utils_system_DeviceCapabilities.get_system() == "IEMobile") return;
	com_isartdigital_utils_system_DeviceCapabilities.screenRatio = window.devicePixelRatio;
	window.document.write("<meta name=\"viewport\" content=\"initial-scale=" + Math.round(100 / com_isartdigital_utils_system_DeviceCapabilities.screenRatio) / 100 + ", user-scalable=no, minimal-ui\">");
};
com_isartdigital_utils_system_DeviceCapabilities.init = function(pHd,pMd,pLd) {
	if(pLd == null) pLd = 0.25;
	if(pMd == null) pMd = 0.5;
	if(pHd == null) pHd = 1;
	{
		com_isartdigital_utils_system_DeviceCapabilities.texturesRatios.set("hd",pHd);
		pHd;
	}
	{
		com_isartdigital_utils_system_DeviceCapabilities.texturesRatios.set("md",pMd);
		pMd;
	}
	{
		com_isartdigital_utils_system_DeviceCapabilities.texturesRatios.set("ld",pLd);
		pLd;
	}
	if(com_isartdigital_utils_Config.get_data().texture != null && com_isartdigital_utils_Config.get_data().texture != "") com_isartdigital_utils_system_DeviceCapabilities.textureType = com_isartdigital_utils_Config.get_data().texture; else {
		var lRatio = Math.min(window.screen.width * com_isartdigital_utils_system_DeviceCapabilities.screenRatio / com_isartdigital_utils_game_GameStage.getInstance().get_safeZone().width,window.screen.height * com_isartdigital_utils_system_DeviceCapabilities.screenRatio / com_isartdigital_utils_game_GameStage.getInstance().get_safeZone().height);
		if(lRatio <= 0.25) com_isartdigital_utils_system_DeviceCapabilities.textureType = "ld"; else if(lRatio <= 0.5) com_isartdigital_utils_system_DeviceCapabilities.textureType = "md"; else com_isartdigital_utils_system_DeviceCapabilities.textureType = "hd";
	}
	com_isartdigital_utils_system_DeviceCapabilities.textureRatio = com_isartdigital_utils_system_DeviceCapabilities.texturesRatios.get(com_isartdigital_utils_system_DeviceCapabilities.textureType);
};
var com_isartdigital_utils_ui_UIAsset = function(pAssetName) {
	com_isartdigital_utils_game_StateGraphic.call(this);
	this.assetName = pAssetName;
	this.factory = new com_isartdigital_utils_game_factory_FlumpSpriteAnimFactory();
	this.setState(this.DEFAULT_STATE);
};
$hxClasses["com.isartdigital.utils.ui.UIAsset"] = com_isartdigital_utils_ui_UIAsset;
com_isartdigital_utils_ui_UIAsset.__name__ = ["com","isartdigital","utils","ui","UIAsset"];
com_isartdigital_utils_ui_UIAsset.__super__ = com_isartdigital_utils_game_StateGraphic;
com_isartdigital_utils_ui_UIAsset.prototype = $extend(com_isartdigital_utils_game_StateGraphic.prototype,{
	__class__: com_isartdigital_utils_ui_UIAsset
});
var com_isartdigital_utils_ui_UIBuilder = function() {
};
$hxClasses["com.isartdigital.utils.ui.UIBuilder"] = com_isartdigital_utils_ui_UIBuilder;
com_isartdigital_utils_ui_UIBuilder.__name__ = ["com","isartdigital","utils","ui","UIBuilder"];
com_isartdigital_utils_ui_UIBuilder.addTextStyle = function(pData) {
	var _g = 0;
	var _g1 = Reflect.fields(pData);
	while(_g < _g1.length) {
		var pName = _g1[_g];
		++_g;
		var value = Reflect.field(pData,pName);
		com_isartdigital_utils_ui_UIBuilder.textStyle.set(pName,value);
	}
};
com_isartdigital_utils_ui_UIBuilder.init = function(pFile,pPackage,pPackageCurrency,pPackgageItem) {
	com_isartdigital_utils_ui_UIBuilder.description = pFile;
	com_isartdigital_utils_ui_UIBuilder.btnPackage = pPackage;
	com_isartdigital_utils_ui_UIBuilder.hudPackage = pPackageCurrency;
	com_isartdigital_utils_ui_UIBuilder.itemPackage = pPackgageItem;
};
com_isartdigital_utils_ui_UIBuilder.build = function(pId) {
	var lData = com_isartdigital_utils_loader_GameLoader.getContent(com_isartdigital_utils_ui_UIBuilder.description);
	var lList = [];
	var lObj;
	var lItem;
	var lUIPos = [];
	var _g = 0;
	var _g1 = lData.movies;
	while(_g < _g1.length) {
		var lMovie = _g1[_g];
		++_g;
		if(lMovie.id == pId) {
			var _g2 = 0;
			var _g3 = lMovie.layers;
			while(_g2 < _g3.length) {
				var lItem1 = _g3[_g2];
				++_g2;
				if(lItem1.name.indexOf("_txt") != -1 && lItem1.name.indexOf("_txt") == lItem1.name.length - "_txt".length) lObj = com_isartdigital_utils_ui_UIBuilder.getTextFromJson(lItem1.name); else if(lItem1.name.indexOf("_item") != -1 && lItem1.name.indexOf("_item") == lItem1.name.length - "_item".length) lObj = Type.createInstance(Type.resolveClass(com_isartdigital_utils_ui_UIBuilder.itemPackage + "." + lItem1.keyframes[0].ref),[]); else if(lItem1.name.indexOf("Button") != -1 && lItem1.name.indexOf("Button") == lItem1.name.length - "Button".length) lObj = Type.createInstance(Type.resolveClass(com_isartdigital_utils_ui_UIBuilder.btnPackage + "." + lItem1.keyframes[0].ref),[]); else if(lItem1.name.indexOf("_currency") != -1 && lItem1.name.indexOf("_currency") == lItem1.name.length - "_currency".length) lObj = Type.createInstance(Type.resolveClass(com_isartdigital_utils_ui_UIBuilder.hudPackage + "." + lItem1.keyframes[0].ref),[]); else if(lItem1.name.indexOf("_bHud") != -1 && lItem1.name.indexOf("_bHud") == lItem1.name.length - "_bHud".length) lObj = Type.createInstance(Type.resolveClass(com_isartdigital_utils_ui_UIBuilder.hudPackage + "." + lItem1.keyframes[0].ref),[]); else lObj = new com_isartdigital_utils_ui_UIAsset(lItem1.keyframes[0].ref);
				lObj.name = lItem1.keyframes[0].ref;
				if(Object.prototype.hasOwnProperty.call(lItem1.keyframes[0],"loc")) lObj.position.set(lItem1.keyframes[0].loc[0],lItem1.keyframes[0].loc[1]);
				if(Object.prototype.hasOwnProperty.call(lItem1.keyframes[0],"scale")) lObj.scale.set(lItem1.keyframes[0].scale[0],lItem1.keyframes[0].scale[1]);
				if(Object.prototype.hasOwnProperty.call(lItem1.keyframes[0],"pivot")) lObj.pivot.set(lItem1.keyframes[0].pivot[0],lItem1.keyframes[0].pivot[1]);
				if(Object.prototype.hasOwnProperty.call(lItem1.keyframes[0],"skew")) lObj.rotation = lItem1.keyframes[0].skew[0];
				lUIPos.push(com_isartdigital_utils_ui_UIBuilder.getUIPositionable(lObj,(function($this) {
					var $r;
					var key = lItem1.name.split("_")[0];
					$r = com_isartdigital_utils_ui_UIBuilder.uiPos.get(key);
					return $r;
				}(this))));
			}
		}
	}
	return lUIPos;
};
com_isartdigital_utils_ui_UIBuilder.getTextFromJson = function(pName) {
	var lTextStyle = com_isartdigital_utils_ui_UIBuilder.textStyle.get(pName);
	var localizedText = lTextStyle.text;
	var bold;
	if(lTextStyle.bold) bold = "bold "; else bold = "";
	var italic;
	if(lTextStyle.italic) italic = "italic "; else italic = "";
	var lStyle = { align : lTextStyle.align, font : bold + italic + lTextStyle.size + "px Arial"};
	return new PIXI.Text(localizedText,lStyle);
};
com_isartdigital_utils_ui_UIBuilder.getUIPositionable = function(pObj,pPosition) {
	var lOffset = new PIXI.Point(0,0);
	if(pPosition != "bottom" && pPosition != "bottomLeft" && pPosition != "bottomRight" && pPosition != "fitHeight" && pPosition != "fitScreen" && pPosition != "fitWidth" && pPosition != "left" && pPosition != "right" && pPosition != "top" && pPosition != "topLeft" && pPosition != "topRight") pPosition = ""; else {
		if(pPosition == "top" || pPosition == "topLeft" || pPosition == "topRight" || pPosition == "bottom" || pPosition == "bottomLeft" || pPosition == "bottomRight") lOffset.y = pObj.y;
		if(pPosition == "left" || pPosition == "topLeft" || pPosition == "bottomLeft" || pPosition == "right" || pPosition == "topRight" || pPosition == "bottomRight") lOffset.x = pObj.x;
	}
	return { item : pObj, align : pPosition, offsetX : lOffset.x, offsetY : lOffset.y, update : true};
};
com_isartdigital_utils_ui_UIBuilder.prototype = {
	__class__: com_isartdigital_utils_ui_UIBuilder
};
var com_isartdigital_utils_ui_UIPosition = function() {
};
$hxClasses["com.isartdigital.utils.ui.UIPosition"] = com_isartdigital_utils_ui_UIPosition;
com_isartdigital_utils_ui_UIPosition.__name__ = ["com","isartdigital","utils","ui","UIPosition"];
com_isartdigital_utils_ui_UIPosition.setPosition = function(pTarget,pPosition,pOffsetX,pOffsetY) {
	if(pOffsetY == null) pOffsetY = 0;
	if(pOffsetX == null) pOffsetX = 0;
	var lScreen = com_isartdigital_utils_system_DeviceCapabilities.getScreenRect(pTarget.parent);
	var lTopLeft = new PIXI.Point(lScreen.x,lScreen.y);
	var lBottomRight = new PIXI.Point(lScreen.x + lScreen.width,lScreen.y + lScreen.height);
	if(pPosition == "top" || pPosition == "topLeft" || pPosition == "topRight") pTarget.y = lTopLeft.y + pOffsetY;
	if(pPosition == "bottom" || pPosition == "bottomLeft" || pPosition == "bottomRight") pTarget.y = lBottomRight.y - pOffsetY;
	if(pPosition == "left" || pPosition == "topLeft" || pPosition == "bottomLeft") pTarget.x = lTopLeft.x + pOffsetX;
	if(pPosition == "right" || pPosition == "topRight" || pPosition == "bottomRight") pTarget.x = lBottomRight.x - pOffsetX;
	if(pPosition == "fitWidth" || pPosition == "fitScreen") {
		pTarget.x = lTopLeft.x;
		pTarget.width = lBottomRight.x - lTopLeft.x;
	}
	if(pPosition == "fitHeight" || pPosition == "fitScreen") {
		pTarget.y = lTopLeft.y;
		pTarget.height = lBottomRight.y - lTopLeft.y;
	}
};
com_isartdigital_utils_ui_UIPosition.prototype = {
	__class__: com_isartdigital_utils_ui_UIPosition
};
var flump_DisplayObjectKey = function(symbolId) {
	this.symbolId = symbolId;
};
$hxClasses["flump.DisplayObjectKey"] = flump_DisplayObjectKey;
flump_DisplayObjectKey.__name__ = ["flump","DisplayObjectKey"];
flump_DisplayObjectKey.prototype = {
	__class__: flump_DisplayObjectKey
};
var flump_IFlumpMovie = function() { };
$hxClasses["flump.IFlumpMovie"] = flump_IFlumpMovie;
flump_IFlumpMovie.__name__ = ["flump","IFlumpMovie"];
flump_IFlumpMovie.prototype = {
	__class__: flump_IFlumpMovie
};
var flump_MoviePlayer = function(symbol,movie) {
	this.position = 0.0;
	this.fullyGenerated = false;
	this.dirty = false;
	this.labelsToFire = [];
	this.childPlayers = new haxe_ds_ObjectMap();
	this.createdChildren = new haxe_ds_ObjectMap();
	this.currentChildrenKey = new haxe_ds_ObjectMap();
	this.STATE_STOPPED = "stopped";
	this.STATE_LOOPING = "looping";
	this.STATE_PLAYING = "playing";
	this.independantControl = true;
	this.independantTimeline = true;
	this.advanced = 0.0;
	this.previousElapsed = 0.0;
	this.elapsed = 0.0;
	this.symbol = symbol;
	this.movie = movie;
	var _g = 0;
	var _g1 = symbol.layers;
	while(_g < _g1.length) {
		var layer = _g1[_g];
		++_g;
		movie.createLayer(layer);
	}
	this.state = this.STATE_LOOPING;
};
$hxClasses["flump.MoviePlayer"] = flump_MoviePlayer;
flump_MoviePlayer.__name__ = ["flump","MoviePlayer"];
flump_MoviePlayer.prototype = {
	getDisplayKey: function(layerId,keyframeIndex) {
		if(keyframeIndex == null) keyframeIndex = 0;
		var layer = this.symbol.getLayer(layerId);
		if(layer == null) throw new js__$Boot_HaxeError("Layer " + layerId + " does not exist.");
		var keyframe = layer.getKeyframeForFrame(keyframeIndex);
		if(keyframe == null) throw new js__$Boot_HaxeError("Keyframe does not exist at index " + Std.string(_$UInt_UInt_$Impl_$.toFloat(keyframeIndex)));
		this.createChildIfNessessary(keyframe);
		return keyframe.displayKey;
	}
	,reset: function() {
		this.elapsed = 0;
		this.previousElapsed = 0;
	}
	,get_position: function() {
		return (this.elapsed % this.symbol.duration + this.symbol.duration) % this.symbol.duration;
	}
	,get_totalFrames: function() {
		return this.symbol.totalFrames;
	}
	,play: function() {
		this.setState(this.STATE_PLAYING);
		return this;
	}
	,loop: function() {
		this.setState(this.STATE_LOOPING);
		return this;
	}
	,stop: function() {
		this.setState(this.STATE_STOPPED);
		return this;
	}
	,goToLabel: function(label) {
		if(!this.labelExists(label)) throw new js__$Boot_HaxeError("Symbol " + this.symbol.name + " does not have label " + label + ".");
		this.set_currentFrame(this.getLabelFrame(label));
		return this;
	}
	,goToFrame: function(frame) {
		this.set_currentFrame(frame);
		return this;
	}
	,goToPosition: function(time) {
		this.elapsed = time;
		this.previousElapsed = time;
		this.clearLabels();
		this.fireLabels();
		return this;
	}
	,get_playing: function() {
		return this.state == this.STATE_PLAYING;
	}
	,get_looping: function() {
		return this.state == this.STATE_LOOPING;
	}
	,get_stopped: function() {
		return this.state == this.STATE_STOPPED;
	}
	,getLabelFrame: function(label) {
		if(!this.labelExists(label)) throw new js__$Boot_HaxeError("Symbol " + this.symbol.name + " does not have label " + label + ".");
		return this.symbol.labels.get(label).keyframe.index;
	}
	,get_currentFrame: function() {
		return Std["int"](this.get_position() / this.symbol.library.frameTime);
	}
	,set_currentFrame: function(value) {
		this.goToPosition(this.symbol.library.frameTime * value);
		return value;
	}
	,labelExists: function(label) {
		return this.symbol.labels.exists(label);
	}
	,advanceTime: function(ms) {
		if(this.state != this.STATE_STOPPED) {
			this.elapsed += ms;
			while(this.elapsed < 0) {
				this.elapsed += this.symbol.duration;
				this.previousElapsed += this.symbol.duration;
			}
		}
		this.advanced += ms;
		if(this.state != this.STATE_STOPPED) this.fireLabels();
		this.render();
	}
	,clearLabels: function() {
		while(this.labelsToFire.length > 0) this.labelsToFire.pop();
	}
	,fireLabels: function() {
		if(this.symbol.firstLabel == null) return;
		if(this.previousElapsed > this.elapsed) return;
		var label;
		if(this.previousElapsed <= this.elapsed) label = this.symbol.firstLabel; else label = this.symbol.lastLabel;
		var checking = true;
		while(checking) if(label.keyframe.time > this.previousElapsed % this.symbol.duration) checking = false; else if(_$UInt_UInt_$Impl_$.gte(label.keyframe.index,label.next.keyframe.index)) {
			checking = false;
			label = label.next;
		} else label = label.next;
		var firstChecked = label;
		while(label != null) {
			var checkFrom = this.previousElapsed % this.symbol.duration;
			var checkTo = this.elapsed % this.symbol.duration;
			if(label.keyframe.insideRangeStart(checkFrom,checkTo)) this.labelsToFire.push(label);
			label = label.next;
			if(label == firstChecked) label = null;
		}
		while(this.labelsToFire.length > 0) this.movie.labelPassed(this.labelsToFire.shift());
	}
	,render: function() {
		if(this.state == this.STATE_PLAYING) {
			if(this.get_position() < 0) {
				this.elapsed = 0;
				this.stop();
				this.movie.onAnimationComplete();
			} else if(this.get_position() >= this.symbol.duration - this.symbol.library.frameTime) {
				this.elapsed = this.symbol.duration - this.symbol.library.frameTime;
				this.stop();
				this.movie.onAnimationComplete();
			}
		}
		while(this.get_position() < 0) this.position += this.symbol.duration;
		var _g = 0;
		var _g1 = this.symbol.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			var keyframe = layer.getKeyframeForTime(this.get_position());
			if(keyframe.isEmpty == true) this.removeChildIfNessessary(keyframe); else if(keyframe.isEmpty == false) {
				var interped = this.getInterpolation(keyframe,this.get_position());
				var next = keyframe.next;
				if(next.isEmpty) next = keyframe;
				this.movie.renderFrame(keyframe,keyframe.location.x + (next.location.x - keyframe.location.x) * interped,keyframe.location.y + (next.location.y - keyframe.location.y) * interped,keyframe.scale.x + (next.scale.x - keyframe.scale.x) * interped,keyframe.scale.y + (next.scale.y - keyframe.scale.y) * interped,keyframe.skew.x + (next.skew.x - keyframe.skew.x) * interped,keyframe.skew.y + (next.skew.y - keyframe.skew.y) * interped);
				if(this.currentChildrenKey.h[layer.__id__] != keyframe.displayKey) {
					this.createChildIfNessessary(keyframe);
					this.removeChildIfNessessary(keyframe);
					this.addChildIfNessessary(keyframe);
				}
				if(js_Boot.__instanceof(keyframe.symbol,flump_library_MovieSymbol)) {
					var childMovie = this.movie.getChildPlayer(keyframe);
					if(childMovie.independantTimeline) {
						childMovie.advanceTime(this.advanced);
						childMovie.render();
					} else {
						childMovie.elapsed = this.get_position();
						childMovie.render();
					}
				}
			}
		}
		this.advanced = 0;
		this.previousElapsed = this.elapsed;
	}
	,createChildIfNessessary: function(keyframe) {
		if(keyframe.isEmpty) return;
		if(this.createdChildren.h.__keys__[keyframe.displayKey.__id__] != null == false) {
			this.movie.createFlumpChild(keyframe.displayKey);
			{
				this.createdChildren.set(keyframe.displayKey,true);
				true;
			}
		}
	}
	,removeChildIfNessessary: function(keyframe) {
		if(this.currentChildrenKey.h.__keys__[keyframe.layer.__id__] != null) {
			this.movie.removeFlumpChild(keyframe.layer,keyframe.displayKey);
			this.currentChildrenKey.remove(keyframe.layer);
		}
	}
	,addChildIfNessessary: function(keyframe) {
		if(keyframe.isEmpty) return;
		var v = keyframe.displayKey;
		this.currentChildrenKey.set(keyframe.layer,v);
		v;
		this.movie.addFlumpChild(keyframe.layer,keyframe.displayKey);
	}
	,setState: function(state) {
		this.state = state;
		var _g = 0;
		var _g1 = this.symbol.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			var keyframe = layer.getKeyframeForTime(this.get_position());
			this.createChildIfNessessary(keyframe);
			if(js_Boot.__instanceof(keyframe.symbol,flump_library_MovieSymbol)) {
				var childMovie = this.movie.getChildPlayer(keyframe);
				if(childMovie.independantControl == false) childMovie.setState(state);
			}
		}
	}
	,timeForLabel: function(label) {
		return this.symbol.labels.get(label).keyframe.time;
	}
	,getInterpolation: function(keyframe,time) {
		if(keyframe.tweened == false) return 0.0;
		var interped = (time - keyframe.time) / keyframe.duration;
		var ease = keyframe.ease;
		if(ease != 0) {
			var t;
			if(ease < 0) {
				var inv = 1 - interped;
				t = 1 - inv * inv;
				ease = -ease;
			} else t = interped * interped;
			interped = ease * t + (1 - ease) * interped;
		}
		return interped;
	}
	,__class__: flump_MoviePlayer
	,__properties__: {set_currentFrame:"set_currentFrame",get_currentFrame:"get_currentFrame",get_stopped:"get_stopped",get_looping:"get_looping",get_playing:"get_playing",get_totalFrames:"get_totalFrames",get_position:"get_position"}
};
var flump_json__$FlumpJSON_FlumpPointSpec_$Impl_$ = {};
$hxClasses["flump.json._FlumpJSON.FlumpPointSpec_Impl_"] = flump_json__$FlumpJSON_FlumpPointSpec_$Impl_$;
flump_json__$FlumpJSON_FlumpPointSpec_$Impl_$.__name__ = ["flump","json","_FlumpJSON","FlumpPointSpec_Impl_"];
flump_json__$FlumpJSON_FlumpPointSpec_$Impl_$.__properties__ = {get_y:"get_y",get_x:"get_x"}
flump_json__$FlumpJSON_FlumpPointSpec_$Impl_$.get_x = function(this1) {
	return this1[0];
};
flump_json__$FlumpJSON_FlumpPointSpec_$Impl_$.get_y = function(this1) {
	return this1[1];
};
var flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$ = {};
$hxClasses["flump.json._FlumpJSON.FlumpRectSpec_Impl_"] = flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$;
flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$.__name__ = ["flump","json","_FlumpJSON","FlumpRectSpec_Impl_"];
flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$.__properties__ = {get_height:"get_height",get_width:"get_width",get_y:"get_y",get_x:"get_x"}
flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$.get_x = function(this1) {
	return this1[0];
};
flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$.get_y = function(this1) {
	return this1[1];
};
flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$.get_width = function(this1) {
	return this1[2];
};
flump_json__$FlumpJSON_FlumpRectSpec_$Impl_$.get_height = function(this1) {
	return this1[3];
};
var flump_library_FlumpLibrary = function() {
	this.atlases = [];
	this.sprites = new haxe_ds_StringMap();
	this.movies = new haxe_ds_StringMap();
};
$hxClasses["flump.library.FlumpLibrary"] = flump_library_FlumpLibrary;
flump_library_FlumpLibrary.__name__ = ["flump","library","FlumpLibrary"];
flump_library_FlumpLibrary.create = function(flumpData) {
	var lib = flumpData;
	var spriteSymbols = new haxe_ds_StringMap();
	var movieSymbols = new haxe_ds_StringMap();
	var flumpLibrary = new flump_library_FlumpLibrary();
	flumpLibrary.sprites = spriteSymbols;
	flumpLibrary.movies = movieSymbols;
	flumpLibrary.framerate = _$UInt_UInt_$Impl_$.toFloat(lib.frameRate);
	flumpLibrary.frameTime = 1000 / flumpLibrary.framerate;
	flumpLibrary.md5 = lib.md5;
	var atlasSpecs = [];
	var _g = 0;
	var _g1 = lib.textureGroups;
	while(_g < _g1.length) {
		var textureGroup = _g1[_g];
		++_g;
		var _g2 = 0;
		var _g3 = textureGroup.atlases;
		while(_g2 < _g3.length) {
			var atlas = _g3[_g2];
			++_g2;
			flumpLibrary.atlases.push(atlas);
			atlasSpecs.push(atlas);
		}
	}
	var _g4 = 0;
	while(_g4 < atlasSpecs.length) {
		var spec = atlasSpecs[_g4];
		++_g4;
		var _g11 = 0;
		var _g21 = spec.textures;
		while(_g11 < _g21.length) {
			var textureSpec = _g21[_g11];
			++_g11;
			var frame = new flump_library_Rectangle(textureSpec.rect[0],textureSpec.rect[1],textureSpec.rect[2],textureSpec.rect[3]);
			var origin = new flump_library_Point(textureSpec.origin[0],textureSpec.origin[1]);
			origin.x = origin.x / frame.width;
			origin.y = origin.y / frame.height;
			var symbol = new flump_library_SpriteSymbol();
			symbol.name = textureSpec.symbol;
			symbol.origin = origin;
			symbol.texture = textureSpec.symbol;
			{
				spriteSymbols.set(symbol.name,symbol);
				symbol;
			}
		}
	}
	var pendingSymbolAttachments = new haxe_ds_ObjectMap();
	var _g5 = 0;
	var _g12 = lib.movies;
	while(_g5 < _g12.length) {
		var movieSpec = _g12[_g5];
		++_g5;
		var symbol1 = new flump_library_MovieSymbol();
		symbol1.name = movieSpec.id;
		symbol1.library = flumpLibrary;
		var _g22 = 0;
		var _g31 = movieSpec.layers;
		while(_g22 < _g31.length) {
			var layerSpec = _g31[_g22];
			++_g22;
			var layer1 = new flump_library_Layer(layerSpec.name);
			layer1.movie = symbol1;
			var layerDuration = 0;
			var previousKeyframe = null;
			var _g41 = 0;
			var _g51 = layerSpec.keyframes;
			while(_g41 < _g51.length) {
				var keyframeSpec = _g51[_g41];
				++_g41;
				var keyframe1 = new flump_library_Keyframe();
				keyframe1.prev = previousKeyframe;
				if(previousKeyframe != null) previousKeyframe.next = keyframe1;
				keyframe1.layer = layer1;
				keyframe1.numFrames = keyframeSpec.duration;
				keyframe1.duration = _$UInt_UInt_$Impl_$.toFloat(keyframeSpec.duration) * flumpLibrary.frameTime;
				keyframe1.index = keyframeSpec.index;
				var time = _$UInt_UInt_$Impl_$.toFloat(keyframe1.index) * flumpLibrary.frameTime;
				time *= 10;
				time = Math.floor(time);
				time /= 10;
				keyframe1.time = time;
				if(keyframeSpec.ref == null) keyframe1.isEmpty = true; else {
					keyframe1.isEmpty = false;
					keyframe1.symbolId = keyframeSpec.ref;
					if(keyframeSpec.pivot == null) keyframe1.pivot = new flump_library_Point(0,0); else keyframe1.pivot = new flump_library_Point(keyframeSpec.pivot[0],keyframeSpec.pivot[1]);
					if(keyframeSpec.loc == null) keyframe1.location = new flump_library_Point(0,0); else keyframe1.location = new flump_library_Point(keyframeSpec.loc[0],keyframeSpec.loc[1]);
					if(keyframeSpec.tweened == false) keyframe1.tweened = false; else keyframe1.tweened = true;
					keyframe1.symbol = null;
					if(keyframeSpec.scale == null) keyframe1.scale = new flump_library_Point(1,1); else keyframe1.scale = new flump_library_Point(keyframeSpec.scale[0],keyframeSpec.scale[1]);
					if(keyframeSpec.skew == null) keyframe1.skew = new flump_library_Point(0,0); else keyframe1.skew = new flump_library_Point(keyframeSpec.skew[0],keyframeSpec.skew[1]);
					if(keyframeSpec.ease == null) keyframe1.ease = 0; else keyframe1.ease = keyframeSpec.ease;
				}
				if(layer1.keyframes.length == 0) layer1.firstKeyframe = keyframe1;
				if(keyframeSpec.label != null) {
					keyframe1.label = new flump_library_Label();
					keyframe1.label.keyframe = keyframe1;
					keyframe1.label.name = keyframeSpec.label;
					symbol1.labels.set(keyframe1.label.name,keyframe1.label);
				}
				if(keyframe1.time + keyframe1.duration > layer1.duration) layerDuration = keyframe1.time + keyframe1.duration;
				var v = keyframeSpec.ref;
				pendingSymbolAttachments.set(keyframe1,v);
				v;
				layer1.keyframes.push(keyframe1);
				previousKeyframe = keyframe1;
			}
			layer1.lastKeyframe = layer1.keyframes[layer1.keyframes.length - 1];
			layer1.keyframes[0].prev = layer1.lastKeyframe;
			layer1.lastKeyframe.next = layer1.keyframes[0];
			symbol1.layers.push(layer1);
			var allAreEmpty = Lambda.foreach(layer1.keyframes,(function() {
				return function(keyframe) {
					return keyframe.isEmpty;
				};
			})());
			if(allAreEmpty) {
			} else {
				var _g42 = 0;
				var _g52 = layer1.keyframes;
				while(_g42 < _g52.length) {
					var keyframe2 = [_g52[_g42]];
					++_g42;
					var hasNonEmptySibling = Lambda.exists(layer1.keyframes,(function(keyframe2) {
						return function(checkedKeyframe1) {
							return checkedKeyframe1.isEmpty == false && checkedKeyframe1 != keyframe2[0];
						};
					})(keyframe2));
					if(hasNonEmptySibling) {
						var checked1 = keyframe2[0].prev;
						while(checked1.isEmpty) checked1 = checked1.prev;
						keyframe2[0].prevNonEmptyKeyframe = checked1;
						checked1 = keyframe2[0].next;
						while(checked1.isEmpty) checked1 = checked1.next;
						keyframe2[0].nextNonEmptyKeyframe = checked1;
					} else {
						keyframe2[0].prevNonEmptyKeyframe = keyframe2[0];
						keyframe2[0].nextNonEmptyKeyframe = keyframe2[0];
					}
				}
				var firstNonEmpty = Lambda.find(layer1.keyframes,(function() {
					return function(checkedKeyframe) {
						return checkedKeyframe.isEmpty == false;
					};
				})());
				if(firstNonEmpty != null) firstNonEmpty.displayKey = new flump_DisplayObjectKey(firstNonEmpty.symbolId);
				var checked = firstNonEmpty.nextNonEmptyKeyframe;
				while(checked != firstNonEmpty) {
					if(checked.symbolId == checked.prevNonEmptyKeyframe.symbolId) checked.displayKey = checked.prevNonEmptyKeyframe.displayKey; else checked.displayKey = new flump_DisplayObjectKey(checked.symbolId);
					checked = checked.nextNonEmptyKeyframe;
				}
			}
		}
		var getHighestFrameNumber = (function() {
			return function(layer,accum) {
				var layerLength = layer.lastKeyframe.index + layer.lastKeyframe.numFrames;
				if(_$UInt_UInt_$Impl_$.gt(layerLength,accum)) return layerLength; else return accum;
			};
		})();
		symbol1.totalFrames = Lambda.fold(symbol1.layers,getHighestFrameNumber,0);
		symbol1.duration = _$UInt_UInt_$Impl_$.toFloat(symbol1.totalFrames) * flumpLibrary.frameTime;
		var labels = [];
		var _g23 = 0;
		var _g32 = symbol1.layers;
		while(_g23 < _g32.length) {
			var layer2 = _g32[_g23];
			++_g23;
			var _g43 = 0;
			var _g53 = layer2.keyframes;
			while(_g43 < _g53.length) {
				var keyframe3 = _g53[_g43];
				++_g43;
				if(keyframe3.label != null) labels.push(keyframe3.label);
			}
		}
		haxe_ds_ArraySort.sort(labels,flump_library_FlumpLibrary.sortLabel);
		var _g33 = 0;
		var _g24 = labels.length;
		while(_g33 < _g24) {
			var i = _g33++;
			var nextIndex = i + 1;
			if(nextIndex >= labels.length) nextIndex = 0;
			var label = labels[i];
			var nextLabel = labels[nextIndex];
			label.next = nextLabel;
			nextLabel.prev = label;
		}
		symbol1.firstLabel = labels[0];
		symbol1.lastLabel = labels[labels.length - 1];
		{
			movieSymbols.set(symbol1.name,symbol1);
			symbol1;
		}
	}
	var $it0 = pendingSymbolAttachments.keys();
	while( $it0.hasNext() ) {
		var keyframe4 = $it0.next();
		var symbolId = pendingSymbolAttachments.h[keyframe4.__id__];
		if((__map_reserved[symbolId] != null?spriteSymbols.getReserved(symbolId):spriteSymbols.h[symbolId]) != null) keyframe4.symbol = __map_reserved[symbolId] != null?spriteSymbols.getReserved(symbolId):spriteSymbols.h[symbolId]; else keyframe4.symbol = __map_reserved[symbolId] != null?movieSymbols.getReserved(symbolId):movieSymbols.h[symbolId];
	}
	return flumpLibrary;
};
flump_library_FlumpLibrary.sortLabel = function(a,b) {
	if(_$UInt_UInt_$Impl_$.gt(b.keyframe.index,a.keyframe.index)) return -1; else if(_$UInt_UInt_$Impl_$.gt(a.keyframe.index,b.keyframe.index)) return 1;
	return 0;
};
flump_library_FlumpLibrary.prototype = {
	__class__: flump_library_FlumpLibrary
};
var flump_library_Keyframe = function() {
};
$hxClasses["flump.library.Keyframe"] = flump_library_Keyframe;
flump_library_Keyframe.__name__ = ["flump","library","Keyframe"];
flump_library_Keyframe.prototype = {
	timeInside: function(time) {
		return this.time <= time && this.time + this.duration > time;
	}
	,rangeInside: function(from,to) {
		return this.timeInside(from) && this.timeInside(to);
	}
	,rangeIntersect: function(from,to) {
		return this.timeInside(from) || this.timeInside(to);
	}
	,insideRangeStart: function(from,to) {
		if(from == to && to == this.time) return true;
		if(from <= to) return this.time > from && this.time <= to; else return this.time > from || this.time <= to;
	}
	,insideRangeEnd: function(from,to) {
		if(from == to && to == this.time + this.duration) return true;
		if(from > to) return to <= this.time + this.duration && from > this.time + this.duration; else return to <= this.time + this.duration || from > this.time + this.duration;
	}
	,__class__: flump_library_Keyframe
};
var flump_library_Label = function() {
};
$hxClasses["flump.library.Label"] = flump_library_Label;
flump_library_Label.__name__ = ["flump","library","Label"];
flump_library_Label.prototype = {
	__class__: flump_library_Label
};
var flump_library_Layer = function(name) {
	this.keyframes = [];
	this.name = name;
};
$hxClasses["flump.library.Layer"] = flump_library_Layer;
flump_library_Layer.__name__ = ["flump","library","Layer"];
flump_library_Layer.prototype = {
	getKeyframeForFrame: function(index) {
		var _g = 0;
		var _g1 = this.keyframes;
		while(_g < _g1.length) {
			var keyframe = _g1[_g];
			++_g;
			if(keyframe.index == index) return keyframe;
		}
		return null;
	}
	,getKeyframeForTime: function(time) {
		var keyframe = this.lastKeyframe;
		while(keyframe.time > time % this.movie.duration) keyframe = keyframe.prev;
		return keyframe;
	}
	,__class__: flump_library_Layer
};
var flump_library_Symbol = function() {
};
$hxClasses["flump.library.Symbol"] = flump_library_Symbol;
flump_library_Symbol.__name__ = ["flump","library","Symbol"];
flump_library_Symbol.prototype = {
	__class__: flump_library_Symbol
};
var flump_library_MovieSymbol = function() {
	this.labels = new haxe_ds_StringMap();
	this.layers = [];
	flump_library_Symbol.call(this);
};
$hxClasses["flump.library.MovieSymbol"] = flump_library_MovieSymbol;
flump_library_MovieSymbol.__name__ = ["flump","library","MovieSymbol"];
flump_library_MovieSymbol.__super__ = flump_library_Symbol;
flump_library_MovieSymbol.prototype = $extend(flump_library_Symbol.prototype,{
	getLayer: function(name) {
		var _g = 0;
		var _g1 = this.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			if(layer.name == name) return layer;
		}
		return null;
	}
	,debug: function() {
		var largestLayerChars = Lambda.fold(this.layers,function(layer,result) {
			if(layer.name.length > result) return layer.name.length; else return result;
		},0);
		var repeat = function(character,amount) {
			var output = "";
			while(amount > 0) {
				output += character;
				amount--;
			}
			return output;
		};
		var output1 = "asdfsadf\n";
		output1 += repeat(" ",largestLayerChars);
		output1 += "   ";
		var _g1 = 0;
		var _g = this.totalFrames;
		while(_g1 < _g) {
			var i = _g1++;
			if(i % 5 == 0) output1 += i; else if(i % 6 != 0 || i < 10) output1 += " ";
		}
		output1 += "\n";
		output1 += repeat(" ",largestLayerChars);
		output1 += "   ";
		var _g11 = 0;
		var _g2 = this.totalFrames;
		while(_g11 < _g2) {
			var i1 = _g11++;
			if(i1 % 5 == 0) output1 += "â–½"; else output1 += " ";
		}
		output1 += "\n";
		var _g12 = 0;
		var _g3 = this.layers.length;
		while(_g12 < _g3) {
			var i2 = _g12++;
			var layer1 = this.layers[i2];
			output1 += layer1.name + repeat(" ",largestLayerChars - layer1.name.length);
			output1 += " : ";
			var _g21 = 0;
			var _g31 = layer1.keyframes;
			while(_g21 < _g31.length) {
				var keyframe = _g31[_g21];
				++_g21;
				if(keyframe.symbolId != null) {
					output1 += "â—™";
					if(keyframe.tweened) output1 += repeat("â–¸",keyframe.numFrames - 1); else output1 += repeat("â—‰",keyframe.numFrames - 1);
				} else {
					output1 += "â—‹";
					output1 += repeat("â—Œ",keyframe.numFrames - 1);
				}
			}
			output1 += "\n";
		}
		return output1;
	}
	,__class__: flump_library_MovieSymbol
});
var flump_library_Point = function(x,y) {
	this.x = x;
	this.y = y;
};
$hxClasses["flump.library.Point"] = flump_library_Point;
flump_library_Point.__name__ = ["flump","library","Point"];
flump_library_Point.prototype = {
	__class__: flump_library_Point
};
var flump_library_Rectangle = function(x,y,width,height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
};
$hxClasses["flump.library.Rectangle"] = flump_library_Rectangle;
flump_library_Rectangle.__name__ = ["flump","library","Rectangle"];
flump_library_Rectangle.prototype = {
	__class__: flump_library_Rectangle
};
var flump_library_SpriteSymbol = function() {
	flump_library_Symbol.call(this);
};
$hxClasses["flump.library.SpriteSymbol"] = flump_library_SpriteSymbol;
flump_library_SpriteSymbol.__name__ = ["flump","library","SpriteSymbol"];
flump_library_SpriteSymbol.__super__ = flump_library_Symbol;
flump_library_SpriteSymbol.prototype = $extend(flump_library_Symbol.prototype,{
	__class__: flump_library_SpriteSymbol
});
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ds_ArraySort = function() { };
$hxClasses["haxe.ds.ArraySort"] = haxe_ds_ArraySort;
haxe_ds_ArraySort.__name__ = ["haxe","ds","ArraySort"];
haxe_ds_ArraySort.sort = function(a,cmp) {
	haxe_ds_ArraySort.rec(a,cmp,0,a.length);
};
haxe_ds_ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) return;
		var _g = from + 1;
		while(_g < to) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) haxe_ds_ArraySort.swap(a,j - 1,j); else break;
				j--;
			}
		}
		return;
	}
	haxe_ds_ArraySort.rec(a,cmp,from,middle);
	haxe_ds_ArraySort.rec(a,cmp,middle,to);
	haxe_ds_ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe_ds_ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	var new_mid;
	if(len1 == 0 || len2 == 0) return;
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) haxe_ds_ArraySort.swap(a,pivot,from);
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe_ds_ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe_ds_ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe_ds_ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	new_mid = first_cut + len22;
	haxe_ds_ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe_ds_ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe_ds_ArraySort.rotate = function(a,cmp,from,mid,to) {
	var n;
	if(from == mid || mid == to) return;
	n = haxe_ds_ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) p2 += shift; else p2 = from + (shift - (to - p2));
		}
		a[p1] = val;
	}
};
haxe_ds_ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe_ds_ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) len = half; else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe_ds_ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else len = half;
	}
	return from;
};
haxe_ds_ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,exists: function(key) {
		return this.h.__keys__[key.__id__] != null;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_Browser = function() { };
$hxClasses["js.Browser"] = js_Browser;
js_Browser.__name__ = ["js","Browser"];
js_Browser.getLocalStorage = function() {
	try {
		var s = window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var motion_actuators_IGenericActuator = function() { };
$hxClasses["motion.actuators.IGenericActuator"] = motion_actuators_IGenericActuator;
motion_actuators_IGenericActuator.__name__ = ["motion","actuators","IGenericActuator"];
motion_actuators_IGenericActuator.prototype = {
	__class__: motion_actuators_IGenericActuator
};
var motion_actuators_GenericActuator = function(target,duration,properties) {
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = motion_Actuate.defaultEase;
};
$hxClasses["motion.actuators.GenericActuator"] = motion_actuators_GenericActuator;
motion_actuators_GenericActuator.__name__ = ["motion","actuators","GenericActuator"];
motion_actuators_GenericActuator.__interfaces__ = [motion_actuators_IGenericActuator];
motion_actuators_GenericActuator.prototype = {
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) Reflect.setField(this.target,i,Reflect.field(this.properties,i)); else Reflect.setProperty(this.target,i,Reflect.field(this.properties,i));
		}
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		return this;
	}
	,callMethod: function(method,params) {
		if(params == null) params = [];
		return Reflect.callMethod(method,method,params);
	}
	,change: function() {
		if(this._onUpdate != null) this.callMethod(this._onUpdate,this._onUpdateParams);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) this.callMethod(this._onComplete,this._onCompleteParams);
		}
		motion_Actuate.unload(this);
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,move: function() {
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) this._onCompleteParams = []; else this._onCompleteParams = parameters;
		if(this.duration == 0) this.complete();
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) this._onRepeatParams = []; else this._onRepeatParams = parameters;
		return this;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		return this;
	}
	,onPause: function(handler,parameters) {
		this._onPause = handler;
		if(parameters == null) this._onPauseParams = []; else this._onPauseParams = parameters;
		return this;
	}
	,onResume: function(handler,parameters) {
		this._onResume = handler;
		if(parameters == null) this._onResumeParams = []; else this._onResumeParams = parameters;
		return this;
	}
	,pause: function() {
		if(this._onPause != null) this.callMethod(this._onPause,this._onPauseParams);
	}
	,reflect: function(value) {
		if(value == null) value = true;
		this._reflect = value;
		this.special = true;
		return this;
	}
	,repeat: function(times) {
		if(times == null) times = -1;
		this._repeat = times;
		return this;
	}
	,resume: function() {
		if(this._onResume != null) this.callMethod(this._onResume,this._onResumeParams);
	}
	,reverse: function(value) {
		if(value == null) value = true;
		this._reverse = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) value = true;
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,snapping: function(value) {
		if(value == null) value = true;
		this._snapping = value;
		this.special = true;
		return this;
	}
	,stop: function(properties,complete,sendEvent) {
	}
	,__class__: motion_actuators_GenericActuator
};
var motion_actuators_SimpleActuator = function(target,duration,properties) {
	this.active = true;
	this.propertyDetails = [];
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = haxe_Timer.stamp();
	motion_actuators_GenericActuator.call(this,target,duration,properties);
	if(!motion_actuators_SimpleActuator.addedEvent) {
		motion_actuators_SimpleActuator.addedEvent = true;
		motion_actuators_SimpleActuator.timer = new haxe_Timer(33);
		motion_actuators_SimpleActuator.timer.run = motion_actuators_SimpleActuator.stage_onEnterFrame;
	}
};
$hxClasses["motion.actuators.SimpleActuator"] = motion_actuators_SimpleActuator;
motion_actuators_SimpleActuator.__name__ = ["motion","actuators","SimpleActuator"];
motion_actuators_SimpleActuator.stage_onEnterFrame = function() {
	var currentTime = haxe_Timer.stamp();
	var actuator;
	var j = 0;
	var cleanup = false;
	var _g1 = 0;
	var _g = motion_actuators_SimpleActuator.actuatorsLength;
	while(_g1 < _g) {
		var i = _g1++;
		actuator = motion_actuators_SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(currentTime >= actuator.timeOffset) actuator.update(currentTime);
			j++;
		} else {
			motion_actuators_SimpleActuator.actuators.splice(j,1);
			--motion_actuators_SimpleActuator.actuatorsLength;
		}
	}
};
motion_actuators_SimpleActuator.__super__ = motion_actuators_GenericActuator;
motion_actuators_SimpleActuator.prototype = $extend(motion_actuators_GenericActuator.prototype,{
	setField_motion_actuators_MotionPathActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,setField_motion_actuators_SimpleActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else Reflect.setProperty(target,propertyName,value);
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",this.cacheVisible);
		}
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) value = Reflect.field(target,propertyName); else value = Reflect.getProperty(target,propertyName);
		return value;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) start = Reflect.field(this.target,i); else {
				isField = false;
				start = Reflect.getProperty(this.target,i);
			}
			if(typeof(start) == "number") {
				var value = this.getField(this.properties,i);
				if(start == null) start = 0;
				if(value == null) value = 0;
				details = new motion_actuators_PropertyDetails(this.target,i,start,value - start,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,move: function() {
		this.toggleVisible = Object.prototype.hasOwnProperty.call(this.properties,"alpha") && Object.prototype.hasOwnProperty.call(this.properties,"visible");
		if(this.toggleVisible && this.properties.alpha != 0 && !this.getField(this.target,"visible")) {
			this.setVisible = true;
			this.cacheVisible = this.getField(this.target,"visible");
			this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",true);
		}
		this.timeOffset = this.startTime;
		motion_actuators_SimpleActuator.actuators.push(this);
		++motion_actuators_SimpleActuator.actuatorsLength;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		this.sendChange = true;
		return this;
	}
	,pause: function() {
		if(!this.paused) {
			this.paused = true;
			motion_actuators_GenericActuator.prototype.pause.call(this);
			this.pauseTime = haxe_Timer.stamp();
		}
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += haxe_Timer.stamp() - this.pauseTime;
			motion_actuators_GenericActuator.prototype.resume.call(this);
		}
	}
	,setProperty: function(details,value) {
		if(details.isField) details.target[details.propertyName] = value; else Reflect.setProperty(details.target,details.propertyName,value);
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) this.apply();
				this.complete(sendEvent);
				return;
			}
			var _g = 0;
			var _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(this.properties,i)) {
					this.active = false;
					if(complete) this.apply();
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g1 = 0;
				var _g = this.detailsLength;
				while(_g1 < _g) {
					var i1 = _g1++;
					details = this.propertyDetails[i1];
					this.setProperty(details,details.start + details.change * easing);
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g11 = 0;
				var _g2 = this.detailsLength;
				while(_g11 < _g2) {
					var i2 = _g11++;
					details = this.propertyDetails[i2];
					if(this._smartRotation && (details.propertyName == "rotation" || details.propertyName == "rotationX" || details.propertyName == "rotationY" || details.propertyName == "rotationZ")) {
						var rotation = details.change % 360;
						if(rotation > 180) rotation -= 360; else if(rotation < -180) rotation += 360;
						endValue = details.start + rotation * easing;
					} else endValue = details.start + details.change * easing;
					if(!this._snapping) {
						if(details.isField) details.target[details.propertyName] = endValue; else Reflect.setProperty(details.target,details.propertyName,endValue);
					} else this.setProperty(details,Math.round(endValue));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField_motion_actuators_SimpleActuator_T(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_SimpleActuator
});
var motion_easing_Expo = function() { };
$hxClasses["motion.easing.Expo"] = motion_easing_Expo;
motion_easing_Expo.__name__ = ["motion","easing","Expo"];
motion_easing_Expo.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Expo.get_easeIn = function() {
	return new motion_easing_ExpoEaseIn();
};
motion_easing_Expo.get_easeInOut = function() {
	return new motion_easing_ExpoEaseInOut();
};
motion_easing_Expo.get_easeOut = function() {
	return new motion_easing_ExpoEaseOut();
};
var motion_easing_IEasing = function() { };
$hxClasses["motion.easing.IEasing"] = motion_easing_IEasing;
motion_easing_IEasing.__name__ = ["motion","easing","IEasing"];
motion_easing_IEasing.prototype = {
	__class__: motion_easing_IEasing
};
var motion_easing_ExpoEaseOut = function() {
};
$hxClasses["motion.easing.ExpoEaseOut"] = motion_easing_ExpoEaseOut;
motion_easing_ExpoEaseOut.__name__ = ["motion","easing","ExpoEaseOut"];
motion_easing_ExpoEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseOut.prototype = {
	calculate: function(k) {
		if(k == 1) return 1; else return 1 - Math.pow(2,-10 * k);
	}
	,ease: function(t,b,c,d) {
		if(t == d) return b + c; else return c * (1 - Math.pow(2,-10 * t / d)) + b;
	}
	,__class__: motion_easing_ExpoEaseOut
};
var motion_Actuate = function() { };
$hxClasses["motion.Actuate"] = motion_Actuate;
motion_Actuate.__name__ = ["motion","Actuate"];
motion_Actuate.apply = function(target,properties,customActuator) {
	motion_Actuate.stop(target,properties);
	if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
motion_Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) allowCreation = true;
	if(!(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) && allowCreation) motion_Actuate.targetLibraries.set(target,[]);
	return motion_Actuate.targetLibraries.h[target.__id__];
};
motion_Actuate.isActive = function() {
	var result = false;
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		result = true;
		break;
	}
	return result;
};
motion_Actuate.motionPath = function(target,duration,properties,overwrite) {
	if(overwrite == null) overwrite = true;
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MotionPathActuator);
};
motion_Actuate.pause = function(target) {
	if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.pause();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator1 = library[_g];
				++_g;
				actuator1.pause();
			}
		}
	}
};
motion_Actuate.pauseAll = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.pause();
		}
	}
};
motion_Actuate.reset = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var i = library.length - 1;
		while(i >= 0) {
			library[i].stop(null,false,false);
			i--;
		}
	}
	motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
};
motion_Actuate.resume = function(target) {
	if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.resume();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator1 = library[_g];
				++_g;
				actuator1.resume();
			}
		}
	}
};
motion_Actuate.resumeAll = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.resume();
		}
	}
};
motion_Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) sendEvent = true;
	if(complete == null) complete = false;
	if(target != null) {
		if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
			var actuator = target;
			actuator.stop(null,complete,sendEvent);
		} else {
			var library = motion_Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					Reflect.setField(temp,properties,null);
					properties = temp;
				} else if((properties instanceof Array) && properties.__enum__ == null) {
					var temp1 = { };
					var _g = 0;
					var _g1;
					_g1 = js_Boot.__cast(properties , Array);
					while(_g < _g1.length) {
						var property = _g1[_g];
						++_g;
						Reflect.setField(temp1,property,null);
					}
					properties = temp1;
				}
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(properties,complete,sendEvent);
					i--;
				}
			}
		}
	}
};
motion_Actuate.timer = function(duration,customActuator) {
	return motion_Actuate.tween(new motion__$Actuate_TweenTimer(0),duration,new motion__$Actuate_TweenTimer(1),false,customActuator);
};
motion_Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) overwrite = true;
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = motion_Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					i--;
				}
				library = motion_Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else return motion_Actuate.apply(target,properties,customActuator);
	}
	return null;
};
motion_Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(motion_Actuate.targetLibraries.h[target.__id__],actuator);
		if(motion_Actuate.targetLibraries.h[target.__id__].length == 0) motion_Actuate.targetLibraries.remove(target);
	}
};
motion_Actuate.update = function(target,duration,start,end,overwrite) {
	if(overwrite == null) overwrite = true;
	var properties = { start : start, end : end};
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MethodActuator);
};
var motion__$Actuate_TweenTimer = function(progress) {
	this.progress = progress;
};
$hxClasses["motion._Actuate.TweenTimer"] = motion__$Actuate_TweenTimer;
motion__$Actuate_TweenTimer.__name__ = ["motion","_Actuate","TweenTimer"];
motion__$Actuate_TweenTimer.prototype = {
	__class__: motion__$Actuate_TweenTimer
};
var motion_MotionPath = function() {
	this._x = new motion_ComponentPath();
	this._y = new motion_ComponentPath();
	this._rotation = null;
};
$hxClasses["motion.MotionPath"] = motion_MotionPath;
motion_MotionPath.__name__ = ["motion","MotionPath"];
motion_MotionPath.prototype = {
	bezier: function(x,y,controlX,controlY,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion_BezierPath(x,controlX,strength));
		this._y.addPath(new motion_BezierPath(y,controlY,strength));
		return this;
	}
	,line: function(x,y,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion_LinearPath(x,strength));
		this._y.addPath(new motion_LinearPath(y,strength));
		return this;
	}
	,get_rotation: function() {
		if(this._rotation == null) this._rotation = new motion_RotationPath(this._x,this._y);
		return this._rotation;
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,__class__: motion_MotionPath
	,__properties__: {get_y:"get_y",get_x:"get_x",get_rotation:"get_rotation"}
};
var motion_IComponentPath = function() { };
$hxClasses["motion.IComponentPath"] = motion_IComponentPath;
motion_IComponentPath.__name__ = ["motion","IComponentPath"];
motion_IComponentPath.prototype = {
	__class__: motion_IComponentPath
	,__properties__: {get_end:"get_end"}
};
var motion_ComponentPath = function() {
	this.paths = [];
	this.start = 0;
	this.totalStrength = 0;
};
$hxClasses["motion.ComponentPath"] = motion_ComponentPath;
motion_ComponentPath.__name__ = ["motion","ComponentPath"];
motion_ComponentPath.__interfaces__ = [motion_IComponentPath];
motion_ComponentPath.prototype = {
	addPath: function(path) {
		this.paths.push(path);
		this.totalStrength += path.strength;
	}
	,calculate: function(k) {
		if(this.paths.length == 1) return this.paths[0].calculate(this.start,k); else {
			var ratio = k * this.totalStrength;
			var lastEnd = this.start;
			var _g = 0;
			var _g1 = this.paths;
			while(_g < _g1.length) {
				var path = _g1[_g];
				++_g;
				if(ratio > path.strength) {
					ratio -= path.strength;
					lastEnd = path.end;
				} else return path.calculate(lastEnd,ratio / path.strength);
			}
		}
		return 0;
	}
	,get_end: function() {
		if(this.paths.length > 0) {
			var path = this.paths[this.paths.length - 1];
			return path.end;
		} else return this.start;
	}
	,__class__: motion_ComponentPath
	,__properties__: {get_end:"get_end"}
};
var motion_BezierPath = function(end,control,strength) {
	this.end = end;
	this.control = control;
	this.strength = strength;
};
$hxClasses["motion.BezierPath"] = motion_BezierPath;
motion_BezierPath.__name__ = ["motion","BezierPath"];
motion_BezierPath.prototype = {
	calculate: function(start,k) {
		return (1 - k) * (1 - k) * start + 2 * (1 - k) * k * this.control + k * k * this.end;
	}
	,__class__: motion_BezierPath
};
var motion_LinearPath = function(end,strength) {
	motion_BezierPath.call(this,end,0,strength);
};
$hxClasses["motion.LinearPath"] = motion_LinearPath;
motion_LinearPath.__name__ = ["motion","LinearPath"];
motion_LinearPath.__super__ = motion_BezierPath;
motion_LinearPath.prototype = $extend(motion_BezierPath.prototype,{
	calculate: function(start,k) {
		return start + k * (this.end - start);
	}
	,__class__: motion_LinearPath
});
var motion_RotationPath = function(x,y) {
	this.step = 0.01;
	this._x = x;
	this._y = y;
	this.offset = 0;
	this.start = this.calculate(0.0);
};
$hxClasses["motion.RotationPath"] = motion_RotationPath;
motion_RotationPath.__name__ = ["motion","RotationPath"];
motion_RotationPath.__interfaces__ = [motion_IComponentPath];
motion_RotationPath.prototype = {
	calculate: function(k) {
		var dX = this._x.calculate(k) - this._x.calculate(k + this.step);
		var dY = this._y.calculate(k) - this._y.calculate(k + this.step);
		var angle = Math.atan2(dY,dX) * (180 / Math.PI);
		angle = (angle + this.offset) % 360;
		return angle;
	}
	,get_end: function() {
		return this.calculate(1.0);
	}
	,__class__: motion_RotationPath
	,__properties__: {get_end:"get_end"}
};
var motion_actuators_MethodActuator = function(target,duration,properties) {
	this.currentParameters = [];
	this.tweenProperties = { };
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) this.properties.start = [];
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) this.properties.end = this.properties.start;
	var _g1 = 0;
	var _g = this.properties.start.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.currentParameters.push(this.properties.start[i]);
	}
};
$hxClasses["motion.actuators.MethodActuator"] = motion_actuators_MethodActuator;
motion_actuators_MethodActuator.__name__ = ["motion","actuators","MethodActuator"];
motion_actuators_MethodActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MethodActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		this.callMethod(this.target,this.properties.end);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
		}
		this.callMethod(this.target,this.currentParameters);
		motion_actuators_SimpleActuator.prototype.complete.call(this,sendEvent);
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(typeof(start) == "number" || ((start | 0) === start)) {
				details = new motion_actuators_PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		motion_actuators_SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active && !this.paused) {
			var _g1 = 0;
			var _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			this.callMethod(this.target,this.currentParameters);
		}
	}
	,__class__: motion_actuators_MethodActuator
});
var motion_actuators_MotionPathActuator = function(target,duration,properties) {
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
};
$hxClasses["motion.actuators.MotionPathActuator"] = motion_actuators_MotionPathActuator;
motion_actuators_MotionPathActuator.__name__ = ["motion","actuators","MotionPathActuator"];
motion_actuators_MotionPathActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MotionPathActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) Reflect.setField(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end()); else Reflect.setProperty(this.target,propertyName,(js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end());
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) path.start = Reflect.field(this.target,propertyName); else {
					isField = false;
					path.start = Reflect.getProperty(this.target,propertyName);
				}
				details = new motion_actuators_PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details1 = _g1[_g];
					++_g;
					if(details1.isField) Reflect.setField(details1.target,details1.propertyName,(js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details1.target,details1.propertyName,(js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g2 = 0;
				var _g11 = this.propertyDetails;
				while(_g2 < _g11.length) {
					var details2 = _g11[_g2];
					++_g2;
					if(!this._snapping) {
						if(details2.isField) Reflect.setField(details2.target,details2.propertyName,(js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing)); else Reflect.setProperty(details2.target,details2.propertyName,(js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
					} else if(details2.isField) Reflect.setField(details2.target,details2.propertyName,Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing))); else Reflect.setProperty(details2.target,details2.propertyName,Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing)));
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					if(this.toggleVisible && this.getField(this.target,"alpha") == 0) this.setField_motion_actuators_MotionPathActuator_T(this.target,"visible",false);
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) this.callMethod(this._onRepeat,this._onRepeatParams);
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_MotionPathActuator
});
var motion_actuators_PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) isField = true;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
$hxClasses["motion.actuators.PropertyDetails"] = motion_actuators_PropertyDetails;
motion_actuators_PropertyDetails.__name__ = ["motion","actuators","PropertyDetails"];
motion_actuators_PropertyDetails.prototype = {
	__class__: motion_actuators_PropertyDetails
};
var motion_actuators_PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) isField = true;
	motion_actuators_PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
$hxClasses["motion.actuators.PropertyPathDetails"] = motion_actuators_PropertyPathDetails;
motion_actuators_PropertyPathDetails.__name__ = ["motion","actuators","PropertyPathDetails"];
motion_actuators_PropertyPathDetails.__super__ = motion_actuators_PropertyDetails;
motion_actuators_PropertyPathDetails.prototype = $extend(motion_actuators_PropertyDetails.prototype,{
	__class__: motion_actuators_PropertyPathDetails
});
var motion_easing_Bounce = function() { };
$hxClasses["motion.easing.Bounce"] = motion_easing_Bounce;
motion_easing_Bounce.__name__ = ["motion","easing","Bounce"];
motion_easing_Bounce.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Bounce.get_easeIn = function() {
	return new motion_easing_BounceEaseIn();
};
motion_easing_Bounce.get_easeInOut = function() {
	return new motion_easing_BounceEaseInOut();
};
motion_easing_Bounce.get_easeOut = function() {
	return new motion_easing_BounceEaseOut();
};
var motion_easing_BounceEaseIn = function() {
};
$hxClasses["motion.easing.BounceEaseIn"] = motion_easing_BounceEaseIn;
motion_easing_BounceEaseIn.__name__ = ["motion","easing","BounceEaseIn"];
motion_easing_BounceEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_BounceEaseIn._ease = function(t,b,c,d) {
	return c - motion_easing_BounceEaseOut._ease(d - t,0,c,d) + b;
};
motion_easing_BounceEaseIn.prototype = {
	calculate: function(k) {
		return 1 - motion_easing_BounceEaseOut._ease(1 - k,0,1,1);
	}
	,ease: function(t,b,c,d) {
		return c - motion_easing_BounceEaseOut._ease(d - t,0,c,d) + b;
	}
	,__class__: motion_easing_BounceEaseIn
};
var motion_easing_BounceEaseInOut = function() {
};
$hxClasses["motion.easing.BounceEaseInOut"] = motion_easing_BounceEaseInOut;
motion_easing_BounceEaseInOut.__name__ = ["motion","easing","BounceEaseInOut"];
motion_easing_BounceEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_BounceEaseInOut.prototype = {
	calculate: function(k) {
		if(k < .5) return (1 - motion_easing_BounceEaseOut._ease(1 - k * 2,0,1,1)) * .5; else return motion_easing_BounceEaseOut._ease(k * 2 - 1,0,1,1) * .5 + .5;
	}
	,ease: function(t,b,c,d) {
		if(t < d / 2) return (c - motion_easing_BounceEaseOut._ease(d - t * 2,0,c,d)) * .5 + b; else return motion_easing_BounceEaseOut._ease(t * 2 - d,0,c,d) * .5 + c * .5 + b;
	}
	,__class__: motion_easing_BounceEaseInOut
};
var motion_easing_BounceEaseOut = function() {
};
$hxClasses["motion.easing.BounceEaseOut"] = motion_easing_BounceEaseOut;
motion_easing_BounceEaseOut.__name__ = ["motion","easing","BounceEaseOut"];
motion_easing_BounceEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_BounceEaseOut._ease = function(t,b,c,d) {
	if((t /= d) < 0.36363636363636365) return c * (7.5625 * t * t) + b; else if(t < 0.72727272727272729) return c * (7.5625 * (t -= 0.54545454545454541) * t + .75) + b; else if(t < 0.90909090909090906) return c * (7.5625 * (t -= 0.81818181818181823) * t + .9375) + b; else return c * (7.5625 * (t -= 0.95454545454545459) * t + .984375) + b;
};
motion_easing_BounceEaseOut.prototype = {
	calculate: function(k) {
		return motion_easing_BounceEaseOut._ease(k,0,1,1);
	}
	,ease: function(t,b,c,d) {
		return motion_easing_BounceEaseOut._ease(t,b,c,d);
	}
	,__class__: motion_easing_BounceEaseOut
};
var motion_easing_Cubic = function() { };
$hxClasses["motion.easing.Cubic"] = motion_easing_Cubic;
motion_easing_Cubic.__name__ = ["motion","easing","Cubic"];
motion_easing_Cubic.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Cubic.get_easeIn = function() {
	return new motion_easing_CubicEaseIn();
};
motion_easing_Cubic.get_easeInOut = function() {
	return new motion_easing_CubicEaseInOut();
};
motion_easing_Cubic.get_easeOut = function() {
	return new motion_easing_CubicEaseOut();
};
var motion_easing_CubicEaseIn = function() {
};
$hxClasses["motion.easing.CubicEaseIn"] = motion_easing_CubicEaseIn;
motion_easing_CubicEaseIn.__name__ = ["motion","easing","CubicEaseIn"];
motion_easing_CubicEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_CubicEaseIn.prototype = {
	calculate: function(k) {
		return k * k * k;
	}
	,ease: function(t,b,c,d) {
		return c * (t /= d) * t * t + b;
	}
	,__class__: motion_easing_CubicEaseIn
};
var motion_easing_CubicEaseInOut = function() {
};
$hxClasses["motion.easing.CubicEaseInOut"] = motion_easing_CubicEaseInOut;
motion_easing_CubicEaseInOut.__name__ = ["motion","easing","CubicEaseInOut"];
motion_easing_CubicEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_CubicEaseInOut.prototype = {
	calculate: function(k) {
		if((k /= 0.5) < 1) return 0.5 * k * k * k; else return 0.5 * ((k -= 2) * k * k + 2);
	}
	,ease: function(t,b,c,d) {
		if((t /= d / 2) < 1) return c / 2 * t * t * t + b; else return c / 2 * ((t -= 2) * t * t + 2) + b;
	}
	,__class__: motion_easing_CubicEaseInOut
};
var motion_easing_CubicEaseOut = function() {
};
$hxClasses["motion.easing.CubicEaseOut"] = motion_easing_CubicEaseOut;
motion_easing_CubicEaseOut.__name__ = ["motion","easing","CubicEaseOut"];
motion_easing_CubicEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_CubicEaseOut.prototype = {
	calculate: function(k) {
		return --k * k * k + 1;
	}
	,ease: function(t,b,c,d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	}
	,__class__: motion_easing_CubicEaseOut
};
var motion_easing_Elastic = function() { };
$hxClasses["motion.easing.Elastic"] = motion_easing_Elastic;
motion_easing_Elastic.__name__ = ["motion","easing","Elastic"];
motion_easing_Elastic.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Elastic.get_easeIn = function() {
	return new motion_easing_ElasticEaseIn(0.1,0.4);
};
motion_easing_Elastic.get_easeInOut = function() {
	return new motion_easing_ElasticEaseInOut(0.1,0.4);
};
motion_easing_Elastic.get_easeOut = function() {
	return new motion_easing_ElasticEaseOut(0.1,0.4);
};
var motion_easing_ElasticEaseIn = function(a,p) {
	this.a = a;
	this.p = p;
};
$hxClasses["motion.easing.ElasticEaseIn"] = motion_easing_ElasticEaseIn;
motion_easing_ElasticEaseIn.__name__ = ["motion","easing","ElasticEaseIn"];
motion_easing_ElasticEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_ElasticEaseIn.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		var s;
		if(this.a < 1) {
			this.a = 1;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(1 / this.a);
		return -(this.a * Math.pow(2,10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / this.p));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if((t /= d) == 1) return b + c;
		var s;
		if(this.a < Math.abs(c)) {
			this.a = c;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(c / this.a);
		return -(this.a * Math.pow(2,10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / this.p)) + b;
	}
	,__class__: motion_easing_ElasticEaseIn
};
var motion_easing_ElasticEaseInOut = function(a,p) {
	this.a = a;
	this.p = p;
};
$hxClasses["motion.easing.ElasticEaseInOut"] = motion_easing_ElasticEaseInOut;
motion_easing_ElasticEaseInOut.__name__ = ["motion","easing","ElasticEaseInOut"];
motion_easing_ElasticEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ElasticEaseInOut.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if((k /= 0.5) == 2) return 1;
		var p = 0.44999999999999996;
		var a = 1;
		var s = p / 4;
		if(k < 1) return -0.5 * (Math.pow(2,10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
		return Math.pow(2,-10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if((t /= d / 2) == 2) return b + c;
		var s;
		if(this.a < Math.abs(c)) {
			this.a = c;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(c / this.a);
		if(t < 1) return -0.5 * (this.a * Math.pow(2,10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / this.p)) + b;
		return this.a * Math.pow(2,-10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / this.p) * 0.5 + c + b;
	}
	,__class__: motion_easing_ElasticEaseInOut
};
var motion_easing_ElasticEaseOut = function(a,p) {
	this.a = a;
	this.p = p;
};
$hxClasses["motion.easing.ElasticEaseOut"] = motion_easing_ElasticEaseOut;
motion_easing_ElasticEaseOut.__name__ = ["motion","easing","ElasticEaseOut"];
motion_easing_ElasticEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ElasticEaseOut.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		var s;
		if(this.a < 1) {
			this.a = 1;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(1 / this.a);
		return this.a * Math.pow(2,-10 * k) * Math.sin((k - s) * (2 * Math.PI) / this.p) + 1;
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if((t /= d) == 1) return b + c;
		var s;
		if(this.a < Math.abs(c)) {
			this.a = c;
			s = this.p / 4;
		} else s = this.p / (2 * Math.PI) * Math.asin(c / this.a);
		return this.a * Math.pow(2,-10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / this.p) + c + b;
	}
	,__class__: motion_easing_ElasticEaseOut
};
var motion_easing_ExpoEaseIn = function() {
};
$hxClasses["motion.easing.ExpoEaseIn"] = motion_easing_ExpoEaseIn;
motion_easing_ExpoEaseIn.__name__ = ["motion","easing","ExpoEaseIn"];
motion_easing_ExpoEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseIn.prototype = {
	calculate: function(k) {
		if(k == 0) return 0; else return Math.pow(2,10 * (k - 1));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b; else return c * Math.pow(2,10 * (t / d - 1)) + b;
	}
	,__class__: motion_easing_ExpoEaseIn
};
var motion_easing_ExpoEaseInOut = function() {
};
$hxClasses["motion.easing.ExpoEaseInOut"] = motion_easing_ExpoEaseInOut;
motion_easing_ExpoEaseInOut.__name__ = ["motion","easing","ExpoEaseInOut"];
motion_easing_ExpoEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseInOut.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		if((k /= 0.5) < 1.0) return 0.5 * Math.pow(2,10 * (k - 1));
		return 0.5 * (2 - Math.pow(2,-10 * --k));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if(t == d) return b + c;
		if((t /= d / 2.0) < 1.0) return c / 2 * Math.pow(2,10 * (t - 1)) + b;
		return c / 2 * (2 - Math.pow(2,-10 * --t)) + b;
	}
	,__class__: motion_easing_ExpoEaseInOut
};
var motion_easing_Linear = function() { };
$hxClasses["motion.easing.Linear"] = motion_easing_Linear;
motion_easing_Linear.__name__ = ["motion","easing","Linear"];
motion_easing_Linear.__properties__ = {get_easeNone:"get_easeNone"}
motion_easing_Linear.get_easeNone = function() {
	return new motion_easing_LinearEaseNone();
};
var motion_easing_LinearEaseNone = function() {
};
$hxClasses["motion.easing.LinearEaseNone"] = motion_easing_LinearEaseNone;
motion_easing_LinearEaseNone.__name__ = ["motion","easing","LinearEaseNone"];
motion_easing_LinearEaseNone.__interfaces__ = [motion_easing_IEasing];
motion_easing_LinearEaseNone.prototype = {
	calculate: function(k) {
		return k;
	}
	,ease: function(t,b,c,d) {
		return c * t / d + b;
	}
	,__class__: motion_easing_LinearEaseNone
};
var motion_easing_Quad = function() { };
$hxClasses["motion.easing.Quad"] = motion_easing_Quad;
motion_easing_Quad.__name__ = ["motion","easing","Quad"];
motion_easing_Quad.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Quad.get_easeIn = function() {
	return new motion_easing_QuadEaseIn();
};
motion_easing_Quad.get_easeInOut = function() {
	return new motion_easing_QuadEaseInOut();
};
motion_easing_Quad.get_easeOut = function() {
	return new motion_easing_QuadEaseOut();
};
var motion_easing_QuadEaseIn = function() {
};
$hxClasses["motion.easing.QuadEaseIn"] = motion_easing_QuadEaseIn;
motion_easing_QuadEaseIn.__name__ = ["motion","easing","QuadEaseIn"];
motion_easing_QuadEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_QuadEaseIn.prototype = {
	calculate: function(k) {
		return k * k;
	}
	,ease: function(t,b,c,d) {
		return c * (t /= d) * t + b;
	}
	,__class__: motion_easing_QuadEaseIn
};
var motion_easing_QuadEaseInOut = function() {
};
$hxClasses["motion.easing.QuadEaseInOut"] = motion_easing_QuadEaseInOut;
motion_easing_QuadEaseInOut.__name__ = ["motion","easing","QuadEaseInOut"];
motion_easing_QuadEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_QuadEaseInOut.prototype = {
	calculate: function(k) {
		if((k *= 2) < 1) return 0.5 * k * k;
		return -0.5 * ((k - 1) * (k - 3) - 1);
	}
	,ease: function(t,b,c,d) {
		if((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((t - 1) * (t - 3) - 1) + b;
	}
	,__class__: motion_easing_QuadEaseInOut
};
var motion_easing_QuadEaseOut = function() {
};
$hxClasses["motion.easing.QuadEaseOut"] = motion_easing_QuadEaseOut;
motion_easing_QuadEaseOut.__name__ = ["motion","easing","QuadEaseOut"];
motion_easing_QuadEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_QuadEaseOut.prototype = {
	calculate: function(k) {
		return -k * (k - 2);
	}
	,ease: function(t,b,c,d) {
		return -c * (t /= d) * (t - 2) + b;
	}
	,__class__: motion_easing_QuadEaseOut
};
var pathfinder_Coordinate = function(p_x,p_y) {
	if(p_y == null) p_y = 0;
	if(p_x == null) p_x = 0;
	this.x = p_x;
	this.y = p_y;
};
$hxClasses["pathfinder.Coordinate"] = pathfinder_Coordinate;
pathfinder_Coordinate.__name__ = ["pathfinder","Coordinate"];
pathfinder_Coordinate.prototype = {
	isEqualTo: function(p_coordinate) {
		return this.x == p_coordinate.x && this.y == p_coordinate.y;
	}
	,toString: function() {
		return "(" + this.x + "," + this.y + ")";
	}
	,clone: function() {
		return new pathfinder_Coordinate(this.x,this.y);
	}
	,__class__: pathfinder_Coordinate
};
var pathfinder_EHeuristic = { __ename__ : true, __constructs__ : ["DIAGONAL","PRODUCT","EUCLIDIAN","MANHATTAN"] };
pathfinder_EHeuristic.DIAGONAL = ["DIAGONAL",0];
pathfinder_EHeuristic.DIAGONAL.toString = $estr;
pathfinder_EHeuristic.DIAGONAL.__enum__ = pathfinder_EHeuristic;
pathfinder_EHeuristic.PRODUCT = ["PRODUCT",1];
pathfinder_EHeuristic.PRODUCT.toString = $estr;
pathfinder_EHeuristic.PRODUCT.__enum__ = pathfinder_EHeuristic;
pathfinder_EHeuristic.EUCLIDIAN = ["EUCLIDIAN",2];
pathfinder_EHeuristic.EUCLIDIAN.toString = $estr;
pathfinder_EHeuristic.EUCLIDIAN.__enum__ = pathfinder_EHeuristic;
pathfinder_EHeuristic.MANHATTAN = ["MANHATTAN",3];
pathfinder_EHeuristic.MANHATTAN.toString = $estr;
pathfinder_EHeuristic.MANHATTAN.__enum__ = pathfinder_EHeuristic;
var pathfinder_Node = function(p_x,p_y,p_isWalkable) {
	if(p_isWalkable == null) p_isWalkable = true;
	this.isWalkable = p_isWalkable;
	pathfinder_Coordinate.call(this,p_x,p_y);
};
$hxClasses["pathfinder.Node"] = pathfinder_Node;
pathfinder_Node.__name__ = ["pathfinder","Node"];
pathfinder_Node.__super__ = pathfinder_Coordinate;
pathfinder_Node.prototype = $extend(pathfinder_Coordinate.prototype,{
	toString: function() {
		var l_result;
		l_result = "[Node(" + this.x + "," + this.y + ")";
		if(this.parent != null) l_result += ", parent=(" + this.parent.x + "," + this.parent.y + ")";
		l_result += ", " + (this.isWalkable?"W":"X");
		l_result += ", f=" + this.f;
		l_result += ", g=" + this.g;
		l_result += "]";
		return l_result;
	}
	,__class__: pathfinder_Node
});
var pathfinder_Pathfinder = function(p_map,p_timeOutDuration) {
	if(p_timeOutDuration == null) p_timeOutDuration = 10000;
	this.configure(p_map,p_timeOutDuration);
};
$hxClasses["pathfinder.Pathfinder"] = pathfinder_Pathfinder;
pathfinder_Pathfinder.__name__ = ["pathfinder","Pathfinder"];
pathfinder_Pathfinder.prototype = {
	configure: function(p_map,p_timeOutDuration) {
		if(p_timeOutDuration == null) p_timeOutDuration = 10000;
		this._map = p_map;
		this._timeOutDuration = p_timeOutDuration;
		this._nodes = [];
		this._cols = this._map.cols;
		this._rows = this._map.rows;
		var _g1 = 0;
		var _g = this._map.cols;
		while(_g1 < _g) {
			var l_ix = _g1++;
			var l_line = this._nodes[l_ix] = [];
			var _g3 = 0;
			var _g2 = this._map.rows;
			while(_g3 < _g2) {
				var l_iy = _g3++;
				l_line[l_iy] = new pathfinder_Node(l_ix,l_iy,this._map.isWalkable(l_ix,l_iy));
			}
		}
	}
	,_getCost: function(p_node1,p_node2,p_heuristic) {
		switch(p_heuristic[1]) {
		case 0:
			return this._getCostDiagonal(p_node1,p_node2);
		case 1:
			return this._getCostProduct(p_node1,p_node2);
		case 2:
			return this._getCostEuclidian(p_node1,p_node2);
		case 3:
			return this._getCostManhattan(p_node1,p_node2);
		}
	}
	,_getCostDiagonal: function(p_node1,p_node2) {
		var l_dx = this._intAbs(p_node1.x - p_node2.x);
		var l_dy = this._intAbs(p_node1.y - p_node2.y);
		var l_diag;
		if(l_dx < l_dy) l_diag = l_dx; else l_diag = l_dy;
		var l_straight = l_dx + l_dy;
		return 10 * (l_straight - 2 * l_diag) + 14 * l_diag;
	}
	,_getCostProduct: function(p_node1,p_node2) {
		var l_dx1 = this._intAbs(p_node1.x - this._destNode.x);
		var l_dy1 = this._intAbs(p_node1.y - this._destNode.y);
		var l_dx2 = this._intAbs(this._startNode.x - this._destNode.x);
		var l_dy2 = this._intAbs(this._startNode.y - this._destNode.y);
		var l_cross = this._intAbs(l_dx1 * l_dy2 - l_dx2 * l_dy1) * .01;
		return this._getCostDiagonal(p_node1,p_node2) + l_cross;
	}
	,_getCostEuclidian: function(p_node1,p_node2) {
		var l_dx = this._intAbs(p_node1.x - p_node2.x);
		var l_dy = this._intAbs(p_node1.y - p_node2.y);
		return Math.sqrt(l_dx * l_dx + l_dy * l_dy) * 10;
	}
	,_getCostManhattan: function(p_node1,p_node2) {
		var l_dx = p_node1.x - p_node2.x;
		var l_dy = p_node1.y - p_node2.y;
		return ((l_dx > 0?l_dx:-l_dx) + (l_dy > 0?l_dy:-l_dy)) * 10;
	}
	,createPath: function(p_start,p_dest,p_heuristic,p_isDiagonalEnabled,p_isMapDynamic) {
		if(p_isMapDynamic == null) p_isMapDynamic = false;
		if(p_isDiagonalEnabled == null) p_isDiagonalEnabled = true;
		if(p_heuristic == null) p_heuristic = pathfinder_EHeuristic.PRODUCT;
		this._info = { heuristic : p_heuristic, timeElapsed : 0, pathLength : 0, isDiagonalEnabled : p_isDiagonalEnabled};
		if(!this._map.isWalkable(p_start.x,p_start.y) || !this._map.isWalkable(p_dest.x,p_dest.y) || p_start.isEqualTo(p_dest)) return null;
		this._openList = [];
		this._closedList = [];
		this._startNode = this._nodes[p_start.x][p_start.y];
		this._destNode = this._nodes[p_dest.x][p_dest.y];
		this._startNode.g = 0;
		this._startNode.f = this._getCost(this._startNode,this._destNode,p_heuristic);
		this._openList.push(this._startNode);
		return this._searchPath(p_heuristic,p_isDiagonalEnabled,p_isMapDynamic);
	}
	,_getPath: function() {
		var l_path = [];
		var l_node = this._destNode;
		l_path[0] = l_node.clone();
		do {
			l_node = l_node.parent;
			l_path.unshift(l_node.clone());
			if(l_node == this._startNode) break;
		} while(true);
		return l_path;
	}
	,_searchPath: function(p_heuristic,p_isDiagonalEnabled,p_isMapDynamic) {
		if(p_isMapDynamic == null) p_isMapDynamic = false;
		if(p_isDiagonalEnabled == null) p_isDiagonalEnabled = true;
		var l_minX;
		var l_maxX;
		var l_minY;
		var l_maxY;
		var l_isWalkable;
		var l_g;
		var l_f;
		var l_cost;
		var l_nextNode = null;
		var l_currentNode = this._startNode;
		var l_startTime = haxe_Timer.stamp();
		this._isCompleted = false;
		while(!this._isCompleted) {
			if(l_currentNode.x - 1 < 0) l_minX = 0; else l_minX = l_currentNode.x - 1;
			if(l_currentNode.x + 1 >= this._cols) l_maxX = this._cols - 1; else l_maxX = l_currentNode.x + 1;
			if(l_currentNode.y - 1 < 0) l_minY = 0; else l_minY = l_currentNode.y - 1;
			if(l_currentNode.y + 1 >= this._rows) l_maxY = this._rows - 1; else l_maxY = l_currentNode.y + 1;
			var _g1 = l_minY;
			var _g = l_maxY + 1;
			while(_g1 < _g) {
				var l_iy = _g1++;
				var _g3 = l_minX;
				var _g2 = l_maxX + 1;
				while(_g3 < _g2) {
					var l_ix = _g3++;
					l_nextNode = this._nodes[l_ix][l_iy];
					l_isWalkable = !p_isMapDynamic && l_nextNode.isWalkable || p_isMapDynamic && this._map.isWalkable(l_ix,l_iy);
					if(l_nextNode == l_currentNode || !l_isWalkable) continue;
					l_cost = 10;
					if(!(l_currentNode.x == l_nextNode.x || l_currentNode.y == l_nextNode.y)) {
						if(!p_isDiagonalEnabled) continue;
						l_cost = 14;
					}
					l_g = l_currentNode.g + l_cost;
					l_f = l_g + this._getCost(l_nextNode,this._destNode,p_heuristic);
					if(HxOverrides.indexOf(this._openList,l_nextNode,0) != -1 || HxOverrides.indexOf(this._closedList,l_nextNode,0) != -1) {
						if(l_nextNode.f > l_f) {
							l_nextNode.f = l_f;
							l_nextNode.g = l_g;
							l_nextNode.parent = l_currentNode;
						}
					} else {
						l_nextNode.f = l_f;
						l_nextNode.g = l_g;
						l_nextNode.parent = l_currentNode;
						this._openList.push(l_nextNode);
					}
				}
				this._info.timeElapsed = Std["int"]((haxe_Timer.stamp() - l_startTime) * 1000);
				if(this._info.timeElapsed > this._timeOutDuration) return null;
			}
			this._closedList.push(l_currentNode);
			if(this._openList.length == 0) return null;
			this._openList.sort($bind(this,this._sort));
			l_currentNode = this._openList.shift();
			if(l_currentNode == this._destNode) this._isCompleted = true;
		}
		this._info.timeElapsed = Std["int"]((haxe_Timer.stamp() - l_startTime) * 1000);
		var l_path = this._getPath();
		this._info.pathLength = l_path.length;
		return l_path;
	}
	,_sort: function(p_x,p_y) {
		if(p_x.f > p_y.f) return 1; else if(p_x.f < p_y.f) return -1; else return 0;
	}
	,_intAbs: function(p_value) {
		if(p_value < 0) return -p_value; else return p_value;
	}
	,_intMin: function(p_v1,p_v2) {
		if(p_v1 < p_v2) return p_v1; else return p_v2;
	}
	,getInfo: function() {
		if(this._isCompleted) return "Success using " + Std.string(this._info.heuristic) + (!this._info.isDiagonalEnabled?" (and diagonals disabled )":"") + " with a path length of " + this._info.pathLength + " taking " + this._info.timeElapsed + "ms"; else return "Fail";
	}
	,__class__: pathfinder_Pathfinder
};
var pixi_display_FlumpMovie = function(symbolId,resourceId) {
	this.animationSpeed = 1.0;
	this.ticker = PIXI.ticker.shared;
	this.displaying = new haxe_ds_ObjectMap();
	this.movieChildren = new haxe_ds_ObjectMap();
	this.layerLookup = new haxe_ds_StringMap();
	this.layers = new haxe_ds_ObjectMap();
	PIXI.Container.call(this);
	this.resourceId = resourceId;
	if(resourceId == null) {
		this.resource = pixi_display_FlumpResource.getResourceForMovie(symbolId);
		if(this.resource == null) throw new js__$Boot_HaxeError("Flump movie does not exist: " + symbolId);
	} else {
		this.resource = pixi_display_FlumpResource.get(resourceId);
		if(this.resource == null) throw new js__$Boot_HaxeError("Flump resource does not exist: " + resourceId);
	}
	this.symbol = this.resource.library.movies.get(symbolId);
	this.player = new flump_MoviePlayer(this.symbol,this);
	this.set_loop(true);
	this.master = true;
	this.once("added",$bind(this,this.onAdded));
};
$hxClasses["pixi.display.FlumpMovie"] = pixi_display_FlumpMovie;
pixi_display_FlumpMovie.__name__ = ["pixi","display","FlumpMovie"];
pixi_display_FlumpMovie.__interfaces__ = [flump_IFlumpMovie];
pixi_display_FlumpMovie.__super__ = PIXI.Container;
pixi_display_FlumpMovie.prototype = $extend(PIXI.Container.prototype,{
	disableAsMaster: function() {
		this.master = false;
		this.off("added",$bind(this,this.onAdded));
	}
	,getLayer: function(layerId) {
		if(this.layerLookup.exists(layerId) == false) throw new js__$Boot_HaxeError("Layer " + layerId + "does not exist");
		return this.layerLookup.get(layerId);
	}
	,getChildDisplayObject: function(layerId,keyframeIndex) {
		if(keyframeIndex == null) keyframeIndex = 0;
		var key = this.player.getDisplayKey(layerId,keyframeIndex);
		return this.movieChildren.h[key.__id__];
	}
	,getChildMovie: function(layerId,keyframeIndex) {
		if(keyframeIndex == null) keyframeIndex = 0;
		var child = this.getChildDisplayObject(layerId,keyframeIndex);
		if(js_Boot.__instanceof(child,pixi_display_FlumpMovie) == false) throw new js__$Boot_HaxeError("Child on layer " + layerId + " at keyframeIndex " + Std.string(_$UInt_UInt_$Impl_$.toFloat(keyframeIndex)) + " is not of type FlumpMovie!");
		return child;
	}
	,get_symbolId: function() {
		return this.symbol.name;
	}
	,set_loop: function(value) {
		if(value && this.player.get_playing()) this.player.loop(); else if(value == false && this.player.get_looping()) this.player.play();
		return this.loop = value;
	}
	,set_onComplete: function(value) {
		return this.onComplete = value;
	}
	,set_currentFrame: function(value) {
		this.player.set_currentFrame(value);
		return value;
	}
	,get_currentFrame: function() {
		return this.player.get_currentFrame();
	}
	,get_playing: function() {
		return this.player.get_playing() || this.player.get_looping();
	}
	,get_independantTimeline: function() {
		return this.player.independantTimeline;
	}
	,set_independantTimeline: function(value) {
		this.player.independantTimeline = value;
		return value;
	}
	,get_independantControl: function() {
		return this.player.independantControl;
	}
	,set_independantControl: function(value) {
		this.player.independantControl = value;
		return value;
	}
	,get_totalFrames: function() {
		return this.player.get_totalFrames();
	}
	,stop: function() {
		this.player.stop();
	}
	,play: function() {
		if(this.loop) this.player.loop(); else this.player.play();
	}
	,gotoAndStop: function(frameNumber) {
		if(!this.loop) {
			if(_$UInt_UInt_$Impl_$.gt(frameNumber,(function($this) {
				var $r;
				var a = $this.player.get_totalFrames();
				$r = a - 1;
				return $r;
			}(this)))) {
				var a1 = this.player.get_totalFrames();
				frameNumber = a1 - 1;
			} else if(frameNumber < 0) frameNumber = 0;
		}
		this.player.goToFrame(frameNumber).stop();
	}
	,gotoAndPlay: function(frameNumber) {
		if(!this.loop) {
			if(_$UInt_UInt_$Impl_$.gt(frameNumber,(function($this) {
				var $r;
				var a = $this.player.get_totalFrames();
				$r = a - 1;
				return $r;
			}(this)))) {
				var a1 = this.player.get_totalFrames();
				frameNumber = a1 - 1;
			} else if(frameNumber < 0) frameNumber = 0;
		}
		if(this.loop) this.player.goToFrame(frameNumber).loop(); else this.player.goToFrame(frameNumber).play();
	}
	,getLabelFrame: function(label) {
		return this.player.getLabelFrame(label);
	}
	,tick: function() {
		this.player.advanceTime(this.ticker.elapsedMS * this.animationSpeed);
	}
	,onAdded: function(to) {
		this.once("removed",$bind(this,this.onRemoved));
		this.ticker.add($bind(this,this.tick));
	}
	,onRemoved: function(from) {
		this.once("added",$bind(this,this.onAdded));
		this.ticker.remove($bind(this,this.tick));
	}
	,createLayer: function(layer) {
		var v = new pixi_display_PixiLayer();
		this.layers.set(layer,v);
		v;
		var v1 = this.layers.h[layer.__id__];
		this.layerLookup.set(layer.name,v1);
		v1;
		this.addChild(this.layers.h[layer.__id__]);
	}
	,getChildPlayer: function(keyframe) {
		var movie = this.movieChildren.h[keyframe.displayKey.__id__];
		return movie.player;
	}
	,createFlumpChild: function(displayKey) {
		var v = this.resource.createDisplayObject(displayKey.symbolId);
		this.movieChildren.set(displayKey,v);
		v;
	}
	,removeFlumpChild: function(layer,displayKey) {
		var layer1 = this.layers.h[layer.__id__];
		layer1.removeChildren();
	}
	,addFlumpChild: function(layer,displayKey) {
		var layer1 = this.layers.h[layer.__id__];
		layer1.addChild(this.movieChildren.h[displayKey.__id__]);
	}
	,onAnimationComplete: function() {
		if(this.onComplete != null) this.onComplete();
	}
	,renderFrame: function(keyframe,x,y,scaleX,scaleY,skewX,skewY) {
		var layer = this.layers.h[keyframe.layer.__id__];
		layer.x = x;
		layer.y = y;
		layer.scale.x = scaleX;
		layer.scale.y = scaleY;
		layer.skew.x = skewX;
		layer.skew.y = skewY;
		layer.pivot.x = keyframe.pivot.x;
		layer.pivot.y = keyframe.pivot.y;
	}
	,labelPassed: function(label) {
		this.emit("labelPassed",label.name);
	}
	,destroy: function() {
		this.stop();
		this.set_onComplete(null);
		var $it0 = this.layers.iterator();
		while( $it0.hasNext() ) {
			var layer = $it0.next();
			layer.removeChildren();
		}
		this.symbol = null;
		this.player = null;
		PIXI.Container.prototype.destroy.call(this,true);
	}
	,__class__: pixi_display_FlumpMovie
	,__properties__: {get_totalFrames:"get_totalFrames",set_independantControl:"set_independantControl",get_independantControl:"get_independantControl",set_independantTimeline:"set_independantTimeline",get_independantTimeline:"get_independantTimeline",get_playing:"get_playing",set_currentFrame:"set_currentFrame",get_currentFrame:"get_currentFrame",set_onComplete:"set_onComplete",set_loop:"set_loop",get_symbolId:"get_symbolId"}
});
var pixi_display_FlumpResource = function(library,textures,resourceId) {
	this.library = library;
	this.textures = textures;
	this.resourceId = resourceId;
};
$hxClasses["pixi.display.FlumpResource"] = pixi_display_FlumpResource;
pixi_display_FlumpResource.__name__ = ["pixi","display","FlumpResource"];
pixi_display_FlumpResource.exists = function(resourceName) {
	return pixi_display_FlumpResource.resources.exists(resourceName);
};
pixi_display_FlumpResource.destroy = function(resourceName) {
	if(pixi_display_FlumpResource.resources.exists(resourceName) == false) throw new js__$Boot_HaxeError("Cannot destroy FlumpResource: " + resourceName + " as it does not exist.");
	var resource = pixi_display_FlumpResource.resources.get(resourceName);
	var $it0 = resource.textures.iterator();
	while( $it0.hasNext() ) {
		var texture = $it0.next();
		texture.destroy();
	}
	resource.library = null;
	pixi_display_FlumpResource.resources.remove(resourceName);
};
pixi_display_FlumpResource.flumpParser = function(resource,next) {
	if(resource.data == null || resource.isJson == false) return;
	if(!resource.data.hasField("md5") || !resource.data.hasField("movies") || !resource.data.hasField("textureGroups") || !resource.data.hasField("frameRate")) return;
	var lib = flump_library_FlumpLibrary.create(resource.data);
	var textures = new haxe_ds_StringMap();
	var atlasLoader = new PIXI.loaders.Loader();
	atlasLoader.baseUrl = new EReg("/(.[^/]*)$","i").replace(resource.url,"");
	var _g = 0;
	var _g1 = lib.atlases;
	while(_g < _g1.length) {
		var atlasSpec = [_g1[_g]];
		++_g;
		atlasLoader.add(atlasSpec[0].file,null,(function(atlasSpec) {
			return function(atlasResource) {
				var atlasTexture = new PIXI.BaseTexture(atlasResource.data);
				var _g2 = 0;
				var _g3 = atlasSpec[0].textures;
				while(_g2 < _g3.length) {
					var textureSpec = _g3[_g2];
					++_g2;
					var frame = new PIXI.Rectangle(textureSpec.rect[0],textureSpec.rect[1],textureSpec.rect[2],textureSpec.rect[3]);
					var origin = new flump_library_Point(textureSpec.origin[0],textureSpec.origin[1]);
					origin.x = origin.x / frame.width;
					origin.y = origin.y / frame.height;
					var v = new PIXI.Texture(atlasTexture,frame);
					textures.set(textureSpec.symbol,v);
					v;
				}
			};
		})(atlasSpec));
	}
	atlasLoader.once("complete",function(loader) {
		var flumpResource = new pixi_display_FlumpResource(lib,textures,resource.name);
		if(resource.name != null) {
			pixi_display_FlumpResource.resources.set(resource.name,flumpResource);
			flumpResource;
		}
		resource.data = flumpResource;
		next();
	});
	atlasLoader.load();
};
pixi_display_FlumpResource.get = function(resourceName) {
	if(!pixi_display_FlumpResource.resources.exists(resourceName)) throw new js__$Boot_HaxeError("Flump resource: " + resourceName + " does not exist.");
	return pixi_display_FlumpResource.resources.get(resourceName);
};
pixi_display_FlumpResource.getResourceForMovie = function(symbolId) {
	var $it0 = pixi_display_FlumpResource.resources.iterator();
	while( $it0.hasNext() ) {
		var resource = $it0.next();
		if(resource.library.movies.exists(symbolId)) return resource;
	}
	throw new js__$Boot_HaxeError("Movie: " + symbolId + "does not exists in any loaded flump resources.");
};
pixi_display_FlumpResource.getResourceForSprite = function(symbolId) {
	var $it0 = pixi_display_FlumpResource.resources.iterator();
	while( $it0.hasNext() ) {
		var resource = $it0.next();
		if(resource.library.sprites.exists(symbolId)) return resource;
	}
	throw new js__$Boot_HaxeError("Sprite: " + symbolId + "does not exists in any loaded flump resources.");
};
pixi_display_FlumpResource.prototype = {
	createMovie: function(id) {
		var movie = new pixi_display_FlumpMovie(id,this.resourceId);
		movie.disableAsMaster();
		return movie;
	}
	,createSprite: function(id) {
		return new pixi_display_FlumpSprite(id,this.resourceId);
	}
	,createDisplayObject: function(id) {
		if(this.library.movies.exists(id)) return this.createMovie(id); else return this.createSprite(id);
	}
	,__class__: pixi_display_FlumpResource
};
var pixi_display_FlumpSprite = function(symbolId,resourceId) {
	this.symbolId = symbolId;
	this.resourceId = resourceId;
	var resource;
	if(resourceId != null) {
		resource = pixi_display_FlumpResource.get(resourceId);
		if(resource == null) throw new js__$Boot_HaxeError("Library: " + resourceId + "does has not been loaded.");
	} else resource = pixi_display_FlumpResource.getResourceForSprite(symbolId);
	var symbol = resource.library.sprites.get(symbolId);
	var texture = resource.textures.get(symbol.texture);
	PIXI.Sprite.call(this,texture);
	this.pivot.x = symbol.origin.x;
	this.pivot.y = symbol.origin.y;
};
$hxClasses["pixi.display.FlumpSprite"] = pixi_display_FlumpSprite;
pixi_display_FlumpSprite.__name__ = ["pixi","display","FlumpSprite"];
pixi_display_FlumpSprite.__super__ = PIXI.Sprite;
pixi_display_FlumpSprite.prototype = $extend(PIXI.Sprite.prototype,{
	__class__: pixi_display_FlumpSprite
});
var pixi_display_PixiLayer = function() {
	this.skew = new PIXI.Point();
	PIXI.Container.call(this);
};
$hxClasses["pixi.display.PixiLayer"] = pixi_display_PixiLayer;
pixi_display_PixiLayer.__name__ = ["pixi","display","PixiLayer"];
pixi_display_PixiLayer.__super__ = PIXI.Container;
pixi_display_PixiLayer.prototype = $extend(PIXI.Container.prototype,{
	updateTransform: function() {
		
            if (!this.visible)
            {
                return;
            }
		
             // create some matrix refs for easy access
            var pt = this.parent.worldTransform;
            var wt = this.worldTransform;

            // temporary matrix variables
            var a, b, c, d, tx, ty,
                rotY = this.rotation + this.skew.y,
                rotX = this.rotation + this.skew.x;
        ;
		
            // so if rotation is between 0 then we can simplify the multiplication process..
            if (rotY % (Math.PI*2) || rotX % (Math.PI*2))
            {
                // check to see if the rotation is the same as the previous render. This means we only need to use sin and cos when rotation actually changes
                if (rotX !== this._cachedRotX || rotY !== this._cachedRotY)
                {
                    // cache new values
                    this._cachedRotX = rotX;
                    this._cachedRotY = rotY;

                    // recalculate expensive ops
                    this._crA = Math.cos(rotY);
                    this._srB = Math.sin(rotY);

                    this._srC = Math.sin(-rotX);
                    this._crD = Math.cos(rotX);
                }

                // get the matrix values of the displayobject based on its transform properties..
                a  = this._crA * this.scale.x;
                b  = this._srB * this.scale.x;
                c  = this._srC * this.scale.y;
                d  = this._crD * this.scale.y;
                tx = this.position.x;
                ty = this.position.y;

                // check for pivot.. not often used so geared towards that fact!
                //if (this.pivot.x || this.pivot.y)
                //{
                    tx -= this.pivot.x * a + this.pivot.y * c;
                    ty -= this.pivot.x * b + this.pivot.y * d;
                //}

                // concat the parent matrix with the objects transform.
                wt.a  = a  * pt.a + b  * pt.c;
                wt.b  = a  * pt.b + b  * pt.d;
                wt.c  = c  * pt.a + d  * pt.c;
                wt.d  = c  * pt.b + d  * pt.d;
                wt.tx = tx * pt.a + ty * pt.c + pt.tx;
                wt.ty = tx * pt.b + ty * pt.d + pt.ty;
            }
            else
            {
                // lets do the fast version as we know there is no rotation..
                a  = this.scale.x;
                d  = this.scale.y;

                tx = this.position.x - this.pivot.x * a;
                ty = this.position.y - this.pivot.y * d;

                wt.a  = a  * pt.a;
                wt.b  = a  * pt.b;
                wt.c  = d  * pt.c;
                wt.d  = d  * pt.d;
                wt.tx = tx * pt.a + ty * pt.c + pt.tx;
                wt.ty = tx * pt.b + ty * pt.d + pt.ty;
            }
        ;
		

            // multiply the alphas..
            this.worldAlpha = this.alpha * this.parent.worldAlpha;

            // reset the bounds each time this is called!
            this._currentBounds = null;
        ;
		
            for (var i = 0, j = this.children.length; i < j; ++i)
            {
                this.children[i].updateTransform();
            }   
        ;
	}
	,__class__: pixi_display_PixiLayer
});
var pixi_loaders_FlumpParser = function() { };
$hxClasses["pixi.loaders.FlumpParser"] = pixi_loaders_FlumpParser;
pixi_loaders_FlumpParser.__name__ = ["pixi","loaders","FlumpParser"];
pixi_loaders_FlumpParser.flumpParser = function(resource,next) {
	if(resource.data == null || resource.isJson == false) return;
	if(!Object.prototype.hasOwnProperty.call(resource.data,"md5") || !Object.prototype.hasOwnProperty.call(resource.data,"movies") || !Object.prototype.hasOwnProperty.call(resource.data,"textureGroups") || !Object.prototype.hasOwnProperty.call(resource.data,"frameRate")) return;
	var lib = flump_library_FlumpLibrary.create(resource.data);
	var textures = new haxe_ds_StringMap();
	var atlasLoader = new PIXI.loaders.Loader();
	atlasLoader.baseUrl = new EReg("/(.[^/]*)$","i").replace(resource.url,"");
	var _g = 0;
	var _g1 = lib.atlases;
	while(_g < _g1.length) {
		var atlasSpec = [_g1[_g]];
		++_g;
		atlasLoader.add(atlasSpec[0].file,null,(function(atlasSpec) {
			return function(atlasResource) {
				var atlasTexture = new PIXI.BaseTexture(atlasResource.data);
				var _g2 = 0;
				var _g3 = atlasSpec[0].textures;
				while(_g2 < _g3.length) {
					var textureSpec = _g3[_g2];
					++_g2;
					var frame = new PIXI.Rectangle(textureSpec.rect[0],textureSpec.rect[1],textureSpec.rect[2],textureSpec.rect[3]);
					var origin = new PIXI.Point(textureSpec.origin[0],textureSpec.origin[1]);
					origin.x = origin.x / frame.width;
					origin.y = origin.y / frame.height;
					var v = new PIXI.Texture(atlasTexture,frame);
					textures.set(textureSpec.symbol,v);
					v;
				}
			};
		})(atlasSpec));
	}
	atlasLoader.once("complete",function(loader) {
		var flumpResource = new pixi_display_FlumpResource(lib,textures,resource.name);
		if(resource.name != null) {
			pixi_display_FlumpResource.resources.set(resource.name,flumpResource);
			flumpResource;
		}
		resource.data = flumpResource;
		next();
	});
	atlasLoader.load();
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
com_isartdigital_builder_Main.CONFIG_PATH = "config.json";
com_isartdigital_builder_api_Api.domainProd = "https://fbgame.isartdigital.com/2017_builder/builder2/";
com_isartdigital_builder_api_Api.domainDev = "https://localhostbuilder.com/";
com_isartdigital_builder_api_Api.pathApi = "api/v1/";
com_isartdigital_builder_game_GameManager.EVENT_MOUSE_UP = "EVENT_MOUSE_UP";
com_isartdigital_builder_game_manager_BackgroundManager.numberBackground = 15;
com_isartdigital_builder_game_manager_BackgroundManager.widthBackground = 1024;
com_isartdigital_builder_game_manager_BackgroundManager.heightBackground = 683;
com_isartdigital_builder_game_manager_ClippingManager.SAFE_MARGE_VIEW = 100;
com_isartdigital_builder_game_manager_ClippingManager.SAFE_MARGE_MODEL = 0;
com_isartdigital_builder_game_manager_ClippingManager.RIGHT_DIRECTION = "RIGHT";
com_isartdigital_builder_game_manager_ClippingManager.LEFT_DIRECTION = "LEFT";
com_isartdigital_builder_game_manager_ClippingManager.DOWN_DIRECTION = "DOWN";
com_isartdigital_builder_game_manager_ClippingManager.UP_DIRECTION = "UP";
com_isartdigital_builder_game_manager_ParadeManager.paradeArray = [];
com_isartdigital_builder_game_manager_RessourceManager.GOLD = "gold";
com_isartdigital_builder_game_manager_RessourceManager.OFFERING = "offering";
com_isartdigital_builder_game_manager_RessourceManager.SPICE = "spice";
com_isartdigital_builder_game_map_GMap.globalMap = new haxe_ds_IntMap();
com_isartdigital_builder_game_pooling_PoolObject.poolList = new haxe_ds_StringMap();
com_isartdigital_builder_game_pooling_PoolObject.objectMarge = 10;
com_isartdigital_builder_game_pooling_PoolObject.objectListLimit = 1000;
com_isartdigital_utils_game_StateGraphic.animAlpha = 1;
com_isartdigital_utils_game_StateGraphic.boxAlpha = 0;
com_isartdigital_builder_game_sprites_Citizen.list = [];
com_isartdigital_builder_game_sprites_Tile.list = [];
com_isartdigital_builder_game_sprites_buildings_Building.list = [];
com_isartdigital_builder_game_sprites_buildings_BuildingHarvester.MINIMUM_FILL_PERCENT_FOR_HARVESTING = 0.0005;
com_isartdigital_builder_game_sprites_buildings_BuildingHarvester.HARVEST_OFFERING_ICON = "HarvestOffering";
com_isartdigital_builder_game_sprites_buildings_BuildingHarvester.HARVEST_GOLD_ICON = "HarvestPesos";
com_isartdigital_builder_game_sprites_buildings_BuildingHarvester.SECONDS_IN_HOUR = 3600;
com_isartdigital_builder_game_sprites_buildings_BuildingHarvester.MILLISECONDS_IN_SECOND = 1000;
com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents.ERASABLE = "ERASABLE";
com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents.MOVABLE = "MOVABLE";
com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents.UPGRADABLE = "UPGRADABLE";
com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents.COLLECTABLE = "COLLECTABLE";
com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents.PAINTABLE = "PAINTABLE";
com_isartdigital_builder_game_sprites_buildings_const_BuildingEvents.SELECTED = "SELECTED";
com_isartdigital_builder_game_sprites_buildings_const_BuildingEvents.UNSELECTED = "UNSELECTED";
com_isartdigital_builder_game_sprites_buildings_const_BuildingEvents.MOVE_CONFIRM = "MOVE_CONFIRM";
com_isartdigital_builder_game_sprites_buildings_const_BuildingEvents.MOVE_DISABLE = "MOVE_DISABLE";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.BAR = "bar";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.BROTHEL = "brothel";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.PYROTECHNICIAN = "pyrotechnician";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.HOUSE = "house";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.MAIN_SQUARE = "main_square";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.PARK = "park";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.ALTAR = "altar";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.STATUE = "statue";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.BIG_FLOWER_POT = "big_flower_pot";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.FLOATING_FLOWER = "floating_flower";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.HARBOR = "harbor";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.CITY_HALL = "city_hall";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.LANTERNS = "lanterns";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.CHURCH = "church";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.CANTINA = "cantina";
com_isartdigital_builder_game_sprites_buildings_const_BuildingNames.GIFTSHOP = "giftShop";
com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions.configNotFound = "Building name not found in building configuration (buildingsSetting.json)";
com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions.noHarvestFunctionality = "You try to use harvest functionality on building that havent this functionality";
com_isartdigital_builder_game_type_JsonNames.LANTERN_PLACEMENT = "json/lanternsPlacement.json";
com_isartdigital_builder_game_type_JsonNames.BUILDINGS_SETTINGS = "json/buildingsSettings.json";
com_isartdigital_builder_game_type_JsonNames.BUILDINGS_DEFINITION = "json/building.json";
com_isartdigital_builder_game_type_JsonNames.SHOP_SHEET = "json/ShopSheet.json";
com_isartdigital_builder_game_type_JsonNames.PARADE_SETTINGS = "json/paradeSettings.json";
com_isartdigital_builder_game_type_ModelElementNames.TILE = "tile";
com_isartdigital_builder_game_type_ModelElementNames.BUILDING = "building";
com_isartdigital_builder_game_type_ModelElementNames.BACKGROUND = "background";
com_isartdigital_builder_game_utils_TypeDefUtils.tileModelDef = { type : null, x : null, y : null, isBuildable : null, isIlluminated : null, alpha : null};
com_isartdigital_builder_game_utils_TypeDefUtils.buildingModelDef = { type : null, name : null, x : null, y : null, color : null, buildingLevel : null};
com_isartdigital_builder_ui_UIManager.CLOSE_POPIN_REQUEST = "CLOSE_POPIN_REQUEST";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_LANTERNCONFIRM = "OPEN_POPIN_REQUEST_LANTERNCONFIRM";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_MAINBUILDINGINFO = "OPEN_POPIN_REQUEST_MAINBUILDINGINFO";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_PARADECONFIRM = "OPEN_POPIN_REQUEST_PARADECONFIRM";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_PARADEREWARD = "OPEN_POPIN_REQUEST_PARADEREWARD";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_SHOP = "OPEN_POPIN_REQUEST_SHOP";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_UPGRADEREWARD = "OPEN_POPIN_REQUEST_UPGRADEREWARD";
com_isartdigital_builder_ui_hud_BaseBuildingHUD.BUTTON_DELETE_NAME = "DeleteButton";
com_isartdigital_builder_ui_hud_BaseBuildingHUD.BUTTON_COLOR_NAME = "ColorButton";
com_isartdigital_builder_ui_hud_BaseBuildingHUD.BUTTON_UPGRADABLE_NAME = "UpgradableComfirm";
com_isartdigital_builder_ui_hud_BaseBuildingHUD.BUTTON_MOVE_NAME = "MoveButton";
com_isartdigital_builder_ui_hud_BaseBuildingHUD.DESCRIPTION_ITEM = "BuildingInfo";
com_isartdigital_builder_ui_hud_BaseBuildingHUDEvent.UPGRADE_BUTTON = "UPGRADE_BUTTON";
com_isartdigital_builder_ui_hud_BaseBuildingHUDEvent.PAINT_BUTTON = "PAINT_BUTTON";
com_isartdigital_builder_ui_hud_BaseBuildingHUDEvent.MOVE_BUTTON = "MOVE_BUTTON";
com_isartdigital_builder_ui_hud_BaseBuildingHUDEvent.DELETE_BUTTON = "DELETE_BUTTON";
com_isartdigital_builder_ui_items_ItemBuilding.list = [];
com_isartdigital_builder_ui_popin_LanternConfirm.BUYHARD = "BUYHARDLANTERN";
com_isartdigital_builder_ui_popin_LanternConfirm.BUYSOFT = "BUYSOFTLANTERN";
com_isartdigital_builder_ui_popin_Shop.BUILDING_SHOP = "BUILDING_SHOP";
com_isartdigital_builder_ui_popin_Shop.RESSOURCE_SHOP = "RESSOURCE_SHOP";
com_isartdigital_builder_ui_popin_Shop.SHOP_BUY_BUILDING = "SHOP_BUY_BUILDING";
com_isartdigital_utils_ui_Button.UP = 0;
com_isartdigital_utils_ui_Button.OVER = 1;
com_isartdigital_utils_ui_Button.DOWN = 2;
com_isartdigital_builder_ui_uimodule_DotButton.list = [];
com_isartdigital_services_Ads.TYPE_END = "end";
com_isartdigital_services_Ads.TYPE_CANCEL = "cancel";
com_isartdigital_services_Ads.TYPE_CLOSE = "close";
com_isartdigital_services_Ads.TYPE_CLICK = "click";
com_isartdigital_services_Ads.IMAGE = "image";
com_isartdigital_services_Ads.MOVIE = "movie";
com_isartdigital_services__$Ads_Ad.CROSS_SIZE = 20;
com_isartdigital_services__$Ads_Ad.QUIT_SIZE = 40;
com_isartdigital_services_HttpService.SERVICE_PATH = "https://fbgame.isartdigital.com/2017_builder/builder0/broadcast/";
com_isartdigital_utils_Config.tileWidth = 152;
com_isartdigital_utils_Config.tileHeight = 76;
com_isartdigital_utils_Config.mapSize = 100;
com_isartdigital_utils_Config._data = { };
com_isartdigital_utils_Debug.QR_SIZE = 0.35;
com_isartdigital_utils_Localization.LANG_EN = "en";
com_isartdigital_utils_Localization.LANG_FR = "fr";
com_isartdigital_utils_events_EventType.GAME_LOOP = "gameLoop";
com_isartdigital_utils_events_EventType.RESIZE = "resize";
com_isartdigital_utils_events_EventType.ADDED = "added";
com_isartdigital_utils_events_EventType.REMOVED = "removed";
com_isartdigital_utils_events_FacebookEventType.CONNECTED = "connected";
com_isartdigital_utils_events_FacebookEventType.NOT_AUTHORIZED = "not_authorized";
com_isartdigital_utils_events_FacebookEventType.UNKNOWN = "unknown";
com_isartdigital_utils_events_LoadEventType.COMPLETE = "complete";
com_isartdigital_utils_events_LoadEventType.LOADED = "load";
com_isartdigital_utils_events_LoadEventType.PROGRESS = "progress";
com_isartdigital_utils_events_MouseEventType.MOUSE_MOVE = "mousemove";
com_isartdigital_utils_events_MouseEventType.MOUSE_DOWN = "mousedown";
com_isartdigital_utils_events_MouseEventType.MOUSE_OUT = "mouseout";
com_isartdigital_utils_events_MouseEventType.MOUSE_OVER = "mouseover";
com_isartdigital_utils_events_MouseEventType.MOUSE_UP = "mouseup";
com_isartdigital_utils_events_MouseEventType.MOUSE_UP_OUTSIDE = "mouseupoutside";
com_isartdigital_utils_events_MouseEventType.CLICK = "click";
com_isartdigital_utils_events_MouseEventType.RIGHT_DOWN = "rightdown";
com_isartdigital_utils_events_MouseEventType.RIGHT_UP = "rightup";
com_isartdigital_utils_events_MouseEventType.RIGHT_UP_OUTSIDE = "rightupoutside";
com_isartdigital_utils_events_MouseEventType.RIGHT_CLICK = "rightclick";
com_isartdigital_utils_events_TouchEventType.TOUCH_START = "touchstart";
com_isartdigital_utils_events_TouchEventType.TOUCH_MOVE = "touchmove";
com_isartdigital_utils_events_TouchEventType.TOUCH_END = "touchend";
com_isartdigital_utils_events_TouchEventType.TOUCH_END_OUTSIDE = "touchendoutside";
com_isartdigital_utils_events_TouchEventType.TAP = "tap";
com_isartdigital_utils_facebook_Facebook.permissions = { scope : "user_friends,email"};
com_isartdigital_utils_game_Camera.MINIMUM_OFFSET_MOVE_TO_CONSIDER_SCROLLING = 50;
com_isartdigital_utils_game_GameStage.SAFE_ZONE_WIDTH = 2048;
com_isartdigital_utils_game_GameStage.SAFE_ZONE_HEIGHT = 1366;
com_isartdigital_utils_game_factory_MovieClipAnimFactory.textureDigits = 4;
com_isartdigital_utils_loader_GameLoader.txtLoaded = new haxe_ds_StringMap();
com_isartdigital_utils_system_DeviceCapabilities.SYSTEM_ANDROID = "Android";
com_isartdigital_utils_system_DeviceCapabilities.SYSTEM_IOS = "iOS";
com_isartdigital_utils_system_DeviceCapabilities.SYSTEM_BLACKBERRY = "BlackBerry";
com_isartdigital_utils_system_DeviceCapabilities.SYSTEM_BB_PLAYBOOK = "BlackBerry PlayBook";
com_isartdigital_utils_system_DeviceCapabilities.SYSTEM_WINDOWS_MOBILE = "IEMobile";
com_isartdigital_utils_system_DeviceCapabilities.SYSTEM_DESKTOP = "Desktop";
com_isartdigital_utils_system_DeviceCapabilities.ICON_SIZE = 0.075;
com_isartdigital_utils_system_DeviceCapabilities.TEXTURE_NO_SCALE = "";
com_isartdigital_utils_system_DeviceCapabilities.TEXTURE_HD = "hd";
com_isartdigital_utils_system_DeviceCapabilities.TEXTURE_MD = "md";
com_isartdigital_utils_system_DeviceCapabilities.TEXTURE_LD = "ld";
com_isartdigital_utils_system_DeviceCapabilities.texturesRatios = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	if(__map_reserved.hd != null) _g.setReserved("hd",1); else _g.h["hd"] = 1;
	if(__map_reserved.md != null) _g.setReserved("md",0.5); else _g.h["md"] = 0.5;
	if(__map_reserved.ld != null) _g.setReserved("ld",0.25); else _g.h["ld"] = 0.25;
	$r = _g;
	return $r;
}(this));
com_isartdigital_utils_system_DeviceCapabilities.textureRatio = 1;
com_isartdigital_utils_system_DeviceCapabilities.textureType = "";
com_isartdigital_utils_system_DeviceCapabilities.screenRatio = 1;
com_isartdigital_utils_ui_UIBuilder.TXT_SUFFIX = "_txt";
com_isartdigital_utils_ui_UIBuilder.BTN_SUFFIX = "Button";
com_isartdigital_utils_ui_UIBuilder.CURRENCY_SUFFIX = "_currency";
com_isartdigital_utils_ui_UIBuilder.BUILDING_HUD_SUFFIX = "_bHud";
com_isartdigital_utils_ui_UIBuilder.ITEM_SHOP_SUFFIX = "_item";
com_isartdigital_utils_ui_UIBuilder.textStyle = new haxe_ds_StringMap();
com_isartdigital_utils_ui_UIBuilder.uiPos = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	if(__map_reserved.L != null) _g.setReserved("L","left"); else _g.h["L"] = "left";
	if(__map_reserved.R != null) _g.setReserved("R","right"); else _g.h["R"] = "right";
	if(__map_reserved.T != null) _g.setReserved("T","top"); else _g.h["T"] = "top";
	if(__map_reserved.B != null) _g.setReserved("B","bottom"); else _g.h["B"] = "bottom";
	if(__map_reserved.TL != null) _g.setReserved("TL","topLeft"); else _g.h["TL"] = "topLeft";
	if(__map_reserved.TR != null) _g.setReserved("TR","topRight"); else _g.h["TR"] = "topRight";
	if(__map_reserved.BL != null) _g.setReserved("BL","bottomLeft"); else _g.h["BL"] = "bottomLeft";
	if(__map_reserved.BR != null) _g.setReserved("BR","bottomRight"); else _g.h["BR"] = "bottomRight";
	if(__map_reserved.FW != null) _g.setReserved("FW","fitWidth"); else _g.h["FW"] = "fitWidth";
	if(__map_reserved.FH != null) _g.setReserved("FH","fitHeight"); else _g.h["FH"] = "fitHeight";
	if(__map_reserved.FS != null) _g.setReserved("FS","fitScreen"); else _g.h["FS"] = "fitScreen";
	$r = _g;
	return $r;
}(this));
com_isartdigital_utils_ui_UIPosition.LEFT = "left";
com_isartdigital_utils_ui_UIPosition.RIGHT = "right";
com_isartdigital_utils_ui_UIPosition.TOP = "top";
com_isartdigital_utils_ui_UIPosition.BOTTOM = "bottom";
com_isartdigital_utils_ui_UIPosition.TOP_LEFT = "topLeft";
com_isartdigital_utils_ui_UIPosition.TOP_RIGHT = "topRight";
com_isartdigital_utils_ui_UIPosition.BOTTOM_LEFT = "bottomLeft";
com_isartdigital_utils_ui_UIPosition.BOTTOM_RIGHT = "bottomRight";
com_isartdigital_utils_ui_UIPosition.FIT_WIDTH = "fitWidth";
com_isartdigital_utils_ui_UIPosition.FIT_HEIGHT = "fitHeight";
com_isartdigital_utils_ui_UIPosition.FIT_SCREEN = "fitScreen";
flump_library_Label.LABEL_ENTER = "labelEnter";
flump_library_Label.LABEL_EXIT = "labelExit";
flump_library_Label.LABEL_UPDATE = "labelUpdate";
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = {}.toString;
motion_actuators_SimpleActuator.actuators = [];
motion_actuators_SimpleActuator.actuatorsLength = 0;
motion_actuators_SimpleActuator.addedEvent = false;
motion_Actuate.defaultActuator = motion_actuators_SimpleActuator;
motion_Actuate.defaultEase = motion_easing_Expo.get_easeOut();
motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
pathfinder_Pathfinder._COST_ADJACENT = 10;
pathfinder_Pathfinder._COST_DIAGIONAL = 14;
pixi_display_FlumpResource.resources = new haxe_ds_StringMap();
com_isartdigital_builder_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

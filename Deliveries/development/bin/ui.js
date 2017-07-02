(function (console, $hx_exports) { "use strict";
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
var Perf = $hx_exports.Perf = function(pos,offset) {
	if(offset == null) offset = 0;
	if(pos == null) pos = "TR";
	this._perfObj = window.performance;
	if(Reflect.field(this._perfObj,"memory") != null) this._memoryObj = Reflect.field(this._perfObj,"memory");
	this._memCheck = this._perfObj != null && this._memoryObj != null && this._memoryObj.totalJSHeapSize > 0;
	this._pos = pos;
	this._offset = offset;
	this.currentFps = 60;
	this.currentMs = 0;
	this.currentMem = "0";
	this.lowFps = 60;
	this.avgFps = 60;
	this._measureCount = 0;
	this._totalFps = 0;
	this._time = 0;
	this._ticks = 0;
	this._fpsMin = 60;
	this._fpsMax = 60;
	if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) this._startTime = this._perfObj.now(); else this._startTime = new Date().getTime();
	this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	this._createFpsDom();
	this._createMsDom();
	if(this._memCheck) this._createMemoryDom();
	if(($_=window,$bind($_,$_.requestAnimationFrame)) != null) this.RAF = ($_=window,$bind($_,$_.requestAnimationFrame)); else if(window.mozRequestAnimationFrame != null) this.RAF = window.mozRequestAnimationFrame; else if(window.webkitRequestAnimationFrame != null) this.RAF = window.webkitRequestAnimationFrame; else if(window.msRequestAnimationFrame != null) this.RAF = window.msRequestAnimationFrame;
	if(($_=window,$bind($_,$_.cancelAnimationFrame)) != null) this.CAF = ($_=window,$bind($_,$_.cancelAnimationFrame)); else if(window.mozCancelAnimationFrame != null) this.CAF = window.mozCancelAnimationFrame; else if(window.webkitCancelAnimationFrame != null) this.CAF = window.webkitCancelAnimationFrame; else if(window.msCancelAnimationFrame != null) this.CAF = window.msCancelAnimationFrame;
	if(this.RAF != null) this._raf = Reflect.callMethod(window,this.RAF,[$bind(this,this._tick)]);
};
$hxClasses["Perf"] = Perf;
Perf.__name__ = ["Perf"];
Perf.prototype = {
	_init: function() {
		this.currentFps = 60;
		this.currentMs = 0;
		this.currentMem = "0";
		this.lowFps = 60;
		this.avgFps = 60;
		this._measureCount = 0;
		this._totalFps = 0;
		this._time = 0;
		this._ticks = 0;
		this._fpsMin = 60;
		this._fpsMax = 60;
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) this._startTime = this._perfObj.now(); else this._startTime = new Date().getTime();
		this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	}
	,_now: function() {
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) return this._perfObj.now(); else return new Date().getTime();
	}
	,_tick: function(val) {
		var time;
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) time = this._perfObj.now(); else time = new Date().getTime();
		this._ticks++;
		if(this._raf != null && time > this._prevTime + Perf.MEASUREMENT_INTERVAL) {
			this.currentMs = Math.round(time - this._startTime);
			this.ms.innerHTML = "MS: " + this.currentMs;
			this.currentFps = Math.round(this._ticks * 1000 / (time - this._prevTime));
			if(this.currentFps > 0 && val > Perf.DELAY_TIME) {
				this._measureCount++;
				this._totalFps += this.currentFps;
				this.lowFps = this._fpsMin = Math.min(this._fpsMin,this.currentFps);
				this._fpsMax = Math.max(this._fpsMax,this.currentFps);
				this.avgFps = Math.round(this._totalFps / this._measureCount);
			}
			this.fps.innerHTML = "FPS: " + this.currentFps + " (" + this._fpsMin + "-" + this._fpsMax + ")";
			if(this.currentFps >= 30) this.fps.style.backgroundColor = Perf.FPS_BG_CLR; else if(this.currentFps >= 15) this.fps.style.backgroundColor = Perf.FPS_WARN_BG_CLR; else this.fps.style.backgroundColor = Perf.FPS_PROB_BG_CLR;
			this._prevTime = time;
			this._ticks = 0;
			if(this._memCheck) {
				this.currentMem = this._getFormattedSize(this._memoryObj.usedJSHeapSize,2);
				this.memory.innerHTML = "MEM: " + this.currentMem;
			}
		}
		this._startTime = time;
		if(this._raf != null) this._raf = Reflect.callMethod(window,this.RAF,[$bind(this,this._tick)]);
	}
	,_createDiv: function(id,top) {
		if(top == null) top = 0;
		var div;
		var _this = window.document;
		div = _this.createElement("div");
		div.id = id;
		div.className = id;
		div.style.position = "absolute";
		var _g = this._pos;
		switch(_g) {
		case "TL":
			div.style.left = this._offset + "px";
			div.style.top = top + "px";
			break;
		case "TR":
			div.style.right = this._offset + "px";
			div.style.top = top + "px";
			break;
		case "BL":
			div.style.left = this._offset + "px";
			div.style.bottom = (this._memCheck?48:32) - top + "px";
			break;
		case "BR":
			div.style.right = this._offset + "px";
			div.style.bottom = (this._memCheck?48:32) - top + "px";
			break;
		}
		div.style.width = "80px";
		div.style.height = "12px";
		div.style.lineHeight = "12px";
		div.style.padding = "2px";
		div.style.fontFamily = Perf.FONT_FAMILY;
		div.style.fontSize = "9px";
		div.style.fontWeight = "bold";
		div.style.textAlign = "center";
		window.document.body.appendChild(div);
		return div;
	}
	,_createFpsDom: function() {
		this.fps = this._createDiv("fps");
		this.fps.style.backgroundColor = Perf.FPS_BG_CLR;
		this.fps.style.zIndex = "995";
		this.fps.style.color = Perf.FPS_TXT_CLR;
		this.fps.innerHTML = "FPS: 0";
	}
	,_createMsDom: function() {
		this.ms = this._createDiv("ms",16);
		this.ms.style.backgroundColor = Perf.MS_BG_CLR;
		this.ms.style.zIndex = "996";
		this.ms.style.color = Perf.MS_TXT_CLR;
		this.ms.innerHTML = "MS: 0";
	}
	,_createMemoryDom: function() {
		this.memory = this._createDiv("memory",32);
		this.memory.style.backgroundColor = Perf.MEM_BG_CLR;
		this.memory.style.color = Perf.MEM_TXT_CLR;
		this.memory.style.zIndex = "997";
		this.memory.innerHTML = "MEM: 0";
	}
	,_getFormattedSize: function(bytes,frac) {
		if(frac == null) frac = 0;
		var sizes = ["Bytes","KB","MB","GB","TB"];
		if(bytes == 0) return "0";
		var precision = Math.pow(10,frac);
		var i = Math.floor(Math.log(bytes) / Math.log(1024));
		return Math.round(bytes * precision / Math.pow(1024,i)) / precision + " " + sizes[i];
	}
	,addInfo: function(val) {
		this.info = this._createDiv("info",this._memCheck?48:32);
		this.info.style.backgroundColor = Perf.INFO_BG_CLR;
		this.info.style.color = Perf.INFO_TXT_CLR;
		this.info.style.zIndex = "998";
		this.info.innerHTML = val;
	}
	,clearInfo: function() {
		if(this.info != null) {
			window.document.body.removeChild(this.info);
			this.info = null;
		}
	}
	,destroy: function() {
		Reflect.callMethod(window,this.CAF,[this._raf]);
		this._raf = null;
		this._perfObj = null;
		this._memoryObj = null;
		if(this.fps != null) {
			window.document.body.removeChild(this.fps);
			this.fps = null;
		}
		if(this.ms != null) {
			window.document.body.removeChild(this.ms);
			this.ms = null;
		}
		if(this.memory != null) {
			window.document.body.removeChild(this.memory);
			this.memory = null;
		}
		this.clearInfo();
		this.currentFps = 60;
		this.currentMs = 0;
		this.currentMem = "0";
		this.lowFps = 60;
		this.avgFps = 60;
		this._measureCount = 0;
		this._totalFps = 0;
		this._time = 0;
		this._ticks = 0;
		this._fpsMin = 60;
		this._fpsMax = 60;
		if(this._perfObj != null && ($_=this._perfObj,$bind($_,$_.now)) != null) this._startTime = this._perfObj.now(); else this._startTime = new Date().getTime();
		this._prevTime = -Perf.MEASUREMENT_INTERVAL;
	}
	,_cancelRAF: function() {
		Reflect.callMethod(window,this.CAF,[this._raf]);
		this._raf = null;
	}
	,__class__: Perf
};
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
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
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
	this.facebookConnected = false;
	this.assetsLoaded = false;
	this.userInfoLoaded = false;
	this.increase = true;
	EventEmitter.call(this);
	var lOptions = { };
	lOptions.backgroundColor = 2434368;
	com_isartdigital_utils_system_DeviceCapabilities.scaleViewport();
	this.renderer = PIXI.autoDetectRenderer(_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_system_DeviceCapabilities.get_width()),_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_system_DeviceCapabilities.get_height()),lOptions);
	this.renderer.roundPixels = true;
	window.document.body.appendChild(this.renderer.view);
	this.stage = new PIXI.Container();
	com_isartdigital_utils_facebook_Facebook.onLogin = $bind(this,this.onFacebookLogin);
	com_isartdigital_utils_facebook_Facebook.load("750435741727559");
	if(com_isartdigital_utils_system_DeviceCapabilities.get_isCocoonJS()) {
		js_Browser.getLocalStorage().setItem("token","1071918536161216");
		this.facebookConnected = true;
		com_isartdigital_builder_api_Api.getInstance();
		this.loadUserInfos();
	}
	var lConfig = new PIXI.loaders.Loader();
	com_isartdigital_builder_Main.configPath += "?" + new Date().getTime();
	lConfig.add(com_isartdigital_builder_Main.configPath);
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
	com_isartdigital_builder_ui_buttons_AdButton;
	com_isartdigital_builder_ui_hud_BaseBuildingHUD;
	com_isartdigital_builder_ui_items_BuildingInfo;
	com_isartdigital_builder_ui_items_BuildingInShop;
	com_isartdigital_builder_ui_buttons_BuyHardButton;
	com_isartdigital_builder_ui_buttons_BuyOfferingButton;
	com_isartdigital_builder_ui_buttons_BuyPesosButton;
	com_isartdigital_builder_ui_buttons_CancelButton;
	com_isartdigital_builder_ui_buttons_CashButton;
	com_isartdigital_builder_ui_buttons_CloseButton;
	com_isartdigital_builder_ui_buttons_ColorButton;
	com_isartdigital_builder_ui_buttons_ContinueHardButton;
	com_isartdigital_builder_ui_buttons_CreditButton;
	com_isartdigital_builder_ui_buttons_DeleteButton;
	com_isartdigital_builder_ui_popin_DeleteConfirm;
	com_isartdigital_builder_ui_ftue_FtueUI;
	com_isartdigital_builder_ui_buttons_DisableButton;
	com_isartdigital_builder_ui_buttons_DotButton;
	com_isartdigital_builder_ui_buttons_GoldButton;
	com_isartdigital_builder_ui_hud_GoldCurrency;
	com_isartdigital_builder_ui_popin_HardBuildConfirm;
	com_isartdigital_builder_ui_hud_HudParade;
	com_isartdigital_builder_ui_items_ItemBuilding;
	com_isartdigital_builder_ui_items_ItemRessource;
	com_isartdigital_builder_ui_popin_LanternInfo;
	com_isartdigital_builder_ui_buttons_LeftButton;
	com_isartdigital_builder_ui_hud_LevelCurrency;
	com_isartdigital_builder_ui_items_MissionAsset;
	com_isartdigital_builder_ui_items_MissionItem;
	com_isartdigital_builder_ui_items_MissionPanelItem;
	com_isartdigital_builder_ui_buttons_MoveButton;
	com_isartdigital_builder_ui_buttons_NotificationButton;
	com_isartdigital_builder_ui_buttons_NextFtueButton;
	com_isartdigital_builder_ui_buttons_OfferingButton;
	com_isartdigital_builder_ui_hud_OfferingsCurrency;
	com_isartdigital_builder_ui_buttons_OkFtueButton;
	com_isartdigital_builder_ui_buttons_ParadeButton;
	com_isartdigital_builder_ui_popin_ParadeContinue;
	com_isartdigital_builder_ui_buttons_ParadeMoreButton;
	com_isartdigital_builder_ui_items_ResourcesView;
	com_isartdigital_builder_ui_items_RessourceInShop;
	com_isartdigital_builder_ui_items_RewardBuilding;
	com_isartdigital_builder_ui_buttons_RewardButton;
	com_isartdigital_builder_ui_buttons_RightButton;
	com_isartdigital_builder_ui_buttons_SFXButton;
	com_isartdigital_builder_ui_buttons_ShareButton;
	com_isartdigital_builder_ui_buttons_SettingButton;
	com_isartdigital_builder_ui_items_ShopBuilding;
	com_isartdigital_builder_ui_buttons_ShopBuildingButton;
	com_isartdigital_builder_ui_buttons_ShopButton;
	com_isartdigital_builder_ui_buttons_ShopBuyHardButton;
	com_isartdigital_builder_ui_buttons_ShopBuySoftButton;
	com_isartdigital_builder_ui_buttons_ShopRessourceButton;
	com_isartdigital_builder_ui_buttons_SoundButton;
	com_isartdigital_builder_ui_buttons_SpiceButton;
	com_isartdigital_builder_ui_hud_SpiceCurrency;
	com_isartdigital_builder_ui_items_TimerParade;
	com_isartdigital_builder_ui_items_Tutor;
	com_isartdigital_builder_ui_buttons_UpgradeButton;
	com_isartdigital_builder_ui_popin_UpgradeConfirm;
	com_isartdigital_builder_ui_buttons_UpgradeDisableButton;
	com_isartdigital_builder_ui_buttons_UpgradeValideButton;
	com_isartdigital_builder_ui_buttons_ValideButton;
};
com_isartdigital_builder_Main.__super__ = EventEmitter;
com_isartdigital_builder_Main.prototype = $extend(EventEmitter.prototype,{
	getMail: function() {
		return this.mail;
	}
	,preloadAssets: function(pLoader) {
		com_isartdigital_utils_Config.init(Reflect.field(pLoader.resources,com_isartdigital_builder_Main.configPath).data);
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
		lLoader.addAssetFile(com_isartdigital_utils_system_DeviceCapabilities.textureType + "/titlecardnew/library.json");
		lLoader.once("complete",$bind(this,this.loadAssets));
		lLoader.load();
	}
	,loadAssets: function(pLoader) {
		var lLoader = new com_isartdigital_utils_loader_GameLoader();
		lLoader.addTxtFile("shop.json");
		lLoader.addTxtFile("hud.json");
		lLoader.addTxtFile("popin.json");
		lLoader.addTxtFile("hudparade.json");
		lLoader.addTxtFile("ftue.json");
		lLoader.addTxtFile("pnj.json");
		lLoader.addTxtFile("pinata.json");
		lLoader.addSoundFile("sounds.json");
		lLoader.addTxtFile("json/building.json");
		lLoader.addTxtFile("json/lanternsPlacement.json");
		lLoader.addTxtFile("json/buildingsSettings.json");
		lLoader.addTxtFile("json/paradeSettings.json");
		lLoader.addTxtFile("json/ShopBuildingSheet.json");
		lLoader.addTxtFile("json/ShopRessourceSheet.json");
		lLoader.addTxtFile("json/levelReward.json");
		lLoader.addTxtFile("json/hdvLevelReward.json");
		lLoader.addTxtFile("json/XP.json");
		lLoader.addTxtFile("json/paradePatern.json");
		lLoader.addTxtFile("json/shopItem.json");
		lLoader.addTxtFile("json/ftue.json");
		lLoader.addTxtFile("json/giftsSettings.json");
		lLoader.addTxtFile("json/en.json");
		lLoader.addTxtFile("json/fr.json");
		lLoader.addAssetFile("graphics.json");
		lLoader.addAssetFile("background.json");
		lLoader.addTxtFile("text/texts_hud.json");
		lLoader.addTxtFile("text/texts_hudparade.json");
		lLoader.addTxtFile("text/texts_popin.json");
		lLoader.addTxtFile("text/texts_shop.json");
		lLoader.addTxtFile("text/texts_ingame.json");
		lLoader.addTxtFile("text/texts_ftue.json");
		lLoader.addTxtFile("text/texts_pnj.json");
		lLoader.addTxtFile("text/texts_pinata.json");
		lLoader.addAssetFile(com_isartdigital_utils_system_DeviceCapabilities.textureType + "/buildings/library.json");
		lLoader.addAssetFile(com_isartdigital_utils_system_DeviceCapabilities.textureType + "/fx/library.json");
		lLoader.addAssetFile(com_isartdigital_utils_system_DeviceCapabilities.textureType + "/popin/library.json");
		lLoader.addAssetFile(com_isartdigital_utils_system_DeviceCapabilities.textureType + "/shop/library.json");
		lLoader.addAssetFile(com_isartdigital_utils_system_DeviceCapabilities.textureType + "/hud/library.json");
		lLoader.addAssetFile(com_isartdigital_utils_system_DeviceCapabilities.textureType + "/hudparade/library.json");
		lLoader.addAssetFile(com_isartdigital_utils_system_DeviceCapabilities.textureType + "/ftue/library.json");
		lLoader.addAssetFile(com_isartdigital_utils_system_DeviceCapabilities.textureType + "/pnj/library.json");
		lLoader.addAssetFile(com_isartdigital_utils_system_DeviceCapabilities.textureType + "/pinata/library.json");
		lLoader.addFontFile("fonts.css");
		lLoader.on("progress",$bind(this,this.onLoadProgress));
		lLoader.once("complete",$bind(this,this.onLoadComplete));
		com_isartdigital_builder_ui_UIManager.getInstance().openScreen(com_isartdigital_builder_ui_GraphicLoader.getInstance());
		this.gameLoop();
		this.renderLoop();
		lLoader.load();
	}
	,loadUserInfos: function() {
		com_isartdigital_builder_api_Api.user.getUserInfo($bind(this,this.cbOnUserInfosReceipt));
	}
	,cbOnUserInfosReceipt: function(pData) {
		var lData = JSON.parse(pData);
		var userInfos;
		if(lData.errorCode == 1) {
			com_isartdigital_builder_api_Api.user.createFBAccount(this.mail,this.firstname,this.lastname,this.token,$bind(this,this.loadUserInfos));
			return;
		}
		com_isartdigital_services_Users.setInfos(lData.data);
		this.userInfoLoaded = true;
		this.tryToStartGame();
	}
	,onLoadProgress: function(pLoader) {
	}
	,onLoadComplete: function(pLoader) {
		pLoader.off("progress",$bind(this,this.onLoadProgress));
		com_isartdigital_builder_ui_GraphicLoader.getInstance().destroyLoadscreenSprite();
		com_isartdigital_builder_game_utils_Metadatas.init();
		com_isartdigital_utils_game_factory_MovieClipAnimFactory.addTextures(com_isartdigital_utils_loader_GameLoader.getContent("graphics.json"));
		com_isartdigital_utils_game_factory_MovieClipAnimFactory.addTextures(com_isartdigital_utils_loader_GameLoader.getContent("assets.json"));
		com_isartdigital_utils_game_factory_MovieClipAnimFactory.addTextures(com_isartdigital_utils_loader_GameLoader.getContent("bakckground.json"));
		com_isartdigital_utils_game_StateGraphic.addBoxes(com_isartdigital_utils_loader_GameLoader.getContent(""));
		com_isartdigital_utils_ui_UIBuilder.addDescriptions("popin.json","com.isartdigital.builder.ui.buttons");
		com_isartdigital_utils_ui_UIBuilder.addDescriptions("shop.json","com.isartdigital.builder.ui.buttons");
		com_isartdigital_utils_ui_UIBuilder.addDescriptions("hud.json","com.isartdigital.builder.ui.buttons");
		com_isartdigital_utils_ui_UIBuilder.addDescriptions("hudparade.json","com.isartdigital.builder.ui.buttons");
		com_isartdigital_utils_ui_UIBuilder.addDescriptions("ftue.json","com.isartdigital.builder.ui.ftue");
		com_isartdigital_utils_ui_UIBuilder.addDescriptions("pnj.json","com.isartdigital.builder.ui.ftue");
		com_isartdigital_utils_ui_UIBuilder.addDescriptions("pinata.json","com.isartdigital.builder.ui.ftue");
		com_isartdigital_utils_ui_UIBuilder.setPackages("com.isartdigital.builder.ui.buttons","com.isartdigital.builder.ui.hud","com.isartdigital.builder.ui.items");
		com_isartdigital_utils_ui_UIBuilder.addTextStyle(Std.string(com_isartdigital_utils_loader_GameLoader.getContent("text/texts_popin.json")));
		com_isartdigital_utils_ui_UIBuilder.addTextStyle(Std.string(com_isartdigital_utils_loader_GameLoader.getContent("text/texts_hud.json")));
		com_isartdigital_utils_ui_UIBuilder.addTextStyle(Std.string(com_isartdigital_utils_loader_GameLoader.getContent("text/texts_hudparade.json")));
		com_isartdigital_utils_ui_UIBuilder.addTextStyle(Std.string(com_isartdigital_utils_loader_GameLoader.getContent("text/texts_shop.json")));
		com_isartdigital_utils_ui_UIBuilder.addTextStyle(Std.string(com_isartdigital_utils_loader_GameLoader.getContent("text/texts_popin.json")));
		com_isartdigital_utils_ui_UIBuilder.addTextStyle(Std.string(com_isartdigital_utils_loader_GameLoader.getContent("text/texts_ftue.json")));
		com_isartdigital_utils_ui_UIBuilder.addTextStyle(Std.string(com_isartdigital_utils_loader_GameLoader.getContent("text/texts_pnj.json")));
		com_isartdigital_utils_ui_UIBuilder.addTextStyle(Std.string(com_isartdigital_utils_loader_GameLoader.getContent("text/texts_pinata.json")));
		com_isartdigital_utils_Localization.setDataLocalization();
		this.assetsLoaded = true;
		this.tryToStartGame();
		window.destroyAccount = $bind(this,this.destroyAccount);
	}
	,destroyAccount: function() {
		js_Browser.getLocalStorage().removeItem("FTUE_STEP");
		com_isartdigital_builder_api_Api.user.destroy(function(result) {
			window.location.reload();
		});
	}
	,tryToStartGame: function() {
		if(this.assetsLoaded && this.userInfoLoaded && this.facebookConnected) {
			haxe_Log.trace("Start game",{ fileName : "Main.hx", lineNumber : 432, className : "com.isartdigital.builder.Main", methodName : "tryToStartGame"});
			this.startGame();
		}
	}
	,startGame: function() {
		com_isartdigital_builder_ui_UIManager.getInstance().startGame();
		com_isartdigital_builder_game_GameManager.getInstance().start();
	}
	,gameLoop: function() {
		haxe_Timer.delay($bind(this,this.gameLoop),Math.floor(33.333333333333336));
		this.emit("gameLoop");
	}
	,renderLoop: function() {
		haxe_Timer.delay($bind(this,this.renderLoop),Math.floor(33.333333333333336));
		this.render();
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
		if(pData == null) haxe_Log.trace("Erreur facebook API",{ fileName : "Main.hx", lineNumber : 557, className : "com.isartdigital.builder.Main", methodName : "callBackApi"}); else if(pData.error != null) haxe_Log.trace(pData.error,{ fileName : "Main.hx", lineNumber : 558, className : "com.isartdigital.builder.Main", methodName : "callBackApi"}); else {
			if(pData.id == null) throw new js__$Boot_HaxeError("Facebook connection callback : NO INTERNET CONEXION (Token null)");
			com_isartdigital_services_FacebookPicture.load(pData.picture.data.url);
			this.mail = pData.email;
			this.firstname = pData.first_name;
			this.lastname = pData.last_name;
			this.token = pData.id;
			this.storeToken(pData.id);
		}
	}
	,storeToken: function(token) {
		this.facebookConnected = true;
		js_Browser.getLocalStorage().setItem("token",token);
		com_isartdigital_builder_api_Api.getInstance();
		com_isartdigital_builder_api_Api.token = token;
		this.loadUserInfos();
	}
	,callBackUI: function(pData) {
		if(pData == null) haxe_Log.trace("Erreur facebook API",{ fileName : "Main.hx", lineNumber : 588, className : "com.isartdigital.builder.Main", methodName : "callBackUI"}); else if(pData.error_message != null) haxe_Log.trace(pData.error_message,{ fileName : "Main.hx", lineNumber : 589, className : "com.isartdigital.builder.Main", methodName : "callBackUI"}); else haxe_Log.trace(pData,{ fileName : "Main.hx", lineNumber : 590, className : "com.isartdigital.builder.Main", methodName : "callBackUI"});
	}
	,__class__: com_isartdigital_builder_Main
});
var com_isartdigital_builder_api_Api = function() {
	com_isartdigital_builder_api_Api.instance = this;
	com_isartdigital_builder_api_Api.domain = com_isartdigital_builder_api_Api.domainDev;
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
var com_isartdigital_builder_api_ApiUtils = function() {
};
$hxClasses["com.isartdigital.builder.api.ApiUtils"] = com_isartdigital_builder_api_ApiUtils;
com_isartdigital_builder_api_ApiUtils.__name__ = ["com","isartdigital","builder","api","ApiUtils"];
com_isartdigital_builder_api_ApiUtils.getInstance = function() {
	if(com_isartdigital_builder_api_ApiUtils.instance == null) com_isartdigital_builder_api_ApiUtils.instance = new com_isartdigital_builder_api_ApiUtils();
	return com_isartdigital_builder_api_ApiUtils.instance;
};
com_isartdigital_builder_api_ApiUtils.handleError = function(data) {
	if(com_isartdigital_builder_api_ApiUtils.isErrorInto(data)) {
		com_isartdigital_builder_api_ApiUtils.parseAndHandleErrorData(data);
		return;
	}
};
com_isartdigital_builder_api_ApiUtils.getParsedResultOf = function(data) {
	var results = JSON.parse(data);
	return results.data;
};
com_isartdigital_builder_api_ApiUtils.isErrorInto = function(data) {
	var results = JSON.parse(data);
	if(results.error) return true; else return false;
};
com_isartdigital_builder_api_ApiUtils.parseAndHandleErrorData = function(data) {
	var results = JSON.parse(data);
	com_isartdigital_builder_api_ApiUtils.displayError(results.errorCode,results.errorMessage);
};
com_isartdigital_builder_api_ApiUtils.displayError = function(errorCode,errorMessage) {
	if(errorCode == 1) js_Browser.getLocalStorage().setItem("token","");
	com_isartdigital_utils_Debug.error(errorMessage);
};
com_isartdigital_builder_api_ApiUtils.formatPath = function(path,params) {
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
com_isartdigital_builder_api_ApiUtils.updateUserDataWithRequestResult = function(pData) {
	if(com_isartdigital_builder_api_ApiUtils.isErrorInto(pData)) {
		com_isartdigital_builder_api_ApiUtils.parseAndHandleErrorData(pData);
		return;
	}
	com_isartdigital_services_Users.updateUserData(com_isartdigital_builder_api_ApiUtils.getParsedResultOf(pData));
};
com_isartdigital_builder_api_ApiUtils.prototype = {
	destroy: function() {
		com_isartdigital_builder_api_ApiUtils.instance = null;
	}
	,__class__: com_isartdigital_builder_api_ApiUtils
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
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,create: function(pBuilding,pX,pY,hardBought) {
		var hardBoughtToString;
		if(hardBought) hardBoughtToString = "true"; else hardBoughtToString = "false";
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + "/" + pBuilding + this.createPath,{ token : com_isartdigital_builder_api_Api.token, x : pX, y : pY, hard : hardBoughtToString}));
		request.onData = com_isartdigital_builder_api_ApiUtils.updateUserDataWithRequestResult;
		request.request(true);
	}
	,upgrade: function(pX,pY) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + this.upgradePath,{ token : com_isartdigital_builder_api_Api.token, x : pX, y : pY}));
		request.onData = com_isartdigital_builder_api_ApiUtils.updateUserDataWithRequestResult;
		request.request(true);
	}
	,collect: function(pX,pY) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + this.collectPath,{ token : com_isartdigital_builder_api_Api.token, x : pX, y : pY}));
		request.onData = com_isartdigital_builder_api_ApiUtils.updateUserDataWithRequestResult;
		request.request(true);
	}
	,move: function(pX_start,pY_start,pX_end,pY_end,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + this.movePath,{ token : com_isartdigital_builder_api_Api.token, x_start : pX_start, y_start : pY_start, x_end : pX_end, y_end : pY_end}));
		request.onData = pCallBack;
		request.request(true);
	}
	,hardBuild: function(pX,pY) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + this.hardBuildPath,{ token : com_isartdigital_builder_api_Api.token, x : pX, y : pY}));
		request.onData = com_isartdigital_builder_api_ApiUtils.updateUserDataWithRequestResult;
		request.request(true);
	}
	,changeColor: function(pColor,pX,pY,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + this.changeColorPath,{ token : com_isartdigital_builder_api_Api.token, color : pColor, x : pX, y : pY}));
		request.onData = pCallBack;
		request.request(true);
	}
	,destroy: function(pX,pY,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.buildingsPath + this.destroyPath,{ token : com_isartdigital_builder_api_Api.token, x : pX, y : pY}));
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
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.giftsPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,create: function(friendUserId,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.giftsPath + this.createPath,{ token : com_isartdigital_builder_api_Api.token, friend_user_id : friendUserId}));
		request.onData = pCallBack;
		request.request(true);
	}
	,collect: function(name,authorName,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.giftsPath + this.collectPath,{ token : com_isartdigital_builder_api_Api.token, name : name, author_name : authorName}));
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
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.lanternsPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,create: function(pX,pY,pHardPurchase,pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.lanternsPath + this.createPath,{ token : com_isartdigital_builder_api_Api.token, x : pX, y : pY, hard : pHardPurchase}));
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
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.resourcesPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,gold: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.resourcesPath + this.goldPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,spice: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.resourcesPath + this.spicePath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,offering: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.resourcesPath + this.offeringPath,{ token : com_isartdigital_builder_api_Api.token}));
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
	createFBAccount: function(mail,firstName,lastName,token,callback) {
		var requestParameters = { mail : mail, username : firstName + " " + lastName, token : token};
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.createFBPath,requestParameters));
		request.onData = callback;
		request.request(true);
	}
	,getUserInfo: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userInfoPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,getDailyreward: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.dailyRewardPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,dailyrewardUpdate: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.dailyRewardPath + this.updatePath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(true);
	}
	,getParade: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.paradePath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,getParadeUpdate: function(bonusPesos,bonusPimientos,bonusOffering,useHardInParade,hardPurchase) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.paradePath + this.updatePath,{ token : com_isartdigital_builder_api_Api.token, bonusPesos : bonusPesos, bonusPimientos : bonusPimientos, bonusOffering : bonusOffering, useHardInParade : useHardInParade, hardPurchase : hardPurchase}));
		request.onData = com_isartdigital_builder_api_ApiUtils.updateUserDataWithRequestResult;
		request.request(true);
	}
	,getFtue: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.ftuePath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,getExperience: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.experiencePath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(false);
	}
	,buy: function(pName) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.buyPath,{ token : com_isartdigital_builder_api_Api.token, name : pName}));
		request.onData = com_isartdigital_builder_api_ApiUtils.updateUserDataWithRequestResult;
		request.request(true);
	}
	,ftueComplet: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.ftuePath + this.completePath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(true);
	}
	,destroy: function(pCallBack) {
		var request = new haxe_Http(com_isartdigital_builder_api_ApiUtils.formatPath(com_isartdigital_builder_api_Api.domain + com_isartdigital_builder_api_Api.pathApi + this.userPath + this.destroyPath,{ token : com_isartdigital_builder_api_Api.token}));
		request.onData = pCallBack;
		request.request(true);
	}
	,__class__: com_isartdigital_builder_api_User
};
var com_isartdigital_builder_game_GameManager = function() {
	this.parade = null;
	this.mousePosition = new PIXI.Point(-1,-1);
	EventEmitter.call(this);
	this.on("END_PARADE_REQUEST",$bind(this,this.onParadeRewardConfirm));
};
$hxClasses["com.isartdigital.builder.game.GameManager"] = com_isartdigital_builder_game_GameManager;
com_isartdigital_builder_game_GameManager.__name__ = ["com","isartdigital","builder","game","GameManager"];
com_isartdigital_builder_game_GameManager.getInstance = function() {
	if(com_isartdigital_builder_game_GameManager.instance == null) com_isartdigital_builder_game_GameManager.instance = new com_isartdigital_builder_game_GameManager();
	return com_isartdigital_builder_game_GameManager.instance;
};
com_isartdigital_builder_game_GameManager.__super__ = EventEmitter;
com_isartdigital_builder_game_GameManager.prototype = $extend(EventEmitter.prototype,{
	getScreenRect: function() {
		return this.screenRect;
	}
	,getParadeInstance: function() {
		return this.parade;
	}
	,onParadeRewardConfirm: function(event) {
		if(this.isParadeActive()) this.endParade();
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
	}
	,refreshMouseCoordinates: function(event) {
		var position = com_isartdigital_utils_game_GameStage.getInstance().getGameContainer().toLocal(new PIXI.Point(com_isartdigital_utils_events_Event.getClientXIn(event),com_isartdigital_utils_events_Event.getClientYIn(event)));
		this.mousePosition.set(position.x,position.y);
	}
	,emitInteractionEvent: function(event) {
		if(!com_isartdigital_utils_ui_Button.buttonWasJustClicked) this.refreshMouseCoordinates(event);
		var position = com_isartdigital_utils_game_GameStage.getInstance().getGameContainer().toLocal(new PIXI.Point(com_isartdigital_utils_events_Event.getClientXIn(event),com_isartdigital_utils_events_Event.getClientYIn(event)));
		if(com_isartdigital_utils_Debug.debugPositionOnClick) {
			var debug = com_isartdigital_utils_game_iso_IsoManager.isoToModelView(position);
			console.log((function($this) {
				var $r;
				var this1;
				{
					var key1 = Math.floor(debug.x);
					this1 = com_isartdigital_builder_game_map_GMap.globalMap.h[key1];
				}
				var key = Math.floor(debug.y);
				$r = this1.get(key);
				return $r;
			}(this)));
			haxe_Log.trace("depth : " + (function($this) {
				var $r;
				var this2;
				{
					var key3 = Math.floor(debug.x);
					this2 = com_isartdigital_utils_game_iso_IsoManager.depthMap.h[key3];
				}
				var key2 = Math.floor(debug.y);
				$r = this2.get(key2);
				return $r;
			}(this)),{ fileName : "GameManager.hx", lineNumber : 131, className : "com.isartdigital.builder.game.GameManager", methodName : "emitInteractionEvent"});
			this.tryToAddFakeLanternDebug(debug,position);
			com_isartdigital_builder_game_sprites_Tile.getTileAt(debug);
		}
		com_isartdigital_builder_Main.getInstance().emit("EVENT_INTERACTION",position);
	}
	,tryToAddFakeLanternDebug: function(debug,position) {
		if(!com_isartdigital_utils_game_Camera.getInstance().hasMoved && com_isartdigital_utils_Debug.debugIlluminateTileAtClick) {
			com_isartdigital_utils_Debug.addDebugPointAt(position);
			com_isartdigital_builder_game_sprites_Tile.illumineTileInRadiusAt(debug,com_isartdigital_builder_game_sprites_Tile.getLanternActionRadius());
			var positions = [];
			var debugPointToRemove;
			var _g = 0;
			var _g1 = com_isartdigital_utils_Debug.debugPointsList;
			while(_g < _g1.length) {
				var debugPoint = _g1[_g];
				++_g;
				positions.push(com_isartdigital_utils_game_iso_IsoManager.isoToModelView(debugPoint.position,true));
			}
			haxe_Log.trace(JSON.stringify(positions),{ fileName : "GameManager.hx", lineNumber : 151, className : "com.isartdigital.builder.game.GameManager", methodName : "tryToAddFakeLanternDebug"});
		}
	}
	,cb_createUser: function(pData) {
		var lData = JSON.parse(pData);
		if(lData.error) {
			haxe_Log.trace(lData.errorMessage,{ fileName : "GameManager.hx", lineNumber : 161, className : "com.isartdigital.builder.game.GameManager", methodName : "cb_createUser"});
			return;
		}
	}
	,cb_resourceAll: function(pData) {
		var lData = JSON.parse(pData);
		if(lData.error) {
			com_isartdigital_utils_Debug.error(lData.errorMessage);
			return;
		}
	}
	,startParade: function(hardPurchase) {
		this.parade = new com_isartdigital_builder_game_parade_Parade();
		this.parade.start(hardPurchase);
		com_isartdigital_builder_game_sprites_citizen_Citizen.hideAllPassiveCitizens();
		com_isartdigital_builder_game_animation_petals_PetalsSalve.launchOnBuildableTiles(50);
	}
	,dontContinueParade: function() {
		this.parade.end();
	}
	,continueParade: function() {
		this.parade.addTime(30);
	}
	,endParade: function() {
		this.parade.destroy();
		this.parade = null;
		com_isartdigital_builder_game_GameManager.pathfindingWithObstacle = true;
		com_isartdigital_builder_game_sprites_citizen_Citizen.reInitAllPassiveCitizenPath();
		com_isartdigital_builder_game_sprites_citizen_Citizen.showAllPassiveCitizens();
		com_isartdigital_builder_game_animation_petals_PetalsSalve.launchOnBuildableTiles(50);
	}
	,isParadeActive: function() {
		return this.parade != null;
	}
	,start: function() {
		this.refreshScreenRect();
		com_isartdigital_utils_game_Camera.getInstance().init();
		window.addEventListener("mousemove",$bind(this,this.refreshMouseCoordinates));
		window.addEventListener("mouseup",$bind(this,this.emitInteractionEvent));
		window.addEventListener("touchend",$bind(this,this.emitInteractionEvent));
		window.addEventListener("touchmove",$bind(this,this.refreshMouseCoordinates));
		com_isartdigital_utils_game_iso_IsoManager.init(com_isartdigital_utils_Config.tileWidth,com_isartdigital_utils_Config.tileHeight);
		com_isartdigital_builder_ui_UIManager.getInstance().startGame();
		com_isartdigital_builder_Main.getInstance().on("gameLoop",$bind(this,this.gameLoop));
		com_isartdigital_builder_ui_CheatPanel.getInstance().ingame();
		com_isartdigital_builder_game_map_GMapCreator.create();
		this.refreshScreenRect();
		com_isartdigital_builder_game_manager_RessourceManager.getInstance().start();
		com_isartdigital_builder_game_manager_ExperienceManager.getInstance().start();
		this.buildingCreator = new com_isartdigital_builder_game_sprites_buildings_BuildingCreator();
		this.buildingCreator.listenShopBuyEvents();
		this.clipping = new com_isartdigital_builder_game_clipping_Clipping();
		this.clipping.initialise(["building","tile","background"]);
		this.ftue = new com_isartdigital_builder_game_ftue_Ftue(com_isartdigital_utils_game_GameStage.getInstance().getFtueContainer());
		this.ftueObserver = new com_isartdigital_builder_game_ftue_FtueObserver();
		com_isartdigital_builder_game_sprites_citizen_Citizen.reInitAllPassiveCitizenPath();
		this.dailyrewardRequest();
	}
	,dailyrewardRequest: function() {
		if(com_isartdigital_services_Users.infos.ftue_complet) com_isartdigital_builder_api_Api.user.getDailyreward($bind(this,this.launchDailyrewardIfReady));
	}
	,launchDailyrewardIfReady: function(results) {
		if(com_isartdigital_builder_api_ApiUtils.isErrorInto(results)) com_isartdigital_builder_api_ApiUtils.parseAndHandleErrorData(results);
		var isReady = com_isartdigital_builder_api_ApiUtils.getParsedResultOf(results);
		if(isReady) com_isartdigital_builder_api_Api.user.dailyrewardUpdate($bind(this,this.getDailyReward)); else haxe_Timer.delay($bind(this,this.dailyrewardRequest),30000);
	}
	,getDailyReward: function(results) {
		if(com_isartdigital_builder_api_ApiUtils.isErrorInto(results)) com_isartdigital_builder_api_ApiUtils.parseAndHandleErrorData(results);
		haxe_Timer.delay(function() {
			com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_PINATA",com_isartdigital_builder_api_ApiUtils.getParsedResultOf(results));
		},2000);
	}
	,gameLoop: function(pEvent) {
		com_isartdigital_builder_game_manager_BackgroundManager.getInstance().manage();
		this.refreshScreenRect();
		this.clipping.update();
		com_isartdigital_utils_game_Camera.getInstance().update();
		com_isartdigital_builder_game_animation_petals_PetalsSalve.updatePetalsAmbiance();
		this.doActions(com_isartdigital_builder_game_sprites_buildings_Building.list);
		this.doActionParade();
		com_isartdigital_utils_game_iso_IsoManager.sortAll();
	}
	,refreshScreenRect: function() {
		this.screenRect = com_isartdigital_utils_system_DeviceCapabilities.getScreenRect(com_isartdigital_utils_game_GameStage.getInstance().getGameContainer());
		this.screenRect.x = Math.round(this.screenRect.x);
		this.screenRect.y = Math.round(this.screenRect.y);
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
		var _g1 = com_isartdigital_builder_game_sprites_citizen_Citizen.list;
		while(_g < _g1.length) {
			var lCitizen = _g1[_g];
			++_g;
			lCitizen.doAction();
		}
	}
	,doActionParade: function() {
		if(this.parade != null) this.parade.doActionParade();
	}
	,destroy: function() {
		com_isartdigital_builder_Main.getInstance().off("gameLoop",$bind(this,this.gameLoop));
		com_isartdigital_builder_game_GameManager.instance = null;
	}
	,__class__: com_isartdigital_builder_game_GameManager
});
var com_isartdigital_builder_game_animation_AnimationNames = function() { };
$hxClasses["com.isartdigital.builder.game.animation.AnimationNames"] = com_isartdigital_builder_game_animation_AnimationNames;
com_isartdigital_builder_game_animation_AnimationNames.__name__ = ["com","isartdigital","builder","game","animation","AnimationNames"];
var com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrails = function(animationBoatTrailsBuilder) {
	this.position = animationBoatTrailsBuilder.position;
	this.trailsAlpha = animationBoatTrailsBuilder.trailsAlpha;
	this.container = animationBoatTrailsBuilder.container;
	this.createTrails();
};
$hxClasses["com.isartdigital.builder.game.animation.boatTrails.AnimationBoatTrails"] = com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrails;
com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrails.__name__ = ["com","isartdigital","builder","game","animation","boatTrails","AnimationBoatTrails"];
com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrails.prototype = {
	createTrails: function() {
		var animationDuraiton = 1700.;
		this.boatTrails = new com_isartdigital_utils_game_StateGraphic("FX_shockwave");
		this.boatTrails.position = this.position;
		this.boatTrails.position.x -= 25;
		this.boatTrails.alpha = this.trailsAlpha;
		this.boatTrails.scale = new PIXI.Point(0.5,0.5);
		this.boatTrails.getFlumpMovie().animationSpeed = 0.5;
		this.container.addChild(this.boatTrails);
		haxe_Timer.delay($bind(this,this.destroy),animationDuraiton | 0);
	}
	,destroy: function() {
		this.container.removeChild(this.boatTrails);
		this.boatTrails.destroy();
		this.boatTrails = null;
	}
	,__class__: com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrails
};
var com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrailsBuilder = function() {
};
$hxClasses["com.isartdigital.builder.game.animation.boatTrails.AnimationBoatTrailsBuilder"] = com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrailsBuilder;
com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrailsBuilder.__name__ = ["com","isartdigital","builder","game","animation","boatTrails","AnimationBoatTrailsBuilder"];
com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrailsBuilder.create = function() {
	return new com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrailsBuilder();
};
com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrailsBuilder.prototype = {
	withPosition: function(position) {
		this.position = position;
		return this;
	}
	,withAlpha: function(alpha) {
		this.trailsAlpha = alpha;
		return this;
	}
	,withContainer: function(container) {
		this.container = container;
		return this;
	}
	,build: function() {
		return new com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrails(this);
	}
	,__class__: com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrailsBuilder
};
var com_isartdigital_builder_game_animation_fireworks_AnimationFireworks = function(fireworskBuilder) {
	this.name = fireworskBuilder.name;
	this.position = fireworskBuilder.position;
	this.container = fireworskBuilder.container;
	this.shotAnimation = fireworskBuilder.shotAnimation;
	this.createFireworks();
	haxe_Timer.delay($bind(this,this.destroy),1300);
};
$hxClasses["com.isartdigital.builder.game.animation.fireworks.AnimationFireworks"] = com_isartdigital_builder_game_animation_fireworks_AnimationFireworks;
com_isartdigital_builder_game_animation_fireworks_AnimationFireworks.__name__ = ["com","isartdigital","builder","game","animation","fireworks","AnimationFireworks"];
com_isartdigital_builder_game_animation_fireworks_AnimationFireworks.getRandomFireworks = function() {
	return com_isartdigital_builder_game_animation_fireworks_AnimationFireworks.availableFireworks[Math.floor(Math.random() * com_isartdigital_builder_game_animation_fireworks_AnimationFireworks.availableFireworks.length)];
};
com_isartdigital_builder_game_animation_fireworks_AnimationFireworks.prototype = {
	createFireworks: function() {
		if(this.shotAnimation) {
			this.createFireworksShotGraphic();
			haxe_Timer.delay($bind(this,this.createFireworksGraphic),500);
		} else this.createFireworksGraphic();
	}
	,createFireworksShotGraphic: function() {
		this.fireworksShot = new com_isartdigital_utils_game_StateGraphic("FireworksShot");
		this.fireworksShot.position.set(this.position.x,this.position.y + 400);
		this.container.addChild(this.fireworksShot);
		haxe_Timer.delay($bind(this,this.destroyShot),500);
	}
	,createFireworksGraphic: function() {
		this.fireworks = new com_isartdigital_utils_game_StateGraphic(this.name);
		if(this.name == "FireworksA") this.fireworks.getFlumpMovie().animationSpeed = 0.5;
		this.fireworks.position.set(this.position.x,this.position.y);
		this.container.addChild(this.fireworks);
	}
	,destroyShot: function() {
		if(this.shotAnimation) {
			this.container.removeChild(this.fireworksShot);
			this.fireworksShot.destroy();
		}
	}
	,destroy: function() {
		this.container.removeChild(this.fireworks);
		this.fireworks.destroy();
	}
	,__class__: com_isartdigital_builder_game_animation_fireworks_AnimationFireworks
};
var com_isartdigital_builder_game_animation_fireworks_AnimationFireworksBuilder = function() {
};
$hxClasses["com.isartdigital.builder.game.animation.fireworks.AnimationFireworksBuilder"] = com_isartdigital_builder_game_animation_fireworks_AnimationFireworksBuilder;
com_isartdigital_builder_game_animation_fireworks_AnimationFireworksBuilder.__name__ = ["com","isartdigital","builder","game","animation","fireworks","AnimationFireworksBuilder"];
com_isartdigital_builder_game_animation_fireworks_AnimationFireworksBuilder.create = function() {
	return new com_isartdigital_builder_game_animation_fireworks_AnimationFireworksBuilder();
};
com_isartdigital_builder_game_animation_fireworks_AnimationFireworksBuilder.prototype = {
	withFireworksName: function(name) {
		this.name = name;
		return this;
	}
	,withShotAnimation: function(shotAnimation) {
		this.shotAnimation = shotAnimation;
		return this;
	}
	,withPosition: function(position) {
		this.position = position;
		return this;
	}
	,withContainer: function(container) {
		this.container = container;
		return this;
	}
	,build: function() {
		if(this.name == null || this.shotAnimation == null || this.position == null || this.container == null) throw new js__$Boot_HaxeError("AnimationFireworksBuilder : Parameters missing");
		return new com_isartdigital_builder_game_animation_fireworks_AnimationFireworks(this);
	}
	,__class__: com_isartdigital_builder_game_animation_fireworks_AnimationFireworksBuilder
};
var com_isartdigital_builder_game_animation_fireworks_FireworksAmbiance = function() {
};
$hxClasses["com.isartdigital.builder.game.animation.fireworks.FireworksAmbiance"] = com_isartdigital_builder_game_animation_fireworks_FireworksAmbiance;
com_isartdigital_builder_game_animation_fireworks_FireworksAmbiance.__name__ = ["com","isartdigital","builder","game","animation","fireworks","FireworksAmbiance"];
com_isartdigital_builder_game_animation_fireworks_FireworksAmbiance.update = function() {
	if(Math.random() < 0.1) {
		var fireworksPosition = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(com_isartdigital_builder_game_map_GMap.getRandomAvailablePosition());
		com_isartdigital_builder_game_animation_fireworks_AnimationFireworksBuilder.create().withFireworksName(com_isartdigital_builder_game_animation_fireworks_AnimationFireworks.getRandomFireworks()).withShotAnimation(true).withContainer(com_isartdigital_utils_game_GameStage.getInstance().getFireworksContainer()).withPosition(fireworksPosition).build();
	}
};
com_isartdigital_builder_game_animation_fireworks_FireworksAmbiance.prototype = {
	__class__: com_isartdigital_builder_game_animation_fireworks_FireworksAmbiance
};
var com_isartdigital_builder_game_animation_harvest_AnimationHarvest = function(animationHarvestBuilder) {
	this.coins = [];
	this.startPosition = animationHarvestBuilder.startPosition;
	this.endPosition = animationHarvestBuilder.endPosition;
	this.coinToGenerateCount = animationHarvestBuilder.coinToGenerateCount;
	this.totalAnimationDuration = animationHarvestBuilder.totalAnimationDuration;
	this.coinCountLimit = animationHarvestBuilder.coinCountLimit;
	this.callbackWhenCoinIsArrivedAtDestination = animationHarvestBuilder.callbackWhenCoinIsArrivedAtDestination;
	this.animationName = animationHarvestBuilder.animationName;
	this.container = animationHarvestBuilder.container;
	this.callbackOnAnimationEnd = animationHarvestBuilder.callbackOnAnimationEnd;
};
$hxClasses["com.isartdigital.builder.game.animation.harvest.AnimationHarvest"] = com_isartdigital_builder_game_animation_harvest_AnimationHarvest;
com_isartdigital_builder_game_animation_harvest_AnimationHarvest.__name__ = ["com","isartdigital","builder","game","animation","harvest","AnimationHarvest"];
com_isartdigital_builder_game_animation_harvest_AnimationHarvest.prototype = {
	animate: function() {
		this.launchCoinAnimationSalve();
	}
	,launchCoinAnimationSalve: function() {
		var _g2 = this;
		var inversedIndex;
		var timeToWait;
		if(this.coinCountLimit < this.coinToGenerateCount) this.coinToGenerateCount = this.coinCountLimit; else this.coinToGenerateCount = this.coinToGenerateCount;
		var _g1 = 0;
		var _g = this.coinToGenerateCount;
		while(_g1 < _g) {
			var i = _g1++;
			timeToWait = Math.floor(Math.random() * (this.totalAnimationDuration * 1000 / 2) / 2);
			haxe_Timer.delay(function() {
				_g2.launchCoinAnimation();
			},timeToWait);
		}
	}
	,launchCoinAnimation: function() {
		var spaceCoef = this.totalAnimationDuration / 15;
		var animationDurationPerAxes = new PIXI.Point();
		var coin = this.createCoin();
		var endPosition = this.endPosition();
		var onCompleteCallbackByAxes_x = null;
		var onCompleteCallbackByAxes_y = null;
		animationDurationPerAxes.x = this.totalAnimationDuration / 2 - spaceCoef + Math.random() * spaceCoef * 2;
		animationDurationPerAxes.y = this.totalAnimationDuration - animationDurationPerAxes.x;
		if(animationDurationPerAxes.x > animationDurationPerAxes.y) onCompleteCallbackByAxes_x = this.onCoinArrivedAtDestination(coin); else onCompleteCallbackByAxes_y = this.onCoinArrivedAtDestination(coin);
		motion_Actuate.tween(coin,animationDurationPerAxes.x,{ x : endPosition.x}).ease(motion_easing_Quad.get_easeInOut()).onComplete(onCompleteCallbackByAxes_x);
		motion_Actuate.tween(coin,animationDurationPerAxes.y,{ y : endPosition.y}).ease(motion_easing_Quad.get_easeInOut()).onComplete(onCompleteCallbackByAxes_y);
	}
	,createCoin: function() {
		var coin = new com_isartdigital_utils_game_StateGraphic(this.animationName);
		var startPosition = this.startPosition();
		var coinScale = 0.5 + Math.random() * 0.5;
		this.coins.push(coin);
		this.container.addChild(coin);
		coin.scale = new PIXI.Point(coinScale,coinScale);
		(js_Boot.__cast(coin.getAnim() , pixi_display_FlumpMovie)).animationSpeed = 2;
		coin.position.set(startPosition.x,startPosition.y);
		return coin;
	}
	,onCoinArrivedAtDestination: function(coin) {
		var _g = this;
		return function() {
			_g.callbackWhenCoinIsArrivedAtDestination();
			_g.destroyCoin(coin);
			if(_g.allCoinReachedDestination()) _g.callbackOnAnimationEnd();
		};
	}
	,destroyCoin: function(coin) {
		this.container.removeChild(coin);
		this.coins.splice(HxOverrides.indexOf(this.coins,coin,0),1);
		haxe_Timer.delay(this.destroyCoinInstance(coin),10);
	}
	,destroyCoinInstance: function(coin) {
		return function() {
			coin.destroy();
		};
	}
	,allCoinReachedDestination: function() {
		return this.coins.length == 0;
	}
	,__class__: com_isartdigital_builder_game_animation_harvest_AnimationHarvest
};
var com_isartdigital_builder_game_animation_harvest_AnimationHarvestBuilder = function() {
};
$hxClasses["com.isartdigital.builder.game.animation.harvest.AnimationHarvestBuilder"] = com_isartdigital_builder_game_animation_harvest_AnimationHarvestBuilder;
com_isartdigital_builder_game_animation_harvest_AnimationHarvestBuilder.__name__ = ["com","isartdigital","builder","game","animation","harvest","AnimationHarvestBuilder"];
com_isartdigital_builder_game_animation_harvest_AnimationHarvestBuilder.create = function() {
	return new com_isartdigital_builder_game_animation_harvest_AnimationHarvestBuilder();
};
com_isartdigital_builder_game_animation_harvest_AnimationHarvestBuilder.prototype = {
	withStartAnimationPosition: function(position) {
		this.startPosition = position;
		return this;
	}
	,withEndAnimationPosition: function(position) {
		this.endPosition = position;
		return this;
	}
	,withCoinAmountToGenerate: function(count) {
		this.coinToGenerateCount = count;
		return this;
	}
	,withAnimationName: function(name) {
		this.animationName = name;
		return this;
	}
	,withContainer: function(container) {
		this.container = container;
		return this;
	}
	,withAnimationDurationInSecond: function(duration) {
		this.totalAnimationDuration = duration;
		return this;
	}
	,withCoinCountLimit: function(count) {
		this.coinCountLimit = count;
		return this;
	}
	,withCallbackWhenCoinReachDestination: function(callback) {
		this.callbackWhenCoinIsArrivedAtDestination = callback;
		return this;
	}
	,withCallbackOnAnimationEnd: function(callback) {
		this.callbackOnAnimationEnd = callback;
		return this;
	}
	,build: function() {
		this.throwAnErrorIfRequiredParametersIsMissingAndShowUsage();
		this.setTotalAnimationDurationDefaultValueIfNotSet();
		this.setCoinCountLimitDefaultValueIfNotSet();
		this.setEmptyFunctionIfCallbackOnAnimationEndIsNotSet();
		this.setEmptyFunctionIfCallbackWhenCoinIsArrivedAtDestinationIsNotSet();
		return new com_isartdigital_builder_game_animation_harvest_AnimationHarvest(this);
	}
	,throwAnErrorIfRequiredParametersIsMissingAndShowUsage: function() {
		if(this.startPosition == null || this.endPosition == null || this.container == null || this.coinToGenerateCount == null || this.animationName == null) throw new js__$Boot_HaxeError("AnimationHarvestBuilder : Missing required parameters.\n" + "\n" + "Usage : \n" + "AnimationHarvestBuilder.create()\n" + "                       .setStartAnimationPosition(position:Void->Point) (Required)\n" + "                       .setEndAnimationPosition(position:Void->Point) (Required)\n" + "                       .withCoinAmountToGenerate(count:Int) (Required)\n" + "\t\t\t\t\t\t.withAnimationName(name:String) (Required)\n" + "                       .withContainer(container:Container) (Required)\n" + "                       .withAnimationDurationInSecond(duration:Float) (Optional) (Default : 2,5s)\n" + "\t   \t\t\t\t    .withCoinCountLimit(count:Int) (Optional) (Default : AnimationHarvest.COIN_COUNT_LIMIT)\n" + "                       .withCallbackWhenCoinReachDestination(callback:Void->Void) (Optional)\n" + "                       .withCallbackOnAnimationEnd(callback:Void->Void) (Optional)\n" + "                       .build()");
	}
	,setTotalAnimationDurationDefaultValueIfNotSet: function() {
		if(this.totalAnimationDuration == null) this.totalAnimationDuration = 2.5;
	}
	,setCoinCountLimitDefaultValueIfNotSet: function() {
		if(this.coinCountLimit == null) this.coinCountLimit = 50;
	}
	,setEmptyFunctionIfCallbackOnAnimationEndIsNotSet: function() {
		if(this.callbackOnAnimationEnd == null) this.callbackOnAnimationEnd = function() {
		};
	}
	,setEmptyFunctionIfCallbackWhenCoinIsArrivedAtDestinationIsNotSet: function() {
		if(this.callbackWhenCoinIsArrivedAtDestination == null) this.callbackWhenCoinIsArrivedAtDestination = function() {
		};
	}
	,__class__: com_isartdigital_builder_game_animation_harvest_AnimationHarvestBuilder
};
var com_isartdigital_builder_game_animation_paper_AnimationPaper = function(animationPaperBuilder) {
	this.papers = [];
	this.fallTimeCirclePapers = 10;
	this.container = animationPaperBuilder.container;
	this.radius = animationPaperBuilder.radius;
	this.position = new PIXI.Point();
	this.position.set(animationPaperBuilder.position.x - this.radius / 2,animationPaperBuilder.position.y - this.radius / 2);
	this.fallTimeCirclePapers = 10 / animationPaperBuilder.speed;
	if(animationPaperBuilder.pattern == "circle") {
		this.createCircleOfPapers();
		this.startCircleAnimPaper();
	} else if(animationPaperBuilder.pattern == "line") {
		this.createLineOfPapers();
		this.startLineAnimPaper();
	}
};
$hxClasses["com.isartdigital.builder.game.animation.paper.AnimationPaper"] = com_isartdigital_builder_game_animation_paper_AnimationPaper;
com_isartdigital_builder_game_animation_paper_AnimationPaper.__name__ = ["com","isartdigital","builder","game","animation","paper","AnimationPaper"];
com_isartdigital_builder_game_animation_paper_AnimationPaper.prototype = {
	startLineAnimPaper: function() {
		var _g = 0;
		var _g1 = this.papers;
		while(_g < _g1.length) {
			var paper = _g1[_g];
			++_g;
			motion_Actuate.tween(paper,this.fallTimeCirclePapers,{ x : paper.x + Math.random() * paper.width * 5}).ease(motion_easing_Cubic.get_easeOut());
			motion_Actuate.tween(paper,5,{ rotation : 360}).ease(motion_easing_Cubic.get_easeOut());
			motion_Actuate.tween(paper,5,{ y : this.container.height}).ease(motion_easing_Cubic.get_easeOut()).onComplete($bind(this,this.destroyPaper),[paper]);
		}
	}
	,createLineOfPapers: function() {
		var deltaX = this.container.width / 30;
		var _g = 0;
		while(_g < 30) {
			var i = _g++;
			var paper = new com_isartdigital_utils_game_StateGraphic("PinataPaper");
			this.container.addChild(paper);
			paper.position.set(this.position.x + i * deltaX,this.position.y);
			paper.getFlumpMovie().gotoAndStop(Math.ceil(Math.random() * paper.getFlumpMovie().get_totalFrames()));
			this.papers.push(paper);
		}
	}
	,startCircleAnimPaper: function() {
		var _g = 0;
		var _g1 = this.papers;
		while(_g < _g1.length) {
			var paper = _g1[_g];
			++_g;
			motion_Actuate.tween(paper,this.fallTimeCirclePapers,{ x : this.getXEndPosition(paper)}).ease(motion_easing_Cubic.get_easeOut());
			motion_Actuate.tween(paper,this.fallTimeCirclePapers,{ y : this.container.height}).ease(motion_easing_Cubic.get_easeOut()).onComplete($bind(this,this.destroyPaper),[paper]);
		}
	}
	,getXEndPosition: function(paper) {
		var direction;
		if(paper.x < 0) direction = -1; else direction = 1;
		return paper.parent.width / Math.ceil(Math.random() * 10) * direction;
	}
	,destroyPaper: function(paper) {
		paper.parent.removeChild(paper);
		this.papers.splice(HxOverrides.indexOf(this.papers,paper,0),1);
		paper.destroy();
	}
	,createCircleOfPapers: function() {
		var numberOfPaper = 18.;
		var _g1 = 0;
		var _g = numberOfPaper | 0;
		while(_g1 < _g) {
			var i = _g1++;
			var paper = new com_isartdigital_utils_game_StateGraphic("PinataPaper");
			this.container.addChild(paper);
			paper.position.set(this.position.x + this.getPositionInTheCircle(this.radius,i * 20).x,this.position.y + this.getPositionInTheCircle(this.radius,i * 20).y);
			paper.getFlumpMovie().gotoAndStop(Math.ceil(Math.random() * paper.getFlumpMovie().get_totalFrames()));
			this.papers.push(paper);
		}
	}
	,getPositionInTheCircle: function(radius,angle) {
		var position = new PIXI.Point();
		position.x = radius / 2 + radius / 2 * Math.cos(angle);
		position.y = radius / 2 + radius / 2 * Math.sin(angle);
		return position;
	}
	,__class__: com_isartdigital_builder_game_animation_paper_AnimationPaper
};
var com_isartdigital_builder_game_animation_paper_AnimationPaperBuilder = function() {
};
$hxClasses["com.isartdigital.builder.game.animation.paper.AnimationPaperBuilder"] = com_isartdigital_builder_game_animation_paper_AnimationPaperBuilder;
com_isartdigital_builder_game_animation_paper_AnimationPaperBuilder.__name__ = ["com","isartdigital","builder","game","animation","paper","AnimationPaperBuilder"];
com_isartdigital_builder_game_animation_paper_AnimationPaperBuilder.create = function() {
	return new com_isartdigital_builder_game_animation_paper_AnimationPaperBuilder();
};
com_isartdigital_builder_game_animation_paper_AnimationPaperBuilder.prototype = {
	withPosition: function(position) {
		this.position = position;
		return this;
	}
	,withContainer: function(container) {
		this.container = container;
		return this;
	}
	,withRadius: function(radius) {
		this.radius = radius;
		return this;
	}
	,withSpeedRatio: function(speed) {
		this.speed = speed;
		return this;
	}
	,withPattern: function(pattern) {
		this.pattern = pattern;
		return this;
	}
	,build: function() {
		return new com_isartdigital_builder_game_animation_paper_AnimationPaper(this);
	}
	,__class__: com_isartdigital_builder_game_animation_paper_AnimationPaperBuilder
};
var com_isartdigital_builder_game_animation_paper_PaperPattern = function() { };
$hxClasses["com.isartdigital.builder.game.animation.paper.PaperPattern"] = com_isartdigital_builder_game_animation_paper_PaperPattern;
com_isartdigital_builder_game_animation_paper_PaperPattern.__name__ = ["com","isartdigital","builder","game","animation","paper","PaperPattern"];
var com_isartdigital_builder_game_animation_petals_AnimationPetals = function(animationPetalsBuilder) {
	this.position = animationPetalsBuilder.position;
	this.petalsDelay = animationPetalsBuilder.petalsDelay;
	this.container = animationPetalsBuilder.container;
	haxe_Timer.delay($bind(this,this.createPetals),Std["int"](Math.random() * this.petalsDelay));
};
$hxClasses["com.isartdigital.builder.game.animation.petals.AnimationPetals"] = com_isartdigital_builder_game_animation_petals_AnimationPetals;
com_isartdigital_builder_game_animation_petals_AnimationPetals.__name__ = ["com","isartdigital","builder","game","animation","petals","AnimationPetals"];
com_isartdigital_builder_game_animation_petals_AnimationPetals.prototype = {
	createPetals: function() {
		this.petals = new com_isartdigital_utils_game_StateGraphic("FX_Petalflump");
		this.petals.position = this.position;
		this.petals.position.x -= this.petals.width * 2;
		this.petals.position.y -= this.petals.height * 2;
		this.container.addChild(this.petals);
		motion_Actuate.tween(this.petals,1.6,{ alpha : 0}).ease(motion_easing_Cubic.get_easeIn());
		haxe_Timer.delay($bind(this,this.destroy),1600);
	}
	,destroy: function() {
		this.container.removeChild(this.petals);
		this.petals.destroy();
		this.petals = null;
	}
	,__class__: com_isartdigital_builder_game_animation_petals_AnimationPetals
};
var com_isartdigital_builder_game_animation_petals_AnimationPetalsBuilder = function() {
};
$hxClasses["com.isartdigital.builder.game.animation.petals.AnimationPetalsBuilder"] = com_isartdigital_builder_game_animation_petals_AnimationPetalsBuilder;
com_isartdigital_builder_game_animation_petals_AnimationPetalsBuilder.__name__ = ["com","isartdigital","builder","game","animation","petals","AnimationPetalsBuilder"];
com_isartdigital_builder_game_animation_petals_AnimationPetalsBuilder.create = function() {
	return new com_isartdigital_builder_game_animation_petals_AnimationPetalsBuilder();
};
com_isartdigital_builder_game_animation_petals_AnimationPetalsBuilder.prototype = {
	withPosition: function(position) {
		this.position = position;
		return this;
	}
	,withMaxPetalDelay: function(delay) {
		this.petalsDelay = delay;
		return this;
	}
	,withContainer: function(container) {
		this.container = container;
		return this;
	}
	,build: function() {
		return new com_isartdigital_builder_game_animation_petals_AnimationPetals(this);
	}
	,__class__: com_isartdigital_builder_game_animation_petals_AnimationPetalsBuilder
};
var com_isartdigital_builder_game_animation_petals_PetalsSalve = function() {
};
$hxClasses["com.isartdigital.builder.game.animation.petals.PetalsSalve"] = com_isartdigital_builder_game_animation_petals_PetalsSalve;
com_isartdigital_builder_game_animation_petals_PetalsSalve.__name__ = ["com","isartdigital","builder","game","animation","petals","PetalsSalve"];
com_isartdigital_builder_game_animation_petals_PetalsSalve.launchOnBuildableTiles = function(number) {
	var _g = 0;
	while(_g < number) {
		var i = _g++;
		com_isartdigital_builder_game_animation_petals_AnimationPetalsBuilder.create().withPosition(com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(com_isartdigital_builder_game_map_GMap.getRandomAvailablePosition())).withMaxPetalDelay(1500).withContainer(com_isartdigital_utils_game_GameStage.getInstance().getPetalsContainer()).build();
	}
};
com_isartdigital_builder_game_animation_petals_PetalsSalve.lauchOnPositionWithRadius = function(position,number) {
	var _g = 0;
	while(_g < number) {
		var i = _g++;
		var position1 = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(position);
		position1.x += Math.random() * 200 * Math.cos(Math.random() * (Math.PI * 2));
		position1.y += Math.random() * 200 * Math.sin(Math.random() * (Math.PI * 2));
		position1.x = position1.x - _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileWidth);
		com_isartdigital_builder_game_animation_petals_AnimationPetalsBuilder.create().withPosition(position1).withMaxPetalDelay(500).withContainer(com_isartdigital_utils_game_GameStage.getInstance().getPetalsContainer()).build();
	}
};
com_isartdigital_builder_game_animation_petals_PetalsSalve.updatePetalsAmbiance = function() {
	if(Math.random() < 0.02) com_isartdigital_builder_game_animation_petals_AnimationPetalsBuilder.create().withPosition(com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(com_isartdigital_builder_game_map_GMap.getRandomAvailablePosition())).withMaxPetalDelay(0).withContainer(com_isartdigital_utils_game_GameStage.getInstance().getPetalsContainer()).build();
};
com_isartdigital_builder_game_animation_petals_PetalsSalve.prototype = {
	__class__: com_isartdigital_builder_game_animation_petals_PetalsSalve
};
var com_isartdigital_builder_game_clipping_Clipping = function() {
	this.elementsTypeToDisplay = [];
	this.clippedModels = [];
};
$hxClasses["com.isartdigital.builder.game.clipping.Clipping"] = com_isartdigital_builder_game_clipping_Clipping;
com_isartdigital_builder_game_clipping_Clipping.__name__ = ["com","isartdigital","builder","game","clipping","Clipping"];
com_isartdigital_builder_game_clipping_Clipping.prototype = {
	initialise: function(elementsToClip) {
		this.clippingGarbageCollector = new com_isartdigital_builder_game_clipping_ClippingGarbageCollector(this);
		this.elementsTypeToDisplay = elementsToClip;
		var cameraFocus = com_isartdigital_utils_game_Camera.getInstance().cameraFocus;
		this.cameraPositionSinceLastClip = new PIXI.Point(cameraFocus.x,cameraFocus.y);
		this.displayAllModelsContainedInScreen();
	}
	,update: function() {
		this.displayAndRemoveElements();
		this.updateCameraOffsetByLineToClip();
	}
	,displayAndRemoveElements: function() {
		var lineToClip = this.getLineToClipCountTruncated();
		var baseModelToClipFront = 2;
		var baseModelToClipBack = 4;
		var modelToRemoveCount = 2;
		if(lineToClip.x != 0 || lineToClip.y != 0) {
			if(this.clippingGarbageCollector.canGarbage()) this.clippingGarbageCollector.cleanNotClippedModelsOutsideOfScreen();
		}
		if(lineToClip.x < 0) {
			this.displayElementsIfExistByPositions(com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(com_isartdigital_builder_game_clipping_ClippingUtils.LEFT,baseModelToClipFront * Math.abs(lineToClip.x)));
			this.displayElementsIfExistByPositions(com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(com_isartdigital_builder_game_clipping_ClippingUtils.LEFT,-baseModelToClipBack * Math.abs(lineToClip.x)));
			this.removeElementsIfExistByPositions(com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(com_isartdigital_builder_game_clipping_ClippingUtils.RIGHT,modelToRemoveCount * Math.abs(lineToClip.x)));
		} else if(lineToClip.x > 0) {
			this.displayElementsIfExistByPositions(com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(com_isartdigital_builder_game_clipping_ClippingUtils.RIGHT,baseModelToClipFront * Math.abs(lineToClip.x)));
			this.displayElementsIfExistByPositions(com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(com_isartdigital_builder_game_clipping_ClippingUtils.RIGHT,-baseModelToClipBack * Math.abs(lineToClip.x)));
			this.removeElementsIfExistByPositions(com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(com_isartdigital_builder_game_clipping_ClippingUtils.LEFT,modelToRemoveCount * Math.abs(lineToClip.x)));
		}
		if(lineToClip.y < 0) {
			this.displayElementsIfExistByPositions(com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(com_isartdigital_builder_game_clipping_ClippingUtils.TOP,baseModelToClipFront * Math.abs(lineToClip.y)));
			this.displayElementsIfExistByPositions(com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(com_isartdigital_builder_game_clipping_ClippingUtils.TOP,-baseModelToClipBack * Math.abs(lineToClip.y)));
			this.removeElementsIfExistByPositions(com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(com_isartdigital_builder_game_clipping_ClippingUtils.DOWN,modelToRemoveCount * Math.abs(lineToClip.y)));
		} else if(lineToClip.y > 0) {
			this.displayElementsIfExistByPositions(com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(com_isartdigital_builder_game_clipping_ClippingUtils.DOWN,baseModelToClipFront * Math.abs(lineToClip.y)));
			this.displayElementsIfExistByPositions(com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(com_isartdigital_builder_game_clipping_ClippingUtils.DOWN,-baseModelToClipBack * Math.abs(lineToClip.y)));
			this.removeElementsIfExistByPositions(com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(com_isartdigital_builder_game_clipping_ClippingUtils.TOP,modelToRemoveCount * Math.abs(lineToClip.y)));
		}
	}
	,displayAllModelsContainedInScreen: function() {
		var modelsPosition = com_isartdigital_builder_game_clipping_ClippingUtils.getAllModelsInScreen();
		var counter = 0;
		var _g = 0;
		while(_g < modelsPosition.length) {
			var modelPosition = modelsPosition[_g];
			++_g;
			this.createElementsIfExistAt(modelPosition);
		}
	}
	,displayElementsIfExistByPositions: function(positions) {
		var _g = 0;
		while(_g < positions.length) {
			var position = positions[_g];
			++_g;
			this.createElementsIfExistAt(position);
		}
	}
	,removeElementsIfExistByPositions: function(positions) {
		var _g = 0;
		while(_g < positions.length) {
			var position = positions[_g];
			++_g;
			this.removeElementsIfExistAt(position);
		}
	}
	,createElementsIfExistAt: function(position) {
		var _g = 0;
		var _g1 = this.elementsTypeToDisplay;
		while(_g < _g1.length) {
			var elementType = _g1[_g];
			++_g;
			this.createNewElementIfExistByTypeAt(position,elementType);
		}
	}
	,removeElementsIfExistAt: function(position) {
		var modelToRemove;
		var _g = 0;
		var _g1 = this.elementsTypeToDisplay;
		while(_g < _g1.length) {
			var elementType = _g1[_g];
			++_g;
			modelToRemove = com_isartdigital_builder_game_map_GMap.getElementByTypeAt(position,elementType);
			if(modelToRemove == null) return;
			if(com_isartdigital_builder_game_map_GMap.isModelElementOriginInGlobalMapAt(position,elementType)) this.removeSpriteObjectByModel(modelToRemove);
		}
	}
	,createNewElementIfExistByTypeAt: function(position,type) {
		var modelToInit;
		var modelClassType;
		var modelClass;
		modelToInit = com_isartdigital_builder_game_map_GMap.getElementByTypeAt(position,type);
		if(modelToInit == null) return;
		if(!com_isartdigital_builder_game_map_GMap.isModelElementOriginInGlobalMapAt(position,type)) modelToInit = com_isartdigital_builder_game_map_GMap.getElementByTypeAt(new PIXI.Point(modelToInit.x,modelToInit.y),type);
		if(modelToInit.reference == null) {
			modelClassType = com_isartdigital_builder_game_sprites_SpriteObject.getSpriteObjectByName(type);
			modelClass = com_isartdigital_builder_game_pooling_PoolObject.create(modelClassType);
			modelClass.init(modelToInit);
			modelToInit.reference = modelClass;
			this.clippedModels.push(modelToInit);
		}
	}
	,removeSpriteObjectByModel: function(model) {
		if(model.reference != null) {
			this.clippedModels.splice((function($this) {
				var $r;
				var x = model;
				$r = HxOverrides.indexOf($this.clippedModels,x,0);
				return $r;
			}(this)),1);
			model.reference.remove();
			model.reference = null;
		}
	}
	,updateCameraOffsetByLineToClip: function() {
		var lineToClip = this.getLineToClipCountTruncated();
		this.cameraPositionSinceLastClip.x += _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileWidth) * lineToClip.x;
		this.cameraPositionSinceLastClip.y += _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight) * lineToClip.y;
	}
	,getLineToClipCountTruncated: function() {
		var lineToClip = this.getLineToClipCount();
		var lineToClipTruncated = new PIXI.Point(lineToClip.x > 0?Math.floor(lineToClip.x):Math.ceil(lineToClip.x),lineToClip.y > 0?Math.floor(lineToClip.y):Math.ceil(lineToClip.y));
		return lineToClipTruncated;
	}
	,getLineToClipCount: function() {
		var lastCameraOffset = this.getCameraOffsetByLastCameraPositionSinceLastClip();
		var lineToClip = new PIXI.Point(lastCameraOffset.x / _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileWidth),lastCameraOffset.y / _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight));
		return lineToClip;
	}
	,getCameraOffsetByLastCameraPositionSinceLastClip: function() {
		var cameraFocus = com_isartdigital_utils_game_Camera.getInstance().cameraFocus;
		var offset = new PIXI.Point();
		offset.x = cameraFocus.x - this.cameraPositionSinceLastClip.x;
		offset.y = cameraFocus.y - this.cameraPositionSinceLastClip.y;
		return offset;
	}
	,__class__: com_isartdigital_builder_game_clipping_Clipping
};
var com_isartdigital_builder_game_clipping_ClippingGarbageCollector = function(clipping) {
	this.garbageCollectorCounter = 0;
	this.SCREEN_RECT_MARGE_COEF = 0;
	this.clipping = clipping;
	com_isartdigital_builder_Main.getInstance().on("gameLoop",$bind(this,this.increaseGarbageCollectorCounter));
};
$hxClasses["com.isartdigital.builder.game.clipping.ClippingGarbageCollector"] = com_isartdigital_builder_game_clipping_ClippingGarbageCollector;
com_isartdigital_builder_game_clipping_ClippingGarbageCollector.__name__ = ["com","isartdigital","builder","game","clipping","ClippingGarbageCollector"];
com_isartdigital_builder_game_clipping_ClippingGarbageCollector.prototype = {
	cleanNotClippedModelsOutsideOfScreen: function() {
		var notInsideScreenModels = this.getModelDisplayedOutsideOfTheMap();
		var modelInGlobalMap;
		var _g = 0;
		while(_g < notInsideScreenModels.length) {
			var notInsideScreenModel = notInsideScreenModels[_g];
			++_g;
			notInsideScreenModel.reference.remove();
			notInsideScreenModel.reference = null;
			this.clipping.clippedModels.splice((function($this) {
				var $r;
				var x = notInsideScreenModel;
				$r = HxOverrides.indexOf($this.clipping.clippedModels,x,0);
				return $r;
			}(this)),1);
		}
		this.garbageCollectorCounter = 0;
	}
	,canGarbage: function() {
		return this.garbageCollectorCounter > 60;
	}
	,getModelDisplayedOutsideOfTheMap: function() {
		var elements = [];
		var modelIsoPosition;
		var screenRect = com_isartdigital_builder_game_GameManager.getInstance().getScreenRect().clone();
		screenRect = com_isartdigital_builder_game_clipping_ClippingUtils.getScreenRectWithSafeMargeByCoefs(this.SCREEN_RECT_MARGE_COEF,304,304);
		var _g = 0;
		var _g1 = this.clipping.clippedModels;
		while(_g < _g1.length) {
			var clippedModel = _g1[_g];
			++_g;
			modelIsoPosition = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(new PIXI.Point(clippedModel.x,clippedModel.y));
			if(this.isElementIsOutsideOfTheScreen(modelIsoPosition,screenRect)) elements.push(clippedModel);
		}
		return elements;
	}
	,isElementIsOutsideOfTheScreen: function(clippedModel,screenRect) {
		return clippedModel.x < screenRect.x || clippedModel.x > screenRect.x + screenRect.width || clippedModel.y < screenRect.y || clippedModel.y > screenRect.y + screenRect.height;
	}
	,increaseGarbageCollectorCounter: function(e) {
		this.garbageCollectorCounter++;
	}
	,__class__: com_isartdigital_builder_game_clipping_ClippingGarbageCollector
};
var com_isartdigital_builder_game_clipping_ClippingUtils = function() {
};
$hxClasses["com.isartdigital.builder.game.clipping.ClippingUtils"] = com_isartdigital_builder_game_clipping_ClippingUtils;
com_isartdigital_builder_game_clipping_ClippingUtils.__name__ = ["com","isartdigital","builder","game","clipping","ClippingUtils"];
com_isartdigital_builder_game_clipping_ClippingUtils.debugClipping = function(line,offset) {
	if(offset == null) offset = 0;
	var models = com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(line,offset);
	var _g1 = 0;
	var _g = models.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(com_isartdigital_builder_game_sprites_Tile.getTileAt(models[i]) != null) com_isartdigital_builder_game_sprites_Tile.getTileAt(models[i]).alpha = 1;
	}
};
com_isartdigital_builder_game_clipping_ClippingUtils.getAllModelsInScreen = function() {
	com_isartdigital_builder_game_clipping_ClippingUtils.updateScreenRect();
	var lineCount = com_isartdigital_builder_game_clipping_ClippingUtils.getModelCountFor(com_isartdigital_builder_game_clipping_ClippingUtils.LEFT);
	return com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf(com_isartdigital_builder_game_clipping_ClippingUtils.TOP,-lineCount);
};
com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetForBunchOf = function(line,offset) {
	if(offset == null) offset = 0;
	com_isartdigital_builder_game_clipping_ClippingUtils.updateScreenRect();
	var modelsPosition = com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetFor(line,0);
	var index;
	var _g1 = 1;
	var _g = Std["int"](Math.abs(offset));
	while(_g1 < _g) {
		var i = _g1++;
		if(offset < 0) index = i * -1; else index = i;
		modelsPosition = modelsPosition.concat(com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetFor(line,index));
	}
	return modelsPosition;
};
com_isartdigital_builder_game_clipping_ClippingUtils.getScreenRectWithSafeMargeByCoefs = function(safeMargeCoef,safeMargeDown,safeMargeRight) {
	var screenRect = com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.clone();
	var safeMarge = new PIXI.Point(screenRect.width * safeMargeCoef,screenRect.height * safeMargeCoef);
	screenRect.x -= safeMarge.x;
	screenRect.y -= safeMarge.y;
	screenRect.width += safeMarge.x * 2;
	screenRect.height += safeMarge.y * 2;
	screenRect.width += safeMargeRight;
	screenRect.height += safeMargeDown;
	return screenRect;
};
com_isartdigital_builder_game_clipping_ClippingUtils.getModelsPositionWithOffsetFor = function(line,offset) {
	if(offset == null) offset = 0;
	var line1 = line.clone();
	var modelsPosition = [];
	var tilePosition;
	var linePerpendicular = com_isartdigital_builder_game_clipping_ClippingUtils.perpendicular(line1);
	var modelCount = com_isartdigital_builder_game_clipping_ClippingUtils.getModelCountFor(line1);
	var perpendicularOffset = com_isartdigital_builder_game_clipping_ClippingUtils.getModelCountFor(linePerpendicular);
	var index;
	var verticalSeparationCoef;
	var horizontalSeparationCoef;
	if(com_isartdigital_builder_game_clipping_ClippingUtils.isAtOtherEdgeOfScreenFor(line1)) offset += perpendicularOffset; else offset *= -1;
	if(line1.x == -1) offset += perpendicularOffset; else offset += 0;
	com_isartdigital_builder_game_clipping_ClippingUtils.transformNegativeToZeroFor(line1);
	com_isartdigital_builder_game_clipping_ClippingUtils.transformNegativeToZeroFor(linePerpendicular);
	verticalSeparationCoef = line1.x + 1 | 0;
	horizontalSeparationCoef = line1.y + 1 | 0;
	var _g1 = 0;
	var _g = modelCount * verticalSeparationCoef + 2 | 0;
	while(_g1 < _g) {
		var i = _g1++;
		index = i / verticalSeparationCoef;
		tilePosition = new PIXI.Point(com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.x + _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileWidth) * index * line1.x + _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileWidth) * (offset / horizontalSeparationCoef) * linePerpendicular.x,com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.y + _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight) * index * line1.y + _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight) * (offset / horizontalSeparationCoef) * linePerpendicular.y);
		modelsPosition.push(com_isartdigital_utils_game_iso_IsoManager.isoToModelView(tilePosition));
	}
	return modelsPosition;
};
com_isartdigital_builder_game_clipping_ClippingUtils.updateScreenRect = function() {
	com_isartdigital_builder_game_clipping_ClippingUtils.screenRect = com_isartdigital_builder_game_GameManager.getInstance().getScreenRect().clone();
	com_isartdigital_builder_game_clipping_ClippingUtils.screenRect = com_isartdigital_builder_game_clipping_ClippingUtils.getScreenRectWithSafeMargeByCoefs(0.05,304,304);
	com_isartdigital_builder_game_clipping_ClippingUtils.truncateScreenRectByTileLength();
};
com_isartdigital_builder_game_clipping_ClippingUtils.truncateScreenRectByTileLength = function() {
	com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.x = com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.x / _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileWidth);
	com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.y = com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.y / _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight);
	com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.x = Math.floor(com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.x);
	com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.y = Math.floor(com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.y);
	com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.x = _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileWidth) * com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.x;
	com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.y = _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight) * com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.y;
};
com_isartdigital_builder_game_clipping_ClippingUtils.perpendicular = function(line) {
	var lineCloned = line.clone();
	lineCloned.x = line.y;
	lineCloned.y = line.x;
	return lineCloned;
};
com_isartdigital_builder_game_clipping_ClippingUtils.getModelCountFor = function(line) {
	var line1 = line.clone();
	if(line1.x == -1) line1.x = 0; else line1.x = line1.x;
	if(line1.y == -1) line1.y = 0; else line1.y = line1.y;
	var modelCount = Math.round(com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.width / _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileWidth) * line1.x + com_isartdigital_builder_game_clipping_ClippingUtils.screenRect.height / _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight) * line1.y);
	return Std["int"](Math.abs(modelCount));
};
com_isartdigital_builder_game_clipping_ClippingUtils.isAtOtherEdgeOfScreenFor = function(line) {
	return line.x == -1 || line.y == -1;
};
com_isartdigital_builder_game_clipping_ClippingUtils.transformNegativeToZeroFor = function(point) {
	if(point.x < 0) point.x = 0; else point.x = point.x;
	if(point.y < 0) point.y = 0; else point.y = point.y;
};
com_isartdigital_builder_game_clipping_ClippingUtils.prototype = {
	__class__: com_isartdigital_builder_game_clipping_ClippingUtils
};
var com_isartdigital_builder_game_ftue_Ftue = function(ftueContainer) {
	this.step = 0;
	this.isParadeStepDone = false;
	var _g = this;
	this.ftueContainer = ftueContainer;
	if(js_Browser.getLocalStorage().getItem("FTUE_STEP") != null) this.step = Std.parseInt(js_Browser.getLocalStorage().getItem("FTUE_STEP")) + 1; else this.step = 0;
	if(!com_isartdigital_services_Users.infos.ftue_complet) this.goToStep(this.step);
	com_isartdigital_builder_game_ftue_Ftue.event.once("BAR_UPGRADED",function() {
		if(_g.step > 15) com_isartdigital_builder_api_Api.user.dailyrewardUpdate(($_=com_isartdigital_builder_game_GameManager.getInstance(),$bind($_,$_.getDailyReward)));
	});
};
$hxClasses["com.isartdigital.builder.game.ftue.Ftue"] = com_isartdigital_builder_game_ftue_Ftue;
com_isartdigital_builder_game_ftue_Ftue.__name__ = ["com","isartdigital","builder","game","ftue","Ftue"];
com_isartdigital_builder_game_ftue_Ftue.prototype = {
	getCurrentStep: function() {
		return this.step;
	}
	,goToStep: function(number) {
		var stepConfig = com_isartdigital_builder_game_utils_Metadatas.ftue[number];
		this.eventToCatch = stepConfig.event;
		this.ftueUI = com_isartdigital_builder_ui_ftue_FtueUIBuilder.create().withContainerToAttach(this.ftueContainer).withTextToDisplay(stepConfig.textLabel).withTutorPosture(stepConfig.tutorPosture).withStartSide(stepConfig.startSide).withEndSide(stepConfig.endSide).withSideApparition(stepConfig.sideApparition).withTimeToAppear(stepConfig.timeToAppear).withTimeToDesappear(stepConfig.timeToDesappear).withConfirmButton(stepConfig.confirmButton).withEventNameToCatchForDestroying(stepConfig.event).withStepSavingOnDestroy(stepConfig.saveStep).withLastPageDisplayingCallback(this.showArrowAndMoveCamera(stepConfig)).withDestroyCallback($bind(this,this.goToNextStep)).build();
		this.ftueUI.show();
	}
	,showArrowAndMoveCamera: function(ftueStep) {
		var _g = this;
		return function() {
			if(ftueStep.camera != null) com_isartdigital_builder_game_ftue_FtueCamera.moveCameraTo(ftueStep.camera.target,ftueStep.camera.delayBeforeMoving);
			if(ftueStep.arrow != null) {
				_g.arrow = new com_isartdigital_builder_ui_ftue_Arrow();
				haxe_Timer.delay(function() {
					if(_g.arrow != null) _g.arrow.attachTo(com_isartdigital_builder_game_ftue_FtueUtils.getInstanceOf(ftueStep.arrow));
				},500);
			}
		};
	}
	,goToNextStep: function() {
		if(this.arrow != null) {
			this.arrow.destroyWithFeedBack();
			this.arrow = null;
		}
		this.step++;
		if(this.isFtueComplet()) this.sendFtueCompletToServer(); else this.goToStep(this.step);
	}
	,isFtueComplet: function() {
		return this.step >= 27;
	}
	,sendFtueCompletToServer: function() {
		com_isartdigital_builder_api_Api.user.ftueComplet(com_isartdigital_builder_api_ApiUtils.handleError);
	}
	,__class__: com_isartdigital_builder_game_ftue_Ftue
};
var com_isartdigital_builder_game_ftue_FtueCamera = function() {
};
$hxClasses["com.isartdigital.builder.game.ftue.FtueCamera"] = com_isartdigital_builder_game_ftue_FtueCamera;
com_isartdigital_builder_game_ftue_FtueCamera.__name__ = ["com","isartdigital","builder","game","ftue","FtueCamera"];
com_isartdigital_builder_game_ftue_FtueCamera.moveCameraTo = function(target,timeBeforeMoving) {
	haxe_Timer.delay(function() {
		com_isartdigital_builder_game_ftue_FtueCamera.startMovingCameraTo(com_isartdigital_builder_game_ftue_FtueUtils.getInstanceOf(target));
	},timeBeforeMoving);
};
com_isartdigital_builder_game_ftue_FtueCamera.startMovingCameraTo = function(target) {
	if(target == null) return;
	motion_Actuate.tween(com_isartdigital_utils_game_Camera.getInstance().cameraFocus.position,2,{ x : target.x, y : target.y - target.getLocalBounds().height}).ease(motion_easing_Cubic.get_easeInOut());
};
com_isartdigital_builder_game_ftue_FtueCamera.prototype = {
	__class__: com_isartdigital_builder_game_ftue_FtueCamera
};
var com_isartdigital_builder_game_ftue_FtueEvents = function() { };
$hxClasses["com.isartdigital.builder.game.ftue.FtueEvents"] = com_isartdigital_builder_game_ftue_FtueEvents;
com_isartdigital_builder_game_ftue_FtueEvents.__name__ = ["com","isartdigital","builder","game","ftue","FtueEvents"];
var com_isartdigital_builder_game_ftue_FtueObserver = function() {
	this.subscribeEvents();
};
$hxClasses["com.isartdigital.builder.game.ftue.FtueObserver"] = com_isartdigital_builder_game_ftue_FtueObserver;
com_isartdigital_builder_game_ftue_FtueObserver.__name__ = ["com","isartdigital","builder","game","ftue","FtueObserver"];
com_isartdigital_builder_game_ftue_FtueObserver.prototype = {
	destroy: function() {
		this.unsubscribeEvents();
	}
	,subscribeEvents: function() {
		com_isartdigital_builder_game_ftue_Ftue.event.on("BUILDING_BOUGHT",$bind(this,this.onBuildingBought));
		com_isartdigital_builder_game_ftue_Ftue.event.on("BUILDING_UPGRADED",$bind(this,this.onBuildingUpgraded));
		com_isartdigital_builder_game_ftue_Ftue.event.on("BUILDING_PLACED",$bind(this,this.onBuildingPlaced));
		com_isartdigital_builder_game_ftue_Ftue.event.on("BUILDING_SELECTED",$bind(this,this.onBuildingSelected));
	}
	,unsubscribeEvents: function() {
		com_isartdigital_builder_game_ftue_Ftue.event.off("BUILDING_BOUGHT",$bind(this,this.onBuildingBought));
		com_isartdigital_builder_game_ftue_Ftue.event.off("BUILDING_UPGRADED",$bind(this,this.onBuildingUpgraded));
		com_isartdigital_builder_game_ftue_Ftue.event.off("BUILDING_PLACED",$bind(this,this.onBuildingPlaced));
		com_isartdigital_builder_game_ftue_Ftue.event.off("BUILDING_SELECTED",$bind(this,this.onBuildingSelected));
	}
	,onBuildingBought: function(parameters) {
		if(parameters.buildingName == "bar") com_isartdigital_builder_game_ftue_Ftue.event.emit("BAR_BOUGHT");
		if(parameters.buildingName == "house") com_isartdigital_builder_game_ftue_Ftue.event.emit("HOUSE_BOUGHT");
		if(parameters.buildingName == "lanterns") com_isartdigital_builder_game_ftue_Ftue.event.emit("LANTERN_BOUGHT");
	}
	,onBuildingUpgraded: function(parameters) {
		if(parameters.buildingName == "city_hall") com_isartdigital_builder_game_ftue_Ftue.event.emit("CITYHALL_UPGRADE");
		if(parameters.buildingName == "bar") com_isartdigital_builder_game_ftue_Ftue.event.emit("BAR_UPGRADED");
	}
	,onBuildingPlaced: function(parameters) {
		if(parameters.buildingName == "bar") com_isartdigital_builder_game_ftue_Ftue.event.emit("BAR_PLACED");
		if(parameters.buildingName == "house") com_isartdigital_builder_game_ftue_Ftue.event.emit("HOUSE_PLACED");
	}
	,onBuildingSelected: function(parameters) {
		if(parameters.buildingName == "city_hall") com_isartdigital_builder_game_ftue_Ftue.event.emit("CITYHALL_SELECT");
	}
	,__class__: com_isartdigital_builder_game_ftue_FtueObserver
};
var com_isartdigital_builder_game_ftue_FtueUtils = function() { };
$hxClasses["com.isartdigital.builder.game.ftue.FtueUtils"] = com_isartdigital_builder_game_ftue_FtueUtils;
com_isartdigital_builder_game_ftue_FtueUtils.__name__ = ["com","isartdigital","builder","game","ftue","FtueUtils"];
com_isartdigital_builder_game_ftue_FtueUtils.getInstanceOf = function(target) {
	var instance;
	switch(target) {
	case "CITY_HALL":
		instance = com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getBuildingsModel("city_hall")[0].reference;
		break;
	case "BAR":
		instance = com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getBuildingsModel("bar")[0].reference;
		break;
	case "LANTERN":
		instance = com_isartdigital_builder_game_ftue_FtueUtils.getLanternInstance();
		break;
	case "SHOP_BUTTON":
		instance = com_isartdigital_builder_ui_hud_Hud.getInstance().getShopButton();
		break;
	case "SHOP_BUY_SOFT_BUTTON_LEFT":
		instance = (js_Boot.__cast((js_Boot.__cast(com_isartdigital_builder_ui_UIManager.getInstance().getPopins()[0] , com_isartdigital_builder_ui_popin_Shop)).getBuildingShop().getLeftItemBuilding() , com_isartdigital_builder_ui_items_ItemBuilding)).getSoftButton();
		break;
	case "SHOP_BUY_SOFT_BUTTON_RIGHT":
		instance = (js_Boot.__cast((js_Boot.__cast(com_isartdigital_builder_ui_UIManager.getInstance().getPopins()[0] , com_isartdigital_builder_ui_popin_Shop)).getBuildingShop().getRightItem() , com_isartdigital_builder_ui_items_ItemBuilding)).getSoftButton();
		break;
	case "PARADE_BUTTON":
		instance = com_isartdigital_builder_ui_hud_Hud.getInstance().getParadeButton();
		break;
	case "PARADE_BUY_SOFT_BUTTON":
		instance = (js_Boot.__cast(com_isartdigital_builder_ui_UIManager.getInstance().getPopins()[0] , com_isartdigital_builder_ui_popin_ParadeConfirm)).getSoftButton();
		break;
	case "BONUS_PARADE":
		instance = com_isartdigital_builder_game_parade_BonusParade.list[0];
		break;
	case "UPGRADE_BUTTON":
		instance = com_isartdigital_builder_ui_hud_BaseBuildingHUD.getInstance().upgradeButton;
		break;
	case "HARD_BUILD_BUTTON":
		instance = com_isartdigital_builder_ui_hud_BaseBuildingHUD.getInstance().hardBuildButton;
		break;
	default:
		throw new js__$Boot_HaxeError("FtueUtils getInstanceOf : target has wrong value");
		instance = null;
	}
	return instance;
};
com_isartdigital_builder_game_ftue_FtueUtils.getLanternInstance = function() {
	return js_Boot.__cast(com_isartdigital_builder_game_map_GMap.getElementByTypeAt(new PIXI.Point(51,59),"building").reference , PIXI.DisplayObject);
};
var com_isartdigital_builder_game_manager_BackgroundManager = function() {
	this.list = [];
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
var com_isartdigital_builder_game_manager_Manager = function() {
	EventEmitter.call(this);
};
$hxClasses["com.isartdigital.builder.game.manager.Manager"] = com_isartdigital_builder_game_manager_Manager;
com_isartdigital_builder_game_manager_Manager.__name__ = ["com","isartdigital","builder","game","manager","Manager"];
com_isartdigital_builder_game_manager_Manager.getInstance = function() {
	if(com_isartdigital_builder_game_manager_Manager.instance == null) com_isartdigital_builder_game_manager_Manager.instance = new com_isartdigital_builder_game_manager_Manager();
	return com_isartdigital_builder_game_manager_Manager.instance;
};
com_isartdigital_builder_game_manager_Manager.__super__ = EventEmitter;
com_isartdigital_builder_game_manager_Manager.prototype = $extend(EventEmitter.prototype,{
	destroy: function() {
		com_isartdigital_builder_game_manager_Manager.instance = null;
	}
	,__class__: com_isartdigital_builder_game_manager_Manager
});
var com_isartdigital_builder_game_manager_ExperienceManager = function() {
	this.levelsArray = [];
	com_isartdigital_builder_game_manager_Manager.call(this);
	this.subscribeUpdateEvent();
};
$hxClasses["com.isartdigital.builder.game.manager.ExperienceManager"] = com_isartdigital_builder_game_manager_ExperienceManager;
com_isartdigital_builder_game_manager_ExperienceManager.__name__ = ["com","isartdigital","builder","game","manager","ExperienceManager"];
com_isartdigital_builder_game_manager_ExperienceManager.getInstance = function() {
	if(com_isartdigital_builder_game_manager_ExperienceManager.instance == null) com_isartdigital_builder_game_manager_ExperienceManager.instance = new com_isartdigital_builder_game_manager_ExperienceManager();
	return com_isartdigital_builder_game_manager_ExperienceManager.instance;
};
com_isartdigital_builder_game_manager_ExperienceManager.__super__ = com_isartdigital_builder_game_manager_Manager;
com_isartdigital_builder_game_manager_ExperienceManager.prototype = $extend(com_isartdigital_builder_game_manager_Manager.prototype,{
	getLvlUser: function() {
		return this.lvlUser + 1;
	}
	,subscribeUpdateEvent: function() {
		this.on(com_isartdigital_builder_game_manager_ExperienceManager.UPDATE_REQUEST_EXPERIENCE_VALUE,$bind(this,this.updateLevelAndXp));
	}
	,start: function() {
		this.setLevelsArrayFromSettings();
		this.updateLevelAndXp();
	}
	,setLevelsArrayFromSettings: function() {
		var settings = com_isartdigital_utils_loader_GameLoader.getContent("json/XP.json");
		this.levelsArray = Reflect.field(settings,"levels");
	}
	,updateLevelAndXp: function(params) {
		var lXpTotalUsers = Math.round(com_isartdigital_services_Users.infos.experience);
		var _g1 = 0;
		var _g = this.levelsArray.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(lXpTotalUsers < this.levelsArray[i]) {
				if(this.lvlUser < i) {
					com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_LEVELREWARD");
					com_isartdigital_utils_facebook_Facebook.shareOnWall({ message : "Je suis monté niveau " + i + " sur Fiesta Ultima ! :D", link : "https://apps.facebook.com/builderisart"});
				}
				this.lvlUser = i;
				this.progressInCurrentLvl = 100 - ((this.levelsArray[i] - lXpTotalUsers) * 100 / (this.levelsArray[i + 1] - this.levelsArray[i]) | 0);
				break;
			}
		}
		this.emitEventToUpdateHud();
	}
	,emitEventToUpdateHud: function() {
		com_isartdigital_builder_ui_hud_Hud.getInstance().emit("UPDATE_REQUEST_LVL",this.lvlUser);
		com_isartdigital_builder_ui_hud_Hud.getInstance().emit("UPDATE_REQUEST_XP",this.progressInCurrentLvl);
	}
	,destroy: function() {
		com_isartdigital_builder_game_manager_ExperienceManager.instance = null;
	}
	,__class__: com_isartdigital_builder_game_manager_ExperienceManager
});
var com_isartdigital_utils_lib_pathfinder_IMap = function() { };
$hxClasses["com.isartdigital.utils.lib.pathfinder.IMap"] = com_isartdigital_utils_lib_pathfinder_IMap;
com_isartdigital_utils_lib_pathfinder_IMap.__name__ = ["com","isartdigital","utils","lib","pathfinder","IMap"];
com_isartdigital_utils_lib_pathfinder_IMap.prototype = {
	__class__: com_isartdigital_utils_lib_pathfinder_IMap
};
var com_isartdigital_builder_game_manager_Maps = function(p_cols,p_rows) {
	this.cols = p_cols;
	this.rows = p_rows;
};
$hxClasses["com.isartdigital.builder.game.manager.Maps"] = com_isartdigital_builder_game_manager_Maps;
com_isartdigital_builder_game_manager_Maps.__name__ = ["com","isartdigital","builder","game","manager","Maps"];
com_isartdigital_builder_game_manager_Maps.__interfaces__ = [com_isartdigital_utils_lib_pathfinder_IMap];
com_isartdigital_builder_game_manager_Maps.prototype = {
	isWalkable: function(p_x,p_y) {
		if(!com_isartdigital_builder_game_GameManager.pathfindingWithObstacle) return true;
		return com_isartdigital_builder_game_map_GMap.getElementByTypeAt(new PIXI.Point(p_x,p_y),"tile").isBuildable;
	}
	,__class__: com_isartdigital_builder_game_manager_Maps
};
var com_isartdigital_builder_game_manager_RessourceManager = function() {
	com_isartdigital_builder_game_manager_Manager.call(this);
	this.subscribeEvents();
};
$hxClasses["com.isartdigital.builder.game.manager.RessourceManager"] = com_isartdigital_builder_game_manager_RessourceManager;
com_isartdigital_builder_game_manager_RessourceManager.__name__ = ["com","isartdigital","builder","game","manager","RessourceManager"];
com_isartdigital_builder_game_manager_RessourceManager.getInstance = function() {
	if(com_isartdigital_builder_game_manager_RessourceManager.instance == null) com_isartdigital_builder_game_manager_RessourceManager.instance = new com_isartdigital_builder_game_manager_RessourceManager();
	return com_isartdigital_builder_game_manager_RessourceManager.instance;
};
com_isartdigital_builder_game_manager_RessourceManager.__super__ = com_isartdigital_builder_game_manager_Manager;
com_isartdigital_builder_game_manager_RessourceManager.prototype = $extend(com_isartdigital_builder_game_manager_Manager.prototype,{
	subscribeEvents: function() {
		this.on("UPDATE_REQUEST_GOLD_VALUE",$bind(this,this.onUpdateGold));
		this.on("UPDATE_REQUEST_OFFERING_VALUE",$bind(this,this.onUpdateOffering));
		this.on("UPDATE_REQUEST_SPICE_VALUE",$bind(this,this.onUpdateSpice));
	}
	,onUpdateSpice: function(params) {
		this.ressources.spice = com_isartdigital_services_Users.infos.resources.spice;
		com_isartdigital_builder_ui_hud_Hud.getInstance().emit("UPDATE_PIMIENTOS_TEXT",this.ressources.spice);
	}
	,onUpdateOffering: function(params) {
		this.ressources.offering = com_isartdigital_services_Users.infos.resources.offering;
		com_isartdigital_builder_ui_hud_Hud.getInstance().emit("UPDATE_OFFERING_TEXT",this.ressources.offering);
	}
	,onUpdateGold: function(params) {
		this.ressources.gold = com_isartdigital_services_Users.infos.resources.gold;
		com_isartdigital_builder_ui_hud_Hud.getInstance().emit("UPDATE_GOLD_TEXT",this.ressources.gold);
	}
	,start: function() {
		this.ressources = com_isartdigital_services_Users.infos.resources;
		this.updateRessourcesInHud(this.ressources);
	}
	,getRessources: function(pRessource) {
		return Reflect.field(this.ressources,pRessource);
	}
	,addRessources: function(pRessource,number) {
		Reflect.setField(this.ressources,pRessource,Std["int"](Std["int"](this.getRessources(pRessource)) + (number | 0)));
		this.updateRessourcesInHud(this.ressources);
	}
	,removeRessources: function(pRessource,pNumber) {
		if(this.getRessources(pRessource) - pNumber >= 0) Reflect.setField(this.ressources,pRessource,this.getRessources(pRessource) - pNumber); else return false;
		this.updateRessourcesInHud(this.ressources);
		return true;
	}
	,updateRessourcesInHud: function(lResource) {
		this.ressources = lResource;
		com_isartdigital_builder_ui_hud_Hud.getInstance().emit("UPDATE_PIMIENTOS_TEXT",this.ressources.spice);
		com_isartdigital_builder_ui_hud_Hud.getInstance().emit("UPDATE_GOLD_TEXT",this.ressources.gold);
		com_isartdigital_builder_ui_hud_Hud.getInstance().emit("UPDATE_OFFERING_TEXT",this.ressources.offering);
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
	if(map.h.hasOwnProperty(position.y | 0)) {
		if((function($this) {
			var $r;
			var this1 = map.h[position.y | 0];
			$r = this1.exists(position.x | 0);
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
	if(!com_isartdigital_builder_game_map_GMap.isInsideGrid(position.x | 0,position.y | 0)) return null;
	var elements;
	var this1 = com_isartdigital_builder_game_map_GMap.globalMap.h[position.x | 0];
	elements = this1.get(position.y | 0);
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
	return null;
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
com_isartdigital_builder_game_map_GMap.getTilePositionAtScreenCenter = function() {
	var screenRect = com_isartdigital_builder_game_GameManager.getInstance().getScreenRect();
	var screenCenterIso = new PIXI.Point(screenRect.x + screenRect.width / 2,screenRect.y + screenRect.height / 2);
	return com_isartdigital_utils_game_iso_IsoManager.isoToModelView(screenCenterIso);
};
com_isartdigital_builder_game_map_GMap.isModelElementOriginInGlobalMapAt = function(position,elementType) {
	var element = com_isartdigital_builder_game_map_GMap.getElementByTypeAt(position,elementType);
	return Std["int"](element.x) == (position.x | 0) && Std["int"](element.y) == (position.y | 0);
};
com_isartdigital_builder_game_map_GMap.isInsideGrid = function(pX,pY) {
	if(pX >= 0 && pY >= 0 && _$UInt_UInt_$Impl_$.gt(com_isartdigital_utils_Config.mapSize,pX) && _$UInt_UInt_$Impl_$.gt(com_isartdigital_utils_Config.mapSize,pY)) return true;
	return false;
};
com_isartdigital_builder_game_map_GMap.isNotInsideGrid = function(pX,pY) {
	return !com_isartdigital_builder_game_map_GMap.isInsideGrid(pX,pY);
};
com_isartdigital_builder_game_map_GMap.getRandomAvailablePosition = function() {
	var availableTiles = com_isartdigital_builder_game_sprites_Tile.getBuildableTiles();
	var availableTile = availableTiles[Math.floor(Math.random() * availableTiles.length)];
	return new PIXI.Point(availableTile.x,availableTile.y);
};
com_isartdigital_builder_game_map_GMap.displayTilePositionUnderMouse = function() {
	var lPosition = com_isartdigital_utils_game_iso_IsoManager.isoToModelView(com_isartdigital_builder_game_GameManager.getInstance().mousePosition);
	if(Math.floor(Math.random() * 10) == 0) haxe_Log.trace("x : " + lPosition.x + " y : " + lPosition.y,{ fileName : "GMap.hx", lineNumber : 234, className : "com.isartdigital.builder.game.map.GMap", methodName : "displayTilePositionUnderMouse"});
};
var com_isartdigital_builder_game_map_GMapCreator = function() { };
$hxClasses["com.isartdigital.builder.game.map.GMapCreator"] = com_isartdigital_builder_game_map_GMapCreator;
com_isartdigital_builder_game_map_GMapCreator.__name__ = ["com","isartdigital","builder","game","map","GMapCreator"];
com_isartdigital_builder_game_map_GMapCreator.create = function() {
	com_isartdigital_builder_game_map_GMapCreatorBackground.insertBackgroundsInto(com_isartdigital_builder_game_map_GMap.globalMap);
	com_isartdigital_builder_game_map_GMapCreator.insertTilesInto(com_isartdigital_builder_game_map_GMap.globalMap);
	com_isartdigital_builder_game_map_GMapCreator.insertLanternsInto(com_isartdigital_builder_game_map_GMap.globalMap);
	com_isartdigital_builder_game_map_GMapCreator.illuminateLanterns();
	com_isartdigital_builder_game_map_GMapCreator.insertBuildingsInto(com_isartdigital_builder_game_map_GMap.globalMap);
};
com_isartdigital_builder_game_map_GMapCreator.insertTilesInto = function(map) {
	var tilePosition;
	var tileModel;
	var _g1 = 0;
	var _g = com_isartdigital_utils_Config.mapSize;
	while(_g1 < _g) {
		var i = _g1++;
		var _g3 = 0;
		var _g2 = com_isartdigital_utils_Config.mapSize;
		while(_g3 < _g2) {
			var j = _g3++;
			tileModel = { type : "tile", x : i, y : j, isBuildable : false, isIlluminated : false, alpha : 1};
			if(!com_isartdigital_builder_game_map_GMap.isPositionExistAt(new PIXI.Point(j,i),map)) {
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
			}(this))).push(tileModel);
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
		if(buildingModel.lvl == null) buildingModel.lvl = 0; else buildingModel.lvl = buildingModel.lvl - 1;
		buildingModel.x = buildingModel.x | 0;
		buildingModel.y = buildingModel.y | 0;
		if(com_isartdigital_builder_game_map_GMap.isPositionExistAt(new PIXI.Point(buildingModel.x,buildingModel.y),map)) {
			com_isartdigital_builder_game_sprites_citizen_Citizen.createCitizenAtRandomPosition();
			com_isartdigital_builder_game_sprites_buildings_Building.buildingsModel.push(buildingModel);
			com_isartdigital_builder_game_map_GMap.addElementsBySizeAt(new PIXI.Point(buildingModel.x,buildingModel.y),buildingDef.size,buildingModel);
		}
	}
	com_isartdigital_builder_game_sprites_citizen_Citizen.showAllPassiveCitizens();
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
		if(com_isartdigital_builder_game_map_GMapCreator.isLanternActiveAt(lanternPosition)) buildingModel.lvl = 1; else buildingModel.lvl = 0;
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
var com_isartdigital_builder_game_map_GMapCreatorBackground = function() {
};
$hxClasses["com.isartdigital.builder.game.map.GMapCreatorBackground"] = com_isartdigital_builder_game_map_GMapCreatorBackground;
com_isartdigital_builder_game_map_GMapCreatorBackground.__name__ = ["com","isartdigital","builder","game","map","GMapCreatorBackground"];
com_isartdigital_builder_game_map_GMapCreatorBackground.insertBackgroundsInto = function(map) {
	var backgroundModel;
	var _g1 = 0;
	var _g = com_isartdigital_utils_Config.mapSize;
	while(_g1 < _g) {
		var y = _g1++;
		var _g3 = 0;
		var _g2 = com_isartdigital_utils_Config.mapSize;
		while(_g3 < _g2) {
			var x = _g3++;
			if(com_isartdigital_builder_game_map_GMapCreatorBackground.canAddBackgroundAt(new PIXI.Point(x,y))) {
				backgroundModel = { type : "background", x : x | 0, y : y | 0};
				if(!com_isartdigital_builder_game_map_GMap.isPositionExistAt(new PIXI.Point(x,y),map)) {
					if(!map.h.hasOwnProperty(y)) {
						var v = new haxe_ds_IntMap();
						map.h[y] = v;
						v;
					}
					var this1 = map.h[y];
					var v1 = [];
					this1.set(x,v1);
					v1;
				}
				((function($this) {
					var $r;
					var this2 = map.h[y];
					$r = this2.get(x);
					return $r;
				}(this))).push(backgroundModel);
			}
		}
	}
};
com_isartdigital_builder_game_map_GMapCreatorBackground.canAddBackgroundAt = function(position) {
	return (position.x | 0) % 3 == 0 && (position.y | 0) % 3 == 0;
};
com_isartdigital_builder_game_map_GMapCreatorBackground.prototype = {
	__class__: com_isartdigital_builder_game_map_GMapCreatorBackground
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
	changeAsset: function(pAssetName,pState) {
		if(pState == null) pState = "";
		this.cleanAnim();
		this.assetName = pAssetName;
	}
	,positionToModel: function(pFloor) {
		if(pFloor == null) pFloor = false;
		var positionIndex = com_isartdigital_utils_game_iso_IsoManager.isoToModelView(new PIXI.Point(this.x,this.y));
		if(pFloor) {
			positionIndex.x = Math.floor(positionIndex.x);
			positionIndex.y = Math.floor(positionIndex.y);
		}
		return positionIndex;
	}
	,getAnim: function() {
		return this.anim;
	}
	,getFlumpMovie: function() {
		return js_Boot.__cast(this.anim , pixi_display_FlumpMovie);
	}
	,setState: function(pState,pLoop,pAutoPlay,pStart) {
		if(pStart == null) pStart = 0;
		if(pAutoPlay == null) pAutoPlay = true;
		if(pLoop == null) pLoop = false;
		if(this.factory == null) throw new js__$Boot_HaxeError("StateGraphic :: propriété fabrique non définie");
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
	,setAnimEnd: function() {
		this.isAnimEnd = true;
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
var com_isartdigital_builder_game_pooling_IPoolObject = function() { };
$hxClasses["com.isartdigital.builder.game.pooling.IPoolObject"] = com_isartdigital_builder_game_pooling_IPoolObject;
com_isartdigital_builder_game_pooling_IPoolObject.__name__ = ["com","isartdigital","builder","game","pooling","IPoolObject"];
com_isartdigital_builder_game_pooling_IPoolObject.prototype = {
	__class__: com_isartdigital_builder_game_pooling_IPoolObject
};
var com_isartdigital_builder_game_sprites_SpriteObject = function() {
	com_isartdigital_utils_game_StateGraphic.call(this);
};
$hxClasses["com.isartdigital.builder.game.sprites.SpriteObject"] = com_isartdigital_builder_game_sprites_SpriteObject;
com_isartdigital_builder_game_sprites_SpriteObject.__name__ = ["com","isartdigital","builder","game","sprites","SpriteObject"];
com_isartdigital_builder_game_sprites_SpriteObject.__interfaces__ = [com_isartdigital_builder_game_pooling_IPoolObject];
com_isartdigital_builder_game_sprites_SpriteObject.getSpriteObjectByName = function(name) {
	switch(name) {
	case "building":
		return com_isartdigital_builder_game_sprites_buildings_Building;
	case "tile":
		return com_isartdigital_builder_game_sprites_Tile;
	case "background":
		return com_isartdigital_builder_game_sprites_Background;
	}
	throw new js__$Boot_HaxeError("SpriteObject name doesnt not exist");
};
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
var com_isartdigital_utils_game_iso_IZSortable = function() { };
$hxClasses["com.isartdigital.utils.game.iso.IZSortable"] = com_isartdigital_utils_game_iso_IZSortable;
com_isartdigital_utils_game_iso_IZSortable.__name__ = ["com","isartdigital","utils","game","iso","IZSortable"];
com_isartdigital_utils_game_iso_IZSortable.prototype = {
	__class__: com_isartdigital_utils_game_iso_IZSortable
};
var com_isartdigital_builder_game_parade_BonusParade = function(pSpawnValue,positionInModel,bonusGainValue) {
	this.animationDone = false;
	this.positionInModel = new PIXI.Point();
	this.type = "BONUS_PARADE";
	com_isartdigital_builder_game_sprites_SpriteObject.call(this);
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	this.assetName = this.setAssetName(pSpawnValue);
	this.modelWidth = 1;
	this.modelHeight = 1;
	this.setState(this.DEFAULT_STATE);
	this.boxType = com_isartdigital_utils_game_BoxType.NONE;
	this.positionInModel = positionInModel;
	this.position = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(positionInModel);
	this.position.y -= 30;
	this.bonusGainValue = bonusGainValue;
	com_isartdigital_builder_game_parade_BonusParade.list.push(this);
	this.alpha = 0;
	motion_Actuate.tween(this,Math.random() + 0.3,{ alpha : 1}).ease(motion_easing_Expo.get_easeIn());
	haxe_Timer.delay($bind(this,this.floatHoverGround),Std["int"](Math.random() * 500.));
};
$hxClasses["com.isartdigital.builder.game.parade.BonusParade"] = com_isartdigital_builder_game_parade_BonusParade;
com_isartdigital_builder_game_parade_BonusParade.__name__ = ["com","isartdigital","builder","game","parade","BonusParade"];
com_isartdigital_builder_game_parade_BonusParade.__interfaces__ = [com_isartdigital_utils_game_iso_IZSortable];
com_isartdigital_builder_game_parade_BonusParade.__super__ = com_isartdigital_builder_game_sprites_SpriteObject;
com_isartdigital_builder_game_parade_BonusParade.prototype = $extend(com_isartdigital_builder_game_sprites_SpriteObject.prototype,{
	setAssetName: function(pValue) {
		if(pValue < com_isartdigital_builder_game_utils_Metadatas.parade.spawn_rate.offerings) return "BonusOffering"; else if(pValue < com_isartdigital_builder_game_utils_Metadatas.parade.spawn_rate.offerings + com_isartdigital_builder_game_utils_Metadatas.parade.spawn_rate.pesos) return "BonusPesos"; else if(pValue < com_isartdigital_builder_game_utils_Metadatas.parade.spawn_rate.offerings + com_isartdigital_builder_game_utils_Metadatas.parade.spawn_rate.pesos + com_isartdigital_builder_game_utils_Metadatas.parade.spawn_rate.pimientos) return "BonusPimientos"; else {
			throw new js__$Boot_HaxeError("BonusParade Wrong SpawnValue");
			return null;
		}
	}
	,getBonusType: function() {
		return this.assetName;
	}
	,getBonusValue: function() {
		if(this.bonusGainValue != null) return this.bonusGainValue;
		if("BonusOffering" == this.assetName) return this.getBonusQualityValue(com_isartdigital_builder_game_utils_Metadatas.parade.base_value.offerings);
		if("BonusPesos" == this.assetName) return this.getBonusQualityValue(com_isartdigital_builder_game_utils_Metadatas.parade.base_value.pesos);
		if("BonusPimientos" == this.assetName) return this.getBonusQualityValue(com_isartdigital_builder_game_utils_Metadatas.parade.base_value.pimientos);
		return 0;
	}
	,getBonusQualityValue: function(baseValue) {
		var mainBuildingLvl = com_isartdigital_services_Users.getMainBuildingLevel();
		mainBuildingLvl = Std["int"](com_isartdigital_utils_MathUtils.roundToStep(mainBuildingLvl,10));
		return baseValue * com_isartdigital_builder_game_utils_Metadatas.parade.bonus_quality.get(mainBuildingLvl == null?"null":"" + mainBuildingLvl);
	}
	,floatHoverGround: function() {
		if(this.scale != null) {
			var newValue;
			if(this.animationDone) newValue = 0.9; else newValue = 1;
			motion_Actuate.tween(this.scale,0.5,{ x : newValue, y : newValue}).ease(motion_easing_Cubic.get_easeInOut()).onComplete($bind(this,this.floatHoverGround));
			this.animationDone = !this.animationDone;
		}
	}
	,destroy: function() {
		motion_Actuate.stop(this.position,["y"],false,false);
		this.parent.removeChild(this);
		com_isartdigital_builder_game_parade_BonusParade.list.splice(HxOverrides.indexOf(com_isartdigital_builder_game_parade_BonusParade.list,this,0),1);
		com_isartdigital_builder_game_sprites_SpriteObject.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_game_parade_BonusParade
});
var com_isartdigital_builder_game_parade_BonusType = function() { };
$hxClasses["com.isartdigital.builder.game.parade.BonusType"] = com_isartdigital_builder_game_parade_BonusType;
com_isartdigital_builder_game_parade_BonusType.__name__ = ["com","isartdigital","builder","game","parade","BonusType"];
var com_isartdigital_builder_game_parade_Parade = function() {
	this.hasEndScenario = false;
	this.useHardInParade = false;
	this.bonusOfferingCollected = 0;
	this.bonusPesosCollected = 0;
	this.bonusPimientosCollected = 0;
	this.active = false;
	this.offeringGain = 0;
	this.pimientosGain = 0;
	this.pesosGain = 0;
	EventEmitter.call(this);
	this.paradeBonusGenerator = new com_isartdigital_builder_game_parade_ParadeBonusGenerator(this);
	this.paradeController = new com_isartdigital_builder_game_parade_ParadeController(this);
	this.paradeProcession = new com_isartdigital_builder_game_parade_ParadeProcession(this);
};
$hxClasses["com.isartdigital.builder.game.parade.Parade"] = com_isartdigital_builder_game_parade_Parade;
com_isartdigital_builder_game_parade_Parade.__name__ = ["com","isartdigital","builder","game","parade","Parade"];
com_isartdigital_builder_game_parade_Parade.__super__ = EventEmitter;
com_isartdigital_builder_game_parade_Parade.prototype = $extend(EventEmitter.prototype,{
	start: function(hardPurchase) {
		com_isartdigital_builder_game_GameManager.pathfindingWithObstacle = false;
		com_isartdigital_builder_game_sprites_buildings_BuildingUtils.unselectBuildingSelected();
		this.hardPurchase = hardPurchase;
		this.openHudParade();
		this.setHudStartValue();
		this.active = true;
		this.paradeProcession.constructParade();
		this.paradeBonusGenerator.generateBonusScenario();
		var positionForCameraFocus = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(this.paradeProcession.endPositionScenario);
		motion_Actuate.tween(com_isartdigital_utils_game_Camera.getInstance().cameraFocus.position,2,{ x : positionForCameraFocus.x, y : positionForCameraFocus.y}).ease(motion_easing_Linear.get_easeNone());
	}
	,startParadeForUser: function() {
		com_isartdigital_builder_game_ftue_Ftue.event.emit("PARADE_SCENARIO_END");
		com_isartdigital_builder_game_GameManager.pathfindingWithObstacle = true;
		this.paradeProcession.setParadeFullAlpha();
		this.hasEndScenario = true;
		this.paradeBonusGenerator.generateBonus();
		this.paradeController.start();
		if(this.isParadeForFtue()) {
			this.stop();
			this.paradeController.start();
			com_isartdigital_builder_game_ftue_Ftue.event.once("PARADE_MOVED",$bind(this,this.onFtueParadeMoved));
		} else this.startTimer();
	}
	,onFtueParadeMoved: function(params) {
		this.resume();
		this.startTimer();
	}
	,getBonusRessourceGain: function(bonusType) {
		switch(bonusType) {
		case "BonusPesos":
			return "gold";
		case "BonusOffering":
			return "offering";
		case "BonusPimientos":
			return "spice";
		default:
			throw new js__$Boot_HaxeError("Parade: bonusType value in getBonusRessourceGain is incorrect");
		}
		return null;
	}
	,addBonusGain: function(bonusType) {
		if(bonusType == "BonusPimientos") this.bonusPimientosCollected++;
		if(bonusType == "BonusPesos") this.bonusPesosCollected++;
		if(bonusType == "BonusOffering") this.bonusOfferingCollected++;
	}
	,closeHudParade: function() {
		com_isartdigital_builder_ui_UIManager.getInstance().closeHudParade();
		com_isartdigital_builder_ui_UIManager.getInstance().openHud();
		com_isartdigital_builder_game_manager_ExperienceManager.getInstance().updateLevelAndXp();
	}
	,openHudParade: function() {
		com_isartdigital_builder_ui_UIManager.getInstance().closeHud();
		com_isartdigital_builder_ui_UIManager.getInstance().openHudParade();
	}
	,refreshResourceValue: function() {
		com_isartdigital_builder_ui_hud_HudParade.getInstance().emit("UPDATE_REQUEST_OFFERING_VIEW",this.offeringGain);
		com_isartdigital_builder_ui_hud_HudParade.getInstance().emit("UPDATE_REQUEST_PESOS_VIEW",this.pesosGain);
		com_isartdigital_builder_ui_hud_HudParade.getInstance().emit("UPDATE_REQUEST_PIMIENTOS_VIEW",this.pimientosGain);
	}
	,setHudStartValue: function() {
		this.refreshResourceValue();
		var mainBuildingLvl = com_isartdigital_services_Users.getMainBuildingLevel();
		mainBuildingLvl = Std["int"](com_isartdigital_utils_MathUtils.roundToStep(mainBuildingLvl,5));
		com_isartdigital_builder_ui_hud_HudParade.getInstance().emit("UPDATE_REQUEST_TIMER",com_isartdigital_builder_game_utils_Metadatas.paradeDetails.get(mainBuildingLvl == null?"null":"" + mainBuildingLvl).time);
	}
	,startTimer: function() {
		var mainBuildingLvl = com_isartdigital_services_Users.getMainBuildingLevel();
		mainBuildingLvl = Std["int"](com_isartdigital_utils_MathUtils.roundToStep(mainBuildingLvl,5));
		this.timeLeft = com_isartdigital_builder_game_utils_Metadatas.paradeDetails.get(mainBuildingLvl == null?"null":"" + mainBuildingLvl).time;
		this.currentTime = new Date().getTime() / 1000;
		this.timeEnd = this.currentTime + this.timeLeft;
	}
	,updateTimer: function() {
		this.currentTime = new Date().getTime() / 1000;
		this.timeLeft = this.timeEnd - this.currentTime;
		this.updateTimerInHud();
	}
	,doActionParade: function() {
		if(!this.active) return;
		com_isartdigital_builder_game_animation_fireworks_FireworksAmbiance.update();
		this.checkIfParadeHitBonus();
		this.paradeProcession.update();
		if(this.hasEndScenario) {
			this.updateTimer();
			this.checkForParadeEnd();
		} else if(this.paradeProcession.paradeHasReachLastScenrioPosition()) this.startParadeForUser();
	}
	,checkIfParadeHitBonus: function() {
		var _g = 0;
		var _g1 = this.paradeProcession.getParadePositionInModel();
		while(_g < _g1.length) {
			var positionCitizen = _g1[_g];
			++_g;
			var _g2 = 0;
			var _g3 = com_isartdigital_builder_game_parade_BonusParade.list;
			while(_g2 < _g3.length) {
				var bonus = _g3[_g2];
				++_g2;
				if(com_isartdigital_utils_PointUtils.isEqual(positionCitizen,bonus.positionInModel)) {
					this.addBonusGain(bonus.getBonusType());
					this.createAnimationFeedback(this.getBonusRessourceGain(bonus.getBonusType()),Std["int"](bonus.getBonusValue()));
					bonus.destroy();
					break;
				}
			}
		}
	}
	,createAnimationFeedback: function(ressourceType,amoutRessource) {
		com_isartdigital_builder_game_animation_harvest_AnimationHarvestBuilder.create().withStartAnimationPosition($bind(this,this.getHeadParadePositionInHud)).withEndAnimationPosition(this.getRessourcePositionInHud(ressourceType)).withCoinAmountToGenerate(Math.ceil(amoutRessource)).withCallbackWhenCoinReachDestination(this.getFunctionToAddRessource(ressourceType)).withAnimationName(this.getAnimationNames(ressourceType)).withContainer(com_isartdigital_builder_ui_hud_HudParade.getInstance()).build().animate();
	}
	,getAnimationNames: function(ressourceType) {
		if(ressourceType == "gold") return "coingold";
		if(ressourceType == "offering") return "coinoffrande";
		if(ressourceType == "spice") return "coinpimientos";
		return null;
	}
	,getRessourcePositionInHud: function(ressource) {
		return function() {
			return new PIXI.Point(com_isartdigital_builder_ui_hud_HudParade.getInstance().getRessourceView().position.x + com_isartdigital_builder_ui_items_ResourcesView.middleResourceOffsetX.get(ressource),com_isartdigital_builder_ui_hud_HudParade.getInstance().getRessourceView().position.y + 63);
		};
	}
	,getFunctionToAddRessource: function(ressource) {
		switch(ressource) {
		case "gold":
			return $bind(this,this.addPesosBonus);
		case "offering":
			return $bind(this,this.addOfferingBonus);
		case "spice":
			return $bind(this,this.addPimientosBonus);
		default:
			throw new js__$Boot_HaxeError("Parade: ressource value in getFunctionToFindPositionInHud is incorrect");
		}
	}
	,addPesosBonus: function() {
		this.pesosGain += 1;
		this.refreshResourceValue();
	}
	,addOfferingBonus: function() {
		this.offeringGain += 1;
		this.refreshResourceValue();
	}
	,addPimientosBonus: function() {
		this.pimientosGain += 1;
		this.refreshResourceValue();
	}
	,getHeadParadePositionInHud: function() {
		return com_isartdigital_utils_game_iso_IsoManager.modelToHudView(this.paradeProcession.getHeadOfParade().getPositionInModel());
	}
	,checkForParadeEnd: function() {
		if(this.timeLeft < 0) {
			this.timeLeft = 0;
			this.updateTimerInHud();
			if(this.useHardInParade || this.isParadeForFtue()) this.end(); else this.firstEnd();
		}
	}
	,isParadeForFtue: function() {
		if(!com_isartdigital_services_Users.infos.ftue_complet) {
			if(!com_isartdigital_builder_game_GameManager.getInstance().ftue.isParadeStepDone) return true;
		}
		return false;
	}
	,updateTimerInHud: function() {
		com_isartdigital_builder_ui_hud_HudParade.getInstance().emit("UPDATE_REQUEST_TIMER",this.timeLeft);
	}
	,addTime: function(time) {
		this.timeLeft = time;
		this.timeEnd = new Date().getTime() / 1000 + this.timeLeft;
		this.updateTimer();
		this.useHardInParade = true;
		this.resume();
	}
	,stop: function() {
		this.paradeController.stop();
		this.active = false;
	}
	,resume: function() {
		this.paradeController.start();
		this.active = true;
	}
	,firstEnd: function() {
		this.stop();
		com_isartdigital_builder_game_manager_RessourceManager.getInstance().addRessources("spice",this.pimientosGain);
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_PARADECONTINUE");
	}
	,end: function() {
		this.stop();
		var facebookWallMessage = "Wow, les parades dans Fiesta Ultima ça rapporte pas mal quand même !\n\r\n\t\tJ'ai gagné " + this.offeringGain + " offrandes, " + this.pesosGain + " pesos et " + this.pimientosGain + " piments !!";
		com_isartdigital_utils_facebook_Facebook.shareOnWall({ message : facebookWallMessage, link : "https://apps.facebook.com/builderisart"});
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_PARADEREWARD",[this.offeringGain,this.pesosGain,this.pimientosGain]);
	}
	,destroy: function() {
		com_isartdigital_builder_game_GameManager.pathfindingWithObstacle = false;
		this.closeHudParade();
		com_isartdigital_builder_api_Api.user.getParadeUpdate(this.bonusPesosCollected,this.bonusPimientosCollected,this.bonusOfferingCollected,this.useHardInParade,this.hardPurchase);
		this.paradeBonusGenerator.clean();
		this.paradeBonusGenerator = null;
		this.paradeController.clean();
		this.paradeController = null;
		this.paradeProcession.clean();
		this.paradeProcession = null;
		com_isartdigital_builder_game_GameManager.pathfindingWithObstacle = true;
	}
	,__class__: com_isartdigital_builder_game_parade_Parade
});
var com_isartdigital_builder_game_parade_ParadeBonusGenerator = function(parade) {
	this.positionValid = [];
	EventEmitter.call(this);
	this.parade = parade;
};
$hxClasses["com.isartdigital.builder.game.parade.ParadeBonusGenerator"] = com_isartdigital_builder_game_parade_ParadeBonusGenerator;
com_isartdigital_builder_game_parade_ParadeBonusGenerator.__name__ = ["com","isartdigital","builder","game","parade","ParadeBonusGenerator"];
com_isartdigital_builder_game_parade_ParadeBonusGenerator.__super__ = EventEmitter;
com_isartdigital_builder_game_parade_ParadeBonusGenerator.prototype = $extend(EventEmitter.prototype,{
	generateBonus: function() {
		var bonusToGenerateCount = this.getBonusToGenerateCount();
		this.positionValid = this.getAvailablePositions();
		this.positionValid.sort($bind(this,this.randomSort));
		var _g = 0;
		while(_g < bonusToGenerateCount) {
			var i = _g++;
			var bonus = new com_isartdigital_builder_game_parade_BonusParade(Math.random() * 100,this.positionValid.pop());
			com_isartdigital_utils_game_GameStage.getInstance().getBuildingsContainer().addChild(bonus);
		}
		com_isartdigital_utils_game_iso_IsoManager.sortAll();
	}
	,generateBonusScenario: function() {
		var bonus = new com_isartdigital_builder_game_parade_BonusParade(5,this.getBonusScenarioPosition(),this.getDefaultGain());
		com_isartdigital_utils_game_GameStage.getInstance().getBuildingsContainer().addChild(bonus);
	}
	,getDefaultGain: function() {
		var mainBuildingLvl = com_isartdigital_services_Users.getMainBuildingLevel();
		mainBuildingLvl = Std["int"](com_isartdigital_utils_MathUtils.roundToStep(mainBuildingLvl,5));
		return com_isartdigital_builder_game_utils_Metadatas.paradeDetails.get(mainBuildingLvl == null?"null":"" + mainBuildingLvl).default_gain;
	}
	,getBonusScenarioPosition: function() {
		return new PIXI.Point(this.parade.paradeProcession.endPositionScenario.x,this.parade.paradeProcession.endPositionScenario.y);
	}
	,getBonusToGenerateCount: function() {
		return Std["int"](Math.ceil(com_isartdigital_builder_game_sprites_Tile.getBuildableTiles().length * 0.05));
	}
	,randomSort: function(objectA,objectB) {
		if(Math.random() > 0.5) return -1; else return 1;
	}
	,getAvailablePositions: function() {
		var tilePositions = [];
		var _g = 0;
		var _g1 = com_isartdigital_builder_game_sprites_Tile.getBuildableTiles();
		while(_g < _g1.length) {
			var tile = _g1[_g];
			++_g;
			tilePositions.push(new PIXI.Point(tile.x,tile.y));
		}
		return tilePositions;
	}
	,clean: function() {
		this.positionValid = null;
		var _g = 0;
		var _g1 = com_isartdigital_builder_game_parade_BonusParade.list;
		while(_g < _g1.length) {
			var bonus = _g1[_g];
			++_g;
			motion_Actuate.tween(bonus,1,{ alpha : 0}).ease(motion_easing_Linear.get_easeNone()).onComplete($bind(bonus,bonus.destroy));
		}
	}
	,__class__: com_isartdigital_builder_game_parade_ParadeBonusGenerator
});
var com_isartdigital_builder_game_parade_ParadeController = function(parade) {
	EventEmitter.call(this);
	this.parade = parade;
};
$hxClasses["com.isartdigital.builder.game.parade.ParadeController"] = com_isartdigital_builder_game_parade_ParadeController;
com_isartdigital_builder_game_parade_ParadeController.__name__ = ["com","isartdigital","builder","game","parade","ParadeController"];
com_isartdigital_builder_game_parade_ParadeController.__super__ = EventEmitter;
com_isartdigital_builder_game_parade_ParadeController.prototype = $extend(EventEmitter.prototype,{
	start: function() {
		this.subsribeClickAndTapEvent();
	}
	,stop: function() {
		this.unsubscribeClickAndTapEvent();
	}
	,subsribeClickAndTapEvent: function() {
		com_isartdigital_builder_Main.getInstance().on("EVENT_INTERACTION",$bind(this,this.onClickOrTap));
	}
	,unsubscribeClickAndTapEvent: function() {
		com_isartdigital_builder_Main.getInstance().removeListener("EVENT_INTERACTION",$bind(this,this.onClickOrTap));
	}
	,onClickOrTap: function(position) {
		if(com_isartdigital_utils_game_Camera.getInstance().hasMoved) return;
		position = com_isartdigital_utils_game_iso_IsoManager.isoToModelView(position);
		this.parade.paradeProcession.changeDestination(position);
		com_isartdigital_builder_game_ftue_Ftue.event.emit("PARADE_MOVED");
	}
	,clean: function() {
		this.unsubscribeClickAndTapEvent();
	}
	,__class__: com_isartdigital_builder_game_parade_ParadeController
});
var com_isartdigital_builder_game_parade_ParadeProcession = function(parade) {
	this.feedbackPointList = [];
	this.processionPattern = [];
	this.targetDestination = null;
	this.citizensInProcession = [];
	this.endPositionScenario = new PIXI.Point();
	this.startPositionScenario = new PIXI.Point();
	EventEmitter.call(this);
	this.parade = parade;
	var _g1 = 0;
	var _g = com_isartdigital_builder_game_utils_Metadatas.paradePattern.numberCitizenInParade[this.getParadeLevel()];
	while(_g1 < _g) {
		var i = _g1++;
		var position = com_isartdigital_builder_game_utils_Metadatas.paradePattern.positionCitizen[i];
		this.processionPattern.push(new PIXI.Point(position.x,position.y));
	}
};
$hxClasses["com.isartdigital.builder.game.parade.ParadeProcession"] = com_isartdigital_builder_game_parade_ParadeProcession;
com_isartdigital_builder_game_parade_ParadeProcession.__name__ = ["com","isartdigital","builder","game","parade","ParadeProcession"];
com_isartdigital_builder_game_parade_ParadeProcession.__super__ = EventEmitter;
com_isartdigital_builder_game_parade_ParadeProcession.prototype = $extend(EventEmitter.prototype,{
	getParadeLevel: function() {
		var mainBuildingLvl = com_isartdigital_services_Users.getMainBuildingLevel();
		mainBuildingLvl = Std["int"](com_isartdigital_utils_MathUtils.roundToStep(mainBuildingLvl,5));
		var paradeLevel = Math.round(mainBuildingLvl / 4);
		return --paradeLevel;
	}
	,getCitizenInProcecession: function() {
		return this.citizensInProcession;
	}
	,constructParade: function() {
		var _g1 = 0;
		var _g = this.processionPattern.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(i == 0) this.headOfProcession = this.createCitizen(this.getStartPositionParade(),"CitizenA"); else this.createCitizen(new PIXI.Point(this.startPositionScenario.x - this.processionPattern[i].x,this.startPositionScenario.y - this.processionPattern[i].y));
		}
		this.changeDestination(this.getEndPositionScenario());
	}
	,getStartPositionParade: function() {
		var positionMainSquare = this.getEndPositionScenario();
		var startPosition = new PIXI.Point(positionMainSquare.x,positionMainSquare.y);
		while(com_isartdigital_builder_game_map_GMap.getElementByTypeAt(startPosition,"tile").isIlluminated) startPosition.y--;
		startPosition.y -= 5;
		this.startPositionScenario = startPosition;
		return startPosition;
	}
	,getEndPositionScenario: function() {
		var mainSquareDef = com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getBuildingsModel("main_square")[0];
		this.endPositionScenario = new PIXI.Point(mainSquareDef.x,mainSquareDef.y);
		this.endPositionScenario.x += 1;
		this.endPositionScenario.y += 1;
		return this.endPositionScenario;
	}
	,paradeHasReachLastScenrioPosition: function() {
		return this.headOfProcession.hasReachEndPositionOfPath();
	}
	,setParadeFullAlpha: function() {
		var _g = 0;
		var _g1 = this.citizensInProcession;
		while(_g < _g1.length) {
			var citizen = _g1[_g];
			++_g;
			citizen.setNoTransparency();
		}
	}
	,getParadePositionInModel: function() {
		var positionsProcession = [];
		var _g = 0;
		var _g1 = this.citizensInProcession;
		while(_g < _g1.length) {
			var citizen = _g1[_g];
			++_g;
			positionsProcession.push(citizen.getPositionInModel());
		}
		return positionsProcession;
	}
	,getHeadOfParade: function() {
		return this.headOfProcession;
	}
	,changeDestination: function(positionDestination) {
		this.targetDestination = positionDestination;
		this.setProcessionPath();
	}
	,setProcessionPath: function() {
		var _g1 = 0;
		var _g = this.citizensInProcession.length;
		while(_g1 < _g) {
			var i = _g1++;
			var positionFromPattern = new PIXI.Point(this.targetDestination.x - this.processionPattern[i].x,this.targetDestination.y - this.processionPattern[i].y);
			if(com_isartdigital_builder_game_map_GMap.getElementByTypeAt(positionFromPattern,"tile").isBuildable) this.citizensInProcession[i].setPath(positionFromPattern); else this.citizensInProcession[i].setPath(this.targetDestination);
		}
		this.refreshFeedbackPath(this.headOfProcession.getPathToFollow());
	}
	,update: function() {
		this.refreshFeedbackPath(this.headOfProcession.getPathToFollow());
	}
	,refreshFeedbackPath: function(pathParade) {
		this.removeAllFeedBackPoint();
		var _g1 = 0;
		var _g = pathParade.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.addFeedbackPointAt(new PIXI.Point(pathParade[i].x,pathParade[i].y - _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight) / _$UInt_UInt_$Impl_$.toFloat(2)));
		}
	}
	,createCitizen: function(startPosition,assetName) {
		var citizen = new com_isartdigital_builder_game_sprites_citizen_Citizen(assetName);
		this.citizensInProcession.push(citizen);
		citizen.position = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(startPosition);
		com_isartdigital_utils_game_GameStage.getInstance().getBuildingsContainer().addChild(citizen);
		citizen.start();
		return citizen;
	}
	,addFeedbackPointAt: function(position) {
		var feedbackPoint = new com_isartdigital_builder_game_parade_TargetAsset(position);
		this.feedbackPointList.push(feedbackPoint);
	}
	,removeAllFeedBackPoint: function() {
		while(this.feedbackPointList.length != 0) {
			this.feedbackPointList[0].parent.removeChild(this.feedbackPointList[0]);
			this.feedbackPointList[0].destroy();
			this.feedbackPointList.splice(0,1);
		}
	}
	,clean: function() {
		this.removeAllFeedBackPoint();
		while(this.citizensInProcession.length != 0) this.citizensInProcession.shift().disappear();
	}
	,__class__: com_isartdigital_builder_game_parade_ParadeProcession
});
var com_isartdigital_builder_game_parade_TargetAsset = function(position) {
	PIXI.Graphics.call(this);
	this.beginFill(10551278);
	this.drawCircle(0,0,9);
	this.beginFill(4162);
	this.drawCircle(0,0,7);
	this.position = position;
	com_isartdigital_utils_game_GameStage.getInstance().getTilesContainer().addChild(this);
};
$hxClasses["com.isartdigital.builder.game.parade.TargetAsset"] = com_isartdigital_builder_game_parade_TargetAsset;
com_isartdigital_builder_game_parade_TargetAsset.__name__ = ["com","isartdigital","builder","game","parade","TargetAsset"];
com_isartdigital_builder_game_parade_TargetAsset.__super__ = PIXI.Graphics;
com_isartdigital_builder_game_parade_TargetAsset.prototype = $extend(PIXI.Graphics.prototype,{
	__class__: com_isartdigital_builder_game_parade_TargetAsset
});
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
var com_isartdigital_builder_game_sprites_Background = function() {
	com_isartdigital_builder_game_sprites_SpriteObject.call(this);
	this.boxType = com_isartdigital_utils_game_BoxType.NONE;
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
};
$hxClasses["com.isartdigital.builder.game.sprites.Background"] = com_isartdigital_builder_game_sprites_Background;
com_isartdigital_builder_game_sprites_Background.__name__ = ["com","isartdigital","builder","game","sprites","Background"];
com_isartdigital_builder_game_sprites_Background.__super__ = com_isartdigital_builder_game_sprites_SpriteObject;
com_isartdigital_builder_game_sprites_Background.prototype = $extend(com_isartdigital_builder_game_sprites_SpriteObject.prototype,{
	init: function(pDefiniton) {
		var lPosition = new PIXI.Point(pDefiniton.x,pDefiniton.y);
		lPosition = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(lPosition);
		this.position.set(Math.floor(lPosition.x),Math.floor(lPosition.y));
		this.changeAsset("Background");
		this.setState(this.DEFAULT_STATE);
		this.getFlumpMovie().animationSpeed = 0.3;
		com_isartdigital_utils_game_GameStage.getInstance().getBackgroundContainer().addChild(this);
	}
	,remove: function() {
		com_isartdigital_utils_game_GameStage.getInstance().getBackgroundContainer().removeChild(this);
		if(!com_isartdigital_builder_game_sprites_SpriteObject.prototype.remove.call(this)) {
			this.destroy();
			return true;
		}
		return true;
	}
	,destroy: function() {
		com_isartdigital_builder_game_sprites_SpriteObject.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_game_sprites_Background
});
var com_isartdigital_builder_game_sprites_Tile = function() {
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
	position = new PIXI.Point(position.x,position.y);
	position.x -= 1;
	position.y -= 1;
	var _g = 0;
	while(_g < radius) {
		var i = _g++;
		tileAlpha = (Math.exp(i / radius) - 1) / (Math.exp(1.2) - 1);
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
		if(com_isartdigital_builder_game_map_GMap.isInsideGrid(tiles[k].x | 0,tiles[k].y | 0)) {
			var illuminationPosition = new PIXI.Point(tiles[k].x,tiles[k].y);
			com_isartdigital_builder_game_sprites_buildings_BuildingUtils.setBuildingVisibleAt(illuminationPosition);
			com_isartdigital_builder_game_sprites_Tile.setTileIlluminatedAndAlphaInGlobalMapAt(tiles[k]);
		}
	}
	com_isartdigital_builder_game_sprites_Tile.refreshTilesAlpha();
};
com_isartdigital_builder_game_sprites_Tile.setTileIlluminatedAndAlphaInGlobalMapAt = function(tile) {
	var tileInGlobalMap = com_isartdigital_builder_game_map_GMap.getElementByTypeAt(new PIXI.Point(tile.x,tile.y),"tile");
	if(tileInGlobalMap.alpha > tile.alpha) tileInGlobalMap.alpha = tile.alpha; else tileInGlobalMap.alpha = tileInGlobalMap.alpha;
	if(!tileInGlobalMap.isIlluminated) {
		tileInGlobalMap.isIlluminated = true;
		tileInGlobalMap.isBuildable = true;
		com_isartdigital_builder_game_sprites_Tile.cacheTileInBuildableTilesArray(tileInGlobalMap);
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
com_isartdigital_builder_game_sprites_Tile.changeTilesBuildableState = function(tiles,_isBuildable) {
	var mapElements;
	var tile;
	var _g1 = 0;
	var _g = tiles.length;
	while(_g1 < _g) {
		var i = _g1++;
		tile = tiles[i];
		tile.isBuildable = _isBuildable;
		if(_isBuildable) com_isartdigital_builder_game_sprites_Tile.cacheTileInBuildableTilesArray(tile); else com_isartdigital_builder_game_sprites_Tile.removeTileFromBuildableTilesArray(tile);
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
com_isartdigital_builder_game_sprites_Tile.getTileAt = function(position) {
	var tile;
	var tilePosition;
	var _g1 = 0;
	var _g = com_isartdigital_builder_game_sprites_Tile.list.length;
	while(_g1 < _g) {
		var i = _g1++;
		tile = com_isartdigital_builder_game_sprites_Tile.list[i];
		tilePosition = tile.positionToModel(true);
		if(tilePosition.x == position.x && tilePosition.y == position.y) return tile;
	}
	throw new js__$Boot_HaxeError("Position " + position.x + ":" + position.y + " do not contain Tile");
};
com_isartdigital_builder_game_sprites_Tile.getBuildableTiles = function() {
	return com_isartdigital_builder_game_sprites_Tile.buildableTiles;
};
com_isartdigital_builder_game_sprites_Tile.cacheTileInBuildableTilesArray = function(tile) {
	if(HxOverrides.indexOf(com_isartdigital_builder_game_sprites_Tile.buildableTiles,tile,0) == -1) com_isartdigital_builder_game_sprites_Tile.buildableTiles.push(tile);
};
com_isartdigital_builder_game_sprites_Tile.removeTileFromBuildableTilesArray = function(tile) {
	if(HxOverrides.indexOf(com_isartdigital_builder_game_sprites_Tile.buildableTiles,tile,0) != -1) com_isartdigital_builder_game_sprites_Tile.buildableTiles.splice(HxOverrides.indexOf(com_isartdigital_builder_game_sprites_Tile.buildableTiles,tile,0),1);
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
var com_isartdigital_builder_game_sprites_buildings_Building = function() {
	this.canTriggerMouseUpEvent = true;
	this.isMoving = false;
	this.isSelected = false;
	this.type = "building";
	com_isartdigital_builder_game_sprites_SpriteObject.call(this);
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.Building"] = com_isartdigital_builder_game_sprites_buildings_Building;
com_isartdigital_builder_game_sprites_buildings_Building.__name__ = ["com","isartdigital","builder","game","sprites","buildings","Building"];
com_isartdigital_builder_game_sprites_buildings_Building.__interfaces__ = [com_isartdigital_utils_game_iso_IZSortable];
com_isartdigital_builder_game_sprites_buildings_Building.__super__ = com_isartdigital_builder_game_sprites_SpriteObject;
com_isartdigital_builder_game_sprites_buildings_Building.prototype = $extend(com_isartdigital_builder_game_sprites_SpriteObject.prototype,{
	init: function(buildingModelDef) {
		this.buildingInitialisator = new com_isartdigital_builder_game_sprites_buildings_BuildingInitialisator(this);
		this.buildingConstructor = new com_isartdigital_builder_game_sprites_buildings_BuildingConstructor(this);
		this.buildingDestructor = new com_isartdigital_builder_game_sprites_buildings_BuildingDestructor(this);
		this.buildingHarvester = new com_isartdigital_builder_game_sprites_buildings_BuildingHarvester(this);
		this.buildingUpgrader = new com_isartdigital_builder_game_sprites_buildings_BuildingUpgrader(this);
		this.buildingPosition = new com_isartdigital_builder_game_sprites_buildings_BuildingPosition(this);
		this.buildingTimebase = new com_isartdigital_builder_game_sprites_buildings_BuildingTimebase(this);
		this.buildingMover = new com_isartdigital_builder_game_sprites_buildings_BuildingMover(this);
		this.buildingTile = new com_isartdigital_builder_game_sprites_buildings_BuildingTile(this);
		this.buildingInitialisator.initialisate(buildingModelDef);
	}
	,getModelInGlobalMap: function() {
		return com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getBuildingModelInGlobalMapAt(this.positionToModel(true));
	}
	,getConfig: function() {
		return com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getConfigByName(this.definition.name,this.buildingLevel);
	}
	,isUpgradableBuilding: function() {
		return com_isartdigital_builder_game_sprites_buildings_BuildingUtils.isUpgradableBuilding(this.definition.name);
	}
	,isHarvestable: function() {
		return this.hasHarvestableFunctionality;
	}
	,select: function() {
		com_isartdigital_builder_game_sprites_buildings_BuildingUtils.unselectBuildingSelected();
		this.setBuildingSelected();
	}
	,setMoveState: function() {
		this.setMouseToBuildingPosition();
		this.buildingTile.setTileUnderBuildingBuildable();
		this.startMove();
		this.emitUnselectEvent();
		com_isartdigital_utils_game_Camera.desactivateCamera();
	}
	,setMouseToBuildingPosition: function() {
		com_isartdigital_builder_game_GameManager.getInstance().mousePosition = new PIXI.Point(this.x - this.buildingPosition.getBuildingCenterOffsetInPixel().x,this.y - this.buildingPosition.getBuildingCenterOffsetInPixel().y);
	}
	,doActionNormal: function() {
		com_isartdigital_builder_game_sprites_SpriteObject.prototype.doActionNormal.call(this);
		var onCursorPosition;
		this.updateTimebaseAnimation();
		this.updateHarvestIconState();
		if(this.canInteract() && !this.isSelected) this.filters = com_isartdigital_utils_game_Filter.getBrightness(0.65); else this.filters = null;
		if(this.isMoving) {
			onCursorPosition = this.buildingPosition.getPositionOnCursorWithBuildingCenterOffset();
			this.buildingMover.setMousePosition(onCursorPosition);
			this.buildingMover.move();
			this.applyFilterByConstructibleState();
		}
	}
	,updateTimebaseAnimation: function() {
		if(!this.isMoving) this.buildingTimebase.updateAnimation(); else this.buildingTimebase.hideAnimation();
	}
	,updateHarvestIconState: function() {
		if(this.isHarvestable() && !this.isSelected && !this.isMoving) {
			this.checkIfHarvestingMustBeDesctivatedOrActivated();
			this.buildingHarvester.updateHarvestIconState();
		}
	}
	,checkIfHarvestingMustBeDesctivatedOrActivated: function() {
		if(this.buildingTimebase.isConstructingOrUpgradingState() || com_isartdigital_builder_game_GameManager.getInstance().isParadeActive()) this.buildingHarvester.desactiveHarversting(); else this.buildingHarvester.activeHarversting();
	}
	,applyFilterByConstructibleState: function() {
		var position = this.buildingPosition.getPositionOnCursorWithBuildingCenterOffset();
		this.buildingConstructor.setDestination(position);
		if(this.buildingConstructor.canConstruct()) this.filters = null; else this.filters = com_isartdigital_utils_game_Filter.getRed();
	}
	,upgradeLantern: function() {
		this.getModelInGlobalMap().lvl++;
		this.buildingLevel++;
		(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(this.buildingLevel * 2 + 1);
	}
	,onInteractionEvent: function(position) {
		var buildingModelPosition = this.positionToModel(true);
		position = com_isartdigital_utils_game_iso_IsoManager.isoToModelView(position);
		position.x = Math.floor(position.x);
		position.y = Math.floor(position.y);
		this.canTriggerMouseUpEvent = true;
		if(this.canInteract()) this.interactionAction();
	}
	,canInteract: function() {
		return com_isartdigital_builder_ui_UIManager.mouseIsNotInteractingWithUI() && !com_isartdigital_builder_game_GameManager.getInstance().isParadeActive() && this.visible && (this.buildingPosition.isCursorOverBuilding() || this.isSelected);
	}
	,subscribeHudEvent: function() {
		com_isartdigital_builder_Main.getInstance().on("DELETE_BUTTON",$bind(this,this.onErasable));
		com_isartdigital_builder_Main.getInstance().on("MOVE_BUTTON",$bind(this,this.onMove));
		com_isartdigital_builder_Main.getInstance().on("UPGRADE_BUTTON",$bind(this,this.onUpgrade));
		com_isartdigital_builder_Main.getInstance().on("HARDBUILD_BUTTON",$bind(this,this.onHardBuildRequest));
	}
	,forgetHudEvent: function() {
		com_isartdigital_builder_Main.getInstance().off("DELETE_BUTTON",$bind(this,this.onErasable));
		com_isartdigital_builder_Main.getInstance().off("MOVE_BUTTON",$bind(this,this.onMove));
		com_isartdigital_builder_Main.getInstance().off("UPGRADE_BUTTON",$bind(this,this.onUpgrade));
		com_isartdigital_builder_Main.getInstance().off("HARDBUILD_BUTTON",$bind(this,this.onHardBuildRequest));
	}
	,onErasable: function(event) {
		this.buildingDestructor.destruct();
	}
	,onMove: function(event) {
		this.setMoveState();
	}
	,onHardBuildRequest: function(event) {
		com_isartdigital_builder_game_ftue_Ftue.event.emit("CITYHALL_HARD_BUILD_REQUEST");
		this.setBuildingUnselected();
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_HARDBUILDCONFIRM",this.buildingTimebase.getHardBuildPrice());
		com_isartdigital_builder_ui_UIManager.getInstance().on("CONFIRM_BUTTON_CLICK",$bind(this,this.onHardBuildConfirm));
	}
	,onHardBuildConfirm: function(hardbuild) {
		com_isartdigital_builder_game_ftue_Ftue.event.emit("CITYHALL_HARD_BUILD");
		var buildingPosition = this.positionToModel(true);
		com_isartdigital_builder_ui_UIManager.getInstance().off("CONFIRM_BUTTON_CLICK",$bind(this,this.onHardBuildConfirm));
		if(!com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources("spice",hardbuild.price)) {
			com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_NOMONEY");
			return;
		}
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
		com_isartdigital_builder_api_Api.buildings.hardBuild(buildingPosition.x | 0,buildingPosition.y | 0);
		var _this = new Date();
		this.getModelInGlobalMap().construct_end_at = HxOverrides.dateStr(_this);
	}
	,onUpgrade: function(event) {
		if(this.buildingUpgrader.canUpgrade()) {
			this.buildingUpgrader.upgrade();
			this.setBuildingUnselected();
		}
	}
	,startMove: function() {
		this.isMoving = true;
		this.alpha = 0.3;
	}
	,stopMove: function() {
		this.isMoving = false;
		this.alpha = 1;
	}
	,setBuildingSelected: function() {
		this.setSelectedGraphicState();
		this.emitSelectEvent();
		this.subscribeHudEvent();
		this.isSelected = true;
		com_isartdigital_builder_game_ftue_Ftue.event.emit("BUILDING_SELECTED",{ buildingName : this.definition.name});
	}
	,setBuildingUnselected: function() {
		this.setUnselectedGraphicState();
		this.emitUnselectEvent();
		this.forgetHudEvent();
		this.isSelected = false;
	}
	,emitSelectEvent: function() {
		this.emitSelectionEvent("SELECTED");
	}
	,emitUnselectEvent: function() {
		this.emitSelectionEvent("UNSELECTED");
	}
	,emitSelectionEvent: function(eventType) {
		var buildingEvent = { ref : this, type : this.getBuildingActionComponents()};
		com_isartdigital_builder_Main.getInstance().emit(eventType,buildingEvent);
	}
	,getBuildingActionComponents: function() {
		var actionComponent;
		if(this.buildingTimebase.isNotConstructingOrUpgradingState()) actionComponent = this.definition.component; else actionComponent = ["MOVABLE","ERASABLE","HARDBUILD"];
		if(!this.buildingUpgrader.hasNextLevel()) actionComponent = com_isartdigital_builder_game_sprites_buildings_BuildingUtils.removeActionComponent(actionComponent,"UPGRADABLE");
		return actionComponent;
	}
	,setSelectedGraphicState: function() {
		(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(this.buildingLevel * 2 + 1);
	}
	,setUnselectedGraphicState: function() {
		(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(this.buildingLevel * 2);
	}
	,removeEventSubscription: function() {
		com_isartdigital_builder_Main.getInstance().off("EVENT_INTERACTION",$bind(this,this.onInteractionEvent));
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
		this.buildingTimebase.cleanObject();
		this.removeEventSubscription();
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
		this.emitBuildingPlacedEvent();
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
		com_isartdigital_builder_game_sprites_Tile.changeTilesBuildableState(tilesOrigin,true);
	}
	,setDestinationTilesToNotConstructibleInGlobalMap: function() {
		var tilesDest = com_isartdigital_builder_game_sprites_Tile.getTilesArray(this.destination,this.building.definition.size);
		com_isartdigital_builder_game_sprites_Tile.changeTilesBuildableState(tilesDest,false);
	}
	,updateBuildingSavedInServer: function() {
		if(this.isFirstConstruction()) return null;
		com_isartdigital_builder_api_Api.buildings.move(this.positionBeforeConstruct.x | 0,this.positionBeforeConstruct.y | 0,this.destination.x | 0,this.destination.y | 0,$bind(this,this.cbBuildingMovingResult));
	}
	,playConstructionAnimation: function() {
		if(this.isFirstConstruction()) return;
		var launchPosition = this.destination.clone();
		launchPosition.x -= this.building.definition.size.width;
		launchPosition.y -= this.building.definition.size.height;
		com_isartdigital_builder_game_animation_petals_PetalsSalve.lauchOnPositionWithRadius(launchPosition,com_isartdigital_builder_game_animation_petals_PetalsSalve.PETALS_NUMBER_FOR_LAUCNHING_ON_POSITION);
	}
	,emitBuildingPlacedEvent: function() {
		if(this.isFirstConstruction()) return;
		com_isartdigital_builder_game_ftue_Ftue.event.emit("BUILDING_PLACED",{ buildingName : this.building.definition.name});
	}
	,isFirstConstruction: function() {
		return this.positionBeforeConstruct.x == this.destination.x && this.positionBeforeConstruct.y == this.destination.y;
	}
	,cbBuildingMovingResult: function(results) {
		var results1 = JSON.parse(results);
		if(results1.error) {
			com_isartdigital_builder_api_ApiUtils.displayError(results1.errorCode,results1.errorMessage);
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
		var availablePlaceInMap;
		this.isHardBought = buildingBuyAction.hard;
		this.buildingName = buildingBuyAction.buildingName;
		this.buildingDef = com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getByName(this.buildingName);
		this.building = this.prepareBuildingObject();
		availablePlaceInMap = this.getAvailablePlace();
		this.prepareBuildingModelWith(availablePlaceInMap);
		this.addBuildingModelInGlobalMap();
		this.building.init(this.buildingModelToCreate);
		this.buildingModelToCreate.reference = this.building;
		this.buildingCreationRequestToServer();
		this.moveCameraToBuilding();
		com_isartdigital_builder_game_sprites_citizen_Citizen.createCitizenAtRandomPosition();
		com_isartdigital_builder_game_sprites_citizen_Citizen.showAllPassiveCitizens();
	}
	,prepareBuildingObject: function() {
		var building = com_isartdigital_builder_game_pooling_PoolObject.create(Type.resolveClass("com.isartdigital.builder.game.sprites.buildings.Building"));
		this.buildingConstructor = new com_isartdigital_builder_game_sprites_buildings_BuildingConstructor(building);
		building.definition = this.buildingDef;
		building.x = 0;
		building.y = 0;
		return building;
	}
	,prepareBuildingModelWith: function(availablePlaceInMap) {
		this.buildingModelToCreate = com_isartdigital_builder_game_utils_TypeDefUtils.cloneObject(com_isartdigital_builder_game_utils_TypeDefUtils.buildingModelDef);
		this.buildingModelToCreate.type = "building";
		this.buildingModelToCreate.x = availablePlaceInMap.x | 0;
		this.buildingModelToCreate.y = availablePlaceInMap.y | 0;
		this.buildingModelToCreate.lvl = 0;
		this.buildingModelToCreate.name = this.buildingName;
		this.buildingModelToCreate.construct_end_at = this.getBuildingModelConstructEnd();
		if(HxOverrides.indexOf(this.buildingDef.component,"COLLECTABLE",0) != -1) {
			var _this = new Date();
			this.buildingModelToCreate.last_recolt_at = HxOverrides.dateStr(_this);
		}
	}
	,getBuildingModelConstructEnd: function() {
		var config = com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getConfigByName(this.buildingName,0);
		var contructEndInMS = new Date().getTime() + config.contruction_time * 1000 * 60;
		var constructEndInDate;
		var d = new Date();
		d.setTime(contructEndInMS);
		constructEndInDate = d;
		return HxOverrides.dateStr(constructEndInDate);
	}
	,addBuildingModelInGlobalMap: function() {
		if(com_isartdigital_builder_game_map_GMap.isPositionExistAt(new PIXI.Point(this.buildingModelToCreate.x,this.buildingModelToCreate.y),com_isartdigital_builder_game_map_GMap.globalMap)) {
			com_isartdigital_builder_game_sprites_buildings_Building.buildingsModel.push(this.buildingModelToCreate);
			com_isartdigital_builder_game_map_GMap.addElementsBySizeAt(new PIXI.Point(this.buildingModelToCreate.x,this.buildingModelToCreate.y),this.buildingDef.size,this.buildingModelToCreate);
		}
	}
	,getAvailablePlace: function() {
		var startResearchPosition = com_isartdigital_builder_game_map_GMap.getTilePositionAtScreenCenter();
		var radius = 100;
		var index;
		var positionToTestAvailablePlace = new PIXI.Point();
		var _g = 0;
		while(_g < radius) {
			var i = _g++;
			var _g2 = 0;
			var _g1 = radius * 30;
			while(_g2 < _g1) {
				var j = _g2++;
				index = j / radius;
				positionToTestAvailablePlace.x = Math.round(startResearchPosition.x + Math.cos(index) * i);
				positionToTestAvailablePlace.y = Math.round(startResearchPosition.y + Math.sin(index) * i);
				this.buildingConstructor.setDestination(new PIXI.Point(positionToTestAvailablePlace.x,positionToTestAvailablePlace.y));
				if(this.buildingConstructor.canConstruct()) return new PIXI.Point(positionToTestAvailablePlace.x,positionToTestAvailablePlace.y);
			}
		}
		return new PIXI.Point();
	}
	,buildingCreationRequestToServer: function() {
		com_isartdigital_builder_api_Api.buildings.create(this.buildingName,this.buildingModelToCreate.x,this.buildingModelToCreate.y,this.isHardBought);
	}
	,moveCameraToBuilding: function() {
		var _g = this;
		motion_Actuate.tween(com_isartdigital_utils_game_Camera.getInstance().cameraFocus,1,{ x : this.building.position.x, y : this.building.position.y}).ease(motion_easing_Cubic.get_easeInOut());
		haxe_Timer.delay(function() {
			_g.setMoveStateTo(_g.buildingModelToCreate);
		},1000);
	}
	,setMoveStateTo: function(buildingModelDef) {
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
		var buildingInMap;
		this.buildingPositionToDestruct = this.building.positionToModel(true);
		buildingInMap = com_isartdigital_builder_game_map_GMap.getElementByTypeAt(this.buildingPositionToDestruct,"building");
		this.buildingSizeToDestruct = this.building.definition.size;
		this.building.remove();
		com_isartdigital_builder_game_sprites_buildings_Building.buildingsModel.splice(HxOverrides.indexOf(com_isartdigital_builder_game_sprites_buildings_Building.buildingsModel,buildingInMap,0),1);
		this.building.buildingTile.setTileUnderBuildingBuildable();
		this.removeBuildingFromGlobalMap();
		this.callServerToDestroy();
	}
	,removeBuildingFromGlobalMap: function() {
		com_isartdigital_builder_game_map_GMap.removeElementsBySizeAndTypeAt(this.buildingPositionToDestruct,this.buildingSizeToDestruct,"building");
	}
	,callServerToDestroy: function() {
		var modelPosistion = this.building.positionToModel(true);
		com_isartdigital_builder_api_Api.buildings.destroy(modelPosistion.x | 0,modelPosistion.y | 0,com_isartdigital_builder_api_ApiUtils.handleError);
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingDestructor
};
var com_isartdigital_builder_game_sprites_buildings_BuildingHarvester = function(building) {
	this.timeBeforeChangeDirection = 1000;
	this.oscillationOffset = 15;
	this.oscillationCurveType = motion_easing_Cubic.get_easeInOut();
	this.building = building;
	this.harvestingActivated = true;
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
		var buildingSize = com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getBuildingSizeInPixelBy(this.building);
		if(Reflect.field(buildingConfig,"resource_price") == "gold") resourceType = "HarvestPesos"; else resourceType = "HarvestOffering";
		if(this.icon != null) {
			if(this.icon.parent != null) {
				this.icon.parent.removeChild(this.icon);
				this.icon.destroy();
			}
		}
		this.icon = new com_isartdigital_utils_game_StateGraphic(resourceType);
		this.iconPosition = new PIXI.Point(-50,-(buildingSize.y / 2) - 300);
		this.building.addChild(this.icon);
		this.icon.position.set(this.iconPosition.x,this.iconPosition.y);
		this.icon.interactive = true;
		this.icon.boxType = com_isartdigital_utils_game_BoxType.SELF;
		this.icon.on("click",this.building.interactionAction);
		this.moveAnimToUp();
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
		return this.getPercentFilled() > 0.005 && this.harvestingActivated;
	}
	,harvest: function() {
		this.throwExceptionIfBuildingHaventHarvestFunctionality();
		this.createAnimationFeedback();
		this.updateLastRecoltDate();
		com_isartdigital_builder_game_ftue_Ftue.event.emit("HARVESTED");
	}
	,activeHarversting: function() {
		this.harvestingActivated = true;
	}
	,desactiveHarversting: function() {
		this.harvestingActivated = false;
	}
	,cleanObject: function() {
		if(this.icon != null) {
			this.icon.parent.removeChild(this.icon);
			this.icon.destroy();
		}
	}
	,createAnimationFeedback: function() {
		com_isartdigital_builder_game_animation_harvest_AnimationHarvestBuilder.create().withStartAnimationPosition($bind(this,this.getPositionInHudView)).withEndAnimationPosition($bind(this,this.getRessourceProductionAssetPositionInHud)).withCoinAmountToGenerate(Math.ceil(this.getAmountFilled())).withCallbackWhenCoinReachDestination($bind(this,this.addHarvestingResource)).withAnimationName(this.getAnimationName()).withContainer(com_isartdigital_builder_ui_hud_Hud.getInstance()).withCallbackOnAnimationEnd($bind(this,this.updateResourceInServer)).build().animate();
	}
	,getPositionInHudView: function() {
		var buildingSize = com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getBuildingSizeInPixelBy(this.building);
		var modelPosition = this.building.positionToModel(true);
		modelPosition.x -= buildingSize.y / 2 / _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight);
		modelPosition.y -= buildingSize.y / 2 / _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight);
		return com_isartdigital_utils_game_iso_IsoManager.modelToHudView(modelPosition);
	}
	,getRessourceProductionAssetPositionInHud: function() {
		var buildingConfig = this.building.getConfig();
		var hud = com_isartdigital_builder_ui_hud_Hud.getInstance();
		var UIResourceComponent;
		var _g = buildingConfig.resource_production;
		switch(_g) {
		case "gold":
			UIResourceComponent = hud.getGoldComponent();
			break;
		case "offering":
			UIResourceComponent = hud.getOfferingComponent();
			break;
		case "spice":
			UIResourceComponent = hud.getSpiceComponent();
			break;
		default:
			throw new js__$Boot_HaxeError("BuildingHarvester: resource_production value retrevied from building settings json is incorrect");
		}
		return new PIXI.Point(UIResourceComponent.x + 105,UIResourceComponent.y + 75);
	}
	,getAnimationName: function() {
		var buildingConfig = this.building.getConfig();
		var _g = buildingConfig.resource_production;
		switch(_g) {
		case "gold":
			return "coingold";
		case "offering":
			return "coinoffrande";
		case "spice":
			return "coinpimientos";
		default:
			throw new js__$Boot_HaxeError("BuildingHarvester: resource_production value retrevied from building settings json is incorrect");
		}
	}
	,addHarvestingResource: function() {
		var buildingConfig = this.building.getConfig();
		com_isartdigital_builder_game_manager_RessourceManager.getInstance().addRessources(buildingConfig.resource_production,1);
	}
	,updateLastRecoltDate: function() {
		var _this = new Date();
		this.building.getModelInGlobalMap().last_recolt_at = HxOverrides.dateStr(_this);
	}
	,updateResourceInServer: function() {
		var position = this.building.positionToModel(true);
		com_isartdigital_builder_api_Api.buildings.collect(position.x | 0,position.y | 0);
	}
	,getAmountFilled: function() {
		var buildingConfig = this.building.getConfig();
		var houseResourceMultiplier = com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getConfigByName("house").resource_multiplier;
		var resourceMultiplier = 1 + houseResourceMultiplier * com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getTotalHouse();
		return Math.ceil(this.getPercentFilled() * buildingConfig.capacity * resourceMultiplier);
	}
	,throwExceptionIfBuildingHaventHarvestFunctionality: function() {
		if(!this.building.isHarvestable()) throw new js__$Boot_HaxeError(com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions.noHarvestFunctionality);
	}
	,moveAnimToDown: function() {
		var _g = this;
		haxe_Timer.delay(function() {
			if(_g.icon.position == null) return;
			motion_Actuate.tween(_g.icon.position,_g.timeBeforeChangeDirection / 1000,{ y : _g.iconPosition.y + _g.oscillationOffset}).ease(_g.oscillationCurveType);
			_g.moveAnimToUp();
		},this.timeBeforeChangeDirection);
	}
	,moveAnimToUp: function() {
		var _g = this;
		haxe_Timer.delay(function() {
			if(_g.icon.position == null) return;
			motion_Actuate.tween(_g.icon.position,_g.timeBeforeChangeDirection / 1000,{ y : _g.iconPosition.y - _g.oscillationOffset}).ease(_g.oscillationCurveType);
			_g.moveAnimToDown();
		},this.timeBeforeChangeDirection);
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingHarvester
};
var com_isartdigital_builder_game_sprites_buildings_BuildingInitialisator = function(building) {
	this.building = building;
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingInitialisator"] = com_isartdigital_builder_game_sprites_buildings_BuildingInitialisator;
com_isartdigital_builder_game_sprites_buildings_BuildingInitialisator.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingInitialisator"];
com_isartdigital_builder_game_sprites_buildings_BuildingInitialisator.prototype = {
	initialisate: function(buildingModelDef) {
		this.setBuildingConfigurationWith(buildingModelDef);
		this.removeLevelIfBuildingIsUpgrading();
		this.setInteractionStrategy();
		this.createZSortableConfiguration();
		this.addEventSubscription();
		this.hideIfInFog();
		this.addToStage();
	}
	,setBuildingConfigurationWith: function(buildingModelDef) {
		var buildingModelPosition = new PIXI.Point(buildingModelDef.x,buildingModelDef.y);
		var buildingIsoPosition = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(buildingModelPosition);
		this.building.definition = com_isartdigital_builder_game_sprites_buildings_BuildingDefinition.getByName(buildingModelDef.name);
		this.building.assetName = this.building.definition.spriteName;
		this.building.changeAsset(this.building.definition.spriteName);
		this.building.x = Math.floor(buildingIsoPosition.x);
		this.building.y = Math.floor(buildingIsoPosition.y);
		this.building.buildingLevel = buildingModelDef.lvl;
		this.building.buildingConstructor.setDestination(buildingModelPosition);
		this.building.buildingConstructor.construct();
		this.building.hasHarvestableFunctionality = this.building.buildingHarvester.isBuildingHasHarvestFunctionality();
		com_isartdigital_builder_game_sprites_buildings_Building.list.push(this.building);
	}
	,removeLevelIfBuildingIsUpgrading: function() {
		if(this.building.buildingTimebase.isUpgradingState()) this.building.buildingLevel--;
	}
	,setInteractionStrategy: function() {
		var lanternStrategy = new com_isartdigital_builder_game_sprites_buildings_interactionStrategy_LanternStrategy(this.building);
		var normalStrategy = new com_isartdigital_builder_game_sprites_buildings_interactionStrategy_NormalStrategy(this.building);
		if(this.isBuildingLantern()) this.building.interactionAction = $bind(lanternStrategy,lanternStrategy.lanternInteraction); else this.building.interactionAction = $bind(normalStrategy,normalStrategy.normalInteraction);
	}
	,isBuildingLantern: function() {
		return this.building.definition.name == "lanterns";
	}
	,isNotBuildingLantern: function() {
		return !this.isBuildingLantern();
	}
	,createZSortableConfiguration: function() {
		var position = this.building.positionToModel(true);
		this.building.modelWidth = this.building.definition.size.width;
		this.building.modelHeight = this.building.definition.size.height;
	}
	,addEventSubscription: function() {
		com_isartdigital_builder_Main.getInstance().on("EVENT_INTERACTION",($_=this.building,$bind($_,$_.onInteractionEvent)));
	}
	,hideIfInFog: function() {
		var positionModel = this.building.positionToModel(true);
		var tileUnderBuilding = com_isartdigital_builder_game_map_GMap.getElementByTypeAt(positionModel,"tile");
		this.building.visible = tileUnderBuilding.isIlluminated;
	}
	,addToStage: function() {
		this.building.setState(this.building.DEFAULT_STATE);
		(js_Boot.__cast(this.building.anim , pixi_display_FlumpMovie)).gotoAndStop(this.building.buildingLevel * 2);
		(js_Boot.__cast(this.building.anim , pixi_display_FlumpMovie)).animationSpeed = 0.80;
		com_isartdigital_utils_game_GameStage.getInstance().getBuildingsContainer().addChild(this.building);
		if(this.isBuildingLantern()) this.building.setModeVoid(); else this.building.start();
		if(this.building.hasHarvestableFunctionality) this.building.buildingHarvester.setHarvestResourceType();
		this.building.buildingTimebase.addAnimation();
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingInitialisator
};
var com_isartdigital_builder_game_sprites_buildings_BuildingMover = function(sprite) {
	this.building = sprite;
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingMover"] = com_isartdigital_builder_game_sprites_buildings_BuildingMover;
com_isartdigital_builder_game_sprites_buildings_BuildingMover.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingMover"];
com_isartdigital_builder_game_sprites_buildings_BuildingMover.prototype = {
	move: function() {
		var centerOfBuildingModel;
		this.throwErrorIfMousePositionIsNull();
		centerOfBuildingModel = this.mousePosition;
		centerOfBuildingModel.x = Math.round(centerOfBuildingModel.x);
		centerOfBuildingModel.y = Math.round(centerOfBuildingModel.y);
		this.building.position = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(centerOfBuildingModel);
	}
	,setMousePosition: function(mousePosition) {
		this.mousePosition = mousePosition;
	}
	,throwErrorIfMousePositionIsNull: function() {
		if(this.mousePosition == null) this.mousePositionNullException();
	}
	,mousePositionNullException: function() {
		throw new js__$Boot_HaxeError(com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions.mousePositionNotSet);
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingMover
};
var com_isartdigital_builder_game_sprites_buildings_BuildingPosition = function(building) {
	this._isCursorIsOverBuilding = false;
	this.building = building;
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingPosition"] = com_isartdigital_builder_game_sprites_buildings_BuildingPosition;
com_isartdigital_builder_game_sprites_buildings_BuildingPosition.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingPosition"];
com_isartdigital_builder_game_sprites_buildings_BuildingPosition.prototype = {
	getPositionOnCursorWithBuildingCenterOffset: function() {
		var buildingOffset = this.getBuildingCenterOffsetInPixel();
		var centerOfBuilding = this.getMousePositionWith(buildingOffset);
		return com_isartdigital_utils_game_iso_IsoManager.isoToModelView(centerOfBuilding);
	}
	,isCursorOverBuilding: function() {
		var buildingSize = com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getBuildingSizeInPixelBy(this.building);
		var distanceBetwenBuildingAndMousePosition = new PIXI.Point(Math.abs(com_isartdigital_builder_game_GameManager.getInstance().mousePosition.x - this.building.x),Math.abs(com_isartdigital_builder_game_GameManager.getInstance().mousePosition.y - (this.building.y - buildingSize.y / 2)));
		distanceBetwenBuildingAndMousePosition = com_isartdigital_utils_game_iso_IsoManager.isoToModelView(distanceBetwenBuildingAndMousePosition,false);
		return distanceBetwenBuildingAndMousePosition.x < this.building.definition.size.width / 2 && distanceBetwenBuildingAndMousePosition.y < this.building.definition.size.height / 2;
	}
	,isCursorNotOverBuilding: function() {
		return !this.isCursorOverBuilding();
	}
	,getBuildingCenterOffsetInPixel: function() {
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
		com_isartdigital_builder_game_sprites_Tile.changeTilesBuildableState(tilesUnderBuilding,buildableState);
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingTile
};
var com_isartdigital_builder_game_sprites_buildings_BuildingTimebase = function(building) {
	this.isBuildingConstructing = false;
	this.building = building;
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingTimebase"] = com_isartdigital_builder_game_sprites_buildings_BuildingTimebase;
com_isartdigital_builder_game_sprites_buildings_BuildingTimebase.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingTimebase"];
com_isartdigital_builder_game_sprites_buildings_BuildingTimebase.prototype = {
	hideAnimation: function() {
		this.animation.visible = false;
		this.timeText.visible = false;
	}
	,showAnimation: function() {
		this.animation.visible = true;
		this.timeText.visible = true;
	}
	,updateAnimation: function() {
		var currentFrame = this.animation.getFlumpMovie().get_currentFrame();
		if(this.isConstructingOrUpgradingState()) {
			this.showAnimation();
			this.updateTimeText();
			if(currentFrame <= 34) {
			} else {
			}
			if(currentFrame >= 90) this.animation.getFlumpMovie().gotoAndPlay(34);
			this.isBuildingConstructing = true;
		} else {
			if(this.isBuildingConstructing) this.isBuildingConstructing = false;
			if(currentFrame >= 148 && this.animation.visible) {
				if(this.building.buildingLevel > 0) this.requestRewardPopin();
				com_isartdigital_builder_game_animation_petals_PetalsSalve.lauchOnPositionWithRadius(this.building.positionToModel(true),com_isartdigital_builder_game_animation_petals_PetalsSalve.PETALS_NUMBER_FOR_LAUCNHING_ON_POSITION);
				this.hideAnimation();
				this.updateBuildingLevel();
			}
		}
	}
	,isUpgradingState: function() {
		return this.isConstructingOrUpgradingState() && this.building.buildingLevel > 0;
	}
	,isConstructingOrUpgradingState: function() {
		try {
			var constructionEndTimestamp = this.getConstructionEndTimestamp();
			var nowTimestamp = new Date().getTime();
			return constructionEndTimestamp > nowTimestamp;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			if( js_Boot.__instanceof(e,String) ) {
				return false;
			} else throw(e);
		}
	}
	,isNotConstructingOrUpgradingState: function() {
		return !this.isConstructingOrUpgradingState();
	}
	,getHardBuildPrice: function() {
		var hardPriceMax = com_isartdigital_builder_game_utils_Metadatas.buildingSettings.hard_price_max;
		var maxConstructTime = com_isartdigital_builder_game_utils_Metadatas.buildingSettings.max_construct_time;
		var baseHardPrice = com_isartdigital_builder_game_utils_Metadatas.buildingSettings.base_hard_price;
		var timeLeft = this.getTimeLeftBeforeBuildingFinishToBuild() / 1000 / 60;
		timeLeft = Math.ceil(timeLeft * 1000) / 1000;
		return Math.ceil(timeLeft / maxConstructTime * hardPriceMax + baseHardPrice);
	}
	,addAnimation: function() {
		this.animation = new com_isartdigital_utils_game_StateGraphic("FX_Waterball_in2");
		(js_Boot.__cast(this.animation.getAnim() , pixi_display_FlumpMovie)).set_loop(true);
		this.animation.visible = false;
		this.building.addChild(this.animation);
		this.centerAnimationOverBuilding();
		this.addTimeText();
		this.hideAnimation();
	}
	,cleanObject: function() {
		if(this.animation != null) {
			if(this.animation.parent != null) {
				this.animation.parent.removeChild(this.animation);
				this.animation.destroy();
			}
		}
		if(this.timeText == null) {
			this.timeText.visible = true;
			this.building.removeChild(this.timeText);
			this.timeText.destroy();
		}
	}
	,requestRewardPopin: function() {
		haxe_Timer.delay(function() {
			com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_UPGRADEREWARD");
		},1000);
	}
	,centerTextOnBuilding: function() {
		this.timeText.position.set(-this.timeText.width / 2,-this.building.height);
	}
	,addTimeText: function() {
		this.createText();
		this.building.addChild(this.timeText);
		this.centerTextOnBuilding();
	}
	,createText: function() {
		var style = { };
		style.align = "center";
		style.font = "bold 50px " + "Candara";
		style.fill = "#FFFFFF";
		this.timeText = new PIXI.Text("",style);
	}
	,updateTimeText: function() {
		var timeInMilliSeconds = this.getTimeLeftBeforeBuildingFinishToBuild();
		var textToDisplay = com_isartdigital_builder_game_utils_TimeUtils.getTimeLeftFromMilliseconds(timeInMilliSeconds);
		this.timeText.text = textToDisplay;
		this.centerTextOnBuilding();
	}
	,updateBuildingLevel: function() {
		var buildingLevelInGlobalMap = this.building.getModelInGlobalMap().lvl;
		if(buildingLevelInGlobalMap > 0) this.updateGraphicState();
	}
	,updateGraphicState: function() {
		(js_Boot.__cast(this.building.getAnim() , pixi_display_FlumpMovie)).gotoAndStop(this.building.buildingLevel * 2);
	}
	,getTimeLeftBeforeBuildingFinishToBuild: function() {
		var constructionEndTimestamp = this.getConstructionEndTimestamp();
		var nowTimestamp = new Date().getTime();
		return constructionEndTimestamp - nowTimestamp;
	}
	,getConstructionEndTimestamp: function() {
		var model = this.building.getModelInGlobalMap();
		this.throwErrorIfBuildingModelDontHave(model.construct_end_at);
		var constructionEnd;
		var s = model.construct_end_at;
		constructionEnd = HxOverrides.strDate(s);
		var constructionEndTimestamp = constructionEnd.getTime();
		return constructionEndTimestamp;
	}
	,centerAnimationOverBuilding: function() {
		var buildingMaxSize = Math.max(this.building.definition.size.width,this.building.definition.size.height);
		var animationScale = buildingMaxSize / 2.5;
		this.animation.scale = new PIXI.Point(animationScale,animationScale);
		this.animation.position = new PIXI.Point(0,10);
	}
	,throwErrorIfBuildingModelDontHave: function(constructEndDate) {
		if(constructEndDate == null) throw new js__$Boot_HaxeError(com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions.constructEndDateIsNull);
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingTimebase
};
var com_isartdigital_builder_game_sprites_buildings_BuildingUpgrader = function(building) {
	this.building = building;
};
$hxClasses["com.isartdigital.builder.game.sprites.buildings.BuildingUpgrader"] = com_isartdigital_builder_game_sprites_buildings_BuildingUpgrader;
com_isartdigital_builder_game_sprites_buildings_BuildingUpgrader.__name__ = ["com","isartdigital","builder","game","sprites","buildings","BuildingUpgrader"];
com_isartdigital_builder_game_sprites_buildings_BuildingUpgrader.prototype = {
	canUpgrade: function() {
		var config = this.building.getConfig();
		if(config.upgrade_price == null) return false;
		return true;
	}
	,hasNextLevel: function() {
		var config = this.building.getConfig();
		if(config.upgrade_price == null) return false;
		return true;
	}
	,upgrade: function() {
		var position = this.building.positionToModel(true);
		var buildingModel = this.building.getModelInGlobalMap();
		var configBeforeUpgrade = this.building.getConfig();
		var configAfterUpgrade;
		var upgradeEnd;
		if(!this.canUpgrade()) throw new js__$Boot_HaxeError("You try to upgrade building but it can't be upgraded");
		if(!com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources(configBeforeUpgrade.resource_upgrade,configBeforeUpgrade.upgrade_price)) {
			com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_NOMONEY");
			return;
		}
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
		this.building.buildingLevel++;
		com_isartdigital_builder_api_Api.buildings.upgrade(position.x | 0,position.y | 0);
		configAfterUpgrade = this.building.getConfig();
		upgradeEnd = new Date().getTime() + (configAfterUpgrade.contruction_time * 1000 * 60 | 0);
		buildingModel.lvl++;
		var _this;
		var d = new Date();
		d.setTime(upgradeEnd);
		_this = d;
		buildingModel.construct_end_at = HxOverrides.dateStr(_this);
		com_isartdigital_builder_game_ftue_Ftue.event.emit("BUILDING_UPGRADED",{ buildingName : buildingModel.name});
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_BuildingUpgrader
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
		if(building.isSelected) building.setBuildingUnselected();
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
		if(building.isMoving && building != buildingSource) return true;
	}
	return false;
};
com_isartdigital_builder_game_sprites_buildings_BuildingUtils.isBuildingOriginInGlobalMapAt = function(position) {
	return com_isartdigital_builder_game_map_GMap.isModelElementOriginInGlobalMapAt(position,"building");
};
com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getBuildingSizeInPixelBy = function(building) {
	return new PIXI.Point(_$UInt_UInt_$Impl_$.toFloat(building.definition.size.width * com_isartdigital_utils_Config.tileWidth),_$UInt_UInt_$Impl_$.toFloat(building.definition.size.height * com_isartdigital_utils_Config.tileHeight));
};
com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getConfigByName = function(name,level) {
	var buildingsSettings = com_isartdigital_utils_loader_GameLoader.getContent("json/buildingsSettings.json");
	var buildingSetting = Reflect.field(buildingsSettings,name);
	if(buildingSetting == null) throw new js__$Boot_HaxeError(com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions.configNotFound + " | Building name : " + name);
	if(com_isartdigital_builder_game_sprites_buildings_BuildingUtils.isUpgradableBuilding(name)) buildingSetting = Reflect.field(buildingSetting,"" + (level + 1));
	return buildingSetting;
};
com_isartdigital_builder_game_sprites_buildings_BuildingUtils.isUpgradableBuilding = function(name) {
	var buildingsSettings = com_isartdigital_utils_loader_GameLoader.getContent("json/buildingsSettings.json");
	var buildingSetting = Reflect.field(buildingsSettings,name);
	if(buildingSetting == null) throw new js__$Boot_HaxeError(com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions.configNotFound);
	return Reflect.field(buildingSetting,"1") != null;
};
com_isartdigital_builder_game_sprites_buildings_BuildingUtils.setBuildingVisibleAt = function(position) {
	var buildingModel = com_isartdigital_builder_game_map_GMap.getElementByTypeAt(position,"building");
	if(buildingModel == null) return;
	if(com_isartdigital_builder_game_map_GMap.getElementByTypeAt(position,"building").reference != null) com_isartdigital_builder_game_map_GMap.getElementByTypeAt(position,"building").reference.visible = true;
};
com_isartdigital_builder_game_sprites_buildings_BuildingUtils.isBuildingModelExist = function(name) {
	try {
		com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getBuildingsModel(name);
		return true;
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		if( js_Boot.__instanceof(e,String) ) {
			return false;
		} else throw(e);
	}
};
com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getBuildingsModel = function(name) {
	var buildingsModel = [];
	var buildingModel;
	var _g1 = 0;
	var _g = com_isartdigital_builder_game_sprites_buildings_Building.buildingsModel.length;
	while(_g1 < _g) {
		var i = _g1++;
		buildingModel = com_isartdigital_builder_game_sprites_buildings_Building.buildingsModel[i];
		if(buildingModel.name == name) buildingsModel.push(buildingModel);
	}
	if(buildingsModel.length == 0) throw new js__$Boot_HaxeError("BuildingUtils :: You try to get building but it doesnt exist. Use isBuildingModelExist(name:String):Bool");
	return buildingsModel;
};
com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getTotalHouse = function() {
	if(com_isartdigital_builder_game_sprites_buildings_BuildingUtils.isBuildingModelExist("house")) return com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getBuildingsModel("house").length; else return 0;
};
com_isartdigital_builder_game_sprites_buildings_BuildingUtils.removeActionComponent = function(components,componentToRemove) {
	var newComponents = [];
	var _g = 0;
	while(_g < components.length) {
		var component = components[_g];
		++_g;
		if(component != componentToRemove) newComponents.push(component);
	}
	return newComponents;
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
		if(com_isartdigital_builder_game_sprites_buildings_BuildingUtils.thereIsOtherBuildingMovingThan(this.lantern) || com_isartdigital_builder_ui_UIManager.mouseIsOverUI) return;
		if(this.isLanternAlreadyIlluminated()) com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_LANTERNINFO"); else {
			com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_LANTERNCONFIRM");
			this.listenBuyEvent();
			com_isartdigital_builder_game_ftue_Ftue.event.emit("LANTERN_SELECT");
		}
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
			com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
			this.lantern.upgradeLantern();
			this.lantern.setUnselectedGraphicState();
			com_isartdigital_builder_game_sprites_Tile.illumineTileInRadiusAt(buildingPosition,com_isartdigital_builder_game_sprites_Tile.getLanternActionRadius());
			com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources(this.ressourceTypeToSpend,this.ressourceAmountToSpend);
			com_isartdigital_builder_api_Api.lanterns.create(buildingPosition.x | 0,buildingPosition.y | 0,isHardPurchasing,$bind(this,this.cbOnLanternBought));
			com_isartdigital_utils_facebook_Facebook.shareOnWall({ message : "Je viens d'acheter une nouvelle lanterne, je l'attendais depuis tellement longtemps ^^", link : "https://apps.facebook.com/builderisart"});
		} else com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_NOMONEY");
		this.forgetBuyEvent();
		com_isartdigital_builder_game_ftue_Ftue.event.emit("LANTERN_BOUGHT");
	}
	,setHardAmountToSpend: function() {
		var lanternConfig = this.lantern.getConfig();
		this.ressourceTypeToSpend = "spice";
		this.ressourceAmountToSpend = lanternConfig.hard_price * com_isartdigital_services_Users.getTotalIlluminatedLanterns() + lanternConfig.base_hard_price;
	}
	,setNormalAmountToSpend: function() {
		var lanternConfig = this.lantern.getConfig();
		this.ressourceTypeToSpend = "gold";
		this.ressourceAmountToSpend = lanternConfig.price * com_isartdigital_services_Users.getTotalIlluminatedLanterns() + lanternConfig.base_price;
	}
	,thereIsEnoughtResources: function() {
		return com_isartdigital_builder_game_manager_RessourceManager.getInstance().getRessources(this.ressourceTypeToSpend) > this.ressourceAmountToSpend;
	}
	,cbOnLanternBought: function(results) {
		var results1 = JSON.parse(results);
		if(results1.error) {
			com_isartdigital_builder_api_ApiUtils.displayError(results1.errorCode,results1.errorMessage);
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
		if(this.cantInteract()) return;
		if(this.canConstructRequest()) {
			this.constructBuilding();
			com_isartdigital_utils_game_Camera.activateCamera();
			this.building.stopMove();
			this.building.emitSelectEvent();
		} else if(this.canHarvest()) this.building.buildingHarvester.harvest(); else if(this.canSelectBuilding()) this.building.select(); else if(this.canUnselectBuilding()) com_isartdigital_builder_game_sprites_buildings_BuildingUtils.unselectBuildingSelected();
	}
	,cantInteract: function() {
		return this.cameraIsMoving() || this.building.isMoving && this.building.buildingPosition.isCursorNotOverBuilding() || this.isBuildingMovingAndCantConstruct();
	}
	,cameraIsMoving: function() {
		return com_isartdigital_utils_game_Camera.getInstance().hasMoved;
	}
	,canConstructRequest: function() {
		return this.building.isMoving && this.canConstruct();
	}
	,isBuildingMovingAndCantConstruct: function() {
		return this.building.isMoving && !this.canConstruct();
	}
	,canConstruct: function() {
		var destination = this.building.positionToModel(true);
		this.building.buildingConstructor.setDestination(destination);
		return this.building.buildingConstructor.canConstruct();
	}
	,constructBuilding: function() {
		var destination = this.building.positionToModel(true);
		this.building.buildingConstructor.setDestination(destination);
		if(this.building.buildingConstructor.canConstruct()) {
			this.building.buildingConstructor.construct();
			this.building.filters = null;
		}
	}
	,canHarvest: function() {
		if(this.building.hasHarvestableFunctionality) return this.building.buildingHarvester.canHarvest() && this.canSelectBuilding() && !this.canUnselectBuilding(); else return false;
	}
	,canSelectBuilding: function() {
		return !com_isartdigital_builder_game_sprites_buildings_BuildingUtils.thereIsOtherBuildingMovingThan(this.building) && !this.building.isSelected;
	}
	,canUnselectBuilding: function() {
		return this.building.isSelected;
	}
	,__class__: com_isartdigital_builder_game_sprites_buildings_interactionStrategy_NormalStrategy
});
var com_isartdigital_builder_game_sprites_citizen_Citizen = function(assetName,isPassiveCitizen) {
	if(isPassiveCitizen == null) isPassiveCitizen = false;
	this.modelHeight = 1;
	this.modelWidth = 1;
	this.isPassiveCitizen = false;
	this.nextPositionToReach = null;
	this.isCurrentlyMoving = false;
	this.pathToFollow = [];
	this.timeToRunThough100Pixel = 0.25;
	this.trailsActivated = true;
	com_isartdigital_utils_game_StateGraphic.call(this);
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	this.isPassiveCitizen = isPassiveCitizen;
	if(assetName == null) this.assetName = this.getRandomAssetName(); else this.assetName = assetName;
	this.setState(this.DEFAULT_STATE);
	this.boxType = com_isartdigital_utils_game_BoxType.NONE;
	com_isartdigital_builder_game_sprites_citizen_Citizen.list.push(this);
	this.alpha = 0;
	if(!isPassiveCitizen) motion_Actuate.tween(this,3,{ alpha : 0.75}).ease(motion_easing_Linear.get_easeNone());
	this.createTrails();
};
$hxClasses["com.isartdigital.builder.game.sprites.citizen.Citizen"] = com_isartdigital_builder_game_sprites_citizen_Citizen;
com_isartdigital_builder_game_sprites_citizen_Citizen.__name__ = ["com","isartdigital","builder","game","sprites","citizen","Citizen"];
com_isartdigital_builder_game_sprites_citizen_Citizen.__interfaces__ = [com_isartdigital_utils_game_iso_IZSortable];
com_isartdigital_builder_game_sprites_citizen_Citizen.hideAllPassiveCitizens = function() {
	com_isartdigital_builder_game_sprites_citizen_Citizen.toggleAllPassiveCitizensVisibility(false);
};
com_isartdigital_builder_game_sprites_citizen_Citizen.showAllPassiveCitizens = function() {
	com_isartdigital_builder_game_sprites_citizen_Citizen.toggleAllPassiveCitizensVisibility(true);
};
com_isartdigital_builder_game_sprites_citizen_Citizen.toggleAllPassiveCitizensVisibility = function(show) {
	var _g = 0;
	var _g1 = com_isartdigital_builder_game_sprites_citizen_Citizen.passiveCitizens;
	while(_g < _g1.length) {
		var passiveCitizen = _g1[_g];
		++_g;
		motion_Actuate.tween(passiveCitizen,2,{ alpha : show?1:0}).ease(motion_easing_Cubic.get_easeInOut());
	}
};
com_isartdigital_builder_game_sprites_citizen_Citizen.reInitAllPassiveCitizenPath = function() {
	var _g1 = 0;
	var _g = com_isartdigital_builder_game_sprites_citizen_Citizen.passiveCitizens.length;
	while(_g1 < _g) {
		var i = _g1++;
		com_isartdigital_builder_game_sprites_citizen_Citizen.passiveCitizens[i].setPath(com_isartdigital_builder_game_map_GMap.getRandomAvailablePosition());
	}
};
com_isartdigital_builder_game_sprites_citizen_Citizen.createCitizenAtRandomPosition = function() {
	var citizen = new com_isartdigital_builder_game_sprites_citizen_Citizen(null,true);
	citizen.position = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(com_isartdigital_builder_game_map_GMap.getRandomAvailablePosition());
	citizen.setPath(com_isartdigital_builder_game_map_GMap.getRandomAvailablePosition());
	citizen.setNewTimeToRunThough100Pixel(1);
	citizen.start();
	com_isartdigital_utils_game_GameStage.getInstance().getBuildingsContainer().addChild(citizen);
	com_isartdigital_builder_game_sprites_citizen_Citizen.passiveCitizens.push(citizen);
};
com_isartdigital_builder_game_sprites_citizen_Citizen.__super__ = com_isartdigital_utils_game_StateGraphic;
com_isartdigital_builder_game_sprites_citizen_Citizen.prototype = $extend(com_isartdigital_utils_game_StateGraphic.prototype,{
	setNewTimeToRunThough100Pixel: function(value) {
		this.timeToRunThough100Pixel = value;
	}
	,getRandomAssetName: function() {
		return com_isartdigital_builder_game_sprites_citizen_Citizen.assetNameList[Math.floor(Math.random() * com_isartdigital_builder_game_sprites_citizen_Citizen.assetNameList.length)];
	}
	,setNoTransparency: function() {
		motion_Actuate.tween(this,0.25,{ alpha : 1}).ease(motion_easing_Linear.get_easeNone());
	}
	,getPositionInModel: function() {
		if(this.nextPositionToReach != null) return com_isartdigital_utils_game_iso_IsoManager.isoToModelView(this.nextPositionToReach);
		return com_isartdigital_utils_game_iso_IsoManager.isoToModelView(this.position);
	}
	,hasReachEndPositionOfPath: function() {
		return this.pathToFollow.length == 0;
	}
	,setPath: function(targetDestination) {
		var map = new com_isartdigital_builder_game_manager_Maps(100,100);
		var pathfinder = new com_isartdigital_utils_lib_pathfinder_Pathfinder(map);
		var startCoordinate = new com_isartdigital_utils_lib_pathfinder_Coordinate(Std["int"](this.getPositionInModel().x),Std["int"](this.getPositionInModel().y));
		var targetCoordinate = new com_isartdigital_utils_lib_pathfinder_Coordinate(targetDestination.x | 0,targetDestination.y | 0);
		var methodType = com_isartdigital_utils_lib_pathfinder_EHeuristic.PRODUCT;
		var isDiagonalEnable = true;
		var isMapDynamic = true;
		var path = pathfinder.createPath(startCoordinate,targetCoordinate,methodType,isDiagonalEnable,isMapDynamic);
		if(path != null) this.refreshPathToFollow(path);
	}
	,getPathToFollow: function() {
		return this.pathToFollow;
	}
	,refreshPathToFollow: function(path) {
		this.pathToFollow = [];
		var _g1 = 1;
		var _g = path.length;
		while(_g1 < _g) {
			var i = _g1++;
			var pathPositionInIso = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(new PIXI.Point(path[i].x,path[i].y));
			this.pathToFollow.push(pathPositionInIso);
		}
		if(this.isCurrentlyMoving == false) this.move(true);
	}
	,move: function(accelerate) {
		if(accelerate == null) accelerate = false;
		if(this.pathToFollow.length == 0) {
			this.isCurrentlyMoving = false;
			if(this.isPassiveCitizen) this.setPath(com_isartdigital_builder_game_map_GMap.getRandomAvailablePosition());
			return;
		}
		if(this.isPassiveCitizen && Math.random() < 0.05) {
			var fireworksPosition = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(this.getPositionInModel());
			var verticalOffset = 500;
			fireworksPosition.y -= verticalOffset;
			com_isartdigital_builder_game_animation_fireworks_AnimationFireworksBuilder.create().withFireworksName(com_isartdigital_builder_game_animation_fireworks_AnimationFireworks.getRandomFireworks()).withShotAnimation(true).withContainer(com_isartdigital_utils_game_GameStage.getInstance().getFireworksContainer()).withPosition(fireworksPosition).build();
		}
		this.isCurrentlyMoving = true;
		this.nextPositionToReach = this.pathToFollow.shift();
		this.changeOrientation();
		this.changeModelSize();
		if(accelerate) motion_Actuate.tween(this.position,this.getTimeToReachNextPosition() * 3,{ x : this.nextPositionToReach.x, y : this.nextPositionToReach.y}).ease(motion_easing_Quad.get_easeIn()).onUpdate($bind(this,this.onMoveUpdate),[]).onComplete($bind(this,this.move),[]); else if(this.pathToFollow.length == 0) motion_Actuate.tween(this.position,this.getTimeToReachNextPosition() * 3,{ x : this.nextPositionToReach.x, y : this.nextPositionToReach.y}).ease(motion_easing_Quad.get_easeOut()).onUpdate($bind(this,this.onMoveUpdate),[]).onComplete($bind(this,this.move),[]); else motion_Actuate.tween(this.position,this.getTimeToReachNextPosition(),{ x : this.nextPositionToReach.x, y : this.nextPositionToReach.y}).ease(motion_easing_Linear.get_easeNone()).onUpdate($bind(this,this.onMoveUpdate),[]).onComplete($bind(this,this.move),[]);
	}
	,changeModelSize: function() {
		if(this.scale.x > 0 && this.getFlumpMovie().get_currentFrame() == 0 || this.scale.x < 0 && this.getFlumpMovie().get_currentFrame() == 1) {
			this.modelWidth = 1;
			this.modelHeight = 3;
		} else if(this.scale.x > 0 && this.getFlumpMovie().get_currentFrame() == 1 || this.scale.x < 0 && this.getFlumpMovie().get_currentFrame() == 0) {
			this.modelWidth = 3;
			this.modelHeight = 1;
		}
	}
	,onMoveUpdate: function() {
		return;
		motion_Actuate.stop(this.position,["x","y"],false,false);
	}
	,getTimeToReachNextPosition: function() {
		return com_isartdigital_utils_MathUtils.getDistance(this.position,this.nextPositionToReach) / 100 * this.timeToRunThough100Pixel;
	}
	,changeOrientation: function() {
		var direction = this.getCurrentDirection();
		if(direction == "RIGHT") {
			(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(1);
			this.scale.x = 1;
		} else if(direction == "TOP") {
			(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(0);
			this.scale.x = 1;
		} else if(direction == "BOT") {
			(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(1);
			this.scale.x = -1;
		} else if(direction == "LEFT") {
			(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(0);
			this.scale.x = -1;
		} else if(direction == "TOP_LEFT") {
			(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(3);
			this.scale.x = 1;
		} else if(direction == "TOP_RIGHT") {
			(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(2);
			this.scale.x = -1;
		} else if(direction == "BOT_LEFT") {
			(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(2);
			this.scale.x = 1;
		} else if(direction == "BOT_RIGHT") {
			(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(4);
			this.scale.x = 1;
		}
	}
	,getCurrentDirection: function() {
		var positionModel = com_isartdigital_utils_game_iso_IsoManager.isoToModelView(this.position);
		var nextPositionModel = com_isartdigital_utils_game_iso_IsoManager.isoToModelView(this.nextPositionToReach);
		var direction = new PIXI.Point(positionModel.x - nextPositionModel.x,positionModel.y - nextPositionModel.y);
		var directionLength = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
		direction.set(direction.x / directionLength,direction.y / directionLength);
		direction.x *= 10;
		direction.y *= 10;
		direction.set(Math.round(direction.x),Math.round(direction.y));
		direction.x /= 10;
		direction.y /= 10;
		if(this.isDirectionEqual(direction,new PIXI.Point(-1,0))) return "LEFT";
		if(this.isDirectionEqual(direction,new PIXI.Point(1,0))) return "RIGHT";
		if(this.isDirectionEqual(direction,new PIXI.Point(0,-1))) return "TOP";
		if(this.isDirectionEqual(direction,new PIXI.Point(0,1))) return "BOT";
		if(this.isDirectionEqual(direction,new PIXI.Point(0.7,-0.7))) return "TOP_RIGHT";
		if(this.isDirectionEqual(direction,new PIXI.Point(-0.7,-0.7))) return "TOP_LEFT";
		if(this.isDirectionEqual(direction,new PIXI.Point(0.7,0.7))) return "BOT_RIGHT";
		if(this.isDirectionEqual(direction,new PIXI.Point(-0.7,0.7))) return "BOT_LEFT";
		throw new js__$Boot_HaxeError("citizen getCurrentDirection : incorrect direction : " + Std.string(direction));
	}
	,isDirectionEqual: function(direction,sourceToTest) {
		return direction.x == sourceToTest.x && direction.y == sourceToTest.y;
	}
	,disappear: function() {
		this.setPath(new PIXI.Point(this.getPositionInModel().x,0));
		motion_Actuate.tween(this,5,{ alpha : 0}).ease(motion_easing_Linear.get_easeNone()).onComplete($bind(this,this.destroy));
	}
	,createTrails: function() {
		if(this.trailsActivated) {
			com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrailsBuilder.create().withPosition(new PIXI.Point(this.x,this.y)).withAlpha(this.alpha).withContainer(com_isartdigital_utils_game_GameStage.getInstance().getBoatTrailsContainer()).build();
			haxe_Timer.delay($bind(this,this.createTrails),500 * this.timeToRunThough100Pixel | 0);
		}
	}
	,destroy: function() {
		this.trailsActivated = false;
		motion_Actuate.stop(this.position,["x","y"],false,false);
		this.parent.removeChild(this);
		com_isartdigital_builder_game_sprites_citizen_Citizen.list.splice(HxOverrides.indexOf(com_isartdigital_builder_game_sprites_citizen_Citizen.list,this,0),1);
		com_isartdigital_utils_game_StateGraphic.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_game_sprites_citizen_Citizen
});
var com_isartdigital_builder_game_sprites_citizen_CitizenDirections = function() { };
$hxClasses["com.isartdigital.builder.game.sprites.citizen.CitizenDirections"] = com_isartdigital_builder_game_sprites_citizen_CitizenDirections;
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.__name__ = ["com","isartdigital","builder","game","sprites","citizen","CitizenDirections"];
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
	return com_isartdigital_builder_game_GameManager.getInstance().getScreenRect().x;
};
com_isartdigital_builder_game_utils_CameraUtils.ScreenRight = function() {
	return com_isartdigital_builder_game_GameManager.getInstance().getScreenRect().x + com_isartdigital_builder_game_GameManager.getInstance().getScreenRect().width;
};
com_isartdigital_builder_game_utils_CameraUtils.ScreenTop = function() {
	return com_isartdigital_builder_game_GameManager.getInstance().getScreenRect().y;
};
com_isartdigital_builder_game_utils_CameraUtils.ScreenBottom = function() {
	return com_isartdigital_builder_game_GameManager.getInstance().getScreenRect().y + com_isartdigital_builder_game_GameManager.getInstance().getScreenRect().height;
};
com_isartdigital_builder_game_utils_CameraUtils.prototype = {
	__class__: com_isartdigital_builder_game_utils_CameraUtils
};
var com_isartdigital_builder_game_utils_Metadatas = function() { };
$hxClasses["com.isartdigital.builder.game.utils.Metadatas"] = com_isartdigital_builder_game_utils_Metadatas;
com_isartdigital_builder_game_utils_Metadatas.__name__ = ["com","isartdigital","builder","game","utils","Metadatas"];
com_isartdigital_builder_game_utils_Metadatas.init = function() {
	com_isartdigital_builder_game_utils_Metadatas.loadDatas();
	com_isartdigital_builder_game_utils_Metadatas.initParadeDetails();
	com_isartdigital_builder_game_utils_Metadatas.setBonusQualityInParadeSettings();
};
com_isartdigital_builder_game_utils_Metadatas.loadDatas = function() {
	com_isartdigital_builder_game_utils_Metadatas.levelReward = com_isartdigital_utils_loader_GameLoader.getContent("json/levelReward.json");
	com_isartdigital_builder_game_utils_Metadatas.parade = com_isartdigital_utils_loader_GameLoader.getContent("json/paradeSettings.json");
	com_isartdigital_builder_game_utils_Metadatas.paradePattern = com_isartdigital_utils_loader_GameLoader.getContent("json/paradePatern.json");
	com_isartdigital_builder_game_utils_Metadatas.shopItem = com_isartdigital_utils_loader_GameLoader.getContent("json/shopItem.json");
	com_isartdigital_builder_game_utils_Metadatas.buildingSettings = com_isartdigital_utils_loader_GameLoader.getContent("json/buildingsSettings.json");
	com_isartdigital_builder_game_utils_Metadatas.ftue = com_isartdigital_utils_loader_GameLoader.getContent("json/ftue.json");
	com_isartdigital_builder_game_utils_Metadatas.gifts = com_isartdigital_utils_loader_GameLoader.getContent("json/giftsSettings.json");
};
com_isartdigital_builder_game_utils_Metadatas.initParadeDetails = function() {
	var _g = 0;
	var _g1 = Reflect.fields(com_isartdigital_builder_game_utils_Metadatas.parade.main_building);
	while(_g < _g1.length) {
		var data = _g1[_g];
		++_g;
		var value = Reflect.field(com_isartdigital_builder_game_utils_Metadatas.parade.main_building,data);
		com_isartdigital_builder_game_utils_Metadatas.paradeDetails.set(data,value);
	}
};
com_isartdigital_builder_game_utils_Metadatas.setBonusQualityInParadeSettings = function() {
	var bonusQuality = Reflect.field(com_isartdigital_utils_loader_GameLoader.getContent("json/paradeSettings.json"),"bonus_quality");
	com_isartdigital_builder_game_utils_Metadatas.parade.bonus_quality = new haxe_ds_StringMap();
	var _g = 0;
	var _g1 = Reflect.fields(bonusQuality);
	while(_g < _g1.length) {
		var data = _g1[_g];
		++_g;
		var value = Reflect.field(bonusQuality,data);
		com_isartdigital_builder_game_utils_Metadatas.parade.bonus_quality.set(data,value);
	}
};
var com_isartdigital_builder_game_utils_TimeUtils = function() { };
$hxClasses["com.isartdigital.builder.game.utils.TimeUtils"] = com_isartdigital_builder_game_utils_TimeUtils;
com_isartdigital_builder_game_utils_TimeUtils.__name__ = ["com","isartdigital","builder","game","utils","TimeUtils"];
com_isartdigital_builder_game_utils_TimeUtils.getTimeLeftFromMilliseconds = function(timeInMilliSeconds) {
	var day = Math.floor(timeInMilliSeconds / 86400000);
	var hour = Math.floor((timeInMilliSeconds - day * 86400000) / 3600000);
	var minute = Math.floor((timeInMilliSeconds - day * 86400000 - hour * 3600000) / 60000);
	var second = Math.floor((timeInMilliSeconds - day * 86400000 - hour * 3600000 - minute * 60000) / 1000);
	var textToDisplay = "";
	if(day > 0) textToDisplay += day + ":"; else textToDisplay += "";
	if(hour > 0) textToDisplay += hour + ":"; else textToDisplay += "";
	if(minute > 0) textToDisplay += minute + ":"; else textToDisplay += "";
	textToDisplay += second;
	return textToDisplay;
};
var com_isartdigital_builder_game_utils_TypeDefUtils = function() {
};
$hxClasses["com.isartdigital.builder.game.utils.TypeDefUtils"] = com_isartdigital_builder_game_utils_TypeDefUtils;
com_isartdigital_builder_game_utils_TypeDefUtils.__name__ = ["com","isartdigital","builder","game","utils","TypeDefUtils"];
com_isartdigital_builder_game_utils_TypeDefUtils.getValue = function(pTypeDef) {
	if(Object.prototype.hasOwnProperty.call(pTypeDef,"x")) haxe_Log.trace("he got",{ fileName : "TypeDefUtils.hx", lineNumber : 29, className : "com.isartdigital.builder.game.utils.TypeDefUtils", methodName : "getValue"});
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
		if(com_isartdigital_utils_Config.get_debug() && com_isartdigital_utils_Config.get_data().cheat && !com_isartdigital_utils_system_DeviceCapabilities.get_isCocoonJS()) this.gui = new dat.gui.GUI();
	}
	,ingame: function() {
		if(this.gui == null) return;
		var debugGUI = this.gui.addFolder("Debugg");
		debugGUI.add({ destroyAccount : function() {
			js_Browser.getLocalStorage().removeItem("FTUE_STEP");
			com_isartdigital_builder_api_Api.user.destroy(function(result) {
				window.location.reload();
			});
		}},"destroyAccount");
		debugGUI.add(com_isartdigital_utils_Debug,"debugPositionOnClick").listen();
		debugGUI.add(com_isartdigital_utils_Debug,"debugIlluminateTileAtClick").listen();
		debugGUI.add({ getAllLanternPosition : function() {
			var positions = [];
			var debugPointToRemove;
			var _g = 0;
			var _g1 = com_isartdigital_utils_Debug.debugPointsList;
			while(_g < _g1.length) {
				var debugPoint = _g1[_g];
				++_g;
				positions.push(com_isartdigital_utils_game_iso_IsoManager.isoToModelView(debugPoint.position,true));
			}
			debugPointToRemove = com_isartdigital_utils_Debug.debugPointsList.pop();
			debugPointToRemove.parent.removeChild(debugPointToRemove);
			positions.pop();
			haxe_Log.trace(JSON.stringify(positions),{ fileName : "CheatPanel.hx", lineNumber : 80, className : "com.isartdigital.builder.ui.CheatPanel", methodName : "ingame"});
		}},"getAllLanternPosition");
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
	this.interactive = true;
};
$hxClasses["com.isartdigital.utils.ui.UIComponent"] = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_utils_ui_UIComponent.__name__ = ["com","isartdigital","utils","ui","UIComponent"];
com_isartdigital_utils_ui_UIComponent.__super__ = com_isartdigital_utils_game_GameObject;
com_isartdigital_utils_ui_UIComponent.prototype = $extend(com_isartdigital_utils_game_GameObject.prototype,{
	_mouseOver: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("ON_MOUSE_OVER_UI");
	}
	,_mouseOut: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("ON_MOUSE_OUT_UI");
	}
	,subscribeButtonsClickAndTap: function(callBack,list) {
		var _g = 0;
		while(_g < list.length) {
			var button = list[_g];
			++_g;
			button.tap = button.click = callBack;
		}
	}
	,setVisibilityInList: function(visibility,list) {
		var _g = 0;
		while(_g < list.length) {
			var object = list[_g];
			++_g;
			object.visible = visibility;
		}
	}
	,unsubscribeButtonsClickAndTap: function(list) {
		var _g = 0;
		while(_g < list.length) {
			var button = list[_g];
			++_g;
			button.tap = button.click = null;
		}
	}
	,setListFromChild: function(childName,list) {
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.name == childName) list.push(child);
		}
	}
	,build: function() {
		var lClassName = Type.getClassName(js_Boot.getClass(this));
		lClassName = lClassName.substring(lClassName.lastIndexOf(".") + 1);
		var lItems = com_isartdigital_utils_ui_UIBuilder.build(lClassName);
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
				this.modalZone = new PIXI.Sprite(PIXI.Texture.fromImage(com_isartdigital_utils_Config.url(this.modalImage)));
				this.modalZone.interactive = true;
				this.modalZone.on("click",$bind(this,this.stopPropagation));
				this.modalZone.on("tap",$bind(this,this.stopPropagation));
				this.positionables.unshift({ item : this.modalZone, align : "topLeft", fit : "fitScreen", offsetX : 0, offsetY : 0});
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
			var positionable = _g1[_g];
			++_g;
			if(positionable.update) {
				if(positionable.align == "top" || positionable.align == "topLeft" || positionable.align == "topRight") positionable.offsetY = this.parent.y + positionable.item.y; else if(positionable.align == "bottom" || positionable.align == "bottomLeft" || positionable.align == "bottomRight") positionable.offsetY = com_isartdigital_utils_game_GameStage.getInstance().get_safeZone().height - this.parent.y - positionable.item.y;
				if(positionable.align == "left" || positionable.align == "topLeft" || positionable.align == "bottomLeft") positionable.offsetX = this.parent.x + positionable.item.x; else if(positionable.align == "right" || positionable.align == "topRight" || positionable.align == "bottomRight") positionable.offsetX = com_isartdigital_utils_game_GameStage.getInstance().get_safeZone().width - this.parent.x - positionable.item.x;
				positionable.update = false;
			}
			com_isartdigital_utils_ui_UIPosition.setPosition(positionable.item,positionable.align,positionable.fit,positionable.offsetX,positionable.offsetY);
		}
	}
	,destroy: function() {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("ON_MOUSE_OUT_UI");
		this.off("mouseover",$bind(this,this._mouseOver));
		this.off("mouseout",$bind(this,this._mouseOut));
		this.off("mouseupoutside",$bind(this,this._mouseOut));
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
	this.titleCard = new com_isartdigital_utils_game_StateGraphic("titlecard");
	this.titleCard.scale = new PIXI.Point(1.5,1.5);
	this.addChild(this.titleCard);
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
	,destroyLoadscreenSprite: function() {
		this.removeChild(this.titleCard);
		this.titleCard.destroy();
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
	this.subscribeUIEvent();
};
$hxClasses["com.isartdigital.builder.ui.UIManager"] = com_isartdigital_builder_ui_UIManager;
com_isartdigital_builder_ui_UIManager.__name__ = ["com","isartdigital","builder","ui","UIManager"];
com_isartdigital_builder_ui_UIManager.getInstance = function() {
	if(com_isartdigital_builder_ui_UIManager.instance == null) com_isartdigital_builder_ui_UIManager.instance = new com_isartdigital_builder_ui_UIManager();
	return com_isartdigital_builder_ui_UIManager.instance;
};
com_isartdigital_builder_ui_UIManager.mouseIsInteractingWithUI = function() {
	return com_isartdigital_builder_ui_UIManager.mouseIsOverUI || com_isartdigital_utils_ui_Button.buttonWasJustClicked;
};
com_isartdigital_builder_ui_UIManager.mouseIsNotInteractingWithUI = function() {
	return !com_isartdigital_builder_ui_UIManager.mouseIsInteractingWithUI();
};
com_isartdigital_builder_ui_UIManager.__super__ = EventEmitter;
com_isartdigital_builder_ui_UIManager.prototype = $extend(EventEmitter.prototype,{
	getPopins: function() {
		return this.popins;
	}
	,openScreen: function(pScreen) {
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
		this.emit("ON_MOUSE_OVER_UI");
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
		this.emit("ON_MOUSE_OUT_UI");
	}
	,openHud: function() {
		com_isartdigital_utils_game_GameStage.getInstance().getHudContainer().addChild(com_isartdigital_builder_ui_hud_Hud.getInstance());
		com_isartdigital_builder_ui_hud_Hud.getInstance().open();
	}
	,closeHud: function() {
		com_isartdigital_utils_game_GameStage.getInstance().getHudContainer().removeChild(com_isartdigital_builder_ui_hud_Hud.getInstance());
		com_isartdigital_builder_ui_hud_Hud.getInstance().close();
	}
	,openHudParade: function() {
		com_isartdigital_utils_game_GameStage.getInstance().getHudContainer().addChild(com_isartdigital_builder_ui_hud_HudParade.getInstance());
		com_isartdigital_builder_ui_hud_HudParade.getInstance().open();
	}
	,closeHudParade: function() {
		com_isartdigital_utils_game_GameStage.getInstance().getHudContainer().removeChild(com_isartdigital_builder_ui_hud_HudParade.getInstance());
		com_isartdigital_builder_ui_hud_HudParade.getInstance().close();
	}
	,startGame: function() {
		this.closeScreens();
		this.openHud();
	}
	,subscribeUIEvent: function() {
		this.on("CLOSE_POPIN_REQUEST",$bind(this,this.onClosePopin));
		this.on("OPEN_POPIN_REQUEST_LANTERNCONFIRM",$bind(this,this.onRequestLanternConfirm));
		this.on("OPEN_POPIN_REQUEST_MAINBUILDINGINFO",$bind(this,this.onRequestMainBuildingInfo));
		this.on("OPEN_POPIN_REQUEST_PARADECONFIRM",$bind(this,this.onRequestParadeConfirm));
		this.on("OPEN_POPIN_REQUEST_PARADEREWARD",$bind(this,this.onRequestParadeReward));
		this.on("OPEN_POPIN_REQUEST_SHOP_BUILDING",$bind(this,this.onRequestShopBuilding));
		this.on("OPEN_POPIN_REQUEST_SHOP_RESOURCE",$bind(this,this.onRequestShopResource));
		this.on("OPEN_POPIN_REQUEST_UPGRADEREWARD",$bind(this,this.onRequestUpgradeReward));
		this.on("OPEN_POPIN_REQUEST_LEVELREWARD",$bind(this,this.onRequestLevelReward));
		this.on("OPEN_POPIN_REQUEST_HARDBUILDCONFIRM",$bind(this,this.onRequestHardBuild));
		this.on("OPEN_POPIN_REQUEST_PARADECONTINUE",$bind(this,this.onRequestParadeContinue));
		this.on("OPEN_POPIN_REQUEST_LANTERNINFO",$bind(this,this.onRequestLanternInfo));
		this.on("OPEN_POPIN_REQUEST_UPGRADECONFIRM",$bind(this,this.onRequestUpgradeConfirm));
		this.on("OPEN_POPIN_REQUEST_DELETECONFIRM",$bind(this,this.onRequestDeleteConfirm));
		this.on("OPEN_POPIN_REQUEST_NOMONEY",$bind(this,this.onRequestNoMoney));
		this.on("OPEN_POPIN_REQUEST_PINATA",$bind(this,this.onRequestPinata));
		this.on("ON_MOUSE_OVER_UI",$bind(this,this.onMouseOverUI));
		this.on("ON_MOUSE_OUT_UI",$bind(this,this.onMouseOutUI));
	}
	,onRequestPinata: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_Pinata(params));
	}
	,onRequestNoMoney: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_NoMoneyInfo());
	}
	,onRequestDeleteConfirm: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_DeleteConfirm());
	}
	,onRequestUpgradeConfirm: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_UpgradeConfirm(params));
	}
	,onRequestLanternInfo: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_LanternInfo());
	}
	,onRequestParadeContinue: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_ParadeContinue());
	}
	,onRequestHardBuild: function(price) {
		this.openPopin(new com_isartdigital_builder_ui_popin_HardBuildConfirm(price));
	}
	,onClosePopin: function(params) {
		this.closeCurrentPopin();
	}
	,onRequestLevelReward: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_LevelReward());
	}
	,onRequestLanternConfirm: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_LanternConfirm());
	}
	,onRequestMainBuildingInfo: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_MainBuildingInfo());
	}
	,onRequestParadeConfirm: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_ParadeConfirm());
		com_isartdigital_builder_game_ftue_Ftue.event.emit("PARADE_CONFIRM");
	}
	,onRequestParadeReward: function(resources) {
		this.openPopin(new com_isartdigital_builder_ui_popin_ParadeReward(resources[0],resources[1],resources[2]));
	}
	,onRequestShopBuilding: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_Shop("BUILDING_SHOP"));
		com_isartdigital_builder_game_ftue_Ftue.event.emit("SHOP_OPENED");
	}
	,onRequestShopResource: function(params) {
		this.openPopin(new com_isartdigital_builder_ui_popin_Shop("RESSOURCE_SHOP"));
		com_isartdigital_builder_game_ftue_Ftue.event.emit("SHOP_OPENED");
	}
	,onRequestUpgradeReward: function(params) {
		if(com_isartdigital_services_Users.infos.ftue_complet) this.openPopin(new com_isartdigital_builder_ui_popin_UpgradeReward());
	}
	,onMouseOverUI: function(e) {
		this.setMouseIsOverUIStateTo(true);
	}
	,onMouseOutUI: function(e) {
		this.setMouseIsOverUIStateTo(false);
	}
	,setMouseIsOverUIStateTo: function(state) {
		com_isartdigital_builder_ui_UIManager.mouseIsOverUI = state;
	}
	,destroy: function() {
		com_isartdigital_builder_ui_UIManager.instance = null;
	}
	,__class__: com_isartdigital_builder_ui_UIManager
});
var com_isartdigital_utils_ui_Button = function() {
	com_isartdigital_utils_game_StateGraphic.call(this);
	this.boxType = com_isartdigital_utils_game_BoxType.SELF;
	this.interactive = true;
	this.buttonMode = true;
	this.defaultCursor = "url(cursor.png)";
	this.on("mouseover",$bind(this,this._mouseOver));
	this.on("mousedown",$bind(this,this._mouseDown));
	this.on("click",$bind(this,this._click));
	this.on("mouseout",$bind(this,this._mouseOut));
	this.on("mouseupoutside",$bind(this,this._mouseOut));
	this.on("touchend",$bind(this,this._click));
	this.on("touchstart",$bind(this,this._mouseDown));
	this.createText();
	this.start();
};
$hxClasses["com.isartdigital.utils.ui.Button"] = com_isartdigital_utils_ui_Button;
com_isartdigital_utils_ui_Button.__name__ = ["com","isartdigital","utils","ui","Button"];
com_isartdigital_utils_ui_Button.setButtonWasJustClickedToTrue = function() {
	com_isartdigital_utils_ui_Button.setButtonWasJustClickedTo(true);
	com_isartdigital_utils_ui_Button.setButtonWasJustClickedToFalseAfterDelay();
};
com_isartdigital_utils_ui_Button.setButtonWasJustClickedToFalseAfterDelay = function() {
	haxe_Timer.delay(function() {
		com_isartdigital_utils_ui_Button.setButtonWasJustClickedTo(false);
	},15);
};
com_isartdigital_utils_ui_Button.setButtonWasJustClickedTo = function(state) {
	com_isartdigital_utils_ui_Button.buttonWasJustClicked = state;
};
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
		com_isartdigital_utils_ui_Button.setButtonWasJustClickedToTrue();
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
var com_isartdigital_builder_ui_buttons_AdButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.AdButton"] = com_isartdigital_builder_ui_buttons_AdButton;
com_isartdigital_builder_ui_buttons_AdButton.__name__ = ["com","isartdigital","builder","ui","buttons","AdButton"];
com_isartdigital_builder_ui_buttons_AdButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_AdButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_AdButton
});
var com_isartdigital_builder_ui_hud_BuildingHudElement = function() { };
$hxClasses["com.isartdigital.builder.ui.hud.BuildingHudElement"] = com_isartdigital_builder_ui_hud_BuildingHudElement;
com_isartdigital_builder_ui_hud_BuildingHudElement.__name__ = ["com","isartdigital","builder","ui","hud","BuildingHudElement"];
com_isartdigital_builder_ui_hud_BuildingHudElement.prototype = {
	__class__: com_isartdigital_builder_ui_hud_BuildingHudElement
};
var com_isartdigital_builder_ui_buttons_ButtonsBuilding = function() {
	com_isartdigital_utils_ui_Button.call(this);
	this.interactive = true;
	this.buttonMode = true;
	this.click = this.tap = $bind(this,this.onClickEvent);
};
$hxClasses["com.isartdigital.builder.ui.buttons.ButtonsBuilding"] = com_isartdigital_builder_ui_buttons_ButtonsBuilding;
com_isartdigital_builder_ui_buttons_ButtonsBuilding.__name__ = ["com","isartdigital","builder","ui","buttons","ButtonsBuilding"];
com_isartdigital_builder_ui_buttons_ButtonsBuilding.__interfaces__ = [com_isartdigital_builder_ui_hud_BuildingHudElement];
com_isartdigital_builder_ui_buttons_ButtonsBuilding.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_ButtonsBuilding.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClickEvent: function(pEvent) {
		com_isartdigital_builder_Main.getInstance().emit(this.eventEmit);
		pEvent.stopPropagation();
	}
	,__class__: com_isartdigital_builder_ui_buttons_ButtonsBuilding
});
var com_isartdigital_builder_ui_buttons_BuyHardButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.BuyHardButton"] = com_isartdigital_builder_ui_buttons_BuyHardButton;
com_isartdigital_builder_ui_buttons_BuyHardButton.__name__ = ["com","isartdigital","builder","ui","buttons","BuyHardButton"];
com_isartdigital_builder_ui_buttons_BuyHardButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_BuyHardButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_BuyHardButton
});
var com_isartdigital_builder_ui_buttons_BuyOfferingButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.BuyOfferingButton"] = com_isartdigital_builder_ui_buttons_BuyOfferingButton;
com_isartdigital_builder_ui_buttons_BuyOfferingButton.__name__ = ["com","isartdigital","builder","ui","buttons","BuyOfferingButton"];
com_isartdigital_builder_ui_buttons_BuyOfferingButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_BuyOfferingButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_BuyOfferingButton
});
var com_isartdigital_builder_ui_buttons_BuyPesosButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.BuyPesosButton"] = com_isartdigital_builder_ui_buttons_BuyPesosButton;
com_isartdigital_builder_ui_buttons_BuyPesosButton.__name__ = ["com","isartdigital","builder","ui","buttons","BuyPesosButton"];
com_isartdigital_builder_ui_buttons_BuyPesosButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_BuyPesosButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_BuyPesosButton
});
var com_isartdigital_builder_ui_buttons_CancelButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.CancelButton"] = com_isartdigital_builder_ui_buttons_CancelButton;
com_isartdigital_builder_ui_buttons_CancelButton.__name__ = ["com","isartdigital","builder","ui","buttons","CancelButton"];
com_isartdigital_builder_ui_buttons_CancelButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_CancelButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_CancelButton
});
var com_isartdigital_builder_ui_buttons_CashButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.CashButton"] = com_isartdigital_builder_ui_buttons_CashButton;
com_isartdigital_builder_ui_buttons_CashButton.__name__ = ["com","isartdigital","builder","ui","buttons","CashButton"];
com_isartdigital_builder_ui_buttons_CashButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_CashButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_CashButton
});
var com_isartdigital_builder_ui_buttons_CheckBox = function() {
	this.active = false;
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.CheckBox"] = com_isartdigital_builder_ui_buttons_CheckBox;
com_isartdigital_builder_ui_buttons_CheckBox.__name__ = ["com","isartdigital","builder","ui","buttons","CheckBox"];
com_isartdigital_builder_ui_buttons_CheckBox.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_CheckBox.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	setActive: function() {
		this.anim.gotoAndStop(2);
		this.active = true;
	}
	,setInactive: function() {
		this.anim.gotoAndStop(0);
		this.active = false;
	}
	,_mouseOut: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("ON_MOUSE_OUT_UI");
	}
	,_click: function(pEvent) {
		if(this.active) this.setInactive(); else this.setActive();
	}
	,_mouseOver: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("ON_MOUSE_OVER_UI");
	}
	,_mouseDown: function(pEvent) {
	}
	,__class__: com_isartdigital_builder_ui_buttons_CheckBox
});
var com_isartdigital_builder_ui_buttons_CloseButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.tap = this.click = $bind(this,this.onClick);
};
$hxClasses["com.isartdigital.builder.ui.buttons.CloseButton"] = com_isartdigital_builder_ui_buttons_CloseButton;
com_isartdigital_builder_ui_buttons_CloseButton.__name__ = ["com","isartdigital","builder","ui","buttons","CloseButton"];
com_isartdigital_builder_ui_buttons_CloseButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_CloseButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
		this.destroy();
	}
	,__class__: com_isartdigital_builder_ui_buttons_CloseButton
});
var com_isartdigital_builder_ui_buttons_ColorButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_buttons_ButtonsBuilding.call(this);
	this.eventEmit = "PAINT_BUTTON";
};
$hxClasses["com.isartdigital.builder.ui.buttons.ColorButton"] = com_isartdigital_builder_ui_buttons_ColorButton;
com_isartdigital_builder_ui_buttons_ColorButton.__name__ = ["com","isartdigital","builder","ui","buttons","ColorButton"];
com_isartdigital_builder_ui_buttons_ColorButton.__super__ = com_isartdigital_builder_ui_buttons_ButtonsBuilding;
com_isartdigital_builder_ui_buttons_ColorButton.prototype = $extend(com_isartdigital_builder_ui_buttons_ButtonsBuilding.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_ColorButton
});
var com_isartdigital_builder_ui_buttons_ContinueHardButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.ContinueHardButton"] = com_isartdigital_builder_ui_buttons_ContinueHardButton;
com_isartdigital_builder_ui_buttons_ContinueHardButton.__name__ = ["com","isartdigital","builder","ui","buttons","ContinueHardButton"];
com_isartdigital_builder_ui_buttons_ContinueHardButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_ContinueHardButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_ContinueHardButton
});
var com_isartdigital_builder_ui_buttons_CreditButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.CreditButton"] = com_isartdigital_builder_ui_buttons_CreditButton;
com_isartdigital_builder_ui_buttons_CreditButton.__name__ = ["com","isartdigital","builder","ui","buttons","CreditButton"];
com_isartdigital_builder_ui_buttons_CreditButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_CreditButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_CreditButton
});
var com_isartdigital_builder_ui_buttons_DeleteButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_buttons_ButtonsBuilding.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.DeleteButton"] = com_isartdigital_builder_ui_buttons_DeleteButton;
com_isartdigital_builder_ui_buttons_DeleteButton.__name__ = ["com","isartdigital","builder","ui","buttons","DeleteButton"];
com_isartdigital_builder_ui_buttons_DeleteButton.__super__ = com_isartdigital_builder_ui_buttons_ButtonsBuilding;
com_isartdigital_builder_ui_buttons_DeleteButton.prototype = $extend(com_isartdigital_builder_ui_buttons_ButtonsBuilding.prototype,{
	onClickEvent: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_DELETECONFIRM");
	}
	,__class__: com_isartdigital_builder_ui_buttons_DeleteButton
});
var com_isartdigital_builder_ui_buttons_DisableButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.interactive = true;
	this.buttonMode = true;
	haxe_Log.trace("HIC BINCREAE",{ fileName : "DisableButton.hx", lineNumber : 18, className : "com.isartdigital.builder.ui.buttons.DisableButton", methodName : "new"});
};
$hxClasses["com.isartdigital.builder.ui.buttons.DisableButton"] = com_isartdigital_builder_ui_buttons_DisableButton;
com_isartdigital_builder_ui_buttons_DisableButton.__name__ = ["com","isartdigital","builder","ui","buttons","DisableButton"];
com_isartdigital_builder_ui_buttons_DisableButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_DisableButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_DisableButton
});
var com_isartdigital_builder_ui_buttons_DotButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_buttons_CheckBox.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.DotButton"] = com_isartdigital_builder_ui_buttons_DotButton;
com_isartdigital_builder_ui_buttons_DotButton.__name__ = ["com","isartdigital","builder","ui","buttons","DotButton"];
com_isartdigital_builder_ui_buttons_DotButton.__super__ = com_isartdigital_builder_ui_buttons_CheckBox;
com_isartdigital_builder_ui_buttons_DotButton.prototype = $extend(com_isartdigital_builder_ui_buttons_CheckBox.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_DotButton
});
var com_isartdigital_builder_ui_buttons_GoldButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.click = this.tap = $bind(this,this.onClick);
};
$hxClasses["com.isartdigital.builder.ui.buttons.GoldButton"] = com_isartdigital_builder_ui_buttons_GoldButton;
com_isartdigital_builder_ui_buttons_GoldButton.__name__ = ["com","isartdigital","builder","ui","buttons","GoldButton"];
com_isartdigital_builder_ui_buttons_GoldButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_GoldButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_SHOP_RESOURCE");
	}
	,__class__: com_isartdigital_builder_ui_buttons_GoldButton
});
var com_isartdigital_builder_ui_buttons_HardBuildButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	this.eventEmit = "HARDBUILD_BUTTON";
	com_isartdigital_builder_ui_buttons_ButtonsBuilding.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.HardBuildButton"] = com_isartdigital_builder_ui_buttons_HardBuildButton;
com_isartdigital_builder_ui_buttons_HardBuildButton.__name__ = ["com","isartdigital","builder","ui","buttons","HardBuildButton"];
com_isartdigital_builder_ui_buttons_HardBuildButton.__super__ = com_isartdigital_builder_ui_buttons_ButtonsBuilding;
com_isartdigital_builder_ui_buttons_HardBuildButton.prototype = $extend(com_isartdigital_builder_ui_buttons_ButtonsBuilding.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_HardBuildButton
});
var com_isartdigital_builder_ui_buttons_LeftButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.LeftButton"] = com_isartdigital_builder_ui_buttons_LeftButton;
com_isartdigital_builder_ui_buttons_LeftButton.__name__ = ["com","isartdigital","builder","ui","buttons","LeftButton"];
com_isartdigital_builder_ui_buttons_LeftButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_LeftButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_LeftButton
});
var com_isartdigital_builder_ui_buttons_MoveButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_buttons_ButtonsBuilding.call(this);
	this.eventEmit = "MOVE_BUTTON";
};
$hxClasses["com.isartdigital.builder.ui.buttons.MoveButton"] = com_isartdigital_builder_ui_buttons_MoveButton;
com_isartdigital_builder_ui_buttons_MoveButton.__name__ = ["com","isartdigital","builder","ui","buttons","MoveButton"];
com_isartdigital_builder_ui_buttons_MoveButton.__super__ = com_isartdigital_builder_ui_buttons_ButtonsBuilding;
com_isartdigital_builder_ui_buttons_MoveButton.prototype = $extend(com_isartdigital_builder_ui_buttons_ButtonsBuilding.prototype,{
	onClickEvent: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("ON_MOUSE_OUT_UI");
		com_isartdigital_builder_ui_buttons_ButtonsBuilding.prototype.onClickEvent.call(this,pEvent);
	}
	,__class__: com_isartdigital_builder_ui_buttons_MoveButton
});
var com_isartdigital_builder_ui_buttons_NextFtueButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.NextFtueButton"] = com_isartdigital_builder_ui_buttons_NextFtueButton;
com_isartdigital_builder_ui_buttons_NextFtueButton.__name__ = ["com","isartdigital","builder","ui","buttons","NextFtueButton"];
com_isartdigital_builder_ui_buttons_NextFtueButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_NextFtueButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_NextFtueButton
});
var com_isartdigital_builder_ui_buttons_NotificationButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_buttons_CheckBox.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.NotificationButton"] = com_isartdigital_builder_ui_buttons_NotificationButton;
com_isartdigital_builder_ui_buttons_NotificationButton.__name__ = ["com","isartdigital","builder","ui","buttons","NotificationButton"];
com_isartdigital_builder_ui_buttons_NotificationButton.__super__ = com_isartdigital_builder_ui_buttons_CheckBox;
com_isartdigital_builder_ui_buttons_NotificationButton.prototype = $extend(com_isartdigital_builder_ui_buttons_CheckBox.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_NotificationButton
});
var com_isartdigital_builder_ui_buttons_OfferingButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.click = this.tap = $bind(this,this.onClick);
};
$hxClasses["com.isartdigital.builder.ui.buttons.OfferingButton"] = com_isartdigital_builder_ui_buttons_OfferingButton;
com_isartdigital_builder_ui_buttons_OfferingButton.__name__ = ["com","isartdigital","builder","ui","buttons","OfferingButton"];
com_isartdigital_builder_ui_buttons_OfferingButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_OfferingButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_SHOP_RESOURCE");
	}
	,__class__: com_isartdigital_builder_ui_buttons_OfferingButton
});
var com_isartdigital_builder_ui_buttons_OkFtueButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.OkFtueButton"] = com_isartdigital_builder_ui_buttons_OkFtueButton;
com_isartdigital_builder_ui_buttons_OkFtueButton.__name__ = ["com","isartdigital","builder","ui","buttons","OkFtueButton"];
com_isartdigital_builder_ui_buttons_OkFtueButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_OkFtueButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_OkFtueButton
});
var com_isartdigital_builder_ui_buttons_ParadeButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.click = this.tap = $bind(this,this.onClick);
};
$hxClasses["com.isartdigital.builder.ui.buttons.ParadeButton"] = com_isartdigital_builder_ui_buttons_ParadeButton;
com_isartdigital_builder_ui_buttons_ParadeButton.__name__ = ["com","isartdigital","builder","ui","buttons","ParadeButton"];
com_isartdigital_builder_ui_buttons_ParadeButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_ParadeButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_PARADECONFIRM");
	}
	,__class__: com_isartdigital_builder_ui_buttons_ParadeButton
});
var com_isartdigital_builder_ui_buttons_ParadeMoreButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.ParadeMoreButton"] = com_isartdigital_builder_ui_buttons_ParadeMoreButton;
com_isartdigital_builder_ui_buttons_ParadeMoreButton.__name__ = ["com","isartdigital","builder","ui","buttons","ParadeMoreButton"];
com_isartdigital_builder_ui_buttons_ParadeMoreButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_ParadeMoreButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_ParadeMoreButton
});
var com_isartdigital_builder_ui_buttons_RewardButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.interactive = true;
	this.buttonMode = true;
};
$hxClasses["com.isartdigital.builder.ui.buttons.RewardButton"] = com_isartdigital_builder_ui_buttons_RewardButton;
com_isartdigital_builder_ui_buttons_RewardButton.__name__ = ["com","isartdigital","builder","ui","buttons","RewardButton"];
com_isartdigital_builder_ui_buttons_RewardButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_RewardButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_RewardButton
});
var com_isartdigital_builder_ui_buttons_RightButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.RightButton"] = com_isartdigital_builder_ui_buttons_RightButton;
com_isartdigital_builder_ui_buttons_RightButton.__name__ = ["com","isartdigital","builder","ui","buttons","RightButton"];
com_isartdigital_builder_ui_buttons_RightButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_RightButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_RightButton
});
var com_isartdigital_builder_ui_buttons_SFXButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_buttons_CheckBox.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.SFXButton"] = com_isartdigital_builder_ui_buttons_SFXButton;
com_isartdigital_builder_ui_buttons_SFXButton.__name__ = ["com","isartdigital","builder","ui","buttons","SFXButton"];
com_isartdigital_builder_ui_buttons_SFXButton.__super__ = com_isartdigital_builder_ui_buttons_CheckBox;
com_isartdigital_builder_ui_buttons_SFXButton.prototype = $extend(com_isartdigital_builder_ui_buttons_CheckBox.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_SFXButton
});
var com_isartdigital_builder_ui_buttons_SettingButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.SettingButton"] = com_isartdigital_builder_ui_buttons_SettingButton;
com_isartdigital_builder_ui_buttons_SettingButton.__name__ = ["com","isartdigital","builder","ui","buttons","SettingButton"];
com_isartdigital_builder_ui_buttons_SettingButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_SettingButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_SettingButton
});
var com_isartdigital_builder_ui_buttons_ShareButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.click = this.tap = $bind(this,this.shareContent);
};
$hxClasses["com.isartdigital.builder.ui.buttons.ShareButton"] = com_isartdigital_builder_ui_buttons_ShareButton;
com_isartdigital_builder_ui_buttons_ShareButton.__name__ = ["com","isartdigital","builder","ui","buttons","ShareButton"];
com_isartdigital_builder_ui_buttons_ShareButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_ShareButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	shareContent: function(event) {
		com_isartdigital_utils_facebook_Facebook.ui({ method : "share", href : "https://fbgame.isartdigital.com/2017_builder/builder2", quote : "Mon batiment viens de monter d'un niveau dans Fiesta Ultima !!"},function(response) {
		});
	}
	,__class__: com_isartdigital_builder_ui_buttons_ShareButton
});
var com_isartdigital_builder_ui_buttons_ShopBuildingButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_buttons_CheckBox.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.ShopBuildingButton"] = com_isartdigital_builder_ui_buttons_ShopBuildingButton;
com_isartdigital_builder_ui_buttons_ShopBuildingButton.__name__ = ["com","isartdigital","builder","ui","buttons","ShopBuildingButton"];
com_isartdigital_builder_ui_buttons_ShopBuildingButton.__super__ = com_isartdigital_builder_ui_buttons_CheckBox;
com_isartdigital_builder_ui_buttons_ShopBuildingButton.prototype = $extend(com_isartdigital_builder_ui_buttons_CheckBox.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_ShopBuildingButton
});
var com_isartdigital_builder_ui_buttons_ShopButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.tap = this.click = $bind(this,this.onClick);
};
$hxClasses["com.isartdigital.builder.ui.buttons.ShopButton"] = com_isartdigital_builder_ui_buttons_ShopButton;
com_isartdigital_builder_ui_buttons_ShopButton.__name__ = ["com","isartdigital","builder","ui","buttons","ShopButton"];
com_isartdigital_builder_ui_buttons_ShopButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_ShopButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_SHOP_BUILDING");
	}
	,__class__: com_isartdigital_builder_ui_buttons_ShopButton
});
var com_isartdigital_builder_ui_buttons_ShopBuyHardButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.ShopBuyHardButton"] = com_isartdigital_builder_ui_buttons_ShopBuyHardButton;
com_isartdigital_builder_ui_buttons_ShopBuyHardButton.__name__ = ["com","isartdigital","builder","ui","buttons","ShopBuyHardButton"];
com_isartdigital_builder_ui_buttons_ShopBuyHardButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_ShopBuyHardButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_ShopBuyHardButton
});
var com_isartdigital_builder_ui_buttons_ShopBuySoftButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.ShopBuySoftButton"] = com_isartdigital_builder_ui_buttons_ShopBuySoftButton;
com_isartdigital_builder_ui_buttons_ShopBuySoftButton.__name__ = ["com","isartdigital","builder","ui","buttons","ShopBuySoftButton"];
com_isartdigital_builder_ui_buttons_ShopBuySoftButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_ShopBuySoftButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_ShopBuySoftButton
});
var com_isartdigital_builder_ui_buttons_ShopRessourceButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_buttons_CheckBox.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.ShopRessourceButton"] = com_isartdigital_builder_ui_buttons_ShopRessourceButton;
com_isartdigital_builder_ui_buttons_ShopRessourceButton.__name__ = ["com","isartdigital","builder","ui","buttons","ShopRessourceButton"];
com_isartdigital_builder_ui_buttons_ShopRessourceButton.__super__ = com_isartdigital_builder_ui_buttons_CheckBox;
com_isartdigital_builder_ui_buttons_ShopRessourceButton.prototype = $extend(com_isartdigital_builder_ui_buttons_CheckBox.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_ShopRessourceButton
});
var com_isartdigital_builder_ui_buttons_SoundButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_buttons_CheckBox.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.SoundButton"] = com_isartdigital_builder_ui_buttons_SoundButton;
com_isartdigital_builder_ui_buttons_SoundButton.__name__ = ["com","isartdigital","builder","ui","buttons","SoundButton"];
com_isartdigital_builder_ui_buttons_SoundButton.__super__ = com_isartdigital_builder_ui_buttons_CheckBox;
com_isartdigital_builder_ui_buttons_SoundButton.prototype = $extend(com_isartdigital_builder_ui_buttons_CheckBox.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_SoundButton
});
var com_isartdigital_builder_ui_buttons_SpiceButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.click = this.tap = $bind(this,this.onClick);
};
$hxClasses["com.isartdigital.builder.ui.buttons.SpiceButton"] = com_isartdigital_builder_ui_buttons_SpiceButton;
com_isartdigital_builder_ui_buttons_SpiceButton.__name__ = ["com","isartdigital","builder","ui","buttons","SpiceButton"];
com_isartdigital_builder_ui_buttons_SpiceButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_SpiceButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	onClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_SHOP_RESOURCE");
	}
	,__class__: com_isartdigital_builder_ui_buttons_SpiceButton
});
var com_isartdigital_builder_ui_buttons_UpgradeButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_buttons_ButtonsBuilding.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.UpgradeButton"] = com_isartdigital_builder_ui_buttons_UpgradeButton;
com_isartdigital_builder_ui_buttons_UpgradeButton.__name__ = ["com","isartdigital","builder","ui","buttons","UpgradeButton"];
com_isartdigital_builder_ui_buttons_UpgradeButton.__super__ = com_isartdigital_builder_ui_buttons_ButtonsBuilding;
com_isartdigital_builder_ui_buttons_UpgradeButton.prototype = $extend(com_isartdigital_builder_ui_buttons_ButtonsBuilding.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_UpgradeButton
});
var com_isartdigital_builder_ui_buttons_UpgradeDisableButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.interactive = true;
	this.buttonMode = true;
};
$hxClasses["com.isartdigital.builder.ui.buttons.UpgradeDisableButton"] = com_isartdigital_builder_ui_buttons_UpgradeDisableButton;
com_isartdigital_builder_ui_buttons_UpgradeDisableButton.__name__ = ["com","isartdigital","builder","ui","buttons","UpgradeDisableButton"];
com_isartdigital_builder_ui_buttons_UpgradeDisableButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_UpgradeDisableButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_UpgradeDisableButton
});
var com_isartdigital_builder_ui_buttons_UpgradeValideButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
	this.interactive = true;
	this.buttonMode = true;
};
$hxClasses["com.isartdigital.builder.ui.buttons.UpgradeValideButton"] = com_isartdigital_builder_ui_buttons_UpgradeValideButton;
com_isartdigital_builder_ui_buttons_UpgradeValideButton.__name__ = ["com","isartdigital","builder","ui","buttons","UpgradeValideButton"];
com_isartdigital_builder_ui_buttons_UpgradeValideButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_UpgradeValideButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_UpgradeValideButton
});
var com_isartdigital_builder_ui_buttons_ValideButton = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_ui_Button.call(this);
};
$hxClasses["com.isartdigital.builder.ui.buttons.ValideButton"] = com_isartdigital_builder_ui_buttons_ValideButton;
com_isartdigital_builder_ui_buttons_ValideButton.__name__ = ["com","isartdigital","builder","ui","buttons","ValideButton"];
com_isartdigital_builder_ui_buttons_ValideButton.__super__ = com_isartdigital_utils_ui_Button;
com_isartdigital_builder_ui_buttons_ValideButton.prototype = $extend(com_isartdigital_utils_ui_Button.prototype,{
	__class__: com_isartdigital_builder_ui_buttons_ValideButton
});
var com_isartdigital_builder_ui_ftue_Arrow = function() {
	this.directionAnimation = 1;
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	this.boxType = com_isartdigital_utils_game_BoxType.NONE;
	com_isartdigital_utils_game_StateGraphic.call(this,"Arrow");
};
$hxClasses["com.isartdigital.builder.ui.ftue.Arrow"] = com_isartdigital_builder_ui_ftue_Arrow;
com_isartdigital_builder_ui_ftue_Arrow.__name__ = ["com","isartdigital","builder","ui","ftue","Arrow"];
com_isartdigital_builder_ui_ftue_Arrow.__super__ = com_isartdigital_utils_game_StateGraphic;
com_isartdigital_builder_ui_ftue_Arrow.prototype = $extend(com_isartdigital_utils_game_StateGraphic.prototype,{
	attachTo: function(target) {
		this.target = target;
		this.resizeToMatchWith(target);
		if(this.isBuildingTarget(target)) this.attachToArrowContainer(); else this.attachToContainerOf(target);
		this.setPositionAbove(target);
		this.moveAnimation();
		this.appearAnimation();
	}
	,destroyWithFeedBack: function() {
		motion_Actuate.tween(this,1,{ alpha : 0}).ease(motion_easing_Cubic.get_easeOut()).onComplete($bind(this,this.destroy));
	}
	,destroyWhenClick: function() {
		this.subscribeClickOrTapOf(this.target);
	}
	,resizeToMatchWith: function(target) {
		if(this.width < target.getLocalBounds().width) return;
		var ratio = target.getLocalBounds().width / this.width;
		this.scale.set(ratio,ratio);
	}
	,subscribeClickOrTapOf: function(target) {
		target.click = target.tap = $bind(this,this.onClickOrTapEvent);
	}
	,onClickOrTapEvent: function(event) {
		this.destroyWithFeedBack();
	}
	,appearAnimation: function() {
		this.alpha = 0;
		motion_Actuate.tween(this,1,{ alpha : 1}).ease(motion_easing_Cubic.get_easeIn());
	}
	,moveAnimation: function() {
		motion_Actuate.tween(this,1,{ y : this.y + this.height / 2 * this.directionAnimation}).ease(motion_easing_Quad.get_easeInOut()).onComplete($bind(this,this.moveAnimation));
		this.directionAnimation *= -1;
	}
	,setPositionAbove: function(target) {
		this.toggleBlink();
		this.position.set(target.x,target.y - (this.height / 2 + target.getLocalBounds().height));
		if(this.isBuildingTarget(target)) {
			var buildingVecticalOffset = 250;
			this.x -= this.getLocalBounds().width / 2;
			this.y -= buildingVecticalOffset;
		}
		if(this.isBonusTarget(target)) {
			var bonusVerticalOffset = 170;
			this.x -= this.getLocalBounds().width / 3;
			this.y -= bonusVerticalOffset;
		}
		if(this.isPopinButton(target)) {
			var offset = new PIXI.Point(150,-130);
			this.x += offset.x;
			this.y += offset.y;
		}
	}
	,attachToArrowContainer: function() {
		com_isartdigital_utils_game_GameStage.getInstance().getArrowContainer().addChild(this);
	}
	,attachToContainerOf: function(target) {
		target.parent.addChild(this);
	}
	,isBuildingTarget: function(target) {
		return target.type == "building";
	}
	,isBonusTarget: function(target) {
		return target.type == "BONUS_PARADE";
	}
	,isPopinButton: function(target) {
		return target.assetName == "ShopBuySoftButton" || target.assetName == "BuyPesosButton";
	}
	,toggleBlink: function() {
		if(this.target != null) {
			if(this.target.filters == null) this.target.filters = com_isartdigital_utils_game_Filter.getBrightness(1.3); else this.target.filters = null;
			haxe_Timer.delay($bind(this,this.toggleBlink),500);
		}
	}
	,destroy: function() {
		this.target.filters = null;
		this.target = null;
		motion_Actuate.stop(this,["y"],false,false);
		if(this.parent != null) this.parent.removeChild(this);
		com_isartdigital_utils_game_StateGraphic.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_ftue_Arrow
});
var com_isartdigital_builder_ui_ftue_FtueUI = function(ftueUIBuilder) {
	this.textLineNumber = 0;
	this.onDestroyCallbackCalled = false;
	this.tuteurs = [];
	this.dialogueTextList = [];
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	com_isartdigital_utils_game_GameStage.getInstance().on("resize",$bind(this,this.replace));
	this.container = ftueUIBuilder.container;
	this.textToDisplay = ftueUIBuilder.textToDisplay;
	this.tutorPosture = ftueUIBuilder.tutorPosture;
	this.startSide = ftueUIBuilder.startSide;
	this.endSide = ftueUIBuilder.endSide;
	this.sideApparition = ftueUIBuilder.sideApparition;
	this.timeToAppear = ftueUIBuilder.timeToAppear;
	this.timeToDesappear = ftueUIBuilder.timeToDesappear;
	this.confirmButton = ftueUIBuilder.confirmButton;
	this.eventNameToCatchForDestroying = ftueUIBuilder.eventNameToCatchForDestroying;
	this.saveStepOnDestroy = ftueUIBuilder.saveStepOnDestroy;
	this.onLastPageDisplayingCallback = ftueUIBuilder.onLastPageDisplayingCallback;
	this.onDestroyCallback = ftueUIBuilder.onDestroyCallback;
	this.interactive = true;
	if(this.textToDisplay == null) {
		com_isartdigital_builder_game_ftue_Ftue.event.on(this.eventNameToCatchForDestroying,$bind(this,this.destroy));
		return;
	} else com_isartdigital_builder_game_ftue_Ftue.event.on(this.eventNameToCatchForDestroying,$bind(this,this.destroyWithFeedBack));
	this.setMemberFromChild();
	this.setTextToDisplay(this.textToDisplay[this.textLineNumber]);
	this.setTuteursLabel(this.tutorPosture);
	this.attachTo(this.container);
	this.subscribeButtonsClick();
	this.okFtueButton.visible = false;
	if(!this.canShowNextButton()) {
		this.hideNextButton();
		this.onLastPageDisplayingCallback();
		if(this.confirmButton) this.okFtueButton.visible = true;
	} else this.okFtueButton.visible = false;
	this.removeAllListeners();
};
$hxClasses["com.isartdigital.builder.ui.ftue.FtueUI"] = com_isartdigital_builder_ui_ftue_FtueUI;
com_isartdigital_builder_ui_ftue_FtueUI.__name__ = ["com","isartdigital","builder","ui","ftue","FtueUI"];
com_isartdigital_builder_ui_ftue_FtueUI.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_ftue_FtueUI.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	replace: function(pEvent) {
		if(this.sideApparition == "left" || this.sideApparition == null) this.x = this.getLeftPositionInScreen(); else if(this.sideApparition == "right") this.x = com_isartdigital_builder_game_GameManager.getInstance().getScreenRect().width + this.width * 1.6;
	}
	,getLeftPositionInScreen: function() {
		return com_isartdigital_utils_system_DeviceCapabilities.getScreenRect(this.parent).x;
	}
	,show: function() {
		var _g = this;
		this.y += com_isartdigital_builder_ui_hud_Hud.getInstance().getParadeButton().y - this.height;
		if(this.sideApparition == "left" || this.sideApparition == null) {
			this.x -= this.width / 2 + 75;
			haxe_Timer.delay(function() {
				motion_Actuate.tween(_g,0.5,{ x : _g.getLeftPositionInScreen()}).ease(motion_easing_Elastic.get_easeOut());
			},this.timeToAppear);
		} else if(this.sideApparition == "right") {
			this.x += com_isartdigital_builder_game_GameManager.getInstance().getScreenRect().width + this.width * 1.6;
			haxe_Timer.delay(function() {
				motion_Actuate.tween(_g,0.5,{ x : com_isartdigital_builder_game_GameManager.getInstance().getScreenRect().width - _g.width * 1.6}).ease(motion_easing_Elastic.get_easeOut());
			},this.timeToAppear);
		}
	}
	,destroyWithFeedBack: function(e) {
		var _g = this;
		if(this.saveStepOnDestroy) this.saveStep();
		this.callOnDestroyCallback();
		haxe_Timer.delay(function() {
			motion_Actuate.tween(_g,0.5,{ y : _g.parent.height, alpha : 0}).ease(motion_easing_Cubic.get_easeInOut()).onComplete($bind(_g,_g.destroy));
		},this.timeToDesappear);
	}
	,setMemberFromChild: function() {
		this.setListFromChild("Dialogue_txt",this.dialogueTextList);
		this.setListFromChild("Tutor",this.tuteurs);
		this.okFtueButton = js_Boot.__cast(this.getChildByName("OkFtueButton") , com_isartdigital_builder_ui_buttons_OkFtueButton);
		this.nextFtueButton = js_Boot.__cast(this.getChildByName("NextFtueButton") , com_isartdigital_builder_ui_buttons_NextFtueButton);
	}
	,showNextButton: function() {
		this.nextFtueButton.visible = true;
	}
	,hideNextButton: function() {
		this.nextFtueButton.visible = false;
	}
	,setTextToDisplay: function(text) {
		var _g = 0;
		var _g1 = this.dialogueTextList;
		while(_g < _g1.length) {
			var dialogueText = _g1[_g];
			++_g;
			dialogueText.text = com_isartdigital_utils_Localization.getText(text);
		}
	}
	,setTuteursLabel: function(label) {
		var _g = 0;
		var _g1 = this.tuteurs;
		while(_g < _g1.length) {
			var tuteur = _g1[_g];
			++_g;
			tuteur.gotoLabel(label);
		}
	}
	,attachTo: function(container) {
		container.addChildAt(this,0);
		this.x -= this.width;
	}
	,saveStep: function() {
		js_Browser.getLocalStorage().setItem("FTUE_STEP",Std.string(com_isartdigital_builder_game_GameManager.getInstance().ftue.getCurrentStep()));
	}
	,subscribeButtonsClick: function() {
		this.okFtueButton.click = this.okFtueButton.tap = $bind(this,this.onOkFtueButtonClick);
		this.nextFtueButton.click = this.nextFtueButton.tap = $bind(this,this.onNextFtueButtonClick);
	}
	,onNextFtueButtonClick: function(event) {
		this.textLineNumber++;
		this.setTextToDisplay(this.textToDisplay[this.textLineNumber]);
		if(!this.canShowNextButton()) {
			this.hideNextButton();
			this.onLastPageDisplayingCallback();
			if(this.confirmButton) this.okFtueButton.visible = true;
		}
	}
	,canShowNextButton: function() {
		return this.textLineNumber + 1 < this.textToDisplay.length;
	}
	,onOkFtueButtonClick: function(event) {
		this.okFtueButton.click = this.okFtueButton.tap = null;
		com_isartdigital_builder_game_ftue_Ftue.event.emit("FTUEUI_OK");
	}
	,callOnDestroyCallback: function() {
		if(this.onDestroyCallbackCalled) return;
		this.onDestroyCallbackCalled = true;
		this.onDestroyCallback();
	}
	,destroy: function() {
		com_isartdigital_builder_game_ftue_Ftue.event.off(this.eventNameToCatchForDestroying,$bind(this,this.destroyWithFeedBack));
		com_isartdigital_builder_game_ftue_Ftue.event.off(this.eventNameToCatchForDestroying,$bind(this,this.destroy));
		if(this.textToDisplay != null) {
			this.parent.removeChild(this);
			var _g = -(this.dialogueTextList.length - 1);
			while(_g < 0) {
				var i = _g++;
				this.dialogueTextList.shift().destroy();
			}
			var _g1 = -(this.tuteurs.length - 1);
			while(_g1 < 0) {
				var i1 = _g1++;
				this.tuteurs.shift().destroy();
			}
		} else this.callOnDestroyCallback();
		com_isartdigital_utils_ui_UIComponent.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_ftue_FtueUI
});
var com_isartdigital_builder_ui_ftue_FtueUIBuilder = function() {
};
$hxClasses["com.isartdigital.builder.ui.ftue.FtueUIBuilder"] = com_isartdigital_builder_ui_ftue_FtueUIBuilder;
com_isartdigital_builder_ui_ftue_FtueUIBuilder.__name__ = ["com","isartdigital","builder","ui","ftue","FtueUIBuilder"];
com_isartdigital_builder_ui_ftue_FtueUIBuilder.create = function() {
	return new com_isartdigital_builder_ui_ftue_FtueUIBuilder();
};
com_isartdigital_builder_ui_ftue_FtueUIBuilder.prototype = {
	withContainerToAttach: function(container) {
		this.container = container;
		return this;
	}
	,withTextToDisplay: function(textToDisplay) {
		this.textToDisplay = textToDisplay;
		return this;
	}
	,withTutorPosture: function(tutorPosture) {
		this.tutorPosture = tutorPosture;
		return this;
	}
	,withStartSide: function(startSide) {
		this.startSide = startSide;
		return this;
	}
	,withEndSide: function(endSide) {
		this.endSide = endSide;
		return this;
	}
	,withSideApparition: function(side) {
		this.sideApparition = side;
		return this;
	}
	,withTimeToAppear: function(timeToAppear) {
		this.timeToAppear = timeToAppear;
		return this;
	}
	,withTimeToDesappear: function(timeToDesappear) {
		this.timeToDesappear = timeToDesappear;
		return this;
	}
	,withConfirmButton: function(confirmButton) {
		this.confirmButton = confirmButton;
		return this;
	}
	,withEventNameToCatchForDestroying: function(eventNameToCatchForDestroying) {
		this.eventNameToCatchForDestroying = eventNameToCatchForDestroying;
		return this;
	}
	,withStepSavingOnDestroy: function(saveStepOnDestroy) {
		this.saveStepOnDestroy = saveStepOnDestroy;
		return this;
	}
	,withLastPageDisplayingCallback: function(onLastPageDisplayingCallback) {
		this.onLastPageDisplayingCallback = onLastPageDisplayingCallback;
		return this;
	}
	,withDestroyCallback: function(onDestroyCallback) {
		this.onDestroyCallback = onDestroyCallback;
		return this;
	}
	,build: function() {
		return new com_isartdigital_builder_ui_ftue_FtueUI(this);
	}
	,__class__: com_isartdigital_builder_ui_ftue_FtueUIBuilder
};
var com_isartdigital_builder_ui_ftue_TutorPosture = function() { };
$hxClasses["com.isartdigital.builder.ui.ftue.TutorPosture"] = com_isartdigital_builder_ui_ftue_TutorPosture;
com_isartdigital_builder_ui_ftue_TutorPosture.__name__ = ["com","isartdigital","builder","ui","ftue","TutorPosture"];
var com_isartdigital_builder_ui_hud_BaseBuildingHUD = function() {
	this.elements = [];
	com_isartdigital_builder_ui_hud_BaseBuildingHUD._instance = this;
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	this.buildingInfoElement = js_Boot.__cast(this.getChildByName("BuildingInfo") , com_isartdigital_builder_ui_items_BuildingInfo);
	this.deleteButton = js_Boot.__cast(this.getChildByName("DeleteButton") , com_isartdigital_builder_ui_buttons_DeleteButton);
	this.upgradeButton = js_Boot.__cast(this.getChildByName("UpgradeButton") , com_isartdigital_builder_ui_buttons_UpgradeButton);
	this.paintButton = js_Boot.__cast(this.getChildByName("ColorButton") , com_isartdigital_builder_ui_buttons_ColorButton);
	this.moveButton = js_Boot.__cast(this.getChildByName("MoveButton") , com_isartdigital_builder_ui_buttons_MoveButton);
	this.hardBuildButton = js_Boot.__cast(this.getChildByName("HardBuildButton") , com_isartdigital_builder_ui_buttons_HardBuildButton);
	this.elements.push(this.buildingInfoElement);
	this.buildingInfoElement.basePosition = this.buildingInfoElement.position.clone();
	this.elements.push(this.deleteButton);
	this.deleteButton.basePosition = this.deleteButton.position.clone();
	this.elements.push(this.upgradeButton);
	this.upgradeButton.basePosition = this.upgradeButton.position.clone();
	this.elements.push(this.paintButton);
	this.upgradeButton.click = this.upgradeButton.tap = $bind(this,this.onUpgradeClick);
	this.paintButton.basePosition = this.paintButton.position.clone();
	this.elements.push(this.moveButton);
	this.moveButton.basePosition = this.moveButton.position.clone();
	this.elements.push(this.hardBuildButton);
	this.hardBuildButton.basePosition = this.hardBuildButton.position.clone();
	this.hideElements(false);
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
		this.currentBuildingEventDef = pDef;
		this.hideElements(false);
		var _g = 0;
		var _g1 = pDef.type;
		while(_g < _g1.length) {
			var lType = _g1[_g];
			++_g;
			if(lType == "UPGRADABLE") {
				this.addChild(this.upgradeButton);
				this.upgradeButton.position = this.upgradeButton.basePosition.clone();
			} else if(lType == "MOVABLE") {
				this.addChild(this.moveButton);
				this.moveButton.position = this.moveButton.basePosition.clone();
			} else if(lType == "PAINTABLE") {
				this.addChild(this.paintButton);
				this.paintButton.position = this.paintButton.basePosition.clone();
			} else if(lType == "ERASABLE") {
				this.addChild(this.deleteButton);
				this.deleteButton.position = this.deleteButton.basePosition.clone();
			} else if(lType == "HARDBUILD") {
				this.addChild(this.hardBuildButton);
				this.hardBuildButton.position = this.hardBuildButton.basePosition.clone();
			}
		}
		this.addChild(this.buildingInfoElement);
		this.buildingInfoElement.position = this.buildingInfoElement.basePosition.clone();
		this.buildingInfoElement.setDescription(pDef.ref);
		this.children.sort($bind(this,this.sortByX));
		this.packChildren();
		this.centerBuildingHud();
		var _g2 = 0;
		var _g11 = this.children;
		while(_g2 < _g11.length) {
			var lElement = _g11[_g2];
			++_g2;
			this.startAppearFeedBack(lElement);
		}
	}
	,onUpgradeClick: function(event) {
		var config = this.currentBuildingEventDef.ref.getConfig();
		var nextLevelConfig = com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getConfigByName(this.currentBuildingEventDef.ref.definition.name,this.currentBuildingEventDef.ref.buildingLevel + 1);
		var params = { timeLeft : nextLevelConfig.contruction_time, price : config.upgrade_price};
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_UPGRADECONFIRM",params);
	}
	,startAppearFeedBack: function(pObject) {
		pObject.y += pObject.getLocalBounds().height;
		motion_Actuate.tween(pObject,1,{ y : pObject.y - pObject.getLocalBounds().height}).ease(motion_easing_Elastic.get_easeOut());
	}
	,startHideFeedBack: function(pObject) {
		motion_Actuate.tween(pObject,0.3,{ y : pObject.y + pObject.getLocalBounds().height}).ease(motion_easing_Expo.get_easeIn()).onComplete($bind(this,this.setToStartPosition),[pObject]);
	}
	,setToStartPosition: function(pObject) {
		pObject.y -= pObject.getLocalBounds().height;
		this.removeChild(pObject);
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
	,hideElements: function(pFeedBack) {
		if(pFeedBack == null) pFeedBack = true;
		var _g = 0;
		var _g1 = this.elements;
		while(_g < _g1.length) {
			var lElement = _g1[_g];
			++_g;
			if(pFeedBack) this.startHideFeedBack(lElement); else this.removeChild(lElement);
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
var com_isartdigital_builder_ui_hud_CurrencyAsset = function() {
	com_isartdigital_utils_ui_UIComponent.call(this);
};
$hxClasses["com.isartdigital.builder.ui.hud.CurrencyAsset"] = com_isartdigital_builder_ui_hud_CurrencyAsset;
com_isartdigital_builder_ui_hud_CurrencyAsset.__name__ = ["com","isartdigital","builder","ui","hud","CurrencyAsset"];
com_isartdigital_builder_ui_hud_CurrencyAsset.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_hud_CurrencyAsset.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	__class__: com_isartdigital_builder_ui_hud_CurrencyAsset
});
var com_isartdigital_builder_ui_hud_GoldCurrency = function() {
	com_isartdigital_builder_ui_hud_CurrencyAsset.call(this);
	this.build();
	this.setVariablesFromChild();
};
$hxClasses["com.isartdigital.builder.ui.hud.GoldCurrency"] = com_isartdigital_builder_ui_hud_GoldCurrency;
com_isartdigital_builder_ui_hud_GoldCurrency.__name__ = ["com","isartdigital","builder","ui","hud","GoldCurrency"];
com_isartdigital_builder_ui_hud_GoldCurrency.__super__ = com_isartdigital_builder_ui_hud_CurrencyAsset;
com_isartdigital_builder_ui_hud_GoldCurrency.prototype = $extend(com_isartdigital_builder_ui_hud_CurrencyAsset.prototype,{
	setVariablesFromChild: function() {
		this.goldText = js_Boot.__cast(this.getChildByName("Gold_txt") , PIXI.Text);
	}
	,changeDisplayTextValue: function(number) {
		if(number == null) this.goldText.text = "null"; else this.goldText.text = "" + number;
	}
	,destroy: function() {
		this.goldText.destroy();
		this.goldText = null;
		com_isartdigital_builder_ui_hud_CurrencyAsset.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_hud_GoldCurrency
});
var com_isartdigital_builder_ui_hud_Hud = function() {
	com_isartdigital_utils_ui_Screen.call(this);
	this._modal = false;
	this.build();
	this.setVariableFromChild();
	this.subscribeEvents();
};
$hxClasses["com.isartdigital.builder.ui.hud.Hud"] = com_isartdigital_builder_ui_hud_Hud;
com_isartdigital_builder_ui_hud_Hud.__name__ = ["com","isartdigital","builder","ui","hud","Hud"];
com_isartdigital_builder_ui_hud_Hud.getInstance = function() {
	if(com_isartdigital_builder_ui_hud_Hud.instance == null) com_isartdigital_builder_ui_hud_Hud.instance = new com_isartdigital_builder_ui_hud_Hud();
	return com_isartdigital_builder_ui_hud_Hud.instance;
};
com_isartdigital_builder_ui_hud_Hud.__super__ = com_isartdigital_utils_ui_Screen;
com_isartdigital_builder_ui_hud_Hud.prototype = $extend(com_isartdigital_utils_ui_Screen.prototype,{
	getRessourceProductionAssetPositionInHud: function(ressource) {
		var UIResourceComponent;
		switch(ressource) {
		case "gold":
			UIResourceComponent = this.getGoldComponent();
			break;
		case "offering":
			UIResourceComponent = this.getOfferingComponent();
			break;
		case "spice":
			UIResourceComponent = this.getSpiceComponent();
			break;
		default:
			throw new js__$Boot_HaxeError("Hud: ressource value in getRessourceProductionAssetPositionInHud is incorrect");
		}
		return new PIXI.Point(UIResourceComponent.x + 105,UIResourceComponent.y + 75);
	}
	,getOfferingComponent: function() {
		return this.offeringCurrency;
	}
	,getGoldComponent: function() {
		return this.goldCurrency;
	}
	,getSpiceComponent: function() {
		return this.spiceCurrency;
	}
	,getLevelComponent: function() {
		return this.levelComponent;
	}
	,getParadeButton: function() {
		return this.paradeButton;
	}
	,getShopButton: function() {
		return this.shopButton;
	}
	,subscribeEvents: function() {
		this.on("UPDATE_REQUEST_LVL",$bind(this,this.updateLevel));
		this.on("UPDATE_REQUEST_XP",$bind(this,this.updateXp));
		this.on("UPDATE_GOLD_TEXT",$bind(this,this.onUpdatePesos));
		this.on("UPDATE_PIMIENTOS_TEXT",$bind(this,this.onUpdatePimientos));
		this.on("UPDATE_OFFERING_TEXT",$bind(this,this.onUpdateOffering));
		this.levelComponent.on("mouseover",$bind(this,this._mouseOver));
		this.levelComponent.on("mouseout",$bind(this,this._mouseOut));
		this.levelComponent.on("mouseupoutside",$bind(this,this._mouseOut));
		this.offeringCurrency.on("mouseover",$bind(this,this._mouseOver));
		this.offeringCurrency.on("mouseout",$bind(this,this._mouseOut));
		this.offeringCurrency.on("mouseupoutside",$bind(this,this._mouseOut));
		this.spiceCurrency.on("mouseover",$bind(this,this._mouseOver));
		this.spiceCurrency.on("mouseout",$bind(this,this._mouseOut));
		this.spiceCurrency.on("mouseupoutside",$bind(this,this._mouseOut));
		this.goldCurrency.on("mouseover",$bind(this,this._mouseOver));
		this.goldCurrency.on("mouseout",$bind(this,this._mouseOut));
		this.goldCurrency.on("mouseupoutside",$bind(this,this._mouseOut));
	}
	,unsubscribeEvent: function() {
		this.removeListener("UPDATE_REQUEST_LVL",$bind(this,this.updateLevel));
		this.removeListener("UPDATE_REQUEST_XP",$bind(this,this.updateXp));
		this.removeListener("UPDATE_GOLD_TEXT",$bind(this,this.onUpdatePesos));
		this.removeListener("UPDATE_PIMIENTOS_TEXT",$bind(this,this.onUpdatePimientos));
		this.removeListener("UPDATE_OFFERING_TEXT",$bind(this,this.onUpdateOffering));
	}
	,onUpdatePimientos: function(pesosValue) {
		this.spiceCurrency.changeDisplayTextValue(pesosValue);
	}
	,onUpdatePesos: function(pesosValue) {
		this.goldCurrency.changeDisplayTextValue(pesosValue);
	}
	,onUpdateOffering: function(offeringValue) {
		this.offeringCurrency.changeDisplayTextValue(offeringValue);
	}
	,updateXp: function(pPercentProgress) {
		this.levelComponent.setProgressBar(pPercentProgress,true);
	}
	,updateLevel: function(pNumber) {
		this.levelComponent.setLevel(pNumber | 0);
	}
	,setVariableFromChild: function() {
		this.levelComponent = js_Boot.__cast(this.getChildByName("LevelCurrency") , com_isartdigital_builder_ui_hud_LevelCurrency);
		this.offeringCurrency = js_Boot.__cast(this.getChildByName("OfferingsCurrency") , com_isartdigital_builder_ui_hud_OfferingsCurrency);
		this.goldCurrency = js_Boot.__cast(this.getChildByName("GoldCurrency") , com_isartdigital_builder_ui_hud_GoldCurrency);
		this.spiceCurrency = js_Boot.__cast(this.getChildByName("SpiceCurrency") , com_isartdigital_builder_ui_hud_SpiceCurrency);
		this.paradeButton = js_Boot.__cast(this.getChildByName("ParadeButton") , com_isartdigital_builder_ui_buttons_ParadeButton);
		this.shopButton = js_Boot.__cast(this.getChildByName("ShopButton") , com_isartdigital_builder_ui_buttons_ShopButton);
	}
	,onResize: function(pEvent) {
		com_isartdigital_utils_ui_Screen.prototype.onResize.call(this);
	}
	,destroy: function() {
		this.unsubscribeEvent();
		this.levelComponent.destroy();
		this.offeringCurrency.destroy();
		this.goldCurrency.destroy();
		this.spiceCurrency.destroy();
		com_isartdigital_builder_ui_hud_Hud.instance = null;
		com_isartdigital_utils_ui_Screen.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_hud_Hud
});
var com_isartdigital_builder_ui_hud_HudParade = function() {
	com_isartdigital_utils_ui_Screen.call(this);
	this._modal = false;
	this.build();
	this.setVariableFromChild();
};
$hxClasses["com.isartdigital.builder.ui.hud.HudParade"] = com_isartdigital_builder_ui_hud_HudParade;
com_isartdigital_builder_ui_hud_HudParade.__name__ = ["com","isartdigital","builder","ui","hud","HudParade"];
com_isartdigital_builder_ui_hud_HudParade.getInstance = function() {
	if(com_isartdigital_builder_ui_hud_HudParade.instance == null) com_isartdigital_builder_ui_hud_HudParade.instance = new com_isartdigital_builder_ui_hud_HudParade();
	return com_isartdigital_builder_ui_hud_HudParade.instance;
};
com_isartdigital_builder_ui_hud_HudParade.__super__ = com_isartdigital_utils_ui_Screen;
com_isartdigital_builder_ui_hud_HudParade.prototype = $extend(com_isartdigital_utils_ui_Screen.prototype,{
	getRessourceView: function() {
		return this.resourcesView;
	}
	,open: function() {
		com_isartdigital_utils_ui_Screen.prototype.open.call(this);
		this.subscribeEvent();
	}
	,close: function() {
		com_isartdigital_utils_ui_Screen.prototype.close.call(this);
		this.unsubscribeEvent();
	}
	,subscribeEvent: function() {
		this.on("UPDATE_REQUEST_TIMER",$bind(this,this.onUpdateRequestTimer));
		this.on("UPDATE_REQUEST_PESOS_VIEW",$bind(this,this.onUpdateRequestPesosView));
		this.on("UPDATE_REQUEST_OFFERING_VIEW",$bind(this,this.onUpdateRequestOfferingView));
		this.on("UPDATE_REQUEST_PIMIENTOS_VIEW",$bind(this,this.onUpdateRequestPimientosView));
	}
	,unsubscribeEvent: function() {
		this.removeListener("UPDATE_REQUEST_TIMER",$bind(this,this.onUpdateRequestTimer));
		this.removeListener("UPDATE_REQUEST_PESOS_VIEW",$bind(this,this.onUpdateRequestPesosView));
		this.removeListener("UPDATE_REQUEST_PIMIENTOS_VIEW",$bind(this,this.onUpdateRequestPimientosView));
		this.removeListener("UPDATE_REQUEST_OFFERING_VIEW",$bind(this,this.onUpdateRequestOfferingView));
	}
	,onUpdateRequestTimer: function(pValueTimer) {
		this.timerParade.updateTimerText(pValueTimer);
	}
	,onUpdateRequestPesosView: function(pPesosValue) {
		this.resourcesView.updatePesosText(pPesosValue);
	}
	,onUpdateRequestPimientosView: function(pPimientosValue) {
		this.resourcesView.updatePimientosText(pPimientosValue);
	}
	,onUpdateRequestOfferingView: function(pOfferingValue) {
		this.resourcesView.updateOfferingText(pOfferingValue);
	}
	,setVariableFromChild: function() {
		this.resourcesView = js_Boot.__cast(this.getChildByName("ResourcesView") , com_isartdigital_builder_ui_items_ResourcesView);
		this.timerParade = js_Boot.__cast(this.getChildByName("TimerParade") , com_isartdigital_builder_ui_items_TimerParade);
	}
	,destroy: function() {
		com_isartdigital_builder_ui_hud_HudParade.instance = null;
		this.resourcesView.destroy();
		this.timerParade.destroy();
		com_isartdigital_utils_ui_Screen.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_hud_HudParade
});
var com_isartdigital_builder_ui_hud_LevelCurrency = function() {
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	this.setVariableFromChild();
	this.originPositionProgressBar = this.progressBar.x;
	this.widthProgressBar = this.progressBar.getLocalBounds().width;
	this.createXpInfo();
	this.lvlText.text = "1";
	this.setProgressBar(0,false);
};
$hxClasses["com.isartdigital.builder.ui.hud.LevelCurrency"] = com_isartdigital_builder_ui_hud_LevelCurrency;
com_isartdigital_builder_ui_hud_LevelCurrency.__name__ = ["com","isartdigital","builder","ui","hud","LevelCurrency"];
com_isartdigital_builder_ui_hud_LevelCurrency.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_hud_LevelCurrency.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	createXpInfo: function() {
		var style = { };
		style.font = "bold 50px Blissful Thinking";
		style.fill = "#f3f3a8";
		this.xpInfo = new PIXI.Text("0 %",style);
		this.xpInfo.position.set(450,65);
		this.addChild(this.xpInfo);
	}
	,setLevel: function(pLevel) {
		this.lvlText.text = pLevel + "";
	}
	,setProgressBar: function(pPercent,pFeedBack) {
		if(pFeedBack == null) pFeedBack = true;
		if(pPercent >= 100) pPercent = 100;
		var newPosition = this.originPositionProgressBar - (100 - pPercent) * this.widthProgressBar / 100;
		if(!pFeedBack) {
			this.progressBar.x = newPosition;
			this.xpInfo.text = pPercent + " %";
		} else motion_Actuate.tween(this.progressBar,2,{ x : newPosition}).ease(motion_easing_Expo.get_easeOut()).onUpdate($bind(this,this.updateXpInfoText));
	}
	,updateXpInfoText: function() {
		var newPercentToDisplay = (this.originPositionProgressBar + this.progressBar.x) / (this.widthProgressBar + this.originPositionProgressBar);
		newPercentToDisplay *= 100;
		newPercentToDisplay = Math.ceil(newPercentToDisplay) - 1;
		this.xpInfo.text = newPercentToDisplay + " %";
	}
	,placePicture: function(pPicture) {
		this.addChild(pPicture);
		this.setChildIndex(pPicture,this.getChildIndex(this.getChildByName("AvatarDefaultAsset")) + 1);
		pPicture.position.set(55,30);
	}
	,setVariableFromChild: function() {
		this.lvlText = js_Boot.__cast(this.getChildByName("Level_txt") , PIXI.Text);
		this.progressBar = this.getChildByName("LevelBarAsset");
	}
	,__class__: com_isartdigital_builder_ui_hud_LevelCurrency
});
var com_isartdigital_builder_ui_hud_OfferingsCurrency = function() {
	com_isartdigital_builder_ui_hud_CurrencyAsset.call(this);
	this.build();
	this.setVariablesFromChild();
};
$hxClasses["com.isartdigital.builder.ui.hud.OfferingsCurrency"] = com_isartdigital_builder_ui_hud_OfferingsCurrency;
com_isartdigital_builder_ui_hud_OfferingsCurrency.__name__ = ["com","isartdigital","builder","ui","hud","OfferingsCurrency"];
com_isartdigital_builder_ui_hud_OfferingsCurrency.__super__ = com_isartdigital_builder_ui_hud_CurrencyAsset;
com_isartdigital_builder_ui_hud_OfferingsCurrency.prototype = $extend(com_isartdigital_builder_ui_hud_CurrencyAsset.prototype,{
	setVariablesFromChild: function() {
		this.offeringText = js_Boot.__cast(this.getChildByName("Offerings_txt") , PIXI.Text);
	}
	,changeDisplayTextValue: function(number) {
		if(number == null) this.offeringText.text = "null"; else this.offeringText.text = "" + number;
	}
	,destroy: function() {
		this.offeringText.destroy();
		this.offeringText = null;
		com_isartdigital_builder_ui_hud_CurrencyAsset.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_hud_OfferingsCurrency
});
var com_isartdigital_builder_ui_hud_SpiceCurrency = function() {
	com_isartdigital_builder_ui_hud_CurrencyAsset.call(this);
	this.build();
	this.setVariablesFromChild();
};
$hxClasses["com.isartdigital.builder.ui.hud.SpiceCurrency"] = com_isartdigital_builder_ui_hud_SpiceCurrency;
com_isartdigital_builder_ui_hud_SpiceCurrency.__name__ = ["com","isartdigital","builder","ui","hud","SpiceCurrency"];
com_isartdigital_builder_ui_hud_SpiceCurrency.__super__ = com_isartdigital_builder_ui_hud_CurrencyAsset;
com_isartdigital_builder_ui_hud_SpiceCurrency.prototype = $extend(com_isartdigital_builder_ui_hud_CurrencyAsset.prototype,{
	setVariablesFromChild: function() {
		this.spiceText = js_Boot.__cast(this.getChildByName("Spice_txt") , PIXI.Text);
	}
	,changeDisplayTextValue: function(number) {
		if(number == null) this.spiceText.text = "null"; else this.spiceText.text = "" + number;
	}
	,destroy: function() {
		this.spiceText.destroy();
		this.spiceText = null;
		com_isartdigital_builder_ui_hud_CurrencyAsset.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_hud_SpiceCurrency
});
var com_isartdigital_builder_ui_items_ItemAssetInShop = function() {
	com_isartdigital_utils_game_StateGraphic.call(this);
	this.boxType = com_isartdigital_utils_game_BoxType.SELF;
	this.start();
};
$hxClasses["com.isartdigital.builder.ui.items.ItemAssetInShop"] = com_isartdigital_builder_ui_items_ItemAssetInShop;
com_isartdigital_builder_ui_items_ItemAssetInShop.__name__ = ["com","isartdigital","builder","ui","items","ItemAssetInShop"];
com_isartdigital_builder_ui_items_ItemAssetInShop.__super__ = com_isartdigital_utils_game_StateGraphic;
com_isartdigital_builder_ui_items_ItemAssetInShop.prototype = $extend(com_isartdigital_utils_game_StateGraphic.prototype,{
	setModeNormal: function() {
		this.setState(this.DEFAULT_STATE);
		com_isartdigital_utils_game_StateGraphic.prototype.setModeNormal.call(this);
	}
	,setAsset: function(pAssetName) {
		var frame = (js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).getLabelFrame(pAssetName);
		(js_Boot.__cast(this.anim , pixi_display_FlumpMovie)).gotoAndStop(frame);
	}
	,destroy: function() {
		this.interactive = false;
		com_isartdigital_utils_game_StateGraphic.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_items_ItemAssetInShop
});
var com_isartdigital_builder_ui_items_BuildingInShop = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_items_ItemAssetInShop.call(this);
};
$hxClasses["com.isartdigital.builder.ui.items.BuildingInShop"] = com_isartdigital_builder_ui_items_BuildingInShop;
com_isartdigital_builder_ui_items_BuildingInShop.__name__ = ["com","isartdigital","builder","ui","items","BuildingInShop"];
com_isartdigital_builder_ui_items_BuildingInShop.__super__ = com_isartdigital_builder_ui_items_ItemAssetInShop;
com_isartdigital_builder_ui_items_BuildingInShop.prototype = $extend(com_isartdigital_builder_ui_items_ItemAssetInShop.prototype,{
	__class__: com_isartdigital_builder_ui_items_BuildingInShop
});
var com_isartdigital_builder_ui_items_BuildingInfo = function() {
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	this.setVariablesFromChilds();
};
$hxClasses["com.isartdigital.builder.ui.items.BuildingInfo"] = com_isartdigital_builder_ui_items_BuildingInfo;
com_isartdigital_builder_ui_items_BuildingInfo.__name__ = ["com","isartdigital","builder","ui","items","BuildingInfo"];
com_isartdigital_builder_ui_items_BuildingInfo.__interfaces__ = [com_isartdigital_builder_ui_hud_BuildingHudElement];
com_isartdigital_builder_ui_items_BuildingInfo.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_items_BuildingInfo.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	setVariablesFromChilds: function() {
		this.title = this.getChildByName("BuildingInfoTitle_txt");
		this.capacity = this.getChildByName("BuildingInfoCapacity_txt");
		this.production = this.getChildByName("BuildingInfoProduction_txt");
		this.lvl = this.getChildByName("BuildingInfoLvl_txt");
	}
	,setDescription: function(building) {
		var config = building.getConfig();
		this.title.text = com_isartdigital_utils_Localization.getText("label_" + building.definition.name);
		this.lvl.text = com_isartdigital_utils_Localization.getText("label_level") + " " + (building.buildingLevel + 1);
		if(building.isHarvestable()) {
			if(Reflect.field(config,"capacity") != null) this.capacity.text = "Capacité : " + Std.string(Reflect.field(config,"capacity")); else this.capacity.text = "";
			if(Reflect.field(config,"production") != null) this.production.text = "Production : " + Std.string(Reflect.field(config,"production")) + " / minutes"; else this.production.text = "";
		} else {
			this.capacity.text = "";
			this.production.text = "";
		}
	}
	,__class__: com_isartdigital_builder_ui_items_BuildingInfo
});
var com_isartdigital_builder_ui_items_ItemShop = function() {
	this.itemAssetList = [];
	this.buyHardButtonList = [];
	this.itemTitleTextList = [];
	this.hardPriceTextList = [];
	com_isartdigital_utils_ui_UIComponent.call(this);
};
$hxClasses["com.isartdigital.builder.ui.items.ItemShop"] = com_isartdigital_builder_ui_items_ItemShop;
com_isartdigital_builder_ui_items_ItemShop.__name__ = ["com","isartdigital","builder","ui","items","ItemShop"];
com_isartdigital_builder_ui_items_ItemShop.applyRedBlinkEffect = function(target) {
	target.filters = com_isartdigital_utils_game_Filter.getRed();
	var _g = 0;
	while(_g < 6) {
		var i = _g++;
		var blinkDelay = 150 * i;
		haxe_Log.trace(blinkDelay,{ fileName : "ItemShop.hx", lineNumber : 54, className : "com.isartdigital.builder.ui.items.ItemShop", methodName : "applyRedBlinkEffect"});
		if(i % 2 == 0) haxe_Timer.delay(com_isartdigital_builder_ui_items_ItemShop.toggleRedFilter(target,com_isartdigital_utils_game_Filter.getRed()),blinkDelay); else haxe_Timer.delay(com_isartdigital_builder_ui_items_ItemShop.toggleRedFilter(target,null),blinkDelay);
	}
};
com_isartdigital_builder_ui_items_ItemShop.toggleRedFilter = function(target,filters) {
	return function() {
		target.filters = filters;
	};
};
com_isartdigital_builder_ui_items_ItemShop.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_items_ItemShop.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	init: function() {
		this.setListFromChild("PriceHard_txt",this.hardPriceTextList);
		this.setListFromChild(this.itemTitleComponentName,this.itemTitleTextList);
		this.setListFromChild("ShopBuyHardButton",this.buyHardButtonList);
		this.setListFromChild(this.itemAssetComponentName,this.itemAssetList);
	}
	,setItemAsset: function(asset) {
		var _g = 0;
		var _g1 = this.itemAssetList;
		while(_g < _g1.length) {
			var itemAsset = _g1[_g];
			++_g;
			itemAsset.setAsset(asset);
		}
	}
	,changeItemSelect: function(itemName) {
	}
	,destroy: function() {
		while(this.buyHardButtonList.length > 0) this.buyHardButtonList.shift().destroy();
		while(this.itemAssetList.length > 0) this.itemAssetList.shift().destroy();
		com_isartdigital_utils_ui_UIComponent.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_items_ItemShop
});
var com_isartdigital_builder_ui_items_ItemBuilding = function() {
	this.canBuild = true;
	this.lockAssetList = [];
	this.softPriceTextList = [];
	this.buySoftButtonList = [];
	this.buildingName = "pyrotechnician";
	com_isartdigital_builder_ui_items_ItemShop.call(this);
	this.build();
	this.itemTitleComponentName = "BuildingName_txt";
	this.itemAssetComponentName = "BuildingInShop";
	this.init();
};
$hxClasses["com.isartdigital.builder.ui.items.ItemBuilding"] = com_isartdigital_builder_ui_items_ItemBuilding;
com_isartdigital_builder_ui_items_ItemBuilding.__name__ = ["com","isartdigital","builder","ui","items","ItemBuilding"];
com_isartdigital_builder_ui_items_ItemBuilding.__super__ = com_isartdigital_builder_ui_items_ItemShop;
com_isartdigital_builder_ui_items_ItemBuilding.prototype = $extend(com_isartdigital_builder_ui_items_ItemShop.prototype,{
	getSoftButton: function() {
		return this.buySoftButtonList[0];
	}
	,init: function() {
		com_isartdigital_builder_ui_items_ItemShop.prototype.init.call(this);
		this.setListFromChild("PriceSoft_txt",this.softPriceTextList);
		this.setListFromChild("CadenasAsset",this.lockAssetList);
		this.setListFromChild("ShopBuySoftButton",this.buySoftButtonList);
		this.lockInfo = js_Boot.__cast(this.getChildByName("LockInfo_txt") , PIXI.Text);
		this.descriptionBuilding_txt = js_Boot.__cast(this.getChildByName("descriptionBuilding_txt") , PIXI.Text);
		this.backgroundDescription = this.getChildByName("buildingDescriptionBackgroundAsset");
		this.buildingInfoAsset = this.getChildByName("buildingInfoAsset");
		this.subscribeButtonsClickAndTap($bind(this,this.buySoft),this.buySoftButtonList);
		this.subscribeButtonsClickAndTap($bind(this,this.buyHard),this.buyHardButtonList);
		this.subscribeClickInfo();
	}
	,changeItemSelect: function(itemName) {
		this.setVisibilityBuyAsset(true);
		this.hideDescriptionAsset();
		this.buildingName = itemName;
		this.setItemAsset(this.buildingName);
		this.getBuildingDefinition();
		this.updateSoftTxt();
		this.updateHardTxt();
		this.updateBuildingName();
		if(!this.buildingIsUnLock()) {
			this.showLockAssets();
			this.setTextForLockInfo();
			this.canBuild = false;
		} else {
			this.canBuild = true;
			this.hideLockAssets();
			if(!this.buildingIsBuyable()) this.setVisibilityBuyAsset(false);
		}
	}
	,subscribeClickInfo: function() {
		this.buildingInfoAsset.interactive = true;
		this.buildingInfoAsset.click = this.buildingInfoAsset.tap = $bind(this,this.onClickInfo);
	}
	,onClickInfo: function(event) {
		this.toggleDescriptionAssets();
	}
	,setTextForLockInfo: function() {
		this.lockInfo.text = com_isartdigital_utils_Localization.getText("label_lock_info") + Std.string(Reflect.field(this.currentBuildingDefinition,"require_main_building_lvl"));
	}
	,showLockAssets: function() {
		this.setVisibilityInList(false,this.buySoftButtonList);
		this.setVisibilityInList(false,this.buyHardButtonList);
		this.setVisibilityInList(true,this.lockAssetList);
		this.lockInfo.visible = true;
	}
	,hideLockAssets: function() {
		this.setVisibilityInList(true,this.buySoftButtonList);
		this.setVisibilityInList(true,this.buyHardButtonList);
		this.setVisibilityInList(false,this.lockAssetList);
		this.lockInfo.visible = false;
	}
	,hideDescriptionAsset: function() {
		this.backgroundDescription.visible = false;
		this.descriptionBuilding_txt.visible = false;
		this.setVisibilityInList(true,this.itemAssetList);
	}
	,toggleDescriptionAssets: function() {
		this.setVisibilityInList(!this.itemAssetList[0].visible,this.itemAssetList);
		this.backgroundDescription.visible = !this.backgroundDescription.visible;
		this.descriptionBuilding_txt.visible = !this.descriptionBuilding_txt.visible;
		this.descriptionBuilding_txt.text = com_isartdigital_utils_Localization.getText("label_desc_" + this.buildingName);
	}
	,setVisibilityBuyAsset: function(visibility) {
		this.setVisibilityInList(visibility,this.buyHardButtonList);
		this.setVisibilityInList(visibility,this.buySoftButtonList);
		this.setVisibilityInList(visibility,this.softPriceTextList);
		this.setVisibilityInList(visibility,this.hardPriceTextList);
	}
	,buySoft: function(pEvent) {
		if(!this.canBuild) return;
		var price = Reflect.field(this.currentBuildingDefinition,"price");
		if(!com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources("gold",price)) {
			com_isartdigital_builder_ui_items_ItemShop.applyRedBlinkEffect(pEvent.target);
			return;
		}
		com_isartdigital_builder_Main.getInstance().emit("SHOP_BUY_BUILDING",{ buildingName : this.buildingName, hard : false});
		com_isartdigital_builder_game_ftue_Ftue.event.emit("BUILDING_BOUGHT",{ buildingName : this.buildingName});
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
	}
	,buyHard: function(pEvent) {
		if(!this.canBuild) return;
		var price = Reflect.field(this.currentBuildingDefinition,"hard_price");
		if(!com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources("spice",price)) {
			com_isartdigital_builder_ui_items_ItemShop.applyRedBlinkEffect(pEvent.target);
			return;
		}
		com_isartdigital_builder_Main.getInstance().emit("SHOP_BUY_BUILDING",{ buildingName : this.buildingName, hard : true});
		com_isartdigital_builder_game_ftue_Ftue.event.emit("BUILDING_BOUGHT",{ buildingName : this.buildingName});
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
	}
	,buildingIsUnLock: function() {
		var lMainBuildingLvlRequire = Reflect.field(this.currentBuildingDefinition,"require_main_building_lvl");
		return lMainBuildingLvlRequire <= com_isartdigital_services_Users.getMainBuildingLevel();
	}
	,buildingIsBuyable: function() {
		return !(this.buildingIsUnique() && this.buildingAlreadyExist());
	}
	,buildingIsUnique: function() {
		if(Object.prototype.hasOwnProperty.call(this.currentBuildingDefinition,"unique")) {
			if(Reflect.field(this.currentBuildingDefinition,"unique")) return true;
		}
		return false;
	}
	,buildingAlreadyExist: function() {
		return com_isartdigital_builder_game_sprites_buildings_BuildingUtils.isBuildingModelExist(this.buildingName);
	}
	,getBuildingDefinition: function() {
		var buildingSettings = com_isartdigital_utils_loader_GameLoader.getContent("json/buildingsSettings.json");
		var buildingDefinition = Reflect.field(buildingSettings,this.buildingName);
		if(Reflect.field(buildingDefinition,"1") != null) this.currentBuildingDefinition = Reflect.field(buildingDefinition,"1"); else this.currentBuildingDefinition = buildingDefinition;
	}
	,updateSoftTxt: function() {
		var _g = 0;
		var _g1 = this.softPriceTextList;
		while(_g < _g1.length) {
			var softText = _g1[_g];
			++_g;
			softText.text = Reflect.field(this.currentBuildingDefinition,"price");
		}
	}
	,updateHardTxt: function() {
		var _g = 0;
		var _g1 = this.hardPriceTextList;
		while(_g < _g1.length) {
			var hardText = _g1[_g];
			++_g;
			hardText.text = Reflect.field(this.currentBuildingDefinition,"hard_price");
		}
	}
	,updateBuildingName: function() {
		var _g = 0;
		var _g1 = this.itemTitleTextList;
		while(_g < _g1.length) {
			var title = _g1[_g];
			++_g;
			title.text = com_isartdigital_utils_Localization.getText("label_" + this.buildingName);
		}
	}
	,destroy: function() {
		this.unsubscribeButtonsClickAndTap(this.buyHardButtonList);
		this.unsubscribeButtonsClickAndTap(this.buySoftButtonList);
		while(this.buySoftButtonList.length > 0) this.buySoftButtonList.shift().destroy();
		this.interactive = false;
		com_isartdigital_builder_ui_items_ItemShop.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_items_ItemBuilding
});
var com_isartdigital_builder_ui_items_ItemRessource = function() {
	this.buyCashButtonList = [];
	this.packageItemName = "gold_1";
	com_isartdigital_builder_ui_items_ItemShop.call(this);
	this.build();
	this.itemTitleComponentName = "PackageName_txt";
	this.itemAssetComponentName = "RessourceInShop";
	this.init();
};
$hxClasses["com.isartdigital.builder.ui.items.ItemRessource"] = com_isartdigital_builder_ui_items_ItemRessource;
com_isartdigital_builder_ui_items_ItemRessource.__name__ = ["com","isartdigital","builder","ui","items","ItemRessource"];
com_isartdigital_builder_ui_items_ItemRessource.__super__ = com_isartdigital_builder_ui_items_ItemShop;
com_isartdigital_builder_ui_items_ItemRessource.prototype = $extend(com_isartdigital_builder_ui_items_ItemShop.prototype,{
	init: function() {
		com_isartdigital_builder_ui_items_ItemShop.prototype.init.call(this);
		this.setListFromChild("CashButton",this.buyCashButtonList);
		this.packageGainText = js_Boot.__cast(this.getChildByName("PackageNumber_txt") , PIXI.Text);
		this.promotionText = js_Boot.__cast(this.getChildByName("promo_txt") , PIXI.Text);
		this.cocardeRessourceAsset = this.getChildByName("cocardeRessourceAsset");
		this.subscribeButtonsClickAndTap($bind(this,this.buyHard),this.buyHardButtonList);
	}
	,changeItemSelect: function(itemName) {
		this.packageItemName = itemName;
		this.setItemAsset(this.packageItemName);
		this.getItemDefinition();
		this.updateHardTxt();
		this.updatePackageInfos();
		this.updatePromoAssets();
		this.showGoodButtonAsset();
	}
	,updatePromoAssets: function() {
		if(this.currentDefinition.promotion == 0) {
			this.cocardeRessourceAsset.visible = false;
			this.promotionText.visible = false;
		} else {
			this.cocardeRessourceAsset.visible = true;
			this.promotionText.visible = true;
			this.promotionText.text = "-" + Std.string(this.currentDefinition.promotion) + "%";
		}
	}
	,showGoodButtonAsset: function() {
		this.setVisibilityInList(this.currentDefinition.resource_price == "spice",this.buyHardButtonList);
		this.setVisibilityInList(this.currentDefinition.resource_price == "cash",this.buyCashButtonList);
	}
	,getItemDefinition: function() {
		this.currentDefinition = Reflect.field(com_isartdigital_builder_game_utils_Metadatas.shopItem,this.packageItemName);
	}
	,buyHard: function(event) {
		var _g = this;
		if(this.currentDefinition.resource_price == "cash") {
			com_isartdigital_services_Wallet.getMoney(com_isartdigital_builder_api_Api.token,function(params) {
				haxe_Log.trace("get money " + Std.string(params),{ fileName : "ItemRessource.hx", lineNumber : 92, className : "com.isartdigital.builder.ui.items.ItemRessource", methodName : "buyHard"});
				if(Object.prototype.hasOwnProperty.call(params,"money")) {
					var money = Reflect.field(params,"money");
					if(money > _g.currentDefinition.price) com_isartdigital_services_Wallet.buy(com_isartdigital_builder_Main.getInstance().getMail(),_g.currentDefinition.price,function(params1) {
						haxe_Log.trace("============================",{ fileName : "ItemRessource.hx", lineNumber : 97, className : "com.isartdigital.builder.ui.items.ItemRessource", methodName : "buyHard"});
						haxe_Log.trace("Money Left : " + params1.money,{ fileName : "ItemRessource.hx", lineNumber : 98, className : "com.isartdigital.builder.ui.items.ItemRessource", methodName : "buyHard"});
						haxe_Log.trace("============================",{ fileName : "ItemRessource.hx", lineNumber : 99, className : "com.isartdigital.builder.ui.items.ItemRessource", methodName : "buyHard"});
					});
				}
			});
			com_isartdigital_builder_api_Api.user.buy(this.packageItemName);
		} else {
			if(!com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources(this.currentDefinition.resource_price,this.currentDefinition.price)) {
				com_isartdigital_builder_ui_items_ItemShop.applyRedBlinkEffect(event.target);
				return;
			}
			com_isartdigital_builder_game_manager_RessourceManager.getInstance().addRessources(this.currentDefinition.resource_product,this.currentDefinition.product);
			com_isartdigital_builder_api_Api.user.buy(this.packageItemName);
			com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
		}
	}
	,updateHardTxt: function() {
		var _g = 0;
		var _g1 = this.hardPriceTextList;
		while(_g < _g1.length) {
			var hardText = _g1[_g];
			++_g;
			hardText.text = Std.string(this.currentDefinition.price);
		}
	}
	,updatePackageInfos: function() {
		var _g = 0;
		var _g1 = this.itemTitleTextList;
		while(_g < _g1.length) {
			var title = _g1[_g];
			++_g;
			title.text = com_isartdigital_utils_Localization.getText("label_" + this.packageItemName);
		}
		this.packageGainText.text = Std.string(this.currentDefinition.product);
	}
	,__class__: com_isartdigital_builder_ui_items_ItemRessource
});
var com_isartdigital_builder_ui_items_MissionAsset = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_game_StateGraphic.call(this);
	this.boxType = com_isartdigital_utils_game_BoxType.SELF;
	this.setState(this.DEFAULT_STATE,false);
	this.gotoAndStopToRandomFrames();
	this.interactive = true;
	this.on("mouseover",$bind(this,this.mouseOver));
	this.on("mouseout",$bind(this,this.mouseOut));
	this.on("mouseupoutside",$bind(this,this.mouseOut));
};
$hxClasses["com.isartdigital.builder.ui.items.MissionAsset"] = com_isartdigital_builder_ui_items_MissionAsset;
com_isartdigital_builder_ui_items_MissionAsset.__name__ = ["com","isartdigital","builder","ui","items","MissionAsset"];
com_isartdigital_builder_ui_items_MissionAsset.__super__ = com_isartdigital_utils_game_StateGraphic;
com_isartdigital_builder_ui_items_MissionAsset.prototype = $extend(com_isartdigital_utils_game_StateGraphic.prototype,{
	mouseOut: function(event) {
		this.filters = null;
	}
	,mouseOver: function(event) {
		this.filters = com_isartdigital_utils_game_Filter.getBrightness(1.5);
	}
	,gotoAndStopToRandomFrames: function() {
		this.getFlumpMovie().gotoAndStop(Math.floor(Math.random() * this.getFlumpMovie().get_totalFrames()));
	}
	,__class__: com_isartdigital_builder_ui_items_MissionAsset
});
var com_isartdigital_builder_ui_items_MissionItem = function() {
	com_isartdigital_builder_ui_items_MissionItem.missionNames.push("Piété");
	com_isartdigital_builder_ui_items_MissionItem.missionNames.push("Curieux");
	com_isartdigital_builder_ui_items_MissionItem.missionNames.push("Barbare");
	com_isartdigital_builder_ui_items_MissionItem.missionNames.push("Haussman");
	com_isartdigital_builder_ui_items_MissionItem.missionNames.push("Attila");
	com_isartdigital_builder_ui_items_MissionItem.missionNames.push("Débauche");
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	this.missionText = js_Boot.__cast(this.getChildByName("Mission_txt") , PIXI.Text);
	this.missionText.text = com_isartdigital_builder_ui_items_MissionItem.missionNames[Math.floor(Math.random() * com_isartdigital_builder_ui_items_MissionItem.missionNames.length)];
};
$hxClasses["com.isartdigital.builder.ui.items.MissionItem"] = com_isartdigital_builder_ui_items_MissionItem;
com_isartdigital_builder_ui_items_MissionItem.__name__ = ["com","isartdigital","builder","ui","items","MissionItem"];
com_isartdigital_builder_ui_items_MissionItem.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_items_MissionItem.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	__class__: com_isartdigital_builder_ui_items_MissionItem
});
var com_isartdigital_builder_ui_items_MissionPanelItem = function() {
	this.missionItemList = [];
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
};
$hxClasses["com.isartdigital.builder.ui.items.MissionPanelItem"] = com_isartdigital_builder_ui_items_MissionPanelItem;
com_isartdigital_builder_ui_items_MissionPanelItem.__name__ = ["com","isartdigital","builder","ui","items","MissionPanelItem"];
com_isartdigital_builder_ui_items_MissionPanelItem.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_items_MissionPanelItem.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	testForShow: function() {
		if(!com_isartdigital_services_Users.infos.ftue_complet) this.parent.removeChild(this);
	}
	,__class__: com_isartdigital_builder_ui_items_MissionPanelItem
});
var com_isartdigital_builder_ui_items_ResourcesView = function() {
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	this.setVariableFromChild();
};
$hxClasses["com.isartdigital.builder.ui.items.ResourcesView"] = com_isartdigital_builder_ui_items_ResourcesView;
com_isartdigital_builder_ui_items_ResourcesView.__name__ = ["com","isartdigital","builder","ui","items","ResourcesView"];
com_isartdigital_builder_ui_items_ResourcesView.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_items_ResourcesView.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	updateOfferingText: function(pValue) {
		if(pValue == null) this.offeringText.text = "null"; else this.offeringText.text = "" + pValue;
	}
	,updatePesosText: function(pValue) {
		if(pValue == null) this.pesosText.text = "null"; else this.pesosText.text = "" + pValue;
	}
	,updatePimientosText: function(pValue) {
		if(pValue == null) this.pimientosText.text = "null"; else this.pimientosText.text = "" + pValue;
	}
	,setVariableFromChild: function() {
		this.offeringText = js_Boot.__cast(this.getChildByName("Offering_txt") , PIXI.Text);
		this.pesosText = js_Boot.__cast(this.getChildByName("Pesos_txt") , PIXI.Text);
		this.pimientosText = js_Boot.__cast(this.getChildByName("Pimientos_txt") , PIXI.Text);
	}
	,__class__: com_isartdigital_builder_ui_items_ResourcesView
});
var com_isartdigital_builder_ui_items_RessourceInShop = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_builder_ui_items_ItemAssetInShop.call(this);
};
$hxClasses["com.isartdigital.builder.ui.items.RessourceInShop"] = com_isartdigital_builder_ui_items_RessourceInShop;
com_isartdigital_builder_ui_items_RessourceInShop.__name__ = ["com","isartdigital","builder","ui","items","RessourceInShop"];
com_isartdigital_builder_ui_items_RessourceInShop.__super__ = com_isartdigital_builder_ui_items_ItemAssetInShop;
com_isartdigital_builder_ui_items_RessourceInShop.prototype = $extend(com_isartdigital_builder_ui_items_ItemAssetInShop.prototype,{
	__class__: com_isartdigital_builder_ui_items_RessourceInShop
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
var com_isartdigital_builder_ui_items_ShopCategory = function() {
	this.leftArrowList = [];
	this.rightArrowList = [];
	this.itemList = [];
	this.dotList = [];
	this.positionInShop = 0;
	this.dotButtonName = "DotButton";
	this.ShopSheetSettings = [];
	com_isartdigital_utils_ui_UIComponent.call(this);
};
$hxClasses["com.isartdigital.builder.ui.items.ShopCategory"] = com_isartdigital_builder_ui_items_ShopCategory;
com_isartdigital_builder_ui_items_ShopCategory.__name__ = ["com","isartdigital","builder","ui","items","ShopCategory"];
com_isartdigital_builder_ui_items_ShopCategory.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_items_ShopCategory.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	init: function() {
		this.getSettings();
		this.setListFromChild(this.itemComponentName,this.itemList);
		this.setListFromChild(this.dotButtonName,this.dotList);
		this.setListFromChild("RightButton",this.rightArrowList);
		this.setListFromChild("LeftButton",this.leftArrowList);
		this.createMissingDotButton();
		this.centerDotButton();
		this.changeSheet();
		this.setCurrentDotButtonActive();
		this.subscribeButtonsClickAndTap($bind(this,this.goRight),this.rightArrowList);
		this.subscribeButtonsClickAndTap($bind(this,this.goLeft),this.leftArrowList);
		this.subscribeButtonsClickAndTap($bind(this,this.onDotClick),this.dotList);
	}
	,getLeftItemBuilding: function() {
		return this.itemList[0];
	}
	,getRightItem: function() {
		return this.itemList[this.itemList.length - 1];
	}
	,goLeft: function(pEvent) {
		if(this.positionInShop - this.buildingPerSheet >= 0) {
			this.dotList[Math.floor(this.positionInShop / this.buildingPerSheet)].setInactive();
			this.positionInShop -= this.buildingPerSheet;
			this.changeSheet();
			this.dotList[Math.floor(this.positionInShop / this.buildingPerSheet)].setActive();
		}
	}
	,goRight: function(pEvent) {
		if(this.positionInShop + this.buildingPerSheet < this.ShopSheetSettings.length) {
			this.dotList[Math.floor(this.positionInShop / this.buildingPerSheet)].setInactive();
			this.positionInShop += this.buildingPerSheet;
			this.changeSheet();
			this.dotList[Math.floor(this.positionInShop / this.buildingPerSheet)].setActive();
		}
	}
	,changeSheet: function() {
		var _g1 = 0;
		var _g = this.itemList.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.itemList[i].changeItemSelect(this.ShopSheetSettings[this.positionInShop + i]);
		}
		this.appearArrows();
	}
	,appearArrows: function() {
		if(Math.floor(this.positionInShop / this.buildingPerSheet) == this.dotList.length - 1) this.hideObject(this.rightArrowList[0]); else this.appearFeedBackObject(this.rightArrowList[0]);
		if(Math.floor(this.positionInShop / this.buildingPerSheet) == 0) this.hideObject(this.leftArrowList[0]); else this.appearFeedBackObject(this.leftArrowList[0]);
	}
	,hideObject: function(object) {
		object.visible = false;
	}
	,appearFeedBackObject: function(object) {
		object.visible = true;
		object.scale.set(1.5,1);
		motion_Actuate.tween(object.scale,0.5,{ x : 1}).ease(motion_easing_Bounce.get_easeOut());
	}
	,onDotClick: function(event) {
		this.setCurrentDotButtonInactive();
		this.changePositionInShopFromDotButton(js_Boot.__cast(event.target , com_isartdigital_builder_ui_buttons_DotButton));
		this.setCurrentDotButtonActive();
		this.changeSheet();
	}
	,changePositionInShopFromDotButton: function(dotButton) {
		this.positionInShop = HxOverrides.indexOf(this.dotList,dotButton,0) * this.buildingPerSheet;
	}
	,setCurrentDotButtonActive: function() {
		this.dotList[Math.floor(this.positionInShop / this.buildingPerSheet)].setActive();
	}
	,setCurrentDotButtonInactive: function() {
		this.dotList[Math.floor(this.positionInShop / this.buildingPerSheet)].setInactive();
	}
	,centerDotButton: function() {
		var widthBetweenFirstAndLastElement = this.dotList[this.dotList.length - 1].x - this.dotList[0].x;
		var widthToAbduct = widthBetweenFirstAndLastElement / 2 - this.dotList[0].width;
		var yPositionOfDotButton = this.dotList[this.dotList.length - 1].y;
		var _g = 0;
		var _g1 = this.dotList;
		while(_g < _g1.length) {
			var dotButton = _g1[_g];
			++_g;
			dotButton.position.set(dotButton.x - widthToAbduct,yPositionOfDotButton);
		}
	}
	,getNumberOfMissingDotButton: function() {
		return Std["int"](Math.ceil(this.ShopSheetSettings.length / this.buildingPerSheet) - this.dotList.length);
	}
	,createMissingDotButton: function() {
		var delatX = this.dotList[1].x - this.dotList[0].x;
		var _g1 = 0;
		var _g = this.getNumberOfMissingDotButton();
		while(_g1 < _g) {
			var i = _g1++;
			var position = this.dotList[i + 1].position.clone();
			this.dotList.push(this.createDotButton(new PIXI.Point(position.x + delatX,position.y)));
		}
	}
	,createDotButton: function(createAtPosition) {
		var dotButton = new com_isartdigital_builder_ui_buttons_DotButton();
		dotButton.position.set(createAtPosition.x,createAtPosition.y);
		this.addChild(dotButton);
		return dotButton;
	}
	,getSettings: function() {
		this.ShopSheetSettings = com_isartdigital_utils_loader_GameLoader.getContent(this.jsonSettingsName);
	}
	,destroy: function() {
		this.unsubscribeButtonsClickAndTap(this.rightArrowList);
		this.unsubscribeButtonsClickAndTap(this.leftArrowList);
		this.unsubscribeButtonsClickAndTap(this.dotList);
		while(this.itemList.length > 0) this.itemList[0].destroy();
		while(this.dotList.length > 0) this.dotList[0].destroy();
		this.interactive = false;
		com_isartdigital_utils_ui_UIComponent.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_items_ShopCategory
});
var com_isartdigital_builder_ui_items_ShopBuilding = function() {
	com_isartdigital_builder_ui_items_ShopCategory.call(this);
	this.build();
	this.jsonSettingsName = "json/ShopBuildingSheet.json";
	this.buildingPerSheet = 2;
	this.itemComponentName = "ItemBuilding";
	this.init();
};
$hxClasses["com.isartdigital.builder.ui.items.ShopBuilding"] = com_isartdigital_builder_ui_items_ShopBuilding;
com_isartdigital_builder_ui_items_ShopBuilding.__name__ = ["com","isartdigital","builder","ui","items","ShopBuilding"];
com_isartdigital_builder_ui_items_ShopBuilding.__super__ = com_isartdigital_builder_ui_items_ShopCategory;
com_isartdigital_builder_ui_items_ShopBuilding.prototype = $extend(com_isartdigital_builder_ui_items_ShopCategory.prototype,{
	__class__: com_isartdigital_builder_ui_items_ShopBuilding
});
var com_isartdigital_builder_ui_items_ShopRessource = function() {
	com_isartdigital_builder_ui_items_ShopCategory.call(this);
	this.build();
	this.jsonSettingsName = "json/ShopRessourceSheet.json";
	this.buildingPerSheet = 3;
	this.itemComponentName = "ItemRessource";
	this.init();
};
$hxClasses["com.isartdigital.builder.ui.items.ShopRessource"] = com_isartdigital_builder_ui_items_ShopRessource;
com_isartdigital_builder_ui_items_ShopRessource.__name__ = ["com","isartdigital","builder","ui","items","ShopRessource"];
com_isartdigital_builder_ui_items_ShopRessource.__super__ = com_isartdigital_builder_ui_items_ShopCategory;
com_isartdigital_builder_ui_items_ShopRessource.prototype = $extend(com_isartdigital_builder_ui_items_ShopCategory.prototype,{
	__class__: com_isartdigital_builder_ui_items_ShopRessource
});
var com_isartdigital_builder_ui_items_TimerParade = function() {
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.build();
	this.setVariableFromChild();
};
$hxClasses["com.isartdigital.builder.ui.items.TimerParade"] = com_isartdigital_builder_ui_items_TimerParade;
com_isartdigital_builder_ui_items_TimerParade.__name__ = ["com","isartdigital","builder","ui","items","TimerParade"];
com_isartdigital_builder_ui_items_TimerParade.__super__ = com_isartdigital_utils_ui_UIComponent;
com_isartdigital_builder_ui_items_TimerParade.prototype = $extend(com_isartdigital_utils_ui_UIComponent.prototype,{
	updateTimerText: function(pValue) {
		var lString;
		if(pValue == null) lString = "null"; else lString = "" + pValue;
		this.timerText.text = HxOverrides.substr(lString,0,5);
	}
	,setVariableFromChild: function() {
		this.timerText = js_Boot.__cast(this.getChildByName("timerParade_txt") , PIXI.Text);
	}
	,__class__: com_isartdigital_builder_ui_items_TimerParade
});
var com_isartdigital_builder_ui_items_Tutor = function() {
	this.factory = new com_isartdigital_utils_game_factory_FlumpMovieAnimFactory();
	com_isartdigital_utils_game_StateGraphic.call(this);
	this.setState(this.DEFAULT_STATE);
};
$hxClasses["com.isartdigital.builder.ui.items.Tutor"] = com_isartdigital_builder_ui_items_Tutor;
com_isartdigital_builder_ui_items_Tutor.__name__ = ["com","isartdigital","builder","ui","items","Tutor"];
com_isartdigital_builder_ui_items_Tutor.__super__ = com_isartdigital_utils_game_StateGraphic;
com_isartdigital_builder_ui_items_Tutor.prototype = $extend(com_isartdigital_utils_game_StateGraphic.prototype,{
	gotoLabel: function(name) {
		this.getFlumpMovie().gotoAndStop(this.getFlumpMovie().getLabelFrame(name));
	}
	,__class__: com_isartdigital_builder_ui_items_Tutor
});
var com_isartdigital_utils_ui_Popin = function() {
	com_isartdigital_utils_ui_UIComponent.call(this);
	this.set_modal(true);
	this.juicyOpen();
	this.interactive = true;
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
var com_isartdigital_builder_ui_popin_DeleteConfirm = function() {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.setMemberFromChild();
	this.subscribeButton();
};
$hxClasses["com.isartdigital.builder.ui.popin.DeleteConfirm"] = com_isartdigital_builder_ui_popin_DeleteConfirm;
com_isartdigital_builder_ui_popin_DeleteConfirm.__name__ = ["com","isartdigital","builder","ui","popin","DeleteConfirm"];
com_isartdigital_builder_ui_popin_DeleteConfirm.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_DeleteConfirm.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	subscribeButton: function() {
		this.confirmButton.tap = this.confirmButton.click = $bind(this,this.onConfirmButton);
		this.cancelButton.tap = this.cancelButton.click = $bind(this,this.onCancelButton);
	}
	,onCancelButton: function(event) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
	}
	,onConfirmButton: function(event) {
		com_isartdigital_builder_Main.getInstance().emit("DELETE_BUTTON");
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
	}
	,setMemberFromChild: function() {
		this.confirmButton = js_Boot.__cast(this.getChildByName("RewardButton") , com_isartdigital_builder_ui_buttons_RewardButton);
		this.cancelButton = js_Boot.__cast(this.getChildByName("CancelButton") , com_isartdigital_builder_ui_buttons_CancelButton);
	}
	,__class__: com_isartdigital_builder_ui_popin_DeleteConfirm
});
var com_isartdigital_builder_ui_popin_HardBuildConfirm = function(price) {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.price = price;
	this.setVariableFromChild();
	if(price == null) this.currencyCost.text = "null"; else this.currencyCost.text = "" + price;
	this.buyHardButton.click = this.buyHardButton.tap = $bind(this,this.onConfirmButtonClick);
	this.cancelButton.click = this.cancelButton.tap = $bind(this,this.onCancelButtonClick);
};
$hxClasses["com.isartdigital.builder.ui.popin.HardBuildConfirm"] = com_isartdigital_builder_ui_popin_HardBuildConfirm;
com_isartdigital_builder_ui_popin_HardBuildConfirm.__name__ = ["com","isartdigital","builder","ui","popin","HardBuildConfirm"];
com_isartdigital_builder_ui_popin_HardBuildConfirm.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_HardBuildConfirm.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	juicyOpen: function() {
		this.alpha = 0;
		motion_Actuate.tween(this,0.5,{ alpha : 1}).ease(motion_easing_Cubic.get_easeOut());
	}
	,setVariableFromChild: function() {
		this.buyHardButton = js_Boot.__cast(this.getChildByName("BuyHardButton") , com_isartdigital_builder_ui_buttons_BuyHardButton);
		this.cancelButton = js_Boot.__cast(this.getChildByName("CancelButton") , com_isartdigital_builder_ui_buttons_CancelButton);
		this.confirmTxt = js_Boot.__cast(this.getChildByName("HardBuildConfirm_txt") , PIXI.Text);
		this.currencyCost = js_Boot.__cast(this.getChildByName("CurrencyCount_txt") , PIXI.Text);
		this.descriptionText = js_Boot.__cast(this.getChildByName("HardBuildConfirmDescription_txt") , PIXI.Text);
	}
	,onCancelButtonClick: function(event) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
	}
	,onConfirmButtonClick: function(event) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CONFIRM_BUTTON_CLICK",{ price : this.price});
	}
	,destroy: function() {
		this.buyHardButton.destroy();
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_HardBuildConfirm
});
var com_isartdigital_builder_ui_popin_LanternConfirm = function() {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.priceHard = this.getChildByName("LanternConfirmPriceHard_txt");
	this.priceSoft = this.getChildByName("LanternConfirmPriceSoft_txt");
	var lanternConfig = com_isartdigital_utils_loader_GameLoader.getContent("json/buildingsSettings.json");
	lanternConfig = Reflect.field(lanternConfig,"lanterns");
	this.priceSoft.text = lanternConfig.price * com_isartdigital_services_Users.getTotalIlluminatedLanterns() + lanternConfig.base_price;
	this.priceHard.text = lanternConfig.hard_price * com_isartdigital_services_Users.getTotalIlluminatedLanterns() + lanternConfig.base_hard_price;
	this.buyHard = this.getChildByName("BuyHardButton");
	this.buySoft = this.getChildByName("BuyPesosButton");
	this.buyHard.click = this.buyHard.tap = $bind(this,this.onBuyHardButton);
	this.buySoft.click = this.buySoft.tap = $bind(this,this.onBuySoftButton);
};
$hxClasses["com.isartdigital.builder.ui.popin.LanternConfirm"] = com_isartdigital_builder_ui_popin_LanternConfirm;
com_isartdigital_builder_ui_popin_LanternConfirm.__name__ = ["com","isartdigital","builder","ui","popin","LanternConfirm"];
com_isartdigital_builder_ui_popin_LanternConfirm.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_LanternConfirm.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	juicyOpen: function() {
		this.alpha = 0;
		motion_Actuate.tween(this,0.5,{ alpha : 1}).ease(motion_easing_Cubic.get_easeOut());
	}
	,onBuyHardButton: function(pEventTarget) {
		com_isartdigital_builder_Main.getInstance().emit(com_isartdigital_builder_ui_popin_LanternConfirm.BUYHARD);
	}
	,onBuySoftButton: function(pEventTarget) {
		com_isartdigital_builder_Main.getInstance().emit(com_isartdigital_builder_ui_popin_LanternConfirm.BUYSOFT);
	}
	,destroy: function() {
		this.buyHard.destroy();
		this.buySoft.destroy();
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_LanternConfirm
});
var com_isartdigital_builder_ui_popin_LanternInfo = function() {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.setMembersFromChild();
	this.subscribeButton();
};
$hxClasses["com.isartdigital.builder.ui.popin.LanternInfo"] = com_isartdigital_builder_ui_popin_LanternInfo;
com_isartdigital_builder_ui_popin_LanternInfo.__name__ = ["com","isartdigital","builder","ui","popin","LanternInfo"];
com_isartdigital_builder_ui_popin_LanternInfo.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_LanternInfo.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	subscribeButton: function() {
		this.rewardButton.click = this.rewardButton.tap = $bind(this,this.onRewardButtonClick);
	}
	,onRewardButtonClick: function(event) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
	}
	,setMembersFromChild: function() {
		this.rewardButton = js_Boot.__cast(this.getChildByName("RewardButton") , com_isartdigital_builder_ui_buttons_RewardButton);
	}
	,destroy: function() {
		this.rewardButton.destroy();
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_LanternInfo
});
var com_isartdigital_builder_ui_popin_LevelReward = function() {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.setVariablesFromChild();
	this.setVariablesFromSettings();
	this.subscribeButtonClickEvent();
	this.setGifts();
};
$hxClasses["com.isartdigital.builder.ui.popin.LevelReward"] = com_isartdigital_builder_ui_popin_LevelReward;
com_isartdigital_builder_ui_popin_LevelReward.__name__ = ["com","isartdigital","builder","ui","popin","LevelReward"];
com_isartdigital_builder_ui_popin_LevelReward.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_LevelReward.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	juicyOpen: function() {
		this.alpha = 0;
		motion_Actuate.tween(this,0.5,{ alpha : 1}).ease(motion_easing_Cubic.get_easeOut());
	}
	,subscribeButtonClickEvent: function() {
		this.acceptButton.click = this.acceptButton.tap = $bind(this,this.onAcceptButtonClick);
	}
	,onAcceptButtonClick: function(pEvent) {
		com_isartdigital_builder_game_ftue_Ftue.event.emit("COLLECT_LEVEL_UP");
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
	}
	,setVariablesFromChild: function() {
		this.acceptButton = js_Boot.__cast(this.getChildByName("RewardButton") , com_isartdigital_builder_ui_buttons_RewardButton);
		this.pesosAsset = this.getChildByName("RewardPesosAsset");
		this.pimientosAsset = this.getChildByName("RewardPimientosAsset");
		this.pesosText = js_Boot.__cast(this.getChildByName("RewardPesos_txt") , PIXI.Text);
		this.pimientosText = js_Boot.__cast(this.getChildByName("RewardPimientos_txt") , PIXI.Text);
	}
	,setVariablesFromSettings: function() {
		var lSettings = com_isartdigital_builder_game_utils_Metadatas.levelReward[com_isartdigital_builder_game_manager_ExperienceManager.getInstance().getLvlUser()];
		this.pimientosToReward = lSettings.pimientos;
		this.pesosToReward = lSettings.gold;
	}
	,setTexts: function() {
		this.pimientosText.text = Std.string(this.pimientosToReward);
		this.pesosText.text = Std.string(this.pesosToReward);
	}
	,hidePimientosAssets: function() {
		this.removeChild(this.pimientosAsset);
		this.removeChild(this.pimientosText);
	}
	,setGifts: function() {
		this.setTexts();
		if(this.pimientosToReward == 0) this.hidePimientosAssets();
	}
	,__class__: com_isartdigital_builder_ui_popin_LevelReward
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
var com_isartdigital_builder_ui_popin_NoMoneyInfo = function() {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.setMemberFromChild();
	this.subscribeButtons();
};
$hxClasses["com.isartdigital.builder.ui.popin.NoMoneyInfo"] = com_isartdigital_builder_ui_popin_NoMoneyInfo;
com_isartdigital_builder_ui_popin_NoMoneyInfo.__name__ = ["com","isartdigital","builder","ui","popin","NoMoneyInfo"];
com_isartdigital_builder_ui_popin_NoMoneyInfo.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_NoMoneyInfo.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	setMemberFromChild: function() {
		this.cancelButton = js_Boot.__cast(this.getChildByName("CancelButton") , com_isartdigital_builder_ui_buttons_CancelButton);
		this.rewardButton = js_Boot.__cast(this.getChildByName("RewardButton") , com_isartdigital_builder_ui_buttons_RewardButton);
	}
	,subscribeButtons: function() {
		this.rewardButton.click = this.rewardButton.tap = $bind(this,this.onRewardButton);
		this.cancelButton.click = this.cancelButton.tap = $bind(this,this.onCancelButton);
	}
	,onRewardButton: function(event) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_SHOP_RESOURCE");
	}
	,onCancelButton: function(event) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
	}
	,destroy: function() {
		haxe_Log.trace("Destroy NoMoneyInfo",{ fileName : "NoMoneyInfo.hx", lineNumber : 46, className : "com.isartdigital.builder.ui.popin.NoMoneyInfo", methodName : "destroy"});
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_NoMoneyInfo
});
var com_isartdigital_builder_ui_popin_ParadeConfirm = function() {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.setVariableFromChild();
	this.setPrice();
	this.setTextPrice();
	this.subscribeButtonClick();
};
$hxClasses["com.isartdigital.builder.ui.popin.ParadeConfirm"] = com_isartdigital_builder_ui_popin_ParadeConfirm;
com_isartdigital_builder_ui_popin_ParadeConfirm.__name__ = ["com","isartdigital","builder","ui","popin","ParadeConfirm"];
com_isartdigital_builder_ui_popin_ParadeConfirm.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_ParadeConfirm.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	juicyOpen: function() {
		this.alpha = 0;
		motion_Actuate.tween(this,0.5,{ alpha : 1}).ease(motion_easing_Cubic.get_easeOut());
	}
	,getSoftButton: function() {
		return this.softButton;
	}
	,subscribeButtonClick: function() {
		this.hardButton.click = this.hardButton.tap = $bind(this,this.onHardButtonClick);
		this.softButton.click = this.softButton.tap = $bind(this,this.onSoftButtonClick);
	}
	,unsubscribeButtonClick: function() {
		this.hardButton.click = this.hardButton.tap = null;
		this.softButton.click = this.softButton.tap = null;
	}
	,setVariableFromChild: function() {
		this.hardButton = this.getChildByName("BuyHardButton");
		this.softButton = this.getChildByName("BuyPesosButton");
		this.priceHardText = this.getChildByName("PriceHard_txt");
		this.priceSoftText = this.getChildByName("PriceSoft_txt");
	}
	,setTextPrice: function() {
		this.priceSoftText.text = Std.string(this.priceSoft);
		this.priceHardText.text = Std.string(this.priceHard);
	}
	,setPrice: function() {
		var mainBuildingLvl = com_isartdigital_services_Users.getMainBuildingLevel();
		mainBuildingLvl = Std["int"](com_isartdigital_utils_MathUtils.roundToStep(mainBuildingLvl,5));
		this.priceSoft = com_isartdigital_builder_game_utils_Metadatas.paradeDetails.get(mainBuildingLvl == null?"null":"" + mainBuildingLvl).price_soft;
		this.priceHard = com_isartdigital_builder_game_utils_Metadatas.paradeDetails.get(mainBuildingLvl == null?"null":"" + mainBuildingLvl).price_hard;
	}
	,onSoftButtonClick: function(pEvent) {
		if(!com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources("gold",this.priceSoft | 0)) {
			com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_NOMONEY");
			return;
		}
		com_isartdigital_builder_ui_UIManager.getInstance().closeCurrentPopin();
		com_isartdigital_builder_game_GameManager.getInstance().startParade(false);
		com_isartdigital_builder_game_ftue_Ftue.event.emit("PARADE_LAUNCHED");
	}
	,onHardButtonClick: function(pEvent) {
		if(!com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources("spice",this.priceHard | 0)) {
			com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_NOMONEY");
			return;
		}
		com_isartdigital_builder_ui_UIManager.getInstance().closeCurrentPopin();
		com_isartdigital_builder_game_GameManager.getInstance().startParade(true);
		com_isartdigital_builder_game_ftue_Ftue.event.emit("PARADE_LAUNCHED");
	}
	,destroy: function() {
		this.unsubscribeButtonClick();
		this.hardButton.destroy();
		this.softButton.destroy();
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_ParadeConfirm
});
var com_isartdigital_builder_ui_popin_ParadeContinue = function() {
	this.isOnlyClose = true;
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.setVariablesFromChild();
	this.subscribeEvent();
};
$hxClasses["com.isartdigital.builder.ui.popin.ParadeContinue"] = com_isartdigital_builder_ui_popin_ParadeContinue;
com_isartdigital_builder_ui_popin_ParadeContinue.__name__ = ["com","isartdigital","builder","ui","popin","ParadeContinue"];
com_isartdigital_builder_ui_popin_ParadeContinue.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_ParadeContinue.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	juicyOpen: function() {
		this.alpha = 0;
		motion_Actuate.tween(this,0.5,{ alpha : 1}).ease(motion_easing_Cubic.get_easeOut());
	}
	,setVariablesFromChild: function() {
		this.adButton = js_Boot.__cast(this.getChildByName("AdButton") , com_isartdigital_builder_ui_buttons_AdButton);
		this.continueHardButton = js_Boot.__cast(this.getChildByName("ContinueHardButton") , com_isartdigital_builder_ui_buttons_ContinueHardButton);
	}
	,subscribeEvent: function() {
		this.adButton.click = this.adButton.tap = $bind(this,this.onAdButton);
		this.continueHardButton.click = this.continueHardButton.tap = $bind(this,this.onHardButton);
	}
	,onAdButton: function(event) {
		if(com_isartdigital_utils_system_DeviceCapabilities.get_isCocoonJS()) {
			if(!com_isartdigital_services_Ads.getImage($bind(this,this.onAdsMovieEnd))) return;
		}
		if(!com_isartdigital_services_Ads.getMovie($bind(this,this.onAdsMovieEnd))) return;
	}
	,onAdsMovieEnd: function(params) {
		if(params == null) {
			haxe_Log.trace("Erreur Ads API",{ fileName : "ParadeContinue.hx", lineNumber : 59, className : "com.isartdigital.builder.ui.popin.ParadeContinue", methodName : "onAdsMovieEnd"});
			return;
		} else if(params.error != null) {
			haxe_Log.trace(params.error,{ fileName : "ParadeContinue.hx", lineNumber : 63, className : "com.isartdigital.builder.ui.popin.ParadeContinue", methodName : "onAdsMovieEnd"});
			return;
		} else {
			haxe_Log.trace(params,{ fileName : "ParadeContinue.hx", lineNumber : 67, className : "com.isartdigital.builder.ui.popin.ParadeContinue", methodName : "onAdsMovieEnd"});
			this.closeThisPopinWithoutCloseButton();
			com_isartdigital_builder_game_GameManager.getInstance().continueParade();
		}
	}
	,getMoreTimeParadePrice: function() {
		return 2;
	}
	,onHardButton: function(event) {
		if(!com_isartdigital_builder_game_manager_RessourceManager.getInstance().removeRessources("spice",this.getMoreTimeParadePrice())) return;
		this.closeThisPopinWithoutCloseButton();
		com_isartdigital_builder_game_GameManager.getInstance().continueParade();
	}
	,closeThisPopinWithoutCloseButton: function() {
		this.isOnlyClose = false;
		com_isartdigital_builder_ui_UIManager.getInstance().closeCurrentPopin();
	}
	,onCloseWithCloseButton: function() {
		com_isartdigital_builder_game_GameManager.getInstance().dontContinueParade();
	}
	,destroy: function() {
		if(this.isOnlyClose) this.onCloseWithCloseButton();
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_ParadeContinue
});
var com_isartdigital_builder_ui_popin_ParadeReward = function(offeringGain,pesosGain,pimientosGain) {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.button = this.getChildByName("RewardButton");
	this.button.click = this.button.tap = $bind(this,this.onButtonClick);
	this.title = this.getChildByName("ParadeRewardTitle_txt");
	this.offering = this.getChildByName("ParadeRewardOffering_txt");
	this.pimientos = this.getChildByName("ParadeRewardPimientos_txt");
	this.pesos = this.getChildByName("ParadeRewardPesos_txt");
	if(pesosGain == null) this.pesos.text = "null"; else this.pesos.text = "" + pesosGain;
	if(pimientosGain == null) this.pimientos.text = "null"; else this.pimientos.text = "" + pimientosGain;
	if(offeringGain == null) this.offering.text = "null"; else this.offering.text = "" + offeringGain;
	this.gainGold = pesosGain;
	this.gainSpice = pimientosGain;
	this.gainOffering = offeringGain;
};
$hxClasses["com.isartdigital.builder.ui.popin.ParadeReward"] = com_isartdigital_builder_ui_popin_ParadeReward;
com_isartdigital_builder_ui_popin_ParadeReward.__name__ = ["com","isartdigital","builder","ui","popin","ParadeReward"];
com_isartdigital_builder_ui_popin_ParadeReward.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_ParadeReward.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	juicyOpen: function() {
		this.alpha = 0;
		motion_Actuate.tween(this,0.5,{ alpha : 1}).ease(motion_easing_Cubic.get_easeOut());
	}
	,onButtonClick: function(pEvent) {
		com_isartdigital_builder_game_ftue_Ftue.event.emit("PARADE_COLLECT");
		com_isartdigital_builder_game_ftue_Ftue.event.emit("PINATA_RECOLT");
		com_isartdigital_builder_game_manager_RessourceManager.getInstance().addRessources("gold",this.gainGold | 0);
		com_isartdigital_builder_game_manager_RessourceManager.getInstance().addRessources("spice",this.gainSpice | 0);
		com_isartdigital_builder_game_manager_RessourceManager.getInstance().addRessources("offering",this.gainOffering | 0);
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
		com_isartdigital_builder_game_GameManager.getInstance().emit("END_PARADE_REQUEST");
	}
	,destroy: function() {
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_ParadeReward
});
var com_isartdigital_builder_ui_popin_Pinata = function(rewards) {
	this.spiceGain = 0;
	this.offeringGain = 0;
	this.goldGain = 0;
	this.isGrownAnimationActive = false;
	this.pinataScale = 1;
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.rewards = rewards;
	com_isartdigital_builder_ui_UIManager.getInstance().closeHud();
	this.panAsset = this.getChildByName("panAsset");
	this.headAsset = this.getChildByName("headAsset");
	this.legAsset = this.getChildByName("legAsset");
	this.legBisAsset = this.getChildByName("legBisAsset");
	this.assAsset = this.getChildByName("assAsset");
	this.pinata = this.getChildByName("pinataAsset");
	this.pinata.interactive = true;
	this.pinata.click = this.pinata.tap = $bind(this,this.onPinataClick);
	window.document.body.style.cursor = "url(bat.png), auto";
	com_isartdigital_builder_Main.getInstance().on("gameLoop",$bind(this,this.shrink));
	this.saveRewards();
	this.hideRewardsAsset();
};
$hxClasses["com.isartdigital.builder.ui.popin.Pinata"] = com_isartdigital_builder_ui_popin_Pinata;
com_isartdigital_builder_ui_popin_Pinata.__name__ = ["com","isartdigital","builder","ui","popin","Pinata"];
com_isartdigital_builder_ui_popin_Pinata.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_Pinata.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	hideRewardsAsset: function() {
		this.panAsset.visible = false;
		this.headAsset.visible = false;
		this.legAsset.visible = false;
		this.legBisAsset.visible = false;
		this.assAsset.visible = false;
	}
	,saveRewards: function() {
		var gifts = com_isartdigital_builder_game_utils_Metadatas.gifts;
		var _g = 0;
		var _g1 = this.rewards;
		while(_g < _g1.length) {
			var reward = _g1[_g];
			++_g;
			var gift = Reflect.getProperty(gifts,reward);
			if(gift.resource_name == "gold") this.goldGain += gift.resource_amount;
			if(gift.resource_name == "offering") this.offeringGain += gift.resource_amount;
			if(gift.resource_name == "spice") this.spiceGain += gift.resource_amount;
		}
	}
	,shrink: function() {
		if(!this.isGrownAnimationActive) {
			if(this.pinataScale > 1) this.pinataScale -= 0.01;
			this.pinata.scale = new PIXI.Point(this.pinataScale,this.pinataScale);
		}
	}
	,onPinataClick: function(event) {
		if(this.pinataScale > 1.5) this.explodePinata();
		this.pinataScale += 0.075;
		window.document.body.style.cursor = "url(bathit.png), auto";
		haxe_Timer.delay(function() {
			window.document.body.style.cursor = "url(bat.png), auto";
		},50);
		new com_isartdigital_builder_game_animation_paper_AnimationPaperBuilder().withContainer(com_isartdigital_utils_game_GameStage.getInstance().getPopinsContainer()).withPosition(this.pinata.position).withRadius(650 * this.pinataScale).withSpeedRatio(this.pinataScale).withPattern("circle").build();
	}
	,updatePinataScale: function() {
		this.pinata.scale = new PIXI.Point(this.pinataScale,this.pinataScale);
	}
	,juicyOpen: function() {
		this.alpha = 0;
		motion_Actuate.tween(this,0.5,{ alpha : 1}).ease(motion_easing_Cubic.get_easeOut()).onComplete(function() {
			com_isartdigital_builder_game_ftue_Ftue.event.emit("PINATA_APPEAR");
		});
	}
	,createLinesOfPapers: function() {
		new com_isartdigital_builder_game_animation_paper_AnimationPaperBuilder().withContainer(this).withPosition(new PIXI.Point(-this.width / 2,-this.height / 2)).withRadius(650 * this.pinataScale).withSpeedRatio(this.pinataScale).withPattern("line").build();
	}
	,explodePinata: function() {
		this.pinata.interactive = false;
		this.pinata.visible = false;
		this.panAsset.visible = true;
		this.panAsset.alpha = 0;
		this.headAsset.visible = this.legAsset.visible = this.legBisAsset.visible = this.assAsset.visible = true;
		motion_Actuate.tween(this.headAsset.position,0.3,{ x : this.headAsset.position.x + 40}).ease(motion_easing_Quad.get_easeOut());
		motion_Actuate.tween(this.headAsset.position,0.3,{ y : this.headAsset.position.y - 40}).ease(motion_easing_Quad.get_easeOut());
		motion_Actuate.tween(this.legAsset.position,0.3,{ x : this.legAsset.position.x + 40}).ease(motion_easing_Quad.get_easeOut());
		motion_Actuate.tween(this.legAsset.position,0.3,{ y : this.legAsset.position.y + 40}).ease(motion_easing_Quad.get_easeOut());
		motion_Actuate.tween(this.legBisAsset.position,0.3,{ x : this.legBisAsset.position.x - 40}).ease(motion_easing_Quad.get_easeOut());
		motion_Actuate.tween(this.legBisAsset.position,0.3,{ y : this.legBisAsset.position.y + 40}).ease(motion_easing_Quad.get_easeOut());
		motion_Actuate.tween(this.assAsset.position,0.3,{ x : this.assAsset.position.x - 40}).ease(motion_easing_Quad.get_easeOut());
		motion_Actuate.tween(this.assAsset.position,0.3,{ y : this.assAsset.position.y - 40}).ease(motion_easing_Quad.get_easeOut());
		this.addPanAsset();
	}
	,addPanAsset: function() {
		motion_Actuate.tween(this.panAsset,0.3,{ alpha : 0.8}).ease(motion_easing_Expo.get_easeOut());
		this.panAsset.scale.set(0.5,0.5);
		motion_Actuate.tween(this.panAsset.scale,1.5,{ x : 1.5, y : 2}).ease(motion_easing_Expo.get_easeOut()).onComplete($bind(this,this.finish));
	}
	,finish: function() {
		window.document.body.style.cursor = "url(cursor.png), auto";
		haxe_Timer.delay(function() {
			window.document.body.style.cursor = "url(cursor.png), auto";
		},300);
		com_isartdigital_builder_game_ftue_Ftue.event.emit("PINATA_EXPLODE");
		com_isartdigital_builder_ui_UIManager.getInstance().emit("OPEN_POPIN_REQUEST_PARADEREWARD",[this.offeringGain,this.goldGain,this.spiceGain]);
		com_isartdigital_builder_ui_UIManager.getInstance().openHud();
	}
	,destroy: function() {
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
		com_isartdigital_builder_Main.getInstance().off("gameLoop",$bind(this,this.shrink));
	}
	,__class__: com_isartdigital_builder_ui_popin_Pinata
});
var com_isartdigital_builder_ui_popin_Shop = function(pActiveShop) {
	if(pActiveShop == null) pActiveShop = "BUILDING_SHOP";
	this.activeShop = "BUILDING_SHOP";
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.setVariableFromChild();
	this.subscribeButtonsClick();
	this.activeShop = pActiveShop;
	this.changeShop();
};
$hxClasses["com.isartdigital.builder.ui.popin.Shop"] = com_isartdigital_builder_ui_popin_Shop;
com_isartdigital_builder_ui_popin_Shop.__name__ = ["com","isartdigital","builder","ui","popin","Shop"];
com_isartdigital_builder_ui_popin_Shop.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_Shop.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	getBuildingShop: function() {
		return this.buildingShop;
	}
	,getRessourceShop: function() {
		return this.ressourceShop;
	}
	,setVariableFromChild: function() {
		this.buildingShop = js_Boot.__cast(this.getChildByName("ShopBuilding") , com_isartdigital_builder_ui_items_ShopBuilding);
		this.ressourceShop = js_Boot.__cast(this.getChildByName("ShopRessource") , com_isartdigital_builder_ui_items_ShopRessource);
		this.ressourceButton = js_Boot.__cast(this.getChildByName("ShopRessourceButton") , com_isartdigital_builder_ui_buttons_ShopRessourceButton);
		this.buildingButton = js_Boot.__cast(this.getChildByName("ShopBuildingButton") , com_isartdigital_builder_ui_buttons_ShopBuildingButton);
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
			this.buildingButton.setInactive();
			this.ressourceButton.setActive();
			this.buildingShop.visible = false;
			this.ressourceShop.visible = true;
			break;
		case "BUILDING_SHOP":
			this.buildingButton.setActive();
			this.ressourceButton.setInactive();
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
		this.interactive = false;
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_Shop
});
var com_isartdigital_builder_ui_popin_UpgradeConfirm = function(params) {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.setMemberFromChild();
	this.subscribeButtons();
	this.setTimeInDescription(params.timeLeft);
	if(params.price == null) this.priceSoft.text = "null"; else this.priceSoft.text = "" + params.price;
};
$hxClasses["com.isartdigital.builder.ui.popin.UpgradeConfirm"] = com_isartdigital_builder_ui_popin_UpgradeConfirm;
com_isartdigital_builder_ui_popin_UpgradeConfirm.__name__ = ["com","isartdigital","builder","ui","popin","UpgradeConfirm"];
com_isartdigital_builder_ui_popin_UpgradeConfirm.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_UpgradeConfirm.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	setMemberFromChild: function() {
		this.description = js_Boot.__cast(this.getChildByName("UpgradeConfirmDescription_txt") , PIXI.Text);
		this.priceSoft = js_Boot.__cast(this.getChildByName("PriceSoft_txt") , PIXI.Text);
		this.cancelButton = js_Boot.__cast(this.getChildByName("CancelButton") , com_isartdigital_builder_ui_buttons_CancelButton);
		this.buyOfferingButton = js_Boot.__cast(this.getChildByName("BuyOfferingButton") , com_isartdigital_builder_ui_buttons_BuyOfferingButton);
	}
	,subscribeButtons: function() {
		this.cancelButton.click = this.cancelButton.tap = $bind(this,this.onCancelButton);
		this.buyOfferingButton.click = this.buyOfferingButton.tap = $bind(this,this.onBuySoft);
	}
	,onBuySoft: function(event) {
		com_isartdigital_builder_Main.getInstance().emit("UPGRADE_BUTTON");
	}
	,onCancelButton: function(event) {
		com_isartdigital_builder_ui_UIManager.getInstance().emit("CLOSE_POPIN_REQUEST");
	}
	,setTimeInDescription: function(timeLeft) {
		this.description.text = com_isartdigital_utils_Localization.getText(com_isartdigital_builder_ui_popin_UpgradeConfirm.descriptionLabel) + " " + timeLeft + " " + com_isartdigital_utils_Localization.getText(com_isartdigital_builder_ui_popin_UpgradeConfirm.minuteLabel);
	}
	,destroy: function() {
		this.cancelButton.destroy();
		this.buyOfferingButton.destroy();
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_UpgradeConfirm
});
var com_isartdigital_builder_ui_popin_UpgradeReward = function() {
	com_isartdigital_utils_ui_Popin.call(this);
	this.build();
	this.buttonComfirm = js_Boot.__cast(this.getChildByName("RewardButton") , com_isartdigital_builder_ui_buttons_RewardButton);
	this.buttonComfirm.click = this.tap = $bind(this,this.onComfirmClick);
};
$hxClasses["com.isartdigital.builder.ui.popin.UpgradeReward"] = com_isartdigital_builder_ui_popin_UpgradeReward;
com_isartdigital_builder_ui_popin_UpgradeReward.__name__ = ["com","isartdigital","builder","ui","popin","UpgradeReward"];
com_isartdigital_builder_ui_popin_UpgradeReward.__super__ = com_isartdigital_utils_ui_Popin;
com_isartdigital_builder_ui_popin_UpgradeReward.prototype = $extend(com_isartdigital_utils_ui_Popin.prototype,{
	juicyOpen: function() {
		this.alpha = 0;
		motion_Actuate.tween(this,0.5,{ alpha : 1}).ease(motion_easing_Cubic.get_easeOut());
	}
	,onComfirmClick: function(pEvent) {
		com_isartdigital_builder_ui_UIManager.getInstance().closeCurrentPopin();
	}
	,destroy: function() {
		this.buttonComfirm.destroy();
		com_isartdigital_utils_ui_Popin.prototype.destroy.call(this);
	}
	,__class__: com_isartdigital_builder_ui_popin_UpgradeReward
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
	this.positionables.unshift({ item : this.btnQuit, align : Math.random() < 0.5?"topRight":"topLeft", fit : "fitScreen", offsetX : 80, offsetY : 80});
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
		source.crossOrigin = "anonymous";
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
	var loader = new PIXI.loaders.Loader();
	loader.add(com_isartdigital_services_FacebookPicture.picturePath);
	loader.once("complete",com_isartdigital_services_FacebookPicture.onPictureLoaded);
	loader.load();
};
com_isartdigital_services_FacebookPicture.onPictureLoaded = function() {
	com_isartdigital_services_FacebookPicture.fillPictureWithTexture();
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
	com_isartdigital_services_FacebookPicture.picture.height = 190;
	com_isartdigital_services_FacebookPicture.picture.width = 190;
	hud.getLevelComponent().placePicture(com_isartdigital_services_FacebookPicture.picture);
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
	haxe_Http.call(this,(com_isartdigital_utils_system_DeviceCapabilities.get_isCocoonJS()?"http":"https") + "://fbgame.isartdigital.com/2017_builder/builder0/broadcast/");
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
		haxe_Log.trace(pError,{ fileName : "HttpService.hx", lineNumber : 38, className : "com.isartdigital.services.HttpService", methodName : "_onError"});
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
com_isartdigital_services_Users.updateUserData = function(userData) {
	com_isartdigital_services_Users.updateExperience(userData.experience);
	com_isartdigital_services_Users.updateGold(userData.gold);
	com_isartdigital_services_Users.updateOffering(userData.offering);
	com_isartdigital_services_Users.updateSpice(userData.spice);
};
com_isartdigital_services_Users.updateExperience = function(pExperience) {
	com_isartdigital_services_Users.infos.experience = pExperience;
	com_isartdigital_builder_game_manager_ExperienceManager.getInstance().emit(com_isartdigital_builder_game_manager_ExperienceManager.UPDATE_REQUEST_EXPERIENCE_VALUE);
};
com_isartdigital_services_Users.updateGold = function(pGold) {
	com_isartdigital_services_Users.infos.resources.gold = pGold;
	com_isartdigital_builder_game_manager_RessourceManager.getInstance().emit("UPDATE_REQUEST_GOLD_VALUE");
};
com_isartdigital_services_Users.updateOffering = function(pOffering) {
	com_isartdigital_services_Users.infos.resources.offering = pOffering;
	com_isartdigital_builder_game_manager_RessourceManager.getInstance().emit("UPDATE_REQUEST_OFFERING_VALUE");
};
com_isartdigital_services_Users.updateSpice = function(pSpice) {
	com_isartdigital_services_Users.infos.resources.spice = pSpice;
	com_isartdigital_builder_game_manager_RessourceManager.getInstance().emit("UPDATE_REQUEST_SPICE_VALUE");
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
com_isartdigital_services_Users.getMainBuildingLevel = function() {
	return com_isartdigital_builder_game_sprites_buildings_BuildingUtils.getBuildingsModel("city_hall")[0].lvl + 1;
};
com_isartdigital_services_Users.getTotalIlluminatedLanterns = function() {
	return com_isartdigital_services_Users.infos.lanterns.length;
};
var com_isartdigital_services_Wallet = function() { };
$hxClasses["com.isartdigital.services.Wallet"] = com_isartdigital_services_Wallet;
com_isartdigital_services_Wallet.__name__ = ["com","isartdigital","services","Wallet"];
com_isartdigital_services_Wallet.getMoney = function(pMail,pCallback) {
	com_isartdigital_services_Wallet.initService(pMail,pCallback).request(true);
};
com_isartdigital_services_Wallet.buy = function(pMail,pAmount,pCallback) {
	var lRequest = com_isartdigital_services_Wallet.initService(pMail,pCallback);
	if(pAmount <= 0) {
		lRequest.onData(JSON.stringify({ error : "zero or negative value forbidden", code : 21}));
		return;
	}
	lRequest.addParameter("buy",pAmount == null?"null":"" + pAmount);
	lRequest.request(true);
};
com_isartdigital_services_Wallet.initService = function(pMail,pCallback) {
	var lRequest = new com_isartdigital_services_HttpService(pCallback);
	lRequest.addParameter("wallet",pMail);
	return lRequest;
};
var com_isartdigital_utils_Config = function() { };
$hxClasses["com.isartdigital.utils.Config"] = com_isartdigital_utils_Config;
com_isartdigital_utils_Config.__name__ = ["com","isartdigital","utils","Config"];
com_isartdigital_utils_Config.__properties__ = {get_data:"get_data",get_fontsPath:"get_fontsPath",get_soundsPath:"get_soundsPath",get_assetsPath:"get_assetsPath",get_txtsPath:"get_txtsPath",get_langPath:"get_langPath",get_qrcode:"get_qrcode",get_fps:"get_fps",get_debug:"get_debug",get_languages:"get_languages",get_language:"get_language",get_version:"get_version",get_gameName:"get_gameName"}
com_isartdigital_utils_Config.init = function(pConfig) {
	var _g = 0;
	var _g1 = Reflect.fields(pConfig);
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		Reflect.setField(com_isartdigital_utils_Config._data,i,Reflect.field(pConfig,i));
	}
	if(com_isartdigital_utils_Config._data.version == null) com_isartdigital_utils_Config._data.version = "0.0.0";
	if(com_isartdigital_utils_Config._data.gameName == null) com_isartdigital_utils_Config._data.gameName = "";
	var lStorage = js_Browser.getLocalStorage();
	haxe_Log.trace(lStorage,{ fileName : "Config.hx", lineNumber : 107, className : "com.isartdigital.utils.Config", methodName : "init"});
	var lVersion;
	if(lStorage.getItem(com_isartdigital_utils_Config.get_gameName()) == null) lVersion = null; else lVersion = JSON.parse(lStorage.getItem(com_isartdigital_utils_Config.get_gameName())).version;
	if(lVersion != null) com_isartdigital_utils_Config.cache = com_isartdigital_utils_Config.get_version() == lVersion;
	lStorage.setItem(com_isartdigital_utils_Config.get_gameName(),JSON.stringify({ version : com_isartdigital_utils_Config.get_version()}));
	haxe_Log.trace(com_isartdigital_utils_Config.get_version(),{ fileName : "Config.hx", lineNumber : 113, className : "com.isartdigital.utils.Config", methodName : "init", customParams : [com_isartdigital_utils_Config.cache]});
	if(com_isartdigital_utils_Config._data.language == null) {
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
};
com_isartdigital_utils_Config.url = function(pPath) {
	return pPath + "?" + com_isartdigital_utils_Config.get_version();
};
com_isartdigital_utils_Config.get_data = function() {
	return com_isartdigital_utils_Config._data;
};
com_isartdigital_utils_Config.get_gameName = function() {
	return com_isartdigital_utils_Config._data.gameName;
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
com_isartdigital_utils_Debug.addDebugPointAt = function(position,color) {
	if(color == null) color = 16711680;
	var debugPoint = new PIXI.Graphics();
	debugPoint.beginFill(color);
	debugPoint.drawCircle(0,0,5);
	debugPoint.position.set(position.x,position.y);
	com_isartdigital_utils_game_GameStage.getInstance().getGameContainer().addChild(debugPoint);
	com_isartdigital_utils_Debug.debugPointsList.push(debugPoint);
};
com_isartdigital_utils_Debug.addDebugTextAt = function(position,text,color) {
	if(color == null) color = 16715792;
	var text1 = new PIXI.Text(text,{ font : "24px Arial", fill : color, align : "center"});
	text1.position = new PIXI.Point(position.x,position.y);
	com_isartdigital_utils_game_GameStage.getInstance().getGameContainer().addChild(text1);
};
com_isartdigital_utils_Debug.removeAllDebugPoint = function() {
	while(com_isartdigital_utils_Debug.debugPointsList.length != 0) {
		com_isartdigital_utils_Debug.debugPointsList[0].parent.removeChild(com_isartdigital_utils_Debug.debugPointsList[0]);
		com_isartdigital_utils_Debug.debugPointsList[0].destroy();
		com_isartdigital_utils_Debug.debugPointsList.splice(0,1);
	}
};
com_isartdigital_utils_Debug.prototype = {
	init: function() {
		if(com_isartdigital_utils_Config.get_fps()) this.fps = new Perf("TL");
		if(com_isartdigital_utils_Config.get_qrcode() && !com_isartdigital_utils_system_DeviceCapabilities.get_isCocoonJS()) {
			var lQr = new Image();
			lQr.style.position = "absolute";
			lQr.style.right = "0px";
			lQr.style.bottom = "0px";
			var lSize = Std["int"](0.35 * com_isartdigital_utils_system_DeviceCapabilities.getSizeFactor());
			lQr.src = "https://chart.googleapis.com/chart?chs=" + lSize + "x" + lSize + "&cht=qr&chl=" + window.location.href + "&choe=UTF-8";
			window.document.body.appendChild(lQr);
		}
	}
	,destroy: function() {
	}
	,__class__: com_isartdigital_utils_Debug
};
var com_isartdigital_utils_Localization = function() { };
$hxClasses["com.isartdigital.utils.Localization"] = com_isartdigital_utils_Localization;
com_isartdigital_utils_Localization.__name__ = ["com","isartdigital","utils","Localization"];
com_isartdigital_utils_Localization.setDataLocalization = function() {
	com_isartdigital_utils_Localization.dictionary = com_isartdigital_utils_loader_GameLoader.getContent("json/" + com_isartdigital_utils_Config.get_language() + ".json");
};
com_isartdigital_utils_Localization.getText = function(pLabel) {
	var text = Reflect.field(com_isartdigital_utils_Localization.dictionary,pLabel);
	if(text == null) return pLabel;
	return text;
};
var com_isartdigital_utils_MathUtils = function() { };
$hxClasses["com.isartdigital.utils.MathUtils"] = com_isartdigital_utils_MathUtils;
com_isartdigital_utils_MathUtils.__name__ = ["com","isartdigital","utils","MathUtils"];
com_isartdigital_utils_MathUtils.getSign = function(number) {
	if(number == 0) return 0;
	return number / Math.abs(number);
};
com_isartdigital_utils_MathUtils.getDistance = function(pPointA,pPointB) {
	return Math.sqrt(Math.pow(pPointA.x - pPointB.x,2) + Math.pow(pPointA.y - pPointB.y,2));
};
com_isartdigital_utils_MathUtils.roundToStep = function(number,step) {
	return Math.ceil(number / step) * step;
};
var com_isartdigital_utils_PointUtils = function() { };
$hxClasses["com.isartdigital.utils.PointUtils"] = com_isartdigital_utils_PointUtils;
com_isartdigital_utils_PointUtils.__name__ = ["com","isartdigital","utils","PointUtils"];
com_isartdigital_utils_PointUtils.isEqual = function(pointA,pointB) {
	return pointA.x == pointB.x && pointA.y == pointB.y;
};
var com_isartdigital_utils_Time = function() { };
$hxClasses["com.isartdigital.utils.Time"] = com_isartdigital_utils_Time;
com_isartdigital_utils_Time.__name__ = ["com","isartdigital","utils","Time"];
var com_isartdigital_utils_events_Event = function() {
};
$hxClasses["com.isartdigital.utils.events.Event"] = com_isartdigital_utils_events_Event;
com_isartdigital_utils_events_Event.__name__ = ["com","isartdigital","utils","events","Event"];
com_isartdigital_utils_events_Event.getClientXIn = function(event) {
	if(event.changedTouches != null) return event.changedTouches[0].clientX;
	return event.clientX;
};
com_isartdigital_utils_events_Event.getClientYIn = function(event) {
	if(event.changedTouches != null) return event.changedTouches[0].clientY;
	return event.clientY;
};
com_isartdigital_utils_events_Event.prototype = {
	__class__: com_isartdigital_utils_events_Event
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
	if(pPermissions != null) com_isartdigital_utils_facebook_Facebook.permissions = pPermissions;
	com_isartdigital_utils_facebook_Facebook.init();
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
com_isartdigital_utils_facebook_Facebook.shareOnWall = function(shareParameters) {
	com_isartdigital_utils_facebook_Facebook.api("/me/feed","post",shareParameters);
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
	this.cameraPositionWhenScrollingStarted = new PIXI.Point();
	this.startScrollPosition = new PIXI.Point(0,0);
	this.isScrolling = false;
	this.hasMoved = false;
	this.cameraFocus = new com_isartdigital_utils_game_GameObject();
	var lGameContainer = com_isartdigital_utils_game_GameStage.getInstance().getGameContainer();
	window.addEventListener("mousedown",$bind(this,this.startScroll));
	window.addEventListener("mouseup",$bind(this,this.stopScroll));
	window.addEventListener("mousemove",$bind(this,this.moveScroll));
	window.addEventListener("touchstart",$bind(this,this.startScroll));
	window.addEventListener("touchend",$bind(this,this.stopScroll));
	window.addEventListener("touchmove",$bind(this,this.moveScroll));
};
$hxClasses["com.isartdigital.utils.game.Camera"] = com_isartdigital_utils_game_Camera;
com_isartdigital_utils_game_Camera.__name__ = ["com","isartdigital","utils","game","Camera"];
com_isartdigital_utils_game_Camera.getInstance = function() {
	if(com_isartdigital_utils_game_Camera.instance == null) com_isartdigital_utils_game_Camera.instance = new com_isartdigital_utils_game_Camera();
	return com_isartdigital_utils_game_Camera.instance;
};
com_isartdigital_utils_game_Camera.activateCamera = function() {
	com_isartdigital_utils_game_Camera.cameraActivated = true;
};
com_isartdigital_utils_game_Camera.desactivateCamera = function() {
	com_isartdigital_utils_game_Camera.cameraActivated = false;
};
com_isartdigital_utils_game_Camera.prototype = {
	init: function() {
		com_isartdigital_utils_game_GameStage.getInstance().getGameContainer().addChild(this.cameraFocus);
		this.setTarget(com_isartdigital_utils_game_GameStage.getInstance().getGameContainer());
		this.setFocus(this.cameraFocus);
		this.cameraFocus.x = 0;
		this.cameraFocus.y = _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileWidth) / _$UInt_UInt_$Impl_$.toFloat(2) * (_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.mapSize) / _$UInt_UInt_$Impl_$.toFloat(2)) - 200;
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
	,startScroll: function(event) {
		if(com_isartdigital_utils_game_Camera.cameraActivated) {
			var lCameraFocus = this.cameraFocus;
			this.isScrolling = true;
			this.startScrollPosition = new PIXI.Point(this.cameraFocus.x + com_isartdigital_utils_events_Event.getClientXIn(event) * 2,this.cameraFocus.y + com_isartdigital_utils_events_Event.getClientYIn(event) * 2);
			this.cameraPositionWhenScrollingStarted = new PIXI.Point(this.cameraFocus.x,this.cameraFocus.y);
		}
	}
	,stopScroll: function() {
		var _g = this;
		this.isScrolling = false;
		haxe_Timer.delay(function() {
			_g.hasMoved = false;
		},10);
	}
	,moveScroll: function(event) {
		var cameraFocusWithScrollingOffset = new PIXI.Point(this.startScrollPosition.x - com_isartdigital_utils_events_Event.getClientXIn(event) * 2,this.startScrollPosition.y - com_isartdigital_utils_events_Event.getClientYIn(event) * 2);
		var cameraOffsetSinceScrollingStarted = Math.abs(this.cameraPositionWhenScrollingStarted.x - cameraFocusWithScrollingOffset.x) + Math.abs(this.cameraPositionWhenScrollingStarted.y - cameraFocusWithScrollingOffset.y);
		if(!js_Boot.__instanceof(event.target,HTMLCanvasElement)) return;
		if(this.isScrolling) {
			this.cameraFocus.x = cameraFocusWithScrollingOffset.x;
			this.cameraFocus.y = cameraFocusWithScrollingOffset.y;
			if(cameraOffsetSinceScrollingStarted > 20) this.hasMoved = true;
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
	this.ftueContainer = new PIXI.Container();
	this.addChild(this.ftueContainer);
	this.backgroundContainer = new PIXI.Container();
	this.gameContainer.addChild(this.backgroundContainer);
	this.tilesContainer = new PIXI.Container();
	this.gameContainer.addChild(this.tilesContainer);
	this.boatTrailsContainer = new PIXI.Container();
	this.gameContainer.addChild(this.boatTrailsContainer);
	this.buildingsContainer = new PIXI.Container();
	this.gameContainer.addChild(this.buildingsContainer);
	this.petalsContainer = new PIXI.Container();
	this.gameContainer.addChild(this.petalsContainer);
	this.fireworksContainer = new PIXI.Container();
	this.gameContainer.addChild(this.fireworksContainer);
	this.arrowsContainer = new PIXI.Container();
	this.gameContainer.addChild(this.arrowsContainer);
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
	,getFtueContainer: function() {
		return this.ftueContainer;
	}
	,getTilesContainer: function() {
		return this.tilesContainer;
	}
	,getBoatTrailsContainer: function() {
		return this.boatTrailsContainer;
	}
	,getBuildingsContainer: function() {
		return this.buildingsContainer;
	}
	,getBackgroundContainer: function() {
		return this.backgroundContainer;
	}
	,getPetalsContainer: function() {
		return this.petalsContainer;
	}
	,getFireworksContainer: function() {
		return this.fireworksContainer;
	}
	,getArrowContainer: function() {
		return this.arrowsContainer;
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
	com_isartdigital_utils_game_iso_IsoManager.createDepthMap();
};
com_isartdigital_utils_game_iso_IsoManager.modelToIsoView = function(pPoint) {
	return new PIXI.Point((pPoint.x - pPoint.y) * com_isartdigital_utils_game_iso_IsoManager.halfWidth,(pPoint.x + pPoint.y) * com_isartdigital_utils_game_iso_IsoManager.halfHeight);
};
com_isartdigital_utils_game_iso_IsoManager.isoToModelView = function(pPoint,useCeil) {
	if(useCeil == null) useCeil = true;
	var isoView = new PIXI.Point((pPoint.y / com_isartdigital_utils_game_iso_IsoManager.halfHeight + pPoint.x / com_isartdigital_utils_game_iso_IsoManager.halfWidth) / 2,(pPoint.y / com_isartdigital_utils_game_iso_IsoManager.halfHeight - pPoint.x / com_isartdigital_utils_game_iso_IsoManager.halfWidth) / 2);
	if(useCeil) return new PIXI.Point(Math.ceil(isoView.x),Math.ceil(isoView.y)); else return isoView;
};
com_isartdigital_utils_game_iso_IsoManager.modelToHudView = function(position) {
	var screenRect = com_isartdigital_builder_game_GameManager.getInstance().getScreenRect();
	var hudContainerOffset = com_isartdigital_utils_system_DeviceCapabilities.getScreenRect(com_isartdigital_utils_game_GameStage.getInstance().getHudContainer());
	var positionInPx = com_isartdigital_utils_game_iso_IsoManager.modelToIsoView(position);
	var positionInHud = new PIXI.Point(positionInPx.x - screenRect.x + hudContainerOffset.x,positionInPx.y - screenRect.y + hudContainerOffset.y);
	return positionInHud;
};
com_isartdigital_utils_game_iso_IsoManager.getMousePositionIndex = function() {
	var lGameManager = com_isartdigital_builder_game_GameManager.getInstance();
	var mouseCoord = com_isartdigital_utils_game_iso_IsoManager.isoToModelView(lGameManager.mousePosition);
	return mouseCoord;
};
com_isartdigital_utils_game_iso_IsoManager.sortAll = function() {
	com_isartdigital_utils_game_GameStage.getInstance().getBuildingsContainer().children.sort(com_isartdigital_utils_game_iso_IsoManager.sortByDepth);
};
com_isartdigital_utils_game_iso_IsoManager.createDepthMap = function() {
	var start = new PIXI.Point((function($this) {
		var $r;
		var _g = _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.mapSize) / _$UInt_UInt_$Impl_$.toFloat(2);
		var _g1 = com_isartdigital_utils_Config.tileWidth;
		$r = _$UInt_UInt_$Impl_$.toFloat(_g1) * _g;
		return $r;
	}(this)) * -1,0);
	var end = new PIXI.Point((function($this) {
		var $r;
		var _g2 = _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.mapSize) / _$UInt_UInt_$Impl_$.toFloat(2);
		var _g3 = com_isartdigital_utils_Config.tileWidth;
		$r = _$UInt_UInt_$Impl_$.toFloat(_g3) * _g2;
		return $r;
	}(this)),_$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.mapSize * com_isartdigital_utils_Config.tileHeight));
	var xCursor = start.x;
	var yCursor = start.y + _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight) / _$UInt_UInt_$Impl_$.toFloat(2);
	var cursorWithOffset;
	var index = 0;
	while(xCursor < end.x || yCursor < end.y) {
		xCursor = _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight) + xCursor;
		if(xCursor > end.x) {
			yCursor = _$UInt_UInt_$Impl_$.toFloat(com_isartdigital_utils_Config.tileHeight) + yCursor;
			xCursor = start.x;
		}
		index++;
		var indexModel = com_isartdigital_utils_game_iso_IsoManager.isoToModelView(new PIXI.Point(xCursor,yCursor));
		if(!com_isartdigital_utils_game_iso_IsoManager.depthMap.h.hasOwnProperty(indexModel.x | 0)) {
			var v = new haxe_ds_IntMap();
			com_isartdigital_utils_game_iso_IsoManager.depthMap.h[indexModel.x | 0] = v;
			v;
		}
		var this1 = com_isartdigital_utils_game_iso_IsoManager.depthMap.h[indexModel.x | 0];
		this1.set(indexModel.y | 0,index);
		index;
	}
};
com_isartdigital_utils_game_iso_IsoManager.sortByDepth = function(a,b) {
	var aInModel = com_isartdigital_utils_game_iso_IsoManager.isoToModelView(new PIXI.Point(a.x,a.y),true);
	var bInModel = com_isartdigital_utils_game_iso_IsoManager.isoToModelView(new PIXI.Point(b.x,b.y),true);
	aInModel.x -= a.modelWidth;
	aInModel.y -= a.modelHeight;
	bInModel.x -= b.modelWidth;
	bInModel.y -= b.modelHeight;
	var aIndex;
	var this1 = com_isartdigital_utils_game_iso_IsoManager.depthMap.h[aInModel.x | 0];
	aIndex = this1.get(aInModel.y | 0);
	var bIndex;
	var this2 = com_isartdigital_utils_game_iso_IsoManager.depthMap.h[bInModel.x | 0];
	bIndex = this2.get(bInModel.y | 0);
	return aIndex - bIndex;
};
var com_isartdigital_utils_lib_pathfinder_Coordinate = function(p_x,p_y) {
	if(p_y == null) p_y = 0;
	if(p_x == null) p_x = 0;
	this.x = p_x;
	this.y = p_y;
};
$hxClasses["com.isartdigital.utils.lib.pathfinder.Coordinate"] = com_isartdigital_utils_lib_pathfinder_Coordinate;
com_isartdigital_utils_lib_pathfinder_Coordinate.__name__ = ["com","isartdigital","utils","lib","pathfinder","Coordinate"];
com_isartdigital_utils_lib_pathfinder_Coordinate.prototype = {
	isEqualTo: function(p_coordinate) {
		return this.x == p_coordinate.x && this.y == p_coordinate.y;
	}
	,toString: function() {
		return "(" + this.x + "," + this.y + ")";
	}
	,clone: function() {
		return new com_isartdigital_utils_lib_pathfinder_Coordinate(this.x,this.y);
	}
	,__class__: com_isartdigital_utils_lib_pathfinder_Coordinate
};
var com_isartdigital_utils_lib_pathfinder_EHeuristic = { __ename__ : true, __constructs__ : ["DIAGONAL","PRODUCT","EUCLIDIAN","MANHATTAN"] };
com_isartdigital_utils_lib_pathfinder_EHeuristic.DIAGONAL = ["DIAGONAL",0];
com_isartdigital_utils_lib_pathfinder_EHeuristic.DIAGONAL.toString = $estr;
com_isartdigital_utils_lib_pathfinder_EHeuristic.DIAGONAL.__enum__ = com_isartdigital_utils_lib_pathfinder_EHeuristic;
com_isartdigital_utils_lib_pathfinder_EHeuristic.PRODUCT = ["PRODUCT",1];
com_isartdigital_utils_lib_pathfinder_EHeuristic.PRODUCT.toString = $estr;
com_isartdigital_utils_lib_pathfinder_EHeuristic.PRODUCT.__enum__ = com_isartdigital_utils_lib_pathfinder_EHeuristic;
com_isartdigital_utils_lib_pathfinder_EHeuristic.EUCLIDIAN = ["EUCLIDIAN",2];
com_isartdigital_utils_lib_pathfinder_EHeuristic.EUCLIDIAN.toString = $estr;
com_isartdigital_utils_lib_pathfinder_EHeuristic.EUCLIDIAN.__enum__ = com_isartdigital_utils_lib_pathfinder_EHeuristic;
com_isartdigital_utils_lib_pathfinder_EHeuristic.MANHATTAN = ["MANHATTAN",3];
com_isartdigital_utils_lib_pathfinder_EHeuristic.MANHATTAN.toString = $estr;
com_isartdigital_utils_lib_pathfinder_EHeuristic.MANHATTAN.__enum__ = com_isartdigital_utils_lib_pathfinder_EHeuristic;
var com_isartdigital_utils_lib_pathfinder_Node = function(p_x,p_y,p_isWalkable) {
	if(p_isWalkable == null) p_isWalkable = true;
	this.isWalkable = this.getWalkableState(p_x,p_y);
	com_isartdigital_utils_lib_pathfinder_Coordinate.call(this,p_x,p_y);
};
$hxClasses["com.isartdigital.utils.lib.pathfinder.Node"] = com_isartdigital_utils_lib_pathfinder_Node;
com_isartdigital_utils_lib_pathfinder_Node.__name__ = ["com","isartdigital","utils","lib","pathfinder","Node"];
com_isartdigital_utils_lib_pathfinder_Node.__super__ = com_isartdigital_utils_lib_pathfinder_Coordinate;
com_isartdigital_utils_lib_pathfinder_Node.prototype = $extend(com_isartdigital_utils_lib_pathfinder_Coordinate.prototype,{
	getWalkableState: function(p_x,p_y) {
		if(!com_isartdigital_builder_game_GameManager.pathfindingWithObstacle) return false;
		return com_isartdigital_builder_game_map_GMap.getElementByTypeAt(new PIXI.Point(p_x,p_y),"tile").isBuildable;
	}
	,toString: function() {
		var l_result;
		l_result = "[Node(" + this.x + "," + this.y + ")";
		if(this.parent != null) l_result += ", parent=(" + this.parent.x + "," + this.parent.y + ")";
		l_result += ", " + (this.isWalkable?"W":"X");
		l_result += ", f=" + this.f;
		l_result += ", g=" + this.g;
		l_result += "]";
		return l_result;
	}
	,__class__: com_isartdigital_utils_lib_pathfinder_Node
});
var com_isartdigital_utils_lib_pathfinder_Pathfinder = function(p_map,p_timeOutDuration) {
	if(p_timeOutDuration == null) p_timeOutDuration = 100000;
	this.configure(p_map,p_timeOutDuration);
};
$hxClasses["com.isartdigital.utils.lib.pathfinder.Pathfinder"] = com_isartdigital_utils_lib_pathfinder_Pathfinder;
com_isartdigital_utils_lib_pathfinder_Pathfinder.__name__ = ["com","isartdigital","utils","lib","pathfinder","Pathfinder"];
com_isartdigital_utils_lib_pathfinder_Pathfinder.prototype = {
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
				l_line[l_iy] = new com_isartdigital_utils_lib_pathfinder_Node(l_ix,l_iy,this._map.isWalkable(l_ix,l_iy));
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
		if(p_heuristic == null) p_heuristic = com_isartdigital_utils_lib_pathfinder_EHeuristic.PRODUCT;
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
	,__class__: com_isartdigital_utils_lib_pathfinder_Pathfinder
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
		this.add(com_isartdigital_utils_Config.url(lUrl));
	}
	,addAssetFile: function(pUrl) {
		var lUrl = com_isartdigital_utils_Config.get_assetsPath() + pUrl;
		this.add(com_isartdigital_utils_Config.url(lUrl));
	}
	,addSoundFile: function(pUrl) {
		var lUrl = com_isartdigital_utils_Config.get_soundsPath() + pUrl;
		this.soundsList.push(lUrl);
		this.add(com_isartdigital_utils_Config.url(lUrl));
	}
	,addFontFile: function(pUrl) {
		var lUrl = com_isartdigital_utils_Config.get_fontsPath() + pUrl;
		this.add(com_isartdigital_utils_Config.url(lUrl));
	}
	,unloadAsset: function(name) {
		Reflect.getProperty(PIXI.utils.TextureCache,com_isartdigital_utils_Config.get_assetsPath() + com_isartdigital_utils_system_DeviceCapabilities.textureType + "/" + name).destroy(true);
	}
	,parseData: function(pResource,pNext) {
		haxe_Log.trace(pResource.url + " loaded",{ fileName : "GameLoader.hx", lineNumber : 97, className : "com.isartdigital.utils.loader.GameLoader", methodName : "parseData"});
		var lUrl = pResource.url.split("?")[0];
		if(lUrl.indexOf(".css") > 0 && !com_isartdigital_utils_system_DeviceCapabilities.get_isCocoonJS()) {
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
			com_isartdigital_utils_loader_GameLoader.txtLoaded.set(lUrl,v);
			v;
			if(HxOverrides.substr(lUrl,-12,12) == "library.json" && Object.prototype.hasOwnProperty.call(pResource.data,"md5") && Object.prototype.hasOwnProperty.call(pResource.data,"movies") && Object.prototype.hasOwnProperty.call(pResource.data,"textureGroups") && Object.prototype.hasOwnProperty.call(pResource.data,"frameRate")) {
				(pixi_loaders_FlumpParser.flumpParser(1,com_isartdigital_utils_Config.cache))(pResource,pNext);
				return;
			} else if(this.soundsList.length > 0) {
				var lData1;
				var _g11 = 0;
				var _g2 = this.soundsList.length;
				while(_g11 < _g2) {
					var i1 = _g11++;
					if(lUrl == this.soundsList[i1]) {
						this.soundsList.splice(i1,1);
						lData1 = pResource.data;
						if(com_isartdigital_utils_system_DeviceCapabilities.get_isCocoonJS()) {
							if(HxOverrides.indexOf(lData1.extensions,"ogg",0) == -1) throw new js__$Boot_HaxeError("CocoonJs needs ogg sounds. No sound will be played in the application."); else lData1.extensions = ["ogg"];
						}
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
			lUrl = com_isartdigital_utils_Config.url(com_isartdigital_utils_Config.get_soundsPath() + lID + "." + pCodec);
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
com_isartdigital_utils_system_DeviceCapabilities.__properties__ = {get_isCocoonJS:"get_isCocoonJS",get_system:"get_system",get_width:"get_width",get_height:"get_height"}
com_isartdigital_utils_system_DeviceCapabilities.get_height = function() {
	return window.innerHeight;
};
com_isartdigital_utils_system_DeviceCapabilities.get_width = function() {
	return window.innerWidth;
};
com_isartdigital_utils_system_DeviceCapabilities.get_system = function() {
	if(new EReg("IEMobile","i").match(window.navigator.userAgent)) return "IEMobile"; else if(new EReg("iPhone|iPad|iPod","i").match(window.navigator.userAgent)) return "iOS"; else if(new EReg("BlackBerry","i").match(window.navigator.userAgent)) return "BlackBerry"; else if(new EReg("PlayBook","i").match(window.navigator.userAgent)) return "BlackBerry PlayBook"; else if(new EReg("Android","i").match(window.navigator.userAgent)) return "Android"; else return "Desktop";
};
com_isartdigital_utils_system_DeviceCapabilities.get_isCocoonJS = function() {
	return window.navigator.isCocoonJS;
};
com_isartdigital_utils_system_DeviceCapabilities.displayFullScreenButton = function() {
	if(com_isartdigital_utils_system_DeviceCapabilities.get_isCocoonJS()) return;
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
	if(!com_isartdigital_utils_system_DeviceCapabilities.get_isCocoonJS()) window.document.write("<meta name=\"viewport\" content=\"initial-scale=" + Math.round(100 / com_isartdigital_utils_system_DeviceCapabilities.screenRatio) / 100 + ", user-scalable=no, minimal-ui\">");
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
com_isartdigital_utils_ui_UIBuilder.addDescriptions = function(pFile,pPackage) {
	if(com_isartdigital_utils_ui_UIBuilder.description == null) com_isartdigital_utils_ui_UIBuilder.description = new haxe_ds_StringMap();
	com_isartdigital_utils_ui_UIBuilder.description.set(pFile,pPackage);
};
com_isartdigital_utils_ui_UIBuilder.setPackages = function(pPackage,pPackageCurrency,pPackgageItem) {
	com_isartdigital_utils_ui_UIBuilder.btnPackage = pPackage;
	com_isartdigital_utils_ui_UIBuilder.hudPackage = pPackageCurrency;
	com_isartdigital_utils_ui_UIBuilder.itemPackage = pPackgageItem;
};
com_isartdigital_utils_ui_UIBuilder.build = function(pId) {
	var lData;
	var lObj;
	var lItem;
	var lUIPos = [];
	var $it0 = com_isartdigital_utils_ui_UIBuilder.description.keys();
	while( $it0.hasNext() ) {
		var lDescription = $it0.next();
		lData = com_isartdigital_utils_loader_GameLoader.getContent(lDescription);
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
					if(Object.prototype.hasOwnProperty.call(lItem1.keyframes[0],"skew")) lObj.skew.set(lItem1.keyframes[0].skew[0],lItem1.keyframes[0].skew[1]);
					var lPosition;
					var key = lItem1.name.split("_")[0];
					lPosition = com_isartdigital_utils_ui_UIBuilder.uiPos.get(key);
					var lFit;
					var key1 = lItem1.name.split("_")[1];
					lFit = com_isartdigital_utils_ui_UIBuilder.uiPos.get(key1);
					lUIPos.push(com_isartdigital_utils_ui_UIBuilder.getUIPositionable(lObj,lPosition,lFit));
				}
			}
		}
	}
	return lUIPos;
};
com_isartdigital_utils_ui_UIBuilder.getTextFromJson = function(pName) {
	var uiStyle = com_isartdigital_utils_ui_UIBuilder.getTextStyle(pName);
	var localizedText = com_isartdigital_utils_Localization.getText(uiStyle.text);
	var bold;
	if(uiStyle.bold) bold = "bold "; else bold = "";
	var italic;
	if(uiStyle.italic) italic = "italic "; else italic = "";
	var style = { };
	style.align = uiStyle.align;
	style.font = bold + italic + uiStyle.size + "px " + uiStyle.font;
	style.fill = "#" + StringTools.hex(uiStyle.color);
	style.wordWrap = true;
	style.wordWrapWidth = uiStyle.width;
	style.strokeThickness = 1;
	style.stroke = "#6B3C17";
	var text = new PIXI.Text(localizedText,style);
	if(text.height <= uiStyle.size * 2 && text.style.align == "center") text.anchor.set(0.5,0);
	return text;
};
com_isartdigital_utils_ui_UIBuilder.getTextStyle = function(pId) {
	var lData;
	var $it0 = com_isartdigital_utils_ui_UIBuilder.description.keys();
	while( $it0.hasNext() ) {
		var lDescription = $it0.next();
		lData = com_isartdigital_utils_loader_GameLoader.getContent("text/texts_" + lDescription);
		if(Object.prototype.hasOwnProperty.call(lData,pId)) return Reflect.field(lData,pId);
	}
	throw new js__$Boot_HaxeError("getTextStyle text definition does not found in any texts ressource");
	return null;
};
com_isartdigital_utils_ui_UIBuilder.getUIPositionable = function(pObj,pPosition,pFit) {
	var lOffset = new PIXI.Point(0,0);
	if(pPosition != "bottom" && pPosition != "bottomLeft" && pPosition != "bottomRight" && pPosition != "fitHeight" && pPosition != "fitScreen" && pPosition != "fitWidth" && pPosition != "left" && pPosition != "right" && pPosition != "top" && pPosition != "topLeft" && pPosition != "topRight") pPosition = ""; else {
		if(pPosition == "top" || pPosition == "topLeft" || pPosition == "topRight" || pPosition == "bottom" || pPosition == "bottomLeft" || pPosition == "bottomRight") lOffset.y = pObj.y;
		if(pPosition == "left" || pPosition == "topLeft" || pPosition == "bottomLeft" || pPosition == "right" || pPosition == "topRight" || pPosition == "bottomRight") lOffset.x = pObj.x;
	}
	if(pFit != "fitHeight" && pFit != "fitScreen" && pFit != "fitWidth") pFit = "";
	if(pPosition == "fitHeight" || pPosition == "fitWidth" || pPosition == "fitScreen") pFit = pPosition;
	return { item : pObj, align : pPosition, fit : pFit, offsetX : lOffset.x, offsetY : lOffset.y, update : true};
};
com_isartdigital_utils_ui_UIBuilder.prototype = {
	__class__: com_isartdigital_utils_ui_UIBuilder
};
var com_isartdigital_utils_ui_UIPosition = function() {
};
$hxClasses["com.isartdigital.utils.ui.UIPosition"] = com_isartdigital_utils_ui_UIPosition;
com_isartdigital_utils_ui_UIPosition.__name__ = ["com","isartdigital","utils","ui","UIPosition"];
com_isartdigital_utils_ui_UIPosition.setPosition = function(pTarget,pPosition,pFit,pOffsetX,pOffsetY) {
	if(pOffsetY == null) pOffsetY = 0;
	if(pOffsetX == null) pOffsetX = 0;
	var lScreen = com_isartdigital_utils_system_DeviceCapabilities.getScreenRect(pTarget.parent);
	var lTopLeft = new PIXI.Point(lScreen.x,lScreen.y);
	var lBottomRight = new PIXI.Point(lScreen.x + lScreen.width,lScreen.y + lScreen.height);
	if(pPosition == "top" || pPosition == "topLeft" || pPosition == "topRight") pTarget.y = lTopLeft.y + pOffsetY;
	if(pPosition == "bottom" || pPosition == "bottomLeft" || pPosition == "bottomRight") pTarget.y = lBottomRight.y - pOffsetY;
	if(pPosition == "left" || pPosition == "topLeft" || pPosition == "bottomLeft") pTarget.x = lTopLeft.x + pOffsetX;
	if(pPosition == "right" || pPosition == "topRight" || pPosition == "bottomRight") pTarget.x = lBottomRight.x - pOffsetX;
	if(pFit == "fitWidth" || pFit == "fitScreen") {
		pTarget.x = lTopLeft.x;
		pTarget.width = lBottomRight.x - lTopLeft.x;
	}
	if(pFit == "fitHeight" || pFit == "fitScreen") {
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
var flump_MoviePlayer = function(symbol,movie,resolution) {
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
	this.resolution = resolution;
	var _g = 0;
	var _g1 = symbol.layers;
	while(_g < _g1.length) {
		var layer = _g1[_g];
		++_g;
		movie.createLayer(layer);
	}
	this.state = this.STATE_LOOPING;
	this.advanceTime(0);
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
		this.advanceTime(0);
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
var flump_library_FlumpLibrary = function(resolution) {
	this.atlases = [];
	this.sprites = new haxe_ds_StringMap();
	this.movies = new haxe_ds_StringMap();
	this.resolution = resolution;
};
$hxClasses["flump.library.FlumpLibrary"] = flump_library_FlumpLibrary;
flump_library_FlumpLibrary.__name__ = ["flump","library","FlumpLibrary"];
flump_library_FlumpLibrary.create = function(flumpData,resolution) {
	var lib = flumpData;
	var spriteSymbols = new haxe_ds_StringMap();
	var movieSymbols = new haxe_ds_StringMap();
	var flumpLibrary = new flump_library_FlumpLibrary(resolution);
	flumpLibrary.sprites = spriteSymbols;
	flumpLibrary.movies = movieSymbols;
	flumpLibrary.framerate = _$UInt_UInt_$Impl_$.toFloat(lib.frameRate);
	flumpLibrary.frameTime = 1000 / flumpLibrary.framerate;
	flumpLibrary.md5 = lib.md5;
	var atlasSpecs = [];
	var textureGroup = null;
	var _g = 0;
	var _g1 = lib.textureGroups;
	while(_g < _g1.length) {
		var tg = _g1[_g];
		++_g;
		if(_$UInt_UInt_$Impl_$.toFloat(tg.scaleFactor) >= resolution && textureGroup == null) textureGroup = tg;
	}
	if(textureGroup == null) textureGroup = lib.textureGroups[lib.textureGroups.length - 1];
	var _g2 = 0;
	var _g11 = textureGroup.atlases;
	while(_g2 < _g11.length) {
		var atlas = _g11[_g2];
		++_g2;
		flumpLibrary.atlases.push(atlas);
		atlasSpecs.push(atlas);
	}
	var _g3 = 0;
	while(_g3 < atlasSpecs.length) {
		var spec = atlasSpecs[_g3];
		++_g3;
		var _g12 = 0;
		var _g21 = spec.textures;
		while(_g12 < _g21.length) {
			var textureSpec = _g21[_g12];
			++_g12;
			var frame = new flump_library_Rectangle(textureSpec.rect[0],textureSpec.rect[1],textureSpec.rect[2],textureSpec.rect[3]);
			var origin = new flump_library_Point(textureSpec.origin[0],textureSpec.origin[1]);
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
	var _g4 = 0;
	var _g13 = lib.movies;
	while(_g4 < _g13.length) {
		var movieSpec = _g13[_g4];
		++_g4;
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
			var _g5 = layerSpec.keyframes;
			while(_g41 < _g5.length) {
				var keyframeSpec = _g5[_g41];
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
					if(keyframeSpec.pivot == null) keyframe1.pivot = new flump_library_Point(0,0); else keyframe1.pivot = new flump_library_Point(keyframeSpec.pivot[0] * resolution,keyframeSpec.pivot[1] * resolution);
					if(keyframeSpec.loc == null) keyframe1.location = new flump_library_Point(0,0); else keyframe1.location = new flump_library_Point(keyframeSpec.loc[0] * resolution,keyframeSpec.loc[1] * resolution);
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
				var _g51 = layer1.keyframes;
				while(_g42 < _g51.length) {
					var keyframe2 = [_g51[_g42]];
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
			var _g52 = layer2.keyframes;
			while(_g43 < _g52.length) {
				var keyframe3 = _g52[_g43];
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
			if(i1 % 5 == 0) output1 += "▽"; else output1 += " ";
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
					output1 += "◙";
					if(keyframe.tweened) output1 += repeat("▸",keyframe.numFrames - 1); else output1 += repeat("◉",keyframe.numFrames - 1);
				} else {
					output1 += "○";
					output1 += repeat("◌",keyframe.numFrames - 1);
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
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
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
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
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
var pixi_display_FlumpFactory = function() { };
$hxClasses["pixi.display.FlumpFactory"] = pixi_display_FlumpFactory;
pixi_display_FlumpFactory.__name__ = ["pixi","display","FlumpFactory"];
pixi_display_FlumpFactory.prototype = {
	__class__: pixi_display_FlumpFactory
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
	this.resolution = this.resource.resolution;
	this.symbol = this.resource.library.movies.get(symbolId);
	this.player = new flump_MoviePlayer(this.symbol,this,this.resolution);
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
	,get_resX: function() {
		return this.x / this.resolution;
	}
	,set_resX: function(value) {
		this.x = value * this.resolution;
		return value;
	}
	,get_resY: function() {
		return this.y / this.resolution;
	}
	,set_resY: function(value) {
		this.y = value * this.resolution;
		return value;
	}
	,get_resScaleX: function() {
		return this.scale.x / this.resolution;
	}
	,set_resScaleX: function(value) {
		this.scale.x = value * this.resolution;
		return value;
	}
	,get_resScaleY: function() {
		return this.scale.y / this.resolution;
	}
	,set_resScaleY: function(value) {
		this.scale.y = value * this.resolution;
		return value;
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
		var v = new PIXI.Container();
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
		layer.pivot.x = keyframe.pivot.x;
		layer.pivot.y = keyframe.pivot.y;
		if(js_Boot.__instanceof(keyframe.symbol,flump_library_SpriteSymbol)) {
			var spriteSymbol = keyframe.symbol;
			layer.pivot.x -= spriteSymbol.origin.x;
			layer.pivot.y -= spriteSymbol.origin.y;
		}
		layer.x = x;
		layer.y = y;
		layer.scale.x = scaleX;
		layer.scale.y = scaleY;
		layer.skew.x = skewX;
		layer.skew.y = skewY;
		if(this.master) {
			layer.x /= this.resolution;
			layer.y /= this.resolution;
			layer.scale.x /= this.resolution;
			layer.scale.y /= this.resolution;
		}
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
	,__properties__: {get_totalFrames:"get_totalFrames",set_independantControl:"set_independantControl",get_independantControl:"get_independantControl",set_independantTimeline:"set_independantTimeline",get_independantTimeline:"get_independantTimeline",get_playing:"get_playing",set_currentFrame:"set_currentFrame",get_currentFrame:"get_currentFrame",set_onComplete:"set_onComplete",set_loop:"set_loop",get_symbolId:"get_symbolId",set_resScaleY:"set_resScaleY",get_resScaleY:"get_resScaleY",set_resScaleX:"set_resScaleX",get_resScaleX:"get_resScaleX",set_resY:"set_resY",get_resY:"get_resY",set_resX:"set_resX",get_resX:"get_resX"}
});
var pixi_display_FlumpResource = function(library,textures,resourceId,resolution) {
	this.library = library;
	this.textures = textures;
	this.resourceId = resourceId;
	this.resolution = resolution;
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
	throw new js__$Boot_HaxeError("Sprite: " + symbolId + " does not exists in any loaded flump resources.");
};
pixi_display_FlumpResource.prototype = {
	createMovie: function(id) {
		var movie;
		if(pixi_display_FlumpResource.flumpFactory != null && pixi_display_FlumpResource.flumpFactory.displayClassExists(id)) movie = Type.createInstance(pixi_display_FlumpResource.flumpFactory.getMovieClass(id),[]); else movie = new pixi_display_FlumpMovie(id,this.resourceId);
		movie.disableAsMaster();
		return movie;
	}
	,createSprite: function(id) {
		if(pixi_display_FlumpResource.flumpFactory != null && pixi_display_FlumpResource.flumpFactory.displayClassExists(id)) return Type.createInstance(pixi_display_FlumpResource.flumpFactory.getSpriteClass(id),[]); else return new pixi_display_FlumpSprite(id,this.resourceId);
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
	this.resolution = resource.resolution;
	var symbol = resource.library.sprites.get(symbolId);
	var texture = resource.textures.get(symbol.texture);
	PIXI.Sprite.call(this,texture);
	this.anchor.x = symbol.origin.x / texture.width;
	this.anchor.y = symbol.origin.y / texture.height;
};
$hxClasses["pixi.display.FlumpSprite"] = pixi_display_FlumpSprite;
pixi_display_FlumpSprite.__name__ = ["pixi","display","FlumpSprite"];
pixi_display_FlumpSprite.__super__ = PIXI.Sprite;
pixi_display_FlumpSprite.prototype = $extend(PIXI.Sprite.prototype,{
	get_resX: function() {
		return this.x / this.resolution;
	}
	,set_resX: function(value) {
		this.x = value * this.resolution;
		return value;
	}
	,get_resY: function() {
		return this.y / this.resolution;
	}
	,set_resY: function(value) {
		this.y = value * this.resolution;
		return value;
	}
	,get_resScaleX: function() {
		return this.scale.x / this.resolution;
	}
	,set_resScaleX: function(value) {
		this.scale.x = value * this.resolution;
		return value;
	}
	,get_resScaleY: function() {
		return this.scale.y / this.resolution;
	}
	,set_resScaleY: function(value) {
		this.scale.y = value * this.resolution;
		return value;
	}
	,__class__: pixi_display_FlumpSprite
	,__properties__: {set_resScaleY:"set_resScaleY",get_resScaleY:"get_resScaleY",set_resScaleX:"set_resScaleX",get_resScaleX:"get_resScaleX",set_resY:"set_resY",get_resY:"get_resY",set_resX:"set_resX",get_resX:"get_resX"}
});
var pixi_loaders_FlumpParser = function() { };
$hxClasses["pixi.loaders.FlumpParser"] = pixi_loaders_FlumpParser;
pixi_loaders_FlumpParser.__name__ = ["pixi","loaders","FlumpParser"];
pixi_loaders_FlumpParser.flumpParser = function(resolution,loadFromCache) {
	if(loadFromCache == null) loadFromCache = true;
	return function(resource,next) {
		if(resource.data == null || resource.isJson == false) return;
		if(!Object.prototype.hasOwnProperty.call(resource.data,"md5") || !Object.prototype.hasOwnProperty.call(resource.data,"movies") || !Object.prototype.hasOwnProperty.call(resource.data,"textureGroups") || !Object.prototype.hasOwnProperty.call(resource.data,"frameRate")) return;
		var lib = flump_library_FlumpLibrary.create(resource.data,resolution);
		var textures = new haxe_ds_StringMap();
		var atlasLoader = new PIXI.loaders.Loader();
		atlasLoader.baseUrl = new EReg("/(.[^/]*)$","i").replace(resource.url,"");
		var _g = 0;
		var _g1 = lib.atlases;
		while(_g < _g1.length) {
			var atlasSpec = [_g1[_g]];
			++_g;
			if(loadFromCache) atlasSpec[0].file += ""; else atlasSpec[0].file += "?" + new Date().getTime();
			atlasLoader.add(atlasSpec[0].file,null,(function(atlasSpec) {
				return function(atlasResource) {
					var atlasTexture = new PIXI.BaseTexture(atlasResource.data);
					atlasTexture.resolution = resolution;
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
			var flumpResource = new pixi_display_FlumpResource(lib,textures,resource.name,resolution);
			if(resource.name != null) {
				pixi_display_FlumpResource.resources.set(resource.name,flumpResource);
				flumpResource;
			}
			resource.data = flumpResource;
			next();
		});
		atlasLoader.load();
	};
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
Perf.MEASUREMENT_INTERVAL = 1000;
Perf.FONT_FAMILY = "Helvetica,Arial";
Perf.FPS_BG_CLR = "#00FF00";
Perf.FPS_WARN_BG_CLR = "#FF8000";
Perf.FPS_PROB_BG_CLR = "#FF0000";
Perf.MS_BG_CLR = "#FFFF00";
Perf.MEM_BG_CLR = "#086A87";
Perf.INFO_BG_CLR = "#00FFFF";
Perf.FPS_TXT_CLR = "#000000";
Perf.MS_TXT_CLR = "#000000";
Perf.MEM_TXT_CLR = "#FFFFFF";
Perf.INFO_TXT_CLR = "#000000";
Perf.TOP_LEFT = "TL";
Perf.TOP_RIGHT = "TR";
Perf.BOTTOM_LEFT = "BL";
Perf.BOTTOM_RIGHT = "BR";
Perf.DELAY_TIME = 4000;
com_isartdigital_builder_Main.FRAME_PER_SECOND = 30;
com_isartdigital_builder_Main.LAUNCH_OFFLINE = false;
com_isartdigital_builder_Main.configPath = "config.json";
com_isartdigital_builder_api_Api.domainProd = "https://fbgame.isartdigital.com/2017_builder/builder2/";
com_isartdigital_builder_api_Api.domainDev = "https://localhostbuilder.com/";
com_isartdigital_builder_api_Api.pathApi = "api/v1/";
com_isartdigital_builder_game_GameManager.EVENT_INTERACTION = "EVENT_INTERACTION";
com_isartdigital_builder_game_GameManager.END_PARADE_REQUEST = "END_PARADE_REQUEST";
com_isartdigital_builder_game_GameManager.INTERVAL_BEFORE_PINATA_REQUEST = 30000;
com_isartdigital_builder_game_GameManager.TIME_BEFORE_PINATA_SHOW = 2000;
com_isartdigital_builder_game_GameManager.DELAY_TO_FIRST_FTUE_POPIN = 2000;
com_isartdigital_builder_game_GameManager.pathfindingWithObstacle = true;
com_isartdigital_builder_game_animation_AnimationNames.ANIM_GOLD = "coingold";
com_isartdigital_builder_game_animation_AnimationNames.ANIM_OFFERING = "coinoffrande";
com_isartdigital_builder_game_animation_AnimationNames.ANIM_SPICE = "coinpimientos";
com_isartdigital_builder_game_animation_AnimationNames.FIREWORKS_A = "FireworksA";
com_isartdigital_builder_game_animation_AnimationNames.FIREWORKS_B = "FireworksB";
com_isartdigital_builder_game_animation_AnimationNames.FIREWORKS_SHOT = "FireworksShot";
com_isartdigital_builder_game_animation_AnimationNames.PETALS = "FX_Petalflump";
com_isartdigital_builder_game_animation_AnimationNames.BOAT_TRAILS = "FX_shockwave";
com_isartdigital_builder_game_animation_AnimationNames.PINATA_PAPER = "PinataPaper";
com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrails.ANIMATION_BASE_DURATION = 850;
com_isartdigital_builder_game_animation_boatTrails_AnimationBoatTrails.ANIMATION_SPEED_COEF = 0.5;
com_isartdigital_builder_game_animation_fireworks_AnimationFireworks.ANIMATION_TOTAL_DURATION = 1300;
com_isartdigital_builder_game_animation_fireworks_AnimationFireworks.FIREWORKS_SHOT_DURATION = 500;
com_isartdigital_builder_game_animation_fireworks_AnimationFireworks.VERTICAL_SHOT_OFFSET = 400;
com_isartdigital_builder_game_animation_fireworks_AnimationFireworks.availableFireworks = ["FireworksA","FireworksB"];
com_isartdigital_builder_game_animation_fireworks_FireworksAmbiance.CHANCE_TO_GENERATE_FIREWORKS = 0.1;
com_isartdigital_builder_game_animation_harvest_AnimationHarvest.MINIMUM_COIN_SCALE = 0.5;
com_isartdigital_builder_game_animation_harvest_AnimationHarvest.SPACE_BETWEEN_CURVE_ANIMATION = 15;
com_isartdigital_builder_game_animation_harvest_AnimationHarvest.RESOURCE_GAIN_PER_COIN = 1;
com_isartdigital_builder_game_animation_harvest_AnimationHarvest.COIN_COUNT_LIMIT = 50;
com_isartdigital_builder_game_animation_harvest_AnimationHarvestBuilder.DEFAULT_ANIMATION_DURATION = 2.5;
com_isartdigital_builder_game_animation_harvest_AnimationHarvestBuilder.ERROR_MISSING_PARAMETERS = "AnimationHarvestBuilder : Missing required parameters.\n" + "\n" + "Usage : \n" + "AnimationHarvestBuilder.create()\n" + "                       .setStartAnimationPosition(position:Void->Point) (Required)\n" + "                       .setEndAnimationPosition(position:Void->Point) (Required)\n" + "                       .withCoinAmountToGenerate(count:Int) (Required)\n" + "\t\t\t\t\t\t.withAnimationName(name:String) (Required)\n" + "                       .withContainer(container:Container) (Required)\n" + "                       .withAnimationDurationInSecond(duration:Float) (Optional) (Default : 2,5s)\n" + "\t   \t\t\t\t    .withCoinCountLimit(count:Int) (Optional) (Default : AnimationHarvest.COIN_COUNT_LIMIT)\n" + "                       .withCallbackWhenCoinReachDestination(callback:Void->Void) (Optional)\n" + "                       .withCallbackOnAnimationEnd(callback:Void->Void) (Optional)\n" + "                       .build()";
com_isartdigital_builder_game_animation_paper_AnimationPaper.ANGLE_BETWEEN_PAPER = 20;
com_isartdigital_builder_game_animation_paper_AnimationPaper.PAPER_PER_LINE = 30;
com_isartdigital_builder_game_animation_paper_AnimationPaper.FALL_TIME_LINE = 5;
com_isartdigital_builder_game_animation_paper_PaperPattern.CIRCLE = "circle";
com_isartdigital_builder_game_animation_paper_PaperPattern.LINE = "line";
com_isartdigital_builder_game_animation_petals_AnimationPetals.PETALS_ANIMATION_DURATION = 1600;
com_isartdigital_builder_game_animation_petals_PetalsSalve.CHANCE_TO_POP_PETAL = 0.02;
com_isartdigital_builder_game_animation_petals_PetalsSalve.PETALS_MAX_DELAY_FOR_GLOBAL_LAUNCH = 1500;
com_isartdigital_builder_game_animation_petals_PetalsSalve.PETALS_MAX_DELAY_FOR_LOCALIZED_LAUNCH = 500;
com_isartdigital_builder_game_animation_petals_PetalsSalve.RADIUS_SALVE = 200;
com_isartdigital_builder_game_animation_petals_PetalsSalve.PETALS_COUNT_FOR_GLOBAL_SALVE = 50;
com_isartdigital_builder_game_animation_petals_PetalsSalve.PETALS_NUMBER_FOR_LAUCNHING_ON_POSITION = 3;
com_isartdigital_builder_game_clipping_ClippingUtils.SCREEN_RECT_SAFE_MARGE_COEFICIENT = 0.05;
com_isartdigital_builder_game_clipping_ClippingUtils.SCREEN_RECT_SAFE_MARGE_DOWN_IN_PX = 304;
com_isartdigital_builder_game_clipping_ClippingUtils.SCREEN_RECT_SAFE_MARGE_RIGHT_IN_PX = 304;
com_isartdigital_builder_game_clipping_ClippingUtils.OTHER_SIDE_OF_THE_SCRENN = -1;
com_isartdigital_builder_game_clipping_ClippingUtils.ADDITIONAL_MODEL_COUNT_TO_GET_TO_HAVE_SAFE_MARGE = 2;
com_isartdigital_builder_game_clipping_ClippingUtils.LEFT = new PIXI.Point(0,1);
com_isartdigital_builder_game_clipping_ClippingUtils.RIGHT = new PIXI.Point(-1,1);
com_isartdigital_builder_game_clipping_ClippingUtils.TOP = new PIXI.Point(1,0);
com_isartdigital_builder_game_clipping_ClippingUtils.DOWN = new PIXI.Point(1,-1);
com_isartdigital_builder_game_ftue_Ftue.event = new EventEmitter();
com_isartdigital_builder_game_ftue_Ftue.LOCALSTORAGE_STEP_KEY = "FTUE_STEP";
com_isartdigital_builder_game_ftue_Ftue.TOTAL_STEP = 27;
com_isartdigital_builder_game_ftue_FtueCamera.MOVING_TIME = 2;
com_isartdigital_builder_game_ftue_FtueEvents.FTUEUI_OK = "FTUEUI_OK";
com_isartdigital_builder_game_ftue_FtueEvents.SHOP_OPENED = "SHOP_OPENED";
com_isartdigital_builder_game_ftue_FtueEvents.BAR_BOUGHT = "BAR_BOUGHT";
com_isartdigital_builder_game_ftue_FtueEvents.COLLECT_LEVEL_UP = "COLLECT_LEVEL_UP";
com_isartdigital_builder_game_ftue_FtueEvents.BAR_PLACED = "BAR_PLACED";
com_isartdigital_builder_game_ftue_FtueEvents.PARADE_CONFIRM = "PARADE_CONFIRM";
com_isartdigital_builder_game_ftue_FtueEvents.PARADE_LAUNCHED = "PARADE_LAUNCHED";
com_isartdigital_builder_game_ftue_FtueEvents.PARADE_SCENARIO_END = "PARADE_SCENARIO_END";
com_isartdigital_builder_game_ftue_FtueEvents.PARADE_MOVED = "PARADE_MOVED";
com_isartdigital_builder_game_ftue_FtueEvents.PARADE_COLLECT = "PARADE_COLLECT";
com_isartdigital_builder_game_ftue_FtueEvents.HARVESTED = "HARVESTED";
com_isartdigital_builder_game_ftue_FtueEvents.CITYHALL_SELECT = "CITYHALL_SELECT";
com_isartdigital_builder_game_ftue_FtueEvents.CITYHALL_UPGRADE = "CITYHALL_UPGRADE";
com_isartdigital_builder_game_ftue_FtueEvents.CITYHALL_HARD_BUILD_REQUEST = "CITYHALL_HARD_BUILD_REQUEST";
com_isartdigital_builder_game_ftue_FtueEvents.CITYHALL_HARD_BUILD = "CITYHALL_HARD_BUILD";
com_isartdigital_builder_game_ftue_FtueEvents.HOUSE_BOUGHT = "HOUSE_BOUGHT";
com_isartdigital_builder_game_ftue_FtueEvents.HOUSE_PLACED = "HOUSE_PLACED";
com_isartdigital_builder_game_ftue_FtueEvents.BAR_UPGRADED = "BAR_UPGRADED";
com_isartdigital_builder_game_ftue_FtueEvents.PINATA_APPEAR = "PINATA_APPEAR";
com_isartdigital_builder_game_ftue_FtueEvents.PINATA_EXPLODE = "PINATA_EXPLODE";
com_isartdigital_builder_game_ftue_FtueEvents.PINATA_RECOLT = "PINATA_RECOLT";
com_isartdigital_builder_game_ftue_FtueEvents.LANTERN_SELECT = "LANTERN_SELECT";
com_isartdigital_builder_game_ftue_FtueEvents.LANTERN_BOUGHT = "LANTERN_BOUGHT";
com_isartdigital_builder_game_ftue_FtueEvents.BUILDING_SELECTED = "BUILDING_SELECTED";
com_isartdigital_builder_game_ftue_FtueEvents.BUILDING_PLACED = "BUILDING_PLACED";
com_isartdigital_builder_game_ftue_FtueEvents.BUILDING_UPGRADED = "BUILDING_UPGRADED";
com_isartdigital_builder_game_ftue_FtueEvents.BUILDING_BOUGHT = "BUILDING_BOUGHT";
com_isartdigital_builder_game_ftue_FtueUtils.BAR = "BAR";
com_isartdigital_builder_game_ftue_FtueUtils.UPGRADE_BUTTON = "UPGRADE_BUTTON";
com_isartdigital_builder_game_ftue_FtueUtils.HARD_BUILD_BUTTON = "HARD_BUILD_BUTTON";
com_isartdigital_builder_game_ftue_FtueUtils.CITY_HALL = "CITY_HALL";
com_isartdigital_builder_game_ftue_FtueUtils.LANTERN = "LANTERN";
com_isartdigital_builder_game_ftue_FtueUtils.SHOP_BUTTON = "SHOP_BUTTON";
com_isartdigital_builder_game_ftue_FtueUtils.SHOP_BUY_SOFT_BUTTON_LEFT = "SHOP_BUY_SOFT_BUTTON_LEFT";
com_isartdigital_builder_game_ftue_FtueUtils.SHOP_BUY_SOFT_BUTTON_RIGHT = "SHOP_BUY_SOFT_BUTTON_RIGHT";
com_isartdigital_builder_game_ftue_FtueUtils.PARADE_BUTTON = "PARADE_BUTTON";
com_isartdigital_builder_game_ftue_FtueUtils.PARADE_BUY_SOFT_BUTTON = "PARADE_BUY_SOFT_BUTTON";
com_isartdigital_builder_game_ftue_FtueUtils.BONUS_PARADE = "BONUS_PARADE";
com_isartdigital_builder_game_ftue_FtueUtils.LANTERN_POSITION_FTUE_X = 51;
com_isartdigital_builder_game_ftue_FtueUtils.LANTERN_POSITION_FTUE_Y = 59;
com_isartdigital_builder_game_manager_BackgroundManager.numberBackground = 15;
com_isartdigital_builder_game_manager_BackgroundManager.widthBackground = 1024;
com_isartdigital_builder_game_manager_BackgroundManager.heightBackground = 683;
com_isartdigital_builder_game_manager_ExperienceManager.UPDATE_REQUEST_EXPERIENCE_VALUE = "UPDATE_REQUEST_EXPERIENCE_VALUE";
com_isartdigital_builder_game_manager_RessourceManager.UPDATE_REQUEST_GOLD_VALUE = "UPDATE_REQUEST_GOLD_VALUE";
com_isartdigital_builder_game_manager_RessourceManager.UPDATE_REQUEST_OFFERING_VALUE = "UPDATE_REQUEST_OFFERING_VALUE";
com_isartdigital_builder_game_manager_RessourceManager.UPDATE_REQUEST_SPICE_VALUE = "UPDATE_REQUEST_SPICE_VALUE";
com_isartdigital_builder_game_manager_RessourceManager.GOLD = "gold";
com_isartdigital_builder_game_manager_RessourceManager.OFFERING = "offering";
com_isartdigital_builder_game_manager_RessourceManager.SPICE = "spice";
com_isartdigital_builder_game_manager_RessourceManager.CASH = "cash";
com_isartdigital_builder_game_map_GMap.globalMap = new haxe_ds_IntMap();
com_isartdigital_utils_game_StateGraphic.animAlpha = 1;
com_isartdigital_utils_game_StateGraphic.boxAlpha = 0;
com_isartdigital_builder_game_parade_BonusParade.list = [];
com_isartdigital_builder_game_parade_BonusParade.MIN_TIME_TO_APPEAR = 0.3;
com_isartdigital_builder_game_parade_BonusParade.TIME_TO_DISAPPEAR = 1;
com_isartdigital_builder_game_parade_BonusParade.BONUS_ANIMATION_TRANSITION = 0.5;
com_isartdigital_builder_game_parade_BonusParade.BONUS_ANIMATION_END_VALUE = 0.9;
com_isartdigital_builder_game_parade_BonusParade.BONUS_VERTICAL_OFFSET = 30;
com_isartdigital_builder_game_parade_BonusType.BONUS_PIMIENTOS = "BonusPimientos";
com_isartdigital_builder_game_parade_BonusType.BONUS_OFFERING = "BonusOffering";
com_isartdigital_builder_game_parade_BonusType.BONUS_PESOS = "BonusPesos";
com_isartdigital_builder_game_parade_ParadeBonusGenerator.PERCENT_BONUS_TO_GENERATE = 0.05;
com_isartdigital_builder_game_parade_ParadeProcession.distanceBetweenStartPositionAndFirstIlluminatedTile = 5;
com_isartdigital_builder_game_parade_TargetAsset.colorBorder = 10551278;
com_isartdigital_builder_game_parade_TargetAsset.colorAsset = 4162;
com_isartdigital_builder_game_pooling_PoolObject.poolList = new haxe_ds_StringMap();
com_isartdigital_builder_game_pooling_PoolObject.objectMarge = 10;
com_isartdigital_builder_game_pooling_PoolObject.objectListLimit = 1000;
com_isartdigital_builder_game_sprites_Background.BACKGROUND_WIDTH = 3;
com_isartdigital_builder_game_sprites_Background.BACKGROUND_HEIGHT = 3;
com_isartdigital_builder_game_sprites_Background.ANIM_SPEED = 0.3;
com_isartdigital_builder_game_sprites_Tile.list = [];
com_isartdigital_builder_game_sprites_Tile.buildableTiles = [];
com_isartdigital_builder_game_sprites_buildings_Building.buildingsModel = [];
com_isartdigital_builder_game_sprites_buildings_Building.list = [];
com_isartdigital_builder_game_sprites_buildings_Building.MOUSE_OVER_BRIGHTNESS = 0.65;
com_isartdigital_builder_game_sprites_buildings_Building.ALPHA_WHEN_BUILDING_IS_MOVING = 0.3;
com_isartdigital_builder_game_sprites_buildings_Building.ALPHA_WHEN_BUILDING_IS_NOT_MOVING = 1;
com_isartdigital_builder_game_sprites_buildings_BuildingCreator.CAMERA_MOVE_TO_BUILDING_DELAY = 1;
com_isartdigital_builder_game_sprites_buildings_BuildingHarvester.MINIMUM_FILL_PERCENT_FOR_HARVESTING = 0.005;
com_isartdigital_builder_game_sprites_buildings_BuildingHarvester.HARVEST_OFFERING_ICON = "HarvestOffering";
com_isartdigital_builder_game_sprites_buildings_BuildingHarvester.HARVEST_GOLD_ICON = "HarvestPesos";
com_isartdigital_builder_game_sprites_buildings_BuildingTimebase.ANIMATION_NAME = "FX_Waterball_in2";
com_isartdigital_builder_game_sprites_buildings_BuildingTimebase.DELAY_BEFORE_POPIN_END_CONSTRUCTION_OR_UPGRADE = 1000;
com_isartdigital_builder_game_sprites_buildings_BuildingTimebase.BASE_TIMEBASE_ANIMATION_SIZE = 2.5;
com_isartdigital_builder_game_sprites_buildings_BuildingTimebase.IN_CONSTRUCTION_ANIM_FRAME_START = 34;
com_isartdigital_builder_game_sprites_buildings_BuildingTimebase.IN_CONSTRUCTION_ANIM_FRAME_END = 90;
com_isartdigital_builder_game_sprites_buildings_BuildingTimebase.FINISH_CONSTRUCTION_ANIM_FRAME_END = 148;
com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents.ERASABLE = "ERASABLE";
com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents.MOVABLE = "MOVABLE";
com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents.UPGRADABLE = "UPGRADABLE";
com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents.COLLECTABLE = "COLLECTABLE";
com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents.PAINTABLE = "PAINTABLE";
com_isartdigital_builder_game_sprites_buildings_const_BuildingComponents.HARDBUILD = "HARDBUILD";
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
com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions.mousePositionNotSet = "Mouse position must be setted";
com_isartdigital_builder_game_sprites_buildings_exceptions_BuildingExceptions.constructEndDateIsNull = "You try to know construct end date of building but the date is null";
com_isartdigital_builder_game_sprites_citizen_Citizen.TRAILS_FREQUENCY = 500;
com_isartdigital_builder_game_sprites_citizen_Citizen.TIME_TO_RUN_THOUGH_100_PIXEL_FOR_PASSIVE_CITIZEN = 1;
com_isartdigital_builder_game_sprites_citizen_Citizen.PIXEL_100 = 100;
com_isartdigital_builder_game_sprites_citizen_Citizen.TIME_MULTIPLICATOR_FOR_EASING = 3;
com_isartdigital_builder_game_sprites_citizen_Citizen.TIME_TO_APPEAR = 3;
com_isartdigital_builder_game_sprites_citizen_Citizen.TIME_TO_DISAPPEAR = 5;
com_isartdigital_builder_game_sprites_citizen_Citizen.TIME_TO_GET_FULL_ALPHA = 0.25;
com_isartdigital_builder_game_sprites_citizen_Citizen.ALPHA_TO_REACH_WHEN_APPEAR = 0.75;
com_isartdigital_builder_game_sprites_citizen_Citizen.WIDTH_FOR_TOP_LEFT_ORIANTATION = 3;
com_isartdigital_builder_game_sprites_citizen_Citizen.HEIGHT_FOR_TOP_LEFT_ORIANTATION = 1;
com_isartdigital_builder_game_sprites_citizen_Citizen.WIDTH_FOR_TOP_RIGHT_ORIANTATION = 1;
com_isartdigital_builder_game_sprites_citizen_Citizen.HEIGHT_FOR_TOP_RIGHT_ORIANTATION = 3;
com_isartdigital_builder_game_sprites_citizen_Citizen.TIME_TO_SHOW_OR_HIDE_PASSIVE_CITIZEN = 2;
com_isartdigital_builder_game_sprites_citizen_Citizen.CHANCE_TO_LAUNCH_FIREWORKS_AFTER_CHANGING_DIRECTION = 0.05;
com_isartdigital_builder_game_sprites_citizen_Citizen.HEAD_OF_PARADE_ASSET_NAME = "CitizenA";
com_isartdigital_builder_game_sprites_citizen_Citizen.assetNameList = ["CitizenB","CitizenC","CitizenD","CitizenE","CitizenF"];
com_isartdigital_builder_game_sprites_citizen_Citizen.list = [];
com_isartdigital_builder_game_sprites_citizen_Citizen.passiveCitizens = [];
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.LEFT = "LEFT";
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.RIGHT = "RIGHT";
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.TOP = "TOP";
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.BOT = "BOT";
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.TOP_RIGHT = "TOP_RIGHT";
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.TOP_LEFT = "TOP_LEFT";
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.BOT_RIGHT = "BOT_RIGHT";
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.BOT_LEFT = "BOT_LEFT";
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.FRAMES_BOT_LEFT = 0;
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.FRAMES_TOP_LEFT = 1;
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.FRAMES_LEFT = 2;
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.FRAMES_BOT = 3;
com_isartdigital_builder_game_sprites_citizen_CitizenDirections.FRAMES_TOP = 4;
com_isartdigital_builder_game_type_JsonNames.LANTERN_PLACEMENT = "json/lanternsPlacement.json";
com_isartdigital_builder_game_type_JsonNames.BUILDINGS_SETTINGS = "json/buildingsSettings.json";
com_isartdigital_builder_game_type_JsonNames.BUILDINGS_DEFINITION = "json/building.json";
com_isartdigital_builder_game_type_JsonNames.SHOP_BUILDING_SHEET = "json/ShopBuildingSheet.json";
com_isartdigital_builder_game_type_JsonNames.SHOP_RESSOURCE_SHEET = "json/ShopRessourceSheet.json";
com_isartdigital_builder_game_type_JsonNames.PARADE_SETTINGS = "json/paradeSettings.json";
com_isartdigital_builder_game_type_JsonNames.XP_SETTINGS = "json/XP.json";
com_isartdigital_builder_game_type_JsonNames.LEVEL_REWARD_SETTINGS = "json/levelReward.json";
com_isartdigital_builder_game_type_JsonNames.CITY_HALL_LEVEL_REWARD_SETTINGS = "json/hdvLevelReward.json";
com_isartdigital_builder_game_type_JsonNames.PARADE_PATERN = "json/paradePatern.json";
com_isartdigital_builder_game_type_JsonNames.SHOP_ITEM = "json/shopItem.json";
com_isartdigital_builder_game_type_JsonNames.FTUE = "json/ftue.json";
com_isartdigital_builder_game_type_JsonNames.GIFTS_SETTINGS = "json/giftsSettings.json";
com_isartdigital_builder_game_type_ModelElementNames.TILE = "tile";
com_isartdigital_builder_game_type_ModelElementNames.BUILDING = "building";
com_isartdigital_builder_game_type_ModelElementNames.BACKGROUND = "background";
com_isartdigital_builder_game_type_ModelElementNames.BONUS_PARADE = "BONUS_PARADE";
com_isartdigital_builder_game_utils_Metadatas.paradeDetails = new haxe_ds_StringMap();
com_isartdigital_builder_game_utils_TimeUtils.dayInMilliseconds = 86400000;
com_isartdigital_builder_game_utils_TimeUtils.hourInMilliseconds = 3600000;
com_isartdigital_builder_game_utils_TimeUtils.minuteInMilliseconds = 60000;
com_isartdigital_builder_game_utils_TimeUtils.secondInMilliseconds = 1000;
com_isartdigital_builder_game_utils_TypeDefUtils.tileModelDef = { type : null, x : null, y : null, isBuildable : null, isIlluminated : null, alpha : null};
com_isartdigital_builder_game_utils_TypeDefUtils.buildingModelDef = { type : null, name : null, x : null, y : null, color : null, construct_end_at : null};
com_isartdigital_builder_game_utils_TypeDefUtils.ftueUIParamsDef = { tutorPosture : null, text : null, event : null};
com_isartdigital_builder_ui_GraphicLoader.LOADSCREEN_SPRITE_NAME = "titlecard";
com_isartdigital_builder_ui_UIManager.CLOSE_POPIN_REQUEST = "CLOSE_POPIN_REQUEST";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_LANTERNCONFIRM = "OPEN_POPIN_REQUEST_LANTERNCONFIRM";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_MAINBUILDINGINFO = "OPEN_POPIN_REQUEST_MAINBUILDINGINFO";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_PARADECONFIRM = "OPEN_POPIN_REQUEST_PARADECONFIRM";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_PARADEREWARD = "OPEN_POPIN_REQUEST_PARADEREWARD";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_SHOP_BUILDING = "OPEN_POPIN_REQUEST_SHOP_BUILDING";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_SHOP_RESOURCE = "OPEN_POPIN_REQUEST_SHOP_RESOURCE";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_UPGRADEREWARD = "OPEN_POPIN_REQUEST_UPGRADEREWARD";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_LEVELREWARD = "OPEN_POPIN_REQUEST_LEVELREWARD";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_PARADECONTINUE = "OPEN_POPIN_REQUEST_PARADECONTINUE";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_HARDBUILDCONFIRM = "OPEN_POPIN_REQUEST_HARDBUILDCONFIRM";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_LANTERNINFO = "OPEN_POPIN_REQUEST_LANTERNINFO";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_UPGRADECONFIRM = "OPEN_POPIN_REQUEST_UPGRADECONFIRM";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_DELETECONFIRM = "OPEN_POPIN_REQUEST_DELETECONFIRM";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_NOMONEY = "OPEN_POPIN_REQUEST_NOMONEY";
com_isartdigital_builder_ui_UIManager.OPEN_POPIN_REQUEST_PINATA = "OPEN_POPIN_REQUEST_PINATA";
com_isartdigital_builder_ui_UIManager.ON_MOUSE_OVER_UI = "ON_MOUSE_OVER_UI";
com_isartdigital_builder_ui_UIManager.ON_MOUSE_OUT_UI = "ON_MOUSE_OUT_UI";
com_isartdigital_builder_ui_UIManager.mouseIsOverUI = false;
com_isartdigital_utils_ui_Button.buttonWasJustClicked = false;
com_isartdigital_utils_ui_Button.DELAY_TO_PASS_BUTTON_WAS_JUST_CLIKED_TO_FALSE = 15;
com_isartdigital_utils_ui_Button.UP = 0;
com_isartdigital_utils_ui_Button.OVER = 1;
com_isartdigital_utils_ui_Button.DOWN = 2;
com_isartdigital_builder_ui_ftue_Arrow.BLINK_FREQUENCY = 500;
com_isartdigital_builder_ui_ftue_Arrow.BRIGHTNESS_INTENSITY = 1.3;
com_isartdigital_builder_ui_ftue_Arrow.ARROW_ASSET_NAME = "Arrow";
com_isartdigital_builder_ui_ftue_Arrow.TIME_TO_APPEAR = 1;
com_isartdigital_builder_ui_ftue_Arrow.TIME_TO_DEASAPPEAR = 1;
com_isartdigital_builder_ui_ftue_FtueUI.UI_X_OFFSET = 75;
com_isartdigital_builder_ui_ftue_FtueUI.TRANSITION_APPEAR_TIME = 0.5;
com_isartdigital_builder_ui_ftue_FtueUI.TRANSITION_DISAPPEAR_TIME = 0.5;
com_isartdigital_builder_ui_ftue_TutorPosture.WAIT = "wait";
com_isartdigital_builder_ui_ftue_TutorPosture.THROW = "throw";
com_isartdigital_builder_ui_ftue_TutorPosture.SHOW = "show";
com_isartdigital_builder_ui_ftue_TutorPosture.GOOD = "good";
com_isartdigital_builder_ui_ftue_TutorPosture.FINGER = "finger";
com_isartdigital_builder_ui_hud_BaseBuildingHUD.BUTTON_DELETE_NAME = "DeleteButton";
com_isartdigital_builder_ui_hud_BaseBuildingHUD.BUTTON_COLOR_NAME = "ColorButton";
com_isartdigital_builder_ui_hud_BaseBuildingHUD.BUTTON_UPGRADABLE_NAME = "UpgradeButton";
com_isartdigital_builder_ui_hud_BaseBuildingHUD.BUTTON_MOVE_NAME = "MoveButton";
com_isartdigital_builder_ui_hud_BaseBuildingHUD.DESCRIPTION_ITEM = "BuildingInfo";
com_isartdigital_builder_ui_hud_BaseBuildingHUD.BUTTON_HARDBUILD_NAME = "HardBuildButton";
com_isartdigital_builder_ui_hud_BaseBuildingHUDEvent.UPGRADE_BUTTON = "UPGRADE_BUTTON";
com_isartdigital_builder_ui_hud_BaseBuildingHUDEvent.PAINT_BUTTON = "PAINT_BUTTON";
com_isartdigital_builder_ui_hud_BaseBuildingHUDEvent.MOVE_BUTTON = "MOVE_BUTTON";
com_isartdigital_builder_ui_hud_BaseBuildingHUDEvent.DELETE_BUTTON = "DELETE_BUTTON";
com_isartdigital_builder_ui_hud_BaseBuildingHUDEvent.HARDBUILD_BUTTON = "HARDBUILD_BUTTON";
com_isartdigital_builder_ui_hud_CurrencyAsset.MIDDLE_OF_CURRENCY_CIRCLE_OFFSET_X = 105;
com_isartdigital_builder_ui_hud_CurrencyAsset.MIDDLE_OF_CURRENCY_CIRCLE_OFFSET_Y = 75;
com_isartdigital_builder_ui_hud_Hud.UPDATE_REQUEST_LVL = "UPDATE_REQUEST_LVL";
com_isartdigital_builder_ui_hud_Hud.UPDATE_REQUEST_XP = "UPDATE_REQUEST_XP";
com_isartdigital_builder_ui_hud_Hud.UPDATE_REQUEST_OFFERING_TEXT = "UPDATE_OFFERING_TEXT";
com_isartdigital_builder_ui_hud_Hud.UPDATE_REQUEST_PIMIENTOS_TEXT = "UPDATE_PIMIENTOS_TEXT";
com_isartdigital_builder_ui_hud_Hud.UPDATE_REQUEST_PESOS_TEXT = "UPDATE_GOLD_TEXT";
com_isartdigital_builder_ui_hud_HudParade.UPDATE_REQUEST_TIMER = "UPDATE_REQUEST_TIMER";
com_isartdigital_builder_ui_hud_HudParade.UPDATE_REQUEST_PESOS_VIEW = "UPDATE_REQUEST_PESOS_VIEW";
com_isartdigital_builder_ui_hud_HudParade.UPDATE_REQUEST_PIMIENTOS_VIEW = "UPDATE_REQUEST_PIMIENTOS_VIEW";
com_isartdigital_builder_ui_hud_HudParade.UPDATE_REQUEST_OFFERING_VIEW = "UPDATE_REQUEST_OFFERING_VIEW";
com_isartdigital_builder_ui_items_ItemShop.TOTAL_ERROR_BLINK = 6;
com_isartdigital_builder_ui_items_ItemShop.ERROR_BLINK_INTERVAL_DELAY = 150;
com_isartdigital_builder_ui_items_MissionAsset.MOUSE_OVER_BRIGHTNESS = 1.5;
com_isartdigital_builder_ui_items_MissionItem.missionNames = [];
com_isartdigital_builder_ui_items_ResourcesView.MIDDLE_OF_PIMIENTOS_CIRCLE_OFFSET_X = 610;
com_isartdigital_builder_ui_items_ResourcesView.MIDDLE_OF_OFFERING_CIRCLE_OFFSET_X = 330;
com_isartdigital_builder_ui_items_ResourcesView.MIDDLE_OF_PESOS_CIRCLE_OFFSET_X = 60;
com_isartdigital_builder_ui_items_ResourcesView.MIDDLE_OF_CURRENCY_CIRCLE_OFFSET_Y = 63;
com_isartdigital_builder_ui_items_ResourcesView.middleResourceOffsetX = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	if(__map_reserved.gold != null) _g.setReserved("gold",60); else _g.h["gold"] = 60;
	if(__map_reserved.offering != null) _g.setReserved("offering",330); else _g.h["offering"] = 330;
	if(__map_reserved.spice != null) _g.setReserved("spice",610); else _g.h["spice"] = 610;
	$r = _g;
	return $r;
}(this));
com_isartdigital_builder_ui_popin_HardBuildConfirm.CONFIRM_BUTTON_CLICK = "CONFIRM_BUTTON_CLICK";
com_isartdigital_builder_ui_popin_LanternConfirm.BUYHARD = "BUYHARDLANTERN";
com_isartdigital_builder_ui_popin_LanternConfirm.BUYSOFT = "BUYSOFTLANTERN";
com_isartdigital_builder_ui_popin_Pinata.BAT_CURSOR_EFFECT_HIT_DURATION = 50;
com_isartdigital_builder_ui_popin_Pinata.BASE_RADIUS_FOR_PAPER = 650;
com_isartdigital_builder_ui_popin_Pinata.GROWN_ANIMATION_DURATION = 1;
com_isartdigital_builder_ui_popin_Pinata.GROWN_AMOUNT_ON_HIT = 0.075;
com_isartdigital_builder_ui_popin_Pinata.PINATA_SCALE_TO_EXPLODE = 1.5;
com_isartdigital_builder_ui_popin_Pinata.SHRINK_SPEED = 0.01;
com_isartdigital_builder_ui_popin_Shop.SHOP_SHEET_BUILDING = "BUILDING_SHOP";
com_isartdigital_builder_ui_popin_Shop.SHOP_SHEET_RESSOURCE = "RESSOURCE_SHOP";
com_isartdigital_builder_ui_popin_Shop.BUY_REQUEST_BUILDING = "SHOP_BUY_BUILDING";
com_isartdigital_builder_ui_popin_UpgradeConfirm.descriptionLabel = "label_upgrade_description";
com_isartdigital_builder_ui_popin_UpgradeConfirm.minuteLabel = "label_minute";
com_isartdigital_services_Ads.TYPE_END = "end";
com_isartdigital_services_Ads.TYPE_CANCEL = "cancel";
com_isartdigital_services_Ads.TYPE_CLOSE = "close";
com_isartdigital_services_Ads.TYPE_CLICK = "click";
com_isartdigital_services_Ads.IMAGE = "image";
com_isartdigital_services_Ads.MOVIE = "movie";
com_isartdigital_services__$Ads_Ad.CROSS_SIZE = 20;
com_isartdigital_services__$Ads_Ad.QUIT_SIZE = 40;
com_isartdigital_services_HttpService.SERVICE_PATH = "://fbgame.isartdigital.com/2017_builder/builder0/broadcast/";
com_isartdigital_utils_Config.cache = true;
com_isartdigital_utils_Config.tileWidth = 152;
com_isartdigital_utils_Config.tileHeight = 76;
com_isartdigital_utils_Config.mapSize = 100;
com_isartdigital_utils_Config._data = { };
com_isartdigital_utils_Debug.debugPointsList = [];
com_isartdigital_utils_Debug.debugPositionOnClick = false;
com_isartdigital_utils_Debug.debugIlluminateTileAtClick = false;
com_isartdigital_utils_Debug.QR_SIZE = 0.35;
com_isartdigital_utils_Localization.LANG_EN = "en";
com_isartdigital_utils_Localization.LANG_FR = "fr";
com_isartdigital_utils_Time.SECONDS_IN_HOUR = 3600;
com_isartdigital_utils_Time.SECONDS_IN_MINUTE = 60;
com_isartdigital_utils_Time.MILLISECONDS_IN_SECOND = 1000;
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
com_isartdigital_utils_facebook_Facebook.permissions = { scope : "user_friends,email,publish_actions"};
com_isartdigital_utils_facebook_Facebook.FACEBOOK_APP_LINK = "https://apps.facebook.com/builderisart";
com_isartdigital_utils_game_Camera.MINIMUM_OFFSET_MOVE_TO_CONSIDER_SCROLLING = 20;
com_isartdigital_utils_game_Camera.cameraActivated = true;
com_isartdigital_utils_game_GameStage.SAFE_ZONE_WIDTH = 2048;
com_isartdigital_utils_game_GameStage.SAFE_ZONE_HEIGHT = 1366;
com_isartdigital_utils_game_factory_MovieClipAnimFactory.textureDigits = 4;
com_isartdigital_utils_game_iso_IsoManager.depthMap = new haxe_ds_IntMap();
com_isartdigital_utils_lib_pathfinder_Pathfinder._COST_ADJACENT = 10;
com_isartdigital_utils_lib_pathfinder_Pathfinder._COST_DIAGIONAL = 14;
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
pixi_display_FlumpResource.resources = new haxe_ds_StringMap();
})(typeof console != "undefined" ? console : {log:function(){}}, typeof window != "undefined" ? window : exports);

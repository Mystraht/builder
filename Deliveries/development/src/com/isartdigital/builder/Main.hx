package com.isartdigital.builder;

import com.isartdigital.builder.ui.Footer;
import pixi.core.math.Point;
import com.isartdigital.builder.ui.items.Disclaimer_item;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.ui.buttons.BuyHardButton;
import com.isartdigital.builder.ui.buttons.BuyOfferingButton;
import com.isartdigital.builder.ui.buttons.BuyPesosButton;
import com.isartdigital.builder.ui.buttons.CancelButton;
import com.isartdigital.builder.ui.buttons.CashButton;
import com.isartdigital.builder.ui.buttons.NextFtueButton;
import com.isartdigital.builder.ui.buttons.OkFtueButton;
import com.isartdigital.builder.ui.buttons.SettingButton;
import com.isartdigital.builder.ui.buttons.ShareButton;
import com.isartdigital.builder.ui.ftue.FtueUI;
import com.isartdigital.builder.ui.items.MissionAsset;
import com.isartdigital.builder.ui.items.MissionItem;
import com.isartdigital.builder.ui.items.MissionPanelItem;
import com.isartdigital.builder.ui.items.Tutor;
import com.isartdigital.builder.ui.buttons.AdButton;
import com.isartdigital.builder.ui.buttons.ContinueHardButton;
import com.isartdigital.builder.ui.items.ItemRessource;
import com.isartdigital.builder.ui.items.RessourceInShop;
import com.isartdigital.builder.ui.popin.DeleteConfirm;
import com.isartdigital.builder.ui.popin.HardBuildConfirm;
import com.isartdigital.builder.ui.popin.LanternInfo;
import com.isartdigital.builder.ui.popin.ParadeContinue;
import com.isartdigital.builder.ui.popin.UpgradeConfirm;
import Math;
import Std;
import haxe.Timer;
import com.isartdigital.builder.game.utils.Metadatas;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.hud.BaseBuildingHUD;
import com.isartdigital.builder.ui.hud.HudParade;
import com.isartdigital.builder.ui.items.ResourcesView;
import com.isartdigital.builder.ui.items.TimerParade;
import com.isartdigital.builder.ui.buttons.CreditButton;
import com.isartdigital.builder.ui.buttons.NotificationButton;
import com.isartdigital.builder.ui.buttons.ParadeMoreButton;
import com.isartdigital.builder.ui.buttons.SFXButton;
import com.isartdigital.builder.ui.buttons.SoundButton;
import com.isartdigital.services.FacebookPicture;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.ResponseDef;
import com.isartdigital.builder.game.def.UserInfoDef;
import com.isartdigital.builder.ui.GraphicLoader;
import com.isartdigital.builder.ui.hud.GoldCurrency;
import com.isartdigital.builder.ui.hud.LevelCurrency;
import com.isartdigital.builder.ui.hud.OfferingsCurrency;
import com.isartdigital.builder.ui.hud.SpiceCurrency;
import com.isartdigital.builder.ui.items.BuildingInfo;
import com.isartdigital.builder.ui.items.BuildingInShop;
import com.isartdigital.builder.ui.items.ItemBuilding;
import com.isartdigital.builder.ui.items.RewardBuilding;
import com.isartdigital.builder.ui.items.ShopBuilding;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.builder.ui.buttons.ColorButton;
import com.isartdigital.builder.ui.buttons.DeleteButton;
import com.isartdigital.builder.ui.buttons.DisableButton;
import com.isartdigital.builder.ui.buttons.DotButton;
import com.isartdigital.builder.ui.buttons.GoldButton;
import com.isartdigital.builder.ui.buttons.LeftButton;
import com.isartdigital.builder.ui.buttons.MoveButton;
import com.isartdigital.builder.ui.buttons.OfferingButton;
import com.isartdigital.builder.ui.buttons.ParadeButton;
import com.isartdigital.builder.ui.buttons.RewardButton;
import com.isartdigital.builder.ui.buttons.RightButton;
import com.isartdigital.builder.ui.buttons.ShopBuildingButton;
import com.isartdigital.builder.ui.buttons.ShopButton;
import com.isartdigital.builder.ui.buttons.ShopBuyHardButton;
import com.isartdigital.builder.ui.buttons.ShopBuySoftButton;
import com.isartdigital.builder.ui.buttons.CloseButton;
import com.isartdigital.builder.ui.buttons.ShopRessourceButton;
import com.isartdigital.builder.ui.buttons.SpiceButton;
import com.isartdigital.builder.ui.buttons.UpgradeButton;
import com.isartdigital.builder.ui.buttons.UpgradeDisableButton;
import com.isartdigital.builder.ui.buttons.UpgradeValideButton;
import com.isartdigital.builder.ui.buttons.ValideButton;
import com.isartdigital.services.Users;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.events.EventType;
import com.isartdigital.utils.events.LoadEventType;
import com.isartdigital.utils.facebook.Facebook;
import com.isartdigital.utils.game.factory.MovieClipAnimFactory;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.GameStageScale;
import com.isartdigital.builder.game.GameManager;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.Localization;
import com.isartdigital.utils.system.DeviceCapabilities;
import com.isartdigital.utils.ui.UIBuilder;
import eventemitter3.EventEmitter;
import haxe.Json;
import js.Browser;
import pixi.core.display.Container;
import pixi.core.renderers.Detector;
import pixi.core.renderers.webgl.WebGLRenderer;
import pixi.interaction.EventTarget;
import pixi.loaders.Loader;

/**
 * Classe d'initialisation et lancement du jeu
 * @author Mathieu ANTHOINE
 */
class Main extends EventEmitter {
	private static inline var ISART_DIGITAL_LOGO_ASSET:String = 'logoIsartDigital';
	private static inline var FRAME_PER_SECOND:Int = 30;
	private static inline var LAUNCH_OFFLINE:Bool = false;
	private static inline var SPLASH_SCREEN_DURATION:Float = 2000;

	private var increase:Bool = true;
	/**
	 * chemin vers le fichier de configuration
	 */
	private static var configPath:String = "config.json";

	/**
	 * instance unique de la classe Main
	 */
	private static var instance:Main;

	/**
	 * Si le /me a été chargé ou non
	 */
	private var userInfoLoaded:Bool = false;

	/**
	 * Si les assets on été chargé ou non
	 */
	private var assetsLoaded:Bool = false;
	private var facebookConnected:Bool = false;
	private var splashScreenAsset:StateGraphic;

	/**
	 * renderer (WebGL ou Canvas)
	 */
	public var renderer:WebGLRenderer;

	/**
	 * Element racine de la displayList
	 */
	public var stage:Container;

	private var footer:Footer;
	private var mail:String;
	private var firstname:String;
	private var lastname:String;
	private var token:String;
	public var locale:String;

	/**
	 * initialisation générale
	 */

	private static function main():Void {
		Main.getInstance();
	}

	public function getMail():String {
		return mail;
	}

	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */

	public static function getInstance():Main {
		if (instance == null) instance = new Main();
		return instance;
	}

	/**
	 * création du jeu et lancement du chargement du fichier de configuration
	 */

	private function new() {
		super();

		var lOptions:RenderingOptions = {};
		//lOptions.antialias = true;
		//lOptions.autoResize = true;
		lOptions.backgroundColor = 0x252540;
		//lOptions.resolution = 1;
		//lOptions.transparent = false;
		//lOptions.preserveDrawingBuffer (pour dataToURL)

		DeviceCapabilities.scaleViewport();

		renderer = Detector.autoDetectRenderer(DeviceCapabilities.width, DeviceCapabilities.height, lOptions);

		// positionne tous les éléments graphiques au pixel ce qui evite les effets de flou
		untyped renderer.roundPixels = true;

		Browser.document.body.appendChild(renderer.view);

		stage = new Container();

		Facebook.onLogin = onFacebookLogin;
		Facebook.load("750435741727559");

		if (LAUNCH_OFFLINE) {
			Browser.getLocalStorage().setItem('token', '1071918536161216');
			facebookConnected = true;
			Api.getInstance();
			loadUserInfos();
		}

		if (DeviceCapabilities.isCocoonJS) {
			Browser.getLocalStorage().setItem('token', '1071918536161216');
			facebookConnected = true;
			Api.getInstance();
			loadUserInfos();
		}

		var lConfig:Loader = new Loader();

		configPath += "?" + Date.now().getTime();

		lConfig.add(configPath);
		lConfig.once(LoadEventType.COMPLETE, preloadAssets);

		lConfig.load();
	}

	/**
	 * charge les assets graphiques du preloader principal
	 */

	private function preloadAssets(pLoader:Loader):Void {

		// initialise les paramètres de configuration
		Config.init(Reflect.field(pLoader.resources, configPath).data);

		// Active le mode debug
		if (Config.debug) Debug.getInstance().init();
		// défini l'alpha des Boxes de collision
		if (Config.debug && Config.data.boxAlpha != null) StateGraphic.boxAlpha = Config.data.boxAlpha;
		// défini l'alpha des anims
		if (Config.debug && Config.data.animAlpha != null) StateGraphic.animAlpha = Config.data.animAlpha;

		// défini le mode de redimensionnement du Jeu pour Desktop (NO_SCALE) et pour le reste (SHOW_ALL)
		if (DeviceCapabilities.system == DeviceCapabilities.SYSTEM_DESKTOP) {
			GameStage.getInstance().scaleMode = GameStageScale.NO_SCALE;
			// petit hack pour forcer l'utilisation de la texture MD sur Desktop
			untyped DeviceCapabilities.textureRatio = 0.5;
			untyped DeviceCapabilities.textureType = DeviceCapabilities.TEXTURE_MD;
		} else {
			untyped DeviceCapabilities.textureRatio = 0.25;
			untyped DeviceCapabilities.textureType = DeviceCapabilities.TEXTURE_LD;
			GameStage.getInstance().scaleMode = GameStageScale.SHOW_ALL;
			DeviceCapabilities.init();
		}

		// initialise le GameStage et défini la taille de la safeZone
		GameStage.getInstance().init(render, 2048, 1366, true);

		// affiche le bouton FullScreen quand c'est nécessaire
		DeviceCapabilities.displayFullScreenButton();

		// Ajoute le GameStage au stage
		stage.addChild(GameStage.getInstance());

		// ajoute Main en tant qu'écouteur des évenements de redimensionnement
		Browser.window.addEventListener(EventType.RESIZE, resize);
		resize();

		// lance le chargement des assets graphiques du preloader
		var lLoader:GameLoader = new GameLoader();
//		lLoader.addAssetFile("preload.png");
//		lLoader.addAssetFile("preload_bg.png");
		lLoader.addAssetFile(DeviceCapabilities.textureType + "/titlecardnew/library.json");
		lLoader.addSoundFile("sounds.json");

		lLoader.once(LoadEventType.COMPLETE, loadAssets);
		lLoader.load();
	}

	/**
	 * lance le chargement principal
	 */

	private function loadAssets(pLoader:GameLoader):Void {
		var lLoader:GameLoader = new GameLoader();

		lLoader.addTxtFile("shop.json");
		lLoader.addTxtFile("hud.json");
		lLoader.addTxtFile("popin.json");
		lLoader.addTxtFile("hudparade.json");
		lLoader.addTxtFile("ftue.json");
		lLoader.addTxtFile("pnj.json");
		lLoader.addTxtFile("pinata.json");


		lLoader.addTxtFile(JsonNames.BUILDINGS_DEFINITION);
		lLoader.addTxtFile(JsonNames.LANTERN_PLACEMENT);
		lLoader.addTxtFile(JsonNames.BUILDINGS_SETTINGS);
		lLoader.addTxtFile(JsonNames.PARADE_SETTINGS);
		lLoader.addTxtFile(JsonNames.SHOP_BUILDING_SHEET);
		lLoader.addTxtFile(JsonNames.SHOP_RESSOURCE_SHEET);
		lLoader.addTxtFile(JsonNames.LEVEL_REWARD_SETTINGS);
		lLoader.addTxtFile(JsonNames.CITY_HALL_LEVEL_REWARD_SETTINGS);
		lLoader.addTxtFile(JsonNames.XP_SETTINGS);
		lLoader.addTxtFile(JsonNames.PARADE_PATERN);
		lLoader.addTxtFile(JsonNames.SHOP_ITEM);
		lLoader.addTxtFile(JsonNames.FTUE);
		lLoader.addTxtFile(JsonNames.GIFTS_SETTINGS);

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

		lLoader.addAssetFile(DeviceCapabilities.textureType + "/buildings/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType + "/fx/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType + "/popin/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType + "/shop/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType + "/hud/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType + "/hudparade/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType + "/ftue/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType + "/pnj/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType + "/pinata/library.json");

		lLoader.addFontFile("fonts.css");

		lLoader.on(LoadEventType.PROGRESS, onLoadProgress);
		lLoader.once(LoadEventType.COMPLETE, onLoadComplete);

		// affiche l'écran de préchargement
		UIManager.getInstance().openScreen(GraphicLoader.getInstance());

		gameLoop();
		renderLoop();

		lLoader.load();
	}


	/**
	 * Charge le /userInfos du jeu
	 */

	private function loadUserInfos():Void {
		Api.user.getUserInfo(cbOnUserInfosReceipt);
	}

	private function cbOnUserInfosReceipt(pData:String):Void {
		var lData:ResponseDef = cast(Json.parse(pData));
		var userInfos:UserInfoDef;

		if (lData.errorCode == 1) {
			//ApiUtils.displayError(lData.errorCode, lData.errorMessage);
			Api.user.createFBAccount(mail, firstname, lastname, token, cast loadUserInfos);
			return;
		}

		Users.setInfos(lData.data);
		userInfoLoaded = true;
		tryToStartGame();
	}

	/**
	 * transmet les paramètres de chargement au préchargeur graphique
	 * @param	pEvent evenement de chargement
	 */

	private function onLoadProgress(pLoader:GameLoader):Void {
		GraphicLoader.getInstance().update(pLoader.progress / 100);
	}

	/**
	 * initialisation du jeu
	 * @param	pEvent evenement de chargement
	 */

	private function onLoadComplete(pLoader:GameLoader):Void {
		pLoader.off(LoadEventType.PROGRESS, onLoadProgress);
		GraphicLoader.getInstance().destroyLoadscreenSprite();

		//initialise le gestionnaire de settings
		Metadatas.init();

		// transmet au StateGraphic la description des planches de Sprites utilisées par les instances de StateGraphic
		MovieClipAnimFactory.addTextures(GameLoader.getContent("graphics.json"));
		//MovieClipAnimFactory.addTextures(GameLoader.getContent("assets.json"));
		//MovieClipAnimFactory.addTextures(GameLoader.getContent("bakckground.json"));
		///StateFlumpMoviaddTextures(GameLoader.getContent("library.json"));
		// transmet au StateGraphic la description des boxes de collision utilisées par les instances de StateGraphic
		//StateGraphic.addBoxes(GameLoader.getContent(""));

		//initialise le builder d'UI
		UIBuilder.addDescriptions("popin.json", "com.isartdigital.builder.ui.buttons");
		UIBuilder.addDescriptions("shop.json", "com.isartdigital.builder.ui.buttons");
		UIBuilder.addDescriptions("hud.json", "com.isartdigital.builder.ui.buttons");
		UIBuilder.addDescriptions("hudparade.json", "com.isartdigital.builder.ui.buttons");
		UIBuilder.addDescriptions("ftue.json", "com.isartdigital.builder.ui.buttons");
		UIBuilder.addDescriptions("pnj.json", "com.isartdigital.builder.ui.buttons");
		UIBuilder.addDescriptions("pinata.json", "com.isartdigital.builder.ui.buttons");

		UIBuilder.setPackages("com.isartdigital.builder.ui.buttons", "com.isartdigital.builder.ui.hud", "com.isartdigital.builder.ui.items");

		UIBuilder.addTextStyle(Std.string(GameLoader.getContent("text/texts_popin.json")));
		UIBuilder.addTextStyle(Std.string(GameLoader.getContent("text/texts_hud.json")));
		UIBuilder.addTextStyle(Std.string(GameLoader.getContent("text/texts_hudparade.json")));
		UIBuilder.addTextStyle(Std.string(GameLoader.getContent("text/texts_shop.json")));
		UIBuilder.addTextStyle(Std.string(GameLoader.getContent("text/texts_ftue.json")));
		UIBuilder.addTextStyle(Std.string(GameLoader.getContent("text/texts_pnj.json")));
		UIBuilder.addTextStyle(Std.string(GameLoader.getContent("text/texts_pinata.json")));

		showSplashScreen();

		untyped Browser.window.destroyAccount = destroyAccount;
	}

	private function showSplashScreen():Void {
		splashScreenAsset = new StateGraphic(ISART_DIGITAL_LOGO_ASSET);
		splashScreenAsset.scale = new Point(0.5, 0.5);
		GraphicLoader.getInstance().addChild(splashScreenAsset);
		Timer.delay(function() {
			GraphicLoader.getInstance().removeChild(splashScreenAsset);
			assetsLoaded = true;
			tryToStartGame();
		}, SPLASH_SCREEN_DURATION);
	}

	private function destroyAccount():Void {
		Browser.getLocalStorage().removeItem(Ftue.LOCALSTORAGE_STEP_KEY);
		Api.user.destroy(function(result:String):Void {
			Browser.location.reload();
		});
	}

	/**
	 * Essaye de charger le jeu (Si les conditions necessaires sont valide)
	 */

	private function tryToStartGame() {
		if (assetsLoaded && userInfoLoaded && facebookConnected) {
			startGame();
		}
	}

	/**
	 * Démarre le jeu
	 */

	private function startGame() {
		Localization.setDataLocalization(locale);
		createFooter();
		UIManager.getInstance().startGame();
		GameManager.getInstance().start();
	}

	private function createFooter() {
		footer = new Footer();
	}

	/**
	 * game loop
	 */

	private function gameLoop() {
		Timer.delay(gameLoop, Math.floor(1000 / FRAME_PER_SECOND));
		emit(EventType.GAME_LOOP);
	}

	private function renderLoop() {
		Timer.delay(renderLoop, Math.floor(1000 / FRAME_PER_SECOND));
		render();
	}

	/**
	 * Ecouteur du redimensionnement
	 * @param	pEvent evenement de redimensionnement
	 */

	public function resize(pEvent:EventTarget = null):Void {
		renderer.resize(DeviceCapabilities.width, DeviceCapabilities.height);
		GameStage.getInstance().resize();
	}

	/**
	 * fait le rendu de l'écran
	 */

	private function render():Void {
		renderer.render(stage);
	}

	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */

	public function destroy():Void {
		Browser.window.removeEventListener(EventType.RESIZE, resize);
		instance = null;
	}

	private static function importClasses():Void {
		AdButton;
		BaseBuildingHUD;
		BuildingInfo;
		BuildingInShop;
		BuyHardButton;
		BuyOfferingButton;
		BuyPesosButton;
		CancelButton;
		CashButton;
		CloseButton;
		ColorButton;
		ContinueHardButton;
		CreditButton;
		DeleteButton;
		DeleteConfirm;
		Disclaimer_item;
		FtueUI;
		DisableButton;
		DotButton;
		GoldButton;
		GoldCurrency;
		HardBuildConfirm;
		HudParade;
		ItemBuilding;
		ItemRessource;
		LanternInfo;
		LeftButton;
		LevelCurrency;
		MissionAsset;
		MissionItem;
		MissionPanelItem;
		MoveButton;
		NotificationButton;
		NextFtueButton;
		OfferingButton;
		OfferingsCurrency;
		OkFtueButton;
		ParadeButton;
		ParadeContinue;
		ParadeMoreButton;
		ResourcesView;
		RessourceInShop;
		RewardBuilding;
		RewardButton;
		RightButton;
		SFXButton;
		ShareButton;
		SettingButton;
		ShopBuilding;
		ShopBuildingButton;
		ShopButton;
		ShopBuyHardButton;
		ShopBuySoftButton;
		ShopRessourceButton;
		SoundButton;
		SpiceButton;
		SpiceCurrency;
		TimerParade;
		Tutor;
		UpgradeButton;
		UpgradeConfirm;
		UpgradeDisableButton;
		UpgradeValideButton;
		ValideButton;
	}

	/**
	 * Fonction appellé quand la connection à facebook est réussi
	 */

	private function onFacebookLogin():Void {
		Facebook.api(Facebook.uid, { fields: "first_name,last_name,bio,email,picture,locale" }, callBackApi);
	}

	private function callBackApi(pData:Dynamic):Void {
		if (pData == null) trace("Erreur facebook API"); else if (pData.error != null) trace(pData.error); else {
			if (pData.id == null) {
				throw 'Facebook connection callback : NO INTERNET CONEXION (Token null)';
			}
			FacebookPicture.load(pData.picture.data.url);
			mail = pData.email;
			firstname = pData.first_name;
			lastname = pData.last_name;
			token = pData.id;
			locale = cast(pData.locale, String).split('_')[0];
			storeToken(pData.id);
		};
	}

	private function storeToken(token:String):Void {
		facebookConnected = true;
		Browser.getLocalStorage().setItem('token', token);
		Api.getInstance();
		Api.token = token;
		loadUserInfos();
	}


	private function callBackUI(pData:Dynamic):Void {
		if (pData == null) trace("Erreur facebook API"); else if (pData.error_message != null) trace(pData.error_message); else trace(pData);
	}
}
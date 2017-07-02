package com.isartdigital.builder;

import com.isartdigital.builder.ui.buttons.AdButton;
import com.isartdigital.builder.ui.buttons.ContinueHardButton;
import com.isartdigital.builder.ui.items.ItemRessource;
import com.isartdigital.builder.ui.items.RessourceInShop;
import com.isartdigital.builder.ui.popin.HardBuildConfirm;
import com.isartdigital.builder.ui.popin.ParadeContinue;
import Math;
import Std;
import haxe.Timer;
import com.isartdigital.utils.Time;
import com.isartdigital.builder.game.manager.Settings;
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
import com.isartdigital.services.FacebookPicture;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.ResponseDef;
import com.isartdigital.builder.api.ApiUtils;
import com.isartdigital.builder.game.def.UserInfoDef;
import com.isartdigital.builder.game.manager.ExperienceManager;
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
import com.isartdigital.builder.ui.items.UpgradeComfirm;
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
import com.isartdigital.services.Ads;
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
class Main extends EventEmitter
{
	private static inline var FRAME_PER_SECOND:Int = 30;
	
	
	private var increase:Bool = true;
	/**
	 * chemin vers le fichier de configuration
	 */
	private static var configPath:String = "config.json";	
	
	/**
	 * instance unique de la classe Main
	 */
	private static var instance: Main;
	
	/**
	 * Si le /me a été chargé ou non
	 */
	private var userInfoLoaded:Bool = false;
	
	/**
	 * Si les assets on été chargé ou non
	 */
	private var assetsLoaded:Bool = false;
	
	/**
	 * renderer (WebGL ou Canvas)
	 */
	public var renderer:WebGLRenderer;
	
	/**
	 * Element racine de la displayList
	 */
	public var stage:Container;
	
	/**
	 * initialisation générale
	 */
	private static function main ():Void {
		Main.getInstance();
	}

	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Main {
		if (instance == null) instance = new Main();
		return instance;
	}
	
	/**
	 * création du jeu et lancement du chargement du fichier de configuration
	 */
	private function new () {
		super();

		// Hack temporaire pour forcer la connexion sur mon compte si c'est un build cocoon
		if (DeviceCapabilities.isCocoonJS) {
			Browser.getLocalStorage().setItem('token', '1071918536161216');
		}

		if (Browser.getLocalStorage().getItem('token') == null) {
			Browser.location.href = '/';
		}

		Api.getInstance();
		loadUserInfos();
		
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
		Config.init(Reflect.field(pLoader.resources,configPath).data);
		
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
		lLoader.addAssetFile("preload.png");
		lLoader.addAssetFile("preload_bg.png");		
		
		lLoader.once(LoadEventType.COMPLETE, loadAssets);
		lLoader.load();
	}
	
	/**
	 * lance le chargement principal
	 */
	private function loadAssets (pLoader:GameLoader): Void {
		
		var lLoader:GameLoader = new GameLoader();
		
		lLoader.addTxtFile("shop.json");
		lLoader.addTxtFile("hud.json");
		lLoader.addTxtFile("popin.json");
		lLoader.addTxtFile("hudparade.json");
		
		lLoader.addSoundFile("sounds.json");
		
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

		lLoader.addTxtFile("json/en.json");
		lLoader.addTxtFile("json/fr.json");
		
		
		lLoader.addAssetFile("graphics.json");
		lLoader.addAssetFile("background.json");
		
		lLoader.addTxtFile("text/texts_hud.json");
		lLoader.addTxtFile("text/texts_hudparade.json");
		lLoader.addTxtFile("text/texts_popin.json");
		lLoader.addTxtFile("text/texts_shop.json");
		lLoader.addTxtFile("text/texts_ingame.json");
		
		lLoader.addAssetFile("Citizen.png");
		
		lLoader.addAssetFile(DeviceCapabilities.textureType+"/buildings/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType+"/fx/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType+"/popin/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType+"/shop/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType+"/hud/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType+"/hudparade/library.json");
		
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
		
		if (lData.error) {
			ApiUtils.displayError(lData.errorCode, lData.errorMessage);
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
	private function onLoadProgress (pLoader:GameLoader): Void {
		GraphicLoader.getInstance().update(pLoader.progress/100);
	}
	
	/**
	 * initialisation du jeu
	 * @param	pEvent evenement de chargement
	 */
	private function onLoadComplete (pLoader:GameLoader): Void {
		
		pLoader.off(LoadEventType.PROGRESS, onLoadProgress);
		
		//initialise le gestionnaire de settings
		Settings.init();
		
		// transmet au StateGraphic la description des planches de Sprites utilisées par les instances de StateGraphic
		MovieClipAnimFactory.addTextures(GameLoader.getContent("graphics.json"));
		MovieClipAnimFactory.addTextures(GameLoader.getContent("assets.json"));
		MovieClipAnimFactory.addTextures(GameLoader.getContent("bakckground.json"));
		///StateFlumpMoviaddTextures(GameLoader.getContent("library.json"));
		// transmet au StateGraphic la description des boxes de collision utilisées par les instances de StateGraphic
		StateGraphic.addBoxes(GameLoader.getContent(""));
		
		//initialise le builder d'UI
		UIBuilder.addDescriptions("popin.json", "com.isartdigital.builder.ui.buttons");
		UIBuilder.addDescriptions("shop.json", "com.isartdigital.builder.ui.buttons");
		UIBuilder.addDescriptions("hud.json", "com.isartdigital.builder.ui.buttons");
		UIBuilder.addDescriptions("hudparade.json", "com.isartdigital.builder.ui.buttons");
		
		UIBuilder.setPackages("com.isartdigital.builder.ui.buttons", "com.isartdigital.builder.ui.hud", "com.isartdigital.builder.ui.items");
		
		UIBuilder.addTextStyle(Std.string(GameLoader.getContent("text/texts_popin.json")));
		UIBuilder.addTextStyle(Std.string(GameLoader.getContent("text/texts_hud.json")));
		UIBuilder.addTextStyle(Std.string(GameLoader.getContent("text/texts_hudparade.json")));
		UIBuilder.addTextStyle(Std.string(GameLoader.getContent("text/texts_shop.json")));
		UIBuilder.addTextStyle(Std.string(GameLoader.getContent("text/texts_popin.json")));
		
		//initialise la localization	
		Localization.setDataLocalization();
		
		assetsLoaded = true;
		tryToStartGame();
	}
	
	/**
	 * Essaye de charger le jeu (Si les conditions necessaires sont valide)
	 */
	private function tryToStartGame() {
		if (assetsLoaded && userInfoLoaded) {
			startGame();
		}
	}
	
	/**
	 * Démarre le jeu
	 */
	private function startGame() {
		UIManager.getInstance().startGame();
		GameManager.getInstance().start();
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
	public function resize (pEvent:EventTarget = null): Void {
		renderer.resize(DeviceCapabilities.width, DeviceCapabilities.height);
		GameStage.getInstance().resize();
	}
	
	/**
	 * fait le rendu de l'écran
	 */
	private function render (): Void {
		renderer.render(stage);
	}
		
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		Browser.window.removeEventListener(EventType.RESIZE, resize);
		instance = null;
	}
	
	private static function importClasses():Void {
		AdButton;
		BuildingInfo;
		BuildingInShop;
		BaseBuildingHUD;
		CloseButton;
		ColorButton;
		ContinueHardButton;
		CreditButton;
		DotButton;
		DeleteButton;
		DisableButton;
		GoldButton;
		GoldCurrency;
		HardBuildConfirm;
		HudParade;
		ItemBuilding;
		ItemRessource;
		LeftButton;
		LevelCurrency;
		MoveButton;
		NotificationButton;
		OfferingButton;
		OfferingsCurrency;
		ParadeButton;
		ParadeContinue;
		ParadeMoreButton;
		ResourcesView;
		RessourceInShop;
		RewardBuilding;
		RewardButton;
		RightButton;
		SFXButton;
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
		UpgradeButton;
		UpgradeComfirm;
		UpgradeDisableButton;
		UpgradeValideButton;
		ValideButton;	
		
	}
	
	/**
	 * Fonction appellé quand la connection à facebook est réussi
	 */
	private function onFacebookLogin ():Void  {
		Facebook.api(Facebook.uid, { fields: "first_name,last_name,bio,email,picture" }, callBackApi);
		// Facebook.ui( { method: 'share', href: 'https://developers.facebook.com/docs/' }, callBackUI);
	}
	
	private function callBackApi(pData:Dynamic):Void {
		if (pData == null) trace("Erreur facebook API");
		else if (pData.error != null) trace (pData.error);
		else {
			FacebookPicture.load(pData.picture.data.url);
			//Ads.getImage(cbAds);
			//Ads.getMovie(cbAds);
			//Wallet.getMoney(pData.email, cbAds);
			//Wallet.buy(pData.email, 10, cbAds);$
			//Bank.deposit(50, cbAds);
			//Bank.refund(50, cbAds);
		};
	}
	
	private function callBackUI(pData:Dynamic):Void {
		if (pData == null) trace("Erreur facebook API");
		else if (pData.error_message != null) trace (pData.error_message);
		else trace(pData);
	}
}
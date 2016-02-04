package com.isartdigital.builder;

import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.DataDef;
import com.isartdigital.builder.api.Utils;
import com.isartdigital.builder.game.def.UserInfoDef;
import com.isartdigital.builder.game.manager.MapManager;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.manager.Ressources;
import com.isartdigital.builder.ui.GraphicLoader;
import com.isartdigital.builder.ui.hud.GoldCurrency;
import com.isartdigital.builder.ui.hud.OfferingsCurrency;
import com.isartdigital.builder.ui.hud.SpiceCurrency;
import com.isartdigital.builder.ui.screens.TitleCard;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.builder.ui.uimodule.ColorButton;
import com.isartdigital.builder.ui.uimodule.DeleteButton;
import com.isartdigital.builder.ui.uimodule.MoveButton;
import com.isartdigital.builder.ui.uimodule.UpgradeButton;
import com.isartdigital.builder.ui.uimodule.PlayButton;
import com.isartdigital.services.Ads;
import com.isartdigital.services.Bank;
import com.isartdigital.services.Users;
import com.isartdigital.services.Wallet;
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
import haxe.Http;
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
	
	private var increase:Bool = true;
	/**
	 * chemin vers le fichier de configuration
	 */
	private static inline var CONFIG_PATH:String = "config.json";	
	
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
		
		if (Browser.getLocalStorage().getItem('token') == null) {
			Browser.location.href = '../';
		}
		
		Api.getInstance();
		loadUserInfos();
		
		var lOptions:RenderingOptions = {};
		//lOptions.antialias = true;
		//lOptions.autoResize = true;
		lOptions.backgroundColor = 0x999999;
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
		
		lConfig.add(CONFIG_PATH);
		lConfig.once(LoadEventType.COMPLETE, preloadAssets);
		
		lConfig.load();
	}
	
	/**
	 * charge les assets graphiques du preloader principal
	 */
	private function preloadAssets(pLoader:Loader):Void {
		
		// initialise les paramètres de configuration
		Config.init(Reflect.field(pLoader.resources,CONFIG_PATH).data);
		
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
		
		lLoader.addTxtFile("ui.json");
		
		//lLoader.addTxtFile("boxes.json");
		lLoader.addSoundFile("sounds.json");

		lLoader.addTxtFile("json/basemap.json");
		lLoader.addTxtFile("json/building.json");
		
		lLoader.addTxtFile("json/en.json");
		lLoader.addTxtFile("json/localization/fr.json");
		
		lLoader.addAssetFile("graphics.json");
		lLoader.addAssetFile("background.json");
		
		lLoader.addTxtFile("hd/ui/textsUI.json");
		
		lLoader.addAssetFile("Citizen.png");
		
		lLoader.addAssetFile(DeviceCapabilities.textureType+"/ingame/library.json");
		lLoader.addAssetFile(DeviceCapabilities.textureType+"/ui/library.json");
		
		lLoader.addFontFile("fonts.css");
		
		lLoader.on(LoadEventType.PROGRESS, onLoadProgress);
		lLoader.once(LoadEventType.COMPLETE, onLoadComplete);
		
		// affiche l'écran de préchargement
		UIManager.getInstance().openScreen(GraphicLoader.getInstance());
		
		Browser.window.requestAnimationFrame(cast gameLoop);
		
		lLoader.load();
	}
	
	
	/**
	 * Charge le /userInfos du jeu
	 */
	private function loadUserInfos():Void {
		Api.user.getUserInfo(cbOnUserInfosReceipt);
	}
	
	private function cbOnUserInfosReceipt(pData:String):Void {
		var lData:DataDef = cast(Json.parse(pData));
		var userInfos:UserInfoDef;
		
		if (lData.error) {
			Utils.errorHandler(lData.errorCode, lData.errorMessage);
			return;
		}
		
		Users.infos = lData.data;
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
		
		// transmet au StateGraphic la description des planches de Sprites utilisées par les instances de StateGraphic
		MovieClipAnimFactory.addTextures(GameLoader.getContent("graphics.json"));
		MovieClipAnimFactory.addTextures(GameLoader.getContent("assets.json"));
		MovieClipAnimFactory.addTextures(GameLoader.getContent("bakckground.json"));
		///StateFlumpMoviaddTextures(GameLoader.getContent("library.json"));
		// transmet au StateGraphic la description des boxes de collision utilisées par les instances de StateGraphic
		StateGraphic.addBoxes(GameLoader.getContent(""));
		
		//initialise le builder d'UI
		UIBuilder.init("ui.json", "com.isartdigital.builder.ui.uimodule", "com.isartdigital.builder.ui.hud");
		UIBuilder.addTextStyle(Reflect.field(pLoader.resources, "assets/hd/ui/textsUI.json").data);
		
		//Localization.getInstance().selectJson(Localization.LANG_EN, pLoader);
		trace (Json.stringify(GameLoader.getContent("en.json")));
		
		trace (Reflect.field(pLoader.resources, "assets/json/en.json").data);
		Localization.getInstance().setDataLocalization(Json.stringify(GameLoader.getContent("json/en.json")));
		
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
		//Ouvre la TitleClard
		//UIManager.getInstance().openScreen(TitleCard.getInstance());
		UIManager.getInstance().startGame();
		GameManager.getInstance().start();
		Ads.getImage(cbAds);
	}
	
	/**
	 * game loop
	 */
	private function gameLoop() {
		Browser.window.requestAnimationFrame(cast gameLoop);
		
		render();		
		emit(EventType.GAME_LOOP);
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
		SpiceCurrency;
		GoldCurrency;
		OfferingsCurrency;
		MoveButton;
		UpgradeButton;
		DeleteButton;
		ColorButton;
	}
	
	/**
	 * Fonction appellé quand la connection à facebook est réussi
	 */
	private function onFacebookLogin ():Void  {
		//Facebook.api(Facebook.uid, { fields: "first_name,last_name,bio,email" }, callBackApi);
		// Facebook.ui( { method: 'share', href: 'https://developers.facebook.com/docs/' }, callBackUI);
	}
	
	private function callBackApi(pData:Dynamic):Void {
		if (pData == null) trace("Erreur facebook API");
		else if (pData.error != null) trace (pData.error);
		else {
			//Ads.getImage(cbAds);
			//Ads.getMovie(cbAds);
			//Wallet.getMoney(pData.email, cbAds);
			//Wallet.buy(pData.email, 10, cbAds);$
			//Bank.deposit(50, cbAds);
			//Bank.refund(50, cbAds);
		};
	}
	
	private function cbAds(pData:Dynamic):Void {
		if (pData == null) trace("Erreur Ads API");
		else if (pData.error != null) trace (pData.error);
		else {
			trace(pData);
		};
	}
	
	private function callBackUI(pData:Dynamic):Void {
		if (pData == null) trace("Erreur facebook API");
		else if (pData.error_message != null) trace (pData.error_message);
		else trace(pData);
	}
}
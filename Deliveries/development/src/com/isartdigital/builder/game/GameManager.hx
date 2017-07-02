package com.isartdigital.builder.game;

import com.isartdigital.builder.game.animation.fishs.FishsAmbiance;
import com.isartdigital.utils.sounds.SoundManager;
import com.isartdigital.utils.sounds.SoundNames;
import haxe.Timer;
import haxe.Timer;
import com.isartdigital.builder.api.ApiUtils;
import com.isartdigital.builder.api.Api;
import com.isartdigital.services.Users;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.animation.petals.PetalsSalve;
import com.isartdigital.builder.game.animation.fireworks.FireworksAmbiance;
import eventemitter3.EventEmitter;
import haxe.Timer;
import com.isartdigital.builder.game.animation.AnimationNames;
import com.isartdigital.builder.game.animation.fireworks.AnimationFireworksBuilder;
import com.isartdigital.builder.ui.hud.Hud;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.game.ftue.FtueObserver;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.game.utils.Metadatas;
import com.isartdigital.builder.ui.ftue.TutorPosture;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.loader.GameLoader;
import pixi.core.graphics.Graphics;
import com.isartdigital.utils.Debug;
import com.isartdigital.builder.game.parade.Parade;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.builder.game.clipping.Clipping;
import com.isartdigital.utils.ui.Button;
import com.isartdigital.builder.game.def.interactionEvent.InteractionEventDef;
import com.isartdigital.utils.events.Event;
import com.isartdigital.utils.events.TouchEventType;
import com.isartdigital.builder.game.sprites.buildings.BuildingCreator;
import com.isartdigital.builder.game.map.GMapCreator;
import com.isartdigital.builder.api.ResponseDef;
import com.isartdigital.builder.game.manager.BackgroundManager;
import com.isartdigital.builder.game.manager.ExperienceManager;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.citizen.Citizen;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.builder.ui.CheatPanel;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.events.EventType;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.game.Camera;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.IStateMachine;
import com.isartdigital.utils.system.DeviceCapabilities;
import haxe.Json;
import js.Browser;
import pixi.core.math.Point;
import pixi.core.math.shapes.Rectangle;
import pixi.interaction.EventTarget;

/**
 * Manager (Singleton) en charge de gérer le déroulement d'une partie
 * @author Mathieu ANTHOINE
 */
class GameManager extends EventEmitter
{
	/**
	 * instance unique de la classe GameManager
	 */
	private static var instance: GameManager;

	public static inline var EVENT_INTERACTION:String = "EVENT_INTERACTION";
	public static inline var END_PARADE_REQUEST:String = "END_PARADE_REQUEST";

	private static inline var INTERVAL_BEFORE_PINATA_REQUEST:Float = 30000;
	private static inline var TIME_BEFORE_PINATA_SHOW:Float = 2000;
	private static inline var DELAY_TO_FIRST_FTUE_POPIN:Float = 2000;

	public var mousePosition:Point = new Point( -1, -1);
	public var screenRect:Rectangle;

	private var buildingCreator:BuildingCreator;
	private var clipping:Clipping;
	public	var ftue:Ftue;
	private var ftueObserver:FtueObserver;
	
	public static var pathfindingWithObstacle:Bool = true;
	
	public function getScreenRect():Rectangle {
		return screenRect;
	}
	
	private var parade:Parade = null;
	
	public function getParadeInstance () : Parade {
		return parade;
	}
	
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): GameManager {
		if (instance == null) instance = new GameManager();
		return instance;
	}
	
	private function new() {
		super();
		
		on(END_PARADE_REQUEST, onParadeRewardConfirm);
	}
	
	private function onParadeRewardConfirm (event:Dynamic) : Void {
		if (isParadeActive()) endParade();
		
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
	}
	
	private function refreshMouseCoordinates(event:InteractionEventDef) {
		var position:Point = GameStage.getInstance().getGameContainer().toLocal(new Point(Event.getClientXIn(event), Event.getClientYIn(event)));
		mousePosition.set(position.x, position.y);
	}

	private function emitInteractionEvent(event:InteractionEventDef):Void {
		if (!Button.buttonWasJustClicked) refreshMouseCoordinates(event);
		var position:Point = GameStage.getInstance().getGameContainer().toLocal(new Point(Event.getClientXIn(event), Event.getClientYIn(event)));

		if (Debug.debugPositionOnClick) {
			var debug:Point = IsoManager.isoToModelView(position);
			untyped console.log(GMap.globalMap[Math.floor(debug.x)][Math.floor(debug.y)]);
			trace('depth : ' + IsoManager.depthMap[Math.floor(debug.x)][Math.floor(debug.y)]);

			tryToAddFakeLanternDebug(debug, position);

			Tile.getTileAt(debug);
		}

		Main.getInstance().emit(EVENT_INTERACTION, position);
	}

	private function tryToAddFakeLanternDebug(debug, position):Void {
		if (!Camera.getInstance().hasMoved && Debug.debugIlluminateTileAtClick) {
			Debug.addDebugPointAt(position);
			Tile.illumineTileInRadiusAt(debug, Tile.getLanternActionRadius());

			var positions:Array<Point> = [];
			var debugPointToRemove:Graphics;
			for (debugPoint in Debug.debugPointsList) {
				positions.push(IsoManager.isoToModelView(debugPoint.position, true));
			}
			trace(Json.stringify(positions));
		}
	}
	
	//exemple callback pour api.user.create
	private function cb_createUser (pData:String): Void {
		var lData:ResponseDef = cast(Json.parse(pData));
		
		if (lData.error)
		{
			trace(lData.errorMessage);
			return;
		}
	}
	
	private function cb_resourceAll(pData:String):Void {
		var lData:ResponseDef = cast(Json.parse(pData));
		
		if (lData.error)
		{
			Debug.error(lData.errorMessage);
			return;
		}
	}
	
	public function startParade (hardPurchase:Bool) {
		parade = new Parade();
		parade.start(hardPurchase);
		Citizen.hideAllPassiveCitizens();
		PetalsSalve.launchOnBuildableTiles(PetalsSalve.PETALS_COUNT_FOR_GLOBAL_SALVE);
		
		SoundManager.playMusic(SoundNames.MUSIQUE_PARADE);
	}
	
	public function dontContinueParade () {
		parade.end();
	}
	
	public function continueParade () {
		parade.addTime(30);
	}
	
	public function endParade () {	
		SoundManager.playMusic(SoundNames.MUSIQUE_AMBIANCE);
		parade.destroy();
		parade = null;
		pathfindingWithObstacle = true;
		Citizen.reInitAllPassiveCitizenPath();
		Citizen.showAllPassiveCitizens();
		PetalsSalve.launchOnBuildableTiles(PetalsSalve.PETALS_COUNT_FOR_GLOBAL_SALVE);
	}

	public function isParadeActive():Bool {
		return parade != null;
	}
	
	public function start (): Void {
		refreshScreenRect();
		// Focus de la camera
		Camera.getInstance().init();

		// Event de souris mouseMove
		Browser.window.addEventListener(MouseEventType.MOUSE_MOVE, refreshMouseCoordinates);
		Browser.window.addEventListener(MouseEventType.MOUSE_UP, emitInteractionEvent);
		Browser.window.addEventListener(TouchEventType.TOUCH_END, emitInteractionEvent);
		Browser.window.addEventListener(TouchEventType.TOUCH_MOVE, refreshMouseCoordinates);

		// Initialisation de l'isoManager
		IsoManager.init(Config.tileWidth, Config.tileHeight);

		// demande au Manager d'interface de se mettre en mode "jeu"
		UIManager.getInstance().startGame();

		// enregistre le GameManager en tant qu'écouteur de la gameloop principale
		Main.getInstance().on(EventType.GAME_LOOP, gameLoop);

		// début de l'initialisation du jeu
		CheatPanel.getInstance().ingame();
		GMapCreator.create();

		// Refresh le screen rect
		refreshScreenRect();

		RessourceManager.getInstance().start();
		ExperienceManager.getInstance().start();

		buildingCreator = new BuildingCreator();
		buildingCreator.listenShopBuyEvents();

		clipping = new Clipping();
		clipping.initialise([
			ModelElementNames.BUILDING,
			ModelElementNames.TILE,
			ModelElementNames.BACKGROUND
		]);

		ftue = new Ftue(GameStage.getInstance().getFtueContainer());
		ftueObserver = new FtueObserver();

		if (!Users.infos.ftue_complet && Users.infos.experience == 0) {
			UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_FIRST_CONNEXION);
		}
		
		Citizen.reInitAllPassiveCitizenPath();
		
		dailyrewardRequest();

		GameStage.getInstance().on(EventType.RESIZE, onResize);
		SoundManager.canPlaySound = true;
		SoundManager.playMusic(SoundNames.MUSIQUE_AMBIANCE);
	}

	private function dailyrewardRequest():Void {
		if (Users.infos.ftue_complet) {
			Api.user.getDailyreward(launchDailyrewardIfReady);
		}
	}

	private function launchDailyrewardIfReady(results:String):Void {
		if (ApiUtils.isErrorInto(results)) {
			ApiUtils.parseAndHandleErrorData(results);
		}
		var isReady:Dynamic = ApiUtils.getParsedResultOf(results);

		if (isReady) {
			Api.user.dailyrewardUpdate(getDailyReward);
		} else {
			Timer.delay(dailyrewardRequest, INTERVAL_BEFORE_PINATA_REQUEST);
		}
	}

	public function getDailyReward(results:String):Void {
		if (ApiUtils.isErrorInto(results)) {
			ApiUtils.parseAndHandleErrorData(results);
		}

		Timer.delay(function () {
			UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_PINATA, ApiUtils.getParsedResultOf(results));
		}, TIME_BEFORE_PINATA_SHOW);
	}

	/**
	 * boucle de jeu (répétée à la cadence du jeu en fps)
	 */
	public function gameLoop (pEvent:EventTarget): Void {
		BackgroundManager.getInstance().manage();

		refreshScreenRect();

		// le renderer possède une propriété plugins qui contient une propriété interaction de type InteractionManager
		// les instances d'InteractionManager fournissent un certain nombre d'informations comme les coordonnées globales de la souris

		clipping.update();

		Camera.getInstance().update();
		PetalsSalve.updatePetalsAmbiance();
		FishsAmbiance.updateFishAmbiance();

		doActions(cast Building.list);
		doActionParade();
		IsoManager.sortAll();
	}

	private function refreshScreenRect():Void {
		screenRect = DeviceCapabilities.getScreenRect(GameStage.getInstance().getGameContainer());
		screenRect.x = Math.round(screenRect.x);
		screenRect.y = Math.round(screenRect.y);
	}
	
	private function doActions (list:Array<IStateMachine>) {
		for (i in 0...list.length) list[i].doAction();
	}
		
	public function moveCitizen():Void {
		for (lCitizen in Citizen.list) {
			lCitizen.doAction();
		}
	}

	public function doActionParade():Void {
		if (parade != null) parade.doActionParade();
	}

	public function onResize():Void {
		clipping.displayAllModelsContainedInScreen();
	}

	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		Main.getInstance().off(EventType.GAME_LOOP,gameLoop);
		instance = null;
	}
}
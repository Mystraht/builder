package com.isartdigital.builder.game;

import com.isartdigital.builder.game.sprites.Background;
import com.isartdigital.builder.game.sprites.buildings.BuildingUtils;
import pixi.core.graphics.Graphics;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.builder.game.animation.AnimationHarvestBuilder;
import com.isartdigital.builder.game.animation.AnimationHarvest;
import com.isartdigital.builder.game.parade.Parade;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.builder.game.clipping.Clipping;
import com.isartdigital.utils.Localization;
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
import com.isartdigital.builder.game.sprites.Citizen;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.builder.ui.CheatPanel;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.events.EventType;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.game.Camera;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
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
class GameManager
{
	/**
	 * instance unique de la classe GameManager
	 */
	private static var instance: GameManager;

	public static inline var EVENT_INTERACTION:String = "EVENT_INTERACTION";

	public var mousePosition:Point = new Point( -1, -1);
	public var screenRect:Rectangle;

	private var buildingCreator:BuildingCreator;
	private var clipping:Clipping;

	public static var USE_MAP_WITH_OBSTACLE:Bool = true;
	
	public function get_ScreenRect():Rectangle {
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
	
	private function cb_resourceAll (pData:String) : Void
	{
		var lData:ResponseDef = cast(Json.parse(pData));
		
		if (lData.error)
		{
			Debug.error(lData.errorMessage);
			return;
		}
		
		trace(lData.data);
	}
	
	public function startParade (hardPurchase:Bool) {
		parade = new Parade();
		parade.start(hardPurchase);
	}
	
	public function dontContinueParade () {
		parade.end();
	}
	
	public function continueParade () {
		parade.addTime(30);
	}	
	
	public function endParade () {
		parade.destroy();
	}
	
	public function start (): Void {

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

		//Défini le screen rect
		screenRect = DeviceCapabilities.getScreenRect(GameStage.getInstance().getGameContainer());

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
	}
	
	/**
	 * boucle de jeu (répétée à la cadence du jeu en fps)
	 */
	public function gameLoop (pEvent:EventTarget): Void {
		BackgroundManager.getInstance().manage();
		
		screenRect = DeviceCapabilities.getScreenRect(GameStage.getInstance().getGameContainer());
		screenRect.x = Math.round(screenRect.x);
		screenRect.y = Math.round(screenRect.y);

		// le renderer possède une propriété plugins qui contient une propriété interaction de type InteractionManager
		// les instances d'InteractionManager fournissent un certain nombre d'informations comme les coordonnées globales de la souris

		clipping.update();

		Camera.getInstance().update();

		doActions(cast Building.list);
		
		doActionParade();		
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

	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		Main.getInstance().off(EventType.GAME_LOOP,gameLoop);
		instance = null;
	}
}
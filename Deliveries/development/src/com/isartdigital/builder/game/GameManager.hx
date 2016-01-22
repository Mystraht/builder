package com.isartdigital.builder.game;

import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.type.BuildingType;
import com.isartdigital.builder.api.DataDef;
import com.isartdigital.builder.game.def.buildings.BuildingDef;
import com.isartdigital.builder.game.def.BuildingSavedDef;
import com.isartdigital.builder.game.def.TileSavedDef;
import com.isartdigital.builder.game.manager.ClippingManager;
import com.isartdigital.builder.game.manager.MapManager;
import com.isartdigital.builder.game.pooling.PoolObject;
import com.isartdigital.builder.game.sprites.Building;
import com.isartdigital.builder.game.sprites.Citizen;
import com.isartdigital.builder.game.sprites.SpriteObject;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.builder.game.utils.TypeDefUtils;
import com.isartdigital.builder.ui.CheatPanel;
import com.isartdigital.builder.ui.hud.Hud;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.events.EventType;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.facebook.Facebook;
import com.isartdigital.utils.game.Camera;
import com.isartdigital.utils.game.CollisionManager;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.game.IStateMachine;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.Localization;
import com.isartdigital.utils.system.DeviceCapabilities;
import haxe.Json;
import js.Browser;
import js.html.MouseEvent;
import pixi.core.math.Point;
import pixi.core.math.shapes.Rectangle;
import pixi.interaction.EventTarget;
import pixi.interaction.InteractionManager;

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
	
	public var mousePosition:Point = new Point( -1, -1);
	
	public var screenRect:Rectangle;
	
	public function get_ScreenRect():Rectangle {
		return screenRect;
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
	
	private function refreshMouseCoordinates(pEvent:MouseEvent) {
		var position:Point = GameStage.getInstance().getGameContainer().toLocal(new Point(pEvent.layerX, pEvent.layerY));
		mousePosition.set(position.x, position.y);
	}
	
	//exemple callback pour api.user.create
	private function cb_createUser (pData:String): Void {
		//var jData:Json = Json.parse(pData);
		var lData:DataDef = cast(Json.parse(pData));
		
		if (lData.error)
		{
			trace(lData.errorMessage);
			return;
		}
	}
	
	private function cb_resourceAll (pData:String) : Void
	{
		var lData:DataDef = cast(Json.parse(pData));
		
		if (lData.error)
		{
			Debug.error(lData.errorMessage);
			return;
		}
		
		trace(lData.data);
	}
	
	public function start (): Void {		
		//Localization.getInstance().selectJson("fr");
		
		// Focus de la camera 
		var lCamera:Camera = Camera.getInstance();
		
		GameStage.getInstance().getGameContainer().addChild(lCamera.cameraFocus);
		lCamera.setTarget(GameStage.getInstance().getGameContainer());
		lCamera.setFocus(lCamera.cameraFocus);
		
		// Event de souris mouseMove
		Browser.window.addEventListener(MouseEventType.MOUSE_MOVE, refreshMouseCoordinates);
		
		// Initialisation de l'isoManager
		IsoManager.init(Config.tileWidth, Config.tileHeight);
		
		// demande au Manager d'interface de se mettre en mode "jeu"
		UIManager.getInstance().startGame();
		
		// enregistre le GameManager en tant qu'écouteur de la gameloop principale
		Main.getInstance().on(EventType.GAME_LOOP, gameLoop);	
		
		// début de l'initialisation du jeu
		CheatPanel.getInstance().ingame();
		MapManager.getInstance().generateMap();
		
		//Centre la caméra
		Camera.getInstance().centerView();
		
		//Défini le screen rect
		screenRect = DeviceCapabilities.getScreenRect(GameStage.getInstance().getGameContainer());
	
		//new clipping
		var lTypeDefArray:Array<Dynamic> = new Array<Dynamic> ();
		var ltd:TileSavedDef = {x:null, y:null, isBuildable:null};
		var lbd:BuildingSavedDef = {x:null, y:null , name:null, buildingLevel:null};
		lTypeDefArray.push(ltd);
		lTypeDefArray.push(lbd);
			
		//initialise le clipping
		ClippingManager.getInstance().setOn(MapManager.getInstance().globalMap, [cast(Tile.list), cast(Building.list)], new Point(Config.tileWidth / 2, Config.tileHeight / 2), lTypeDefArray, [Tile, Building], get_ScreenRect);
		
		var lCitizen:Citizen = new Citizen();
		GameStage.getInstance().getGameContainer().addChild(lCitizen);
		
		lCitizen.start();
		
		//Localization.getInstance().getText("title_screen_play");
		ClippingManager.getInstance().addAllObjetInView();
		
		Hud.getInstance().refreshHUD();
		RessourceManager.getInstance().start();
		RessourceManager.getInstance().updateRessources();
	}
	
	/**
	 * boucle de jeu (répétée à la cadence du jeu en fps)
	 */
	public function gameLoop (pEvent:EventTarget): Void {
		screenRect = DeviceCapabilities.getScreenRect(GameStage.getInstance().getGameContainer());
		screenRect.x = Math.round(screenRect.x);
		screenRect.y = Math.round(screenRect.y);
		
		// le renderer possède une propriété plugins qui contient une propriété interaction de type InteractionManager
		// les instances d'InteractionManager fournissent un certain nombre d'informations comme les coordonnées globales de la souris
		Camera.getInstance().move();
		
		ClippingManager.getInstance().manage();
	
		
		doActions(cast Building.list);
		
		// Pour le debug :
		// MapManager.getInstance().displayTilePositionUnderMouse();
		// moveCitizen();
	}
	
	
	private function doActions (list:Array<IStateMachine>) {
		for (i in 0...list.length) list[i].doAction();
	}
	
	
	private function moveCitizen():Void {
		for (lCitizen in Citizen.list) {
			lCitizen.doAction();
		}
	}

	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		Main.getInstance().off(EventType.GAME_LOOP,gameLoop);
		instance = null;
	}

}
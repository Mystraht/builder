package com.isartdigital.builder.game;

import com.isartdigital.builder.game.manager.ParadeManager;
import com.isartdigital.builder.game.sprites.buildings.BuildingCreator;
import com.isartdigital.builder.game.map.GMapCreator;
import motion.Actuate;
import com.isartdigital.builder.api.DataDef;
import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.manager.BackgroundManager;
import com.isartdigital.builder.game.manager.ClippingManager;
import com.isartdigital.builder.game.manager.ExperienceManager;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.sprites.Background;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.sprites.Citizen;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.builder.game.utils.TypeDefUtils;
import com.isartdigital.builder.ui.CheatPanel;
import com.isartdigital.builder.ui.hud.BaseBuildingHUD;
import com.isartdigital.builder.ui.hud.ConfirmPanel;
import com.isartdigital.builder.ui.hud.Hud;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.builder.ui.uimodule.ValideButton;
import com.isartdigital.services.FacebookPicture;
import com.isartdigital.services.Users;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.events.EventType;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.game.Camera;
import com.isartdigital.utils.game.GameObject;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.game.IStateMachine;
import com.isartdigital.utils.system.DeviceCapabilities;
import haxe.Json;
import js.Browser;
import js.html.MouseEvent;
import pixi.core.math.Point;
import pixi.core.math.shapes.Rectangle;
import pixi.core.sprites.Sprite;
import pixi.core.textures.Texture;
import pixi.interaction.EventTarget;
import pixi.loaders.Loader;

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

	public static inline var EVENT_MOUSE_UP:String = "EVENT_MOUSE_UP";

	public var mousePosition:Point = new Point( -1, -1);
	public var screenRect:Rectangle;

	private var buildingCreator:BuildingCreator;

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

	private function emitMouseUp(event:MouseEvent):Void {
		var position:Point = GameStage.getInstance().getGameContainer().toLocal(new Point(event.layerX, event.layerY));
		Main.getInstance().emit(EVENT_MOUSE_UP, position);
	}
	
	//exemple callback pour api.user.create
	private function cb_createUser (pData:String): Void {
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
		Camera.getInstance().init();
		
		// Event de souris mouseMove
		Browser.window.addEventListener(MouseEventType.MOUSE_MOVE, refreshMouseCoordinates);
		Browser.window.addEventListener(MouseEventType.MOUSE_UP, emitMouseUp);

		// Initialisation de l'isoManager
		IsoManager.init(Config.tileWidth, Config.tileHeight);
		
		// demande au Manager d'interface de se mettre en mode "jeu"
		UIManager.getInstance().startGame();
		
		// enregistre le GameManager en tant qu'écouteur de la gameloop principale
		Main.getInstance().on(EventType.GAME_LOOP, gameLoop);	
		
		// début de l'initialisation du jeu
		CheatPanel.getInstance().ingame();
		GMapCreator.create();
		
		//Centre la caméra
		//Camera.getInstance().centerView();
		
		//Défini le screen rect
		screenRect = DeviceCapabilities.getScreenRect(GameStage.getInstance().getGameContainer());
	
		//MapManagerTest clipping
		var lTypeDefArray:Array<Dynamic> = new Array<Dynamic> ();
		var ltd:TileModelDef = TypeDefUtils.tileModelDef;
		var lbd:BuildingModelDef = TypeDefUtils.buildingModelDef;
		lTypeDefArray.push(ltd);
		lTypeDefArray.push(lbd);
			
		//initialise le clipping
		ClippingManager.getInstance().setOn(GMap.globalMap, [cast(Tile.list), cast(Building.list)], new Point(Config.tileWidth / 2, Config.tileHeight / 2), lTypeDefArray, [Tile, Building], get_ScreenRect);
		
		/*
		var lCitizen:Citizen = MapManagerTest Citizen();
		GameStage.getInstance().getGameContainer().addChild(lCitizen);

		lCitizen.start();*/
		
		//Localization.getInstance().getText("title_screen_play");
		ClippingManager.getInstance().addAllObjetInView();
		
		RessourceManager.getInstance().start();
		ExperienceManager.getInstance().getLvl(Users.infos.experience);

		buildingCreator = new BuildingCreator();
		buildingCreator.listenShopBuyEvents();
		//var lTest:ConfirmPanel = MapManagerTest ConfirmPanel();
		//lTest.position.set(screenRect.x + 500, screenRect.y + 500);
		//GameStage.getInstance().getGameContainer().addChild(lTest);
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
		
		ClippingManager.getInstance().manage();
		Camera.getInstance().update();

		doActions(cast Building.list);
		
		// Pour le debug :
		moveCitizen();
		moveParade();
		
	}
	
	private function doActions (list:Array<IStateMachine>) {
		for (i in 0...list.length) list[i].doAction();
	}
		
	public function moveCitizen():Void {
		for (lCitizen in Citizen.list) {
			lCitizen.doAction();
		}
	}
	
	public function moveParade():Void {
		ParadeManager.getInstance().doActionNormal();
	}

	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		Main.getInstance().off(EventType.GAME_LOOP,gameLoop);
		instance = null;
	}
}
package com.isartdigital.builder.game.sprites.buildings;

import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.DataDef;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingSavedDef;
import com.isartdigital.builder.game.def.TileSavedDef;
import com.isartdigital.builder.game.manager.MapManager;
import com.isartdigital.builder.game.pooling.IPoolObject;
import com.isartdigital.builder.game.utils.TypeDefUtils;
import com.isartdigital.builder.ui.hud.BaseBuildingHUD;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.game.iso.IZSortable;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.ui.Screen;
import eventemitter3.EventEmitter;
import haxe.Json;
import js.html.MouseEvent;
import js.Lib;
import pixi.core.math.Point;
import pixi.display.FlumpMovie;
import pixi.extras.MovieClip;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Dorian
 */
class Building extends SpriteObject implements IZSortable implements IPoolObject
{
	public static var list:Array<Building> = new Array();
	
	public static var movingBuilding:Building;
	
	public var definition:BuildingDef;
	public var buildingLevel:Int = 0;
	
	public var colMin:UInt;
	public var colMax:UInt;
	public var rowMin:UInt;
	public var rowMax:UInt;
	
	private var positionBeforeStartMoving:Point = new Point(0, 0);

	public function new()
	{
		super();
		
		factory = new FlumpMovieAnimFactory();
		boxType = BoxType.NONE;
		
		interactive = true;
	}
	
	override public function init(pDefinition:Dynamic):Void 
	{
		var buildingModelPosition:Point = new Point(pDefinition.x, pDefinition.y);
		var buildingIsoPosition:Point = IsoManager.modelToIsoView(new Point(pDefinition.x, pDefinition.y));
		var tilesUnderBuilding:Array<TileSavedDef>;
		
		list.push(this);
		definition = getBuildingDefByName(pDefinition.name);
			
		colMin = Math.floor(toModel().y);
		colMax = Math.floor(toModel().y) + definition.size.height;
		rowMin = Math.floor(toModel().x);
		rowMax = Math.floor(toModel().x) + definition.size.width;
		
		x = buildingIsoPosition.x;
		y = buildingIsoPosition.y;
		buildingLevel = pDefinition.buildingLevel;
		
		assetName = definition.spriteName;
		
		tilesUnderBuilding = MapManager.getInstance().getTilesArray(buildingModelPosition, definition.size);
		MapManager.getInstance().setTilesBuildable(tilesUnderBuilding, false);
		MapManager.getInstance().addElementInGlobalMapAt(buildingModelPosition, TypeDefUtils.buildingSavedDef);
		
		addToStage();
	}
	
	private function addToStage():Void {
		setState(DEFAULT_STATE);
		cast(anim, FlumpMovie).gotoAndStop(buildingLevel);
		
		on(MouseEventType.CLICK, buildingClick);
		
		GameStage.getInstance().getBuildingsContainer().addChild(this);
		start();
	}
	
	override public function remove() :Bool
	{
		if (!super.remove()) {
			destroy();
			return true;
		};
		
		off(MouseEventType.CLICK, buildingClick);
		list.splice(list.indexOf(this), 1);
		
		return true;
	}
	
	override function doActionNormal():Void {
		super.doActionNormal();
		
		if (movingBuilding == this) {
			moveBuildingToCursor();
		}
	}
	
	
	/**
	 * Permet de récuperer le contenu de definiton d'un building (building.json) grâce à son nom
	 * @param	pName
	 */
	public static function getBuildingDefByName(pName:String):BuildingDef {
		var buildingsDef:Array<BuildingDef> = cast(GameLoader.getContent("json/building.json"));

		for (i in 0...buildingsDef.length) {
			if (buildingsDef[i].name == pName) {
				return buildingsDef[i];
			}
		}
		
		return null;
	}
	
	
	/**
	 * Upgrade un building
	 */
	public function upgradeBuilding():Void {
		buildingLevel++;
		cast(anim, FlumpMovie).gotoAndStop(buildingLevel);
	}
	
	
	/**
	 * Commence le deplacement d'un batiment
	 */
	public function buildingClick (event:Dynamic) {
		BaseBuildingHUD.getInstance().initHUD(function (p:EventTarget):Void { trace("OKLM POTPO"); }, function (p:EventTarget):Void { } );
		var lMapManager:MapManager = MapManager.getInstance();
		var tilesUnderBuilding:Array<TileSavedDef>;
		
		if (movingBuilding == this) {
			buildingRequest();
		} else {
			positionBeforeStartMoving = toModel(true);
			movingBuilding = this;
			tilesUnderBuilding = lMapManager.getTilesArray(positionBeforeStartMoving, definition.size);
			lMapManager.setTilesBuildable(tilesUnderBuilding, true);
		}
	}
	
	
	/**
	 * Stop le deplacement d'un batiment
	 */
	private function stopMoving () {
		movingBuilding = null;
	}
	
	
	/**
	 * Deplace le batiment sous le curseur de la souris
	 */
	private function moveBuildingToCursor():Void {
		var centerOfBuildingModel:Point = getBuildingPositionByCursor();
		
		centerOfBuildingModel.x = Math.round(centerOfBuildingModel.x);
		centerOfBuildingModel.y = Math.round(centerOfBuildingModel.y);
		
		position = IsoManager.modelToIsoView(centerOfBuildingModel);
	}
	
	
	/**
	 * Récupère la position du building qui ce place sous le curseur
	 * @return Point de la position du building sous le curseur (Model, non tronqué)
	 */
	private function getBuildingPositionByCursor():Point {
		var mousePosition:Point = GameManager.getInstance().mousePosition;
		var buildingOffset:Point = new Point(0, 0);
		var centerOfBuilding:Point = new Point(0, 0);
		
		buildingOffset.x = (definition.size.width - definition.size.height) / 2 * (Config.tileWidth / 2);
		buildingOffset.y = (definition.size.width + definition.size.height) / 2 * (Config.tileHeight / 2);
		
		centerOfBuilding.x = mousePosition.x + buildingOffset.x;
		centerOfBuilding.y = mousePosition.y + buildingOffset.y;

		return IsoManager.isoViewToModel(centerOfBuilding);
	}
	
	
	private function buildingRequest():Void {
		var destination:Point = getBuildingPositionByCursor();
		var buildingMover:BuildingMover = new BuildingMover(this, positionBeforeStartMoving);
		
		buildingMover.setDestination(destination.x, destination.y);
		
		if (buildingMover.canMove()) {
			buildingMover.move();
			setPositionBeforeStartMovingWith(destination);
			cancelMoving();
		}
	}
	
	private function setPositionBeforeStartMovingWith(newPosition:Point):Void {
		positionBeforeStartMoving.set(newPosition.x, newPosition.y);
	}
	
	
	/**
	 * Annule le deplacement du batiment actuellement en train de bouger et le remet à sa position initiale
	 */
	private static function cancelMoving():Void {
		var lMapManager:MapManager = MapManager.getInstance();
		var tilesUnderBuilding:Array<TileSavedDef>;
		
		if (movingBuilding != null) {
			tilesUnderBuilding = lMapManager.getTilesArray(movingBuilding.positionBeforeStartMoving, movingBuilding.definition.size);
			lMapManager.setTilesBuildable(tilesUnderBuilding, false);
			
			movingBuilding.position = IsoManager.modelToIsoView(movingBuilding.positionBeforeStartMoving);
			movingBuilding = null;
		}
	}
	
	public function callServerToUpgrade():Void {
		var modelPosistion:Point = toModel(true);
		Api.buildings.upgrade(Std.int(modelPosistion.x), Std.int(modelPosistion.y), cbTryToUpgrade );
	}
	
	public function callServerToDestroy():Void {
		var modelPosistion:Point = toModel(true);
		Api.buildings.destroy(Std.int(modelPosistion.x), Std.int(modelPosistion.y), cbTryToDestroy );
	}
	
	private function cbTryToDestroy(pResponse:String): Void {
		var lResponse:DataDef = cast(Json.parse(pResponse));
		
		if (!lResponse.error) {
			destroy();
		}
	}
	
	private function cbTryToUpgrade(pResponse:String): Void {
		var lResponse:DataDef = cast(Json.parse(pResponse));
		
		if (!lResponse.error) {
			RessourceManager.getInstance().updateRessources();
			upgradeBuilding();
		}
	}
	
	override public function destroy():Void {
		super.destroy();
		GameStage.getInstance().getBuildingsContainer().removeChild(this);
		list.splice(list.indexOf(this), 1);
	}
	
}

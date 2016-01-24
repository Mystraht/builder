package com.isartdigital.builder.game.sprites.buildings;

import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.DataDef;
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
	
	private var initialeModelPosition:Point = new Point(0, 0);
	
	public var definition:BuildingDef;
	public var buildingLevel:Int = 0;
	
	public var colMin:UInt;
	public var colMax:UInt;
	public var rowMin:UInt;
	public var rowMax:UInt;
	
	public function new()
	{
		super();
		factory = new FlumpMovieAnimFactory();
		boxType = BoxType.NONE;
		
		interactive = true;		
	}
	
	override public function init(pDefinition:Dynamic):Void 
	{
		var buildingPosition:Point = IsoManager.modelToIsoView(new Point(pDefinition.x, pDefinition.y));
		var tilesUnderBuilding:Array<TileSavedDef>;
		
		list.push(this);
		definition = getBuildingDefByName(pDefinition.name);
			
		colMin = Math.floor(toModel().y);
		colMax = Math.floor(toModel().y) + definition.size.height;
		rowMin = Math.floor(toModel().x);
		rowMax = Math.floor(toModel().x) + definition.size.width;
		
		x = buildingPosition.x;
		y = buildingPosition.y;
		buildingLevel = pDefinition.buildingLevel;
		
		assetName = definition.spriteName;
		
		tilesUnderBuilding = MapManager.getInstance().getTilesArray(new Point(pDefinition.x, pDefinition.y), definition.size);
		MapManager.getInstance().setTilesBuildable(tilesUnderBuilding, false);
		
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
			initialeModelPosition = toModel(true);
			movingBuilding = this;
			tilesUnderBuilding = lMapManager.getTilesArray(initialeModelPosition, definition.size);
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
	
	
	/**
	 * Essaye de construire le building en dessous de la souris
	 * Ne ce construit pas si la construction n'est pas possible
	 */
	private function buildingRequest():Void {
		var lMapManager:MapManager = MapManager.getInstance();
		var buildingPosition:Point = getBuildingPositionByCursor();
		var tilesOrigin:Array<TileSavedDef>;
		var tilesDest:Array<TileSavedDef>;
		var isBuildable:Bool;
		var elementsAtBuildingInitialePosition:Array<Dynamic>;
		var elementsAtBuildingPosition:Array<Dynamic>;
		var buildingSavedDef:BuildingSavedDef = TypeDefUtils.buildingSavedDef;
		
		buildingPosition.x = Math.round(buildingPosition.x);
		buildingPosition.y = Math.round(buildingPosition.y);
		
		tilesDest = lMapManager.getTilesArray(buildingPosition, definition.size);
		
		isBuildable = lMapManager.isBuildable(tilesDest); // test si c'est buildable
		
		if (isBuildable) {
			tilesOrigin = lMapManager.getTilesArray(initialeModelPosition, definition.size);
			
			lMapManager.setTilesBuildable(tilesOrigin, true);
			lMapManager.setTilesBuildable(tilesDest, false);
			
			elementsAtBuildingInitialePosition = lMapManager.globalMap[Std.int(initialeModelPosition.x)][Std.int(initialeModelPosition.y)];
			elementsAtBuildingPosition = lMapManager.globalMap[Std.int(buildingPosition.x)][Std.int(buildingPosition.y)];
			
			for (i in 0...elementsAtBuildingInitialePosition.length) {
				if (TypeDefUtils.compare(elementsAtBuildingInitialePosition[i], TypeDefUtils.buildingSavedDef)) {
					buildingSavedDef = elementsAtBuildingInitialePosition[i];
					elementsAtBuildingInitialePosition.splice(i, 1);
				}
			}
			
			elementsAtBuildingPosition.push(buildingSavedDef);
			
			initialeModelPosition = buildingPosition;
			cancelMoving();
			lMapManager.saveMap();
		}
	}
	
	/**
	 * Annule le deplacement du batiment actuellement en train de bouger et le remet à sa position initiale
	 */
	private static function cancelMoving():Void {
		var lMapManager:MapManager = MapManager.getInstance();
		var tilesUnderBuilding:Array<TileSavedDef>;
		
		if (movingBuilding != null) {
			tilesUnderBuilding = lMapManager.getTilesArray(movingBuilding.initialeModelPosition, movingBuilding.definition.size);
			lMapManager.setTilesBuildable(tilesUnderBuilding, false);
			
			movingBuilding.position = IsoManager.modelToIsoView(movingBuilding.initialeModelPosition);
			movingBuilding = null;
		}
	}
	
	public function callServerToDestroy():Void {
		trace('callServerToDestroybefore');
		var modelPosistion:Point = toModel(true);
		Api.buildings.destroy(Std.int(modelPosistion.x), Std.int(modelPosistion.y), cbTryToDestroy );
		trace('callServerToDestroyafter');
	}
	
	private function cbTryToDestroy(pResponse:String): Void {
		var lResponse:DataDef = cast(Json.parse(pResponse));
		
		if (!lResponse.error) {
			destroy();
		}
	}
	
	override public function destroy():Void {
		super.destroy();
		GameStage.getInstance().getBuildingsContainer().removeChild(this);
		list.splice(list.indexOf(this), 1);
	}
	
}
package com.isartdigital.builder.game.sprites.buildings;

import Std;
import Std;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.DataDef;
import com.isartdigital.builder.api.Utils;
import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.type.ModelElementNames;
import haxe.Json;
import pixi.core.math.Point;

/**
 * Component du building
 * @author Dorian
 */
class BuildingConstructor
{
	private var building:Building;
	private var buildingSaved:BuildingModelDef;
	private var destination:Point;
	private var positionBeforeConstruct:Point;
	
	public function new(building:Building) 
	{
		this.building = building;
		destination = new Point();
	}
	
	/**
	 * Configure une position de destionation
	 * @param	x
	 * @param	y
	 */
	public function setDestination(destination:Point):Void {
		this.destination = destination;
	}
	
	/**
	 * Si le batiment peut être construit
	 * @return
	 */
	public function canConstruct():Bool {
		var tilesDest:Array<TileModelDef> = Tile.getTilesArray(destination, building.definition.size);
		return Tile.isTilesBuildable(tilesDest);
	}
	
	/**
	 * Construit le batiment à la position precedemment configuré avec setDestination()
	 */
	public function construct():Void {
		setPositionBeforeBuildingIfNull();
		buildingSaved = getBuildingSavedFromGlobalMap();
		updateTilesBuildableState();
		updateBuildingSavedReferencePositionInGlobalMap();
		updateBuildingSavedCoordinateInGlobalMap();
		updateBuildingSavedInServer();
		setPositionBeforeConstructWith(destination);
	}
	
	/**
	 * Clean l'objet après utilisation
	 */
	public function cleanObject():Void {
		positionBeforeConstruct = null;
	}
	
	private function setPositionBeforeBuildingIfNull():Void {
		if (positionBeforeConstruct == null) {
			positionBeforeConstruct = building.positionToModel(true);
		}
	}
	
	private function getBuildingSavedFromGlobalMap():Dynamic {
		return GMap.getElementByTypeAt(positionBeforeConstruct, ModelElementNames.BUILDING);
	}
	
	private function updateTilesBuildableState():Void {
		setOriginTilesToConstructibleInGlobalMap();
		setDestinationTilesToNotConstructibleInGlobalMap();
	}
	
	private function updateBuildingSavedReferencePositionInGlobalMap():Void {
		if (isFirstConstruction()) return null;
		GMap.removeElementsBySizeAndTypeAt(positionBeforeConstruct, building.definition.size, ModelElementNames.BUILDING);
		GMap.addElementsBySizeAt(destination, building.definition.size, buildingSaved);
	}
	
	private function updateBuildingSavedCoordinateInGlobalMap():Void {
		if (isFirstConstruction()) return null;
		buildingSaved.x = Std.int(destination.x);
		buildingSaved.y = Std.int(destination.y);
	}
	
	private function setOriginTilesToConstructibleInGlobalMap():Void {
		if (isFirstConstruction()) return null;
		var tilesOrigin:Array<TileModelDef> = Tile.getTilesArray(positionBeforeConstruct, building.definition.size);
		Tile.setTilesBuildable(tilesOrigin, true);
	}
	
	private function setDestinationTilesToNotConstructibleInGlobalMap():Void {
		var tilesDest:Array<TileModelDef> = Tile.getTilesArray(destination, building.definition.size);
		Tile.setTilesBuildable(tilesDest, false);
	}
	
	private function updateBuildingSavedInServer():Void {
		if (isFirstConstruction()) return null;
		Api.buildings.move(
			Std.int(positionBeforeConstruct.x),
			Std.int(positionBeforeConstruct.y),
			Std.int(destination.x),
			Std.int(destination.y),
			cbBuildingMovingResult
		);
	}
	
	private function isFirstConstruction():Bool {
		return (
			positionBeforeConstruct.x == destination.x &&
			positionBeforeConstruct.y == destination.y
		);
	}
	
	private function cbBuildingMovingResult(results:String):Void {
		var results:DataDef = cast(Json.parse(results));
		
		if (results.error) {
			Utils.errorHandler(results.errorCode, results.errorMessage);
			return;
		}
	}
	
	private function setPositionBeforeConstructWith(newPosition:Point):Void {
		positionBeforeConstruct.set(newPosition.x, newPosition.y);
	}
}
package com.isartdigital.builder.game.sprites.buildings;

import com.isartdigital.builder.game.animation.petals.PetalsSalve;
import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.ResponseDef;
import com.isartdigital.builder.api.ApiUtils;
import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.utils.sounds.SoundManager;
import com.isartdigital.utils.sounds.SoundNames;
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
		//playConstructionAnimation();
		emitBuildingPlacedEvent();
		setPositionBeforeConstructWith(destination);
		if (isFirstConstruction()) SoundManager.playSFX(SoundNames.BUILDING_BUILT);
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
		Tile.changeTilesBuildableState(tilesOrigin, true);
	}
	
	private function setDestinationTilesToNotConstructibleInGlobalMap():Void {
		var tilesDest:Array<TileModelDef> = Tile.getTilesArray(destination, building.definition.size);
		Tile.changeTilesBuildableState(tilesDest, false);
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

	private function playConstructionAnimation():Void {
		if (isFirstConstruction()) return;
		var launchPosition:Point = destination.clone();
		launchPosition.x -= building.definition.size.width;
		launchPosition.y -= building.definition.size.height;
		PetalsSalve.lauchOnPositionWithRadius(launchPosition, PetalsSalve.PETALS_NUMBER_FOR_LAUCNHING_ON_POSITION);
	}

	private function emitBuildingPlacedEvent():Void {
		if (isFirstConstruction()) return;
		Ftue.event.emit(FtueEvents.BUILDING_PLACED, { buildingName: building.definition.name });
	}

	private function isFirstConstruction():Bool {
		return (
			positionBeforeConstruct.x == destination.x &&
			positionBeforeConstruct.y == destination.y
		);
	}
	
	private function cbBuildingMovingResult(results:String):Void {
		var results:ResponseDef = cast(Json.parse(results));
		
		if (results.error) {
			ApiUtils.displayError(results.errorCode, results.errorMessage);
			return;
		}
	}
	
	private function setPositionBeforeConstructWith(newPosition:Point):Void {
		positionBeforeConstruct.set(newPosition.x, newPosition.y);
	}
}
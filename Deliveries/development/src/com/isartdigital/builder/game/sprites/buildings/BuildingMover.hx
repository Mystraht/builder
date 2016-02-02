package com.isartdigital.builder.game.sprites.buildings;
import com.isartdigital.builder.game.def.TileSavedDef;
import com.isartdigital.builder.game.manager.MapManager;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingSavedDef;
import com.isartdigital.builder.game.utils.TypeDefUtils;
import js.Lib;
import pixi.core.math.Point;

/**
 * ...
 * @author Dorian
 */
class BuildingMover
{
	private var mapManager:MapManager;
	private var building:Building;
	private var positionBeforeStartMoving:Point;
	private var destinationPosition:Point;
	
	public function new(building:Building, positionBeforeStartMoving:Point) 
	{
		mapManager = MapManager.getInstance();
		this.building = building;
		this.positionBeforeStartMoving = positionBeforeStartMoving;
		destinationPosition = new Point();
	}
	
	public function move():Void {
		updateTilesBuildableState();
		updateBuildingReferencePositionInGlobalMap();
	}
	
	public function tilesAtDestinationIsBuildable():Bool {
		var tilesDest:Array<TileSavedDef> = mapManager.getTilesArray(destinationPosition, building.definition.size);
		return mapManager.isBuildable(tilesDest);
	}
	
	public function setDestination(x:Float, y:Float):Void {
		destinationPosition.x = Math.round(x);
		destinationPosition.y = Math.round(y);
	}
	
	private function updateTilesBuildableState():Void {
		setOriginTilesToConstructibleInGlobalMap();
		setDestinationTilesToNotConstructibleInGlobalMap();
	}
	
	private function updateBuildingReferencePositionInGlobalMap():Void {
		var building:Dynamic = getBuildingFromGlobalMap();
		mapManager.removeElementByTypeDefFromGlobalMapAt(positionBeforeStartMoving, TypeDefUtils.buildingSavedDef);
		mapManager.addElementInGlobalMapAt(destinationPosition, building);
	}
	
	private function setOriginTilesToConstructibleInGlobalMap():Void {
		var tilesOrigin:Array<TileSavedDef> = mapManager.getTilesArray(positionBeforeStartMoving, building.definition.size);
		mapManager.setTilesBuildable(tilesOrigin, true);
	}
	
	private function setDestinationTilesToNotConstructibleInGlobalMap():Void {
		var tilesDest:Array<TileSavedDef> = mapManager.getTilesArray(destinationPosition, building.definition.size);
		mapManager.setTilesBuildable(tilesDest, false);
	}
	
	private function getBuildingFromGlobalMap():Dynamic {
		return mapManager.getElementInGlobalMapAt(positionBeforeStartMoving, TypeDefUtils.buildingSavedDef);
	}
}
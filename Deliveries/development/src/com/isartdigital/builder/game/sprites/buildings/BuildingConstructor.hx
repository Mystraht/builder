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
class BuildingConstructor
{
	private var mapManager:MapManager;
	private var building:Building;
	private var initialeModelPosition:Point;
	private var destinationPosition:Point;
	
	public function new(building:Building, initialeModelPosition:Point) 
	{
		mapManager = MapManager.getInstance();
		this.building = building;
		this.initialeModelPosition = initialeModelPosition;
		destinationPosition = new Point();
	}
	
	public function construct():Void {		
		updateTilesBuildableInGlobalMap();
		updateBuildingInGlobalMap();
	}
	
	public function isConstructible():Bool {
		var tilesDest:Array<TileSavedDef> = mapManager.getTilesArray(destinationPosition, building.definition.size);
		return mapManager.isBuildable(tilesDest);
	}
	
	public function setDestination(x:Float, y:Float):Void {
		destinationPosition.x = Math.round(x);
		destinationPosition.y = Math.round(y);
	}
	
	private function updateTilesBuildableInGlobalMap():Void {
		var tilesOrigin:Array<TileSavedDef> = mapManager.getTilesArray(initialeModelPosition, building.definition.size);
		var tilesDest:Array<TileSavedDef> = mapManager.getTilesArray(destinationPosition, building.definition.size);
		
		mapManager.setTilesBuildable(tilesOrigin, true);
		mapManager.setTilesBuildable(tilesDest, false);
	}
	
	private function updateBuildingInGlobalMap():Void {
		var buildingRemoved:BuildingSavedDef = TypeDefUtils.buildingSavedDef;
		
		buildingRemoved = mapManager.removeTypeDefElementFromGlobalMapAt(initialeModelPosition, TypeDefUtils.buildingSavedDef);
		mapManager.addElementInGlobalMapAt(destinationPosition, buildingRemoved);
	}
}
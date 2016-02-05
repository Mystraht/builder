package com.isartdigital.builder.game.sprites.buildings.utils;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.game.iso.IsoManager;
import pixi.core.math.Point;

/**
 * ...
 * @author Dorian MILLIERE
 */
class BuildingPosition
{
	private var building:Building;
	private var definition:BuildingDef;
	
	public function new(building:Building) 
	{
		this.building = building;
		definition = building.definition;
	}
	
	public function getPositionOnCursor():Point {
		var buildingOffset:Point = getBuildingOffset();
		var centerOfBuilding:Point = getMousePositionWith(buildingOffset);
		return IsoManager.isoViewToModel(centerOfBuilding);
	}
	
	private function getBuildingOffset():Point {
		var buildingOffset:Point = new Point();
		
		buildingOffset.x = (definition.size.width - definition.size.height) / 2 * (Config.tileWidth / 2);
		buildingOffset.y = (definition.size.width + definition.size.height) / 2 * (Config.tileHeight / 2);
		
		return buildingOffset;
	}
	
	private function getMousePositionWith(buildingOffset:Point):Point {
		var centerOfBuilding:Point = new Point();
		var mousePosition:Point = GameManager.getInstance().mousePosition;
		
		centerOfBuilding.x = mousePosition.x + buildingOffset.x;
		centerOfBuilding.y = mousePosition.y + buildingOffset.y;
		
		return centerOfBuilding;
	}
}
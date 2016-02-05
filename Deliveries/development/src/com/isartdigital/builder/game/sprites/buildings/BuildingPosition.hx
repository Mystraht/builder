package com.isartdigital.builder.game.sprites.buildings;
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
		var mousePosition:Point = GameManager.getInstance().mousePosition;
		var buildingOffset:Point = new Point(0, 0);
		var centerOfBuilding:Point = new Point(0, 0);
		
		buildingOffset.x = (definition.size.width - definition.size.height) / 2 * (Config.tileWidth / 2);
		buildingOffset.y = (definition.size.width + definition.size.height) / 2 * (Config.tileHeight / 2);
		
		centerOfBuilding.x = mousePosition.x + buildingOffset.x;
		centerOfBuilding.y = mousePosition.y + buildingOffset.y;

		return IsoManager.isoViewToModel(centerOfBuilding);
	}
}
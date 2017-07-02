package com.isartdigital.builder.game.sprites.buildings;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.game.iso.IsoManager;
import pixi.core.math.Point;

/**
 * Component du building
 * @author Dorian MILLIERE
 */
class BuildingPosition
{
	private var building:Building;
	
	public function new(building:Building) 
	{
		this.building = building;
	}

	/**
	 * Renvoi la position de la souris avec un offset appliquer de façon à ce que le building soit au millieu de la souris
	 * @return
	 */
	public function getPositionOnCursor():Point {
		var buildingOffset:Point = getBuildingOffset();
		var centerOfBuilding:Point = getMousePositionWith(buildingOffset);
		return IsoManager.isoViewToModel(centerOfBuilding);
	}
	
	private function getBuildingOffset():Point {
		var buildingOffset:Point = new Point();
		
		buildingOffset.x = (building.definition.size.width - building.definition.size.height) / 2 * (Config.tileWidth / 4);
		buildingOffset.y = (building.definition.size.width + building.definition.size.height) / 2 * (Config.tileHeight / 4);
		
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
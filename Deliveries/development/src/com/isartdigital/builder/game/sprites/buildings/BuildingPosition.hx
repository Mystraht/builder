package com.isartdigital.builder.game.sprites.buildings;

import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.utils.Config;
import pixi.core.math.Point;

/**
 * Component du building
 * @author Dorian MILLIERE
 */
class BuildingPosition
{
	private var building:Building;

	private var _isCursorIsOverBuilding:Bool = false;

	public function new(building:Building) 
	{
		this.building = building;
	}

	/**
	 * Renvoi la position de la souris avec un offset appliquer de façon à ce que le building soit au millieu de la souris
	 * @return
	 */
	public function getPositionOnCursorWithBuildingCenterOffset():Point {
		var buildingOffset:Point = getBuildingCenterOffsetInPixel();
		var centerOfBuilding:Point = getMousePositionWith(buildingOffset);
		return IsoManager.isoToModelView(centerOfBuilding);
	}

	public function isCursorOverBuilding():Bool {
		var buildingSize:Point = BuildingUtils.getBuildingSizeInPixelBy(building);
		var distanceBetwenBuildingAndMousePosition = new Point(
			Math.abs(GameManager.getInstance().mousePosition.x - building.x),
			Math.abs(GameManager.getInstance().mousePosition.y - (building.y - buildingSize.y / 2))
		);

		distanceBetwenBuildingAndMousePosition = IsoManager.isoToModelView(distanceBetwenBuildingAndMousePosition, false);

		return (
			distanceBetwenBuildingAndMousePosition.x < building.definition.size.width / 2 &&
			distanceBetwenBuildingAndMousePosition.y < building.definition.size.height / 2
		);
	}
	
	public function isCursorNotOverBuilding():Bool {
		return !isCursorOverBuilding();
	}

	public function getBuildingCenterOffsetInPixel():Point {
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
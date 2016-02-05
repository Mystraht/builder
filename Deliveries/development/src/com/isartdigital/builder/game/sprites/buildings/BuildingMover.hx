package com.isartdigital.builder.game.sprites.buildings;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.game.iso.IsoManager;
import pixi.core.math.Point;

/**
 * ...
 * @author Dorian MILLIERE
 */
class BuildingMover
{
	private var building:Building;
	private var definition:BuildingDef;
	private var mousePosition:Point;
	
	public function new(building:Building) 
	{
		this.building = building;
		definition = building.definition;
	}
	
	public function moveUnderMouse():Void {
		var centerOfBuildingModel:Point;
		
		if (mousePosition == null) {
			mousePositionNullException();
		}
		
		centerOfBuildingModel = mousePosition;
		centerOfBuildingModel.x = Math.round(centerOfBuildingModel.x);
		centerOfBuildingModel.y = Math.round(centerOfBuildingModel.y);
		
		building.position = IsoManager.modelToIsoView(centerOfBuildingModel);
	}
	
	public function setMousePosition(mousePosition:Point):Void {
		this.mousePosition = mousePosition;
	}
	
	private function mousePositionNullException() {
		throw 'Mouse position must be setted';
	}
}
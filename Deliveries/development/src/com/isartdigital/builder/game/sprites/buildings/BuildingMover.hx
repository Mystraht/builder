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
	
	public function new(building:Building) 
	{
		this.building = building;
		definition = building.definition;
	}
	
	public function moveUnderMouse():Void {
		var buildingPosition:BuildingPosition = new BuildingPosition(building);
		var centerOfBuildingModel:Point = buildingPosition.getPositionOnCursor();
		
		centerOfBuildingModel.x = Math.round(centerOfBuildingModel.x);
		centerOfBuildingModel.y = Math.round(centerOfBuildingModel.y);
		
		building.position = IsoManager.modelToIsoView(centerOfBuildingModel);
	}
}
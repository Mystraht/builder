package com.isartdigital.builder.game.sprites.buildings;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.def.SizeDef;
import com.isartdigital.builder.api.ApiUtils;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.type.ModelElementNames;
import pixi.core.math.Point;

/**
 * Coponent du building
 * @author Dorian
 */
class BuildingDestructor
{
	private var building:Building;
	private var buildingSizeToDestruct:SizeDef;
	private var buildingPositionToDestruct:Point;

	public function new(building:Building) 
	{
		this.building = building;
	}
	
	/**
	 * Destruction du building, update le serveur et enlève le building de la globalmap
	 */
	public function destruct():Void {
		var buildingInMap:BuildingModelDef;
		buildingPositionToDestruct = building.positionToModel(true);
		buildingInMap = GMap.getElementByTypeAt(buildingPositionToDestruct, ModelElementNames.BUILDING);
		buildingSizeToDestruct = building.definition.size;
		building.remove();
		Building.buildingsModel.splice(Building.buildingsModel.indexOf(buildingInMap), 1);
		removeBuildingFromGlobalMap();
		callServerToDestroy();
	}
	
	private function removeBuildingFromGlobalMap():Void {
		GMap.removeElementsBySizeAndTypeAt(buildingPositionToDestruct, buildingSizeToDestruct, ModelElementNames.BUILDING);
	}
	
	private function callServerToDestroy():Void {
		var modelPosistion:Point = building.positionToModel(true);
		Api.buildings.destroy(Std.int(modelPosistion.x), Std.int(modelPosistion.y), ApiUtils.handleError);
	}
}
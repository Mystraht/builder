package com.isartdigital.builder.game.sprites.buildings;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.DataDef;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.type.ModelElementNames;
import haxe.Json;
import pixi.core.math.Point;

/**
 * Coponent du building
 * @author Dorian
 */
class BuildingDestructor
{
	private var building:Building;
	
	public function new(building:Building) 
	{
		this.building = building;
	}
	
	/**
	 * Destruction du building, update le serveur et enlève le building de la globalmap
	 */
	public function destruct():Void {
		removeBuildingFromGlobalMap();
		callServerToDestroy();
	}
	
	private function removeBuildingFromGlobalMap():Void {
		GMap.removeElementsBySizeAndTypeAt(building.positionToModel(true), building.definition.size, ModelElementNames.BUILDING);
	}
	
	private function callServerToDestroy():Void {
		var modelPosistion:Point = building.positionToModel(true);
		Api.buildings.destroy(Std.int(modelPosistion.x), Std.int(modelPosistion.y), cbTryToDestroy);
	}
	
	private function cbTryToDestroy(pResponse:String): Void {
		var lResponse:DataDef = cast(Json.parse(pResponse));

		if (!lResponse.error) {
			building.remove();
		}
	}
	
}
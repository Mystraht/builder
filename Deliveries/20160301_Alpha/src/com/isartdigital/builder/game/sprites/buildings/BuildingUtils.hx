package com.isartdigital.builder.game.sprites.buildings;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.type.JsonNames;
import pixi.core.math.Point;

/**
 * ...
 * @author Dorian MILLIERE
 */
@:access(com.isartdigital.builder.game.sprites.buildings.Building)
class BuildingUtils
{
	/**
	 * Desectionne le building actuellement selectionné
	 */
	public static function unselectBuildingSelected():Void {
		var building:Building;
		var buildings:Array<Building> = Building.list;
		
		for (i in 0...buildings.length) {
			building = buildings[i];
			if (building.isSelected) {
				building.setBuildingUnselected();
				building.forgetHudEvent();
			}
		}
	}
	
	/**
	 * Permet de savoir si il y a un autre building actuellement en train de bougé, autre que celui entré en paramètre
	 * @param	buildingSource
	 * @return
	 */
	public static function thereIsOtherBuildingMovingThan(buildingSource:Building):Bool {
		var building:Building;
		var buildings:Array<Building> = Building.list;
		
		for (i in 0...buildings.length) {
			building = buildings[i];
			if (building.isFollowingCursor && building != buildingSource) {
				return true;
			}
		}
		
		return false;
	}
	
	
	/**
	 * Return true si la position inqiqué est l'origine du building
	 */
	public static function isBuildingOriginInGlobalMapAt(position:Point):Bool {
		var building:BuildingModelDef = GMap.getElementByTypeAt(position, 'building');
		
		return (
			Std.int(building.x) == Std.int(position.x) &&
			Std.int(building.y) == Std.int(position.y)
		);
	}
}
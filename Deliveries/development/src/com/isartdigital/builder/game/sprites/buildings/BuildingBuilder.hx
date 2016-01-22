package com.isartdigital.builder.game.sprites.buildings;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.buildings.Motel;
	
/**
 * Class factory des buildings
 * @author Dorian
 */
class BuildingBuilder 
{	
	/**
     * Class Constructor
     * @return void
     **/
	private function new() 
	{
		
	}
	
	public static function createBuildingByName (name:String): Building {
		if (name == null) {
			return null;
		
		}
		if (name == "Motel") {
			var motel:Motel = new Motel();
			addBuildingCollectableComponentInto(motel);
			addBuildingUpgradableComponentInto(motel);
			return cast (new Motel());
		}
		
		
		return null;
	}
	
	private static function addBuildingCollectableComponentInto(building:ICollectableComponent):Void {
		
	}
	
	private static function addBuildingUpgradableComponentInto(building:IUpgradableComponent):Void {
		
	}
}
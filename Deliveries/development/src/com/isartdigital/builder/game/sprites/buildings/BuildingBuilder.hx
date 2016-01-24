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
			addCollectableComponentInto(motel);
			addUpgradableComponentInto(motel);
			return cast motel;
		}
		
		return null;
	}
	
	private static function addCollectableComponentInto(building:ICollectableComponent):Void {
		var collectableComponent:CollectableComponent = new CollectableComponent();
		building.setCollectableComponent(collectableComponent);
	}
	
	private static function addUpgradableComponentInto(building:IUpgradableComponent):Void {
		var upgradableComponent:UpgradableComponent = new UpgradableComponent();
		building.setUpgradableComponent(upgradableComponent);
	}
}
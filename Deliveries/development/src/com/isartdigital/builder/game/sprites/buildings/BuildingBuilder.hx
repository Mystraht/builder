package com.isartdigital.builder.game.sprites.buildings;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.buildings.component.CollectableComponent;
import com.isartdigital.builder.game.sprites.buildings.component.ICollectableComponent;
import com.isartdigital.builder.game.sprites.buildings.component.IUpgradableComponent;
import com.isartdigital.builder.game.sprites.buildings.component.UpgradableComponent;
import com.isartdigital.builder.game.sprites.buildings.childrens.Motel;
import pixi.core.math.Point;
	
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
		var building:Building;
		
		if (name == null) {
			return null;
		}
		
		if (name == "Motel") {
			building = cast new Motel();
			trace('cc');
			trace(building.initialeModelPosition);
			trace('cc');
			addCollectableComponentInto(cast(building, Motel));
			addUpgradableComponentInto(cast(building, Motel));
			return cast building;
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
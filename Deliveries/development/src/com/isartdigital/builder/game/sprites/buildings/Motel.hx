package com.isartdigital.builder.game.sprites.buildings;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;

/**
 * Element placeholder
 * On imagine qu'il est Collectable et Upgradable
 * @author Dorian
 */
class Motel extends Building implements ICollectableComponent implements IUpgradableComponent
{
	private var collectableComponent(null, set):CollectableComponent;
	private var upgradableComponent(null, set):UpgradableComponent;
	
	public function new() 
	{
		super();
	}
	
	function set_collectableComponent(collectableComponent:CollectableComponent) {
		return this.collectableComponent = collectableComponent;
	}
	
	function set_upgradableComponent(upgradableComponent:UpgradableComponent) {
		return this.upgradableComponent = upgradableComponent;
	}
	
}
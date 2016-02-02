package com.isartdigital.builder.game.sprites.buildings.childrens;
import com.isartdigital.builder.game.sprites.buildings.component.CollectableComponent;
import com.isartdigital.builder.game.sprites.buildings.component.ICollectableComponent;
import com.isartdigital.builder.game.sprites.buildings.component.IUpgradableComponent;
import com.isartdigital.builder.game.sprites.buildings.component.UpgradableComponent;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;

/**
 * Element placeholder
 * On imagine qu'il est Collectable et Upgradable
 * @author Dorian
 */
class Motel extends Building implements ICollectableComponent implements IUpgradableComponent
{
	private var collectableComponent:CollectableComponent;
	private var upgradableComponent:UpgradableComponent;
	
	public function new()
	{
		super();
	}
	
	public function setCollectableComponent(collectableComponent:CollectableComponent):Void {
		this.collectableComponent = collectableComponent;
	}
	
	public function setUpgradableComponent(upgradableComponent:UpgradableComponent):Void {
		this.upgradableComponent = upgradableComponent;
	}
	
	public function collect():Void {
		collectableComponent.collect();
	}
	
	public function upgrade():Void {
		upgradableComponent.upgrade();
	}
}
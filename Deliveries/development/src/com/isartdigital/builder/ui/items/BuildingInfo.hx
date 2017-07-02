package com.isartdigital.builder.ui.items;

import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.ui.hud.BuildingHudElement;
import com.isartdigital.utils.Localization;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.math.Point;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class BuildingInfo extends UIComponent implements BuildingHudElement
{
	public var basePosition:Point;
	
	private var title:Text;
	private var capacity:Text;
	private var production:Text;
	private var lvl:Text;
		
	public function new() 
	{
		super();
		build();
		
		setVariablesFromChilds();
	}
	
	private function setVariablesFromChilds () : Void {
		title = cast(getChildByName("BuildingInfoTitle_txt"));
		capacity = cast(getChildByName("BuildingInfoCapacity_txt"));
		production = cast(getChildByName("BuildingInfoProduction_txt"));
		lvl = cast(getChildByName("BuildingInfoLvl_txt"));
	}
	
	public function setDescription(building:Building) : Void {
		var config:Building = building.getConfig();
		
		title.text = Localization.getText("label_" + building.definition.name);
		lvl.text = Localization.getText("label_level") + " " + (building.buildingLevel + 1);
		
		if (building.isHarvestable()) {
			capacity.text = Reflect.field(config, "capacity") != null ? "Capacité : " + Reflect.field(config, "capacity") : '';
			production.text = Reflect.field(config, "production") != null ? "Production : " + Reflect.field(config, "production") + " / heure" : '';
		} else {
			capacity.text = '';
			production.text = '';
		}
	}
	
	
	
}
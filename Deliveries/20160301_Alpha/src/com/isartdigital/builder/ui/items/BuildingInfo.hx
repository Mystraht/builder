package com.isartdigital.builder.ui.items;

import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.utils.Localization;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class BuildingInfo extends UIComponent
{
	private var title:Text;
	private var capacity:Text;
	private var production:Text;
	private var lvl:Text;
		
	public function new() 
	{
		super();
		build();
		
		title = cast(getChildByName("BuildingInfoTitle_txt"));
		capacity = cast(getChildByName("BuildingInfoCapacity_txt"));
		production = cast(getChildByName("BuildingInfoProduction_txt"));
		lvl = cast(getChildByName("BuildingInfoLvl_txt"));
		
		production.text = "";
		capacity.text = "";
	}
	
	public function setDescription(pBuilding:Building) : Void {
		var config:Dynamic = pBuilding.getConfig();

		title.text = Localization.getInstance().getText("label_" + pBuilding.definition.name);
		lvl.text = Localization.getInstance().getText("label_level") + " " + (pBuilding.buildingLevel + 1);
		
		if (pBuilding.isHarvestable()) {
			capacity.text = "Capacité : " + Reflect.field(config, "capacity");
			production.text = "Production : " + Reflect.field(config, "production") + " / minutes";
		}
	}
	
	
	
}
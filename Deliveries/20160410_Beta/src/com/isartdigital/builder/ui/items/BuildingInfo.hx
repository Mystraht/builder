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
		
		//production.text = "";
		//capacity.text = "";
	}
	
	private function setVariablesFromChilds () : Void {
		title = cast(getChildByName("BuildingInfoTitle_txt"));
		capacity = cast(getChildByName("BuildingInfoCapacity_txt"));
		production = cast(getChildByName("BuildingInfoProduction_txt"));
		lvl = cast(getChildByName("BuildingInfoLvl_txt"));
	}
	
	public function setDescription(pBuilding:Building) : Void {
		var config:Dynamic = pBuilding.getConfig();

		//title.text = Localization.getInstance().getText("label_cantina");// + pBuilding.definition.name);
		title.text = pBuilding.definition.name;
		lvl.text = Localization.getText("label_level") + " " + (pBuilding.buildingLevel + 1);
		
		if (pBuilding.isHarvestable()) {
			capacity.text = "Capacité : " + Reflect.field(config, "capacity");
			production.text = "Production : " + Reflect.field(config, "production") + " / minutes";
		}
	}
	
	
	
}
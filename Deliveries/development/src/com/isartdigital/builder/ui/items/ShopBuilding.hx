package com.isartdigital.builder.ui.items;

import com.isartdigital.builder.game.type.JsonNames;

/**
 * ...
 * @author Flavien
 */
class ShopBuilding extends ShopCategory
{	
	
	public function new() 
	{
		super();
		build();
		
		jsonSettingsName = JsonNames.SHOP_BUILDING_SHEET;
		buildingPerSheet = 2;
		itemComponentName = "ItemBuilding";
		
		init();
	}	
}
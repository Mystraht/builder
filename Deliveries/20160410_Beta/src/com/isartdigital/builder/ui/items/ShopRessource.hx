package com.isartdigital.builder.ui.items;

import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.utils.ui.UIComponent;

/**
 * ...
 * @author Flavien
 */
class ShopRessource extends ShopCategory
{

	public function new() 
	{
		super();
		build();
		
		jsonSettingsName = JsonNames.SHOP_RESSOURCE_SHEET;
		buildingPerSheet = 3;
		itemComponentName = "ItemRessource";
		
		init();		
	}	
}
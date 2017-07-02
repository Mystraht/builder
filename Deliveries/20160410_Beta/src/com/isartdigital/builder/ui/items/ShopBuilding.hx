package com.isartdigital.builder.ui.items;

import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.buttons.DotButton;
import com.isartdigital.builder.ui.buttons.LeftButton;
import com.isartdigital.builder.ui.buttons.RightButton;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.ui.Button;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.math.Point;
import pixi.interaction.EventTarget;

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
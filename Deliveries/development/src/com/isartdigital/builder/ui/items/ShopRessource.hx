package com.isartdigital.builder.ui.items;

import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.services.Wallet;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class ShopRessource extends ShopCategory
{
	private var isartPoint:Text;
	
	public function new() 
	{
		super();
		build();
		
		jsonSettingsName = JsonNames.SHOP_RESSOURCE_SHEET;
		buildingPerSheet = 3;
		itemComponentName = "ItemRessource";
		
		init();		
		
		isartPoint = cast(getChildByName("IsartPoint_txt"), Text);
		
		Wallet.getMoney(Main.getInstance().getMail() , function (params:Dynamic) {
			if (Reflect.hasField(params, "money")) {
				var money:Float = Reflect.field(params, "money");
				isartPoint.text = "Isart Point : " + money;
			}
		});
		
		
	}	
}
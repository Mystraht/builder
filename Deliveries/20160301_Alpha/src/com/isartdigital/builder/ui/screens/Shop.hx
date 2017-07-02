package com.isartdigital.builder.ui.screens;

import com.isartdigital.builder.game.sprites.buildings.const.BuildingNames;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.items.ItemBuilding;
import com.isartdigital.builder.ui.items.ShopBuilding;
import com.isartdigital.builder.ui.items.ShopRessource;
import com.isartdigital.builder.ui.uimodule.DotButton;
import com.isartdigital.builder.ui.uimodule.ShopBuildingButton;
import com.isartdigital.builder.ui.uimodule.ShopRessourceButton;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.ui.Button;
import com.isartdigital.utils.ui.Popin;
import com.isartdigital.utils.ui.Screen;
import motion.Actuate;
import motion.easing.Bounce;
import motion.easing.Elastic;
import motion.easing.Expo;
import motion.easing.Linear;
import pixi.core.math.Point;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

	
/**
 * ...
 * @author Roman CHEVASSU
 */
class Shop extends Popin 
{
	
	/**
	 * instance unique de la classe Shop
	 */
	private static var instance: Shop;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Shop {
		if (instance == null) instance = new Shop();
		return instance;
	}
	
	private static inline var BUILDING_SHOP:String = "BUILDING_SHOP";
	private static inline var RESSOURCE_SHOP:String = "RESSOURCE_SHOP";
	
	private var buildingShop:ShopBuilding;
	private var ressourceShop:ShopRessource;	
	
	private var ressourceButton:ShopRessourceButton;
	private var buildingButton:ShopBuildingButton;
	
	private var ressourceTitle:Text;
	private var buildingTitle:Text;
	
	
	private var activeShop:String = BUILDING_SHOP;
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		super();
		build();
		
		buildingShop = cast(getChildByName("ShopBuilding"), ShopBuilding);
		ressourceShop = cast(getChildByName("ShopRessource"), ShopRessource);
		
		ressourceButton = cast(getChildByName("ShopRessourceButton"), ShopRessourceButton);
		buildingButton = cast(getChildByName("ShopBuildingButton"), ShopBuildingButton);
		
		ressourceButton.click = ressourceButton.tap = onRessourceClick;
		buildingButton.click = buildingButton.tap = onBuildingClick;
		
		changeShop();
	}
	
	private function onBuildingClick (pEvent:EventTarget) : Void {
		activeShop = BUILDING_SHOP;
		changeShop();
	}
	
	private function onRessourceClick (pEvent:EventTarget) : Void {
		activeShop = RESSOURCE_SHOP;
		changeShop();
	}
	
	private function changeShop () : Void {		
		switch (activeShop) 
		{
			case RESSOURCE_SHOP: {
				buildingButton.setUnActive();
				ressourceButton.setActive();
				buildingShop.visible = false;
				ressourceShop.visible = true;
			}
			case BUILDING_SHOP: {
				buildingButton.setActive();
				ressourceButton.setUnActive();
				ressourceShop.visible = false;
				buildingShop.visible = true;
			}
		}
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	override public function destroy (): Void {
		trace("Destroy Shop");
		buildingShop.destroy();
		instance = null;
	}

}
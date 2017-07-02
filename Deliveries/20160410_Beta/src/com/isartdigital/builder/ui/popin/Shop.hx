package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.game.sprites.buildings.const.BuildingNames;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.items.ItemBuilding;
import com.isartdigital.builder.ui.items.ShopBuilding;
import com.isartdigital.builder.ui.items.ShopRessource;
import com.isartdigital.builder.ui.buttons.DotButton;
import com.isartdigital.builder.ui.buttons.ShopBuildingButton;
import com.isartdigital.builder.ui.buttons.ShopRessourceButton;
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
 * @author Flavien Marianacci
 */
class Shop extends Popin 
{
	public static inline var SHOP_SHEET_BUILDING:String = "BUILDING_SHOP";
	public static inline var SHOP_SHEET_RESSOURCE:String = "RESSOURCE_SHOP";
	
	public static inline var BUY_REQUEST_BUILDING:String = "SHOP_BUY_BUILDING";

	private var buildingShop:ShopBuilding;
	private var ressourceShop:ShopRessource;	
	
	private var ressourceButton:ShopRessourceButton;
	private var buildingButton:ShopBuildingButton;
	
	private var ressourceTitle:Text;
	private var buildingTitle:Text;
	
	
	private var activeShop:String = SHOP_SHEET_BUILDING;
	
	public function new(?pActiveShop:String = SHOP_SHEET_BUILDING) 
	{
		super();
		build();
		
		setVariableFromChild();
		subscribeButtonsClick();
		
		activeShop = pActiveShop;
		changeShop();
	}
	
	private function setVariableFromChild () : Void {
		buildingShop = cast(getChildByName("ShopBuilding"), ShopBuilding);
		ressourceShop = cast(getChildByName("ShopRessource"), ShopRessource);
		
		ressourceButton = cast(getChildByName("ShopRessourceButton"), ShopRessourceButton);
		buildingButton = cast(getChildByName("ShopBuildingButton"), ShopBuildingButton);
	}
	
	private function subscribeButtonsClick () : Void {
		ressourceButton.click = ressourceButton.tap = onRessourceClick;
		buildingButton.click = buildingButton.tap = onBuildingClick;
	}
	
	private function unsubscribeButtonsClick () : Void {
		ressourceButton.click = ressourceButton.tap = null;
		buildingButton.click = buildingButton.tap = null;
	}
	
	private function onBuildingClick (pEvent:EventTarget) : Void {
		activeShop = SHOP_SHEET_BUILDING;
		changeShop();
	}
	
	private function onRessourceClick (pEvent:EventTarget) : Void {
		activeShop = SHOP_SHEET_RESSOURCE;
		changeShop();
	}
	
	private function changeShop () : Void {		
		switch (activeShop) 
		{
			case SHOP_SHEET_RESSOURCE: {
				buildingButton.setInactive();
				ressourceButton.setActive();
				buildingShop.visible = false;
				ressourceShop.visible = true;
			}
			case SHOP_SHEET_BUILDING: {
				buildingButton.setActive();
				ressourceButton.setInactive();
				ressourceShop.visible = false;
				buildingShop.visible = true;
			}
		}
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	override public function destroy (): Void {
		unsubscribeButtonsClick();
		
		buildingButton.destroy();
		ressourceButton.destroy();
		
		buildingShop.destroy();
		ressourceShop.destroy();
		
		interactive = false;
		
		super.destroy();
		
	}

}
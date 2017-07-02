package com.isartdigital.builder.ui.items;

import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.sprites.buildings.BuildingUtils;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.popin.Shop;
import com.isartdigital.builder.ui.buttons.ShopBuyHardButton;
import com.isartdigital.builder.ui.buttons.ShopBuySoftButton;
import com.isartdigital.services.Users;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.display.DisplayObject;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ItemBuilding extends ItemShop
{
	private var currentBuildingDefinition:Dynamic;
	private var buildingName:String = "pyrotechnician";
	
	private var buySoftButtonList:Array<ShopBuySoftButton> = new Array<ShopBuySoftButton> ();
	private var softPriceTextList:Array<Text> = new Array<Text> ();
	private var lockAssetList:Array<DisplayObject> = new Array<DisplayObject> ();
	private var softCurrencyAssetList:Array<DisplayObject> = new Array<DisplayObject> ();
	
	
	
	private var canBuild:Bool = true;
	
	public function new() 
	{
		super();
		build();
		
		itemTitleComponentName = "BuildingName_txt";
		itemAssetComponentName = "BuildingInShop";
		
		init();
	}
	
	override private function init() : Void {
		super.init();
		
		setListFromChild("PriceSoft_txt", softPriceTextList);
		setListFromChild("CadenasAsset", lockAssetList);
		setListFromChild("PesosAsset", softCurrencyAssetList);
		setListFromChild("ShopBuySoftButton", buySoftButtonList);
		
		subscribeButtonsClickAndTap(buySoft, cast(buySoftButtonList));
		subscribeButtonsClickAndTap(buyHard, cast(buyHardButtonList));
	}
	
	/**
	 * Change le building a afficher
	 * @param	pBuildingName nom du building a afficher
	 */
	override public function changeItemSelect(itemName:String) : Void {
		setVisibilityBuyAsset(true);
		
		buildingName = itemName;
		
		setItemAsset(buildingName);
		
		getBuildingDefinition();
		updateSoftTxt();
		updateHardTxt();
		updateBuildingName();
		
		if (!buildingIsUnLock()) {
			setVisibilityInList(true, lockAssetList);
			canBuild = false;
		} else {
			canBuild = true;
			setVisibilityInList(false, lockAssetList);
			if (!buildingIsBuyable()) {
				setVisibilityBuyAsset(false);
			}
		}
	}
	
	private function setVisibilityBuyAsset (visibility:Bool) : Void {
		setVisibilityInList(visibility, cast(buyHardButtonList));
		setVisibilityInList(visibility, cast(buySoftButtonList));
		setVisibilityInList(visibility, cast(softPriceTextList));
		setVisibilityInList(visibility, cast(hardPriceTextList));
		setVisibilityInList(visibility, cast(softCurrencyAssetList));
		setVisibilityInList(visibility, cast(hardCurrencyAssetList));
	}
	
	private function buySoft(pEvent:EventTarget) : Void {
		if (!canBuild) return;
		var price:Int = Reflect.field(currentBuildingDefinition, "price");
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.GOLD, price)) return;
		Main.getInstance().emit(Shop.BUY_REQUEST_BUILDING, { buildingName: buildingName, hard: false });
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);

	}
	
	private function buyHard (pEvent:EventTarget) : Void {
		if (!canBuild) return;
		var price:Int = Reflect.field(currentBuildingDefinition, "hard_price");
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.SPICE, price)) return;
		Main.getInstance().emit(Shop.BUY_REQUEST_BUILDING, { buildingName: buildingName, hard: true });
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
	}
	
	private function buildingIsUnLock () : Bool {
		var lMainBuildingLvlRequire:Int = Reflect.field(currentBuildingDefinition, "require_main_building_lvl");
		return lMainBuildingLvlRequire <= Users.getMainBuildingLevel();
	}
	
	private function buildingIsBuyable () : Bool {
		return !(buildingIsUnique() && buildingAlreadyExist());
	}
	
	private function buildingIsUnique () : Bool {
		if (Reflect.hasField(currentBuildingDefinition, "unique")) {
			if (Reflect.field(currentBuildingDefinition, "unique")) {
				return true;
			}
		}
		return false;
	}
	
	private function buildingAlreadyExist () : Bool {
		return BuildingUtils.isBuildingModelExist(buildingName);
	}
	
	private function getBuildingDefinition() : Void {
		var buildingSettings:Dynamic = cast GameLoader.getContent(JsonNames.BUILDINGS_SETTINGS);		
		var buildingDefinition:Dynamic = cast(Reflect.field(buildingSettings, buildingName));
		
		if (Reflect.field(buildingDefinition, "1") != null) {
			currentBuildingDefinition = cast(Reflect.field(buildingDefinition, "1"));
		} else {
			currentBuildingDefinition = buildingDefinition;
		}
	}
	
	private function updateSoftTxt () : Void {
		for (softText in softPriceTextList) {
			softText.text = Reflect.field(currentBuildingDefinition, "price");
		}
	}
	
	private function updateHardTxt () : Void {
		for (hardText in hardPriceTextList) {
			hardText.text = Reflect.field(currentBuildingDefinition, "hard_price");
		}
	}
	
	private function updateBuildingName () : Void {
		for (title in itemTitleTextList) {
			title.text =  buildingName;
		}
	}
	
	override public function destroy():Void 
	{	
		unsubscribeButtonsClickAndTap(cast(buyHardButtonList));
		unsubscribeButtonsClickAndTap(cast(buySoftButtonList));
		
		while (buySoftButtonList.length > 0) {
			buySoftButtonList.shift().destroy();
		}
		
		interactive = false;
		
		super.destroy();
	}
}
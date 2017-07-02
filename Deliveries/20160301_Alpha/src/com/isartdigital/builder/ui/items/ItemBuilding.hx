package com.isartdigital.builder.ui.items;

import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingNames;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.screens.ShopEvent;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.ui.Button;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ItemBuilding extends UIComponent
{
	public static var list:Array<ItemBuilding> = new Array<ItemBuilding> ();

	private var currentBuildingDefinition:Dynamic;
	private var buildingName:String = "pyrotechnician";
	
	private var buildingAssets:BuildingInShop;
	
	private var cannotBuild:Bool = true;
	
	public function new() 
	{
		list.push(this);
		super();
		build();
		
		buildingAssets = cast(getChildByName("BuildingInShop"), BuildingInShop);
		
		listenButtonHard();
		listenButtonSoft();
	}
	
	private function listenButtonSoft() : Void {
		cast(getChildByName("ShopBuySoftButton"), Button).click = buySoft;
	}
	
	private function buySoft(pEvent:EventTarget) : Void {
		if (cannotBuild) return;
		var price:Int = Reflect.field(currentBuildingDefinition, "price");
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.GOLD, price)) return;
		Main.getInstance().emit(ShopEvent.SHOP_BUY_BUILDING, { buildingName: buildingName, hard: false });
		UIManager.getInstance().closeCurrentPopin();
	}
	
	private function listenButtonHard() : Void {
		cast(getChildByName("ShopBuyHardButton"), Button).click = buyHard;
	}
	
	private function buyHard (pEvent:EventTarget) : Void {
		if (cannotBuild) return;
		var price:Int = Reflect.field(currentBuildingDefinition, "hard_price");
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.SPICE, price)) return;
		Main.getInstance().emit(ShopEvent.SHOP_BUY_BUILDING, { buildingName: buildingName, hard: true });
		UIManager.getInstance().closeCurrentPopin();
	}
	
	/**
	 * Change le building a afficher
	 * @param	pBuildingName nom du building a afficher
	 */
	public function changeItemSelect(pBuildingName:String) : Void {
		buildingName = pBuildingName;
		buildingAssets.setAsset(pBuildingName);
		getBuildingDefinition();
		updateSoftTxt();
		updateHardTxt();
		updateBuildingName();
		if (buildingIsUnLock()) activeLock();
		else disableLock();
	}
	
	private function buildingIsUnLock () : Bool {
		var lMainBuildingLvlRequire:Int = Reflect.field(currentBuildingDefinition, "require_main_building_lvl");
		return lMainBuildingLvlRequire == 1;
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
		cast(getChildByName("PriceSoft_txt"), Text).text = Reflect.field(currentBuildingDefinition, "price");
	}
	
	private function updateHardTxt () : Void {
		cast(getChildByName("PriceHard_txt"), Text).text = Reflect.field(currentBuildingDefinition, "hard_price");
	}
	
	private function updateBuildingName () : Void {
		cast(getChildByName("BuildingName_txt"), Text).text = buildingName;
	}
	
	private function activeLock () : Void {
		getChildByName("CadenasAsset").visible = cannotBuild = true;
	}
	
	private function disableLock () : Void {
		getChildByName("CadenasAsset").visible = cannotBuild = false;
	}
	
	override public function destroy():Void 
	{
		list.splice(list.indexOf(this), 1);
		super.destroy();
	}
}
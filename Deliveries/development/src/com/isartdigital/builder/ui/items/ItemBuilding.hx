package com.isartdigital.builder.ui.items;

import com.isartdigital.builder.ui.items.ItemShop;
import Array;
import com.isartdigital.utils.sounds.SoundManager;
import com.isartdigital.utils.sounds.SoundNames;
import pixi.filters.color.ColorMatrixFilter;
import haxe.Timer;
import com.isartdigital.utils.game.Filter;
import com.isartdigital.builder.game.ftue.FtueUtils;
import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.sprites.buildings.BuildingUtils;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.popin.Shop;
import com.isartdigital.builder.ui.buttons.ShopBuySoftButton;
import com.isartdigital.services.Users;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.Localization;
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
	private var lockInfo:Text;
	
	private var backgroundDescription:DisplayObject;
	private var buildingInfoAsset:DisplayObject;
	private var descriptionBuilding_txt:Text;
	
	
	private var canBuild:Bool = true;
	
	private var basePositionTitleX:Float;
	
	public function new() 
	{
		super();
		build();
		
		itemTitleComponentName = "BuildingName_txt";
		itemAssetComponentName = "BuildingInShop";
		
		init();
		
		basePositionTitleX = itemTitleTextList[0].x;
	}
	
	public function getSoftButton () : ShopBuySoftButton {
		return buySoftButtonList[0];
	}
	
	override private function init() : Void {
		super.init();
		
		setListFromChild("PriceSoft_txt", softPriceTextList);
		setListFromChild("CadenasAsset", lockAssetList);
		setListFromChild("ShopBuySoftButton", buySoftButtonList);
		
		lockInfo = cast(getChildByName("LockInfo_txt"), Text);
		descriptionBuilding_txt = cast(getChildByName("descriptionBuilding_txt"), Text);
		backgroundDescription = getChildByName("buildingDescriptionBackgroundAsset");
		buildingInfoAsset = getChildByName("buildingInfoAsset");
		
		subscribeButtonsClickAndTap(buySoft, cast(buySoftButtonList));
		subscribeButtonsClickAndTap(buyHard, cast(buyHardButtonList));
		subscribeClickInfo();
	}
	
	/**
	 * Change le building a afficher
	 * @param	pBuildingName nom du building a afficher
	 */
	override public function changeItemSelect(itemName:String) : Void {
		setVisibilityBuyAsset(true);
		hideDescriptionAsset();
		
		
		buildingName = itemName;
		
		setItemAsset(buildingName);
		
		getBuildingDefinition();
		updateSoftTxt();
		updateHardTxt();
		updateBuildingName();
		
		if (!buildingIsUnLock()) {
			showLockAssets();
			setTextForLockInfo();
			canBuild = false;
		} else {
			canBuild = true;
			hideLockAssets();
			if (!buildingIsBuyable()) {
				setVisibilityBuyAsset(false);
			}
		}
	}
	
	private function subscribeClickInfo () : Void {
		buildingInfoAsset.interactive = true;
		buildingInfoAsset.click = buildingInfoAsset.tap = onClickInfo;
	}
	
	private function onClickInfo (event:EventTarget) : Void {
		SoundManager.getSound(SoundNames.BUTTON_PRESS).play();
		toggleDescriptionAssets();
	}
	
	private function setTextForLockInfo () : Void {
		lockInfo.text = Localization.getText("label_lock_info") + Reflect.field(currentBuildingDefinition, "require_main_building_lvl");
	}
	
	private function showLockAssets () : Void {
		setVisibilityInList(false, cast(buySoftButtonList));
		setVisibilityInList(false, cast(buyHardButtonList));
		setVisibilityInList(true, lockAssetList);
		lockInfo.visible = true;
	}
	
	private function hideLockAssets () : Void {
		setVisibilityInList(true, cast( buySoftButtonList));
		setVisibilityInList(true, cast(buyHardButtonList));
		setVisibilityInList(false, lockAssetList);
		lockInfo.visible = false;
	}
	
	private function hideDescriptionAsset () : Void {
		backgroundDescription.visible = false;
		descriptionBuilding_txt.visible = false;
		setVisibilityInList(true,cast(itemAssetList));
	}
	
	private function toggleDescriptionAssets () : Void {
		setVisibilityInList(!itemAssetList[0].visible, cast(itemAssetList));
		backgroundDescription.visible = !backgroundDescription.visible;
		descriptionBuilding_txt.visible = !descriptionBuilding_txt.visible;
		descriptionBuilding_txt.text = Localization.getText("label_desc_" + buildingName);
	}
	
	private function setVisibilityBuyAsset (visibility:Bool) : Void {
		setVisibilityInList(visibility, cast(buyHardButtonList));
		setVisibilityInList(visibility, cast(buySoftButtonList));
		setVisibilityInList(visibility, cast(softPriceTextList));
		setVisibilityInList(visibility, cast(hardPriceTextList));
	}
	
	private function buySoft(pEvent:EventTarget) : Void {
		if (!canBuild) return;
		var price:Int = Reflect.field(currentBuildingDefinition, "price");
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.GOLD, price)) {
			ItemShop.applyRedBlinkEffect(cast pEvent.target);
			return;
		};
		SoundManager.playSFX(SoundNames.BUY);
		Main.getInstance().emit(Shop.BUY_REQUEST_BUILDING, { buildingName: buildingName, hard: false });
		Ftue.event.emit(FtueEvents.BUILDING_BOUGHT, { buildingName: buildingName });
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
	}

	private function buyHard (pEvent:EventTarget) : Void {
		if (!canBuild) return;
		var price:Int = Reflect.field(currentBuildingDefinition, "hard_price");
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.SPICE, price)) {
			ItemShop.applyRedBlinkEffect(cast pEvent.target);
			return;
		};
		SoundManager.playSFX(SoundNames.BUY);
		Main.getInstance().emit(Shop.BUY_REQUEST_BUILDING, { buildingName: buildingName, hard: true });
		Ftue.event.emit(FtueEvents.BUILDING_BOUGHT, { buildingName: buildingName });
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
			title.text =  Localization.getText("label_" + buildingName);
			title.x = basePositionTitleX + 240 - title.width / 2;
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
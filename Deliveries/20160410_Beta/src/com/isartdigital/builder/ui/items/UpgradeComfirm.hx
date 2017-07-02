package com.isartdigital.builder.ui.items;

import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent;
import com.isartdigital.builder.ui.hud.BuildingHudElement;
import com.isartdigital.builder.ui.buttons.UpgradeButton;
import com.isartdigital.builder.ui.buttons.UpgradeDisableButton;
import com.isartdigital.builder.ui.buttons.UpgradeValideButton;
import com.isartdigital.utils.ui.Button;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.display.DisplayObject;
import pixi.core.math.Point;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class UpgradeComfirm extends UIComponent implements BuildingHudElement
{
	public var basePosition:Point;
	
	private var upgradeButton:UpgradeButton;
	private var valideButton:UpgradeValideButton;
	private var disableButton:UpgradeDisableButton;
	private var priceTxt:Text;
	private var pesosAsset:DisplayObject;
	private var offeringAsset:DisplayObject;
	
	
	//TO DO change that
	public var isActive:Bool = false;
	
	public function new() 
	{
		super();
		build();
		
		setVariableFromChild();
		setComfrimAction();
		
		subscribeButtonsClick();
		
		hideComfirmAssets();
		removeRessourceAsset();
	}
	
	private function subscribeButtonsClick() : Void {
		valideButton.click = valideButton.tap = onValideButton;
		disableButton.click = disableButton.tap = onDisableButton;
	}
	
	private function unsubscribeButtonsClick () : Void {
		valideButton.click = valideButton.tap = null;
		disableButton.click = disableButton.tap = null;
	}
	
	private function setVariableFromChild () : Void {
		upgradeButton = cast(getChildByName("UpgradeButton"), UpgradeButton);
		valideButton = cast(getChildByName("UpgradeValideButton"), UpgradeValideButton);
		disableButton = cast(getChildByName("UpgradeDisableButton"), UpgradeDisableButton);
		priceTxt = cast(getChildByName("UpgradeComfirm_txt"), Text);
		offeringAsset = getChildByName("OfferingAsset");
		pesosAsset = getChildByName("PesosAsset");
	}
	
	public function init(pPrice:Float, pResource:String) : Void {
		hideComfirmAssets();
		removeRessourceAsset();
		priceTxt.text = Std.string(pPrice);
		if (pResource == RessourceManager.OFFERING) addChild(offeringAsset);
		else if (pResource == RessourceManager.GOLD) addChild(pesosAsset);
	}
	
	private function removeRessourceAsset () : Void {
		if (pesosAsset.visible) removeChild(pesosAsset);
		if (offeringAsset.visible) removeChild(offeringAsset);
	}
	
	private function onValideButton (pEvent:EventTarget) : Void {
		Main.getInstance().emit(BaseBuildingHUDEvent.UPGRADE_BUTTON);
	}
	
	private function onDisableButton (pEvent:EventTarget) : Void {
		hideComfirmAssets();
		setComfrimAction();
	}
	
	private function onUpgradeButton (pEvent:EventTarget) : Void {
		showComfirmAssets();
		setDisableAction();
	}
	
	private function setDisableAction () : Void {
		upgradeButton.click = upgradeButton.tap = onDisableButton;
	}
	
	private function setComfrimAction () : Void {
		upgradeButton.click = upgradeButton.tap = onUpgradeButton;
	}
	
	private function showComfirmAssets () : Void {
		isActive = true;
		addChild(valideButton);
		addChild(disableButton);
		addChild(priceTxt);
	}
	
	private function hideComfirmAssets () : Void {
		isActive = false;
		removeChild(valideButton);
		removeChild(disableButton);
	}
	
}
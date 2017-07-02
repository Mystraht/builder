package com.isartdigital.builder.ui.items;

import com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent;
import com.isartdigital.builder.ui.uimodule.UpgradeButton;
import com.isartdigital.builder.ui.uimodule.UpgradeDisableButton;
import com.isartdigital.builder.ui.uimodule.UpgradeValideButton;
import com.isartdigital.utils.ui.Button;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class UpgradeComfirm extends UIComponent
{
	private var upgradeButton:UpgradeButton;
	private var valideButton:UpgradeValideButton;
	private var disableButton:UpgradeDisableButton;
	private var priceTxt:Text;
	
	//TO DO change that
	public var isActive:Bool = false;

	public function new() 
	{
		super();
		build();
		
		upgradeButton = cast(getChildByName("UpgradeButton"), UpgradeButton);
		valideButton = cast(getChildByName("UpgradeValideButton"), UpgradeValideButton);
		disableButton = cast(getChildByName("UpgradeDisableButton"), UpgradeDisableButton);
		priceTxt = cast(getChildByName("UpgradeComfirm_txt"), Text);
		
		setComfrimAction();
		
		valideButton.click = valideButton.tap = onValideButton;
		disableButton.click = disableButton.tap = onDisableButton;
		
		hideComfirmAssets();
	}
	
	public function init(pPrice:Float) : Void {
		priceTxt.text = Std.string(pPrice);
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
		removeChild(priceTxt);
	}
	
}
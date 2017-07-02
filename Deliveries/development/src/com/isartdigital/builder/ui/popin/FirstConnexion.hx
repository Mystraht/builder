package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.ui.buttons.RewardButton;
import com.isartdigital.utils.Localization;
import com.isartdigital.utils.ui.Popin;
import js.Browser;
import pixi.core.display.DisplayObject;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class FirstConnexion extends Popin
{
	private var rewardButton:RewardButton;

	private var smoocity:DisplayObject;
	private var ikhowe:DisplayObject;
	private var isart:DisplayObject;
	
	public function new() 
	{
		super();
		build();
		
		rewardButton =  cast(getChildByName("RewardButton"), RewardButton); 
		
		smoocity = getChildByName("SmoocityAsset");
		ikhowe = getChildByName("IkhoweAsset");
		isart = getChildByName("IsartLogoAsset");
		
		smoocity.interactive = true;
		ikhowe.interactive = true;
		isart.interactive = true;
		
		smoocity.click = smoocity.tap = onSmoocityClick;
		ikhowe.click = ikhowe.tap = onIkhoweClick;
		isart.click = isart.tap = onIsartClick;
		
		rewardButton.click = rewardButton.tap = onClick;
	}
	
	private function onIsartClick(event:EventTarget) : Void {
		Browser.window.open("http://www.isartdigital.com/" + Main.getInstance().locale	 + "/");
	}
	
	private function onIkhoweClick(event:EventTarget) : Void {
		Browser.window.open("https://apps.facebook.com/ikhowegame/");
	}
	
	private function onSmoocityClick(event:EventTarget) : Void {
		Browser.window.open("https://apps.facebook.com/1709587912618981/");
	}
	
	private function onClick (Event:EventTarget) : Void {
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
	}
	
}
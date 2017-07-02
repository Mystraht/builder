package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.ui.buttons.CancelButton;
import com.isartdigital.builder.ui.buttons.RewardButton;
import com.isartdigital.utils.ui.Popin;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class NoMoneyInfo extends Popin
{
	private var cancelButton:CancelButton;
	private var rewardButton:RewardButton;
	
	public function new() 
	{
		super();
		build();
		
		setMemberFromChild();
		subscribeButtons();
	}
	
	private function setMemberFromChild () : Void {
		cancelButton = cast(getChildByName("CancelButton"), CancelButton);
		rewardButton = cast(getChildByName("RewardButton"), RewardButton);
	}
	
	private function subscribeButtons () : Void {
		rewardButton.click = rewardButton.tap = onRewardButton;
		cancelButton.click = cancelButton.tap = onCancelButton;
	}
	
	private function onRewardButton (event:EventTarget) : Void {
		UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_SHOP_RESOURCE);
	}
	
	private function onCancelButton (event:EventTarget) : Void {
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
	}
	
	override public function destroy():Void 
	{
		trace("Destroy NoMoneyInfo");
		super.destroy();
	}
	
}
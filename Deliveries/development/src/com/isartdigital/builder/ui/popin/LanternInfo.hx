package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.ui.buttons.RewardButton;
import com.isartdigital.utils.ui.Popin;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class LanternInfo extends Popin
{
	private var rewardButton:RewardButton;
	
	public function new() 
	{
		super();
		build();
		
		setMembersFromChild();
		
		subscribeButton();
		
	}
	
	private function subscribeButton () : Void {
		rewardButton.click = rewardButton.tap = onRewardButtonClick;
	}
	
	private function onRewardButtonClick (event:EventTarget) : Void {
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
	}
	
	private function setMembersFromChild () : Void {
		rewardButton = cast(getChildByName("RewardButton"), RewardButton);
	}
	
	override public function destroy():Void 
	{
		rewardButton.destroy();
		super.destroy();
	}
	
}
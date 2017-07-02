package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.ui.buttons.RewardButton;
import com.isartdigital.utils.ui.Popin;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class UpgradeReward extends Popin
{
	private var buttonComfirm:RewardButton;
	
	public function new() 
	{
		super();
		build();
		
		buttonComfirm = cast(getChildByName("RewardButton"), RewardButton);
		buttonComfirm.click = tap = onComfirmClick;
	}
	
	private function onComfirmClick (pEvent:EventTarget) : Void {
		UIManager.getInstance().closeCurrentPopin();
	}
	
	override public function destroy():Void 
	{
		buttonComfirm.destroy();
		super.destroy();
	}
}
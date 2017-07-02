package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.ui.buttons.RewardButton;
import com.isartdigital.utils.ui.Popin;
import motion.Actuate;
import motion.easing.Cubic;
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
	
	override function juicyOpen():Void 
	{
		alpha = 0;
		Actuate.tween(this, 0.5, { alpha : 1} ).ease(Cubic.easeOut);
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
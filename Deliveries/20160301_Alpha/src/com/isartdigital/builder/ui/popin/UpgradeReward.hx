package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.ui.uimodule.RewardButton;
import com.isartdigital.utils.ui.Popin;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class UpgradeReward extends Popin
{
	private var buttonComfirm:RewardButton;
	
	/**
	 * instance unique de la classe Shop
	 */
	private static var instance: UpgradeReward;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): UpgradeReward {
		if (instance == null) instance = new UpgradeReward();
		return instance;
	}
	
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
		instance = null;
		super.destroy();
	}
}
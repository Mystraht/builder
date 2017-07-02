package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.game.def.metadatas.LevelRewardDef;
import com.isartdigital.builder.game.manager.ExperienceManager;
import com.isartdigital.builder.game.utils.Metadatas;
import com.isartdigital.builder.ui.buttons.RewardButton;
import com.isartdigital.utils.ui.Popin;
import motion.Actuate;
import motion.easing.Cubic;
import pixi.core.display.DisplayObject;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class LevelReward extends Popin
{
	private var acceptButton:RewardButton;
	
	private var pesosAsset:DisplayObject;
	private var pimientosAsset:DisplayObject;
	
	private var pesosText:Text;
	private var pimientosText:Text;
	
	private var pesosToReward:Float;
	private var pimientosToReward:Float;

	public function new() 
	{
		super();
		build();
		
		setVariablesFromChild();
		setVariablesFromSettings();

		subscribeButtonClickEvent();
		
		setGifts();
	}
	
	override function juicyOpen():Void 
	{
		alpha = 0;
		Actuate.tween(this, 0.5, { alpha : 1} ).ease(Cubic.easeOut);
	}
	
	private function subscribeButtonClickEvent () : Void {
		acceptButton.click = acceptButton.tap = onAcceptButtonClick;
	}
	
	private function onAcceptButtonClick (pEvent:EventTarget) : Void {
		Ftue.event.emit(FtueEvents.COLLECT_LEVEL_UP);
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
	}
	
	private function setVariablesFromChild () : Void {
		acceptButton = cast(getChildByName("RewardButton"), RewardButton);
		pesosAsset = getChildByName("RewardPesosAsset");
		pimientosAsset = getChildByName("RewardPimientosAsset");
		pesosText = cast(getChildByName("RewardPesos_txt"), Text);
		pimientosText = cast(getChildByName("RewardPimientos_txt"), Text);
	}
	
	private function setVariablesFromSettings () : Void {
		var lSettings:LevelRewardDef = Metadatas.levelReward[ExperienceManager.getInstance().getLvlUser()];
		
		pimientosToReward = lSettings.pimientos;
		pesosToReward = lSettings.gold;
	}
	
	private function setTexts () : Void {
		pimientosText.text = Std.string(pimientosToReward);
		pesosText.text = Std.string(pesosToReward);
	}
	
	private function hidePimientosAssets () : Void {
		removeChild(pimientosAsset);
		removeChild(pimientosText);
	}
	
	private function setGifts () : Void {
		setTexts();
		if (pimientosToReward == 0) {
			hidePimientosAssets();
		}
	}
	
}
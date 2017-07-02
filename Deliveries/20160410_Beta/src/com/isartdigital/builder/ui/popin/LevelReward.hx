package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.game.def.settings.LevelRewardDef;
import com.isartdigital.builder.game.manager.ExperienceManager;
import com.isartdigital.builder.game.manager.Settings;
import com.isartdigital.builder.ui.buttons.RewardButton;
import com.isartdigital.services.Users;
import com.isartdigital.utils.ui.Popin;
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
	
	private function subscribeButtonClickEvent () : Void {
		acceptButton.click = acceptButton.tap = onAcceptButtonClick;
	}
	
	private function onAcceptButtonClick (pEvent:EventTarget) : Void {
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
		var lSettings:LevelRewardDef = Settings.levelReward[ExperienceManager.getInstance().getLvlUser()];
		
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
	
	private function centerPesosAssets () : Void {
		// to set an anchor objet in ui.fla
		pesosAsset.x = width / 2 - pesosAsset.getLocalBounds().width / 2 - 40;
		pesosText.x = pesosAsset.x - pesosText.getLocalBounds().width / 2;// 20;
	}
	
	private function setGifts () : Void {
		setTexts();
		if (pimientosToReward == 0) {
			hidePimientosAssets();
			centerPesosAssets ();
		}
	}
	
}
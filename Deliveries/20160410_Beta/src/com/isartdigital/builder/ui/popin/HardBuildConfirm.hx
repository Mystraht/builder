package com.isartdigital.builder.ui.popin;

import pixi.core.math.Point;
import pixi.interaction.EventTarget;
import com.isartdigital.builder.ui.buttons.RewardButton;
import com.isartdigital.utils.ui.Popin;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class HardBuildConfirm extends Popin
{
	public static inline var CONFIRM_BUTTON_CLICK:String = 'CONFIRM_BUTTON_CLICK';

	private var confirmButton:RewardButton;
	
	private var confirmTxt:Text;
	private var currencyCost:Text;
	private var descriptionText:Text;

	public function new()
	{
		super();
		build();
		
		setVariableFromChild();

		confirmButton.click = confirmButton.tap = onConfirmButtonClick;
	}
	
	private function setVariableFromChild () : Void {
		confirmButton = cast(getChildByName("RewardButton"), RewardButton);
		
		confirmTxt = cast (getChildByName("HardBuildConfirm_txt"), Text);
		currencyCost = cast (getChildByName("CurrencyCount_txt"), Text);
		descriptionText = cast(getChildByName("HardBuildConfirmDescription_txt"), Text);
	}

	private function onConfirmButtonClick(event:EventTarget):Void {
		UIManager.getInstance().emit(CONFIRM_BUTTON_CLICK);
		UIManager.getInstance().closeCurrentPopin();
	}
}
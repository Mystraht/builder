package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.ui.buttons.BuyHardButton;
import com.isartdigital.builder.ui.buttons.CancelButton;
import motion.Actuate;
import motion.easing.Cubic;
import Std;
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

	private var buyHardButton:BuyHardButton;
	private var cancelButton:CancelButton;

	private var price:Int;
	private var confirmTxt:Text;
	private var currencyCost:Text;
	private var descriptionText:Text;

	public function new(price:Int) {
		super();
		build();

		this.price = price;
		
		setVariableFromChild();
		currencyCost.text = Std.string(price);

		buyHardButton.click = buyHardButton.tap = onConfirmButtonClick;
		cancelButton.click = cancelButton.tap = onCancelButtonClick;
	}
	
	override function juicyOpen():Void 
	{
		alpha = 0;
		Actuate.tween(this, 0.5, { alpha : 1} ).ease(Cubic.easeOut);
	}
	
	private function setVariableFromChild () : Void {
		buyHardButton = cast(getChildByName("BuyHardButton"), BuyHardButton);
		cancelButton = cast(getChildByName("CancelButton"), CancelButton);
		
		
		confirmTxt = cast (getChildByName("HardBuildConfirm_txt"), Text);
		currencyCost = cast (getChildByName("CurrencyCount_txt"), Text);
		descriptionText = cast(getChildByName("HardBuildConfirmDescription_txt"), Text);
	}
	
	private function onCancelButtonClick (event:EventTarget) : Void {
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
	}

	private function onConfirmButtonClick(event:EventTarget):Void {
		UIManager.getInstance().emit(CONFIRM_BUTTON_CLICK, { price: price });
	}
	
	override public function destroy():Void {
		buyHardButton.destroy();
		super.destroy();
	}
}
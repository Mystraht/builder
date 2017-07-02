package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.game.utils.TimeUtils;
import com.isartdigital.builder.ui.buttons.BuyOfferingButton;
import com.isartdigital.builder.ui.buttons.CancelButton;
import com.isartdigital.builder.ui.buttons.ShopBuySoftButton;
import com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent;
import com.isartdigital.utils.Localization;
import com.isartdigital.utils.ui.Popin;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class UpgradeConfirm extends Popin
{
	private static var descriptionLabel:String = "label_upgrade_description";
	private static var minuteLabel:String = "label_minute";
	
	private var description:Text;
	private var priceSoft:Text;
	
	private var cancelButton:CancelButton;
	private var buyOfferingButton:BuyOfferingButton;

	public function new(params:UpgradeConfirmParamsDef) 
	{
		super();
		build();
		
		setMemberFromChild();
		subscribeButtons();
		
		
		setTimeInDescription(params.timeLeft);
		priceSoft.text = Std.string(params.price);
	}
	
	private function setMemberFromChild () : Void {
		description = cast(getChildByName("UpgradeConfirmDescription_txt"), Text);
		priceSoft = cast(getChildByName("PriceOffrande_txt"), Text);
		
		cancelButton = cast(getChildByName("CancelButton"), CancelButton);
		buyOfferingButton = cast(getChildByName("BuyOfferingButton"), BuyOfferingButton);
	}
	
	private function subscribeButtons () : Void {
		cancelButton.click = cancelButton.tap = onCancelButton;
		buyOfferingButton.click = buyOfferingButton.tap = onBuySoft;
	}
	
	private function onBuySoft (event:EventTarget) : Void {
		Main.getInstance().emit(BaseBuildingHUDEvent.UPGRADE_BUTTON);
	}
	
	private function onCancelButton (event:EventTarget) : Void {
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
	}
	
	private function setTimeInDescription (timeLeft:Float) : Void {
		description.text = Localization.getText(descriptionLabel) 
			+ " " + timeLeft + " " + Localization.getText(minuteLabel);
	}
	
	override public function destroy():Void 
	{
		cancelButton.destroy();
		buyOfferingButton.destroy();
		super.destroy();
	}
	
}
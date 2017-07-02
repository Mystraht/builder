package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.ui.buttons.CancelButton;
import com.isartdigital.builder.ui.buttons.RewardButton;
import com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent;
import com.isartdigital.utils.ui.Popin;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class DeleteConfirm extends Popin
{

	private var confirmButton:RewardButton;
	private var cancelButton:CancelButton;
	
	public function new() 
	{
		super();
		build();
		
		setMemberFromChild();
		
		subscribeButton();
	}
	
	private function subscribeButton () : Void {
		confirmButton.tap = confirmButton.click = onConfirmButton;
		cancelButton.tap = cancelButton.click = onCancelButton;
	}
	
	private function onCancelButton (event:EventTarget) : Void {
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
	}
	
	private function onConfirmButton (event:EventTarget) : Void {
		Main.getInstance().emit(BaseBuildingHUDEvent.DELETE_BUTTON);
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
	}
	
	private function setMemberFromChild () : Void {
		confirmButton = cast(getChildByName("RewardButton"), RewardButton);
		cancelButton = cast(getChildByName("CancelButton"), CancelButton);
	}
	
}
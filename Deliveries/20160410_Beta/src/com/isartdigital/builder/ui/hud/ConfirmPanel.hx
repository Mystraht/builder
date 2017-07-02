package com.isartdigital.builder.ui.hud;

import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingEvents;
import com.isartdigital.builder.ui.buttons.DisableButton;
import com.isartdigital.builder.ui.buttons.ValideButton;
import motion.Actuate;
import motion.easing.Elastic;
import pixi.core.display.Container;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ConfirmPanel extends Container
{
	private var confirmButton:ValideButton = new ValideButton();
	private var disableButton:DisableButton = new DisableButton();
	
	public function new() 
	{
		super();
		placeButton();
		listenButton();
		feedBackDisplay();
	}
	
	private function feedBackDisplay () : Void {
		confirmButton.scale.set(0.2, 0.2);
		disableButton.scale.set(0.2, 0.2);
		Actuate.tween(confirmButton.scale, 1, { x : 1, y : 1 } ).ease(Elastic.easeOut);
		Actuate.tween(disableButton.scale, 1, { x : 1, y : 1 } ).ease(Elastic.easeOut);
	}
	
	private function listenButton () : Void {
		confirmButton.tap = confirmButton.click = dispatchEventValide;
		disableButton.tap = disableButton.click = dispatchEventDisable;
	}
	
	private function dispatchEventValide (pEvent:EventTarget) {
		Main.getInstance().emit(BuildingEvents.MOVE_CONFIRM);
		destroy();
	}
	
	private function dispatchEventDisable (pEvent:EventTarget) {
		Main.getInstance().emit(BuildingEvents.MOVE_DISABLE);
		destroy();
	}
	
	private function placeButton () : Void {
		addChild(confirmButton);

		confirmButton.x = - 180;
		confirmButton.y += 5;
		
		addChild(disableButton);
		
		disableButton.x = confirmButton.width;
	}
	
	override public function destroy () : Void {
		removeChild(confirmButton);
		removeChild(disableButton);
		parent.removeChild(this);
		confirmButton.destroy();
		disableButton.destroy();
		
		super.destroy();
	}
}
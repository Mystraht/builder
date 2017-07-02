package com.isartdigital.builder.ui.buttons;

import com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class MoveButton extends ButtonsBuilding
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
		eventEmit = BaseBuildingHUDEvent.MOVE_BUTTON;
	}
	
	override function onClickEvent(pEvent:EventTarget):Void 
	{
		UIManager.getInstance().emit(UIManager.ON_MOUSE_OUT_UI);
		super.onClickEvent(pEvent);
	}
	
	
}
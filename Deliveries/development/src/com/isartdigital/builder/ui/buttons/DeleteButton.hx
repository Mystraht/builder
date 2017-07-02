package com.isartdigital.builder.ui.buttons;

import com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class DeleteButton extends ButtonsBuilding
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
	}
	
	override function onClickEvent(pEvent:EventTarget):Void 
	{
		UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_DELETECONFIRM);
	}
	
}
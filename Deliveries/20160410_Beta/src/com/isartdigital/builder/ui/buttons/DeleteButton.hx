package com.isartdigital.builder.ui.buttons;

import com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;
import pixi.display.FlumpMovie;
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
		eventEmit = BaseBuildingHUDEvent.DELETE_BUTTON;
		super();
	}
	
}
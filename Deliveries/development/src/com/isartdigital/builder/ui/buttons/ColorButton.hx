package com.isartdigital.builder.ui.buttons;

import com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;

/**
 * ...
 * @author Flavien
 */
class ColorButton extends ButtonsBuilding
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
		eventEmit = BaseBuildingHUDEvent.PAINT_BUTTON;
	}
	
}
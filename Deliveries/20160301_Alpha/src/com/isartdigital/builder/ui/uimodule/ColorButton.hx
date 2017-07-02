package com.isartdigital.builder.ui.uimodule;

import com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;
import pixi.interaction.EventTarget;

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
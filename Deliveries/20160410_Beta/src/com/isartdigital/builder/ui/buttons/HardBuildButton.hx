package com.isartdigital.builder.ui.buttons;
import com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;

/**
 * ...
 * @author Flavien
 */
class HardBuildButton extends ButtonsBuilding
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		eventEmit = BaseBuildingHUDEvent.HARDBUILD_BUTTON;
		super();
	}
	
}
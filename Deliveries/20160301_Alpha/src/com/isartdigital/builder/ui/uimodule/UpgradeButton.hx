package com.isartdigital.builder.ui.uimodule;

import com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;

/**
 * ...
 * @author Flavien
 */
class UpgradeButton extends Button
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
		interactive = true;
		buttonMode = true;
	}
	
}
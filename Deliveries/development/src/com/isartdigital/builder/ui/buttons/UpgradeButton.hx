package com.isartdigital.builder.ui.buttons;

import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class UpgradeButton extends ButtonsBuilding
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
	}
}
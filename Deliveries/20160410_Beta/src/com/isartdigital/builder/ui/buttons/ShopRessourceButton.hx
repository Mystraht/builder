package com.isartdigital.builder.ui.buttons;

import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;

/**
 * ...
 * @author Flavien
 */
class ShopRessourceButton extends CheckBox
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
	}
	
}
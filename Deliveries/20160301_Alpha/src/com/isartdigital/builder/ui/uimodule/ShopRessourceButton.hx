package com.isartdigital.builder.ui.uimodule;

import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;

/**
 * ...
 * @author Flavien
 */
class ShopRessourceButton extends ShopOnglet
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
	}
	
}
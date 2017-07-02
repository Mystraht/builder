package com.isartdigital.builder.ui.uimodule;

import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;

/**
 * ...
 * @author Flavien
 */
class ShopBuyHardButton extends Button
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
		
	}
	
}
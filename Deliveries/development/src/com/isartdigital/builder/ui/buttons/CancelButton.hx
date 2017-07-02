package com.isartdigital.builder.ui.buttons;

import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;

/**
 * ...
 * @author Flavien
 */
class CancelButton extends Button
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
		
	}
	
}
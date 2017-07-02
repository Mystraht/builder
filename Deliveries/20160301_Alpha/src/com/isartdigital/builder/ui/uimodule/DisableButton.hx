package com.isartdigital.builder.ui.uimodule;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;

/**
 * ...
 * @author Flavien
 */
class DisableButton extends Button
{

	public function new() 
	{	
		factory = new FlumpMovieAnimFactory();
		super();
		interactive = true;
		buttonMode = true;
		trace("HIC BINCREAE");
	}
	
}
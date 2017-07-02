package com.isartdigital.builder.ui.buttons;

import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class SoundButton extends CheckBox
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();	
	}
}
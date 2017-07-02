package com.isartdigital.builder.ui.buttons;

import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.sounds.SoundManager;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class SFXButton extends CheckBox
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();

		click = tap = onClick;
	}
	
	private function onClick (event:EventTarget) : Void {
		SoundManager.toggleSFX();
	}	
}
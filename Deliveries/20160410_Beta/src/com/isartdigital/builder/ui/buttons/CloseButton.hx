package com.isartdigital.builder.ui.buttons;

import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class CloseButton extends Button
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
		tap = click = onClick;
		
	}
	
	private function onClick (pEvent:EventTarget) : Void {
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
		destroy();
	}
	
}
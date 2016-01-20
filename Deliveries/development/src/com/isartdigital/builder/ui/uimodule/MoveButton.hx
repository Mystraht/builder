package com.isartdigital.builder.ui.uimodule;

import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class MoveButton extends Button
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
		interactive = true;
		buttonMode = true;
		once(MouseEventType.CLICK,onClick);
	}
	
	private function onClick (pEvent:EventTarget): Void {
		
		trace("ok");
		
	}
	
}
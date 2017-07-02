package com.isartdigital.builder.ui.buttons;

import com.isartdigital.builder.ui.popin.Shop;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.ui.Button;
import pixi.display.FlumpMovie;
import pixi.display.FlumpSprite;
import pixi.extras.MovieClip;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class DotButton extends CheckBox
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
		
	}
}
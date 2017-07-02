package com.isartdigital.builder.ui.buttons;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;

/**
 * ...
 * @author Flavien
 */
class ShopBuildingButton extends CheckBox
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
	}	
}
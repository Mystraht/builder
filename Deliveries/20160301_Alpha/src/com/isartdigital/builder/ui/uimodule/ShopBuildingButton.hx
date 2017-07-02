package com.isartdigital.builder.ui.uimodule;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ShopBuildingButton extends ShopOnglet
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
	}	
}